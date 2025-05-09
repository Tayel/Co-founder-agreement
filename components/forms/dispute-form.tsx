"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"

interface DisputeFormProps {
  data: {
    disputeResolution: string
  }
  updateData: (data: any) => void
  onNext: () => void
  onBack: () => void
}

export function DisputeForm({ data, updateData, onNext, onBack }: DisputeFormProps) {
  const handleDisputeResolutionChange = (value: string) => {
    updateData({ disputeResolution: value })
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
            Establishing a clear dispute resolution process can save time, money, and relationships if conflicts arise.
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          <Label>Dispute Resolution Method</Label>
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

        <div className="space-y-2">
          <Label htmlFor="deadlockResolution">Deadlock Resolution</Label>
          <Textarea
            id="deadlockResolution"
            placeholder="Describe how deadlocks (equal voting power situations with no resolution) will be handled..."
            rows={3}
          />
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
