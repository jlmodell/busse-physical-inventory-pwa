// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { exampleRouter } from "./example";
import { protectedExampleRouter } from "./protected-example-router";
import { getItemDetailsRouter } from "./protected-sched-data";
import { sheetRouter } from "./protected-sheet-data";
import { rowRouter } from "./protected-row-data";
import { lotRouter } from "./protected-lot-data";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("example.", exampleRouter)
  .merge("question.", protectedExampleRouter)
  .merge("schedData.", getItemDetailsRouter)
  .merge("sheet.", sheetRouter)
  .merge("row.", rowRouter)
  .merge("lot.", lotRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
