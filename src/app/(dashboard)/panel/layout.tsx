import "../../../styles/globals.css";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { isDirectusError, readItems } from "@directus/sdk";
import directus from "@/lib/directus";

export type menuItem = {
  id: number;
  title: string;
  slug: string;
  isActive?: boolean;
  items?: menuItem[];
};

async function getDirectusData() {
  try {
    const data = await directus.request(
      readItems("panel_menu", {
        filter: { status: { _eq: "published" } },
        fields: ["id", "order", "title", "slug", "status", "parent", "sort"],
      })
    );
    const menuItems: menuItem[] = [];
    data.forEach((item) => {
      if (Object.hasOwn(item, "parent") && item.parent) {
        const parentIndex = menuItems.findIndex(
          (parentItem) => parentItem.id === item.parent
        );

        menuItems[parentIndex].items?.push({
          id: item.id,
          title: item.title,
          slug: item.slug,
        });
      } else {
        menuItems.push({
          ...item,
          items: [],
        });
      }
    });

    return menuItems;
  } catch (error) {
    if (isDirectusError(error)) {
      console.error("Directus error:", error.message);
    } else {
      console.error("Error API data:", error);
    }
  }
}

export default async function PanelPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = (await getDirectusData()) ?? [];

  return (
    <html>
      <body>
        <SidebarProvider>
          <AppSidebar menuItems={navItems} />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator
                  orientation="vertical"
                  className="mr-2 data-[orientation=vertical]:h-4"
                />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href="#">
                        Building Your Application
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
              <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <div className="bg-muted/50 aspect-video rounded-xl" />
                <div className="bg-muted/50 aspect-video rounded-xl" />
                <div className="bg-muted/50 aspect-video rounded-xl" />
              </div>
              <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
            </div>
          </SidebarInset>
        </SidebarProvider>
        <main>{children}</main>
      </body>
    </html>
  );
}
