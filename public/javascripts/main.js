(function() {

  var HEADER_HEIGHT = 50;

  // tools
  var $ = document.querySelector.bind(document);
  var all$ = document.querySelectorAll.bind(document);
  var id$ = document.getElementById.bind(document);
  var class$ = document.getElementsByClassName.bind(document);

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

  var onLoad = function() {
    $divWrapper = id$("wrapper")
    $divCode = id$("code");
    $divPreview = id$("preview");
    $divSetting = id$("setting");
    $textareaCode = id$("textarea_code");
    $divPreviewContent = id$("preview_content");
    browserWidth = window.innerWidth;
    browserHeight = window.innerHeight;
    adjustLayout();
    document.body.onresize = onBrowserResize;
    $textareaCode.onkeyup = onSourceChange;
    $textareaCode.onscroll = onSourceScroll;
    $divPreviewContent.onscroll = onPreviewScorll;
  };

  window.onload = onLoad;

})();