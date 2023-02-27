const fs = require("fs");

module.exports.fsWriteResult = function (path, clusters, resultTable, stage, i) {
  let tranQuantity = new Map();
  let changeInfo = "";
  let table = "";

  if (resultTable != undefined) {
    table = `Результат кластеризации в виде "транзакция:кластер"
    ${JSON.stringify(Object.fromEntries(resultTable), null, "        ")}
    `;
  }

  clusters.forEach((cluster) => {
    tranQuantity.set(clusters.indexOf(cluster), cluster.transactions.length);
  });

  if (stage === "итерации") {
    changeInfo = `перемещено транзакций: ${i}`;
  }

  let resultString = `На этапе ${stage} получено кластеров: ${
    clusters.length
  }  ${changeInfo}
  "Кластер":Количество транзакций
  ${JSON.stringify(Object.fromEntries(tranQuantity), null, "        ")}
  ${table}
  `;

  if (stage === "итерации") {
    fs.appendFileSync(path, resultString);
  } else {
    fs.writeFileSync(path, resultString);
  }
};
