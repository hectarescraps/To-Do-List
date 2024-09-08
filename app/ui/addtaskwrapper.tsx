"use client";
import { useState } from "react";
import { TaskForm } from "./forms";
import { AddTaskButton } from "./buttons";

export function AddTaskWrapper() {
  const [showTaskForm, setShowTaskForm] = useState(false);

  return (
    <>
      <div className="py-2">
        <AddTaskButton onAddTask={() => setShowTaskForm(true)} />
      </div>
      {showTaskForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <TaskForm onClose={() => setShowTaskForm(false)} />
          </div>
        </div>
      )}
    </>
  );
}
