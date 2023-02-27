module.exports.deltaAdd = function (t, C, r) {
  let newS = C.S() + t.length; //к исходной площади кластера прибавляем количество элементов транзакции
  let newW = C.W();

  t.forEach((item) => {
    // если такого символа нет в исходном кластере,
    if (C.Occ(item) === 0) {
      newW += 1; //то при его добавлении ширина кластера увеличится
    }
  });

  return (
    (newS * (C.transactions.length + 1)) / Math.pow(newW, r) -
    (C.S() * C.transactions.length) / Math.pow(C.W(), r)
  );
};
