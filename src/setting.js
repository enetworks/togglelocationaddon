$(function(){

  function saveSetting(){
    var setting = [];
    $('.settingLine').each(function(i){
      var
      fromHost    = $(this).find('.fromHostname').val(),
      fromProtocol = $(this).find('.fromProtocol').val() === 'https' ? 'https' : 'http',
      toHost      = $(this).find('.toHostname').val(),
      toProtocol = $(this).find('.toProtocol').val() === 'https' ? 'https' : 'http',
      toggleMode  = $(this).find('.toggleMode').val() === 'multi' ? 'multi' : 'toggle',
      regHostname = /^([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])(\.([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]{0,61}[a-zA-Z0-9]))*$/;

      if (fromHost.match(regHostname) && toHost.match(regHostname)){
        console.log('OK');
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
      }
      setting.push(settingRow);
    });

    chrome.storage.sync.set({
      tlSetting: JSON.stringify(setting)
    },function(){
      $('#saveSetting').val('保存済み');
    });
  }

  function outPutSetting(){
    chrome.storage.sync.get(
      {tlSetting:'[]'},
      function(settingData){
        var setting = JSON.parse(settingData.tlSetting);
        if (setting.length === 0){
          var
          rowTemplate = document.querySelector('#settingRowTemplate');
          document.getElementById('baseTable').appendChild(document.importNode(rowTemplate.content,true));
        }else{
          setting.forEach(function(rowSetting,i,array){
            var
            rowTemplate = document.querySelector('#settingRowTemplate').cloneNode(true);

            rowTemplate.content.querySelector('.fromHostname').value = rowSetting.fromSetting.hostname;
            if (rowSetting.fromSetting.options.protocol === 'https'){
              rowTemplate.content.querySelector('.fromProtocol-https').setAttribute('selected',1);
            }

            rowTemplate.content.querySelector('.toHostname').value = rowSetting.toSetting[0].hostname;
            if (rowSetting.toSetting[0].options.protocol === 'https'){
              rowTemplate.content.querySelector('.toProtocol-https').setAttribute('selected',1);
            }


            if(rowSetting.options.toggleMode === 'multi'){
              rowTemplate.content.querySelector('.toggleMode-multi').setAttribute('selected',1);
              rowTemplate.content.querySelector('.modeView').innerText = '->';
            }else{

            }

            document.getElementById('baseTable').appendChild(document.importNode(rowTemplate.content,true));
          });
        }
      }
    );
  }

  function addSettingRow(){
    var
    rowTemplate = document.querySelector('#settingRowTemplate');
    document.getElementById('baseTable').appendChild(document.importNode(rowTemplate.content,true));
    return false;
  }



  $('#saveSetting').click(saveSetting);
  $('#addRule').click(addSettingRow);
  outPutSetting();

});