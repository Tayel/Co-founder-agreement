"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"

interface IPFormProps {
  data: {
    ipRights: string
  }
  updateData: (data: any) => void
  onNext: () => void
  onBack: () => void
}

export function IPForm({ data, updateData, onNext, onBack }: IPFormProps) {
  const handleIPRightsChange = (value: string) => {
    updateData({ ipRights: value })
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
            Intellectual property (IP) is often a startup's most valuable asset. Clear ownership rules prevent future
            disputes.
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          <Label>Intellectual Property Ownership</Label>
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

        <div className="space-y-4">
          <Label>IP Protection Measures</Label>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="confidentiality" />
              <Label htmlFor="confidentiality" className="text-sm font-medium">
                Confidentiality Provisions
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="nonCompete" />
              <Label htmlFor="nonCompete" className="text-sm font-medium">
                Non-Compete Clauses
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="nonSolicitation" />
              <Label htmlFor="nonSolicitation" className="text-sm font-medium">
                Non-Solicitation Provisions
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="assignment" />
              <Label htmlFor="assignment" className="text-sm font-medium">
                IP Assignment Clauses
              </Label>
            </div>
          </div>
        </div>

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
