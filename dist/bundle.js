var Tetris=function(t){var e={};function n(r){if(e[r])return e[r].exports;var i=e[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(r,i,function(e){return t[e]}.bind(null,i));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){t.exports=n(1)},function(t,e,n){const r=n(2);t.exports=r.app},function(t,e,n){"use strict";n.r(e);var r={};n.r(r),n.d(r,"vec2",function(){return h}),n.d(r,"copy",function(){return l}),n.d(r,"equal",function(){return d}),n.d(r,"limit",function(){return f}),n.d(r,"makeMap",function(){return p}),n.d(r,"round",function(){return g}),n.d(r,"makeAttribute",function(){return m}),n.d(r,"add",function(){return w}),n.d(r,"sub",function(){return v}),n.d(r,"mul",function(){return y}),n.d(r,"div",function(){return b}),n.d(r,"scale",function(){return x}),n.d(r,"setScale",function(){return P}),n.d(r,"addScale",function(){return z}),n.d(r,"length",function(){return L}),n.d(r,"normalize",function(){return j}),n.d(r,"direction",function(){return M}),n.d(r,"cscale",function(){return S}),n.d(r,"csub",function(){return E}),n.d(r,"cadd",function(){return A}),n.d(r,"cmul",function(){return k});const i=void 0!==window.performance?window.performance:Date,a=()=>i.now(),s=window.requestAnimationFrame;function o(t,e=60){let n=!1,r=a(),i=0,o=1e3/e,c=0;this.start=()=>n?this:(n=!0,r=a(),i=s(u),this),this.stop=()=>(n=!1,0!=i&&s.cancel(i),i=0,this);const u=()=>{i=s(u);const e=a();(c+=e-r)-o>-1&&(t(o),c=0),r=e}}const c=[{test:"png|jpg",loader:function(t,{assetsUrl:e}){return new Promise(n=>{let r=new Image;r.onload=()=>{n(r)},r.src=e+t})}},{test:"json",loader:function(t,{assetsUrl:e}){return fetch(e+t).then(t=>t.json())}}];function u(t,e){e={assetsUrl:"",...e};let{assetsUrl:n}=e,r=[...c];const i={assetsUrl:n},a={};Object.keys(t).length;let s=0;this.progress=()=>s,this.get=t=>a[t],this.start=()=>Promise.all(Object.values(function(t,e){let n={};return Object.keys(t).forEach(r=>{n[r]=e(r,t[r])}),n}(t,(t,e)=>{return o(e)(e,i).then(e=>{a[t]=e,s++})}))).then(t=>a);const o=t=>{let[e,n]=t.split("."),i=r.find(({test:t})=>n.match(t));return i?i.loader:(console.warn(`Couldn't find loader for ${t}, ignoring.`),()=>Promise.resolve())}}function h(t=0,e=t){return[t,e]}function l(t,e=[]){return e[0]=t[0],e[1]=t[1],e}function d(t,e){return t[0]===e[0]&&t[1]===e[1]}function f(t,e){t[0]=Math.max(t[0],e[0]),t[0]=Math.min(t[0],e[1]),t[1]=Math.max(t[1],e[2]),t[1]=Math.min(t[1],e[3])}function p(t){return e=>(e[0]=t(e[0]),e[1]=t(e[1]),e)}const g=p(t=>Math.round(t));function m(t){return(e=t[0],n=t[1])=>(t[0]=e,t[1]=n,t)}function w(t,e,...n){return t[0]+=e[0],t[1]+=e[1],n.forEach(e=>{t[0]+=e[0],t[1]+=e[1]}),t}function v(t,e){return t[0]-=e[0],t[1]-=e[1],t}function y(t,e){return t[0]*=e[0],t[1]*=e[1],t}function b(t,e){return t[0]/=e[0],t[1]/=e[1],t}function x(t,e){return t[0]*=e,t[1]*=e,t}function P(t,e,n){t[0]=e[0]*n,t[1]=e[1]*n}function z(t,e,n){return t[0]+=e[0]*n,t[1]+=e[1]*n,t}function L(t){return Math.sqrt(t[0]*t[0]+t[1]*t[1])}function j(t){return x(t,1/L(t)),t}function M(t,e){return j(E(e,t))}function S(t,e){return x(l(t),e)}function E(t,e){return v(l(t),e)}function A(t,e){return w(l(t),e)}function k(t,e){return y(l(t),e)}const{vec2:O}=r;function U(t){let e=this.data={touches:{}};function n(t,e,n){return t.addEventListener(e,n),()=>t.removeEventListener(e,n)}this.update=t=>{let{current:n,wheel:r}=e;r&&(r.handled?delete e.wheel:r.handled=!0),n&&(n.dpos=E(n.epos,n.start),n.tapping&&(n.tapping.handled?delete n.tapping:n.tapping.handled=!0),n.ending&&(n.ending.handled?delete e.current:n.ending.handled=!0))},this.bindTouch=()=>(function(t){const e=[],s=function(t){return function(e){e.preventDefault();const n=i(e);t.current={button:e.button,tapping:{},start:n,epos:n,dpos:O(0)}}}(t),o=function(t){return function(e){if(t.current){let{dpos:e}=t.current,n=a(e);t.current.ending={swipe:n}}}}(t),c=function(t){return function(e){const n=i(e);t.current&&(t.current.epos=n),t.epos=n}}(t),u=r(t);return["mousedown","touchstart"].forEach(t=>e.push(n(document,t,s))),["mousemove","touchmove"].forEach(t=>e.push(n(document,t,c))),["mouseup","touchend"].forEach(t=>e.push(n(document,t,o))),e.push(n(document,"wheel",u)),()=>{e.forEach(t=>t())}})(this.data);const r=t=>e=>{t.wheel={epos:i(e),y:Math.sign(e.deltaY)}},i=e=>{let n=(t=>t.clientX||0===t.clientX?[t.clientX,t.clientY]:t.touches&&t.targetTouches[0]?[t.targetTouches[0].clientX,t.targetTouches[0].clientY]:void 0)(e),{bounds:r}=t;return[n[0]-r.x,n[1]-r.y]};const a=t=>{let e={};return t[1]<-80?e.up=!0:t[1]>80&&(e.down=!0),t[0]<-80?e.left=!0:t[0]>80&&(e.right=!0),(e.up||e.down||e.left||e.right)&&(e.swiped=!0),e}}class T{constructor(t,e,n){this.l=t,this.c=e,this.n=n,this.p=null}r(){this.p?this.p.n=this.n:this.l.h=this.n,this.n&&(this.n.p=this.p)}}class _{constructor(){this.h=null}add(t){const e=new T(this,t,this.h);return this.h&&(this.h.p=e),this.h=e,e}i(t){let e=this.h;for(;e;)t(e.c),e=e.n}}const q={p:{t:0}};class F{constructor(t){this.z=t,this.o=new _,this.t=new _}add(t){t.remove(),t.l=this,t.n=(1!==t.a||0===t.frame.p.a?this.t:this.o).add(t)}}const C=(t,e)=>{const n=new F(0),r=[n],i=new ArrayBuffer(3407820),a=new Float32Array(i),s=new Uint32Array(i),{Point:o}=C,c=Object.assign({antialias:!1,alpha:!1},e),u=c.alpha?1:770,h=c.scale||1;delete c.scale;const l=t.getContext("webgl",c),d=l.getExtension("ANGLE_instanced_arrays"),f=(t,e)=>{const n=l.createShader(e);return l.shaderSource(n,t),l.compileShader(n),n},p=l.createProgram();l.attachShader(p,f("attribute vec2 g;\nattribute vec2 a;\nattribute vec2 t;\nattribute float r;\nattribute vec2 s;\nattribute vec4 u;\nattribute vec4 c;\nattribute float z;\nuniform mat4 m;\nvarying vec2 v;\nvarying vec4 i;\nvoid main(){\nv=u.xy+g*u.zw;\ni=c.abgr;\nvec2 p=(g-a)*s;\nfloat q=cos(r);\nfloat w=sin(r);\np=vec2(p.x*q-p.y*w,p.x*w+p.y*q);\np+=a+t;\ngl_Position=m*vec4(p,z,1);}",35633)),l.attachShader(p,f("precision mediump float;\nuniform sampler2D x;\nuniform float j;\nvarying vec2 v;\nvarying vec4 i;\nvoid main(){\nvec4 c=texture2D(x,v);\ngl_FragColor=c*i;\nif(j>0.0){\nif(c.a<j)discard;\ngl_FragColor.a=1.0;};}",35632)),l.linkProgram(p);const g=(t,e,n)=>{l.bindBuffer(t,l.createBuffer()),l.bufferData(t,e,n||35044)},m=(t,e,n,r,i,a,s)=>{const o=l.getAttribLocation(p,t);l.enableVertexAttribArray(o),l.vertexAttribPointer(o,e,a||5126,!!s,n||0,i||0),r&&d.vertexAttribDivisorANGLE(o,r)};g(34963,new Uint8Array([0,1,2,2,1,3])),g(34962,new Float32Array([0,0,0,1,1,0,1,1])),m("g",2),g(34962,i,35048),m("a",2,52,1),m("s",2,52,1,8),m("r",1,52,1,16),m("t",2,52,1,20),m("u",4,52,1,28),m("c",4,52,1,44,5121,!0),m("z",1,52,1,48);const w=t=>l.getUniformLocation(p,t),v=w("m"),y=w("x"),b=w("j");let x,P,z,L,j=0;const M=()=>{x=t.clientWidth*h|0,P=t.clientHeight*h|0;const e=t.width!==x||t.height!==P;return t.width=x,t.height=P,e},S=()=>{j&&(l.blendFunc(L?1:u,L?0:771),l.depthFunc(L?513:515),l.bindTexture(3553,z.p.t),l.uniform1i(y,z.p.t),l.uniform1f(b,L?z.p.a:0),l.bufferSubData(34962,0,a.subarray(0,13*j)),d.drawElementsInstancedANGLE(4,6,5121,0,j),j=0)},E=t=>{if(!t.visible)return;65535===j&&S();const{frame:e}=t,{uvs:n}=e;z.p.t!==e.p.t&&(z.p.t&&S(),z=e);let r=13*j;a[r++]=e.anchor.x,a[r++]=e.anchor.y,a[r++]=t.scale.x*e.size.x,a[r++]=t.scale.y*e.size.y,a[r++]=t.rotation,a[r++]=t.position.x,a[r++]=t.position.y,a[r++]=n[0],a[r++]=n[1],a[r++]=n[2],a[r++]=n[3],s[r++]=((16777215&t.tint)<<8|255*t.a&255)>>>0,a[r]=t.l.z,j++},A={gl:l,camera:{at:new o,to:new o,angle:0},background(t,e,n,r){l.clearColor(t,e,n,0===r?0:r||1)},layer(t){let e=r.find(e=>e.z===t);return e||(e=new F(t),r.push(e),r.sort((t,e)=>e.z-t.z)),e},add(t){n.add(t)},texture(t,e,n,r){const i=t.width,a=t.height,s=l.createTexture();return l.bindTexture(3553,s),l.texParameteri(3553,10240,9728|+n),l.texParameteri(3553,10241,9728|+n|+r<<8|+r<<1),l.texImage2D(3553,0,6408,6408,5121,t),r&&l.generateMipmap(3553),{size:new o(i,a),anchor:new o,uvs:[0,0,1,1],p:{a:0===e?0:e||1,t:s},frame(t,e,n){return{size:e,anchor:n||this.anchor,uvs:[t.x/i,t.y/a,e.x/i,e.y/a],p:this.p}}}},resize:M,render(){const{at:t,to:e,angle:n}=A.camera,i=t.x-x*e.x,a=t.y-P*e.y,s=Math.cos(n),o=Math.sin(n),c=2/x,u=-2/P,h=[s*c,o*u,0,0,-o*c,s*u,0,0,0,0,-1e-5,0,(t.x*(1-s)+t.y*o)*c-2*i/x-1,(t.y*(1-s)-t.x*o)*u+2*a/P+1,0,1];l.useProgram(p),l.enable(3042),l.enable(2929),l.uniformMatrix4fv(v,!1,h),l.viewport(0,0,x,P),l.clear(16640),z=q,L=!0,r.forEach(t=>t.o.i(E)),S(),L=!1;for(let t=r.length-1;t>=0;t--)r[t].t.i(E);S()}};return M(),A};C.Point=class{constructor(t,e){if(!(this instanceof C.Point))return new C.Point(t,e);this.set(t,e)}set(t,e){return this.x=t||0,this.y=e||(0!==e?this.x:0),this}},C.Sprite=class{constructor(t,e){Object.assign(this,{frame:t,visible:!0,position:new C.Point,rotation:0,scale:new C.Point(1),tint:16777215,a:1,l:null,n:null},e)}get width(){return this.frame.size.x*this.scale.x}set width(t){this.scale.x=t/this.frame.size.x}get height(){return this.frame.size.y*this.scale.y}set height(t){this.scale.y=t/this.frame.size.y}get alpha(){return this.a}set alpha(t){const e=t<1&&1===this.a||1===t&&this.a<1;this.a=t,e&&this.frame.p.a>0&&this.l&&this.l.add(this)}remove(){this.n&&this.n.r(),this.l=null,this.n=null}};var D=C;function I(t){const e=this.width=t.clientWidth,n=this.height=t.clientHeight,r=document.createElement("canvas");t.appendChild(r),r.width=e,r.height=n,this.bounds=t.getBoundingClientRect();const i=D(r);this.scene=i}function R(t){return{fourLayer:t.layer(4),threeLayer:t.layer(3),twoLayer:t.layer(2),oneLayer:t.layer(1),zeroLayer:t.layer(0),scene:t}}const{Point:X,Sprite:$}=D;function B(t=0,e=t){return new X(t,e)}const H=t=>(e,n,r,i=r,a)=>t.frame(B(e,n),B(r,i),B(a,a));const W=t=>(function(t,e,n){var r=document.createElement("canvas");return r.width=t,r.height=e,n(t,e,r,r.getContext("2d")),r})(256,256,(e,n,r,i)=>(i.fillStyle=t,i.fillRect(0,0,e,n),r));function G(t,e){e={name:"pool",warnLeak:400,...e};const n=(()=>{let t=0;return()=>t++})();let r=[],i=[];this.name=()=>e.name,this.alives=()=>r.length,this.total=()=>i.length+r.length,this.warnLeak=()=>e.warnLeak,this.toString=()=>`[${this.name()} alives: ${this.alives()} deads: ${i.length}]`,this.acquire=(e=(()=>{}))=>{let a;return this.total()>this.warnLeak()&&(console.warn(`possible pool leak at ${this.name()}.`),this.releaseLast()),e(a=i.length>0?i.pop():t(n())),r.push(a),a},this.acquireLimit=(t,e)=>{for(;this.alives()<e;)this.acquire(t)},this.release=t=>{this.releaseIndex(r.indexOf(t))},this.releaseIndex=t=>{t>-1&&i.push(r.splice(t,1)[0])},this.releaseLast=()=>{this.releaseIndex(0)},this.releaseAll=()=>{i=[...i,...r],r=[]},this.releaseIf=(t,e=(()=>{}))=>{let n=[],a=[];r.forEach(r=>{t(r)?(e(r),n.push(r)):a.push(r)}),r=a,i=[...n,...i]},this.reduce=(t,e)=>r.reduce(t,e),this.map=t=>r.map(t),this.flatMap=t=>r.flatMap(t),this.each=t=>{r.forEach(t)},this.find=t=>r.find(t)}function N(t,e,n,r){let i,a=function(t){return new $(t)}(r),{x:s,y:o,width:c,height:u}=n.local;r&&(a.frame=r),a.width=c,a.height=u,this.init=t=>{i=t},this.data=()=>i,this.update=t=>{},this.visible=t=>a.visible=t,this.pos=()=>[s,o],this.move=(t,e)=>{s=t,o=e},this.size=(t,e)=>{c=t,u=e,a.width=c,a.height=u},this.frame=t=>{a.frame=t,a.width=c,a.height=u},this.add=t=>{t.add(a)},this.remove=()=>{a.remove()},this.render=()=>{a.position.set(s,o)}}function Y(t,e,n,r){const{layers:{oneLayer:i}}=e;let a,{x:s,y:o,tileWidth:c,tileHeight:u,width:h}=n.local,l=Math.ceil(h/c),d=new G(()=>new N(t,e,{bs:n,local:{width:c,height:u}},r));this.init=t=>{a=0;for(let t=-1;t<l+1;t++)d.acquire(e=>{e.init({i:t}),e.add(i)})},this.tileX=t=>a=t,this.update=t=>{a-=10,d.each(e=>{let{i:n}=e.data(),r=(a+n*c)%(h+c);r<-c&&(r+=h+c),e.move(r,0),e.update(t)})},this.render=()=>{d.each(t=>t.render())}}function V(t,e,n){const{frames:r,layers:{oneLayer:i}}=e;let a=n.height,s=new Y(this,e,{local:{x:0,y:0,tileWidth:a,tileHeight:a,width:n.width},...n},r.clouds);this.init=t=>{s.init({})},this.update=t=>{s.update(t)},this.render=()=>{s.render()}}function J(t){const{canvas:e,layers:{scene:n,zeroLayer:r},frames:i}=t;let a=new V(this,t,(()=>{const{width:t,height:n}=e;return{width:t,height:n}})());this.init=t=>{a.init({})},this.update=t=>{a.update(t)},this.render=()=>{a.render()}}function K(t,e){new u({magic:"magic.png"},{assetsUrl:"assets/images/"}).start().then(e=>{const n=new I(t),r=new U(n);r.bindTouch();const i=function(t,e){const n=t.texture(e.magic),r=H(n),i=t.texture(W("white")),a=t.texture(W("black")),s=t.texture(W("gray")),o=t.texture(W("brown")),c=t.texture(W("yellow")),u=t.texture(W("red"));return t.texture(W("green")),{clouds:r(0,96,128),white:i,black:a,gray:s,brown:o,mage:c,platform:o,phandle:i,tPlay:u,toolbar:s}}(n.scene,e);let a=new J({config:{candy:{SlowUpdateRate:4e-4,FastUpdateRate:8e-4},FastUpdateRate:4e-4,SlowUpdateRate:2e-4},events:r,assets:e,canvas:n,frames:i,layers:R(n.scene)});a.init({}),new o(t=>{r.update(t),a.update(t),a.render(),n.scene.render()}).start()})}n.d(e,"app",function(){return K})}]);