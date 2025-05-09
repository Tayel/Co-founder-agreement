"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { PlusCircle, Trash2 } from "lucide-react"

interface Founder {
  name: string
  email: string
  role: string
  equity: number
}

interface BasicInfoFormProps {
  data: {
    companyName: string
    companyType: string
    founders: Founder[]
  }
  updateData: (data: any) => void
  onNext: () => void
}

export function BasicInfoForm({ data, updateData, onNext }: BasicInfoFormProps) {
  const [founders, setFounders] = useState<Founder[]>(
    data.founders.length > 0 ? data.founders : [{ name: "", email: "", role: "", equity: 0 }],
  )

  const handleCompanyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateData({ companyName: e.target.value })
  }

  const handleCompanyTypeChange = (value: string) => {
    updateData({ companyType: value })
  }

  const handleFounderChange = (index: number, field: keyof Founder, value: string | number) => {
    const updatedFounders = [...founders]
    updatedFounders[index] = { ...updatedFounders[index], [field]: value }
    setFounders(updatedFounders)
    updateData({ founders: updatedFounders })
  }

  const addFounder = () => {
    const updatedFounders = [...founders, { name: "", email: "", role: "", equity: 0 }]
    setFounders(updatedFounders)
    updateData({ founders: updatedFounders })
  }

  const removeFounder = (index: number) => {
    if (founders.length > 1) {
      const updatedFounders = founders.filter((_, i) => i !== index)
      setFounders(updatedFounders)
      updateData({ founders: updatedFounders })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext()
  }

  const isFormValid = () => {
    return (
      data.companyName.trim() !== "" &&
      data.companyType !== "" &&
      founders.every((founder) => founder.name.trim() !== "" && founder.email.trim() !== "")
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                placeholder="Enter company name"
                value={data.companyName}
                onChange={handleCompanyChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyType">Company Type</Label>
              <Select value={data.companyType} onValueChange={handleCompanyTypeChange} required>
                <SelectTrigger id="companyType">
                  <SelectValue placeholder="Select company type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="llc">LLC</SelectItem>
                  <SelectItem value="corporation">Corporation</SelectItem>
                  <SelectItem value="partnership">Partnership</SelectItem>
                  <SelectItem value="soleProprietorship">Sole Proprietorship</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Founders</h3>
            <Button type="button" variant="outline" size="sm" onClick={addFounder} className="gap-1">
              <PlusCircle className="h-4 w-4" /> Add Founder
            </Button>
          </div>

          {founders.map((founder, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor={`founderName-${index}`}>Name</Label>
                    <Input
                      id={`founderName-${index}`}
                      placeholder="Enter founder name"
                      value={founder.name}
                      onChange={(e) => handleFounderChange(index, "name", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`founderEmail-${index}`}>Email</Label>
                    <Input
                      id={`founderEmail-${index}`}
                      type="email"
                      placeholder="Enter founder email"
                      value={founder.email}
                      onChange={(e) => handleFounderChange(index, "email", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`founderRole-${index}`}>Role</Label>
                    <Select value={founder.role} onValueChange={(value) => handleFounderChange(index, "role", value)}>
                      <SelectTrigger id={`founderRole-${index}`}>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ceo">CEO</SelectItem>
                        <SelectItem value="cto">CTO</SelectItem>
                        <SelectItem value="coo">COO</SelectItem>
                        <SelectItem value="cfo">CFO</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-end">
                    {founders.length > 1 && (
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => removeFounder(index)}
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
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={!isFormValid()}>
            Next
          </Button>
        </div>
      </div>
    </form>
  )
}
