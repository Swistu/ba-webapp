import "../../../styles/globals.css";

import { isDirectusError, readItems } from "@directus/sdk";
import directus from "@/lib/directus";
import Link from "next/link";
import { SessionProvider, signOut } from "next-auth/react";
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
        readItems("menu_panel", {
          filter: { status: { _eq: "published" } },
          fields: ["id", "title", "slug", "status", "parent", "sort"],
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

  if (!session || !session.user.databaseUser) {
    return (
      <html>
        <body>
          <div className="flex h-screen items-center justify-center">
            <p className="text-lg">You are not authenticated</p>
            <Link href="/">Go to Home</Link>
          </div>
        </body>
      </html>
    );
  }

  return (
    <html>
      <body>
        <div className="flex h-screen">
          <SessionProvider session={session}>
            <aside className="w-64 bg-gray-800 text-white overflow-y-auto">
              <div className="p-4">
                <p className="text-xl font-bold">
                  {session?.user.databaseUser.nickname}
                </p>
                <p className="text-sm">
                  {session?.user.databaseUser.user_rank.rank.name}
                </p>
              </div>
              <nav className="p-4">
                <ul className="flex flex-col space-y-2">
                  {navItems.map((item) => (
                    <li key={item.id}>
                      <Link href={`/panel/${item.slug}`}>{item.title}</Link>
                    </li>
                  ))}
                  <li>
                    <button>Sign Out</button>
                  </li>
                </ul>
              </nav>
            </aside>
            <div className="flex-1 flex flex-col w-64">
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
