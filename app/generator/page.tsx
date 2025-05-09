"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Stepper } from "@/components/stepper"
import { BasicInfoForm } from "@/components/forms/basic-info-form"
import { CompanyFormationForm } from "@/components/forms/company-formation-form"
import { EquityForm } from "@/components/forms/equity-form"
import { DetailedRolesForm } from "@/components/forms/detailed-roles-form"
import { VestingForm } from "@/components/forms/vesting-form"
import { CapitalForm } from "@/components/forms/capital-form"
import { CompensationForm } from "@/components/forms/compensation-form"
import { IPConfidentialityForm } from "@/components/forms/ip-confidentiality-form"
import { TransferExitForm } from "@/components/forms/transfer-exit-form"
import { DisputeMiscForm } from "@/components/forms/dispute-misc-form"
import { ReviewForm } from "@/components/forms/review-form"
import { AOAForm } from "@/components/forms/aoa-form"
import { ArrowLeft, FileText } from "lucide-react"

const steps = [
  { id: "basic-info", title: "Basic Info", description: "Founder details" },
  { id: "company-formation", title: "Company Formation", description: "Company details" },
  { id: "equity", title: "Equity", description: "Ownership distribution" },
  { id: "roles", title: "Roles & Responsibilities", description: "Detailed roles" },
  { id: "vesting", title: "Vesting", description: "Equity vesting schedule" },
  { id: "capital", title: "Capital", description: "Initial contributions" },
  { id: "compensation", title: "Compensation", description: "Salary and benefits" },
  { id: "ip", title: "IP & Confidentiality", description: "Intellectual property" },
  { id: "transfer", title: "Transfer & Exit", description: "Share transfers" },
  { id: "dispute", title: "Dispute & Misc", description: "Legal provisions" },
  { id: "review", title: "Review", description: "Review agreement" },
  { id: "aoa", title: "Articles", description: "Articles of Association" },
]

export default function GeneratorPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    // Basic info
    companyName: "",
    companyType: "",
    founders: [
      { name: "", email: "", role: "", equity: 0 },
      { name: "", email: "", role: "", equity: 0 },
    ],

    // Company formation
    businessPurpose: "",
    registeredAddress: "",
    jurisdiction: "",

    // Equity
    equityDistribution: "equal",
    customEquity: [],

    // Roles
    decisionMaking: "majority",
    founderRoles: [],
    amendmentProcess: "",

    // Vesting
    vestingSchedule: "standard",
    vestingPeriod: 4,
    cliff: 1,

    // Capital
    initialCapital: 0,
    contributions: [],

    // Compensation
    compensations: [],
    expensePolicy: "",
    compensationReviewProcess: "",

    // IP & Confidentiality
    ipRights: "company",
    preExistingIP: [],
    confidentialityTerm: 3,
    confidentialityExclusions: "",
    nonCompeteTerm: 12,
    nonCompeteGeographic: "",
    nonSolicitTerm: 12,

    // Transfer & Exit
    transferRestrictions: "all_founders",
    rightOfFirstRefusal: true,
    tagAlong: true,
    dragAlong: true,
    shotgunClause: false,
    valuationMethod: "appraisal",
    exitEvents: "",
    dissolutionProcess: "",

    // Dispute & Misc
    disputeResolution: "hybrid",
    mediationProvider: "",
    arbitrationProvider: "",
    deadlockResolution: "",
    noticeMethod: "multiple",
    noticeAddress: "",
    severability: true,
    entireAgreement: true,
    governingLaw: "",
    additionalTerms: "",
  })

  const updateFormData = (data: any) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
      window.scrollTo(0, 0)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      window.scrollTo(0, 0)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <BasicInfoForm data={formData} updateData={updateFormData} onNext={nextStep} />
      case 1:
        return <CompanyFormationForm data={formData} updateData={updateFormData} onNext={nextStep} />
      case 2:
        return <EquityForm data={formData} updateData={updateFormData} onNext={nextStep} onBack={prevStep} />
      case 3:
        return <DetailedRolesForm data={formData} updateData={updateFormData} onNext={nextStep} onBack={prevStep} />
      case 4:
        return <VestingForm data={formData} updateData={updateFormData} onNext={nextStep} onBack={prevStep} />
      case 5:
        return <CapitalForm data={formData} updateData={updateFormData} onNext={nextStep} onBack={prevStep} />
      case 6:
        return <CompensationForm data={formData} updateData={updateFormData} onNext={nextStep} onBack={prevStep} />
      case 7:
        return <IPConfidentialityForm data={formData} updateData={updateFormData} onNext={nextStep} onBack={prevStep} />
      case 8:
        return <TransferExitForm data={formData} updateData={updateFormData} onNext={nextStep} onBack={prevStep} />
      case 9:
        return <DisputeMiscForm data={formData} updateData={updateFormData} onNext={nextStep} onBack={prevStep} />
      case 10:
        return <ReviewForm data={formData} onBack={prevStep} onNext={nextStep} />
      case 11:
        return <AOAForm data={formData} onBack={prevStep} />
      default:
        return null
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2 font-bold text-primary">
            <Link href="/" className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              <span>Co-Founder Agreement Generator</span>
            </Link>
          </div>
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Home
            </Button>
          </Link>
        </div>
      </header>
      <main className="flex-1 py-8" role="main" aria-label="Co-Founder Agreement Generator">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8">
              <h1 className="text-3xl font-bold tracking-tight text-primary">Create Your Co-Founder Agreement</h1>
              <p className="mt-2 text-muted-foreground">
                Follow the steps below to generate a comprehensive co-founder agreement and Articles of Association.
              </p>
            </div>

            <div className="mb-8">
              <Stepper steps={steps} currentStep={currentStep} />
            </div>

            <Card className="border-primary/10">
              <CardHeader>
                <CardTitle className="text-primary">{steps[currentStep].title}</CardTitle>
                <CardDescription>
                  {currentStep === 0 && "Enter basic information about your company and founders."}
                  {currentStep === 1 && "Define your company's formation details, purpose, and registered address."}
                  {currentStep === 2 && "Define how equity will be distributed among co-founders."}
                  {currentStep === 3 && "Specify detailed roles, responsibilities, and decision-making processes."}
                  {currentStep === 4 && "Set up vesting schedules to protect all parties."}
                  {currentStep === 5 && "Define initial capital contributions from each co-founder."}
                  {currentStep === 6 && "Specify compensation, benefits, and expense policies."}
                  {currentStep === 7 && "Define intellectual property ownership and confidentiality terms."}
                  {currentStep === 8 && "Establish share transfer restrictions and exit strategies."}
                  {currentStep === 9 && "Define dispute resolution mechanisms and miscellaneous legal provisions."}
                  {currentStep === 10 && "Review your agreement and generate the final document."}
                  {currentStep === 11 && "Create Articles of Association aligned with your co-founder agreement."}
                </CardDescription>
              </CardHeader>
              <CardContent>{renderStepContent()}</CardContent>
            </Card>
          </div>
        </div>
      </main>
      <footer className="border-t bg-muted/50">
        <div className="container py-6 text-center text-sm text-muted-foreground">
          <p>This tool provides general information and is not a substitute for legal advice.</p>
        </div>
      </footer>
    </div>
  )
}
