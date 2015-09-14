// Get options
var prefs;
function refresh_options() {
  chrome.storage.sync.get({
    defaultfontSize: 48,
    showAllMessages: false,
    showUsername: false,
    pinWeixinTab: false,
    showNotifications: false,
    danmuDebug: false
  }, function(items) { prefs = items; });
}
refresh_options();
chrome.storage.onChanged.addListener(refresh_options);

// Global Variables
var activated = false;

// Toolbar Button
chrome.browserAction.onClicked.addListener(function(tab) {
  if (prefs.danmuDebug) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      var counter = 0;
      var timer = setInterval(function() {
        if (counter++ < 10) {
          chrome.tabs.sendMessage(tabs[0].id, {
            type: 'bullet',
            message: {user:{name: '弹幕测试'}, content:{text: randomString(), image: ''}}
          });
        }
        else {
          window.clearInterval(timer);
        }
      }, 500);
    });
  } else {
    if (activated) {
      chrome.tabs.create({
        url: 'http://aidistan.github.io/firefox-weixin-danmu/helper.html'
      });
    }
    else {
      chrome.tabs.create({
        url: 'https://wx.qq.com/',
        pinned: prefs.pinWeixinTab
      });
    }
  }
});

// // Attach weixin.js
// var pagemod = pageMod.PageMod({
//   include: ['*.qq.com', '*.wechat.com'],
//   attachTo: 'top',
//   contentScriptFile: [
//     self.data.url('vendor/jquery-2.1.3.min.js'),
//     self.data.url('weixin.js')
//   ],
//   onAttach: function(worker){
//     showNotification({ title: '加载消息捕获模块', text: '至页面' + worker.url });
//
//     worker.port.on('bullet', function(msg) {
//       if (prefs.showAllMessages || msg.room == 'inside') {
//         showNotification({ title: '捕获到消息', text: msg.content.text });
//         if (dm_worker) {
//           dm_worker.port.emit('bullet', msg);
//         }
//       }
//     });
//
//     var timer;
//     worker.port.on('heartbeat', function() {
//       if (activated) {
//         window.clearTimeout(timer);
//       }
//       else {
//         hookup();
//       }
//       timer = setTimeout(breakup, 5000);
//     });
//
//     function hookup() {
//       showNotification({ title: '已登陆网页微信', text: '开始监听微信消息' });
//       activated = true;
//       button.icon = {
//         '16': './icons/icon-16.png',
//         '32': './icons/icon-32.png',
//         '64': './icons/icon-64.png'
//       };
//     }
//
//     function breakup() {
//       showNotification({ title: '已退出网页微信', text: '不再监听微信消息'  });
//       button.icon = {
//         '16': './icons/icon-o-16.png',
//         '32': './icons/icon-o-32.png',
//         '64': './icons/icon-o-64.png'
//       };
//       activated = false;
//     }
//
//     // Store the worker
//     wx_workers[worker.tab.id] = worker;
//   }
// });

function randomString(len) {
  len = len || 32;
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxy0z123456789';
  var maxPos = chars.length;
  var str = '';
  for (_i = 0; _i < len; _i++) {
    str += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return str;
}

chrome.runtime.onMessage.addListener(function(request) {
  // Whether to recieve
  if (request.type === 'notification' && prefs.showNotifications) {
    chrome.notifications.create('notification', {
      type: "basic",
      iconUrl: 'data/icons/icon.png',
      title: request.message.title,
      message: request.message.text
    });
  }
});
