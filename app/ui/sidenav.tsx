"use client";

import {
  ChevronDoubleLeftIcon,
  InboxIcon,
  HashtagIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function SideNav({
  userName,
  projects,
  onClose,
}: {
  userName: string | undefined;
  projects: string[];
  onClose: () => void;
}) {
  const router = useRouter();

  const handleProjectClick = (project: string) => {
    router.push(`/dashboard?project=${project}`);
  };

  return (
    <div
      className="fixed top-0 left-0 h-full w-1/4 flex flex-col bg-orange-50 overflow-y-auto"
      id="nav__container"
    >
      <div
        className="flex flex-grow-0 justify-between items-center pt-2"
        id="top__row"
      >
        <h1 className="ml-4 text-xl text-orange-800">{userName}</h1>
        <ChevronDoubleLeftIcon
          onClick={onClose}
          className="w-4 h-4 mr-4 hover:stroke-orange-800 cursor-pointer"
          strokeWidth={2.5}
        />
      </div>
      <div className="flex-col pt-6" id="inboxes">
        <button
          className="flex justify-start items-center ml-4 pt-3 group"
          id="all_tasks"
          onClick={() => handleProjectClick("All Tasks")}
        >
          <InboxIcon
            className="w-4 h-4 group-hover:stroke-orange-800"
            strokeWidth={2}
          />
          <h2 className="ml-4 text-lg font-light group-hover:text-orange-800">
            {"All Tasks"}
          </h2>
        </button>
        {projects.map((project, index) => (
          <button
            className="flex justify-start items-center ml-4 pt-3 group "
            id="all_tasks"
            key={index}
            onClick={() => handleProjectClick(project)}
          >
            <HashtagIcon
              className="w-4 h-4 group-hover:stroke-orange-800 "
              strokeWidth={2}
            />
            <h2 className="ml-4 text-lg font-light group-hover:text-orange-800">
              {project}
            </h2>
          </button>
        ))}
      </div>
    </div>
  );
}
