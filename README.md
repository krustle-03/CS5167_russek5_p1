# Receipt Logger

This project was made for CS5167 User Interface. It is built using Vite for tooling and Svelte as a framework. It uses JavaScript instead of typescript.

## Overview

The purpose of this application is to allow users to log receipts and other expenses to track spending.

This project is available on [GitHub]( https://github.com/krustle-03/CS5167_russek5_p1.)  
A live demo is published on [GitHub Pages](https://krustle-03.github.io/CS5167_russek5_p1/.)

Built with Svelte + Vite, this lightweight receipt logger lets you record receipts locally in the browser. To run it locally:

1. npm install
2. npm run dev

Open <http://localhost:5173> (or the port shown by Vite) to view the app.
    
- Project is configured to publish under `/CS5167_russek5_p1/` (see [vite.config.js](vite.config.js)).
- GitHub Pages workflow present in .github/workflows for automatic deployment.

If you want to inspect or update the deployed site, the repository's main branch is configured for GitHub Pages deployment.

## Development & Code Structure

Quick map of important files
- App entry / routing: [src/app.svelte](src/app.svelte)
- Header / global controls: [src/lib/Header.svelte](src/lib/Header.svelte)
- Receipt entry form: [src/lib/Receipt.svelte](src/lib/Receipt.svelte)
- Expense list / tracking view: [src/lib/tracking.svelte](src/lib/tracking.svelte)
- Single expense entry form: [src/lib/SingleCost.svelte](src/lib/SingleCost.svelte)
- Global stores: [src/lib/stores.js](src/lib/stores.js)
- Build / dev config: [vite.config.js](vite.config.js) and [package.json](package.json)

Example of how receipt data would be formatted

```json
{
  "expenseType": "receipt",
  "storeName": "Example Store",
  "taxRate": 8.5,
  "items": [
    { "name": "Item A", "cost": 3.5, "quantity": 2, "category": "Food" },
    { "name": "Item B", "cost": 6, "quantity": 1, "category": "Personal" }
  ],
  "subtotal": 7.0,
  "total": 7.595,
  "timestamp": 1690000000000
}
```

## Current Issues

- Home Icon in the top bar doesn't show. Alt text shows instead.
- I accidentally left in the debug info.
- Submitting a receipt shows $0.00 as the cost, because the text relies on the total cost which is reset when the submit button is pressed.
- When an item is submitted without a name, it adds to the total but does not show on the receipt. These items aren't discovered when editing an expense.
- Really long store names can break the bounds of the receipt when looking at all expenses.

## Future work

I have a number of future plans for this project.

- Expand the project to track a number of different expense types.
- Track money spent in a given timeframe
- Track income, generate a "recommended disposable income"
- Log subscriptions and show when they will charge again (monthly vs yearly)
- Host this project from a home server, not exposed to the internet

## FAQ

**What's the purpose of just logging receipts?**

It's a step toward something I want to build in the future. In the scope of the project, this is what I was able to  accomplish.

**Wouldn't it just be easier to do this in excel?**

Yes.


