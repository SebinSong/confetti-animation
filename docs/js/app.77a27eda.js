(function(t){function e(e){for(var o,a,s=e[0],l=e[1],c=e[2],f=0,h=[];f<s.length;f++)a=s[f],r[a]&&h.push(r[a][0]),r[a]=0;for(o in l)Object.prototype.hasOwnProperty.call(l,o)&&(t[o]=l[o]);u&&u(e);while(h.length)h.shift()();return i.push.apply(i,c||[]),n()}function n(){for(var t,e=0;e<i.length;e++){for(var n=i[e],o=!0,s=1;s<n.length;s++){var l=n[s];0!==r[l]&&(o=!1)}o&&(i.splice(e--,1),t=a(a.s=n[0]))}return t}var o={},r={app:0},i=[];function a(e){if(o[e])return o[e].exports;var n=o[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=t,a.c=o,a.d=function(t,e,n){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)a.d(n,o,function(e){return t[e]}.bind(null,o));return n},a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="/confetti-animation/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=e,s=s.slice();for(var c=0;c<s.length;c++)e(s[c]);var u=l;i.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"1ff5":function(t,e,n){t.exports=n.p+"img/pug.5168f640.jpg"},"458f":function(t,e,n){},"4d10":function(t,e,n){},"56d7":function(t,e,n){"use strict";n.r(e);n("cadf"),n("551c"),n("f751"),n("097d");var o=n("2b0e"),r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container"},[n(t.currentComponent,{tag:"component",attrs:{svgDefaultAttrs:t.svgDefaultAttrs}}),n("welcome-message"),n("ul",{attrs:{id:"remote"}},t._l(t.componentList,function(e,o,r){return n("li",{key:o},[n("button",{on:{click:function(n){t.currentComponent=e}}},[t._v("opt "+t._s(r+1))])])}),0)],1)},i=[],a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"confetti-one"}},[n("svg",t._b({ref:"svg",attrs:{id:"confetti-one"}},"svg",t.svgDefaultAttrs,!1),[n("defs",[n("linear-gradient-red"),n("linear-gradient-grey"),n("confetti-particle"),n("red-cone"),n("grey-cone")],1),n("rect",{attrs:{id:"bgrect",x:"0",y:"0",width:"100%",height:"100%",fill:"none",stroke:"rgba(0,0,0,0)"}}),n("g",{attrs:{id:"newcoordinate"}})])])},s=[],l=(n("ac6a"),n("0a0d")),c=n.n(l),u=n("d225"),f=n("b0b4"),h=function(t){var e=t.easeType,n=t.initValue,o=t.endValue,r=t.duration;switch(e){case"QuadIn":return function(t){return t/=r,(o-n)*t*t+n};case"QuadOut":return function(t){var e=(o-n)/r;return e*(2*t-1/r*t*t)+n};case"QuadInOut":return function(t){return t/=r/2,t<1?(o-n)/2*t*t+n:(t--,-(o-n)/2*(t*(t-2)-1)+n)};case"CubicIn":return function(t){return t/=r,(o-n)*t*t*t+n};case"CubicOut":return function(t){return t/=r,t--,(o-n)*(t*t*t+1)+n};case"CubicInOut":return function(t){return t/=r/2,t<1?(o-n)/2*t*t*t+n:(t-=2,(o-n)/2*(t*t*t+2)+n)};case"BounceOut":return function(t){return(t/=r)<1/2.75?7.5625*t*t*(o-n)+n:t<2/2.75?(o-n)*(7.5625*(t-=1.5/2.75)*t+.75)+n:t<2.5/2.75?(o-n)*(7.5625*(t-=2.25/2.75)*t+.9375)+n:(o-n)*(7.5625*(t-=2.625/2.75)*t+.984375)+n};case"ExpoOut":return function(t){return t==r?o:(o-n)*(1-Math.pow(2,-10*t/r))+n};case"ExpoIn":return function(t){return 0==t?n:(o-n)*Math.pow(2,10*(t/r-1))+n};case"BackInOut":return function(t){var e=1.70158;return(t/=r/2)<1?(o-n)/2*(t*t*((1+(e*=1.525))*t-e))+n:(o-n)/2*((t-=2)*t*((1+(e*=1.525))*t+e)+2)+n};default:return function(t){return(o-n)*t/r+n}}},d=n("75fc");n("4aa6"),n("a481");function p(t){var e=t.firstChild;while(e)t.removeChild(e),e=t.firstChild}function g(){return Math.random()>.5?1:-1}function v(t,e){var n=e.x-t.x,o=e.y-t.y,r=180*Math.atan(Math.abs(o)/Math.abs(n))/Math.PI;return n>=0?o>=0?r:-1*r:o>=0?180-r:-1*(180-r)}function m(t,e,n){var o=Math.abs(n),r=o>90?-1:1,i=n>=0?1:-1,a=o>90?180-o:o;return{x:t.x+r*e*Math.cos(a*Math.PI/180),y:t.y+i*e*Math.sin(a*Math.PI/180)}}function y(t,e){return Math.floor(Math.random()*(e-t+1)+t)}function w(t){return t[Math.floor(Math.random()*t.length)]}function b(t,e){var n=[].concat(Object(d["a"])(t),Object(d["a"])(e)),o=n[0],r=n[1],i=n[2],a=n[3],s=r-o,l=a-i;return function(t){if(t<=o)return i;if(t>=r)return a;var e=(t-o)/s;return i+l*e}}var x,C,k,M,j,O,_,E,A,B,T="http://www.w3.org/2000/svg",D=35,P=1e3,q={x:null,y:null},G=[],L=40,I=!1,R=function(){function t(e,n,o){Object(u["a"])(this,t),this.node=o,this.innerG=o.querySelector("g.inner"),this.angle=0,this.position={x:e,y:n},this.explosionTip={x:0,y:0},this.explosionTipDistance=60}return Object(f["a"])(t,[{key:"updatePositionAndAngle",value:function(){this.node.setAttribute("transform","translate(".concat(this.position.x,", ").concat(this.position.y,") rotate(").concat(this.angle,")"))}},{key:"calculate",value:function(){this.angle=v(this.position,q),this.explosionTip=m(this.position,this.explosionTipDistance,this.angle),this.updatePositionAndAngle()}},{key:"addToCanvas",value:function(){C.appendChild(this.node)}},{key:"scaleDown",value:function(){this.innerG.setAttribute("transform","scale(0.7)"),this.explosionTip=42}}]),t}(),S=function(){function t(e,n,o){Object(u["a"])(this,t);var r=document.createElementNS(T,"g");this.position=null,this.angle=null,this.confettis=[],this.gNode=r,this.cone=o,this.maxAngleDeviation=e,this.maxPopLength=n,C.appendChild(this.gNode)}return Object(f["a"])(t,[{key:"createParticles",value:function(){for(var t=this.maxPopLength/D,e=[this.cone.explosionTip,this.cone.angle],n=e[0],o=e[1],r=0;r<D;r++){var i=new F({index:r,parent:this.gNode,maxAngleDeviation:this.maxAngleDeviation,lengthGap:t,refPoint:n,refDegAngle:o});I&&i.scaleDown(),i.addToCanvas(),this.confettis.push(i)}}},{key:"removeAllParticles",value:function(){this.confettis=[],p(this.gNode)}}]),t}(),F=function(){function t(e){var n=e.index,o=e.lengthGap,r=e.maxAngleDeviation,i=e.refPoint,a=e.refDegAngle,s=e.parent;Object(u["a"])(this,t),this.obj=B.cloneNode(!0),this.objInnerG=this.obj.querySelector("g.inner"),this.objPath=this.objInnerG.firstElementChild,this.objScale=this.objPath.firstElementChild,this.parent=s,this.popDistance=o*(n+1),this.popAngle=a+g()*Math.floor(r*Math.random()),this.positionFrom={x:i.x,y:i.y},this.positionCurr={x:i.x,y:i.y},this.positionTo=m(this.positionFrom,this.popDistance,this.popAngle),this.duration=P+g()*Math.floor(300*Math.random()),this.easeFunc={x:h({easeType:"ExpoOut",initValue:this.positionFrom.x,endValue:this.positionTo.x,duration:this.duration}),y:h({easeType:"ExpoOut",initValue:this.positionFrom.y,endValue:this.positionTo.y,duration:this.duration})};var l=900+g()*Math.floor(200*Math.random()),c=5+Math.floor(5*Math.random()),f=120;this.flip={direction:"forward",tRef:null,duration:l,translate:{max:c,min:-c,curr:null},rotate:{min:-1*Math.floor(f*Math.random()),max:Math.floor(f*Math.random()),curr:null}},this.flipEase={translate:h({easeType:"QuadInOut",initValue:this.flip.translate.min,endValue:this.flip.translate.max,duration:l}),rotate:h({easeType:"QuadInOut",initValue:this.flip.rotate.min,endValue:this.flip.rotate.max,duration:l})},this.vDown=-1*(2+3*Math.random()),this.innerGY=0,this.tInit=null,this.tCurr=null,this.count=0}return Object(f["a"])(t,[{key:"addToCanvas",value:function(){this.parent.appendChild(this.obj)}},{key:"update",value:function(t){null===this.tInit&&(this.tInit=c()()),this.updatePosition(t),this.updateInnerGroup(),this.updateObjectTransform(t)}},{key:"updatePosition",value:function(){var t=c()()-this.tInit;t<=this.duration&&(this.positionCurr.x=this.easeFunc.x(t),this.positionCurr.y=this.easeFunc.y(t),this.obj.setAttribute("transform","translate(".concat(this.positionCurr.x,",").concat(this.positionCurr.y,")")))}},{key:"updateInnerGroup",value:function(){this.innerGY+=this.vDown,this.objInnerG.setAttribute("transform","translate(0, ".concat(this.innerGY,")"))}},{key:"scaleDown",value:function(){this.objScale.setAttribute("transform","scale(0.35)")}},{key:"removeConfetti",value:function(){this.parent.removeChild(this.obj)}},{key:"updateObjectTransform",value:function(){var t=this;null===this.flip.tRef&&(this.flip.tRef=c()());var e=["translate","rotate"],n=this.flip,o=n.rotate,r=n.translate,i=c()()-this.flip.tRef;switch(this.flip.direction){case"forward":e.forEach(function(e){t.flip[e].curr=t.flipEase[e](i)});break;case"backward":e.forEach(function(e){t.flip[e].curr=t.flipEase[e](t.flip.duration-i)});break;default:}this.objPath.setAttribute("transform","translate(".concat(r.curr,",0)\n       rotate(").concat(o.curr,")")),i>=this.flip.duration&&(this.flip.tRef=c()(),this.flip.direction="forward"===this.flip.direction?"backward":"forward",this.count++)}}]),t}();function $(t){x=t,k=x.querySelector("#bgrect"),C=x.querySelector("#newcoordinate"),B=x.querySelector("defs g.confetti");var e=k.getBBox();function n(){p(C),G=[];var t=k.getBBox();E=t.width,A=t.height,C.setAttribute("transform","scale(1,-1) translate(0,".concat(-A,")"));var e=Math.floor(.5*Math.sqrt(E*E+A*A));I=E<=600;var n={x:I?50:100,y:I?75:150};M=new R(n.x,A-n.y,x.querySelector("g.cone-red").cloneNode(!0)),j=new R(E-n.x,A-n.y,x.querySelector("g.cone-grey").cloneNode(!0)),[M,j].forEach(function(t){I&&t.scaleDown(),t.calculate(),t.addToCanvas(),G.push(new S(L,e,t))})}function o(){_=window.requestAnimationFrame(o),G.forEach(function(t){t.confettis.length<=5?(t.removeAllParticles(),t.createParticles()):t.confettis.forEach(function(e,n){e.update(n);var o=e.positionCurr.y+e.innerGY;o<=-30&&(t.confettis.splice(n,1),e.removeConfetti())})})}E=e.width,A=e.height,q.x=Math.floor(E/2),q.y=A-10,C.setAttribute("transform","scale(1,-1) translate(0,".concat(-A,")")),O=function(){n()},x.addEventListener("mousemove",N),x.addEventListener("touchmove",Q),window.addEventListener("resize",O),n(),o()}function V(){window.removeEventListener("resize",O),window.cancelAnimationFrame(_),x.removeEventListener("mousemove",N),x.removeEventListener("touchmove",Q)}function N(t){var e=t.currentTarget,n=t.clientX,o=t.clientY,r=e.getBoundingClientRect(),i=r.left,a=r.top,s=r.height,l=[n-i,s-(o-a)];q.x=l[0],q.y=l[1],M.calculate(),j.calculate()}function Q(t){var e=t.changedTouches[0],n=e.target,o=e.clientX,r=e.clientY,i=n.getBoundingClientRect(),a=i.left,s=i.top,l=i.height,c=[o-a,l-(r-s)];q.x=c[0],q.y=c[1],M.calculate(),j.calculate()}var Y,z=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("linearGradient",{attrs:{id:"lg-red",gradientTransform:"rotate(-12)"}},[n("stop",{attrs:{offset:"0%","stop-color":"#F67280"}}),n("stop",{attrs:{offset:"15%","stop-color":"#F67280"}}),n("stop",{attrs:{offset:"15%","stop-color":"#fff"}}),n("stop",{attrs:{offset:"30%","stop-color":"#fff"}}),n("stop",{attrs:{offset:"30%","stop-color":"#F67280"}}),n("stop",{attrs:{offset:"45%","stop-color":"#F67280"}}),n("stop",{attrs:{offset:"45%","stop-color":"#fff"}}),n("stop",{attrs:{offset:"60%","stop-color":"#fff"}}),n("stop",{attrs:{offset:"60%","stop-color":"#F67280"}}),n("stop",{attrs:{offset:"75%","stop-color":"#F67280"}}),n("stop",{attrs:{offset:"75%","stop-color":"#fff"}}),n("stop",{attrs:{offset:"90%","stop-color":"#fff"}}),n("stop",{attrs:{offset:"90%","stop-color":"#F67280"}}),n("stop",{attrs:{offset:"100%","stop-color":"#F67280"}})],1)},W=[],J=n("2877"),X={},H=Object(J["a"])(X,z,W,!1,null,null,null),K=H.exports,U=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("linearGradient",{attrs:{id:"lg-grey",gradientTransform:"rotate(-12)"}},[n("stop",{attrs:{offset:"0%","stop-color":"#B6B5B8"}}),n("stop",{attrs:{offset:"15%","stop-color":"#B6B5B8"}}),n("stop",{attrs:{offset:"15%","stop-color":"#fff"}}),n("stop",{attrs:{offset:"30%","stop-color":"#fff"}}),n("stop",{attrs:{offset:"30%","stop-color":"#B6B5B8"}}),n("stop",{attrs:{offset:"45%","stop-color":"#B6B5B8"}}),n("stop",{attrs:{offset:"45%","stop-color":"#fff"}}),n("stop",{attrs:{offset:"60%","stop-color":"#fff"}}),n("stop",{attrs:{offset:"60%","stop-color":"#B6B5B8"}}),n("stop",{attrs:{offset:"75%","stop-color":"#B6B5B8"}}),n("stop",{attrs:{offset:"75%","stop-color":"#fff"}}),n("stop",{attrs:{offset:"90%","stop-color":"#fff"}}),n("stop",{attrs:{offset:"90%","stop-color":"#B6B5B8"}}),n("stop",{attrs:{offset:"100%","stop-color":"#B6B5B8"}})],1)},Z=[],tt={},et=Object(J["a"])(tt,U,Z,!1,null,null,null),nt=et.exports,ot=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("g",{staticClass:"confetti gi-logo"},[n("defs",[n("path",{ref:"refPath",attrs:{id:"hook",d:"M 0,0 a 12.5,12.5 0 1 0 25,0 q -10,-15 -12,-22"}})]),n("g",{staticClass:"inner",attrs:{stroke:"rgb(93,200,240)"}},[n("g",{staticClass:"object",attrs:{stroke:"inherit"}},[n("g",{staticClass:"scale",attrs:{transform:"scale(0.5)",stroke:"inherit",fill:"none"}},t._l(t.hooks,function(t){return n("use",{attrs:{"xlink:href":"#hook",stroke:t.stroke,transform:"translate("+t.tx+","+t.ty+") rotate("+t.rotate+")",id:t.id}})}),0)])])])},rt=[],it={name:"ConfettiLogo",data:function(){return{hooks:[{stroke:"rgb(160,209,14)",tx:23,ty:-16,rotate:-137,id:"lightgreen"},{stroke:"rgb(93,200,240)",tx:2,ty:2,rotate:-10,id:"skyblue"},{stroke:"rgb(248,146,1)",tx:-4,ty:-24,rotate:105,id:"orange"}]}}},at=it,st=(n("77d3"),Object(J["a"])(at,ot,rt,!1,null,"64ad7e94",null)),lt=st.exports,ct=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("g",{staticClass:"cone cone-grey"},[n("g",{staticClass:"inner"},[n("path",{attrs:{fill:"url(#lg-grey)",d:"M-30,0 q30,-5 60,-25 v50 q-30,-10 -60,-25 z"}}),n("g",{staticClass:"tails"},[n("path",{attrs:{fill:"none",d:"M-30,0 q-7,-9 -15,-6 t-15,-2"}}),n("path",{attrs:{fill:"none",d:"M-30,0 q-6,8 -12,4 t-12,2"}}),n("path",{attrs:{fill:"none",d:"M-30,0 q-8,3 -16,0 t-20,0"}})])])])},ut=[],ft={name:"GreyCone"},ht=ft,dt=Object(J["a"])(ht,ct,ut,!1,null,null,null),pt=dt.exports,gt=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("g",{staticClass:"cone cone-red"},[n("g",{staticClass:"inner"},[n("path",{attrs:{fill:"url(#lg-red)",d:"M-30,0 q30,-5 60,-25 v50 q-30,-10 -60,-25 z"}}),n("g",{staticClass:"tails"},[n("path",{attrs:{fill:"none",d:"M-30,0 q-7,-9 -15,-6 t-15,-2"}}),n("path",{attrs:{fill:"none",d:"M-30,0 q-6,8 -12,4 t-12,2"}}),n("path",{attrs:{fill:"none",d:"M-30,0 q-8,3 -16,0 t-20,0"}})])])])},vt=[],mt={name:"RedCone"},yt=mt,wt=Object(J["a"])(yt,gt,vt,!1,null,null,null),bt=wt.exports,xt={name:"ConfettiAnimation",components:{LinearGradientGrey:nt,LinearGradientRed:K,ConfettiParticle:lt,GreyCone:pt,RedCone:bt},props:{svgDefaultAttrs:{type:Object}},mounted:function(){$(this.$refs.svg)},beforeDestroy:function(){console.log("destorying confetti-one!"),V()}},Ct=xt,kt=(n("5740"),Object(J["a"])(Ct,a,s,!1,null,"252af030",null)),Mt=kt.exports,jt=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("svg",t._b({ref:"svgElement"},"svg",t.svgDefaultAttrs,!1),[n("defs",[n("g",{ref:"particles",attrs:{id:"particles"}},[n("confetti-logo"),n("confetti-triangle"),n("confetti-circle"),n("confetti-rectangle")],1)]),n("rect",{ref:"bgrect",attrs:{x:"0",y:"0",width:"100%",height:"100%",fill:"none",stroke:"rgba(0,0,0,0)"}}),n("g",{ref:"svgCanvas",staticClass:"svgCanvas"})])},Ot=[],_t=n("cebc"),Et=null,At=null,Bt=[],Tt=[],Dt=["#a0d10e","#5dc8f0","#f89201","#FE6E61"],Pt={width:null,height:null},qt={x:200},Gt=0,Lt=150,It=b([400,1200],[Gt,Lt]),Rt="http://www.w3.org/2000/svg",St=-400,Ft=60,$t=20,Vt=b([400,1200],[$t,Ft]),Nt=120,Qt=1,Yt=-1,zt=.3,Wt=function(){function t(e,n,o,r){Object(u["a"])(this,t),this.position={x:e,y:n},this.index=o,this.color=r,this.node={},this.node.whole=Tt[o%Tt.length].cloneNode(!0),this.node.innerG=this.node.whole.querySelector("g.inner"),this.node.container=At;var i=[y(800,1200),y(5,10)],a=i[0],s=i[1];this.sway={direction:"forward",tRef:null,duration:a,translate:{curr:null,ease:h({easeType:"QuadInOut",initValue:-s,endValue:s,duration:a})},rotate:{curr:null,ease:h({easeType:"QuadInOut",initValue:-1*Math.floor(Nt*Math.random()),endValue:Math.floor(Nt*Math.random()),duration:a})},scale:{curr:null,ease:h({easeType:"Linear",initValue:Yt+Math.floor(zt*Math.random()),endValue:Qt+Math.floor(zt*Math.random()),duration:a})}},this.yVelocity=.5+2.5*Math.random()}return Object(f["a"])(t,[{key:"update",value:function(){this.fall(),this.wiggle(),this.node.whole.setAttribute("transform","translate(".concat(this.position.x,",").concat(this.position.y,")"));var t=this.sway,e=t.translate,n=t.rotate,o=t.scale;this.node.innerG.setAttribute("transform","translate(".concat(e.curr,",0)\n      rotate(").concat(n.curr,")\n      scale(1,").concat(o.curr,")")),this.position.y>=Pt.height+50&&this.positionReset()}},{key:"fall",value:function(){this.position.y+=this.yVelocity}},{key:"wiggle",value:function(){var t=this;null===this.sway.tRef&&(this.sway.tRef=c()());var e=["translate","scale","rotate"],n=c()()-this.sway.tRef;switch(this.sway.direction){case"forward":e.forEach(function(e){t.sway[e].curr=t.sway[e].ease(n)});break;case"backward":e.forEach(function(e){t.sway[e].curr=t.sway[e].ease(t.sway.duration-n)});break;default:}n>=this.sway.duration&&(this.sway.tRef=c()(),this.sway.direction="forward"===this.sway.direction?"backward":"forward")}},{key:"add",value:function(){this.node.innerG.setAttribute("stroke",this.color),this.node.innerG.setAttribute("fill",this.color),this.node.container.appendChild(this.node.whole)}},{key:"remove",value:function(){this.node.container.removeChild(this.node.whole),Bt.splice(this.index,1)}},{key:"positionReset",value:function(){this.position.x=qt.x+(Pt.width-2*qt.x)*Math.random(),this.position.y=y(St,0)}}]),t}();function Jt(t){var e=t.svgCanvas,n=t.bgrect,o=t.particles;function r(){Bt=[],p(e),Pt.width=n.getBBox().width,Pt.height=n.getBBox().height;var t=Math.floor(Vt(Pt.width));qt.x=It(Pt.width),At=document.createElementNS(Rt,"g"),At.setAttributeNS(null,"id","confetti-container"),e.appendChild(At);for(var o=0;o<t;o++){var r=new Wt(qt.x+(Pt.width-2*qt.x)*Math.random(),y(St,0),o,w(Dt));r.add(),Bt.push(r)}}function i(){Bt.forEach(function(t){return t.update()}),Et=window.requestAnimationFrame(i)}Y=function(t){r()},window.addEventListener("resize",Y),Array.prototype.slice.call(o.querySelectorAll(".confetti")).forEach(function(t){return Tt.push(t)}),r(),i()}function Xt(){window.cancelAnimationFrame(Et),window.removeEventListener("resize",Y)}var Ht=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("g",{staticClass:"confetti"},[n("g",{staticClass:"inner"},[n("g",{attrs:{transform:"scale(0.7)"}},[n("polygon",{staticClass:"triangle",attrs:{points:"0 -16, 10 8, -10 8","stroke-width":"3","stroke-linejoin":"round","stroke-linecap":"round"}})])])])},Kt=[],Ut={name:"ConfettiTriangle"},Zt=Ut,te=Object(J["a"])(Zt,Ht,Kt,!1,null,null,null),ee=te.exports,ne=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("g",{staticClass:"confetti"},[n("g",{staticClass:"inner"},[n("circle",{staticClass:"circle",attrs:{cx:"0",cy:"0",r:"8","stroke-width":"3","stroke-linejoin":"round","stroke-linecap":"round"}})])])},oe=[],re={name:"ConfettiTriangle"},ie=re,ae=Object(J["a"])(ie,ne,oe,!1,null,null,null),se=ae.exports,le=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("g",{staticClass:"confetti"},[n("g",{staticClass:"inner"},[n("path",{staticClass:"cross",attrs:{d:"M-10,-10 L10,10 M10,-10 L-10,10",fill:"none","stroke-width":"3","stroke-linejoin":"round","stroke-linecap":"round"}})])])},ce=[],ue={name:"ConfettiCross"},fe=ue,he=Object(J["a"])(fe,le,ce,!1,null,null,null),de=he.exports,pe=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("g",{staticClass:"confetti"},[n("g",{staticClass:"inner"},[n("path",{staticClass:"cross",attrs:{d:"M2,-32 q-20,7.5 0,15 20,7.5 0,15 -20,7.5 0,15 20,7.5 -2,17",fill:"none","stroke-width":"3","stroke-linejoin":"round","stroke-linecap":"round"}})])])},ge=[],ve={name:"ConfettiRamen"},me=ve,ye=Object(J["a"])(me,pe,ge,!1,null,null,null),we=ye.exports,be=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("g",{staticClass:"confetti"},[n("g",{staticClass:"inner"},[n("rect",{staticClass:"rect",attrs:{x:"-6",y:"-6",width:"12",height:"12","stroke-width":"3","stroke-linejoin":"round","stroke-linecap":"round"}})])])},xe=[],Ce={name:"ConfettiRectangle"},ke=Ce,Me=Object(J["a"])(ke,be,xe,!1,null,null,null),je=Me.exports,Oe=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("g",{staticClass:"confetti"},[n("g",{staticClass:"inner"},[n("path",{staticClass:"star",attrs:{d:"M-7,-7 L7,7 M7,-7 L-7,7 M0,-12 L0,12 M-12,0 L12,0",fill:"none","stroke-width":"3","stroke-linejoin":"round","stroke-linecap":"round"}})])])},_e=[],Ee={name:"ConfettiStar"},Ae=Ee,Be=Object(J["a"])(Ae,Oe,_e,!1,null,null,null),Te=Be.exports,De={confettiLogo:lt,confettiTriangle:ee,confettiCircle:se,confettiCross:de,confettiRamen:we,confettiRectangle:je,confettiStar:Te},Pe={name:"ConfettiTwo",components:Object(_t["a"])({},De),props:{svgDefaultAttrs:{type:Object}},mounted:function(){Jt(this.$refs)},beforeDestroy:function(){console.log("destorying confetti-two!"),Xt()}},qe=Pe,Ge=(n("eb76"),Object(J["a"])(qe,jt,Ot,!1,null,"2c655b9d",null)),Le=Ge.exports,Ie=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},Re=[function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"welcomemessage"},[o("img",{staticClass:"group-pic",attrs:{src:n("1ff5")}}),o("h1",{staticClass:"text text-big"},[t._v("Welcome, The Dreamers!")]),o("p",{staticClass:"text text-small"},[t._v("You are now embarking on a new journey. We hope you have a blast!")]),o("button",{staticClass:"awesome"},[t._v("Awesome")])])}],Se=(n("d197"),{}),Fe=Object(J["a"])(Se,Ie,Re,!1,null,"53f42596",null),$e=Fe.exports,Ve={name:"app",components:{WelcomeMessage:$e},data:function(){return{componentList:null,currentComponent:null,svgDefaultAttrs:{xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",version:"1.1"}}},created:function(){this.componentList={ConfettiOne:Mt,ConfettiTwo:Le},this.currentComponent=Mt}},Ne=Ve,Qe=(n("5c0b"),Object(J["a"])(Ne,r,i,!1,null,null,null)),Ye=Qe.exports;o["a"].config.productionTip=!1,new o["a"]({render:function(t){return t(Ye)}}).$mount("#app")},5740:function(t,e,n){"use strict";var o=n("d494"),r=n.n(o);r.a},"5c0b":function(t,e,n){"use strict";var o=n("458f"),r=n.n(o);r.a},"68c3":function(t,e,n){},"77d3":function(t,e,n){"use strict";var o=n("68c3"),r=n.n(o);r.a},"91cd":function(t,e,n){},d197:function(t,e,n){"use strict";var o=n("91cd"),r=n.n(o);r.a},d494:function(t,e,n){},eb76:function(t,e,n){"use strict";var o=n("4d10"),r=n.n(o);r.a}});
//# sourceMappingURL=app.77a27eda.js.map