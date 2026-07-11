import Modal from './Modal';
import { useState } from 'react';
import Leader from '@/processes/leaders';

export default function TaskForm({ open, onClose }) {
  const [taskName, setTaskName] = useState('');
  const [levelName, setLevelName] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [points, setPoints] = useState(0);
  const [taskType, setTaskType] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const reset = () => {
    setTaskName('');
    setLevelName('');
    setTaskDesc('');
    setPoints(0);
    setTaskType('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!taskName.trim()) {
      alert('Please provide a task name');
      return;
    }

    setSubmitting(true);
    try {
      const leader = new Leader();
      await leader.addTask(taskName.trim(), levelName.trim(), taskDesc.trim(), Number(points) || 0, taskType.trim());
      reset();
      onClose();
      // optional: emit an event or callback to refresh task list
    } catch (err) {
      console.error('Failed to add task', err);
      alert('Failed to add task');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Add Task</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="taskName" className="text-sm font-medium">Task Name</label>
            <input
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              type="text"
              id="taskName"
              name="taskName"
              className="border border-gray-300 rounded p-2 w-full"
              required
            />
          </div>

          <div>
            <label htmlFor="levelName" className="text-sm font-medium">Level</label>
            <input
              value={levelName}
              onChange={(e) => setLevelName(e.target.value)}
              type="text"
              id="levelName"
              name="levelName"
              className="border border-gray-300 rounded p-2 w-full"
            />
          </div>

          <div>
            <label htmlFor="taskDesc" className="text-sm font-medium">Description</label>
            <textarea
              value={taskDesc}
              onChange={(e) => setTaskDesc(e.target.value)}
              id="taskDesc"
              name="taskDesc"
              className="border border-gray-300 rounded p-2 w-full"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="points" className="text-sm font-medium">Points</label>
              <input
                value={points}
                onChange={(e) => setPoints(e.target.value)}
                type="number"
                id="points"
                name="points"
                className="border border-gray-300 rounded p-2 w-full"
                min={0}
              />
            </div>
            <div>
              <label htmlFor="taskType" className="text-sm font-medium">Type</label>
              <input
                value={taskType}
                onChange={(e) => setTaskType(e.target.value)}
                type="text"
                id="taskType"
                name="taskType"
                className="border border-gray-300 rounded p-2 w-full"
              />
            </div>
          </div>

          <div className="flex gap-2 justify-end">
            <button type="button" onClick={() => { reset(); onClose(); }} className="px-4 py-2 rounded border">
              Cancel
            </button>
            <button type="submit" disabled={submitting} className="px-4 py-2 rounded bg-blue-600 text-white">
              {submitting ? 'Adding...' : 'Add Task'}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}