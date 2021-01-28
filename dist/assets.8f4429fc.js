// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"assets/MediaPlayer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function MediaPlayer(config) {
  // Recibe un objeto de configuración
  this.media = config.el; //Especificando quien sera el this.media, en este caso video

  this.plugins = config.plugins || []; // Establecer plugins e inicializarlos

  this._initPlugins(); //Invocación del metodo para iniciarlizar plugins

} //Clase (recordar que en JS no hay clases)
//en realidad es un objeto y pasamos su herencia prototipal


MediaPlayer.prototype._initPlugins = function () {
  var _this = this;

  this.plugins.forEach(function (plugin) {
    plugin.run(_this); //Para cada plugin, lo que hara sera correrlo(pudo ser cualquier nombre no solo run) enviando la instancia (el video y su info)
  });
};

MediaPlayer.prototype.play = function () {
  //Metodo play de los objetos MediaPlayer
  this.media.play(); // El metodo reproduce al HTMLMediaElement(al video)
};

MediaPlayer.prototype.pause = function () {
  //Metodo pausa de los objetos MediaPlayer
  this.media.pause(); // El metodo pausa al HTMLMediaElement(al video)
};

MediaPlayer.prototype.tooglePlay = function () {
  //Metodo pausa/reproducir segun propiedad paused
  if (this.media.paused) {
    this.play();
  } else {
    this.pause();
  } // El metodo pausa al HTMLMediaElement(al video)

};

MediaPlayer.prototype.mute = function () {
  this.media.muted = true;
};

MediaPlayer.prototype.unmute = function () {
  this.media.muted = false;
};

MediaPlayer.prototype.toogleMute = function () {
  //Metodo mutear/no mutear segun propiedad muted
  if (this.media.muted) {
    this.unmute();
  } else {
    this.mute();
  } // El metodo pausa al HTMLMediaElement(al video)

};

var _default = MediaPlayer;
exports.default = _default;
},{}],"assets/plugins/AutoPlay.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function AutoPlay() {}

AutoPlay.prototype.run = function (player) {
  player.mute(); //Exepcion para dr autoplay a un video, este debe estar mudo

  player.play();
};

var _default = AutoPlay;
exports.default = _default;
},{}],"assets/plugins/AutoPause.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AutoPause = /*#__PURE__*/function () {
  function AutoPause() {
    _classCallCheck(this, AutoPause);

    this.threshold = 0.25;
    this.handleIntersection = this.handleIntersection.bind(this); //Mantener el this a la instancia del plugin y no al objeto que la usa, en este caso window 

    this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
  }

  _createClass(AutoPause, [{
    key: "run",
    value: function run(player) {
      this.player = player;
      var observer = new IntersectionObserver(this.handleIntersection, {
        threshold: this.threshold //umbral del objeto en el contenedor para realizar el aviso, si ha pasado
        //el umbral dejando el video este avisara y si se acerca al umbral llegando al video tambien avisara, en este caso 25%     

      }); //API del DOM para observar la posición a la quee sta el observador
      //Primer elemento un handler que avisa una intersección del elemento observado y 
      //el segundo un elemento de configuracion

      observer.observe(this.player.media); //el observador empezara a observar el media, siendo el contenedor la pantalla

      document.addEventListener("visibilitychange", this.handleVisibilityChange); // metodo para saber si el usuario
      //se encuentra en la pestaña(sitio web) o no.
    }
  }, {
    key: "handleIntersection",
    value: function handleIntersection(entries) {
      //handler hecho un metodo para ser agregado a la clase, recibe los entries u objetos a observar
      var entry = entries[0]; // entry unico en la lista

      var isVisible = entry.intersectionRatio >= this.threshold;

      if (isVisible) {
        this.player.play();
      } else {
        this.player.pause();
      }
    }
  }, {
    key: "handleVisibilityChange",
    value: function handleVisibilityChange() {
      var isVisible = document.visibilityState === "visible";

      if (isVisible) {
        this.player.play();
      } else {
        this.player.pause();
      }
    }
  }]);

  return AutoPause;
}();

var _default = AutoPause;
exports.default = _default;
},{}],"assets/index.js":[function(require,module,exports) {
"use strict";

var _MediaPlayer = _interopRequireDefault(require("./MediaPlayer.js"));

var _AutoPlay = _interopRequireDefault(require("./plugins/AutoPlay.js"));

var _AutoPause = _interopRequireDefault(require("./plugins/AutoPause.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Plugin que crearemos para hacer autoplay
//Plugin que crearemos para hacer autopause
var video = document.querySelector("video"); // Toma el primer elemento que coincida con
//lo especificado, prefiero usar getElementsByClassName

var button = document.getElementById("playButton"); // prefiero usar getElementsById

var buttonMute = document.getElementById("muteButton");
var player = new _MediaPlayer.default({
  el: video,
  plugins: [new _AutoPlay.default(), new _AutoPause.default()]
}); // Objeto de tipo MediaPlayer que se crea recibiendo un objeto

button.onclick = function () {
  return player.tooglePlay();
}; //Arrow function para reproducir y pausar el video


buttonMute.onclick = function () {
  return player.toogleMute();
}; // Cuando se de click, el objeto
// player ejecuta su metodo play, que ejecuta el metodo play de los HTMLMediaElement
//del DOM tiene una API, en este caso un metodo de API de los video es play</script>
// if('serviceWorker' in navigator){
//      navigator.serviceWorker.register('/sw.js').catch(error =>{
//           console.log(error.message)
//      })
// }
},{"./MediaPlayer.js":"assets/MediaPlayer.js","./plugins/AutoPlay.js":"assets/plugins/AutoPlay.js","./plugins/AutoPause.js":"assets/plugins/AutoPause.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "63193" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","assets/index.js"], null)
//# sourceMappingURL=/assets.8f4429fc.js.map