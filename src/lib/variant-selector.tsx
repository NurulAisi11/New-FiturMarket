"use client"

import type { Variant } from "@/lib/types"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface VariantSelectorProps {
  variants: Variant[]
  selectedVariants: Record<string, string>
  onVariantChange: (variantType: string, value: string) => void
}

export function VariantSelector({ variants, selectedVariants, onVariantChange }: VariantSelectorProps) {
  return (
    <div className="space-y-6">
      {variants.map((variant) => (
        <div key={variant.type} className="space-y-3">
          <Label className="text-base font-semibold">{variant.type}</Label>
          <RadioGroup
            value={selectedVariants[variant.type]}
            onValueChange={(value) => onVariantChange(variant.type, value)}
            className="flex flex-wrap gap-3"
          >
            {variant.options.map((option) => (
              <div key={option.value}>
                <RadioGroupItem value={option.value} id={`${variant.type}-${option.value}`} className="sr-only" />
                <Label
                  htmlFor={`${variant.type}-${option.value}`}
                  className="cursor-pointer rounded-md border-2 border-muted bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground has-[:checked]:border-primary has-[:checked]:bg-primary has-[:checked]:text-primary-foreground"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      ))}
    </div>
  )
}