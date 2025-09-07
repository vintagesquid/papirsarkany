import { defineType } from "sanity";

export default defineType({
  name: "news",
  type: "document",
  title: "Hírek",
  fields: [
    {
      name: "label",
      type: "string",
      title: "Cím",
      validation: (rule) => rule.required(),
    },
    {
      name: "link",
      type: "url",
      title: "Link",
      validation: (rule) => rule.optional().uri(),
    },
  ],
});
