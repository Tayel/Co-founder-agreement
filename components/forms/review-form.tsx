"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { InfoIcon, Download, FileText } from "lucide-react"
import { generateComprehensivePDF } from "@/lib/comprehensive-pdf-generator"

interface ReviewFormProps {
  data: any
  onBack: () => void
  onNext: () => void
}

export function ReviewForm({ data, onBack, onNext }: ReviewFormProps) {
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGeneratePDF = async () => {
    setIsGenerating(true)
    try {
      await generateComprehensivePDF(data)
    } catch (error) {
      console.error("Error generating PDF:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-6">
      <Alert>
        <InfoIcon className="h-4 w-4" />
        <AlertDescription>
          Review your co-founder agreement details below. You can make changes by going back to previous sections.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="company">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="company">Company</TabsTrigger>
          <TabsTrigger value="equity">Equity</TabsTrigger>
          <TabsTrigger value="roles">Roles</TabsTrigger>
          <TabsTrigger value="ip">IP & Confidentiality</TabsTrigger>
          <TabsTrigger value="legal">Legal</TabsTrigger>
        </TabsList>

        <TabsContent value="company" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-4">
                <div>
                  <dt className="font-medium">Company Name</dt>
                  <dd className="text-muted-foreground">{data.companyName}</dd>
                </div>
                <div>
                  <dt className="font-medium">Company Type</dt>
                  <dd className="text-muted-foreground">
                    {data.companyType === "llc" && "Limited Liability Company (LLC)"}
                    {data.companyType === "corporation" && "Corporation"}
                    {data.companyType === "partnership" && "Partnership"}
                    {data.companyType === "soleProprietorship" && "Sole Proprietorship"}
                  </dd>
                </div>
                <div>
                  <dt className="font-medium">Business Purpose</dt>
                  <dd className="text-muted-foreground">{data.businessPurpose}</dd>
                </div>
                <div>
                  <dt className="font-medium">Registered Address</dt>
                  <dd className="text-muted-foreground">{data.registeredAddress}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Founders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.founders.map((founder: any, index: number) => (
                  <div key={index} className="rounded-lg border p-4">
                    <h4 className="font-medium">{founder.name}</h4>
                    <dl className="mt-2 space-y-2">
                      <div className="flex justify-between">
                        <dt className="text-sm text-muted-foreground">Email</dt>
                        <dd className="text-sm">{founder.email}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm text-muted-foreground">Role</dt>
                        <dd className="text-sm">{founder.role}</dd>
                      </div>
                    </dl>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="equity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Equity Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-4">
                <div>
                  <dt className="font-medium">Distribution Type</dt>
                  <dd className="text-muted-foreground">
                    {data.equityDistribution === "equal" ? "Equal Distribution" : "Custom Distribution"}
                  </dd>
                </div>

                <div>
                  <dt className="font-medium">Equity Breakdown</dt>
                  <dd className="mt-2">
                    <div className="space-y-2">
                      {data.equityDistribution === "equal"
                        ? data.founders.map((founder: any, index: number) => (
                            <div key={index} className="flex justify-between">
                              <span className="text-sm">{founder.name}</span>
                              <span className="text-sm">{(100 / data.founders.length).toFixed(1)}%</span>
                            </div>
                          ))
                        : data.customEquity.map((item: any, index: number) => (
                            <div key={index} className="flex justify-between">
                              <span className="text-sm">{item.name}</span>
                              <span className="text-sm">{item.equity.toFixed(1)}%</span>
                            </div>
                          ))}
                    </div>
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Vesting Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-4">
                <div>
                  <dt className="font-medium">Vesting Type</dt>
                  <dd className="text-muted-foreground">
                    {data.vestingSchedule === "standard" && "Standard Time-Based Vesting"}
                    {data.vestingSchedule === "milestone" && "Milestone-Based Vesting"}
                    {data.vestingSchedule === "hybrid" && "Hybrid Vesting"}
                  </dd>
                </div>
                <div>
                  <dt className="font-medium">Vesting Period</dt>
                  <dd className="text-muted-foreground">{data.vestingPeriod} years</dd>
                </div>
                <div>
                  <dt className="font-medium">Cliff Period</dt>
                  <dd className="text-muted-foreground">
                    {data.cliff} {data.cliff === 1 ? "year" : "years"}
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Capital Contributions</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-4">
                <div>
                  <dt className="font-medium">Initial Capital</dt>
                  <dd className="text-muted-foreground">${data.initialCapital}</dd>
                </div>
                {data.contributions && data.contributions.length > 0 && (
                  <div>
                    <dt className="font-medium">Contributions</dt>
                    <dd className="mt-2">
                      <div className="space-y-2">
                        {data.contributions.map((contribution: any, index: number) => (
                          <div key={index} className="rounded-lg border p-2">
                            <div className="flex justify-between">
                              <span className="text-sm">
                                {data.founders[contribution.founderIndex]?.name}: {contribution.type}
                              </span>
                              <span className="text-sm">${contribution.value}</span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">{contribution.description}</p>
                          </div>
                        ))}
                      </div>
                    </dd>
                  </div>
                )}
              </dl>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Roles & Responsibilities</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-4">
                {data.founderRoles &&
                  data.founderRoles.map((role: any, index: number) => (
                    <div key={index} className="rounded-lg border p-4">
                      <dt className="font-medium">
                        {role.name} - {role.title}
                      </dt>
                      <dd className="text-muted-foreground mt-2">
                        <p className="text-sm">
                          <span className="font-medium">Responsibilities:</span> {role.responsibilities}
                        </p>
                        {role.decisionAreas && role.decisionAreas.length > 0 && (
                          <p className="text-sm mt-1">
                            <span className="font-medium">Decision Areas:</span> {role.decisionAreas.join(", ")}
                          </p>
                        )}
                        <p className="text-sm mt-1">
                          <span className="font-medium">Time Commitment:</span> {role.timeCommitment}
                        </p>
                      </dd>
                    </div>
                  ))}
                <div>
                  <dt className="font-medium">Decision Making Process</dt>
                  <dd className="text-muted-foreground">
                    {data.decisionMaking === "majority" && "Majority Vote"}
                    {data.decisionMaking === "supermajority" && "Supermajority"}
                    {data.decisionMaking === "unanimous" && "Unanimous Consent"}
                    {data.decisionMaking === "weighted" && "Weighted Voting"}
                    {data.decisionMaking === "ceo" && "CEO Final Decision"}
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Compensation</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-4">
                {data.compensations &&
                  data.compensations.map((comp: any, index: number) => (
                    <div key={index} className="rounded-lg border p-4">
                      <dt className="font-medium">{data.founders[comp.founderIndex]?.name}</dt>
                      <dd className="text-muted-foreground mt-2">
                        <p className="text-sm">
                          <span className="font-medium">Salary:</span> ${comp.salary}/year
                        </p>
                        <p className="text-sm mt-1">
                          <span className="font-medium">Review Period:</span> {comp.salaryReviewPeriod}
                        </p>
                        {comp.benefits && comp.benefits.length > 0 && (
                          <p className="text-sm mt-1">
                            <span className="font-medium">Benefits:</span> {comp.benefits.join(", ")}
                          </p>
                        )}
                      </dd>
                    </div>
                  ))}
              </dl>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ip" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Intellectual Property</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-4">
                <div>
                  <dt className="font-medium">IP Ownership</dt>
                  <dd className="text-muted-foreground">
                    {data.ipRights === "company" && "Company Ownership"}
                    {data.ipRights === "founder" && "Founder Ownership with License"}
                    {data.ipRights === "mixed" && "Mixed Ownership"}
                  </dd>
                </div>
                {data.preExistingIP && data.preExistingIP.length > 0 && (
                  <div>
                    <dt className="font-medium">Pre-Existing IP</dt>
                    <dd className="mt-2">
                      <div className="space-y-2">
                        {data.preExistingIP.map((ip: any, index: number) => (
                          <div key={index} className="rounded-lg border p-2">
                            <p className="text-sm">
                              <span className="font-medium">{data.founders[ip.founderIndex]?.name}:</span>{" "}
                              {ip.description}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Ownership:{" "}
                              {ip.ownershipType === "retained"
                                ? "Retained by Founder"
                                : ip.ownershipType === "transferred"
                                  ? "Transferred to Company"
                                  : "Licensed to Company"}
                            </p>
                          </div>
                        ))}
                      </div>
                    </dd>
                  </div>
                )}
              </dl>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Confidentiality & Non-Compete</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-4">
                <div>
                  <dt className="font-medium">Confidentiality Term</dt>
                  <dd className="text-muted-foreground">{data.confidentialityTerm} years</dd>
                </div>
                <div>
                  <dt className="font-medium">Non-Compete Term</dt>
                  <dd className="text-muted-foreground">{data.nonCompeteTerm} months</dd>
                </div>
                <div>
                  <dt className="font-medium">Non-Solicitation Term</dt>
                  <dd className="text-muted-foreground">{data.nonSolicitTerm} months</dd>
                </div>
                <div>
                  <dt className="font-medium">Geographic Scope</dt>
                  <dd className="text-muted-foreground">{data.nonCompeteGeographic}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="legal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Transfer Restrictions & Exit</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-4">
                <div>
                  <dt className="font-medium">Transfer Restrictions</dt>
                  <dd className="text-muted-foreground">
                    {data.transferRestrictions === "none" && "No Restrictions"}
                    {data.transferRestrictions === "board_approval" && "Board Approval Required"}
                    {data.transferRestrictions === "all_founders" && "All Co-Founders' Approval Required"}
                    {data.transferRestrictions === "complete_restriction" && "Complete Restriction for a Period"}
                  </dd>
                </div>
                <div>
                  <dt className="font-medium">Additional Provisions</dt>
                  <dd className="text-muted-foreground">
                    <ul className="list-disc pl-5 space-y-1">
                      {data.rightOfFirstRefusal && <li>Right of First Refusal</li>}
                      {data.tagAlong && <li>Tag-Along Rights</li>}
                      {data.dragAlong && <li>Drag-Along Rights</li>}
                      {data.shotgunClause && <li>Shotgun Clause</li>}
                    </ul>
                  </dd>
                </div>
                <div>
                  <dt className="font-medium">Valuation Method</dt>
                  <dd className="text-muted-foreground">
                    {data.valuationMethod === "multiple" && "Revenue/EBITDA Multiple"}
                    {data.valuationMethod === "appraisal" && "Independent Appraisal"}
                    {data.valuationMethod === "formula" && "Predetermined Formula"}
                    {data.valuationMethod === "bookValue" && "Book Value"}
                    {data.valuationMethod === "lastRound" && "Last Financing Round Valuation"}
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Dispute Resolution</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-4">
                <div>
                  <dt className="font-medium">Dispute Resolution Method</dt>
                  <dd className="text-muted-foreground">
                    {data.disputeResolution === "mediation" && "Mediation First"}
                    {data.disputeResolution === "arbitration" && "Binding Arbitration"}
                    {data.disputeResolution === "hybrid" && "Hybrid Approach"}
                    {data.disputeResolution === "litigation" && "Court Litigation"}
                  </dd>
                </div>
                <div>
                  <dt className="font-medium">Governing Law</dt>
                  <dd className="text-muted-foreground">
                    {data.governingLaw === "delaware" && "Delaware, USA"}
                    {data.governingLaw === "california" && "California, USA"}
                    {data.governingLaw === "newyork" && "New York, USA"}
                    {data.governingLaw === "uk" && "United Kingdom"}
                    {data.governingLaw === "singapore" && "Singapore"}
                    {data.governingLaw === "other" && "Other (Specified in Agreement)"}
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button onClick={handleGeneratePDF} disabled={isGenerating} className="gap-2">
            {isGenerating ? (
              <>Generating...</>
            ) : (
              <>
                <Download className="h-4 w-4" /> Generate Co-Founder Agreement
              </>
            )}
          </Button>
          <Button onClick={onNext} className="gap-2 bg-primary hover:bg-primary/90">
            <FileText className="h-4 w-4" /> Create Articles of Association
          </Button>
        </div>
      </div>
    </div>
  )
}
