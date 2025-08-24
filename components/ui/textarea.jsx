import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    (<textarea
      className={cn(
        "flex min-h-[100px] w-full rounded-xl border backdrop-blur-sm bg-white/5 border-white/20 px-4 py-3 text-sm font-medium text-white ring-offset-background placeholder:text-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/50 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 shadow-sm hover:shadow-md focus:shadow-lg resize-none",
        className
      )}
      ref={ref}
      {...props} />)
  );
})
Textarea.displayName = "Textarea"

export { Textarea }
