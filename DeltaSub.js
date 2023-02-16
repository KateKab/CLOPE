module.exports.deltaSub = function (t, C, r) {
  let newS = C.S - t.itemCount;
  let newW = C.W;
  for (let i = 0; i <= t.itemCount; i++) {
    if (C.Occ(t.items[i]) === 0) {
      newW -= 1;
    }
  }
  let result =
    (newS * (C.N + 1)) / Math.pow(newW, r) - (C.S * C.N) / Math.pow(C.W, r);
  return result;
};
