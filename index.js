import { createApp, createRouter, defineEventHandler, toNodeListener } from "h3";
import { listen } from "listhen";
// Create an app instance
export const app = createApp();

// Create a new router and register it in app
const router = createRouter();
app.use(router);

// Add a new route that matches GET requests to / path
router.get(
  "/",
  defineEventHandler(async (event) => {
    const res = await fetch(
      `https://wcproducts.com/products/wcp-0897?variant=43537340694740`
    );
    const html = await res.text();
    const match = (
      /global_quantity\[43537340694740\] = 'continue' \+ ([1-9]+);/gm
    ).exec(html);

    return { count: parseInt(match[1]) };
  })
);
await listen(toNodeListener(app));