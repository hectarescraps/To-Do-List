import { TaskContainer } from "../ui/taskcontainer";
import { fetchTasks } from "../lib/data";

export default async function Page() {
  const tasks = await fetchTasks();

  return (
    <>
      {tasks.map((task, index) => (
        <div className="pt-2" key={index}>
          <TaskContainer
            title={task.title}
            dueDate={task.dueDate}
            project={task.project}
          />
        </div>
      ))}
    </>
  );
}
