//функция для удаления пустых кластеров
module.exports.deleteEmpty = function (clusters) {
  return clusters.filter((cluster) => cluster.transactions.length != 0);
};
