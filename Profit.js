// D - база транзакций {(...), (...), (...)}
// C - кластер {...}
// W - число уникальных объектов кластера(ширина кластера)
// Occ - количество вхождений объекта в кластер
// S - сумма Occ для всех объектов кластера(площадь кластера)
// Н - S/W
// G - градиент H/W
// N - C.transactions.length

module.exports.profit = function (clusters, r) {
  let numerator = 0;
  let denominator = 0;
  clusters.forEach((C) => {
    if (C.transactions.length != 0) {
      numerator += (C.S() / Math.pow(C.W(), r)) * C.transactions.length;
      // console.log(C.transactions.length);
      denominator += C.transactions.length;
    }
  });
  return numerator / denominator;
  // console.log(numerator / denominator);
};

// profit(clusters, 2);
