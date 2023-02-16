let Cluster = require("./Cluster");
let { profit } = require("./Profit");

let resultTable = new Map();
let clusters = [];

module.exports.initialization = function (D) {
  let profits = [];

  D.forEach((transaction) => {
    clusters.push(new Cluster());
    clusters.forEach((cluster) => {
      cluster.transactions.push(transaction);

      profits.push(profit(clusters, 2));
      cluster.transactions.pop(transaction);
    });
    clusters[profits.indexOf(Math.max.apply(null, profits))].transactions.push(
      transaction
    );
    resultTable.set(
      transaction,
      profits.indexOf(Math.max.apply(null, profits))
    );
    profits = [];
    clusters.forEach((cluster) => {
      if (cluster.transactions.length === 0) {
        clusters.pop();
      }
    });
  });
  console.log(resultTable);
  return resultTable;
};

exports.clusters = clusters;
exports.resultTable = resultTable;
