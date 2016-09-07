(function () {
  define("test", ["foo"], function (foo) {
    console.log(foo);
  });

  define(["bar", "test"], function (bar) {
    console.log(bar);
  });
})();