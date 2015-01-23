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
      fromProtocol = row.fromSetting.options.protocol;

      if (row.options.toggleMode !== 'multi'){
        var
        toHost = row.toSetting[0].hostname,
        toProtocol = row.toSetting[0].options.protocol;

        toggleSet[fromHost] = [toProtocol + '://' + toHost];
        toggleSet[toHost] = [fromProtocol + '://' + fromHost];
      }else{
        toggleSet[fromHost] = [];
        row.toSetting.forEach(function(host,i,array){
          toggleSet[fromHost].push(host.options.protocol + '://' + host.hostname);
        });
      }
    });
  }
);


chrome.tabs.getSelected(null, function(tab) {
  var
  url    = new URL(tab.url),
  $mes   = document.getElementById('toggleStgMes'),
  goHost = toggleSet[url.hostname],
  res    = '';
  if (goHost.length){
    res = '<ul>'
    goHost.forEach(function(i){
      var href = i + url.pathname + url.search;
      res = res + '<li><a href="' + href + '" target="_blank">' + i + '</a></li>'
    });
    res = res + '</ul>'
    $mes.innerHTML = res;
  }else{
    return false;
  }
});
