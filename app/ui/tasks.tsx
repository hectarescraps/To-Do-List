function Bubble({
  title,
  dueDate,
  project,
}: {
  title: string;
  dueDate: Date;
  project: string;
}) {
  return (
    <div>
      <p className="text-red-500">
        {`Title: ${title}, dueDate: ${dueDate}, Project: ${project}`}
      </p>
    </div>
  );
}

export { Bubble };
