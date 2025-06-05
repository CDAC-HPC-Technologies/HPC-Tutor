var Editor = function () {
  var UPDATE_EDITOR_TEXT = "update-editor-text-event";
  var editor;
  var element;
  var iframe;
  this.init = function (_element, _id, settings, loadDefaultText) {
    if (loadDefaultText === undefined)
      loadDefaultText = true;

    iframe = $("iframe#23000")[0];
    if (iframe === undefined) {
      console.error("[Katacoda] Unsupported Layout for VS Code/Theia. Requires iFrame with Dashboard Tab configured for port 23000.");
    } else {
      hook_up_events();
    }
  }

  var openFile = function (_, path) {
    var iframehref = iframe.getAttribute("src");
    iframe.contentWindow.postMessage({
      type: "open",
      file: path,
      creator: "katacoda"
    }, iframehref);
  }


  var updateEditor = function (e) {
    if (e.detail.target) {
      var iframehref = iframe.getAttribute("src");
      iframe.contentWindow.postMessage({
        type: "copyToEditor",
        file: e.detail.filename,
        contents: e.detail.text,
        marker: e.detail.marker,
        creator: "katacoda"
      }, iframehref);
    }
  }

  var switchTabsToIDE = function () {
    $("#itab-23000").click();
  }

  var hook_up_events = function () {
    document.addEventListener(UPDATE_EDITOR_TEXT, function (e) {
      switchTabsToIDE();
      updateEditor(e);
    });

    $("code.open").click(function (e) {
      e.preventDefault();

      switchTabsToIDE();
      var path = $(this).text();
      openFile(path.replace('.', '-'), path, "./" + path);

      return false;
    });
  }
}

document.addEventListener("terminal-ready-event", function () {
  var editor = new Editor();
  editor.init();
});