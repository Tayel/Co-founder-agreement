"use client"

import { Textarea } from "@/components/ui/textarea"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"

interface VestingFormProps {
  data: {
    vestingSchedule: string
    vestingPeriod: number
    cliff: number
  }
  updateData: (data: any) => void
  onNext: () => void
  onBack: () => void
}

export function VestingForm({ data, updateData, onNext, onBack }: VestingFormProps) {
  const handleVestingScheduleChange = (value: string) => {
    updateData({ vestingSchedule: value })
  }

  const handleVestingPeriodChange = (value: string) => {
    updateData({ vestingPeriod: Number.parseInt(value) })
  }

  const handleCliffChange = (value: string) => {
    updateData({ cliff: Number.parseInt(value) })
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
            Vesting schedules protect all co-founders by ensuring commitment over time. Equity is earned gradually
            rather than granted all at once.
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          <Label>Vesting Schedule Type</Label>
          <RadioGroup value={data.vestingSchedule} onValueChange={handleVestingScheduleChange}>
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="standard" id="standard" className="mt-1" />
              <div>
                <Label htmlFor="standard" className="font-medium">
                  Standard Time-Based Vesting
                </Label>
                <p className="text-sm text-muted-foreground">
                  Equity vests equally over time, typically monthly after an initial cliff period.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <RadioGroupItem value="milestone" id="milestone" className="mt-1" />
              <div>
                <Label htmlFor="milestone" className="font-medium">
                  Milestone-Based Vesting
                </Label>
                <p className="text-sm text-muted-foreground">
                  Equity vests when specific company or individual milestones are achieved.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <RadioGroupItem value="hybrid" id="hybrid" className="mt-1" />
              <div>
                <Label htmlFor="hybrid" className="font-medium">
                  Hybrid Vesting
                </Label>
                <p className="text-sm text-muted-foreground">Combines time-based and milestone-based vesting.</p>
              </div>
            </div>
          </RadioGroup>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="vestingPeriod">Total Vesting Period (Years)</Label>
            <Select value={data.vestingPeriod.toString()} onValueChange={handleVestingPeriodChange}>
              <SelectTrigger id="vestingPeriod">
                <SelectValue placeholder="Select vesting period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2">2 Years</SelectItem>
                <SelectItem value="3">3 Years</SelectItem>
                <SelectItem value="4">4 Years</SelectItem>
                <SelectItem value="5">5 Years</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cliff">Cliff Period (Years)</Label>
            <Select value={data.cliff.toString()} onValueChange={handleCliffChange}>
              <SelectTrigger id="cliff">
                <SelectValue placeholder="Select cliff period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">No Cliff</SelectItem>
                <SelectItem value="1">1 Year</SelectItem>
                <SelectItem value="2">2 Years</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {data.vestingSchedule === "milestone" && (
          <div className="space-y-2">
            <Label htmlFor="milestones">Key Milestones</Label>
            <Textarea id="milestones" placeholder="Describe the key milestones that will trigger vesting..." rows={4} />
          </div>
        )}

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
