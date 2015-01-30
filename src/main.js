// ホスト名の変更先を2つセットで2行づつ記述する
// 理論上は何セットでも可能です。
var 
toggleSet    = {},
toggleSetDir = [],
$d = document.getElementById('Debug');

chrome.storage.sync.get(
  {tlSetting:[]},
  function(settingData){
    var setting = JSON.parse(settingData.tlSetting);
    setting.forEach(function(row,i,array){
      var
      fromHost = row.fromSetting.hostname,
      fromProtocol = row.fromSetting.options.protocol;

      if (row.options.toggleMode === 'toggle'){
        var
        toHost     = row.toSetting[0].hostname,
        toProtocol = row.toSetting[0].options.protocol;

        toggleSet[fromHost] = [toProtocol + '://' + toHost];
        toggleSet[toHost] = [fromProtocol + '://' + fromHost];
      }else if(row.options.toggleMode === 'toggleDir'){
        var
        fromDir    = row.fromSetting.options.dir,
        toHost     = row.toSetting[0].hostname,
        toProtocol = row.toSetting[0].options.protocol,
        toDir      = row.toSetting[0].options.dir;

        toggleSetDir.push({fromPath: fromHost + '/' + fromDir,toPath:[toProtocol + '://' + toHost + '/' + toDir]});
        toggleSetDir.push({fromPath: toHost + '/' + toDir,toPath:[fromProtocol + '://' + fromHost + '/' + fromDir]});
      }else if(row.options.toggleMode === 'multiDir'){
        var
        fromDir    = row.fromSetting.options.dir,
        toHost     = row.toSetting[0].hostname,
        toProtocol = row.toSetting[0].options.protocol,
        toDir      = row.toSetting[0].options.dir,
        multiSet   = {
          fromPath: fromHost + '/' + fromDir,
          toPath: []
        };


        row.toSetting.forEach(function(host,i,array){
          multiSet['toPath'].push(host.options.protocol + '://' + host.hostname + '/' + host.options.dir);
        });

        toggleSetDir.push(multiSet);

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
      checkUrl = url.hostname + url.pathname,
      $mes   = document.getElementById('toggleStgMes'),
      goHost = toggleSet[url.hostname],
      res    = '';

    // $d.innerHTML += JSON.stringify(toggleSet);
    // $d.innerHTML += JSON.stringify(toggleSetDir);

    // $d.innerHTML += checkUrl + '<br>';

      toggleSetDir.forEach(function(set,i,array){
    // $d.innerHTML += set.fromPath + '<br>';
        var m = new RegExp('^' + set.fromPath);
        if (m.test(checkUrl)){
    // $d.innerHTML += 'Hit<br>';
          res = '<ul>';
          set.toPath.forEach(function(toUrl,i,array){
    // $d.innerHTML += 'toUrl<br>';
            var href = checkUrl.replace(m,toUrl) + url.search;
            res += '<li><a href="' + href + '" target="_blank">' + toUrl + '</a></li>'
          });
          res += '</ul>';
          $mes.innerHTML = res;
          return;
        }
      });

      if (goHost.length){
        res = '<ul>';
        goHost.forEach(function(i){
          var href = i + url.pathname + url.search;
          res += '<li><a href="' + href + '" target="_blank">' + i + '</a></li>';
        });
        res += '</ul>'
        $mes.innerHTML = res;
        return;
      // }else{
      //   return false;
      }
    });
