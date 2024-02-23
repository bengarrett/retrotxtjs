window.onload = function () {
  var features = (function () {
    // Check ES2015 basic support
    // Chrome 45, Firefox 22, Safari 10
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
    try {
      new Function("(a = 0) => a");
    } catch (err) {
      return false;
    }
    // Check Element.append() support
    // Chrome 55, Firefox 49, Safari 10
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/append
    try {
      var div = document.createElement("div");
      div.append("some text");
    } catch (err) {
      return false;
    }
    return true;
  })();

  if (!features) return;
  // Do an element id check here to avoid unnecessary fetching and loading of the main JS file.
  var pre = document.getElementById("retrotxt-canvas");
  if (pre == null) return;

  var s = document.createElement("script");
  s.src = "/js/retrotxt.js";
  s.type = "module";
  document.body.appendChild(s);
};
