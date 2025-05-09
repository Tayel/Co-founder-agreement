"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"

interface EquityFormProps {
  data: {
    founders: Array<{ name: string; equity: number }>
    equityDistribution: string
    customEquity: Array<{ name: string; equity: number }>
  }
  updateData: (data: any) => void
  onNext: () => void
  onBack: () => void
}

export function EquityForm({ data, updateData, onNext, onBack }: EquityFormProps) {
  const [equityDistribution, setEquityDistribution] = useState(data.equityDistribution || "equal")
  const [customEquity, setCustomEquity] = useState<Array<{ name: string; equity: number }>>(
    data.customEquity.length > 0 ? data.customEquity : data.founders.map((f) => ({ name: f.name, equity: 0 })),
  )
  const [totalEquity, setTotalEquity] = useState(0)

  useEffect(() => {
    if (equityDistribution === "equal" && data.founders.length > 0) {
      const equalShare = 100 / data.founders.length
      const newCustomEquity = data.founders.map((founder) => ({
        name: founder.name,
        equity: equalShare,
      }))
      setCustomEquity(newCustomEquity)
      setTotalEquity(100)
    } else {
      setTotalEquity(customEquity.reduce((sum, item) => sum + item.equity, 0))
    }
  }, [equityDistribution, data.founders])

  const handleEquityDistributionChange = (value: string) => {
    setEquityDistribution(value)
    updateData({ equityDistribution: value })

    if (value === "equal" && data.founders.length > 0) {
      const equalShare = 100 / data.founders.length
      const newCustomEquity = data.founders.map((founder) => ({
        name: founder.name,
        equity: equalShare,
      }))
      setCustomEquity(newCustomEquity)
      updateData({ customEquity: newCustomEquity })
    }
  }

  const handleCustomEquityChange = (index: number, value: number) => {
    const newCustomEquity = [...customEquity]
    newCustomEquity[index] = { ...newCustomEquity[index], equity: value }
    setCustomEquity(newCustomEquity)
    updateData({ customEquity: newCustomEquity })
    setTotalEquity(newCustomEquity.reduce((sum, item) => sum + item.equity, 0))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext()
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <div className="space-y-4">
          <Label>Equity Distribution</Label>
          <RadioGroup value={equityDistribution} onValueChange={handleEquityDistributionChange}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="equal" id="equal" />
              <Label htmlFor="equal">Equal Distribution</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="custom" id="custom" />
              <Label htmlFor="custom">Custom Distribution</Label>
            </div>
          </RadioGroup>
        </div>

        {equityDistribution === "custom" && (
          <div className="space-y-4">
            <Alert>
              <InfoIcon className="h-4 w-4" />
              <AlertDescription>
                Allocate equity percentages among founders. The total should equal 100%.
              </AlertDescription>
            </Alert>

            {customEquity.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>{item.name}</Label>
                  <span className="text-sm font-medium">{item.equity.toFixed(1)}%</span>
                </div>
                <Slider
                  value={[item.equity]}
                  min={0}
                  max={100}
                  step={0.1}
                  onValueChange={(value) => handleCustomEquityChange(index, value[0])}
                />
              </div>
            ))}

            <div className="flex items-center justify-between rounded-lg border p-4">
              <span className="font-medium">Total Equity</span>
              <span className={`font-bold ${totalEquity !== 100 ? "text-red-500" : "text-green-500"}`}>
                {totalEquity.toFixed(1)}%
              </span>
            </div>
          </div>
        )}

        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button type="submit" disabled={equityDistribution === "custom" && totalEquity !== 100}>
            Next
          </Button>
        </div>
      </div>
    </form>
  )
}
