(function(){
  var settings =[];

  Polymer('load-setting', {
    ready: function(){
      this.settings= [
        {name: 'test1'},
        {name: 'test2'}
      ];
      console.log(111);
      console.table(this.settings);
    }
  });
})();
