// ホスト名の変更先を2つセットで2行づつ記述する
// 理論上は何セットでも可能です。
var toggleSet = {
  '69.kakunin.biz': 'www.resona-gr.co.jp',
  'www.resona-gr.co.jp': '69.kakunin.biz'
};

chrome.tabs.getSelected(null, function(tab) {
      var url = new URL(tab.url),
      $mes    = document.getElementById('toggleStgMes'),
      goHost  = toggleSet[url.hostname];
console.log(goHost);
  if (goHost){
    var href = url.protocol + '//' + goHost + url.pathname;
    $mes.innerHTML = 'go: <a href="' + href + '" target="_blank">' + goHost + '</a>'
  }else{
    return false;
  }
});
