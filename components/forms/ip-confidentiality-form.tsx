"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { InfoIcon, PlusCircle, Trash2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface PreExistingIP {
  founderIndex: number
  description: string
  ownershipType: string
  licenseTerms?: string
}

interface IPConfidentialityFormProps {
  data: {
    founders: Array<{ name: string }>
    ipRights: string
    preExistingIP: PreExistingIP[]
    confidentialityTerm: number
    confidentialityExclusions: string
    nonCompeteTerm: number
    nonCompeteGeographic: string
    nonSolicitTerm: number
  }
  updateData: (data: any) => void
  onNext: () => void
  onBack: () => void
}

export function IPConfidentialityForm({ data, updateData, onNext, onBack }: IPConfidentialityFormProps) {
  const [preExistingIP, setPreExistingIP] = useState<PreExistingIP[]>(
    data.preExistingIP?.length > 0
      ? data.preExistingIP
      : [{ founderIndex: 0, description: "", ownershipType: "retained", licenseTerms: "" }],
  )

  const handleIPRightsChange = (value: string) => {
    updateData({ ipRights: value })
  }

  const handlePreExistingIPChange = (index: number, field: keyof PreExistingIP, value: string | number) => {
    const updatedPreExistingIP = [...preExistingIP]
    updatedPreExistingIP[index] = { ...updatedPreExistingIP[index], [field]: value }
    setPreExistingIP(updatedPreExistingIP)
    updateData({ preExistingIP: updatedPreExistingIP })
  }

  const addPreExistingIP = () => {
    const updatedPreExistingIP = [
      ...preExistingIP,
      { founderIndex: 0, description: "", ownershipType: "retained", licenseTerms: "" },
    ]
    setPreExistingIP(updatedPreExistingIP)
    updateData({ preExistingIP: updatedPreExistingIP })
  }

  const removePreExistingIP = (index: number) => {
    if (preExistingIP.length > 1) {
      const updatedPreExistingIP = preExistingIP.filter((_, i) => i !== index)
      setPreExistingIP(updatedPreExistingIP)
      updateData({ preExistingIP: updatedPreExistingIP })
    }
  }

  const handleConfidentialityTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateData({ confidentialityTerm: Number(e.target.value) })
  }

  const handleConfidentialityExclusionsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateData({ confidentialityExclusions: e.target.value })
  }

  const handleNonCompeteTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateData({ nonCompeteTerm: Number(e.target.value) })
  }

  const handleNonCompeteGeographicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateData({ nonCompeteGeographic: e.target.value })
  }

  const handleNonSolicitTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateData({ nonSolicitTerm: Number(e.target.value) })
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
            Intellectual property (IP) is often a startup's most valuable asset. Clear ownership rules and
            confidentiality provisions are essential to protect the company's innovations and competitive advantage.
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle>Intellectual Property Ownership</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Label>IP Ownership for Work Created During Employment</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoIcon className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        Determines who owns intellectual property created by co-founders during their work for the
                        company.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <RadioGroup value={data.ipRights} onValueChange={handleIPRightsChange}>
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="company" id="company" className="mt-1" />
                  <div>
                    <Label htmlFor="company" className="font-medium">
                      Company Ownership
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      All IP created by founders during their involvement with the company belongs to the company.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="founder" id="founder" className="mt-1" />
                  <div>
                    <Label htmlFor="founder" className="font-medium">
                      Founder Ownership with License
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Founders retain ownership of IP they create but grant the company an exclusive license to use it.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="mixed" id="mixed" className="mt-1" />
                  <div>
                    <Label htmlFor="mixed" className="font-medium">
                      Mixed Ownership
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Some IP belongs to the company, while other IP remains with individual founders.
                    </p>
                  </div>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-medium">Pre-Existing Intellectual Property</h3>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <InfoIcon className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">
                      IP that co-founders created before joining the company that may be used by the company.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Button type="button" variant="outline" size="sm" onClick={addPreExistingIP} className="gap-1">
              <PlusCircle className="h-4 w-4" /> Add Pre-Existing IP
            </Button>
          </div>

          {preExistingIP.map((ip, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor={`founderIndex-${index}`}>Owner</Label>
                    <Select
                      value={ip.founderIndex.toString()}
                      onValueChange={(value) => handlePreExistingIPChange(index, "founderIndex", Number(value))}
                      required
                    >
                      <SelectTrigger id={`founderIndex-${index}`}>
                        <SelectValue placeholder="Select founder" />
                      </SelectTrigger>
                      <SelectContent>
                        {data.founders.map((founder, idx) => (
                          <SelectItem key={idx} value={idx.toString()}>
                            {founder.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`ownershipType-${index}`}>Ownership Type</Label>
                    <Select
                      value={ip.ownershipType}
                      onValueChange={(value) => handlePreExistingIPChange(index, "ownershipType", value)}
                      required
                    >
                      <SelectTrigger id={`ownershipType-${index}`}>
                        <SelectValue placeholder="Select ownership type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="retained">Retained by Founder</SelectItem>
                        <SelectItem value="transferred">Transferred to Company</SelectItem>
                        <SelectItem value="licensed">Licensed to Company</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor={`description-${index}`}>Description</Label>
                    <Textarea
                      id={`description-${index}`}
                      placeholder="Describe the pre-existing intellectual property in detail..."
                      value={ip.description}
                      onChange={(e) => handlePreExistingIPChange(index, "description", e.target.value)}
                      rows={2}
                      required
                    />
                  </div>
                  {ip.ownershipType === "licensed" && (
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor={`licenseTerms-${index}`}>License Terms</Label>
                      <Textarea
                        id={`licenseTerms-${index}`}
                        placeholder="Describe the terms of the license (e.g., exclusive, non-exclusive, duration, royalties)..."
                        value={ip.licenseTerms || ""}
                        onChange={(e) => handlePreExistingIPChange(index, "licenseTerms", e.target.value)}
                        rows={2}
                        required
                      />
                    </div>
                  )}
                  <div className="flex items-end">
                    {preExistingIP.length > 1 && (
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => removePreExistingIP(index)}
                        className="gap-1"
                      >
                        <Trash2 className="h-4 w-4" /> Remove
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Confidentiality</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="confidentialityTerm">Confidentiality Term (Years)</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <InfoIcon className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">
                          How long the confidentiality obligations will remain in effect after a co-founder leaves the
                          company.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id="confidentialityTerm"
                  type="number"
                  placeholder="Enter number of years"
                  value={data.confidentialityTerm || ""}
                  onChange={handleConfidentialityTermChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="confidentialityExclusions">Confidentiality Exclusions</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoIcon className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        Information that is excluded from confidentiality obligations (e.g., publicly available
                        information).
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Textarea
                id="confidentialityExclusions"
                placeholder="Describe exclusions from confidentiality obligations..."
                value={data.confidentialityExclusions || ""}
                onChange={handleConfidentialityExclusionsChange}
                rows={3}
                required
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Non-Compete & Non-Solicitation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="nonCompeteTerm">Non-Compete Term (Months)</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <InfoIcon className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">
                          How long co-founders are restricted from competing with the company after leaving.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id="nonCompeteTerm"
                  type="number"
                  placeholder="Enter number of months"
                  value={data.nonCompeteTerm || ""}
                  onChange={handleNonCompeteTermChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="nonCompeteGeographic">Geographic Scope</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <InfoIcon className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">The geographic area where the non-compete restrictions apply.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id="nonCompeteGeographic"
                  placeholder="Enter geographic scope (e.g., 'United States', '50-mile radius')"
                  value={data.nonCompeteGeographic || ""}
                  onChange={handleNonCompeteGeographicChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="nonSolicitTerm">Non-Solicitation Term (Months)</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <InfoIcon className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">
                          How long co-founders are restricted from soliciting employees, customers, or suppliers after
                          leaving.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id="nonSolicitTerm"
                  type="number"
                  placeholder="Enter number of months"
                  value={data.nonSolicitTerm || ""}
                  onChange={handleNonSolicitTermChange}
                  required
                />
              </div>
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
