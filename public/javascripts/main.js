(function() {


  // tools

  var $ = document.querySelector.bind(document);
  var all$ = document.querySelectorAll.bind(document);
  var id$ = document.getElementById.bind(document);
  var class$ = document.getElementsByClassName.bind(document);

  /*
   var HEADER_HEIGHT = 50;

  var browserWidth, browserHeight;
  var codeAreaProportion = 0.5, previewAreaProportion = 0.5, settingAreaProportion = 0;
  var codeAreaWidth, previewAreaWidth, settingAreaWidth, contentHeight;
  var $divWrapper, $divCode, $divPreview, $divSetting, $textareaCode, $divPreviewWrapper, $divPreviewContent;

  var adjustLayout = function() {
    codeAreaWidth = browserWidth * codeAreaProportion | 0;
    previewAreaWidth = browserWidth * previewAreaProportion| 0;
    settingAreaWidth = browserWidth * settingAreaProportion | 0;
    if (codeAreaWidth + previewAreaWidth + settingAreaWidth < browserWidth) {
      previewAreaWidth = browserWidth - codeAreaWidth - settingAreaWidth;
    }
    $divCode.style.width = codeAreaWidth + "px";
    $divPreview.style.left = codeAreaWidth + "px";
    $divPreview.style.width = previewAreaWidth + "px";
    $divSetting.style.left = (codeAreaWidth + previewAreaWidth) + "px";
    $divSetting.style.width = settingAreaWidth + "px";
    contentHeight = browserHeight - HEADER_HEIGHT;
    $textareaCode.style.height = contentHeight + "px";
    $divPreviewContent.style.height = contentHeight + "px";
  };

  var renderContent = function() {
    var source = $textareaCode.value;
    $divPreviewContent.innerHTML = marked(source);
  };

  var justScroll = false;

  var onSourceChange = function() {
    renderContent();
    justScroll = false;
    onSourceScroll();
  };

  var onPreviewScorll = function() {
    if (justScroll) {
      justScroll = false;
      return;
    }
    justScroll = true;
    justScroll = true;
    var scrollRatio = $divPreviewContent.scrollTop / $divPreviewContent.scrollHeight;
    $textareaCode.scrollTop = scrollRatio * $textareaCode.scrollHeight | 0;
  };

  var onSourceScroll = function () {
    if (justScroll) {
      justScroll = false;
      return;
    }
    justScroll = true;
    var scrollRatio = $textareaCode.scrollTop / $textareaCode.scrollHeight;
    $divPreviewContent.scrollTop = scrollRatio * $divPreviewContent.scrollHeight | 0;
  };

  var onBrowserResize = function() {
    browserWidth = window.innerWidth;
    browserHeight = window.innerHeight;
    adjustLayout();
  };
  */

  var GITHUB = 0, CLIPBOARD = 1, LOCAL_FILE = 2;
  var SOURCES = ["github", "clipboard", "file"];

  var inputSource;

  var markdown_source;

  var scrollTo = function(element) {
    document.body.scrollTop = id$(element).offsetTop - 30;
  };

  var selectSource = function(source) {

    for (var i = 0; i < 3; i++) {
      if (i != source)
        id$("select-" + SOURCES[i]).classList.remove("selected");
        id$(SOURCES[i] + "-wrapper").style.display = "none";
    }

    id$("select-" + SOURCES[source]).classList.add("selected");
    id$(SOURCES[source] + "-wrapper").style.display = "block";

    scrollTo("source");
  };

  var renderContent = function() {
    id$("preview-content").innerHTML = marked(markdown_source);
    id$("preview").style.display = "block";
    id$("input-wrapper").style.display = "none";
    id$("new-input").style.display = "block";
    scrollTo("preview");
  };

  var onLoad = function() {
    console.log("document loaded.");

    for (var i = 0; i < 3; i++) {
      id$("select-" + SOURCES[i]).onclick = (
        function() {
          var type = i;
          return (function () {
            selectSource(type);
          });
        }
      )();
    }

    id$("clipboard-button").onclick = function() {
      markdown_source = id$("clipboard").value;
      renderContent();
    }

    id$("new-input").onclick = function() {
      id$("input-wrapper").style.display = "block";
      id$("new-input").style.display = "none";
      scrollTo("source");
    }
  };

  window.onload = onLoad;

})();