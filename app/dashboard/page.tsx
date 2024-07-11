import { TaskContainer } from "../ui/taskcontainer";
import { fetchTasks } from "../lib/data";
import * as dayjs from "dayjs";

export default async function Page() {
  const tasks = await fetchTasks();

  return (
    <>
      {tasks.map((task, index) => (
        <div className="pt-2" key={index}>
          <TaskContainer
            title={task.title}
            dueDate={dayjs(task.duedate).format("MMM-D")}
            project={task.project}
          />
        </div>
      ))}
    </>
  );
}
