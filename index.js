import { createApp, createRouter, defineEventHandler, toNodeListener,appendResponseHeader } from "h3";
import { listen } from "listhen";
// Create an app instance
export const app = createApp();

// Create a new router and register it in app
const router = createRouter();
app.use(router);

// Add a new route that matches GET requests to / path
router.get(
  "/metrics",
  defineEventHandler(async (event) => {
   appendResponseHeader(event, "content-type", "text/plain");

    const res = await fetch(
      `https://wcproducts.com/products/wcp-0897?variant=43537340694740`
    );
    const html = await res.text();
    const match = (
      /global_quantity\[43537340694740\] = 'continue' \+ ([1-9]+);/gm
    ).exec(html);

    return `bearing_block_count ${match[1]}`;
  })
);
await listen(toNodeListener(app));