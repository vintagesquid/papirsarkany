"use client";

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/admin/[[...index]]/page.tsx` route
 */
import { huHULocale } from "@sanity/locale-hu-hu";
import { visionTool } from "@sanity/vision";
import { defineConfig, isDev } from "sanity";
import { structureTool } from "sanity/structure";
import { media } from "sanity-plugin-media";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schema } from "./sanity/schema";

const devOnlyPlugins = [
  visionTool({
    defaultApiVersion: apiVersion,
    title: "Query Playground",
  }),
];

export default defineConfig({
  title: dataset,
  basePath: "/admin",
  projectId,
  dataset,
  scheduledPublishing: {
    enabled: false,
  },
  schema,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Tartalom")
          .items([
            // singleton document
            S.listItem()
              .id("contact")
              .schemaType("contact")
              .title("Kontakt")
              .child(
                S.editor()
                  .id("contact")
                  .schemaType("contact")
                  .documentId("contact"),
              ),

            S.divider(),

            ...S.documentTypeListItems().filter((listItemBuilder) => {
              const id = listItemBuilder.getId();
              return id !== "contact" && id !== "media.tag";
            }),
          ]),
    }),
    huHULocale(),
    media(),
    ...(isDev ? devOnlyPlugins : []),
  ],
});
