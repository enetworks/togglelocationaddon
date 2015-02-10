

  Polymer({
    storage: 'sync',

    name: '',

    value: null,

    autosave: false,

    nameChanged: function(oldName, newName) {
      this.load(newName);
    },

    valueChanged: function(oldValue, newValue) {
      if (this.autosave) {
        this.save(newValue);
      }
    },

    load: function(key) {
      chrome.storage[this.storage].get(key, this.delegate('load', function(items) {
	this.value = items[this.name];
      }));
    },

    save: function(value) {
      var item = {};
      if (value) {
        this.value = value;
      }
      item[this.name] = this.value;
      chrome.storage[this.storage].set(item, this.delegate('save'));
    },

    remove: function(key) {
      chrome.storage[this.storage].remove(key, this.delegate('remove', function(items) {
        this.value = null;
      }));
    },

    clear: function() {
      chrome.storage[this.storage].clear(this.delegate('clear', function(items) {
        this.name = '';
        this.value = null;
      }));
    },

    getBytesInUse: function() {
      chrome.storage[this.storage].getBytesInUse(name, this.delegate('bytes-in-use'));
    },

    delegate: function(event, preFire) {
      return function(detail) {
        preFire && preFire.call(this, detail);
        this.asyncFire('chrome-storage-' + event, detail);
      }.bind(this);
    }
  });

