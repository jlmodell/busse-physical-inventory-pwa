import { createProtectedRouter } from "./protected-router";
import prisma from "../../utils/prisma";
import { z } from "zod";

const Lot = z.object({
  lot: z.string(),
  part: z.string(),
  on_hand_qty: z.number(),
});

export type Sheet = z.infer<typeof Lot>;

// Example router with queries that can only be hit if the user requesting is signed in
// gets a sheet by sheet id if user is signed in
export const lotRouter = createProtectedRouter()
  .query("getSession", {
    resolve({ ctx }) {
      return ctx.session;
    },
  })
  .query("find", {
    input: z.object({
      part: z.string(),
    }),
    async resolve({ ctx, input }) {
      return await prisma.physical_inventory_2022_lots.findMany({
        where: {
          part: input.part,
        },
      });
    },
  });
