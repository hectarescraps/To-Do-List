import {
  ChevronDoubleLeftIcon,
  MagnifyingGlassIcon,
  InboxIcon,
  HashtagIcon,
} from "@heroicons/react/24/outline";

export default function SideNav({
  userName,
  projects,
}: {
  userName: string;
  projects: string[];
}) {
  return (
    <div className="h-screen flex-col bg-orange-50" id="nav__container">
      <div
        className="flex flex-grow-0 justify-between items-center pt-2"
        id="top__row"
      >
        <h1 className="ml-4 text-lg font-light">{userName}</h1>
        <ChevronDoubleLeftIcon className="w-4 h-4 mr-4" strokeWidth={2} />
      </div>
      <div className="flex-col pt-10" id="inboxes">
        <div className="flex justify-start items-center ml-4" id="search">
          <MagnifyingGlassIcon className="w-4 h-4" strokeWidth={2} />
          <h2 className="ml-4 text-lg font-light">{"Search"}</h2>
        </div>
        <div
          className="flex justify-start items-center ml-4 pt-3"
          id="all_tasks"
        >
          <InboxIcon className="w-4 h-4" strokeWidth={2} />
          <h2 className="ml-4 text-lg font-light">{"All Tasks"}</h2>
        </div>
        {projects.map((project, index) => (
          <div
            className="flex justify-start items-center ml-4 pt-3"
            id="all_tasks"
            key={index}
          >
            <HashtagIcon className="w-4 h-4" strokeWidth={2} />
            <h2 className="ml-4 text-lg font-light">{project}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
