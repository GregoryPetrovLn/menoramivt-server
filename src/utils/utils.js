const createQueryStr = (query) =>
  Object.keys(query)
    .map((key) => key + '=' + query[key])
    .join('&');

module.exports = { createQueryStr };
