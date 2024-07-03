import SideNav from "../ui/sidenav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row">
      <div className="w-1/4">
        <SideNav userName="Bill" projects={["Q", "Will", "Zammer"]} />
      </div>
      <div className="flex-grow ml-6 mr-6">{children}</div>
    </div>
  );
}
