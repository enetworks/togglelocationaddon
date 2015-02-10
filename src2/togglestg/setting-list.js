var settings =[];

Polymer('setting-list', {
  ready: function(){
    this.settings= [
      {name: 'test1'},
      {name: 'test2'}
    ];
    this.modes = [
      'toggle',
      'multi',
      'toggleDir',
      'multiDir'
    ];
    this.protocols = [
      'http',
      'https'
    ];
    var that = this;
    console.log(111);
    console.table(this.settings);
    chrome.storage.sync.get(
      {tlSetting:'[]'},
      function(settingData){
        console.log(settingData);
        that.settings = JSON.parse(settingData.tlSetting);
        if (that.settings.length === 0){
          that.settings = [{}];
        }
      }
    );
  },
  domReady: function(){
    console.log('domReady');
    console.log(document.querySelector('#chromestorage'));
  }
});

