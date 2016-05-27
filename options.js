// Saves options to chrome.storage.sync.
function save_options() {
  var defaultfontSize = document.getElementById('defaultfontSize').value;
  var showAllMessages = document.getElementById('showAllMessages').checked;
  var showMyMessages = document.getElementById('showMyMessages').checked;
  var showUsername = document.getElementById('showUsername').checked;
  var pinWeixinTab = document.getElementById('pinWeixinTab').checked;
  var showNotifications = document.getElementById('showNotifications').checked;
  var danmuDebug = document.getElementById('danmuDebug').checked;

  chrome.storage.sync.set({
    defaultfontSize: defaultfontSize,
    showAllMessages: showAllMessages,
    showMyMessages: showMyMessages,
    showUsername: showUsername,
    pinWeixinTab: pinWeixinTab,
    showNotifications: showNotifications,
    danmuDebug: danmuDebug
  }, function() {
    // Update status to let user know options were saved.
    $('#status').show();
    setTimeout(function() {
      $('#status').hide();
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    defaultfontSize: 48,
    showAllMessages: false,
    showMyMessages: false,
    showUsername: false,
    pinWeixinTab: false,
    showNotifications: false,
    danmuDebug: false
  }, function(items) {
    document.getElementById('defaultfontSize').value = items.defaultfontSize;
    document.getElementById('showAllMessages').checked = items.showAllMessages;
    document.getElementById('showMyMessages').checked = items.showMyMessages;
    document.getElementById('showUsername').checked = items.showUsername;
    document.getElementById('pinWeixinTab').checked = items.pinWeixinTab;
    document.getElementById('showNotifications').checked = items.showNotifications;
    document.getElementById('danmuDebug').checked = items.danmuDebug;
  });
}

$('#status').hide();
document.addEventListener('DOMContentLoaded', restore_options);
$('input[type=checkbox]').on('click', save_options);
$('input[type=number]').on('change', save_options);
