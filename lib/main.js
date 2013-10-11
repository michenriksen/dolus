var {Cc, Ci}      = require('chrome');
var Preferences   = require('sdk/simple-prefs');
var Notifications = require('sdk/notifications');

var Dolus = (function () {
  var c = function() { };

  var Observer = Cc['@mozilla.org/observer-service;1'].getService(Ci.nsIObserverService);

  c.prototype.ipAddress = null;

  c.prototype.observe = function(subject, topic, data) {
    if (topic === 'http-on-modify-request') {
      var httpChannel = subject.QueryInterface(Ci.nsIHttpChannel);
      httpChannel.setRequestHeader('X-Forwarded-For', this.getIpAddress(), false);
    };
  };

  c.prototype.start = function() {
    Observer.addObserver(this, 'http-on-modify-request', false);
  }

  c.prototype.stop = function() {
    Observer.removeObserver(this, 'http-on-modify-request');
  }

  c.prototype.reset = function() {
    this.ipAddress = null;
  }

  c.prototype.getIpAddress = function() {
    if (this.ipAddress === null) {
      var permanentForwardedForAddress = this.getPermanentForwardedForAddress();
      if (!permanentForwardedForAddress) {
        this.ipAddress = this.generateIpv4Address();
      } else {
        this.ipAddress = permanentForwardedForAddress;
      }
    }

    return this.ipAddress;
  }

  c.prototype.generateIpv4Address = function() {
    return this.randomIpv4Octet() + '.' + this.randomIpv4Octet() + '.' + this.randomIpv4Octet() + '.' + this.randomIpv4Octet();
  }

  c.prototype.randomIpv4Octet = function() {
    return Math.round(Math.random() * (254 - 2) + 2);
  }

  c.prototype.getPermanentForwardedForAddress = function() {
    return Preferences.prefs.permanentForwardedForAddress;
  }

  return c;
})();

var dolus;

exports.main = function(options, callbacks) {
  dolus = new Dolus();
  dolus.start();

  if (Preferences.prefs.showStartupNotification) {
    Notifications.notify({
      title: "Dolus",
      text: "Spoofing X-Forwarded-For with: " + dolus.getIpAddress(),
    });
  }

  Preferences.on('', function(prefName) {
    dolus.reset();
  });

  Preferences.on('renewRandomIp', function() {
    if (dolus.getPermanentForwardedForAddress()) {
      Notifications.notify({
        title: "Renew random IP",
        text: "This button will not work when a permanent IP has been set.",
      });
    } else {
      dolus.reset();
      Notifications.notify({
        title: "Renew random IP",
        text: "You new X-Forwarded-For IP is: " + dolus.getIpAddress(),
      });
    }
  });
};

exports.onUnload = function(reason) {
  dolus.stop();
};
