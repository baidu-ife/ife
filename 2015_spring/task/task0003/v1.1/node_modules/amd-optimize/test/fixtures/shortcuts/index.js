(function () {
  "use strict";

  define(["module/foo"], function (foo) {
    return "hello:" + foo;
  });
}());
