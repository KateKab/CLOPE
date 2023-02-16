let Cluster = require("./Cluster");

module.exports.deltaAdd = function (t, C, r) {
  allItems = t.join("");
  let newS = C.S() + allItems.length;
  let newW = C.W();
  t.forEach((item) => {
    if (C.Occ(item) === 0) { // если такого символа нет в исходном кластере,
      newW += 1;              //то при его добавлении ширина кластера увеличится
    }
  });

  let result =
    ((newS * (C.transactions.length + 1)) / Math.pow(newW, r)) - ((C.S() * C.transactions.length) / Math.pow(C.W(), r));
  return result;
};
