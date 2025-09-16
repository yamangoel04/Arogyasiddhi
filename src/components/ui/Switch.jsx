"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

// minimal className combiner
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Switch = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <SwitchPrimitive.Root
      ref={ref}
      className={cn(
        "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50",
        "data-[state=checked]:bg-indigo-600 data-[state=unchecked]:bg-gray-200",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          "pointer-events-none block h-5 w-5 rounded-full bg-white shadow transform transition-transform",
          "data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
        )}
      />
    </SwitchPrimitive.Root>
  );
});

Switch.displayName = "Switch";
export default Switch;
