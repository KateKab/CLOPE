let { deltaAdd } = require("./countDeltaAdd");
let { deltaSub } = require("./countDeltaSub");
let { getByValue } = require("./getByValue");
let Cluster = require("./Cluster");
let { deleteEmpty } = require("./deleteEmpty");
let { fsWriteResult } = require("./fsWriteResult");

module.exports.iterateClusters = function (
  resultTable,
  clusters,
  r,
  writePath
) {
  let moved = false; //флаг перемещения транзакции
  let i = 0; //счетчик перемещенных кластеров

  fsWriteResult(writePath, clusters, null, "инициализации");

  //выполняем следующие действия, пока продолжаются перемещения транзакций
  do {
    moved = false;
    //идем по Map вида транзакция-кластер с результатами этапа инициализации
    for (const item of resultTable) {
      let tableTran = item[0]; //транзакция
      let tableCluster = item[1]; //кластер
      let dAddMap = new Map(); //мап с приростами профита от добавления в кластер вида кластер-прирост
      let dSub = 0; //прирост профита от удаления транзакции
      let dAddMax = 0;
      let tableTranIndex = 0; //индекс транзакции из resultTable в clusters
      let clusterTransactions = clusters[tableCluster].transactions;
      let dAddMaxIndex = 0;

      clusters.push(new Cluster()); //на каждой итерации добавляем пустой кластер

      clusters.forEach((cluster) => {
        let i = clusters.indexOf(cluster);

        //считаем прирост профита от добавления транзакции во все остальные кластеры, кроме того, в котором она содержится
        if (i != tableCluster) {
          dAddMap.set(i, deltaAdd(tableTran, clusters[i], r));
        }
      });

      dAddMax = Math.max.apply(null, Array.from(dAddMap.values())); //находим максимальный прирост профита от добавления
      dAddMaxIndex = getByValue(dAddMap, dAddMax); //находим индекс кластера с максимальным приростом профита
      dSub = deltaSub(tableTran, clusters[tableCluster], r); //находим прирост профита от удаления транзакции

      //т.к всегда есть пустой кластер, профит от добавления транзакции всегда положителен
      //если при этом есть и профит от удаления - перемещаем транзакцию
      //если профита от удаления нет, смотрим, больше ли прирост профита от добавления, чем убыль от удаления
      if (dSub > 0 || (dSub <= 0 && dSub + dAddMax > 0)) {
        i++;
        clusterTransactions.forEach((transaction) => {
          if (transaction.toString() === tableTran.toString()) {
            tableTranIndex = clusterTransactions.indexOf(transaction);
          }
        });

        clusterTransactions.splice(tableTranIndex, 1); //удаляем транзакцию из кластера
        clusters[dAddMaxIndex].transactions.push(tableTran); //добавляем транзакцию в кластер с максимальным приростом профита
        resultTable.set(tableTran, dAddMaxIndex); //обновляем данные в таблице с результатом
        moved = true; //произошло перемещение транзакции
      }
    }
    clusters = deleteEmpty(clusters); //удаляем пустые кластеры
  } while (moved === true);

  fsWriteResult(writePath, clusters, resultTable, "итерации", i);
 
  return resultTable;
};
