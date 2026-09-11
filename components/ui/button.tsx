import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Slot } from "radix-ui"

// shadcn variants share Open Silicon's size and color tokens.
const buttonVariants = cva(
  "ui-button",
  {
    variants: {
      variant: {
        default: "ui-button--primary",
        secondary: "ui-button--secondary",
        outline: "ui-button--outline",
        ghost: "ui-button--ghost",
        link: "ui-button--link",
        inverse: "ui-button--inverse",
        card: "ui-button--card",
      },
      size: {
        default: "ui-button--compact",
        lg: "ui-button--large",
        nav: "ui-button--nav",
        icon: "ui-button--icon",
        card: "ui-button--card-size",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
