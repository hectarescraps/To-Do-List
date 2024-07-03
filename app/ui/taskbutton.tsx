import { CheckIcon } from "@heroicons/react/24/outline";

export function TaskButton() {
  return (
    <button
      className="rounded-full border-indigo-600 border-2 ml-2 mr-3 w-5 h-5 flex justify-center items-center group"
      type="button"
      value="false"
    >
      <CheckIcon
        className="invisible w-2.5 h-2.5 stroke-indigo-600 group-hover:visible"
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
