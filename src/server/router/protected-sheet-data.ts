import { createProtectedRouter } from "./protected-router";
import prisma from "../../utils/prisma";
import { z } from "zod";

const Sheet = z.object({
  sheet: z.number().min(1).max(715),
  owner: z.string(),
  location: z.string(),
  completed: z.boolean(),
  last_modified_by: z.string(),
  last_modified_at: z.date(),
});

export type Sheet = z.infer<typeof Sheet>;

// Example router with queries that can only be hit if the user requesting is signed in
// gets a sheet by sheet id if user is signed in
export const sheetRouter = createProtectedRouter()
  .query("getSession", {
    resolve({ ctx }) {
      return ctx.session;
    },
  })
  .query("find", {
    async resolve({ ctx }) {
      return await prisma.physical_inventory_2022_sheets.findMany({
        where: {
          sheet: {
            gte: 1,
            lte: 715,
          },
        },
      });
    },
  })
  .query("findOne", {
    input: z.object({
      sheet: z.number().min(1).max(715),
    }),
    async resolve({ ctx, input }) {
      return await prisma.physical_inventory_2022_sheets.findUnique({
        where: {
          sheet: input.sheet,
        },
      });
    },
  })
  .mutation("updateOne", {
    input: z.object({
      sheet: z.number().min(1).max(715),
      owner: z.string(),
      location: z.string(),
      last_modified_by: z.string(),
    }),
    async resolve({ ctx, input }) {
      return await prisma.physical_inventory_2022_sheets.update({
        where: {
          sheet: input.sheet,
        },
        data: {
          owner: input.owner,
          location: input.location,
          last_modified_by: input.last_modified_by,
          last_modified_at: new Date(),
        },
      });
    },
  });
