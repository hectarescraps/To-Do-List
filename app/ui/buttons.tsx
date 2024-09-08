"use client";

import { CheckIcon, PlusIcon } from "@heroicons/react/24/outline";
import { deleteTask } from "../lib/actions";
import { TaskForm } from "./forms";

export function TaskButton({
  id,
  currentProject,
}: {
  id: string;
  currentProject?: string;
}) {
  return (
    <button
      className="rounded-full border-orange-500 border-2 ml-2 mr-3 w-5 h-5 flex justify-center items-center hover:border-orange-800 group"
      type="button"
      value="false"
      onClick={() => deleteTask({ id, currentProject })}
    >
      <CheckIcon
        className="invisible w-2.5 h-2.5 stroke-gray-500 group-hover:visible"
        strokeWidth={3}
      />
    </button>
  );
}

export function InvisibleTaskButton() {
  return (
    <button
      className="rounded-full ml-2 mr-3 w-5 h-5 flex justify-center items-center group"
      type="button"
      value="false"
    />
  );
}

export function AddTaskButton({ onAddTask }: { onAddTask: () => void }) {
  return (
    <button
      className="bg-white ml-2 flex items-center group"
      type="button"
      value="false"
      onClick={onAddTask}
    >
      <PlusIcon
        className="rounded-full w-5 h-5 bg-white stroke-orange-800 group-hover:stroke-white group-hover:bg-orange-800"
        strokeWidth={2}
      />
      <span className="ml-4 text-lg font-light text-gray-400 group-hover:text-orange-800">
        {"Add Task"}
      </span>
    </button>
  );
}
