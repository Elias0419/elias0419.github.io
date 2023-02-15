
window.onload = function() {
  var myTextArea = document.getElementById("my-textarea");
  var myCodeMirror = CodeMirror.fromTextArea(myTextArea, {
    lineNumbers: true,
    mode: "javascript",
    theme: "dracula"
  });
};
