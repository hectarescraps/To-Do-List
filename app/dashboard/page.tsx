import dayjs from "dayjs";
import { TaskContainer } from "../ui/taskcontainer";
import { fetchAllTasks } from "../lib/data";
import { AddTaskButton } from "../ui/buttons";
import { TaskForm } from "../ui/forms";
import { AddTaskWrapper } from "../ui/addtaskwrapper";
import { Suspense } from "react";
import { auth } from "../../auth";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function TaskList({ project }: { project?: string }) {
  const tasks = await fetchAllTasks();

  const filteredTasks =
    project && project !== "All Tasks"
      ? tasks.filter((task) => task.project === project)
      : tasks;

  return (
    <div className="pt-4">
      {filteredTasks.map((task, index) => (
        <div key={index} className="py-1">
          <TaskContainer
            title={task.title}
            dueDate={dayjs(task.duedate).format("MMM-DD")}
            project={task.project}
            id={task.id}
            priority={task.priority}
            currentProject={project}
          />
        </div>
      ))}
    </div>
  );
}

export default function Page({
  searchParams,
}: {
  searchParams: { project?: string };
}) {
  return (
    <>
      <Suspense fallback={<div>Loading tasks...</div>}>
        <TaskList project={searchParams.project} />
      </Suspense>
      <AddTaskWrapper />
    </>
  );
}
