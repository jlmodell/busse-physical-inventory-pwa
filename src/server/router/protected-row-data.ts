import { createProtectedRouter } from "./protected-router";
import prisma from "../../utils/prisma";
import { z } from "zod";

const Row = z.object({
  row: z.number().min(1).max(7150),
  part: z.string().trim(),
  lot: z.string().trim().default(""),
  quantity: z.number().default(0),
  uom: z.string().trim().default("CS"),
  total: z.number().default(0),
  last_modified_by: z.string(),
  last_modified_at: z.date(),
});

export type Row = z.infer<typeof Row>;

// Example router with queries that can only be hit if the user requesting is signed in
// gets a sheet by sheet id if user is signed in
export const rowRouter = createProtectedRouter()
  .query("getSession", {
    resolve({ ctx }) {
      return ctx.session;
    },
  })
  .query("find", {
    input: z.object({
      sheet: z.number().min(1).max(715),
    }),
    async resolve({ ctx, input }) {
      return await prisma.physical_inventory_2022_rows.findMany({
        where: {
          sheet: input.sheet,
        },
        orderBy: {
          row: "asc",
        },
      });
    },
  })
  .query("findOne", {
    // input is an item number
    input: z.object({
      row: z.number().min(1).max(7150),
    }),
    async resolve({ ctx, input }) {
      return await prisma.physical_inventory_2022_rows.findUnique({
        where: {
          row: input.row,
        },
      });
    },
  })
  .query("findManyByPart", {
    // input is an item number
    input: z.object({
      part: z.string(),
    }),
    async resolve({ ctx, input }) {
      return await prisma.physical_inventory_2022_rows.findMany({
        where: {
          part: input.part,
        },
      });
    },
  })
  .mutation("updateOne", {
    input: z.object({
      row: z.number().min(1).max(7150),
      part: z.string().trim(),
      lot: z.string().trim().default(""),
      quantity: z.number().default(0),
      uom: z.string().trim().default("CS"),
      total: z.number().default(0),
      last_modified_by: z.string(),
      last_modified_at: z.date(),
    }),
    async resolve({ ctx, input }) {
      const {
        row,
        part,
        lot,
        quantity,
        uom,
        total,
        last_modified_by,
        last_modified_at,
      } = input;

      return await prisma.physical_inventory_2022_rows.update({
        where: {
          row,
        },
        data: {
          part,
          lot,
          quantity,
          uom,
          total,
          last_modified_by,
          last_modified_at: last_modified_at || new Date(),
        },
      });
    },
  });
