import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupLabel,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Plus } from "lucide-react";
import { Logo } from "./ui/logo";
import {
  LayoutDashboard,
  PackagePlus,
  TicketPercent,
  ShoppingBasket,
  ChartBarStacked,
  PackageOpen,
  Users,
} from "lucide-react";

export function AppSidebar() {
  const projects = [
    {
      name: "QUICK LINK",
      members: [
        {
          name: "DASHBOARD",
          icon: LayoutDashboard,
          url: "#",
        },
        {
          name: "NEW PRODUCT",
          icon: PackagePlus,
          url: "#",
        },
        {
          name: "DISCOUNT",
          icon: TicketPercent,
          url: "#",
        },
      ],
    },
    {
      name: "CATALOG",
      members: [
        {
          name: "PRODUCT",
          icon: ShoppingBasket,
          url: "#",
        },
        {
          name: "CATEGORIES",
          icon: ChartBarStacked,
          url: "#",
        },
      ],
    },
    {
      name: "SALES",
      members: [
        {
          name: "ORDERS",
          icon: PackageOpen,
          url: "#",
        },
      ],
    },
    {
      name: "CUSTOMERS",
      members: [
        {
          name: "CUSTOMERS",
          icon: Users,
          url: "#",
        },
      ],
    },
  ];
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center ">
            <Logo />
            <p>RightEouse Printing</p>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {projects.map((project) => (
          <SidebarGroup key={project.name}>
            <SidebarGroupLabel>{project.name}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {project.members.map((member) => (
                  <SidebarMenuItem key={member.name}>
                    <SidebarMenuButton asChild>
                      <a href={member.url}>
                        <member.icon />
                        <span>{member.name}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
