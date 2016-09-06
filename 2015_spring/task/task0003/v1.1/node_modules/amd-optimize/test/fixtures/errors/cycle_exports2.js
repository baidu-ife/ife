define(['cycle_exports1', 'exports'], function(cycle1, exports) {
  exports.foo = function () {
    return cycle1.bar();
  };
  exports.fuu = "TEST";
});
