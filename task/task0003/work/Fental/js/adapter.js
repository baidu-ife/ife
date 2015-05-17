/**
 * Created by Fental on 15/5/6.
 */
(function() {
    var version = isIE();
    //alert(version);
    if (version !== -1 && version < 9) {
        document.createElement('header');
        document.createElement('main');
        document.createElement('article');
        document.createElement('footer');
    }
})();