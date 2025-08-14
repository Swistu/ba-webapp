import { createDirectus, rest } from "@directus/sdk";
type Collections = {
  menu_panel: MenuPanel[];
};

type MenuPanel = {
  id: number;
  title: string;
  slug: string;
  status: string;
  parent?: number;
  sort?: number;
  order?: number;
};

const directus = createDirectus<Collections>("http://directus:8055").with(
  rest({
    onRequest: (options) => ({ ...options, cache: "no-store" }),
  })
);

export default directus;
