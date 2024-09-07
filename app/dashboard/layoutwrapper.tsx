"use client";

import { useState } from "react";
import SideNav from "../ui/sidenav";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/outline";

export default function LayoutWrapper({
  projects,
  userName,
}: {
  projects: string[];
  userName: string;
}) {
  const [showSideNav, setShowSideNav] = useState(true);

  return (
    <>
      {showSideNav && (
        <div className="w-1/4">
          <SideNav
            onClose={() => setShowSideNav(false)}
            userName={userName}
            projects={projects}
          />
        </div>
      )}
      {!showSideNav && (
        <div className="w-6">
          <div className="fixed top-0 left-0 h-full flex items-center bg-orange-50 overflow-y-auto">
            <ChevronDoubleRightIcon
              onClick={() => setShowSideNav(true)}
              className="w-4 h-4 ml-1 mr-1 hover:stroke-orange-800 cursor-pointer"
              strokeWidth={2.5}
            />
          </div>
        </div>
      )}
    </>
  );
}
