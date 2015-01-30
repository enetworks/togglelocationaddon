$(function(){

  var Modes = {
    toggle   : 'toggle',
    multi    : 'multi',
    toggleDir: 'toggleDir',
    multiDir : 'multiDir'
  }

  function saveSetting(){
    var
    setting       = [],
    errRow        = [],
    checkHostname = {},
    errHost       = [],
    regHostname   = /^([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])(\.([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]{0,61}[a-zA-Z0-9]))*$/;

    $('.settingLine').each(function(i){
      var
      $t           = $(this),
      fromHost     = $t.find('.fromHostname').val(),
      fromDir      = '',
      fromProtocol = $t.find('.fromProtocol').val() === 'https' ? 'https' : 'http',
      toHost       = $t.find('.toHostname').eq(0).val(),
      toDir        = '',
      toProtocol   = $t.find('.toProtocol').val() === 'https' ? 'https' : 'http',
      toggleMode   = Modes[$t.find('.toggleMode').val()] || 'toggle';

      if (toggleMode === 'toggleDir' || toggleMode === 'multiDir'){
        fromDir     = $t.find('.fromDirname').val();
        toDir       = $t.find('.toDirname').eq(0).val();
      }


      if (fromHost.match(regHostname) && toHost.match(regHostname)){
        var settingRow  = {
          fromSetting: {
            hostname: fromHost,
            options : {
              'protocol': fromProtocol,
              'dir': fromDir
            }
          },
          toSetting: [{
            hostname: toHost,
            options : {
              'protocol': toProtocol,
              'dir': toDir
            }
          }],
          options:{
            'toggleMode': toggleMode
          }
        };
        checkHostname[fromHost + '/' + fromDir] = checkHostname[fromHost + '/' + fromDir] > 0 ? checkHostname[fromHost + '/' + fromDir] + 1 : 1;
        if (toggleMode === 'multi' || toggleMode === 'multiDir'){
          $t.find('.toMore').each(function(){

            var
            $t       = $(this),
            protocol = $t.find('.toProtocol').val() === 'https' ? 'https' : 'http',
            hostname = $t.find('.toHostname').val(),
            dir      = '';

            if (toggleMode === 'multiDir'){
              dir = $t.find('.toDirname').val();
            }

            if (hostname.match(regHostname)){
              settingRow.toSetting.push({
                'hostname': hostname,
                'options':{
                  'protocol': protocol,
                  'dir': dir
                }
              });
            }
          });
        }else{
          checkHostname[toHost + '/' + toDir]  = checkHostname[toHost + '/' + toDir] > 0 ? checkHostname[toHost + '/' + toDir] + 1 : 1;
        }
        setting.push(settingRow);
      }else{
        errRow.push(i + 1);
      }
    });

    Object.keys(checkHostname).forEach(function(hostKey,i,array){
      if (checkHostname[hostKey] > 1){
        errHost.push(hostKey);
      }
    });

    if (errHost.length > 0){
      alert('Duplicate Setting: ' + errHost);
    }else{
      chrome.storage.sync.set({
        tlSetting: JSON.stringify(setting)
      },function(){
        if (errRow.length > 0){
          alert('Line:' + errRow + ' is not saved')
        }else{
          alert('Save Complete');
        }
      });
    }

    return false;
  }

  function outPutSetting(){
    chrome.storage.sync.get(
      {tlSetting:'[]'},
      function(settingData){
        var setting = JSON.parse(settingData.tlSetting);
        if (setting.length === 0){
          var
          rowTemplate = document.querySelector('#settingRowTemplate').cloneNode(true);
          document.getElementById('baseTable').appendChild(document.importNode(rowTemplate.content,true));
        }else{
          setting.forEach(function(rowSetting,i,array){
            var
            rowTemplate = document.querySelector('#settingRowTemplate').cloneNode(true),
            toPrimary   = rowSetting.toSetting.shift();

            rowTemplate.content.querySelector('.fromHostname').value = rowSetting.fromSetting.hostname;
            if (rowSetting.fromSetting.options.protocol === 'https'){
              rowTemplate.content.querySelector('.fromProtocol-https').setAttribute('selected',1);
            }

            rowTemplate.content.querySelector('.toHostname').value = toPrimary.hostname;
            if (toPrimary.options.protocol === 'https'){
              rowTemplate.content.querySelector('.toProtocol-https').setAttribute('selected',1);
            }

            if (rowSetting.options.toggleMode === 'toggleDir'){
              rowTemplate.content.querySelector('.settingLine').classList.add('modeDir');
              rowTemplate.content.querySelector('.toggleMode-toggleDir').setAttribute('selected',1);
              rowTemplate.content.querySelector('.fromDirname').value = rowSetting.fromSetting.options.dir;
              rowTemplate.content.querySelector('.toDirname').value = toPrimary.options.dir;
            }

            if(rowSetting.options.toggleMode === 'multi'){
              rowTemplate.content.querySelector('.toggleMode-multi').setAttribute('selected',1);
              rowTemplate.content.querySelector('.modeView').innerText = '->';
              if (rowSetting.toSetting.length === 0){
                var setNode = document.querySelector('#moreHostTemplate').cloneNode(true);
                rowTemplate.content.querySelector('.toHostCell').appendChild(document.importNode(setNode.content,true));
              }else{
                rowSetting.toSetting.forEach(function(hostSetting,i,array){
                  var setNode = document.querySelector('#moreHostTemplate').cloneNode(true);

                  setNode.content.querySelector('.toHostname').value = hostSetting.hostname;
                  if (hostSetting.options.protocol === 'https'){
                    setNode.content.querySelector('.toProtocol-https').setAttribute('selected',1);
                  }
                  rowTemplate.content.querySelector('.toHostCell').appendChild(document.importNode(setNode.content,true));
                });
              }
            }

            if(rowSetting.options.toggleMode === 'multiDir'){
              rowTemplate.content.querySelector('.settingLine').classList.add('modeDir');
              rowTemplate.content.querySelector('.toggleMode-multiDir').setAttribute('selected',1);
              rowTemplate.content.querySelector('.fromDirname').value = rowSetting.fromSetting.options.dir;
              rowTemplate.content.querySelector('.modeView').innerText = '->';
              rowTemplate.content.querySelector('.toDirname').value = toPrimary.options.dir;
              if (rowSetting.toSetting.length === 0){
                var setNode = document.querySelector('#moreHostTemplate').cloneNode(true);
                rowTemplate.content.querySelector('.toHostCell').appendChild(document.importNode(setNode.content,true));
              }else{
                rowSetting.toSetting.forEach(function(hostSetting,i,array){
                  var setNode = document.querySelector('#moreHostTemplate').cloneNode(true);

                  setNode.content.querySelector('.toHostname').value = hostSetting.hostname;
                  setNode.content.querySelector('.toDirname').value = hostSetting.options.dir;
                  if (hostSetting.options.protocol === 'https'){
                    setNode.content.querySelector('.toProtocol-https').setAttribute('selected',1);
                  }
                  rowTemplate.content.querySelector('.toHostCell').appendChild(document.importNode(setNode.content,true));
                });
              }
            }

            document.getElementById('baseTable').appendChild(document.importNode(rowTemplate.content,true));
          });
          $('.settingLine').each(function(){
            hideFirstMultiDelButton($(this));
          });
          rowNum();
        }
      }
    );
  }

  function hideFirstMultiDelButton($tr){
    $tr.find('.toMore').eq(0).find('.multDelhost').remove();
  }

  function rowNum(){
    $('.rowNum').each(function(i){
      $(this).text(i + 1);
    });
  }

  function useMultiMode($tr){
    var
    setNode = document.querySelector('#moreHostTemplate').cloneNode(true);

    $tr.find('.modeView').text('->');
    $tr.find('.toHostCell').append(document.importNode(setNode.content,true));
  }

  function exitMultiMode($tr){
    var
    setNode = document.querySelector('#moreHostTemplate').cloneNode(true);

    $tr.find('.modeView').text('<->');
    $tr.find('.toMore').remove();
  }

  function changeMode(){
    var 
    $t  = $(this),
    val = $t.val(),
    $tr = $t.parent().parent();
    if ($t.val() === 'multi' || $t.val() === 'multiDir'){
      useMultiMode($tr);
      hideFirstMultiDelButton($tr)
    }else{
      exitMultiMode($tr);
    }

    if ($t.val() === 'toggleDir' || $t.val() === 'multiDir'){
      $tr.addClass('modeDir');
    }
  }

  function addMultiHost(){
    var
    $div    = $(this).parent(),
    $tr     = $div.parent().parent(),
    setNode = document.querySelector('#moreHostTemplate').cloneNode(true);

    $div.after(document.importNode(setNode.content,true));

    hideFirstMultiDelButton($tr);

    return false;
  }

  function delMultiHost(){
    var $tr = $(this).parent().parent().parent();
    $(this).parent().remove();

    hideFirstMultiDelButton($tr);
    rowNum();

    return false;
  }

  function addSettingRow(){
    var
    rowTemplate = document.querySelector('#settingRowTemplate');
    document.getElementById('baseTable').appendChild(document.importNode(rowTemplate.content,true));
    rowNum();
    return false;
  }

  $('#settingForm').submit(saveSetting);
  $('#addRule').click(addSettingRow);
  $('#baseTable')
    .on('change','.toggleMode',changeMode)
    .on('click','.multAddhost',addMultiHost)
    .on('click','.multDelhost',delMultiHost)
    .on('click','.deleteRule',function(){
      $(this).parent().parent().remove();
    });

  outPutSetting();

});