/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/public/javascripts/interactive/login.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/public/javascripts/interactive/login.js":
/*!*****************************************************!*\
  !*** ./src/public/javascripts/interactive/login.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var user = document.getElementById(\"user\"),\n    pwd = document.getElementById(\"pwd\"),\n    login = document.getElementById(\"coffeeLogin\");\ndocument.addEventListener('DOMContentLoaded', function () {\n  localStorage.removeItem(\"token\");\n\n  if (localStorage.getItem(\"remember\")) {\n    user.value = ym.init.COMPILESTR.decrypt(JSON.parse(localStorage.getItem(\"remember\")).name);\n    pwd.value = ym.init.COMPILESTR.decrypt(JSON.parse(localStorage.getItem(\"remember\")).pwd);\n    $(\"#remember\").attr(\"checked\", true);\n    $(\"label[for='remember']\").children('div').addClass('checked');\n  }\n\n  ; //box position\n\n  ym().css('box-login', {\n    'left': window.innerWidth / 2 - 250,\n    'top': window.innerHeight / 2 - 185\n  });\n  new Vue({\n    el: '#app',\n    data: function data() {\n      return {\n        remember: true\n      };\n    }\n  });\n});\n\ndocument.onkeydown = function (event) {\n  event = event ? event : window.event ? window.event : null;\n\n  if (event.keyCode == 13) {\n    login.onclick();\n  }\n\n  ;\n};\n\nlogin.onclick = function (e) {\n  ym.init.LOADING({\n    tap: login,\n    select: '正在登录',\n    style: \"position:absolute;top:\".concat(login.offsetHeight / 6, \"px;left:\").concat(login.offsetWidth / 4, \"px;\")\n  });\n\n  if (!user.value) {\n    ym.init.MBOX({\n      msg: '请输入用户名！',\n      dely: 3000,\n      redom: '.coffeeLogin',\n      resetdom: {\n        inner: '登录',\n        tag: user\n      }\n    });\n    return false;\n  }\n\n  ;\n\n  if (!pwd.value) {\n    ym.init.MBOX({\n      msg: '请输入密码！',\n      dely: 3000,\n      redom: '.coffeeLogin',\n      resetdom: {\n        inner: '登录',\n        tag: pwd\n      }\n    });\n    return false;\n  }\n\n  ; //    {adminName:user.value,adminPwd:pwd.value}   'adminName=' + user.value +\"&adminPwd=\" + pwd.value\n\n  ym.init.XML({\n    method: 'POST',\n    uri: JSON.parse(localStorage.getItem('_e')).URLS.Development_Server_ + \"admin_login\",\n    async: false,\n    xmldata: {\n      adminName: user.value,\n      adminPwd: pwd.value\n    },\n    done: function done(_e) {\n      if (_e.statusCode.status == 2000) {\n        localStorage.setItem(\"token\", JSON.stringify({\n          uname: ym.init.COMPILESTR.encryption(_e.id.toString()),\n          utoken: ym.init.COMPILESTR.encryption(_e.token)\n        }));\n\n        if ($(\"#remember\").is(\":checked\")) {\n          localStorage.setItem(\"remember\", JSON.stringify({\n            name: ym.init.COMPILESTR.encryption(user.value),\n            pwd: ym.init.COMPILESTR.encryption(pwd.value)\n          }));\n        } else {\n          localStorage.removeItem(\"remember\");\n        }\n\n        ; //              ym.init.paraMessage('rangelider');\n\n        ym.init.XML({\n          method: 'POST',\n          uri: JSON.parse(localStorage.getItem('_e')).URLS.Development_Server_ + \"index_info\",\n          async: false,\n          xmldata: {\n            id: ym.init.COMPILESTR.decrypt(JSON.parse(localStorage.getItem(\"token\")).uname),\n            token: ym.init.COMPILESTR.decrypt(JSON.parse(localStorage.getItem(\"token\")).utoken),\n            url: \"/manage/index.html\"\n          },\n          done: function done(res) {\n            ym.init._COLUMN.varel(res.adminInfo.roleInfo.permissionInfoList, 'tr');\n          }\n        }); //              window.location.href = \"./index.html?d=#\" + ym.init.GETRANDOM();\n      } else {\n        ym.init.MBOX({\n          msg: _e.statusCode.msg,\n          dely: 3000,\n          redom: '.coffeeLogin',\n          resetdom: {\n            inner: '登录',\n            tag: login\n          }\n        });\n      }\n\n      ;\n    }\n  });\n};\n\njQuery('#login-qrcode').bind('click', function (_e) {\n  ym.init.MBOX({\n    msg: '功能开发中',\n    dely: 3000\n  });\n}); // var el = document.createElement(\"script\"), tyihead = document.querySelector(\"head\"), fn = res.Fn;\n// var _thislength = \"\";\n// for (let i = 0; i < res.Ciphertext; i++) {\n// \t_thislength += res.SecretKey.charAt(Math.floor(Math.random() * res.SecretKey.length));\n// };\n// fn = fn.replace(/eml/g, 'amt = ' + JSON.stringify(_thislength));\n// el.innerHTML = fn;\n// tyihead.appendChild(el);\n// jQuery('#no').html(res.Trgus);\n\n//# sourceURL=webpack:///./src/public/javascripts/interactive/login.js?");

/***/ })

/******/ });