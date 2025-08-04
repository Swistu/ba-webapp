import { createDirectus, rest, RestClient, withToken } from "@directus/sdk";
type Collections = {
  panel_menu: PanelMenu[];
};

type PanelMenu = {
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
