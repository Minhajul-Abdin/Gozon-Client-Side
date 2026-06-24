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
  const ownerNavLinks = [
    { icon: ChartAreaStacked, href: "/dashboard/owner", label: "Analytics" },
    {
      icon: SquarePlus,
      href: "/dashboard/owner/myproperties/new",
      label: "Add Property",
    },
    {
      icon: Factory,
      href: "/dashboard/owner/myproperties",
      label: "My Properties",
    },
    {
      icon: SquareDot,
      href: "/dashboard/owner/bookingRequest",
      label: "Booking Requests",
    },
    { icon: PersonFill, href: "/dashboard/owner/profile", label: "Profile" },
  ];

  const tenantNavLinks = [
    { icon: BookmarkFill, href: "/dashboard/tenant", label: "My Bookings" },
    {
      icon: HeartFill,
      href: "/dashboard/tenant/myFavs",
      label: "Favorites",
    },
    { icon: PersonFill, href: "/dashboard/tenant/profile", label: "Profile" },
  ];

  const adminNavLinks = [
    { icon: Persons, href: "/dashboard/admin", label: "All Users" },
    {
      icon: Cubes3Overlap,
      href: "/dashboard/admin/allProperties",
      label: "All Properties",
    },
    {
      icon: BookmarkFill,
      href: "/dashboard/admin/allBooking",
      label: "All Bookings",
    },
    {
      icon: Books,
      href: "/dashboard/admin/transactions",
      label: "Transactions",
    },
    { icon: PersonFill, href: "/dashboard/admin/profile", label: "Profile" },
  ];

  const navLinkMap = {
    tenant: tenantNavLinks,
    owner: ownerNavLinks,
    admin: adminNavLinks,
  };

  const navItems = navLinkMap[user?.role];

  const navContent = (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => (
        <Link
          key={item.label}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
          type="button"
          href={item.href}
        >
          <item.icon className="size-5 text-muted" />
          {item.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <>
      <aside className="hidden w-60 shrink-0 border border-default p-4 lg:block">
        {navContent}
      </aside>
      <Drawer>
        <Button className="lg:hidden" variant="secondary">
          <LayoutSplitSideContentLeft />
          Sidebar
        </Button>
        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog>
              <Drawer.CloseTrigger />
              <Drawer.Header>
                <Drawer.Heading>Navigation</Drawer.Heading>
              </Drawer.Header>
              <Drawer.Body>{navContent}</Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}
