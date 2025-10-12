import { defineField, defineType } from "sanity";

export default defineType({
  name: "contact",
  type: "document",
  title: "Kontakt",
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Név",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "email",
      type: "string",
      title: "Email",
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: "phoneNumber",
      type: "string",
      title: "Telefonszám",
      description: '(formázva)',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "address",
      type: "object",
      title: "Teljes cím",
      fields: [
        defineField({
          name: "postCode",
          type: "string",
          title: "Irányítószám",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "city",
          type: "string",
          title: "Város",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "street",
          type: "string",
          title: "Utca név",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "streetNo",
          type: "string",
          title: "Házszám",
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "taxId",
      type: "string",
      title: "Adószám",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "bankAccountNumber",
      type: "string",
      title: "Bank számlaszám",
      validation: (rule) => rule.required(),
    }),
  ],
});
