import { jsPDF } from "jspdf"
import autoTable from "jspdf-autotable"

export interface EmployeeData {
  fullName: string
  role: string
  department: string
  startDate: string
  endDate: string
  compensationType: "hourly" | "salary"
  compensationAmount: number
  hoursPerWeek?: number
  expectedQuality: number
  yearsExperience: number
  skills: string[]
  reportingManager: string
  contractType: "ijarah" | "standard"
  additionalTerms?: string
}

export async function generateEmploymentContract(data: EmployeeData) {
  // Create a new PDF document
  const doc = new jsPDF()

  // Add title
  doc.setFontSize(20)
  doc.text(data.contractType === "ijarah" ? "IJARAH EMPLOYMENT CONTRACT" : "EMPLOYMENT CONTRACT", 105, 20, {
    align: "center",
  })

  // Add date
  const today = new Date()
  doc.setFontSize(12)
  doc.text(`Date: ${today.toLocaleDateString()}`, 20, 30)

  // Add AAOIFI compliance notice if Ijarah contract
  if (data.contractType === "ijarah") {
    doc.setFillColor(240, 248, 255) // Light blue background
    doc.rect(20, 35, 170, 15, "F")
    doc.setTextColor(0, 0, 128) // Navy blue text
    doc.setFontSize(10)
    doc.text("This contract follows AAOIFI Shariah Standard No. 9: Ijarah and Ijarah Muntahia Bittamleek", 105, 42, {
      align: "center",
    })
    doc.text("All terms and conditions are in compliance with Islamic finance principles.", 105, 47, {
      align: "center",
    })
    doc.setTextColor(0, 0, 0) // Reset text color
  }

  // Contract parties
  doc.setFontSize(14)
  doc.text("CONTRACT PARTIES", 20, 60)

  doc.setFontSize(12)
  doc.text("This employment contract is made between:", 20, 70)

  doc.text("Employer: QistasChain", 30, 80)
  doc.text(`Employee: ${data.fullName}`, 30, 90)

  // Employment details
  doc.setFontSize(14)
  doc.text("EMPLOYMENT DETAILS", 20, 110)

  const employmentDetails = [
    ["Position/Role", data.role],
    ["Department", data.department],
    ["Start Date", data.startDate],
    ["End Date", data.endDate || "Indefinite"],
    ["Reporting To", data.reportingManager],
    ["Years of Experience", data.yearsExperience.toString()],
  ]

  autoTable(doc, {
    startY: 120,
    head: [["Item", "Details"]],
    body: employmentDetails,
    theme: "grid",
    headStyles: { fillColor: [0, 100, 0] },
  })

  // Compensation details
  doc.setFontSize(14)
  doc.text("COMPENSATION", 20, doc.lastAutoTable.finalY + 20)

  const compensationDetails = [
    ["Type", data.compensationType === "hourly" ? "Hourly Rate" : "Annual Salary"],
    [
      "Amount",
      data.compensationType === "hourly"
        ? `$${data.compensationAmount.toFixed(2)} per hour`
        : `$${data.compensationAmount.toFixed(2)} per year`,
    ],
  ]

  if (data.compensationType === "hourly" && data.hoursPerWeek) {
    compensationDetails.push(["Hours per Week", `${data.hoursPerWeek} hours`])
  }

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 30,
    head: [["Item", "Details"]],
    body: compensationDetails,
    theme: "grid",
    headStyles: { fillColor: [0, 100, 0] },
  })

  // Skills and qualifications
  doc.setFontSize(14)
  doc.text("SKILLS & QUALIFICATIONS", 20, doc.lastAutoTable.finalY + 20)

  const skillsList = data.skills.map((skill) => [skill])

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 30,
    head: [["Required Skills"]],
    body: skillsList,
    theme: "grid",
    headStyles: { fillColor: [0, 100, 0] },
  })

  // Quality expectations
  doc.setFontSize(14)
  doc.text("QUALITY EXPECTATIONS", 20, doc.lastAutoTable.finalY + 20)

  let qualityDescription = ""
  if (data.expectedQuality >= 9) {
    qualityDescription = "Exceptional quality expected. Work must be of the highest standard with minimal supervision."
  } else if (data.expectedQuality >= 7) {
    qualityDescription = "High quality expected. Work should exceed standard requirements with occasional supervision."
  } else if (data.expectedQuality >= 5) {
    qualityDescription = "Good quality expected. Work should meet all standard requirements with regular supervision."
  } else {
    qualityDescription = "Acceptable quality expected. Work should meet basic requirements with close supervision."
  }

  const qualityDetails = [
    ["Quality Rating", `${data.expectedQuality}/10`],
    ["Description", qualityDescription],
  ]

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 30,
    head: [["Item", "Details"]],
    body: qualityDetails,
    theme: "grid",
    headStyles: { fillColor: [0, 100, 0] },
  })

  // Add a new page for the remaining sections
  doc.addPage()

  // Ijarah-specific terms if applicable
  if (data.contractType === "ijarah") {
    doc.setFontSize(14)
    doc.text("IJARAH (ISLAMIC LEASING) TERMS", 20, 20)

    const ijarahTerms = [
      ["Contract Type", "Service Ijarah (Leasing of Services)"],
      ["Lessor", "Employee (Service Provider)"],
      ["Lessee", "QistasChain (Service Recipient)"],
      ["Subject of Lease", `Professional services as ${data.role}`],
      ["Ownership of Work", "All work product belongs to QistasChain as per agreement"],
      ["Maintenance", "Employee is responsible for maintaining their skills and qualifications"],
      ["Early Termination", "Subject to mutual agreement with appropriate notice"],
    ]

    autoTable(doc, {
      startY: 30,
      head: [["Term", "Details"]],
      body: ijarahTerms,
      theme: "grid",
      headStyles: { fillColor: [0, 100, 0] },
    })

    doc.setFontSize(10)
    doc.text("AAOIFI COMPLIANCE STATEMENT", 20, doc.lastAutoTable.finalY + 20)
    doc.setFontSize(9)
    doc.text(
      "This contract complies with AAOIFI Shariah Standard No. 9 on Ijarah. The agreement clearly defines the service being leased,",
      20,
      doc.lastAutoTable.finalY + 30,
    )
    doc.text(
      "the duration, the compensation, and the responsibilities of both parties. The contract avoids prohibited elements such as",
      20,
      doc.lastAutoTable.finalY + 35,
    )
    doc.text(
      "excessive uncertainty (gharar), interest (riba), and gambling-like speculation (maysir).",
      20,
      doc.lastAutoTable.finalY + 40,
    )
  }

  // Additional terms
  doc.setFontSize(14)
  doc.text("ADDITIONAL TERMS", 20, data.contractType === "ijarah" ? doc.lastAutoTable.finalY + 60 : 20)

  doc.setFontSize(12)
  doc.text(
    data.additionalTerms || "No additional terms specified.",
    20,
    data.contractType === "ijarah" ? doc.lastAutoTable.finalY + 70 : 30,
  )

  // Signatures
  doc.setFontSize(14)
  doc.text("SIGNATURES", 20, data.contractType === "ijarah" ? doc.lastAutoTable.finalY + 100 : 60)

  doc.setFontSize(12)
  doc.text("Employer: QistasChain", 20, data.contractType === "ijarah" ? doc.lastAutoTable.finalY + 110 : 70)
  doc.line(
    20,
    data.contractType === "ijarah" ? doc.lastAutoTable.finalY + 120 : 80,
    100,
    data.contractType === "ijarah" ? doc.lastAutoTable.finalY + 120 : 80,
  )
  doc.text("Date: ____________________", 120, data.contractType === "ijarah" ? doc.lastAutoTable.finalY + 120 : 80)

  doc.text(`Employee: ${data.fullName}`, 20, data.contractType === "ijarah" ? doc.lastAutoTable.finalY + 140 : 100)
  doc.line(
    20,
    data.contractType === "ijarah" ? doc.lastAutoTable.finalY + 150 : 110,
    100,
    data.contractType === "ijarah" ? doc.lastAutoTable.finalY + 150 : 110,
  )
  doc.text("Date: ____________________", 120, data.contractType === "ijarah" ? doc.lastAutoTable.finalY + 150 : 110)

  // Legal disclaimer
  doc.setFontSize(8)
  doc.text(
    "LEGAL DISCLAIMER: This document is provided as a template and is not a substitute for legal advice. You should consult with an attorney before signing.",
    105,
    270,
    { align: "center" },
  )

  // Save the PDF
  const fileName = `${data.fullName.replace(/\s+/g, "_")}_Employment_Contract.pdf`
  doc.save(fileName)

  return fileName
}
