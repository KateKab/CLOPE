module.exports.deltaSub = function (t, C, r) {
  let newS = C.S() - t.length; //из исходной площади кластера вычитаем количество элементов транзакции
  let newW = C.W();

  for (let i = 0; i < t.length; i++) {
    // если символ транзации встречается в кластере только один раз
    if (C.Occ(t[i]) === 1) {
      newW -= 1; //при его удалении ширина кластера уменьшится
    }
  }

  return (
    (newS * (C.transactions.length - 1)) / Math.pow(newW, r) -
    (C.S() * C.transactions.length) / Math.pow(C.W(), r)
  );
};
