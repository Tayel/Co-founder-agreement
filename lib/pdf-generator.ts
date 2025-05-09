import { jsPDF } from "jspdf"
import autoTable from "jspdf-autotable"

export async function generatePDF(data: any) {
  // Create a new PDF document
  const doc = new jsPDF()

  // Add title
  doc.setFontSize(20)
  doc.text("CO-FOUNDER AGREEMENT", 105, 20, { align: "center" })

  // Add date
  const today = new Date()
  doc.setFontSize(12)
  doc.text(`Date: ${today.toLocaleDateString()}`, 20, 30)

  // Company information
  doc.setFontSize(16)
  doc.text("1. COMPANY INFORMATION", 20, 40)

  doc.setFontSize(12)
  doc.text(`Company Name: ${data.companyName}`, 20, 50)

  let companyTypeText = ""
  switch (data.companyType) {
    case "llc":
      companyTypeText = "Limited Liability Company (LLC)"
      break
    case "corporation":
      companyTypeText = "Corporation"
      break
    case "partnership":
      companyTypeText = "Partnership"
      break
    case "soleProprietorship":
      companyTypeText = "Sole Proprietorship"
      break
  }

  doc.text(`Company Type: ${companyTypeText}`, 20, 60)

  // Founders information
  doc.setFontSize(16)
  doc.text("2. FOUNDERS", 20, 75)

  const foundersTableData = data.founders.map((founder: any) => [founder.name, founder.email, founder.role])

  autoTable(doc, {
    startY: 80,
    head: [["Name", "Email", "Role"]],
    body: foundersTableData,
  })

  // Equity distribution
  doc.setFontSize(16)
  doc.text("3. EQUITY DISTRIBUTION", 20, doc.lastAutoTable.finalY + 15)

  doc.setFontSize(12)
  doc.text(
    `Distribution Type: ${data.equityDistribution === "equal" ? "Equal Distribution" : "Custom Distribution"}`,
    20,
    doc.lastAutoTable.finalY + 25,
  )

  const equityData =
    data.equityDistribution === "equal"
      ? data.founders.map((founder: any) => [founder.name, `${(100 / data.founders.length).toFixed(1)}%`])
      : data.customEquity.map((item: any) => [item.name, `${item.equity.toFixed(1)}%`])

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 30,
    head: [["Founder", "Equity Percentage"]],
    body: equityData,
  })

  // Vesting schedule
  doc.setFontSize(16)
  doc.text("4. VESTING SCHEDULE", 20, doc.lastAutoTable.finalY + 15)

  let vestingTypeText = ""
  switch (data.vestingSchedule) {
    case "standard":
      vestingTypeText = "Standard Time-Based Vesting"
      break
    case "milestone":
      vestingTypeText = "Milestone-Based Vesting"
      break
    case "hybrid":
      vestingTypeText = "Hybrid Vesting"
      break
  }

  doc.setFontSize(12)
  doc.text(`Vesting Type: ${vestingTypeText}`, 20, doc.lastAutoTable.finalY + 25)
  doc.text(`Vesting Period: ${data.vestingPeriod} years`, 20, doc.lastAutoTable.finalY + 35)
  doc.text(`Cliff Period: ${data.cliff} ${data.cliff === 1 ? "year" : "years"}`, 20, doc.lastAutoTable.finalY + 45)

  // Roles and decision making
  doc.setFontSize(16)
  doc.text("5. ROLES & DECISION MAKING", 20, doc.lastAutoTable.finalY + 60)

  let decisionMakingText = ""
  switch (data.decisionMaking) {
    case "majority":
      decisionMakingText = "Majority Vote"
      break
    case "supermajority":
      decisionMakingText = "Supermajority"
      break
    case "unanimous":
      decisionMakingText = "Unanimous Consent"
      break
    case "weighted":
      decisionMakingText = "Weighted Voting"
      break
  }

  doc.setFontSize(12)
  doc.text(`Decision Making Process: ${decisionMakingText}`, 20, doc.lastAutoTable.finalY + 70)

  // Add a new page for the remaining sections
  doc.addPage()

  // Exit strategy
  doc.setFontSize(16)
  doc.text("6. EXIT STRATEGY", 20, 20)

  let exitStrategyText = ""
  switch (data.exitStrategy) {
    case "rightOfFirstRefusal":
      exitStrategyText = "Right of First Refusal"
      break
    case "tagAlong":
      exitStrategyText = "Tag-Along Rights"
      break
    case "dragAlong":
      exitStrategyText = "Drag-Along Rights"
      break
    case "shotgunClause":
      exitStrategyText = "Shotgun Clause"
      break
  }

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
  }

  doc.setFontSize(12)
  doc.text(`Exit Strategy: ${exitStrategyText}`, 20, 30)
  doc.text(`Valuation Method: ${valuationMethodText}`, 20, 40)

  // Dispute resolution
  doc.setFontSize(16)
  doc.text("7. DISPUTE RESOLUTION", 20, 55)

  let disputeResolutionText = ""
  switch (data.disputeResolution) {
    case "mediation":
      disputeResolutionText = "Mediation First"
      break
    case "arbitration":
      disputeResolutionText = "Binding Arbitration"
      break
    case "hybrid":
      disputeResolutionText = "Hybrid Approach"
      break
    case "litigation":
      disputeResolutionText = "Court Litigation"
      break
  }

  doc.setFontSize(12)
  doc.text(`Dispute Resolution Method: ${disputeResolutionText}`, 20, 65)

  // Intellectual property
  doc.setFontSize(16)
  doc.text("8. INTELLECTUAL PROPERTY", 20, 80)

  let ipRightsText = ""
  switch (data.ipRights) {
    case "company":
      ipRightsText = "Company Ownership"
      break
    case "founder":
      ipRightsText = "Founder Ownership with License"
      break
    case "mixed":
      ipRightsText = "Mixed Ownership"
      break
  }

  doc.setFontSize(12)
  doc.text(`IP Ownership: ${ipRightsText}`, 20, 90)

  // Signatures
  doc.setFontSize(16)
  doc.text("9. SIGNATURES", 20, 110)

  doc.setFontSize(12)
  let signatureY = 120

  data.founders.forEach((founder: any, index: number) => {
    doc.text(`${founder.name}:`, 20, signatureY)
    doc.line(50, signatureY, 150, signatureY)
    doc.text(`Date:`, 160, signatureY)
    doc.line(180, signatureY, 190, signatureY)
    signatureY += 20
  })

  // Legal disclaimer
  doc.setFontSize(10)
  doc.text(
    "LEGAL DISCLAIMER: This document is provided as a template and is not a substitute for legal advice.",
    105,
    270,
    { align: "center" },
  )

  // Save the PDF
  doc.save(`${data.companyName.replace(/\s+/g, "_")}_Co-Founder_Agreement.pdf`)

  return true
}
