import { defineField, defineType } from "sanity";

export default defineType({
  name: "news",
  type: "document",
  title: "Hírek",
  fields: [
    defineField({
      name: "label",
      type: "string",
      title: "Cím",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "link",
      type: "url",
      title: "Link",
      validation: (Rule) =>
        Rule.uri({
          scheme: ["http", "https", "mailto", "tel"],
        }),
    }),
  ],
});
