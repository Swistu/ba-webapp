import "../../../styles/globals.css";

import { isDirectusError, readItems } from "@directus/sdk";
import directus from "@/lib/directus";
import Link from "next/link";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

export type menuItem = {
  id: number;
  title: string;
  slug: string;
  isActive?: boolean;
  items?: menuItem[];
};

export default async function PanelPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
  const navItems = (await getDirectusData()) ?? [];

  const session = await auth();

  return (
    <html>
      <body>
        <div className="flex h-screen">
          <SessionProvider session={session}>
            <aside className="w-64 bg-gray-800 text-white overflow-y-auto">
              <nav className="p-4">
                <ul className="flex flex-col space-y-2">
                  <li>test</li>
                  <li>test</li>
                  <li>test</li>
                  <li>test</li>
                  <li>test</li>
                  <li>test</li>
                  <li>test</li>
                  <li>test</li>
                  <Link href="/panel">panel</Link>
                  <Link href="/">Strona główna</Link>
                </ul>
              </nav>
            </aside>
            <div className="flex-1 flex flex-col">
              <header>bredcrumbs</header>
              <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
                {children}
              </main>
            </div>
          </SessionProvider>
        </div>
      </body>
    </html>
  );
}
