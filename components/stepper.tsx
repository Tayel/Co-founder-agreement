"use client"

import { CheckIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface Step {
  id: string
  title: string
  description?: string
}

interface StepperProps {
  steps: Step[]
  currentStep: number
}

export function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <div className="w-full">
      <nav aria-label="Progress">
        <ol role="list" className="space-y-4 md:flex md:space-x-8 md:space-y-0">
          {steps.map((step, index) => (
            <li key={step.id} className="md:flex-1">
              <div
                className={cn(
                  "group flex flex-col border-l-4 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4",
                  index < currentStep
                    ? "border-primary"
                    : index === currentStep
                      ? "border-primary"
                      : "border-muted-foreground/20",
                )}
              >
                <span
                  className={cn(
                    "text-sm font-medium",
                    index < currentStep
                      ? "text-primary"
                      : index === currentStep
                        ? "text-primary"
                        : "text-muted-foreground",
                  )}
                >
                  {index + 1}. {step.title}
                </span>
                {step.description && <span className="text-xs text-muted-foreground">{step.description}</span>}
                <span className="text-sm">
                  {index < currentStep && (
                    <span className="text-primary">
                      <CheckIcon className="ml-1 inline-block h-4 w-4" />
                    </span>
                  )}
                </span>
              </div>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  )
}
