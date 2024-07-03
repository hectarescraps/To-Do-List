import { TaskContainer } from "../ui/taskcontainer";

export default function Page() {
/* tasks: {
    title: string;
    dueDate: string;
    project: string;
  }[] */
  const tasks = [
    { title: "To Do's", dueDate: "July 5", project: "Stersonal" },
    { title: "To Do's #2", dueDate: "July 6", project: "Stersonality" },
  ];

  return (
    <>
      {tasks.map((task, index) => (
        <TaskContainer
          className="pt-2"
          title={task.title}
          dueDate={task.dueDate}
          project={task.project}
          key={index}
        />
      ))}
    </>
  );
}
