'use strict';
/**
 * Module: utility
 */
(function(){
	const Util = (() => {
		const Util = () => {};
		// ブラウザ判定系
		// 即時実行関数 によって browser オブジェクト内のプロパティに環境をセットする
		Util.browser = function () {
			const _this = this;
			const ua = navigator.userAgent.toLowerCase();
			var getVer = (ua, sarchStr, endstr) => {
				// 開始位置を検出
				let startStrPosition = ua.indexOf(sarchStr);
				if (startStrPosition < 0) return undefined;

				// 開始位置を検索文字数ぶんシフト
				// バージョン文字数区切りのスペースの位置を探る（開始文字分減じて文字数とする）
				startStrPosition += sarchStr.length;
				let endStrPosition = ua.indexOf(endstr, startStrPosition);
				endStrPosition -= startStrPosition;

				// バージョン文字を取り出し
				let version = ua.substr(startStrPosition, endStrPosition);
				version = version.replace('_', '.');

				return version;
			};

			// 返すオブジェクトを仮生成
			let browser = {
				isPC: true,
				isSP: false,
				isIE: false,
				isWebKit: false,
				isiOS: false,
				isAndroid: false,
				browserVer: null,
				OSVer: null
			};
			// IE
			if (ua.match(/msie|trident/)) {
				browser.isIE = true;
				browser.OSVer = 'windows ' + getVer(ua, 'windows ', ';');
				browser.browserVer = getVer(ua, 'msie ', ';');
				if (browser.browserVer === undefined) {
					browser.browserVer = parseFloat(getVer(ua, 'trident/', ';'), 10) + 4;
				}
			}
			//WebKit
			if (ua.match(/webkit/)) {
				browser.isWebKit= true;
			}
			// iOS系
			if (ua.match(/iphone|ipad/)) {
				browser.isPC = false;
				browser.isSP = true;
				browser.isiOS = true;
				browser.OSVer = getVer(ua, 'iphone os ', ' ');
			}
			// Android
			if (ua.match(/android/)) {
				browser.isPC = false;
				browser.isSP = true;
				browser.isAndroid = true;

				browser.OSVer = getVer(ua, 'android ', ';');
			}
			window.clickEv = (browser.isPC) ? 'click' : 'touchend';
			// 仮オブジェクト返す
			return (() => {
				return browser;
			})();
		}();

		Util.hasClass = (elm, classNS) => {
			if(!elm || !classNS) return false;
			return (' ' + elm.className + ' ').replace(/[\n\t]/g, ' ').indexOf(' ' + classNS + ' ') !== -1;
		};

		/**
		* function addChild
		* @param {Object} param 生成する子要素の設定
		* param.parent {string} 生成した要素を挿入する親要素
		* param.after {boolean} 親要素の最後に追加するか
		* param.element {string ? div} 生成する要素のタグ名
		* param.id {string} 生成する要素に付けるID
		* param.class {string} 生成する要素に付けるclass
		*/
		Util.addChild = function(param){
			var el = (param.element) ? param.element : 'div';
			var newEl = param.HTMLelement || document.createElement(el);
			var where;
			if (param.id) newEl.setAttribute('id', param.id);
			if (param.class) newEl.setAttribute('class', param.class);
			if (param.attr) {
				for (var key in param.attr) {
					newEl.setAttribute(key, param.attr[key]);
				}
			}
			// parentの指定が無いときは要素を返す
			if (!param.parent) {
				return newEl;
			}
			if(param.parent.firstChild) {
				where = (param.after) ? null : param.parent.firstChild;
			} else {
				where = null;
			}
			return param.parent.insertBefore(newEl, where);
		};

		// scroll系
		Util.e_scroll = (() => {
			var scroll_event = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
			return (() => {
				return scroll_event;
			})();
		})();
		Util.setScrollTop = top => {
			var tgt = (Util.browser.isWebKit) ? document.body : document.documentElement;
			tgt.scrollTop = top;
		};
		Util.getScrollTop = () => {
			var document;
			var body;
			return (window.pageYOffset) ?
			window.pageYOffset :
			((document = window.document).documentElement || (body = document.body).parentNode || body).scrollTop;
		};
		Util.extend = (...arg) => {
			let out = arg[0] || {};

			for (let i = 1; i < arg.length; i++) {
				if (!arg[i]) continue;
				for (let key in arg[i]) {
					if (arg[i].hasOwnProperty(key)) out[key] = arg[i][key];
				}
			}
			return out;
		};
		return Util;
	})();
window.util = Util;
})();
if (!Array.prototype.forEach) {
	Array.prototype.forEach = function(callback, thisArg) {

		var T, k;

		if (this === null) {
			throw new TypeError(' this is null or not defined');
		}

		// 1. Let O be the result of calling toObject() passing the
		// |this| value as the argument.
		var O = Object(this);

		// 2. Let lenValue be the result of calling the Get() internal
		// method of O with the argument 'length'.
		// 3. Let len be toUint32(lenValue).
		var len = O.length >>> 0;

		// 4. If isCallable(callback) is false, throw a TypeError exception.
		// See: http://es5.github.com/#x9.11
		if (typeof callback !== 'function') {
			throw new TypeError(callback + ' is not a function');
		}

		// 5. If thisArg was supplied, let T be thisArg; else let
		// T be undefined.
		if (arguments.length > 1) {
			T = thisArg;
		}

		// 6. Let k be 0
		k = 0;

		// 7. Repeat, while k < len
		while (k < len) {

			var kValue;

			// a. Let Pk be ToString(k).
			//    This is implicit for LHS operands of the in operator
			// b. Let kPresent be the result of calling the HasProperty
			//    internal method of O with argument Pk.
			//    This step can be combined with c
			// c. If kPresent is true, then
			if (k in O) {

				// i. Let kValue be the result of calling the Get internal
				// method of O with argument Pk.
				kValue = O[k];

				// ii. Call the Call internal method of callback with T as
				// the this value and argument list containing kValue, k, and O.
				callback.call(T, kValue, k, O);
			}
			// d. Increase k by 1.
			k++;
		}
	};
}
