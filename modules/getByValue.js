//функция для получения ключа Map по его значению
module.exports.getByValue = function (map, searchValue) {
  for (let [key, value] of map.entries()) {
    if (value === searchValue) return key;
  }
};
