"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface ExitFormProps {
  data: {
    exitStrategy: string
    valuationMethod: string
  }
  updateData: (data: any) => void
  onNext: () => void
  onBack: () => void
}

export function ExitForm({ data, updateData, onNext, onBack }: ExitFormProps) {
  const handleExitStrategyChange = (value: string) => {
    updateData({ exitStrategy: value })
  }

  const handleValuationMethodChange = (value: string) => {
    updateData({ valuationMethod: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext()
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <div className="space-y-4">
          <Label>Exit Strategy & Buy-Out Provisions</Label>
          <RadioGroup value={data.exitStrategy} onValueChange={handleExitStrategyChange}>
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="rightOfFirstRefusal" id="rightOfFirstRefusal" className="mt-1" />
              <div>
                <Label htmlFor="rightOfFirstRefusal" className="font-medium">
                  Right of First Refusal
                </Label>
                <p className="text-sm text-muted-foreground">
                  If a founder wants to sell their shares, other founders have the right to purchase them first.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <RadioGroupItem value="tagAlong" id="tagAlong" className="mt-1" />
              <div>
                <Label htmlFor="tagAlong" className="font-medium">
                  Tag-Along Rights
                </Label>
                <p className="text-sm text-muted-foreground">
                  If a founder sells shares to a third party, other founders can join the sale on the same terms.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <RadioGroupItem value="dragAlong" id="dragAlong" className="mt-1" />
              <div>
                <Label htmlFor="dragAlong" className="font-medium">
                  Drag-Along Rights
                </Label>
                <p className="text-sm text-muted-foreground">
                  If a majority of founders agree to sell the company, minority founders must join the sale.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <RadioGroupItem value="shotgunClause" id="shotgunClause" className="mt-1" />
              <div>
                <Label htmlFor="shotgunClause" className="font-medium">
                  Shotgun Clause
                </Label>
                <p className="text-sm text-muted-foreground">
                  A founder can offer to buy out others at a specific price, but they must be willing to sell at that
                  same price.
                </p>
              </div>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-4">
          <Label htmlFor="valuationMethod">Valuation Method for Buy-Outs</Label>
          <Select value={data.valuationMethod} onValueChange={handleValuationMethodChange}>
            <SelectTrigger id="valuationMethod">
              <SelectValue placeholder="Select valuation method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="multiple">Revenue/EBITDA Multiple</SelectItem>
              <SelectItem value="appraisal">Independent Appraisal</SelectItem>
              <SelectItem value="formula">Predetermined Formula</SelectItem>
              <SelectItem value="bookValue">Book Value</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="exitTriggers">Exit Triggers</Label>
          <Textarea
            id="exitTriggers"
            placeholder="Describe events that would trigger a buy-out (e.g., death, disability, voluntary departure)..."
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
