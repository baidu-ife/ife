(function () {
  define(["bar", "require", "exports"], function (test, require, exports) {
  	require("foo")
    console.log(test);
  });
})();