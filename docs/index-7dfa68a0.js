if(!self.define){const e=e=>("require"!==e&&(e+=".js"),Promise.resolve().then(()=>{if(!r[e])return"document"in self?new Promise(t=>{const r=document.createElement("script");r.src=e,r.defer=!0,document.head.appendChild(r),r.onload=t}):void importScripts(e)}).then(()=>{if(!r[e])throw new Error(`Module ${e} didn’t register its module`);return r[e]})),t=(t,r)=>{Promise.all(t.map(e)).then(e=>1===e.length?e[0]:e).then(e=>r(e))},r={require:Promise.resolve(t)};self.define=((t,n,a)=>{r[t]||(r[t]=new Promise(r=>{let i={};const s={uri:location.origin+t.slice(1)};Promise.all(n.map(t=>"exports"===t?i:"module"===t?s:e(t))).then(e=>{a(...e),r(i)})}))})}define("./index-7dfa68a0.js",["./chunk-539de822"],function(e){"use strict";const t=Symbol("Comlink.proxy"),r=new WeakSet,n=new Map([["proxy",{canHandle:e=>e&&e[t],serialize(e){const{port1:t,port2:r}=new MessageChannel;return a(e,t),[r,[r]]},deserialize:e=>(e.start(),function(e){return function e(t,r=[]){const n=new Proxy(new Function,{get(a,i){if("then"===i){if(0===r.length)return{then:()=>n};const e=u(t,{type:0,path:r}).then(l);return e.then.bind(e)}return e(t,[...r,i.toString()])},set(e,n,a){const[i,s]=h(a);return u(t,{type:1,path:[...r,n.toString()],value:i},s).then(l)},apply(n,a,s){if("bind"===r[r.length-1])return e(t,r.slice(0,-1));const[o,h]=i(s);return u(t,{type:2,path:r,argumentList:o},h).then(l)},construct(e,n){const[a,s]=i(n);return u(t,{type:3,path:r,argumentList:a},s).then(l)}});return n}(e)}(e))}],["throw",{canHandle:e=>r.has(e),serialize(e){const t=e instanceof Error;let r=e;return t&&(r={isError:t,message:e.message,stack:e.stack}),[r,[]]},deserialize(e){if(e.isError)throw Object.assign(new Error,e);throw e}}]]);function a(e,t=self){t.addEventListener("message",async n=>{if(!n||!n.data)return;const{path:a,id:i,type:s}=n.data,u=(n.data.argumentList||[]).map(l);let d;try{const t=a.slice(0,-1).reduce((e,t)=>e[t],e),i=a.reduce((e,t)=>e[t],e);switch(s){case 0:d=await i;break;case 1:t[a.slice(-1)[0]]=l(n.data.value),d=!0;break;case 2:d=await i.apply(t,u);break;case 3:d=o(await new i(...u));break;default:console.warn("Unrecognized message",n.data)}}catch(e){d=e,r.add(e)}const[c,g]=h(d);t.postMessage({...c,id:i},g)}),t.start&&t.start()}function i(e){const t=e.map(h);return[t.map(e=>e[0]),(r=t.map(e=>e[1]),Array.prototype.concat.apply([],r))];var r}const s=new WeakMap;function o(e){return Object.assign(e,{[t]:!0})}function h(e){for(const[t,r]of n)if(r.canHandle(e)){const[n,a]=r.serialize(e);return[{type:3,name:t,value:n},a]}return[{type:0,value:e},s.get(e)||[]]}function l(e){switch(e.type){case 3:return n.get(e.name).deserialize(e.value);case 0:return e.value}}function u(e,t,r){return new Promise(n=>{const a=new Array(4).fill(0).map(()=>Math.floor(Math.random()*Number.MAX_SAFE_INTEGER).toString(16)).join("-");e.addEventListener("message",function t(r){r.data&&r.data.id&&r.data.id===a&&(e.removeEventListener("message",t),n(r.data))}),e.start&&e.start(),e.postMessage({id:a,...t},r)})}var d=function(){function t(e,t,r){if(this._width=e,this._height=t,this._mines=r,this._playMode=0,this._toReveal=0,this._flags=0,this._stateChange={},this._minedCells=[],r<1)throw Error("Invalid number of mines");if(e<1||t<1)throw Error("Invalid dimensions");if(r>e*t-9)throw Error("Number of mines cannot fit in grid");this._toReveal=e*t-r,this.grid=Array(t).fill(void 0).map(function(){return Array(e).fill(void 0).map(function(){return{flagged:!1,hasMine:!1,revealed:!1,touchingFlags:0,touchingMines:0}})})}return Object.defineProperty(t.prototype,"toReveal",{get:function(){return this._toReveal},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"width",{get:function(){return this._width},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"height",{get:function(){return this._height},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"mines",{get:function(){return this._mines},enumerable:!0,configurable:!0}),t.prototype.subscribe=function(e){this._changeCallback=e},t.prototype.unsubscribe=function(){this._changeCallback=void 0},t.prototype.reveal=function(e,t){if(0===this._playMode)this._placeMines(e,t);else if(1!==this._playMode)throw Error("Game is not in a playable state");if(this.grid[t][e].flagged)throw Error("Cell flagged");this._reveal(e,t),this._flushStateChange()},t.prototype.setFlag=function(t,r,n){var a,i,s,o,h=this.grid[r][t];if(h.revealed)throw Error("Revealed cell cannot be tagged");if(h.flagged!==n){if(h.flagged=n,this._pushGridChange(t,r),n){this._setFlags(this._flags+1);try{for(var l=e.__values(this._getSurrounding(t,r)),u=l.next();!u.done;u=l.next()){var d=e.__read(u.value,2),c=d[0],g=d[1];(p=this.grid[g][c]).touchingFlags++,p.revealed&&p.touchingFlags===p.touchingMines&&this._pushGridChange(c,g)}}catch(e){a={error:e}}finally{try{u&&!u.done&&(i=l.return)&&i.call(l)}finally{if(a)throw a.error}}}else{this._setFlags(this._flags-1);try{for(var f=e.__values(this._getSurrounding(t,r)),_=f.next();!_.done;_=f.next()){var p,v=e.__read(_.value,2);c=v[0],g=v[1];(p=this.grid[g][c]).touchingFlags--,p.revealed&&p.touchingFlags===p.touchingMines-1&&this._pushGridChange(c,g)}}catch(e){s={error:e}}finally{try{_&&!_.done&&(o=f.return)&&o.call(f)}finally{if(s)throw s.error}}}this._flushStateChange()}},t.prototype.attemptSurroundingReveal=function(t,r){var n,a,i=this.grid[r][t];if(!i.revealed||0===i.touchingMines||i.touchingMines>i.touchingFlags)return!1;var s=!1;try{for(var o=e.__values(this._getSurrounding(t,r)),h=o.next();!h.done;h=o.next()){var l=e.__read(h.value,2),u=l[0],d=l[1],c=this.grid[d][u];c.flagged||c.revealed||(s=!0,this._reveal(u,d))}}catch(e){n={error:e}}finally{try{h&&!h.done&&(a=o.return)&&a.call(o)}finally{if(n)throw n.error}}return!!s&&(this._flushStateChange(),!0)},t.prototype._flushStateChange=function(){if(0!==Object.keys(this._stateChange).length){if(!this._changeCallback)throw Error("No function present to emit with");this._changeCallback(this._stateChange),this._stateChange={}}},t.prototype._pushGridChange=function(e,t){this._stateChange.gridChanges||(this._stateChange.gridChanges=[]),this._stateChange.gridChanges.push([e,t,this.grid[t][e]]),this._stateChange.gridChanges.length>=10&&this._flushStateChange()},t.prototype._setPlayMode=function(e){this._playMode!==e&&(this._playMode=e,this._stateChange.playMode=e)},t.prototype._setToReveal=function(e){this._toReveal!==e&&(this._toReveal=e,this._stateChange.toReveal=e)},t.prototype._setFlags=function(e){this._flags!==e&&(this._flags=e,this._stateChange.flags=e)},t.prototype._endGame=function(e){this._setPlayMode(e)},t.prototype._placeMines=function(t,r){var n,a,i,s,o,h,l=new Array(this._width*this._height).fill(void 0).map(function(e,t){return t}),u=[r*this._width+t];try{for(var d=e.__values(this._getSurrounding(t,r)),c=d.next();!c.done;c=d.next()){var g=e.__read(c.value,2),f=g[0],_=g[1];u.push(_*this._width+f)}}catch(e){n={error:e}}finally{try{c&&!c.done&&(a=d.return)&&a.call(d)}finally{if(n)throw n.error}}u.sort(function(e,t){return e-t});try{for(var p=e.__values(u.entries()),v=p.next();!v.done;v=p.next()){var y=e.__read(v.value,2),m=y[0],w=y[1];l.splice(w-m,1)}}catch(e){i={error:e}}finally{try{v&&!v.done&&(s=p.return)&&s.call(p)}finally{if(i)throw i.error}}for(var b=this._mines;b;){var C=l.splice(Math.floor(Math.random()*l.length),1)[0],M=C%this._width,x=(C-M)/this._width;this.grid[x][M].hasMine=!0,this._minedCells.push([M,x]),b-=1;try{for(var E=(o=void 0,e.__values(this._getSurrounding(M,x))),S=E.next();!S.done;S=E.next()){var R=e.__read(S.value,2);f=R[0],_=R[1];this.grid[_][f].touchingMines++}}catch(e){o={error:e}}finally{try{S&&!S.done&&(h=E.return)&&h.call(E)}finally{if(o)throw o.error}}}this._setPlayMode(1)},t.prototype._getSurrounding=function(t,r){var n,a,i,s,o=[];try{for(var h=e.__values([r-1,r,r+1]),l=h.next();!l.done;l=h.next()){var u=l.value;if(!(u<0)&&!(u>=this._height))try{for(var d=(i=void 0,e.__values([t-1,t,t+1])),c=d.next();!c.done;c=d.next()){var g=c.value;g<0||(g>=this._width||t===g&&r===u||o.push([g,u]))}}catch(e){i={error:e}}finally{try{c&&!c.done&&(s=d.return)&&s.call(d)}finally{if(i)throw i.error}}}}catch(e){n={error:e}}finally{try{l&&!l.done&&(a=h.return)&&a.call(h)}finally{if(n)throw n.error}}return o},t.prototype._revealAllMines=function(t,r){var n,a,i=this.grid[r][t];i.revealed=!0,this._pushGridChange(t,r);try{for(var s=e.__values(this._minedCells),o=s.next();!o.done;o=s.next()){var h=e.__read(o.value,2),l=h[0],u=h[1],d=this.grid[u][l];d!==i&&(d.revealed=!0,this._pushGridChange(l,u))}}catch(e){n={error:e}}finally{try{o&&!o.done&&(a=s.return)&&a.call(s)}finally{if(n)throw n.error}}},t.prototype._reveal=function(t,r){var n,a,i,s,o=new Set([t+r*this._width]);try{for(var h=e.__values(o),l=h.next();!l.done;l=h.next()){var u=l.value,d=u%this._width,c=(u-d)/this._width,g=this.grid[c][d];if(g.revealed)throw Error("Cell already revealed");if(g.hasMine){this._revealAllMines(d,c),this._endGame(2);break}if(g.revealed=!0,this._pushGridChange(d,c),this._setToReveal(this._toReveal-1),0===this._toReveal){this._endGame(3);break}if(!g.touchingMines)try{for(var f=(i=void 0,e.__values(this._getSurrounding(d,c))),_=f.next();!_.done;_=f.next()){var p=e.__read(_.value,2),v=p[0],y=p[1],m=this.grid[y][v];m.revealed||m.flagged||o.add(v+y*this._width)}}catch(e){i={error:e}}finally{try{_&&!_.done&&(s=f.return)&&s.call(f)}finally{if(i)throw i.error}}}}catch(e){n={error:e}}finally{try{l&&!l.done&&(a=h.return)&&a.call(h)}finally{if(n)throw n.error}}this._flushStateChange()},t}();a({stateService:o(new(function(){function e(){this._eventTarget=(new MessageChannel).port1}return e.prototype.initGame=function(e,t,r){var n=this,a=!1;this._game?this._game.unsubscribe():a=!0,this._game=new d(e,t,r),a&&this._notify({game:{width:e,height:t,mines:r,toRevealTotal:this._game.toReveal,id:Math.random()}}),this._game.subscribe(function(e){n._notify({gameStateChange:e})})},e.prototype.subscribe=function(e){this._eventTarget.addEventListener("state-update",function(t){e(t.stateChange)})},e.prototype.reset=function(){this._game&&(this._game.unsubscribe(),this._game=void 0,this._notify({game:void 0}))},e.prototype.restart=function(){if(this._game){this._game.unsubscribe();var e=this._game;this._game=void 0,this.initGame(e.width,e.height,e.mines)}},e.prototype.flag=function(e,t){this._game.setFlag(e,t,!0)},e.prototype.unflag=function(e,t){this._game.setFlag(e,t,!1)},e.prototype.reveal=function(e,t){this._game.reveal(e,t)},e.prototype.revealSurrounding=function(e,t){this._game.attemptSurroundingReveal(e,t)},e.prototype._notify=function(e){var t,r;this._eventTarget.dispatchEvent((t={stateChange:e},(r=new Event("state-update",t)).stateChange=t.stateChange,Object.setPrototypeOf(r,Event.prototype),r))},e}()))},self),performance.mark("State ready"),addEventListener("message",function(e){"ready?"===e.data&&self.postMessage("READY")}),self.postMessage("READY")});
//# sourceMappingURL=index-7dfa68a0.js.map