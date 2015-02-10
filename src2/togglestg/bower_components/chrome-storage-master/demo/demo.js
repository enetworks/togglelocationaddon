window.addEventListener('polymer-ready', function() {
  var storage = document.querySelector('chrome-storage');

  storage.addEventListener('chrome-storage-load', function(e) {
    console.log('event> chrome-storage-load', e.detail);
  });

  storage.addEventListener('chrome-storage-save', function(e) {
    console.log('event> chrome-storage-save', storage.value);
  });

  storage.addEventListener('chrome-storage-remove', function(e) {
    console.log('event> chrome-storage-remove has done but we will clean up');

    storage.clear();
  });

  storage.addEventListener('chrome-storage-clear', function(e) {
    console.log('event> chrome-storage-clear');
  });

  storage.addEventListener('chrome-storage-bytes-in-use', function(e) {
    console.log('event> chrome-storage-bytes-in-use. now we will remove them', e.detail);

    storage.remove('chrome');
  });

  console.log('storage is ready', storage.name, storage.value);

  storage.value = 'my value';
  storage.save();
  storage.getBytesInUse();
});
