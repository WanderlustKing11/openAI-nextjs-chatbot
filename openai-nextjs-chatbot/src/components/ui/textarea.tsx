import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        `
          border-input
          placeholder:text-muted-foreground

          /* focus styles */
          focus-visible:border-ring
          focus-visible:ring-ring/50
          focus-visible:ring-[3px]

          /* hover styles */
          hover:border-ring
          hover:ring-1
          hover:ring-ring/20
          hover:shadow-sm

          /* existing styles */
          aria-invalid:ring-destructive/20
          dark:aria-invalid:ring-destructive/40
          aria-invalid:border-destructive
          dark:bg-input/30

          flex field-sizing-content
          min-h-16 w-full
          rounded-md border
          bg-transparent
          px-3 py-2
          text-base shadow-xs

          /* smoother transitions on color & shadow changes */
          transition-colors transition-shadow

          outline-none
          disabled:cursor-not-allowed disabled:opacity-50
          md:text-sm
        `,
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
