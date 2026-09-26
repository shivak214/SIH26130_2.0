const storageKey = "approvalguard.information-vault.business.v3";
const incentiveVaultKey = "approvalguard.information-vault.incentives.v1";
const verifiedProfileSeedKey =
    "approvalguard.information-vault.verified-seed.v1";
const businessProfileSyncKey =
    "approvalguard.information-vault.business-profile-sync.v1";

const verifiedProfileDefaults = {
    business_name: "Sahyadri Pharma Solutions Pvt. Ltd.",
    business_type: "Private Limited Company",
    industry: "Pharmaceutical Manufacturing",
    business_stage: "Expansion",
    business_description:
        "Manufacturing generic pharmaceutical formulations and healthcare products for domestic markets.",
    registration_number: "U24239MH2024PTC123456",
    gstin: "27AABCS1234F1Z5",
    pan: "AABCS1234F",
    udyam_registration_number: "UDYAM-MH-18-0012345",
    address: "Plot 42, MIDC Industrial Area, Waluj",
    state: "Maharashtra",
    district: "Aurangabad",
    pin_code: "431136",
    plot_number: "42-B",
    land_area: "2.5",
    total_investment: "85000000",
    annual_turnover: "42000000",
    investment_in_machinery: "50000000",
    current_employees: "48",
    expected_employees: "75",
    skilled_employees: "32",
    owner_name: "Ananya Deshmukh",
    authorized_person: "Rahul Patil",
    email: "rahul.patil@sahyadripharma.example",
    phone_number: "9876543210"
};

const fieldGroups = [
    {
        id: "business",
        title: "Business Details",
        icon: "building-2",
        fields: [
            ["business_name", "Business name", "text", true],
            ["business_type", "Business type", "text", false],
            ["industry", "Industry", "text", true],
            ["business_stage", "Business stage", "text", false],
            [
                "business_description",
                "Business description",
                "textarea",
                false
            ]
        ]
    },
    {
        id: "registration",
        title: "Registration Details",
        icon: "badge-check",
        fields: [
            [
                "registration_number",
                "Registration number",
                "text",
                false
            ],
            ["gstin", "GSTIN", "text", true],
            ["pan", "PAN", "text", true],
            [
                "udyam_registration_number",
                "Udyam registration number",
                "text",
                false
            ]
        ]
    },
    {
        id: "location",
        title: "Location Details",
        icon: "map-pin",
        fields: [
            ["address", "Address", "text", false],
            ["state", "State", "text", false],
            ["district", "District", "text", false],
            ["pin_code", "PIN code", "text", true, "6 digits"],
            ["plot_number", "Plot number", "text", false],
            [
                "land_area",
                "Land area",
                "number",
                false,
                "square metres"
            ]
        ]
    },
    {
        id: "financial",
        title: "Financial Details",
        icon: "wallet-cards",
        fields: [
            [
                "total_investment",
                "Total investment",
                "number",
                false
            ],
            [
                "annual_turnover",
                "Annual turnover",
                "number",
                false
            ],
            [
                "investment_in_machinery",
                "Investment in machinery",
                "number",
                false
            ]
        ]
    },
    {
        id: "employment",
        title: "Employment Details",
        icon: "users",
        fields: [
            [
                "current_employees",
                "Current employees",
                "number",
                false
            ],
            [
                "expected_employees",
                "Expected employees",
                "number",
                false
            ],
            [
                "skilled_employees",
                "Skilled employees",
                "number",
                false
            ]
        ]
    },
    {
        id: "contact",
        title: "Contact Details",
        icon: "contact",
        fields: [
            ["owner_name", "Owner name", "text", false],
            [
                "authorized_person",
                "Authorized person",
                "text",
                false
            ],
            ["email", "Email", "email", false],
            [
                "phone_number",
                "Phone number",
                "tel",
                true,
                "10 digits"
            ]
        ]
    }
];

const requiredKeys = fieldGroups.flatMap(group =>
    group.fields
        .filter(field => field[3])
        .map(field => field[0])
);

const allFields = fieldGroups.flatMap(
    group => group.fields
);

const form =
    document.getElementById(
        "businessInformationForm"
    );

const fieldSections =
    document.getElementById(
        "fieldSections"
    );

const incentiveVaultSections =
    document.getElementById(
        "incentiveVaultSections"
    );

const demoPortalLink =
    document.querySelector(
        "[data-demo-portal-link]"
    );

if (demoPortalLink) {
    demoPortalLink.href =
        window.DEMO_PORTAL_URL;
}

let isEditing = true;

let records = loadRecords();


// =====================================================
// UTILITY
// =====================================================

function now() {
    return new Date().toISOString();
}


// =====================================================
// CREATE INITIAL RECORDS
// =====================================================

function createInitialRecords() {
    return Object.fromEntries(
        allFields.map(([key]) => [
            key,
            {
                fieldName: key,
                fieldValue: "",
                verificationStatus: "Unverified",
                lastUpdated: now()
            }
        ])
    );
}


// =====================================================
// LOAD INFORMATION VAULT
// =====================================================

function loadRecords() {
    try {
        const stored =
            JSON.parse(
                localStorage.getItem(
                    storageKey
                )
            );

        if (
            stored &&
            typeof stored === "object"
        ) {
            const initial =
                createInitialRecords();

            const loadedRecords =
                Object.fromEntries(
                    allFields.map(
                        ([key]) => {
                            const record =
                                stored[key] ||
                                initial[key];

                            return [
                                key,
                                {
                                    ...initial[key],
                                    ...record,
                                    fieldValue:
                                        String(
                                            record.fieldValue ??
                                                ""
                                        ),
                                    verificationStatus:
                                        record.verificationStatus ||
                                        "Unverified"
                                }
                            ];
                        }
                    )
                );

            /*
             * Seed demo defaults only once.
             */
            if (
                !localStorage.getItem(
                    verifiedProfileSeedKey
                )
            ) {
                Object.entries(
                    verifiedProfileDefaults
                ).forEach(
                    ([key, fieldValue]) => {
                        if (!loadedRecords[key]) {
                            return;
                        }

                        loadedRecords[
                            key
                        ].fieldValue =
                            fieldValue;

                        loadedRecords[
                            key
                        ].verificationStatus =
                            "Verified";

                        loadedRecords[
                            key
                        ].lastUpdated =
                            "2026-09-20T12:00:00.000Z";
                    }
                );

                localStorage.setItem(
                    verifiedProfileSeedKey,
                    "true"
                );

                localStorage.setItem(
                    storageKey,
                    JSON.stringify(
                        loadedRecords
                    )
                );
            }

            return loadedRecords;
        }
    } catch (error) {
        console.warn(
            "Information Vault draft could not be loaded.",
            error
        );
    }

    const initial =
        createInitialRecords();

    Object.entries(
        verifiedProfileDefaults
    ).forEach(
        ([key, fieldValue]) => {
            if (!initial[key]) {
                return;
            }

            initial[key].fieldValue =
                fieldValue;

            initial[key].verificationStatus =
                "Verified";

            initial[key].lastUpdated =
                "2026-09-20T12:00:00.000Z";
        }
    );

    localStorage.setItem(
        verifiedProfileSeedKey,
        "true"
    );

    localStorage.setItem(
        storageKey,
        JSON.stringify(initial)
    );

    return initial;
}


// =====================================================
// SYNC BUSINESS PROFILE
// =====================================================

async function syncBusinessProfile() {
    try {
        const response =
            await fetch(
                `${window.APPROVAL_GUARD_URL}/api/business/latest`
            );

        if (!response.ok) {
            console.warn(
                "Business Profile could not be loaded:",
                response.status
            );
            return;
        }

        const result =
            await response.json();

        const business =
            result.business;

        if (!business) {
            console.warn(
                "No saved Business Profile was found."
            );
            return;
        }

        const profileFields = {
            business_name:
                business.businessName,

            business_type:
                business.businessType,

            business_stage:
                business.businessStage,

            industry:
                business.industry,

            state:
                business.state,

            district:
                business.district,

            total_investment:
                business.investment,

            land_area:
                business.landArea,

            current_employees:
                business.employees,

            owner_name:
                business.contactPerson,

            email:
                business.email,

            phone_number:
                business.phone
        };

        let previousSyncedValues = {};

        try {
            previousSyncedValues =
                JSON.parse(
                    localStorage.getItem(
                        businessProfileSyncKey
                    ) || "{}"
                );
        } catch (error) {
            previousSyncedValues = {};
        }

        let informationVaultChanged =
            false;

        Object.entries(
            profileFields
        ).forEach(
            ([key, value]) => {
                if (
                    value === undefined ||
                    value === null
                ) {
                    return;
                }

                if (!records[key]) {
                    return;
                }

                const newBusinessValue =
                    String(value).trim();

                if (!newBusinessValue) {
                    return;
                }

                const previousBusinessValue =
                    String(
                        previousSyncedValues[
                            key
                        ] || ""
                    ).trim();

                /*
                 * First synchronization.
                 */
                if (
                    !Object.prototype.hasOwnProperty.call(
                        previousSyncedValues,
                        key
                    )
                ) {
                    records[key].fieldValue =
                        newBusinessValue;

                    records[
                        key
                    ].verificationStatus =
                        "Unverified";

                    records[
                        key
                    ].lastUpdated =
                        now();

                    previousSyncedValues[
                        key
                    ] =
                        newBusinessValue;

                    informationVaultChanged =
                        true;

                    return;
                }

                /*
                 * Business Profile changed.
                 */
                if (
                    newBusinessValue !==
                    previousBusinessValue
                ) {
                    records[key].fieldValue =
                        newBusinessValue;

                    records[
                        key
                    ].verificationStatus =
                        "Unverified";

                    records[
                        key
                    ].lastUpdated =
                        now();

                    previousSyncedValues[
                        key
                    ] =
                        newBusinessValue;

                    informationVaultChanged =
                        true;

                    return;
                }

                /*
                 * Business Profile did not change.
                 *
                 * Therefore:
                 * DO NOT overwrite manual
                 * Information Vault edits.
                 */
            }
        );

        localStorage.setItem(
            businessProfileSyncKey,
            JSON.stringify(
                previousSyncedValues
            )
        );

        if (informationVaultChanged) {
            persist();
        }
    } catch (error) {
        console.warn(
            "Business Profile could not be synced to the Information Vault.",
            error
        );
    }
}


// =====================================================
// SAFE HTML VALUE
// =====================================================

function safeValue(value) {
    return String(value ?? "").replace(
        /[&<>"']/g,
        character =>
            ({
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                "\"": "&quot;",
                "'": "&#039;"
            }[character])
    );
}


// =====================================================
// INCENTIVE VAULT
// =====================================================

function loadIncentiveVaults() {
    try {
        const stored =
            JSON.parse(
                localStorage.getItem(
                    incentiveVaultKey
                ) || "{}"
            );

        return stored &&
            typeof stored === "object"
            ? stored
            : {};
    } catch (error) {
        console.warn(
            "Incentive Information Vault data could not be loaded.",
            error
        );

        return {};
    }
}


function persistIncentiveVaults(
    policyVaults
) {
    localStorage.setItem(
        incentiveVaultKey,
        JSON.stringify(
            policyVaults
        )
    );
}


function renderIncentiveVaults() {
    if (!incentiveVaultSections) {
        return;
    }

    const policyVaults =
        loadIncentiveVaults();

    incentiveVaultSections.innerHTML =
        Object.values(policyVaults)
            .map(policy => {
                const fieldsMarkup =
                    Object.values(
                        policy.fields || {}
                    )
                        .map(field => {
                            const missing =
                                !String(
                                    field.fieldValue ||
                                        ""
                                ).trim();

                            const requiredClass =
                                missing
                                    ? "policy-required-field missing-policy-field"
                                    : "policy-required-field";

                            return `
                                <div class="information-field ${requiredClass}">

                                    <div class="field-label-row">

                                        <label
                                            for="policy-${safeValue(
                                                policy.id
                                            )}-${safeValue(
                                                field.fieldName
                                            )}"
                                        >
                                            ${safeValue(
                                                field.fieldLabel
                                            )}

                                            <span aria-hidden="true">
                                                *
                                            </span>
                                        </label>

                                        <span
                                            class="verification-badge ${statusClass(
                                                field.verificationStatus
                                            )}"
                                        >
                                            ${safeValue(
                                                field.verificationStatus
                                            )}
                                        </span>

                                    </div>

                                    <input
                                        id="policy-${safeValue(
                                            policy.id
                                        )}-${safeValue(
                                            field.fieldName
                                        )}"
                                        data-policy-id="${safeValue(
                                            policy.id
                                        )}"
                                        data-policy-field="${safeValue(
                                            field.fieldName
                                        )}"
                                        value="${safeValue(
                                            field.fieldValue
                                        )}"
                                        ${
                                            isEditing
                                                ? ""
                                                : "disabled"
                                        }
                                    >

                                    <div class="field-meta">

                                        <span class="required-marker">
                                            ${
                                                missing
                                                    ? "Required information missing"
                                                    : "Required policy information"
                                            }
                                        </span>

                                        <span>
                                            Updated ${formatDate(
                                                field.lastUpdated
                                            )}
                                        </span>

                                    </div>

                                </div>
                            `;
                        })
                        .join("");

                return `
                    <section class="information-field-section incentive-policy-vault">

                        <div class="field-section-heading">

                            <span class="field-section-icon">
                                <i data-lucide="sparkles"></i>
                            </span>

                            <div>

                                <span class="vault-kicker">
                                    INCENTIVE POLICY VAULT
                                </span>

                                <h2>
                                    ${safeValue(
                                        policy.name
                                    )}
                                </h2>

                                <a
                                    class="portal-link"
                                    href="${safeValue(
                                        policy.officialSource
                                    )}"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Official portal ↗
                                </a>

                            </div>

                            <button
                                type="button"
                                class="remove-policy-vault"
                                data-remove-policy="${safeValue(
                                    policy.id
                                )}"
                                title="Remove policy from Information Vault"
                                aria-label="Remove ${safeValue(
                                    policy.name
                                )} from Information Vault"
                            >
                                <i data-lucide="trash-2"></i>
                            </button>

                        </div>

                        <div class="information-fields-grid">
                            ${fieldsMarkup}
                        </div>

                    </section>
                `;
            })
            .join("");

    /*
     * Policy field changes.
     */
    incentiveVaultSections
        .querySelectorAll(
            "[data-policy-field]"
        )
        .forEach(control => {
            control.addEventListener(
                "input",
                event => {
                    const policyVaults =
                        loadIncentiveVaults();

                    const policy =
                        policyVaults[
                            event.target.dataset
                                .policyId
                        ];

                    const field =
                        policy?.fields?.[
                            event.target.dataset
                                .policyField
                        ];

                    if (!field) {
                        return;
                    }

                    field.fieldValue =
                        event.target.value;

                    field.verificationStatus =
                        "Unverified";

                    field.lastUpdated =
                        now();

                    persistIncentiveVaults(
                        policyVaults
                    );

                    const wrapper =
                        event.target.closest(
                            ".information-field"
                        );

                    const missing =
                        !String(
                            field.fieldValue ||
                                ""
                        ).trim();

                    if (wrapper) {
                        wrapper.classList.toggle(
                            "missing-policy-field",
                            missing
                        );

                        const marker =
                            wrapper.querySelector(
                                ".required-marker"
                            );

                        if (marker) {
                            marker.textContent =
                                missing
                                    ? "Required information missing"
                                    : "Required policy information";
                        }

                        const badge =
                            wrapper.querySelector(
                                ".verification-badge"
                            );

                        if (badge) {
                            badge.textContent =
                                field.verificationStatus;

                            badge.className =
                                `verification-badge ${statusClass(
                                    field.verificationStatus
                                )}`;
                        }
                    }
                }
            );
        });

    /*
     * Remove policy.
     */
    incentiveVaultSections
        .querySelectorAll(
            "[data-remove-policy]"
        )
        .forEach(button => {
            button.addEventListener(
                "click",
                () => {
                    const policyVaults =
                        loadIncentiveVaults();

                    delete policyVaults[
                        button.dataset
                            .removePolicy
                    ];

                    persistIncentiveVaults(
                        policyVaults
                    );

                    renderIncentiveVaults();

                    setMessage(
                        "Incentive policy removed from the Information Vault."
                    );
                }
            );
        });

    if (window.lucide) {
        lucide.createIcons();
    }
}


// =====================================================
// DATE
// =====================================================

function formatDate(value) {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return "Unknown";
    }

    return new Intl.DateTimeFormat(
        "en-IN",
        {
            dateStyle: "medium"
        }
    ).format(date);
}


// =====================================================
// STATUS CLASS
// =====================================================

function statusClass(status) {
    return String(status || "")
        .toLowerCase()
        .replace(/\s+/g, "-");
}


// =====================================================
// RENDER INFORMATION FIELDS
// =====================================================

function renderFields() {
    if (!fieldSections) {
        return;
    }

    fieldSections.innerHTML =
        fieldGroups
            .map(group => {
                const fieldsMarkup =
                    group.fields
                        .map(
                            ([
                                key,
                                label,
                                type,
                                required,
                                hint
                            ]) => {
                                const record =
                                    records[key];

                                const requiredAttribute =
                                    required
                                        ? "required"
                                        : "";

                                const disabledAttribute =
                                    isEditing
                                        ? ""
                                        : "disabled";

                                const control =
                                    type === "textarea"
                                        ? `
                                            <textarea
                                                id="${key}"
                                                data-field-key="${key}"
                                                rows="3"
                                                ${requiredAttribute}
                                                ${disabledAttribute}
                                            >${safeValue(
                                                record.fieldValue
                                            )}</textarea>
                                        `
                                        : `
                                            <input
                                                id="${key}"
                                                data-field-key="${key}"
                                                type="${type}"
                                                value="${safeValue(
                                                    record.fieldValue
                                                )}"
                                                ${requiredAttribute}
                                                ${
                                                    type ===
                                                    "number"
                                                        ? 'min="0"'
                                                        : ""
                                                }
                                                ${disabledAttribute}
                                            >
                                        `;

                                return `
                                    <div
                                        class="information-field ${
                                            required
                                                ? "required-field"
                                                : ""
                                        }"
                                        data-field-wrapper="${key}"
                                    >

                                        <div class="field-label-row">

                                            <label for="${key}">
                                                ${label}

                                                ${
                                                    required
                                                        ? ' <span aria-hidden="true">*</span>'
                                                        : ""
                                                }
                                            </label>

                                            <span
                                                class="verification-badge ${statusClass(
                                                    record.verificationStatus
                                                )}"
                                            >
                                                ${record.verificationStatus}
                                            </span>

                                        </div>

                                        ${control}

                                        <div class="field-meta">

                                            <span>
                                                ${
                                                    hint ||
                                                    "Field value"
                                                }
                                            </span>

                                            <span>
                                                Updated ${formatDate(
                                                    record.lastUpdated
                                                )}
                                            </span>

                                        </div>

                                        <p
                                            class="field-error"
                                            id="${key}Error"
                                        ></p>

                                    </div>
                                `;
                            }
                        )
                        .join("");

                return `
                    <section
                        class="information-field-section"
                        aria-labelledby="${group.id}-title"
                    >

                        <div class="field-section-heading">

                            <span class="field-section-icon">
                                <i data-lucide="${group.icon}"></i>
                            </span>

                            <div>

                                <span class="vault-kicker">
                                    STRUCTURED FACTS
                                </span>

                                <h2 id="${group.id}-title">
                                    ${group.title}
                                </h2>

                            </div>

                        </div>

                        <div class="information-fields-grid">
                            ${fieldsMarkup}
                        </div>

                    </section>
                `;
            })
            .join("");

    if (window.lucide) {
        lucide.createIcons();
    }

    /*
     * Field changes.
     *
     * Important:
     * Typing changes the status back to Unverified.
     * Save Changes will verify the information.
     */
    fieldSections
        .querySelectorAll(
            "[data-field-key]"
        )
        .forEach(control => {
            control.addEventListener(
                "input",
                event => {
                    const key =
                        event.target.dataset
                            .fieldKey;

                    if (!records[key]) {
                        return;
                    }

                    records[key].fieldValue =
                        event.target.value;

                    records[key].lastUpdated =
                        now();

                    records[key].verificationStatus =
                        "Unverified";

                    /*
                     * Local save while typing.
                     * MongoDB is NOT updated here.
                     */
                    persist();

                    updateDashboard();
                }
            );
        });
}


// =====================================================
// LOCAL STORAGE
// =====================================================

function persist() {
    localStorage.setItem(
        storageKey,
        JSON.stringify(records)
    );
}


// =====================================================
// PUBLISH INFORMATION VAULT TO MONGODB
// =====================================================

async function publishVaultSnapshot() {
    try {
        const response =
            await fetch(
                `${window.APPROVAL_GUARD_URL}/api/information-vault/snapshot`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        records
                    })
                }
            );

        if (!response.ok) {
            throw new Error(
                `Information Vault API returned ${response.status}`
            );
        }

        return true;
    } catch (error) {
        console.error(
            "Information Vault could not be saved to the database:",
            error
        );

        return false;
    }
}


// =====================================================
// VERIFY INFORMATION VAULT ON SAVE
// =====================================================

function verifyInformationVaultRecords() {
    const errors = validate();

    /*
     * Only non-empty AND valid fields
     * become Verified.
     *
     * Empty fields remain Unverified.
     *
     * Invalid fields remain Unverified.
     */
    allFields.forEach(([key]) => {
        if (!records[key]) {
            return;
        }

        const value =
            String(
                records[key].fieldValue ?? ""
            ).trim();

        if (
            value &&
            !errors[key]
        ) {
            records[
                key
            ].verificationStatus =
                "Verified";

            records[
                key
            ].lastUpdated =
                now();
        } else {
            records[
                key
            ].verificationStatus =
                "Unverified";
        }
    });
}


// =====================================================
// SAVE INFORMATION VAULT
// =====================================================



async function saveInformationVault() {
    /*
     * First validate.
     */
    const errors =
        validate();

    /*
     * Show current validation state.
     */
    updateDashboard();

    /*
     * Do not save if required information
     * or validation is incorrect.
     */
    if (
        Object.keys(errors).length > 0
    ) {
        setMessage(
            "Please fix the highlighted errors before saving.",
            "error"
        );

        return;
    }

    const saveButton =
        document.getElementById(
            "saveInformationButton"
        );

    const saveButtonText =
        document.getElementById(
            "saveInformationButtonText"
        );

    if (!saveButton) {
        console.warn(
            "Save Information button was not found."
        );

        return;
    }

    const originalText =
        saveButtonText
            ? saveButtonText.textContent
            : "Save Changes";

    saveButton.disabled = true;

    saveButton.classList.add(
        "saving"
    );

    if (saveButtonText) {
        saveButtonText.textContent =
            "Saving...";
    }

    try {
        /*
         * =================================================
         * 1. VERIFY INFORMATION
         * =================================================
         *
         * Every non-empty and valid field becomes
         * Verified.
         *
         * Empty or invalid fields remain Unverified.
         */
        verifyInformationVaultRecords();

        /*
         * =================================================
         * 2. REFRESH FIELD UI
         * =================================================
         *
         * This is important.
         *
         * Without renderFields(), the underlying record
         * would become Verified but the old Unverified
         * badge could remain visible on screen.
         */
        renderFields();

        /*
         * =================================================
         * 3. REFRESH DASHBOARD
         * =================================================
         *
         * Updates:
         * - Verified Fields
         * - Progress
         * - Overall status
         * - Critical errors
         */
        updateDashboard();

        /*
         * =================================================
         * 4. SAVE LOCALLY
         * =================================================
         *
         * The verified state is persisted to localStorage.
         */
        persist();

        /*
         * =================================================
         * 5. SAVE TO MONGODB
         * =================================================
         *
         * The same verified records are sent to the
         * Information Vault API.
         */
        const saved =
            await publishVaultSnapshot();

        /*
         * If the database request failed, do not show
         * the success message.
         */
        if (!saved) {
            throw new Error(
                "MongoDB save request failed."
            );
        }

        /*
         * =================================================
         * 6. FINAL DASHBOARD REFRESH
         * =================================================
         */
        updateDashboard();

        /*
         * =================================================
         * 7. SUCCESS MESSAGE
         * =================================================
         */
        setMessage(
            "Information saved and verified successfully.",
            "success"
        );

        /*
         * Existing success popup.
         */
        showInformationSavePopup();

    } catch (error) {
        console.error(
            "Information Vault save failed:",
            error
        );

        setMessage(
            "Unable to save Information Vault. Please try again.",
            "error"
        );

    } finally {
        /*
         * =================================================
         * RESTORE SAVE BUTTON
         * =================================================
         */
        saveButton.disabled =
            false;

        saveButton.classList.remove(
            "saving"
        );

        if (saveButtonText) {
            saveButtonText.textContent =
                originalText;
        }
    }
}


// =====================================================
// GENERAL VAULT STATE
// =====================================================

function persistVaultState() {
    /*
     * Save locally.
     */
    persist();

    /*
     * Keep application tracking data
     * synchronized locally.
     */
    if (
        typeof saveApplications ===
            "function" &&
        typeof getAllApplications ===
            "function"
    ) {
        saveApplications(
            getAllApplications()
        );
    }
}


// =====================================================
// VALIDATION
// =====================================================

function validate() {
    const errors = {};

    const value =
        key =>
            String(
                records[key]?.fieldValue ||
                    ""
            ).trim();

    if (!value("business_name")) {
        errors.business_name =
            "Business name is required.";
    }

    if (!value("industry")) {
        errors.industry =
            "Industry is required.";
    }

    if (!value("gstin")) {
        errors.gstin =
            "GSTIN cannot be empty.";
    }

    if (!value("pan")) {
        errors.pan =
            "PAN cannot be empty.";
    }

    if (
        value("pin_code") &&
        !/^\d{6}$/.test(
            value("pin_code")
        )
    ) {
        errors.pin_code =
            "PIN code must contain 6 digits.";
    }

    if (
        value("phone_number") &&
        !/^\d{10}$/.test(
            value("phone_number")
        )
    ) {
        errors.phone_number =
            "Phone number must contain 10 digits.";
    }

    [
        "total_investment",
        "annual_turnover",
        "investment_in_machinery",
        "land_area",
        "current_employees",
        "expected_employees",
        "skilled_employees"
    ].forEach(key => {
        if (
            value(key) &&
            (
                !Number.isFinite(
                    Number(value(key))
                ) ||
                Number(value(key)) < 0
            )
        ) {
            const field =
                allFields.find(
                    field =>
                        field[0] === key
                );

            errors[key] =
                `${
                    field
                        ? field[1]
                        : key
                } must be a valid non-negative number.`;
        }
    });

    return errors;
}


// =====================================================
// UPDATE DASHBOARD
// =====================================================

function updateDashboard() {
    const errors =
        validate();

    const filledFields =
        allFields.filter(
            ([key]) =>
                String(
                    records[key]?.fieldValue ??
                        ""
                ).trim()
        );

    const total =
        allFields.length;

    const missingRequired =
        requiredKeys.some(
            key =>
                !String(
                    records[key]?.fieldValue ||
                        ""
                ).trim()
        );

    const validFilledFields =
        filledFields.filter(
            ([key]) =>
                !errors[key]
        ).length;

    /*
     * IMPORTANT:
     * This count is based ONLY on actual
     * verification status.
     */
    const verified =
        filledFields.filter(
            ([key]) =>
                records[key]
                    ?.verificationStatus ===
                "Verified"
        ).length;

    const progress =
        total
            ? Math.round(
                (validFilledFields /
                    total) *
                    100
            )
            : 0;

    let status =
        "NEEDS REVIEW";

    let reason =
        "Information is entered but not verified.";

    if (
        Object.keys(errors).length ||
        missingRequired
    ) {
        status =
            "INCOMPLETE";

        reason =
            Object.keys(errors).length
                ? "Resolve the highlighted validation errors."
                : "Complete all required fields.";
    } else if (
        filledFields.length > 0 &&
        verified === filledFields.length
    ) {
        status =
            "READY FOR ENGINE USE";

        reason =
            "All fields are verified and ready to reuse.";
    } else if (
        validFilledFields === total
    ) {
        status =
            "READY FOR VERIFICATION";

        reason =
            "All fields are complete and ready for verification.";
    }

    const overallStatus =
        document.getElementById(
            "overallStatus"
        );

    if (overallStatus) {
        overallStatus.textContent =
            status;

        overallStatus.className =
            `dashboard-status ${statusClass(
                status
            )}`;
    }

    const statusReason =
        document.getElementById(
            "statusReason"
        );

    if (statusReason) {
        statusReason.textContent =
            reason;
    }

    const progressValue =
        document.getElementById(
            "progressValue"
        );

    if (progressValue) {
        progressValue.textContent =
            `${progress}%`;
    }

    const progressBar =
        document.getElementById(
            "progressBar"
        );

    if (progressBar) {
        progressBar.style.width =
            `${progress}%`;
    }

    const totalFields =
        document.getElementById(
            "totalFields"
        );

    if (totalFields) {
        totalFields.textContent =
            total;
    }

    const verifiedFields =
        document.getElementById(
            "verifiedFields"
        );

    if (verifiedFields) {
        verifiedFields.textContent =
            verified;
    }

    const pendingFields =
        document.getElementById(
            "pendingFields"
        );

    if (pendingFields) {
        pendingFields.textContent =
            total -
            validFilledFields;
    }

    const criticalErrors =
        document.getElementById(
            "criticalErrors"
        );

    if (criticalErrors) {
        criticalErrors.textContent =
            Object.keys(errors).length;
    }

    Object.entries(
        errors
    ).forEach(
        ([key, message]) => {
            const error =
                document.getElementById(
                    `${key}Error`
                );

            if (error) {
                error.textContent =
                    message;
            }
        }
    );

    allFields.forEach(
        ([key]) => {
            const error =
                document.getElementById(
                    `${key}Error`
                );

            if (
                error &&
                !errors[key]
            ) {
                error.textContent =
                    "";
            }
        }
    );
}


// =====================================================
// MESSAGE
// =====================================================

function setMessage(
    message,
    type = "success"
) {
    const element =
        document.getElementById(
            "vaultMessage"
        );

    if (!element) {
        return;
    }

    element.textContent =
        message;

    element.className =
        `vault-action-message ${type}`;
}


// =====================================================
// SET VERIFICATION STATUS
// =====================================================

function setStatuses(status) {
    const errors =
        validate();

    allFields.forEach(
        ([key]) => {
            if (
                String(
                    records[key]?.fieldValue ||
                        ""
                ).trim() &&
                !errors[key]
            ) {
                records[
                    key
                ].verificationStatus =
                    status;

                records[
                    key
                ].lastUpdated =
                    now();
            } else if (
                errors[key]
            ) {
                records[
                    key
                ].verificationStatus =
                    "Unverified";
            }
        }
    );

    persistVaultState();

    renderFields();

    updateDashboard();

    let trackingApplications =
        getAllApplications();

    const statusColors = {
        APPROVED: "green",
        SUBMITTED: "blue",
        UNDER_REVIEW: "purple",
        DOCUMENT_REQUIRED: "yellow",
        DOCUMENT_PENDING: "yellow",
        QUERY_RAISED: "orange",
        REJECTED: "red",
        BLOCKED: "dark-red",
        NOT_STARTED: "gray",
        DRAFT: "gray",
        PAYMENT_PENDING: "blue",
        SITE_INSPECTION: "purple",
        RENEWAL_REQUIRED: "orange",
        EXPIRED: "red"
    };

    function displayStatus(status) {
        return String(
            status || ""
        ).replaceAll(
            "_",
            " "
        );
    }

    function renderTrackingFilters() {
        const fill =
            (id, values) => {
                const select =
                    document.getElementById(
                        id
                    );

                if (!select) {
                    return;
                }

                const selected =
                    select.value;

                while (
                    select.options.length >
                    1
                ) {
                    select.remove(1);
                }

                [
                    ...new Set(
                        values.filter(Boolean)
                    )
                ]
                    .sort()
                    .forEach(
                        value => {
                            select.insertAdjacentHTML(
                                "beforeend",
                                `
                                    <option value="${safeValue(
                                        value
                                    )}">
                                        ${safeValue(
                                            displayStatus(
                                                value
                                            )
                                        )}
                                    </option>
                                `
                            );
                        }
                    );

                if (
                    [
                        ...select.options
                    ].some(
                        option =>
                            option.value ===
                            selected
                    )
                ) {
                    select.value =
                        selected;
                }
            };

        if (
            typeof APPROVAL_STATUSES !==
            "undefined"
        ) {
            fill(
                "approvalStatusFilter",
                APPROVAL_STATUSES
            );
        }

        fill(
            "approvalDepartmentFilter",
            trackingApplications.map(
                item =>
                    item.department
            )
        );

        fill(
            "approvalLevelFilter",
            trackingApplications.map(
                item =>
                    item.level
            )
        );

        fill(
            "approvalActionFilter",
            trackingApplications.map(
                item =>
                    item.nextAction
            )
        );
    }

    function filteredApplications() {
        const searchElement =
            document.getElementById(
                "approvalSearch"
            );

        const statusElement =
            document.getElementById(
                "approvalStatusFilter"
            );

        const departmentElement =
            document.getElementById(
                "approvalDepartmentFilter"
            );

        const levelElement =
            document.getElementById(
                "approvalLevelFilter"
            );

        const actionElement =
            document.getElementById(
                "approvalActionFilter"
            );

        const sortElement =
            document.getElementById(
                "approvalSort"
            );

        const search =
            searchElement
                ? searchElement.value
                    .toLowerCase()
                : "";

        const status =
            statusElement
                ? statusElement.value
                : "";

        const department =
            departmentElement
                ? departmentElement.value
                : "";

        const level =
            levelElement
                ? levelElement.value
                : "";

        const action =
            actionElement
                ? actionElement.value
                : "";

        const sort =
            sortElement
                ? sortElement.value
                : "lastCheckedAt";

        return trackingApplications
            .filter(
                item =>
                    (
                        !search ||
                        `${item.approvalName} ${item.applicationNumber}`
                            .toLowerCase()
                            .includes(search)
                    ) &&
                    (
                        !status ||
                        item.currentStatus ===
                            status
                    ) &&
                    (
                        !department ||
                        item.department ===
                            department
                    ) &&
                    (
                        !level ||
                        item.level ===
                            level
                    ) &&
                    (
                        !action ||
                        item.nextAction ===
                            action
                    )
            )
            .sort(
                (a, b) =>
                    new Date(
                        b[sort] ||
                            "9999-12-31"
                    ) -
                    new Date(
                        a[sort] ||
                            "9999-12-31"
                    )
            );
    }

    function renderTracking() {
        trackingApplications =
            applyDependencyBlocking(
                getAllApplications()
            );

        saveApplications(
            trackingApplications
        );

        const total =
            trackingApplications.length;

        const count =
            status =>
                trackingApplications.filter(
                    item =>
                        item.currentStatus ===
                        status
                ).length;

        const trackingTotal =
            document.getElementById(
                "trackingTotal"
            );

        if (trackingTotal) {
            trackingTotal.textContent =
                total;
        }

        const trackingApproved =
            document.getElementById(
                "trackingApproved"
            );

        if (trackingApproved) {
            trackingApproved.textContent =
                count("APPROVED");
        }

        const trackingReview =
            document.getElementById(
                "trackingReview"
            );

        if (trackingReview) {
            trackingReview.textContent =
                count(
                    "UNDER_REVIEW"
                );
        }

        const trackingDocuments =
            document.getElementById(
                "trackingDocuments"
            );

        if (trackingDocuments) {
            trackingDocuments.textContent =
                count(
                    "DOCUMENT_REQUIRED"
                ) +
                count(
                    "DOCUMENT_PENDING"
                );
        }

        const trackingBlocked =
            document.getElementById(
                "trackingBlocked"
            );

        if (trackingBlocked) {
            trackingBlocked.textContent =
                count("BLOCKED");
        }

        const trackingRenewals =
            document.getElementById(
                "trackingRenewals"
            );

        if (trackingRenewals) {
            trackingRenewals.textContent =
                count(
                    "RENEWAL_REQUIRED"
                );
        }

        const progress =
            total
                ? Math.round(
                    (count(
                        "APPROVED"
                    ) /
                        total) *
                        100
                )
                : 0;

        const trackingProgress =
            document.getElementById(
                "trackingProgress"
            );

        if (trackingProgress) {
            trackingProgress.textContent =
                `${progress}%`;
        }

        const trackingProgressBar =
            document.getElementById(
                "trackingProgressBar"
            );

        if (trackingProgressBar) {
            trackingProgressBar.style.width =
                `${progress}%`;
        }

        const approvalCards =
            document.getElementById(
                "approvalCards"
            );

        if (!approvalCards) {
            return;
        }

        approvalCards.innerHTML =
            filteredApplications()
                .map(
                    application => {
                        const dependency =
                            getDependencyState(
                                application,
                                trackingApplications
                            );

                        const dependencyText =
                            dependency
                                .incomplete
                                .length
                                ? `Blocked by: ${dependency.incomplete
                                    .map(
                                        item =>
                                            item.approvalName
                                    )
                                    .join(
                                        ", "
                                    )}`
                                : "All prerequisites approved";

                        return `
                            <article class="approval-card">

                                <div class="approval-card-header">

                                    <div>

                                        <span class="demo-badge">
                                            DEMO MODE
                                        </span>

                                        <h3>
                                            ${safeValue(
                                                application.approvalName
                                            )}
                                        </h3>

                                        <p>
                                            ${safeValue(
                                                application.department
                                            )}
                                        </p>

                                    </div>

                                    <span
                                        class="approval-status-badge ${
                                            statusColors[
                                                application.currentStatus
                                            ] ||
                                            "gray"
                                        }"
                                    >
                                        ${displayStatus(
                                            application.currentStatus
                                        )}
                                    </span>

                                </div>

                                <div class="approval-card-grid">

                                    <span>
                                        <b>Application</b>
                                        ${safeValue(
                                            application.applicationNumber
                                        )}
                                    </span>

                                    <span>
                                        <b>Submitted</b>
                                        ${safeValue(
                                            application.submittedDate
                                        )}
                                    </span>

                                    <span>
                                        <b>Last checked</b>
                                        ${new Date(
                                            application.lastCheckedAt
                                        ).toLocaleString(
                                            "en-IN"
                                        )}
                                    </span>

                                    <span>
                                        <b>Next action</b>
                                        ${safeValue(
                                            application.nextAction
                                        )}
                                    </span>

                                </div>

                                <div
                                    class="approval-dependency ${
                                        dependency.blocked
                                            ? "blocked"
                                            : ""
                                    }"
                                >

                                    <i
                                        data-lucide="${
                                            dependency.blocked
                                                ? "lock-keyhole"
                                                : "check-circle-2"
                                        }"
                                    ></i>

                                    ${safeValue(
                                        dependencyText
                                    )}

                                </div>

                                <div class="approval-card-actions">

                                    <button
                                        class="secondary-btn tracking-action"
                                        data-action="details"
                                        data-id="${application.approvalId}"
                                    >
                                        View Timeline
                                    </button>

                                    <button
                                        class="secondary-btn tracking-action"
                                        data-action="simulate"
                                        data-id="${application.approvalId}"
                                    >
                                        Simulate Status Update
                                    </button>

                                    <button
                                        class="secondary-btn tracking-action"
                                        data-action="remark"
                                        data-id="${application.approvalId}"
                                    >
                                        Add Remark
                                    </button>

                                </div>

                            </article>
                        `;
                    }
                )
                .join("") ||
            `
                <div class="tracking-empty">

                    <i data-lucide="search-x"></i>

                    <strong>
                        No approvals match these filters.
                    </strong>

                    <span>
                        Try clearing a filter or search term.
                    </span>

                </div>
            `;

        document
            .querySelectorAll(
                ".tracking-action"
            )
            .forEach(
                button =>
                    button.addEventListener(
                        "click",
                        () =>
                            trackingAction(
                                button.dataset
                                    .action,
                                button.dataset
                                    .id
                            )
                    )
            );

        if (window.lucide) {
            lucide.createIcons();
        }

        renderNotifications();
    }

    function showTrackingToast(
        message,
        error = false
    ) {
        const toast =
            document.getElementById(
                "trackingToast"
            );

        if (!toast) {
            return;
        }

        toast.textContent =
            message;

        toast.className =
            `tracking-toast visible ${
                error ? "error" : ""
            }`;

        window.setTimeout(
            () =>
                toast.classList.remove(
                    "visible"
                ),
            3500
        );
    }

    function ensureTrackingModal() {
        if (
            document.getElementById(
                "approvalDetailsModal"
            )
        ) {
            return;
        }

        document.body.insertAdjacentHTML(
            "beforeend",
            `
                <div
                    id="approvalDetailsModal"
                    class="approval-modal"
                    hidden
                >

                    <div class="approval-modal-card">

                        <button
                            class="modal-close"
                            id="closeApprovalModal"
                        >
                            ×
                        </button>

                        <div id="approvalDetails"></div>

                    </div>

                </div>
            `
        );

        document
            .getElementById(
                "closeApprovalModal"
            )
            .addEventListener(
                "click",
                () => {
                    document.getElementById(
                        "approvalDetailsModal"
                    ).hidden = true;
                }
            );
    }

    function showDetails(id) {
        const application =
            getApplicationById(id);

        if (!application) {
            return;
        }

        ensureTrackingModal();

        const timeline =
            getApplicationTimeline(id);

        document.getElementById(
            "approvalDetails"
        ).innerHTML = `
            <span class="demo-badge">
                DEMO MODE · SIMULATED STATUS SOURCE
            </span>

            <h2>
                ${safeValue(
                    application.approvalName
                )}
            </h2>

            <p class="modal-subtitle">
                ${safeValue(
                    application.department
                )}
                ·
                ${safeValue(
                    application.applicationNumber
                )}
            </p>

            <div class="modal-detail-grid">

                <span>
                    <b>Business</b>
                    ${safeValue(
                        application.businessName
                    )}
                </span>

                <span>
                    <b>Portal</b>

                    <a
                        href="${safeValue(
                            application.portalUrl
                        )}"
                        target="_blank"
                        rel="noreferrer"
                    >
                        ${safeValue(
                            application.portalName
                        )}
                    </a>
                </span>

                <span>
                    <b>Current status</b>
                    ${displayStatus(
                        application.currentStatus
                    )}
                </span>

                <span>
                    <b>Previous status</b>
                    ${displayStatus(
                        application.previousStatus
                    )}
                </span>

                <span>
                    <b>Submitted</b>
                    ${safeValue(
                        application.submittedDate
                    )}
                </span>

                <span>
                    <b>Due date</b>
                    ${safeValue(
                        application.dueDate
                    )}
                </span>

                <span>
                    <b>Next action</b>
                    ${safeValue(
                        application.nextAction
                    )}
                </span>

                <span>
                    <b>Remarks</b>
                    ${safeValue(
                        application.remarks ||
                            "No remarks"
                    )}
                </span>

            </div>

            <div class="modal-actions">

                <button
                    class="primary-btn tracking-modal-action"
                    data-action="check"
                    data-id="${id}"
                >
                    Check Status
                </button>

                <button
                    class="secondary-btn tracking-modal-action"
                    data-action="simulate"
                    data-id="${id}"
                >
                    Simulate Status Update
                </button>

                <button
                    class="secondary-btn tracking-modal-action"
                    data-action="upload"
                    data-id="${id}"
                >
                    Upload Demo Document
                </button>

                <button
                    class="secondary-btn tracking-modal-action"
                    data-action="remark"
                    data-id="${id}"
                >
                    Add Remark
                </button>

                <button
                    class="secondary-btn tracking-modal-action"
                    data-action="renew"
                    data-id="${id}"
                >
                    Mark as Renewal Required
                </button>

            </div>

            <h3 class="timeline-title">
                Status timeline
            </h3>

            <div class="status-timeline">

                ${timeline
                    .map(
                        event => `
                            <div class="timeline-event">

                                <span></span>

                                <div>

                                    <b>
                                        ${displayStatus(
                                            event.oldStatus
                                        )}
                                        →
                                        ${displayStatus(
                                            event.newStatus
                                        )}
                                    </b>

                                    <p>
                                        ${safeValue(
                                            event.message
                                        )}
                                    </p>

                                    <small>
                                        ${new Date(
                                            event.eventDate
                                        ).toLocaleString(
                                            "en-IN"
                                        )}
                                        ·
                                        ${safeValue(
                                            event.changedBy
                                        )}
                                        ·
                                        ${safeValue(
                                            event.source
                                        )}
                                    </small>

                                </div>

                            </div>
                        `
                    )
                    .join("")}

            </div>
        `;

        document
            .querySelectorAll(
                ".tracking-modal-action"
            )
            .forEach(
                button =>
                    button.addEventListener(
                        "click",
                        () =>
                            trackingAction(
                                button.dataset
                                    .action,
                                button.dataset
                                    .id
                            )
                    )
            );

        const modal =
            document.getElementById(
                "approvalDetailsModal"
            );

        if (modal) {
            modal.hidden = false;
        }

        if (window.lucide) {
            lucide.createIcons();
        }
    }

    function trackingAction(
        action,
        id
    ) {
        try {
            const application =
                getApplicationById(id);

            if (!application) {
                throw new Error(
                    "Application not found."
                );
            }

            if (action === "details") {
                return showDetails(id);
            }

            if (action === "simulate") {
                simulateStatusUpdate(id);
            }

            if (action === "upload") {
                if (
                    !Array.isArray(
                        application.documentsSubmitted
                    )
                ) {
                    application.documentsSubmitted =
                        [];
                }

                if (
                    !application.documentsSubmitted.includes(
                        "Fire-safety demo document"
                    )
                ) {
                    application.documentsSubmitted.push(
                        "Fire-safety demo document"
                    );
                }

                updateApplicationStatus(
                    id,
                    "UNDER_REVIEW",
                    "Additional document uploaded for review."
                );
            }

            if (action === "check") {
                updateApplication(
                    id,
                    {}
                );

                addApplicationNotification(
                    application,
                    `${application.approvalName} status checked.`
                );
            }

            if (action === "remark") {
                const remark =
                    window.prompt(
                        "Add a remark",
                        application.remarks ||
                            ""
                    );

                if (remark !== null) {
                    updateApplication(
                        id,
                        {
                            remarks:
                                remark
                        }
                    );
                }
            }

            if (action === "renew") {
                updateApplicationStatus(
                    id,
                    "RENEWAL_REQUIRED",
                    "Renewal window marked for attention."
                );
            }

            renderTracking();

            showTrackingToast(
                `${application.approvalName} updated.`
            );

            if (
                document.getElementById(
                    "approvalDetailsModal"
                )
            ) {
                showDetails(id);
            }
        } catch (error) {
            showTrackingToast(
                error.message,
                true
            );
        }
    }

    function renderNotifications() {
        const notifications =
            getApplicationNotifications();

        const unread =
            notifications.filter(
                item => !item.read
            ).length;

        const notificationCount =
            document.getElementById(
                "notificationCount"
            );

        if (notificationCount) {
            notificationCount.textContent =
                unread;
        }

        const notificationList =
            document.getElementById(
                "notificationList"
            );

        if (!notificationList) {
            return;
        }

        notificationList.innerHTML =
            notifications.length
                ? notifications
                    .map(
                        item =>
                            `
                                <div
                                    class="notification-item ${
                                        item.read
                                            ? "read"
                                            : ""
                                    }"
                                >

                                    <div>

                                        <b>
                                            ${safeValue(
                                                item.approvalName
                                            )}
                                        </b>

                                        <p>
                                            ${safeValue(
                                                item.message
                                            )}
                                        </p>

                                        <small>
                                            ${new Date(
                                                item.date
                                            ).toLocaleString(
                                                "en-IN"
                                            )}
                                        </small>

                                    </div>

                                    ${
                                        item.read
                                            ? ""
                                            : `
                                                <button
                                                    class="mark-read"
                                                    data-notification-id="${item.id}"
                                                >
                                                    Mark as read
                                                </button>
                                            `
                                    }

                                </div>
                            `
                    )
                    .join("")
                : `
                    <p class="tracking-empty">
                        No notifications yet.
                    </p>
                `;

        document
            .querySelectorAll(
                ".mark-read"
            )
            .forEach(
                button =>
                    button.addEventListener(
                        "click",
                        () => {
                            markNotificationAsRead(
                                button.dataset
                                    .notificationId
                            );

                            renderNotifications();
                        }
                    )
            );
    }

    renderTrackingFilters();

    renderTracking();

    [
        "approvalSearch",
        "approvalStatusFilter",
        "approvalDepartmentFilter",
        "approvalLevelFilter",
        "approvalActionFilter",
        "approvalSort"
    ].forEach(id => {
        const element =
            document.getElementById(
                id
            );

        if (element) {
            element.addEventListener(
                "input",
                renderTracking
            );
        }
    });

    const notificationButton =
        document.getElementById(
            "notificationButton"
        );

    if (notificationButton) {
        notificationButton.addEventListener(
            "click",
            () => {
                const panel =
                    document.getElementById(
                        "notificationPanel"
                    );

                if (!panel) {
                    return;
                }

                panel.hidden =
                    !panel.hidden;

                renderNotifications();
            }
        );
    }

    const closeNotifications =
        document.getElementById(
            "closeNotifications"
        );

    if (closeNotifications) {
        closeNotifications.addEventListener(
            "click",
            () => {
                const panel =
                    document.getElementById(
                        "notificationPanel"
                    );

                if (panel) {
                    panel.hidden = true;
                }
            }
        );
    }
}


// =====================================================
// EDIT BUTTON
// =====================================================

const editButton =
    document.getElementById(
        "editButton"
    );

if (editButton) {
    editButton.addEventListener(
        "click",
        () => {
            isEditing =
                !isEditing;

            editButton.innerHTML =
                isEditing
                    ? '<i data-lucide="lock-open"></i> Editing'
                    : '<i data-lucide="pencil"></i> Edit';

            renderFields();

            setMessage(
                isEditing
                    ? "Fields are editable. Changes are saved locally as you work."
                    : "Editing locked. Review the current structured facts."
            );

            if (window.lucide) {
                lucide.createIcons();
            }
        }
    );
}


// =====================================================
// SAVE INFORMATION BUTTON
// =====================================================

const saveInformationButton =
    document.getElementById(
        "saveInformationButton"
    );

if (saveInformationButton) {
    saveInformationButton.addEventListener(
        "click",
        saveInformationVault
    );
}


// =====================================================
// SAVE DRAFT PDF
// =====================================================

const saveDraftButton =
    document.getElementById(
        "saveDraftButton"
    );

if (saveDraftButton) {
    saveDraftButton.addEventListener(
        "click",
        () => {
            persistVaultState();

            if (
                !window.jspdf?.jsPDF
            ) {
                setMessage(
                    "Draft saved, but PDF generation is unavailable. Check your internet connection and try again.",
                    "error"
                );

                return;
            }

            const documentPdf =
                new window.jspdf.jsPDF();

            const margin = 16;

            const pageWidth =
                documentPdf.internal
                    .pageSize
                    .getWidth();

            const pageHeight =
                documentPdf.internal
                    .pageSize
                    .getHeight();

            let y = 18;

            documentPdf.setFontSize(
                16
            );

            documentPdf.text(
                "Information Vault Draft",
                margin,
                y
            );

            y += 8;

            documentPdf.setFontSize(
                9
            );

            documentPdf.setTextColor(
                90,
                110,
                130
            );

            documentPdf.text(
                `Generated ${new Date().toLocaleString(
                    "en-IN"
                )}`,
                margin,
                y
            );

            y += 10;

            documentPdf.setTextColor(
                29,
                51,
                77
            );

            allFields.forEach(
                ([key, label]) => {
                    const value =
                        String(
                            records[key]
                                ?.fieldValue ||
                                "Not entered"
                        );

                    const lines =
                        documentPdf
                            .splitTextToSize(
                                `${label}: ${value}`,
                                pageWidth -
                                    margin *
                                        2
                            );

                    if (
                        y +
                            lines.length *
                                5 >
                        pageHeight -
                            margin
                    ) {
                        documentPdf.addPage();

                        y = margin;
                    }

                    documentPdf.text(
                        lines,
                        margin,
                        y
                    );

                    y +=
                        lines.length *
                            5 +
                        2;
                }
            );

            documentPdf.save(
                "information-vault-draft.pdf"
            );

            setMessage(
                `Information Vault draft saved as PDF at ${new Date().toLocaleTimeString(
                    "en-IN"
                )}.`
            );
        }
    );
}


// =====================================================
// FORM SUBMIT
// =====================================================

if (form) {
    form.addEventListener(
        "submit",
        event => {
            event.preventDefault();
        }
    );
}


// =====================================================
// BEFORE UNLOAD
// =====================================================

window.addEventListener(
    "beforeunload",
    persistVaultState
);


// =====================================================
// INITIALIZE INFORMATION VAULT
// =====================================================

async function initializeVault() {
    /*
     * Load latest Business Profile data.
     */
    await syncBusinessProfile();

    /*
     * Render page.
     */
    renderIncentiveVaults();

    renderFields();

    updateDashboard();
}

initializeVault();


// =====================================================
// SUCCESS POPUP
// =====================================================

function showInformationSavePopup() {
    const popup =
        document.getElementById(
            "saveSuccessPopup"
        );

    if (!popup) {
        return;
    }

    popup.classList.add(
        "show"
    );

    if (window.lucide) {
        lucide.createIcons();
    }

    clearTimeout(
        window.informationVaultPopupTimer
    );

    window.informationVaultPopupTimer =
        setTimeout(
            () => {
                popup.classList.remove(
                    "show"
                );
            },
            3000
        );
}