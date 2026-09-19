import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { useI18n } from "@/i18n/I18nProvider";
import { Calendar as CalendarIcon } from "lucide-react";

export const CalendarDialog = ({ open, onOpenChange, selectedDays, onDaySelect }) => {
  const { t } = useI18n();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg bg-white border-[#E8ECF4] shadow-xl">
        <DialogHeader className="space-y-2">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-[#4A7DFF]" />
            <DialogTitle className="text-2xl font-serif text-[#253858]">
              {t("mem.viewCalendar")}
            </DialogTitle>
          </div>
          <DialogDescription className="text-[#8A94A6]">
            Select days to highlight for subgroup activities
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-6">
          <div className="rounded-xl border-2 border-[#E8ECF4] bg-[#F4F6FB]/50 p-4">
            <Calendar
              mode="multiple"
              selected={selectedDays}
              onSelect={onDaySelect}
              className="rounded-md bg-white"
              classNames={{
                months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                month: "space-y-4",
                caption: "flex justify-center pt-1 relative items-center",
                caption_label: "text-sm font-semibold text-[#253858]",
                nav: "space-x-1 flex items-center",
                nav_button: "h-8 w-8 inline-flex items-center justify-center rounded-lg border border-[#E8ECF4] bg-white hover:bg-[#EAF1FF] transition-colors",
                nav_button_previous: "absolute left-1",
                nav_button_next: "absolute right-1",
                table: "w-full border-collapse space-y-1",
                head_row: "flex",
                head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem] text-[#8A94A6]",
                row: "flex w-full mt-2",
                cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-[#EAF1FF]/50 [&:has([aria-selected])]:bg-[#EAF1FF] first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-[#EAF1FF] rounded-lg transition-colors",
                day_range_end: "day-range-end",
                day_selected: "bg-[#4A7DFF] text-white hover:bg-[#3D68E0] hover:text-white focus:bg-[#4A7DFF] focus:text-white",
                day_today: "bg-[#EAF1FF] text-[#4A7DFF] font-semibold",
                day_outside: "day-outside text-muted-foreground opacity-50 aria-selected:bg-[#EAF1FF]/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
                day_disabled: "text-muted-foreground opacity-50",
                day_range_middle: "aria-selected:bg-[#EAF1FF] aria-selected:text-[#4A7DFF]",
                day_hidden: "invisible",
              }}
            />
          </div>
          
          {selectedDays.length > 0 && (
            <div className="mt-4 p-4 bg-[#EAF1FF]/30 rounded-lg border border-[#EAF1FF]">
              <p className="text-sm text-[#4A7DFF] font-medium">
                {selectedDays.length} day{selectedDays.length !== 1 ? 's' : ''} selected
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
