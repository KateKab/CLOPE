const { initializeClusters } = require("./modules/InitializeClusters");
const { iterateClusters } = require("./modules/IterateClusters");
const fs = require("fs");

const r = 2;
const readPath = "./Data/test.json";
const writePath = "./Data/CLOPEresult.json";

let D = JSON.parse(fs.readFileSync(readPath, "utf8"));

let result = initializeClusters(D, r);

iterateClusters(result.resultTable, result.clusters, r, writePath);
