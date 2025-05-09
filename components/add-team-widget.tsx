"use client"

import type React from "react"

import { useState } from "react"
import { X, Plus, Download, Check, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { generateEmploymentContract, type EmployeeData } from "@/lib/employment-contract-generator"

interface AddTeamWidgetProps {
  onClose: () => void
  onAddTeamMember: (member: any) => void
}

export function AddTeamWidget({ onClose, onAddTeamMember }: AddTeamWidgetProps) {
  const [activeTab, setActiveTab] = useState("basic")
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false)
  const [pdfGenerated, setPdfGenerated] = useState(false)
  const [pdfFileName, setPdfFileName] = useState("")
  const [newSkill, setNewSkill] = useState("")
  const [formSubmitted, setFormSubmitted] = useState(false)

  const [formData, setFormData] = useState<EmployeeData>({
    fullName: "",
    role: "",
    department: "",
    startDate: new Date().toISOString().split("T")[0],
    endDate: "",
    compensationType: "salary",
    compensationAmount: 0,
    hoursPerWeek: 40,
    expectedQuality: 8,
    yearsExperience: 0,
    skills: [],
    reportingManager: "",
    contractType: "standard",
    additionalTerms: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: Number.parseFloat(value) || 0 }))
  }

  const handleSwitchChange = (id: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [id]: checked ? "ijarah" : "standard" }))
  }

  const handleSliderChange = (value: number[]) => {
    setFormData((prev) => ({ ...prev, expectedQuality: value[0] }))
  }

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }))
      setNewSkill("")
    }
  }

  const handleRemoveSkill = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }))
  }

  const handleGeneratePdf = async () => {
    setIsGeneratingPdf(true)
    try {
      const fileName = await generateEmploymentContract(formData)
      setPdfFileName(fileName)
      setPdfGenerated(true)
    } catch (error) {
      console.error("Error generating PDF:", error)
    } finally {
      setIsGeneratingPdf(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Add the team member to the dashboard
    onAddTeamMember({
      id: Math.floor(Math.random() * 1000),
      initials: formData.fullName
        .split(" ")
        .map((name) => name[0])
        .join(""),
      name: formData.fullName,
      role: getFootballPosition(formData.role),
      position: formData.role,
      status: "green",
      project: formData.department,
      lastDeliverable: new Date().toISOString().split("T")[0],
      oneOnOneRating: formData.expectedQuality / 2,
      x: Math.floor(Math.random() * 60) + 20, // Random position on field
      y: Math.floor(Math.random() * 60) + 20, // Random position on field
      experience: `${formData.yearsExperience} yrs`,
      hours: `${formData.hoursPerWeek} h/wk`,
      rating: formData.expectedQuality,
      marketValue:
        formData.compensationType === "salary"
          ? `£${Math.round(formData.compensationAmount / 1000)}k`
          : `£${formData.compensationAmount}/hr`,
      traits: formData.skills.slice(0, 2),
      tags: [formData.department, formData.role.split(" ")[0]],
      photo: "/businessman-suit.png",
      attributes: {
        responsiveness: Math.floor(Math.random() * 20) + 70,
        riskAppetite: Math.floor(Math.random() * 40) + 40,
        workloadStability: Math.floor(Math.random() * 20) + 70,
        strategicVision: Math.floor(Math.random() * 30) + 60,
        communication: Math.floor(Math.random() * 20) + 70,
        execution: Math.floor(Math.random() * 20) + 70,
      },
      reportsTo: {
        initials: formData.reportingManager
          .split(" ")
          .map((name) => name[0])
          .join(""),
        name: formData.reportingManager,
        position: "Manager",
      },
    })

    setFormSubmitted(true)

    // Close the widget after 2 seconds
    setTimeout(() => {
      onClose()
    }, 2000)
  }

  // Helper function to assign a football position based on role
  const getFootballPosition = (role: string) => {
    const positions = ["GK", "LB", "CB", "RB", "LM", "CM", "RM", "ST"]
    const roleToPositionMap: Record<string, string> = {
      Developer: "CB",
      Engineer: "RB",
      Designer: "LM",
      Manager: "CM",
      Director: "ST",
      Analyst: "RM",
      Consultant: "LB",
      Specialist: "GK",
    }

    // Try to match the role to a position
    for (const [key, value] of Object.entries(roleToPositionMap)) {
      if (role.toLowerCase().includes(key.toLowerCase())) {
        return value
      }
    }

    // If no match, return a random position
    return positions[Math.floor(Math.random() * positions.length)]
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="relative w-full max-w-4xl bg-[#0a1930] border border-[#4caf50] shadow-[0_0_20px_rgba(76,175,80,0.4)] rounded-lg overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-[#1a2e47] p-1 text-white hover:bg-[#4caf50]"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Add New Team Member</h2>

          {formSubmitted ? (
            <div className="bg-[#1a2e47] rounded-lg p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500 mb-4">
                <Check className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Team Member Added Successfully!</h3>
              <p className="text-gray-300 mb-6">The new team member has been added to the QistasChain formation.</p>
              {pdfGenerated && (
                <div className="flex justify-center">
                  <Button className="bg-[#4caf50] hover:bg-[#388e3c] text-white">
                    <Download className="mr-2 h-4 w-4" /> Download Contract ({pdfFileName})
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <Tabs defaultValue="basic" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-4 bg-[#1a2e47]">
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  <TabsTrigger value="compensation">Compensation</TabsTrigger>
                  <TabsTrigger value="skills">Skills & Experience</TabsTrigger>
                  <TabsTrigger value="contract">Contract Details</TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="p-4 bg-[#1a2e47] rounded-lg mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="fullName" className="text-white">
                          Full Name
                        </Label>
                        <Input
                          id="fullName"
                          placeholder="Enter full name"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          required
                          className="bg-[#0d2240] border-[#4caf50] text-white"
                        />
                      </div>

                      <div>
                        <Label htmlFor="role" className="text-white">
                          Role/Title
                        </Label>
                        <Input
                          id="role"
                          placeholder="e.g. Senior Developer"
                          value={formData.role}
                          onChange={handleInputChange}
                          required
                          className="bg-[#0d2240] border-[#4caf50] text-white"
                        />
                      </div>

                      <div>
                        <Label htmlFor="department" className="text-white">
                          Department
                        </Label>
                        <select
                          id="department"
                          value={formData.department}
                          onChange={handleInputChange}
                          required
                          className="w-full p-2 rounded-md bg-[#0d2240] border border-[#4caf50] text-white"
                        >
                          <option value="">Select department</option>
                          <option value="Engineering">Engineering</option>
                          <option value="Product">Product</option>
                          <option value="Design">Design</option>
                          <option value="Marketing">Marketing</option>
                          <option value="Sales">Sales</option>
                          <option value="Finance">Finance</option>
                          <option value="HR">HR</option>
                          <option value="Legal">Legal</option>
                          <option value="Operations">Operations</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="startDate" className="text-white">
                          Start Date
                        </Label>
                        <Input
                          id="startDate"
                          type="date"
                          value={formData.startDate}
                          onChange={handleInputChange}
                          required
                          className="bg-[#0d2240] border-[#4caf50] text-white"
                        />
                      </div>

                      <div>
                        <Label htmlFor="endDate" className="text-white">
                          End Date (if applicable)
                        </Label>
                        <Input
                          id="endDate"
                          type="date"
                          value={formData.endDate}
                          onChange={handleInputChange}
                          className="bg-[#0d2240] border-[#4caf50] text-white"
                        />
                        <p className="text-xs text-gray-400 mt-1">Leave blank for indefinite contracts</p>
                      </div>

                      <div>
                        <Label htmlFor="reportingManager" className="text-white">
                          Reporting Manager
                        </Label>
                        <select
                          id="reportingManager"
                          value={formData.reportingManager}
                          onChange={handleInputChange}
                          required
                          className="w-full p-2 rounded-md bg-[#0d2240] border border-[#4caf50] text-white"
                        >
                          <option value="">Select manager</option>
                          <option value="Mohamed Tayel">Mohamed Tayel (Founder & Compliance Expert)</option>
                          <option value="Amr Tayel">Amr Tayel (Chief Revenue Officer)</option>
                          <option value="Kareem Kassab">Kareem Kassab (Growth Product Manager)</option>
                          <option value="Sherif Abouklila">Sherif Abouklila (Senior Software Engineer)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end mt-6">
                    <Button
                      type="button"
                      onClick={() => setActiveTab("compensation")}
                      className="bg-[#4caf50] hover:bg-[#388e3c] text-white"
                    >
                      Next: Compensation
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="compensation" className="p-4 bg-[#1a2e47] rounded-lg mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label className="text-white">Compensation Type</Label>
                        <div className="flex mt-2">
                          <div className="flex items-center mr-4">
                            <input
                              type="radio"
                              id="salary"
                              name="compensationType"
                              value="salary"
                              checked={formData.compensationType === "salary"}
                              onChange={() => setFormData((prev) => ({ ...prev, compensationType: "salary" }))}
                              className="mr-2"
                            />
                            <Label htmlFor="salary" className="text-white">
                              Annual Salary
                            </Label>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="radio"
                              id="hourly"
                              name="compensationType"
                              value="hourly"
                              checked={formData.compensationType === "hourly"}
                              onChange={() => setFormData((prev) => ({ ...prev, compensationType: "hourly" }))}
                              className="mr-2"
                            />
                            <Label htmlFor="hourly" className="text-white">
                              Hourly Rate
                            </Label>
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="compensationAmount" className="text-white">
                          {formData.compensationType === "salary" ? "Annual Salary ($)" : "Hourly Rate ($)"}
                        </Label>
                        <Input
                          id="compensationAmount"
                          type="number"
                          placeholder="0.00"
                          value={formData.compensationAmount || ""}
                          onChange={handleNumberInputChange}
                          required
                          min="0"
                          step={formData.compensationType === "salary" ? "1000" : "0.01"}
                          className="bg-[#0d2240] border-[#4caf50] text-white"
                        />
                      </div>

                      {formData.compensationType === "hourly" && (
                        <div>
                          <Label htmlFor="hoursPerWeek" className="text-white">
                            Hours Per Week
                          </Label>
                          <Input
                            id="hoursPerWeek"
                            type="number"
                            placeholder="40"
                            value={formData.hoursPerWeek || ""}
                            onChange={handleNumberInputChange}
                            required
                            min="1"
                            max="168"
                            className="bg-[#0d2240] border-[#4caf50] text-white"
                          />
                        </div>
                      )}
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label className="text-white">Expected Quality of Service (1-10)</Label>
                        <div className="pt-6 pb-2">
                          <Slider
                            defaultValue={[8]}
                            max={10}
                            min={1}
                            step={1}
                            value={[formData.expectedQuality]}
                            onValueChange={handleSliderChange}
                            className="w-full"
                          />
                        </div>
                        <div className="flex justify-between text-xs text-gray-400">
                          <span>Basic (1)</span>
                          <span>Average (5)</span>
                          <span>Exceptional (10)</span>
                        </div>
                        <div className="mt-4 p-3 rounded-md bg-[#0d2240] border border-[#4caf50]">
                          <div className="flex justify-between items-center">
                            <span className="text-white">Current Rating:</span>
                            <span className="text-[#4caf50] font-bold text-lg">{formData.expectedQuality}/10</span>
                          </div>
                          <p className="text-gray-300 text-sm mt-2">
                            {formData.expectedQuality >= 9
                              ? "Exceptional quality expected. Work must be of the highest standard with minimal supervision."
                              : formData.expectedQuality >= 7
                                ? "High quality expected. Work should exceed standard requirements with occasional supervision."
                                : formData.expectedQuality >= 5
                                  ? "Good quality expected. Work should meet all standard requirements with regular supervision."
                                  : "Acceptable quality expected. Work should meet basic requirements with close supervision."}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between mt-6">
                    <Button
                      type="button"
                      onClick={() => setActiveTab("basic")}
                      variant="outline"
                      className="border-[#4caf50] text-[#4caf50]"
                    >
                      Back
                    </Button>
                    <Button
                      type="button"
                      onClick={() => setActiveTab("skills")}
                      className="bg-[#4caf50] hover:bg-[#388e3c] text-white"
                    >
                      Next: Skills & Experience
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="skills" className="p-4 bg-[#1a2e47] rounded-lg mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="yearsExperience" className="text-white">
                          Years of Experience
                        </Label>
                        <Input
                          id="yearsExperience"
                          type="number"
                          placeholder="0"
                          value={formData.yearsExperience || ""}
                          onChange={handleNumberInputChange}
                          required
                          min="0"
                          className="bg-[#0d2240] border-[#4caf50] text-white"
                        />
                      </div>

                      <div>
                        <Label className="text-white">Key Skills</Label>
                        <div className="flex mt-2">
                          <Input
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            placeholder="Add a skill"
                            className="bg-[#0d2240] border-[#4caf50] text-white flex-1 mr-2"
                          />
                          <Button
                            type="button"
                            onClick={handleAddSkill}
                            className="bg-[#4caf50] hover:bg-[#388e3c] text-white"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-3">
                          {formData.skills.length > 0 ? (
                            formData.skills.map((skill) => (
                              <Badge
                                key={skill}
                                className="bg-[#0d2240] text-white border border-[#4caf50] flex items-center gap-1"
                              >
                                {skill}
                                <button
                                  type="button"
                                  onClick={() => handleRemoveSkill(skill)}
                                  className="ml-1 text-gray-400 hover:text-white"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </Badge>
                            ))
                          ) : (
                            <p className="text-gray-400 text-sm">No skills added yet</p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label className="text-white">Suggested Skills</Label>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          {[
                            "Blockchain",
                            "Smart Contracts",
                            "Solidity",
                            "React",
                            "Node.js",
                            "TypeScript",
                            "Product Management",
                            "UI/UX",
                            "Islamic Finance",
                            "Compliance",
                          ].map((skill) => (
                            <Button
                              key={skill}
                              type="button"
                              variant="outline"
                              className={`border-[#4caf50] text-white justify-start ${
                                formData.skills.includes(skill) ? "bg-[#4caf50]/20" : "bg-[#0d2240]"
                              }`}
                              onClick={() => {
                                if (!formData.skills.includes(skill)) {
                                  setFormData((prev) => ({
                                    ...prev,
                                    skills: [...prev.skills, skill],
                                  }))
                                } else {
                                  handleRemoveSkill(skill)
                                }
                              }}
                            >
                              {formData.skills.includes(skill) ? (
                                <Check className="h-4 w-4 mr-2 text-[#4caf50]" />
                              ) : (
                                <Plus className="h-4 w-4 mr-2" />
                              )}
                              {skill}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between mt-6">
                    <Button
                      type="button"
                      onClick={() => setActiveTab("compensation")}
                      variant="outline"
                      className="border-[#4caf50] text-[#4caf50]"
                    >
                      Back
                    </Button>
                    <Button
                      type="button"
                      onClick={() => setActiveTab("contract")}
                      className="bg-[#4caf50] hover:bg-[#388e3c] text-white"
                    >
                      Next: Contract Details
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="contract" className="p-4 bg-[#1a2e47] rounded-lg mt-4">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <Label className="text-white mb-2 block">Use Islamic Finance Contract (Ijarah)</Label>
                        <p className="text-gray-400 text-sm">
                          Generate an employment contract based on AAOIFI Shariah Standard No. 9 for Ijarah
                        </p>
                      </div>
                      <Switch
                        checked={formData.contractType === "ijarah"}
                        onCheckedChange={(checked) => handleSwitchChange("contractType", checked)}
                      />
                    </div>

                    {formData.contractType === "ijarah" && (
                      <Alert className="bg-blue-900/30 border-blue-500 text-blue-200">
                        <AlertCircle className="h-4 w-4 text-blue-500" />
                        <AlertTitle className="text-blue-200">AAOIFI Compliance</AlertTitle>
                        <AlertDescription className="text-blue-300">
                          This contract will follow AAOIFI Shariah Standard No. 9: Ijarah and Ijarah Muntahia
                          Bittamleek. All terms will be structured to comply with Islamic finance principles.
                        </AlertDescription>
                      </Alert>
                    )}

                    <div>
                      <Label htmlFor="additionalTerms" className="text-white">
                        Additional Terms & Conditions
                      </Label>
                      <Textarea
                        id="additionalTerms"
                        placeholder="Enter any additional terms or special conditions for this contract"
                        value={formData.additionalTerms}
                        onChange={handleInputChange}
                        className="bg-[#0d2240] border-[#4caf50] text-white min-h-[150px] mt-2"
                      />
                    </div>

                    <div className="bg-[#0d2240] border border-[#4caf50] rounded-lg p-4">
                      <h3 className="text-white font-bold mb-3">Contract Summary</h3>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                        <div className="text-gray-400">Name:</div>
                        <div className="text-white">{formData.fullName || "Not specified"}</div>

                        <div className="text-gray-400">Role:</div>
                        <div className="text-white">{formData.role || "Not specified"}</div>

                        <div className="text-gray-400">Department:</div>
                        <div className="text-white">{formData.department || "Not specified"}</div>

                        <div className="text-gray-400">Start Date:</div>
                        <div className="text-white">{formData.startDate || "Not specified"}</div>

                        <div className="text-gray-400">Compensation:</div>
                        <div className="text-white">
                          {formData.compensationAmount
                            ? `$${formData.compensationAmount.toLocaleString()} ${formData.compensationType === "salary" ? "per year" : "per hour"}`
                            : "Not specified"}
                        </div>

                        <div className="text-gray-400">Contract Type:</div>
                        <div className="text-white capitalize">{formData.contractType}</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <Button
                        type="button"
                        onClick={handleGeneratePdf}
                        variant="outline"
                        className="border-[#4caf50] text-[#4caf50] flex items-center gap-2"
                        disabled={isGeneratingPdf}
                      >
                        {isGeneratingPdf ? (
                          <>Generating...</>
                        ) : (
                          <>
                            <Download className="h-4 w-4" /> Generate Contract PDF
                          </>
                        )}
                      </Button>

                      {pdfGenerated && (
                        <p className="text-green-400 text-sm">PDF generated successfully: {pdfFileName}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between mt-6">
                    <Button
                      type="button"
                      onClick={() => setActiveTab("skills")}
                      variant="outline"
                      className="border-[#4caf50] text-[#4caf50]"
                    >
                      Back
                    </Button>
                    <Button type="submit" className="bg-[#4caf50] hover:bg-[#388e3c] text-white">
                      Add Team Member
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
