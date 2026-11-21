"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"
import { cn } from "cn"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3 select-none", className)}
      classNames={{
        root: "w-full max-w-[280px]",
        months: "relative",
        month: "flex flex-col gap-3",
        month_caption: "flex justify-center items-center h-8 relative",
        caption_label: "text-sm font-semibold text-[#0a0a0a] capitalize",
        nav: "flex items-center justify-between absolute inset-x-0 top-0.5 h-7 px-1 z-10 pointer-events-none",
        button_previous:
          "pointer-events-auto h-7 w-7 rounded-lg flex items-center justify-center p-0 text-[#717784] hover:text-[#0a0a0a] hover:bg-neutral-100 transition-colors cursor-pointer",
        button_next:
          "pointer-events-auto h-7 w-7 rounded-lg flex items-center justify-center p-0 text-[#717784] hover:text-[#0a0a0a] hover:bg-neutral-100 transition-colors cursor-pointer",
        month_grid: "w-full border-collapse",
        weekdays: "grid grid-cols-7 w-full mb-1",
        weekday: "text-[#717784] text-xs font-medium text-center py-1",
        weeks: "flex flex-col gap-1 w-full",
        week: "grid grid-cols-7 w-full",
        day: "h-9 w-9 p-0 text-center flex items-center justify-center relative mx-auto",
        day_button:
          "h-9 w-9 p-0 text-xs font-normal rounded-lg flex items-center justify-center text-[#0a0a0a] transition-all hover:bg-neutral-100 cursor-pointer",
        selected:
          "!bg-transparent !border-2 !border-[#2563c9] !text-[#2563c9] font-medium rounded-lg",
        today: "border border-dashed border-[#2563c9]/60 text-[#2563c9] font-medium rounded-lg",
        outside: "text-neutral-300 opacity-40 pointer-events-none",
        disabled: "text-neutral-300 opacity-30 cursor-not-allowed pointer-events-none",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) => {
          const Icon = orientation === "left" ? ChevronLeft : ChevronRight
          return <Icon className="size-4" />
        },
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
