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
import { InfoIcon } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"

interface Compensation {
  founderIndex: number
  salary: number
  salaryReviewPeriod: string
  bonusStructure: string
  benefits: string[]
  otherCompensation: string
}

interface CompensationFormProps {
  data: {
    founders: Array<{ name: string }>
    compensations: Compensation[]
    expensePolicy: string
    compensationReviewProcess: string
  }
  updateData: (data: any) => void
  onNext: () => void
  onBack: () => void
}

export function CompensationForm({ data, updateData, onNext, onBack }: CompensationFormProps) {
  const [compensations, setCompensations] = useState<Compensation[]>(
    data.compensations?.length > 0
      ? data.compensations
      : data.founders.map((_, index) => ({
          founderIndex: index,
          salary: 0,
          salaryReviewPeriod: "annual",
          bonusStructure: "",
          benefits: [],
          otherCompensation: "",
        })),
  )

  const benefitOptions = [
    "Health Insurance",
    "Dental Insurance",
    "Vision Insurance",
    "Life Insurance",
    "Disability Insurance",
    "Retirement Plan",
    "Paid Time Off",
    "Parental Leave",
    "Stock Options",
    "Professional Development",
  ]

  const handleCompensationChange = (
    founderIndex: number,
    field: keyof Compensation,
    value: number | string | string[],
  ) => {
    const updatedCompensations = [...compensations]
    updatedCompensations[founderIndex] = { ...updatedCompensations[founderIndex], [field]: value }
    setCompensations(updatedCompensations)
    updateData({ compensations: updatedCompensations })
  }

  const handleBenefitToggle = (founderIndex: number, benefit: string) => {
    const updatedCompensations = [...compensations]
    const currentBenefits = updatedCompensations[founderIndex].benefits || []
    const newBenefits = currentBenefits.includes(benefit)
      ? currentBenefits.filter((b) => b !== benefit)
      : [...currentBenefits, benefit]

    updatedCompensations[founderIndex] = { ...updatedCompensations[founderIndex], benefits: newBenefits }
    setCompensations(updatedCompensations)
    updateData({ compensations: updatedCompensations })
  }

  const handleExpensePolicyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateData({ expensePolicy: e.target.value })
  }

  const handleCompensationReviewProcessChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateData({ compensationReviewProcess: e.target.value })
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
            Clear compensation structures help prevent misunderstandings and ensure fair treatment of all co-founders.
            Consider both immediate compensation and future adjustments as the company grows.
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Co-Founder Compensation</h3>

          {data.founders.map((founder, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{founder.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Label htmlFor={`salary-${index}`}>Annual Salary ($)</Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <InfoIcon className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">
                              The annual salary for this co-founder. Enter 0 if no salary will be paid initially.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Input
                      id={`salary-${index}`}
                      type="number"
                      placeholder="Enter annual salary"
                      value={compensations[index]?.salary || 0}
                      onChange={(e) =>
                        handleCompensationChange(index, "salary", e.target.value ? Number(e.target.value) : 0)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`salaryReviewPeriod-${index}`}>Salary Review Period</Label>
                    <Select
                      value={compensations[index]?.salaryReviewPeriod || "annual"}
                      onValueChange={(value) => handleCompensationChange(index, "salaryReviewPeriod", value)}
                    >
                      <SelectTrigger id={`salaryReviewPeriod-${index}`}>
                        <SelectValue placeholder="Select review period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                        <SelectItem value="semi-annual">Semi-Annual</SelectItem>
                        <SelectItem value="annual">Annual</SelectItem>
                        <SelectItem value="milestone">Based on Milestones</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor={`bonusStructure-${index}`}>Bonus Structure</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <InfoIcon className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">
                            Describe any performance bonuses, profit-sharing, or other variable compensation.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Textarea
                    id={`bonusStructure-${index}`}
                    placeholder="Describe bonus structure, profit sharing, or other variable compensation..."
                    value={compensations[index]?.bonusStructure || ""}
                    onChange={(e) => handleCompensationChange(index, "bonusStructure", e.target.value)}
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label>Benefits</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <InfoIcon className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">Select the benefits this co-founder will receive.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {benefitOptions.map((benefit) => (
                      <div key={benefit} className="flex items-center space-x-2">
                        <Checkbox
                          id={`${benefit}-${index}`}
                          checked={(compensations[index]?.benefits || []).includes(benefit)}
                          onCheckedChange={() => handleBenefitToggle(index, benefit)}
                        />
                        <Label htmlFor={`${benefit}-${index}`} className="text-sm">
                          {benefit}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor={`otherCompensation-${index}`}>Other Compensation</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <InfoIcon className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">
                            Any other forms of compensation not covered above (e.g., expense accounts, company car).
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Textarea
                    id={`otherCompensation-${index}`}
                    placeholder="Describe any other forms of compensation..."
                    value={compensations[index]?.otherCompensation || ""}
                    onChange={(e) => handleCompensationChange(index, "otherCompensation", e.target.value)}
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Expense Policy & Compensation Review</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="expensePolicy">Business Expense Policy</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoIcon className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        Describe the policy for reimbursing business expenses incurred by co-founders.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Textarea
                id="expensePolicy"
                placeholder="Describe the process for approving and reimbursing business expenses..."
                value={data.expensePolicy || ""}
                onChange={handleExpensePolicyChange}
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="compensationReviewProcess">Compensation Review Process</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoIcon className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        Describe the process for reviewing and adjusting co-founder compensation over time.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Textarea
                id="compensationReviewProcess"
                placeholder="Describe how and when co-founder compensation will be reviewed and adjusted..."
                value={data.compensationReviewProcess || ""}
                onChange={handleCompensationReviewProcessChange}
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
