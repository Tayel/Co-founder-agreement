import { jsPDF } from "jspdf"
import autoTable from "jspdf-autotable"

export async function generateComprehensivePDF(data: any) {
  // Create a new PDF document
  const doc = new jsPDF()

  // Add title
  doc.setFontSize(20)
  doc.text("CO-FOUNDER AGREEMENT", 105, 20, { align: "center" })

  // Add date
  const today = new Date()
  doc.setFontSize(12)
  doc.text(`Date: ${today.toLocaleDateString()}`, 20, 30)

  // Table of Contents
  doc.setFontSize(16)
  doc.text("TABLE OF CONTENTS", 105, 40, { align: "center" })

  const tocItems = [
    "1. DEFINITIONS",
    "2. FORMATION OF THE COMPANY",
    "3. ROLES AND RESPONSIBILITIES",
    "4. EQUITY AND OWNERSHIP",
    "5. VESTING SCHEDULE",
    "6. CAPITAL CONTRIBUTIONS",
    "7. MANAGEMENT AND DECISION-MAKING",
    "8. INTELLECTUAL PROPERTY",
    "9. CONFIDENTIALITY",
    "10. COMPENSATION AND BENEFITS",
    "11. EXPENSES",
    "12. TRANSFER OF SHARES",
    "13. EXIT STRATEGY",
    "14. DISSOLUTION",
    "15. DISPUTE RESOLUTION",
    "16. NON-COMPETE AND NON-SOLICITATION",
    "17. AMENDMENTS",
    "18. GOVERNING LAW",
    "19. ENTIRE AGREEMENT",
    "20. SEVERABILITY",
    "21. NOTICES",
  ]

  let tocY = 50
  tocItems.forEach((item) => {
    doc.setFontSize(12)
    doc.text(item, 30, tocY)
    tocY += 10
  })

  // Add a new page for the agreement
  doc.addPage()

  // 1. DEFINITIONS
  doc.setFontSize(16)
  doc.text("1. DEFINITIONS", 20, 20)
  doc.setFontSize(12)
  doc.text("In this Agreement, unless the context requires otherwise:", 20, 30)

  const definitionsData = [
    ["Agreement", "means this Co-Founder Agreement."],
    [
      "Company",
      `means ${data.companyName}, a ${data.companyType === "llc" ? "limited liability company" : data.companyType === "corporation" ? "corporation" : data.companyType === "partnership" ? "partnership" : "sole proprietorship"}.`,
    ],
    ["Co-Founder", "means each of the individuals who have signed this Agreement."],
    [
      "Intellectual Property",
      "means all patents, copyrights, trademarks, trade secrets, and other intellectual property rights.",
    ],
    [
      "Confidential Information",
      "means any non-public information relating to the Company's business, technology, customers, or operations.",
    ],
    [
      "Vesting Schedule",
      "means the schedule according to which a Co-Founder's equity becomes non-forfeitable over time.",
    ],
  ]

  autoTable(doc, {
    startY: 35,
    head: [["Term", "Definition"]],
    body: definitionsData,
  })

  // 2. FORMATION OF THE COMPANY
  doc.setFontSize(16)
  doc.text("2. FORMATION OF THE COMPANY", 20, doc.lastAutoTable.finalY + 15)
  doc.setFontSize(12)
  doc.text("2.1 Company Name and Type", 20, doc.lastAutoTable.finalY + 25)
  doc.text(
    `The Co-Founders hereby agree to form a ${data.companyType === "llc" ? "limited liability company" : data.companyType === "corporation" ? "corporation" : data.companyType === "partnership" ? "partnership" : "sole proprietorship"} under the name "${data.companyName}".`,
    30,
    doc.lastAutoTable.finalY + 35,
  )

  doc.text("2.2 Business Purpose", 20, doc.lastAutoTable.finalY + 45)
  doc.text(
    `The business purpose of the Company is: ${data.businessPurpose || "[Business Purpose]"}`,
    30,
    doc.lastAutoTable.finalY + 55,
    { maxWidth: 150 },
  )

  doc.text("2.3 Registered Address", 20, doc.lastAutoTable.finalY + 70)
  doc.text(
    `The registered address of the Company is: ${data.registeredAddress || "[Registered Address]"}`,
    30,
    doc.lastAutoTable.finalY + 80,
    { maxWidth: 150 },
  )

  // 3. ROLES AND RESPONSIBILITIES
  doc.addPage()
  doc.setFontSize(16)
  doc.text("3. ROLES AND RESPONSIBILITIES", 20, 20)
  doc.setFontSize(12)
  doc.text("3.1 Co-Founder Roles", 20, 30)

  let rolesY = 40
  data.founders.forEach((founder: any, index: number) => {
    const founderRole = data.founderRoles?.[index] || {
      title: founder.role,
      responsibilities: "General responsibilities",
    }
    doc.text(`${founder.name} - ${founderRole.title}:`, 30, rolesY)
    doc.text(`Responsibilities: ${founderRole.responsibilities}`, 40, rolesY + 10, { maxWidth: 140 })

    if (founderRole.decisionAreas && founderRole.decisionAreas.length > 0) {
      doc.text(`Decision Areas: ${founderRole.decisionAreas.join(", ")}`, 40, rolesY + 25, { maxWidth: 140 })
      rolesY += 35
    } else {
      rolesY += 25
    }

    doc.text(`Time Commitment: ${founderRole.timeCommitment || "Full-time"}`, 40, rolesY)
    rolesY += 15
  })

  doc.text("3.2 Amendment of Roles", 20, rolesY + 10)
  doc.text(
    `The process for amending Co-Founder roles and responsibilities is as follows: ${data.amendmentProcess || "By unanimous written consent of all Co-Founders."}`,
    30,
    rolesY + 20,
    { maxWidth: 150 },
  )

  // 4. EQUITY AND OWNERSHIP
  doc.addPage()
  doc.setFontSize(16)
  doc.text("4. EQUITY AND OWNERSHIP", 20, 20)
  doc.setFontSize(12)
  doc.text("4.1 Equity Distribution", 20, 30)

  const equityData =
    data.equityDistribution === "equal"
      ? data.founders.map((founder: any) => [founder.name, `${(100 / data.founders.length).toFixed(1)}%`])
      : data.customEquity.map((item: any) => [item.name, `${item.equity.toFixed(1)}%`])

  autoTable(doc, {
    startY: 35,
    head: [["Co-Founder", "Equity Percentage"]],
    body: equityData,
  })

  doc.text("4.2 Share Class", 20, doc.lastAutoTable.finalY + 15)
  doc.text(
    `All Co-Founders shall receive common stock/membership interests in the Company.`,
    30,
    doc.lastAutoTable.finalY + 25,
  )

  // 5. VESTING SCHEDULE
  doc.setFontSize(16)
  doc.text("5. VESTING SCHEDULE", 20, doc.lastAutoTable.finalY + 40)
  doc.setFontSize(12)
  doc.text("5.1 Vesting Period", 20, doc.lastAutoTable.finalY + 50)
  doc.text(
    `Each Co-Founder's equity shall vest over a period of ${data.vestingPeriod || "4"} years.`,
    30,
    doc.lastAutoTable.finalY + 60,
  )

  doc.text("5.2 Cliff Period", 20, doc.lastAutoTable.finalY + 70)
  doc.text(
    `There shall be a cliff period of ${data.cliff || "1"} year(s), after which ${data.cliff === 1 ? "25%" : data.cliff === 2 ? "50%" : "a portion"} of the equity shall vest.`,
    30,
    doc.lastAutoTable.finalY + 80,
  )

  doc.text("5.3 Vesting Schedule Type", 20, doc.lastAutoTable.finalY + 90)
  let vestingTypeText = ""
  switch (data.vestingSchedule) {
    case "standard":
      vestingTypeText =
        "Standard Time-Based Vesting: Equity vests equally over time, typically monthly after the initial cliff period."
      break
    case "milestone":
      vestingTypeText =
        "Milestone-Based Vesting: Equity vests when specific company or individual milestones are achieved."
      break
    case "hybrid":
      vestingTypeText = "Hybrid Vesting: Combines time-based and milestone-based vesting."
      break
    default:
      vestingTypeText =
        "Standard Time-Based Vesting: Equity vests equally over time, typically monthly after the initial cliff period."
  }
  doc.text(vestingTypeText, 30, doc.lastAutoTable.finalY + 100, { maxWidth: 150 })

  // 6. CAPITAL CONTRIBUTIONS
  doc.addPage()
  doc.setFontSize(16)
  doc.text("6. CAPITAL CONTRIBUTIONS", 20, 20)
  doc.setFontSize(12)
  doc.text("6.1 Initial Capital", 20, 30)
  doc.text(`The total initial capital of the Company is $${data.initialCapital || "0"}.`, 30, 40)

  doc.text("6.2 Co-Founder Contributions", 20, 50)

  if (data.contributions && data.contributions.length > 0) {
    const contributionsData = data.contributions.map((contribution: any) => [
      data.founders[contribution.founderIndex]?.name || "Co-Founder",
      contribution.type === "cash"
        ? "Cash"
        : contribution.type === "asset"
          ? "Physical Asset"
          : contribution.type === "ip"
            ? "Intellectual Property"
            : contribution.type === "service"
              ? "Services"
              : "Other",
      contribution.description,
      `$${contribution.value}`,
    ])

    autoTable(doc, {
      startY: 55,
      head: [["Co-Founder", "Type", "Description", "Value"]],
      body: contributionsData,
    })

    doc.text("6.3 Valuation of Non-Cash Contributions", 20, doc.lastAutoTable.finalY + 15)
    const nonCashContributions = data.contributions.filter((c: any) => c.type !== "cash")
    if (nonCashContributions.length > 0) {
      let valuationY = doc.lastAutoTable.finalY + 25
      nonCashContributions.forEach((contribution: any) => {
        doc.text(
          `${data.founders[contribution.founderIndex]?.name || "Co-Founder"}'s ${contribution.type} contribution:`,
          30,
          valuationY,
        )
        doc.text(`Valuation Method: ${contribution.valuationMethod || "Fair market value"}`, 40, valuationY + 10)
        valuationY += 20
      })
    } else {
      doc.text("There are no non-cash contributions.", 30, doc.lastAutoTable.finalY + 25)
    }
  } else {
    doc.text("Co-Founder contributions will be determined at a later date.", 30, 55)
  }

  // 7. MANAGEMENT AND DECISION-MAKING
  doc.addPage()
  doc.setFontSize(16)
  doc.text("7. MANAGEMENT AND DECISION-MAKING", 20, 20)
  doc.setFontSize(12)
  doc.text("7.1 Decision-Making Process", 20, 30)

  let decisionMakingText = ""
  switch (data.decisionMaking) {
    case "majority":
      decisionMakingText = "Decisions require a simple majority (more than 50%) of Co-Founders to approve."
      break
    case "supermajority":
      decisionMakingText = "Decisions require a supermajority (typically 2/3 or 75%) of Co-Founders to approve."
      break
    case "unanimous":
      decisionMakingText = "All Co-Founders must agree for a decision to be approved."
      break
    case "weighted":
      decisionMakingText = "Voting power is proportional to equity ownership."
      break
    case "ceo":
      decisionMakingText = "The CEO has final decision-making authority after consulting with other Co-Founders."
      break
    default:
      decisionMakingText = "Decisions require a simple majority (more than 50%) of Co-Founders to approve."
  }
  doc.text(decisionMakingText, 30, 40, { maxWidth: 150 })

  doc.text("7.2 Board of Directors", 20, 55)
  doc.text(
    "The Company shall be managed by its Co-Founders until a formal Board of Directors is established.",
    30,
    65,
    { maxWidth: 150 },
  )

  doc.text("7.3 Officers", 20, 80)
  let officersY = 90
  data.founders.forEach((founder: any, index: number) => {
    const founderRole = data.founderRoles?.[index] || { title: founder.role }
    doc.text(`${founder.name} - ${founderRole.title}`, 30, officersY)
    officersY += 10
  })

  doc.text("7.4 Deadlock Resolution", 20, officersY + 10)
  doc.text(
    `In case of a deadlock, the following process shall be followed: ${data.deadlockResolution || "Mediation by a neutral third party."}`,
    30,
    officersY + 20,
    { maxWidth: 150 },
  )

  // 8. INTELLECTUAL PROPERTY
  doc.addPage()
  doc.setFontSize(16)
  doc.text("8. INTELLECTUAL PROPERTY", 20, 20)
  doc.setFontSize(12)
  doc.text("8.1 IP Ownership", 20, 30)

  let ipRightsText = ""
  switch (data.ipRights) {
    case "company":
      ipRightsText =
        "All Intellectual Property created by Co-Founders during their involvement with the Company belongs to the Company."
      break
    case "founder":
      ipRightsText =
        "Co-Founders retain ownership of Intellectual Property they create but grant the Company an exclusive license to use it."
      break
    case "mixed":
      ipRightsText =
        "Some Intellectual Property belongs to the Company, while other Intellectual Property remains with individual Co-Founders, as specified in writing."
      break
    default:
      ipRightsText =
        "All Intellectual Property created by Co-Founders during their involvement with the Company belongs to the Company."
  }
  doc.text(ipRightsText, 30, 40, { maxWidth: 150 })

  doc.text("8.2 Pre-Existing IP", 20, 60)
  if (data.preExistingIP && data.preExistingIP.length > 0) {
    const preExistingIPData = data.preExistingIP.map((ip: any) => [
      data.founders[ip.founderIndex]?.name || "Co-Founder",
      ip.description,
      ip.ownershipType === "retained"
        ? "Retained by Co-Founder"
        : ip.ownershipType === "transferred"
          ? "Transferred to Company"
          : "Licensed to Company",
      ip.ownershipType === "licensed" ? ip.licenseTerms || "Exclusive license" : "N/A",
    ])

    autoTable(doc, {
      startY: 65,
      head: [["Co-Founder", "Description", "Ownership", "License Terms"]],
      body: preExistingIPData,
    })
  } else {
    doc.text("There is no pre-existing Intellectual Property to be disclosed.", 30, 65)
  }

  doc.text("8.3 IP Assignment", 20, doc.lastAutoTable ? doc.lastAutoTable.finalY + 15 : 80)
  doc.text(
    "Each Co-Founder hereby assigns to the Company all right, title, and interest in and to any Intellectual Property created during their work for the Company, subject to the ownership provisions in Section 8.1.",
    30,
    doc.lastAutoTable ? doc.lastAutoTable.finalY + 25 : 90,
    { maxWidth: 150 },
  )

  // 9. CONFIDENTIALITY
  doc.addPage()
  doc.setFontSize(16)
  doc.text("9. CONFIDENTIALITY", 20, 20)
  doc.setFontSize(12)
  doc.text("9.1 Confidentiality Obligations", 20, 30)
  doc.text(
    "Each Co-Founder agrees to maintain the confidentiality of all Confidential Information and not to disclose it to any third party without the prior written consent of the Company.",
    30,
    40,
    { maxWidth: 150 },
  )

  doc.text("9.2 Term of Confidentiality", 20, 60)
  doc.text(
    `The confidentiality obligations shall remain in effect during the Co-Founder's involvement with the Company and for a period of ${data.confidentialityTerm || "3"} years thereafter.`,
    30,
    70,
    { maxWidth: 150 },
  )

  doc.text("9.3 Exclusions", 20, 85)
  doc.text(
    `The following information is excluded from confidentiality obligations: ${data.confidentialityExclusions || "Information that is publicly available, information that was known to the Co-Founder prior to disclosure, information that is independently developed by the Co-Founder without use of Confidential Information, or information that is required to be disclosed by law."}`,
    30,
    95,
    { maxWidth: 150 },
  )

  // 10. COMPENSATION AND BENEFITS
  doc.addPage()
  doc.setFontSize(16)
  doc.text("10. COMPENSATION AND BENEFITS", 20, 20)
  doc.setFontSize(12)
  doc.text("10.1 Co-Founder Compensation", 20, 30)

  if (data.compensations && data.compensations.length > 0) {
    const compensationsData = data.compensations.map((compensation: any) => [
      data.founders[compensation.founderIndex]?.name || "Co-Founder",
      `$${compensation.salary || "0"}/year`,
      compensation.salaryReviewPeriod || "Annual",
      (compensation.benefits || []).join(", "),
    ])

    autoTable(doc, {
      startY: 35,
      head: [["Co-Founder", "Salary", "Review Period", "Benefits"]],
      body: compensationsData,
    })

    let bonusY = doc.lastAutoTable.finalY + 15
    doc.text("10.2 Bonus Structures", 20, bonusY)
    bonusY += 10
    data.compensations.forEach((compensation: any, index: number) => {
      if (compensation.bonusStructure) {
        doc.text(`${data.founders[compensation.founderIndex]?.name || "Co-Founder"}:`, 30, bonusY)
        doc.text(compensation.bonusStructure, 40, bonusY + 10, { maxWidth: 140 })
        bonusY += 25
      }
    })

    doc.text("10.3 Compensation Review Process", 20, bonusY + 10)
    doc.text(
      `${data.compensationReviewProcess || "Co-Founder compensation shall be reviewed annually based on company performance and market rates."}`,
      30,
      bonusY + 20,
      { maxWidth: 150 },
    )
  } else {
    doc.text(
      "Co-Founder compensation will be determined at a later date based on company performance and available funds.",
      30,
      35,
      { maxWidth: 150 },
    )
  }

  // 11. EXPENSES
  doc.setFontSize(16)
  doc.text("11. EXPENSES", 20, doc.lastAutoTable ? doc.lastAutoTable.finalY + 60 : 140)
  doc.setFontSize(12)
  doc.text("11.1 Business Expense Policy", 20, doc.lastAutoTable ? doc.lastAutoTable.finalY + 70 : 150)
  doc.text(
    `${data.expensePolicy || "Reasonable business expenses incurred by Co-Founders will be reimbursed by the Company upon submission of appropriate documentation."}`,
    30,
    doc.lastAutoTable ? doc.lastAutoTable.finalY + 80 : 160,
    { maxWidth: 150 },
  )

  // 12. TRANSFER OF SHARES
  doc.addPage()
  doc.setFontSize(16)
  doc.text("12. TRANSFER OF SHARES", 20, 20)
  doc.setFontSize(12)
  doc.text("12.1 Transfer Restrictions", 20, 30)

  let transferRestrictionsText = ""
  switch (data.transferRestrictions) {
    case "none":
      transferRestrictionsText = "Co-Founders can freely transfer their shares to any third party."
      break
    case "board_approval":
      transferRestrictionsText = "Any transfer of shares requires approval from the board of directors."
      break
    case "all_founders":
      transferRestrictionsText = "Any transfer of shares requires approval from all Co-Founders."
      break
    case "complete_restriction":
      transferRestrictionsText = "No transfers allowed for a period of 2 years except in limited circumstances."
      break
    default:
      transferRestrictionsText = "Any transfer of shares requires approval from all Co-Founders."
  }
  doc.text(transferRestrictionsText, 30, 40, { maxWidth: 150 })

  let transferY = 60
  if (data.rightOfFirstRefusal) {
    doc.text("12.2 Right of First Refusal", 20, transferY)
    doc.text(
      "If a Co-Founder wants to sell shares, other Co-Founders have the right to purchase them first.",
      30,
      transferY + 10,
      { maxWidth: 150 },
    )
    transferY += 30
  }

  if (data.tagAlong) {
    doc.text(`12.${data.rightOfFirstRefusal ? "3" : "2"} Tag-Along Rights`, 20, transferY)
    doc.text(
      "If a Co-Founder sells shares to a third party, other Co-Founders can join the sale on the same terms.",
      30,
      transferY + 10,
      { maxWidth: 150 },
    )
    transferY += 30
  }

  if (data.dragAlong) {
    doc.text(`12.${(data.rightOfFirstRefusal ? 1 : 0) + (data.tagAlong ? 1 : 0) + 2} Drag-Along Rights`, 20, transferY)
    doc.text(
      "If a majority of Co-Founders agree to sell the company, minority Co-Founders must join the sale.",
      30,
      transferY + 10,
      { maxWidth: 150 },
    )
    transferY += 30
  }

  if (data.shotgunClause) {
    doc.text(
      `12.${(data.rightOfFirstRefusal ? 1 : 0) + (data.tagAlong ? 1 : 0) + (data.dragAlong ? 1 : 0) + 2} Shotgun Clause`,
      20,
      transferY,
    )
    doc.text(
      "A Co-Founder can offer to buy out others at a specific price, but they must be willing to sell at that same price.",
      30,
      transferY + 10,
      { maxWidth: 150 },
    )
  }

  // 13. EXIT STRATEGY
  doc.addPage()
  doc.setFontSize(16)
  doc.text("13. EXIT STRATEGY", 20, 20)
  doc.setFontSize(12)
  doc.text("13.1 Valuation Method", 20, 30)

  let valuationMethodText = ""
  switch (data.valuationMethod) {
    case "multiple":
      valuationMethodText = "Revenue/EBITDA Multiple"
      break
    case "appraisal":
      valuationMethodText = "Independent Appraisal"
      break
    case "formula":
      valuationMethodText = "Predetermined Formula"
      break
    case "bookValue":
      valuationMethodText = "Book Value"
      break
    case "lastRound":
      valuationMethodText = "Last Financing Round Valuation"
      break
    default:
      valuationMethodText = "Independent Appraisal"
  }
  doc.text(`The valuation method for buy-outs shall be: ${valuationMethodText}`, 30, 40)

  doc.text("13.2 Exit Events & Process", 20, 55)
  doc.text(
    `${data.exitEvents || "The Co-Founders agree to work together in good faith to maximize the value of the Company in the event of an acquisition offer, IPO opportunity, or other exit event."}`,
    30,
    65,
    { maxWidth: 150 },
  )

  // 14. DISSOLUTION
  doc.setFontSize(16)
  doc.text("14. DISSOLUTION", 20, 100)
  doc.setFontSize(12)
  doc.text("14.1 Dissolution Process", 20, 110)
  doc.text(
    `${data.dissolutionProcess || "In the event of dissolution, the Company's assets shall be liquidated, and the proceeds shall be distributed first to creditors and then to Co-Founders in proportion to their equity ownership."}`,
    30,
    120,
    { maxWidth: 150 },
  )

  // 15. DISPUTE RESOLUTION
  doc.addPage()
  doc.setFontSize(16)
  doc.text("15. DISPUTE RESOLUTION", 20, 20)
  doc.setFontSize(12)
  doc.text("15.1 Dispute Resolution Method", 20, 30)

  let disputeResolutionText = ""
  switch (data.disputeResolution) {
    case "mediation":
      disputeResolutionText =
        "Disputes are first addressed through mediation with a neutral third party before any legal action."
      break
    case "arbitration":
      disputeResolutionText = "Disputes are resolved through binding arbitration rather than court litigation."
      break
    case "hybrid":
      disputeResolutionText = "Mediation first, followed by binding arbitration if mediation fails."
      break
    case "litigation":
      disputeResolutionText = "Disputes are resolved through traditional court proceedings."
      break
    default:
      disputeResolutionText = "Mediation first, followed by binding arbitration if mediation fails."
  }
  doc.text(disputeResolutionText, 30, 40, { maxWidth: 150 })

  if (data.disputeResolution === "mediation" || data.disputeResolution === "hybrid") {
    doc.text("15.2 Mediation Provider", 20, 60)
    doc.text(`Mediation shall be conducted by ${data.mediationProvider || "a mutually agreed upon mediator"}.`, 30, 70)
  }

  if (data.disputeResolution === "arbitration" || data.disputeResolution === "hybrid") {
    doc.text(
      `15.${data.disputeResolution === "hybrid" ? "3" : "2"} Arbitration Provider`,
      20,
      data.disputeResolution === "hybrid" ? 85 : 60,
    )
    doc.text(
      `Arbitration shall be conducted by ${data.arbitrationProvider || "a mutually agreed upon arbitrator"}.`,
      30,
      data.disputeResolution === "hybrid" ? 95 : 70,
    )
  }

  doc.text(
    `15.${(data.disputeResolution === "mediation" ? 1 : 0) + (data.disputeResolution === "arbitration" ? 1 : 0) + (data.disputeResolution === "hybrid" ? 2 : 0) + 2} Deadlock Resolution`,
    20,
    data.disputeResolution === "hybrid"
      ? 110
      : data.disputeResolution === "mediation" || data.disputeResolution === "arbitration"
        ? 85
        : 60,
  )
  doc.text(
    `${data.deadlockResolution || "In case of a deadlock, the Co-Founders shall engage a neutral third party to help resolve the issue."}`,
    30,
    data.disputeResolution === "hybrid"
      ? 120
      : data.disputeResolution === "mediation" || data.disputeResolution === "arbitration"
        ? 95
        : 70,
    { maxWidth: 150 },
  )

  // 16. NON-COMPETE AND NON-SOLICITATION
  doc.addPage()
  doc.setFontSize(16)
  doc.text("16. NON-COMPETE AND NON-SOLICITATION", 20, 20)
  doc.setFontSize(12)
  doc.text("16.1 Non-Compete Term", 20, 30)
  doc.text(
    `Each Co-Founder agrees not to compete with the Company during their involvement with the Company and for a period of ${data.nonCompeteTerm || "12"} months thereafter.`,
    30,
    40,
    { maxWidth: 150 },
  )

  doc.text("16.2 Geographic Scope", 20, 60)
  doc.text(
    `The non-compete restrictions apply to the following geographic area: ${data.nonCompeteGeographic || "The primary markets in which the Company operates"}.`,
    30,
    70,
    { maxWidth: 150 },
  )

  doc.text("16.3 Non-Solicitation Term", 20, 90)
  doc.text(
    `Each Co-Founder agrees not to solicit employees, customers, or suppliers of the Company for a period of ${data.nonSolicitTerm || "12"} months after leaving the Company.`,
    30,
    100,
    { maxWidth: 150 },
  )

  // 17. AMENDMENTS
  doc.setFontSize(16)
  doc.text("17. AMENDMENTS", 20, 130)
  doc.setFontSize(12)
  doc.text("17.1 Amendment Process", 20, 140)
  doc.text(
    `${data.amendmentProcess || "This Agreement may be amended only by a written instrument signed by all Co-Founders."}`,
    30,
    150,
    { maxWidth: 150 },
  )

  // 18. GOVERNING LAW
  doc.addPage()
  doc.setFontSize(16)
  doc.text("18. GOVERNING LAW", 20, 20)
  doc.setFontSize(12)
  doc.text("18.1 Jurisdiction", 20, 30)

  let governingLawText = ""
  switch (data.governingLaw || data.jurisdiction) {
    case "delaware":
      governingLawText = "Delaware, USA"
      break
    case "california":
      governingLawText = "California, USA"
      break
    case "newyork":
      governingLawText = "New York, USA"
      break
    case "uk":
      governingLawText = "United Kingdom"
      break
    case "singapore":
      governingLawText = "Singapore"
      break
    default:
      governingLawText = "Delaware, USA"
  }
  doc.text(
    `This Agreement shall be governed by and construed in accordance with the laws of ${governingLawText}.`,
    30,
    40,
    { maxWidth: 150 },
  )

  // 19. ENTIRE AGREEMENT
  doc.setFontSize(16)
  doc.text("19. ENTIRE AGREEMENT", 20, 60)
  doc.setFontSize(12)
  doc.text("19.1 Integration Clause", 20, 70)
  doc.text(
    "This Agreement constitutes the entire understanding between the parties with respect to the subject matter hereof and supersedes all prior agreements, understandings, and negotiations between the parties.",
    30,
    80,
    { maxWidth: 150 },
  )

  // 20. SEVERABILITY
  doc.setFontSize(16)
  doc.text("20. SEVERABILITY", 20, 110)
  doc.setFontSize(12)
  doc.text("20.1 Severability Clause", 20, 120)
  doc.text(
    "If any provision of this Agreement is found to be invalid or unenforceable, the remaining provisions shall remain in full force and effect.",
    30,
    130,
    { maxWidth: 150 },
  )

  // 21. NOTICES
  doc.setFontSize(16)
  doc.text("21. NOTICES", 20, 150)
  doc.setFontSize(12)
  doc.text("21.1 Notice Method", 20, 160)

  let noticeMethodText = ""
  switch (data.noticeMethod) {
    case "email":
      noticeMethodText = "Email"
      break
    case "certified_mail":
      noticeMethodText = "Certified Mail"
      break
    case "personal_delivery":
      noticeMethodText = "Personal Delivery"
      break
    case "multiple":
      noticeMethodText = "Email, followed by Certified Mail if no response is received within 3 business days"
      break
    default:
      noticeMethodText = "Email, followed by Certified Mail if no response is received within 3 business days"
  }
  doc.text(`Notices under this Agreement shall be delivered by: ${noticeMethodText}`, 30, 170, { maxWidth: 150 })

  doc.text("21.2 Notice Address", 20, 190)
  doc.text(
    `${data.noticeAddress || "Notices shall be sent to the email addresses or physical addresses provided by each Co-Founder."}`,
    30,
    200,
    { maxWidth: 150 },
  )

  // Additional Terms
  if (data.additionalTerms) {
    doc.addPage()
    doc.setFontSize(16)
    doc.text("22. ADDITIONAL TERMS", 20, 20)
    doc.setFontSize(12)
    doc.text(data.additionalTerms, 30, 30, { maxWidth: 150 })
  }

  // Signatures
  doc.addPage()
  doc.setFontSize(16)
  doc.text("SIGNATURES", 105, 20, { align: "center" })

  doc.setFontSize(12)
  doc.text(
    "IN WITNESS WHEREOF, the parties have executed this Co-Founder Agreement as of the date first written above.",
    20,
    40,
    { maxWidth: 170 },
  )

  let signatureY = 70
  data.founders.forEach((founder: any, index: number) => {
    doc.text(`Co-Founder: ${founder.name}`, 20, signatureY)
    doc.line(20, signatureY + 10, 100, signatureY + 10)
    doc.text(`Date: ____________________`, 120, signatureY + 10)
    signatureY += 40
  })

  // Legal disclaimer
  doc.setFontSize(10)
  doc.text(
    "LEGAL DISCLAIMER: This document is provided as a template and is not a substitute for legal advice. You should consult with an attorney before signing.",
    105,
    270,
    { align: "center", maxWidth: 170 },
  )

  // Save the PDF
  doc.save(`${data.companyName.replace(/\s+/g, "_")}_Co-Founder_Agreement.pdf`)

  return true
}
