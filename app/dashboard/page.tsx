import { TaskContainer } from "../ui/taskcontainer";

export default function Page() {
  const tasks = [
    { title: "To Do's", dueDate: "July 5", project: "Stersonal" },
    { title: "To Do's #2", dueDate: "July 6", project: "Stersonality" },
  ];

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
