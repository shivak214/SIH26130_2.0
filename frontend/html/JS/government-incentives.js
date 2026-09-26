const informationVaultKey =
    "approvalguard.information-vault.business.v3";

const opportunitiesKey =
    "approvalguard.opportunities";

const incentiveVaultKey =
    "approvalguard.information-vault.incentives.v1";

const calculatedIncentivesKey =
    "approvalguard.incentives.calculated.v1";


// =====================================================
// INCENTIVE POLICIES
// =====================================================
//
// IMPORTANT:
// These are deterministic SCREENING / RELEVANCE rules.
// They are not a replacement for the official scheme
// eligibility rules.
//
// Every policy's weights total exactly 100.
// =====================================================

const incentivePolicies = [

    // =================================================
    // 1. MIISP 2025
    // =================================================

    {
        id: "miisp-2025",

        name:
            "Maharashtra Industries, Investment and Services Policy 2025",

        scope:
            "Maharashtra · industrial investment",

        icon:
            "landmark",

        description:
            "State framework for eligible industrial investment, manufacturing growth and project support in Maharashtra.",

        benefits: [
            "State fiscal incentives",
            "Investment and employment support",
            "Zone and project conditions apply"
        ],

        officialSource:
            "https://maitri.maharashtra.gov.in/",

        evidence: [
            {
                key: "industrySector",
                label: "Pharmaceutical industry sector",
                weight: 25,
                critical: true,
                type: "pharmaIndustry"
            },

            {
                key: "state",
                label: "Maharashtra location",
                weight: 20,
                critical: true,
                type: "maharashtraState"
            },

            {
                key: "businessType",
                label: "Business type provided",
                weight: 10,
                critical: true,
                type: "provided"
            },

            {
                key: "businessStage",
                label: "New or expanding business stage",
                weight: 10,
                critical: true,
                type: "newOrExpanding"
            },

            {
                key: "district",
                label: "District information provided",
                weight: 10,
                critical: false,
                type: "provided"
            },

            {
                key: "locationZone",
                label: "Location zone information provided",
                weight: 10,
                critical: false,
                type: "provided"
            },

            {
                key: "totalProjectInvestment",
                label: "Project investment information",
                weight: 15,
                critical: false,
                type: "positiveNumber"
            }
        ],

        docs: [
            "Application Form",
            "CA Certificate",
            "Sales Invoices",
            "GST Returns",
            "Employment Records"
        ]
    },


    // =================================================
    // 2. INDUSTRIAL PROMOTION SUBSIDY
    // =================================================

    {
        id: "industrial-promotion-subsidy",

        name:
            "Industrial Promotion Subsidy",

        scope:
            "Maharashtra · subsidy",

        icon:
            "flask-conical",

        description:
            "Potential subsidy and reimbursement support for qualifying industrial units.",

        benefits: [
            "SGST reimbursement",
            "MSME and large-unit support may apply",
            "Location, project and policy conditions apply"
        ],

        officialSource:
            "https://maitri.maharashtra.gov.in/",

        evidence: [
            {
                key: "industrySector",
                label: "Pharmaceutical industry sector",
                weight: 25,
                critical: true,
                type: "pharmaIndustry"
            },

            {
                key: "state",
                label: "Maharashtra location",
                weight: 20,
                critical: true,
                type: "maharashtraState"
            },

            {
                key: "locationZone",
                label: "Location zone information provided",
                weight: 15,
                critical: true,
                type: "provided"
            },

            {
                key: "totalProjectInvestment",
                label: "Project investment information",
                weight: 20,
                critical: true,
                type: "positiveNumber"
            },

            {
                key: "employmentCount",
                label: "Employment information",
                weight: 20,
                critical: false,
                type: "positiveNumber"
            }
        ],

        docs: [
            "Application Form",
            "CA Certificate",
            "Sales Invoices",
            "GST Returns",
            "Employment Records"
        ]
    },


    // =================================================
    // 3. PRODUCTION LINKED INCENTIVE
    // =================================================

    {
        id: "production-linked-incentive-support",

        name:
            "Production Linked Incentive Support",

        scope:
            "India · pharmaceutical production",

        icon:
            "factory",

        description:
            "Production-linked support screening for eligible pharmaceutical products, investment and production activity.",

        benefits: [
            "Production-linked incentive",
            "Product and investment thresholds apply",
            "Scheme window and approval conditions apply"
        ],

        officialSource:
            "https://pharmaceuticals.gov.in/",

        evidence: [
            {
                key: "industrySector",
                label: "Pharmaceutical industry sector",
                weight: 30,
                critical: true,
                type: "pharmaIndustry"
            },

            {
                key: "businessType",
                label: "Business type provided",
                weight: 15,
                critical: true,
                type: "provided"
            },

            {
                key: "businessStage",
                label: "Operating or commissioning stage",
                weight: 15,
                critical: true,
                type: "operatingOrCommissioning"
            },

            {
                key: "totalProjectInvestment",
                label: "Project investment information",
                weight: 20,
                critical: true,
                type: "positiveNumber"
            },

            {
                key: "annualTurnover",
                label: "Annual turnover information",
                weight: 10,
                critical: false,
                type: "positiveNumber"
            },

            {
                key: "productionCapacity",
                label: "Production capacity information",
                weight: 10,
                critical: false,
                type: "positiveNumber"
            }
        ],

        docs: [
            "Application Form",
            "Product and production plan",
            "CA-certified investment statement",
            "Sales and GST records"
        ]
    },


    // =================================================
    // 4. R&D / TECHNOLOGY TRANSFER
    // =================================================

    {
        id: "rnd-technology-transfer-support",

        name:
            "R&D and Technology Transfer Support",

        scope:
            "Maharashtra · innovation",

        icon:
            "lightbulb",

        description:
            "Support screening for pharmaceutical research, technology acquisition and intellectual-property activity.",

        benefits: [
            "R&D expenditure or technology support",
            "Patent and IPR activity support may apply",
            "Institution, filing and cost conditions apply"
        ],

        officialSource:
            "https://industry.maharashtra.gov.in/",

        evidence: [
            {
                key: "industrySector",
                label: "Pharmaceutical or biotechnology sector",
                weight: 25,
                critical: true,
                type: "pharmaIndustry"
            },

            {
                key: "businessType",
                label: "Business type provided",
                weight: 10,
                critical: true,
                type: "provided"
            },

            {
                key: "rndActivity",
                label: "R&D or technology-transfer activity",
                weight: 35,
                critical: true,
                type: "rndActivity"
            },

            {
                key: "plantMachineryInvestment",
                label: "Plant and machinery investment information",
                weight: 20,
                critical: false,
                type: "positiveNumber"
            },

            {
                key: "state",
                label: "Maharashtra location",
                weight: 10,
                critical: true,
                type: "maharashtraState"
            }
        ],

        docs: [
            "R&D plan and technical documents",
            "Patent filing/registration receipts",
            "Technology-transfer agreement",
            "Invoices and audited expenditure statement"
        ]
    },


    // =================================================
    // 5. EMPLOYMENT / EPF
    // =================================================

    {
        id: "employment-epf-support",

        name:
            "Employment and EPF Support",

        scope:
            "Maharashtra · employment",

        icon:
            "users",

        description:
            "Potential support screening for employment generation and employer EPF contribution activity.",

        benefits: [
            "Employment generation support",
            "EPF contribution assistance",
            "Employee and registration conditions apply"
        ],

        officialSource:
            "https://maitri.maharashtra.gov.in/",

        evidence: [
            {
                key: "industrySector",
                label: "Pharmaceutical industry sector",
                weight: 25,
                critical: true,
                type: "pharmaIndustry"
            },

            {
                key: "businessType",
                label: "Business type provided",
                weight: 15,
                critical: true,
                type: "provided"
            },

            {
                key: "employmentCount",
                label: "Employment information",
                weight: 25,
                critical: true,
                type: "positiveNumber"
            },

            {
                key: "epfRegistration",
                label: "EPF registration",
                weight: 20,
                critical: true,
                type: "epfRegistered"
            },

            {
                key: "businessStage",
                label: "Operating business stage",
                weight: 15,
                critical: false,
                type: "operating"
            }
        ],

        docs: [
            "EPF registration",
            "Employment records",
            "Payroll and contribution statements",
            "Application Form",
            "CA Certificate"
        ]
    }
];


// =====================================================
// BASIC HELPERS
// =====================================================

function escapeHtml(value) {

    return String(value ?? "").replace(
        /[&<>"']/g,
        character => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            "\"": "&quot;",
            "'": "&#039;"
        }[character])
    );
}


// =====================================================
// INFORMATION VAULT
// =====================================================

function readVaultRecords() {

    try {

        const records =
            JSON.parse(
                localStorage.getItem(
                    informationVaultKey
                ) || "{}"
            );

        return Object.values(records).filter(
            record =>
                record &&
                record.fieldName
        );

    } catch (error) {

        console.warn(
            "Information Vault data could not be loaded.",
            error
        );

        return [];
    }
}


// =====================================================
// FIELD ALIASES
// =====================================================

const vaultAliases = {

    industrySector: [
        "industry",
        "industrySector"
    ],

    businessType: [
        "business_type",
        "businessType"
    ],

    businessStage: [
        "business_stage",
        "businessStage"
    ],

    state: [
        "state"
    ],

    district: [
        "district"
    ],

    locationZone: [
        "location_zone",
        "locationZone",
        "zone"
    ],

    totalProjectInvestment: [
        "total_investment",
        "totalProjectInvestment"
    ],

    plantMachineryInvestment: [
        "investment_in_machinery",
        "plantMachineryInvestment"
    ],

    employmentCount: [
        "current_employees",
        "expected_employees",
        "employmentCount"
    ],

    annualTurnover: [
        "annual_turnover",
        "annualTurnover"
    ],

    productionCapacity: [
        "production_capacity",
        "productionCapacity"
    ],

    rndActivity: [
        "business_description",
        "rnd_activity",
        "rndActivity"
    ],

    epfRegistration: [
        "epf_registration",
        "epfRegistration"
    ]
};


// =====================================================
// FIND RECORD
// =====================================================

function findRecord(
    records,
    keys
) {

    return records.find(
        record =>
            keys.includes(
                record.fieldName
            ) &&
            String(
                record.fieldValue ?? ""
            ).trim() !== ""
    );
}


// =====================================================
// LOAD VERIFIED FACTS
// =====================================================
//
// IMPORTANT:
//
// The scoring engine uses ONLY records whose
// verificationStatus is exactly "Verified".
//
// Unverified information is retained only so
// the UI can explain that verification is required.
// =====================================================

function loadVaultFacts() {

    const records =
        readVaultRecords();

    const enteredRecords =
        records.filter(
            record =>
                String(
                    record.fieldValue ?? ""
                ).trim() !== ""
        );

    const verifiedRecords =
        enteredRecords.filter(
            record =>
                record.verificationStatus ===
                "Verified"
        );

    const unverifiedRecords =
        enteredRecords.filter(
            record =>
                record.verificationStatus !==
                "Verified"
        );

    const values = {};

    const verifiedKeys =
        new Set();

    const unverifiedKeys =
        new Set();

    Object.entries(
        vaultAliases
    ).forEach(
        ([canonical, keys]) => {

            const verifiedRecord =
                findRecord(
                    verifiedRecords,
                    keys
                );

            const unverifiedRecord =
                findRecord(
                    unverifiedRecords,
                    keys
                );

            if (verifiedRecord) {

                values[canonical] =
                    String(
                        verifiedRecord.fieldValue
                    ).trim();

                verifiedKeys.add(
                    canonical
                );

            } else if (unverifiedRecord) {

                unverifiedKeys.add(
                    canonical
                );
            }
        }
    );

    return {

        ...values,

        records,

        verifiedKeys,

        unverifiedKeys,

        verifiedCount:
            verifiedRecords.length,

        totalCount:
            enteredRecords.length,

        unverifiedCount:
            unverifiedRecords.length
    };
}


// =====================================================
// NORMALIZE TEXT
// =====================================================

function normalizeText(value) {

    return String(
        value ?? ""
    )
        .trim()
        .toLowerCase()
        .replace(
            /\s+/g,
            " "
        );
}


// =====================================================
// PARSE NUMBERS
// =====================================================
//
// Supports values such as:
//
// 5000000
// 5,000,000
// ₹50,00,000
// 5 lakh
// 5 crore
// 5 cr
// =====================================================

function parseNumber(value) {

    if (
        value === undefined ||
        value === null
    ) {
        return NaN;
    }

    let text =
        String(value)
            .trim()
            .toLowerCase()
            .replace(/₹/g, "")
            .replace(/,/g, "")
            .trim();

    if (!text) {
        return NaN;
    }

    const numericMatch =
        text.match(
            /-?\d+(?:\.\d+)?/
        );

    if (!numericMatch) {
        return NaN;
    }

    const number =
        Number(
            numericMatch[0]
        );

    if (!Number.isFinite(number)) {
        return NaN;
    }

    if (
        /\b(crore|crores|cr)\b/.test(text)
    ) {
        return number * 10000000;
    }

    if (
        /\b(lakh|lakhs|lac|lacs)\b/.test(text)
    ) {
        return number * 100000;
    }

    if (
        /\b(k)\b/.test(text)
    ) {
        return number * 1000;
    }

    return number;
}


// =====================================================
// CONDITION EVALUATORS
// =====================================================

function evaluateCondition(
    condition,
    facts
) {

    const key =
        condition.key;

    const value =
        facts[key];

    /*
     * If the canonical value is not available
     * from a VERIFIED record, do not score it.
     */
    if (
        value === undefined ||
        value === null ||
        String(value).trim() === ""
    ) {

        if (
            facts.unverifiedKeys.has(key)
        ) {

            return {
                status: "UNVERIFIED"
            };
        }

        return {
            status: "MISSING"
        };
    }

    const normalized =
        normalizeText(value);


    // -------------------------------------------------
    // Pharmaceutical / biotechnology industry
    // -------------------------------------------------

    if (
        condition.type ===
        "pharmaIndustry"
    ) {

        const matched =
            /(^|\s)(pharma|pharmaceutical|pharmaceuticals)(\s|$)/
                .test(normalized) ||

            /biotech|biotechnology/.test(
                normalized
            ) ||

            /life sciences?/.test(
                normalized
            ) ||

            /active pharmaceutical ingredient/.test(
                normalized
            ) ||

            /formulation/.test(
                normalized
            ) ||

            normalized === "api";

        return {
            status:
                matched
                    ? "MATCHED"
                    : "NOT_MATCHED"
        };
    }


    // -------------------------------------------------
    // Maharashtra
    // -------------------------------------------------

    if (
        condition.type ===
        "maharashtraState"
    ) {

        const matched =
            normalized ===
                "maharashtra" ||

            normalized ===
                "mh" ||

            normalized.includes(
                "maharashtra"
            );

        return {
            status:
                matched
                    ? "MATCHED"
                    : "NOT_MATCHED"
        };
    }


    // -------------------------------------------------
    // Generic provided field
    // -------------------------------------------------

    if (
        condition.type ===
        "provided"
    ) {

        return {
            status:
                normalized.length > 0
                    ? "MATCHED"
                    : "NOT_MATCHED"
        };
    }


    // -------------------------------------------------
    // New / expanding
    // -------------------------------------------------

    if (
        condition.type ===
        "newOrExpanding"
    ) {

        const matched =
            /new|newly|startup|start.?up|expan|proposed|greenfield|establish/.test(
                normalized
            );

        return {
            status:
                matched
                    ? "MATCHED"
                    : "NOT_MATCHED"
        };
    }


    // -------------------------------------------------
    // Operating / commissioning
    // -------------------------------------------------

    if (
        condition.type ===
        "operatingOrCommissioning"
    ) {

        const matched =
            /operat|commission|production|manufactur/.test(
                normalized
            );

        return {
            status:
                matched
                    ? "MATCHED"
                    : "NOT_MATCHED"
        };
    }


    // -------------------------------------------------
    // Operating
    // -------------------------------------------------

    if (
        condition.type ===
        "operating"
    ) {

        const matched =
            /operat|running|production|manufactur/.test(
                normalized
            );

        return {
            status:
                matched
                    ? "MATCHED"
                    : "NOT_MATCHED"
        };
    }


    // -------------------------------------------------
    // Positive number
    // -------------------------------------------------

    if (
        condition.type ===
        "positiveNumber"
    ) {

        const number =
            parseNumber(value);

        return {
            status:
                Number.isFinite(number) &&
                number > 0
                    ? "MATCHED"
                    : "NOT_MATCHED"
        };
    }


    // -------------------------------------------------
    // R&D activity
    // -------------------------------------------------

    if (
        condition.type ===
        "rndActivity"
    ) {

        /*
         * Explicit negative statements must NOT match.
         *
         * Example:
         * "No research activity"
         *
         * must return NOT_MATCHED.
         */

        const negative =
            /\b(no|not|none|without|nil|zero)\b.*\b(research|r&d|r and d|innovation|technology transfer|technology|patent|ipr)\b/.test(
                normalized
            );

        if (negative) {

            return {
                status:
                    "NOT_MATCHED"
            };
        }

        const matched =
            /\bresearch\b/.test(
                normalized
            ) ||

            /\br&d\b/.test(
                normalized
            ) ||

            /\br and d\b/.test(
                normalized
            ) ||

            /\binnovation\b/.test(
                normalized
            ) ||

            /\btechnology transfer\b/.test(
                normalized
            ) ||

            /\btechnology development\b/.test(
                normalized
            ) ||

            /\bpatent\b/.test(
                normalized
            ) ||

            /\bipr\b/.test(
                normalized
            );

        return {
            status:
                matched
                    ? "MATCHED"
                    : "NOT_MATCHED"
        };
    }


    // -------------------------------------------------
    // EPF registration
    // -------------------------------------------------

    if (
        condition.type ===
        "epfRegistered"
    ) {

        /*
         * First explicitly reject negative statements.
         */

        const negative =
            /\b(no|not|never|unregistered|without|none)\b/.test(
                normalized
            );

        if (negative) {

            return {
                status:
                    "NOT_MATCHED"
            };
        }

        const matched =
            normalized === "yes" ||

            normalized === "true" ||

            normalized === "registered" ||

            normalized ===
                "epf registered" ||

            normalized ===
                "provident fund registered" ||

            normalized ===
                "epf";

        return {
            status:
                matched
                    ? "MATCHED"
                    : "NOT_MATCHED"
        };
    }


    // -------------------------------------------------
    // Unknown condition type
    // -------------------------------------------------

    return {
        status:
            normalized.length > 0
                ? "MATCHED"
                : "NOT_MATCHED"
    };
}


// =====================================================
// SCORE POLICY
// =====================================================

function scorePolicy(
    policy,
    facts
) {

    let score = 0;

    const matchedConditions = [];

    const failedConditions = [];

    const missingFields = [];

    const unverifiedFields = [];

    const criticalMissing = [];

    const evidence =
        Array.isArray(
            policy.evidence
        )
            ? policy.evidence
            : [];


    evidence.forEach(
        condition => {

            const result =
                evaluateCondition(
                    condition,
                    facts
                );


            // -----------------------------------------
            // MATCHED
            // -----------------------------------------

            if (
                result.status ===
                "MATCHED"
            ) {

                score +=
                    Number(
                        condition.weight
                    ) || 0;

                matchedConditions.push(
                    condition.label
                );

                return;
            }


            // -----------------------------------------
            // UNVERIFIED
            // -----------------------------------------

            if (
                result.status ===
                "UNVERIFIED"
            ) {

                unverifiedFields.push(
                    condition.label
                );

                if (
                    condition.critical
                ) {

                    criticalMissing.push(
                        condition.label
                    );
                }

                return;
            }


            // -----------------------------------------
            // MISSING
            // -----------------------------------------

            if (
                result.status ===
                "MISSING"
            ) {

                missingFields.push(
                    condition.label
                );

                if (
                    condition.critical
                ) {

                    criticalMissing.push(
                        condition.label
                    );
                }

                return;
            }


            // -----------------------------------------
            // NOT MATCHED
            // -----------------------------------------

            if (
                result.status ===
                "NOT_MATCHED"
            ) {

                failedConditions.push(
                    condition.label
                );
            }
        }
    );


    /*
     * Keep score between 0 and 100.
     */

    score =
        Math.max(
            0,
            Math.min(
                100,
                score
            )
        );


    // =================================================
    // STATUS
    // =================================================

    let matchStatus;


    /*
     * Critical information missing or unverified
     * means the engine cannot confidently screen
     * the policy yet.
     */

    if (
        criticalMissing.length > 0
    ) {

        matchStatus =
            "NEEDS_VERIFICATION";

    } else if (
        score >= 80
    ) {

        matchStatus =
            "RELEVANT_MATCH";

    } else if (
        score >= 60
    ) {

        matchStatus =
            "POSSIBLE_MATCH";

    } else if (
        score >= 30
    ) {

        matchStatus =
            "NEEDS_VERIFICATION";

    } else {

        matchStatus =
            "NOT_MATCHED";
    }


    // =================================================
    // NEXT ACTION
    // =================================================

    let nextAction;


    if (
        unverifiedFields.length > 0
    ) {

        nextAction =
            "Verify the highlighted Information Vault fields before relying on this screening result.";

    } else if (
        missingFields.length > 0 &&
        score >= 60
    ) {

        nextAction =
            "Add the missing business information and recalculate the relevance score.";

    } else if (
        matchStatus ===
        "RELEVANT_MATCH"
    ) {

        nextAction =
            "The current verified information shows a strong relevance match. Review the official scheme rules and supporting documents.";

    } else if (
        matchStatus ===
        "POSSIBLE_MATCH"
    ) {

        nextAction =
            "The current verified information shows a possible match. Verify remaining conditions and official eligibility rules.";

    } else if (
        matchStatus ===
        "NEEDS_VERIFICATION"
    ) {

        nextAction =
            "Add or verify more business information and recalculate the score.";

    } else {

        nextAction =
            "The current verified business information does not strongly match this screening profile.";
    }


    return {

        score,

        matchStatus,

        matchedConditions,

        failedConditions,

        missingFields,

        unverifiedFields,

        criticalMissing,

        nextAction
    };
}


// =====================================================
// OPPORTUNITIES
// =====================================================

function readOpportunities() {

    try {

        const opportunities =
            JSON.parse(
                localStorage.getItem(
                    opportunitiesKey
                ) || "[]"
            );

        return Array.isArray(
            opportunities
        )
            ? opportunities
            : [];

    } catch (_) {

        return [];
    }
}


// =====================================================
// CALCULATED RESULTS
// =====================================================

function loadCalculatedIncentives() {

    try {

        const saved =
            JSON.parse(
                localStorage.getItem(
                    calculatedIncentivesKey
                ) || "null"
            );

        if (
            !saved ||
            !Array.isArray(
                saved.scored
            )
        ) {

            return null;
        }

        return saved;

    } catch (error) {

        console.warn(
            "Calculated incentive results could not be loaded.",
            error
        );

        return null;
    }
}


// =====================================================
// SAVE CALCULATED RESULTS
// =====================================================

function saveCalculatedIncentives(
    facts,
    scored
) {

    const snapshot = {

        calculatedAt:
            new Date().toISOString(),

        vaultSummary: {

            verifiedCount:
                facts.verifiedCount,

            totalCount:
                facts.totalCount,

            unverifiedCount:
                facts.unverifiedCount
        },

        scored:
            scored.map(
                ({ policy, result }) => ({

                    policyId:
                        policy.id,

                    result
                })
            )
    };


    localStorage.setItem(
        calculatedIncentivesKey,
        JSON.stringify(
            snapshot
        )
    );


    return snapshot;
}


// =====================================================
// CALCULATE
// =====================================================

function calculateLatestIncentives() {

    /*
     * This is the ONLY place where the
     * actual relevance calculation happens.
     */

    const facts =
        loadVaultFacts();


    const scored =
        incentivePolicies.map(
            policy => ({

                policy,

                result:
                    scorePolicy(
                        policy,
                        facts
                    )
            })
        );


    return saveCalculatedIncentives(
        facts,
        scored
    );
}


// =====================================================
// CREATE INITIAL EMPTY SCREEN
// =====================================================
//
// We deliberately DO NOT calculate automatically.
//
// User must click Recalculate Score.
// =====================================================

function createEmptyCalculation() {

    const facts =
        loadVaultFacts();


    return {

        calculatedAt: null,

        vaultSummary: {

            verifiedCount:
                facts.verifiedCount,

            totalCount:
                facts.totalCount,

            unverifiedCount:
                facts.unverifiedCount
        },

        scored:
            incentivePolicies.map(
                policy => ({

                    policyId:
                        policy.id,

                    result: {

                        score: null,

                        matchStatus:
                            "NOT_CALCULATED",

                        matchedConditions: [],

                        failedConditions: [],

                        missingFields: [],

                        unverifiedFields: [],

                        criticalMissing: [],

                        nextAction:
                            "Click Recalculate Score to evaluate this incentive against the current verified Information Vault data."
                    }
                })
            )
    };
}


// =====================================================
// SAVE POLICY TO INCENTIVE VAULT
// =====================================================

function savePolicyToVault(
    policy
) {

    let policyVaults = {};


    try {

        policyVaults =
            JSON.parse(
                localStorage.getItem(
                    incentiveVaultKey
                ) || "{}"
            );

    } catch (_) {

        policyVaults = {};
    }


    const existing =
        policyVaults[
            policy.id
        ];


    const fields =
        Object.fromEntries(

            policy.evidence.map(
                condition => {

                    const key =
                        condition.key;

                    const label =
                        condition.label;

                    const current =
                        existing?.fields?.[
                            key
                        ];


                    return [
                        key,

                        {

                            fieldName:
                                key,

                            fieldLabel:
                                label,

                            fieldValue:
                                String(
                                    current?.fieldValue ??
                                    ""
                                ),

                            verificationStatus:
                                current?.verificationStatus ||
                                "Unverified",

                            lastUpdated:
                                current?.lastUpdated ||
                                new Date().toISOString(),

                            required:
                                condition.critical === true
                        }
                    ];
                }
            )
        );


    policyVaults[
        policy.id
    ] = {

        id:
            policy.id,

        name:
            policy.name,

        officialSource:
            policy.officialSource,

        fields
    };


    localStorage.setItem(
        incentiveVaultKey,
        JSON.stringify(
            policyVaults
        )
    );
}


// =====================================================
// ADD OPPORTUNITY
// =====================================================

function addOpportunity(
    policy,
    result
) {

    /*
     * Do not add an uncalculated policy.
     */

    if (
        result.matchStatus ===
        "NOT_CALCULATED"
    ) {

        return;
    }


    const opportunities =
        readOpportunities();


    if (
        !opportunities.some(
            item =>
                item.id ===
                policy.id
        )
    ) {

        opportunities.push({

            id:
                policy.id,

            name:
                policy.name,

            score:
                result.score,

            status:
                result.matchStatus,

            addedAt:
                new Date().toISOString(),

            source:
                policy.officialSource
        });


        localStorage.setItem(
            opportunitiesKey,
            JSON.stringify(
                opportunities
            )
        );
    }


    savePolicyToVault(
        policy
    );


    render();
}


// =====================================================
// REMOVE OPPORTUNITY
// =====================================================

function removeOpportunity(
    policyId
) {

    const opportunities =
        readOpportunities()
            .filter(
                item =>
                    item.id !==
                    policyId
            );


    localStorage.setItem(
        opportunitiesKey,
        JSON.stringify(
            opportunities
        )
    );


    let policyVaults = {};


    try {

        policyVaults =
            JSON.parse(
                localStorage.getItem(
                    incentiveVaultKey
                ) || "{}"
            );

    } catch (_) {

        policyVaults = {};
    }


    delete policyVaults[
        policyId
    ];


    localStorage.setItem(
        incentiveVaultKey,
        JSON.stringify(
            policyVaults
        )
    );


    render();
}


// =====================================================
// RENDER
// =====================================================

function render(
    snapshot = null
) {

    /*
     * Use the explicitly supplied calculation,
     * otherwise use the LAST SAVED calculation.
     *
     * We never silently recalculate here.
     */

    const calculated =
        snapshot ||
        loadCalculatedIncentives() ||
        createEmptyCalculation();


    const summary =
        calculated.vaultSummary || {

            verifiedCount: 0,

            totalCount: 0,

            unverifiedCount: 0
        };


    // =================================================
    // VAULT STATUS
    // =================================================

    const verificationStatus =
        document.getElementById(
            "vaultVerificationStatus"
        );


    if (verificationStatus) {

        if (
            summary.totalCount === 0
        ) {

            verificationStatus.textContent =
                "NO DATA";

        } else if (
            summary.unverifiedCount === 0
        ) {

            verificationStatus.textContent =
                "READY";

        } else {

            verificationStatus.textContent =
                "NEEDS VERIFICATION";
        }
    }


    // =================================================
    // VAULT SUMMARY
    // =================================================

    const verificationSummary =
        document.getElementById(
            "vaultVerificationSummary"
        );


    if (verificationSummary) {

        verificationSummary.textContent =
            `${summary.verifiedCount} verified of ${summary.totalCount} entered field${summary.totalCount === 1 ? "" : "s"}; ${summary.unverifiedCount} unverified value${summary.unverifiedCount === 1 ? "" : "s"}.`;
    }


    // =================================================
    // REBUILD SCORED POLICIES
    // =================================================

    const scored =
        Array.isArray(
            calculated.scored
        )
            ? calculated.scored
                  .map(
                      savedItem => {

                          const policy =
                              incentivePolicies.find(
                                  item =>
                                      item.id ===
                                      savedItem.policyId
                              );


                          if (!policy) {
                              return null;
                          }


                          return {

                              policy,

                              result:
                                  savedItem.result
                          };
                      }
                  )
                  .filter(Boolean)

            : [];


    // =================================================
    // MATCHED COUNTS
    // =================================================

    const matched =
        scored.filter(
            item =>

                item.result.matchStatus ===
                    "RELEVANT_MATCH" ||

                item.result.matchStatus ===
                    "POSSIBLE_MATCH"
        ).length;


    const matchedCount =
        document.getElementById(
            "matchedCount"
        );


    if (matchedCount) {

        matchedCount.textContent =
            matched;
    }


    const reviewCount =
        document.getElementById(
            "reviewCount"
        );


    if (reviewCount) {

        reviewCount.textContent =
            scored.length -
            matched;
    }


    // =================================================
    // INCENTIVE LIST
    // =================================================

    const incentiveList =
        document.getElementById(
            "incentiveList"
        );


    if (!incentiveList) {
        return;
    }


    incentiveList.innerHTML =
        scored
            .map(
                ({
                    policy,
                    result
                }) => {

                    const alreadyAdded =
                        readOpportunities().some(
                            item =>
                                item.id ===
                                policy.id
                        );


                    const matchedConditions =
                        Array.isArray(
                            result.matchedConditions
                        )
                            ? result.matchedConditions
                            : [];


                    const failedConditions =
                        Array.isArray(
                            result.failedConditions
                        )
                            ? result.failedConditions
                            : [];


                    const missingFields =
                        Array.isArray(
                            result.missingFields
                        )
                            ? result.missingFields
                            : [];


                    const unverifiedFields =
                        Array.isArray(
                            result.unverifiedFields
                        )
                            ? result.unverifiedFields
                            : [];


                    const benefits =
                        Array.isArray(
                            policy.benefits
                        )
                            ? policy.benefits
                            : [];


                    const documents =
                        Array.isArray(
                            policy.docs
                        )
                            ? policy.docs
                            : [];


                    const notCalculated =
                        result.matchStatus ===
                        "NOT_CALCULATED";


                    const scoreText =
                        notCalculated
                            ? "—"
                            : `${result.score}/100`;


                    return `

                        <article
                            class="incentive-card ${
                                notCalculated
                                    ? "needs-review"
                                    : result.matchStatus ===
                                        "NOT_MATCHED"
                                        ? "needs-review"
                                        : "matched"
                            }">

                            <div class="incentive-card-header">

                                <div class="scheme-icon">

                                    <i
                                        data-lucide="${escapeHtml(
                                            policy.icon
                                        )}">
                                    </i>

                                </div>


                                <span class="incentive-tag">

                                    ${escapeHtml(
                                        result.matchStatus
                                    )}

                                </span>

                            </div>


                            <span class="incentive-chapter">

                                ${escapeHtml(
                                    policy.scope
                                )}

                            </span>


                            <h2>

                                ${escapeHtml(
                                    policy.name
                                )}

                            </h2>


                            <p>

                                ${escapeHtml(
                                    policy.description
                                )}

                            </p>


                            <div class="incentive-score">

                                <strong>

                                    ${escapeHtml(
                                        scoreText
                                    )}

                                </strong>

                                <span>

                                    ${
                                        notCalculated
                                            ? "Click Recalculate Score to evaluate"
                                            : "Deterministic relevance score"
                                    }

                                </span>

                            </div>


                            <h3>
                                Potential support
                            </h3>


                            <ul>

                                ${
                                    benefits.length

                                        ? benefits
                                              .map(
                                                  item =>
                                                      `<li>${escapeHtml(
                                                          item
                                                      )}</li>`
                                              )
                                              .join("")

                                        : "<li>Support details not specified</li>"
                                }

                            </ul>


                            <h3>
                                Match explanation
                            </h3>


                            <p>

                                <strong>
                                    Matched conditions:
                                </strong>

                                ${
                                    matchedConditions.length

                                        ? escapeHtml(
                                              matchedConditions.join(
                                                  ", "
                                              )
                                          )

                                        : "None"
                                }

                            </p>


                            <p>

                                <strong>
                                    Failed conditions:
                                </strong>

                                ${
                                    failedConditions.length

                                        ? escapeHtml(
                                              failedConditions.join(
                                                  ", "
                                              )
                                          )

                                        : "None"
                                }

                            </p>


                            <p>

                                <strong>
                                    Missing fields:
                                </strong>

                                ${
                                    missingFields.length

                                        ? escapeHtml(
                                              missingFields.join(
                                                  ", "
                                              )
                                          )

                                        : "None"
                                }

                            </p>


                            <p>

                                <strong>
                                    Unverified fields:
                                </strong>

                                ${
                                    unverifiedFields.length

                                        ? escapeHtml(
                                              unverifiedFields.join(
                                                  ", "
                                              )
                                          )

                                        : "None"
                                }

                            </p>


                            <p>

                                <strong>
                                    Required documents:
                                </strong>

                                ${
                                    documents.length

                                        ? escapeHtml(
                                              documents.join(
                                                  ", "
                                              )
                                          )

                                        : "Not specified"
                                }

                            </p>


                            <p>

                                <strong>
                                    Next action:
                                </strong>

                                ${escapeHtml(
                                    result.nextAction
                                )}

                            </p>


                            <div class="incentive-card-actions">

                                <button
                                    type="button"
                                    class="secondary-btn"
                                    data-verify-information>

                                    Verify Information

                                </button>


                                <button
                                    type="button"
                                    class="${
                                        alreadyAdded
                                            ? "secondary-btn remove-opportunity-button"
                                            : "primary-btn"
                                    }"
                                    data-add-opportunity="${escapeHtml(
                                        policy.id
                                    )}"
                                    ${
                                        notCalculated
                                            ? "disabled"
                                            : ""
                                    }>

                                    ${
                                        alreadyAdded
                                            ? "Remove from Opportunities"
                                            : "Add to Opportunities"
                                    }

                                </button>

                            </div>


                            <a
                                class="incentive-link"
                                href="${escapeHtml(
                                    policy.officialSource
                                )}"
                                target="_blank"
                                rel="noreferrer">

                                Official source ↗

                            </a>


                            <p class="incentive-disclaimer">

                                ${
                                    notCalculated

                                        ? escapeHtml(
                                              "No score has been calculated yet. Click Recalculate Score to evaluate the current verified Information Vault data."
                                          )

                                        : escapeHtml(
                                              "This is a deterministic relevance screening result based on the verified Information Vault data. Final eligibility depends on the applicable scheme rules and the official authority."
                                          )
                                }

                            </p>

                        </article>
                    `;
                }
            )
            .join("");


    // =================================================
    // VERIFY INFORMATION BUTTONS
    // =================================================

    document
        .querySelectorAll(
            "[data-verify-information]"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        window.location.href =
                            "./information-vault.html";
                    }
                );
            }
        );


    // =================================================
    // ADD / REMOVE OPPORTUNITY
    // =================================================

    document
        .querySelectorAll(
            "[data-add-opportunity]"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        const item =
                            scored.find(
                                entry =>
                                    entry.policy.id ===
                                    button.dataset
                                        .addOpportunity
                            );


                        if (!item) {
                            return;
                        }


                        if (
                            item.result.matchStatus ===
                            "NOT_CALCULATED"
                        ) {
                            return;
                        }


                        const exists =
                            readOpportunities().some(
                                opportunity =>
                                    opportunity.id ===
                                    item.policy.id
                            );


                        if (exists) {

                            removeOpportunity(
                                item.policy.id
                            );

                        } else {

                            addOpportunity(
                                item.policy,
                                item.result
                            );
                        }
                    }
                );
            }
        );


    // =================================================
    // LUCIDE ICONS
    // =================================================

    if (window.lucide) {

        lucide.createIcons();
    }
}


// =====================================================
// RECALCULATE SCORE
// =====================================================

async function handleRecalculateScore() {

    const button =
        document.getElementById(
            "recalculateScore"
        );


    if (
        !button ||
        button.classList.contains(
            "is-calculating"
        )
    ) {

        return;
    }


    const text =
        button.querySelector(
            ".recalculate-text"
        );


    const icon =
        button.querySelector(
            ".recalculate-icon"
        );


    button.classList.add(
        "is-calculating"
    );


    button.disabled =
        true;


    if (text) {

        text.textContent =
            "Recalculating...";
    }


    if (icon) {

        icon.setAttribute(
            "data-lucide",
            "refresh-cw"
        );
    }


    if (window.lucide) {

        lucide.createIcons();
    }


    try {

        /*
         * Keep the animation visible.
         */

        await new Promise(
            resolve =>
                setTimeout(
                    resolve,
                    1200
                )
        );


        /*
         * THIS is the only moment when
         * the engine recalculates.
         *
         * It reads the latest VERIFIED
         * Information Vault values.
         */

        const latestCalculation =
            calculateLatestIncentives();


        /*
         * Display the newly calculated
         * result.
         */

        render(
            latestCalculation
        );


        if (text) {

            text.textContent =
                "Score Recalculated";
        }


        await new Promise(
            resolve =>
                setTimeout(
                    resolve,
                    900
                )
        );

    } catch (error) {

        console.error(
            "Incentive score recalculation failed:",
            error
        );


        if (text) {

            text.textContent =
                "Recalculate Score";
        }

    } finally {

        button.classList.remove(
            "is-calculating"
        );


        button.disabled =
            false;


        if (text) {

            text.textContent =
                "Recalculate Score";
        }


        if (window.lucide) {

            lucide.createIcons();
        }
    }
}


// =====================================================
// RECALCULATE BUTTON
// =====================================================

document
    .getElementById(
        "recalculateScore"
    )
    ?.addEventListener(
        "click",
        handleRecalculateScore
    );


// =====================================================
// VERIFY INFORMATION BUTTON
// =====================================================

document
    .getElementById(
        "verifyInformation"
    )
    ?.addEventListener(
        "click",
        () => {

            window.location.href =
                "./information-vault.html";
        }
    );


// =====================================================
// INITIAL RENDER
// =====================================================
//
// IMPORTANT:
//
// This does NOT calculate a new score.
//
// If an old calculation exists, it displays that
// saved calculation.
//
// If no calculation exists, it shows:
//
// NOT_CALCULATED
//
// The user must press:
//
// Recalculate Score
//
// =====================================================

render();