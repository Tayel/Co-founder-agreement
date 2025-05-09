"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { InfoIcon } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface DisputeMiscFormProps {
  data: {
    disputeResolution: string
    mediationProvider: string
    arbitrationProvider: string
    deadlockResolution: string
    noticeMethod: string
    noticeAddress: string
    amendmentProcess: string
    severability: boolean
    entireAgreement: boolean
    governingLaw: string
    additionalTerms: string
  }
  updateData: (data: any) => void
  onNext: () => void
  onBack: () => void
}

export function DisputeMiscForm({ data, updateData, onNext, onBack }: DisputeMiscFormProps) {
  const handleDisputeResolutionChange = (value: string) => {
    updateData({ disputeResolution: value })
  }

  const handleMediationProviderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateData({ mediationProvider: e.target.value })
  }

  const handleArbitrationProviderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateData({ arbitrationProvider: e.target.value })
  }

  const handleDeadlockResolutionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateData({ deadlockResolution: e.target.value })
  }

  const handleNoticeMethodChange = (value: string) => {
    updateData({ noticeMethod: value })
  }

  const handleNoticeAddressChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateData({ noticeAddress: e.target.value })
  }

  const handleAmendmentProcessChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateData({ amendmentProcess: e.target.value })
  }

  const handleSeverabilityChange = (checked: boolean) => {
    updateData({ severability: checked })
  }

  const handleEntireAgreementChange = (checked: boolean) => {
    updateData({ entireAgreement: checked })
  }

  const handleGoverningLawChange = (value: string) => {
    updateData({ governingLaw: value })
  }

  const handleAdditionalTermsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateData({ additionalTerms: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext()
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <Alert>
          <InfoIcon className="h-4 w-4" />
          <AlertDescription>
            Establishing clear dispute resolution mechanisms and miscellaneous legal provisions helps ensure the
            agreement is comprehensive and legally sound.
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle>Dispute Resolution</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Label>Dispute Resolution Method</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoIcon className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        The method used to resolve disputes between co-founders or between co-founders and the company.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <RadioGroup value={data.disputeResolution} onValueChange={handleDisputeResolutionChange}>
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="mediation" id="mediation" className="mt-1" />
                  <div>
                    <Label htmlFor="mediation" className="font-medium">
                      Mediation First
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Disputes are first addressed through mediation with a neutral third party before any legal action.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="arbitration" id="arbitration" className="mt-1" />
                  <div>
                    <Label htmlFor="arbitration" className="font-medium">
                      Binding Arbitration
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Disputes are resolved through binding arbitration rather than court litigation.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="hybrid" id="hybrid" className="mt-1" />
                  <div>
                    <Label htmlFor="hybrid" className="font-medium">
                      Hybrid Approach
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Mediation first, followed by binding arbitration if mediation fails.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="litigation" id="litigation" className="mt-1" />
                  <div>
                    <Label htmlFor="litigation" className="font-medium">
                      Court Litigation
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Disputes are resolved through traditional court proceedings.
                    </p>
                  </div>
                </div>
              </RadioGroup>
            </div>

            {(data.disputeResolution === "mediation" || data.disputeResolution === "hybrid") && (
              <div className="space-y-2">
                <Label htmlFor="mediationProvider">Mediation Provider</Label>
                <Input
                  id="mediationProvider"
                  placeholder="Enter mediation provider (e.g., 'American Arbitration Association')"
                  value={data.mediationProvider || ""}
                  onChange={handleMediationProviderChange}
                  required
                />
              </div>
            )}

            {(data.disputeResolution === "arbitration" || data.disputeResolution === "hybrid") && (
              <div className="space-y-2">
                <Label htmlFor="arbitrationProvider">Arbitration Provider</Label>
                <Input
                  id="arbitrationProvider"
                  placeholder="Enter arbitration provider (e.g., 'JAMS')"
                  value={data.arbitrationProvider || ""}
                  onChange={handleArbitrationProviderChange}
                  required
                />
              </div>
            )}

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="deadlockResolution">Deadlock Resolution</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoIcon className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        How deadlocks (equal voting power situations with no resolution) will be handled.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Textarea
                id="deadlockResolution"
                placeholder="Describe how deadlocks will be resolved..."
                value={data.deadlockResolution || ""}
                onChange={handleDeadlockResolutionChange}
                rows={3}
                required
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Miscellaneous Provisions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="noticeMethod">Notice Method</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoIcon className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        How official notices under the agreement will be delivered to co-founders.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Select value={data.noticeMethod} onValueChange={handleNoticeMethodChange} required>
                <SelectTrigger id="noticeMethod">
                  <SelectValue placeholder="Select notice method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="certified_mail">Certified Mail</SelectItem>
                  <SelectItem value="personal_delivery">Personal Delivery</SelectItem>
                  <SelectItem value="multiple">Multiple Methods</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="noticeAddress">Notice Address</Label>
              <Textarea
                id="noticeAddress"
                placeholder="Specify where notices should be sent (e.g., 'To the email addresses listed in this agreement')"
                value={data.noticeAddress || ""}
                onChange={handleNoticeAddressChange}
                rows={2}
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="amendmentProcess">Amendment Process</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoIcon className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">The process for amending or modifying this agreement in the future.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Textarea
                id="amendmentProcess"
                placeholder="Describe the process for amending this agreement..."
                value={data.amendmentProcess || ""}
                onChange={handleAmendmentProcessChange}
                rows={2}
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label>Standard Legal Provisions</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoIcon className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">Standard legal provisions that are typically included in contracts.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="severability"
                    checked={data.severability !== false}
                    onChange={(e) => handleSeverabilityChange(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <div>
                    <Label htmlFor="severability" className="font-medium">
                      Severability
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      If any provision is found to be invalid, the rest of the agreement remains in effect.
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="entireAgreement"
                    checked={data.entireAgreement !== false}
                    onChange={(e) => handleEntireAgreementChange(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <div>
                    <Label htmlFor="entireAgreement" className="font-medium">
                      Entire Agreement
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      This agreement constitutes the entire understanding between the parties.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="governingLaw">Governing Law</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoIcon className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        The jurisdiction whose laws will govern the interpretation and enforcement of this agreement.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Select value={data.governingLaw} onValueChange={handleGoverningLawChange} required>
                <SelectTrigger id="governingLaw">
                  <SelectValue placeholder="Select governing law" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="delaware">Delaware, USA</SelectItem>
                  <SelectItem value="california">California, USA</SelectItem>
                  <SelectItem value="newyork">New York, USA</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="singapore">Singapore</SelectItem>
                  <SelectItem value="other">Other (Specify in Additional Terms)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="additionalTerms">Additional Terms & Conditions</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoIcon className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        Any additional terms or conditions not covered in the previous sections.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Textarea
                id="additionalTerms"
                placeholder="Enter any additional terms or conditions..."
                value={data.additionalTerms || ""}
                onChange={handleAdditionalTermsChange}
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button type="submit">Next</Button>
        </div>
      </div>
    </form>
  )
}
