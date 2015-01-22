// ホスト名の変更先を2つセットで2行づつ記述する
// 理論上は何セットでも可能です。
var toggleSet = {
  // '69.kakunin.biz': 'www.resona-gr.co.jp',
  // 'www.resona-gr.co.jp': '69.kakunin.biz'
};

chrome.storage.sync.get(
  {tlSetting:[]},
  function(settingData){
    var setting = JSON.parse(settingData.tlSetting);
    setting.forEach(function(row,i,array){
      var
      fromHost = row.fromSetting.hostname,
      toHost = row.toSetting[0].hostname;

      toggleSet[fromHost] = toHost;
      toggleSet[toHost] = fromHost;
    });
  }
);


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
