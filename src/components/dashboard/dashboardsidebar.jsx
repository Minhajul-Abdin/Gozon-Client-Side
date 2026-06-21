import {
  LayoutSplitSideContentLeft,
  Factory,
  SquareDot,
  ChartAreaStacked,
  SquarePlus,
  PersonFill,
} from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";

export function DashboardSideBar() {
  const navItems = [
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
    { icon: PersonFill, href: "/dashboard/owner", label: "Profile" },
  ];

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
