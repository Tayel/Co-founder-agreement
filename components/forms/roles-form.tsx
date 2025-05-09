"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface RolesFormProps {
  data: {
    founders: Array<{ name: string; role: string }>
    decisionMaking: string
  }
  updateData: (data: any) => void
  onNext: () => void
  onBack: () => void
}

export function RolesForm({ data, updateData, onNext, onBack }: RolesFormProps) {
  const handleDecisionMakingChange = (value: string) => {
    updateData({ decisionMaking: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext()
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Founder Roles & Responsibilities</h3>

          {data.founders.map((founder, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <h4 className="font-medium">{founder.name}</h4>

                  <div className="space-y-2">
                    <Label htmlFor={`founderResponsibilities-${index}`}>Key Responsibilities</Label>
                    <Textarea
                      id={`founderResponsibilities-${index}`}
                      placeholder={`Describe ${founder.name}'s key responsibilities...`}
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`founderAuthority-${index}`}>Decision Authority</Label>
                    <Select defaultValue="low">
                      <SelectTrigger id={`founderAuthority-${index}`}>
                        <SelectValue placeholder="Select authority level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High (Final decision maker)</SelectItem>
                        <SelectItem value="medium">Medium (Significant input)</SelectItem>
                        <SelectItem value="low">Low (Advisory input)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Decision Making Process</h3>

          <RadioGroup value={data.decisionMaking} onValueChange={handleDecisionMakingChange}>
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="majority" id="majority" className="mt-1" />
              <div>
                <Label htmlFor="majority" className="font-medium">
                  Majority Vote
                </Label>
                <p className="text-sm text-muted-foreground">
                  Decisions require a simple majority (more than 50%) of founders to approve.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <RadioGroupItem value="supermajority" id="supermajority" className="mt-1" />
              <div>
                <Label htmlFor="supermajority" className="font-medium">
                  Supermajority
                </Label>
                <p className="text-sm text-muted-foreground">
                  Decisions require a supermajority (typically 2/3 or 75%) of founders to approve.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <RadioGroupItem value="unanimous" id="unanimous" className="mt-1" />
              <div>
                <Label htmlFor="unanimous" className="font-medium">
                  Unanimous Consent
                </Label>
                <p className="text-sm text-muted-foreground">All founders must agree for a decision to be approved.</p>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <RadioGroupItem value="weighted" id="weighted" className="mt-1" />
              <div>
                <Label htmlFor="weighted" className="font-medium">
                  Weighted Voting
                </Label>
                <p className="text-sm text-muted-foreground">Voting power is proportional to equity ownership.</p>
              </div>
            </div>
          </RadioGroup>
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
