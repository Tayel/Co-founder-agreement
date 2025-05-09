"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { InfoIcon } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { useEffect } from "react"

interface FounderRole {
  name: string
  title: string
  responsibilities: string
  decisionAreas: string[]
  timeCommitment: string
  performanceMetrics: string
}

interface DetailedRolesFormProps {
  data: {
    founders: Array<{ name: string; role: string }>
    founderRoles: FounderRole[]
    decisionMaking: string
    amendmentProcess: string
  }
  updateData: (data: any) => void
  onNext: () => void
  onBack: () => void
}

export function DetailedRolesForm({ data, updateData, onNext, onBack }: DetailedRolesFormProps) {
  const decisionAreas = [
    "Product Development",
    "Marketing Strategy",
    "Sales",
    "Financial Management",
    "Hiring/HR",
    "Strategic Partnerships",
    "Fundraising",
    "Legal/Compliance",
    "Technology Infrastructure",
    "Customer Support",
  ]

  const handleRoleChange = (founderIndex: number, field: keyof FounderRole, value: string | string[]) => {
    const updatedRoles = [...(data.founderRoles || [])]
    if (!updatedRoles[founderIndex]) {
      updatedRoles[founderIndex] = {
        name: data.founders[founderIndex].name,
        title: data.founders[founderIndex].role,
        responsibilities: "",
        decisionAreas: [],
        timeCommitment: "full-time",
        performanceMetrics: "",
      }
    }
    updatedRoles[founderIndex] = { ...updatedRoles[founderIndex], [field]: value }
    updateData({ founderRoles: updatedRoles })
  }

  const handleDecisionAreaToggle = (founderIndex: number, area: string) => {
    const updatedRoles = [...(data.founderRoles || [])]
    if (!updatedRoles[founderIndex]) {
      updatedRoles[founderIndex] = {
        name: data.founders[founderIndex].name,
        title: data.founders[founderIndex].role,
        responsibilities: "",
        decisionAreas: [],
        timeCommitment: "full-time",
        performanceMetrics: "",
      }
    }

    const currentAreas = updatedRoles[founderIndex].decisionAreas || []
    const newAreas = currentAreas.includes(area) ? currentAreas.filter((a) => a !== area) : [...currentAreas, area]

    updatedRoles[founderIndex] = { ...updatedRoles[founderIndex], decisionAreas: newAreas }
    updateData({ founderRoles: updatedRoles })
  }

  const handleDecisionMakingChange = (value: string) => {
    updateData({ decisionMaking: value })
  }

  const handleAmendmentProcessChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateData({ amendmentProcess: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext()
  }

  useEffect(() => {
    // Initialize founderRoles if it doesn't exist
    if (!data.founderRoles || data.founderRoles.length === 0) {
      const initialRoles = data.founders.map((founder) => ({
        name: founder.name,
        title: founder.role,
        responsibilities: "",
        decisionAreas: [],
        timeCommitment: "full-time",
        performanceMetrics: "",
      }))
      updateData({ founderRoles: initialRoles })
    }
  }, [data.founders, data.founderRoles, updateData])

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <Alert>
          <InfoIcon className="h-4 w-4" />
          <AlertDescription>
            Clearly defined roles and responsibilities help prevent conflicts and ensure each co-founder understands
            their areas of authority and accountability.
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Detailed Founder Roles & Responsibilities</h3>

          {data.founders.map((founder, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{founder.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor={`founderTitle-${index}`}>Title/Position</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <InfoIcon className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">
                            The official title or position of this co-founder (e.g., CEO, CTO, COO).
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Select
                    value={data.founderRoles?.[index]?.title || founder.role}
                    onValueChange={(value) => handleRoleChange(index, "title", value)}
                  >
                    <SelectTrigger id={`founderTitle-${index}`}>
                      <SelectValue placeholder="Select title" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ceo">Chief Executive Officer (CEO)</SelectItem>
                      <SelectItem value="cto">Chief Technology Officer (CTO)</SelectItem>
                      <SelectItem value="coo">Chief Operating Officer (COO)</SelectItem>
                      <SelectItem value="cfo">Chief Financial Officer (CFO)</SelectItem>
                      <SelectItem value="cmo">Chief Marketing Officer (CMO)</SelectItem>
                      <SelectItem value="cpo">Chief Product Officer (CPO)</SelectItem>
                      <SelectItem value="other">Other (Specify in Responsibilities)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor={`responsibilities-${index}`}>Key Responsibilities</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <InfoIcon className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">
                            Detailed description of this co-founder's primary responsibilities and duties.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Textarea
                    id={`responsibilities-${index}`}
                    placeholder={`Describe ${founder.name}'s key responsibilities in detail...`}
                    value={data.founderRoles?.[index]?.responsibilities || ""}
                    onChange={(e) => handleRoleChange(index, "responsibilities", e.target.value)}
                    rows={3}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label>Decision-Making Authority</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <InfoIcon className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">Areas where this co-founder has primary decision-making authority.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {decisionAreas.map((area) => (
                      <div key={area} className="flex items-center space-x-2">
                        <Checkbox
                          id={`${area}-${index}`}
                          checked={(data.founderRoles?.[index]?.decisionAreas || []).includes(area)}
                          onCheckedChange={() => handleDecisionAreaToggle(index, area)}
                        />
                        <Label htmlFor={`${area}-${index}`} className="text-sm">
                          {area}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor={`timeCommitment-${index}`}>Time Commitment</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <InfoIcon className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">
                            The expected time commitment from this co-founder (full-time, part-time, etc.).
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Select
                    value={data.founderRoles?.[index]?.timeCommitment || "full-time"}
                    onValueChange={(value) => handleRoleChange(index, "timeCommitment", value)}
                  >
                    <SelectTrigger id={`timeCommitment-${index}`}>
                      <SelectValue placeholder="Select time commitment" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time (40+ hours/week)</SelectItem>
                      <SelectItem value="part-time-30">Part-time (30+ hours/week)</SelectItem>
                      <SelectItem value="part-time-20">Part-time (20+ hours/week)</SelectItem>
                      <SelectItem value="part-time-10">Part-time (10+ hours/week)</SelectItem>
                      <SelectItem value="advisory">Advisory (as needed)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor={`performanceMetrics-${index}`}>Performance Metrics</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <InfoIcon className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">
                            Metrics or KPIs that will be used to evaluate this co-founder's performance.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Textarea
                    id={`performanceMetrics-${index}`}
                    placeholder="Describe how this co-founder's performance will be measured..."
                    value={data.founderRoles?.[index]?.performanceMetrics || ""}
                    onChange={(e) => handleRoleChange(index, "performanceMetrics", e.target.value)}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Decision-Making Process</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="decisionMaking">Company-wide Decision Making</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoIcon className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        The process for making major company decisions that affect all co-founders.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Select value={data.decisionMaking} onValueChange={handleDecisionMakingChange}>
                <SelectTrigger id="decisionMaking">
                  <SelectValue placeholder="Select decision-making process" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="majority">Majority Vote (50%+)</SelectItem>
                  <SelectItem value="supermajority">Supermajority (66%+)</SelectItem>
                  <SelectItem value="unanimous">Unanimous Consent (100%)</SelectItem>
                  <SelectItem value="weighted">Weighted Voting (Based on Equity)</SelectItem>
                  <SelectItem value="ceo">CEO Final Decision</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="amendmentProcess">Role Amendment Process</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoIcon className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        The process for changing or amending co-founder roles and responsibilities.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Textarea
                id="amendmentProcess"
                placeholder="Describe the process for amending co-founder roles and responsibilities..."
                value={data.amendmentProcess || ""}
                onChange={handleAmendmentProcessChange}
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
