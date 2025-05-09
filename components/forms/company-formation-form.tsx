"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { InfoIcon } from "lucide-react"

interface CompanyFormationFormProps {
  data: {
    companyName: string
    companyType: string
    businessPurpose: string
    registeredAddress: string
    jurisdiction: string
  }
  updateData: (data: any) => void
  onNext: () => void
}

export function CompanyFormationForm({ data, updateData, onNext }: CompanyFormationFormProps) {
  const handleCompanyNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateData({ companyName: e.target.value })
  }

  const handleCompanyTypeChange = (value: string) => {
    updateData({ companyType: value })
  }

  const handleBusinessPurposeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateData({ businessPurpose: e.target.value })
  }

  const handleRegisteredAddressChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateData({ registeredAddress: e.target.value })
  }

  const handleJurisdictionChange = (value: string) => {
    updateData({ jurisdiction: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext()
  }

  const isFormValid = () => {
    return (
      data.companyName.trim() !== "" &&
      data.companyType !== "" &&
      data.businessPurpose.trim() !== "" &&
      data.registeredAddress.trim() !== "" &&
      data.jurisdiction !== ""
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <InfoIcon className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">
                            The legal name of your company as it will appear on official documents.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Input
                    id="companyName"
                    placeholder="Enter company name"
                    value={data.companyName}
                    onChange={handleCompanyNameChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="companyType">Company Type</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <InfoIcon className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">
                            The legal structure of your company, which affects taxation, liability, and governance.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Select value={data.companyType} onValueChange={handleCompanyTypeChange} required>
                    <SelectTrigger id="companyType">
                      <SelectValue placeholder="Select company type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="llc">Limited Liability Company (LLC)</SelectItem>
                      <SelectItem value="corporation">Corporation</SelectItem>
                      <SelectItem value="partnership">Partnership</SelectItem>
                      <SelectItem value="soleProprietorship">Sole Proprietorship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="businessPurpose">Business Purpose</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <InfoIcon className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">
                          A clear description of your company's primary business activities and objectives.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Textarea
                  id="businessPurpose"
                  placeholder="Describe the primary business activities and objectives of the company"
                  value={data.businessPurpose}
                  onChange={handleBusinessPurposeChange}
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="registeredAddress">Registered Address</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <InfoIcon className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">The official address of your company for legal and tax purposes.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Textarea
                  id="registeredAddress"
                  placeholder="Enter the registered address of the company"
                  value={data.registeredAddress}
                  onChange={handleRegisteredAddressChange}
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="jurisdiction">Governing Law & Jurisdiction</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <InfoIcon className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">
                          The laws and legal jurisdiction that will govern this agreement and any disputes.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Select value={data.jurisdiction} onValueChange={handleJurisdictionChange} required>
                  <SelectTrigger id="jurisdiction">
                    <SelectValue placeholder="Select jurisdiction" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="delaware">Delaware, USA</SelectItem>
                    <SelectItem value="california">California, USA</SelectItem>
                    <SelectItem value="newyork">New York, USA</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="singapore">Singapore</SelectItem>
                    <SelectItem value="other">Other (Specify in Agreement)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={!isFormValid()}>
            Next
          </Button>
        </div>
      </div>
    </form>
  )
}
