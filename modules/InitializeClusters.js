const Cluster = require("./Cluster");
let { profit } = require("./countProfit");
let { deleteEmpty } = require("./deleteEmpty");

module.exports.initializeClusters = function (D, r) {
  //функция реализации фазы инициализации. 1-я итерация распределения.
  let clusters = []; //массив кластеров, по которым будет происходить распредление транзакций
  let resultTable = new Map(); //результирующая таблица вида транзакция-кластер
  let profits = [];
  let i = 0;

  //для каждой транзакции в исходной базе
  D.forEach((transaction) => {
    clusters.push(new Cluster()); //добавляем пустой кластер

    //считаем и запоминаем профит от добавления транзакции в каждый кластер
    clusters.forEach((cluster) => {
      cluster.transactions.push(transaction);
      profits.push(profit(clusters, r));
      cluster.transactions.pop(transaction);
    });

    //помещаем транзакцию в кластер с максимальным профитом
    clusters[profits.indexOf(Math.max.apply(null, profits))].transactions.push(
      transaction
    );

    //добавляем запись транзакция-кластер в результирующую таблицу
    resultTable.set(
      transaction,
      profits.indexOf(Math.max.apply(null, profits))
    );
    i++;
    profits = [];
    clusters = deleteEmpty(clusters); //удаляем пустые кластеры
  });

  return { resultTable, clusters };
};
