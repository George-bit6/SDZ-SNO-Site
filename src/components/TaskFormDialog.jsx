import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function TaskFormDialog({
    isOpen,
    onClose,
    onSubmit,
    taskForm,
    onFormChange,
    uniqueLevelNames,
    subgroupsTasks
}) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px] bg-white">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-[#253858]">Assign New Task</DialogTitle>
                </DialogHeader>
                <form onSubmit={onSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="taskName" className="text-sm font-medium text-[#253858]">Task Name</Label>
                        <Input
                            id="taskName"
                            name="taskName"
                            value={taskForm.taskName}
                            onChange={onFormChange}
                            placeholder="Enter task name"
                            className="border-[#E8ECF4] focus:border-[#4A7DFF] focus:ring-[#4A7DFF]/20"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="levelName" className="text-sm font-medium text-[#253858]">Level Name</Label>
                        <select
                            id="levelName"
                            name="levelName"
                            value={taskForm.levelName}
                            onChange={onFormChange}
                            className="w-full h-10 px-3 py-2 text-sm border border-[#E8ECF4] rounded-md focus:outline-none focus:border-[#4A7DFF] focus:ring-[#4A7DFF]/20"
                            required
                        >
                            <option value="">Select a level</option>
                            {uniqueLevelNames.map(level => (
                                <option key={level} value={level}>
                                    {level}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="subgroupId" className="text-sm font-medium text-[#253858]">Subgroup</Label>
                        <select
                            id="subgroupId"
                            name="subgroupId"
                            value={taskForm.subgroupId}
                            onChange={onFormChange}
                            className="w-full h-10 px-3 py-2 text-sm border border-[#E8ECF4] rounded-md focus:outline-none focus:border-[#4A7DFF] focus:ring-[#4A7DFF]/20"
                            required
                        >
                            <option value="">Select a subgroup</option>
                            {subgroupsTasks.map(subgroup => (
                                <option key={subgroup.subgroupId} value={subgroup.subgroupId}>
                                    {subgroup.subgroupName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description" className="text-sm font-medium text-[#253858]">Description</Label>
                        <Textarea
                            id="description"
                            name="description"
                            value={taskForm.description}
                            onChange={onFormChange}
                            placeholder="Enter task description"
                            className="border-[#E8ECF4] focus:border-[#4A7DFF] focus:ring-[#4A7DFF]/20 min-h-[100px] resize-none"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="taskType" className="text-sm font-medium text-[#253858]">Task Type</Label>
                        <select
                            id="taskType"
                            name="taskType"
                            value={taskForm.taskType}
                            onChange={onFormChange}
                            className="w-full h-10 px-3 py-2 text-sm border border-[#E8ECF4] rounded-md focus:outline-none focus:border-[#4A7DFF] focus:ring-[#4A7DFF]/20"
                            required
                        >
                            <option value="">Select a task type</option>
                            <option value="scout">Scout</option>
                            <option value="religious">Religious</option>
                            <option value="social">Social</option>
                            <option value="educational">Educational</option>
                            <option value="custom">Custom</option>
                        </select>
                    </div>

                    <DialogFooter className="gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            className="border-[#E8ECF4] text-[#8A94A6] hover:bg-[#F4F6FB]"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="bg-[#4A7DFF] text-white hover:bg-[#3B6BDD]"
                        >
                            Assign Task
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}