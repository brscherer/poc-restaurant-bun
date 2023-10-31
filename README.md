# Challenge
Build Restaurant Queue System Capable of telling how long each dish will take.

### Proposal
A restaurant queue needs to have an input (order) and output (number of the order in the queue)
Each dish have a time that takes to be ready to serve
In order to tell the user how much time he will need to wait, we need to calculate the total time it take for the order (sum every dish in the order) + the total waiting time from the previous order (that will contain total waiting time of its previous order too)

### Patterns Candidates
Builder - We can have an OrderBuilder that will return the time each item of the order takes to be prepared and add it to the receipt
State - We will need a State to save the record of each Order with its time, so Order can rely on State to tell the number of the next order

# poc-restaurant-bun

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.0.1. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
