"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function () {
  'use strict';

  var WPAI_Chat = function WPAI_Chat() {};

  var Aicb = new WPAI_Chat();

  WPAI_Chat.prototype.common = function () {
    "use strict";

    function sanitize(string) {
      var slash = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
      var str = string.split(" ").filter(function (n) {
        return n;
      }).join(" ");
      var map = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
        "/": "/"
      };

      if (slash) {
        map["/"] = "&#x2F;";
      }

      var reg = /[&<>"'/]/ig;
      return str.replace(reg, function (match) {
        return map[match];
      });
    }

    function whiteSpaces(str) {
      return sanitize(str);
    }

    function getUrlPath() {
      var link = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "path";
      var url = new URL(link !== "" ? link : document.location.href);

      if (type === "domain") {
        return url.origin;
      }

      if (type === "path") {
        return url.pathname;
      }
    }

    function timeDiffSeconds(start) {
      var end = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Date.now();
      start = parseInt(start);
      end = parseInt(end);

      if (start && end) {
        var diff = end > start ? end - start : start - end;
        return diff / 1000;
      }

      return 0;
    }

    function generateGUID() {
      return "xxxsxxxxxhxxxxayxpxxxxxxoxxxyyxxnxxx".replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0;
        var v = c == "x" ? r : r & 0x3 | 0x8;
        return v.toString(16);
      });
    }

    function getBrowser() {
      var test = function test(regexp) {
        return regexp.test(window.navigator.userAgent);
      };

      switch (!0) {
        case test(/edge/i):
          return "Microsoft Edge";

        case test(/opr/i) && (!!window.opr || !!window.opera):
          return "Opera";

        case test(/chrome/i) && !!window.chrome:
          return "Google Chrome";

        case test(/trident/i):
          return "Internet Explorer";

        case test(/firefox/i):
          return "Mozilla Firefox";

        case test(/safari/i):
          return "Safari";

        default:
          return "unknown";
      }
    }

    function setCookie(name, value) {
      var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
        expires: 1,
        path: "/",
        domain: window.location.hostname,
        secure: !0
      };
      return Cookies.set(name, value, {
        expires: config.exp,
        path: config.path,
        domain: config.domain,
        secure: config.secure
      });
    }

    function getCookie(name) {
      var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        expires: 1,
        path: "/",
        domain: window.location.hostname,
        secure: !0
      };
      return Cookies.get(name, {
        expires: config.exp,
        path: config.path,
        domain: config.domain,
        secure: config.secure
      });
    }

    function getDateTime(time) {
      var t = new Date(time),
          monthsList = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

      var h = function h(_h) {
        if (t.getHours() > 12) return _h ? t.getHours() - 12 : " PM";else return _h ? t.getHours() : " AM";
      };

      return t.getDate() + " " + monthsList[t.getMonth() + 1] + " AT " + h(!0) + ":" + t.getMinutes() + h(!1);
    }

    function isValidURL(str) {
      var pattern = new RegExp('^(https?:\\/\\/)?' + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + '((\\d{1,3}\\.){3}\\d{1,3}))' + '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + '(\\?[;&a-z\\d%_.~+=-]*)?' + '(\\#[-a-z\\d_]*)?$', 'i');
      return !!pattern.test(str);
    }

    function jsonParse(str) {
      try {
        if (typeof str !== "undefined") {
          return JSON.parse(str);
        }
      } catch (e) {
        return !1;
      }

      return !1;
    }

    function getObject(target) {
      var group = document.querySelectorAll(target);
      var result = {};

      for (var i = 0; i < group.length; i++) {
        var type = group[i].dataset.action;
        var key = group[i].dataset.key;

        if (type === "text") {
          result[key] = group[i].value;
        }

        if (type === "checkbox") {
          result[key] = group[i].checked == !0 ? 1 : 0;
        }

        if (type === "select") {
          result[key] = group[i].options[group[i].selectedIndex].value;
        }

        if (type === "radio") {
          var radio = group[i].querySelector("input[name=" + key + "]:checked");
          result[key] = radio ? radio.value : "1";
        }
      }

      return result;
    }

    function loaderText() {
      return "<div class=\"single-item mr-spinner-full\"><div class=\"mr-spinner\"><div class=\"rect1\"></div><div class=\"rect2\"></div><div class=\"rect3\"></div><div class=\"rect4\"></div><div class=\"rect5\"></div></div></div>";
    }

    function mrLoader() {
      var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !1;
      var loader = document.querySelectorAll(".mr-spinner");

      if (loader) {
        loader.forEach(function (ele) {
          return ele.remove();
        });
      }

      var spinner = document.createElement("DIV");
      spinner.setAttribute("class", "mr-spinner");
      spinner.innerHTML = "<div class=\"rect1\"></div><div class=\"rect2\"></div><div class=\"rect3\"></div><div class=\"rect4\"></div><div class=\"rect5\"></div>";
      var target = document.getElementById("cbMessages");

      if (!!type && target) {
        target.appendChild(spinner);
        target.scrollIntoView({
          behavior: "smooth",
          block: "end"
        });
      }
    }

    function typeLoader() {
      var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !1;
      var loader = document.querySelectorAll(".tp-wrapper");

      if (loader) {
        loader.forEach(function (ele) {
          return ele.remove();
        });
      }

      var def = mrAssistantObj.plugin_url + "assets/images/mr-assistant.svg";
      var avatar = mrAssistantObj.hasOwnProperty("avatar") && isValidURL(mrAssistantObj.avatar) ? mrAssistantObj.avatar : def;
      var spinner = document.createElement("DIV");
      spinner.setAttribute("class", "tp-wrapper fade");
      var imgId = Math.floor(Math.random() * 92992343 + 1);
      spinner.innerHTML = "<img id=\"mrImg-".concat(imgId, "\" src=\"").concat(avatar, "\" class=\"avatar\"/><div class=\"tp-container\"><div class=\"tp-balls\"><span></span><span></span><span></span></div></div>");
      var target = document.getElementById("cbMessages");

      if (!!type && target) {
        playSound("au-typing");
        target.appendChild(spinner);
        image(imgId, avatar, def, "imgSrc", 25);
      }

      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "end"
        });
      }
    }

    function playSound(name) {
      try {
        var sound = localStorage.getItem("mrAssistantSounds");

        if (sound && sound === "mute") {
          return;
        }

        var audio = document.getElementById(name);

        if (audio) {
          var promise = audio.play();

          if (promise !== undefined) {
            promise.catch(function (e) {
              if (mrAssistantObj.dev === "on") {
                console.info(e);
              }
            });
          }
        }
      } catch (e) {}
    }

    function localDB(key, type) {
      var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var cursor = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : !1;
      var arr = [];

      try {
        var obj = JSON.parse(localStorage.getItem(key));

        if (obj && obj.length > 0) {
          obj.forEach(function (ele) {
            return arr.push(ele);
          });
        }
      } catch (e) {
        if (mrAssistantObj.dev === "on") {
          console.info(e);
        }
      }

      if (type === "get") {
        return arr;
      } else if (type === "set") {
        if (cursor) {
          arr = [];
        }

        arr.push(data);
        return localStorage.setItem(key, JSON.stringify(arr));
      }
    }

    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    }

    async function image(key, path, fallback) {
      var type = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "bg";
      var width = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "";
      await new Promise(function (resolve) {
        var img = new Image();
        img.src = path;

        img.onload = function () {
          return resolve(path);
        };

        img.onerror = function () {
          return resolve(fallback);
        };
      }).then(function (img) {
        if (img === path) {
          return;
        }

        var imgId = document.getElementById("mrImg-" + key);

        if (imgId) {
          if (type === "img") {
            imgId.innerHTML = '<img width="' + width + '" src="' + img + '"/>';
          } else if (type === "imgSrc") {
            imgId.src = img;
          } else {
            imgId.style.backgroundImage = 'url(' + img + ')';
          }
        }
      });
    }

    function isset(accessor) {
      try {
        return typeof accessor !== 'undefined';
      } catch (e) {
        return !1;
      }
    }

    function timeAgo(ti) {
      var cursor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
      var d = new Date(ti);
      var t = new Date();
      var diffMs = t - d;
      var diffDays = Math.floor(diffMs / 86400000);
      var diffHrs = Math.floor(diffMs % 86400000 / 3600000);
      var minutes = Math.round(diffMs % 86400000 % 3600000 / 60000);

      if (cursor === "min") {
        return minutes;
      }

      if (diffDays > 0) {
        return diffDays > 1 ? diffDays + " days ago" : diffDays + " day ago";
      } else if (diffHrs > 0) {
        return diffHrs > 1 ? diffHrs + " hours ago " : diffHrs + " hour ago";
      } else if (minutes > 0) {
        return minutes > 1 ? minutes + " mins ago " : minutes + " min ago";
      } else {
        return d.toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: !0
        });
      }
    }

    return {
      timeDiffSeconds: timeDiffSeconds,
      generateGUID: generateGUID,
      getBrowser: getBrowser,
      whiteSpaces: whiteSpaces,
      sanitize: sanitize,
      getUrlPath: getUrlPath,
      playSound: playSound,
      getObject: getObject,
      setCookie: setCookie,
      getCookie: getCookie,
      getDateTime: getDateTime,
      loaderText: loaderText,
      mrLoader: mrLoader,
      typeLoader: typeLoader,
      localDB: localDB,
      getRandomInt: getRandomInt,
      jsonParse: jsonParse,
      isValidURL: isValidURL,
      image: image,
      isset: isset,
      timeAgo: timeAgo
    };
  }();

  WPAI_Chat.prototype.conn = function () {
    "use strict";

    var settings;
    var appearance;
    var userConfig;
    var lastMessage = "";
    var botConfig = {};
    var currentStatus = "";
    var chatUsers = {};
    var timeout2 = null;

    function _checkAuthState(user) {
      if (user) {
        firebase.database().ref("clients").child(user.uid).child("settings").on("value", function (snap) {
          try {
            var config = snap.val();

            if (config) {
              userConfig = Object.assign({}, config);
            }

            if (config && config.hasOwnProperty("block")) {
              localStorage.setItem("mrAssistantBlock", config.block);
            }

            if (config && config.hasOwnProperty("mrSupport")) {
              localStorage.setItem("mrAssistantSupport", config.mrSupport);
            }
          } catch (e) {
            if (mrAssistantObj.dev === "on") {
              console.info(e);
            }
          }
        });
        firebase.database().ref("clients").child(user.uid).child("actions").on("child_added", function (snap) {
          Aicb.common.typeLoader(!1);
          var key = snap.key;
          var val = snap.val();

          if (val) {
            var type = val.actionType;
            var action = val.actionName;
            var status = val.status;
            var time = val.time;

            if (status !== "pending") {
              return;
            }

            if (Aicb.common.timeDiffSeconds(time) <= 10) {
              firebase.database().ref("clients").child(user.uid).child("actions").child(key).update({
                "status": "Executed"
              }).then(function () {
                var chatFrame = localStorage.getItem("mrAssistantDom");

                if (chatFrame !== "expend") {
                  Aicb.init.chat_start();
                }
              }).then(function () {
                Aicb.common.setCookie("mrRobotAutoAction", 0, 5);
                Aicb.common.setCookie("mrRobotSession", Aicb.common.generateGUID(), 5);

                if (type === "survey" && action === "signUp") {
                  Aicb.form.surveyForm(action);
                } else if ("search" === type && "" !== val.subAction) {
                  if ("redirect" === val.subAction) {
                    try {
                      var url = new URL(action);
                      Aicb.init.popMessage({
                        "title": Aicb.translate.get("Suggestion", "_txcwpm21"),
                        "content": Aicb.translate.get("You have suggestion. You can click on this button to view.", "_txcwpm22"),
                        "type": "redirect",
                        "button": Aicb.translate.get("View Now", "_txcwpm23"),
                        "action": action
                      });
                      notification(Aicb.translate.get("Admin has suggested for this page.", "_txcwpm12"));
                    } catch (e) {
                      firebase.database().ref("clients").child(user.uid).child("actions").child(key).update({
                        "status": "Dropped"
                      });
                    }
                  } else if (val.subAction === "kb") {
                    Aicb.controller.bot(action, {
                      "kbAction": 1
                    });
                  }
                } else if (type === "help" && action === "HelpMenu") {
                  Aicb.init.mrHelpMenuExecute(null);
                } else if (type === "feedback" && action === "Feedback") {
                  Aicb.form.feedbackForm(action);
                } else if (type === "menuAction" && action === "menuAction") {
                  var mr_menus = document.querySelector(".mr_menus");

                  if (mr_menus) {
                    mr_menus.click();
                  }
                } else if (action === "botStatus") {
                  var cb_bot = document.querySelector(".cb_bot");

                  if (cb_bot) {
                    cb_bot.click();
                  }
                } else if (action === "endChat") {
                  signOut();
                } else {
                  firebase.database().ref("clients").child(user.uid).child("actions").child(key).update({
                    "status": "Dropped"
                  });
                }

                Aicb.common.typeLoader(!1);
              });
            } else {
              firebase.database().ref("clients").child(user.uid).child("actions").child(key).update({
                "status": "Dropped"
              });
            }
          }
        });
      }
    }

    function menuActionController(e) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      var action = e.target.parentNode;
      var btn = document.querySelectorAll(".mr_action_btn");

      if (action.classList.contains("mr_action_btn")) {
        var key = action.dataset.action;

        if (key === "signin") {
          chooseForm();
        } else if (key === "signout") {
          signOut();
        } else if (key === "rateChat") {
          Aicb.form.feedbackForm("feedback");
        } else if (key === "pausedBot") {
          var cb_bot = document.querySelector(".cb_bot");

          if (cb_bot) {
            var menuBotStatus = document.getElementById("menuBotStatus");
            cb_bot.click();
          }
        } else if (key === "muteSounds") {
          localStorage.setItem("mrAssistantSounds", "mute");

          if (btn) {
            btn.forEach(function (ele) {
              var ac = ele.dataset.action;

              if (ac && ac === "playSounds") {
                ele.style.display = "flex";
              }

              if (ac && ac === "muteSounds") {
                ele.style.display = "none";
              }
            });
          }
        } else if (key === "playSounds") {
          localStorage.setItem("mrAssistantSounds", "play");

          if (btn) {
            btn.forEach(function (ele) {
              var ac = ele.dataset.action;

              if (ac && ac === "playSounds") {
                ele.style.display = "none";
              }

              if (ac && ac === "muteSounds") {
                ele.style.display = "flex";
              }
            });
          }
        }
      }
    }

    function signOut() {
      var user = firebase.auth().currentUser;

      if (user) {
        user.delete().then(function () {
          window.frames.location.reload();
        }).catch(function (error) {
          if (mrAssistantObj.dev === "on") {
            console.info(error);
          }

          notification(Aicb.translate.get(error.message, "_txcwsi201"));
        });
      } else {
        notification(Aicb.translate.get("Please introduce yourself", "_txcwsi1"));
      }
    }

    function sessionInfo(user, mes) {
      if (!user) {
        return;
      }

      var rootRef = firebase.database().ref();
      var clients = rootRef.child("clients").child(user.uid);
      clients.child("/info/lastMessage").set(mes);
      clients.child("/info/lastSeen").set(Date.now());
      clients.child("/info/unread").transaction(function (currentClicks) {
        return (currentClicks || 0) + 1;
      });
    }

    function chooseForm() {
      return Aicb.form.surveyForm("signUp");
    }

    function addUserToScript(userObj) {
      var sc = document.getElementById("mr_user_config");
      var obj = [];

      if (userObj) {
        Object.keys(userObj).forEach(function (uid) {
          var user = userObj[uid];
          obj[uid] = {
            "name": user.name || "Anonymous",
            "avatar": user.avatar || ""
          };
        });
      }

      if (sc) {
        sc.innerHTML = "let mrUsers =" + JSON.stringify(Object.assign({}, obj));
      }
    }

    function _conversationInit() {
      firebase.auth().onAuthStateChanged(function (user) {
        if (!user) {
          return;
        }

        var mr = firebase.database().ref("clients").child(user.uid);
        mr.child("info").on("value", function (snap) {
          var val = snap.val();

          if (val.name) {
            chatUsers = Object.assign(chatUsers, {
              "clientName": val.name
            });
          }

          if (!val || !val.marge) {
            var user2 = firebase.auth().currentUser;
            var info = {
              "isNewUser": !0,
              "marge": !0,
              "domain": window.location.hostname,
              "lastSeen": Date.now(),
              "join": Date.now()
            };
            mr.child("info").update(info);
            mr.child("settings").update({
              "archive": "unarchived",
              "block": "unblock",
              "mrSupport": "on",
              "kbSupport": "on",
              "status": "active",
              "uEndChat": "start"
            });
            var mrName = mrAssistantObj.hasOwnProperty("name") && mrAssistantObj.name !== "" ? mrAssistantObj.name : "Mr. Assistant";
            var mrAvatar = mrAssistantObj.hasOwnProperty("avatar") && Aicb.common.isValidURL(mrAssistantObj.avatar) ? mrAssistantObj.avatar : "";
            var mrStatus = mrAssistantObj.hasOwnProperty("mrAssistantBot") && mrAssistantObj.mrAssistantBot !== "on" ? "pulse" : "active";
            mr.child("conversation").child("mr-assistant").update({
              "name": mrName,
              "avatar": mrAvatar,
              "join": Date.now(),
              "type": "bot",
              "status": mrStatus
            }).then(function () {
              firebase.database().ref("actions").child("visitorSignUp").child(user2.uid).remove();
            });
          }
        });
        var conversation = mr.child("conversation");
        conversation.on("value", function (snap) {
          var val = snap.val();

          if (val) {
            try {
              addUserToScript(val);
              Aicb.common.setCookie("mrUserAssets", JSON.stringify(val));
              var template = Aicb.template.setAvatar(snap.key, val);
              var imgBox = document.querySelector(".mr-left-header");

              if (imgBox) {
                imgBox.innerHTML = template;
              }

              if (val.hasOwnProperty("mr-assistant")) {
                var line = document.querySelector(".bot-line");
                var cb_bot = document.querySelector(".cb_bot");

                if (line && cb_bot) {
                  var mrInstant = val["mr-assistant"];

                  if (mrInstant.status === "active") {
                    line.style.display = "none";
                    cb_bot.dataset.action = "running";
                    cb_bot.classList.remove("bot-pulse");
                    notification(Aicb.translate.get("Support bot is activated. Now you can search & chat..", "_txcwbs1"));
                  } else {
                    line.style.display = "inline";
                    cb_bot.dataset.action = "pulse";
                    cb_bot.classList.add("bot-pulse");
                    notification(Aicb.translate.get("Support bot is deactivated. Sending to Live Agent.", "_txcwbs2"));
                  }
                }
              }
            } catch (e) {
              if (mrAssistantObj.dev === "on") {
                console.info(e);
              }
            }
          } else {
            addUserToScript({});
          }
        });

        if (user.email) {
          firebase.database().ref("users").once("value", function (snap) {
            var admins = snap.val();

            if (admins) {
              Object.keys(admins).forEach(function (key) {
                if (admins.hasOwnProperty(key)) {
                  var admin = admins[key];

                  if (user.email === admin.email) {
                    var name = admin.name !== "" ? admin.name + " (Admin)" : "You (Admin)";
                    mr.child("info").update({
                      "join": Date.now(),
                      "isAdminUser": !0,
                      "marge": !0,
                      "name": name,
                      "email": admin.email
                    });
                    firebase.database().ref('livechat/').child(user.uid).set("");
                    firebase.database().ref('browses/').child(user.uid).set("");
                    firebase.database().ref('clients').child(user.uid).child('actions').set("");
                    notification("".concat(Aicb.translate.get("Hello ", "_txcwkw_hello"), " ").concat(name, ",  ").concat(Aicb.translate.get("You are chatting itself.", "_txcwis1")));
                  }
                }
              });
            }
          });
        }

        firebase.database().ref("mr-assistant").child("name").on("value", function (snap) {
          if (snap.val()) {
            chatUsers = Object.assign(chatUsers, {
              "mrAssistant": snap.val()
            });
          }
        });
      });
    }

    function notification(message) {
      setStatus(message, !0, !0);
    }

    function loadMoreMessages(e) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();

      if (firebase.auth().currentUser !== null) {
        var mId = firebase.auth().currentUser.uid;
        firebase.database().ref("livechat").child(mId).once("value", function (snap) {
          var data = snap.val();

          if (!data) {
            return;
          }

          var sort = Object.entries(data);
          var length = sort.length || 0;
          var step = parseInt(e.target.dataset.step);
          var inset = parseInt(e.target.dataset.inset);
          var counter = parseInt(e.target.dataset.counter);
          var limit = inset + step;
          var end = length - inset;
          var start = end - step > 0 ? end - step : 0;
          var list = sort.slice(start, end);
          var i;

          for (i = list.length; i >= 0; i--) {
            if (list[i]) {
              var key = list[i][0];

              if (data.hasOwnProperty(key)) {
                Aicb.template.templateDark(key, data[key], settings, "prepend");
              }
            }
          }

          e.target.dataset.inset = limit;
          e.target.style.display = length > limit ? "block" : "none";
        });
      }
    }

    function loadMessages(user) {
      var cbMessages = document.querySelector(".cbMessages");

      if (cbMessages) {
        cbMessages.innerHTML = "";
      }

      if (user) {
        Aicb.common.mrLoader(!0);

        var loadMegFunction = function loadMegFunction(snap) {
          var data2 = snap.val();

          if (Date.now() - data2.time < 2000) {
            Aicb.common.playSound("au-message");
          }

          Aicb.template.templateDark(snap.key, data2, settings);
          botControllerInit(data2.text);
        };

        firebase.database().ref("livechat").child(user.uid).limitToLast(20).on("child_added", loadMegFunction);
        firebase.database().ref("livechat/").child(user.uid).once("value", function (snap) {
          var count = snap.numChildren();
          var loadMore = document.querySelector(".loadMore");

          if (count > 20) {
            loadMore.dataset.inset = 20;
            loadMore.dataset.step = 10;
            loadMore.dataset.counter = count;
            loadMore.style.display = "block";
            loadMore.addEventListener("click", loadMoreMessages, !0);
          }
        });
        Aicb.common.mrLoader(!1);
      } else {
        try {
          var offlineData = Aicb.common.localDB("mrAssistantOfflineChat", "get");

          if (offlineData && offlineData.length > 0) {
            offlineData.forEach(function (ele) {
              return Aicb.template.templateDark("offline-" + Math.floor(Math.random() * Math.floor(Date.now())), ele, settings);
            });
          }
        } catch (e) {
          if (mrAssistantObj.dev === "on") {
            console.info(e);
          }
        }
      }
    }

    function setMessages(str, user, type2) {
      var obj = {
        type: type2,
        name: user ? user.displayName : "Anonymous",
        text: str,
        time: Date.now()
      };

      if (user) {
        if (chatUsers) {
          if (type2 === "client") {
            obj.name = chatUsers.clientName || "Anonymous";
          } else if (type2 === "bot") {
            obj.name = chatUsers.mrAssistant || "Mr. Assistant";
          }
        }

        firebase.database().ref("livechat").child(user.uid).push(obj).catch(function (e) {
          if (mrAssistantObj.dev === "on") {
            console.info(e);
          }
        });
        firebase.database().ref("clients").child(user.uid).child("info").update({
          "lastMessage": str.substring(0, 20),
          "lastSeen": Date.now()
        });
      } else {
        Aicb.common.localDB("mrAssistantOfflineChat", "set", obj);
        return Aicb.template.templateDark("offline-" + Date.now(), obj, "message-visitor");
      }
    }

    function chatting(user, type) {
      var messageFormBtn = document.getElementById("mr_sender");
      var messageInputBox = document.getElementById("message");
      var timeout = null;
      var mpTimeout = null;

      if (messageFormBtn && messageInputBox) {
        messageInputBox.addEventListener("keyup", function (e) {
          if (e.keyCode === 13) {
            messageFormBtn.click();
          }
        });
      }

      if (messageFormBtn) {
        messageFormBtn.addEventListener("click", function (e) {
          if (settings.configuration && settings.configuration.chatWay !== "chatOffline" && userConfig && userConfig.block === "block") {
            return setStatus("Oops!! Something happen wrong. Contact to Admin.", !0, !0);
          }

          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          var str = Aicb.common.whiteSpaces(messageInputBox.value);

          if (timeout) {
            clearTimeout(timeout);
          }

          timeout = setTimeout(function () {
            if (str !== "") {
              messageInputBox.value = "";

              (async function () {
                try {
                  var mrAssistantBlock = localStorage.getItem("mrAssistantBlock");

                  if (mrAssistantBlock && mrAssistantBlock === "block") {
                    return "";
                  }

                  Aicb.common.playSound("au-message");

                  if (mrAssistantObj.hasOwnProperty("cmd") && mrAssistantObj.cmd === "on" && str.toLowerCase().replace(/ .*/, '') === "-mr") {
                    lastMessage = str;
                    return Aicb.controller.mrCommandLine(str);
                  }

                  if (user) {
                    sessionInfo(user, str);
                    lastMessage = str;
                    return setMessages(str, user, "client");
                  } else {
                    if ("chatOffline" === settings.configuration.chatWay) {
                      lastMessage = str;
                      setMessages(str, user, "client");
                      return await botControllerInit(str);
                    } else if ("chatAnonymously" === settings.configuration.chatWay) {
                      Aicb.form.signUp({
                        "signUp": "Anonymously"
                      }, "", !0);
                    } else {
                      chooseForm();
                    }
                  }
                } catch (e) {
                  setStatus("Oops!! Wrong Configuration!!", !0, !0);

                  if (mrAssistantObj.dev === "on") {
                    console.info(e);
                  }
                }
              })();
            }
          }, 100);
        });
      }
    }

    var botControllerInit = async function botControllerInit(str) {
      if (lastMessage !== str) {
        return;
      }

      if (timeout2) clearTimeout(timeout2);
      timeout2 = setTimeout(async function () {
        if (mrAssistantObj.mrAssistantBot !== "off" && !!settings.configuration.assistantSupport) {
          if (settings.configuration.chatWay !== "chatOffline" && userConfig.status === "active") {
            Aicb.common.typeLoader(!0);
            botConfig.kbAction = !!(userConfig.kbSupport === "on" && !!settings.configuration.kbBot);
            var botConfig2 = Object.assign({}, botConfig, settings);
            Aicb.common.setCookie("mrRobotAutoAction", 0, 5);
            Aicb.common.setCookie("mrRobotSession", Aicb.common.generateGUID(), 5);
            var mrAssistantSupport = localStorage.getItem("mrAssistantSupport");

            if (mrAssistantSupport && "off" === mrAssistantSupport) {
              return Aicb.common.typeLoader(!1);
            }

            return await Aicb.controller.bot(str, botConfig2);
          } else if (settings.configuration.chatWay === "chatOffline") {
            Aicb.common.typeLoader(!0);
            botConfig.kbAction = !!settings.configuration.kbBot;

            var _botConfig = Object.assign({}, botConfig, settings.configuration);

            Aicb.common.setCookie("mrRobotAutoAction", 0, 5);
            Aicb.common.setCookie("mrRobotSession", Aicb.common.generateGUID(), 5);
            return await Aicb.controller.bot(str, _botConfig);
          }
        } else {
          Aicb.common.typeLoader(!1);
        }
      }, 100);
    };

    function setStatus(text, type) {
      var cursor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !1;
      var mr_status_box = document.querySelector(".mr_status_box");
      if (!mr_status_box) return;
      var span = document.createElement("DIV");
      span.setAttribute("class", "mr_status theme");
      span.innerHTML = text;
      mr_status_box.style.display = !type ? "none" : "flex";
      mr_status_box.innerHTML = "";
      mr_status_box.append(span);

      if (cursor) {
        setTimeout(function (e) {
          span.innerHTML = currentStatus;
          mr_status_box.innerHTML = "";
          mr_status_box.append(span);
        }, 5000);
      }
    }

    function clear() {
      _checkAuthState(null);

      _conversationInit(null);

      loadMessages(null);
      chatting(null, "go");
      return "";
    }

    function __settingsInit() {
      currentStatus = mrAssistantObj.offline_text || " ";
      setStatus(currentStatus, !0, !1);
      firebase.database().ref("actions").child("online").on("value", function (snap) {
        var val = snap.val();

        if (val.hasOwnProperty("lastSeen") && val.hasOwnProperty("status")) {
          var seconds = Aicb.common.timeDiffSeconds(val.lastSeen);

          if (val.status === "online" && seconds < 600) {
            if (mrAssistantObj.hasOwnProperty("online_text")) {
              currentStatus = mrAssistantObj.online_text;
            }
          } else {
            if (mrAssistantObj.hasOwnProperty("offline_text")) {
              currentStatus = mrAssistantObj.offline_text;
            }
          }

          setStatus(currentStatus, !0, !1);
        }
      });
      firebase.auth().onAuthStateChanged(function (user) {
        var mr_dropdown = document.querySelector(".mr-dropdown");

        if (mr_dropdown) {
          mr_dropdown.innerHTML = "";

          var createBtn = function createBtn(text, type, imgSrc) {
            var id = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";
            var display = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "flex";
            var p = document.createElement("P");
            p.setAttribute("class", "mr_action_btn");
            p.setAttribute("style", "display: " + display);
            p.setAttribute("data-action", type);
            p.addEventListener("click", menuActionController, !0);
            var img = imgSrc !== "" ? imgSrc : "bpmn:start-event-parallel-multiple";
            p.innerHTML = "<span class=\"iconify mr-svg\" data-icon=\"".concat(img, "\" data-inline=\"true\"></span><span id=\"").concat(id, "\">").concat(text, "</span>");
            if (mr_dropdown) mr_dropdown.appendChild(p);
          };

          createBtn("Chat Bot", "pausedBot", "ant-design:robot-filled", "menuBotStatus");
          var sound = localStorage.getItem("mrAssistantSounds"),
              soundBtn1 = !!sound && sound === "mute" ? "flex" : "none",
              soundBtn2 = !!sound && sound === "mute" ? "none" : "flex";
          createBtn("Enable Sounds", "playSounds", "si-glyph:sound-mute", "playSounds", soundBtn1);
          createBtn("Mute Sounds", "muteSounds", "subway:sound", "muteSounds", soundBtn2);

          if (user) {
            createBtn("Rate for this chat", "rateChat", "vaadin:star-half-left-o");
            createBtn("End Chat", "signout", "mdi-light:logout");
          } else {
            createBtn("Start Chat", "signin", "ant-design:login-outlined");
          }
        }
      });
    }

    function signInAnonymously() {
      var unique = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !0;
      var key = Aicb.common.getRandomInt(1000, 9999);
      var ann = "Anonymous " + unique ? key : "";
      var info = {
        "name": ann,
        "email": "",
        "isNewUser": !1,
        "marge": !1,
        "lastSeen": Date.now(),
        "method": "signInAnonymously",
        "type": "liveChat",
        "chatWay": "signInAnonymously",
        "join": Date.now(),
        "status": "active",
        "currentPage": window.location.href,
        "browser": Aicb.common.getBrowser(),
        "language": navigator.languages.join(","),
        "platform": navigator.platform
      };
      var chatItSelf = localStorage.getItem("mrAssistantChatItself");

      if (!chatItSelf) {
        firebase.auth().signInAnonymously().then(function (snap) {
          var user = snap.user;

          if (user) {
            info.uid = user.uid;
            info.method = "signInAnonymously";
            firebase.database().ref("clients").child(user.uid).child("info").update(info);
            setStatus(Aicb.translate.get("Welcome!! Now You can search or chat..", "_txcwsc1"), !0, !0);
          }
        }).catch(function (e) {
          setStatus(Aicb.translate.get("Oops!! Something went wrong. Try again!!", "_txcwsc2"), !0, !0);

          if (mrAssistantObj.dev === "on") {
            console.info(e);
          }
        });
      }
    }

    function execute() {
      firebase.auth().onAuthStateChanged(function (user) {
        lastMessage = "";

        if (user) {
          firebase.database().ref("settings").once("value", function (snap) {
            var val = snap.val();

            if (val) {
              settings = Object.assign({}, val);
            }
          }).then(function () {
            chatting(user, "go");

            _checkAuthState(user);

            _conversationInit(user);

            Aicb.translate.execute();
          }).then(function () {
            setTimeout(function () {
              loadMessages(user);
            }, 1000);
          });
        } else {
          firebase.database().ref("settings").once("value", function (snap) {
            try {
              settings = Object.assign({}, snap.val());
              var config = Object.assign({}, settings.configuration ? settings.configuration : {});

              if (config.chatWay) {
                switch (config.chatWay) {
                  case "chatWithVisitor":
                    Aicb.form.surveyForm("signUp");
                    break;

                  case "chatAnonymously":
                    signInAnonymously(config.uniqueAnonymous);
                    break;

                  case "chatWithEmail":
                    Aicb.form.surveyForm("signUp");
                    break;

                  case "chatOffline":
                    addUserToScript({});
                    chatting(user, "offline");
                    break;

                  default:
                    Aicb.form.surveyForm("signUp");
                    break;
                }
              }

              Aicb.translate.execute();
            } catch (e) {
              setStatus(Aicb.translate.get("Oops!! Something went wrong. Try again!!", "_txcwsc2"), !0, !0);

              if (mrAssistantObj.dev === "on") {
                console.info(e);
              }
            }
          });
        }

        __settingsInit();
      });
    }

    return {
      execute: execute,
      clear: clear,
      _conversationInit: _conversationInit,
      notification: notification,
      setMessages: setMessages,
      chatUsers: chatUsers
    };
  }();

  WPAI_Chat.prototype.init = function () {
    "use strict";

    var settings = {};
    var tempMeg = 0;

    function flyMessage() {
      var alc_chatbot = document.querySelector(".alc_chatbot");

      if (!alc_chatbot) {
        return;
      }

      var ls = localStorage.getItem("mrAssistantFlyMeg");
      var dom = localStorage.getItem("mrAssistantDom");

      if (dom === "expend") {
        chat_start();
      } else if (!ls || ls !== "seen") {
        if (mrAssistantObj.hasOwnProperty("intro")) {
          var val = mrAssistantObj.intro;
          var mr = settings && settings.hasOwnProperty("name") ? settings.name : "Mr. Assistant";
          var avatar = settings && settings.hasOwnProperty("avatar") ? settings.avatar : "";
          var defAvatar = mrAssistantObj && mrAssistantObj.hasOwnProperty("plugin_url") ? mrAssistantObj.plugin_url + "assets/images/mr-assistant.svg" : "";
          var avatar2 = avatar !== "" && Aicb.common.isValidURL(avatar) ? avatar : defAvatar;
          var box_width = mrAssistantObj.hasOwnProperty("intro_box_width") ? mrAssistantObj.intro_box_width : 360;

          if (val !== "") {
            var node = document.createElement("DIV");
            node.setAttribute("class", "introMessage");
            node.setAttribute("style", "width: " + box_width + "px");
            node.innerHTML = Aicb.template.flyTemplate(val, mr, avatar2);
            alc_chatbot.appendChild(node);
            var iframe = window.frameElement;
            iframe.style.width = "430px";

            if (iframe.style.height !== "100vh") {
              iframe.style.height = "296px";
            }

            var box = document.querySelector(".message-container");

            if (box) {
              box.addEventListener("click", chat_start);
            }

            var close_fly = document.querySelector(".close-introMessage");

            if (close_fly) {
              close_fly.addEventListener("click", function (e) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                var intro = document.querySelector(".introMessage");

                if (intro) {
                  intro.remove();
                }

                iframe.style.width = "112px";
                iframe.style.height = "140px";
                localStorage.setItem("mrAssistantFlyMeg", "seen");
              });
            }

            var iStart = document.querySelector(".intro-start-btn");

            if (iStart) {
              iStart.addEventListener("click", function (e) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                chat_start();
              });
            }

            Aicb.translate.execute();
          }
        }
      }
    }

    function menu_expend() {
      var cb_info = document.querySelector(".cb_info");
      var mr_menus = document.querySelector(".mr_menus");
      var ex = document.querySelector(".cb_expend");
      var message_form = document.querySelector("#message-form");
      var cbMessages = document.querySelector("#cbMessages");
      var cb_message_info = document.querySelector(".cb_message_info");

      if (ex) {
        ex.addEventListener("click", function (e) {
          e.preventDefault();

          if (cb_info) {
            cb_info.style.display = "block";
          }

          if (mr_menus) {
            mr_menus.style.display = "block";
          }

          if (ex) {
            ex.style.display = "none";
          }
        });
      }

      if (message_form) {
        message_form.addEventListener("click", function (e) {
          if (cb_info) {
            cb_info.style.display = "none";
          }

          if (ex) {
            ex.style.display = "block";
          }

          if (cb_message_info) {
            cb_message_info.style.display = "none";
          }

          if (mr_menus) {
            mr_menus.style.display = "none";
          }

          if (cbMessages) {
            cbMessages.style.display = "block";
          }
        });
      }
    }

    function mrBotMenuEvent(e) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      var key = e.target.parentNode.dataset.key;
      var popup = document.querySelector(".alc_pop_box");
      var iframe = window.frameElement;

      if (key) {
        firebase.database().ref().child("/menus/").child(key).once("value").then(function (snap) {
          var val = snap.val();
          var introMessage = document.querySelector(".introMessage");

          if (introMessage) {
            introMessage.remove();
          }

          iframe.style.width = "100%";
          iframe.style.height = "100vh";
          popup.innerHTML = Aicb.common.loaderText();
          popup.innerHTML = Aicb.template.menuView("menu", val);
        }).then(function () {
          var close_btn = document.querySelector(".close_btn");

          if (close_btn) {
            close_btn.addEventListener("click", function (e) {
              e.preventDefault();
              e.stopPropagation();
              e.stopImmediatePropagation();
              popup.innerHTML = "";
              iframe.style.width = "430px";
              iframe.style.height = "100vh";
            }, !0);
          }
        });
      }
    }

    function notificationExecution(e) {
      var type = e.target.dataset.type;
      var action = e.target.dataset.action;

      if (type === "redirect") {
        var url = new URL(action);
        var win = window.open(action, "_blank");

        if (!win || win.closed || typeof win.closed == "undefined") {
          Aicb.conn.notification(Aicb.translate.get("Pop-up Blocked.", "_txcwrn2"));
        } else {
          return win.focus();
        }
      }
    }

    function mrMenuExecute(e) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      Aicb.common.mrLoader(!0);
      var aisNode = document.createElement("DIV");
      var mr_target = document.querySelector("#cbBotMessages");
      var defMenu = mrAssistantObj.plugin_url + "assets/images/menu.svg";

      var getMenuIcon = function getMenuIcon(icon) {
        if (Aicb.common.isValidURL(icon)) {
          return "<img src=\"".concat(icon, "\"/>");
        } else {
          var span = icon.match(/<span[^>]*>[^>]*<\/span>/g);

          if (span && span[0]) {
            return span[0];
          }

          return "<img src=\"".concat(defMenu, "\"/>");
        }
      };

      firebase.database().ref().child("/menus/").once("value").then(function (snap) {
        aisNode.setAttribute("class", "viewCart");
        var body = "";
        var val = snap.val();
        var header = "<div class=\"cart-header theme\"><div class=\"cart-title\">".concat(Aicb.translate.get("My Menu", "_txcwMenu1"), "</div>") + "<span class=\"close-cart-view\">X</span></div>";
        body += header;

        if (val) {
          var cartBody = "";
          var count = 1;
          var key;

          for (key in val) {
            if (val.hasOwnProperty(key)) {
              var menuIcon = val[key].menuUrl || defMenu;
              cartBody += "<li class=\"mr-menu-item\" data-key=\"".concat(val[key].menuID, "\">").concat(getMenuIcon(val[key].menuUrl), "<h4 class=\"menu-title\">").concat(val[key].menuName, "</h4></li>");
            }
          }

          body += "<ul class=\"menu-list\">";
          body += cartBody;
          body += "</ul>";
        } else {
          body += "<div>".concat(Aicb.translate.get("No Menu", "_txcwMenu1"), "</div>");
        }

        aisNode.innerHTML = body;
      }).then(function () {
        var viewBox = document.querySelectorAll(".viewCart");

        if (viewBox) {
          viewBox.forEach(function (ele) {
            ele.remove();
          });
        }

        var box = document.querySelector("#cbMessages");
        box.append(aisNode);
        mr_target.querySelectorAll(".mr-loader").forEach(function (ele) {
          ele.style.display = "none";
        });
        var scroll = document.getElementById("cbMessages");

        if (scroll && scroll.childNodes.length > 2) {
          scroll.scrollIntoView({
            behavior: "smooth",
            block: "end"
          });
        }

        var close = document.querySelector(".viewCart .close-cart-view");

        if (close) {
          close.addEventListener("click", function (e) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            var viewBox2 = document.querySelectorAll(".viewCart");

            if (viewBox2) {
              viewBox2.forEach(function (ele) {
                return ele.remove();
              });
            }
          }, !0);
        }
      }).then(function () {
        var menus = document.querySelectorAll(".menu-list .mr-menu-item");

        if (menus) {
          menus.forEach(function (ele) {
            return ele.addEventListener("click", mrBotMenuEvent, !0);
          });
        }
      });
      Aicb.common.mrLoader(!1);
      Aicb.common.typeLoader(!1);
    }

    function popMessage() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      Aicb.common.mrLoader(!0);
      var aisNode = document.createElement("DIV");
      var mr_target = document.querySelector("#cbBotMessages");
      new Promise(function (resolve, reject) {
        aisNode.setAttribute("class", "viewCart");
        var body = "";
        var val = data;

        if (val && val.hasOwnProperty("content")) {
          var header = "<div class=\"cart-header theme\"><div class=\"cart-title\">".concat(val.title && val.title !== "" ? val.title : "Message", "</div>\n                    <span class=\"close-cart-view\">X</span></div>");
          body += header;
          body += "<div class=\"help-content\"><p>";
          body += val.content && val.content !== "" ? val.content : "";
          body += "</p>";
          var buttonText = val.button && val.button !== "" ? val.button : "";
          var buttonAction = val.action && val.action !== "" ? val.action : "";
          var buttonType = val.type && val.type !== "" ? val.type : "";

          if (buttonText !== "") {
            body += "<div class=\"ex_button theme\" data-type=\"".concat(buttonType, "\" data-action=\"").concat(buttonAction, "\">").concat(buttonText || "Click here", "</div>");
          }

          body += "</div>";
        } else {
          body += "<div></div>";
        }

        aisNode.innerHTML = body;
        resolve(1);
      }).then(function () {
        var viewBox = document.querySelectorAll(".viewCart");

        if (viewBox) {
          viewBox.forEach(function (ele) {
            return ele.remove();
          });
        }

        var box = document.querySelector("#cbMessages");
        box.append(aisNode);
        mr_target.querySelectorAll(".mr-loader").forEach(function (ele) {
          return ele.style.display = "none";
        });
        var scroll = document.getElementById("cbMessages");

        if (scroll) {
          scroll.scrollIntoView({
            behavior: "smooth",
            block: "end"
          });
        }

        var ex_button = document.querySelector(".viewCart .ex_button");
        console.log(ex_button);

        if (ex_button) {
          ex_button.addEventListener("click", notificationExecution, !0);
        }

        var close = document.querySelector(".viewCart .close-cart-view");

        if (close) {
          close.addEventListener("click", function (e) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            var viewBox2 = document.querySelectorAll(".viewCart");

            if (viewBox2) {
              viewBox2.forEach(function (ele) {
                return ele.remove();
              });
            }
          }, !0);
        }
      }).then(function () {
        var menus = document.querySelectorAll(".menu-list .mr-menu-item");

        if (menus) {
          menus.forEach(function (ele) {
            return ele.addEventListener("click", mrBotMenuEvent, !0);
          });
        }

        Aicb.common.mrLoader(!1);
        Aicb.common.typeLoader(!1);
      });
    }

    function mrHelpMenuExecute(e) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
      }

      Aicb.common.mrLoader(!0);
      var aisNode = document.createElement("DIV");
      var mr_target = document.querySelector("#cbBotMessages");
      firebase.database().ref().child("/help/").once("value").then(function (snap) {
        aisNode.setAttribute("class", "viewCart");
        var body = "";
        var val = snap.val();

        if (val && val.hasOwnProperty("helpContent")) {
          var header = "<div class=\"cart-header theme\"><div class=\"cart-title\">".concat(val.helpTitle && val.helpTitle !== "" ? val.helpTitle : "Help", "</div><span class=\"close-cart-view\">X</span></div>");
          body += header;
          body += "<div class=\"help-content\">";
          body += val.helpContent && val.helpContent !== "" ? val.helpContent : "";
          body += "</div>";
        } else {
          body += "<div></div>";
        }

        aisNode.innerHTML = body;
      }).then(function () {
        var viewBox3 = document.querySelectorAll(".viewCart");

        if (viewBox3) {
          viewBox3.forEach(function (ele) {
            return ele.remove();
          });
        }

        var box = document.querySelector("#cbMessages");
        box.append(aisNode);
        mr_target.querySelectorAll(".mr-loader").forEach(function (ele) {
          return ele.style.display = "none";
        });
        var scroll = document.getElementById("cbMessages");

        if (scroll) {
          scroll.scrollIntoView({
            behavior: "smooth",
            block: "end"
          });
        }

        var close = document.querySelector(".viewCart .close-cart-view");

        if (close) {
          close.addEventListener("click", function (e) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            var viewBox = document.querySelectorAll(".viewCart");

            if (viewBox) {
              viewBox.forEach(function (ele) {
                return ele.remove();
              });
            }
          }, !0);
        }
      }).then(function () {
        var menus = document.querySelectorAll(".menu-list .mr-menu-item");

        if (menus) {
          menus.forEach(function (ele) {
            return ele.addEventListener("click", mrBotMenuEvent, !0);
          });
        }
      });
      Aicb.common.mrLoader(!1);
      Aicb.common.typeLoader(!1);
    }

    function menu_event() {
      firebase.auth().onAuthStateChanged(function (user) {
        var mr_menus = document.querySelector(".mr_menus");
        var cb_bot = document.querySelector(".cb_bot");
        var cart_count = document.querySelector(".mr-cart-count");
        var cb_info = document.querySelector(".cb_info");

        if (cb_info) {
          cb_info.addEventListener("click", mrHelpMenuExecute, !0);
        }

        if (mr_menus) {
          mr_menus.addEventListener("click", mrMenuExecute, !0);
        }

        if (cb_bot) {
          cb_bot.addEventListener("click", function (e) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            var action = cb_bot.dataset.action;
            var bot = {};
            var line = document.querySelector(".bot-line");

            if (action === "pulse") {
              cb_bot.dataset.action = "running";
              cb_bot.classList.remove("bot-pulse");
              bot.status = "active";

              if (line) {
                line.style.display = "none";
              }
            } else {
              cb_bot.dataset.action = "pulse";
              cb_bot.classList.add("bot-pulse");
              bot.status = "pulse";

              if (line) {
                line.style.display = "inline";
              }
            }

            if (user != null) {
              var ref = firebase.database().ref("clients").child(user.uid);
              ref.child("conversation").child("mr-assistant").update(bot);
              ref.child("settings").update(bot);
            }
          });
        }
      });
    }

    function detectMobile() {
      var bot = document.body;
      var mobile = ["Android", "webOS", "iPhone", "iPad", "iPod", "BlackBerry", "Windows Phone"];

      if (mobile.some(function (mob) {
        return navigator.userAgent.match(new RegExp(mob, "i"));
      })) {
        bot.classList.remove("desktop");
        bot.classList.add("mobile");
        var iframe = window.frameElement;
        iframe.style.width = "100%";
        return !0;
      } else {
        bot.classList.remove("mobile");
        bot.classList.add("desktop");
        return !1;
      }
    }

    function setEvent() {
      var alc_chatbot = document.querySelector(".alc_chatbot");
      var close_chat = document.querySelector(".close-chat");
      var iframe = window.frameElement;
      iframe.style.width = "430px";
      iframe.style.height = "100vh";
      var introMessage = document.querySelectorAll(".tempBox");

      if (introMessage) {
        introMessage.forEach(function (ele) {
          return ele.remove();
        });
      }

      if (close_chat) {
        close_chat.addEventListener("click", function (e) {
          var alc_chat = document.querySelector("#alc_chat");

          if (alc_chatbot && alc_chat) {
            alc_chat.remove();
            iframe.style.width = "112px";
            iframe.style.height = "140px";
          }

          var introMessage2 = document.querySelector(".introMessage");

          if (introMessage2) {
            introMessage2.remove();
          }

          var popup = document.querySelector(".alc_pop_box");

          if (popup) {
            popup.innerHTML = "";
          }

          localStorage.setItem("mrAssistantDom", "close");
          Aicb.common.setCookie("mrAssistantDom", "close", {
            "path": document.location.pathname
          });
          Aicb.conn.clear();
        });
      }
    }

    function initializedChat() {
      setEvent();
      menu_expend();
      menu_event();
      optionsDropdown();
    }

    function optionsDropdown() {
      var mr_dropdown_btn = document.querySelector(".mr-dropdown-btn");
      mr_dropdown_btn.addEventListener("click", function (e) {
        var mr_dropdown = document.querySelector(".mr-dropdown");
        mr_dropdown.style.display = mr_dropdown.style.display === "none" ? "" : "none";
      });
    }

    function setTempChat(data) {
      if (data.type !== "admin") {
        return;
      }

      if (Date.now() - data.time < 2000) {
        var tempBox = document.querySelector(".tempBox");
        var introMessage = document.querySelector(".introMessage");

        if (introMessage) {
          introMessage.remove();
        }

        if (tempBox) {
          tempBox.style.display = "inline-flex";
          var mBox = document.createElement("DIV");
          var mBox2 = document.createElement("DIV");
          mBox.setAttribute("class", "tempMessages");
          mBox2.setAttribute("class", "tempMessage theme");

          if (!!settings.appearance && !!settings.appearance.theme) {
            mBox2.setAttribute("style", "background: " + settings.appearance.theme || "");
          }

          mBox2.innerHTML = data.text;
          mBox.appendChild(mBox2);
          tempBox.prepend(mBox);
          var scroll = document.querySelector(".tempBox");

          if (scroll) {
            scroll.scrollIntoView({
              behavior: "smooth",
              block: "end"
            });
          }
        }
      }
    }

    function browsesHistory(user) {
      if (!user) {
        return;
      }

      var path = Aicb.common.getUrlPath();
      var previousPath = localStorage.getItem("mrCurrentPage");
      var data = {};

      if (previousPath !== path) {
        firebase.database().ref("browses").child(user.uid).push({
          "page": path,
          "time": Date.now()
        });
        data.currentPage = path;
        localStorage.setItem("mrCurrentPage", path);
      }

      data.lastSeen = Date.now();
      firebase.database().ref("clients").child(user.uid).child("info").update(data);
    }

    function chatWithVisitor() {
      firebase.auth().onAuthStateChanged(function (user) {
        if (!user) {
          firebase.database().ref("settings").child("configuration").on("value", function (snap) {
            var config = snap.val();

            if (config.chatWay === "chatWithVisitors" && !!config.chatWithVisitor) {
              firebase.database().ref("actions").child("onlineVisitors").once("value", function (online) {
                var timeOut = online.val();
                var lastSync = Aicb.common.timeAgo(timeOut.lastSync, "min");
                var method = config.chatWithVisitorWay;

                if (!!config.offlineTracking || lastSync <= 30) {
                  var ann = "Visitor " + Aicb.common.getRandomInt(1000, 9999);
                  var info = {
                    "name": ann,
                    "email": "",
                    "isNewUser": !1,
                    "marge": !1,
                    "lastSeen": Date.now(),
                    "method": method,
                    "type": "visitorChat",
                    "chatWay": "chatWithVisitor",
                    "join": Date.now(),
                    "status": "active",
                    "currentPage": window.location.href,
                    "browser": Aicb.common.getBrowser(),
                    "language": navigator.language,
                    "platform": navigator.platform
                  };

                  if (method === "anonymousAuth") {
                    if (lastSync <= 30) {
                      firebase.auth().signInAnonymously().then(function (snap) {
                        var user = snap.user;

                        if (user) {
                          info.guid = "";
                          info.uid = user.uid;
                          info.vChat = "initialized";
                          firebase.database().ref("visitors").child(user.uid).update(info);
                          firebase.database().ref("clients").child(user.uid).child("info").update(info);
                          firebase.database().ref("actions/onlineVisitors/unSeen").transaction(function (visitor) {
                            return (visitor || 0) + 1;
                          });
                        }
                      }).catch(function (e) {
                        if (mrAssistantObj.dev === "on") {
                          console.info(e);
                        }
                      });
                    }
                  } else if (method === "anonymousGuidAuth") {
                    var getGUID = Aicb.common.localDB("mrAssistantGUID", "get");
                    var visitor = Aicb.common.jsonParse(getGUID[0]);

                    if (!getGUID[0] || !getGUID[0].guid) {
                      var guid = Aicb.common.generateGUID();
                      var name = "Visitor " + Aicb.common.getRandomInt(1000, 9999);
                      Aicb.common.localDB("mrAssistantGUID", "set", {
                        "guid": guid,
                        "visitor": name,
                        "join": Date.now()
                      }, !0);
                      info.name = name;
                      info.join = Date.now();
                      info.guid = guid;
                      info.uid = "";
                      info.status = "justJoin";
                      firebase.database().ref("visitors").child(guid).once("value", function (snap) {
                        if (!snap.key) {
                          firebase.database().ref("actions/onlineVisitors/unSeen").transaction(function (visitor) {
                            return (visitor || 0) + 1;
                          });
                        }
                      });
                      firebase.database().ref("visitors").child(guid).update(info);
                    }

                    var getGUID2 = Aicb.common.localDB("mrAssistantGUID", "get");

                    if (getGUID2[0] && getGUID2[0].guid) {
                      info.name = getGUID2[0].visitor;
                      firebase.database().ref("visitors").child(getGUID2[0].guid).update(info);
                      firebase.database().ref("actions").child("visitorSignUp").child(getGUID2[0].guid).on("value", function (snap) {
                        var data = snap.val();

                        if (data) {
                          var _lastSync = Aicb.common.timeAgo(data.lastSync, "min");

                          if (data.guid === getGUID2[0].guid && _lastSync <= 2) {
                            firebase.auth().signInAnonymously().then(function (snap) {
                              var user = snap.user;

                              if (user) {
                                info.guid = getGUID2[0].guid;
                                info.uid = user.uid;
                                info.join = getGUID2[0].join || Date.now();
                                info.method = method;
                                firebase.database().ref("clients").child(user.uid).child("info").update(info).then(function () {
                                  Aicb.conn._conversationInit(user);
                                });
                              }
                            }).then(function () {
                              info.vChat = "initialized";
                              firebase.database().ref("visitors").child(getGUID2[0].guid).update(info);
                            }).then(function () {
                              firebase.database().ref("actions").child("visitorSignUp").child(getGUID2[0].guid).remove();
                            }).catch(function (e) {
                              if (mrAssistantObj.dev === "on") {
                                console.info(e);
                              }
                            });
                          }
                        }
                      });
                    }
                  }
                }
              });
            }
          });
        } else if (user && user.uid) {
          browsesHistory(user);
          firebase.database().ref("livechat").child(user.uid).limitToLast(1).on("child_added", function (snap) {
            var data = snap.val();
            var chatFrame = localStorage.getItem("mrAssistantDom");
            var frame = Aicb.common.getCookie("mrAssistantDom", {
              "path": document.location.pathname
            });

            if (frame !== "expend") {
              var container = document.querySelector(".alc_chatbot");

              if (container) {
                var iframe = window.frameElement;
                iframe.style.width = "430px";
                iframe.style.height = "60vh";
                var tempBox = document.querySelector(".tempBox");

                if (!tempBox) {
                  var box = document.createElement("DIV");
                  box.setAttribute("class", "chat tempBox");
                  container.appendChild(box);
                }

                setTempChat(data);
                tempMeg = 1;
              }
            }
          });
        }
      });
    }

    function chat_start() {
      return new Promise(function (res, rej) {
        var alc_chatbot = document.querySelector(".alc_chatbot");

        if (!alc_chatbot) {
          return;
        }

        var close_chat = document.querySelector(".close-chat");

        if (!close_chat) {
          var node = document.createElement("DIV");
          node.setAttribute("class", "chat");
          node.setAttribute("id", "alc_chat");
          node.innerHTML = Aicb.template.chatTemplate();
          alc_chatbot.appendChild(node);
        }

        res(initializedChat());
      }).then(function () {
        var chat = new WPAI_Chat();

        if (chat.conn) {
          chat.conn.execute();
        }

        localStorage.setItem("mrAssistantDom", "expend");
        Aicb.common.setCookie("mrAssistantDom", "expend", {
          "path": document.location.pathname
        });
        document.body.className = document.body.className.replace("no-js", "js");
      });
    }

    function addCustomStyle() {
      var mr_custom_style = document.getElementById("mr_custom_style");

      if (Aicb.common.isset(mrAssistantObj) && mr_custom_style) {
        var css = "";

        if (mrAssistantObj.hasOwnProperty("chat_bg") && Aicb.common.isValidURL(mrAssistantObj.chat_bg)) {
          css += "#cbBotMessages{background: transparent url(".concat(mrAssistantObj.chat_bg, ") center top no-repeat;background-size: cover;}");
        }

        mr_custom_style.innerHTML = css;
      }
    }

    function addObjToScript(srt) {
      var sc = document.getElementById("mr_config_script");
      var obj = {};

      if (sc && srt) {
        obj.configuration = srt.hasOwnProperty("configuration") ? srt.configuration : {};
        sc.innerHTML = "let mrAssets =" + JSON.stringify(obj);
      }
    }

    function addTranslation() {
      firebase.database().ref("translation").child("chatWidget").once("value", function (snap) {
        var trans = snap.val();

        if (trans) {
          var sc = document.getElementById("mr_trans_config");

          if (sc) {
            sc.innerHTML = "let mrTrans =" + JSON.stringify(trans);
          }
        }
      }).catch(function (e) {
        if (mrAssistantObj.dev === "on") {
          console.info(e);
        }
      });
    }

    function initChat(config) {
      var singleView = "<div class=\"alc_popup\"><div class=\"alc_pop_box\"></div></div>";
      var container = ["<div class=\"alc_chatbot\">".concat(singleView, "</div>")].join("\n");
      var div = document.createElement("DIV");
      div.setAttribute("class", "mr-assistant-container");
      div.innerHTML = container;
      document.body.prepend(div);
      setTimeout(function (e) {
        var iframe = window.frameElement;
        iframe.style.opacity = 1;
      }, 1000);
    }

    function firebaseInitPublic() {
      addCustomStyle();

      if (!mrAssistantObj.hasOwnProperty('web_api_key') || !mrAssistantObj.hasOwnProperty('project_id')) {
        if (mrAssistantObj.dev === "on") {
          console.info('Oops!!! Wrong Configuration.');
        }

        return;
      }

      if (!mrAssistantObj.web_api_key === "" || !mrAssistantObj.project_id === "") {
        if (mrAssistantObj.dev === "on") {
          console.info('Oops!!! Wrong Configuration.');
        }

        return;
      }

      if (!firebase.apps.length) {
        var config = {
          apiKey: mrAssistantObj.web_api_key,
          authDomain: mrAssistantObj.project_id + ".firebaseapp.com",
          databaseURL: "https://" + mrAssistantObj.project_id + ".firebaseio.com",
          storageBucket: mrAssistantObj.project_id + ".appspot.com"
        };
        firebase.initializeApp(config);
      }

      if (firebase.apps.length) {
        settings = Object.assign({}, mrAssistantObj);
        firebase.database().ref("settings").once("value", function (snap) {
          if (!snap.val()) {
            return;
          }

          detectMobile();
          settings = Object.assign({}, settings, snap.val());

          if (settings.hasOwnProperty("configuration")) {
            if (!settings.configuration.assistantSupport) {
              return;
            }
          }

          initChat(settings);
          addObjToScript(settings);
          addTranslation();
          flyMessage();
        }).then(function () {
          var alc_start = document.querySelector(".alc_start");

          if (alc_start) {
            alc_start.addEventListener("click", chat_start, !0);
          }

          chatWithVisitor();
          var chat_icon = document.querySelector(".mr-chat-icon");

          if (chat_icon) {
            var custom_icon = mrAssistantObj.chat_icon ? mrAssistantObj.chat_icon : "";
            var df_icon = mrAssistantObj.plugin_url + 'assets/images/chat-button.svg';
            var ChatImgId = Math.floor(Math.random() * 92992343 + 1);
            chat_icon.setAttribute("id", "mrImg-" + ChatImgId);
            Aicb.common.image(ChatImgId, custom_icon, df_icon, "imgSrc");
          }
        }).catch(function (e) {
          if (mrAssistantObj.dev === "on") {
            console.info(e);
          }
        });
      }
    }

    return {
      execute: firebaseInitPublic,
      settings: settings,
      mrHelpMenuExecute: mrHelpMenuExecute,
      popMessage: popMessage,
      chatWithVisitor: chatWithVisitor,
      chat_start: chat_start
    };
  }();

  WPAI_Chat.prototype.translate = function () {
    "use strict";

    function get(text, key) {
      if (mrTrans) {
        if (key && mrTrans.hasOwnProperty(key) && mrTrans[key].hasOwnProperty("tx1") && mrTrans[key].tx1 !== "") {
          return mrTrans[key].hasOwnProperty("tx2") && mrTrans[key].tx2 !== "" ? mrTrans[key].tx2 : text;
        } else {
          var user = firebase.auth().currentUser;

          if (user) {
            var tx = {
              "tx1": text,
              "tx2": text
            };
            firebase.database().ref('translation').child("chatWidget").child(key).update(tx);
          }
        }
      }

      return text;
    }

    function execute() {
      var user = firebase.auth().currentUser;

      if (!user) {
        return;
      }

      var mrtx = document.querySelectorAll(".mrtx");

      if (mrtx) {
        firebase.database().ref("translation").child("chatWidget").once("value", function (snap) {
          var val = snap.val() || {};

          if (val || !val) {
            var sc = document.getElementById("mr_trans_config");

            if (sc) {
              sc.innerHTML = "let mrTrans =" + JSON.stringify(val);
            }

            mrtx.forEach(function (ele) {
              var text = ele.innerText,
                  key = ele.dataset.key;

              if (val.hasOwnProperty(key) && val[key].hasOwnProperty("tx1") && val[key].tx1 !== "") {
                ele.innerText = val[key].hasOwnProperty("tx2") && val[key].tx2 !== "" ? val[key].tx2 : text;
              } else {
                var tx = {
                  "tx1": text,
                  "tx2": text
                };
                firebase.database().ref('translation').child("chatWidget").child(key).update(tx);
              }
            });
          }
        }).catch(function (e) {
          if (mrAssistantObj.dev === "on") {
            console.info(e);
          }
        });
      }
    }

    return {
      execute: execute,
      get: get
    };
  }();

  WPAI_Chat.prototype.searchEngine = function (type) {
    "use strict";

    var settings = {};
    var accessToken;
    var in0;
    var t0;
    var notFoundSuggest = 0;
    var knowledgeDB = {};
    var knowledgeDBLength = 0;
    var setTime = 1000;
    var botMessage = "";
    var mrRepo = 0;
    var actionType = "search";

    function getUserId() {
      return firebase.auth().currentUser && firebase.auth().currentUser.uid;
    }

    function getRandomAns(obj) {
      var arr = Object.values(obj);

      if (arr && arr.length > 0) {
        return arr[Math.floor(Math.random() * arr.length)];
      }

      return "";
    }

    function pipeMessage(template, data, token, token2) {
      var session = Aicb.common.getCookie("mrRobotSession");

      if (token2 !== accessToken) {
        return;
      }

      if (template === "kb") {
        saveMessage(data, "bot", token);
      } else if (template === "rel") {
        Aicb.common.typeLoader(!0);
        var mr_tags = document.querySelectorAll(".mr-tags");

        if (mr_tags) {
          mr_tags.forEach(function (ele) {
            return ele.remove();
          });
        }

        var node = document.createElement("DIV");
        node.setAttribute("class", "mr-tags");
        var tags = "";
        data.forEach(function (ele) {
          var span = document.createElement("SPAN");
          span.setAttribute("class", "tag fade theme");
          span.setAttribute("data-key", ele.key);
          span.innerText = ele.val;
          span.addEventListener("click", mr_suggestion_execute, !0);
          node.appendChild(span);
        });
        var cbMessages = document.getElementById("cbMessages");
        Aicb.common.playSound("au-message");
        Aicb.common.typeLoader(!1);

        if (cbMessages) {
          cbMessages.appendChild(node);
        }
      }

      var cbMessages2 = document.getElementById("cbMessages");

      if (cbMessages2) {
        cbMessages2.scrollIntoView({
          behavior: "smooth",
          block: "end"
        });
      }
    }

    function openURL(url, question) {
      try {
        var url2 = new URL(url);
        Aicb.init.popMessage({
          "title": Aicb.translate.get("Page Suggestion", "_txcwpm1"),
          "content": Aicb.translate.get("Click this button to open this page.", "_txcwpm2") + "<p>" + url + "</p>",
          "type": "redirect",
          "button": Aicb.translate.get("Open Page", "_txcwpm3"),
          "action": url
        });
        var win = window.open(url2, "_blank");

        if (!win || win.closed || typeof win.closed == "undefined") {
          Aicb.conn.notification(Aicb.translate.get("Pop-up Blocked. Click this button to open this page.", "_txcwrn1"));
        } else {
          return win.focus();
        }
      } catch (e) {
        firebase.database().ref("training").push({
          "uid": getUserId(),
          "time": Date.now(),
          "type": "URL",
          "sts": 1,
          "qs": "KB action fail. KB: " + question
        });
      }
    }

    function nextAction(data) {
      actionType = "search";

      if (!data.hasOwnProperty("ans") || data.ans === "") {
        Aicb.common.typeLoader(!1);
      }

      if (data.type === "kb") {
        actionType = "all_KB";
        Aicb.controller.bot(data.act, {
          "kbAction": 1
        });
      } else if (data.type === "redirect") {
        if (data.act) {
          openURL(data.act, data.que);
        }
      } else if (data.type === "help") {
        var cb_info = document.querySelector(".cb_info");

        if (cb_info) {
          cb_info.click();
        }
      } else if (data.type === "menu") {
        var mr_menus = document.querySelector(".mr_menus");

        if (mr_menus) {
          mr_menus.click();
        }
      } else if (data.type === "rate") {
        Aicb.form.feedbackForm("feedback");
      }

      return "";
    }

    function mr_suggestion_execute(e) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      var sug = e.target.innerText;
      var key = e.target.dataset.key;
      saveMessage(sug, "client", accessToken);
      var token = Aicb.common.generateGUID();
      Aicb.common.setCookie("mrRobotAutoAction", 0, 5);
      Aicb.common.setCookie("mrRobotSession", token, 5);
      firebase.database().ref("knowledgeBase").child(key).once("value", function (snap) {
        var val = snap.val();

        if (val) {
          nextAction(val);
        }
      });
    }

    function detectRepeater(apiConfig) {
      if (apiConfig.hasOwnProperty("qs")) {
        if (botMessage === apiConfig.qs) {
          if (mrRepo > 4) {
            mrNotFound(apiConfig, "repo");
          }

          mrRepo += 1;
        }

        mrRepo = 0;
        botMessage = apiConfig.qs;
      }
    }

    function botResponse(type) {
      var response = [];

      if (type === "botConfusion") {
        response = [Aicb.translate.get("Just splendid, thanks", "_txcwrs1"), Aicb.translate.get("Not too shabby at all, thanks", "_txcwrs2"), Aicb.translate.get("I guess you could say I feel wired all the time. Let me know how I can help!", "_txcwrs3")];
      } else {
        response = [Aicb.translate.get("Sorry, I didn't understand.", "_txcwrs4"), Aicb.translate.get("Sorry, I don't understand.", "_txcwrs5")];
      }

      return saveMessage(response[Math.floor(Math.random() * response.length)], "bot", accessToken);
    }

    function mrNotFound(apiConfig) {
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
      notFoundSuggest += 1;

      if (mrAssets.hasOwnProperty("configuration")) {
        if (type === "repo" || notFoundSuggest > 4 && mrAssets.configuration.hasOwnProperty("botConfusion")) {
          if (mrAssets.configuration.botConfusion === "custom") {
            Aicb.controller.bot("_botConfusion", {
              "kbAction": 1,
              "botAction": "all_KB"
            });
          } else if (mrAssets.configuration.botConfusion === "system") {
            botResponse("botConfusion");
          }
        } else if (mrAssets.configuration.hasOwnProperty("notFound")) {
          if (mrAssets.configuration.notFound === "custom") {
            Aicb.controller.bot("_notFound", {
              "kbAction": 1,
              "botAction": "all_KB"
            });
          } else if (mrAssets.configuration.notFound === "system") {
            botResponse("notFound");
          }
        }

        Aicb.conn.notification("Need Help!! Type help or menu");

        if (apiConfig.hasOwnProperty("qs") && mrAssets.configuration.hasOwnProperty("detectIssues")) {
          if (firebase.auth().currentUser !== null) {
            firebase.database().ref("training").push({
              "uid": getUserId(),
              "time": Date.now(),
              "type": "notFound",
              "status": 1,
              "qs": apiConfig.qs
            });
          }
        }
      }

      return Aicb.common.typeLoader(!1);
    }

    async function knowledgeBaseSearch(str, token) {
      if (token !== accessToken) {
        return [];
      }

      var mrKnowledge = elasticlunr(function (ela) {
        ela.addField("que");
        ela.addField("tag");
        ela.setRef("key");
      });

      elasticlunr.clearStopWords = function () {
        elasticlunr.stopWordFilter.stopWords = {};
      };

      elasticlunr.clearStopWords();

      elasticlunr.addStopWords = function (words) {
        if (words == null || Array.isArray(words) === !1) {
          return;
        }

        words.forEach(function (word) {
          elasticlunr.stopWordFilter.stopWords[word] = !0;
        }, this);
      };

      var label;
      var kbType = actionType;
      var query = await firebase.database().ref("knowledgeBase").orderByKey();
      return await query.once("value").then(function (snapshot) {
        var obj = snapshot.val();
        if (!obj) return [];
        knowledgeDBLength = Object.keys(obj).length;
        snapshot.forEach(function (childSnapshot) {
          var key = childSnapshot.key;
          var childData = childSnapshot.val();

          if (childData.hasOwnProperty("status") && parseInt(childData.status) > 0) {
            if (kbType === "all_KB") {
              mrKnowledge.addDoc(childData);
            } else if (childData.status === "2") {
              mrKnowledge.addDoc(childData);
            }
          }
        });
        return mrKnowledge.search(str, {
          fields: {
            que: {
              boost: 4
            },
            tag: {
              boost: 3
            }
          }
        });
      });
    }

    function knowledgeBase(apiConfig, token) {
      (async function () {
        if (token !== accessToken) return;
        var label = await knowledgeBaseSearch(apiConfig.qs, token);
        actionType = "search";

        if (_typeof(label) !== undefined && label.length > 0) {
          var interval = 1200;
          setTime = 1000;
          var accept = 3;

          if (mrAssets && mrAssets.hasOwnProperty("configuration")) {
            var mrAssetConfig = mrAssets.configuration;

            if (mrAssetConfig && mrAssetConfig.hasOwnProperty("sb_power")) {
              var sb_power = parseFloat(mrAssetConfig.sb_power);
              accept = sb_power > 0 ? sb_power : 0;
            }
          }

          if (label[0].score <= accept) {
            return mrNotFound(apiConfig);
          }

          notFoundSuggest = 0;
          detectRepeater(apiConfig);
          var answer = label[0].doc.ans ? label[0].doc.ans : {};

          if (answer && answer.constructor === Object && Object.keys(answer).length > 0) {
            pipeMessage("kb", getRandomAns(Object.values(label[0].doc.ans)[0]), "mr", token);
            setTime += 1000;
          }

          if (answer && answer.constructor === Object && Object.keys(answer).length > 1) {
            var mAns = Object.assign({}, Object.values(answer).slice(1));
            var last = Object.keys(mAns).pop();
            var i = 1;
            var token2 = "pipe";
            Object.keys(mAns).forEach(function (prop) {
              var val = mAns[prop];
              setTimeout(function () {
                pipeMessage("kb", getRandomAns(val), "ma", token);
              }, setTime + interval * Math.random());
              setTime += 1000;

              if (prop === last) {
                var rel = label[0].doc.rel;

                if (rel && rel.length > 0) {
                  setTimeout(function () {
                    pipeMessage("rel", rel, "ma", token);
                  }, setTime + interval * Math.random());
                  setTime += 1000;
                }

                if (apiConfig.type !== "kb" && label[0].doc.type !== "") {
                  try {
                    var _token = Aicb.common.getCookie("mrRobotAutoAction");

                    var count = parseInt(_token) > 0 ? parseInt(_token) : 0;
                    Aicb.common.setCookie("mrRobotAutoAction", count + 1, 5);

                    if (count < 3) {
                      setTimeout(function () {
                        nextAction(label[0].doc);
                      }, setTime + interval * Math.random());
                      setTime += 1000;
                    } else {
                      Aicb.common.setCookie("mrRobotAutoAction", 0, 5);
                    }
                  } catch (e) {
                    if (mrAssistantObj.dev === "on") {
                      console.info(e);
                    }
                  }
                }
              }
            });
          } else {
            var rel = label[0].doc.rel;

            if (rel && rel.length > 0) {
              setTimeout(function () {
                pipeMessage("rel", rel, "ma", token);
              }, setTime + interval * Math.random());
              setTime += 1000;
            }

            if (label[0].doc.act !== "") {
              try {
                var _token2 = Aicb.common.getCookie("mrRobotAutoAction");

                var count = parseInt(_token2) > 0 ? parseInt(_token2) : 0;
                Aicb.common.setCookie("mrRobotAutoAction", count + 1, 5);

                if (count < 3) {
                  setTime += 1000;
                  return nextAction(label[0].doc);
                } else {
                  Aicb.common.setCookie("mrRobotAutoAction", 0, 5);
                }
              } catch (e) {
                if (mrAssistantObj.dev === "on") {
                  console.info(e);
                }
              }
            }
          }
        } else {
          return mrNotFound(apiConfig);
        }
      })();
    }

    function saveMessage(label, type) {
      var token = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";

      if (token === "") {
        return;
      }

      var user = firebase.auth().currentUser;
      var obj = {};
      obj.type = type;
      obj.time = Date.now();
      obj.text = label;

      if (type === "bot") {
        obj.text = label;
      }

      if (user) {
        var uid = user.uid || null;

        if (Aicb.conn.chatUsers) {
          if (type === "client") {
            obj.name = Aicb.conn.chatUsers.clientName || "Anonymous";
          } else if (type === "bot") {
            obj.name = mrAssistantObj.name || "Mr. Assistant";
          }
        }

        firebase.database().ref("livechat").child(uid).push(obj);
      } else {
        Aicb.common.localDB("mrAssistantOfflineChat", "set", obj);
        Aicb.template.templateDark("offline-" + Math.floor(Math.random() * Math.floor(Date.now())), obj, "message-visitor");
      }
    }

    function execute(apiConfig, botConfig) {
      settings = Object.assign({}, botConfig);

      try {
        accessToken = Aicb.common.getCookie("mrRobotSession");
        var actions = ["master", "products", "posts", "pages", "tags", "author"];

        if (apiConfig.api === "master") {
          if (!!botConfig.kbAction) {
            if (botConfig.hasOwnProperty("botAction") && botConfig.botAction === "all_KB") {
              actionType = "all_KB";
            }

            knowledgeBase(apiConfig, accessToken);
          } else if (!!botConfig.sbAction) {
            master(apiConfig, accessToken);
          }
        } else if (actions.indexOf(apiConfig.api) !== "-1") {
          master(apiConfig, accessToken);
        }
      } catch (e) {
        if (mrAssistantObj.dev === "on") {
          console.info(e);
        }
      }

      return 0;
    }

    return {
      run: execute,
      saveMessage: saveMessage
    };
  }();

  WPAI_Chat.prototype.controller = function () {
    "use strict";

    var settings = {};

    function mrCommandLine(cmd) {
      var ac = cmd.toLowerCase();

      if (ac === "-mr allow adminchat") {
        localStorage.setItem("mrAssistantChatItself", !1);
      }
    }

    function bot(feature, botConfig) {
      settings = Object.assign({}, botConfig);
      return Aicb.searchEngine.run({
        api: "master",
        ks: "all",
        qs: feature,
        att: {}
      }, settings);
    }

    return {
      bot: bot,
      mrCommandLine: mrCommandLine
    };
  }();

  WPAI_Chat.prototype.template = function () {
    "use strict";

    var system = {};

    function _tx() {
      var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var identifier = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var mode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !0;
      return '<span class="mrtx" data-key="' + identifier + '" data-mode="' + mode + '">' + text + '</span>';
    }

    function flyTemplate(message) {
      var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Mr. Assistant';
      var avatar = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      return ['<div class="close-introMessage">', '<button type="button">', '<span class="iconify" data-icon="ion:close"></span>', '</button>', '</div>', '<div class="intro-container">', '<img src="' + avatar + '" alt="' + name + '" class="avatar i-avatar">', '<div style="margin-right: 20px;"><div class="i-avatar-name">' + name + '</div><div class="message-container">' + message + '</div>', '<div class="intro-start-btn theme"><span class="iconify" data-icon="bx:bxs-chat" data-inline="true"></span><span>&nbsp;&nbsp;' + _tx('Start Live Chat', '_txcwi1') + '</span></div>', '</div>', '</div>'].join('\n');
    }

    function chatTemplate() {
      var bot = mrAssistantObj.plugin_url + 'assets/images/mr-assistant.svg';
      var imgId = Math.floor(Math.random() * 92992343 + 1);
      var mrAvatar = bot;

      if (mrAssistantObj.hasOwnProperty("menu_avatar") && Aicb.common.isValidURL(mrAssistantObj.menu_avatar)) {
        mrAvatar = mrAssistantObj.menu_avatar;
      }

      Aicb.common.image(imgId, mrAvatar, bot, "imgSrc");
      var placeholder = "Search & Message...";

      if (mrAssistantObj.hasOwnProperty("placeholder") && mrAssistantObj.placeholder !== "") {
        placeholder = mrAssistantObj.placeholder;
      }

      var header = ['<div class="chat-header theme">', '<div class="mr-left-header">', '<div class="mr-avatars">', '<div class="mr-avatar theme"><img width="45" src="' + bot + '"/></div>', '</div>', '<h2 class="mr-live-person "><span class="mr-chat-with">' + _tx('Chat with', '_txcwh1') + ' </span>Mr. Assistant</h2>', '</div>', '<button class="close-chat material-icons" type="button">', '<span class="iconify" data-icon="ion:close"></span>', '</button>', '<button class="mr-dropdown-btn material-icons" type="button">', '<span class="iconify" data-icon="bx:bx-dots-vertical-rounded" data-inline="true"></span>', '</button>', '<div class="mr-dropdown theme" style="display: none"></div>', '<div class="mr_status_box theme">', '<span class="mr_status theme">Loading ...</span>', '</div>', '</div>'].join('\n');
      var body = ['<div id="cbBotMessages">', '<div class="loadMore theme" data-inset="20" data-step="10" style="display: none;">Load More ↻</div>', '<div id="cbMessages" class="scrollbar">', '</div>', '</div>'].join('\n');
      var footer = ['<div class="input-group">', '<div class="drag-active-wrapper">', '<button type="button" data-action="sleep" class="cb_bot material-icons">', '<span class="iconify bot-line" data-icon="uil:line-alt" style="display: none"></span>', '<span class="iconify" ><img id="mrImg-' + imgId + '" src="' + mrAvatar + '" width="30" height="30" class="theme"/></span>', '</button>', '<button type="button" class="cb_info material-icons">', '<span class="iconify" data-icon="icomoon-free:info"></span>', '</button>', '<button type="button" class="mr_menus material-icons">', '<span class="iconify" data-icon="ion:menu" data-inline="false"></span>', '</button>', '<button type="button" style="display: none" class="cb_expend iconify material-icons">', '<span class="iconify" data-icon="mdi:chevron-right"></span>', '</button>', '<div id="message-form" style="display: flex;width: 100%">', '<input id="mrCrts" type="hidden"/>', '<input id="message" placeholder="' + placeholder + '" type="text" autocomplete="off"/>', '<button  id="mr_sender" class="material-icons">', '<span class="iconify" data-icon="mdi:send"></span>', '</button>', '</div>', '</div>', '</div>'].join('\n');
      return header + body + footer;
    }

    function getAvatar(uid) {
      var def = mrAssistantObj.plugin_url + 'assets/images/boy.svg';

      try {
        if (uid !== "" && Aicb.common.isset(mrUsers) && mrUsers.hasOwnProperty(uid)) {
          var user = mrUsers[uid];

          if (user.hasOwnProperty("avatar") && user.avatar !== "") {
            return user.avatar;
          }
        }
      } catch (e) {
        if (mrAssistantObj.dev === "on") {
          console.info(e);
        }
      }

      return def;
    }

    function getName(type, uid) {
      if (type === "admin" || type === "client") {
        if (Aicb.common.isset(mrUsers) && mrUsers.hasOwnProperty(uid)) {
          var user = mrUsers[uid];
          return user && user.hasOwnProperty('name') ? user.name : "Anonymous";
        }
      }

      return mrAssistantObj && mrAssistantObj.hasOwnProperty('name') ? mrAssistantObj.name : "Mr. Assistant";
    }

    function setMessage(key, data, settings, nodeType) {
      var node = document.createElement("DIV");
      var container = document.createElement("DIV");
      container.setAttribute('class', 'meg-wrapper');
      node.setAttribute('class', 'message fade ' + (data.type !== '' ? data.type : 'bot'));
      node.setAttribute('id', 'mr' + key);
      var text = document.createElement("span");
      text.setAttribute('class', 'message-content');
      text.appendChild(document.createTextNode(data.text));
      var nam = "<p class=\"user\">".concat(data.name && data.name !== '' ? data.name : getName(data.type, data.uid || ""), "</p>");
      var cls = data.type === 'client' ? 'theme' : '';
      container.innerHTML = nam + '<span class="message-content ' + cls + '">' + data.text + '</span>';

      if (data.type !== 'bot') {
        var time = document.createElement("div");
        time.setAttribute('class', 'time');
        time.appendChild(document.createTextNode(Aicb.common.getDateTime(data.time)));

        if (node) {
          container.appendChild(time);
        }
      }

      node.append(container);
      var div = document.createElement("DIV");
      var img = document.createElement("IMG");
      img.width = 25;
      img.height = 25;
      var imgId = Math.floor(Math.random() * 92992343 + 1);
      div.setAttribute('class', 'avatar-wrapper');
      img.setAttribute('class', 'avatar');
      img.setAttribute('id', "mrImg-" + imgId);
      var defAvatar = mrAssistantObj.plugin_url + 'assets/images/mr-assistant.svg';
      var avatar = "";

      if (data.type === 'bot') {
        avatar = mrAssistantObj.hasOwnProperty('avatar') ? mrAssistantObj.avatar : '';
        img.src = avatar !== '' && Aicb.common.isValidURL(avatar) ? avatar : defAvatar;

        if (node) {
          div.append(img);
          node.prepend(div);
        }
      } else if (data.type === 'admin') {
        if (data.hasOwnProperty("avatar") && Aicb.common.isValidURL(data.avatar)) {
          avatar = data.avatar;
        } else {
          avatar = getAvatar(data.uid || '');
        }

        defAvatar = mrAssistantObj.plugin_url + 'assets/images/boy.svg';
        img.src = avatar;

        if (node) {
          div.append(img);
          node.prepend(div);
        }
      }

      var cbMessages = document.getElementById("cbMessages");

      if (!cbMessages) {
        return;
      }

      if (nodeType === 'prepend') {
        cbMessages.prepend(node);
        var scroll = document.getElementById('cbMessages');

        if (scroll) {
          scroll.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      } else {
        cbMessages.appendChild(node);
        var scroll2 = document.getElementById('cbMessages');

        if (scroll2) {
          scroll2.scrollIntoView({
            behavior: 'smooth',
            block: 'end'
          });
        }
      }

      Aicb.common.image(imgId, avatar, defAvatar, "imgSrc");
      Aicb.common.typeLoader(!1);
    }

    function templateDark(key, data, settings) {
      var nodeType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'append';
      var clientId = arguments.length > 4 ? arguments[4] : undefined;
      var client = document.getElementById('client_id');

      if (client && client.value !== clientId) {
        return '';
      }

      var node = document.getElementById('mr' + key);

      if (!node) {
        return setMessage(key, data, settings, nodeType);
      }
    }

    function setAvatar(key, agents) {
      var person = '',
          ava = '',
          count = 0,
          asset = mrAssistantObj.plugin_url + 'assets';
      var def = asset + '/images/boy.svg';
      var mrDef = asset + '/images/mr-assistant.svg';
      var mrAvatar = mrAssistantObj.hasOwnProperty("avatar") ? mrAssistantObj.avatar : mrDef;
      var mrBotName = Aicb.translate.get("Mr. Assistant", '_txcwh8');

      for (var k in agents) {
        if (agents.hasOwnProperty(k)) {
          var obj = agents[k];
          var imgId = Math.floor(Math.random() * 8299432343 + 84);
          var avatar = obj.avatar ? obj.avatar : def;

          if ("mr-assistant" === k && obj.status === 'active') {
            count++;
            var mrName = mrAssistantObj.name || mrBotName;
            person += mrName.split(/(\s).+\s/).join("") + ', ';

            try {
              var img = new Image();
              img.src = mrAvatar;
              ava += '<div class="mr-avatar theme" id="mrImg-' + imgId + '"><img width="45" src="' + mrAvatar + '"/></div>';
            } catch (e) {
              ava += '<div class="mr-avatar theme" id="mrImg-' + imgId + '"><img width="45" src="' + mrDef + '"/></div>';
            }

            Aicb.common.image(imgId, mrAvatar, mrDef, "img", 45);
          } else if (obj.type === "person" && obj.status === 'active') {
            count++;
            person += obj.name || "" + ', ';
            var avatar2 = obj.hasOwnProperty('avatar') && Aicb.common.isValidURL(obj.avatar) ? obj.avatar : def;

            try {
              var _img = new Image();

              _img.src = avatar2;
              ava += '<div class="mr-avatar theme" id="mrImg-' + imgId + '"><img width="45" src="' + avatar2 + '"/></div>';
            } catch (e) {
              ava += '<div class="mr-avatar theme" id="mrImg-' + imgId + '"><img width="45" src="' + def + '"/></div>';
            }

            Aicb.common.image(imgId, avatar2, def, "img", 45);
          }
        }
      }

      var chat = Aicb.translate.get('Chat With', '_txcwh1');

      if (count === 0) {
        chat = Aicb.translate.get("Chat With", '_txcwh6');
        person = mrBotName;

        if (agents.hasOwnProperty('mr-assistant')) {
          if (agents["mr-assistant"].status && agents["mr-assistant"].status === "pulse") {
            chat = Aicb.translate.get("Hello there!", '_txcwh9');
            person = Aicb.translate.get("I'm Mr. Assistant", '_txcwh10');
          }
        }

        var imgId1 = Math.floor(Math.random() * 8294322343 + 44);
        ava = '<div class="mr-avatar theme" id="mrImg-' + imgId1 + '"><img width="45" src="' + mrAvatar + '"/></div>';
        Aicb.common.image(imgId1, mrAvatar, mrDef, "img", 45);
        count = 1;
      }

      var operators = person.replace(/,(\s+)?$/, '');
      return ['<div class="mr-avatars mr-ava-' + count + '">' + ava + '</div >', '<h2 class="mr-live-person " title="' + operators + '"><span class="mr-chat-with">' + chat + '</span>' + operators + '</h2>'].join('\n');
    }

    function menuViewTemplate(type, data) {
      try {
        var cls = type === 'menuContext' ? "mr-single-menu-context" : "mr-single-menu",
            path = mrAssistantObj.domain + '/wp-content/uploads/',
            upload_path = mrAssistantObj.upload_dir ? mrAssistantObj.upload_dir + '/' : path;

        if (data.menuAction === 'redirectAction') {
          if (data.actionContext && data.actionContext !== '') {
            try {
              if (Aicb.common.isValidURL(data.actionContext)) {
                var url = new URL(data.actionContext);
                var win = window.open(data.actionContext, '_blank');

                if (!win || win.closed || typeof win.closed == 'undefined') {
                  Aicb.init.popMessage({
                    "title": 'Page Suggestion',
                    "content": "Click this button to open this page.",
                    "type": 'redirect',
                    "button": "Open Page",
                    "action": data.actionContext
                  });
                } else {
                  return win.focus();
                }
              }
            } catch (e) {
              if (mrAssistantObj.dev === "on") {
                console.info(e);
              }
            }
          }
        } else if (data.menuAction === 'searchAction') {
          if (data.actionContext && data.actionContext !== '') {
            Aicb.common.setCookie('mrRobotAutoAction', 0, 5);
            Aicb.common.setCookie('mrRobotSession', Aicb.common.generateGUID(), 5);
            return Aicb.controller.bot(data.actionContext, {
              "cuAction": 1,
              "kbAction": 1,
              "sbAction": 1
            });
          }
        } else if (data.menuAction === 'kb') {
          if (data.actionContext && data.actionContext !== '') {
            return Aicb.controller.bot(data.actionContext, {
              "cuAction": 0,
              "kbAction": 1,
              "sbAction": 0
            });
          }
        } else if (data.menuAction === 'help') {
          var cb_info = document.querySelector('.cb_info');
          if (cb_info) cb_info.click();
        } else if (data.menuAction === 'menu') {
          var mr_menus = document.querySelector('.mr_menus');
          if (mr_menus) mr_menus.click();
        } else if (data.menuAction === 'cart') {
          var cb_cart = document.querySelector('.cb_cart');
          if (cb_cart) cb_cart.click();
        } else if (data.menuAction === 'rate') {
          Aicb.form.feedbackForm('feedback');
        }

        Aicb.common.typeLoader(!1);

        if (data.hasOwnProperty("menuAction") && data.menuAction !== "contextAction") {
          var popup = document.querySelector(".alc_pop_box");
          var iframe = window.frameElement;

          if (popup) {
            popup.innerHTML = "";
          }

          iframe.style.width = "430px";
          iframe.style.height = "100vh";
          return "";
        }

        return ['<div class="single-item cb-shadow-1 ' + cls + '" style="display: block">', '<div class="close_btn" type="button">X</div>', '<section class="single-menu-item">', '<div class="single-menu-title" title="' + data.menuName + '">' + data.menuName + '</div>', '<div class="single-menu-description">' + data.menuContext + '</div>', '</section>', '</div>'].join('\n');
      } catch (e) {}
    }

    return {
      setAvatar: setAvatar,
      templateDark: templateDark,
      flyTemplate: flyTemplate,
      chatTemplate: chatTemplate,
      menuView: menuViewTemplate
    };
  }();

  WPAI_Chat.prototype.form = function () {
    "use strict";

    var signEvent = !1;

    function signUp() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
      var unique = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !1;
      firebase.auth().onAuthStateChanged(function (currentUser) {
        if (!signEvent) {
          return;
        }

        var chatItSelf = localStorage.getItem("mrAssistantChatItself");

        if (!currentUser && !chatItSelf) {
          var ann = "Anonymous " + Date.now().toString().substr(3);
          var userData = {
            "name": obj.name || ann,
            "email": obj.email || "",
            "gdpr": obj.hasOwnProperty("gdpr") ? obj.gdpr : 0,
            "isNewUser": !1,
            "marge": !1,
            "join": Date.now(),
            "chatWay": "SignUp",
            "method": "SignUp",
            "type": "liveChat",
            "lastSeen": Date.now(),
            "status": "active",
            "currentPage": window.location.href,
            "browser": Aicb.common.getBrowser(),
            "languages": navigator.languages.join(", "),
            "language": navigator.languages.join(","),
            "platform": navigator.platform
          };
          firebase.auth().signInAnonymously().then(function (snap) {
            signEvent = !1;
            var user = snap.user;

            if (user) {
              if (type === "survey") {
                var viewBox = document.querySelectorAll(".signUpForm");
                if (viewBox) viewBox.forEach(function (ele) {
                  return ele.remove();
                });
              }

              Aicb.conn.notification("Success!! Now you can chat or search...");
              userData.uid = user.uid;
              firebase.database().ref("clients").child(user.uid).child("info").set(userData);

              Aicb.conn._conversationInit();

              Aicb.conn.setMessages("Hello " + userData.name + "!! Thank you for Sign Up.", user, "bot");
              Aicb.controller.bot("_preChat", {
                "kbAction": 1,
                "botAction": "all_KB"
              });
            }
          }).catch(function (e) {
            if (mrAssistantObj.dev === "on") {
              console.info(e);
            }
          });
        } else if (!!chatItSelf) {
          var viewBox2 = document.querySelectorAll(".signUpForm");
          if (viewBox2) viewBox2.forEach(function (ele) {
            return ele.remove();
          });
          var errors = document.querySelector(".errors");

          if (errors) {
            errors.innerHTML = "Hello Admin!! Please log in from your admin control panel.";
          }

          Aicb.conn.setMessages("Hello Admin!! Please log in from your admin control panel.", currentUser, "bot");
          Aicb.conn.notification("Hello Admin!! Please log in from your admin control panel.");
        }
      });
    }

    function validation(data) {
      var re = /\S+@\S+\.\S+/;

      if (data.hasOwnProperty("name") && data.name.length > 2) {
        if (data.hasOwnProperty("email") && re.test(data.email)) {
          var gdpr_check = mrAssistantObj.hasOwnProperty("gdpr_check") ? mrAssistantObj.gdpr_check : "off";

          if (gdpr_check === "on") {
            if (data.hasOwnProperty("gdpr") && data.gdpr === 1) {
              return "valid";
            }

            return "Please check GDPR Compliance.";
          }

          return "valid";
        }

        return "Please add your valid email address.";
      }

      return "Name must be minimum 3 letters.";
    }

    function mrSignUp(e) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      signEvent = !0;
      setTimeout(function (e) {
        var surveyBtn = document.querySelectorAll(".mrSurveyForm .mr-survey-save");

        if (surveyBtn) {
          surveyBtn.forEach(function (ele) {
            ele.removeEventListener("click", mrSignUp, !1);
          });
        }
      }, 100);
      var obj = Aicb.common.getObject(".cbSurveyForm .mrInput");
      var sanitize = validation(obj);

      if (sanitize === "valid") {
        if (firebase.auth().currentUser !== null) {
          var uid = firebase.auth().currentUser.uid;

          if (uid) {
            firebase.database().ref("clients").child(uid).child("info").update(obj);
          }
        } else {
          if (signEvent) {
            signUp(obj, "survey");
          }
        }
      } else {
        var errors = document.querySelector(".errors");

        if (errors) {
          errors.innerHTML = sanitize;
        }

        Aicb.conn.notification(sanitize);
      }

      if (firebase.auth().currentUser !== null) {
        var viewBox = document.querySelectorAll(".signUpForm");
        if (viewBox) viewBox.forEach(function (ele) {
          return ele.remove();
        });
      }
    }

    function inputValidation(e) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      var type = e.target.dataset.action;
      var key = e.target.dataset.key;
      var val = e.target.value;

      if (type === "text") {
        if (e.target.type === "email") {
          e.target.value = val.replace(/[^\w\s.@]+/g, "");
          var re = /\S+@\S+\.\S+/;

          if (re.test(e.target.value)) {
            e.target.style.borderColor = "green";
          } else {
            e.target.style.borderColor = "red";
          }
        } else {
          e.target.value = val.replace(/[^\w\s.&-]+/g, "");

          if (e.target.value !== "") {
            e.target.style.borderColor = "green";
          } else {
            e.target.style.borderColor = "red";
          }
        }
      }
    }

    function saveFeedback(e) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      setTimeout(function (e) {
        var surveyBtn = document.querySelectorAll(".mrSurveyForm .mr-survey-save");

        if (surveyBtn) {
          surveyBtn.forEach(function (ele) {
            ele.removeEventListener("click", saveFeedback, !1);
          });
        }
      }, 100);
      var feedback = document.getElementById("feedback-input"),
          rate = document.querySelector("input[name='rate']:checked"),
          type = e.target.dataset.type;

      if (firebase.auth().currentUser !== null) {
        var currentUser = firebase.auth().currentUser;
        var uid = currentUser.uid;

        if (uid && rate.value > 0) {
          firebase.database().ref("clients").child(uid).child("info").update({
            "rate": rate.value,
            "feedback": feedback.value,
            "lastSeen": Date.now()
          }).then(function () {
            if (type === "feedbackAndSignOut") {
              var cbMessages = document.querySelector(".cbMessages");
              if (cbMessages) cbMessages.innerHTML = "";
              firebase.auth().signOut().then(function () {
                return surveyForm("signUp");
              });
            }

            Aicb.conn.notification("Thank you for your Feedback.");
            Aicb.conn.setMessages("Thank you for your Feedback.", currentUser, "bot");
            var viewBox = document.querySelectorAll(".signUpForm");
            if (viewBox) viewBox.forEach(function (ele) {
              return ele.remove();
            });
          });
        } else {
          Aicb.conn.notification("Please Rate Us!!");
        }
      }
    }

    function feedbackForm() {
      var formType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      Aicb.common.mrLoader(!0);

      if (formType === "feedbackAndSignOut") {
        Aicb.conn.notification("Please Provide your Feedback before leave chat");
      } else {
        Aicb.conn.notification("Please Rate Us or Provide Feedback:");
      }

      var img = mrAssistantObj.plugin_url + "assets/images/boy.svg";
      var survey_form = ["<div class=\"mrSurveyForm\">", "<button style=\"display:none\" class=\"sf_close_btn\" type=\"button\">X</button>", "<div class=\"cbSurveyForm \">", "<div class=\"signUpImg theme\"><img src=\"".concat(img, "\" width=\"80\"/></div>"), "<div class=\"survey-input survey_text\"><span>Please Rate Us or Provide Feedback: </span></div>", "<div class=\"rate\">", "<input type=\"radio\" id=\"mr_star5\" name=\"rate\" value=\"5\"/>", "<label for=\"mr_star5\" title=\"5 stars\">5 stars</label>", "<input type=\"radio\" id=\"mr_star4\" name=\"rate\" value=\"4\"/>", "<label for=\"mr_star4\" title=\"4 stars\">4 stars</label>", "<input type=\"radio\" id=\"mr_star3\" name=\"rate\" value=\"3\"/>", "<label for=\"mr_star3\" title=\"3 stars\">3 stars</label>", "<input type=\"radio\" id=\"mr_star2\" name=\"rate\" value=\"2\"/>", "<label for=\"mr_star2\" title=\"2 stars\">2 stars</label>", "<input type=\"radio\" id=\"mr_star1\" name=\"rate\" value=\"1\"/>", "<label for=\"mr_star1\" title=\"1 star\">1 star</label>", "</div>", "<textarea id=\"feedback-input\" placeholder=\"Type Your Feedback...\" rows=\"4\" cols=\"30\"></textarea>", "<input type=\"button\" class=\"mr-survey-save theme\" data-type=\"".concat(formType, "\" value=\"SEND FEEDBACK\"/>"), "</div>", "</div>"].join("");
      var container = document.querySelector("#cbMessages");
      var node = document.createElement("DIV");
      node.setAttribute("class", "signUpForm");
      node.innerHTML = survey_form;
      var viewBox = document.querySelectorAll(".signUpForm");
      if (viewBox) viewBox.forEach(function (ele) {
        return ele.remove();
      });
      container.appendChild(node);
      setTimeout(function (e) {
        var surveyBtn = container.querySelectorAll(".mrSurveyForm .mr-survey-save");

        if (surveyBtn) {
          surveyBtn.forEach(function (ele) {
            ele.addEventListener("click", saveFeedback, !0);
          });
        }
      }, 2000);
      Aicb.common.mrLoader(!1);
    }

    function surveyForm(f) {
      Aicb.common.mrLoader(!0);
      Aicb.conn.notification("Please introduce yourself:");
      var img = mrAssistantObj.plugin_url + "assets/images/boy.svg";
      var gdpr_check = mrAssistantObj.hasOwnProperty("gdpr_check") ? mrAssistantObj.gdpr_check : "off";
      var gdpr = mrAssistantObj.hasOwnProperty("gdpr") && mrAssistantObj.gdpr !== "" ? mrAssistantObj.gdpr : "";
      var policy = mrAssistantObj.hasOwnProperty("policy_url") && Aicb.common.isValidURL(mrAssistantObj.policy_url) ? "<a href=\"".concat(mrAssistantObj.policy_url, "\" target=\"_blank\">more</a>") : "";

      var gdprHtml = function gdprHtml() {
        if (gdpr_check === "on") {
          return "<label class=\"mrCheckBox\" for=\"gdpr\"><input required type=\"checkbox\" id=\"gdpr\" data-key=\"gdpr\" data-action=\"checkbox\" class=\"mrInput survey-input\"/>".concat(gdpr + policy, "</label>");
        }

        return "";
      };

      var survey_form = ["<div class=\"mrSurveyForm\">", "<button style=\"display:none\" class=\"sf_close_btn\" type=\"button\">X</button>", "<div class=\"cbSurveyForm \">", "<div class=\"signUpImg theme\"><img src=\"".concat(img, "\" width=\"80\"/></div>"), "<div class=\"survey-input survey_text\"><span>Please introduce yourself:</span></div>", "<input type=\"text\" data-key=\"name\" data-action=\"text\" class=\"mrInput survey-input\" placeholder=\"Type Name...\"/>", "<input type=\"email\" data-key=\"email\" data-action=\"text\" class=\"mrInput survey-input\" placeholder=\"Type Email...\"/>", gdprHtml(), "<div class=\"errors\"></div>", "<input type=\"button\" class=\"mr-survey-save theme\" value=\"Start Chat\"/>", "</div>", "</div>"].join("");
      var container = document.querySelector("#cbMessages");
      var node = document.createElement("DIV");
      node.setAttribute("class", "signUpForm");
      node.innerHTML = survey_form;
      var viewBox = document.querySelectorAll(".signUpForm");
      if (viewBox) viewBox.forEach(function (ele) {
        return ele.remove();
      });
      container.appendChild(node);
      setTimeout(function (e) {
        var surveyBtn = container.querySelectorAll(".mrSurveyForm .mr-survey-save");

        if (surveyBtn) {
          surveyBtn.forEach(function (ele) {
            ele.addEventListener("click", mrSignUp, !0);
          });
        }

        var validation = node.querySelectorAll(".cbSurveyForm .mrInput");

        if (validation) {
          validation.forEach(function (ele) {
            ele.addEventListener("input", inputValidation, !0);
          });
        }
      }, 2000);
      Aicb.common.mrLoader(!1);
    }

    return {
      signUp: signUp,
      surveyForm: surveyForm,
      feedbackForm: feedbackForm
    };
  }();

  document.addEventListener("readystatechange", function (event) {
    if (event.target.readyState === "complete") {
      var x = document.getElementsByTagName("BODY")[0].getAttribute("data-action");

      if (x === "mr-assistant-chat-bot-client") {
        var chat = new WPAI_Chat();
        chat.init.execute();
      }
    }
  });
})();