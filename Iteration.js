let { deltaAdd } = require("./DeltaAdd");
let { deltaSub } = require("./DeltaSub");
let { getByValue } = require("./GetByValue");
let { clusters} = require("./Initialization");


module.exports.iteration = function (resultTable) {
  let moved = false;
  do {
    let moved = false;
    for (let transaction of resultTable) {
      let dAdd = new Map();
      let dAddMax = 0;
      for (let i = 0; i < clusters.length; i++) {
        if (i !== transaction[1]) {
          dAdd.set(i, deltaAdd(transaction[0], clusters[i], 2));
          // dAdd.push(deltaAdd(transaction[0], clusters[i], 2));
        }
      }

      dAddMax = getByValue(dAdd, Math.max.apply(null, dAdd.values()));

      dSub = deltaSub(transaction[0], clusters[transaction[1]], 2);

      if ((dAddMax > 0 && dSub > 0) || dAdd + dSub > 0) {
        //move transaction to clusters[i] Add
        clusters[transaction[1]].transactions.splice(
          transactions.indexOf(transaction[0]),
          1
        );
        clusters[dAddMax].push(transaction[0]);
        moved = true;
        // console.log("aaaaa changes");
      }
      // else console.log("no changes");
    }
  } while (moved === true);
  // console.log(clusters);
};
