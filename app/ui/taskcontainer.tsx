import { FlagIcon } from "@heroicons/react/24/outline";
import { TaskButton, InvisibleTaskButton } from "./buttons";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";

function getFlagClass(priority: number): string {
  switch (priority) {
    case 1:
      return "w-4 h-4 mr-2 ml-2 stroke-orange-800";
    case 2:
      return "w-4 h-4 mr-2 ml-2 stroke-orange-500 ";
    case 3:
      return "w-4 h-4 mr-2 ml-2 stroke-orange-200 ";
    default:
      return "w-4 h-4 mr-2 ml-2 stroke-gray-400 ";
  }
}

export function TaskContainer({
  title,
  dueDate,
  project,
  id,
  priority,
}: {
  title: string;
  dueDate: string;
  project: string;
  id: string;
  priority: number;
}) {
  const flagClassName = getFlagClass(priority);
  return (
    <div className="border-b-2 border-gray-300 pb-1 pt-1" id="task__container">
      <div className="flex items-center justify-start" id="top__row">
        <TaskButton id={id} />
        <p className="text-lg font-light">{title}</p>
      </div>
      <div className="flex items-center justify-between" id="bottom__row">
        <div className="flex items-center w-1/2">
          {/* Work around for formatting. Potentially revisit in the future. */}
          <InvisibleTaskButton />
          <CalendarDaysIcon
            className="stroke-orange-500 w-4 h-4"
            strokeWidth={1}
          />
          <p className="text-orange-500 text-sm font-light ml-2">{dueDate}</p>
          <FlagIcon className={flagClassName} strokeWidth={2} />
        </div>
        <p className="text-gray-400 text-sm font-light">{project}</p>
      </div>
    </div>
  );
}
