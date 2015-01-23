$(function(){

  function saveSetting(){
    var
    setting = [],
    errRow = [];
    $('.settingLine').each(function(i){
      var
      $t           = $(this),
      fromHost     = $t.find('.fromHostname').val(),
      fromProtocol = $t.find('.fromProtocol').val() === 'https' ? 'https' : 'http',
      toHost       = $t.find('.toHostname').val(),
      toProtocol   = $t.find('.toProtocol').val() === 'https' ? 'https' : 'http',
      toggleMode   = $t.find('.toggleMode').val() === 'multi' ? 'multi' : 'toggle',
      regHostname  = /^([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])(\.([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]{0,61}[a-zA-Z0-9]))*$/;

      if (fromHost.match(regHostname) && toHost.match(regHostname)){
        var settingRow  = {
          fromSetting: {
            hostname: fromHost,
            options : {
              'protocol': fromProtocol,
            }
          },
          toSetting: [{
            hostname: toHost,
            options : {
              'protocol': toProtocol,
            }
          }],
          options:{
            'toggleMode': toggleMode
          }
        };
        if (toggleMode === 'multi'){
          $t.find('.toMore').each(function(){
            var
            $t       = $(this),
            protocol = $t.find('.toProtocol').val() === 'https' ? 'https' : 'http',
            hostname = $t.find('.toHostname').val();
            settingRow.toSetting.push({
              'hostname': hostname,
              'options':{
                'protocol': protocol
              }
            });
          });
        }
      }else{
        errRow.push(i + 1);
      }
      setting.push(settingRow);
    });

    chrome.storage.sync.set({
      tlSetting: JSON.stringify(setting)
    },function(){
      if (errRow.length > 0){
        alert('Line:' + errRow + ' is not saved')
      }else{
        alert('Save Complete');
      }
      return false;
    });
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
            toPrimary = rowSetting.toSetting.shift();

            rowTemplate.content.querySelector('.fromHostname').value = rowSetting.fromSetting.hostname;
            if (rowSetting.fromSetting.options.protocol === 'https'){
              rowTemplate.content.querySelector('.fromProtocol-https').setAttribute('selected',1);
            }

            rowTemplate.content.querySelector('.toHostname').value = toPrimary.hostname;
            if (toPrimary.options.protocol === 'https'){
              rowTemplate.content.querySelector('.toProtocol-https').setAttribute('selected',1);
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

            document.getElementById('baseTable').appendChild(document.importNode(rowTemplate.content,true));
          });
          $('.settingLine').each(function(){
            hideFirstMultiDelButton($(this));
          });
        }
      }
    );
  }

  function hideFirstMultiDelButton($tr){
    $tr.find('.toMore').eq(0).find('.multDelhost').remove();
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
    $t = $(this),
    $tr = $t.parent().parent();
    if ($t.val() === 'multi'){
      useMultiMode($tr);
      hideFirstMultiDelButton($tr)
    }else{
      exitMultiMode($tr);
    }
  }

  function addMultiHost(){
    var
    $div    = $(this).parent(),
    $tr     = $div.parent().parent(),
    setNode = document.querySelector('#moreHostTemplate').cloneNode(true);

    $div.after(document.importNode(setNode.content,true));

    hideFirstMultiDelButton($tr)

    return false;
  }

  function delMultiHost(){
    var $tr = $(this).parent().parent().parent();
    $(this).parent().remove();

    hideFirstMultiDelButton($tr)

    return false;
  }

  function addSettingRow(){
    var
    rowTemplate = document.querySelector('#settingRowTemplate');
    document.getElementById('baseTable').appendChild(document.importNode(rowTemplate.content,true));
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