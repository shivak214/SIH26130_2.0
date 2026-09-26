const approvalTrackingApi =
    "https://approvalguard-backend.onrender.com/api/approval-tracking";
const portalStatuses = ["SUBMITTED", "UNDER_SCRUTINY", "DOCUMENT_VERIFICATION", "QUERY_RAISED", "APPROVED", "REJECTED"];
let trackedApprovals = [];

function trackingEscape(value) {
    return String(value ?? "").replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[character]));
}

function vaultValue(key) {
    return String(records[key]?.fieldValue || "").trim();
}

function setTrackingMessage(message, error = false) {
    const element = document.getElementById("approvalEntryMessage");
    element.textContent = message;
    element.className = error ? "error" : "success";
}

function hasVaultPermission() {
    return document.getElementById("approvalVaultPermission").checked;
}

function vaultBusinessPayload() {
    return {
        businessName: vaultValue("business_name"),
        businessType: vaultValue("business_type"),
        industry: vaultValue("industry"),
        state: vaultValue("state"),
        district: vaultValue("district"),
        investment: vaultValue("total_investment"),
        landArea: vaultValue("land_area"),
        employees: vaultValue("current_employees"),
        contactName: vaultValue("authorized_person") || vaultValue("owner_name"),
        pan: vaultValue("pan"),
        gstin: vaultValue("gstin"),
        address: vaultValue("address"),
        phone: vaultValue("phone_number"),
        email: vaultValue("email")
    };
}

function portalUrlForApproval(approvalName, department, applicationId = "", shareVault = false) {
    const portalUrl = new URL(`${window.DEMO_PORTAL_URL}/`);
    portalUrl.searchParams.set("approvalName", approvalName);
    portalUrl.searchParams.set("department", department);
    portalUrl.searchParams.set("vaultShared", shareVault ? "true" : "false");
    if (applicationId) portalUrl.searchParams.set("applicationId", applicationId);
    return portalUrl;
}

function prepareDemoPortalLink(link) {
    const approvalName = document.getElementById("newApprovalName").value.trim() || "Demo Approval";
    const department = document.getElementById("newApprovalDepartment").value.trim() || "Demo Department";
    const applicationId = document.getElementById("newApplicationId").value.trim();
    const shareVault = hasVaultPermission();
    link.href = portalUrlForApproval(approvalName, department, applicationId, shareVault).toString();
    setTrackingMessage(shareVault
        ? "Demo portal opened. Review and submit the prefilled fake approval there."
        : "Demo portal opened without Information Vault data. Check the sharing permission to enable autofill.", !shareVault);
}

document.getElementById("approvalVaultPermission").addEventListener("change", event => {
    document.getElementById("vaultShareStatus").textContent = event.target.checked ? "Information Vault data ready to share" : "Not shared";
    setTrackingMessage(event.target.checked
        ? "Information Vault data is ready and will be shared with the demo portal."
        : "Information Vault data will not be shared with the demo portal.", !event.target.checked);
});
document.querySelector("[data-demo-portal-link]").addEventListener("click", event => {
    prepareDemoPortalLink(event.currentTarget);
    event.currentTarget.target = "_blank";
    event.currentTarget.rel = "noopener noreferrer";
});

function renderTrackedApprovals() {
    const count = status => trackedApprovals.filter(item => item.currentStatus === status).length;
    document.getElementById("trackingTotal").textContent = trackedApprovals.length;
    document.getElementById("trackingApproved").textContent = count("APPROVED");
    document.getElementById("trackingReview").textContent = count("UNDER_SCRUTINY") + count("DOCUMENT_VERIFICATION");
    document.getElementById("trackingDocuments").textContent = count("QUERY_RAISED");
    document.getElementById("trackingBlocked").textContent = count("REJECTED");
    document.getElementById("trackingProgress").textContent = `${trackedApprovals.length ? Math.round((count("APPROVED") / trackedApprovals.length) * 100) : 0}%`;
    document.getElementById("trackingProgressBar").style.width = document.getElementById("trackingProgress").textContent;
    document.getElementById("approvalCards").innerHTML = trackedApprovals.map(item => `<article class="approval-card">
        <div class="approval-card-header"><div><span class="demo-badge">FAKE PORTAL</span><h3>${trackingEscape(item.approvalName)}</h3><p>${trackingEscape(item.department)}</p></div><span class="approval-status-badge blue">${trackingEscape(item.currentStatus.replaceAll("_", " "))}</span></div>
        <div class="approval-card-grid"><span><b>Application</b>${trackingEscape(item.applicationId)}</span><span><b>Tracking</b>${item.trackingEnabled === false ? "Stopped" : "Active"}</span><span><b>Last checked</b>${item.lastCheckedAt ? new Date(item.lastCheckedAt).toLocaleString("en-IN") : "Not checked"}</span><span><b>Email</b>${trackingEscape(item.contact?.email)}</span><span><b>Phone</b>${trackingEscape(item.contact?.phone)}</span></div>
        ${item.lastPollError ? `<div class="tracking-info-box">${trackingEscape(item.lastPollError)}</div>` : ""}
        <div class="tracking-card-actions"><button type="button" class="secondary-btn delete-tracking-button" data-application-id="${trackingEscape(item.applicationId)}">Delete added application</button></div>
    </article>`).join("") || '<div class="tracking-empty">No portal applications submitted yet.</div>';
    document.querySelectorAll(".delete-tracking-button").forEach(button => button.addEventListener("click", () => deleteTracking(button.dataset.applicationId)));
}

async function deleteTracking(applicationId) {
    if (!window.confirm("Delete this tracking record from ApprovalGuard?")) return;
    try {
        const response = await fetch(`${approvalTrackingApi}/applications/${encodeURIComponent(applicationId)}`, { method: "DELETE" });
        const result = await response.json();
        if (!response.ok || !result.success) throw new Error(result.error || "Unable to delete tracking record.");
        setTrackingMessage("Tracking record deleted.");
        await refreshTrackedApprovals();
    } catch (error) { setTrackingMessage(error.message, true); }
}

async function refreshTrackedApprovals() {
    try {
        const response = await fetch(`${approvalTrackingApi}/applications`);
        const result = await response.json();
        if (!response.ok || !result.success) throw new Error(result.error || "Could not check portal status.");
        trackedApprovals = result.data || [];
        renderTrackedApprovals();
    } catch (error) { setTrackingMessage(`Status check unavailable: ${error.message}`, true); }
}

document.getElementById("approvalEntryForm").addEventListener("submit", async event => {
    event.preventDefault();
    const approvalName = document.getElementById("newApprovalName").value.trim();
    const department = document.getElementById("newApprovalDepartment").value.trim();
    const applicationId = document.getElementById("newApplicationId").value.trim();
    if (!approvalName || !department) {
        setTrackingMessage("Enter the approval name and department before adding the approval.", true);
        return;
    }
    if (!applicationId) {
        setTrackingMessage("Create and submit the fake approval in the demo portal first, then enter its application ID.", true);
        return;
    }
    if (!hasVaultPermission()) {
        setTrackingMessage("Check the permission to share Information Vault information before adding the approval.", true);
        return;
    }
    try {
        const response = await fetch(`${approvalTrackingApi}/applications`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                permissionToUseVault: true,
                applicationId,
                approval: { approvalName, department },
                business: vaultBusinessPayload(),
                documents: []
            })
        });
        const result = await response.json();
        if (!response.ok || !result.success) throw new Error(result.error || "Unable to add approval for tracking.");
        setTrackingMessage(result.message || "Approval added for tracking.");
        await refreshTrackedApprovals();
    } catch (error) {
        setTrackingMessage(error.message, true);
    }
});

refreshTrackedApprovals();
window.setInterval(refreshTrackedApprovals, 10000);