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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

interface TransferExitFormProps {
  data: {
    transferRestrictions: string
    rightOfFirstRefusal: boolean
    tagAlong: boolean
    dragAlong: boolean
    shotgunClause: boolean
    valuationMethod: string
    exitEvents: string
    dissolutionProcess: string
  }
  updateData: (data: any) => void
  onNext: () => void
  onBack: () => void
}

export function TransferExitForm({ data, updateData, onNext, onBack }: TransferExitFormProps) {
  const handleTransferRestrictionsChange = (value: string) => {
    updateData({ transferRestrictions: value })
  }

  const handleRightOfFirstRefusalChange = (checked: boolean) => {
    updateData({ rightOfFirstRefusal: checked })
  }

  const handleTagAlongChange = (checked: boolean) => {
    updateData({ tagAlong: checked })
  }

  const handleDragAlongChange = (checked: boolean) => {
    updateData({ dragAlong: checked })
  }

  const handleShotgunClauseChange = (checked: boolean) => {
    updateData({ shotgunClause: checked })
  }

  const handleValuationMethodChange = (value: string) => {
    updateData({ valuationMethod: value })
  }

  const handleExitEventsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateData({ exitEvents: e.target.value })
  }

  const handleDissolutionProcessChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateData({ dissolutionProcess: e.target.value })
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
            Clear transfer restrictions and exit provisions help prevent disputes when co-founders want to sell their
            shares or when the company is acquired, goes public, or is dissolved.
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle>Transfer Restrictions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Label>Share Transfer Restrictions</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoIcon className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        Restrictions on co-founders' ability to transfer their shares to third parties.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <RadioGroup value={data.transferRestrictions} onValueChange={handleTransferRestrictionsChange}>
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="none" id="none" className="mt-1" />
                  <div>
                    <Label htmlFor="none" className="font-medium">
                      No Restrictions
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Co-founders can freely transfer their shares to any third party.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="board_approval" id="board_approval" className="mt-1" />
                  <div>
                    <Label htmlFor="board_approval" className="font-medium">
                      Board Approval Required
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Any transfer of shares requires approval from the board of directors.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="all_founders" id="all_founders" className="mt-1" />
                  <div>
                    <Label htmlFor="all_founders" className="font-medium">
                      All Co-Founders' Approval Required
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Any transfer of shares requires approval from all co-founders.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="complete_restriction" id="complete_restriction" className="mt-1" />
                  <div>
                    <Label htmlFor="complete_restriction" className="font-medium">
                      Complete Restriction for a Period
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      No transfers allowed for a specified period (e.g., 2 years) except in limited circumstances.
                    </p>
                  </div>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Additional Transfer Provisions</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="rightOfFirstRefusal"
                    checked={data.rightOfFirstRefusal}
                    onCheckedChange={(checked) => handleRightOfFirstRefusalChange(checked as boolean)}
                  />
                  <div>
                    <Label htmlFor="rightOfFirstRefusal" className="font-medium">
                      Right of First Refusal
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      If a co-founder wants to sell shares, other co-founders have the right to purchase them first.
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="tagAlong"
                    checked={data.tagAlong}
                    onCheckedChange={(checked) => handleTagAlongChange(checked as boolean)}
                  />
                  <div>
                    <Label htmlFor="tagAlong" className="font-medium">
                      Tag-Along Rights
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      If a co-founder sells shares to a third party, other co-founders can join the sale on the same
                      terms.
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="dragAlong"
                    checked={data.dragAlong}
                    onCheckedChange={(checked) => handleDragAlongChange(checked as boolean)}
                  />
                  <div>
                    <Label htmlFor="dragAlong" className="font-medium">
                      Drag-Along Rights
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      If a majority of co-founders agree to sell the company, minority co-founders must join the sale.
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="shotgunClause"
                    checked={data.shotgunClause}
                    onCheckedChange={(checked) => handleShotgunClauseChange(checked as boolean)}
                  />
                  <div>
                    <Label htmlFor="shotgunClause" className="font-medium">
                      Shotgun Clause
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      A co-founder can offer to buy out others at a specific price, but they must be willing to sell at
                      that same price.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Exit Strategy & Dissolution</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="valuationMethod">Valuation Method for Buy-Outs</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoIcon className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">The method used to determine the value of shares in case of a buy-out.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Select value={data.valuationMethod} onValueChange={handleValuationMethodChange} required>
                <SelectTrigger id="valuationMethod">
                  <SelectValue placeholder="Select valuation method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="multiple">Revenue/EBITDA Multiple</SelectItem>
                  <SelectItem value="appraisal">Independent Appraisal</SelectItem>
                  <SelectItem value="formula">Predetermined Formula</SelectItem>
                  <SelectItem value="bookValue">Book Value</SelectItem>
                  <SelectItem value="lastRound">Last Financing Round Valuation</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="exitEvents">Exit Events & Process</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoIcon className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        Describe potential exit scenarios (acquisition, IPO) and the process for each.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Textarea
                id="exitEvents"
                placeholder="Describe potential exit scenarios and the process for each..."
                value={data.exitEvents || ""}
                onChange={handleExitEventsChange}
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="dissolutionProcess">Dissolution Process</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoIcon className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        The process for dissolving the company and distributing assets if necessary.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Textarea
                id="dissolutionProcess"
                placeholder="Describe the process for dissolving the company and distributing assets..."
                value={data.dissolutionProcess || ""}
                onChange={handleDissolutionProcessChange}
                rows={3}
                required
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
