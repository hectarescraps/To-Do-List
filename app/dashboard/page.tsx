import * as dayjs from "dayjs";
import { TaskContainer } from "../ui/taskcontainer";
import { fetchTasks } from "../lib/data";
import { AddTaskButton } from "../ui/buttons";
import { TaskForm } from "../ui/forms";

export default async function Page() {
  const tasks = await fetchTasks();

  return (
    <>
      {tasks.map((task, index) => (
        <div key={index}>
          <TaskContainer
            title={task.title}
            dueDate={dayjs(task.duedate).format("MMM-D")}
            project={task.project}
          />
        </div>
      ))}
      <div className="pt-1 pb-1">
        <AddTaskButton />
      </div>
      <div className="pt-3 w-full">
        <TaskForm />
      </div>
    </>
  );
}
