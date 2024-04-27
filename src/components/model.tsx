import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "./ui/button"
import React, { PropsWithChildren, useEffect, useState } from "react"

type ModelProps = {
  trigger: string | React.ReactElement
  title?: string
  description?: string
  footer?: string
}

export const Model: React.FC<PropsWithChildren<ModelProps>> = ({
  children,
  trigger,
  title,
  description,
  footer,
}) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          {trigger}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          {title && <DialogTitle>{title}</DialogTitle>}
          {description && <DialogDescription>{description}</DialogDescription>}
          {children}
          {footer && (
            <DialogFooter>
              <Button variant="ghost">{footer}</Button>
            </DialogFooter>
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
