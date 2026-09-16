import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useI18n } from "@/i18n/I18nProvider";

export const TaskDetailDialog = ({ task, open, onOpenChange }) => {
  const { t } = useI18n();

  if (!task) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif">
            {task.task_name || task.name}
          </DialogTitle>
          <DialogDescription className="text-base">
            {task.task_desc || task.description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-1">
                {t("task.type")}
              </p>
              <p className="font-semibold">
                {task.task_type || task.type || "N/A"}
              </p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-1">
                {t("task.level")}
              </p>
              <p className="font-semibold">
                {task.level_name || task.level || "N/A"}
              </p>
            </div>
          </div>
          
          <div className="bg-muted/50 rounded-lg p-4">
            <p className="text-sm text-muted-foreground mb-1">
              {t("task.status")}
            </p>
            <p className="font-semibold capitalize">
              {task.task_status || task.status || "not-started"}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
