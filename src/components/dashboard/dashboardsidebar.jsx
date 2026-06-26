import {
  LayoutSplitSideContentLeft,
  Factory,
  SquareDot,
  ChartAreaStacked,
  SquarePlus,
  PersonFill,
  BookmarkFill,
  HeartFill,
  Persons,
  Books,
  Cubes3Overlap,
} from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import { getUserSession } from "@/lib/core/session";
import Link from "next/link";

export async function DashboardSideBar() {
  const user = await getUserSession();
  const userRole = user?.role?.toLowerCase() || "tenant";

  const ownerNavLinks = [
    {
      icon: ChartAreaStacked,
      href: "/dashboard/owner",
      label: "Analytics",
      glow: "hover:text-emerald-400 hover:border-emerald-500/20",
    },
    {
      icon: SquarePlus,
      href: "/dashboard/owner/myproperties/new",
      label: "Add Property",
      glow: "hover:text-amber-400 hover:border-amber-500/20",
    },
    {
      icon: Factory,
      href: "/dashboard/owner/myproperties",
      label: "My Properties",
      glow: "hover:text-emerald-400 hover:border-emerald-500/20",
    },
    {
      icon: SquareDot,
      href: "/dashboard/owner/bookingRequest",
      label: "Booking Requests",
      glow: "hover:text-amber-400 hover:border-amber-500/20",
    },
    {
      icon: PersonFill,
      href: "/dashboard/owner/profile",
      label: "Profile",
      glow: "hover:text-zinc-300 hover:border-zinc-700",
    },
  ];

  const tenantNavLinks = [
    {
      icon: BookmarkFill,
      href: "/dashboard/tenant",
      label: "My Bookings",
      glow: "hover:text-emerald-400 hover:border-emerald-500/20",
    },
    {
      icon: HeartFill,
      href: "/dashboard/tenant/myFavs",
      label: "Favorites",
      glow: "hover:text-red-400 hover:border-red-500/20",
    },
    {
      icon: PersonFill,
      href: "/dashboard/tenant/profile",
      label: "Profile",
      glow: "hover:text-zinc-300 hover:border-zinc-700",
    },
  ];

  const adminNavLinks = [
    {
      icon: Persons,
      href: "/dashboard/admin",
      label: "All Users",
      glow: "hover:text-violet-400 hover:border-violet-500/20",
    },
    {
      icon: Cubes3Overlap,
      href: "/dashboard/admin/allProperties",
      label: "All Properties",
      glow: "hover:text-violet-400 hover:border-violet-500/20",
    },
    {
      icon: BookmarkFill,
      href: "/dashboard/admin/allBooking",
      label: "All Bookings",
      glow: "hover:text-violet-400 hover:border-violet-500/20",
    },
    {
      icon: Books,
      href: "/dashboard/admin/transactions",
      label: "Transactions",
      glow: "hover:text-violet-400 hover:border-violet-500/20",
    },
    {
      icon: PersonFill,
      href: "/dashboard/admin/profile",
      label: "Profile",
      glow: "hover:text-zinc-300 hover:border-zinc-700",
    },
  ];

  const navLinkMap = {
    tenant: tenantNavLinks,
    owner: ownerNavLinks,
    admin: adminNavLinks,
  };

  const navItems = navLinkMap[userRole] || tenantNavLinks;

  const navContent = (
    <div className="flex flex-col h-full justify-between font-sans">
      <div className="space-y-6">
        {/* Core System Label */}
        <div className="px-3 select-none">
          <span className="text-[10px] font-mono tracking-widest text-zinc-600 uppercase block mb-1">
            Access Core
          </span>
          <div className="text-xs font-semibold text-zinc-300 uppercase tracking-wider font-mono flex items-center gap-2">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                userRole === "admin"
                  ? "bg-violet-500 shadow-[0_0_8px_#8b5cf6]"
                  : userRole === "owner"
                    ? "bg-amber-500 shadow-[0_0_8px_#f59e0b]"
                    : "bg-emerald-500 shadow-[0_0_8px_#10b85f]"
              }`}
            />
            {userRole} Node
          </div>
        </div>

        {/* Links Navigation Matrix */}
        <nav className="flex flex-col gap-1.5">
          {navItems.map((item) => (
            <Link
              key={item.label}
              className={`group flex items-center gap-3.5 rounded-xl px-3.5 py-3 text-sm text-zinc-400 border border-transparent hover:bg-zinc-900/30 hover:text-zinc-100 transition-all duration-200 ease-in-out ${item.glow}`}
              href={item.href}
            >
              <item.icon className="size-4 text-zinc-500 group-hover:text-inherit transition-colors" />
              <span className="tracking-tight font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Embedded Terminal Metadata */}
      <div className="px-3 py-2 border-t border-zinc-900 mt-auto pt-4 hidden lg:block">
        <div className="text-[10px] font-mono text-zinc-600 leading-normal">
          SYS.LOC // ONLINE <br />
          SEC_AUTH_LEVEL: {userRole.toUpperCase()}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Desktop Layout Core Bar */}
      <aside className="hidden w-64 shrink-0 border-r border-zinc-900 bg-zinc-950 p-5 lg:block h-screen sticky top-0 shadow-[20px_0_40px_rgba(0,0,0,0.4)] relative overflow-hidden">
        {/* Subtle Side Ambient Micro Pulse */}
        <div className="absolute top-0 left-0 w-[150px] h-[150px] bg-zinc-800/10 blur-[60px] rounded-full pointer-events-none" />
        <div className="relative z-10 h-full">{navContent}</div>
      </aside>

      {/* Mobile Drawer Trigger Module Overlay */}
      <div className="lg:hidden fixed bottom-6 right-6 z-40">
        <Drawer>
          <Button
            className="bg-zinc-950 text-zinc-200 border border-zinc-800/80 hover:border-zinc-700 shadow-[0_0_30px_rgba(0,0,0,0.85)] rounded-xl px-4 py-6 font-mono text-xs tracking-tight uppercase flex items-center gap-2 backdrop-blur-md"
            variant="flat"
          >
            <LayoutSplitSideContentLeft className="size-4 text-emerald-400 drop-shadow-[0_0_5px_rgba(52,211,153,0.4)]" />
            Menu Matrix
          </Button>
          <Drawer.Backdrop className="bg-black/80 backdrop-blur-md">
            <Drawer.Content
              placement="left"
              className="bg-zinc-950 border-r border-zinc-900 p-0 max-w-[280px]"
            >
              <Drawer.Dialog className="bg-transparent text-zinc-200 h-full flex flex-col p-6">
                <Drawer.CloseTrigger className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors" />
                <Drawer.Header className="p-0 mb-8 border-b border-zinc-900/60 pb-4">
                  <Drawer.Heading className="text-base font-bold font-mono uppercase tracking-widest text-zinc-100">
                    GOZON Matrix
                  </Drawer.Heading>
                </Drawer.Header>
                <Drawer.Body className="p-0 h-full">{navContent}</Drawer.Body>
              </Drawer.Dialog>
            </Drawer.Content>
          </Drawer.Backdrop>
        </Drawer>
      </div>
    </>
  );
}
