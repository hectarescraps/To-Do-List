import dayjs from "dayjs";
import { TaskContainer } from "../ui/taskcontainer";
import { fetchTasks } from "../lib/data";
import { AddTaskButton } from "../ui/buttons";
import { TaskForm } from "../ui/forms";
import { AddTaskWrapper } from "../ui/addtaskwrapper";
import { Suspense } from "react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function TaskList() {
  const tasks = await fetchTasks();

  return (
    <>
      {tasks.map((task, index) => (
        <div key={index}>
          <TaskContainer
            title={task.title}
            dueDate={dayjs(task.duedate).format("MMM-D")}
            project={task.project}
            id={task.id}
          />
        </div>
      ))}
    </>
  );
}

export default function Page() {
  return (
    <>
      <Suspense fallback={<div>Loading tasks...</div>}>
        <TaskList />
      </Suspense>
      <AddTaskWrapper />
    </>
  );
}
