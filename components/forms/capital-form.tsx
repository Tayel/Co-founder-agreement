"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { InfoIcon, PlusCircle, Trash2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Contribution {
  founderIndex: number
  type: string
  description: string
  value: number
  valuationMethod?: string
}

interface CapitalFormProps {
  data: {
    founders: Array<{ name: string }>
    initialCapital: number
    contributions: Contribution[]
  }
  updateData: (data: any) => void
  onNext: () => void
  onBack: () => void
}

export function CapitalForm({ data, updateData, onNext, onBack }: CapitalFormProps) {
  const [contributions, setContributions] = useState<Contribution[]>(
    data.contributions.length > 0
      ? data.contributions
      : [{ founderIndex: 0, type: "cash", description: "", value: 0, valuationMethod: "" }],
  )

  const handleInitialCapitalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateData({ initialCapital: Number(e.target.value) })
  }

  const handleContributionChange = (index: number, field: keyof Contribution, value: string | number) => {
    const updatedContributions = [...contributions]
    updatedContributions[index] = { ...updatedContributions[index], [field]: value }
    setContributions(updatedContributions)
    updateData({ contributions: updatedContributions })
  }

  const addContribution = () => {
    const updatedContributions = [
      ...contributions,
      { founderIndex: 0, type: "cash", description: "", value: 0, valuationMethod: "" },
    ]
    setContributions(updatedContributions)
    updateData({ contributions: updatedContributions })
  }

  const removeContribution = (index: number) => {
    if (contributions.length > 1) {
      const updatedContributions = contributions.filter((_, i) => i !== index)
      setContributions(updatedContributions)
      updateData({ contributions: updatedContributions })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext()
  }

  const totalContributions = contributions.reduce((sum, contribution) => sum + contribution.value, 0)

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <Alert>
          <InfoIcon className="h-4 w-4" />
          <AlertDescription>
            Capital contributions are the assets, cash, or services that each co-founder contributes to the company.
            These contributions form the initial capital of the company and may affect equity distribution.
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle>Initial Capital</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="initialCapital">Total Initial Capital ($)</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <InfoIcon className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">
                          The total initial capital of the company, which may include cash, assets, intellectual
                          property, or services.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id="initialCapital"
                  type="number"
                  placeholder="Enter initial capital amount"
                  value={data.initialCapital || ""}
                  onChange={handleInitialCapitalChange}
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Contributions</h3>
            <Button type="button" variant="outline" size="sm" onClick={addContribution} className="gap-1">
              <PlusCircle className="h-4 w-4" /> Add Contribution
            </Button>
          </div>

          {contributions.map((contribution, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor={`founderIndex-${index}`}>Contributor</Label>
                    <Select
                      value={contribution.founderIndex.toString()}
                      onValueChange={(value) => handleContributionChange(index, "founderIndex", Number(value))}
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
                    <Label htmlFor={`contributionType-${index}`}>Contribution Type</Label>
                    <Select
                      value={contribution.type}
                      onValueChange={(value) => handleContributionChange(index, "type", value)}
                      required
                    >
                      <SelectTrigger id={`contributionType-${index}`}>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cash">Cash</SelectItem>
                        <SelectItem value="asset">Physical Asset</SelectItem>
                        <SelectItem value="ip">Intellectual Property</SelectItem>
                        <SelectItem value="service">Services</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`contributionDescription-${index}`}>Description</Label>
                    <Textarea
                      id={`contributionDescription-${index}`}
                      placeholder="Describe the contribution in detail"
                      value={contribution.description}
                      onChange={(e) => handleContributionChange(index, "description", e.target.value)}
                      rows={2}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`contributionValue-${index}`}>Value ($)</Label>
                    <Input
                      id={`contributionValue-${index}`}
                      type="number"
                      placeholder="Enter value"
                      value={contribution.value || ""}
                      onChange={(e) => handleContributionChange(index, "value", Number(e.target.value))}
                      required
                    />
                  </div>
                  {contribution.type !== "cash" && (
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor={`valuationMethod-${index}`}>Valuation Method</Label>
                      <Textarea
                        id={`valuationMethod-${index}`}
                        placeholder="Describe how this contribution was valued"
                        value={contribution.valuationMethod || ""}
                        onChange={(e) => handleContributionChange(index, "valuationMethod", e.target.value)}
                        rows={2}
                        required
                      />
                    </div>
                  )}
                  <div className="flex items-end">
                    {contributions.length > 1 && (
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => removeContribution(index)}
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

          <div className="flex items-center justify-between rounded-lg border p-4">
            <span className="font-medium">Total Contributions</span>
            <span
              className={`font-bold ${totalContributions !== data.initialCapital ? "text-red-500" : "text-green-500"}`}
            >
              ${totalContributions.toFixed(2)}
            </span>
          </div>
          {totalContributions !== data.initialCapital && (
            <p className="text-sm text-red-500">
              Total contributions should equal the initial capital amount (${data.initialCapital}).
            </p>
          )}
        </div>

        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button
            type="submit"
            disabled={totalContributions !== data.initialCapital || contributions.some((c) => !c.description)}
          >
            Next
          </Button>
        </div>
      </div>
    </form>
  )
}
