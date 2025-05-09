"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { InfoIcon, Download } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { generateAOA } from "@/lib/aoa-generator"

interface AOAFormProps {
  data: any
  onBack: () => void
}

export function AOAForm({ data, onBack }: AOAFormProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [aoaData, setAoaData] = useState({
    companyName: data.companyName || "",
    companyType: data.companyType || "",
    shareCapital: "10000",
    shareValue: "1",
    guaranteeAmount: "1",
    directorQuorum: "2",
    memberQuorum: "2",
    financialYear: "31 December",
    registeredOffice: "",
    dividendPolicy: "directors_discretion",
    transferRestrictions: "directors_approval",
    preEmptionRights: true,
    dragAlongRights: true,
    tagAlongRights: true,
    badLeaverProvisions: true,
    disputeResolution: data.disputeResolution || "mediation",
    auditRequirement: "exempt",
    additionalProvisions: "",
  })

  const handleChange = (field: string, value: string | boolean) => {
    setAoaData((prev) => ({ ...prev, [field]: value }))
  }

  const handleGenerateAOA = async () => {
    setIsGenerating(true)
    try {
      await generateAOA({ ...data, aoa: aoaData })
    } catch (error) {
      console.error("Error generating AOA:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-6">
      <Alert>
        <InfoIcon className="h-4 w-4" />
        <AlertDescription>
          Complete the information below to generate Articles of Association aligned with your co-founder agreement.
          These articles will establish the formal rules governing your company.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="preliminary">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="preliminary">Preliminary</TabsTrigger>
          <TabsTrigger value="shares">Shares & Capital</TabsTrigger>
          <TabsTrigger value="governance">Governance</TabsTrigger>
        </TabsList>

        <TabsContent value="preliminary" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    value={aoaData.companyName}
                    onChange={(e) => handleChange("companyName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyType">Company Type</Label>
                  <Select value={aoaData.companyType} onValueChange={(value) => handleChange("companyType", value)}>
                    <SelectTrigger id="companyType">
                      <SelectValue placeholder="Select company type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="llc">Limited Liability Company (LLC)</SelectItem>
                      <SelectItem value="corporation">Corporation</SelectItem>
                      <SelectItem value="partnership">Partnership</SelectItem>
                      <SelectItem value="guarantee">Company Limited by Guarantee</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="registeredOffice">Registered Office Address</Label>
                <Textarea
                  id="registeredOffice"
                  value={aoaData.registeredOffice}
                  onChange={(e) => handleChange("registeredOffice", e.target.value)}
                  placeholder="Enter the registered office address of the company"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="financialYear">Financial Year End</Label>
                <Select value={aoaData.financialYear} onValueChange={(value) => handleChange("financialYear", value)}>
                  <SelectTrigger id="financialYear">
                    <SelectValue placeholder="Select financial year end" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="31 December">31 December</SelectItem>
                    <SelectItem value="31 March">31 March</SelectItem>
                    <SelectItem value="30 June">30 June</SelectItem>
                    <SelectItem value="30 September">30 September</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shares" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Share Capital & Member Liability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {(aoaData.companyType === "llc" || aoaData.companyType === "corporation") && (
                <>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="shareCapital">Authorized Share Capital</Label>
                      <Input
                        id="shareCapital"
                        type="number"
                        value={aoaData.shareCapital}
                        onChange={(e) => handleChange("shareCapital", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="shareValue">Nominal Value per Share</Label>
                      <Input
                        id="shareValue"
                        type="number"
                        value={aoaData.shareValue}
                        onChange={(e) => handleChange("shareValue", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Share Transfer Restrictions</Label>
                    <Select
                      value={aoaData.transferRestrictions}
                      onValueChange={(value) => handleChange("transferRestrictions", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select transfer restrictions" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No Restrictions</SelectItem>
                        <SelectItem value="directors_approval">Directors' Approval Required</SelectItem>
                        <SelectItem value="members_approval">Members' Approval Required</SelectItem>
                        <SelectItem value="right_of_first_refusal">Right of First Refusal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="preEmptionRights"
                        checked={aoaData.preEmptionRights as boolean}
                        onCheckedChange={(checked) => handleChange("preEmptionRights", checked as boolean)}
                      />
                      <Label htmlFor="preEmptionRights">Pre-emption Rights on New Issues</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="dragAlongRights"
                        checked={aoaData.dragAlongRights as boolean}
                        onCheckedChange={(checked) => handleChange("dragAlongRights", checked as boolean)}
                      />
                      <Label htmlFor="dragAlongRights">Drag-Along Rights</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="tagAlongRights"
                        checked={aoaData.tagAlongRights as boolean}
                        onCheckedChange={(checked) => handleChange("tagAlongRights", checked as boolean)}
                      />
                      <Label htmlFor="tagAlongRights">Tag-Along Rights</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="badLeaverProvisions"
                        checked={aoaData.badLeaverProvisions as boolean}
                        onCheckedChange={(checked) => handleChange("badLeaverProvisions", checked as boolean)}
                      />
                      <Label htmlFor="badLeaverProvisions">Bad Leaver Provisions</Label>
                    </div>
                  </div>
                </>
              )}

              {aoaData.companyType === "guarantee" && (
                <div className="space-y-2">
                  <Label htmlFor="guaranteeAmount">Guarantee Amount</Label>
                  <Input
                    id="guaranteeAmount"
                    type="number"
                    value={aoaData.guaranteeAmount}
                    onChange={(e) => handleChange("guaranteeAmount", e.target.value)}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="governance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Directors & Meetings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="directorQuorum">Director Meeting Quorum</Label>
                  <Input
                    id="directorQuorum"
                    type="number"
                    value={aoaData.directorQuorum}
                    onChange={(e) => handleChange("directorQuorum", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="memberQuorum">Member Meeting Quorum</Label>
                  <Input
                    id="memberQuorum"
                    type="number"
                    value={aoaData.memberQuorum}
                    onChange={(e) => handleChange("memberQuorum", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Dividend Policy</Label>
                <RadioGroup
                  value={aoaData.dividendPolicy}
                  onValueChange={(value) => handleChange("dividendPolicy", value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="directors_discretion" id="directors_discretion" />
                    <Label htmlFor="directors_discretion">Directors' Discretion</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="mandatory_distribution" id="mandatory_distribution" />
                    <Label htmlFor="mandatory_distribution">Mandatory Distribution of Profits</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="shariah_compliant" id="shariah_compliant" />
                    <Label htmlFor="shariah_compliant">Shariah-Compliant Profit Distribution</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Dispute Resolution</Label>
                <RadioGroup
                  value={aoaData.disputeResolution}
                  onValueChange={(value) => handleChange("disputeResolution", value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="mediation" id="mediation_aoa" />
                    <Label htmlFor="mediation_aoa">Mediation First</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="arbitration" id="arbitration_aoa" />
                    <Label htmlFor="arbitration_aoa">Binding Arbitration</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="hybrid" id="hybrid_aoa" />
                    <Label htmlFor="hybrid_aoa">Hybrid Approach</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="litigation" id="litigation_aoa" />
                    <Label htmlFor="litigation_aoa">Court Litigation</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="islamic_arbitration" id="islamic_arbitration" />
                    <Label htmlFor="islamic_arbitration">Islamic Arbitration (Sulḥ)</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Audit Requirement</Label>
                <Select
                  value={aoaData.auditRequirement}
                  onValueChange={(value) => handleChange("auditRequirement", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select audit requirement" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="exempt">Exempt from Audit</SelectItem>
                    <SelectItem value="required">Audit Required</SelectItem>
                    <SelectItem value="members_decision">Members to Decide Annually</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="additionalProvisions">Additional Provisions</Label>
                <Textarea
                  id="additionalProvisions"
                  value={aoaData.additionalProvisions}
                  onChange={(e) => handleChange("additionalProvisions", e.target.value)}
                  placeholder="Enter any additional provisions or special clauses"
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={handleGenerateAOA} disabled={isGenerating} className="gap-2">
          {isGenerating ? (
            <>Generating...</>
          ) : (
            <>
              <Download className="h-4 w-4" /> Generate Articles of Association
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
