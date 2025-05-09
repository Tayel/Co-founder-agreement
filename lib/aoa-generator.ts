import { jsPDF } from "jspdf"
import autoTable from "jspdf-autotable"

export async function generateAOA(data: any) {
  // Create a new PDF document
  const doc = new jsPDF()

  // Add title
  doc.setFontSize(20)
  doc.text("ARTICLES OF ASSOCIATION", 105, 20, { align: "center" })
  doc.text(`OF ${data.companyName.toUpperCase()}`, 105, 30, { align: "center" })

  // Add date
  const today = new Date()
  doc.setFontSize(12)
  doc.text(`Date of Incorporation: ${today.toLocaleDateString()}`, 20, 40)

  // 1. Preliminary and Definitions
  doc.setFontSize(16)
  doc.text("1. PRELIMINARY AND DEFINITIONS", 20, 55)

  doc.setFontSize(12)
  doc.text("1.1 In these Articles, unless the context requires otherwise:", 20, 65)

  const definitionsData = [
    ["the Act", "means the Companies Act 2006"],
    ["the Articles", `means these articles of association of ${data.companyName}`],
    ["Director", "means a director of the Company"],
    ["Member", "means a member of the Company"],
    ["Ordinary Resolution", "has the meaning given in section 282 of the Act"],
    ["Special Resolution", "has the meaning given in section 283 of the Act"],
  ]

  autoTable(doc, {
    startY: 70,
    head: [["Term", "Definition"]],
    body: definitionsData,
    theme: "grid",
  })

  // 2. Liability of Members
  doc.setFontSize(16)
  doc.text("2. LIABILITY OF MEMBERS", 20, doc.lastAutoTable.finalY + 15)

  doc.setFontSize(12)
  if (data.companyType === "guarantee") {
    doc.text(
      `2.1 The liability of each Member is limited to ${data.aoa.guaranteeAmount}, being the amount that each Member`,
      20,
      doc.lastAutoTable.finalY + 25,
    )
    doc.text(
      "undertakes to contribute to the assets of the Company in the event of its being wound up while he is a",
      20,
      doc.lastAutoTable.finalY + 30,
    )
    doc.text("Member or within one year after he ceases to be a Member.", 20, doc.lastAutoTable.finalY + 35)
  } else {
    doc.text(
      "2.1 The liability of the Members is limited to the amount, if any, unpaid on the shares held by them.",
      20,
      doc.lastAutoTable.finalY + 25,
    )
  }

  // 3. Share Capital
  if (data.companyType !== "guarantee") {
    doc.setFontSize(16)
    doc.text("3. SHARE CAPITAL", 20, doc.lastAutoTable.finalY + 45)

    doc.setFontSize(12)
    doc.text(
      `3.1 The share capital of the Company at the time of adoption of these Articles is ${data.aoa.shareCapital}`,
      20,
      doc.lastAutoTable.finalY + 55,
    )
    doc.text(
      `divided into ${Number(data.aoa.shareCapital) / Number(data.aoa.shareValue)} ordinary shares of ${
        data.aoa.shareValue
      } each.`,
      20,
      doc.lastAutoTable.finalY + 60,
    )

    // Share transfer restrictions
    doc.text("3.2 Transfer of Shares:", 20, doc.lastAutoTable.finalY + 70)

    let transferText = ""
    switch (data.aoa.transferRestrictions) {
      case "none":
        transferText = "Shares may be transferred freely without restriction."
        break
      case "directors_approval":
        transferText =
          "The Directors may, in their absolute discretion, refuse to register the transfer of a share to any person."
        break
      case "members_approval":
        transferText =
          "No share may be transferred unless the transfer has been approved by a resolution of the Members."
        break
      case "right_of_first_refusal":
        transferText =
          "No share may be transferred unless it has first been offered to the existing Members in proportion to their holdings."
        break
    }

    doc.text(transferText, 30, doc.lastAutoTable.finalY + 75)

    // Pre-emption rights
    if (data.aoa.preEmptionRights) {
      doc.text("3.3 Pre-emption Rights:", 20, doc.lastAutoTable.finalY + 85)
      doc.text(
        "The Directors shall not allot shares to any person unless they have first been offered to the existing",
        30,
        doc.lastAutoTable.finalY + 90,
      )
      doc.text("Members in proportion to their existing holdings.", 30, doc.lastAutoTable.finalY + 95)
    }

    // Drag-along rights
    if (data.aoa.dragAlongRights) {
      doc.text("3.4 Drag-Along Rights:", 20, doc.lastAutoTable.finalY + 105)
      doc.text(
        "If the holders of 75% or more of the shares wish to transfer their shares to a third party, they may",
        30,
        doc.lastAutoTable.finalY + 110,
      )
      doc.text(
        "require all other Members to sell their shares to the same third party on the same terms.",
        30,
        doc.lastAutoTable.finalY + 115,
      )
    }

    // Tag-along rights
    if (data.aoa.tagAlongRights) {
      doc.text("3.5 Tag-Along Rights:", 20, doc.lastAutoTable.finalY + 125)
      doc.text(
        "If any Member proposes to transfer shares to a third party, all other Members shall be entitled to",
        30,
        doc.lastAutoTable.finalY + 130,
      )
      doc.text(
        "participate in the sale on the same terms in proportion to their holdings.",
        30,
        doc.lastAutoTable.finalY + 135,
      )
    }

    // Bad leaver provisions
    if (data.aoa.badLeaverProvisions) {
      doc.text("3.6 Bad Leaver Provisions:", 20, doc.lastAutoTable.finalY + 145)
      doc.text(
        "If a Member who is also an employee or director ceases to be employed or hold office in circumstances",
        30,
        doc.lastAutoTable.finalY + 150,
      )
      doc.text(
        "where they are a 'Bad Leaver' (as defined in any shareholders' agreement), they shall be deemed to",
        30,
        doc.lastAutoTable.finalY + 155,
      )
      doc.text(
        "have offered their shares for sale at the lower of fair value and subscription price.",
        30,
        doc.lastAutoTable.finalY + 160,
      )
    }
  }

  // Add a new page
  doc.addPage()

  // 4. Directors
  doc.setFontSize(16)
  doc.text("4. DIRECTORS", 20, 20)

  doc.setFontSize(12)
  doc.text("4.1 Directors' General Authority:", 20, 30)
  doc.text(
    "Subject to the Articles, the Directors are responsible for the management of the Company's business,",
    30,
    35,
  )
  doc.text("for which purpose they may exercise all the powers of the Company.", 30, 40)

  doc.text("4.2 Directors' Decision-Making:", 20, 50)
  doc.text(`4.2.1 The quorum for Directors' meetings shall be ${data.aoa.directorQuorum} Directors.`, 30, 55)
  doc.text(
    "4.2.2 Decisions of the Directors must be either a majority decision at a meeting or a decision taken in",
    30,
    60,
  )
  doc.text("accordance with Article 4.3.", 30, 65)

  doc.text("4.3 Unanimous Decisions:", 20, 75)
  doc.text(
    "A decision of the Directors is taken in accordance with this Article when all eligible Directors indicate",
    30,
    80,
  )
  doc.text("to each other by any means that they share a common view on a matter.", 30, 85)

  doc.text("4.4 Calling a Directors' Meeting:", 20, 95)
  doc.text("Any Director may call a Directors' meeting by giving notice of the meeting to the Directors or by", 30, 100)
  doc.text("authorising the Company Secretary to give such notice.", 30, 105)

  doc.text("4.5 Conflicts of Interest:", 20, 115)
  doc.text(
    "A Director must declare the nature and extent of any interest, direct or indirect, which he has in a",
    30,
    120,
  )
  doc.text("proposed transaction or arrangement with the Company or in any transaction or arrangement entered", 30, 125)
  doc.text("into by the Company which has not previously been declared.", 30, 130)

  // 5. Members and Membership
  doc.setFontSize(16)
  doc.text("5. MEMBERS AND MEMBERSHIP", 20, 145)

  doc.setFontSize(12)
  doc.text("5.1 Becoming and Ceasing to be a Member:", 20, 155)
  doc.text("A person becomes a Member when that person's name is entered in the register of Members and", 30, 160)
  doc.text("ceases to be a Member when that person's name is removed from the register of Members.", 30, 165)

  // 6. General Meetings
  doc.setFontSize(16)
  doc.text("6. GENERAL MEETINGS", 20, 180)

  doc.setFontSize(12)
  doc.text("6.1 Attendance and Speaking at General Meetings:", 20, 190)
  doc.text(
    "A person is able to exercise the right to speak at a general meeting when that person is in a position",
    30,
    195,
  )
  doc.text(
    "to communicate to all those attending the meeting, during the meeting, any information or opinions",
    30,
    200,
  )
  doc.text("which that person has on the business of the meeting.", 30, 205)

  doc.text("6.2 Quorum for General Meetings:", 20, 215)
  doc.text(
    `No business other than the appointment of the chairman of the meeting is to be transacted at a general`,
    30,
    220,
  )
  doc.text(
    `meeting if the persons attending it do not constitute a quorum of at least ${data.aoa.memberQuorum} Members.`,
    30,
    225,
  )

  // Add a new page
  doc.addPage()

  // 7. Administrative Provisions
  doc.setFontSize(16)
  doc.text("7. ADMINISTRATIVE PROVISIONS", 20, 20)

  doc.setFontSize(12)
  doc.text("7.1 Means of Communication to be Used:", 20, 30)
  doc.text("Any notice, document or other information shall be deemed served on or delivered to the intended", 30, 35)
  doc.text(
    "recipient when properly addressed and sent or supplied by prepaid post, electronic mail, or personal",
    30,
    40,
  )
  doc.text("delivery.", 30, 45)

  doc.text("7.2 Company Seals:", 20, 55)
  doc.text("A common seal may only be used by the authority of the Directors. The Directors may decide by what", 30, 60)
  doc.text("means and in what form any common seal is to be used.", 30, 65)

  doc.text("7.3 Registered Office:", 20, 75)
  doc.text(
    `The Company's registered office is at ${data.aoa.registeredOffice || "[Address to be determined]"}.`,
    30,
    80,
  )

  // 8. Finance, Accounts & Audit
  doc.setFontSize(16)
  doc.text("8. FINANCE, ACCOUNTS & AUDIT", 20, 95)

  doc.setFontSize(12)
  doc.text("8.1 Financial Year:", 20, 105)
  doc.text(`The Company's financial year end shall be ${data.aoa.financialYear}.`, 30, 110)

  doc.text("8.2 Dividend Policy:", 20, 120)
  let dividendText = ""
  switch (data.aoa.dividendPolicy) {
    case "directors_discretion":
      dividendText =
        "The Directors may decide to declare and pay dividends if they appear to be justified by the profits of the Company available for distribution."
      break
    case "mandatory_distribution":
      dividendText =
        "The Company shall distribute at least 50% of its available profits each year, subject to having sufficient reserves to meet its ongoing obligations."
      break
    case "shariah_compliant":
      dividendText =
        "Profits shall be distributed in accordance with Shariah principles. No fixed returns shall be guaranteed, and losses shall be borne in proportion to capital contribution."
      break
  }
  doc.text(dividendText, 30, 125, { maxWidth: 150 })

  doc.text("8.3 Audit Requirements:", 20, 145)
  let auditText = ""
  switch (data.aoa.auditRequirement) {
    case "exempt":
      auditText =
        "The Company shall be exempt from the requirement to have its accounts audited, subject to compliance with the relevant provisions of the Companies Act 2006."
      break
    case "required":
      auditText =
        "The Company shall appoint an auditor to audit its annual accounts in accordance with the Companies Act 2006."
      break
    case "members_decision":
      auditText =
        "The Members shall decide at each annual general meeting whether the Company's accounts should be audited for the following financial year."
      break
  }
  doc.text(auditText, 30, 150, { maxWidth: 150 })

  // 9. Dispute Resolution
  doc.setFontSize(16)
  doc.text("9. DISPUTE RESOLUTION", 20, 170)

  doc.setFontSize(12)
  let disputeText = ""
  switch (data.aoa.disputeResolution) {
    case "mediation":
      disputeText =
        "Any dispute arising between the Members or between the Members and the Company shall first be referred to mediation before any legal proceedings are commenced."
      break
    case "arbitration":
      disputeText =
        "Any dispute arising between the Members or between the Members and the Company shall be referred to and finally resolved by arbitration under the rules of an appropriate arbitration body."
      break
    case "hybrid":
      disputeText =
        "Any dispute shall first be referred to mediation, and if not resolved within 30 days, shall be referred to binding arbitration."
      break
    case "litigation":
      disputeText = "Any dispute may be resolved through the courts in accordance with the applicable law."
      break
    case "islamic_arbitration":
      disputeText =
        "Any dispute shall be resolved through Islamic arbitration (Sulḥ) in accordance with Shariah principles by a qualified Islamic scholar or panel of scholars."
      break
  }
  doc.text(disputeText, 30, 180, { maxWidth: 150 })

  // 10. Additional Provisions
  if (data.aoa.additionalProvisions) {
    doc.setFontSize(16)
    doc.text("10. ADDITIONAL PROVISIONS", 20, 200)
    doc.setFontSize(12)
    doc.text(data.aoa.additionalProvisions, 30, 210, { maxWidth: 150 })
  }

  // Add signatures
  doc.addPage()
  doc.setFontSize(16)
  doc.text("SIGNATURES", 105, 20, { align: "center" })

  doc.setFontSize(12)
  doc.text("The subscribers to these Articles of Association wish to form a company pursuant to these Articles", 20, 40)
  doc.text("and agree to become Members of the Company:", 20, 45)

  let signatureY = 65
  data.founders.forEach((founder: any, index: number) => {
    doc.text(`Name: ${founder.name}`, 20, signatureY)
    doc.line(20, signatureY + 5, 100, signatureY + 5)
    doc.text(`Date: ____________________`, 120, signatureY)
    signatureY += 25
  })

  // Legal disclaimer
  doc.setFontSize(10)
  doc.text(
    "LEGAL DISCLAIMER: These Articles of Association are provided as a template and should be reviewed by a qualified legal professional before adoption.",
    105,
    270,
    { align: "center" },
  )

  // Save the PDF
  doc.save(`${data.companyName.replace(/\s+/g, "_")}_Articles_of_Association.pdf`)

  return true
}
