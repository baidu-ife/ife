(function () {
  
  require.config({
    paths : {
      foo : "empty:"
    }
  });

  require([ "foo" ], function(foo) {});

})();