import { Suspense } from "react";
import { fetchProjects } from "../lib/data";
import LayoutWrapper from "./layoutwrapper";
import { auth } from "@/auth";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const projects = await fetchProjects();
  const projectNames = projects.map((project) => project.project);
  const session = await auth();
  const userName = session?.user?.email?.split("@")[0];

  return (
    <>
      <Suspense fallback={<div>Loading projects...</div>}>
        <div className="flex flex-row">
          <LayoutWrapper projects={projectNames} userName={userName} />
          <div className="flex-grow ml-6 mr-6">{children}</div>
        </div>
      </Suspense>
    </>
  );
}
