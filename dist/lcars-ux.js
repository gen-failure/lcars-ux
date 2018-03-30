(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.lcarsUx = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var LcarsUX = function () {
    function LcarsUX(element) {
      _classCallCheck(this, LcarsUX);

      this.element = element;
      this.contentWindow = this.element.querySelector('div.content');
      this.observer = new MutationObserver(this.domChanged);
      this.observer.observe(this.contentWindow, { attributes: true, childList: true, subTree: true });
      //FIXME close observer when element is detached
      this.enhancementTypes = {
        'label': {
          'lcars-checkbox': this.enhanceCheckbox
        }
      };
      this.enhanceAll();
    }

    _createClass(LcarsUX, [{
      key: 'domChanged',
      value: function domChanged(mutations) {
        mutations.forEach(function (mutation) {
          mutation.addedNodes.forEach(function (node) {
            console.log(node);
          });
        });
      }
    }, {
      key: 'enhanceAll',
      value: function enhanceAll() {
        var _this = this;

        Object.keys(this.enhancementTypes).forEach(function (tag) {
          Object.keys(_this.enhancementTypes[tag]).forEach(function (cls) {
            var targets = _this.contentWindow.getElementsByTagName(tag);
            for (var i = 0; i <= targets.length; i++) {
              if (targets[i].classList.contains(cls)) {
                _this.enhancementTypes[tag][cls](targets[i]);
              }
            }
          });
        });
      }
    }, {
      key: 'enhanceCheckbox',
      value: function enhanceCheckbox(element) {
        console.log(element);
        var label = element.querySelector('span');
        var checkbox = element.querySelector('input');

        label.style.display = 'none';
        checkbox.style.display = 'none';

        var css = ['checkbox', 'lcars-button'];
        element.classList.forEach(function (cls) {
          if (cls !== 'lcars-checkbox') css.push(cls);
        });

        if (checkbox.checked) {
          css.push('on');
        } else {
          css.push('off');
        }

        var newCB = document.createElement('button');
        newCB.innerHTML = label.innerHTML;
        var actionClass = "off";
        newCB.setAttribute('class', css.join(' '));
        newCB.setAttribute('data-label-on', 'ON');
        newCB.setAttribute('data-label-off', 'OFF');

        newCB.addEventListener('click', function () {
          if (checkbox.checked) {
            checkbox.removeAttribute('checked');
            newCB.classList.remove('on');
            newCB.classList.add('off');
          } else {
            checkbox.setAttribute('checked', 'checked');
            newCB.classList.remove('off');
            newCB.classList.add('on');
          }
        });
        element.appendChild(newCB);
      }
    }]);

    return LcarsUX;
  }();

  exports.default = LcarsUX;
});