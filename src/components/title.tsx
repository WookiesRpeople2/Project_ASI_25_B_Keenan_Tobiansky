import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import React from "react"

type HeadingProps = {
  title: string
  description?: string
  className?: string
}

export const Title: React.FC<HeadingProps> = ({
  title,
  description,
  className,
}) => (
  <>
    <div className={cn("h-32 space-y-4 mt-6", className)}>
      <h1 className="text-3xl font-bold">{title}</h1>
      {description && (
        <h2 className="text-sm text-muted-foreground">{description}</h2>
      )}
      <Separator />
    </div>
  </>
)
