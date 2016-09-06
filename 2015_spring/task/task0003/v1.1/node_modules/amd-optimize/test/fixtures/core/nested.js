(function () {
  define(["foo"], function (test) {
    require(["bar"], function () {});
  });
})();