import { ObjectId } from "mongodb";

import { z } from "zod";

import { createProtectedRouter } from "./protected-router";
import clientPromise from "../../utils/mongodb";

const Item = z.object({
  _id: z.instanceof(ObjectId),
  part: z.string(),
  description: z.string(),
  each_per_case: z.number(),
  num_of_dispenser_boxes_per_case: z.number(),
  date_added: z.date(),
  date_updated: z.date(),
  gtin: z.string(),
});

export type Item = z.infer<typeof Item>;

// Example router with queries that can only be hit if the user requesting is signed in
export const getItemDetailsRouter = createProtectedRouter()
  .query("getSession", {
    resolve({ ctx }) {
      return ctx.session;
    },
  })
  .query("getItemByItemNumber", {
    // input is an item number
    input: z.object({
      itemNumber: z.string().trim().min(0).max(20),
    }),
    resolve({ ctx, input }) {
      return clientPromise.then(async (client) => {
        const db = client.db("busserebatetraces");
        const collection = db.collection("sched_data");
        const item = await collection.findOne({
          part: input?.itemNumber,
        });
        return item as Item;
      });
    },
  });
