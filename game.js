/* ---- vendor_pageflip.js ---- */
/* StPageFlip 2.0.7 (https://github.com/Nodlik/StPageFlip) MIT License, Copyright (c) 2020 Nodlik. 10/2 제목 화면 책장 넘김에 씀 */
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t=t||self).St={})}(this,(function(t){"use strict";class e{constructor(t,e){this.state={angle:0,area:[],position:{x:0,y:0},hardAngle:0,hardDrawingAngle:0},this.createdDensity=e,this.nowDrawingDensity=this.createdDensity,this.render=t}setDensity(t){this.createdDensity=t,this.nowDrawingDensity=t}setDrawingDensity(t){this.nowDrawingDensity=t}setPosition(t){this.state.position=t}setAngle(t){this.state.angle=t}setArea(t){this.state.area=t}setHardDrawingAngle(t){this.state.hardDrawingAngle=t}setHardAngle(t){this.state.hardAngle=t,this.state.hardDrawingAngle=t}setOrientation(t){this.orientation=t}getDrawingDensity(){return this.nowDrawingDensity}getDensity(){return this.createdDensity}getHardAngle(){return this.state.hardAngle}}class i extends e{constructor(t,e,i){super(t,i),this.image=null,this.isLoad=!1,this.loadingAngle=0,this.image=new Image,this.image.src=e}draw(t){const e=this.render.getContext(),i=this.render.convertToGlobal(this.state.position),s=this.render.getRect().pageWidth,n=this.render.getRect().height;e.save(),e.translate(i.x,i.y),e.beginPath();for(let t of this.state.area)null!==t&&(t=this.render.convertToGlobal(t),e.lineTo(t.x-i.x,t.y-i.y));e.rotate(this.state.angle),e.clip(),this.isLoad?e.drawImage(this.image,0,0,s,n):this.drawLoader(e,{x:0,y:0},s,n),e.restore()}simpleDraw(t){const e=this.render.getRect(),i=this.render.getContext(),s=e.pageWidth,n=e.height,h=1===t?e.left+e.pageWidth:e.left,r=e.top;this.isLoad?i.drawImage(this.image,h,r,s,n):this.drawLoader(i,{x:h,y:r},s,n)}drawLoader(t,e,i,s){t.beginPath(),t.strokeStyle="rgb(200, 200, 200)",t.fillStyle="rgb(255, 255, 255)",t.lineWidth=1,t.rect(e.x+1,e.y+1,i-1,s-1),t.stroke(),t.fill();const n={x:e.x+i/2,y:e.y+s/2};t.beginPath(),t.lineWidth=10,t.arc(n.x,n.y,20,this.loadingAngle,3*Math.PI/2+this.loadingAngle),t.stroke(),t.closePath(),this.loadingAngle+=.07,this.loadingAngle>=2*Math.PI&&(this.loadingAngle=0)}load(){this.isLoad||(this.image.onload=()=>{this.isLoad=!0})}newTemporaryCopy(){return this}getTemporaryCopy(){return this}hideTemporaryCopy(){}}class s{constructor(t,e){this.pages=[],this.currentPageIndex=0,this.currentSpreadIndex=0,this.landscapeSpread=[],this.portraitSpread=[],this.render=e,this.app=t,this.currentPageIndex=0,this.isShowCover=this.app.getSettings().showCover}destroy(){this.pages=[]}createSpread(){this.landscapeSpread=[],this.portraitSpread=[];for(let t=0;t<this.pages.length;t++)this.portraitSpread.push([t]);let t=0;this.isShowCover&&(this.pages[0].setDensity("hard"),this.landscapeSpread.push([t]),t++);for(let e=t;e<this.pages.length;e+=2)e<this.pages.length-1?this.landscapeSpread.push([e,e+1]):(this.landscapeSpread.push([e]),this.pages[e].setDensity("hard"))}getSpread(){return"landscape"===this.render.getOrientation()?this.landscapeSpread:this.portraitSpread}getSpreadIndexByPage(t){const e=this.getSpread();for(let i=0;i<e.length;i++)if(t===e[i][0]||t===e[i][1])return i;return null}getPageCount(){return this.pages.length}getPages(){return this.pages}getPage(t){if(t>=0&&t<this.pages.length)return this.pages[t];throw new Error("Invalid page number")}nextBy(t){const e=this.pages.indexOf(t);return e<this.pages.length-1?this.pages[e+1]:null}prevBy(t){const e=this.pages.indexOf(t);return e>0?this.pages[e-1]:null}getFlippingPage(t){const e=this.currentSpreadIndex;if("portrait"===this.render.getOrientation())return 0===t?this.pages[e].newTemporaryCopy():this.pages[e-1];{const i=0===t?this.getSpread()[e+1]:this.getSpread()[e-1];return 1===i.length||0===t?this.pages[i[0]]:this.pages[i[1]]}}getBottomPage(t){const e=this.currentSpreadIndex;if("portrait"===this.render.getOrientation())return 0===t?this.pages[e+1]:this.pages[e-1];{const i=0===t?this.getSpread()[e+1]:this.getSpread()[e-1];return 1===i.length?this.pages[i[0]]:0===t?this.pages[i[1]]:this.pages[i[0]]}}showNext(){this.currentSpreadIndex<this.getSpread().length&&(this.currentSpreadIndex++,this.showSpread())}showPrev(){this.currentSpreadIndex>0&&(this.currentSpreadIndex--,this.showSpread())}getCurrentPageIndex(){return this.currentPageIndex}show(t=null){if(null===t&&(t=this.currentPageIndex),t<0||t>=this.pages.length)return;const e=this.getSpreadIndexByPage(t);null!==e&&(this.currentSpreadIndex=e,this.showSpread())}getCurrentSpreadIndex(){return this.currentSpreadIndex}setCurrentSpreadIndex(t){if(!(t>=0&&t<this.getSpread().length))throw new Error("Invalid page");this.currentSpreadIndex=t}showSpread(){const t=this.getSpread()[this.currentSpreadIndex];2===t.length?(this.render.setLeftPage(this.pages[t[0]]),this.render.setRightPage(this.pages[t[1]])):"landscape"===this.render.getOrientation()&&t[0]===this.pages.length-1?(this.render.setLeftPage(this.pages[t[0]]),this.render.setRightPage(null)):(this.render.setLeftPage(null),this.render.setRightPage(this.pages[t[0]])),this.currentPageIndex=t[0],this.app.updatePageIndex(this.currentPageIndex)}}class n extends s{constructor(t,e,i){super(t,e),this.imagesHref=i}load(){for(const t of this.imagesHref){const e=new i(this.render,t,"soft");e.load(),this.pages.push(e)}this.createSpread()}}class h{static GetDistanceBetweenTwoPoint(t,e){return null===t||null===e?1/0:Math.sqrt(Math.pow(e.x-t.x,2)+Math.pow(e.y-t.y,2))}static GetSegmentLength(t){return h.GetDistanceBetweenTwoPoint(t[0],t[1])}static GetAngleBetweenTwoLine(t,e){const i=t[0].y-t[1].y,s=e[0].y-e[1].y,n=t[1].x-t[0].x,h=e[1].x-e[0].x;return Math.acos((i*s+n*h)/(Math.sqrt(i*i+n*n)*Math.sqrt(s*s+h*h)))}static PointInRect(t,e){return null===e?null:e.x>=t.left&&e.x<=t.width+t.left&&e.y>=t.top&&e.y<=t.top+t.height?e:null}static GetRotatedPoint(t,e,i){return{x:t.x*Math.cos(i)+t.y*Math.sin(i)+e.x,y:t.y*Math.cos(i)-t.x*Math.sin(i)+e.y}}static LimitPointToCircle(t,e,i){if(h.GetDistanceBetweenTwoPoint(t,i)<=e)return i;const s=t.x,n=t.y,r=i.x,o=i.y;let a=Math.sqrt(Math.pow(e,2)*Math.pow(s-r,2)/(Math.pow(s-r,2)+Math.pow(n-o,2)))+s;i.x<0&&(a*=-1);let g=(a-s)*(n-o)/(s-r)+n;return s-r+n===0&&(g=e),{x:a,y:g}}static GetIntersectBetweenTwoSegment(t,e,i){return h.PointInRect(t,h.GetIntersectBeetwenTwoLine(e,i))}static GetIntersectBeetwenTwoLine(t,e){const i=t[0].y-t[1].y,s=e[0].y-e[1].y,n=t[1].x-t[0].x,h=e[1].x-e[0].x,r=t[0].x*t[1].y-t[1].x*t[0].y,o=e[0].x*e[1].y-e[1].x*e[0].y,a=i*o-s*r,g=n*o-h*r,l=-(r*h-o*n)/(i*h-s*n),d=-(i*o-s*r)/(i*h-s*n);if(isFinite(l)&&isFinite(d))return{x:l,y:d};if(Math.abs(a-g)<.1)throw new Error("Segment included");return null}static GetCordsFromTwoPoint(t,e){const i=Math.abs(t.x-e.x),s=Math.abs(t.y-e.y),n=Math.max(i,s),h=[t];function r(t,e,i,s,n){return e>t?t+n*(i/s):e<t?t-n*(i/s):t}for(let o=1;o<=n;o+=1)h.push({x:r(t.x,e.x,i,n,o),y:r(t.y,e.y,s,n,o)});return h}}class r extends e{constructor(t,e,i){super(t,i),this.copiedElement=null,this.temporaryCopy=null,this.isLoad=!1,this.element=e,this.element.classList.add("stf__item"),this.element.classList.add("--"+i)}newTemporaryCopy(){return"hard"===this.nowDrawingDensity?this:(null===this.temporaryCopy&&(this.copiedElement=this.element.cloneNode(!0),this.element.parentElement.appendChild(this.copiedElement),this.temporaryCopy=new r(this.render,this.copiedElement,this.nowDrawingDensity)),this.getTemporaryCopy())}getTemporaryCopy(){return this.temporaryCopy}hideTemporaryCopy(){null!==this.temporaryCopy&&(this.copiedElement.remove(),this.copiedElement=null,this.temporaryCopy=null)}draw(t){const e=t||this.nowDrawingDensity,i=this.render.convertToGlobal(this.state.position),s=this.render.getRect().pageWidth,n=this.render.getRect().height;this.element.classList.remove("--simple");const h=`\n            display: block;\n            z-index: ${this.element.style.zIndex};\n            left: 0;\n            top: 0;\n            width: ${s}px;\n            height: ${n}px;\n        `;"hard"===e?this.drawHard(h):this.drawSoft(i,h)}drawHard(t=""){const e=this.render.getRect().left+this.render.getRect().width/2,i=this.state.hardDrawingAngle,s=t+"\n                backface-visibility: hidden;\n                -webkit-backface-visibility: hidden;\n                clip-path: none;\n                -webkit-clip-path: none;\n            "+(0===this.orientation?`transform-origin: ${this.render.getRect().pageWidth}px 0; \n                   transform: translate3d(0, 0, 0) rotateY(${i}deg);`:`transform-origin: 0 0; \n                   transform: translate3d(${e}px, 0, 0) rotateY(${i}deg);`);this.element.style.cssText=s}drawSoft(t,e=""){let i="polygon( ";for(const t of this.state.area)if(null!==t){let e=1===this.render.getDirection()?{x:-t.x+this.state.position.x,y:t.y-this.state.position.y}:{x:t.x-this.state.position.x,y:t.y-this.state.position.y};e=h.GetRotatedPoint(e,{x:0,y:0},this.state.angle),i+=e.x+"px "+e.y+"px, "}i=i.slice(0,-2),i+=")";const s=e+`transform-origin: 0 0; clip-path: ${i}; -webkit-clip-path: ${i};`+(this.render.isSafari()&&0===this.state.angle?`transform: translate(${t.x}px, ${t.y}px);`:`transform: translate3d(${t.x}px, ${t.y}px, 0) rotate(${this.state.angle}rad);`);this.element.style.cssText=s}simpleDraw(t){const e=this.render.getRect(),i=e.pageWidth,s=e.height,n=1===t?e.left+e.pageWidth:e.left,h=e.top;this.element.classList.add("--simple"),this.element.style.cssText=`\n            position: absolute; \n            display: block; \n            height: ${s}px; \n            left: ${n}px; \n            top: ${h}px; \n            width: ${i}px; \n            z-index: ${this.render.getSettings().startZIndex+1};`}getElement(){return this.element}load(){this.isLoad=!0}setOrientation(t){super.setOrientation(t),this.element.classList.remove("--left","--right"),this.element.classList.add(1===t?"--right":"--left")}setDrawingDensity(t){this.element.classList.remove("--soft","--hard"),this.element.classList.add("--"+t),super.setDrawingDensity(t)}}class o extends s{constructor(t,e,i,s){super(t,e),this.element=i,this.pagesElement=s}load(){for(const t of this.pagesElement){const e=new r(this.render,t,"hard"===t.dataset.density?"hard":"soft");e.load(),this.pages.push(e)}this.createSpread()}}class a{constructor(t,e,i,s){this.direction=t,this.corner=e,this.topIntersectPoint=null,this.sideIntersectPoint=null,this.bottomIntersectPoint=null,this.pageWidth=parseInt(i,10),this.pageHeight=parseInt(s,10)}calc(t){try{return this.position=this.calcAngleAndPosition(t),this.calculateIntersectPoint(this.position),!0}catch(t){return!1}}getFlippingClipArea(){const t=[];let e=!1;return t.push(this.rect.topLeft),t.push(this.topIntersectPoint),null===this.sideIntersectPoint?e=!0:(t.push(this.sideIntersectPoint),null===this.bottomIntersectPoint&&(e=!1)),t.push(this.bottomIntersectPoint),(e||"bottom"===this.corner)&&t.push(this.rect.bottomLeft),t}getBottomClipArea(){const t=[];return t.push(this.topIntersectPoint),"top"===this.corner?t.push({x:this.pageWidth,y:0}):(null!==this.topIntersectPoint&&t.push({x:this.pageWidth,y:0}),t.push({x:this.pageWidth,y:this.pageHeight})),null!==this.sideIntersectPoint?h.GetDistanceBetweenTwoPoint(this.sideIntersectPoint,this.topIntersectPoint)>=10&&t.push(this.sideIntersectPoint):"top"===this.corner&&t.push({x:this.pageWidth,y:this.pageHeight}),t.push(this.bottomIntersectPoint),t.push(this.topIntersectPoint),t}getAngle(){return 0===this.direction?-this.angle:this.angle}getRect(){return this.rect}getPosition(){return this.position}getActiveCorner(){return 0===this.direction?this.rect.topLeft:this.rect.topRight}getDirection(){return this.direction}getFlippingProgress(){return Math.abs((this.position.x-this.pageWidth)/(2*this.pageWidth)*100)}getCorner(){return this.corner}getBottomPagePosition(){return 1===this.direction?{x:this.pageWidth,y:0}:{x:0,y:0}}getShadowStartPoint(){return"top"===this.corner?this.topIntersectPoint:null!==this.sideIntersectPoint?this.sideIntersectPoint:this.topIntersectPoint}getShadowAngle(){const t=h.GetAngleBetweenTwoLine(this.getSegmentToShadowLine(),[{x:0,y:0},{x:this.pageWidth,y:0}]);return 0===this.direction?t:Math.PI-t}calcAngleAndPosition(t){let e=t;if(this.updateAngleAndGeometry(e),e="top"===this.corner?this.checkPositionAtCenterLine(e,{x:0,y:0},{x:0,y:this.pageHeight}):this.checkPositionAtCenterLine(e,{x:0,y:this.pageHeight},{x:0,y:0}),Math.abs(e.x-this.pageWidth)<1&&Math.abs(e.y)<1)throw new Error("Point is too small");return e}updateAngleAndGeometry(t){this.angle=this.calculateAngle(t),this.rect=this.getPageRect(t)}calculateAngle(t){const e=this.pageWidth-t.x+1,i="bottom"===this.corner?this.pageHeight-t.y:t.y;let s=2*Math.acos(e/Math.sqrt(i*i+e*e));i<0&&(s=-s);const n=Math.PI-s;if(!isFinite(s)||n>=0&&n<.003)throw new Error("The G point is too small");return"bottom"===this.corner&&(s=-s),s}getPageRect(t){return"top"===this.corner?this.getRectFromBasePoint([{x:0,y:0},{x:this.pageWidth,y:0},{x:0,y:this.pageHeight},{x:this.pageWidth,y:this.pageHeight}],t):this.getRectFromBasePoint([{x:0,y:-this.pageHeight},{x:this.pageWidth,y:-this.pageHeight},{x:0,y:0},{x:this.pageWidth,y:0}],t)}getRectFromBasePoint(t,e){return{topLeft:this.getRotatedPoint(t[0],e),topRight:this.getRotatedPoint(t[1],e),bottomLeft:this.getRotatedPoint(t[2],e),bottomRight:this.getRotatedPoint(t[3],e)}}getRotatedPoint(t,e){return{x:t.x*Math.cos(this.angle)+t.y*Math.sin(this.angle)+e.x,y:t.y*Math.cos(this.angle)-t.x*Math.sin(this.angle)+e.y}}calculateIntersectPoint(t){const e={left:-1,top:-1,width:this.pageWidth+2,height:this.pageHeight+2};"top"===this.corner?(this.topIntersectPoint=h.GetIntersectBetweenTwoSegment(e,[t,this.rect.topRight],[{x:0,y:0},{x:this.pageWidth,y:0}]),this.sideIntersectPoint=h.GetIntersectBetweenTwoSegment(e,[t,this.rect.bottomLeft],[{x:this.pageWidth,y:0},{x:this.pageWidth,y:this.pageHeight}]),this.bottomIntersectPoint=h.GetIntersectBetweenTwoSegment(e,[this.rect.bottomLeft,this.rect.bottomRight],[{x:0,y:this.pageHeight},{x:this.pageWidth,y:this.pageHeight}])):(this.topIntersectPoint=h.GetIntersectBetweenTwoSegment(e,[this.rect.topLeft,this.rect.topRight],[{x:0,y:0},{x:this.pageWidth,y:0}]),this.sideIntersectPoint=h.GetIntersectBetweenTwoSegment(e,[t,this.rect.topLeft],[{x:this.pageWidth,y:0},{x:this.pageWidth,y:this.pageHeight}]),this.bottomIntersectPoint=h.GetIntersectBetweenTwoSegment(e,[this.rect.bottomLeft,this.rect.bottomRight],[{x:0,y:this.pageHeight},{x:this.pageWidth,y:this.pageHeight}]))}checkPositionAtCenterLine(t,e,i){let s=t;const n=h.LimitPointToCircle(e,this.pageWidth,s);s!==n&&(s=n,this.updateAngleAndGeometry(s));const r=Math.sqrt(Math.pow(this.pageWidth,2)+Math.pow(this.pageHeight,2));let o=this.rect.bottomRight,a=this.rect.topLeft;if("bottom"===this.corner&&(o=this.rect.topRight,a=this.rect.bottomLeft),o.x<=0){const t=h.LimitPointToCircle(i,r,a);t!==s&&(s=t,this.updateAngleAndGeometry(s))}return s}getSegmentToShadowLine(){const t=this.getShadowStartPoint();return[t,t!==this.sideIntersectPoint&&null!==this.sideIntersectPoint?this.sideIntersectPoint:this.bottomIntersectPoint]}}class g{constructor(t,e){this.flippingPage=null,this.bottomPage=null,this.calc=null,this.state="read",this.render=t,this.app=e}fold(t){this.setState("user_fold"),null===this.calc&&this.start(t),this.do(this.render.convertToPage(t))}flip(t){if(this.app.getSettings().disableFlipByClick&&!this.isPointOnCorners(t))return;if(null!==this.calc&&this.render.finishAnimation(),!this.start(t))return;const e=this.getBoundsRect();this.setState("flipping");const i=e.height/10,s="bottom"===this.calc.getCorner()?e.height-i:i,n="bottom"===this.calc.getCorner()?e.height:0;this.calc.calc({x:e.pageWidth-i,y:s}),this.animateFlippingTo({x:e.pageWidth-i,y:s},{x:-e.pageWidth,y:n},!0)}start(t){this.reset();const e=this.render.convertToBook(t),i=this.getBoundsRect(),s=this.getDirectionByPoint(e),n=e.y>=i.height/2?"bottom":"top";if(!this.checkDirection(s))return!1;try{if(this.flippingPage=this.app.getPageCollection().getFlippingPage(s),this.bottomPage=this.app.getPageCollection().getBottomPage(s),"landscape"===this.render.getOrientation())if(1===s){const t=this.app.getPageCollection().nextBy(this.flippingPage);null!==t&&this.flippingPage.getDensity()!==t.getDensity()&&(this.flippingPage.setDrawingDensity("hard"),t.setDrawingDensity("hard"))}else{const t=this.app.getPageCollection().prevBy(this.flippingPage);null!==t&&this.flippingPage.getDensity()!==t.getDensity()&&(this.flippingPage.setDrawingDensity("hard"),t.setDrawingDensity("hard"))}return this.render.setDirection(s),this.calc=new a(s,n,i.pageWidth.toString(10),i.height.toString(10)),!0}catch(t){return!1}}do(t){if(null!==this.calc&&this.calc.calc(t)){const t=this.calc.getFlippingProgress();this.bottomPage.setArea(this.calc.getBottomClipArea()),this.bottomPage.setPosition(this.calc.getBottomPagePosition()),this.bottomPage.setAngle(0),this.bottomPage.setHardAngle(0),this.flippingPage.setArea(this.calc.getFlippingClipArea()),this.flippingPage.setPosition(this.calc.getActiveCorner()),this.flippingPage.setAngle(this.calc.getAngle()),0===this.calc.getDirection()?this.flippingPage.setHardAngle(90*(200-2*t)/100):this.flippingPage.setHardAngle(-90*(200-2*t)/100),this.render.setPageRect(this.calc.getRect()),this.render.setBottomPage(this.bottomPage),this.render.setFlippingPage(this.flippingPage),this.render.setShadowData(this.calc.getShadowStartPoint(),this.calc.getShadowAngle(),t,this.calc.getDirection())}}flipToPage(t,e){const i=this.app.getPageCollection().getCurrentSpreadIndex(),s=this.app.getPageCollection().getSpreadIndexByPage(t);try{s>i&&(this.app.getPageCollection().setCurrentSpreadIndex(s-1),this.flipNext(e)),s<i&&(this.app.getPageCollection().setCurrentSpreadIndex(s+1),this.flipPrev(e))}catch(t){}}flipNext(t){this.flip({x:this.render.getRect().left+2*this.render.getRect().pageWidth-10,y:"top"===t?1:this.render.getRect().height-2})}flipPrev(t){this.flip({x:10,y:"top"===t?1:this.render.getRect().height-2})}stopMove(){if(null===this.calc)return;const t=this.calc.getPosition(),e=this.getBoundsRect(),i="bottom"===this.calc.getCorner()?e.height:0;t.x<=0?this.animateFlippingTo(t,{x:-e.pageWidth,y:i},!0):this.animateFlippingTo(t,{x:e.pageWidth,y:i},!1)}showCorner(t){if(!this.checkState("read","fold_corner"))return;const e=this.getBoundsRect(),i=e.pageWidth;if(this.isPointOnCorners(t))if(null===this.calc){if(!this.start(t))return;this.setState("fold_corner"),this.calc.calc({x:i-1,y:1});const s=50,n="bottom"===this.calc.getCorner()?e.height-1:1,h="bottom"===this.calc.getCorner()?e.height-s:s;this.animateFlippingTo({x:i-1,y:n},{x:i-s,y:h},!1,!1)}else this.do(this.render.convertToPage(t));else this.setState("read"),this.render.finishAnimation(),this.stopMove()}animateFlippingTo(t,e,i,s=!0){const n=h.GetCordsFromTwoPoint(t,e),r=[];for(const t of n)r.push(()=>this.do(t));const o=this.getAnimationDuration(n.length);this.render.startAnimation(r,o,()=>{this.calc&&(i&&(1===this.calc.getDirection()?this.app.turnToPrevPage():this.app.turnToNextPage()),s&&(this.render.setBottomPage(null),this.render.setFlippingPage(null),this.render.clearShadow(),this.setState("read"),this.reset()))})}getCalculation(){return this.calc}getState(){return this.state}setState(t){this.state!==t&&(this.app.updateState(t),this.state=t)}getDirectionByPoint(t){const e=this.getBoundsRect();if("portrait"===this.render.getOrientation()){if(t.x-e.pageWidth<=e.width/5)return 1}else if(t.x<e.width/2)return 1;return 0}getAnimationDuration(t){const e=this.app.getSettings().flippingTime;return t>=1e3?e:t/1e3*e}checkDirection(t){return 0===t?this.app.getCurrentPageIndex()<this.app.getPageCount()-1:this.app.getCurrentPageIndex()>=1}reset(){this.calc=null,this.flippingPage=null,this.bottomPage=null}getBoundsRect(){return this.render.getRect()}checkState(...t){for(const e of t)if(this.state===e)return!0;return!1}isPointOnCorners(t){const e=this.getBoundsRect(),i=e.pageWidth,s=Math.sqrt(Math.pow(i,2)+Math.pow(e.height,2))/5,n=this.render.convertToBook(t);return n.x>0&&n.y>0&&n.x<e.width&&n.y<e.height&&(n.x<s||n.x>e.width-s)&&(n.y<s||n.y>e.height-s)}}class l{constructor(t,e){this.leftPage=null,this.rightPage=null,this.flippingPage=null,this.bottomPage=null,this.direction=null,this.orientation=null,this.shadow=null,this.animation=null,this.pageRect=null,this.boundsRect=null,this.timer=0,this.safari=!1,this.setting=e,this.app=t;const i=new RegExp("Version\\/[\\d\\.]+.*Safari/");this.safari=null!==i.exec(window.navigator.userAgent)}render(t){if(null!==this.animation){const e=Math.round((t-this.animation.startedAt)/this.animation.durationFrame);e<this.animation.frames.length?this.animation.frames[e]():(this.animation.onAnimateEnd(),this.animation=null)}this.timer=t,this.drawFrame()}start(){this.update();const t=e=>{this.render(e),requestAnimationFrame(t)};requestAnimationFrame(t)}startAnimation(t,e,i){this.finishAnimation(),this.animation={frames:t,duration:e,durationFrame:e/t.length,onAnimateEnd:i,startedAt:this.timer}}finishAnimation(){null!==this.animation&&(this.animation.frames[this.animation.frames.length-1](),null!==this.animation.onAnimateEnd&&this.animation.onAnimateEnd()),this.animation=null}update(){this.boundsRect=null;const t=this.calculateBoundsRect();this.orientation!==t&&(this.orientation=t,this.app.updateOrientation(t))}calculateBoundsRect(){let t="landscape";const e=this.getBlockWidth(),i=e/2,s=this.getBlockHeight()/2,n=this.setting.width/this.setting.height;let h=this.setting.width,r=this.setting.height,o=i-h;return"stretch"===this.setting.size?(e<2*this.setting.minWidth&&this.app.getSettings().usePortrait&&(t="portrait"),h="portrait"===t?this.getBlockWidth():this.getBlockWidth()/2,h>this.setting.maxWidth&&(h=this.setting.maxWidth),r=h/n,r>this.getBlockHeight()&&(r=this.getBlockHeight(),h=r*n),o="portrait"===t?i-h/2-h:i-h):e<2*h&&this.app.getSettings().usePortrait&&(t="portrait",o=i-h/2-h),this.boundsRect={left:o,top:s-r/2,width:2*h,height:r,pageWidth:h},t}setShadowData(t,e,i,s){if(!this.app.getSettings().drawShadow)return;const n=100*this.getSettings().maxShadowOpacity;this.shadow={pos:t,angle:e,width:3*this.getRect().pageWidth/4*i/100,opacity:(100-i)*n/100/100,direction:s,progress:2*i}}clearShadow(){this.shadow=null}getBlockWidth(){return this.app.getUI().getDistElement().offsetWidth}getBlockHeight(){return this.app.getUI().getDistElement().offsetHeight}getDirection(){return this.direction}getRect(){return null===this.boundsRect&&this.calculateBoundsRect(),this.boundsRect}getSettings(){return this.app.getSettings()}getOrientation(){return this.orientation}setPageRect(t){this.pageRect=t}setDirection(t){this.direction=t}setRightPage(t){null!==t&&t.setOrientation(1),this.rightPage=t}setLeftPage(t){null!==t&&t.setOrientation(0),this.leftPage=t}setBottomPage(t){null!==t&&t.setOrientation(1===this.direction?0:1),this.bottomPage=t}setFlippingPage(t){null!==t&&t.setOrientation(0===this.direction&&"portrait"!==this.orientation?0:1),this.flippingPage=t}convertToBook(t){const e=this.getRect();return{x:t.x-e.left,y:t.y-e.top}}isSafari(){return this.safari}convertToPage(t,e){e||(e=this.direction);const i=this.getRect();return{x:0===e?t.x-i.left-i.width/2:i.width/2-t.x+i.left,y:t.y-i.top}}convertToGlobal(t,e){if(e||(e=this.direction),null==t)return null;const i=this.getRect();return{x:0===e?t.x+i.left+i.width/2:i.width/2-t.x+i.left,y:t.y+i.top}}convertRectToGlobal(t,e){return e||(e=this.direction),{topLeft:this.convertToGlobal(t.topLeft,e),topRight:this.convertToGlobal(t.topRight,e),bottomLeft:this.convertToGlobal(t.bottomLeft,e),bottomRight:this.convertToGlobal(t.bottomRight,e)}}}class d extends l{constructor(t,e,i){super(t,e),this.canvas=i,this.ctx=i.getContext("2d")}getContext(){return this.ctx}reload(){}drawFrame(){this.clear(),"portrait"!==this.orientation&&null!=this.leftPage&&this.leftPage.simpleDraw(0),null!=this.rightPage&&this.rightPage.simpleDraw(1),null!=this.bottomPage&&this.bottomPage.draw(),this.drawBookShadow(),null!=this.flippingPage&&this.flippingPage.draw(),null!=this.shadow&&(this.drawOuterShadow(),this.drawInnerShadow());const t=this.getRect();"portrait"===this.orientation&&(this.ctx.beginPath(),this.ctx.rect(t.left+t.pageWidth,t.top,t.width,t.height),this.ctx.clip())}drawBookShadow(){const t=this.getRect();this.ctx.save(),this.ctx.beginPath();const e=t.width/20;this.ctx.rect(t.left,t.top,t.width,t.height);const i={x:t.left+t.width/2-e/2,y:0};this.ctx.translate(i.x,i.y);const s=this.ctx.createLinearGradient(0,0,e,0);s.addColorStop(0,"rgba(0, 0, 0, 0)"),s.addColorStop(.4,"rgba(0, 0, 0, 0.2)"),s.addColorStop(.49,"rgba(0, 0, 0, 0.1)"),s.addColorStop(.5,"rgba(0, 0, 0, 0.5)"),s.addColorStop(.51,"rgba(0, 0, 0, 0.4)"),s.addColorStop(1,"rgba(0, 0, 0, 0)"),this.ctx.clip(),this.ctx.fillStyle=s,this.ctx.fillRect(0,0,e,2*t.height),this.ctx.restore()}drawOuterShadow(){const t=this.getRect();this.ctx.save(),this.ctx.beginPath(),this.ctx.rect(t.left,t.top,t.width,t.height);const e=this.convertToGlobal({x:this.shadow.pos.x,y:this.shadow.pos.y});this.ctx.translate(e.x,e.y),this.ctx.rotate(Math.PI+this.shadow.angle+Math.PI/2);const i=this.ctx.createLinearGradient(0,0,this.shadow.width,0);0===this.shadow.direction?(this.ctx.translate(0,-100),i.addColorStop(0,"rgba(0, 0, 0, "+this.shadow.opacity+")"),i.addColorStop(1,"rgba(0, 0, 0, 0)")):(this.ctx.translate(-this.shadow.width,-100),i.addColorStop(0,"rgba(0, 0, 0, 0)"),i.addColorStop(1,"rgba(0, 0, 0, "+this.shadow.opacity+")")),this.ctx.clip(),this.ctx.fillStyle=i,this.ctx.fillRect(0,0,this.shadow.width,2*t.height),this.ctx.restore()}drawInnerShadow(){const t=this.getRect();this.ctx.save(),this.ctx.beginPath();const e=this.convertToGlobal({x:this.shadow.pos.x,y:this.shadow.pos.y}),i=this.convertRectToGlobal(this.pageRect);this.ctx.moveTo(i.topLeft.x,i.topLeft.y),this.ctx.lineTo(i.topRight.x,i.topRight.y),this.ctx.lineTo(i.bottomRight.x,i.bottomRight.y),this.ctx.lineTo(i.bottomLeft.x,i.bottomLeft.y),this.ctx.translate(e.x,e.y),this.ctx.rotate(Math.PI+this.shadow.angle+Math.PI/2);const s=3*this.shadow.width/4,n=this.ctx.createLinearGradient(0,0,s,0);0===this.shadow.direction?(this.ctx.translate(-s,-100),n.addColorStop(1,"rgba(0, 0, 0, "+this.shadow.opacity+")"),n.addColorStop(.9,"rgba(0, 0, 0, 0.05)"),n.addColorStop(.7,"rgba(0, 0, 0, "+this.shadow.opacity+")"),n.addColorStop(0,"rgba(0, 0, 0, 0)")):(this.ctx.translate(0,-100),n.addColorStop(0,"rgba(0, 0, 0, "+this.shadow.opacity+")"),n.addColorStop(.1,"rgba(0, 0, 0, 0.05)"),n.addColorStop(.3,"rgba(0, 0, 0, "+this.shadow.opacity+")"),n.addColorStop(1,"rgba(0, 0, 0, 0)")),this.ctx.clip(),this.ctx.fillStyle=n,this.ctx.fillRect(0,0,s,2*t.height),this.ctx.restore()}clear(){this.ctx.fillStyle="white",this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height)}}class p{constructor(t,e,i){this.touchPoint=null,this.swipeTimeout=250,this.onResize=()=>{this.update()},this.onMouseDown=t=>{if(this.checkTarget(t.target)){const e=this.getMousePos(t.clientX,t.clientY);this.app.startUserTouch(e),t.preventDefault()}},this.onTouchStart=t=>{if(this.checkTarget(t.target)&&t.changedTouches.length>0){const e=t.changedTouches[0],i=this.getMousePos(e.clientX,e.clientY);this.touchPoint={point:i,time:Date.now()},setTimeout(()=>{null!==this.touchPoint&&this.app.startUserTouch(i)},this.swipeTimeout),this.app.getSettings().mobileScrollSupport||t.preventDefault()}},this.onMouseUp=t=>{const e=this.getMousePos(t.clientX,t.clientY);this.app.userStop(e)},this.onMouseMove=t=>{const e=this.getMousePos(t.clientX,t.clientY);this.app.userMove(e,!1)},this.onTouchMove=t=>{if(t.changedTouches.length>0){const e=t.changedTouches[0],i=this.getMousePos(e.clientX,e.clientY);this.app.getSettings().mobileScrollSupport?(null!==this.touchPoint&&(Math.abs(this.touchPoint.point.x-i.x)>10||"read"!==this.app.getState())&&t.cancelable&&this.app.userMove(i,!0),"read"!==this.app.getState()&&t.preventDefault()):this.app.userMove(i,!0)}},this.onTouchEnd=t=>{if(t.changedTouches.length>0){const e=t.changedTouches[0],i=this.getMousePos(e.clientX,e.clientY);let s=!1;if(null!==this.touchPoint){const t=i.x-this.touchPoint.point.x,e=Math.abs(i.y-this.touchPoint.point.y);Math.abs(t)>this.swipeDistance&&e<2*this.swipeDistance&&Date.now()-this.touchPoint.time<this.swipeTimeout&&(t>0?this.app.flipPrev(this.touchPoint.point.y<this.app.getRender().getRect().height/2?"top":"bottom"):this.app.flipNext(this.touchPoint.point.y<this.app.getRender().getRect().height/2?"top":"bottom"),s=!0),this.touchPoint=null}this.app.userStop(i,s)}},this.parentElement=t,t.classList.add("stf__parent"),t.insertAdjacentHTML("afterbegin",'<div class="stf__wrapper"></div>'),this.wrapper=t.querySelector(".stf__wrapper"),this.app=e;const s=this.app.getSettings().usePortrait?1:2;t.style.minWidth=i.minWidth*s+"px",t.style.minHeight=i.minHeight+"px","fixed"===i.size&&(t.style.minWidth=i.width*s+"px",t.style.minHeight=i.height+"px"),i.autoSize&&(t.style.width="100%",t.style.maxWidth=2*i.maxWidth+"px"),t.style.display="block",window.addEventListener("resize",this.onResize,!1),this.swipeDistance=i.swipeDistance}destroy(){this.app.getSettings().useMouseEvents&&this.removeHandlers(),this.distElement.remove(),this.wrapper.remove()}getDistElement(){return this.distElement}getWrapper(){return this.wrapper}setOrientationStyle(t){this.wrapper.classList.remove("--portrait","--landscape"),"portrait"===t?(this.app.getSettings().autoSize&&(this.wrapper.style.paddingBottom=this.app.getSettings().height/this.app.getSettings().width*100+"%"),this.wrapper.classList.add("--portrait")):(this.app.getSettings().autoSize&&(this.wrapper.style.paddingBottom=this.app.getSettings().height/(2*this.app.getSettings().width)*100+"%"),this.wrapper.classList.add("--landscape")),this.update()}removeHandlers(){window.removeEventListener("resize",this.onResize),this.distElement.removeEventListener("mousedown",this.onMouseDown),this.distElement.removeEventListener("touchstart",this.onTouchStart),window.removeEventListener("mousemove",this.onMouseMove),window.removeEventListener("touchmove",this.onTouchMove),window.removeEventListener("mouseup",this.onMouseUp),window.removeEventListener("touchend",this.onTouchEnd)}setHandlers(){window.addEventListener("resize",this.onResize,!1),this.app.getSettings().useMouseEvents&&(this.distElement.addEventListener("mousedown",this.onMouseDown),this.distElement.addEventListener("touchstart",this.onTouchStart),window.addEventListener("mousemove",this.onMouseMove),window.addEventListener("touchmove",this.onTouchMove,{passive:!this.app.getSettings().mobileScrollSupport}),window.addEventListener("mouseup",this.onMouseUp),window.addEventListener("touchend",this.onTouchEnd))}getMousePos(t,e){const i=this.distElement.getBoundingClientRect();return{x:t-i.left,y:e-i.top}}checkTarget(t){return!this.app.getSettings().clickEventForward||!["a","button"].includes(t.tagName.toLowerCase())}}class c extends p{constructor(t,e,i,s){super(t,e,i),this.wrapper.insertAdjacentHTML("afterbegin",'<div class="stf__block"></div>'),this.distElement=t.querySelector(".stf__block"),this.items=s;for(const t of s)this.distElement.appendChild(t);this.setHandlers()}clear(){for(const t of this.items)this.parentElement.appendChild(t)}updateItems(t){this.removeHandlers(),this.distElement.innerHTML="";for(const e of t)this.distElement.appendChild(e);this.items=t,this.setHandlers()}update(){this.app.getRender().update()}}class u extends p{constructor(t,e,i){super(t,e,i),this.wrapper.innerHTML='<canvas class="stf__canvas"></canvas>',this.canvas=t.querySelectorAll("canvas")[0],this.distElement=this.canvas,this.resizeCanvas(),this.setHandlers()}resizeCanvas(){const t=getComputedStyle(this.canvas),e=parseInt(t.getPropertyValue("width"),10),i=parseInt(t.getPropertyValue("height"),10);this.canvas.width=e,this.canvas.height=i}getCanvas(){return this.canvas}update(){this.resizeCanvas(),this.app.getRender().update()}}class w extends l{constructor(t,e,i){super(t,e),this.outerShadow=null,this.innerShadow=null,this.hardShadow=null,this.hardInnerShadow=null,this.element=i,this.createShadows()}createShadows(){this.element.insertAdjacentHTML("beforeend",'<div class="stf__outerShadow"></div>\n             <div class="stf__innerShadow"></div>\n             <div class="stf__hardShadow"></div>\n             <div class="stf__hardInnerShadow"></div>'),this.outerShadow=this.element.querySelector(".stf__outerShadow"),this.innerShadow=this.element.querySelector(".stf__innerShadow"),this.hardShadow=this.element.querySelector(".stf__hardShadow"),this.hardInnerShadow=this.element.querySelector(".stf__hardInnerShadow")}clearShadow(){super.clearShadow(),this.outerShadow.style.cssText="display: none",this.innerShadow.style.cssText="display: none",this.hardShadow.style.cssText="display: none",this.hardInnerShadow.style.cssText="display: none"}reload(){this.element.querySelector(".stf__outerShadow")||this.createShadows()}drawHardInnerShadow(){const t=this.getRect(),e=this.shadow.progress>100?200-this.shadow.progress:this.shadow.progress;let i=(100-e)*(2.5*t.pageWidth)/100+20;i>t.pageWidth&&(i=t.pageWidth);let s=`\n            display: block;\n            z-index: ${(this.getSettings().startZIndex+5).toString(10)};\n            width: ${i}px;\n            height: ${t.height}px;\n            background: linear-gradient(to right,\n                rgba(0, 0, 0, ${this.shadow.opacity*e/100}) 5%,\n                rgba(0, 0, 0, 0) 100%);\n            left: ${t.left+t.width/2}px;\n            transform-origin: 0 0;\n        `;s+=0===this.getDirection()&&this.shadow.progress>100||1===this.getDirection()&&this.shadow.progress<=100?"transform: translate3d(0, 0, 0);":"transform: translate3d(0, 0, 0) rotateY(180deg);",this.hardInnerShadow.style.cssText=s}drawHardOuterShadow(){const t=this.getRect();let e=(100-(this.shadow.progress>100?200-this.shadow.progress:this.shadow.progress))*(2.5*t.pageWidth)/100+20;e>t.pageWidth&&(e=t.pageWidth);let i=`\n            display: block;\n            z-index: ${(this.getSettings().startZIndex+4).toString(10)};\n            width: ${e}px;\n            height: ${t.height}px;\n            background: linear-gradient(to left, rgba(0, 0, 0, ${this.shadow.opacity}) 5%, rgba(0, 0, 0, 0) 100%);\n            left: ${t.left+t.width/2}px;\n            transform-origin: 0 0;\n        `;i+=0===this.getDirection()&&this.shadow.progress>100||1===this.getDirection()&&this.shadow.progress<=100?"transform: translate3d(0, 0, 0) rotateY(180deg);":"transform: translate3d(0, 0, 0);",this.hardShadow.style.cssText=i}drawInnerShadow(){const t=this.getRect(),e=3*this.shadow.width/4,i=0===this.getDirection()?e:0,s=0===this.getDirection()?"to left":"to right",n=this.convertToGlobal(this.shadow.pos),r=this.shadow.angle+3*Math.PI/2,o=[this.pageRect.topLeft,this.pageRect.topRight,this.pageRect.bottomRight,this.pageRect.bottomLeft];let a="polygon( ";for(const t of o){let e=1===this.getDirection()?{x:-t.x+this.shadow.pos.x,y:t.y-this.shadow.pos.y}:{x:t.x-this.shadow.pos.x,y:t.y-this.shadow.pos.y};e=h.GetRotatedPoint(e,{x:i,y:100},r),a+=e.x+"px "+e.y+"px, "}a=a.slice(0,-2),a+=")";const g=`\n            display: block;\n            z-index: ${(this.getSettings().startZIndex+10).toString(10)};\n            width: ${e}px;\n            height: ${2*t.height}px;\n            background: linear-gradient(${s},\n                rgba(0, 0, 0, ${this.shadow.opacity}) 5%,\n                rgba(0, 0, 0, 0.05) 15%,\n                rgba(0, 0, 0, ${this.shadow.opacity}) 35%,\n                rgba(0, 0, 0, 0) 100%);\n            transform-origin: ${i}px 100px;\n            transform: translate3d(${n.x-i}px, ${n.y-100}px, 0) rotate(${r}rad);\n            clip-path: ${a};\n            -webkit-clip-path: ${a};\n        `;this.innerShadow.style.cssText=g}drawOuterShadow(){const t=this.getRect(),e=this.convertToGlobal({x:this.shadow.pos.x,y:this.shadow.pos.y}),i=this.shadow.angle+3*Math.PI/2,s=1===this.getDirection()?this.shadow.width:0,n=0===this.getDirection()?"to right":"to left",r=[{x:0,y:0},{x:t.pageWidth,y:0},{x:t.pageWidth,y:t.height},{x:0,y:t.height}];let o="polygon( ";for(const t of r)if(null!==t){let e=1===this.getDirection()?{x:-t.x+this.shadow.pos.x,y:t.y-this.shadow.pos.y}:{x:t.x-this.shadow.pos.x,y:t.y-this.shadow.pos.y};e=h.GetRotatedPoint(e,{x:s,y:100},i),o+=e.x+"px "+e.y+"px, "}o=o.slice(0,-2),o+=")";const a=`\n            display: block;\n            z-index: ${(this.getSettings().startZIndex+10).toString(10)};\n            width: ${this.shadow.width}px;\n            height: ${2*t.height}px;\n            background: linear-gradient(${n}, rgba(0, 0, 0, ${this.shadow.opacity}), rgba(0, 0, 0, 0));\n            transform-origin: ${s}px 100px;\n            transform: translate3d(${e.x-s}px, ${e.y-100}px, 0) rotate(${i}rad);\n            clip-path: ${o};\n            -webkit-clip-path: ${o};\n        `;this.outerShadow.style.cssText=a}drawLeftPage(){"portrait"!==this.orientation&&null!==this.leftPage&&(1===this.direction&&null!==this.flippingPage&&"hard"===this.flippingPage.getDrawingDensity()?(this.leftPage.getElement().style.zIndex=(this.getSettings().startZIndex+5).toString(10),this.leftPage.setHardDrawingAngle(180+this.flippingPage.getHardAngle()),this.leftPage.draw(this.flippingPage.getDrawingDensity())):this.leftPage.simpleDraw(0))}drawRightPage(){null!==this.rightPage&&(0===this.direction&&null!==this.flippingPage&&"hard"===this.flippingPage.getDrawingDensity()?(this.rightPage.getElement().style.zIndex=(this.getSettings().startZIndex+5).toString(10),this.rightPage.setHardDrawingAngle(180+this.flippingPage.getHardAngle()),this.rightPage.draw(this.flippingPage.getDrawingDensity())):this.rightPage.simpleDraw(1))}drawBottomPage(){if(null===this.bottomPage)return;const t=null!=this.flippingPage?this.flippingPage.getDrawingDensity():null;"portrait"===this.orientation&&1===this.direction||(this.bottomPage.getElement().style.zIndex=(this.getSettings().startZIndex+3).toString(10),this.bottomPage.draw(t))}drawFrame(){this.clear(),this.drawLeftPage(),this.drawRightPage(),this.drawBottomPage(),null!=this.flippingPage&&(this.flippingPage.getElement().style.zIndex=(this.getSettings().startZIndex+5).toString(10),this.flippingPage.draw()),null!=this.shadow&&null!==this.flippingPage&&("soft"===this.flippingPage.getDrawingDensity()?(this.drawOuterShadow(),this.drawInnerShadow()):(this.drawHardOuterShadow(),this.drawHardInnerShadow()))}clear(){for(const t of this.app.getPageCollection().getPages())t!==this.leftPage&&t!==this.rightPage&&t!==this.flippingPage&&t!==this.bottomPage&&(t.getElement().style.cssText="display: none"),t.getTemporaryCopy()!==this.flippingPage&&t.hideTemporaryCopy()}update(){super.update(),null!==this.rightPage&&this.rightPage.setOrientation(1),null!==this.leftPage&&this.leftPage.setOrientation(0)}}class x{constructor(){this._default={startPage:0,size:"fixed",width:0,height:0,minWidth:0,maxWidth:0,minHeight:0,maxHeight:0,drawShadow:!0,flippingTime:1e3,usePortrait:!0,startZIndex:0,autoSize:!0,maxShadowOpacity:1,showCover:!1,mobileScrollSupport:!0,swipeDistance:30,clickEventForward:!0,useMouseEvents:!0,showPageCorners:!0,disableFlipByClick:!1}}getSettings(t){const e=this._default;if(Object.assign(e,t),"stretch"!==e.size&&"fixed"!==e.size)throw new Error('Invalid size type. Available only "fixed" and "stretch" value');if(e.width<=0||e.height<=0)throw new Error("Invalid width or height");if(e.flippingTime<=0)throw new Error("Invalid flipping time");return"stretch"===e.size?(e.minWidth<=0&&(e.minWidth=100),e.maxWidth<e.minWidth&&(e.maxWidth=2e3),e.minHeight<=0&&(e.minHeight=100),e.maxHeight<e.minHeight&&(e.maxHeight=2e3)):(e.minWidth=e.width,e.maxWidth=e.width,e.minHeight=e.height,e.maxHeight=e.height),e}}!function(t,e){void 0===e&&(e={});var i=e.insertAt;if(t&&"undefined"!=typeof document){var s=document.head||document.getElementsByTagName("head")[0],n=document.createElement("style");n.type="text/css","top"===i&&s.firstChild?s.insertBefore(n,s.firstChild):s.appendChild(n),n.styleSheet?n.styleSheet.cssText=t:n.appendChild(document.createTextNode(t))}}(".stf__parent {\n  position: relative;\n  display: block;\n  box-sizing: border-box;\n  transform: translateZ(0);\n\n  -ms-touch-action: pan-y;\n  touch-action: pan-y;\n}\n\n.sft__wrapper {\n  position: relative;\n  width: 100%;\n  box-sizing: border-box;\n}\n\n.stf__parent canvas {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  left: 0;\n  top: 0;\n}\n\n.stf__block {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  box-sizing: border-box;\n  perspective: 2000px;\n}\n\n.stf__item {\n  display: none;\n  position: absolute;\n  transform-style: preserve-3d;\n}\n\n.stf__outerShadow {\n  position: absolute;\n  left: 0;\n  top: 0;\n}\n\n.stf__innerShadow {\n  position: absolute;\n  left: 0;\n  top: 0;\n}\n\n.stf__hardShadow {\n  position: absolute;\n  left: 0;\n  top: 0;\n}\n\n.stf__hardInnerShadow {\n  position: absolute;\n  left: 0;\n  top: 0;\n}");t.PageFlip=class extends class{constructor(){this.events=new Map}on(t,e){return this.events.has(t)?this.events.get(t).push(e):this.events.set(t,[e]),this}off(t){this.events.delete(t)}trigger(t,e,i=null){if(this.events.has(t))for(const s of this.events.get(t))s({data:i,object:e})}}{constructor(t,e){super(),this.isUserTouch=!1,this.isUserMove=!1,this.setting=null,this.pages=null,this.setting=(new x).getSettings(e),this.block=t}destroy(){this.ui.destroy(),this.block.remove()}update(){this.render.update(),this.pages.show()}loadFromImages(t){this.ui=new u(this.block,this,this.setting);const e=this.ui.getCanvas();this.render=new d(this,this.setting,e),this.flipController=new g(this.render,this),this.pages=new n(this,this.render,t),this.pages.load(),this.render.start(),this.pages.show(this.setting.startPage),setTimeout(()=>{this.ui.update(),this.trigger("init",this,{page:this.setting.startPage,mode:this.render.getOrientation()})},1)}loadFromHTML(t){this.ui=new c(this.block,this,this.setting,t),this.render=new w(this,this.setting,this.ui.getDistElement()),this.flipController=new g(this.render,this),this.pages=new o(this,this.render,this.ui.getDistElement(),t),this.pages.load(),this.render.start(),this.pages.show(this.setting.startPage),setTimeout(()=>{this.ui.update(),this.trigger("init",this,{page:this.setting.startPage,mode:this.render.getOrientation()})},1)}updateFromImages(t){const e=this.pages.getCurrentPageIndex();this.pages.destroy(),this.pages=new n(this,this.render,t),this.pages.load(),this.pages.show(e),this.trigger("update",this,{page:e,mode:this.render.getOrientation()})}updateFromHtml(t){const e=this.pages.getCurrentPageIndex();this.pages.destroy(),this.pages=new o(this,this.render,this.ui.getDistElement(),t),this.pages.load(),this.ui.updateItems(t),this.render.reload(),this.pages.show(e),this.trigger("update",this,{page:e,mode:this.render.getOrientation()})}clear(){this.pages.destroy(),this.ui.clear()}turnToPrevPage(){this.pages.showPrev()}turnToNextPage(){this.pages.showNext()}turnToPage(t){this.pages.show(t)}flipNext(t="top"){this.flipController.flipNext(t)}flipPrev(t="top"){this.flipController.flipPrev(t)}flip(t,e="top"){this.flipController.flipToPage(t,e)}updateState(t){this.trigger("changeState",this,t)}updatePageIndex(t){this.trigger("flip",this,t)}updateOrientation(t){this.ui.setOrientationStyle(t),this.update(),this.trigger("changeOrientation",this,t)}getPageCount(){return this.pages.getPageCount()}getCurrentPageIndex(){return this.pages.getCurrentPageIndex()}getPage(t){return this.pages.getPage(t)}getRender(){return this.render}getFlipController(){return this.flipController}getOrientation(){return this.render.getOrientation()}getBoundsRect(){return this.render.getRect()}getSettings(){return this.setting}getUI(){return this.ui}getState(){return this.flipController.getState()}getPageCollection(){return this.pages}startUserTouch(t){this.mousePosition=t,this.isUserTouch=!0,this.isUserMove=!1}userMove(t,e){this.isUserTouch||e||!this.setting.showPageCorners?this.isUserTouch&&h.GetDistanceBetweenTwoPoint(this.mousePosition,t)>5&&(this.isUserMove=!0,this.flipController.fold(t)):this.flipController.showCorner(t)}userStop(t,e=!1){this.isUserTouch&&(this.isUserTouch=!1,e||(this.isUserMove?this.flipController.stopMove():this.flipController.flip(t)))}},Object.defineProperty(t,"__esModule",{value:!0})}));

/* ---- core.js ---- */
// core.js — 공통 도구: 화면 크기 맞추기(기획안 8-11), 게임 시계, 움직임(tween), 파일 주소, 교사용 설정 여는 방법
'use strict';
const G = window.G = {
  D: window.GAME_DATA || {},       // data/*.json (build가 합쳐 넣음)
  st: null,                        // 지금 저장 칸의 진행 상태
  settings: null,
  paused: false, t: 0, busy: 0,
  screen: '', stage: { W: 1920, H: 1080, ws: 1, u: 1 },
};

// ---------- 파일 주소 (한 파일 버전은 EMBED 안의 data: 주소) ----------
G.asset = (p) => (window.EMBED && window.EMBED[p]) || p;
G.voiceUrl = (id) => G.asset('assets/voice/' + id + '.mp3');

// ---------- DOM 도구 ----------
G.el = (tag, cls, parent, html) => {
  const e = document.createElement(tag); if (cls) e.className = cls;
  if (html !== undefined) e.innerHTML = html; if (parent) parent.appendChild(e); return e;
};
G.$ = (s) => document.querySelector(s);
G.btn = (cls, label, parent, onTap, aria) => {
  const b = G.el('button', cls, parent, label); b.type = 'button'; if (aria) b.setAttribute('aria-label', aria);
  if (onTap) G.onTap(b, onTap); return b;
};
// 누르기: 짧게 누르면 실행 (끌기·길게 누르기와 구분), 키보드 Enter/Space 도 됨
G.onTap = (elm, fn) => {
  elm.addEventListener('click', (ev) => {
    if (G._suppressClick) { ev.preventDefault(); ev.stopPropagation(); return; }
    if (G.paused) return;
    ev.stopPropagation(); G.help && G.help.poke(); fn(ev);
  });
};
// 아이콘 그림 (9/29: 이모지 대신 그림). 지금은 임시 그림이고, 선생님 그림이 오면 assets/ui/icons/ 의 같은 이름 파일만 바꿈
G.icon = (name, cls = '') => `<img class="ico${cls ? ' ' + cls : ''}" src="${G.asset('assets/ui/icons/' + name + '.png')}" alt="">`;
// 9/30 새 세계관: 별 모양은 진짜 별(8개 + 마지막 별)에만 씀. 할 일 표시는 동그라미, 장소 표시는 동그란 핀, 반짝이는 4갈래 빛
// 9/30 선생님: 코드로 그린 그림은 최소화 → 그림 파일(assets/ui/art/<이름>)이 있으면 그 주소, 없으면 null (코드 그림을 씀)
G.art = (name) => { const p = ((G.D.story || {}).art || {})[name]; return p ? G.asset(p) : null; };
G.artImg = (name, cls = '') => { const u = G.art(name); return u ? `<img class="art ${cls}" src="${u}" alt="" draggable="false">` : null; };
G.svgDot = (done) => G.artImg(done ? 'mark_done' : 'mark_todo') || (done
  ? '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="#FFD66B" stroke="#C98F14" stroke-width="9"/><path d="M31 51 L45 64 L70 37" fill="none" stroke="#FFF8EC" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  : '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="rgba(255,248,236,.9)" stroke="#C98F14" stroke-width="9"/></svg>');
G.sparkle = (fill = '#FFF1B8', stroke = '#FFD66B', sw = 4) => G.artImg('sparkle') || G.svgTwinkle(fill, stroke, sw);
G.arrowHtml = () => G.artImg('hint_arrow') || '<svg viewBox="0 0 90 110"><path d="M45 104 L8 58 H30 V6 H60 V58 H82 Z" fill="#FFD66B" stroke="#8a5a0a" stroke-width="5" stroke-linejoin="round"/></svg>';
G.svgPin = (fill, stroke, sw = 6) => `<svg viewBox="0 0 100 100"><path d="M50 96 C38 76 16 62 16 40 A34 34 0 1 1 84 40 C84 62 62 76 50 96 Z" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" stroke-linejoin="round"/><circle cx="50" cy="40" r="13" fill="${stroke}" opacity=".55"/></svg>`;
G.svgTwinkle = (fill, stroke, sw = 4) => `<svg viewBox="0 0 100 100"><path d="M50 4 C54 38 62 46 96 50 C62 54 54 62 50 96 C46 62 38 54 4 50 C38 46 46 38 50 4 Z" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" stroke-linejoin="round"/></svg>`;
G.svgStar = (fill, stroke, sw = 6) => `<svg viewBox="0 0 100 100"><path d="M50 6 L62 37 L95 38 L69 58 L78 91 L50 72 L22 91 L31 58 L5 38 L38 37 Z" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" stroke-linejoin="round"/></svg>`;

// ---------- 화면 크기: 기준 1920x1080, 비율이 달라도 검은 띠 없이 채움 ----------
G.layout = () => {
  const vv = window.visualViewport;
  let W = Math.round(vv ? vv.width : window.innerWidth), H = Math.round(vv ? vv.height : window.innerHeight);
  // 10/3 선생님(아이폰 17): 홈 화면 앱에서 아래 홈 막대 높이만큼 화면을 덜 알려 줘 남색 띠가 남음 → 아이폰 홈 화면 앱은 기기 화면 크기를 그대로 씀
  if (navigator.standalone && /iPhone/.test(navigator.userAgent)) {
    const a = Math.min(screen.width, screen.height), c = Math.max(screen.width, screen.height);
    [W, H] = window.innerHeight > window.innerWidth ? [a, c] : [c, a];
    // 10/3 선생님: 처음 화면에서만 아래 띠가 남음 → 켜자마자는 문서 높이가 홈 막대만큼 짧게 잡혀 그 아래가 그려지지 않음. 문서도 기기 화면 크기로 맞춤
    for (const e of [document.documentElement, document.body]) { e.style.width = W + 'px'; e.style.height = H + 'px'; }
  }
  // 10/2 선생님: 휴대폰을 세로로 들면(아이폰은 가로 고정이 안 됨) 게임 화면을 90도 돌려 가로처럼 보여 줌
  const rot = G.isTouch && H > W * 1.05; G.rot = rot ? W : 0;
  if (rot) [W, H] = [H, W];
  document.documentElement.classList.toggle('rot90', rot);
  const game = G.$('#game'); game.style.width = W + 'px'; game.style.height = H + 'px';
  game.style.transform = rot ? `translateX(${H}px) rotate(90deg)` : '';
  document.documentElement.style.setProperty('--vw', W / 100 + 'px'); document.documentElement.style.setProperty('--vh', H / 100 + 'px');
  const ws = Math.max(H / 1080, W / 2400);                 // 세계(지도·장면) 배율: 높이 1080을 채움
  // 글자·버튼 배율: 전자칠판은 세계와 같게, 휴대폰은 손가락 크기(약 11mm)를 위해 더 크게, 그러나 화면을 넘지 않게
  let u = Math.max(H / 1080, 0.6); u = Math.min(u, W / 1500, H / 640);
  // 버튼 단위: 휴대폰(터치, 낮은 화면)에서는 누를 곳이 약 11mm(≈70px) 이상 되게 키움 (GDD 1-3)
  const bu = G.isTouch && H < 700 ? Math.max(u, 0.72) : u;
  G.stage = { W, H, ws, u, bu, portrait: H > W * 1.05 };
  document.documentElement.style.setProperty('--u', u + 'px');
  document.documentElement.style.setProperty('--bu', bu + 'px');
  G.$('#rotate').classList.toggle('on', G.stage.portrait && G.isTouch && !rot);
  if (rot && G.audio && G.audio.ready && !G._rotSaid) { G._rotSaid = 1; G.audio.voice('S92_rotate'); }
  if (G.onResize) G.onResize();
  for (const f of G.resizers) { try { f(); } catch (e) { console.error(e); } }
};
G.resizers = new Set();
// 돌린 동안에는 누른 자리·크기 값을 게임 기준으로 바꿔 줌 → 끌기·퍼즐 코드는 그대로 둠 (화면 (sx, sy) = 게임 (x, y): x = sy, y = 세로 폭 - sx)
G.rot = 0;
(() => {
  const gd = (o, k) => o && Object.getOwnPropertyDescriptor(o, k);
  for (const [o, X, Y] of [[MouseEvent.prototype, 'clientX', 'clientY'], [MouseEvent.prototype, 'pageX', 'pageY'], [window.Touch && Touch.prototype, 'clientX', 'clientY'], [window.Touch && Touch.prototype, 'pageX', 'pageY']]) {
    const dx = gd(o, X), dy = gd(o, Y); if (!dx || !dy || !dx.get || !dy.get) continue;
    Object.defineProperty(o, X, { configurable: true, enumerable: true, get() { return G.rot ? dy.get.call(this) : dx.get.call(this); } });
    Object.defineProperty(o, Y, { configurable: true, enumerable: true, get() { return G.rot ? G.rot - dx.get.call(this) : dy.get.call(this); } });
  }
  const gb = Element.prototype.getBoundingClientRect;
  Element.prototype.getBoundingClientRect = function () { const r = gb.call(this); return G.rot ? new DOMRect(r.top, G.rot - r.right, r.height, r.width) : r; };
  const ef = Document.prototype.elementFromPoint, efs = Document.prototype.elementsFromPoint;
  Document.prototype.elementFromPoint = function (x, y) { return G.rot ? ef.call(this, G.rot - y, x) : ef.call(this, x, y); };
  if (efs) Document.prototype.elementsFromPoint = function (x, y) { return G.rot ? efs.call(this, G.rot - y, x) : efs.call(this, x, y); };
})();
G.isTouch = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;

// ---------- 게임 시계 (교사용 설정이 열리면 멈춤) ----------
const updaters = new Set();
G.every = (fn) => { updaters.add(fn); return () => updaters.delete(fn); };
let last = performance.now();
function tick(now) {
  const dt = Math.min(0.05, (now - last) / 1000); last = now;
  if (!G.paused) { G.t += dt; for (const f of [...updaters]) { try { f(dt); } catch (e) { console.error(e); } } }
  requestAnimationFrame(tick);
}
requestAnimationFrame(tick);
G.wait = (sec) => new Promise(res => { let t = 0; const off = G.every(dt => { t += dt; if (t >= sec) { off(); res(); } }); });
G.ease = { lin: t => t, io: t => t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2, out: t => 1 - Math.pow(1 - t, 3), in: t => t * t * t };
// 숫자 움직이기: G.tween(0, 1, 2, v => ..., 'io')
G.tween = (a, b, dur, fn, ease = 'io') => new Promise(res => {
  if (dur <= 0) { fn(b); res(); return; }
  let t = 0; fn(a);
  const off = G.every(dt => { t += dt; const k = Math.min(1, t / dur); fn(a + (b - a) * G.ease[ease](k)); if (k >= 1) { off(); res(); } });
});
// 빠르게 모드 (교사용 설정, 9/30): 음성을 기다리지 않고 [다음]·[건너뛰기]가 바로 켜짐. 선생님이 시연하거나 확인할 때
// 9/30 난이도 (선생님 설정): easy 쉽게(9/29까지의 난이도) / normal 보통(기본) / hard 어렵게
G.level = () => (G.settings && G.settings.level) || 'normal';
G.lv = (min) => ({ easy: 0, normal: 1, hard: 2 })[G.level()] >= ({ easy: 0, normal: 1, hard: 2 })[min || 'easy'];
G.fast = () => !!(G.settings && G.settings.fast);
G.reduced = () => G.settings && (G.settings.reduceMotion || (G.settings.reduceAuto && window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches));

// ---------- 저장소 (학교 PC에서 막혀 있어도 게임은 돌아가게) ----------
G.store = {
  get(k, d) { try { const v = localStorage.getItem('starvillage.' + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem('starvillage.' + k, JSON.stringify(v)); return true; } catch (e) { return false; } },
  del(k) { try { localStorage.removeItem('starvillage.' + k); } catch (e) { } },
};

// ---------- 교사용 설정 여는 방법: ESC, 또는 왼쪽 위 구석을 3초 길게 누르기 ----------
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') { e.preventDefault(); G.teacher && G.teacher.toggle(); return; }
  if (G.paused) return;
  if (G.cut && G.cut.onKey && G.cut.onKey(e)) { e.preventDefault(); return; }
  if (G.dialog && G.dialog.onKey && G.dialog.onKey(e)) e.preventDefault();
});
(() => {
  let timer = null, sx = 0, sy = 0;
  window.addEventListener('pointerdown', (e) => {
    if (e.clientX > 130 || e.clientY > 130) return;
    sx = e.clientX; sy = e.clientY; clearTimeout(timer);
    timer = setTimeout(() => { timer = null; G._suppressClick = true; setTimeout(() => G._suppressClick = false, 700); G.teacher && G.teacher.show(); }, 3000);
  }, true);
  const cancel = () => { clearTimeout(timer); timer = null; };
  window.addEventListener('pointerup', cancel, true); window.addEventListener('pointercancel', cancel, true);
  window.addEventListener('pointermove', (e) => { if (timer && Math.hypot(e.clientX - sx, e.clientY - sy) > 30) cancel(); }, true);
})();
// 두 손가락 확대, 길게 눌러 메뉴 막기 (7-1)
document.addEventListener('gesturestart', e => e.preventDefault());
document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('dblclick', e => e.preventDefault(), { passive: false });

/* ---- audio.js ---- */
// audio.js — 소리 (GDD 10장): 대사 100%, 효과음 60%, 환경음 30%, 음악 35% → 대사 중 20%
// 대사·효과음은 짧아서 Web Audio로 풀어서 재생, 긴 음악은 <audio>로 흘려 재생(메모리 절약)
'use strict';
G.audio = (() => {
  const A = { ready: false, ctx: null, buffers: new Map(), speaking: 0 };
  let master, gVoice, gSfx, gAmb, gMusic, musicEl = null, musicName = '', musicNode = null, ambs = {};
  const VOL = { voice: 1.0, sfx: 0.6, amb: 0.3, music: 0.35, duck: 0.2 };
  const S = () => G.settings || { volume: 0.9, voiceOn: true };

  // 시작하기 버튼(첫 누르기) 안에서 불러야 아이폰·안드로이드에서 소리가 남
  A.unlock = () => {
    if (A.ready) { if (A.ctx.state === 'suspended' && !G.paused) A.ctx.resume(); return; }
    const AC = window.AudioContext || window.webkitAudioContext;
    try {
      A.ctx = new AC(); master = A.ctx.createGain(); master.connect(A.ctx.destination);
      gVoice = A.ctx.createGain(); gSfx = A.ctx.createGain(); gAmb = A.ctx.createGain(); gMusic = A.ctx.createGain();
      for (const g of [gVoice, gSfx, gAmb, gMusic]) g.connect(master);
      gVoice.gain.value = VOL.voice; gSfx.gain.value = VOL.sfx; gAmb.gain.value = VOL.amb; gMusic.gain.value = VOL.music;
      const b = A.ctx.createBuffer(1, 1, 22050); const s = A.ctx.createBufferSource(); s.buffer = b; s.connect(A.ctx.destination); s.start(0);
      A.ctx.resume && A.ctx.resume();
      A.ready = true; A.setVolume();
    } catch (e) { console.warn('소리 준비 실패', e); }
    // 브라우저 음성(TTS)도 첫 누르기에서 깨워 둠
    try { if (window.speechSynthesis) { const u = new SpeechSynthesisUtterance(' '); u.volume = 0; speechSynthesis.speak(u); } } catch (e) { }
  };
  A.setVolume = () => { if (!A.ready) return; master.gain.value = S().volume ?? 0.9; };
  A.pause = () => { if (A.ready && A.ctx.state === 'running') A.ctx.suspend(); if (musicEl) musicEl.pause(); try { speechSynthesis.pause(); } catch (e) { } };
  A.resume = () => { if (A.ready) A.ctx.resume(); if (musicEl && musicName) musicEl.play().catch(() => { }); try { speechSynthesis.resume(); } catch (e) { } };

  // 10/4 선생님: 인터넷 없는 판을 폴더(zip)로. PC에서 파일로 열면(file:) fetch가 막혀서, 소리는 같은 이름의 .js(글자로 바꾼 소리)를 script로 불러옴
  const FILE = location.protocol === 'file:', jsWait = {};
  window.__snd = (u, b64) => { const w = jsWait[u]; if (w) { delete jsWait[u]; w.ok(Uint8Array.from(atob(b64), c => c.charCodeAt(0)).buffer); } };
  const fileBuf = (url) => new Promise((ok, no) => { const sc = document.createElement('script'); jsWait[url] = { ok }; sc.src = url + '.js'; sc.onload = () => { sc.remove(); if (jsWait[url]) { delete jsWait[url]; no(new Error('없음 ' + url)); } }; sc.onerror = () => { sc.remove(); delete jsWait[url]; no(new Error('없음 ' + url)); }; document.head.appendChild(sc); });
  async function loadBuf(url) {
    if (A.buffers.has(url)) { const b = A.buffers.get(url); A.buffers.delete(url); A.buffers.set(url, b); return b; }
    let ab;
    if (FILE && !url.startsWith('data:')) ab = await fileBuf(url);
    else { const r = await fetch(url); if (!r.ok) throw new Error('없음 ' + url); ab = await r.arrayBuffer(); }
    const buf = await new Promise((ok, no) => A.ctx.decodeAudioData(ab, ok, no));
    A.buffers.set(url, buf);
    while (A.buffers.size > 24) A.buffers.delete(A.buffers.keys().next().value);   // 오래된 것부터 버림
    return buf;
  }
  A.preload = (ids) => { if (!A.ready) return; for (const id of ids) loadBuf(G.voiceUrl(id)).catch(() => { }); };

  // ---- 대사 음성: 끝나면 resolve. 파일이 없으면 브라우저 음성 → 그것도 안 되면 3초 ----
  let cur = null, vseq = 0;
  A.stopVoice = () => { vseq++; if (cur) { try { cur.stop(); } catch (e) { } cur = null; } try { speechSynthesis.cancel(); } catch (e) { } };
  // 9/30: 음성 파일을 불러오는 사이에 다음 음성이 시작되면, 늦게 도착한 앞 음성은 틀지 않음 (음성 두 개가 겹치던 문제)
  A.voice = (id, textFallback) => new Promise(async (done) => {
    A.stopVoice(); const my = vseq;
    const line = G.D.dialogues && G.D.dialogues[id];
    const text = textFallback || (line && line.text) || '';
    let finished = false; const fin = () => { if (finished) return; finished = true; A.speaking = Math.max(0, A.speaking - 1); if (!A.speaking) duck(false); done(); };
    A.speaking++; duck(true);
    if (!S().voiceOn) { await G.wait(Math.max(1.2, text.length * 0.09)); return fin(); }
    if (!A.ready) { await G.wait(1.5); return fin(); }
    try {
      const buf = await loadBuf(G.voiceUrl(id));
      if (my !== vseq) return fin();
      const src = A.ctx.createBufferSource(); src.buffer = buf; src.connect(gVoice); cur = src;
      src.onended = () => { if (cur === src) cur = null; fin(); };
      src.start();
      // 혹시 끝 알림이 안 오면 (탭 전환 등) 길이+1.5초 뒤 진행
      G.wait(buf.duration + 1.5).then(fin);
    } catch (e) {
      if (my !== vseq) return fin();
      if (text && tts(text, fin)) return;
      await G.wait(3); fin();
    }
  });
  function tts(text, fin) {
    try {
      if (!window.speechSynthesis) return false;
      const u = new SpeechSynthesisUtterance(text.replace(/[「」“”]/g, '')); u.lang = 'ko-KR'; u.rate = 0.9; u.volume = S().volume ?? 0.9;
      const ko = speechSynthesis.getVoices().find(v => /ko/i.test(v.lang)); if (ko) u.voice = ko;
      u.onend = fin; u.onerror = () => G.wait(1).then(fin);
      speechSynthesis.speak(u); G.wait(Math.max(4, text.length * 0.35)).then(fin); return true;
    } catch (e) { return false; }
  }
  function duck(on) {
    if (!A.ready) return; const t = A.ctx.currentTime;
    gMusic.gain.cancelScheduledValues(t); gMusic.gain.setValueAtTime(gMusic.gain.value, t);
    gMusic.gain.linearRampToValueAtTime(on ? VOL.duck : VOL.music, t + 0.4);
    gAmb.gain.cancelScheduledValues(t); gAmb.gain.setValueAtTime(gAmb.gain.value, t);
    gAmb.gain.linearRampToValueAtTime(on ? VOL.amb * 0.3 : VOL.amb, t + 0.3);
    if (musicEl && !musicNode) musicEl.volume = (on ? VOL.duck : VOL.music) * (S().volume ?? 0.9);
  }

  // ---- 효과음 ----
  A.sfx = async (name, vol = 1, rate = 1) => {   // 10/1 rate: 음높이 (반딧불 소리 자물쇠)
    if (!A.ready) return;
    try { const buf = await loadBuf(G.asset('assets/audio/' + name + '.mp3')); const s = A.ctx.createBufferSource(); s.buffer = buf; s.playbackRate.value = rate; const g = A.ctx.createGain(); g.gain.value = vol; s.connect(g); g.connect(gSfx); s.start(); } catch (e) { }
  };

  // ---- 음악 (반복). <audio>가 막힌 환경이면 풀어서 재생으로 바꿈 ----
  const blobUrls = {};
  async function mediaUrl(p) {
    const u = G.asset(p); if (!u.startsWith('data:')) return u;
    if (!blobUrls[p]) { const r = await fetch(u); blobUrls[p] = URL.createObjectURL(await r.blob()); }
    return blobUrls[p];
  }
  A.music = async (name) => {
    if (!A.ready || name === musicName) return;
    const pl = loops[musicName]; if (pl) { try { pl.stop(); } catch (e) { } delete loops[musicName]; }   // 풀어서 반복하던 앞 음악 멈춤
    const old = musicEl, oldNode = musicNode; musicName = name; musicEl = null; musicNode = null;
    if (old) fadeOutEl(old, oldNode);
    if (!name) return;
    const p = 'assets/audio/' + name + '.mp3';
    if (FILE) return loopBuffer(p, gMusic, name);   // 폴더 판: 음악도 .js로 풀어서 반복
    try {
      const el = new Audio(); el.loop = true; el.preload = 'auto'; el.src = await mediaUrl(p);
      if (musicName !== name) return;
      try { const node = A.ctx.createMediaElementSource(el); node.connect(gMusic); musicNode = node; } catch (e) { el.volume = VOL.music * (S().volume ?? 0.9); }
      musicEl = el;
      el.addEventListener('error', () => { if (musicEl === el) { musicEl = null; loopBuffer(p, gMusic, name); } }, { once: true });
      await el.play();
    } catch (e) { if (musicName === name && !musicEl) loopBuffer(p, gMusic, name); }
  };
  function fadeOutEl(el, node) { let v = 1; const off = G.every(dt => { v -= dt / 0.8; if (v <= 0) { off(); el.pause(); el.src = ''; if (node) try { node.disconnect(); } catch (e) { } } else if (!node) el.volume = Math.max(0, el.volume * 0.9); }); if (!G.paused) { } }
  const loops = {};
  async function loopBuffer(p, gain, key) {
    try { const buf = await loadBuf(G.asset(p)); if (key === musicName || ambs[key]) { const s = A.ctx.createBufferSource(); s.buffer = buf; s.loop = true; s.connect(gain); s.start(); loops[key] = s; } } catch (e) { }
  }
  // ---- 환경음 (여러 개 겹침) ----
  A.ambient = async (names = []) => {
    if (!A.ready) return;
    for (const k of Object.keys(ambs)) if (!names.includes(k)) { const a = ambs[k]; delete ambs[k]; try { a.g.gain.linearRampToValueAtTime(0, A.ctx.currentTime + 0.8); setTimeout(() => { try { a.s.stop(); } catch (e) { } }, 900); } catch (e) { } }
    for (const n of names) {
      if (ambs[n]) continue;
      const g = A.ctx.createGain(); g.gain.value = 0; g.connect(gAmb); ambs[n] = { g, s: null };
      try {
        const buf = await loadBuf(G.asset('assets/audio/' + n + '.mp3')); if (!ambs[n]) continue;
        const s = A.ctx.createBufferSource(); s.buffer = buf; s.loop = true; s.connect(g); s.start(); ambs[n].s = s;
        g.gain.linearRampToValueAtTime(n === 'amb_crickets' ? 0.5 : n === 'amb_market' ? 0.6 : 1, A.ctx.currentTime + 1.2);
      } catch (e) { }
    }
  };
  A.ambientBoost = (name, on) => { const a = ambs[name]; if (!a || !A.ready) return; const t = A.ctx.currentTime; a.g.gain.cancelScheduledValues(t); a.g.gain.setValueAtTime(a.g.gain.value, t); a.g.gain.linearRampToValueAtTime(on ? 3 : 1, t + 0.5); };
  return A;
})();

/* ---- save.js ---- */
// save.js — 저장 칸 (U2, GDD 6-4·11-6). 자동 저장만 있음. 칸 지우기는 교사용 설정과 [이어 하기] 번호 고르기(10/3, 한 번 더 물음)에서
'use strict';
G.save = (() => {
  const S = {};
  const PLACES = ['home', 'plaza', 'market', 'library', 'forest'];   // 칸에 보이는 마지막 장소 그림 (assets/ui/icons/place_*.png)
  // 10/1 선생님: 처음 5칸, 칸이 하나 찰 때마다 한 칸씩 늘어남 (빈 칸이 늘 5개). 가장 큰 저장 번호까지는 언제나 보임
  S.MAX = 60;
  S.count = () => { let n = 0, top = 0; for (let i = 1; i <= S.MAX; i++) if (S.load(i)) { n++; top = i; } return Math.min(S.MAX, Math.max(top, n + 5)); };
  S.load = (slot) => G.store.get('slot' + slot, null);
  S.fresh = (slot) => ({
    slot, name: '', stars: 0, place: 'home', chapter: 'start',
    done: [], items: [], mood: 0, env: { board: false, guide: false }, seenCutscenes: [],
    quest: 0, cleared: [], visited: [], seen: [], started: false, updated: new Date().toISOString(),
  });
  S.del = (slot) => G.store.del('slot' + slot);
  // 할 일 하나 끝낼 때, 장소를 나갈 때 부름. 구석의 작은 별이 한 번 반짝 (소리 없음)
  S.write = () => {
    if (!G.st) return;
    G.st.updated = new Date().toISOString();
    const ok = G.store.set('slot' + G.st.slot, G.st);
    const s = G.$('#savedStar'); if (s && ok) { s.classList.remove('blink'); void s.offsetWidth; s.classList.add('blink'); }
    return ok;
  };

  // ---- U2 저장 칸 고르기 (9/30 선생님): [시작하기] → [새로 하기] / [이어 하기] → 번호 카드가 빙글 돌아가는 고르기 ----
  // 새로 하기: 빈 번호만, 이어 하기: 저장된 번호만. 가운데 카드를 누르거나 [이 번호로]를 누르면 고름. 양옆 화살표·밀기·방향키로 돌림
  // 고른 칸 번호를 돌려줌 { slot, data } (새로 하기는 data 없음)
  S.screen = () => new Promise(async (done) => {
    let mode = null;
    for (;;) {
      if (!mode) mode = await chooseMode();
      const list = [];
      for (let i = 1; i <= S.count(); i++) { const d = S.load(i); if (mode === 'new' ? !d : !!d) list.push({ slot: i, data: d }); }
      if (mode === 'cont' && !list.length) { mode = null; continue; }   // 다 지웠으면 처음 고르기로
      const r = await bookPick(mode, list);
      if (r && r.deleted) continue;   // 지운 뒤에는 남은 번호로 다시 보여 줌
      if (r) { done(r); return; }
      mode = null;
    }
  });
  function screenBase(cls) {
    const ov = G.$('#overlay'); ov.innerHTML = ''; G.onResize = null;
    const scr = G.el('div', 'slots-screen ' + cls, ov);
    return scr;
  }
  function head(scr, text, voice) {
    const h = G.el('div', 's-head', scr);
    G.el('h2', '', h, text);
    const say = G.btn('pill round', G.icon('icon_sound'), h, () => G.audio.voice(voice, text), '다시 듣기');
    say.style.cssText = 'width:calc(var(--bu)*100);height:calc(var(--bu)*100);min-width:0;min-height:0';
    return h;
  }
  const say = (id, fb) => G.audio.voice(id, (G.D.dialogues[id] || {}).text || fb);
  // 새로 하기 / 이어 하기
  function chooseMode() {
    return new Promise((pick) => {
      const scr = screenBase('mode-screen');
      head(scr, '새로 할까요, 이어 할까요?', 'S92_mode');
      const row = G.el('div', 'mode-row', scr);
      let saved = 0; for (let i = 1; i <= S.count(); i++) if (S.load(i)) saved++;
      const card = (cls, ico, label, sub, voice, fb, v) => {
        const b = G.el('button', 'mode-card ' + cls, row); b.type = 'button'; b.setAttribute('aria-label', label);
        G.el('div', 'mc-ico', b, G.icon(ico)); G.el('div', 'mc-label', b, label); G.el('div', 'mc-sub', b, sub);
        G.onTap(b, () => { if (b.disabled) return; G.audio.stopVoice(); G.audio.sfx('sfx_tap', 0.7); say(voice, fb); pick(v); });
        return b;
      };
      card('new', 'icon_star', '새로 하기', '처음부터 시작해요', 'S92_btn_new', '새로 하기', 'new');
      const c = card('cont', 'icon_next', '이어 하기', saved ? '하던 곳부터 해요' : '아직 저장된 게임이 없어요', 'S92_btn_continue', '이어 하기', 'cont');
      if (!saved) { c.disabled = true; c.classList.add('off'); }
      say('S92_mode', '새로 할까요, 이어 할까요?');
    });
  }
  // 10/2 선생님: 저장 칸을 제목 화면의 책(책상 위 펼친 책)으로. 한 쪽에 번호 하나, 넘기면 사라락 (StPageFlip)
  // 그림판 1920x1080: 펼친 책 (335,105) 1250x805 (제목 화면 끝 위치와 같음), 뒤는 책상 그림
  function bookPick(mode, list) {
    return new Promise((pick) => {
      const A = (p) => G.asset('assets/ui/title/' + p);
      const scr = screenBase('rv-screen bk-screen ' + (mode === 'new' ? 'rv-new' : 'rv-cont'));
      scr.style.setProperty('--desk', `url("${A('desk_plain.jpg')}")`);   // 책상 그림에서 덮인 책을 지운 것
      head(scr, ((G.D.dialogues.S92_pick_slot || {}).text || '내 번호를 눌러 주세요').replace(/\.$/, ''), 'S92_pick_slot');
      const area = G.el('div', 'bk-area', scr), stage = G.el('div', 'bk-stage', area);
      // 10/2 선생님: 펼친 책 둘레로 남색 표지 안쪽이 보이게 (표지가 종이보다 조금 큼)
      const board = G.el('div', 'bk-board', stage); ['l', 'r'].forEach(x => { G.el('div', 'bk-cv ' + x, board).style.backgroundImage = `url("${A('back.jpg')}")`; });
      const bookEl = G.el('div', 'bk-book', stage);
      const N = list.length; let sel = 0, busy = false, pf = null;
      // 10/2 선생님: 양피지 쪽 가운데에 그 칸의 마지막 장소 그림(수채, 겉으로 갈수록 연하게), 번호와 이름은 나눔손글씨로 작게. 빈 칸은 제목 그림
      const SC = { plaza: 'plaza', plaza2: 'plaza', market: 'market', library: 'library', forest: 'forest', s2hall: 's2hall', s2rest: 's2rest', s2school: 's2school' };
      const pic = (d) => d && SC[d.place] ? G.asset('assets/scenes/' + SC[d.place] + '_color.jpg') : A('illust.jpg');
      const paper = (p) => { G.el('div', 'bk-paper', p).style.backgroundImage = `url("${A('parchment_page.jpg')}")`; G.el('div', 'bk-gut', p); };
      const pages = list.map((it, k) => {
        const d = it.data, p = G.el('div', 'bk-page' + (k % 2 ? ' pr' : ' pl'), bookEl); paper(p);
        G.el('div', 'bk-ill', p).style.backgroundImage = `url("${pic(d)}")`;
        const c = G.el('div', 'bk-slot' + (d ? '' : ' empty'), p);
        c.setAttribute('role', 'button'); c.setAttribute('aria-label', it.slot + '번' + (d && d.name ? ' ' + d.name : ''));
        G.el('div', 'cap', c, it.slot + '번 ' + (d ? (d.name ? esc(d.name) : '이어 하기') : '새로 하기'));
        if (d) G.el('div', 'meta', c, G.icon('icon_star') + (d.stars || 0) + '/8');
        G.onTap(c, () => { if (moved || busy) return; if (k === sel) choose(); else mark(k); });
        return p;
      });
      if (N % 2) { const p = G.el('div', 'bk-page pr', bookEl); paper(p); pages.push(p); }
      if (!N) G.el('div', 'rv-empty', area, mode === 'new' ? '빈 번호가 없어요. 선생님께 말해 주세요.' : '아직 저장된 게임이 없어요.');
      const nav = G.el('div', 'rv-nav', scr);
      const back = G.btn('pill', '돌아가기', nav, () => { cleanup(); pick(null); }, '돌아가기');
      const prev = G.btn('pill round rv-arrow prev', G.icon('icon_next'), nav, () => go(-1), '앞 장');
      const ok = G.btn('pill gold rv-ok', G.icon('icon_ok') + ' 이 번호로', nav, () => choose(), '이 번호로');
      const next = G.btn('pill round rv-arrow', G.icon('icon_next'), nav, () => go(1), '다음 장');
      back.classList.add('rv-back');
      if (!N) ok.disabled = true;
      // 10/3 선생님: 저장된 번호를 지우는 버튼. 누르면 정말 지울지 한 번 더 묻고, [지우기]를 눌러야 지워짐
      let asking = false;
      if (mode === 'cont' && N) G.btn('pill warn rv-del', '지우기', nav, () => {
        if (busy || asking) return; asking = true;
        const it = list[sel], d = it.data || {};
        const m = G.el('div', 'modal', scr), sh = G.el('div', 'sheet del-ask', m);
        G.el('h3', '', sh, `${it.slot}번${d.name ? ' ' + esc(d.name) : ''} 저장을 정말 지울까요?`);
        G.el('p', '', sh, '지우면 되돌릴 수 없어요.');
        const br = G.el('div', 'btn-row', sh);
        G.btn('pill warn', '지우기', br, () => { S.del(it.slot); G.audio.sfx('sfx_tap', 0.7); cleanup(); pick({ deleted: true }); }, '지우기');
        G.btn('pill', '그만두기', br, () => { m.remove(); asking = false; }, '그만두기');
      }, '저장 지우기');
      const slots = () => [...bookEl.querySelectorAll('.bk-slot')];
      const mark = (k) => { sel = k; slots().forEach((c, i) => c.classList.toggle('sel', i === k)); };
      const spread = () => pf ? pf.getCurrentPageIndex() - (pf.getCurrentPageIndex() % 2) : 0;
      const arrows = () => { const s = spread(); prev.style.visibility = s > 0 ? '' : 'hidden'; next.style.visibility = s + 2 < N ? '' : 'hidden'; };
      const go = (dir) => {
        if (!pf || busy || asking) return; const s = spread() + dir * 2; if (s < 0 || s >= N) return;
        G.audio.sfx('sfx_page', 0.7, 0.95 + Math.random() * 0.1); mark(s);
        if (G.reduced()) { pf.turnToPage(s); arrows(); return; }
        busy = true; dir > 0 ? pf.flipNext('top') : pf.flipPrev('top');
      };
      const choose = async () => {
        if (!N || busy || asking) return; busy = true;
        const c = slots()[sel]; if (c) c.classList.add('picked'); G.audio.stopVoice(); G.audio.sfx('sfx_tap', 0.7);
        await G.wait(0.35); cleanup(); pick(list[sel]);
      };
      // 화면 맞추기: 책이 머리글과 버튼 사이에 다 보이게
      const fit = () => {
        const ar = area.getBoundingClientRect(); if (!ar.width) return;
        // 10/2 선생님: 휴대폰에서 책이 작아서, 버튼을 책 양옆·구석으로 옮기고 그 사이를 책이 다 씀
        const R = (b) => b.getBoundingClientRect(), side = Math.max(R(prev).right, R(back).right) - ar.left, side2 = ar.right - Math.min(R(next).left, R(ok).left);
        const w = ar.width - 2 * (Math.max(side, side2) + 4), h = ar.height - 6;
        const sc = Math.min(h / 890, w / 1380);
        stage.style.transform = `translate(${ar.width / 2 - 960 * sc}px, ${3 + h / 2 - 507.5 * sc}px) scale(${sc})`;
      };
      if (N) try {
        pf = new St.PageFlip(bookEl, { width: 625, height: 805, size: 'fixed', showCover: false, usePortrait: false, autoSize: false, drawShadow: true, maxShadowOpacity: 0.45, flippingTime: 650, useMouseEvents: false, showPageCorners: false, mobileScrollSupport: false });
        pf.loadFromHTML(pages);
        pf.on('flip', () => { busy = false; arrows(); });
      } catch (e) { console.error(e); pf = null; }
      mark(0); arrows();
      // 밀어서 넘기기
      let sx = null, moved = false;
      area.addEventListener('pointerdown', (e) => { sx = e.clientX; moved = false; });
      area.addEventListener('pointermove', (e) => { if (sx !== null && Math.abs(e.clientX - sx) > 40) moved = true; });
      area.addEventListener('pointerup', (e) => { if (sx === null) return; const dx = e.clientX - sx; sx = null; if (Math.abs(dx) > 40) { go(dx < 0 ? 1 : -1); setTimeout(() => moved = false, 50); } });
      const key = (e) => { if (e.key === 'ArrowLeft') go(-1); else if (e.key === 'ArrowRight') go(1); else if (e.key === 'Enter') choose(); };
      window.addEventListener('keydown', key);
      const cleanup = () => { window.removeEventListener('keydown', key); G.onResize = null; };
      G.onResize = fit; requestAnimationFrame(fit); if (window.ResizeObserver) { const ro = new ResizeObserver(() => { if (scr.isConnected) fit(); else ro.disconnect(); }); [ok, back].forEach(b => ro.observe(b)); }   // 글꼴·그림이 늦게 오면 버튼 폭이 바뀜
      say('S92_pick_slot', '내 번호를 눌러 주세요.');
    });
  }
  // 번호 카드 돌려 고르기. 카드가 둥글게 돌아가며 가운데 카드가 크게 보임
  function revolver(mode, list) {
    return new Promise((pick) => {
      const scr = screenBase('rv-screen ' + (mode === 'new' ? 'rv-new' : 'rv-cont'));
      const parch = G.art('parchment_card'); if (parch) { scr.classList.add('parch'); scr.style.setProperty('--parch', `url("${parch}")`); }   // 10/1 선생님: 양피지 카드
      head(scr, ((G.D.dialogues.S92_pick_slot || {}).text || '내 번호를 눌러 주세요').replace(/\.$/, ''), 'S92_pick_slot');
      const stage = G.el('div', 'rv-stage', scr);
      const ring = G.el('div', 'rv-ring', stage);
      const N = list.length; let cur = 0, busy = false;
      if (!N) G.el('div', 'rv-empty', stage, mode === 'new' ? '빈 번호가 없어요. 선생님께 말해 주세요.' : '아직 저장된 게임이 없어요.');
      const cards = list.map((it, k) => {
        const d = it.data, c = G.el('button', 'rv-card' + (d ? '' : ' empty'), ring); c.type = 'button';
        c.setAttribute('aria-label', it.slot + '번' + (d && d.name ? ' ' + d.name : ''));
        G.el('div', 'bn', c, String(it.slot));
        G.el('div', 'nm', c, d ? (d.name ? esc(d.name) : '이어 하기') : '새로 하기');
        if (d) {
          G.el('div', 'meta', c, G.icon('icon_star') + (d.stars || 0) + '/8');
          c.insertAdjacentHTML('beforeend', G.icon('place_' + (PLACES.includes(d.place) ? d.place : 'home'), 'pl'));
        }
        G.onTap(c, () => { if (moved) return; if (k === cur) choose(); else go(k); });
        return c;
      });
      const nav = G.el('div', 'rv-nav', scr);
      const back = G.btn('pill', '돌아가기', nav, () => { cleanup(); pick(null); }, '돌아가기');
      const prev = G.btn('pill round rv-arrow prev', G.icon('icon_next'), nav, () => go(cur - 1), '앞 번호');
      const ok = G.btn('pill gold rv-ok', G.icon('icon_ok') + ' 이 번호로', nav, () => choose(), '이 번호로');
      const next = G.btn('pill round rv-arrow', G.icon('icon_next'), nav, () => go(cur + 1), '다음 번호');
      back.classList.add('rv-back');
      if (N < 2) { prev.style.visibility = next.style.visibility = 'hidden'; }
      if (!N) ok.disabled = true;
      // 10/2 선생님: 빙글 돌기 대신 책장 넘기기. 가운데 한 장만 보이고, 넘기면 앞장이 왼쪽 끝을 축으로 사라락 넘어감
      const layout = () => {
        cards.forEach((c, k) => {
          const on = k === cur;
          c.style.transition = 'none'; c.style.transform = 'translate(-50%,-50%)';
          c.style.opacity = on ? 1 : 0; c.style.zIndex = on ? 2 : 1; c.style.pointerEvents = on ? '' : 'none';
          c.classList.toggle('front', on); c.tabIndex = on ? 0 : -1;
        });
      };
      // 넘어가는 장: 앞면(카드 복사본) + 뒷면(양피지 뒤쪽)
      const leaf = (c) => {
        const w = c.offsetWidth, h = c.offsetHeight, f = G.el('div', 'rv-flip', ring);
        f.style.width = w + 'px'; f.style.height = h + 'px'; f.style.marginLeft = -w / 2 + 'px'; f.style.marginTop = -h / 2 + 'px';
        const face = c.cloneNode(true); face.classList.remove('front', 'picked'); face.classList.add('rv-face'); face.setAttribute('aria-hidden', 'true'); face.removeAttribute('style');
        f.appendChild(face); G.el('div', 'rv-shade', face); G.el('div', 'rv-back', f);
        return f;
      };
      const go = (k) => {
        if (N < 2 || busy) return; const was = cur; cur = ((k % N) + N) % N; if (was === cur) return;
        const fwd = k > was; G.audio.sfx('sfx_page', 0.7, 0.95 + Math.random() * 0.1);
        if (G.reduced() || !ring.animate) { layout(); return; }
        busy = true;
        const f = leaf(cards[fwd ? was : cur]), T = 720, ease = 'cubic-bezier(.45,.05,.35,1)';   // 앞으로: 지금 장이 넘어감, 뒤로: 앞 장이 되돌아와 덮음
        if (fwd) layout();
        const fr = [{ transform: 'rotateY(0deg)' }, { transform: 'rotateY(-180deg)' }];
        const a = f.animate(fwd ? fr : fr.reverse(), { duration: T, easing: ease });
        f.querySelector('.rv-shade').animate([{ opacity: fwd ? 0 : 0.4 }, { opacity: fwd ? 0.4 : 0 }], { duration: T / 2, easing: ease, delay: fwd ? 0 : T / 2, fill: 'both' });
        a.onfinish = () => { f.remove(); if (!fwd) layout(); busy = false; };
      };
      const choose = async () => {
        if (!N || busy) return; busy = true;
        const c = cards[cur]; c.classList.add('picked'); G.audio.stopVoice(); G.audio.sfx('sfx_tap', 0.7);
        await G.wait(0.35); cleanup(); pick(list[cur]);
      };
      // 밀어서 돌리기
      let sx = null, moved = false;
      stage.addEventListener('pointerdown', (e) => { sx = e.clientX; moved = false; });
      stage.addEventListener('pointermove', (e) => { if (sx !== null && Math.abs(e.clientX - sx) > 40) moved = true; });
      stage.addEventListener('pointerup', (e) => { if (sx === null) return; const dx = e.clientX - sx; sx = null; if (Math.abs(dx) > 40) { go(cur + (dx < 0 ? 1 : -1)); setTimeout(() => moved = false, 50); } });
      const key = (e) => { if (e.key === 'ArrowLeft') go(cur - 1); else if (e.key === 'ArrowRight') go(cur + 1); else if (e.key === 'Enter') choose(); };
      window.addEventListener('keydown', key);
      const cleanup = () => { window.removeEventListener('keydown', key); G.onResize = null; };
      G.onResize = () => layout(true); requestAnimationFrame(() => layout(true));
      say('S92_pick_slot', '내 번호를 눌러 주세요.');
    });
  }
  function esc(s) { return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
  S.esc = esc;

  // ---- 이름 쓰기 (선택, 건너뛰기 크게) ----
  S.askName = () => new Promise((done) => {
    const ov = G.$('#overlay');
    const m = G.el('div', 'modal', ov); const sh = G.el('div', 'sheet', m);
    G.el('h3', '', sh, '이름을 써도 되고, 안 써도 돼요');
    const row = G.el('div', 'name-row', sh);
    const inp = G.el('input', '', row); inp.type = 'text'; inp.maxLength = 8; inp.placeholder = '이름'; inp.autocomplete = 'off'; inp.enterKeyHint = 'done';
    const br = G.el('div', 'btn-row', row);
    const finish = (name) => { m.remove(); G.onResize = null; done(name); };
    G.btn('pill gold', G.icon('icon_skip') + ' 건너뛰기', br, () => { G.audio.voice('S92_btn_skip'); finish(''); }).style.minWidth = 'calc(var(--u)*360)';
    G.btn('pill', G.icon('icon_ok') + ' 다 썼어요', br, () => finish(inp.value.trim().slice(0, 8)));
    inp.addEventListener('keydown', (e) => { e.stopPropagation(); if (e.key === 'Enter') finish(inp.value.trim().slice(0, 8)); if (e.key === 'Escape') G.teacher.toggle(); });
    G.audio.voice('S92_name');
  });
  return S;
})();

/* ---- hud.js ---- */
// hud.js — 화면 모서리 버튼과 표시 (U3·U4): 퀘스트, 이곳에서 할 일 ☆☆☆, 가방, 지도로, 루미(도움), 건너뛰기, 루미 말풍선
// 모든 버튼 = 그림 + 짧은 글자 + 누르면 읽어 줌 (GDD 1-3)
'use strict';
G.hud = (() => {
  const H = {};
  let root, tl, tr, bl, br, bubble, bubbleTok = 0, taskEl = null;
  H.init = () => {
    root = G.$('#hud'); root.innerHTML = '';
    tl = G.el('div', 'hud-tl', root); tr = G.el('div', 'hud-tr', root); bl = G.el('div', 'hud-bl', root); br = G.el('div', 'hud-br', root);
    bubble = G.el('div', 'bubble', root); bubble.style.display = 'none';
    const sv = G.el('div', 'saved', root); sv.id = 'savedStar'; sv.innerHTML = G.sparkle('#FFD66B', '#FFF6D6', 6);
  };
  H.clear = () => { if (!root) H.init(); tl.innerHTML = tr.innerHTML = bl.innerHTML = br.innerHTML = ''; H.hideBubble(); taskEl = null; root.querySelectorAll('.hud-go').forEach(e => e.remove()); };
  // 10/1 선생님: 장소 할 일을 다 끝내면 가운데에 큰 '지도로' 버튼 (모서리 버튼을 찾지 않아도 됨)
  H.goMap = (fn) => {
    if (!root) H.init(); root.querySelectorAll('.hud-go').forEach(e => e.remove());
    const w = G.el('div', 'hud-go', root);
    G.btn('pill gold', G.icon('icon_map') + ' 지도로', w, () => { w.remove(); G.audio.voice('S92_btn_map'); fn(); }, '지도로');
  };
  H.hide = (on) => { if (!root) H.init(); root.style.visibility = on ? 'hidden' : ''; };

  // ---- 지금 할 일: 열려 있고 아직 안 끝낸 첫 장소 ----
  H.nextPlace = () => G.D.places.places.find(p => G.map.state(p) === 'open') || null;
  function questCard() {
    const q = G.el('button', 'quest', tl); q.type = 'button';
    const np = H.nextPlace();
    G.el('div', 'q1', q, '길의 별 찾기 ' + (G.st.quest || 0) + '/5');   // 9/30: 별 모양·"사라진 별"은 진짜 별에만
    G.el('div', 'q2', q, np ? '지금 할 일: ' + np.name + '에 가 보자' : '다음 이야기를 기다려요');
    G.onTap(q, () => { if (np) G.audio.voice('S92_now_' + np.id); });
    return q;
  }
  function bagBtn() { return G.btn('pill', G.icon('icon_bag') + ' 가방', tr, () => { G.audio.voice('S92_btn_bag'); H.bag(); }, '가방'); }
  function skyBtn() { if (!(G.st.stars > 0)) return; G.btn('pill', G.icon('icon_star') + ' 밤하늘 보기', tr, () => { G.audio.voice('S92_btn_sky'); H.sky(); }, '밤하늘 보기'); }   // 10/1 선생님: 모은 별을 중간에도 확인
  function lumiBtn(onTap) {
    const b = G.el('button', 'lumi-btn', bl); b.type = 'button'; b.setAttribute('aria-label', '루미 도움');
    const im = G.el('img', '', b); im.src = G.asset('assets/chars/lumi.png'); im.alt = '';
    G.el('span', '', b, '루미');
    G.onTap(b, onTap);
  }

  H.map = () => {
    H.clear();
    if (!G.st.done.includes('meet_lumi')) return;
    H.questEl = questCard();
    skyBtn(); bagBtn();
    lumiBtn(() => G.help.now());
  };
  H.refreshQuest = () => { if (H.questEl && H.questEl.isConnected) { const n = questCard(); H.questEl.replaceWith(n); H.questEl = n; } };

  H.scene = (def, onMap) => {
    H.clear();
    taskEl = G.el('button', 'quest tasks', tl); taskEl.type = 'button';
    G.onTap(taskEl, () => G.audio.voice('S03_rumi_03'));
    H.tasks(def);
    G.btn('pill', G.icon('icon_map') + ' 지도로', tr, () => { G.audio.voice('S92_btn_map'); onMap(); }, '지도로');
    skyBtn(); bagBtn();
    lumiBtn(() => G.help.now());
  };
  H.tasks = (def, flash) => {
    if (!taskEl) return;
    const n = def.missions.length, d = def.missions.filter(m => G.st.done.includes(m)).length;
    taskEl.innerHTML = '<span>이곳에서 할 일</span> <span class="stars">' + G.svgDot(true).repeat(d) + G.svgDot(false).repeat(n - d) + '</span>';
    if (flash) { taskEl.classList.remove('flash'); void taskEl.offsetWidth; taskEl.classList.add('flash'); }
  };
  H.keepTasks = (on) => { tl && tl.classList.toggle('keep', !!on); };

  // ---- 건너뛰기 (지도 이동·연출) ----
  H.skip = (fn) => {
    br.innerHTML = ''; if (!fn) return;
    G.btn('pill skip', '건너뛰기 ' + G.icon('icon_skip'), br, () => { G.audio.voice('S92_btn_skip'); br.innerHTML = ''; fn(); }, '건너뛰기');
  };

  // ---- 루미 말풍선: 대사를 읽어 주고 끝나면 사라짐 (대화창을 열지 않음) ----
  H.say = async (id) => {
    const L = G.D.dialogues[id]; if (!L) return;
    const my = ++bubbleTok;
    bubble.textContent = L.text; bubble.style.display = '';
    await G.audio.voice(id);
    await G.wait(1.2);
    if (my === bubbleTok) bubble.style.display = 'none';
  };
  H.hideBubble = () => { bubbleTok++; if (bubble) bubble.style.display = 'none'; };

  // ---- 가방: 5칸, 누르면 이름과 설명을 읽어 줌 ----
  // 밤하늘: 아홉 별 자리, 되찾은 별만 빛남 (별자리 선은 아직 없음)
  H.sky = () => {
    const ov = G.$('#overlay'), m = G.el('div', 'modal sky-view', ov); G.busy++;
    m.style.backgroundImage = `url("${G.asset('assets/ui/sky.jpg')}")`;
    const POS = [[.5, .42], [.3, .3], [.7, .3], [.2, .55], [.8, .55], [.38, .66], [.62, .66], [.5, .2], [.5, .8]], n = G.st.stars || 0;
    G.STARS.forEach((s, i) => { const e = G.el('div', 'c11-slot' + (i < n ? ' me lit' : ''), m, G.starSvg(s, i >= n)); Object.assign(e.style, { left: POS[i % POS.length][0] * 100 + '%', top: POS[i % POS.length][1] * 100 + '%' }); });
    G.el('div', 'star-count sky-count', m, G.icon('icon_star') + ' 되찾은 별 ' + n + '/8');
    const close = () => { if (!m.isConnected) return; m.remove(); G.busy = Math.max(0, G.busy - 1); };
    G.btn('pill sky-close', '닫기', m, close, '닫기');
  };
  H.bag = () => {
    const ov = G.$('#overlay');
    const m = G.el('div', 'modal', ov); const sh = G.el('div', 'sheet', m);
    G.busy++;
    G.el('h3', '', sh, G.icon('icon_bag') + ' 가방');
    const slots = G.el('div', 'bag-slots', sh);
    const nm = G.el('div', 'bag-name', sh, G.st.items.length ? '' : '아직 가방이 비어 있어요');
    for (let i = 0; i < Math.max(6, G.st.items.length); i++) {   // 10/1: 점자 쪽지까지 6칸
      const it = G.D.items.find(x => x.id === G.st.items[i]);
      const s = G.el('button', 'bag-slot' + (it ? ' has' : ''), slots, it ? G.icon(it.icon) : ''); s.type = 'button';
      if (it) G.onTap(s, () => { nm.textContent = it.name; G.audio.sfx('sfx_page', 0.4); H.itemPop(it); });
    }
    if (G.p4 && G.p4.dustLine) G.p4.dustLine(sh);   // 10/1: 모은 별가루
    const row = G.el('div', 'btn-row', sh);
    G.btn('pill gold', G.icon('icon_ok') + ' 닫기', row, () => { m.remove(); G.busy = Math.max(0, G.busy - 1); G.audio.stopVoice(); });
  };
  // ---- 9/30 선생님: 가방의 아이템을 누르면 큰 그림이 팝업 (마을 지도·촉각 지도 등). 그림 파일 art/popup_<id>가 없으면 아이콘을 크게 ----
  H.itemPop = (it) => {
    const ov = G.$('#overlay');
    const m = G.el('div', 'modal item-pop', ov); const sh = G.el('div', 'sheet', m);
    const big = it.id === 'map' ? G.asset(G.D.places.map.color) : G.art('popup_' + it.id);
    const pic = G.el('div', 'item-pop-pic' + (big ? ' art' : ''), sh, big ? `<img src="${big}" alt="">` : G.icon(it.icon));
    if (it.id === 'map') {   // 10/1 선생님: 가방의 마을 지도 = 실제 마을 지도 + 장소 이름 (지도를 보고 장소를 찾아갈 수 있게)
      pic.classList.add('item-map'); const P = G.D.places, W = P.map.width, Hh = P.map.height;
      const tag = (x, y, t, cls = '') => { const e = G.el('div', 'im-tag ' + cls, pic, t); e.style.left = (x / W * 100) + '%'; e.style.top = (y / Hh * 100) + '%'; };
      for (const q of P.places) tag(q.marker[0], q.marker[1] + 60, q.name);
      tag(P.home.house[0], P.home.house[1] - 90, '우리 집');
      sh.classList.add('map-pop');
    }
    if (it.id === 'note' && G.D.puzzles.lock) {   // 10/1 선생님: 촌장님 쪽지 = 점자 네 칸 쪽지
      pic.className = 'item-pop-pic item-note';
      pic.innerHTML = '<div class="p4-note"><div class="p4-note-head">' + G.icon('item_braille_note') + ' 촌장님 쪽지</div><div class="p4-note-dots">' + G.braille.svg(G.D.puzzles.lock.cells, 40) + '</div></div>';
    }
    G.el('div', 'get-title', sh, it.name);
    G.el('div', 'get-desc', sh, G.txt(it.voice));
    pic.animate && pic.animate([{ transform: 'scale(.6)', opacity: 0 }, { transform: 'scale(1)', opacity: 1 }], { duration: 350, easing: 'ease-out' });
    G.audio.voice(it.voice);
    const row = G.el('div', 'btn-row', sh);
    G.btn('pill gold', G.icon('icon_ok') + ' 닫기', row, () => { m.remove(); G.audio.stopVoice(); }, '닫기');
    // 9/30: 낮은 휴대폰 화면에서 [닫기]가 화면 밖으로 밀리지 않게, 창이 넘치면 그림을 그만큼 줄임
    const img = big && pic.querySelector('img');
    const fit = () => { if (!img || !m.isConnected) return; if (it.id === 'map') { pic.style.fontSize = Math.max(12, img.getBoundingClientRect().width * 0.03) + 'px'; return; } img.style.maxHeight = ''; const over = sh.scrollHeight - sh.clientHeight;
      if (over > 0) img.style.maxHeight = Math.max(60, img.getBoundingClientRect().height - over - 4) + 'px';  };
    if (img) { if (img.complete) fit(); else img.onload = fit; G.resizers.add(fit); const mo = new MutationObserver(() => { if (!m.isConnected) { G.resizers.delete(fit); mo.disconnect(); } }); mo.observe(ov, { childList: true }); }
  };
  return H;
})();

/* ---- help.js ---- */
// help.js — 도움 3단계 (GDD 6-1): 30초 질문 → 60초 화살표 → 90초(또는 [루미]) 반짝이는 길
// 대화·연출·이동 중(G.busy)과 교사용 설정이 열려 있을 때는 시간을 세지 않음
'use strict';
G.help = (() => {
  const Hp = {};
  let t = 0, level = 0, h = null;
  const TIMES = { short: [20, 40, 60], normal: [30, 60, 90], long: [45, 90, 135] };
  const times = () => TIMES[(G.settings && G.settings.help) || 'normal'];
  G.every(dt => {
    if (!h || G.busy > 0 || (G.dialog && G.dialog.active) || (G.settings && G.settings.help === 'off')) return;
    t += dt; const T = times();
    if (level < 1 && t >= T[0]) { level = 1; h.l1 && h.l1(); }
    if (level < 2 && t >= T[1]) { level = 2; h.l2 && h.l2(); }
    if (level < 3 && t >= T[2]) { level = 3; h.l3 && h.l3(); }
  });
  // 무엇이든 누르면 시간을 처음부터 (보이던 도움 표시는 지움)
  Hp.poke = () => { t = 0; if (level > 0) { level = 0; h && h.clear && h.clear(); } };
  Hp.set = (handlers) => { if (h && h.clear) h.clear(); h = handlers; t = 0; level = 0; };
  Hp.off = () => Hp.set(null);
  // [루미] 버튼: 바로 3단계 (질문도 같이 읽어 줌)
  Hp.now = () => { if (!h) return; t = times()[2]; level = 3; h.l1 && h.l1(); h.l2 && h.l2(); h.l3 && h.l3(); };
  Hp.level = () => level;
  return Hp;
})();

/* ---- mapview.js ---- */
// mapview.js — 마을 지도 그림 한 벌 (지도 화면과 연출 C1·C7이 같이 씀)
// 먹색 지도 위에 컬러 지도를 겹치고, 구역마다 둥근 물감 번짐(마스크)으로 색이 돌아옴 (GDD 7-5, 8장)
'use strict';
G.mapView = (parent, o = {}) => {
  const M = G.D.places.map, MOOD = G.D.mood;
  const V = { W: M.width, H: M.height, cam: { x: 1400, y: 860, z: 1 }, alpha: {}, grow: {}, lamps: [], markers: {} };
  const el = V.el = G.el('div', 'world', parent);
  el.style.width = V.W + 'px'; el.style.height = V.H + 'px';
  V.imgs = G.el('div', 'layer', el);
  const mono = G.el('img', 'bg', V.imgs); mono.src = G.asset(M.mono); mono.width = V.W; mono.height = V.H; mono.alt = '';
  const col = V.colorImg = G.el('img', 'bg map-color', V.imgs); col.src = G.asset(M.color); col.width = V.W; col.height = V.H; col.alt = '';
  V.fx = G.el('div', 'layer', el);        // 불빛, 표시, 인물 (위치는 지도 px)
  V.ready = Promise.all([mono, col].map(i => i.decode ? i.decode().catch(() => { }) : Promise.resolve()));

  // ---- 가로등 불빛 ----
  for (const L of MOOD.lamps) {
    const g = G.el('div', 'lamp-glow', V.fx); g.style.left = L.at[0] + 'px'; g.style.top = (L.at[1] - 4) + 'px';
    V.lamps.push({ def: L, el: g });
  }
  V.setLamps = (stage, all) => { for (const l of V.lamps) l.el.classList.toggle('on', !!all || l.def.from <= stage); };

  // ---- 색 번짐: 구역마다 타원 물감 자국 ----
  V.applyMask = () => {
    const parts = [];
    for (const z of MOOD.zones) {
      const a = V.alpha[z.id] || 0; if (a < 0.003) continue;
      const k = V.grow[z.id] ?? 1, rx = Math.max(1, z.r[0] * k), ry = Math.max(1, z.r[1] * k);
      parts.push(`radial-gradient(ellipse ${rx.toFixed(0)}px ${ry.toFixed(0)}px at ${z.center[0]}px ${z.center[1]}px, rgba(0,0,0,${a.toFixed(3)}) 0%, rgba(0,0,0,${a.toFixed(3)}) 42%, rgba(0,0,0,${(a * .55).toFixed(3)}) 72%, rgba(0,0,0,0) 100%)`);
    }
    if (!parts.length) { col.style.visibility = 'hidden'; return; }
    col.style.visibility = '';
    const m = parts.join(',');
    col.style.webkitMaskImage = m; col.style.maskImage = m;
  };
  V.setMood = (stage) => {
    for (const z of MOOD.zones) { V.alpha[z.id] = z.alpha[Math.max(0, Math.min(5, stage))]; V.grow[z.id] = 1; }
    V.applyMask(); V.setLamps(stage);
  };
  V.fullColor = (a) => { col.style.webkitMaskImage = 'none'; col.style.maskImage = 'none'; col.style.visibility = ''; col.style.opacity = a; };

  // ---- 장소 표시(별)와 이름표 ----
  V.addMarkers = () => {
    for (const p of G.D.places.places) {
      const m = G.el('div', 'marker', V.fx); m.style.left = p.marker[0] + 'px'; m.style.top = p.marker[1] + 'px';
      const lb = G.el('div', 'plabel', V.fx, p.name); lb.style.left = p.marker[0] + 'px'; lb.style.top = (p.marker[1] + 62) + 'px';
      V.markers[p.id] = { m, lb, p, state: '' };
    }
  };
  // state: open(반짝) / locked(흐림) / done(작은 별) / hidden
  V.setMarker = (id, state, showLabel) => {
    const k = V.markers[id]; if (!k) return;
    if (k.state !== state) {
      k.state = state; k.m.className = 'marker ' + state;
      k.m.innerHTML = state === 'hidden' ? '' :
        state === 'locked' ? (G.artImg('map_pin', 'pin-locked') || G.svgPin('rgba(190,196,214,.55)', 'rgba(90,96,120,.8)', 5)) :
        state === 'done' ? (G.artImg('map_pin_done') || G.svgPin('#FFE9A8', '#C98F14', 6)) : (G.artImg('map_pin') || G.svgPin('#FFD66B', '#FFF6D6', 6));   // 9/30: 장소 표시는 동그란 핀
      if (state === 'done') k.m.style.transform = 'scale(.62)'; else k.m.style.transform = '';
    }
    k.lb.style.display = showLabel && state !== 'hidden' ? '' : 'none';
    k.lb.classList.toggle('locked', state === 'locked');
  };

  // ---- 걷는 인물 (4방향 x 걷기 8장 + 서 있기) ----
  const ROW = { SE: 0, SW: 1, NW: 2, NE: 3 };
  V.walker = (sheet, cls) => {
    const w = { x: 0, y: 0, dir: 'SE', frame: 8 };
    w.el = G.el('div', 'walker' + (cls ? ' ' + cls : ''), V.fx);
    G.el('div', 'shadow', w.el);
    w.spr = G.el('div', 'sprite', w.el); w.spr.style.backgroundImage = `url("${G.asset(sheet)}")`;
    w.set = (x, y) => { w.x = x; w.y = y; w.el.style.transform = `translate(${x.toFixed(1)}px,${y.toFixed(1)}px)`; const z = Math.round(y); if (z !== w.z) { w.z = z; w.el.style.zIndex = z; } };   // 10/4 폰 끊김: 바뀔 때만 씀
    w.draw = () => { const bp = `${-w.frame * 100}px ${-ROW[w.dir] * 130}px`; if (bp !== w.bp) { w.bp = bp; w.spr.style.backgroundPosition = bp; } };
    w.face = (dx, dy) => { w.dir = dy >= 0 ? (dx >= 0 ? 'SE' : 'SW') : (dx >= 0 ? 'NE' : 'NW'); };
    w.draw();
    return w;
  };

  // ---- 카메라: 가운데 (x,y), 확대 z. 지도 밖이 보이지 않게 막음 (free면 안 막음) ----
  V.setCam = (x, y, z = V.cam.z) => {
    const { W, H, ws, u } = G.stage;
    if (!o.free) z = Math.max(z, W / (ws * V.W), H / (ws * V.H));   // 10/1 선생님: 지도보다 멀리 빼서 둘레에 여백이 생기지 않게
    const s = ws * z;
    if (!o.free) {
      const vw = W / s, vh = H / s;
      x = vw >= V.W ? V.W / 2 : Math.max(vw / 2, Math.min(V.W - vw / 2, x));
      y = vh >= V.H ? V.H / 2 : Math.max(vh / 2, Math.min(V.H - vh / 2, y));
    }
    V.cam = { x, y, z };
    el.style.transform = `translate(${(W / 2 - x * s).toFixed(1)}px,${(H / 2 - y * s).toFixed(1)}px) scale(${s.toFixed(4)})`;
    el.style.setProperty('--k', (u / s).toFixed(3));   // 지도 위 글자·말풍선을 화면 크기에 맞게
  };
  V.toScreen = (x, y) => { const s = G.stage.ws * V.cam.z; return [G.stage.W / 2 + (x - V.cam.x) * s, G.stage.H / 2 + (y - V.cam.y) * s]; };
  return V;
};

// 길 찾기: 노드 이름 목록 (places.json의 edges)
G.mapPath = (from, to) => {
  if (from === to) return [from];
  const adj = {}; for (const [a, b] of G.D.places.edges) { (adj[a] = adj[a] || []).push(b); (adj[b] = adj[b] || []).push(a); }
  const prev = { [from]: null }, q = [from];
  while (q.length) { const n = q.shift(); if (n === to) break; for (const m of adj[n] || []) if (!(m in prev)) { prev[m] = n; q.push(m); } }
  if (!(to in prev)) return [from, to];
  const out = []; for (let n = to; n; n = prev[n]) out.unshift(n); return out;
};

/* ---- dialogue.js ---- */
// dialogue.js — 대화창(U5)과 선택지(U6)
// 음성이 끝나야 [다음]이 켜짐. 대화창 바깥을 눌러도 [다음]과 같음. [다시 듣기]는 언제나 누를 수 있음
// 인물 그림: 왼쪽 = 주인공 + 루미, 오른쪽 = 상대. 말하는 사람은 밝게, 듣는 사람은 조금 어둡게 (기획안 16-10)
// 9/29: 선생님 캐릭터 일러스트. 대사마다 동작 그림을 바꿈 (data/poses.json, 적지 않으면 기본 01)
// 9/29 밤: 상반신 위주로 크게, 서로 마주 보게 (왼쪽 인물은 오른쪽을, 오른쪽 인물은 왼쪽을 봄)
//   상대가 없으면 주인공(왼쪽)과 루미(오른쪽)가 마주 봄. 상대가 있으면 루미는 주인공 어깨 옆에서 상대 쪽을 봄
//   인물 그림은 #portraits 층(장면 바로 위, 버튼·할 일 표시·대화창보다 아래)에만 그려 버튼을 가리지 않음
// 프로토타입 2: opts.noPortraits = 인물 그림 없이 대화창만 (퍼즐 화면은 위쪽에 해솔 얼굴을 따로 그림, U7)
'use strict';
G.dialog = (() => {
  const Dl = { active: false };
  const BAND = { lumi: '#FFD66B', hero: '#7FB77E', chief: '#A0764F', post: '#5B8FD0', bom: '#F4A259', haesol: '#3AA39A', daon: '#E88D7A', villager: '#B58BC4', nar: '', ui: '' };
  let wrap, box, nameEl, textEl, nextBtn, replayBtn, pgL, pgR, heroImg, lumiImg, partnerImg, choicesEl;
  let ready = false, vtok = 0, curId = null, waiter = null, blinkOff = null, lastLine = false;

  function build(partner, noPt) {
    const root = G.$('#dialog'); root.innerHTML = '';
    wrap = G.el('div', 'dlg-wrap', root);
    const hit = G.el('div', 'dlg-hit', wrap);
    hit.addEventListener('click', (e) => {
      if (G.paused || G._suppressClick) return;
      const through = lastLine && ready;   // 마지막 대사에서 장면 속 누를 곳(장소·반짝이는 곳)을 누르면 대화를 닫고 그곳을 바로 누름
      press();
      if (through) setTimeout(() => tapThrough(e.clientX, e.clientY), 80);
    });
    const P = G.D.portraits, pr = G.$('#portraits'); pr.innerHTML = '';
    if (noPt) { pgL = pgR = heroImg = lumiImg = partnerImg = null; pr.classList.remove('on'); }
    else {
      pr.classList.add('on');
      pgL = G.el('div', 'pgroup L enter', pr);
      heroImg = portrait(pgL, 'pmain', 'hero', 'L');
      if (partner && P[partner]) {
        lumiImg = portrait(pgL, 'plumi', 'lumi', 'L');
        pgR = G.el('div', 'pgroup R enter', pr);
        partnerImg = portrait(pgR, 'pmain', partner, 'R');
      } else {
        pgR = G.el('div', 'pgroup R solo enter', pr);
        lumiImg = portrait(pgR, 'plumi', 'lumi', 'R');
        partnerImg = null;
      }
      requestAnimationFrame(() => requestAnimationFrame(() => { pgL && pgL.classList.remove('enter'); pgR && pgR.classList.remove('enter'); }));
    }
    box = G.el('div', 'dlg-box', wrap);
    nameEl = G.el('div', 'dlg-name', box);
    textEl = G.el('div', 'dlg-text', box);
    const btns = G.el('div', 'dlg-btns', box);   // 9/29: 버튼을 옆으로 나란히 놓아 대화창을 낮게
    replayBtn = G.btn('pill dlg-replay', G.icon('icon_sound'), btns, () => { if (curId) speak(curId); }, '다시 듣기');
    nextBtn = G.btn('pill gold dlg-next wait', '다음 ' + G.icon('icon_next'), btns, () => press(), '다음');
    choicesEl = null;
    // 루미 눈 깜박임 (깜박임 그림이 있을 때만)
    if (P.lumi.blink && lumiImg) {
      let t = 0, next = 2.5 + Math.random() * 2;
      blinkOff = G.every(dt => {
        t += dt; if (t > next) { lumiImg.src = G.asset(P.lumi.blink); if (t > next + 0.14) { lumiImg.src = G.asset(P.lumi.img); t = 0; next = 2.5 + Math.random() * 2.5; } }
      });
    }
  }
  function portrait(parent, cls, key, side) {
    const P = G.D.portraits[key], img = G.el('img', cls, parent); img.alt = ''; img.dataset.who = key; img.dataset.side = side;
    if (P.scale && cls === 'pmain') img.style.setProperty('--ps', P.scale);
    Object.values(P.poses || {}).forEach(src => { const pre = new Image(); pre.src = G.asset(src); });   // 동작이 바뀔 때 깜박이지 않게 미리 읽음
    // 9/29 밤: 그림의 가로:세로를 원본 그대로 고정 (어떤 브라우저에서도 가로로 눌리지 않게)
    img.addEventListener('load', () => {
      if (!img.naturalWidth) return;
      img.style.aspectRatio = img.naturalWidth + ' / ' + img.naturalHeight;
      // 10/4: 길게 자른 그림(높이 720 넘음)은 위 720px만 지금 자리에 두고 나머지는 대화창 뒤로 내려 화면 아래까지 닿게 (휴대폰에서 잘린 끝이 안 보이게)
      const k = cls === 'pmain' && img.naturalHeight > 720 ? img.naturalHeight / 720 : 1;
      img.style.setProperty('--ext', k); img.style.setProperty('--exd', 1 - 1 / k);
    });
    setPose(img, '01'); return img;
  }
  // 동작 그림 바꾸기. 그림이 보는 쪽(face)과 선 자리(side)를 맞춰 뒤집음: 왼쪽 자리는 오른쪽을, 오른쪽 자리는 왼쪽을 보게
  function setPose(img, q) {
    if (!img) return;
    const P = G.D.portraits[img.dataset.who], face = (P.faces || {})[q] || P.face || 'L', M = (P.mirror || {})[q];
    let src = (P.poses && P.poses[q]) || P.img, flip = face === img.dataset.side;
    if (flip && M) { src = M; flip = false; }   // 10/3: 글자가 든 그림(루미 물음표)은 CSS로 뒤집지 않고 미리 뒤집어 둔 그림을 씀
    if (img.dataset.src !== src) { img.dataset.src = src; img.src = G.asset(src); }
    img.classList.toggle('flip', flip);
  }
  function poseFor(key, id) { return ((G.D.poses || {})[id] || {})[key] || '01'; }
  function tapThrough(x, y) {
    if (Dl.active || G.busy > 0 || G.paused) return;
    const t = document.elementFromPoint(x, y), b = t && t.closest('#world .place, #world .hot');
    if (b) b.click();
  }
  function setSpeaker(sp) {
    const inL = sp === 'hero' || sp === 'lumi';
    if (heroImg) { heroImg.classList.toggle('dim', sp !== 'hero'); heroImg.classList.toggle('speak', sp === 'hero'); }
    if (lumiImg) { lumiImg.classList.toggle('dim', sp !== 'lumi'); lumiImg.classList.toggle('speak', sp === 'lumi'); }
    if (partnerImg) { const me = !inL && sp !== 'nar'; partnerImg.classList.toggle('dim', !me); partnerImg.classList.toggle('speak', me); }
    if (Dl.onSpeaker) Dl.onSpeaker(sp);
  }
  function setNext() { if (!nextBtn) return; nextBtn.classList.toggle('wait', !ready); nextBtn.classList.toggle('ready', ready); nextBtn.disabled = !ready; }
  function speak(id) {
    const my = ++vtok; ready = false; setNext();
    if (G.fast()) { ready = true; setNext(); }   // 빠르게 모드: 음성이 끝나기 전에도 [다음]
    return G.audio.voice(id).then(() => { if (my === vtok) { ready = true; setNext(); } });
  }
  function press() { if (!ready || !waiter) return; if (G.fast()) { vtok++; G.audio.stopVoice(); } G.audio.sfx('sfx_tap', 0.5); const w = waiter; waiter = null; w(); }
  function show(id) {
    const L = G.D.dialogues[id] || { speaker: 'nar', name: '', text: '' };
    curId = id;
    nameEl.textContent = L.name || ''; nameEl.style.setProperty('--band', BAND[L.speaker] || 'var(--star)');
    textEl.textContent = L.text; setSpeaker(L.speaker);
    // "…을 눌러 봐" 대사에서는 인물 그림이 비켜서 장면 속 누를 곳(장소·반짝이는 곳)을 가리지 않음. 마지막 대사면 그곳을 바로 눌러도 됨
    G.$('#portraits').classList.toggle('look', /눌러/.test(L.text));
    setPose(heroImg, poseFor('hero', id)); setPose(lumiImg, poseFor('lumi', id));
    if (partnerImg) setPose(partnerImg, poseFor(Dl.partner, id));
    return L;
  }

  // ---- 대사 여러 개를 차례로 ----
  // opts.partner: 오른쪽 인물 ('chief', 'post', 'bom', 'haesol'), opts.keep: 끝나도 창을 닫지 않음, opts.noPortraits: 인물 그림 없이
  Dl.play = async (ids, opts = {}) => {
    if (!ids || !ids.length) return;
    open(opts.partner, opts.noPortraits);
    G.audio.preload(ids.slice(0, 3));
    for (let i = 0; i < ids.length; i++) {
      G.audio.preload(ids.slice(i + 1, i + 3));
      lastLine = i === ids.length - 1 && !opts.keep;
      show(ids[i]); if (Dl.onLine) Dl.onLine(ids[i]);
      await new Promise(res => { waiter = res; speak(ids[i]); });
    }
    if (!opts.keep) Dl.close();
  };
  function open(partner, noPt) {
    if (!Dl.active || (partner || null) !== Dl.partner || !!noPt !== Dl.noPt) {
      if (blinkOff) blinkOff();
      build(partner, noPt);
    }
    Dl.partner = partner || null; Dl.noPt = !!noPt;
    if (!Dl.active) { Dl.active = true; G.busy++; G.$('#game').classList.add('talking'); }
  }
  Dl.close = () => {
    if (!Dl.active) return;
    Dl.active = false; G.busy = Math.max(0, G.busy - 1); waiter = null; curId = null; vtok++; lastLine = false;
    G.audio.stopVoice(); if (blinkOff) blinkOff(); blinkOff = null;
    G.$('#dialog').innerHTML = ''; G.$('#game').classList.remove('talking');
    const pr = G.$('#portraits'); pr.innerHTML = ''; pr.classList.remove('on');
    if (Dl.onSpeaker) Dl.onSpeaker(null);
  };

  // ---- 선택지 (U6): 처음 누르면 읽어 주고 테두리, 한 번 더 누르면 선택. 버튼이 하나면 바로 선택 ----
  // opts: [{label, icon, voice}] → 고른 번호. 고른 말은 주인공 대사로 한 번 나옴
  Dl.choose = (options, keep) => new Promise((done) => {
    open(Dl.partner, Dl.noPt); lastLine = false;
    nextBtn.style.visibility = 'hidden';
    choicesEl = G.el('div', 'choices', wrap);
    const one = options.length === 1 || (G.settings && G.settings.choiceOne) || G.fast();
    let armed = -1;
    options.forEach((o, i) => {
      const ic = o.art && G.art(o.art) ? `<img class="ico" src="${G.art(o.art)}" alt=""> ` : o.icon ? G.icon(o.icon) + ' ' : '';   // 9/30: 선생님 그림(art)이 있으면 그 그림
      const b = G.btn('pill gold choice', ic + o.label, choicesEl, async () => {
        if (one || armed === i) {
          choicesEl.remove(); choicesEl = null; nextBtn.style.visibility = '';
          G.audio.sfx('sfx_tap', 0.6);
          if (o.voice) { show(o.voice); if (G.fast()) { speak(o.voice); await G.wait(0.5); } else { await speak(o.voice); await G.wait(0.3); } }
          if (!keep) Dl.close();
          done(i); return;
        }
        armed = i; choicesEl.querySelectorAll('.armed').forEach(e => e.classList.remove('armed')); b.classList.add('armed');
        if (o.voice) G.audio.voice(o.voice, o.label);
      });
    });
  });

  Dl.open = (partner) => open(partner, false);   // 9/30: 대화 중에 오른쪽 인물만 바꿈 (다음 선택지를 그 사람에게 묻기)
  Dl.onKey = (e) => {
    if (!Dl.active) return false;
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight') {
      if (choicesEl) { const a = choicesEl.querySelector('.armed') || (choicesEl.children.length === 1 && choicesEl.children[0]); if (a) a.click(); return true; }
      press(); return true;
    }
    if (e.key === 'r' || e.key === 'R') { if (curId) speak(curId); return true; }
    return false;
  };
  return Dl;
})();

/* ---- braille.js ---- */
// braille.js — 점자 그리기 (GDD 5-1). 점자/braille_draw.js와 같은 모양을 SVG로 그림 (글꼴이 아니라 점을 직접 그려 기기마다 모양이 같음)
// 한 칸 = 왼쪽 줄 위에서 아래로 1·2·3, 오른쪽 줄 4·5·6. 6자리를 모두 그림: 찍힌 점 = 볼록한 점, 빈 자리 = 옅은 동그라미. 칸 테두리도 옅게
// 비율은 실제 점자 크기(점 사이 2.5mm, 칸 사이 6mm, 점 지름 1.5mm)를 따름: s = 점 사이, 칸 간격 2.4s, 점 반지름 0.3s
'use strict';
G.braille = (() => {
  const B = {};
  const POS = { 1: [0, 0], 2: [0, 1], 3: [0, 2], 4: [1, 0], 5: [1, 1], 6: [1, 2] };
  const ST = { dot: '#4A3B32', dotLight: '#8A7362', empty: 'rgba(74,59,50,0.38)', emptyFill: 'rgba(255,244,224,0.55)', cell: 'rgba(74,59,50,0.16)', cellFill: 'rgba(255,244,224,0.35)' };
  let uid = 0;
  B.metrics = (s) => ({ s, r: 0.3 * s, pitch: 2.4 * s, cellW: s, cellH: 2 * s, pad: 0.55 * s });
  // 낱말 그림의 크기 (칸 테두리 포함)
  B.size = (cells, s) => { const m = B.metrics(s); return [(cells.length - 1) * m.pitch + m.cellW + 2 * m.pad, m.cellH + 2 * m.pad]; };
  // 낱말 하나를 SVG 글로. o.dot: 볼록한 점 색 (빛날 때 바꿈)
  B.svg = (cells, s, o = {}) => {
    const m = B.metrics(s), [w, h] = B.size(cells, s), id = 'bd' + (++uid);
    const dot = o.dot || ST.dot, light = o.dotLight || ST.dotLight;
    let g = `<svg class="braille" viewBox="0 0 ${w.toFixed(1)} ${h.toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}">` +
      `<defs><radialGradient id="${id}" cx="35%" cy="30%" r="70%"><stop offset="0" stop-color="${light}"/><stop offset="1" stop-color="${dot}"/></radialGradient></defs>`;
    cells.forEach((dots, i) => {
      const x = m.pad + i * m.pitch, y = m.pad, on = new Set(dots);
      g += `<rect x="${(x - m.pad).toFixed(1)}" y="${(y - m.pad).toFixed(1)}" width="${(m.cellW + 2 * m.pad).toFixed(1)}" height="${(m.cellH + 2 * m.pad).toFixed(1)}" rx="${(0.35 * s).toFixed(1)}" fill="${ST.cellFill}" stroke="${ST.cell}" stroke-width="${Math.max(1, 0.05 * s).toFixed(1)}"/>`;
      for (let d = 1; d <= 6; d++) {
        const px = x + POS[d][0] * s, py = y + POS[d][1] * s;
        if (on.has(d)) g += `<circle cx="${(px + 0.06 * s).toFixed(1)}" cy="${(py + 0.08 * s).toFixed(1)}" r="${m.r.toFixed(1)}" fill="rgba(40,30,25,0.28)"/><circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="${m.r.toFixed(1)}" fill="url(#${id})"/>`;
        else g += `<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="${(m.r * 0.92).toFixed(1)}" fill="${ST.emptyFill}" stroke="${ST.empty}" stroke-width="${Math.max(1, 0.07 * s).toFixed(1)}"/>`;
      }
    });
    return g + '</svg>';
  };
  return B;
})();

/* ---- stars.js ---- */
// stars.js — 하늘의 별 9개 (9/30 새 세계관): 주제 별 8개 + 마지막 별. 별마다 모양과 색, 하는 일이 다름
// 하는 일은 사람의 몸을 고치는 것이 아니라 "마을이 모두에게 맞는 방법을 쓰게 돕는 것" (기획안 2장 표현 원칙)
// 9/30 선생님 그림 assets/ui/stars/star_<id>.png (gen_data가 story.starImgs에 적음). 그림이 없는 별만 아래 SVG 임시 그림
'use strict';
G.STARS = (() => {
  const OUT = '#FFF6D6';
  const pts = (n, R, r, cx = 50, cy = 52, rot = -90) => {
    const a = [];
    for (let i = 0; i < n * 2; i++) { const t = (rot + i * 180 / n) * Math.PI / 180, q = i % 2 ? r : R; a.push((cx + q * Math.cos(t)).toFixed(1) + ',' + (cy + q * Math.sin(t)).toFixed(1)); }
    return a.join(' ');
  };
  const poly = (p, fill, sw = 4) => `<polygon points="${p}" fill="${fill}" stroke="${OUT}" stroke-width="${sw}" stroke-linejoin="round"/>`;
  const face = (cx = 50, cy = 54) => '';   // 얼굴은 넣지 않음 (루미와 헷갈리지 않게)
  const S = [
    { id: 'road', name: '길의 별', job: '여러 가지 방법으로 길과 소식을 알려 줘요', color: '#7DBBE3',
      svg: poly(pts(4, 46, 14), '#7DBBE3') + poly(pts(4, 22, 8, 50, 52, -45), '#FFE9A8', 3) },
    { id: 'sound', name: '소리의 별', job: '모두가 편안하게 들을 수 있게 도와요', color: '#B58BC4',
      svg: poly(pts(5, 38, 22), '#B58BC4') + `<path d="M84 34 Q94 52 84 70 M76 40 Q83 52 76 64" fill="none" stroke="${OUT}" stroke-width="4" stroke-linecap="round"/>` },
    { id: 'word', name: '말의 별', job: '말, 그림, 손짓으로 마음을 전하게 해요', color: '#F29BB0',
      svg: `<path d="M26 74 L16 94 L40 80 Z" fill="#F29BB0" stroke="${OUT}" stroke-width="4" stroke-linejoin="round"/>` + poly(pts(5, 42, 20), '#F29BB0') },
    { id: 'door', name: '문턱의 별', job: '누구나 어디든 들어갈 수 있게 해요', color: '#7FB77E',
      svg: poly(pts(6, 44, 26), '#7FB77E') + `<path d="M26 88 Q52 88 76 70" fill="none" stroke="${OUT}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" opacity=".9"/>` },
    { id: 'heart', name: '마음의 별', job: '왜 그랬는지 서로 물어보게 해요', color: '#F4A259',
      svg: `<path d="M50 88 C18 66 8 46 22 30 C33 18 46 24 50 34 C54 24 67 18 78 30 C92 46 82 66 50 88 Z" fill="#F4A259" stroke="${OUT}" stroke-width="4" stroke-linejoin="round"/>` +
        `<path d="M50 4 V14 M88 18 L81 25 M12 18 L19 25" stroke="${OUT}" stroke-width="4" stroke-linecap="round"/>` },
    { id: 'speed', name: '속도의 별', job: '저마다의 빠르기를 기다려 줘요', color: '#E6B54A',
      svg: poly(pts(5, 46, 22), '#E6B54A') + `<path d="M50 52 m0 0 a4 4 0 1 1 5 4 a9 9 0 1 1 -13 -8 a14 14 0 1 1 20 14" fill="none" stroke="${OUT}" stroke-width="3.5" stroke-linecap="round"/>` },
    { id: 'idea', name: '생각의 별', job: '푸는 방법이 여러 가지라고 알려 줘요', color: '#9ED0C8',
      svg: (() => { const C = ['#F4A259', '#FFD66B', '#7FB77E', '#7DBBE3', '#B58BC4', '#F29BB0', '#E88D7A']; let g = '';
        for (let i = 0; i < 7; i++) { const a = (-90 + i * 360 / 7) * Math.PI / 180, b = (-90 + (i + 0.5) * 360 / 7) * Math.PI / 180, c = (-90 + (i - 0.5) * 360 / 7) * Math.PI / 180;
          g += `<polygon points="50,52 ${(50 + 20 * Math.cos(c)).toFixed(1)},${(52 + 20 * Math.sin(c)).toFixed(1)} ${(50 + 46 * Math.cos(a)).toFixed(1)},${(52 + 46 * Math.sin(a)).toFixed(1)} ${(50 + 20 * Math.cos(b)).toFixed(1)},${(52 + 20 * Math.sin(b)).toFixed(1)}" fill="${C[i]}" stroke="${OUT}" stroke-width="3" stroke-linejoin="round"/>`; }
        return g; })() },
    { id: 'together', name: '함께의 별', job: '직접 만나고 알아 가게 해요', color: '#FFD66B',
      svg: poly(pts(5, 34, 15, 36, 50), '#FFE9A8') + poly(pts(5, 34, 15, 64, 56), '#FFD66B') },
    { id: 'last', name: '마지막 별', job: '모두의 마음이 모이면 빛나요', color: '#FFF1B8', big: true,
      svg: poly(pts(8, 47, 24), '#FFF1B8') + poly(pts(8, 26, 14, 50, 52, -67.5), '#FFD66B', 3) },
  ];
  // 별 하나를 그림으로 (선생님 그림이 있으면 그 그림)
  G.starSvg = (s, wc) => {
    if (wc && ((G.D.story || {}).starWc || []).includes(s.id)) return `<img src="${G.asset('assets/ui/stars_wc/star_' + s.id + '.png')}" alt="" draggable="false">`;   // 9/30 밤하늘에서는 수채화 톤
    const has = ((G.D.story || {}).starImgs || []).includes(s.id);
    if (has) return `<img src="${G.asset('assets/ui/stars/star_' + s.id + '.png')}" alt="" draggable="false">`;
    return `<svg viewBox="0 0 100 100">${s.svg}</svg>`;
  };
  return S;
})();

/* ---- cutscene.js ---- */
// cutscene.js — 연출 (U8, 기획안 7-12). 층(하늘·별·마을·인물·빛·입자·글자)을 따로 움직임
// 처음 보는 연출은 2초 뒤 [건너뛰기]. 건너뛰면 모든 움직임이 바로 끝 모습으로 감 (그래서 끝 상태가 항상 맞음)
// 움직임 줄이기: 카메라 이동·흔들림 없이 천천히 바뀌는 그림으로
'use strict';
G.cut = (() => {
  const C = { active: null };
  const TEXT = (id) => (G.D.dialogues[id] || {}).text || '';

  function ctx(root) {
    const c = { skipped: false, rm: !!G.reduced(), light: !!(G.settings && G.settings.light), t0: G.t, root };
    let skipRes; c.skipP = new Promise(r => skipRes = r);
    c.skip = () => { if (c.skipped) return; c.skipped = true; G.audio.stopVoice(); skipRes(); };
    c.wait = (s) => c.skipped || s <= 0 ? Promise.resolve() : Promise.race([G.wait(s), c.skipP]);
    c.until = (t) => c.wait(t - (G.t - c.t0));
    c.tween = (a, b, dur, fn, ease = 'io') => new Promise(res => {
      if (c.skipped || dur <= 0) { fn(b); res(); return; }
      let t = 0; fn(a);
      const off = G.every(dt => { t += dt; const k = c.skipped ? 1 : Math.min(1, t / dur); fn(a + (b - a) * G.ease[ease](k)); if (k >= 1) { off(); res(); } });
    });
    c.sfx = (n, v) => { if (!c.skipped) G.audio.sfx(n, v); };
    let sub = null;
    c.sub = (text) => {
      if (!text) { if (sub) sub.style.display = 'none'; return; }
      if (!sub) sub = G.el('div', 'subtitle', root);
      sub.textContent = text; sub.style.display = '';
    };
    c.voice = (id, withSub = true) => {
      if (c.skipped) return Promise.resolve();
      if (withSub) c.sub(TEXT(id));
      return Promise.race([G.audio.voice(id), c.skipP]).then(() => { if (withSub) c.sub(''); });
    };
    return c;
  }

  // ---- 연출 틀: 겹 하나 만들고, 건너뛰기, 본 연출 기록 ----
  C.play = async (id, opts = {}) => {
    const fn = SCRIPTS[id] || (id.startsWith('CH:') ? SCRIPTS.CH : null); if (!fn) return;
    const ov = G.$('#overlay');
    const root = G.el('div', 'cut', ov);
    const c = ctx(root); C.active = c;
    G.busy++; G.hud.hide(true); G.help.poke();
    const g = G.gen, st0 = G.st;
    const seen = opts.replay || (st0 && st0.seenCutscenes.includes(id));
    let done = false;
    const skipBox = G.el('div', 'skipbox', root);
    const showSkip = () => {
      if (done || c.skipped || (G.settings && G.settings.hideSkip)) return;
      skipBox.innerHTML = '';
      G.btn('pill skip', '건너뛰기 ' + G.icon('icon_skip'), skipBox, () => { skipBox.innerHTML = ''; G.audio.voice('S92_btn_skip'); c.skip(); }, '건너뛰기');
      c.skipShown = true;
    };
    if (seen || G.fast()) showSkip(); else c.wait(2).then(showSkip);
    try { await fn(c, root, opts); } catch (e) { console.error('연출 오류', id, e); }
    done = true;
    if (st0 && !st0.seenCutscenes.includes(id) && !opts.replay) { st0.seenCutscenes.push(id); if (st0 === G.st) G.save.write(); }
    root.remove(); if (C.active === c) C.active = null;
    if (g === G.gen) { G.busy = Math.max(0, G.busy - 1); G.hud.hide(false); }
  };
  C.onKey = (e) => {
    if (!C.active) return false;
    if ((e.key === 'Enter' || e.key === ' ') && C.active.skipShown) { C.active.skip(); return true; }
    return true;   // 연출 중에는 다른 키를 먹음
  };

  const fadeIn = (c, el, d = 0.8) => c.tween(0, 1, d, v => el.style.opacity = v);
  const fadeOut = (c, el, d = 0.6) => c.tween(1, 0, d, v => el.style.opacity = v);
  const sparkSvg = G.sparkle();

  // 반짝이 가루가 한 점에서 퍼짐 (화면 좌표)
  function burst(c, root, x, y, n = 14) {
    if (c.skipped) return;
    if (c.light) n = Math.min(n, 6);
    for (let i = 0; i < n; i++) {
      const s = G.el('div', 'spk', root, sparkSvg); s.style.left = x + 'px'; s.style.top = y + 'px';
      const a = Math.PI * 2 * i / n + Math.random() * 0.4, R = G.stage.u * (160 + Math.random() * 180);
      c.tween(0, 1, 1.2 + Math.random() * 0.5, k => { s.style.transform = `translate(${Math.cos(a) * R * k}px,${Math.sin(a) * R * k - 40 * G.stage.u * k}px) scale(${1 - k * 0.6}) rotate(${k * 180}deg)`; s.style.opacity = 1 - k; }, 'out').then(() => s.remove());
    }
  }

  const SCRIPTS = {
    // ---- C1 인트로 (9/30 새 세계관, 약 40초): 여러 모양의 별 9개가 뜬 하늘 → 별마다 마을로 빛줄기 → 광장에서 별 하나가 하늘로 올라감
    //      → 별이 하나둘 떨어지고 마지막 별까지 사라짐 → 카메라가 마을로 → 불빛이 꺼지고 색이 빠짐 → 루미 등장
    //      이야기꾼 대사 S01_nar_01~09 가 끝나야 다음 장면으로 (음성 길이에 맞춰 흐름)
    async C1(c, root) {
      root.style.opacity = 0;
      const V = G.mapView(root, { free: true });
      const sky = G.el('img', 'bg', null); sky.src = G.asset('assets/ui/sky.jpg'); sky.alt = '';
      Object.assign(sky.style, { top: '-1900px', left: '-900px', width: (V.W + 1800) + 'px', height: '2200px', objectFit: 'cover' }); V.el.insertBefore(sky, V.el.firstChild);   // 9/30: 카메라가 별을 따라 왼쪽 위로 가도 밤하늘이 끊기지 않게 넓힘
      V.imgs.style.webkitMaskImage = V.imgs.style.maskImage = 'linear-gradient(to bottom, transparent 0, #000 320px)';
      V.fullColor(1); V.setLamps(5, true);
      const dotL = G.el('div', 'layer', V.el), starL = G.el('div', 'layer', V.el);
      const dots = [];
      for (let i = 0; i < (c.light ? 14 : 40); i++) {
        const d = G.el('div', 'dot twinkle', dotL), r = 6 + Math.random() * 12;
        Object.assign(d.style, { left: Math.random() * V.W + 'px', top: (-1250 + Math.random() * 1000) + 'px', width: r + 'px', height: r + 'px', animationDelay: (-Math.random() * 2.2) + 's' });
        dots.push(d);
      }
      // 별 9개: 가운데 위가 마지막 별 (가장 큼)
      // 9/30 선생님: 별이 너무 커서 작게, 더 넓게 흩어 놓음. 밤하늘에서는 수채화 톤 그림 (assets/ui/stars_wc)
      const POS = [[700, -900], [1000, -1180], [1250, -860], [1630, -860], [1880, -1180], [2180, -900], [1060, -620], [1820, -620], [1440, -1080]];
      const beamL = G.el('div', 'layer', V.el);
      const S = G.STARS.map((s, i) => {
        const sz = s.big ? 124 : 92, el = G.el('div', 'skystar', starL, G.starSvg(s, true)), at = POS[i];
        Object.assign(el.style, { left: at[0] + 'px', top: at[1] + 'px', width: sz + 'px', height: sz + 'px', margin: (-sz / 2) + 'px 0 0 ' + (-sz / 2) + 'px', animationDelay: (-i * 0.37) + 's' });
        const bm = G.el('div', 'sbeam', beamL); Object.assign(bm.style, { left: (at[0] - 9) + 'px', top: at[1] + 'px', height: (900 - at[1]) + 'px', opacity: 0 });
        bm.style.background = `linear-gradient(to bottom, ${s.color}cc, ${s.color}00)`;
        return { s, el, at, bm };
      });
      const road = S[0]; road.el.style.opacity = 0;   // 길의 별: 광장에서 올라가는 모습으로 등장
      const P = G.D.places.nodes, land = [P.PLAZA[0], P.PLAZA[1] - 70];
      const flare = G.el('div', 'flare', V.fx); Object.assign(flare.style, { position: 'absolute', left: (land[0] - 450) + 'px', top: (land[1] - 300) + 'px', opacity: 0, zIndex: 3990 });
      const lumi = G.el('img', '', V.fx); lumi.src = G.asset('assets/chars/lumi_big.png'); lumi.alt = '';
      Object.assign(lumi.style, { position: 'absolute', left: (land[0] - 70) + 'px', top: (land[1] - 150) + 'px', width: '140px', height: '140px', opacity: 0, zIndex: 4001 });
      await Promise.all([V.ready, sky.decode ? sky.decode().catch(() => { }) : 0]);
      V.setCam(1440, -820, 1);
      const onR = () => V.setCam(V.cam.x, V.cam.y, V.cam.z); G.resizers.add(onR);
      // 9/30: 시작 위치를 한 번만 잡아 고르게 움직임 (전에는 매 순간 남은 거리를 줄여 카메라가 먼저 가 버렸음)
      const cam = (x, y, z, d) => { if (c.rm) { V.setCam(x, y, z); return Promise.resolve(); } const a = { ...V.cam }; return c.tween(0, 1, d, k => V.setCam(a.x + (x - a.x) * k, a.y + (y - a.y) * k, a.z + (z - a.z) * k), 'io'); };
      const pop = (el) => { if (!c.rm && el.animate && !c.skipped) el.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.35)' }, { transform: 'scale(1)' }], { duration: 600, easing: 'ease-out' }); };
      // 9/30 선생님: 인트로 이야기꾼 대사 사이에 0.7초 쉼 (연달아 줄줄 말하지 않게, 인트로에만)
      const say = (id) => c.voice(id).then(() => c.wait(0.7));
      c.t0 = G.t;
      // (1) 별이 가득한 밤하늘
      fadeIn(c, root, 1.0);
      await c.wait(0.4); await say('S01_nar_01');
      // (2) 여러 모양의 별이 차례로 반짝
      await Promise.all([say('S01_nar_02'), (async () => { for (const q of S) { if (q === road) continue; pop(q.el); c.sfx('sfx_chime', 0.12); await c.wait(0.3); } })()]);
      // (3) 별마다 마을로 빛줄기 (별이 하는 일)
      await Promise.all([say('S01_nar_03'), c.tween(0, 0.55, 1.4, v => S.forEach(q => { if (q !== road) q.bm.style.opacity = v; }))]);
      await Promise.all([say('S01_nar_04'), (async () => { pop(S[2].el); await c.wait(1.2); pop(S[2].el); })()]);
      // (4) 광장으로 내려가 주민들이 함께 방법을 찾는 마을 → 길의 별이 별 받침대에서 하늘로
      c.tween(0.55, 0, 1.2, v => S.forEach(q => { if (q !== road) q.bm.style.opacity = v; }));   // 9/30: 아직 없는 길의 별 빛줄기가 잠깐 보이던 것 고침
      await Promise.all([say('S01_nar_05'), cam(1400, 640, 1.1, 2.6)]);
      road.el.style.left = land[0] + 'px'; road.el.style.top = land[1] + 'px'; road.el.style.opacity = 1;
      c.sfx('sfx_sparkle', 0.6);
      // 9/30 선생님: 별 받침대에서 올라가는 별을 카메라가 따라감 (별이 늘 화면 가운데 조금 아래)
      const c0 = { ...V.cam };
      await Promise.all([
        say('S01_nar_06'),
        c.tween(0, 1, c.rm ? 0.1 : 3.8, k => {
          const x = land[0] + (road.at[0] - land[0]) * k, y = land[1] + (road.at[1] - land[1]) * k;
          road.el.style.left = x + 'px'; road.el.style.top = y + 'px';
          if (c.rm) return;
          const f = Math.min(1, k / 0.18), b = f * f * (3 - 2 * f);   // 처음 잠깐은 카메라가 별 쪽으로 부드럽게 붙음
          V.setCam(c0.x + (x - c0.x) * b, c0.y + (y - 90 - c0.y) * b, c0.z + (1 - c0.z) * k);
        }, 'io'),
      ]);
      pop(road.el); c.sfx('sfx_chime', 0.4);
      // 별이 자리에 닿은 뒤 밤하늘 전체가 보이게 천천히 물러남
      await cam(1440, -820, 1, 1.6);
      await c.wait(0.3);
      // (5) 별이 하나둘 떨어짐 → 마지막 별까지
      // 9/30 선생님: 떨어질 때 빙글빙글 돌고, 지나간 자리에 별 잔상과 반짝이는 별의 길이 잠시 남음 (선 하나만 있던 것을 바꿈)
      const trail = G.el('div', 'layer', V.el); trail.style.zIndex = 1;
      const tw = (col) => G.sparkle('#FFFDF2', col, 5);
      // 10/4 폰 끊김: 잔상·반짝이는 매 순간 JS로 바꾸지 않고 브라우저 애니메이션으로 사라지게 (없으면 예전처럼)
      const fade = (el, kf, ms, ease, end) => { const an = el.animate && el.animate(kf, { duration: ms, easing: ease, fill: 'forwards' }); if (an) an.finished.then(() => el.remove(), () => el.remove()); else { end(); setTimeout(() => el.remove(), ms); } };
      const fall = (q, i) => new Promise(async (res) => {
        if (!c.rm && !c.skipped) await c.tween(0, 1, 0.8, k => { q.el.style.transform = `rotate(${Math.sin(k * Math.PI * 6) * 16}deg)`; });
        c.sfx('sfx_starfall', 0.35);
        const to = [500 + ((i * 397) % 1900), 250 + ((i * 211) % 600)], p1 = [(q.at[0] + to[0]) / 2 + 300, q.at[1] + 200];
        const sz = parseFloat(q.el.style.width), col = q.s.color, spin = (i % 2 ? -1 : 1) * (q.s.big ? 900 : 720);
        const many = !(c.rm || c.light || c.skipped);
        let lastG = -1, lastS = -1;
        await c.tween(0, 1, c.rm ? 0.3 : 1.9, k => {
          const u = 1 - k, x = u * u * q.at[0] + 2 * u * k * p1[0] + k * k * to[0], y = u * u * q.at[1] + 2 * u * k * p1[1] + k * k * to[1];
          const sc = 1 - 0.55 * k, rot = c.rm ? 0 : spin * k, op = k < 0.75 ? 1 : (1 - k) / 0.25;
          q.el.style.translate = (x - q.at[0]) + 'px ' + (y - q.at[1]) + 'px'; q.el.style.transform = `rotate(${rot}deg) scale(${sc})`; q.el.style.opacity = op;
          if (c.skipped) return;
          // 별 잔상: 지나간 자리에 같은 별이 옅게 남았다가 사라짐
          if (many && k - lastG > 0.045 && k < 0.9) {
            lastG = k;
            const g = G.el('div', 'sghost', trail, q.el.innerHTML);
            Object.assign(g.style, { left: x + 'px', top: y + 'px', width: sz + 'px', height: sz + 'px', margin: (-sz / 2) + 'px 0 0 ' + (-sz / 2) + 'px', transform: `rotate(${rot}deg) scale(${sc})` });
            fade(g, [{ opacity: 0.55 * op }, { opacity: 0 }], 550, 'linear', () => g.style.opacity = 0);
          }
          // 반짝이는 별의 길: 작은 반짝이가 뿌려져 잠시 반짝이다 천천히 사라짐
          if (k - lastS > (many ? 0.026 : 0.08) && k < 0.95) {
            lastS = k;
            const s = G.el('div', 'strail', trail, tw(col)), r = (18 + Math.random() * 26) * (q.s.big ? 1.3 : 1);
            const jx = (Math.random() - 0.5) * sz * 0.5, jy = (Math.random() - 0.5) * sz * 0.5;
            Object.assign(s.style, { left: (x + jx) + 'px', top: (y + jy) + 'px', width: r + 'px', height: r + 'px', margin: (-r / 2) + 'px 0 0 ' + (-r / 2) + 'px', animationDelay: (-Math.random()) + 's' }); s.style.setProperty('--c', col);
            const life = many ? 1.4 + Math.random() * 0.9 : 0.8;
            fade(s, [{ opacity: 1, transform: 'translateY(0) scale(1.1)' }, { opacity: .7, transform: 'translateY(3px) scale(.85)', offset: .22 }, { opacity: .95, transform: 'translateY(9px) scale(1)', offset: .44 }, { opacity: .55, transform: 'translateY(18px) scale(.72)', offset: .66 }, { opacity: .35, transform: 'translateY(28px) scale(.7)', offset: .84 }, { opacity: 0, transform: 'translateY(40px) scale(.5)' }], life * 1000, 'linear', () => s.style.opacity = 0);   // 반짝임도 같은 애니메이션 안에서
          }
        }, 'in');
        q.el.style.opacity = 0;
        if (!c.skipped) burst(c, root, ...V.toScreen(to[0], to[1]), c.light ? 4 : 8);
        res();
      });
      const order = [2, 5, 0, 7, 3, 1, 6, 4];
      await Promise.all([
        say('S01_nar_07'),
        (async () => { const fs = []; for (const i of order) { fs.push(fall(S[i], i)); await c.wait(c.rm ? 0.3 : 0.75); } await Promise.all(fs); })(),
      ]);
      await Promise.all([say('S01_nar_08'), fall(S[8], 8), c.tween(1, 0.25, 2, v => dotL.style.opacity = v)]);
      // (6) 마을로: 가로등이 광장 가까운 것부터 꺼지고, 색이 빠짐
      await cam(1400, 700, 1.1, c.rm ? 0 : 2.4);
      const ls = [...V.lamps].sort((a, b) => Math.hypot(a.def.at[0] - land[0], a.def.at[1] - land[1]) - Math.hypot(b.def.at[0] - land[0], b.def.at[1] - land[1]));
      await Promise.all([
        say('S01_nar_09'),
        c.tween(1, 0, 3.2, v => V.colorImg.style.opacity = v),
        (async () => { for (const l of ls) { l.el.classList.remove('on'); c.sfx('sfx_click', 0.15); await c.wait(0.28); } })(),
      ]);
      // (7) 광장 쪽 작은 빛 속에서 루미가 나타나 두리번거림
      c.sfx('sfx_sparkle', 0.7);
      await c.tween(0, 0.8, 0.6, k => { flare.style.opacity = k; flare.style.transform = `scale(${0.3 + k * 0.7})`; }, 'out');
      await c.tween(0, 1, 0.9, k => { lumi.style.opacity = k; lumi.style.transform = c.rm ? '' : `scale(${k}) rotate(${(1 - k) * 360}deg)`; }, 'out');
      c.tween(0.8, 0, 1.2, v => flare.style.opacity = v);
      await c.wait(0.6); if (!c.rm && !c.skipped) lumi.style.transform = 'scaleX(-1)';
      await c.wait(0.7); lumi.style.transform = '';
      await c.wait(0.6);
      await fadeOut(c, root, 0.6);
      G.resizers.delete(onR);
    },

    // ---- C2 광장 도착 (6초): 카메라가 광장으로 다가감 → 촌장이 돌아봄 → 「광장」 ----
    async C2(c, root, opts) {
      root.style.opacity = 0;
      const V = G.sceneView(root, 'plaza', { chiefBack: true }); V.setMood(opts.replay ? 0 : (G.st ? G.st.mood : 0));
      await V.ready;
      const onR = () => V.setCam(V.cam.x, V.cam.y, V.cam.z); G.resizers.add(onR);
      if (c.rm) V.setCam(1200, 540, 1); else V.setCam(1000, 560, 1.3);
      c.t0 = G.t;
      const title = G.el('div', 'cut-title', root, '광장'); title.style.opacity = 0;
      await Promise.all([
        fadeIn(c, root, 0.5),
        (async () => { if (!c.rm) await c.tween(0, 1, 3.4, k => V.setCam(1000 + 200 * k, 560 - 20 * k, 1.3 - 0.3 * k), 'io'); })(),
        (async () => {
          await c.until(2.3); V.showBack(false);
          const ch = V.spr.chief.img;
          if (!c.rm) await c.tween(0, 1, 0.5, k => ch.style.marginTop = (-Math.sin(k * Math.PI) * 10) + 'px');
        })(),
        (async () => {
          await c.until(3.3);
          c.voice('S92_place_plaza', false);
          await c.tween(0, 1, 0.6, k => { title.style.opacity = k; title.style.transform = `translate(-50%,-50%) scale(${0.8 + 0.2 * k})`; }, 'out');
          await c.until(5.3);
          await c.tween(1, 0, 0.5, v => title.style.opacity = v);
          await c.until(5.9);
        })(),
      ]);
      V.setCam(1200, 540, 1); V.showBack(false);
      G.resizers.delete(onR);
    },

    // ---- C7 장소 클리어: "완료!" → 별빛이 위로 날아감 → 지도에서 금빛 물감이 번지며 색이 돌아옴 → 다음 장소에 불 ----
    async C7(c, root, opts) {
      const live = opts.live;
      const place = live ? live.place : 'plaza', from = live ? live.from : 0, to = live ? live.to : 1, unlock = live ? live.unlock : 'market';
      let SV = null;
      if (live) root.style.background = 'transparent';
      else { SV = G.sceneView(root, place); SV.setMood(0); await SV.ready; }
      c.t0 = G.t;
      // (가) 장면 위
      const big = G.el('div', 'cut-big', root, '완료!'); big.style.opacity = 0;   // 9/30 선생님: "이곳 완료!" → "완료!", 효과음도 선생님이 주신 소리로
      c.sfx('sfx_clear', 0.8); c.voice('S92_clear', false);
      const { W, H, u } = G.stage;
      burst(c, root, W / 2, H * 0.4, 16);
      await c.tween(0, 1, 0.5, k => { big.style.opacity = Math.min(1, k * 2); big.style.transform = `translate(-50%,-50%) scale(${c.rm ? 1 : 0.5 + 0.6 * k})`; }, 'out');
      await c.tween(1.1, 1, 0.2, k => { if (!c.rm) big.style.transform = `translate(-50%,-50%) scale(${k})`; });
      await c.until(1.2);
      // 9/30 새 세계관: 장소를 끝내면 별이 아니라 마을의 따뜻한 불빛이 돌아옴 (별은 역할 미션 뒤 별 받침대에서만)
      const warm = G.el('div', 'warm-glow', root);
      const sv = live ? G.scene.view() : SV; const pp = sv ? sv.toScreen(1200, 560) : [W / 2, H / 2];
      warm.style.left = pp[0] + 'px'; warm.style.top = pp[1] + 'px';
      c.sfx('sfx_chime', 0.5);
      await c.tween(0, 1, 1.3, k => { warm.style.transform = `translate(-50%,-50%) scale(${0.2 + k * 2.2})`; warm.style.opacity = Math.min(1, 3 * (1 - k)); }, 'out');
      warm.remove();
      await c.tween(1, 0, 0.4, v => big.style.opacity = v);
      // (나) 지도로
      G.$('#fade').classList.add('on'); await c.wait(0.45); if (c.skipped) await G.wait(0.05);
      big.remove(); if (SV) { SV.el.remove(); SV = null; }
      let MV;
      if (live) { await G.map.show({ mood: from, lockedOverride: [unlock] }); MV = G.map.V; G.hud.hide(true); G.map.camFree = true; }
      else {
        root.style.background = '#1b2146';
        MV = G.mapView(root, {}); MV.setMood(from); MV.addMarkers();
        for (const p of G.D.places.places) MV.setMarker(p.id, p.id === place ? 'done' : 'locked', p.labelAlways);
        await MV.ready;
      }
      const z = G.D.mood.zones.find(q => q.id === place) || G.D.mood.zones[0];
      MV.setCam(z.center[0], z.center[1] + 20);
      G.$('#fade').classList.remove('on');
      await c.wait(0.4);
      await bloom(c, MV, from, to, z, unlock, live);
      G.map.camFree = false;
      await c.wait(1.0);
      if (!live) await fadeOut(c, root, 0.5);
    },
  };

  // ---- 장소 도착 공통: 장면 그림 한 벌 + 카메라 + 제목 ----
  async function arrive(c, root, opts, place) {
    root.style.opacity = 0;
    const V = G.sceneView(root, place); V.setMood(opts.replay ? 0 : (G.st ? G.st.mood : 0));
    await V.ready;
    const onR = () => V.setCam(V.cam.x, V.cam.y, V.cam.z); G.resizers.add(onR);
    return { V, off: () => G.resizers.delete(onR) };
  }
  async function title(c, root, text, voice, at, until) {
    const t = G.el('div', 'cut-title', root, text); t.style.opacity = 0;
    await c.until(at);
    c.voice(voice, false);
    await c.tween(0, 1, 0.6, k => { t.style.opacity = k; t.style.transform = `translate(-50%,-50%) scale(${0.8 + 0.2 * k})`; }, 'out');
    await c.until(until - 0.6);
    await c.tween(1, 0, 0.5, v => t.style.opacity = v);
    await c.until(until);
  }

  Object.assign(SCRIPTS, {
    // ---- 9/30 장 제목 (약 4초): "제 3 장" + 선 + "소식을 아는 사람". 배경은 선생님 그림 (없으면 밤하늘 그림을 어둡게) ----
    async CH(c, root, opts) {
      const key = opts.key, T = ((G.D.story || {}).chapterTitles || {})[key]; if (!T) return;
      root.classList.add('chapter');
      const bg = G.el('div', 'ch-bg', root); bg.style.backgroundImage = `url("${G.art('chapter_' + key) || G.art('chapter_bg') || G.asset('assets/ui/sky.jpg')}")`;
      if (!G.art('chapter_' + key) && !G.art('chapter_bg')) bg.classList.add('dim');
      // 9/30 선생님: 장 제목은 마루부리 글꼴 (위 "제 1장" Light, 아래 제목 Bold). 글자는 따로 페이드 인·아웃
      const box = G.el('div', 'ch-box', root);
      const num = G.el('div', 'ch-num chapter-number', box, (G.D.story.chapterStar || '길의 별') + '-' + T[0]);   // 10/1 선생님: "제 1장" 대신 "길의 별-1"
      const line = G.el('div', 'ch-line', box, G.artImg('chapter_line') || '<i></i>');
      const tt = G.el('div', 'ch-title chapter-title', box, T[1]);
      // 10/4 피드백: 하늘에 진짜 아홉 별 모양. 되찾은 별은 빛나고, 이번 장의 별 자리는 깜박, 나머지는 빈 자리
      const cur = /^s(\d+)_/.test(key) ? +key.match(/^s(\d+)_/)[1] - 1 : 0, row = G.el('div', 'ch-stars', root);
      G.STARS.forEach((s, i) => G.el('i', i < cur ? 'lit' : i === cur ? 'now' : '', row, G.starSvg(s, true)));
      const txt = [num, line, tt, row]; txt.forEach(e => e.style.opacity = 0);
      root.style.opacity = opts.cover ? 1 : 0;   // 10/1 cover: 그림이 처음부터 화면을 덮음 (장소 모습이 먼저 비치지 않게)
      if (document.fonts && document.fonts.load) await Promise.race([Promise.all([document.fonts.load('300 40px MaruBuri', num.textContent), document.fonts.load('700 90px MaruBuri', T[1])]).catch(() => { }), c.wait(1.2)]);   // 글꼴이 오기 전에 글자가 먼저 보이지 않게 (늦으면 대신 글꼴로)
      c.sfx('sfx_chime', 0.5);
      const fin = (e, at, d) => c.wait(c.rm ? 0 : at).then(() => c.tween(0, 1, c.rm ? 0.2 : d, v => e.style.opacity = v, 'out'));
      await Promise.all([
        c.tween(0, 1, c.rm ? 0.2 : 0.9, v => { if (!opts.cover) root.style.opacity = v; bg.style.transform = c.rm ? '' : `scale(${1.06 - 0.06 * v})`; }, 'out'),
        fin(num, 0.35, 0.8), fin(line, 0.6, 0.8), fin(tt, 0.8, 1.0), fin(row, 0.2, 0.8),
      ]);
      await Promise.all([c.voice(T[2], false), c.wait(G.fast() ? 0.6 : 2.0)]);
      await c.tween(1, 0, c.rm ? 0.2 : 0.7, v => txt.forEach(e => e.style.opacity = v));
      await c.tween(1, 0, c.rm ? 0.2 : 0.5, v => root.style.opacity = v);
    },
    // ---- 10/1 선생님: 제 1장 앞, 양피지 안으로 들어가기 (약 4초). 양피지가 펼쳐지고 가운데로 다가가면 그 안에 제 1장 그림이 번져 나옴 ----
    async PARCH(c, root) {
      const pa = G.art('parchment_open'), ch = G.art('chapter_intro') || G.art('chapter_bg'); if (!pa) return;
      root.classList.add('parch-in');
      const cam = G.el('div', 'pi-cam', root);
      const bg = G.el('div', 'pi-bg', cam); bg.style.backgroundImage = `url("${pa}")`;
      const win = G.el('div', 'pi-win', cam); if (ch) win.style.backgroundImage = `url("${ch}")`;
      win.style.opacity = 0; cam.style.opacity = 0;
      c.sfx('sfx_page', 0.6);
      await c.tween(0, 1, c.rm ? 0.3 : 0.9, v => { cam.style.opacity = v; if (!c.rm) cam.style.transform = `scale(${0.92 + 0.08 * v})`; }, 'out');
      await c.wait(0.5);
      c.sfx('sfx_sparkle', 0.5);
      if (c.rm) await c.tween(0, 1, 0.6, v => win.style.opacity = v);
      else await c.tween(0, 1, 1.8, v => { cam.style.transform = `scale(${1 + 1.4 * v * v})`; win.style.opacity = Math.min(1, v * 1.6); }, 'io');
      const full = G.el('div', 'ch-bg', root); full.style.backgroundImage = `url("${ch || pa}")`; full.style.transform = 'scale(1.06)'; full.style.opacity = 0;
      await c.tween(0, 1, 0.35, v => full.style.opacity = v);
    },
    // ---- C3 시장 도착 (6초): 천막이 바람에 펄럭(소리) → 과일 가게 쪽으로 다가감 → 봄이 아주머니가 폴짝 인사 → 「시장」 ----
    async C3(c, root, opts) {
      const { V, off } = await arrive(c, root, opts, 'market');
      if (c.rm) V.setCam(1200, 540, 1); else V.setCam(1500, 520, 1.3);
      c.t0 = G.t;
      // 바람: 나뭇잎 같은 작은 조각이 화면을 가로질러 날아감
      const wind = () => {
        if (c.skipped || c.light) return;
        for (let i = 0; i < 7; i++) {
          const w = G.el('div', 'wind' + (G.art('wind_leaf') ? ' art' : ''), root, G.artImg('wind_leaf') || ''); const y = G.stage.H * (0.15 + Math.random() * 0.5);
          c.tween(0, 1, 1.6 + Math.random() * 0.8, k => { w.style.transform = `translate(${-60 + (G.stage.W + 120) * k}px,${y + Math.sin(k * 9 + i) * 30 * G.stage.u}px) rotate(${k * 540}deg)`; w.style.opacity = Math.sin(k * Math.PI); }, 'lin').then(() => w.remove());
        }
      };
      await Promise.all([
        fadeIn(c, root, 0.5),
        (async () => { await c.until(0.3); c.sfx('sfx_flap', 0.8); wind(); })(),
        (async () => { if (!c.rm) await c.tween(0, 1, 3.4, k => V.setCam(1500 - 300 * k, 520 + 20 * k, 1.3 - 0.3 * k), 'io'); })(),
        (async () => {
          await c.until(2.4); const b = V.spr.bom && V.spr.bom.img; if (!b || c.rm) return;
          await c.tween(0, 1, 0.9, k => b.style.marginTop = (-Math.abs(Math.sin(k * Math.PI * 2)) * 14) + 'px');
        })(),
        title(c, root, '시장', 'S92_place_market', 3.3, 5.9),
      ]);
      V.setCam(1200, 540, 1); off();
    },

    // ---- C4 도서관 도착 (7초): 나무 문이 천천히 열림 → 따뜻한 빛이 쏟아짐 → 먼지가 반짝 → 해솔 사서가 인사 → 「도서관」 ----
    async C4(c, root, opts) {
      const { V, off } = await arrive(c, root, opts, 'library');
      V.setCam(1200, 540, 1);
      const light = G.el('div', 'door-light', root); light.style.opacity = 0;
      const door = G.el('div', 'door', root); const dl = G.el('div', 'door-l', door), dr = G.el('div', 'door-r', door);
      const dimg = G.art('library_door'); if (dimg) { door.classList.add('art'); for (const d of [dl, dr]) G.el('img', 'door-img', d).src = dimg; }   // 9/30: 선생님 문 그림 한 장을 반씩 (비율 그대로 화면을 채움)
      // 9/30 선생님 "테두리 먼저 움직이고 그다음 문이 움직임": 돌 테두리(frame)는 가만히 두고 문짝(l, r)만 경첩을 축으로 열림
      const fimg = G.art('library_door_frame'), limg = G.art('library_door_l'), rimg = G.art('library_door_r');
      if (fimg && limg && rimg) {
        door.classList.remove('art'); door.classList.add('art2'); dl.textContent = ''; dr.textContent = '';
        G.el('img', 'door-img', dl).src = limg; G.el('img', 'door-img', dr).src = rimg;
        G.el('img', 'door-img door-frame', door).src = fimg;
        // 그림(1600x893)이 화면을 채우는 배율로 경첩 위치(x 308, 1292)를 화면 좌표로
        const W = root.clientWidth || G.stage.W, H = root.clientHeight || G.stage.H, s = Math.max(W / 1600, H / 893);
        dl.style.transformOrigin = `${W / 2 + (308 - 800) * s}px 50%`; dr.style.transformOrigin = `${W / 2 + (1292 - 800) * s}px 50%`;
      }
      c.t0 = G.t;
      await Promise.all([
        fadeIn(c, root, 0.4),
        (async () => {
          await c.until(0.6); c.sfx('sfx_door', 0.9);
          await c.tween(0, 1, 2.2, k => {
            if (c.rm) { door.style.opacity = 1 - k; return; }
            dl.style.transform = `perspective(${G.stage.W}px) rotateY(${-100 * k}deg)`; dr.style.transform = `perspective(${G.stage.W}px) rotateY(${100 * k}deg)`;
            const fr = door.querySelector('.door-frame'); if (fr) fr.style.opacity = Math.min(1, (1 - k) / 0.35);   // 문이 거의 열리면 돌 테두리가 사라지며 도서관 안으로
          }, 'io');
          door.remove();
        })(),
        (async () => {   // 빛이 쏟아지고 먼지가 반짝
          await c.until(1.2);
          await c.tween(0, 1, 0.8, k => light.style.opacity = k, 'out');
          if (!c.skipped) for (let i = 0; i < (c.light ? 8 : 22); i++) {
            const d = G.el('div', 'dot twinkle', root), r = (5 + Math.random() * 9) * G.stage.u;
            Object.assign(d.style, { left: (G.stage.W * (0.2 + Math.random() * 0.6)) + 'px', top: (G.stage.H * (0.1 + Math.random() * 0.6)) + 'px', width: r + 'px', height: r + 'px', animationDelay: (-Math.random() * 2.2) + 's' });
            c.tween(0, 1, 4, k => { d.style.translate = `0 ${-60 * k * G.stage.u}px`; d.style.opacity = Math.sin(k * Math.PI); }, 'lin').then(() => d.remove());
          }
          await c.tween(1, 0.35, 2.4, k => light.style.opacity = k);
        })(),
        (async () => {   // 해솔 사서가 책에서 손을 떼고 인사 (살짝 몸을 세움)
          await c.until(3.2); const h = V.spr.haesol && V.spr.haesol.img; if (!h || c.rm) return;
          await c.tween(0, 1, 0.8, k => h.style.marginTop = (-Math.sin(k * Math.PI) * 10) + 'px');
        })(),
        title(c, root, '도서관', 'S92_place_library', 4.2, 6.9),
      ]);
      off();
    },

    // ---- C8 퍼즐 1 성공 (5초): 촉각 지도의 볼록한 길이 도서관에서 숲까지 차례로 빛남 → 숲 이름표가 반짝 ----
    async C8(c, root, opts) {
      let B = opts.live, off = () => { };
      if (B) root.style.background = 'transparent';
      else {   // 교사용 다시 보기: 촉각 지도를 따로 그림
        root.style.background = '#2a2440';
        B = G.puzzle.board(root, 'braille1');
        const fit = () => { const { W, H, u } = G.stage; B.fit(u * 40, u * 40, W - u * 80, H - u * 200); };
        fit(); G.resizers.add(fit); off = () => G.resizers.delete(fit);
      }
      const P = B.D.lightPath, seg = [];
      let total = 0; for (let i = 1; i < P.length; i++) { const l = Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]); seg.push(l); total += l; }
      const at = (d) => { for (let i = 0; i < seg.length; i++) { if (d <= seg[i]) { const k = d / seg[i]; return [P[i][0] + (P[i + 1][0] - P[i][0]) * k, P[i][1] + (P[i + 1][1] - P[i][1]) * k]; } d -= seg[i]; } return P[P.length - 1]; };
      B.light.style.strokeDasharray = total; B.light.style.strokeDashoffset = total; B.light.style.opacity = 1;
      const head = (d) => { if (!B.arrow) return; const [x, y] = at(d); let i = 0, r = d; while (i < seg.length - 1 && r > seg[i]) { r -= seg[i]; i++; }
        const ang = Math.atan2(P[i + 1][1] - P[i][1], P[i + 1][0] - P[i][0]) * 180 / Math.PI; B.arrow.setAttribute('transform', `translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${ang.toFixed(1)})`); B.arrow.style.opacity = d > 4 ? 1 : 0; };   // 10/1 화살촉이 길 끝을 따라감
      c.t0 = G.t;
      await Promise.all([
        (async () => { await c.until(0.3); await c.voice('S06_haesol_11'); })(),
        (async () => {
          await c.until(0.5); c.sfx('sfx_sparkle', 0.7);
          let lastSpk = 0;
          await c.tween(0, 1, c.rm ? 1.2 : 2.6, k => {
            B.light.style.strokeDashoffset = total * (1 - k);
            head(total * k);
            if (!c.rm && k - lastSpk > 0.12) { lastSpk = k; const [x, y] = B.toScreen(...at(total * k)); burst(c, root, x, y, 5); }
          }, 'io');
          const f = B.labels.forest; if (f) { f.el.classList.add('found'); const r = f.rect, [x, y] = B.toScreen(r[0] + r[2] / 2, r[1] + r[3] / 2); c.sfx('sfx_chime', 0.6); burst(c, root, x, y, 14); }
          await c.until(4.8);
        })(),
      ]);
      B.light.style.strokeDashoffset = 0; head(total);
      off();
      if (!opts.live) await fadeOut(c, root, 0.5);
    },
  });

  // 금빛 물감 번짐: 바뀌는 구역의 색이 작은 자국에서 크게 번짐, 가로등이 켜지고 다음 장소 표시가 반짝
  async function bloom(c, V, from, to, z, unlock, live) {
    const ring = G.el('div', 'bloom-ring', V.fx);
    Object.assign(ring.style, { left: (z.center[0] - z.r[0]) + 'px', top: (z.center[1] - z.r[1]) + 'px', width: z.r[0] * 2 + 'px', height: z.r[1] * 2 + 'px', zIndex: 3500 });
    c.sfx('sfx_sparkle', 0.7);
    const zones = G.D.mood.zones.map(q => ({ id: q.id, a0: q.alpha[from], a1: q.alpha[to] }));
    const lampsOn = V.lamps.filter(l => l.def.from > from && l.def.from <= to);
    await Promise.all([
      c.tween(0, 1, 2.2, k => { ring.style.transform = `scale(${c.rm ? 1 : 0.2 + k * 1.1})`; ring.style.opacity = c.rm ? 1 - k : Math.min(1, 3 * (1 - k)); }, 'out'),
      c.tween(0, 1, 2.6, k => {
        for (const q of zones) { V.alpha[q.id] = q.a0 + (q.a1 - q.a0) * k; V.grow[q.id] = q.a1 > q.a0 && !c.rm ? 0.25 + 0.75 * k : 1; }
        V.applyMask();
      }, 'out'),
      (async () => { await c.wait(1.4); for (const l of lampsOn) { l.el.classList.add('on'); c.sfx('sfx_chime', 0.45); await c.wait(0.3); } })(),
      (async () => {
        await c.wait(2.2);
        if (unlock) {
          const p = G.D.places.places.find(q => q.id === unlock);
          V.setMarker(unlock, 'open', p && (p.labelAlways || (G.st && G.st.items.includes('map'))));
          c.sfx('sfx_sparkle', 0.6);
          if (live) G.map.camFree = false;
          const k = V.markers[unlock]; if (k && !c.skipped && k.m.animate) k.m.animate([{ transform: 'scale(.3)' }, { transform: 'scale(1.5)' }, { transform: 'scale(1)' }], { duration: 900, easing: 'ease-out' });
        }
      })(),
    ]);
    ring.remove();
    V.setMood(to);
  }
  // 9/30 프로토타입 3: 다른 파일(p3.js)에서 연출을 더함 (숲·두 번째 광장·별·엔딩)
  C.add = (o) => Object.assign(SCRIPTS, o);
  C.util = { arrive, title, burst, fadeIn, fadeOut, bloom };
  return C;
})();

/* ---- worldmap.js ---- */
// worldmap.js — 마을 지도 (U3): 장소를 누르면 주인공이 정해진 길로 걸어감 (3~5초, 4방향), 배경 주민이 돌아다님
'use strict';
G.map = (() => {
  const Mp = {};
  const NODE = { home: 'HOME', plaza: 'PLAZA', plaza2: 'PLAZA', market: 'MARKET', library: 'LIB', forest: 'FOREST' };
  let V = null, hero = null, lumi = null, offs = [], walking = null, trailEl = null, arrowEl = null, vills = [];
  const lumiPos = { x: 0, y: 0 };
  Mp.node = (placeId) => NODE[placeId] || 'HOME';
  Mp.state = (p) => {
    const st = G.st; if (!st) return 'locked';
    if (p.call && G.p4 && G.p4.calling()) return 'open';   // 10/1: 도서관 문에서 막히면 광장(촌장)에 다녀옴
    if (st.cleared.includes(p.id)) { const a = p.again; return a && st.cleared.includes(a.after) && !st.cleared.includes(a.scene) ? 'open' : 'done'; }   // 9/30: 숲 뒤에 광장이 다시 열림
    const u = p.unlock;
    const open = u === 'start' ? st.done.includes('meet_lumi') : (u.startsWith('clear:') && st.cleared.includes(u.slice(6)));
    return open ? 'open' : 'locked';
  };
  // 이 장소를 누르면 들어갈 장면 (광장은 숲을 끝낸 뒤 두 번째 광장)
  Mp.sceneOf = (p) => { const a = p.again; return a && G.st.cleared.includes(a.after) ? a.scene : p.scene; };
  const hasMapItem = () => G.st.items.includes('map');

  Mp.hide = () => {
    offs.forEach(f => f()); offs = []; vills = [];
    G.resizers.delete(onResize);
    if (V) { V.el.remove(); V = null; }
    walking = null; hero = null; lumi = null; trailEl = null; arrowEl = null; clearEnter();
    G.help.off();
  };
  function onResize() { if (V) V.setCam(V.cam.x, V.cam.y); }

  // ---- 지도 보이기 ----
  // o.mood: 이 단계로 그림 (C7에서 번지기 전 모습), o.noLumi: 루미를 아직 안 보임 (인트로)
  Mp.show = async (o = {}) => {
    G.scene.hide(); Mp.hide();
    G.screen = 'map';
    const world = G.$('#world'); world.innerHTML = '';
    V = Mp.V = G.mapView(world, {});
    V.setMood(o.mood ?? G.st.mood);
    V.addMarkers(); Mp.refresh(o.lockedOverride);
    // 장소 누르는 곳
    for (const p of G.D.places.places) {
      const b = G.el('button', 'place', V.fx); b.type = 'button'; b.setAttribute('aria-label', p.name);
      const [x, y, w, h] = p.hit; Object.assign(b.style, { left: x + 'px', top: y + 'px', width: w + 'px', height: h + 'px', zIndex: 2990 });
      G.onTap(b, () => tapPlace(p));
    }
    // 주인공과 루미
    hero = V.walker('assets/chars/walk_hero.png', 'hero');
    const n = G.D.places.nodes[Mp.node(G.st.place)]; hero.set(n[0], n[1]); hero.frame = 8; hero.dir = 'SE'; hero.draw();
    lumi = G.el('div', 'lumi-f', V.fx); const li = G.el('img', '', lumi); li.src = G.asset('assets/chars/lumi.png'); li.alt = '';
    lumiPos.x = hero.x + 60; lumiPos.y = hero.y - 150; lumi.style.display = o.noLumi ? 'none' : '';
    placeLumi();
    // 배경 주민
    const stage = G.st.mood;
    for (const d of G.D.mood.villagers) if (d.from <= stage && !(G.settings.light && vills.length >= 2)) vills.push(makeVillager(d, stage));
    // 카메라는 주인공을 따라감 (갈 곳 쪽으로 조금 치우침)
    V.setCam(hero.x, hero.y - 40);
    offs.push(G.every(update)); update(10);
    G.resizers.add(onResize);
    dragCam(world);
    G.hud.map();
    G.audio.music('music_night'); G.audio.ambient(['amb_crickets']);
    setHelp();
    await V.ready;
  };
  Mp.refresh = (lockedOverride = []) => {
    if (!V) return;
    for (const p of G.D.places.places) {
      let s = Mp.state(p); if (lockedOverride.includes(p.id)) s = 'locked';
      if (!G.st.done.includes('meet_lumi')) s = 'hidden';
      V.setMarker(p.id, s, p.labelAlways || hasMapItem());
    }
    if (G.p4 && G.p4.mapMarks) G.p4.mapMarks(V);
  };

  function placeLumi() { if (lumi) lumi.style.transform = `translate(${lumiPos.x.toFixed(1)}px,${lumiPos.y.toFixed(1)}px)`; }
  function update(dt) {
    if (!V) return;
    // 루미는 주인공 오른쪽 위를 살짝 늦게 따라옴
    if (hero && lumi && !Mp.lumiFree) {
      const tx = hero.x + 60, ty = hero.y - 150, k = Math.min(1, dt * 4);
      lumiPos.x += (tx - lumiPos.x) * k; lumiPos.y += (ty - lumiPos.y) * k; placeLumi();
    }
    for (const v of vills) v.update(dt);
    // 카메라
    if (hero && !Mp.camFree && !Mp.userCam) {
      let fx = hero.x, fy = hero.y - 40;
      // 갈 곳 표시가 화면 모서리 버튼에 가리지 않게, 주인공과 함께 안전한 가운데 영역에 들어오도록 카메라를 옮김
      const np = !walking && G.hud.nextPlace && G.st.done.includes('meet_lumi') ? G.hud.nextPlace() : null;
      if (np) {
        const s = G.stage.ws * V.cam.z, vw = G.stage.W / s, vh = G.stage.H / s;
        const hx = vw / 2 - vw * 0.14, top = vh / 2 - vh * 0.2, bot = vh / 2 - vh * 0.14;
        const tx = np.marker[0], ty = np.marker[1] - 60;
        if (tx < fx - hx) fx = tx + hx; if (tx > fx + hx) fx = tx - hx;
        if (ty < fy - top) fy = ty + top;
        if (hero.y > fy + bot) fy = hero.y - bot;            // 주인공이 먼저
        if (hero.x < fx - hx) fx = hero.x + hx; if (hero.x > fx + hx) fx = hero.x - hx;
      }
      const k = Math.min(1, dt * 3);
      V.setCam(V.cam.x + (fx - V.cam.x) * k, V.cam.y + (fy - V.cam.y) * k);
    }
  }

  // ---- 10/2 선생님: 지도를 끌면 시점만 옮김 (장소를 누르면 다시 주인공을 따라감) ----
  Mp.userCam = false;
  function dragCam(world) {
    let st = null;
    const down = (e) => {
      if (!V || walking || Mp.camFree || G.busy > 0 || G.paused || G.screen !== 'map') return;
      st = { id: e.pointerId, x: e.clientX, y: e.clientY, cx: V.cam.x, cy: V.cam.y, on: false };
    };
    const move = (e) => {
      if (!st || e.pointerId !== st.id || !V) return;
      const dx = e.clientX - st.x, dy = e.clientY - st.y;
      if (!st.on && Math.hypot(dx, dy) < 12 * (G.stage.u || 1)) return;
      st.on = true; Mp.userCam = true;
      const r = world.getBoundingClientRect(), k = (G.stage.W / (r.width || G.stage.W)) / (G.stage.ws * V.cam.z);
      V.setCam(st.cx - dx * k, st.cy - dy * k);
    };
    const up = (e) => {
      if (!st || e.pointerId !== st.id) return;
      if (st.on) { G._suppressClick = true; setTimeout(() => G._suppressClick = false, 60); }
      st = null;
    };
    world.addEventListener('pointerdown', down);
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up); window.addEventListener('pointercancel', up);
    offs.push(() => { world.removeEventListener('pointerdown', down); window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); window.removeEventListener('pointercancel', up); });
  }

  // ---- 장소 누르기 ----
  function tapPlace(p) {
    if (walking || G.busy > 0 || !G.st.done.includes('meet_lumi')) return;
    const s = Mp.state(p);
    if (s === 'locked') { G.audio.sfx('sfx_tap', 0.5); G.hud.say(G.D.story.lock); return; }
    G.audio.sfx('sfx_tap', 0.6);
    Mp.walkTo(p, { stay: G.st.place !== p.id });   // 9/30 선생님: 걸어가서 멈추고 [들어가기]로 들어감 (이미 그 자리면 바로 들어감)
  }
  // [들어가기] 버튼: 도착한 장소 안으로. 다른 장소를 누르면 사라지고 그쪽으로 걸어감
  let enterEl = null;
  const clearEnter = () => { if (enterEl) enterEl.remove(); enterEl = null; };
  function showEnter(p) {
    clearEnter();
    enterEl = G.btn('pill gold enter-btn', G.icon('icon_next') + ' ' + p.name + ' 들어가기', G.$('#hud'), () => { clearEnter(); Mp.walkTo(p); }, p.name + ' 들어가기');
    G.audio.voice(p.voice.replace('.mp3', ''));
  }
  Mp.walkTo = async (p, o = {}) => {
    Mp.userCam = false;   // 장소를 누르면 시점이 다시 주인공을 따라감
    clearHint(); clearEnter();
    const from = Mp.node(G.st.place), to = p.node, g = G.gen;
    const names = G.mapPath(from, to), pts = names.map(nm => G.D.places.nodes[nm]);
    if (names.length > 1) {
      let len = 0; for (let i = 1; i < pts.length; i++) len += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
      const W = G.D.places.walk, dur = Math.max(W.minSec, Math.min(W.maxSec, len / W.speed)), speed = len / dur;
      G.busy++;
      const visited = G.st.visited.includes(p.id);
      walking = { skip: G.fast() };   // 빠르게 모드면 걷기를 바로 건너뜀
      if (visited) G.hud.skip(() => { if (walking) walking.skip = true; });
      if (p.walkLine) G.hud.say(p.walkLine);
      await new Promise(res => {
        let seg = 1, d = 0, t = 0, stepT = 0, stepN = 0;
        const off = G.every(dt => {
          if (!walking) { off(); res(); return; }
          if (walking.skip) { const e = pts[pts.length - 1]; hero.set(e[0], e[1]); off(); res(); return; }
          t += dt; d += speed * dt; stepT += dt;
          while (seg < pts.length) {
            const a = pts[seg - 1], b = pts[seg], L = Math.hypot(b[0] - a[0], b[1] - a[1]);
            if (d <= L) { const k = d / L; hero.set(a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k); hero.face(b[0] - a[0], b[1] - a[1]); break; }
            d -= L; seg++;
          }
          if (seg >= pts.length) { const e = pts[pts.length - 1]; hero.set(e[0], e[1]); off(); res(); return; }
          hero.frame = Math.floor(t * 10) % 8; hero.draw();
          if (stepT > 0.4) { stepT = 0; G.audio.sfx(stepN++ % 2 ? 'sfx_step2' : 'sfx_step1', 0.35); }
        });
        offs.push(off);
      });
      if (!V || g !== G.gen) return;
      hero.frame = 8; hero.dir = 'SE'; hero.draw();
      G.hud.skip(null); walking = null; G.busy = Math.max(0, G.busy - 1);
    }
    G.st.place = p.id; if (!G.st.visited.includes(p.id)) G.st.visited.push(p.id);
    G.save.write();
    await G.wait(0.25);
    if (g !== G.gen) return;
    if (o.stay) { showEnter(p); return; }
    if (G.p4 && G.p4.gate(p)) return;   // 10/1: 도서관 문 점자 자물쇠
    const sc = Mp.sceneOf(p);
    if (sc && G.D.scenes[sc]) { G.$('#fade').classList.add('on'); await G.wait(0.45); G.scene.enter(sc); }
    else notReady(p);
  };

  // 시장부터는 다음 프로토타입: 안내 카드
  function notReady(p) {
    const ov = G.$('#overlay'); const m = G.el('div', 'modal', ov); const sh = G.el('div', 'sheet placeholder', m);
    G.busy++;
    G.el('div', '', sh, G.icon('place_' + p.id, 'big'));
    G.el('h3', '', sh, p.name);
    G.el('p', '', sh, p.name + ' 장면은 다음 프로토타입에서 이어져요.');
    const row = G.el('div', 'btn-row', sh);
    G.btn('pill gold', G.icon('icon_map') + ' 지도로', row, () => { m.remove(); G.busy = Math.max(0, G.busy - 1); G.audio.voice('S92_btn_map'); });
    G.audio.voice(p.voice.replace('.mp3', ''));
  }

  // ---- 인트로: 광장 쪽 빛 속에서 루미가 날아옴 ----
  Mp.lumiArrive = async () => {
    const from = G.D.places.nodes.PLAZA;
    Mp.lumiFree = true; lumi.style.display = '';
    lumiPos.x = from[0]; lumiPos.y = from[1] - 180; placeLumi();
    G.audio.sfx('sfx_sparkle', 0.7);
    const tx = hero.x + 60, ty = hero.y - 150, sx = lumiPos.x, sy = lumiPos.y;
    await G.tween(0, 1, G.reduced() ? 0.3 : 2.2, k => {
      lumiPos.x = sx + (tx - sx) * k; lumiPos.y = sy + (ty - sy) * k - Math.sin(k * Math.PI) * 160; placeLumi();
    }, 'io');
    Mp.lumiFree = false;
  };

  // ---- 배경 주민 (GDD 8장): 단계마다 걷는 속도·멈춤·한숨 구름 ----
  function makeVillager(d, stage) {
    const w = V.walker(d.sheet, 'villager');
    const pts = d.path; w.set(pts[0][0], pts[0][1]);
    const sigh = G.el('div', 'sigh', w.el, G.artImg('sigh') || '<svg viewBox="0 0 40 26"><path d="M8 20a7 7 0 0 1 2-13 9 9 0 0 1 17-1 7 7 0 0 1 5 14z" fill="#d9dcea" stroke="#6b7090" stroke-width="2"/></svg>');
    const hit = G.el('button', 'whit', V.fx); hit.type = 'button'; hit.style.zIndex = 2995;   // 10/1 선생님: 장소 위를 걸어도 주민이 먼저 눌리게 (장소 단추 2990보다 위)
    const set0 = w.set; w.set = (x, y) => { set0(x, y); hit.style.transform = w.el.style.transform; }; w.set(w.x, w.y); hit.setAttribute('aria-label', G.D.dialogues[d.line]?.name || '마을 사람');
    let bub = null;
    const gift = G.p4 && G.p4.villagerHas && G.p4.villagerHas(d.id) ? G.el('div', 'wgift', w.el, G.artImg('stardust') || G.sparkle()) : null;   // 10/1 별가루를 가진 주민 머리 위 반짝
    G.onTap(hit, async () => {
      if (bub || G.busy > 0) return;
      const id = stage >= 5 ? d.line.replace(/_a$/, '_b') : d.line; const L = G.D.dialogues[id]; if (!L) return;
      v.pause = Math.max(v.pause, 5); w.frame = 8; w.face(hero.x - w.x, hero.y - w.y); w.draw();
      if (G.D.portraits[d.id] && !G.dialog.active) {   // 10/1 선생님 배경 주민 일러스트: 대화창에 얼굴과 함께
        bub = true; v.pause = 1e9; await G.dialog.play([id], { partner: d.id });
        if (gift && G.p4.villagerHas(d.id)) { await G.p4.villagerDust(d.id, w.el, V.fx, w.x, w.y - 120); gift.remove(); }
        v.pause = 1; bub = null; return;
      }
      bub = G.el('div', 'wbubble', w.el, L.text);
      await G.audio.voice(id); await G.wait(0.8); if (bub) bub.remove(); bub = null;
      if (gift && G.p4.villagerHas(d.id)) { bub = true; await G.p4.villagerDust(d.id, w.el, V.fx, w.x, w.y - 120); gift.remove(); bub = null; }
    });
    const speed = G.D.mood.speed[stage];
    const v = { w, i: 1, step: 1, pause: Math.random() * 2, look: 0, sighT: Math.random() * 4 };
    v.update = (dt) => {
      if (stage === 0) { v.sighT += dt; sigh.classList.toggle('on', (v.sighT % 7) < 2.4); sigh.classList.toggle('l', w.dir === 'SW' || w.dir === 'NW'); }   // 10/1 한숨은 입 옆에서 (보는 쪽)
      if (v.pause > 0) {
        v.pause -= dt; w.frame = 8;
        if (stage === 0 && !bub) { v.look += dt; if (v.look > 0.9) { v.look = 0; const ds = ['SE', 'SW', 'NE', 'NW']; w.dir = ds[(ds.indexOf(w.dir) + 1) % 4]; } }
        w.draw(); return;
      }
      const tgt = pts[v.i], dx = tgt[0] - w.x, dy = tgt[1] - w.y, dist = Math.hypot(dx, dy), mv = speed * dt;
      if (dist <= mv) {
        w.set(tgt[0], tgt[1]);
        if (d.pingpong) { if (v.i + v.step < 0 || v.i + v.step >= pts.length) v.step *= -1; v.i += v.step; }
        else v.i = (v.i + 1) % pts.length;
        v.pause = stage === 0 ? (Math.random() < 0.7 ? 1.5 + Math.random() * 2.5 : 0) : (Math.random() < 0.3 ? 0.8 + Math.random() : 0);
        return;
      }
      w.set(w.x + dx / dist * mv, w.y + dy / dist * mv); w.face(dx, dy);
      w.walkT = (w.walkT || 0) + dt; w.frame = Math.floor(w.walkT * (4 + speed * 0.03)) % 8; w.draw();
    };
    return v;
  }

  // ---- 도움 ----
  function target() { return G.hud.nextPlace(); }
  function clearHint() { if (trailEl) trailEl.remove(); trailEl = null; if (arrowEl) arrowEl.remove(); arrowEl = null; }
  function showArrow(p) {
    if (arrowEl || !V) return;
    arrowEl = G.el('div', 'arrow', V.fx, G.arrowHtml());
    arrowEl.style.left = p.marker[0] + 'px'; arrowEl.style.top = (p.marker[1] - 60) + 'px'; arrowEl.style.zIndex = 3002;
  }
  function showTrail(p) {
    if (trailEl || !V || !hero) return;
    const names = G.mapPath(Mp.node(G.st.place), p.node); const pts = names.map(n => G.D.places.nodes[n]);
    pts[0] = [hero.x, hero.y]; pts.push([p.marker[0], p.marker[1] + 70]);
    const ns = 'http://www.w3.org/2000/svg';
    trailEl = document.createElementNS(ns, 'svg'); trailEl.setAttribute('class', 'trail'); trailEl.setAttribute('width', V.W); trailEl.setAttribute('height', V.H); trailEl.style.zIndex = 2998;
    const path = document.createElementNS(ns, 'path'); path.setAttribute('d', 'M' + pts.map(q => q[0] + ' ' + q[1]).join(' L')); trailEl.appendChild(path);
    V.fx.appendChild(trailEl);
    if (V.markers[p.id]) V.markers[p.id].m.style.transform = 'scale(1.25)';
  }
  function setHelp() {
    if (!G.st.done.includes('meet_lumi')) { G.help.off(); return; }
    const practice = !G.st.visited.includes('plaza');   // 첫 지도 연습: 30초에 말과 길을 함께 (여기만 바로 알려 줌)
    G.help.set({
      l1: () => { const p = target(); if (!p) return; if (practice) { G.hud.say(G.D.story.practice_hint); showTrail(p); } else G.hud.say(G.D.story.map_hint); },
      l2: () => { const p = target(); if (p) showArrow(p); },
      l3: () => { const p = target(); if (p) { showArrow(p); showTrail(p); } },
      clear: () => { clearHint(); const p = target(); if (p && V && V.markers[p.id]) V.markers[p.id].m.style.transform = ''; },
    });
  }
  Mp.setHelp = setHelp;
  Mp.hero = () => hero;
  return Mp;
})();

/* ---- scene.js ---- */
// scene.js — 장소 장면 (U4): 장소 그림 한 장에서 사람·물건 누르기. 할 일(☆)을 모두 하면 장소 클리어 (C7)
// 장면 그림은 2400x1080: 가운데 1920 = 16:9, 가운데 1440 = 4:3 핵심 영역 (누를 곳은 모두 여기)
// 프로토타입 2: 누를 곳 하나가 할 일 여러 개를 이어서 할 수 있음 (flow: flows.js, more: 이어지는 할 일),
//   after: 다른 할 일을 끝낸 뒤에 나타나는 누를 곳 (도서관 촉각 지도), randomSfx: 가끔 나는 소리 (도서관 책장 넘기는 소리)
// 프로토타입 3: until: 그 할 일을 끝내면 사라지는 누를 곳, gone: 자기 할 일을 끝내면 인물과 함께 사라짐 (다온이 광장으로 뛰어감),
//   noStar: 할 일 동그라미를 누를 곳 옆에 그리지 않음 (답을 알려 주지 않게), linesAfter: 할 일에 따라 바뀌는 대사,
//   장면 zone: 색 번짐 구역 (두 번째 광장은 광장 구역), 인물 그림 showAfter / awayBetween: 할 일에 따라 보이고 사라짐
'use strict';
// ---- 장면 그림 한 벌 (연출 C2·C7도 같이 씀) ----
G.sceneView = (parent, id, o = {}) => {
  const S = G.D.scenes[id], [W, H] = S.size;
  const V = { W, H, S, cam: { x: W / 2, y: H / 2, z: 1 }, spr: {} };
  const el = V.el = G.el('div', 'world', parent); el.style.width = W + 'px'; el.style.height = H + 'px';
  const mono = G.el('img', 'bg', el); mono.src = G.asset(S.image.mono); mono.width = W; mono.height = H; mono.alt = '';
  const col = V.colorImg = G.el('img', 'bg', el); col.src = G.asset(S.image.color); col.width = W; col.height = H; col.alt = ''; col.style.transition = 'opacity .8s';
  V.ready = Promise.all([mono, col].map(i => i.decode ? i.decode().catch(() => { }) : Promise.resolve()));
  V.lamps = (S.lamps || []).map((p, i) => { const g = G.el('div', 'lamp-glow', el); g.style.left = p[0] + 'px'; g.style.top = p[1] + 'px'; g.style.transform = 'scale(1.5)'; return { el: g, from: (S.lampFrom || [])[i] ?? 5 }; });
  V.fx = G.el('div', 'layer', el);
  const addImg = (src, r) => { const i = G.el('img', 'scene-sprite idle', V.fx); i.src = G.asset(src); i.alt = ''; Object.assign(i.style, { left: r[0] + 'px', top: r[1] + 'px', width: r[2] + 'px', height: r[3] + 'px', animationDelay: (-Math.random() * 3).toFixed(2) + 's' }); return i; };
  for (const sp of S.sprites) {
    const v = V.spr[sp.id] = { img: addImg(sp.img, sp.rect), def: sp };
    if (sp.flat) v.img.classList.remove('idle');
    if (sp.back) { v.back = addImg(sp.back.img, sp.back.rect); v.back.style.transition = v.img.style.transition = 'opacity .5s'; }
    if (sp.lumi) {
      const l = V.lumi = G.el('div', 'scene-sprite', V.fx); const li = G.el('img', '', l); li.src = G.asset('assets/chars/lumi.png'); li.alt = '';
      Object.assign(l.style, { left: (sp.lumi[0] - 55) + 'px', top: (sp.lumi[1] - 55) + 'px', width: '110px', height: '110px' });
      li.style.cssText = 'width:100%;height:100%;animation:bob 2.4s ease-in-out infinite';
    }
  }
  // 할 일에 따라 보이는 인물·물건 (두 번째 광장: 안내 기둥·노란 길은 설치 뒤에, 우편배달부는 도서관에 다녀오는 동안 없음)
  V.spriteOn = (sp) => { const d = (m) => !!(G.st && G.st.done.includes(m));
    if (sp.showAfter && !d(sp.showAfter)) return false;
    if (sp.awayBetween && d(sp.awayBetween[0]) && !d(sp.awayBetween[1])) return false;
    return true; };
  V.refreshSprites = () => { for (const k in V.spr) { const v = V.spr[k]; v.img.style.display = V.spriteOn(v.def) ? '' : 'none'; } };
  V.refreshSprites();
  V.showBack = (on) => { const c = V.spr.chief; if (c && c.back) { c.back.style.opacity = on ? 1 : 0; c.img.style.opacity = on ? 0 : 1; } };
  V.showBack(!!o.chiefBack);
  V.setMood = (stage) => {
    const z = G.D.mood.zones.find(q => q.id === (S.zone || id)); const a = z ? z.alpha[Math.max(0, Math.min(5, stage))] : 0;
    col.style.opacity = a; col.style.visibility = a > 0.003 ? '' : 'hidden';
    for (const l of V.lamps) l.el.classList.toggle('on', l.from <= stage);
  };
  V.setCam = (x, y, z = V.cam.z) => {
    const { W: sw, H: sh, ws } = G.stage, s = ws * z;
    const vw = sw / s, vh = sh / s;
    x = vw >= W ? W / 2 : Math.max(vw / 2, Math.min(W - vw / 2, x));
    y = vh >= H ? H / 2 : Math.max(vh / 2, Math.min(H - vh / 2, y));
    V.cam = { x, y, z };
    el.style.transform = `translate(${(sw / 2 - x * s).toFixed(1)}px,${(sh / 2 - y * s).toFixed(1)}px) scale(${s.toFixed(4)})`;
  };
  V.toScreen = (x, y) => { const s = G.stage.ws * V.cam.z; return [G.stage.W / 2 + (x - V.cam.x) * s, G.stage.H / 2 + (y - V.cam.y) * s]; };
  V.setCam(W / 2, H / 2, 1);
  return V;
};

G.scene = (() => {
  const Sc = {};
  let V = null, S = null, hots = [], arrowEl = null, trailEl = null, busy = false, closeup = null, sfxOff = null;
  const missionsOf = (h) => h.mission ? [h.mission, ...(h.more || [])] : [];
  const allDone = (h) => missionsOf(h).every(m => G.st.done.includes(m));
  const shown = (h) => (!h.after || G.st.done.includes(h.after)) && (!h.afterLv || !G.lv('normal') || G.st.done.includes(h.afterLv))
    && (!h.until || !G.st.done.includes(h.until)) && (!h.gone || !G.st.done.includes(h.mission)) && (!h.lvMin || G.lv(h.lvMin));   // 10/1 lvMin: 이 난이도부터 나옴
  const finding = (h) => h.find && G.lv('normal') && !G.st.done.includes(h.find.done);   // 9/30 난이도: 찾아야 하는 곳
  Sc.hide = () => {
    if (!V) return;
    G.resizers.delete(onResize); G.dialog.onSpeaker = null; if (sfxOff) sfxOff(); sfxOff = null;
    V.el.remove(); V = null; S = null; hots = []; arrowEl = trailEl = null;
    const cu = G.$('#closeup'); if (cu) cu.innerHTML = '';
    G.help.off(); G.audio.ambientBoost('amb_fountain', false);
  };
  function onResize() { if (!V) return; V.setCam(V.cam.x, V.cam.y); sizeHots(); }
  // 휴대폰에서도 누를 곳이 손가락 크기(약 11mm ≈ 72px) 이상이 되게 넓힘
  function sizeHots() {
    const min = 72 / G.stage.ws;
    for (const h of hots) {
      const [x, y, w, hh] = h.def.rect, W = Math.max(w, min), HH = Math.max(hh, min);
      Object.assign(h.btn.style, { left: (x - (W - w) / 2) + 'px', top: (y - (HH - hh) / 2) + 'px', width: W + 'px', height: HH + 'px' });
    }
  }

  Sc.enter = async (id) => {
    G.map.hide(); Sc.hide();
    const def = G.D.scenes[id]; S = def; const g = G.gen;
    G.screen = 'scene';
    const first = !G.st.seenCutscenes.includes(def.arrive);
    const world = G.$('#world'); world.innerHTML = '';
    V = G.sceneView(world, id, { chiefBack: false });   // 돌아보는 모습은 연출 C2가 따로 그림
    V.setMood(G.st.mood);
    // 누를 곳: 별빛 테두리 + 할 일에는 ☆
    for (const h of def.hotspots) {
      const glow = G.el('img', 'hot-glow', V.fx); glow.src = G.asset(h.img); glow.alt = '';
      Object.assign(glow.style, { left: h.glow[0] + 'px', top: h.glow[1] + 'px', width: h.glow[2] + 'px', height: h.glow[3] + 'px' });
      if (G.st.seen.includes(id + ':' + h.id)) glow.classList.add('seen');
      if (h.cls) glow.classList.add(h.cls);   // 10/1: 물건 그림 자체를 보여 주는 누를 곳 (편지)
      let star = null;
      if (h.mission && !h.noStar) {
        star = G.el('div', 'mstar', V.fx); star.style.left = (h.rect[0] + h.rect[2] / 2) + 'px'; star.style.top = (h.rect[1] - 6) + 'px';
        setStar(star, allDone(h));
      }
      const btn = G.el('button', 'hot', V.fx); btn.type = 'button'; btn.setAttribute('aria-label', h.label);
      btn.style.zIndex = h.z || (h.mission ? 20 : 10);
      const H = { def: h, glow, star, btn };
      G.onTap(btn, () => tapHot(H));
      hots.push(H);
      showHot(H, shown(h));
      if (h.hideLv && G.lv('normal') && !G.st.seen.includes(id + ':' + h.id)) glow.classList.add('hide');   // 보통부터: 반짝이지 않아 찾아야 함
      if (h.twinkle && !(h.twinkleLv && G.lv(h.twinkleLv))) { H.tw = G.el('div', 'twinkle p3tw', V.fx, G.sparkle()); Object.assign(H.tw.style, { left: (h.rect[0] + h.rect[2] / 2) + 'px', top: (h.rect[1] + h.rect[3] / 2) + 'px' }); showHot(H, shown(h)); }
    }
    for (const h of def.hotspots) if (h.gone && G.st.done.includes(h.mission) && V.spr[h.id]) V.spr[h.id].img.style.display = 'none';
    if (G.sceneFx && G.sceneFx[id]) G.sceneFx[id](V, def);
    if (G.p4 && G.p4.enter) G.p4.enter(V, def, id);   // 10/1 프로토타입 4: 별가루, 어두운 숲, 촌장 물음표   // 장면마다 움직이는 것 (숲: 반딧불, 덤불 B에서 날리는 나뭇잎)
    // 보통부터: 찾기 전에는 인물 그림도 숨김 (예: 봄이 아주머니)
    for (const h of def.hotspots) if (finding(h) && V.spr[h.find.sprite]) V.spr[h.find.sprite].img.style.opacity = 0;
    if (def.randomSfx) {   // 가끔 나는 소리 (대화 중에는 쉼)
      const R = def.randomSfx; let t = 0, next = R.every[0] + Math.random() * (R.every[1] - R.every[0]);
      sfxOff = G.every(dt => { if (G.dialog.active || G.paused) return; t += dt; if (t > next) { t = 0; next = R.every[0] + Math.random() * (R.every[1] - R.every[0]); G.audio.sfx(R.name, R.vol || 0.4); } });
    }
    sizeHots();
    G.resizers.add(onResize);
    G.dialog.onSpeaker = (sp) => { for (const k in V?.spr || {}) { const s = V.spr[k]; s.img.classList.toggle('talking', k === sp); } };
    G.hud.scene(def, () => Sc.leave());
    G.audio.music(def.music); G.audio.ambient(def.ambient);
    G.st.place = def.zone || id; if (!G.st.visited.includes(id)) G.st.visited.push(id);
    G.save.write();
    await V.ready;
    if (g !== G.gen) return;
    if (!first) G.$('#fade').classList.remove('on');
    if (first) {
      G.hud.hide(true);
      const ch = G.cut.play('CH:' + id, { key: id, cover: true });   // 9/30 장 제목. 10/1 선생님: 장 그림이 먼저 화면을 덮은 뒤 어둠이 걷힘 (장소 모습이 먼저 비치지 않게)
      G.$('#fade').classList.remove('on');
      await ch;
      if (g !== G.gen) return;
      await G.cut.play(def.arrive);
      if (g !== G.gen) return;
      G.hud.hide(false);
    }
    if (!V) return;
    if (!G.st.done.includes(id + '_intro')) {
      if (def.intro) { await playIntro(def); if (def.intro.length < 3 || def.introAsk) { G.hud.tasks(def, true); hots.forEach(h => h.glow.classList.add('strong')); G.wait(2.5).then(() => hots.forEach(h => h.glow.classList.remove('strong'))); } }
      else { G.hud.tasks(def, true); hots.forEach(h => h.glow.classList.add('strong')); G.wait(2.5).then(() => hots.forEach(h => h.glow.classList.remove('strong'))); }
      if (g !== G.gen) return;
      G.st.done.push(id + '_intro'); G.save.write();
    }
    if (def.clueLv && G.lv('normal') && !G.st.done.includes(def.clueLv.done)) { await G.dialog.play(def.clueLv.lines); if (g !== G.gen) return; }
    setHelp();
  };
  function setStar(el, done) { el.innerHTML = G.svgDot(done); }   // 9/30: 할 일 표시는 동그라미 (별은 진짜 별에만)
  function showHot(H, on) { for (const e of [H.glow, H.star, H.btn, H.tw]) if (e) e.style.display = on ? '' : 'none'; }
  // 다른 할 일을 끝내서 새로 나타나는 누를 곳: 반짝하며 나타남
  function revealHots() {
    for (const H of hots) {
      const on = shown(H.def); if (on === (H.btn.style.display !== 'none')) continue;
      showHot(H, on);
      if (on && H.def.hideLv && G.lv('normal')) { H.glow.classList.add('hide'); continue; }
      if (on) { H.glow.classList.remove('seen'); H.glow.classList.add('strong'); G.audio.sfx('sfx_sparkle', 0.5); popStar(H.star || H.glow); G.wait(3).then(() => H.glow.classList.remove('strong')); }
    }
  }
  // 할 일 하나 끝: ★ 채우기, 소리, 저장. 흐름(flows.js) 안에서도 부름
  function complete(m) {
    if (!m || G.st.done.includes(m)) return false;
    G.st.done.push(m);
    G.audio.sfx('sfx_star', 0.9);
    for (const H of hots) if (H.star && missionsOf(H.def).includes(m)) { setStar(H.star, allDone(H.def)); popStar(H.star); }
    G.hud.tasks(S, true);
    G.save.write();
    if (V) V.refreshSprites();
    revealHots();
    return true;
  }

  // 처음 방문: "여기가 광장이야" → "위를 봐, 할 일이 세 개" (☆☆☆ 반짝) → "반짝이는 곳을 눌러 봐" (테두리 한 번 밝아짐)
  async function playIntro(def) {
    const ids = def.intro, ask = def.introAsk;
    if (ask) {   // 10/1 중간에 주인공 버튼 하나 (두 번째 광장: 별 축제 제안 → "좋아요!")
      const k = ids.indexOf(ask.after) + 1, g = G.gen;
      await G.dialog.play(ids.slice(0, k), { keep: true }); if (g !== G.gen) return;
      await G.dialog.choose([{ label: G.txt(ask.ply), icon: 'icon_star', voice: ask.ply }], true); if (g !== G.gen) return;
      await G.dialog.play(ids.slice(k)); return;
    }
    G.dialog.onLine = (lid) => {
      if (lid === ids[1]) { G.hud.keepTasks(true); G.hud.tasks(def, true); }
      if (lid === ids[2]) { G.hud.keepTasks(false); hots.forEach(h => { h.glow.classList.add('strong'); }); }
    };
    await G.dialog.play(ids);
    G.dialog.onLine = null; G.hud.keepTasks(false);
    hots.forEach(h => h.glow.classList.remove('strong'));
  }

  async function tapHot(H) {
    H.btn && H.btn.blur && H.btn.blur();
    if (busy || G.busy > 0 || !V) return;
    busy = true; clearHint();
    const h = H.def, id = S.id, g = G.gen;
    G.audio.sfx(h.sfx || 'sfx_tap', h.sfx ? 0.9 : 0.5);
    if (!G.st.seen.includes(id + ':' + h.id)) G.st.seen.push(id + ':' + h.id);
    H.glow.classList.add('seen'); H.glow.classList.remove('hide');
    if (h.louder) G.audio.ambientBoost(h.louder, true);
    if (h.flow) {
      // 할 일 여러 개가 이어지는 대화·아이템·퍼즐 (flows.js)
      try { await G.flows[h.flow]({ S, V, H, g, complete, closeup: showCloseup, hideCloseup }); } catch (e) { console.error('흐름 오류', h.flow, e); G.dialog.close(); }
      if (g !== G.gen) { busy = false; return; }
      hideCloseup();
      if (V && G.screen === 'scene') setHelp();   // 퍼즐이 도움을 바꿔 놓았을 수 있어 장면 도움으로 되돌림
    } else if (finding(h)) {
      // 찾았다! 숨어 있던 인물이 나타나고, 그 인물의 누를 곳이 열림
      await G.dialog.play(h.find.lines.slice(0, 1));
      if (g !== G.gen) { busy = false; return; }
      const sp = V && V.spr[h.find.sprite];
      if (sp) { G.audio.sfx('sfx_sparkle', 0.7); sp.img.animate && sp.img.animate([{ opacity: 0, transform: 'translateY(30px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 600, easing: 'ease-out' }); sp.img.style.opacity = 1; }
      await G.dialog.play(h.find.lines.slice(1), { partner: h.find.sprite });
      if (g !== G.gen) { busy = false; return; }
      if (!G.st.done.includes(h.find.done)) { G.st.done.push(h.find.done); G.save.write(); }
      revealHots();
    } else {
      if (h.closeup) showCloseup(h.closeup);
      const la = (h.linesAfter || []).find(q => G.st.done.includes(q[0]));
      await G.dialog.play(la ? la[1] : h.linesLv && G.lv('normal') ? h.linesLv : h.lines, { partner: h.partner });
      if (g !== G.gen) { busy = false; return; }
      hideCloseup();
      if (h.mission) complete(h.mission);
      if (h.mark && !G.st.done.includes(h.mark)) { G.st.done.push(h.mark); G.save.write(); revealHots(); }   // 10/1: 할 일 표시 없이 기록만 (편지 찾기)
    }
    if (G.p4 && G.p4.afterHot && V && g === G.gen) { await G.p4.afterHot(H, V, S, id); if (g !== G.gen) { busy = false; return; } }   // 10/1 물건 속 별가루
    if (h.louder) G.audio.ambientBoost(h.louder, false);
    if (!V) { busy = false; return; }
    if (S.missions.every(m => G.st.done.includes(m)) && !G.st.cleared.includes(id)) { await G.wait(0.9); busy = false; if (g !== G.gen) return; return clear(); }
    // 10/1 선생님: 이미 끝낸 장소에 다시 들어와 누르면 진행이 멈춘 것처럼 보임 → 다음에 갈 곳을 알려 줌
    if (G.st.cleared.includes(id) && S.onClear && S.onClear.now) { const np = G.hud.nextPlace(); G.hud.say(np ? 'S92_now_' + np.id : S.onClear.now); }   // 10/1: 촌장에게 쪽지를 받은 뒤에는 도서관
    busy = false;
  }
  function popStar(el) { el.animate && el.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.8)' }, { transform: 'scale(1)' }], { duration: 700, easing: 'ease-out' }); }

  function showCloseup(kind) {
    const cu = G.$('#closeup'); cu.innerHTML = '';
    closeup = G.el('div', 'closeup', cu);
    if (kind === 'braille_book') {   // 해솔의 점자책 한 쪽: 확정된 점자 낱말 (별 / 축제)
      const bk = G.el('div', 'book-big' + (G.art('book_open') ? ' art' : ''), closeup), pg = G.el('div', 'book-page', bk);
      if (G.art('book_open')) bk.style.backgroundImage = `url("${G.art('book_open')}")`;
      for (const c of G.D.puzzles.braille1.book) G.el('div', 'book-line', pg, G.braille.svg(c, 30));
      closeup.animate && closeup.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 400 });
      return;
    }
    const b = G.el('div', 'board-big', closeup);
    for (let i = 0; i < 4; i++) { const n = G.el('div', 'note', b); for (let j = 0; j < 4; j++) { const l = G.el('i', '', n); l.style.width = (55 + Math.random() * 40) + '%'; } }
    closeup.animate && closeup.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 400 });
  }
  function hideCloseup() { const cu = G.$('#closeup'); if (cu) cu.innerHTML = ''; closeup = null; }

  // ---- 장소 클리어 → C7 → 지도 ----
  async function clear() {
    const id = S.id, on = S.onClear, from = G.st.mood, g = G.gen;
    G.help.off();
    if (on.ending) return G.flows.ending({ S, V });   // 두 번째 광장: 별을 올리면 엔딩 (C12)
    G.st.cleared.push(id); G.st.mood = Math.max(G.st.mood, on.mood); G.st.quest = Math.max(G.st.quest, on.quest);
    G.save.write();
    await G.cut.play(on.cutscene, { live: { place: id, from, to: G.st.mood, unlock: on.unlock } });
    if (g !== G.gen) return;
    G.map.refresh();
    await G.dialog.play(on.after);
    if (g !== G.gen) return;
    G.hud.refreshQuest();
    const q = G.hud.questEl; if (q) { q.classList.remove('flash'); void q.offsetWidth; q.classList.add('flash'); }
    await G.audio.voice(on.now);
    G.map.setHelp();
    if (g === G.gen && V) G.hud.goMap(() => Sc.leave());   // 10/1 선생님: 끝나면 가운데 버튼으로 지도로
  }
  Sc.leave = async () => {
    if (!V || busy) return;
    G.$('#hud').querySelectorAll('.hud-go').forEach(e => e.remove());
    const id = S.id;
    G.save.write();
    G.$('#fade').classList.add('on'); await G.wait(0.45);
    await G.map.show();
    G.$('#fade').classList.remove('on');
  };

  // ---- 도움: 첫 번째로 안 한 할 일 ----
  function target() { return hots.find(h => h.def.seek && shown(h.def)) || hots.find(h => finding(h.def)) || hots.find(h => h.def.mission && shown(h.def) && !allDone(h.def)); }
  function clearHint() {
    if (arrowEl) arrowEl.remove(); if (trailEl) trailEl.remove(); arrowEl = trailEl = null;
    hots.forEach(h => h.glow.classList.remove('strong'));
  }
  function setHelp() {
    if (S && S.missions.every(m => G.st.done.includes(m))) { G.help.off(); return; }
    if (G.screen !== 'scene') return;
    G.help.set({
      l1: () => { const t = target(); const hn = t && (finding(t.def) ? t.def.find.hint : t.def.hint); if (hn) G.hud.say(hn); },
      l2: () => {
        const t = target(); if (!t || arrowEl || !V) return; const r = t.def.rect;
        arrowEl = G.el('div', 'arrow', V.fx, G.arrowHtml());
        Object.assign(arrowEl.style, { left: (r[0] + r[2] / 2) + 'px', top: (r[1] - 40) + 'px', zIndex: 30 });
      },
      l3: () => {
        const t = target(); if (!t || !V) return;
        t.glow.classList.remove('seen', 'hide'); t.glow.classList.add('strong');
        if (trailEl) return;
        const hs = S.sprites.find(s => s.lumi), a = hs ? hs.lumi : [1200, 800], r = t.def.rect, b = [r[0] + r[2] / 2, r[1] + r[3] * 0.75];
        const ns = 'http://www.w3.org/2000/svg';
        trailEl = document.createElementNS(ns, 'svg'); trailEl.setAttribute('class', 'trail'); trailEl.setAttribute('width', S.size[0]); trailEl.setAttribute('height', S.size[1]); trailEl.style.zIndex = 5;
        const p = document.createElementNS(ns, 'path'); const mx = (a[0] + b[0]) / 2, my = Math.max(a[1], b[1]) + 60;
        p.setAttribute('d', `M${a[0]} ${a[1] + 40} Q${mx} ${my} ${b[0]} ${b[1]}`); trailEl.appendChild(p); V.fx.appendChild(trailEl);
      },
      clear: clearHint,
    });
  }
  Sc.view = () => V;
  Sc.reveal = () => revealHots();
  Sc.setHelp = () => { if (V) setHelp(); };
  Sc.sprite = (id) => V && V.spr[id];
  return Sc;
})();

/* ---- puzzle.js ---- */
// puzzle.js — 퍼즐 화면 (U7). 퍼즐 1 (GDD 5-1): 촉각 지도에서 점자 이름표 「숲」 찾기
// 촉각 지도를 정면에서 크게. 위쪽에 해솔 얼굴과 지금 할 일, 아래쪽 대화창은 공용 (인물 그림 없이)
// 9/30: 점자를 모르는 학생을 위해 해솔이 먼저 점자를 알려 주고(점 자리 여섯, 볼록한 점) 「숲」 점자 카드를 보여 줌.
//       카드는 오른쪽에 계속 있고, 지도에서 카드와 같은 모양의 이름표를 찾음. 맞히면 칸마다 같은 점이 함께 빛남
// 이름표를 누르면 해솔이 읽어 줌. 숲이 아니면 "점 모양이 달라. 카드랑 다시 비교해 볼까?" (틀림 소리·표시 없음). 숲이면 연출 C8
// [크게 보기]: 네 이름표를 크게 모아 보여 줌 (작은 화면에서도 점이 잘 보이고 누르기 쉽게)
// 퍼즐 화면은 #world 층 안에 그려 대화창(#dialog)이 늘 그 위에 옴
'use strict';
G.puzzle = (() => {
  const Pz = {};
  const DOT = 24;   // 판 위 점 사이 거리 (판 1600x900 기준)
  const PAD = [28, 24];   // 이름표 판 안쪽 여백

  // ---- 촉각 지도 판 (연출 C8 다시 보기도 같이 씀) ----
  Pz.board = (parent, id) => {
    const D = G.D.puzzles[id], [W, H] = D.size;
    const B = { D, W, H, labels: {} };
    const el = B.el = G.el('div', 'tboard', parent); el.style.width = W + 'px'; el.style.height = H + 'px';
    const ns = 'http://www.w3.org/2000/svg';
    const svg = B.svg = document.createElementNS(ns, 'svg'); svg.setAttribute('class', 'troads'); svg.setAttribute('viewBox', `0 0 ${W} ${H}`); svg.setAttribute('width', W); svg.setAttribute('height', H);
    const pl = (pts, cls) => { const p = document.createElementNS(ns, 'polyline'); p.setAttribute('points', pts.map(q => q.join(',')).join(' ')); p.setAttribute('class', cls); svg.appendChild(p); return p; };
    for (const r of D.roads) { pl(r, 'road-sh'); pl(r, 'road'); pl(r, 'road-hi'); }
    B.light = pl(D.lightPath, 'road-light');
    B.arrow = document.createElementNS(ns, 'polygon'); B.arrow.setAttribute('points', '-14,-34 40,0 -14,34 0,0'); B.arrow.setAttribute('class', 'road-arrow'); svg.appendChild(B.arrow);   // 10/1 길 끝 화살촉 (숲 쪽을 가리킴)
    el.appendChild(svg);
    const bimg = G.art('tactile_board'); if (bimg) { el.classList.add('art'); el.style.backgroundImage = `url("${bimg}")`; }   // 9/30: 선생님 판 그림 (길·장소 자리는 그림에 맞춰 puzzles.json 좌표를 고침)
    for (const k in D.nodes) { const n = G.el('div', 'tnode', el); n.style.left = D.nodes[k][0] + 'px'; n.style.top = D.nodes[k][1] + 'px'; }
    for (const L of D.labels.filter(l => G.lv(l.lv))) {   // 9/30 난이도: 보통부터 이름표가 늘어남
      const [w, h] = G.braille.size(L.cells, DOT);
      const pw = w + PAD[0] * 2, ph = h + PAD[1] * 2;
      const plate = G.el('div', 'tlabel', el, G.braille.svg(L.cells, DOT));
      Object.assign(plate.style, { left: L.at[0] + 'px', top: L.at[1] + 'px', width: pw + 'px', height: ph + 'px' });
      B.labels[L.id] = { def: L, el: plate, rect: [L.at[0], L.at[1], pw, ph] };
    }
    // 판을 주어진 네모 안에 맞춤 (화면 좌표)
    B.fit = (x, y, w, h) => {
      const k = Math.min(w / W, h / H); B.k = k; B.x = x + (w - W * k) / 2; B.y = y + (h - H * k) / 2;
      el.style.transform = `translate(${B.x.toFixed(1)}px,${B.y.toFixed(1)}px) scale(${k.toFixed(4)})`;
    };
    B.toScreen = (bx, by) => [B.x + bx * B.k, B.y + by * B.k];
    return B;
  };

  // ---- 퍼즐 한 판 ----
  Pz.play = (id) => new Promise(async (finish) => {
    const D = G.D.puzzles[id], g = G.gen, ok = () => g === G.gen;
    const back = { music: (G.D.scenes[G.st.place] || {}).music, screen: G.screen };
    G.screen = 'puzzle'; G.hud.hide(true); G.help.off();
    G.audio.music('music_puzzle');
    const root = G.el('div', 'puzzle', G.$('#world'));
    const B = Pz.board(root, id);
    // 위쪽: 해솔 얼굴 + 지금 할 일 / 크게 보기
    const top = G.el('div', 'pz-top', root);
    const face = G.el('div', 'pz-face', top); const faceImg = G.el('div', 'pz-face-img', face); G.el('span', '', face, '해솔');
    const setFace = (q) => { const P = G.D.portraits.haesol; faceImg.style.backgroundImage = `url("${G.asset((P.poses && P.poses[q]) || P.img)}")`; };
    setFace('01');
    const task = G.el('button', 'quest pz-task', top); task.type = 'button';
    G.el('div', 'q2', task, (G.D.dialogues[D.task] || {}).text || '');
    G.onTap(task, () => G.audio.voice(D.task));
    const say = G.el('div', 'pz-say', top); say.style.display = 'none';
    const tr = G.el('div', 'pz-tr', root);
    const zoomBtn = G.btn('pill', G.icon('icon_zoom') + ' 크게 보기', tr, () => openZoom(), '크게 보기');
    const bl = G.el('div', 'pz-bl', root);
    const lumiB = G.el('button', 'lumi-btn', bl); lumiB.type = 'button'; lumiB.setAttribute('aria-label', '루미 도움');
    const li = G.el('img', '', lumiB); li.src = G.asset('assets/chars/lumi.png'); li.alt = ''; G.el('span', '', lumiB, '루미');
    G.onTap(lumiB, () => G.help.now());
    // 이름표 누르는 곳: 판 위 이름표 자리에 화면 좌표로 (휴대폰에서도 손가락 크기 이상)
    const hits = {};
    for (const k in B.labels) {
      const b = G.el('button', 'pz-hit', root); b.type = 'button'; b.setAttribute('aria-label', '점자 이름표');
      G.onTap(b, () => tapLabel(k)); hits[k] = b;
    }
    // 해솔의 점자 카드 (같은 모양 찾기의 보기). 처음엔 가운데 크게 → 설명이 끝나면 오른쪽으로
    const CL = D.card && D.labels.find(l => l.id === D.card);
    const card = CL ? G.el('div', 'pz-card', root) : null;
    if (card) {
      G.el('div', 'pz-card-head', card, '해솔의 점자 카드');
      G.el('div', 'pz-card-dots', card, G.braille.svg(CL.cells, 40));
      G.el('div', 'pz-card-word', card, `<span class="q">?</span><span class="w">${CL.word}</span>`);   // 글자는 같은 모양을 찾은 뒤에 보여 줌 (9/30 선생님)
      card.style.display = 'none';
    }
    let talking = false, busy = false, done = false, arrow = null, zoom = null;
    function layout() {
      const { W, H, u } = G.stage;
      const topH = top.getBoundingClientRect().bottom + u * 12;
      const dlg = G.dialog.active ? (G.$('.dlg-box') ? H - G.$('.dlg-box').getBoundingClientRect().top + u * 16 : H * 0.3) : Math.max(u * 30, 10);
      const side = Math.max(u * 30, 10);
      // 카드가 오른쪽에 있으면 그만큼 지도 판을 왼쪽으로
      let cw = 0;
      if (card && card.classList.contains('side') && card.style.display !== 'none') {
        const bh = Math.max(60, H - topH - dlg);
        card.style.top = topH + 'px'; card.style.maxHeight = bh + 'px';
        cw = card.getBoundingClientRect().width + side * 0.6;
      }
      B.fit(side, topH, W - side * 2 - cw, Math.max(60, H - topH - dlg));
      const min = 72;
      for (const k in B.labels) {
        const r = B.labels[k].rect, [x, y] = B.toScreen(r[0], r[1]), w = r[2] * B.k, h = r[3] * B.k;
        const ww = Math.max(w, min), hh = Math.max(h, min);
        Object.assign(hits[k].style, { left: (x - (ww - w) / 2) + 'px', top: (y - (hh - h) / 2) + 'px', width: ww + 'px', height: hh + 'px' });
      }
      if (arrow) placeArrow();
    }
    let lastDlg = null;
    const watch = G.every(() => { if (!ok()) { watch(); G.resizers.delete(layout); return; } const a = G.dialog.active; if (a !== lastDlg) { lastDlg = a; root.classList.toggle('talk', !!a); requestAnimationFrame(layout); } });
    G.resizers.add(layout); layout(); requestAnimationFrame(layout);
    const opts = { partner: 'haesol', noPortraits: true };
    const talk = async (ids, extra = {}) => {
      talking = true;
      G.dialog.onLine = (lid) => { const q = ((G.D.poses || {})[lid] || {}).haesol; if (q) setFace(q); if (extra.onLine) extra.onLine(lid); };
      await G.dialog.play(ids, Object.assign({}, opts, extra.keep ? { keep: true } : {}));
      G.dialog.onLine = null; talking = false; setFace('01');
    };
    function select(k) {
      for (const j in B.labels) B.labels[j].el.classList.toggle('sel', j === k);
    }
    async function tapLabel(k) {
      if (busy || done || !ok()) return;
      busy = true; clearHint(); closeZoom();
      const L = B.labels[k].def;
      G.audio.sfx('sfx_tap', 0.5); select(k);
      if (L.answer) { done = true; await success(L); return; }
      if (card) card.classList.add('look');
      await talk(G.lv('normal') ? [D.wrong] : [L.line, D.wrong]);   // 보통부터는 이름을 읽어 주지 않음 (모양을 비교해야 함)
      if (card) card.classList.remove('look');
      busy = false;
    }
    // ---- 크게 보기: 네 이름표를 크게 ----
    function openZoom() {
      if (busy || done || zoom) return;
      G.audio.voice('S92_btn_zoom', '크게 보기');   // 음성 파일이 없으면 브라우저 음성 (다음 음성 만들 때 추가)
      zoom = G.el('div', 'pz-zoom', root);
      const main = G.el('div', 'pz-zmain', zoom);   // 9/30: 카드는 왼쪽, 이름표는 오른쪽 (이름표가 6개여도 한 화면에)
      if (CL) { const zc = G.el('div', 'pz-card pz-zcard', main); G.el('div', 'pz-card-dots', zc, G.braille.svg(CL.cells, 40)); G.el('div', 'pz-card-word', zc, '?'); }
      const grid = G.el('div', 'pz-zgrid', main); grid.style.setProperty('--zrows', Math.ceil(Object.keys(B.labels).length / 2));
      for (const k in B.labels) {
        const L = B.labels[k].def;
        const b = G.btn('pz-zlabel', G.braille.svg(L.cells, 40), grid, () => tapLabel(k), '점자 이름표');
        if (B.labels[k].el.classList.contains('hint')) b.classList.add('hint');
      }
      const row = G.el('div', 'btn-row', zoom);
      G.btn('pill gold', G.icon('icon_ok') + ' 닫기', row, () => closeZoom(), '닫기');
      fitZoom(); G.resizers.add(fitZoom);
    }
    // 9/30: 아주 낮은 휴대폰 화면에서 이름표 위쪽이 잘리지 않게, 넘치면 카드·이름표 묶음을 그만큼 줄임
    function fitZoom() {
      if (!zoom) return; const main = zoom.querySelector('.pz-zmain'); main.style.zoom = '';
      const cs = getComputedStyle(zoom), row = zoom.querySelector('.btn-row'), h = main.getBoundingClientRect().height;
      const need = h + (row ? row.getBoundingClientRect().height : 0) + parseFloat(cs.rowGap || 0) + parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);
      const over = need - zoom.clientHeight;
      if (over > 0 && h > 0) main.style.zoom = Math.max(0.4, (h - over - 8) / h);
    }
    function closeZoom() { if (zoom) { zoom.remove(); zoom = null; G.resizers.delete(fitZoom); } }
    // ---- 도움 (5-1): 30초 "숲은 한 글자라서 이름표가 제일 짧아" → 60초 숲 이름표가 은은하게 빛남 → 90초·루미 해솔이 가리킴 ----
    const ans = Object.keys(B.labels).find(k => B.labels[k].def.answer);
    async function bubble(lid) {
      const L = G.D.dialogues[lid]; if (!L) return;
      say.textContent = L.text; say.style.display = ''; const q = ((G.D.poses || {})[lid] || {}).haesol; if (q) setFace(q);
      await G.audio.voice(lid); await G.wait(1.2);
      if (say.textContent === L.text) say.style.display = 'none';
      if (!talking) setFace('01');
    }
    function placeArrow() {
      const r = B.labels[ans].rect, [x, y] = B.toScreen(r[0] + r[2] / 2, r[1]);
      Object.assign(arrow.style, { left: x + 'px', top: y + 'px' });
    }
    function clearHint() {
      if (arrow) arrow.remove(); arrow = null;
      for (const k in B.labels) B.labels[k].el.classList.remove('hint');
      say.style.display = 'none';
    }
    const setHelp = () => G.help.set({
      l1: () => bubble(G.lv('normal') && D.hint1Lv ? D.hint1Lv : D.hint1),
      l2: () => { B.labels[ans].el.classList.add('hint'); },
      l3: () => {
        B.labels[ans].el.classList.add('hint');
        if (!arrow && !G.lv('hard')) { arrow = G.el('div', 'arrow pz-arrow', root, G.arrowHtml()); placeArrow(); }   // 어렵게: 화살표 없음
        bubble(D.hint3);
      },
      clear: clearHint,
    });
    // ---- 성공: "맞아! 이게 숲이야" → C8 (볼록한 길이 도서관에서 숲까지 빛남) → 숲 점자를 크게 한 번 더 ----
    async function success(L) {
      G.help.off();
      B.labels[L.id].el.classList.add('found');
      G.audio.sfx('sfx_sparkle', 0.7);
      // 카드와 이름표의 같은 칸이 차례로 함께 빛남 → "봐, 점 모양이 카드랑 똑같지?"
      if (card) {
        card.classList.add('match');
        const a = [...card.querySelectorAll('.pz-card-dots rect')], b = [...B.labels[L.id].el.querySelectorAll('rect')];
        (async () => { for (let i = 0; i < a.length; i++) { a[i].classList.add('on'); if (b[i]) b[i].classList.add('on'); G.audio.sfx('sfx_chime', 0.25); await G.wait(0.45); } })();
      }
      await talk(D.match ? [D.match, L.line] : [L.line], { onLine: (lid) => { if (card && lid === L.line) card.classList.add('show-word'); } }); if (!ok()) return end(false);
      if (card) card.style.display = 'none';
      await G.cut.play('C8', { live: B });
      if (!ok()) return end(false);
      G.hud.hide(true);   // 연출이 끝나며 켠 모서리 버튼을 퍼즐 동안 다시 숨김
      let big = null;
      await talk(D.after, { onLine: (lid) => {
        if (lid === D.after[D.after.length - 1] && !big) {
          big = G.el('div', 'pz-big', root);
          G.el('div', 'pz-big-dots', big, G.braille.svg(L.cells, 60));
          G.el('div', 'pz-big-word', big, L.word);
          big.animate && big.animate([{ opacity: 0, transform: 'translate(-50%,-50%) scale(.7)' }, { opacity: 1, transform: 'translate(-50%,-50%) scale(1)' }], { duration: 500, easing: 'ease-out' });
          G.audio.sfx('sfx_chime', 0.5);
        }
      } });
      end(ok());
    }
    function end(won) {
      watch(); G.resizers.delete(layout); G.help.off(); G.dialog.onLine = null;
      root.remove();
      if (ok()) { G.screen = back.screen || 'scene'; G.hud.hide(false); if (back.music) G.audio.music(back.music); }
      finish(won);
    }
    // ---- 시작: 해솔이 소리 단서를 말하고, 숲 이름표를 같이 찾자고 함 (이름표 4개가 반짝) ----
    busy = true;
    await talk(D.start, { keep: !!D.teach }); if (!ok()) return end(false);
    // 점자 알려 주기: 카드가 가운데 크게 → 점 자리 여섯 → 볼록한 점 → "이게 숲" → 오른쪽으로 옮기고 이름표 4개가 반짝
    const T = D.teach || [];
    if (card) { card.style.display = ''; card.classList.add('center'); card.animate && card.animate([{ opacity: 0, transform: 'translate(-50%,-50%) scale(.7)' }, { opacity: 1, transform: 'translate(-50%,-50%) scale(1)' }], { duration: 450, easing: 'ease-out' }); }
    await talk(T, { onLine: (lid) => {
      if (!card) return;
      card.classList.toggle('show-empty', lid === T[1]);
      card.classList.toggle('show-raised', lid === T[2]);
      if (lid === T[T.length - 1]) {
        card.classList.remove('center'); card.classList.add('side'); layout();
        for (const k in B.labels) { const e = B.labels[k].el; e.classList.add('shine'); G.wait(2.4).then(() => e.classList.remove('shine')); }
      }
    } });
    if (card) { card.classList.remove('center', 'show-empty', 'show-raised'); card.classList.add('side'); layout(); }
    if (!ok()) return end(false);
    busy = false; setHelp();
  });
  return Pz;
})();

/* ---- flows.js ---- */
// flows.js — 누를 곳 하나에서 할 일 여러 개가 이어지는 대화 (프로토타입 2)
// 시장: 봄이 아주머니와의 한 대화 안에서 할 일 3개 (GDD 4-2, 저학년이 헤매지 않게)
// 도서관: 해솔 사서 대화 → 촉각 지도 받기 → 퍼즐 1 (GDD 4-3)
// 할 일을 하나 끝낼 때마다 저장하므로, 중간에 멈춰도 다시 누르면 남은 부분부터 이어서 함
// G.present: 아이템 얻기 카드, 퀘스트 알림, 알게 된 것 카드 (모두 #overlay 층 = 인물 그림·대화창보다 위)
'use strict';
// 화면 글자: 주아체에 없는 「」는 “”로 바꿔 보여 줌 (읽어 주는 음성은 그대로)
G.txt = (id) => ((G.D.dialogues[id] || {}).text || '').replace(/「/g, '“').replace(/」/g, '”');

G.present = (() => {
  const P = {};
  const card = (cls) => { const ov = G.$('#overlay'); const m = G.el('div', 'modal ' + cls, ov); const sh = G.el('div', 'sheet', m); return { m, sh }; };
  // [다음] 버튼: 음성이 끝나면 켜짐 (대화창과 같은 규칙). 누르면 끝
  function nextRow(sh, first) {
    const row = G.el('div', 'btn-row', sh);
    const b = G.btn('pill gold dlg-next wait', '다음 ' + G.icon('icon_next'), row, null, '다음'); b.disabled = true;
    let res; const p = new Promise(r => res = r);
    if (G.fast()) first = Promise.resolve();   // 빠르게 모드: 바로 [다음]
    first.then(() => { b.disabled = false; b.classList.remove('wait'); b.classList.add('ready'); });
    G.onTap(b, () => { if (b.disabled) return; G.audio.sfx('sfx_tap', 0.5); G.audio.stopVoice(); res(); });
    return p;
  }
  // 반짝이 가루 (화면 좌표)
  function sparkle(x, y, n = 12) {
    if (G.settings && G.settings.light) n = 5;
    const ov = G.$('#overlay');
    for (let i = 0; i < n; i++) {
      const s = G.el('div', 'spk', ov, G.sparkle()); s.style.left = x + 'px'; s.style.top = y + 'px';
      const a = Math.PI * 2 * i / n, R = G.stage.u * (140 + Math.random() * 120);
      G.tween(0, 1, 1.1, k => { s.style.transform = `translate(${Math.cos(a) * R * k}px,${Math.sin(a) * R * k}px) scale(${1 - k * 0.6})`; s.style.opacity = 1 - k; }, 'out').then(() => s.remove());
    }
  }

  // ---- 아이템 얻기: 큰 그림 + "마을 지도를 얻었어요!" + 설명 → [다음] → 그림이 가방으로 날아감 ----
  P.item = async (id) => {
    const it = G.D.items.find(x => x.id === id); if (!it) return;
    const g = G.gen; G.busy++;
    if (!G.st.items.includes(id)) { G.st.items.push(id); G.save.write(); }
    const { m, sh } = card('get');
    const pic = G.el('div', 'get-pic', sh, G.icon(it.icon));
    G.el('div', 'get-title', sh, G.txt('S92_get_' + id));
    G.el('div', 'get-desc', sh, G.txt(it.voice));
    G.audio.sfx('sfx_sparkle', 0.7);
    pic.animate && pic.animate([{ transform: 'scale(.3) rotate(-20deg)', opacity: 0 }, { transform: 'scale(1.15)', opacity: 1, offset: .7 }, { transform: 'scale(1)' }], { duration: 700, easing: 'ease-out' });
    requestAnimationFrame(() => { const r = pic.getBoundingClientRect(); sparkle(r.left + r.width / 2, r.top + r.height / 2); });
    const v1 = G.audio.voice('S92_get_' + id);   // "…을 얻었어요!"가 끝나면 [다음]이 켜지고 설명도 읽어 줌
    v1.then(() => { if (g === G.gen && m.isConnected) G.audio.voice(it.voice); });
    await nextRow(sh, v1);
    if (g !== G.gen) return;
    // 가방으로 날아가기
    const r0 = pic.getBoundingClientRect(), bag = [...document.querySelectorAll('#hud .pill')].find(b => b.getAttribute('aria-label') === '가방');
    m.remove();
    if (bag && !G.reduced()) {
      const r1 = bag.getBoundingClientRect(), fly = G.el('div', 'get-fly', G.$('#overlay'), G.icon(it.icon));
      Object.assign(fly.style, { left: r0.left + 'px', top: r0.top + 'px', width: r0.width + 'px', height: r0.height + 'px' });
      const dx = r1.left + r1.width * 0.2 - r0.left, dy = r1.top + r1.height / 2 - (r0.top + r0.height / 2), k1 = Math.min(1, (r1.height * 0.9) / r0.height);
      await G.tween(0, 1, 0.7, k => { fly.style.transform = `translate(${dx * k}px,${dy * k - Math.sin(k * Math.PI) * 80 * G.stage.u}px) scale(${1 + (k1 - 1) * k})`; }, 'io');
      fly.remove();
      bag.animate && bag.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.25)' }, { transform: 'scale(1)' }], { duration: 400 });
      G.audio.sfx('sfx_chime', 0.4);
    }
    G.busy = Math.max(0, G.busy - 1);
  };

  // ---- 퀘스트 알림: 화면 위쪽 가운데에 "길의 별 찾기 2/5 해냈어요!" + 퀘스트 이름, 읽어 준 뒤 사라짐 ----
  P.quest = async (n) => {
    const g = G.gen; G.busy++;
    const ov = G.$('#overlay'), b = G.el('div', 'quest-banner', ov);
    G.el('div', 'qb1', b, '길의 별 찾기 ' + n + '/5 해냈어요!');
    G.el('div', 'qb2', b, G.txt('S92_quest_' + n));
    G.audio.sfx('sfx_chime', 0.6);
    b.animate && b.animate([{ transform: 'translate(-50%,-120%)', opacity: 0 }, { transform: 'translate(-50%,0)', opacity: 1 }], { duration: 450, easing: 'ease-out' });
    await G.audio.voice('S92_quest_' + n); await G.wait(1.2);
    if (b.isConnected && b.animate) await b.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 400 }).finished.catch(() => { });
    b.remove();
    if (g === G.gen) { G.busy = Math.max(0, G.busy - 1); G.hud.refreshQuest(); }
  };

  // ---- 알게 된 것: "알게 된 것" + 내용 카드 → [다음] ----
  P.info = async (id) => {
    const g = G.gen; G.busy++;
    const t = G.txt(id), i = t.indexOf(':');
    const { m, sh } = card('info');
    G.el('div', 'info-head', sh, G.icon('icon_star') + ' ' + (i > 0 ? t.slice(0, i) : '알게 된 것'));
    G.el('div', 'info-body', sh, i > 0 ? t.slice(i + 1).trim() : t);
    G.audio.sfx('sfx_chime', 0.5);
    await nextRow(sh, G.audio.voice(id));
    m.remove();
    if (g === G.gen) G.busy = Math.max(0, G.busy - 1);
  };
  return P;
})();

G.flows = (() => {
  const F = {};
  const done = (m) => G.st.done.includes(m);
  const opt = (id, icon) => ({ label: G.txt(id), icon, voice: id });

  // ---- 시장: 봄이 아주머니 (할 일 1 인사 → 2 무엇을 물어볼까? 선택지 3개 → 3 마을 지도 받기) ----
  F.market_bom = async ({ complete, g }) => {
    const ok = () => g === G.gen, P = { partner: 'bom', keep: true };
    if (!done('market_bom')) {
      await G.dialog.play(['S04_bom_01', 'S04_bom_02'], P); if (!ok()) return;
      complete('market_bom');
    }
    if (!done('market_ask')) {
      await G.dialog.play(['S04_rumi_01'], P); if (!ok()) return;
      // 무엇을 물어도 괜찮음: 고른 질문에 봄이 아주머니가 대답하고, 모두 해솔 사서 이야기로 이어짐
      let i = await G.dialog.choose([opt('S04_opt_01', 'icon_star'), opt('S04_opt_02', 'opt_road'), opt('S04_opt_03', 'opt_apple')], true); if (!ok()) return;
      if (i === 2) {   // 10/2 선생님: 과일을 물으면 대답한 뒤 다시 고르기 (별·길 질문만 남김)
        await G.dialog.play(['S04_bom_05'], P); if (!ok()) return;
        i = await G.dialog.choose([opt('S04_opt_01', 'icon_star'), opt('S04_opt_02', 'opt_road')], true); if (!ok()) return;
      }
      await G.dialog.play([['S04_bom_03', 'S04_bom_04'][i]], P); if (!ok()) return;
      complete('market_ask');
    }
    if (!done('market_map')) {
      await G.dialog.play(['S04_bom_06', 'S04_bom_07', 'S04_bom_08', 'S04_bom_09'], P); if (!ok()) return;
      G.dialog.close();
      await G.present.item('map'); if (!ok()) return;
      await G.dialog.play(['S04_bom_10', 'S04_rumi_02'], { partner: 'bom' }); if (!ok()) return;
      complete('market_map');
    }
    G.dialog.close();
  };

  // ---- 도서관: 해솔 사서 (점자책 보여 주기 → 주인공 질문 버튼) ----
  F.library_haesol = async ({ complete, closeup, hideCloseup, g }) => {
    const ok = () => g === G.gen;
    G.dialog.onLine = (lid) => { if (lid === 'S05_haesol_03') closeup('braille_book'); if (lid === 'S05_haesol_04') hideCloseup(); };
    await G.dialog.play(['S05_haesol_01', 'S05_haesol_02', 'S05_haesol_03', 'S05_rumi_01', 'S05_haesol_04', 'S05_rumi_02'], { partner: 'haesol', keep: true });
    G.dialog.onLine = null; hideCloseup(); if (!ok()) return;
    await G.dialog.choose([opt('S05_ply_01', 'opt_night')], true); if (!ok()) return;
    await G.dialog.play(['S05_haesol_05', 'S05_haesol_06'], { partner: 'haesol' }); if (!ok()) return;
    complete('library_haesol');
  };

  // ---- 도서관: 촉각 지도 (할 일 2 아이템, 퀘스트 2/5) → 퍼즐 1 (할 일 3, 퀘스트 3/5) ----
  F.library_tactile = async ({ complete, g }) => {
    const ok = () => g === G.gen;
    if (!done('library_tactile')) {
      await G.dialog.play(['S05_haesol_07', 'S05_haesol_08', 'S05_haesol_09'], { partner: 'haesol' }); if (!ok()) return;
      await G.present.item('tactile'); if (!ok()) return;
      complete('library_tactile');
      G.st.quest = Math.max(G.st.quest, 2); G.save.write();
      await G.present.quest(2); if (!ok()) return;
    }
    if (!done('library_puzzle')) {
      const won = await G.puzzle.play('braille1'); if (!ok() || !won) return;
      G.st.quest = Math.max(G.st.quest, 3);
      complete('library_puzzle');
      await G.present.info('S92_info_01'); if (!ok()) return;
      await G.present.quest(3);
    }
  };
  return F;
})();

/* ---- p3.js ---- */
// p3.js — 프로토타입 3 (9/30): 숲 입구, 두 번째 광장, 별 얻기, 엔딩 (GDD 4-4, 4-5, 5-2, 5-3, 기획안 7-12)
// 숲: 덤불 B만 바람 소리가 크고 나뭇잎이 날림 + 물결 표시 (소리를 못 들어도 풀 수 있게) → 그 아래 빛을 잃은 별 → 다온
// 두 번째 광장: 게시판 바꾸기(퍼즐 2) → 안내 기둥과 노란 길(C10) → 게시판 함께 보기 → 별 받침대(C11) → 별 얻기(U9) → 엔딩(C12)
// 선생님 그림(assets/ui/art)이 오기 전에는 이미 있는 그림(아이콘·별)으로 임시로 보여 줌 (코드로 새 그림을 그리지 않음)
'use strict';

// ---- 나뭇잎이 바람에 날림 (장면 좌표) ----
G.leafPuff = (V, at, n = 4) => {
  if (!V || !V.el.isConnected) return;
  if (G.reduced() || (G.settings && G.settings.light)) n = Math.min(n, 2);
  for (let i = 0; i < n; i++) {
    const w = G.el('div', 'leafpuff', V.fx, G.artImg('wind_leaf') || G.icon('item_leaf'));
    Object.assign(w.style, { left: (at[0] - 30 + Math.random() * 60) + 'px', top: (at[1] - 40 + Math.random() * 60) + 'px' });
    const dx = 180 + Math.random() * 260, dy = -(80 + Math.random() * 160), rot = 200 + Math.random() * 320, d = 1.6 + Math.random();
    G.tween(0, 1, d, k => { w.style.transform = `translate(${dx * k}px,${dy * k + Math.sin(k * 8 + i) * 20}px) rotate(${rot * k}deg)`; w.style.opacity = Math.sin(k * Math.PI); }, 'lin').then(() => w.remove());
  }
};
// ---- 소리 물결 표시 (선생님 그림 wind_wave, 없으면 소리 아이콘) ----
// 10/1 선생님: 별을 올리면 불꽃놀이 (부드러운 빛 알갱이가 퍼졌다 사라짐, 화면 전체 번쩍임 없음)
G.firework = (parent, x, y, size = 1) => {
  const cols = ['#FFD66B', '#F4A259', '#E88D7A', '#9FD8FF', '#C9A7FF', '#7FB77E'], col = cols[Math.floor(Math.random() * cols.length)];
  const n = (G.settings && G.settings.light) ? 10 : 22, r = (120 + Math.random() * 60) * size * G.stage.u;
  G.audio.sfx('sfx_sparkle', 0.35, 0.8 + Math.random() * 0.4);
  const art = G.art('firework_' + (1 + Math.floor(Math.random() * 3)));   // 선생님 그림이 오면 그림으로
  if (art) {
    const im = G.el('img', 'fw-img', parent); im.src = art; im.alt = ''; im.style.left = x + 'px'; im.style.top = y + 'px'; im.style.width = im.style.height = (r * 2.4) + 'px';
    const an = im.animate ? im.animate([{ transform: 'translate(-50%,-50%) scale(.2)', opacity: 0 }, { transform: 'translate(-50%,-50%) scale(1)', opacity: 1, offset: .35 }, { transform: 'translate(-50%,-40%) scale(1.08)', opacity: 0 }], { duration: 1600, easing: 'ease-out' }) : null;
    if (an) an.finished.then(() => im.remove()).catch(() => im.remove()); else setTimeout(() => im.remove(), 1600);
    return;
  }
  for (let i = 0; i < n; i++) {
    const a = i / n * Math.PI * 2, d = G.el('div', 'fw-dot', parent); d.style.left = x + 'px'; d.style.top = y + 'px'; d.style.background = col; d.style.boxShadow = `0 0 10px ${col}`;
    const dx = Math.cos(a) * r, dy = Math.sin(a) * r;
    const an = d.animate ? d.animate([{ transform: 'translate(-50%,-50%) scale(1)', opacity: 1 }, { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(.9)`, opacity: .9, offset: .6 }, { transform: `translate(calc(-50% + ${dx * 1.1}px), calc(-50% + ${dy * 1.1 + 40 * size}px)) scale(.4)`, opacity: 0 }], { duration: 1500, easing: 'cubic-bezier(.2,.7,.4,1)' }) : null;
    if (an) an.finished.then(() => d.remove()).catch(() => d.remove()); else setTimeout(() => d.remove(), 1500);
  }
};
G.fireworkShow = async (parent, sec = 4, size = 1) => {
  if (G.reduced()) { G.firework(parent, G.stage.W * .5, G.stage.H * .3, size); return; }
  const end = performance.now() + sec * 1000;
  while (performance.now() < end && parent.isConnected) { G.firework(parent, G.stage.W * (.2 + Math.random() * .6), G.stage.H * (.15 + Math.random() * .25), size); await G.wait(0.45 + Math.random() * 0.35); }
};
G.waveMark = (parent, x, y, times = 3) => {
  const m = G.el('div', 'wavemark', parent, G.artImg('wind_wave') || G.icon('icon_sound'));
  Object.assign(m.style, { left: x + 'px', top: y + 'px' });
  const a = m.animate && m.animate([{ transform: 'translate(-50%,-50%) scale(.6)', opacity: 0 }, { transform: 'translate(-50%,-50%) scale(1.15)', opacity: 1, offset: .45 }, { transform: 'translate(-50%,-50%) scale(1)', opacity: 0 }], { duration: 1300, iterations: times });
  if (a) a.finished.then(() => m.remove()).catch(() => m.remove()); else setTimeout(() => m.remove(), 1300 * times);
  return m;
};

// ---- 장면마다 움직이는 것 (scene.js가 장면에 들어갈 때 부름) ----
G.sceneFx = {
  forest(V, S) {
    const [fx, fy, fw, fh] = S.fireflies, n = G.settings.light ? 4 : 9;
    for (let i = 0; i < n; i++) {
      const f = G.el('div', 'firefly' + (G.art('firefly') ? ' art' : ''), V.fx, G.artImg('firefly') || '');
      Object.assign(f.style, { left: (fx + Math.random() * fw) + 'px', top: (fy + Math.random() * fh) + 'px', animationDelay: (-Math.random() * 6).toFixed(2) + 's', animationDuration: (5 + Math.random() * 4).toFixed(2) + 's' });
    }
    // 덤불 B에서 가끔 나뭇잎이 날림 (보는 것만으로도 바람이 부는 곳을 알 수 있게)
    let t = 2.5;
    const off = G.every(dt => {
      if (!V.el.isConnected) { off(); return; }
      if (G.dialog.active || G.paused || G.busy > 0) return;
      t -= dt; if (t > 0) return; t = 4 + Math.random() * 2;
      G.leafPuff(V, S.wind, 2);
    });
  },
};

// ---- 별 얻기 화면 (U9): 큰 별 + "길의 별을 되찾았어요!" + 쉬운 말 + 되찾은 별 1/8 → [다음] ----
G.present.star = async () => {
  const E = G.D.ending.star, s = G.STARS.find(x => x.id === E.id), g = G.gen;
  G.busy++;
  const m = G.el('div', 'modal starget', G.$('#overlay')), sh = G.el('div', 'sheet', m);
  const pic = G.el('div', 'star-pic', sh, G.starSvg(s));
  G.el('div', 'get-title', sh, G.txt(E.title));
  for (const l of E.lines) G.el('div', 'get-desc', sh, G.txt(l));
  G.el('div', 'star-count', sh, G.icon('icon_star') + ' 되찾은 별 1/8');
  G.audio.sfx('sfx_star', 0.9); G.audio.sfx('sfx_sparkle', 0.7);
  pic.animate && pic.animate([{ transform: 'scale(.2) rotate(-40deg)', opacity: 0 }, { transform: 'scale(1.2)', opacity: 1, offset: .7 }, { transform: 'scale(1)' }], { duration: 900, easing: 'ease-out' });
  const row = G.el('div', 'btn-row', sh);
  const b = G.btn('pill gold dlg-next wait', '다음 ' + G.icon('icon_next'), row, null, '다음'); b.disabled = true;
  let res; const p = new Promise(r => res = r);
  G.onTap(b, () => { if (b.disabled) return; G.audio.sfx('sfx_tap', 0.5); G.audio.stopVoice(); res(); });
  (async () => {
    if (G.fast()) { b.disabled = false; b.classList.remove('wait'); b.classList.add('ready'); }
    for (const id of [E.title, ...E.lines]) { if (g !== G.gen || !m.isConnected) return; await G.audio.voice(id); }
    b.disabled = false; b.classList.remove('wait'); b.classList.add('ready');
  })();
  await p;
  m.remove();
  if (g === G.gen) G.busy = Math.max(0, G.busy - 1);
};

// ---- 퍼즐 2 (GDD 5-2): 게시판 바꾸기 ----
// 가운데 게시판(처음에는 작은 글씨 한 줄), 왼쪽에 물어볼 주민 4명, 아래에 카드 4장. 카드를 누르면 게시판에 붙고 그 방법이 편한 주민이 대답
// 묻기는 해도 되고 안 해도 됨. 틀린 카드는 없음. 4장을 모두 붙이면 C9 (붙인 것이 차례로 반짝, 주민들이 끄덕)
// o.view: 바뀐 게시판 보기 (카드·주민 없이 [닫기]). o.look: 함께 보기 (차례로 빛나며 안내 음성, 끝나면 [닫기])
G.puzzle2 = (() => {
  const Z = {};
  const NAME = { daon: '다온', haesol: '해솔', post: '우편배달부', chief: '촌장' };
  const tempPic = () => `<div class="pz2-tmp">${G.icon('place_plaza')}<span>${G.starSvg(G.STARS[0])}</span></div>`;   // 다온의 그림이 오기 전 임시 (광장 그림 + 길의 별)
  Z.play = (o = {}) => new Promise(async (finish) => {
    const D = G.D.puzzles.board2, g = G.gen, ok = () => g === G.gen, view = !!(o.view || o.look);
    const back = { music: (G.D.scenes[G.scene.view() ? G.scene.view().S.id : 'plaza2'] || {}).music, screen: G.screen };
    G.screen = 'puzzle'; G.hud.hide(true); G.help.off();
    if (!view) G.audio.music('music_puzzle');
    const root = G.el('div', 'puzzle pz2', G.$('#world'));
    const watch = G.every(() => { if (!ok() || !root.isConnected) return watch(); root.classList.toggle('talk', !!G.dialog.active); });   // 대화 중 카드·루미 버튼 숨김
    const board = G.el('div', 'pz2-board', root);
    if (G.art('board_front')) { board.classList.add('art'); board.style.borderImageSource = `url("${G.art('board_front')}")`; }   // 선생님 게시판 그림: 나무 테두리는 그대로, 가운데 코르크만 늘어남
    const note = G.el('div', 'pz2-note', board, D.text);
    const slots = G.el('div', 'pz2-slots', board);
    const slot = {}; for (const k of ['pic', 'sound', 'braille']) slot[k] = G.el('div', 'pz2-slot ' + k, slots);
    const part = { big: note, pic: slot.pic, sound: slot.sound, braille: slot.braille };
    const put = {
      big() { note.classList.add('big'); },
      pic() { slot.pic.innerHTML = G.artImg('board_picture') || tempPic(); },
      sound() { slot.sound.innerHTML = ''; G.btn('pill gold pz2-sound', G.icon('icon_sound') + ' 소리로 듣기', slot.sound, () => G.audio.voice(D.sound), '소리로 듣기'); },
      braille() { slot.braille.innerHTML = G.braille.svg(D.braille, 20); },
    };
    const paper = (!view && G.art('notice_festival')) ? G.el('img', 'pz2-paper', slots) : null;   // 10/1 선생님 그림: 촌장님이 붙인 빽빽한 알림 종이, 첫 카드를 붙이면 걷힘
    if (paper) { paper.src = G.art('notice_festival'); paper.alt = ''; }
    const on = new Set();
    const attachTo = (id) => { if (paper) paper.classList.add('off'); put[id](); part[id].classList.add('on'); on.add(id); };
    if (view) for (const c of D.cards) attachTo(c.id);
    const say = G.el('div', 'pz-say pz2-say', root); say.style.display = 'none';
    const bl = G.el('div', 'pz-bl', root);
    let arrowEl = null;
    const clearHint = () => { if (arrowEl) arrowEl.remove(); arrowEl = null; root.querySelectorAll('.pz2-card.hint').forEach(e => e.classList.remove('hint')); say.style.display = 'none'; };
    const end = (won) => {
      clearHint(); G.help.off(); root.remove();
      G.screen = back.screen; G.hud.hide(false);
      if (!view && back.music) G.audio.music(back.music);
      finish(won);
    };

    // ---- 보기만 (바뀐 게시판 / 함께 보기) ----
    if (view) {
      const row = G.el('div', 'pz2-close', root);
      const close = G.btn('pill gold', G.icon('icon_ok') + ' 닫기', row, () => { if (close.disabled) return; G.audio.stopVoice(); end(true); }, '닫기');
      if (o.look) {
        close.disabled = true; close.classList.add('wait');
        G.busy++;
        for (const id of ['big', 'pic', 'sound', 'braille']) {
          if (!ok()) return;
          part[id].classList.add('shine'); G.audio.sfx('sfx_chime', 0.45);
          await G.wait(G.fast() ? 0.2 : 0.8); part[id].classList.remove('shine');
        }
        if (!ok()) return;
        part.sound.classList.add('shine'); await G.audio.voice(D.sound); part.sound.classList.remove('shine');
        G.busy = Math.max(0, G.busy - 1);
        close.disabled = false; close.classList.remove('wait');
      } else G.audio.voice(D.sound);
      return;
    }

    // ---- 주민에게 묻기 ----
    const people = G.el('div', 'pz2-people', root), faces = {};
    let busy = false;
    for (const [who, line] of D.ask) {
      const b = G.el('button', 'pz2-face', people); b.type = 'button'; b.setAttribute('aria-label', NAME[who]);
      const im = G.el('div', 'pz2-face-img', b); const P = G.D.portraits[who]; im.style.backgroundImage = `url("${G.asset(P.img)}")`;
      G.el('span', '', b, NAME[who]);
      G.onTap(b, async () => {
        if (busy || G.busy > 0) return; busy = true; clearHint();
        G.audio.sfx('sfx_tap', 0.5);
        G.dialog.open(who);
        await G.dialog.choose([{ label: G.txt(D.askBtn), icon: 'icon_star', voice: D.askBtn }], true); if (!ok()) return;
        await G.dialog.play([line], { partner: who }); if (!ok()) return;
        b.classList.add('asked'); busy = false;
      });
      faces[who] = b;
    }
    // ---- 카드 4장 ----
    const tray = G.el('div', 'pz2-cards', root), cardEl = {};
    const cardFace = { big: '<b class="pz2-ga">가</b>', pic: () => G.artImg('board_picture') || tempPic(), sound: () => G.icon('icon_sound'), braille: () => G.braille.svg(D.braille.slice(0, 2), 16) };
    let first = true;
    for (const c of D.cards) {
      const b = G.el('button', 'pz2-card' + (G.art('card_blank') ? ' art' : ''), tray); b.type = 'button'; b.setAttribute('aria-label', c.label + ' 카드');
      if (G.art('card_blank')) b.style.backgroundImage = `url("${G.art('card_blank')}")`;
      const f = cardFace[c.id]; G.el('div', 'pz2-card-pic', b, typeof f === 'function' ? f() : f);
      G.el('div', 'pz2-card-label', b, c.label);
      G.onTap(b, () => attach(c));
      if (G.p4) G.p4.dragTo(b, () => [board], () => { if (!b.classList.contains('used')) attach(c); });   // 10/1: 카드를 게시판으로 끌어서 붙이기도 됨
      cardEl[c.id] = b;
    }
    async function attach(c) {
      if (busy || G.busy > 0 || on.has(c.id)) return; busy = true; clearHint();
      G.audio.sfx('sfx_page', 0.7);
      const b = cardEl[c.id], r0 = b.getBoundingClientRect(), r1 = part[c.id].getBoundingClientRect();
      if (!G.reduced()) {
        const fly = G.el('div', 'pz2-fly', G.$('#overlay'), b.innerHTML);
        Object.assign(fly.style, { left: r0.left + 'px', top: r0.top + 'px', width: r0.width + 'px', height: r0.height + 'px' });
        const dx = r1.left + r1.width / 2 - (r0.left + r0.width / 2), dy = r1.top + r1.height / 2 - (r0.top + r0.height / 2);
        await G.tween(0, 1, 0.6, k => { fly.style.transform = `translate(${dx * k}px,${dy * k}px) scale(${1 - 0.3 * k})`; fly.style.opacity = 1 - k * 0.6; }, 'io');
        fly.remove();
      }
      if (!ok()) return;
      b.classList.add('used'); attachTo(c.id); part[c.id].classList.add('shine'); G.audio.sfx('sfx_star', 0.7);
      setTimeout(() => part[c.id].classList.remove('shine'), 1200);
      const fc = faces[c.who]; if (fc && fc.animate) fc.animate([{ transform: 'translateY(0)' }, { transform: 'translateY(-18%)' }, { transform: 'translateY(0)' }], { duration: 500 });
      await G.dialog.play(c.lines, { partner: c.who }); if (!ok()) return;
      if (first && on.size < D.cards.length) { first = false; await G.dialog.play([D.more]); if (!ok()) return; }
      busy = false;
      if (on.size === D.cards.length) await c9();
    }
    // ---- C9 (환경 변화 1): 붙인 것이 하나씩 반짝, 주민들이 차례로 끄덕 ----
    async function c9() {
      busy = true; G.help.off(); G.busy++;
      tray.style.opacity = 0.35;
      for (const id of ['big', 'pic', 'braille', 'sound']) {
        part[id].classList.add('shine'); G.audio.sfx('sfx_chime', 0.5);
        await G.wait(G.fast() ? 0.15 : 0.7);
      }
      for (const who in faces) { const f = faces[who]; f.classList.add('asked'); f.animate && f.animate([{ transform: 'rotate(0)' }, { transform: 'rotate(-8deg) translateY(8%)' }, { transform: 'rotate(0)' }], { duration: 450 }); await G.wait(G.fast() ? 0.1 : 0.35); }
      G.audio.sfx('sfx_sparkle', 0.7);
      await G.wait(G.fast() ? 0.3 : 1.2);
      for (const id in part) part[id].classList.remove('shine');
      G.busy = Math.max(0, G.busy - 1);
      if (ok()) end(true);
    }
    // ---- 도움: 1 루미가 말로, 2 안 붙인 카드 위 화살표, 3 그 카드가 반짝 ----
    const lumiB = G.el('button', 'lumi-btn', bl); lumiB.type = 'button'; lumiB.setAttribute('aria-label', '루미 도움');
    const li = G.el('img', '', lumiB); li.src = G.asset('assets/chars/lumi.png'); li.alt = ''; G.el('span', '', lumiB, '루미');
    G.onTap(lumiB, () => G.help.now());
    const nextCard = () => D.cards.find(c => !on.has(c.id));
    G.help.set({
      l1: () => { say.textContent = G.txt(D.hint1); say.style.display = ''; G.audio.voice(D.hint1); },
      l2: () => { const c = nextCard(); if (!c || arrowEl) return; const r = cardEl[c.id].getBoundingClientRect(), rr = root.getBoundingClientRect();
        arrowEl = G.el('div', 'arrow pz-arrow', root, G.arrowHtml()); Object.assign(arrowEl.style, { left: (r.left - rr.left + r.width / 2) + 'px', top: (r.top - rr.top) + 'px' }); },
      l3: () => { const c = nextCard(); if (c) cardEl[c.id].classList.add('hint'); },
      clear: clearHint,
    });
    // ---- 시작: 게시판에는 글씨만 → 글씨를 읽어 줌 → 모두에게 물어보자 (주민 얼굴이 반짝) ----
    G.busy++;
    await G.dialog.play([D.start[0]], { keep: true }); if (!ok()) return;
    note.classList.add('reading');
    await G.dialog.play([D.start[1]], { keep: true }); note.classList.remove('reading'); if (!ok()) return;
    people.classList.add('glow');
    await G.dialog.play([D.start[2]]); if (!ok()) return;
    setTimeout(() => people.classList.remove('glow'), 2500);
    G.busy = Math.max(0, G.busy - 1);
  });
  return Z;
})();

// ---- 흐름: 숲, 두 번째 광장, 엔딩 ----
Object.assign(G.flows, {
  // 덤불 B: 바람 소리가 크고 나뭇잎이 날림 + 물결 표시
  async forest_wind({ S, V, complete, g }) {
    const at = S.wind;
    G.audio.sfx('sfx_wind', 1.0);
    G.leafPuff(V, at, 8); G.waveMark(V.fx, at[0] + 40, at[1] - 150);
    await G.dialog.play(['S07_rumi_03']); if (g !== G.gen) return;
    complete('forest_wind');
  },
  // 덤불 B 아래: 나뭇잎 → 빛을 잃은 별 (퀘스트 4/5)
  async forest_star({ complete, g }) {
    const ok = () => g === G.gen;
    await G.dialog.play(['S07_rumi_04']); if (!ok()) return;
    await G.present.item('leaf'); if (!ok()) return;
    await G.dialog.play(['S07_rumi_05']); if (!ok()) return;
    await G.present.item('piece'); if (!ok()) return;
    await G.dialog.play(['S07_rumi_07']); if (!ok()) return;
    G.st.quest = Math.max(G.st.quest, 4);
    complete('forest_star');
    await G.present.quest(4);
  },
  // 다온: 이야기 → 광장으로 뛰어감
  async forest_daon({ V, complete, g }) {
    await G.dialog.play(['S07_daon_01', 'S07_daon_02', 'S07_daon_03', 'S07_daon_04', 'S07_rumi_06', 'S07_daon_05'], { partner: 'daon' }); if (g !== G.gen) return;
    const sp = V && V.spr.daon;
    if (sp) {
      G.audio.sfx('sfx_step1', 0.5); setTimeout(() => G.audio.sfx('sfx_step2', 0.5), 300);
      await G.tween(0, 1, G.reduced() ? 0.3 : 1.1, k => { sp.img.style.transform = `translate(${300 * k}px,${-50 * k}px)`; sp.img.style.opacity = 1 - k; }, 'in');
      sp.img.style.display = 'none'; sp.img.style.transform = ''; sp.img.style.opacity = '';
    }
    complete('forest_daon');
  },

  // 두 번째 광장 할 일 1: 게시판 (퍼즐 2 → 별빛 조각). 끝난 뒤에 누르면 바뀐 게시판을 보여 줌
  async plaza2_board({ complete, g }) {
    const ok = () => g === G.gen;
    if (G.st.done.includes('plaza2_board')) { await G.puzzle2.play({ view: true }); return; }
    const won = await G.puzzle2.play(); if (!ok() || !won) return;
    await G.present.item('light'); if (!ok()) return;
    G.st.env.board = true;
    complete('plaza2_board');
  },
  // 할 일 2: 우편배달부 → 해솔·우편배달부에게 묻기 → 안내 기둥 세우기·노란 길 깔기 (순서 자유) → C10 → 점자블록 설명 → 우편배달부가 혼자 걸어감
  async plaza2_road({ S, V, complete, g }) {
    const ok = () => g === G.gen, ask = [{ label: G.txt('S09_ply_01'), icon: 'icon_star', voice: 'S09_ply_01' }];
    await G.dialog.play(['S10_post_01', 'S10_rumi_01'], { partner: 'post', keep: true }); if (!ok()) return;
    G.dialog.open('haesol'); await G.dialog.choose(ask, true); if (!ok()) return;
    await G.dialog.play(['S10_haesol_01', 'S10_haesol_02'], { partner: 'haesol', keep: true }); if (!ok()) return;
    G.dialog.open('post'); await G.dialog.choose(ask, true); if (!ok()) return;
    await G.dialog.play(['S10_post_02', 'S10_rumi_02'], { partner: 'post', keep: true }); if (!ok()) return;
    const opts = { pole: { label: G.txt('S10_btn_01'), art: 'opt_bell', icon: 'icon_sound', voice: 'S10_btn_01' }, blocks: { label: G.txt('S10_btn_02'), art: 'opt_block', icon: 'opt_road', voice: 'S10_btn_02' } };
    const left = ['pole', 'blocks'];
    while (left.length) {
      const i = await G.dialog.choose(left.map(k => opts[k]), true); if (!ok()) return;
      const k = left.splice(i, 1)[0];
      await p3Install(V, k); if (!ok()) return;
    }
    G.dialog.close();
    await G.cut.play('C10', { live: { V, S } }); if (!ok()) return;
    const blocks = V.spr.blocks && V.spr.blocks.img;
    G.dialog.onLine = (id) => { if (blocks) blocks.classList.toggle('shine', id === 'S10_haesol_04' || id === 'S10_haesol_05'); };
    await G.dialog.play(['S10_haesol_03', 'S10_haesol_04', 'S10_haesol_05'], { partner: 'haesol', keep: true });
    G.dialog.onLine = null; if (blocks) blocks.classList.remove('shine'); if (!ok()) return;
    await G.dialog.play(['S10_post_03'], { partner: 'post' }); if (!ok()) return;
    await p3WalkAway(V, S); if (!ok()) return;
    await G.dialog.play(['S10_haesol_06'], { partner: 'haesol' }); if (!ok()) return;
    G.st.env.guide = true;
    complete('plaza2_road');
  },
  // 할 일 3 (1): 게시판 함께 보기 → 주민이 모두 모임 → 가방 속 빛을 잃은 별이 반짝 → 별 받침대가 열림
  async plaza2_look({ V, complete, g }) {
    const ok = () => g === G.gen;
    await G.dialog.play(['S11_rumi_04']); if (!ok()) return;
    await G.puzzle2.play({ look: true }); if (!ok()) return;
    const post = V && V.spr.post;   // 도서관에 다녀온 우편배달부도 돌아옴
    if (post) { post.img.style.display = ''; post.img.animate && post.img.animate([{ opacity: 0, transform: 'translateY(-30px)' }, { opacity: 1, transform: 'none' }], { duration: 600 }); }
    if (V) for (const k of ['chief', 'post', 'daon', 'haesol']) { const s = V.spr[k]; if (s && s.img.animate) s.img.animate([{ transform: 'translateY(0)' }, { transform: 'translateY(-14px)' }, { transform: 'translateY(0)' }], { duration: 500, delay: 150 * ['chief', 'post', 'daon', 'haesol'].indexOf(k) }); }
    await G.dialog.play(['S09_rumi_04', 'S09_chief_02'], { partner: 'chief', keep: true }); if (!ok()) return;
    G.dialog.close();
    await p3GlowPiece(); if (!ok()) return;
    await G.dialog.play(['S11_rumi_05']); if (!ok()) return;
    complete('plaza2_look');
    await G.dialog.play(['S11_rumi_01']);
  },
  // 할 일 3 (2): 별 받침대 → C11 → 별 얻기 (퀘스트 5/5)
  async plaza2_star({ V, S, complete, g }) {
    const ok = () => g === G.gen;
    await G.cut.play('C11', { live: { V, S } }); if (!ok()) return;
    await G.dialog.play(['S11_rumi_02', 'S11_rumi_03']); if (!ok()) return;
    await G.present.star(); if (!ok()) return;
    G.st.stars = Math.max(G.st.stars || 0, 1); G.st.quest = 5;
    complete('plaza2_star');
    await G.present.quest(5);
  },

  // ---- 엔딩: 장 제목 → C12 (마을 지도가 멀리) → 주민들의 말 → 다음 별 예고 → 되찾은 별 1/8 저장 → 마을 지도 ----
  async ending() {
    const g = G.gen, ok = () => g === G.gen, E = G.D.ending;
    if (!G.st.cleared.includes('plaza2')) G.st.cleared.push('plaza2');
    G.st.mood = 5; G.st.quest = 5; G.st.stars = Math.max(G.st.stars || 0, 1); G.st.place = 'plaza'; G.save.write();
    G.help.off(); G.hud.clear(); G.hud.hide(true);
    await G.cut.play('CH:ending', { key: 'ending' }); if (!ok()) return;
    G.$('#fade').classList.add('on'); await G.wait(0.45); if (!ok()) return;
    G.scene.hide(); G.map.hide();
    const world = G.$('#world'); world.innerHTML = '';
    const MV = G.mapView(world, {}); MV.setMood(5); MV.addMarkers();
    for (const p of G.D.places.places) MV.setMarker(p.id, 'done', true);
    await MV.ready; if (!ok()) return;
    const onR = () => MV.setCam(MV.cam.x, MV.cam.y, MV.cam.z); G.resizers.add(onR);
    G.$('#fade').classList.remove('on');
    await G.cut.play('C12', { live: MV, part: 1 }); if (!ok()) return;
    for (const [who, ids] of E.talk) { await G.dialog.play(ids, { partner: who || undefined }); if (!ok()) return; }
    await G.cut.play('C12', { live: MV, part: 2 }); if (!ok()) return;
    G.resizers.delete(onR);
    G.$('#fade').classList.add('on'); await G.wait(0.45); if (!ok()) return;
    await G.map.show();
    G.$('#fade').classList.remove('on');
    G.hud.hide(false);
  },
});

// 안내 기둥이 땅에서 솟아오름 / 노란 길이 기둥 앞에서 도서관 쪽으로 깔림
async function p3Install(V, k) {
  const sp = V && V.spr[k]; if (!sp) return;
  const im = sp.img; im.style.display = '';
  if (k === 'pole') {
    G.audio.sfx('sfx_door', 0.5);
    await G.tween(0, 1, G.reduced() ? 0.3 : 1.2, q => { im.style.clipPath = `inset(${(1 - q) * 100}% 0 0 0)`; im.style.transform = `translateY(${(1 - q) * 30}px)`; }, 'out');
    G.audio.sfx('sfx_chime', 0.7);
  } else {
    let n = 0;
    await G.tween(0, 1, G.reduced() ? 0.3 : 1.6, q => { im.style.clipPath = `inset(0 0 0 ${(1 - q) * 100}%)`; const s = Math.floor(q * 6); if (s > n) { n = s; G.audio.sfx(n % 2 ? 'sfx_step1' : 'sfx_step2', 0.4); } }, 'lin');
    G.audio.sfx('sfx_sparkle', 0.6);
  }
  im.style.clipPath = ''; im.style.transform = '';
}
// 우편배달부가 노란 길을 따라 혼자 걸어감 (길 끝에서 사라짐)
async function p3WalkAway(V, S) {
  const sp = V && V.spr.post; if (!sp) return;
  const r = sp.def.rect, foot = [r[0] + r[2] / 2, r[1] + r[3]], P = [foot, ...S.path];
  let total = 0; const seg = []; for (let i = 1; i < P.length; i++) { const l = Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]); seg.push(l); total += l; }
  const at = (d) => { for (let i = 0; i < seg.length; i++) { if (d <= seg[i]) { const k = d / seg[i]; return [P[i][0] + (P[i + 1][0] - P[i][0]) * k, P[i][1] + (P[i + 1][1] - P[i][1]) * k]; } d -= seg[i]; } return P[P.length - 1]; };
  let st = 0;
  await G.tween(0, 1, G.reduced() ? 0.4 : 3.2, k => {
    const [x, y] = at(total * k); sp.img.style.transform = `translate(${x - foot[0]}px,${y - foot[1]}px)`; sp.img.style.opacity = k > 0.8 ? (1 - k) / 0.2 : 1;
    const s = Math.floor(k * 10); if (s > st) { st = s; G.audio.sfx(st % 2 ? 'sfx_step1' : 'sfx_step2', 0.3); }
  }, 'lin');
  sp.img.style.display = 'none'; sp.img.style.transform = ''; sp.img.style.opacity = '';
}
// 가방 속 빛을 잃은 별이 반짝이기 시작함 (가방 단추 위로 별 그림이 떠오르며 빛남)
async function p3GlowPiece() {
  const ov = G.$('#overlay'), pg = G.art('piece_glow') || G.art('popup_piece'), m = G.el('div', 'piece-glow', ov, pg ? `<img src="${pg}" alt="">` : G.icon('item_piece'));   // 10/1: 배경 없이 별만
  G.audio.sfx('sfx_sparkle', 0.8);
  await G.tween(0, 1, G.reduced() ? 0.3 : 1.8, k => { m.style.opacity = Math.sin(Math.min(1, k * 1.4) * Math.PI / 2) * (k > 0.85 ? (1 - k) / 0.15 : 1); m.style.filter = `drop-shadow(0 0 ${10 + 30 * k}px rgba(255,214,107,${0.4 + 0.6 * k})) brightness(${1 + k * 0.6})`; }, 'io');
  m.remove();
}

// ---- 연출 ----
G.cut.add({
  // ---- C5 숲 입구 도착 (7초): 나뭇잎이 흩날림 → 바람 소리가 나는 쪽에 물결 표시 → 반딧불이 떠오름 → 「숲 입구」 ----
  async C5(c, root, opts) {
    const U = G.cut.util, { V, off } = await U.arrive(c, root, opts, 'forest');
    const S = G.D.scenes.forest;
    if (c.rm) V.setCam(1200, 540, 1); else V.setCam(900, 560, 1.3);
    c.t0 = G.t;
    await Promise.all([
      U.fadeIn(c, root, 0.5),
      (async () => { if (!c.rm) await c.tween(0, 1, 3.6, k => V.setCam(900 + 300 * k, 560 - 20 * k, 1.3 - 0.3 * k), 'io'); })(),
      (async () => { await c.until(0.4); c.sfx('sfx_wind', 0.8); if (!c.skipped && !c.light) { G.leafPuff(V, [700, 500], 5); G.leafPuff(V, S.wind, 5); } })(),
      (async () => { await c.until(2.0); if (!c.skipped) { const [x, y] = V.toScreen(S.wind[0] + 40, S.wind[1] - 150); G.waveMark(root, x, y, 2); } })(),
      (async () => { await c.until(2.6); if (c.skipped || c.light) return;
        for (let i = 0; i < 8; i++) { const f = G.el('div', 'firefly rise' + (G.art('firefly') ? ' art' : ''), root, G.artImg('firefly') || ''); Object.assign(f.style, { left: (G.stage.W * (0.2 + Math.random() * 0.6)) + 'px', top: (G.stage.H * (0.6 + Math.random() * 0.3)) + 'px' });
          c.tween(0, 1, 3 + Math.random(), k => { f.style.transform = `translateY(${-G.stage.H * 0.4 * k}px)`; f.style.opacity = Math.sin(k * Math.PI); }, 'lin').then(() => f.remove()); } })(),
      U.title(c, root, '숲 입구', 'S92_place_forest', 4.2, 6.9),
    ]);
    V.setCam(1200, 540, 1); off();
  },
  // ---- C6 광장(두 번째) 도착 (6초): 주민들이 게시판 앞에 모여 있음 → 머리 위에 물음표가 하나씩 → 다온이 뛰어옴 ----
  async C6(c, root, opts) {
    const U = G.cut.util, { V, off } = await U.arrive(c, root, opts, 'plaza2');
    if (c.rm) V.setCam(1200, 540, 1); else V.setCam(1350, 640, 1.3);
    c.t0 = G.t;
    const marks = [];
    await Promise.all([
      U.fadeIn(c, root, 0.5),
      (async () => { if (!c.rm) await c.tween(0, 1, 3.4, k => V.setCam(1350 - 150 * k, 640 - 100 * k, 1.3 - 0.3 * k), 'io'); })(),
      (async () => {
        for (const [i, k] of ['chief', 'haesol', 'post', 'daon'].entries()) {
          await c.until(1.0 + i * 0.45); const s = V.spr[k]; if (!s || c.skipped) continue;
          const r = s.def.rect, q = G.el('div', 'qmark', V.fx, G.artImg('mark_question') || '<span>?</span>');
          Object.assign(q.style, { left: (r[0] + r[2] / 2) + 'px', top: (r[1] - 10) + 'px' }); marks.push(q);
          q.animate && q.animate([{ transform: 'translate(-50%,-100%) scale(.3)', opacity: 0 }, { transform: 'translate(-50%,-100%) scale(1)', opacity: 1 }], { duration: 400, easing: 'ease-out', fill: 'forwards' });
          c.sfx('sfx_tap', 0.35);
        }
      })(),
      (async () => {   // 다온이 주인공 쪽으로 폴짝폴짝
        await c.until(3.0); const d = V.spr.daon && V.spr.daon.img; if (!d || c.rm) return;
        await c.tween(0, 1, 1.0, k => { d.style.transform = `translate(${40 * k}px,${40 * k - Math.abs(Math.sin(k * Math.PI * 3)) * 16}px)`; });
      })(),
      U.title(c, root, '광장', 'S92_place_plaza', 3.6, 6.0),
    ]);
    marks.forEach(m => m.remove());
    V.setCam(1200, 540, 1); off();
  },
  // ---- C10 환경 변화 2 (7초): 기둥에서 차임과 소리 물결 → 노란 길을 따라 빛이 흘러 도서관 쪽으로 → 안내 음성 ----
  async C10(c, root, opts) {
    const L = opts.live; if (!L) return;
    const { V, S } = L; root.style.background = 'transparent';
    c.t0 = G.t;
    const [px, py] = V.toScreen(...S.pole);
    await Promise.all([
      (async () => { for (let i = 0; i < 3; i++) { await c.until(0.3 + i * 0.9); if (c.skipped) break; c.sfx('sfx_chime', 0.6); G.waveMark(root, px + 30 * G.stage.u, py, 1); } })(),
      (async () => {
        await c.until(1.2);
        const P = S.path, lights = [];
        for (let i = 0; i < P.length && !c.skipped; i++) {
          const [x, y] = V.toScreen(...P[i]); const d = G.el('div', 'pathlight', root); Object.assign(d.style, { left: x + 'px', top: y + 'px' }); lights.push(d);
          if (!c.light && i % 2 === 0) G.cut.util.burst(c, root, x, y, 4);
          await c.wait(0.18);
        }
        await c.wait(0.6); for (const d of lights) d.remove();
      })(),
      (async () => { await c.until(2.0); await c.voice('S10_pole_01'); })(),
    ]);
    await c.until(6.8);
  },
  // ---- C11 별 복구 (10초): 빛을 잃은 별과 별빛 조각이 받침대로 → 빛 기둥 → 별이 하늘로 → 별자리에 자리 잡음 → 가로등이 차례로 켜지고 광장이 완전한 색으로 → 「길의 별」 ----
  async C11(c, root, opts) {
    const L = opts.live; if (!L) return;
    const { V, S } = L; root.style.background = 'transparent';
    const U = G.cut.util, star = G.STARS.find(s => s.id === 'road'), ped = S.hotspots.find(h => h.id === 'pedestal').rect;
    const [bx, by] = V.toScreen(ped[0] + ped[2] / 2, ped[1] + 40), hs = S.sprites.find(s => s.id === 'hero').rect, [hx, hy] = V.toScreen(hs[0] + hs[2] / 2, hs[1]);
    const u = G.stage.u; c.t0 = G.t;
    // 10/4 선생님: 별을 올릴 때는 촌장과 이 별 이야기의 인물들이 받침대 둘레로 모여 같이 올림 (소리의 별, 말의 별과 같은 방법). 봄이 아주머니는 시장에서 걸어옴
    const GA = { chief: [880, 500], haesol: [1360, 440], daon: [1330, 690], post: [680, 600], bom: [930, 700] };
    if (!V.spr.bom) { const i = G.el('img', 'scene-sprite idle', V.fx); i.src = G.asset('assets/scenes/market_bom.png'); i.alt = '';
      Object.assign(i.style, { left: '-240px', top: '700px', width: '175px', height: '193px' }); V.spr.bom = { img: i, def: { id: 'bom', rect: [-240, 700, 175, 193] } }; }
    V.fx.querySelectorAll('.hot-glow, .mstar').forEach(e => e.style.visibility = 'hidden');   // 옛 자리에 빛 테두리가 남지 않게
    const mv = Object.entries(GA).map(([k, to]) => { const sp = V.spr[k]; if (!sp || sp.img.style.display === 'none') return null; const r = sp.def.rect; return { e: sp.img, x0: r[0], y0: r[1], x1: to[0], y1: to[1] }; }).filter(Boolean);
    const place = k => mv.forEach(m => { m.e.style.left = (m.x0 + (m.x1 - m.x0) * k) + 'px'; m.e.style.top = (m.y0 + (m.y1 - m.y0) * k) + 'px'; });
    if (G.reduced()) place(1); else await c.tween(0, 1, 1.6, place, 'io');
    c.voice('S11_nar_01');
    // (가) 빛을 잃은 별과 별빛 조각이 주인공에게서 받침대로 날아감
    const piece = G.el('div', 'c11-item', root, G.icon('item_piece')), light = G.el('div', 'c11-item', root, G.icon('item_light'));
    for (const [e, dx] of [[piece, -40], [light, 40]]) { e.style.left = (hx + dx * u) + 'px'; e.style.top = hy + 'px'; }
    await Promise.all([piece, light].map((e, i) => c.tween(0, 1, 1.2, k => { const x0 = hx + (i ? 40 : -40) * u; e.style.left = (x0 + (bx - x0) * k) + 'px'; e.style.top = (hy + (by - hy) * k - Math.sin(k * Math.PI) * 120 * u) + 'px'; e.style.opacity = 1; }, 'io')));
    c.sfx('sfx_star', 0.9);
    // (나) 받침대에서 빛 기둥, 회색 별이 제 색을 찾음
    const pillar = G.el('div', 'c11-pillar', root); Object.assign(pillar.style, { left: bx + 'px', top: by + 'px' });
    // 10/2 선생님: 받침대 위에 별이 잠시 나타나는 모습은 뺌 (빛 기둥과 반짝임만)
    await Promise.all([
      c.tween(0, 1, 1.0, k => { pillar.style.transform = `translate(-50%,-100%) scaleY(${k})`; pillar.style.opacity = k; }, 'out'),
      c.tween(0, 1, 1.0, k => { piece.style.opacity = light.style.opacity = 1 - k; }),
    ]);
    piece.remove(); light.remove(); U.burst(c, root, bx, by, 16); c.sfx('sfx_sparkle', 0.8);
    await c.wait(0.6);
    // (다) 별이 하늘로 올라가고 카메라가 별을 따라 밤하늘로 갔다가 광장으로 돌아옴 (10/1 선생님: 별자리 잇기는 아직 없음)
    c.sfx('sfx_starfall', 0.6);
    const { W, H } = G.stage, POS = [[.5, .42], [.3, .3], [.7, .3], [.2, .55], [.8, .55], [.38, .66], [.62, .66], [.5, .2], [.5, .8]], wl = V.el.parentNode;
    // 10/2 시안(하늘 번지게): 카메라가 밤하늘로 따라 올라감. 하늘 그림 아래쪽을 지붕 위로 길게 겹쳐 아래로 갈수록 투명하게 (이음새 없음)
    const E = Math.round(H * 0.5);
    const sky = G.el('div', 'c11-sky', root); sky.style.backgroundImage = `url("${G.asset('assets/ui/sky.jpg')}")`;
    Object.assign(sky.style, { bottom: 'auto', height: (H + E) + 'px', opacity: 0 });
    const fade = `linear-gradient(to bottom, #000 0, #000 ${H}px, transparent ${H + E}px)`; sky.style.maskImage = sky.style.webkitMaskImage = fade;
    const slots = G.STARS.map((s, i) => { const e = G.el('div', 'c11-slot' + (s.id === 'road' ? ' me' : ''), sky, G.starSvg(s, true)); Object.assign(e.style, { left: POS[i % POS.length][0] * 100 + '%', top: POS[i % POS.length][1] * H + 'px' }); return e; });
    // 10/2 선생님: 올라가는 별은 맨 앞에 보이게 (빛 기둥 꼭대기에서 나타나 밤하늘 제자리까지)
    const big = G.el('div', 'c11-star', root, G.starSvg(star)); big.style.zIndex = 5;
    const sx0 = bx, sy0 = by - 120 * u, sx1 = POS[0][0] * W, sy1 = POS[0][1] * H;
    Object.assign(big.style, { left: sx0 + 'px', top: sy0 + 'px', opacity: 0 });
    await c.tween(0, 1, 0.5, k => { big.style.opacity = k; big.style.transform = `translate(-50%,-50%) scale(${0.5 + 0.5 * k})`; }, 'out');
    const pan = (k) => { const d = H * k; wl.style.transform = `translateY(${d}px)`; sky.style.transform = `translateY(${d - H}px)`; sky.style.opacity = Math.min(1, k * 2.5); pillar.style.translate = `0 ${d}px`; };
    const fly = (k) => { pan(k); big.style.left = (sx0 + (sx1 - sx0) * k) + 'px'; big.style.top = (sy0 + (sy1 - sy0) * k - Math.sin(k * Math.PI) * 60 * u) + 'px'; big.style.transform = `translate(-50%,-50%) scale(${1 - 0.21 * k})`; };
    if (c.rm) fly(1); else await c.tween(0, 1, 2.4, fly, 'io');
    const me = slots[G.STARS.findIndex(s => s.id === 'road')];
    big.remove(); me.classList.add('lit'); c.sfx('sfx_chime', 0.7); U.burst(c, root, POS[0][0] * W, POS[0][1] * H, 14);
    await c.wait(1.6);
    if (c.rm) pan(0); else await c.tween(1, 0, 2.0, pan, 'io');
    wl.style.transform = ''; sky.remove(); pillar.remove();
    // (마) 광장으로 돌아와 가로등이 차례로 켜지고 완전한 색
    const col = V.colorImg; col.style.visibility = '';
    for (const l of V.lamps) { if (!l.el.classList.contains('on')) { l.el.classList.add('on'); c.sfx('sfx_chime', 0.35); await c.wait(0.3); } }
    await c.tween(parseFloat(col.style.opacity) || 0, 1, 1.2, k => col.style.opacity = k);
    G.fireworkShow(root, 5);   // 10/1 별 축제 불꽃놀이
    for (const k of ['chief', 'post', 'daon', 'haesol', 'hero']) { const s = V.spr[k]; if (s && !c.rm && s.img.animate && s.img.style.display !== 'none') s.img.animate([{ transform: 'translateY(0)' }, { transform: 'translateY(-16px)' }, { transform: 'translateY(0)' }], { duration: 500, iterations: 2 }); }
    // (바) 「길의 별」
    const t = G.el('div', 'cut-title c11-title', root, '길의 별'); t.style.opacity = 0;
    await c.tween(0, 1, 0.6, k => { t.style.opacity = k; t.style.transform = `translate(-50%,-50%) scale(${0.8 + 0.2 * k})`; }, 'out');
    await c.until(10.5);
    await c.tween(1, 0, 0.5, v => t.style.opacity = v);
    col.style.opacity = 1; for (const l of V.lamps) l.el.classList.add('on');
  },
  // ---- C12 엔딩 (part 1: 마을 지도가 멀리 보임, part 2: 하늘 한쪽에 다음 별이 희미하게 깜박이다 사라짐 → 예고 → 되찾은 별 1/8) ----
  async C12(c, root, opts) {
    const MV = opts.live, E = G.D.ending; root.style.background = 'transparent';
    c.t0 = G.t;
    if (opts.part === 1) {
      const z0 = 1.25, z1 = 0.62;
      MV.setCam(1400, 830, c.rm ? z1 : z0);
      await Promise.all([
        (async () => { if (!c.rm) await c.tween(0, 1, 5, k => MV.setCam(1400 + 40 * k, 830 - 20 * k, z0 + (z1 - z0) * k), 'io'); })(),
        (async () => { await c.until(0.6); await c.voice(E.nar); if (E.nar2) { G.fireworkShow(root, 4, 0.7); await c.voice(E.nar2); } })(),
      ]);
      await c.until(5.2);
      MV.setCam(1440, 810, z1);
      return;
    }
    const sky = G.el('div', 'c11-sky', root); sky.style.backgroundImage = `url("${G.asset('assets/ui/sky.jpg')}")`; sky.style.opacity = 0;
    const road = G.el('div', 'c11-slot me lit', sky, G.starSvg(G.STARS[0], true)); Object.assign(road.style, { left: '40%', top: '40%' });
    const nx = G.STARS.find(s => s.id === E.nextStar), nxt = G.el('div', 'c11-slot next', sky, G.starSvg(nx, true)); Object.assign(nxt.style, { left: '64%', top: '30%', opacity: 0 });
    await G.cut.util.fadeIn(c, sky, 0.8);
    await Promise.all([
      c.tween(0, 1, 3.2, k => nxt.style.opacity = (0.6 * Math.abs(Math.sin(k * Math.PI * 3))) * (k < 0.9 ? 1 : (1 - k) / 0.1)),
      (async () => { await c.wait(1.0); await c.voice(E.next); })(),
    ]);
    nxt.style.opacity = 0;
    const box = G.el('div', 'c12-saved', root, G.icon('icon_star') + ' 되찾은 별 1/8'); box.style.opacity = 0;
    c.sfx('sfx_star', 0.8);
    await c.tween(0, 1, 0.6, k => { box.style.opacity = k; box.style.transform = `translate(-50%,-50%) scale(${0.7 + 0.3 * k})`; }, 'out');
    await c.voice(E.saved);
    await c.wait(1.0);
    await G.cut.util.fadeOut(c, root, 0.6);
  },
});

/* ---- p4.js ---- */
// p4.js — 프로토타입 4 (10/1): 방탈출 요소 (기획안 v1.2 17장). 다른 파일에는 부르는 곳(G.p4.…)만 조금 넣고 나머지는 모두 여기
// 도서관 문 점자 자물쇠 (쪽지는 촌장, 쉽게=같은 판 찾기 / 보통=ㄹ 칸만 / 어렵게=네 칸 모두 푸시팝), 지도 물음표, 아이템 끌어 쓰기,
// 광장: 날아간 편지 찾기·게시판 닦기, 시장: 찢어진 지도 맞추기, 숲: 루미 빛 비추기·반딧불 소리 순서, 두 번째 광장: 노란 길 깔기·별 끌어 올리기,
// 숨은 별가루 10개 (다 모으면 엔딩 뒤 별자리), ESC "이 퍼즐 바로 풀기". 틀려도 실패 소리 없음, 맞으면 저절로 열림
'use strict';
G.p4 = (() => {
  const P = {};
  const done = (m) => G.st.done.includes(m);
  const mark = (m) => { if (m && !done(m)) { G.st.done.push(m); G.save.write(); } };
  const has = (id) => G.st.items.includes(id);
  const PZ = () => G.D.puzzles;
  let cur = null;   // 지금 하는 퍼즐 { solve } (교사용 "이 퍼즐 바로 풀기")
  P.can = () => !!cur;
  P.skip = () => { if (cur && cur.solve) cur.solve(); };
  P.reset = () => { cur = null; };   // 챕터 바로 가기: 하던 퍼즐을 잊음

  // 아이템 그림: 선생님 그림(art/item_…)이 있으면 그것을 (점자 쪽지)
  const icon0 = G.icon;
  G.icon = (n, c = '') => { const a = /^item_/.test(n) && G.art(n); return a ? `<img class="ico${c ? ' ' + c : ''}" src="${a}" alt="">` : icon0(n, c); };

  // ---- 퍼즐 화면 틀 (puzzle.js와 같은 모양): 위쪽 할 일 + 루미 말풍선, 왼쪽 아래 [루미] ----
  function screen(cls, task) {
    const root = G.el('div', 'puzzle p4 ' + cls, G.$('#world'));
    const top = G.el('div', 'pz-top', root);
    if (task) { const t = G.el('button', 'quest pz-task', top); t.type = 'button'; G.el('div', 'q2', t, G.txt(task)); G.onTap(t, () => G.audio.voice(task)); }
    const sayEl = G.el('div', 'pz-say', top); sayEl.style.display = 'none';
    const bl = G.el('div', 'pz-bl', root);
    const lb = G.el('button', 'lumi-btn', bl); lb.type = 'button'; lb.setAttribute('aria-label', '루미 도움');
    const li = G.el('img', '', lb); li.src = G.asset('assets/chars/lumi.png'); li.alt = ''; G.el('span', '', lb, '루미');
    G.onTap(lb, () => G.help.now());
    const hud = cls !== 'p4-door'; if (hud) G.hud.hide(true);   // 퍼즐 동안 모서리 버튼 숨김
    let tok = 0, last = null;
    const S = { root, top, layout: null };
    S.say = async (id) => { const my = ++tok; sayEl.textContent = G.txt(id); sayEl.style.display = ''; await G.audio.voice(id); await G.wait(1.2); if (my === tok) sayEl.style.display = 'none'; };
    S.hush = () => { tok++; sayEl.style.display = 'none'; };
    const re = () => S.layout && S.layout();
    const w = G.every(() => { if (!root.isConnected) { w(); G.resizers.delete(re); return; } const a = !!G.dialog.active; if (a !== last) { last = a; root.classList.toggle('talk', a); requestAnimationFrame(re); } });
    G.resizers.add(re);
    S.end = () => { w(); G.resizers.delete(re); root.remove(); G.help.off(); cur = null; if (hud) G.hud.hide(false); };
    return S;
  }
  // 그림 판 (W x H 판 좌표) → 화면 네모 안에 맞춤
  function board(parent, W, H, cls) {
    const el = G.el('div', 'p4-board ' + (cls || ''), parent); el.style.width = W + 'px'; el.style.height = H + 'px';
    const B = { el, W, H, k: 1, x: 0, y: 0 };
    B.fit = ([x, y, w, h], cover) => { const k = (cover ? Math.max : Math.min)(w / W, h / H); B.k = k; B.x = x + (w - W * k) / 2; B.y = y + (h - H * k) / 2; el.style.transform = `translate(${B.x.toFixed(1)}px,${B.y.toFixed(1)}px) scale(${k.toFixed(4)})`; };
    B.at = (e) => { const r = el.getBoundingClientRect(); return [(e.clientX - r.left) * W / r.width, (e.clientY - r.top) * H / r.height]; };   // 화면 → 판 좌표
    return B;
  }
  // 할 일 줄 아래, 대화창 위의 빈 곳 (화면 좌표)
  function area(S) {
    const { W, H, u } = G.stage, rr = S.root.getBoundingClientRect();
    const t = S.top.getBoundingClientRect().bottom - rr.top + u * 12, box = G.$('.dlg-box');
    const b = G.dialog.active && box ? rr.bottom - box.getBoundingClientRect().top + u * 16 : u * 30;
    return [u * 30, t, W - u * 60, Math.max(60, H - t - b)];
  }
  const arrowAt = (parent, x, y) => { const a = G.el('div', 'arrow p4-arrow', parent, G.arrowHtml()); a.style.left = x + 'px'; a.style.top = y + 'px'; return a; };
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const spark = (el, n = 10) => { const r = el.getBoundingClientRect(), ov = G.$('#overlay'); if (G.settings && G.settings.light) n = 4;
    for (let i = 0; i < n; i++) { const s = G.el('div', 'spk', ov, G.sparkle()); s.style.left = (r.left + r.width / 2) + 'px'; s.style.top = (r.top + r.height / 2) + 'px';
      const a = Math.PI * 2 * i / n, R = G.stage.u * (90 + Math.random() * 90); G.tween(0, 1, 0.9, k => { s.style.transform = `translate(${Math.cos(a) * R * k}px,${Math.sin(a) * R * k}px) scale(${1 - k * .6})`; s.style.opacity = 1 - k; }, 'out').then(() => s.remove()); } };

  // ---- 끌기: el을 끌어 targets() 중 하나에 놓으면 onDrop(target). 조금만 움직이면 그냥 누르기(onTap) ----
  const near = (t, e, m = 24) => { const r = t.getBoundingClientRect(); return e.clientX > r.left - m && e.clientX < r.right + m && e.clientY > r.top - m && e.clientY < r.bottom + m; };
  P.dragTo = (el, targets, onDrop, o = {}) => {
    let st = null; el.style.touchAction = 'none';
    el.addEventListener('pointerdown', (e) => { if (G.paused || G.dialog.active || (o.can && !o.can())) return; st = { x: e.clientX, y: e.clientY, id: e.pointerId, gh: null }; try { el.setPointerCapture(e.pointerId); } catch (_) { } });
    el.addEventListener('pointermove', (e) => {
      if (!st || e.pointerId !== st.id) return;
      const dx = e.clientX - st.x, dy = e.clientY - st.y;
      if (!st.gh) {
        if (Math.hypot(dx, dy) < 12) return;
        const r = el.getBoundingClientRect(); st.gh = G.el('div', 'p4-ghost', document.body, el.innerHTML);
        Object.assign(st.gh.style, { left: r.left + 'px', top: r.top + 'px', width: r.width + 'px', height: r.height + 'px' }); el.classList.add('dragging'); G.help.poke();
      }
      st.gh.style.transform = `translate(${dx}px,${dy}px) scale(1.08)`;
      for (const t of targets()) t.classList.toggle('drop-on', near(t, e));
    });
    const up = (e) => {
      if (!st || e.pointerId !== st.id) return;
      const s = st; st = null; el.classList.remove('dragging'); if (!s.gh) return;
      G._suppressClick = true; setTimeout(() => G._suppressClick = false, 60);
      const ts = targets(), t = ts.find(q => near(q, e)); ts.forEach(q => q.classList.remove('drop-on')); s.gh.remove();
      if (t) onDrop(t, e);
    };
    el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);
  };

  // ---- 아이템 끌어 쓰기: 가방 칸에 아이템이 나오고, 끌어서 대상에 대거나 대상을 누름 ----
  P.useItem = (id, target, o = {}) => new Promise((res) => {
    const it = G.D.items.find(x => x.id === id), g = G.gen; if (!it) return res(true);
    const tray = G.el('div', 'p4-tray', o.parent || G.$('#overlay'));
    G.el('div', 'p4-tray-head', tray, G.icon('icon_bag') + ' 가방');
    const b = G.btn('p4-item', G.icon(it.icon), tray, () => { G.audio.sfx('sfx_tap', 0.5); b.classList.add('sel'); target.classList.add('p4-target-on'); }, it.name);
    target.classList.add('p4-target');
    let fin = false, arrow = null;
    const onT = (e) => { if (fin || G.dialog.active || G.paused) return; e.stopImmediatePropagation(); use(); };
    target.addEventListener('click', onT, true);
    P.dragTo(b, () => [target], () => use());
    const clear = () => { if (arrow) arrow.remove(); arrow = null; b.classList.remove('hint'); target.classList.remove('p4-target-on'); };
    async function use() {
      if (fin) return; fin = true; G.help.off(); clear(); cur = null;
      target.removeEventListener('click', onT, true); target.classList.remove('p4-target');
      const r0 = b.getBoundingClientRect(), r1 = target.getBoundingClientRect(), fly = G.el('div', 'p4-ghost', document.body, G.icon(it.icon));
      Object.assign(fly.style, { left: r0.left + 'px', top: r0.top + 'px', width: r0.width + 'px', height: r0.height + 'px' }); tray.remove();
      const dx = r1.left + r1.width / 2 - (r0.left + r0.width / 2), dy = r1.top + r1.height / 2 - (r0.top + r0.height / 2);
      await G.tween(0, 1, G.reduced() ? 0.2 : 0.55, k => { fly.style.transform = `translate(${dx * k}px,${dy * k - Math.sin(k * Math.PI) * 60}px) scale(${1 - k * 0.3})`; }, 'io');
      fly.remove(); G.audio.sfx('sfx_chime', 0.6); spark(target, 8);
      res(g === G.gen);
    }
    cur = { solve: use };
    G.help.set({
      l1: () => o.say && o.say(o.hint),
      l2: () => { if (arrow) return; const r = b.getBoundingClientRect(), pr = tray.getBoundingClientRect(); arrow = arrowAt(tray, r.left - pr.left + r.width / 2, r.top - pr.top); },
      l3: () => { b.classList.add('hint'); target.classList.add('p4-target-on'); },
      clear,
    });
  });

  // ---- 도서관 문: 지도에서 도서관을 누르면 먼저 이 화면 ----
  P.calling = () => !!G.st && done('libdoor_seen') && !has('note') && !done('libdoor_open');
  P.gate = (p) => { if (!p.gate || done(p.gate)) return false; door(); return true; };
  P.mapMarks = (V) => {   // 촌장에게 물어보러 가야 할 때 광장 위에 물음표
    const k = V.markers && V.markers.plaza; if (!k) return;
    // 10/1 선생님: 지도 받침대 위 별은 없앰 → 모은 별은 '밤하늘 보기'(hud.js)
    if (done('plaza2_road') && !V.fx.querySelector('.p4-mpole')) { const e = poleImg(V.fx, 'p4-mpole'); e.style.zIndex = LIBPOLE[1]; }   // 도서관 앞 안내 기둥
    let q = V.fx.querySelector('.p4-q');
    if (!P.calling()) { if (q) q.remove(); return; }
    if (!q) { q = G.el('div', 'p4-q', V.fx, G.artImg('mark_question') || '?'); q.style.left = k.p.marker[0] + 'px'; q.style.top = (k.p.marker[1] - 110) + 'px'; }
  };
  // 10/1 선생님: 안내 기둥은 도서관 앞에 세움. 마을 지도로 시점이 도서관에 갔다가 광장으로 돌아옴
  const LIBPOLE = [1060, 590], POLE_WH = [36, 151], CAM_PLAZA = [1300, 700], CAM_LIB = [1080, 500];
  const poleImg = (parent, cls) => { const e = G.el('img', cls, parent); e.src = G.asset('assets/scenes/plaza2_pole.png'); e.alt = ''; Object.assign(e.style, { left: (LIBPOLE[0] - POLE_WH[0] / 2) + 'px', top: (LIBPOLE[1] - POLE_WH[1]) + 'px', width: POLE_WH[0] + 'px', height: POLE_WH[1] + 'px' }); return e; };
  async function libPole() {
    const ov = G.$('#overlay'), { W, H } = G.stage, M = G.D.places.map, rm = G.reduced();
    const box = G.el('div', 'p4-libview', ov), w = G.el('div', 'p4-lv-world', box), im = G.el('img', '', w); im.src = G.asset(M.color); im.alt = '';
    Object.assign(w.style, { width: M.width + 'px', height: M.height + 'px' });
    const pole = poleImg(w, 'p4-lv-pole'); pole.style.clipPath = 'inset(100% 0 0 0)';
    const s = Math.max(W / 1000, H / 560);   // 도서관이 크게 보이게
    const cam = (x, y) => { w.style.transform = `translate(${(W / 2 - x * s).toFixed(1)}px,${(H / 2 - y * s).toFixed(1)}px) scale(${s.toFixed(4)})`; };
    const go = (a, b, k) => cam(a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k);
    cam(...CAM_PLAZA); box.style.opacity = 0;
    await G.tween(0, 1, 0.4, k => box.style.opacity = k);
    await G.tween(0, 1, rm ? 0.3 : 1.6, k => go(CAM_PLAZA, CAM_LIB, k), 'io');
    G.audio.sfx('sfx_door', 0.5);
    await G.tween(0, 1, rm ? 0.3 : 1.2, q => { pole.style.clipPath = `inset(${(1 - q) * 100}% 0 0 0)`; pole.style.transform = `translateY(${(1 - q) * 20}px)`; }, 'out');
    pole.style.clipPath = ''; pole.style.transform = ''; G.audio.sfx('sfx_chime', 0.7);
    G.waveMark(w, LIBPOLE[0] + 26, LIBPOLE[1] - POLE_WH[1] * 0.85, 2);
    await G.wait(1.0);
    await G.tween(0, 1, rm ? 0.3 : 1.4, k => go(CAM_LIB, CAM_PLAZA, k), 'io');
    await G.tween(1, 0, 0.4, k => box.style.opacity = k);
    box.remove();
  }
  const PLATE = [738, 355, 124, 201];   // 문 그림(1376x768)의 빈 금속판 자리
  async function door() {
    const g = G.gen, ok = () => g === G.gen;
    G.busy++; G.$('#fade').classList.add('on'); await G.wait(0.45); G.busy = Math.max(0, G.busy - 1); if (!ok()) return;
    G.map.hide(); G.hud.clear(); G.screen = 'door';
    const S = screen('p4-door', null);
    const B = board(S.root, 1376, 768, 'p4-doorbg'); B.el.style.backgroundImage = `url("${G.art('door_library_locked') || G.art('library_door')}")`;
    const plate = G.el('button', 'p4-plate', B.el, G.artImg('lock_braille') || ''); plate.type = 'button'; plate.setAttribute('aria-label', '점자 자물쇠');
    Object.assign(plate.style, { left: PLATE[0] + 'px', top: PLATE[1] + 'px', width: PLATE[2] + 'px', height: PLATE[3] + 'px' });
    const tr = G.el('div', 'pz-tr', S.root);
    G.btn('pill', G.icon('icon_map') + ' 지도로', tr, () => leave(), '지도로');
    S.layout = () => B.fit([0, 0, G.stage.W, G.stage.H], true); S.layout();
    let step = true;
    G.onTap(plate, () => { if (!step && !has('note')) G.dialog.play(['E05_rumi_02', 'E05_rumi_03']); });
    async function leave() {
      if (step || G.dialog.active || !ok()) return;
      S.end(); G.$('#fade').classList.add('on'); await G.wait(0.45); await G.map.show(); G.$('#fade').classList.remove('on');
    }
    G.$('#fade').classList.remove('on'); await G.wait(0.3); if (!ok()) return;
    G.audio.sfx('sfx_click', 0.6);
    plate.animate && plate.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(-6px)' }, { transform: 'translateX(6px)' }, { transform: 'translateX(0)' }], { duration: 300 });
    if (!has('note')) {   // 쪽지가 없음: 촌장님께 여쭤보러 → 지도의 광장에 물음표
      await G.dialog.play(done('libdoor_seen') ? ['E05_rumi_01', 'E05_rumi_03'] : ['E05_rumi_01', 'E05_rumi_02', 'E05_rumi_03']); if (!ok()) return;
      mark('libdoor_seen'); step = false; await G.wait(0.3); return leave();
    }
    if (!done('libdoor_seen')) { await G.dialog.play(['E05_rumi_01', 'E05_rumi_02']); if (!ok()) return; mark('libdoor_seen'); }
    await G.dialog.play(['E05_rumi_04']); if (!ok()) return;
    step = false;
    const used = await P.useItem('note', plate, { parent: S.root, say: S.say, hint: 'E90_hint_05' }); if (!ok() || !used) return;
    step = true;
    const won = await lockPuzzle(S); if (!ok() || !won) return;
    await G.dialog.play(['E05_rumi_07']); if (!ok()) return;
    mark('libdoor_open'); mark('libdoor_seen');
    S.end(); G.$('#fade').classList.add('on'); await G.wait(0.45); if (!ok()) return;
    G.scene.enter('library');   // 처음이면 연출 C4 (문이 열림)
  }

  // ---- 점자 자물쇠 (쪽지 「열림」과 똑같이) ----
  const WIN = [[168, 258], [318, 258], [468, 258], [614, 258]], WW = 117, WH = 182;   // 자물쇠 판 그림(900x672)의 네 칸 창
  const DOTXY = { 1: [.3, .2], 2: [.3, .5], 3: [.3, .8], 4: [.7, .2], 5: [.7, .5], 6: [.7, .8] };
  function lockPuzzle(S) {
    return new Promise((res) => {
      const L = PZ().lock, easy = !G.lv('normal'), g = G.gen, ok = () => g === G.gen;
      const blank = G.lv('hard') ? [0, 1, 2, 3] : L.blankNormal;
      const wrap = G.el('div', 'p4-lock' + (easy ? ' easy' : ''), S.root);
      const note = G.el('div', 'p4-note', wrap);
      G.el('div', 'p4-note-head', note, G.icon('item_braille_note') + ' 촌장님 쪽지');
      G.el('div', 'p4-note-dots', note, G.braille.svg(L.cells, 40));
      const main = G.el('div', 'p4-lock-main', wrap);
      let fin = false, arrow = null; const cells = [], plates = [];
      const same = (a, b) => a.length === b.length && a.every(x => b.includes(x));
      if (easy) {   // 판 3장 중 쪽지와 같은 점자 찾기
        for (const c of shuffle([L.cells, ...L.decoys])) {
          const p = G.btn('p4-bplate', G.braille.svg(c, 30), main, () => pick(p), '점자 판'); p.cells = c; plates.push(p);
          const a = G.art('braille_plate'); if (a) p.style.backgroundImage = `url("${a}")`;
        }
      } else {   // 자물쇠 판의 네 칸: 빈 칸은 점을 눌러 올림 (푸시팝)
        const lk = G.el('div', 'p4-lockplate', main, G.artImg('lock_braille') || '');
        L.cells.forEach((want, i) => {
          const c = G.el('div', 'p4-cell', lk), open = blank.includes(i), on = new Set(open ? [] : want);
          Object.assign(c.style, { left: (WIN[i][0] / 9) + '%', top: (WIN[i][1] / 6.72) + '%', width: (WW / 9) + '%', height: (WH / 6.72) + '%' });
          const C = { el: c, want, on, open, dots: {} }; cells.push(C);
          for (let d = 1; d <= 6; d++) {
            const b = G.el(open ? 'button' : 'div', 'p4-dot' + (on.has(d) ? ' on' : '') + (open ? '' : ' fixed'), c); b.style.left = (DOTXY[d][0] * 100) + '%'; b.style.top = (DOTXY[d][1] * 100) + '%';
            if (open) { b.type = 'button'; b.setAttribute('aria-label', '점 ' + d); G.onTap(b, () => press(C, d)); }
            C.dots[d] = b;
          }
          if (open) c.classList.add('open');
        });
      }
      S.layout = () => {
        const [x, y, w, h] = area(S); Object.assign(wrap.style, { left: x + 'px', top: y + 'px', width: w + 'px', height: h + 'px' });
        const side = w > h * 1.25, nw = side ? Math.min(w * 0.3, h * 0.9) : Math.min(w * 0.6, h * 0.28 * 2.4);
        wrap.classList.toggle('col', !side); note.style.width = nw + 'px';
        const mw = side ? w - nw - G.stage.u * 40 : w, mh = side ? h : h - note.getBoundingClientRect().height - G.stage.u * 20;
        if (easy) { const pw = Math.min(mw / 3.3, mh * 1.2); plates.forEach(p => { p.style.width = pw + 'px'; p.style.height = (pw * 0.75) + 'px'; }); }
        else { const lw = Math.min(mw, mh * 900 / 672); main.firstChild.style.width = lw + 'px'; main.firstChild.style.height = (lw * 672 / 900) + 'px'; }
        if (arrow) placeArrow();
      };
      S.layout(); requestAnimationFrame(S.layout);
      wrap.animate && wrap.animate([{ opacity: 0, transform: 'scale(.92)' }, { opacity: 1, transform: 'none' }], { duration: 400, easing: 'ease-out' });
      function press(C, d) {
        if (fin || G.dialog.active) return;
        clear();
        if (C.on.has(d)) C.on.delete(d); else C.on.add(d);
        C.dots[d].classList.toggle('on', C.on.has(d));
        G.audio.sfx('sfx_click', 0.5, C.on.has(d) ? 1.15 : 0.85);
        if (cells.every(c => same([...c.on], c.want))) win();
      }
      async function pick(p) {
        if (fin || G.dialog.active) return;
        clear(); G.audio.sfx('sfx_tap', 0.5);
        if (p === rightPlate()) { p.classList.add('right'); return win(); }
        p.animate && p.animate([{ transform: 'rotate(0)' }, { transform: 'rotate(-3deg)' }, { transform: 'rotate(3deg)' }, { transform: 'rotate(0)' }], { duration: 350 });
        note.classList.remove('look'); void note.offsetWidth; note.classList.add('look');
        S.say('E05_rumi_06');
      }
      async function win() {
        if (fin) return; fin = true; G.help.off(); cur = null; clear(); S.hush();
        wrap.classList.add('open');
        for (const c of cells) { c.el.classList.add('lit'); G.audio.sfx('sfx_chime', 0.35, 0.9 + cells.indexOf(c) * 0.12); await G.wait(G.reduced() ? 0.05 : 0.3); }
        G.audio.sfx('sfx_door', 0.7); spark(main.firstChild || main, 14);
        await G.wait(0.9); wrap.remove(); S.layout = null;
        res(ok());
      }
      // 도움: 1 말 → 2 화살표 (고칠 점, 같은 판) → 3 고칠 점이 모두 반짝
      const wrongDots = () => cells.flatMap(c => [1, 2, 3, 4, 5, 6].filter(d => c.open && (c.on.has(d) !== c.want.includes(d))).map(d => c.dots[d]));
      const rightPlate = () => plates.find(p => p.cells.every((c, i) => same(c, L.cells[i])));
      function placeArrow() { const t = easy ? rightPlate() : wrongDots()[0]; if (!t) return; const r = t.getBoundingClientRect(), rr = S.root.getBoundingClientRect(); arrow.style.left = (r.left - rr.left + r.width / 2) + 'px'; arrow.style.top = (r.top - rr.top) + 'px'; }
      function clear() { if (arrow) arrow.remove(); arrow = null; S.root.querySelectorAll('.p4 .hint').forEach(e => e.classList.remove('hint')); }
      G.help.set({
        l1: () => S.say(easy ? 'E05_rumi_06' : 'E05_rumi_05'),
        l2: () => { if (arrow) return; arrow = arrowAt(S.root, 0, 0); placeArrow(); },
        l3: () => { if (easy) { const p = rightPlate(); if (p) p.classList.add('hint'); } else wrongDots().forEach(d => d.classList.add('hint')); },
        clear,
      });
      cur = { solve: () => { if (easy) { const p = rightPlate(); if (p) { p.classList.add('right'); win(); } } else { cells.forEach(c => { c.on = new Set(c.want); for (let d = 1; d <= 6; d++) c.dots[d].classList.toggle('on', c.on.has(d)); }); win(); } } };
      G.dialog.play([easy ? 'E05_rumi_06' : 'E05_rumi_05']);
    });
  }

  // ---- 장소 장면에 들어갈 때 (scene.js): 숨은 별가루, 어두운 숲 ----
  P.enter = (V, def, id) => {
    dust(V, def, id);
    const ch = id === 'plaza' && P.calling() && def.hotspots.find(h => h.id === 'chief');   // 10/1 선생님: 쪽지를 받으러 다시 왔을 때 촌장님 머리 위에 노란 물음표
    if (ch) { const q = G.el('div', 'mstar p4-askq', V.fx, G.artImg('mark_question') || '?'); q.style.left = (ch.rect[0] + ch.rect[2] / 2) + 'px'; q.style.top = (ch.rect[1] - 6) + 'px'; }
    if (def.dark && !done('forest_wind')) dark(V, def);
  };
  const dustSt = () => G.st.dust || (G.st.dust = []);
  const total = () => (G.D.story && G.D.story.dustTotal) || 10;
  const NEED = (G.D.story && G.D.story.dustNeed) || 5;
  P.dustNeed = NEED;
  function dust(V, def, id) {
    const key = def.dustKey || id;
    (def.dust || []).forEach(([x, y], i) => {
      const k = key + ':' + i; if (dustSt().includes(k)) return;
      const b = G.el('button', 'p4-dust' + (G.lv('hard') ? ' dim' : ''), V.fx, G.artImg('stardust') || G.sparkle()); b.type = 'button'; b.setAttribute('aria-label', '별가루');
      Object.assign(b.style, { left: x + 'px', top: y + 'px', animationDelay: (-Math.random() * 3).toFixed(2) + 's' });
      G.onTap(b, () => {
        if (G.busy > 0 || G.dialog.active || dustSt().includes(k)) return;
        b.style.pointerEvents = 'none';
        if (b.animate) b.animate([{ transform: 'translate(-50%,-50%) scale(1)', opacity: 1 }, { transform: 'translate(-50%,-110%) scale(1.8)', opacity: 0 }], { duration: 700, easing: 'ease-out', fill: 'forwards' });
        setTimeout(() => b.remove(), 720);
        gain(k, b, V.fx, x, y);
      });
    });
  }
  // 10/1 선생님: 물건(천막·책장·분수)을 누르면 그 안에서 별가루가 튀어나옴 (scene.js가 누를 곳 이야기 뒤에 부름)
  P.afterHot = async (H, V, def, id) => {
    const h = H.def; if (!(def.dustHot || []).includes(h.id)) return;
    const k = (def.dustKey || id) + ':h:' + h.id; if (dustSt().includes(k)) return;
    const [x, y, w] = h.rect, cx = x + w / 2, cy = y + 20;
    const d = G.el('div', 'p4-dust pop', V.fx, G.artImg('stardust') || G.sparkle()); Object.assign(d.style, { left: cx + 'px', top: cy + 'px', pointerEvents: 'none' });
    G.audio.sfx('sfx_sparkle', 0.6);
    if (d.animate) await d.animate([{ transform: 'translate(-50%,-50%) scale(.3)', opacity: 0 }, { transform: 'translate(-50%,-160%) scale(1.3)', opacity: 1, offset: 0.5 }, { transform: 'translate(-50%,-220%) scale(1.6)', opacity: 0 }], { duration: G.reduced() ? 300 : 1000, easing: 'ease-out' }).finished.catch(() => { });
    d.remove(); await gain(k, H.btn, V.fx, cx, cy);
  };
  // 10/1 선생님: 지도에서 말을 건 주민이 별가루를 줌 (worldmap.js가 주민 말 뒤에 부름)
  P.villagerDust = async (vid, el, fx, x, y) => {
    const line = ((G.D.story || {}).dustGive || {})[vid], k = 'map:' + vid; if (!line || dustSt().includes(k)) return;
    await G.dialog.play([].concat(line), { partner: G.D.portraits[vid] ? vid : undefined });
    await gain(k, el, fx, x, y);
  };
  P.villagerHas = (vid) => !!(((G.D.story || {}).dustGive || {})[vid]) && !!G.st && !dustSt().includes('map:' + vid);
  // 별가루 하나 얻기: 반짝 + 몇 개인지 + 처음·다섯 번째에는 루미가 알려 줌
  async function gain(k, el, fx, x, y) {
    dustSt().push(k); G.save.write(); G.audio.sfx('sfx_sparkle', 0.8); if (el) spark(el, 8);
    const n = dustSt().length, starUp = done('plaza2_star'), shown = !starUp && n <= NEED ? `${n}/${NEED}` : `${n}/${total()}`;
    if (fx) { const pop = G.el('div', 'p4-dust-pop', fx, (G.artImg('stardust') || '') + '<span>별가루 ' + shown + '</span>'); pop.style.left = x + 'px'; pop.style.top = (y - 70) + 'px'; setTimeout(() => pop.remove(), 2400); }
    if (n === 1) await G.dialog.play(['E00_dust_01', 'E00_dust_02']);
    else if (n === NEED && !starUp) await G.dialog.play(['E00_dust_03']);
    else G.hud.say('E00_dust_01');
    if (n >= total() && G.st.cleared.includes('plaza2')) setTimeout(bonus, 600);
  }
  P.dustLine = (sh) => { const n = (G.st.dust || []).length; G.el('div', 'p4-bagdust', sh, (G.artImg('stardust') || '') + `<span>별가루 ${n}/${total()}</span>`); };

  // ---- 어두운 숲: 루미를 끌면 빛이 따라감, 덤불 B에 가까울수록 바람 소리가 큼. 덤불을 열면 밝아짐 ----
  let lift = null;
  function dark(V, def) {
    const D = def.dark, lv = G.level(), R = D.r[lv] || 330, A = D.a[lv] || 0.86, W = def.wind || [1200, 386];
    const ls = def.sprites.find(s => s.lumi), L0 = ls ? ls.lumi : [1200, 700];
    const d = G.el('div', 'p4-dark', V.fx); d.style.width = V.W + 'px'; d.style.height = V.H + 'px';
    const L = { x: L0[0], y: L0[1] }, T = { x: L0[0], y: L0[1] };
    const draw = () => {
      d.style.background = `radial-gradient(circle ${R}px at ${L.x.toFixed(0)}px ${L.y.toFixed(0)}px, rgba(6,8,24,0) 0%, rgba(6,8,24,0) 40%, rgba(6,8,24,${A}) 100%)`;
      if (V.lumi) V.lumi.style.transform = `translate(${(L.x - L0[0]).toFixed(0)}px,${(L.y - L0[1]).toFixed(0)}px)`;
    };
    draw();
    const hb = def.hotspots.find(h => h.id === 'bushB'); if (hb) hb.hint = 'E90_hint_07';   // 어두울 때 도움 말
    const toScene = (e) => { const r = V.el.getBoundingClientRect(); return [(e.clientX - r.left) * V.W / r.width, (e.clientY - r.top) * V.H / r.height]; };
    const mv = (e) => { if (e.type === 'pointermove' && !e.buttons && e.pointerType !== 'mouse') return; if (G.dialog.active) return; [T.x, T.y] = toScene(e); };
    V.el.addEventListener('pointerdown', mv); V.el.addEventListener('pointermove', mv);
    let t = 1.2;
    const off = G.every((dt) => {
      if (!V.el.isConnected) { off(); return; }
      const k = Math.min(1, dt * 6); L.x += (T.x - L.x) * k; L.y += (T.y - L.y) * k; draw();
      if (G.dialog.active || G.paused || G.busy > 0) return;
      t -= dt; if (t > 0) return; t = 1.6;
      const dist = Math.hypot(L.x - W[0], L.y - W[1]);
      G.audio.sfx('sfx_wind', 0.12 + 0.88 * Math.max(0, 1 - dist / 1100));
    });
    lift = () => {
      off(); V.el.removeEventListener('pointerdown', mv); V.el.removeEventListener('pointermove', mv); lift = null;
      G.tween(1, 0, G.reduced() ? 0.2 : 1.4, k => d.style.opacity = k, 'io').then(() => d.remove());
      if (V.lumi) { V.lumi.style.transition = 'transform 1s'; V.lumi.style.transform = ''; }
    };
  }

  // ---- 광장 게시판 닦기: 손가락으로 문지르면 먼지가 지워짐 (60%가 넘으면 저절로) ----
  function wipe() {
    return new Promise((res) => {
      const g = G.gen, ok = () => g === G.gen, S = screen('p4-wipe', 'E90_hint_03b');
      const BW = 1458, BH = 672, B = board(S.root, BW, BH, 'p4-wboard');
      if (G.art('board_front')) B.el.style.backgroundImage = `url("${G.art('board_front')}")`;
      for (const [x, y, w, h] of [[150, 110, 330, 230], [560, 90, 360, 260], [1000, 120, 300, 220], [300, 390, 420, 190], [820, 400, 470, 170]]) {
        const n = G.el('div', 'p4-paper', B.el); Object.assign(n.style, { left: x + 'px', top: y + 'px', width: w + 'px', height: h + 'px', transform: `rotate(${(Math.random() * 4 - 2).toFixed(1)}deg)` });
        for (let i = 0; i < Math.floor(h / 40); i++) { const l = G.el('i', '', n); l.style.width = (50 + Math.random() * 45) + '%'; }
      }
      const cv = G.el('canvas', 'p4-dustcv', B.el), CW = 729, CH = 336; cv.width = CW; cv.height = CH;
      const cx = cv.getContext('2d');
      cx.fillStyle = '#8c7d6a'; cx.fillRect(0, 0, CW, CH);
      for (let i = 0; i < 1400; i++) { const v = 90 + Math.random() * 70; cx.fillStyle = `rgba(${v + 20},${v + 8},${v - 10},${(0.2 + Math.random() * 0.4).toFixed(2)})`; cx.beginPath(); cx.arc(Math.random() * CW, Math.random() * CH, 2 + Math.random() * 9, 0, 7); cx.fill(); }
      const brush = { easy: 46, normal: 36, hard: 28 }[G.level()] || 36;
      let fin = false, last = null, moves = 0, snd = 0, arrow = null;
      cx.globalCompositeOperation = 'destination-out'; cx.lineCap = cx.lineJoin = 'round'; cx.lineWidth = brush * 2;
      const to = (e) => { const r = cv.getBoundingClientRect(); return [(e.clientX - r.left) * CW / r.width, (e.clientY - r.top) * CH / r.height]; };
      const rub = (a, b) => { cx.beginPath(); cx.moveTo(a[0], a[1]); cx.lineTo(b[0] + 0.1, b[1]); cx.stroke(); };
      cv.style.touchAction = 'none';
      cv.addEventListener('pointerdown', (e) => { if (fin || G.dialog.active) return; G.help.poke(); clear(); last = to(e); rub(last, last); try { cv.setPointerCapture(e.pointerId); } catch (_) { } });
      cv.addEventListener('pointermove', (e) => {
        if (fin || !last || G.dialog.active) return; const p = to(e); rub(last, p); last = p;
        if (G.t - snd > 0.35) { snd = G.t; G.audio.sfx('sfx_page', 0.25, 0.8 + Math.random() * 0.4); }
        if (++moves % 10 === 0) check();
      });
      const up = () => { last = null; check(); };
      cv.addEventListener('pointerup', up); cv.addEventListener('pointercancel', up);
      function check() {
        if (fin) return; const a = cx.getImageData(0, 0, CW, CH).data; let n = 0, c = 0;
        for (let i = 3; i < a.length; i += 4 * 7) { n++; if (a[i] < 40) c++; }
        if (c / n >= 0.6) win();
      }
      async function win() {
        if (fin) return; fin = true; cur = null; G.help.off(); clear();
        G.audio.sfx('sfx_sparkle', 0.7);
        await G.tween(1, 0, 0.6, k => cv.style.opacity = k, 'io'); spark(B.el, 12);
        await G.wait(0.6); S.end(); res(ok());
      }
      S.layout = () => B.fit(area(S)); S.layout(); requestAnimationFrame(S.layout);
      function clear() { if (arrow) arrow.remove(); arrow = null; }
      G.help.set({
        l1: () => S.say('E90_hint_03b'),
        l2: () => { if (arrow) return; const r = B.el.getBoundingClientRect(), rr = S.root.getBoundingClientRect(); arrow = arrowAt(S.root, r.left - rr.left + r.width / 2, r.top - rr.top + r.height / 2); },
        l3: () => { rub([CW * 0.1, CH * 0.5], [CW * 0.9, CH * 0.5]); check(); },
        clear,
      });
      cur = { solve: () => { cx.clearRect(0, 0, CW, CH); win(); } };
    });
  }

  // ---- 시장: 찢어진 지도 맞추기 (조각을 끌어 제자리에, 가까이 가면 저절로 붙음) ----
  function jigsaw() {
    return new Promise((res) => {
      const D = PZ().jigsaw, [cols, rows] = D.grid[G.level()] || [2, 2], g = G.gen, ok = () => g === G.gen;
      const S = screen('p4-jig', 'E90_hint_04'), IW = 1200, IH = 896, VW = 2140, VH = 1000, OX = 40, OY = 52, TX = 1320;
      const B = board(S.root, VW, VH, 'p4-jboard'), img = G.art(D.img) || G.art('popup_map');
      const ghost = G.el('div', 'p4-jghost', B.el); Object.assign(ghost.style, { left: OX + 'px', top: OY + 'px', width: IW + 'px', height: IH + 'px', backgroundImage: `url("${img}")` });
      const pw = IW / cols, ph = IH / rows, s = Math.min((VW - TX - 30) / (cols * pw), (VH - 60) / (rows * ph)) * 0.9;
      const pcs = [], order = shuffle([...Array(cols * rows).keys()]);
      let fin = false, sel = null, arrow = null;
      // 10/1 선생님: 진짜 찢어진 것처럼. 조각 사이 경계를 들쭉날쭉한 선으로 (이웃 조각은 같은 선을 나눠 가져 꼭 맞음)
      const M = Math.round(Math.min(pw, ph) * 0.12), amp = M * 0.8;
      const tear = (len, n) => { const a = [[0, 0]]; for (let k = 1; k < n; k++) a.push([len * (k + (Math.random() - 0.5) * 0.5) / n, (Math.random() * 2 - 1) * amp * (Math.random() < 0.25 ? 1 : 0.55)]); a.push([len, 0]); return a; };
      const VL = [], HL = [];   // VL[c]: c번째 세로 경계 (위→아래, 칸 경계마다 0), HL[r]: 가로 경계 (왼→오)
      for (let c = 1; c < cols; c++) { let a = []; for (let r = 0; r < rows; r++) a = a.concat(tear(ph, 7).slice(r ? 1 : 0).map(([t, o]) => [c * pw + o, r * ph + t])); VL[c] = a; }
      for (let r = 1; r < rows; r++) { let a = []; for (let c = 0; c < cols; c++) a = a.concat(tear(pw, 8).slice(c ? 1 : 0).map(([t, o]) => [c * pw + t, r * ph + o])); HL[r] = a; }
      const seg = (L, lo, hi, axis) => L.filter(q => q[axis] >= lo - 0.01 && q[axis] <= hi + 0.01);
      const shape = (c, r) => {
        const x0 = c * pw, y0 = r * ph, x1 = x0 + pw, y1 = y0 + ph;
        const top = r ? seg(HL[r], x0, x1, 0) : [[x0, y0], [x1, y0]];
        const right = c < cols - 1 ? seg(VL[c + 1], y0, y1, 1) : [[x1, y0], [x1, y1]];
        const bottom = (r < rows - 1 ? seg(HL[r + 1], x0, x1, 0) : [[x0, y1], [x1, y1]]).slice().reverse();
        const left = (c ? seg(VL[c], y0, y1, 1) : [[x0, y0], [x0, y1]]).slice().reverse();
        return 'polygon(' + [...top, ...right, ...bottom, ...left].map(([x, y]) => `${(x - x0 + M).toFixed(1)}px ${(y - y0 + M).toFixed(1)}px`).join(',') + ')';
      };
      for (let i = 0; i < cols * rows; i++) {
        const c = i % cols, r = Math.floor(i / cols), slot = G.el('div', 'p4-jslot torn', B.el), clip = shape(c, r);
        Object.assign(slot.style, { left: (OX + c * pw - M) + 'px', top: (OY + r * ph - M) + 'px', width: (pw + 2 * M) + 'px', height: (ph + 2 * M) + 'px', clipPath: clip, webkitClipPath: clip });
        const el = G.el('button', 'p4-piece torn', B.el); el.type = 'button'; el.setAttribute('aria-label', '지도 조각');
        const pc = G.el('div', 'p4-pc', el);
        Object.assign(el.style, { width: (pw + 2 * M) + 'px', height: (ph + 2 * M) + 'px' });
        Object.assign(pc.style, { backgroundImage: `url("${img}")`, backgroundSize: `${IW}px ${IH}px`, backgroundPosition: `${-(c * pw - M)}px ${-(r * ph - M)}px`, clipPath: clip, webkitClipPath: clip });
        const j = order.indexOf(i), tc = j % cols, tr = Math.floor(j / cols);
        const home = [TX + (tc + 0.5) * (VW - TX - 30) / cols - pw / 2 - M, 30 + (tr + 0.5) * (VH - 60) / rows - ph / 2 - M];
        const p = { i, el, slot, x: home[0], y: home[1], home, goal: [OX + c * pw - M, OY + r * ph - M], k: s, rot: Math.random() * 10 - 5, placed: false };
        put(p); pcs.push(p); drag(p);
        G.onTap(slot, () => { if (sel && !fin) { if (sel === p) place(p); else back(sel, true); } });
      }
      function put(p) { p.el.style.transform = `translate(${p.x.toFixed(1)}px,${p.y.toFixed(1)}px) rotate(${p.placed ? 0 : p.rot}deg) scale(${p.k})`; }
      function drag(p) {
        let st = null; p.el.style.touchAction = 'none';
        p.el.addEventListener('pointerdown', (e) => { if (fin || p.placed || G.dialog.active) return; G.help.poke(); clear(); st = { e: B.at(e), x: p.x, y: p.y, moved: false }; p.el.classList.add('lift'); try { p.el.setPointerCapture(e.pointerId); } catch (_) { } });
        p.el.addEventListener('pointermove', (e) => {
          if (!st) return; const [x, y] = B.at(e), dx = x - st.e[0], dy = y - st.e[1];
          if (!st.moved && Math.hypot(dx, dy) < 14) return;
          if (!st.moved) { st.moved = true; p.k = 1; }
          p.x = st.x + dx; p.y = st.y + dy; put(p);
        });
        const up = () => {
          if (!st) return; const m = st.moved; st = null; p.el.classList.remove('lift');
          if (!m) { sel = p; pcs.forEach(q => q.el.classList.toggle('sel', q === p)); G.audio.sfx('sfx_tap', 0.4); return; }
          G._suppressClick = true; setTimeout(() => G._suppressClick = false, 60);
          if (Math.hypot(p.x - p.goal[0], p.y - p.goal[1]) < Math.min(pw, ph) * 0.4) place(p); else back(p);
        };
        p.el.addEventListener('pointerup', up); p.el.addEventListener('pointercancel', up);
      }
      async function back(p, soft) { const a = [p.x, p.y], k0 = p.k; sel = null; p.el.classList.remove('sel'); await G.tween(0, 1, 0.35, k => { p.x = a[0] + (p.home[0] - a[0]) * k; p.y = a[1] + (p.home[1] - a[1]) * k; p.k = k0 + (s - k0) * k; put(p); }, 'out'); if (soft) S.say('E90_hint_04'); }
      async function place(p) {
        if (p.placed) return; p.placed = true; sel = null; p.el.classList.remove('sel'); p.el.classList.add('placed'); p.slot.classList.add('filled');
        const a = [p.x, p.y], k0 = p.k;
        await G.tween(0, 1, 0.25, k => { p.x = a[0] + (p.goal[0] - a[0]) * k; p.y = a[1] + (p.goal[1] - a[1]) * k; p.k = k0 + (1 - k0) * k; put(p); }, 'out');
        G.audio.sfx('sfx_click', 0.6); G.audio.sfx('sfx_chime', 0.3, 0.9 + pcs.filter(q => q.placed).length * 0.08);
        if (pcs.every(q => q.placed)) win();
      }
      async function win() {
        if (fin) return; fin = true; cur = null; G.help.off(); clear();
        ghost.style.opacity = 1; G.audio.sfx('sfx_sparkle', 0.7); spark(ghost, 12);
        await G.wait(1.0); S.end(); res(ok());
      }
      S.layout = () => B.fit(area(S)); S.layout(); requestAnimationFrame(S.layout);
      const next = () => pcs.find(q => !q.placed);
      function clear() { if (arrow) arrow.remove(); arrow = null; pcs.forEach(q => { q.el.classList.remove('hint'); q.slot.classList.remove('hint'); }); }
      G.help.set({
        l1: () => S.say('E90_hint_04'),
        l2: () => { const p = next(); if (!p || arrow) return; const r = p.el.getBoundingClientRect(), rr = S.root.getBoundingClientRect(); arrow = arrowAt(S.root, r.left - rr.left + r.width / 2, r.top - rr.top); },
        l3: () => { const p = next(); if (p) { p.el.classList.add('hint'); p.slot.classList.add('hint'); } },
        clear,
      });
      cur = { solve: () => pcs.filter(q => !q.placed).forEach(place) };
    });
  }

  // ---- 숲: 반딧불 소리 자물쇠 (빛 + 높이가 다른 종소리 순서를 보고 같은 순서로 누르기) ----
  const FF = { 2: [[190, 430], [1010, 430]], 3: [[170, 480], [600, 110], [1030, 480]], 4: [[160, 540], [320, 160], [880, 160], [1040, 540]] };   // 덤불 둘레 (휴대폰에서도 누르기 쉽게 크게)
  function fireflies() {
    return new Promise(async (res) => {
      const D = PZ().fireflies, n = D.n[G.level()] || 3, g = G.gen, ok = () => g === G.gen;
      const S = screen('p4-ff', 'E07_rumi_05'), B = board(S.root, 1200, 900, 'p4-ffboard');
      const bush = G.el('div', 'p4-bush', B.el, G.artImg('bush_closed') || ''), bushO = G.el('div', 'p4-bush open', B.el, G.artImg('bush_open') || '');
      const flies = FF[n].map(([x, y], i) => {
        const b = G.el('button', 'p4-fly', B.el, G.artImg('firefly') || '<i></i>'); b.type = 'button'; b.setAttribute('aria-label', '반딧불');
        Object.assign(b.style, { left: x + 'px', top: y + 'px', animationDelay: (-i * 0.7) + 's' });
        G.onTap(b, () => tap(i)); return b;
      });
      const seq = shuffle([...Array(n).keys()]);
      let pos = 0, showing = true, fin = false, arrow = null;
      S.layout = () => B.fit(area(S)); S.layout(); requestAnimationFrame(S.layout);
      const glow = async (i, d) => { const b = flies[i]; b.classList.add('lit'); G.audio.sfx('sfx_chime', 0.85, D.rate[i] || 1); await G.wait(d); b.classList.remove('lit'); };
      async function show(slow) {
        showing = true; clear(); await G.wait(0.4);
        for (const i of seq) { if (!ok() || fin) return; await glow(i, slow ? 1.0 : 0.6); await G.wait(slow ? 0.5 : 0.3); }
        showing = false; pos = 0;
      }
      async function tap(i) {
        if (showing || fin || G.dialog.active) return;
        clear(); glow(i, 0.45);
        if (seq[pos] === i) { pos++; if (pos >= seq.length) win(); return; }
        showing = true; pos = 0; await G.wait(0.6); if (!ok()) return;
        await G.dialog.play(['E07_rumi_06']); if (!ok()) return;
        await show(true);
      }
      async function win() {
        if (fin) return; fin = true; cur = null; G.help.off(); clear(); showing = true;
        await G.wait(0.5); flies.forEach((b, k) => { b.classList.add('lit', 'away'); b.style.transitionDelay = (k * 0.12) + 's'; });
        G.audio.sfx('sfx_sparkle', 0.8);
        await G.tween(0, 1, G.reduced() ? 0.2 : 1.0, k => { bushO.style.opacity = k; bush.style.opacity = 1 - k; }, 'io'); spark(bushO, 12);
        await G.wait(1.0); S.end(); res(ok());
      }
      function clear() { if (arrow) arrow.remove(); arrow = null; flies.forEach(b => b.classList.remove('hint')); }
      const nextFly = () => flies[seq[pos]];
      G.help.set({
        l1: () => { if (!showing) { S.say('E07_rumi_04'); show(false); } },
        l2: () => { if (showing || arrow) return; const r = nextFly().getBoundingClientRect(), rr = S.root.getBoundingClientRect(); arrow = arrowAt(S.root, r.left - rr.left + r.width / 2, r.top - rr.top); },
        l3: () => { if (!showing) nextFly().classList.add('hint'); },
        clear,
      });
      cur = { solve: () => win() };
      await G.dialog.play(['E07_rumi_04']); if (!ok()) return;
      await show(false); if (!ok()) return;
      await G.dialog.play(['E07_rumi_05']);
    });
  }

  // ---- 두 번째 광장: 노란 길 깔기 (기둥 앞·꺾이는 곳·문 앞 = 점 블록, 곧은 길 = 막대 블록) ----
  function tiles() {
    return new Promise(async (res) => {
      const D = PZ().tiles, g = G.gen, ok = () => g === G.gen, easy = !G.lv('normal'), hard = G.lv('hard');
      const S = screen('p4-tiles', 'E10_rumi_01'), CS = 180, OX = 220, OY = 150, B = board(S.root, 1400, 900, 'p4-tboard');
      const bgArt = G.art('tiles_bg'), K = 1.116, TX = -115, TY = 5;   // 10/1 선생님 그림(1264x848): 그림 속 길이 빈칸 자리에 오게
      if (bgArt) { B.el.classList.add('art'); Object.assign(B.el.style, { backgroundImage: `url("${bgArt}")`, backgroundSize: `${1264 * K}px ${848 * K}px`, backgroundPosition: `${TX}px ${TY}px` }); }
      const start = G.el('div', 'p4-tmark pole', B.el, G.icon('place_plaza') + '<span>광장</span>'); Object.assign(start.style, { left: (OX - 130) + 'px', top: (OY + 10) + 'px' });   // 10/1: 출발은 광장, 안내 기둥은 도서관 문 옆
      const last = D.cells[D.cells.length - 1].at, doorM = G.el('div', 'p4-tmark door', B.el, G.icon('place_library') + '<span>도서관 문</span>');
      Object.assign(doorM.style, { left: (OX + last[0] * CS + 10) + 'px', top: (OY + (last[1] + 1) * CS + 6) + 'px' });
      if (bgArt) Object.assign(doorM.style, { left: (OX + last[0] * CS - 300) + 'px', top: (TY + 760 * K) + 'px' });   // 그림 속 문 왼쪽에 이름표
      const pole = G.el('div', 'p4-tmark pole', B.el, (G.artImg('opt_bell') || '') + '<span>안내 기둥</span>'); Object.assign(pole.style, { left: (OX + (last[0] + 1) * CS + 10) + 'px', top: (OY + last[1] * CS + 10) + 'px' });
      const C = D.cells.map((d) => {
        const el = G.el('button', 'p4-tcell', B.el); el.type = 'button'; el.setAttribute('aria-label', '빈칸');
        Object.assign(el.style, { left: (OX + d.at[0] * CS) + 'px', top: (OY + d.at[1] * CS) + 'px', width: CS + 'px', height: CS + 'px' });
        const c = { d, el, type: null, rot: 0 }; G.onTap(el, () => tapCell(c)); return c;
      });
      const pal = G.el('div', 'p4-tpal', B.el); Object.assign(pal.style, { left: '1080px', top: '170px' });
      const kinds = { line: { art: 'block_line_top', label: '막대 블록' }, dot: { art: 'block_dot_top', label: '점 블록' } };
      let sel = null, fin = false, arrow = null;
      const palB = {};
      for (const k of ['line', 'dot']) {
        const b = G.btn('p4-tblock', (G.artImg(kinds[k].art) || '') + `<span>${kinds[k].label}</span>`, pal, () => { if (fin) return; sel = k; G.audio.sfx('sfx_tap', 0.5); for (const q in palB) palB[q].classList.toggle('sel', q === k); }, kinds[k].label);
        palB[k] = b; P.dragTo(b, () => C.filter(c => !ok_(c)).map(c => c.el), (t) => { const c = C.find(q => q.el === t); if (c) put(c, k); }, { can: () => !fin });
      }
      const want = (c) => c.d.need === 'line' ? (c.d.dir === 'h' ? 90 : 0) : null;
      const ok_ = (c) => c.type === c.d.need && (c.type !== 'line' || c.rot % 180 === want(c));
      function draw(c) {
        c.el.innerHTML = c.type ? (G.artImg(kinds[c.type].art) || '') : '';
        c.el.classList.toggle('has', !!c.type); c.el.classList.toggle('turn', hard && c.type === 'line' && !ok_(c));
        const im = c.el.firstChild; if (im) im.style.transform = `rotate(${c.rot}deg)`;
      }
      function put(c, k) {
        if (fin || G.dialog.active || ok_(c)) return; clear();
        if (k !== c.d.need) {   // 다른 블록: 살짝 흔들리고 루미(해솔)가 알려 줌 (실패 소리 없음)
          c.el.animate && c.el.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(-8px)' }, { transform: 'translateX(8px)' }, { transform: 'translateX(0)' }], { duration: 300 });
          return S.say(c.d.need === 'dot' ? 'E10_haesol_02' : 'E10_haesol_01');
        }
        c.type = k; c.rot = k === 'line' ? (hard ? (want(c) + 90) % 180 : want(c)) : 0;
        G.audio.sfx('sfx_click', 0.6); draw(c); check();
      }
      function tapCell(c) {
        if (fin || G.dialog.active) return;
        if (c.type === 'line' && hard && !ok_(c)) { c.rot = (c.rot + 90) % 180; G.audio.sfx('sfx_click', 0.5, 1.2); draw(c); return check(); }
        if (sel) put(c, sel); else if (!ok_(c)) S.say('E90_hint_10');
      }
      function check() { if (C.every(ok_)) win(); }
      async function win() {
        if (fin) return; fin = true; cur = null; G.help.off(); clear();
        for (const c of C) { c.el.classList.add('lit'); G.audio.sfx(C.indexOf(c) % 2 ? 'sfx_step1' : 'sfx_step2', 0.5); await G.wait(G.reduced() ? 0.05 : 0.22); }
        G.audio.sfx('sfx_sparkle', 0.7); spark(B.el, 12);
        await G.wait(0.9); S.end(); res(ok());
      }
      if (easy) for (const c of C) if (c.d.need === 'line') { c.type = 'line'; c.rot = want(c); draw(c); }
      S.layout = () => B.fit(area(S)); S.layout(); requestAnimationFrame(S.layout);
      const next = () => C.find(c => !ok_(c));
      function clear() { if (arrow) arrow.remove(); arrow = null; C.forEach(c => c.el.classList.remove('hint')); for (const q in palB) palB[q].classList.remove('hint'); }
      G.help.set({
        l1: () => S.say('E90_hint_10'),
        l2: () => { const c = next(); if (!c || arrow) return; const r = c.el.getBoundingClientRect(), rr = S.root.getBoundingClientRect(); arrow = arrowAt(S.root, r.left - rr.left + r.width / 2, r.top - rr.top); },
        l3: () => { const c = next(); if (!c) return; c.el.classList.add('hint'); if (!(c.type === 'line' && hard)) palB[c.d.need].classList.add('hint'); },
        clear,
      });
      cur = { solve: () => { C.forEach(c => { c.type = c.d.need; c.rot = c.type === 'line' ? want(c) : 0; draw(c); }); win(); } };
      await G.dialog.play(['E10_rumi_01']); if (!ok()) return;
      await G.dialog.play(hard ? ['E10_haesol_01', 'E10_haesol_02', 'E10_rumi_02'] : ['E10_haesol_01', 'E10_haesol_02'], { partner: 'haesol' });
    });
  }

  // ---- 별가루 다 모으기 보너스: 루미가 별가루로 작은 별자리를 그림 (엔딩 뒤) ----
  async function bonus() {
    if (done('dust_bonus') || G.cut.active) return;
    const g = G.gen, ok = () => g === G.gen; G.busy++;
    const m = G.el('div', 'p4-bonus', G.$('#overlay'));
    await G.dialog.play(['E12_rumi_01', 'E12_rumi_02']); if (!ok()) { m.remove(); return; }
    const box = G.el('div', 'p4-bbox', m), ns = 'http://www.w3.org/2000/svg', svg = document.createElementNS(ns, 'svg'); svg.setAttribute('viewBox', '0 0 1000 1000'); box.appendChild(svg);
    const pts = []; for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? 170 : 400; pts.push([500 + Math.cos(a) * r, 520 + Math.sin(a) * r]); }
    const line = document.createElementNS(ns, 'polyline'); line.setAttribute('class', 'p4-bline'); svg.appendChild(line);
    const drawn = [];
    for (let i = 0; i <= 10; i++) {
      const p = pts[i % 10]; drawn.push(p); line.setAttribute('points', drawn.map(q => q.join(',')).join(' '));
      if (i < 10) { const s = G.el('div', 'p4-bstar', box, G.artImg('stardust') || G.sparkle()); s.style.left = (p[0] / 10) + '%'; s.style.top = (p[1] / 10) + '%'; G.audio.sfx('sfx_chime', 0.5, 0.8 + i * 0.06); }
      await G.wait(G.reduced() ? 0.05 : 0.45); if (!ok()) { m.remove(); return; }
    }
    m.classList.add('done'); G.audio.sfx('sfx_sparkle', 0.8);
    await G.wait(2.6);
    if (m.animate) await m.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 600 }).finished.catch(() => { });
    m.remove(); mark('dust_bonus'); G.busy = Math.max(0, G.busy - 1);
  }

  // ---- 흐름 (flows.js·p3.js의 같은 이름을 바꿈) ----
  const F0 = Object.assign({}, G.flows);
  const lettersNeed = () => G.lv('normal') ? 3 : 2;
  const lettersDone = () => ['letter_1', 'letter_2', 'letter_3'].filter(done).length >= lettersNeed();
  Object.assign(G.flows, {
    // 광장 촌장: 처음 이야기 (쉽게는 바로 쪽지) / 도서관 문에서 막혀 다시 오면 점자 쪽지
    async plaza_chief({ H, complete, g }) {
      const ok = () => g === G.gen, give = !has('note') && (!G.lv('normal') || P.calling());
      const first = !done('plaza_chief');
      if (first || !give) { await G.dialog.play(first ? [...H.def.lines, 'E03_chief_04', 'E03_chief_05'] : H.def.lines, { partner: 'chief', keep: give }); if (!ok()) return; complete('plaza_chief'); }   // 10/1 처음에는 별가루 규칙도
      if (!give) return;
      await G.dialog.play(G.lv('normal') ? ['E05_chief_01', 'E03_chief_02', 'E03_chief_03'] : ['E03_chief_01'], { partner: 'chief' }); if (!ok()) return;
      await G.present.item('note'); if (!ok()) return;
      mark('note_got'); G.map.refresh(); document.querySelectorAll('.p4-askq').forEach(e => e.remove());
    },
    // 우편배달부: 편지가 날아감 → 편지 찾기 → 다 찾으면 원래 이야기
    async plaza_post({ complete, g }) {
      const ok = () => g === G.gen, o = { partner: 'post' };
      if (done('plaza_post')) { await G.dialog.play(['S03_post_05'], o); return; }
      if (!done('plaza_post_ask')) { await G.dialog.play(['S03_post_01', 'E03_post_01', 'E03_post_02'], o); if (!ok()) return; mark('plaza_post_ask'); G.scene.reveal(); return; }
      if (!lettersDone()) { await G.dialog.play(['E03_post_02'], o); return; }
      await G.dialog.play(['E03_post_03', 'S03_post_02', 'S03_post_03', 'S03_post_04', 'S03_rumi_07', 'S03_post_05'], o); if (!ok()) return;
      complete('plaza_post');
    },
    // 편지 하나 찾기
    async plaza_letter({ H, g }) {
      const im = H.glow;
      if (im.animate && !G.reduced()) await im.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.4) translateY(-20px)', opacity: 0 }], { duration: 500, easing: 'ease-in', fill: 'forwards' }).finished.catch(() => { });
      mark(H.def.mark); G.scene.reveal(); G.audio.sfx('sfx_sparkle', 0.5);
      if (!lettersDone()) return;   // 10/1 선생님: 편지마다 말하지 않고 모두 찾았을 때 한 번만
      await G.dialog.play(['E03_rumi_03']); if (g !== G.gen) return;
      { const p = G.scene.sprite('post'); if (p && p.img.animate) p.img.animate([{ transform: 'translateY(0)' }, { transform: 'translateY(-16px)' }, { transform: 'translateY(0)' }], { duration: 500, iterations: 2 }); }
    },
    // 게시판 닦기
    async plaza_board({ complete, g }) {
      const ok = () => g === G.gen;
      if (done('plaza_board')) { await G.dialog.play(['S03_rumi_06']); return; }
      await G.dialog.play(['S03_rumi_05', 'E03_rumi_02']); if (!ok()) return;
      const w = await wipe(); if (!ok() || !w) return;
      await G.dialog.play(['S03_rumi_06']); if (!ok()) return;
      complete('plaza_board');
    },
    // 시장: 지도를 주려다 바람에 찢어짐 → 조각 맞추기 → 마을 지도
    async market_bom({ complete, g }) {
      const ok = () => g === G.gen, P_ = { partner: 'bom', keep: true }, opt = (id, icon) => ({ label: G.txt(id), icon, voice: id });
      if (!done('market_bom')) { await G.dialog.play(['S04_bom_01', 'S04_bom_02'], P_); if (!ok()) return; complete('market_bom'); }
      if (!done('market_ask')) {
        await G.dialog.play(['S04_rumi_01'], P_); if (!ok()) return;
        let i = await G.dialog.choose([opt('S04_opt_01', 'icon_star'), opt('S04_opt_02', 'opt_road'), opt('S04_opt_03', 'opt_apple')], true); if (!ok()) return;
        if (i === 2) {   // 10/2 선생님: 과일을 물으면 대답한 뒤 다시 고르기 (별·길 질문만 남김)
          await G.dialog.play(['S04_bom_05'], P_); if (!ok()) return;
          i = await G.dialog.choose([opt('S04_opt_01', 'icon_star'), opt('S04_opt_02', 'opt_road')], true); if (!ok()) return;
        }
        await G.dialog.play([['S04_bom_03', 'S04_bom_04'][i]], P_); if (!ok()) return;
        complete('market_ask');
      }
      if (!done('market_map')) {
        await G.dialog.play(['S04_bom_06', 'S04_bom_07', 'S04_bom_08', 'S04_bom_09'], P_); if (!ok()) return;
        if (!done('market_jig')) {
          await G.dialog.play(['E04_bom_01', 'E04_rumi_01'], { partner: 'bom' }); if (!ok()) return;
          const w = await jigsaw(); if (!ok() || !w) return;
          mark('market_jig');
          await G.dialog.play(['E04_bom_02'], { partner: 'bom' }); if (!ok()) return;
        }
        G.dialog.close();
        await G.present.item('map'); if (!ok()) return;
        await G.dialog.play(['S04_bom_10', 'S04_rumi_02'], { partner: 'bom' }); if (!ok()) return;
        complete('market_map');
      }
      G.dialog.close();
    },
    // 도서관 해솔: 자물쇠를 열고 들어왔으면 문 이야기를 더함
    async library_haesol({ complete, closeup, hideCloseup, g }) {
      const ok = () => g === G.gen, opt = (id, icon) => ({ label: G.txt(id), icon, voice: id });
      G.dialog.onLine = (lid) => { if (lid === 'S05_haesol_03') closeup('braille_book'); if (lid === 'S05_haesol_04') hideCloseup(); };
      const door = done('libdoor_open') ? ['E05_haesol_01', 'E05_haesol_02', 'E05_haesol_03'] : [];
      await G.dialog.play(['S05_haesol_01', ...door, 'S05_haesol_02', 'S05_haesol_03', 'S05_rumi_01', 'S05_haesol_04', 'S05_rumi_02'], { partner: 'haesol', keep: true });
      G.dialog.onLine = null; hideCloseup(); if (!ok()) return;
      await G.dialog.choose([opt('S05_ply_01', 'opt_night')], true); if (!ok()) return;
      await G.dialog.play(['S05_haesol_05', 'S05_haesol_06'], { partner: 'haesol' }); if (!ok()) return;
      complete('library_haesol');
    },
    // 숲 덤불 B: 반딧불 소리 자물쇠를 풀어야 열림
    async forest_wind(ctx) {
      const { S, V, complete, g } = ctx, ok = () => g === G.gen;
      if (done('forest_wind')) return F0.forest_wind(ctx);
      G.audio.sfx('sfx_wind', 1.0); G.leafPuff(V, S.wind, 8); G.waveMark(V.fx, S.wind[0] + 40, S.wind[1] - 150);
      await G.dialog.play(['S07_rumi_03', 'E07_rumi_03']); if (!ok()) return;
      const w = await fireflies(); if (!ok() || !w) return;
      await G.dialog.play(['E07_rumi_07']); if (!ok()) return;
      if (lift) lift();
      complete('forest_wind');
    },
    // 두 번째 광장 할 일 2: 노란 길은 블록 퍼즐을 푼 뒤에 깔림 (나머지는 p3.js와 같음)
    async plaza2_road({ S, V, complete, g }) {
      const ok = () => g === G.gen, ask = [{ label: G.txt('S09_ply_01'), icon: 'icon_star', voice: 'S09_ply_01' }];
      await G.dialog.play(['S10_post_01', 'S10_rumi_01'], { partner: 'post', keep: true }); if (!ok()) return;
      G.dialog.open('haesol'); await G.dialog.choose(ask, true); if (!ok()) return;
      await G.dialog.play(['S10_haesol_01', 'S10_haesol_02'], { partner: 'haesol', keep: true }); if (!ok()) return;
      G.dialog.open('post'); await G.dialog.choose(ask, true); if (!ok()) return;
      await G.dialog.play(['S10_post_02', 'S10_rumi_02'], { partner: 'post', keep: true }); if (!ok()) return;
      const opts = { pole: { label: G.txt('S10_btn_01'), art: 'opt_bell', icon: 'icon_sound', voice: 'S10_btn_01' }, blocks: { label: G.txt('S10_btn_02'), art: 'opt_block', icon: 'opt_road', voice: 'S10_btn_02' } };
      const left = ['pole', 'blocks'];
      while (left.length) {
        const i = await G.dialog.choose(left.map(k => opts[k]), true); if (!ok()) return;
        const k = left.splice(i, 1)[0];
        if (k === 'blocks' && !done('road_tiles')) {   // 10/1 선생님 수정안: 블록 뜻을 먼저 알려 주고 퍼즐, 다 깔면 한 줄
          await G.dialog.play(['S10_haesol_03', 'S10_haesol_04', 'S10_haesol_05'], { partner: 'haesol' }); if (!ok()) return;
          G.dialog.close(); const w = await tiles(); if (!ok() || !w) return; mark('road_tiles');
          await G.dialog.play(['E10_haesol_03'], { partner: 'haesol' }); if (!ok()) return;
        }
        if (k === 'pole') await libPole(); else await p3Install(V, k); if (!ok()) return;   // 10/1 선생님: 안내 기둥은 도서관 앞에
      }
      G.dialog.close();
      await G.cut.play('C10', { live: { V, S } }); if (!ok()) return;
      await G.dialog.play(['S10_post_03'], { partner: 'post' }); if (!ok()) return;
      await p3WalkAway(V, S); if (!ok()) return;
      await G.dialog.play(['S10_haesol_06'], { partner: 'haesol' }); if (!ok()) return;
      G.st.env.guide = true;
      complete('plaza2_road');
    },
    // 별 받침대: 가방 속 별을 끌어 올린 뒤 C11
    async plaza2_star(ctx) {
      const { H, g } = ctx;
      if (dustSt().length < NEED) { await G.dialog.play(['E11_chief_01'], { partner: 'chief' }); return; }   // 10/1 선생님: 별가루 5개가 있어야 별을 올림
      if (has('piece')) { G.hud.say('E90_hint_11'); const u = await P.useItem('piece', H.btn, { say: (id) => G.hud.say(id), hint: 'E90_hint_11' }); if (!u || g !== G.gen) return; }
      return F0.plaza2_star(ctx);
    },
    // 엔딩 뒤: 별가루를 다 모았으면 보너스 별자리
    async ending(...a) {
      await F0.ending(...a);
      if (dustSt().length >= total()) await bonus();
    },
  });
  P.libPole = libPole; P.tiles = tiles;   // 점검용
  return P;
})();

/* ---- s2_sound.js ---- */
// s2_sound.js — 소리의 별 (10/1, 뼈대 v1.0 · 음성 목록 v1.1). 길의 별 코드는 고치지 않고, 엔진이 부르는 이름(G.map.show, G.p4.gate 등)을 감싸서 이어 붙임
// 흐름: 길의 별 엔딩 → 소리의 별-1 동쪽 길(안개가 걷힘) → -2 학교 교실 → -3 공연장(리듬 자물쇠) → -4 쉼터(미루) → -5 광장 음악회 → -6 엔딩 (되찾은 별 2/8)
// 지도: 길의 별 동안은 원래 지도 그대로. 소리의 별을 시작하면 넓은 지도(5760x3240, 옛 마을은 가운데)로 바꾸고, 아직 열리지 않은 곳은 먹색 안개
// 소리 안전: 시끄러움은 그림(지글지글 표시, 물결)으로 크게 보이고 실제 소리는 작고 짧게. 소리 퍼즐은 모두 빛과 그림만으로도 풀 수 있음
// 별가루는 길의 별과 따로 셈 (G.st.s2dust, 10곳 중 5개가 있어야 별을 올림)
'use strict';
G.s2 = (() => {
  const T = {};
  const D2 = () => G.D.story.s2;
  const done = (m) => !!G.st && G.st.done.includes(m);
  const mark = (m) => { if (m && G.st && !done(m)) { G.st.done.push(m); G.save.write(); } };
  const has = (id) => !!G.st && G.st.items.includes(id);
  const cleared = (id) => !!G.st && G.st.cleared.includes(id);
  const flagOn = (f) => done(f) || cleared(f);
  const say = (id) => G.hud.say(id);
  const play = (ids, o) => G.dialog.play(ids, o);
  const ask = (id, icon = 'icon_sound') => G.dialog.choose([{ label: G.txt(id), icon, voice: id }], true);
  const sd = () => G.st.s2dust || (G.st.s2dust = []);
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  let cur = null;   // 지금 하는 소리의 별 퍼즐 (교사용 "이 퍼즐 바로 풀기")

  // ================= 화면 모양 (이 파일의 새 요소만) =================
  const CSS = `
.s2-obj { position: absolute; transform: translate(-50%, -50%); pointer-events: none; z-index: 19; }
.s2-obj.pop { animation: s2pop .6s ease-out; }
@keyframes s2pop { 0% { scale: .3; opacity: 0; } 70% { scale: 1.15; opacity: 1; } 100% { scale: 1; } }
.s2-loud { position: absolute; width: 170px; height: 170px; transform: translate(-50%, -50%); pointer-events: none; z-index: 24; filter: drop-shadow(0 0 6px rgba(255, 120, 90, .55)); }
.s2-note { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); opacity: 0; }
.s2-note img, .s2-note svg { width: 100%; height: 100%; object-fit: contain; display: block; }
@keyframes s2buzz { 0%, 100% { rotate: -4deg; scale: .92; } 25% { rotate: 5deg; scale: 1.08; } 50% { rotate: -3deg; scale: 1; } 75% { rotate: 4deg; scale: 1.1; } }
.s2-loud.map { width: 230px; height: 230px; z-index: 2996; }
.s2-loud.gone { animation: s2out .6s ease-in forwards; }
@keyframes s2out { to { scale: .2; opacity: 0; } }
.s2-wave { position: absolute; transform: translate(-50%, -50%); pointer-events: none; z-index: 25; filter: drop-shadow(0 0 12px rgba(125, 187, 227, .95)); }
.s2-wave img { width: 100%; height: 100%; object-fit: contain; }
.s2-glow { position: absolute; width: 260px; height: 260px; margin: -130px 0 0 -130px; border-radius: 50%; pointer-events: none; z-index: 18; mix-blend-mode: screen;
  background: radial-gradient(circle, rgba(255, 244, 190, .95) 0%, rgba(255, 214, 107, .55) 35%, rgba(255, 214, 107, 0) 70%); animation: s2glow 1.6s ease-in-out infinite; }
@keyframes s2glow { 0%, 100% { opacity: .35; scale: .85; } 50% { opacity: 1; scale: 1.1; } }
.s2-star { position: absolute; transform: translate(-50%, -50%); pointer-events: none; z-index: 30; filter: drop-shadow(0 0 24px rgba(220, 190, 255, .95)); }
.s2-star img, .s2-star svg { width: 100%; height: 100%; display: block; object-fit: contain; }
.s2-fog { pointer-events: none; transition: opacity 2.4s ease; }
.s2-restmark { position: absolute; width: 130px; height: 130px; transform: translate(-50%, -50%); border: 0; padding: 0; background: transparent; cursor: pointer; z-index: 2994; animation: tw 2.6s ease-in-out infinite; }
.s2-restmark img { width: 100%; height: 100%; object-fit: contain; filter: drop-shadow(0 0 10px rgba(160, 220, 200, .9)); }
.s2-pz .s2-wrap { position: absolute; z-index: 5; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: calc(var(--u) * 26); }
.s2-pz .s2-wrap.dim::before { content: ''; position: fixed; inset: 0; background: rgba(15, 18, 38, .5); z-index: -1; }
.s2-card { display: flex; align-items: center; gap: calc(var(--u) * 20); background: #FFF4E0; border: calc(var(--u) * 5) solid #e0b96a; border-radius: calc(var(--u) * 26); padding: calc(var(--u) * 14) calc(var(--u) * 26);
  box-shadow: 0 calc(var(--u) * 10) calc(var(--u) * 24) rgba(0, 0, 0, .4); }
.s2-card-head { font-family: var(--f-title); font-size: calc(var(--u) * 30); color: var(--brown); white-space: nowrap; display: flex; align-items: center; gap: calc(var(--u) * 10); }
.s2-card-head .ico { height: 1.6em; }
.s2-card.look { animation: thint 1.2s ease-in-out 2; }
.s2-beat { position: relative; width: calc(var(--u) * 96); height: calc(var(--u) * 96); display: flex; align-items: center; justify-content: center; border-radius: 50%; transition: background .25s, box-shadow .25s; }
.s2-beat img { object-fit: contain; }
.s2-beat.big img { width: 100%; height: 100%; }
.s2-beat.small img { width: 58%; height: 58%; }
.s2-beat.on { background: rgba(255, 230, 150, .7); box-shadow: 0 0 calc(var(--u) * 26) rgba(255, 214, 107, 1); }
.s2-beat.flash { background: rgba(255, 244, 200, 1); box-shadow: 0 0 calc(var(--u) * 40) rgba(255, 236, 170, 1); }
.s2-beat.next { animation: thint 1.4s ease-in-out infinite; }
.s2-pads { display: flex; align-items: flex-end; justify-content: center; gap: calc(var(--u) * 70); }
.s2-pad { border: 0; padding: 0; background: transparent; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: calc(var(--u) * 8); font-family: var(--f-title); font-size: calc(var(--u) * 44 * var(--ts)); color: var(--paper); text-shadow: 0 2px 6px rgba(0, 0, 0, .7); }
.s2-pad .pimg { border-radius: 50%; display: flex; align-items: center; justify-content: center; background: radial-gradient(circle, #fff6dc 0%, #f1d9a6 70%, #c9a45c 100%); box-shadow: 0 calc(var(--u) * 10) 0 #8a6a4e, 0 calc(var(--u) * 14) calc(var(--u) * 24) rgba(0, 0, 0, .45); transition: transform .12s; }
.s2-pad .pimg img { width: 80%; height: 80%; object-fit: contain; }
.s2-pad.big .pimg { width: calc(var(--bu) * 230); height: calc(var(--bu) * 230); }
.s2-pad.small .pimg { width: calc(var(--bu) * 150); height: calc(var(--bu) * 150); }
.s2-pad.hit .pimg { transform: translateY(calc(var(--u) * 8)) scale(.96); box-shadow: 0 calc(var(--u) * 2) 0 #8a6a4e, 0 0 calc(var(--u) * 50) rgba(255, 236, 170, 1); }
.s2-pad.hint .pimg { animation: thint 1.4s ease-in-out infinite; }
.s2-zone { position: absolute; border: 6px dashed rgba(255, 248, 236, .85); border-radius: 30px; background: rgba(29, 35, 64, .28); display: flex; flex-wrap: wrap; align-content: flex-start; align-items: flex-start; gap: 8px; padding: 12px; transition: background .25s; }
.s2-zone.drop-on, .s2-zone.hint { background: rgba(255, 214, 107, .45); }
.s2-zone.hint { animation: thint 1.6s ease-in-out infinite; }
.s2-zl { position: absolute; left: 50%; bottom: -34px; transform: translateX(-50%); display: flex; align-items: center; gap: 8px; white-space: nowrap; font-family: var(--f-title); font-size: 46px; color: var(--brown); background: #FFF4E0; border-radius: 30px; padding: 4px 22px; box-shadow: 0 6px 12px rgba(0, 0, 0, .35); }
.s2-zl img { height: 54px; }
.s2-zl { z-index: 3; }   /* 10/2 이름표가 옆 자리 칸에 가려지지 않게 */
.s2-zone[data-k="phones"] .s2-zl { left: auto; right: 0; transform: none; }
.s2-seated { width: 120px; height: 120px; border-radius: 50%; object-fit: cover; object-position: 50% 12%; background: #FFF4E0; border: 5px solid #FFD66B; animation: s2pop .5s ease-out; }
.s2-tray { position: absolute; z-index: 6; display: flex; align-items: center; justify-content: center; gap: calc(var(--u) * 22); background: rgba(255, 248, 236, .95); border: calc(var(--u) * 4) solid rgba(138, 106, 78, .55); border-radius: calc(var(--u) * 34); padding: calc(var(--u) * 10) calc(var(--u) * 22); }
.s2-person { flex: none; display: flex; flex-direction: column; align-items: center; gap: calc(var(--u) * 4); border: calc(var(--u) * 4) solid #e0b96a; background: #fff6dc; border-radius: calc(var(--u) * 24); padding: calc(var(--u) * 6) calc(var(--u) * 10); cursor: grab; font-family: var(--f-title); font-size: calc(var(--u) * 26 * var(--ts)); color: var(--brown); white-space: nowrap; }
.s2-person .pf { width: calc(var(--bu) * 110); height: calc(var(--bu) * 110); border-radius: 50%; object-fit: cover; object-position: 50% 12%; background: #FFF4E0; }
.s2-person.hint { animation: thint 1.6s ease-in-out infinite; }
.s2-person.dragging { opacity: .35; }
.s2-person.done { display: none; }
.s2-tray.side { flex-direction: column; padding: calc(var(--u) * 16) calc(var(--u) * 12); }
.s2-tray.side.many { display: grid; grid-template-columns: repeat(2, auto); }
.s2-wob { animation: s2wob .4s ease-in-out; }
@keyframes s2wob { 0%, 100% { rotate: 0deg; } 25% { rotate: -4deg; } 75% { rotate: 4deg; } }
.s2-win { position: absolute; display: flex; align-items: center; justify-content: center; border-radius: 12px; transition: background .3s, box-shadow .3s; }
.s2-win img { width: 88%; height: 88%; object-fit: contain; animation: s2pop .45s ease-out; }
.s2-win.lit { background: rgba(255, 230, 150, .55); box-shadow: 0 0 30px rgba(255, 214, 107, 1); }
.s2-pics { display: flex; gap: calc(var(--u) * 26); justify-content: center; }
.s2-pic { flex: none; display: flex; flex-direction: column; align-items: center; gap: calc(var(--u) * 4); border: calc(var(--u) * 5) solid #e0b96a; background: #fff6dc; border-radius: calc(var(--u) * 26); padding: calc(var(--u) * 8) calc(var(--u) * 14); cursor: pointer; font-family: var(--f-title); font-size: calc(var(--u) * 32 * var(--ts)); color: var(--brown); box-shadow: 0 calc(var(--u) * 8) 0 #c9a45c; }
.s2-pic img { width: calc(var(--bu) * 130); height: calc(var(--bu) * 130); object-fit: contain; }
.s2-pic:active { transform: translateY(calc(var(--u) * 4)); box-shadow: 0 calc(var(--u) * 3) 0 #c9a45c; }
.s2-pic.hint { animation: thint 1.4s ease-in-out infinite; }
.s2-note-pics { display: flex; gap: calc(var(--u) * 10); align-items: center; }
.s2-note-pics img { width: calc(var(--u) * 84); height: calc(var(--u) * 84); object-fit: contain; border-radius: 12px; }
.s2-note-pics img.on { background: rgba(255, 214, 107, .6); }
.s2-deco { position: absolute; left: 50%; bottom: calc(var(--sab) + var(--u) * 24); transform: translateX(-50%); z-index: 7; pointer-events: auto; display: flex; align-items: center; gap: calc(var(--u) * 18);
  background: rgba(255, 248, 236, .95); border: calc(var(--u) * 4) solid rgba(138, 106, 78, .55); border-radius: calc(var(--u) * 34); padding: calc(var(--u) * 12) calc(var(--u) * 24); }
.talking .s2-deco { opacity: 0; pointer-events: none; }
.s2-deco .p4-item.done { display: none; }
.s2-calm { background: rgba(26, 46, 52, .82); flex-direction: column; gap: calc(var(--u) * 30); }
.s2-calm .s2-breath { width: calc(var(--u) * 260); height: calc(var(--u) * 260); border-radius: 50%; background: radial-gradient(circle, rgba(190, 240, 220, .9) 0%, rgba(120, 200, 180, .45) 50%, rgba(120, 200, 180, 0) 72%); animation: s2breath 6s ease-in-out infinite; display: flex; align-items: center; justify-content: center; }
.s2-calm .s2-breath img { width: 46%; height: 46%; object-fit: contain; }
@keyframes s2breath { 0%, 100% { scale: .75; } 50% { scale: 1.15; } }
.s2-calm .s2-calm-t { font-family: var(--f-title); font-size: calc(var(--u) * 50 * var(--ts)); color: var(--paper); }
.s2-drop { position: absolute; width: 0; height: 0; pointer-events: none; z-index: 2990; }
.s2-drop i { position: absolute; left: -95px; top: -60px; width: 190px; height: 120px; border-radius: 50%; border: 7px dashed #FFD66B; background: rgba(255, 214, 107, .22); box-shadow: 0 0 30px rgba(255, 214, 107, .9); animation: s2drop 1.1s ease-in-out infinite; }
.s2-drop .arrow { left: 0; top: -125px; }
@keyframes s2drop { 0%, 100% { transform: scale(.92); opacity: .75; } 50% { transform: scale(1.06); opacity: 1; } }
.reduce .s2-drop i { animation: none; }
.reduce .s2-loud, .reduce .s2-glow, .reduce .s2-calm .s2-breath { animation: none; }
.c11-slot.s2-next { opacity: .85; filter: none; animation: s2blink 1.2s ease-in-out infinite; }
@keyframes s2blink { 0%, 100% { opacity: .35; } 50% { opacity: 1; filter: drop-shadow(0 0 22px rgba(242, 155, 176, 1)); } }
.s2-cnotes { position: absolute; left: 0; top: 0; width: 0; height: 0; pointer-events: none; z-index: 2995; }
.s2-cnotes .s2-note { left: auto; top: auto; filter: drop-shadow(0 0 10px rgba(125, 187, 227, .9)); }
.s2-concert { position: absolute; width: 900px; height: 900px; margin: -450px 0 0 -450px; border-radius: 50%; pointer-events: none; z-index: 17; mix-blend-mode: screen; opacity: 0;
  background: radial-gradient(circle, rgba(255, 236, 170, .6) 0%, rgba(200, 160, 240, .35) 40%, rgba(200, 160, 240, 0) 70%); }
`;
  { const st = document.createElement('style'); st.id = 's2-style'; st.textContent = CSS; document.head.appendChild(st); }

  // ================= 작은 도구 =================
  const ART = (n) => G.art(n) || '';
  function obj(parent, name, x, y, w, cls = '') { const e = G.el('img', 's2-obj ' + cls, parent); e.src = ART(name); e.alt = ''; Object.assign(e.style, { left: x + 'px', top: y + 'px', width: w + 'px' }); return e; }
  // 음표 그림 (10/2 선생님): 조용한 곳은 하늘색 음표가 천천히 솟아오르고, 시끄러운 곳은 산호색 음표가 물 튀듯 사방으로 튐
  const note = (box, kind, h) => { const e = G.el('div', 's2-note', box, G.artImg('note_' + kind + '_' + (1 + (Math.random() * 2 | 0))) || G.icon('icon_sound'));
    e.style.width = (h * .85) + 'px'; e.style.height = h + 'px'; return e; };
  const fly = (e, frames, ms) => { const a = e.animate && e.animate(frames, { duration: ms, easing: 'cubic-bezier(.2,.7,.4,1)' }); if (a) a.finished.then(() => e.remove()).catch(() => e.remove()); else setTimeout(() => e.remove(), ms); };
  function splash(box, size, n) {
    for (let i = 0; i < n; i++) { const h = size * (.26 + Math.random() * .1), e = note(box, 'loud', h);
      const ang = (i / n + Math.random() * .25) * Math.PI * 2, r = size * (.32 + Math.random() * .18), dx = Math.cos(ang) * r, dy = Math.sin(ang) * r * .8, rot = (Math.random() - .5) * 70;
      fly(e, [{ transform: 'translate(-50%,-50%) scale(.3)', opacity: 0 },
        { transform: `translate(-50%,-50%) translate(${dx * .7}px,${dy * .7 - size * .14}px) rotate(${rot * .6}deg) scale(1.05)`, opacity: 1, offset: .35 },
        { transform: `translate(-50%,-50%) translate(${dx}px,${dy + size * .1}px) rotate(${rot}deg) scale(.75)`, opacity: 0 }], 950 + Math.random() * 250); }
  }
  function loudMark(parent, x, y, cls = '') { const e = G.el('div', 's2-loud ' + cls, parent, ''); Object.assign(e.style, { left: x + 'px', top: y + 'px' });
    const size = cls.includes('map') ? 230 : 170;
    if (G.reduced && G.reduced()) { for (const [dx, rot] of [[-.18, -14], [.18, 12]]) { const n = note(e, 'loud', size * .34); n.style.opacity = 1; n.style.transform = `translate(-50%,-50%) translate(${dx * size}px,0) rotate(${rot}deg)`; } return e; }
    const tick = () => { if (!e.isConnected || e.classList.contains('gone')) return; if (!G.paused) splash(e, size, G.settings && G.settings.light ? 2 : 4); setTimeout(tick, 600 + Math.random() * 250); };
    setTimeout(tick, Math.random() * 400); return e; }
  function wave(parent, x, y, size, times = 1) {
    const m = G.el('div', 's2-wave', parent, ''); Object.assign(m.style, { left: x + 'px', top: y + 'px', width: size + 'px', height: size + 'px' });
    const n = 3 * times, gap = 1400 / 3;
    for (let i = 0; i < n; i++) setTimeout(() => { if (!m.isConnected) return; const e = note(m, 'calm', size * .32), sx = (Math.random() - .5) * size * .4, sw = (Math.random() < .5 ? -1 : 1) * size * .08;
      fly(e, [{ transform: `translate(-50%,-50%) translate(${sx}px,${size * .2}px) scale(.6)`, opacity: 0 },
        { transform: `translate(-50%,-50%) translate(${sx + sw}px,${-size * .1}px) scale(1)`, opacity: 1, offset: .4 },
        { transform: `translate(-50%,-50%) translate(${sx - sw * .5}px,${-size * .5}px) scale(.9)`, opacity: 0 }], 1600); }, i * gap);
    setTimeout(() => m.remove(), n * gap + 1700);
    return m;
  }
  const spark = (el, n = 10) => { if (!el || !el.getBoundingClientRect) return; const r = el.getBoundingClientRect(), ov = G.$('#overlay'); if (G.settings && G.settings.light) n = 4;
    for (let i = 0; i < n; i++) { const s = G.el('div', 'spk', ov, G.sparkle()); s.style.left = (r.left + r.width / 2) + 'px'; s.style.top = (r.top + r.height / 2) + 'px';
      const a = Math.PI * 2 * i / n, R = G.stage.u * (90 + Math.random() * 90); G.tween(0, 1, 0.9, k => { s.style.transform = `translate(${Math.cos(a) * R * k}px,${Math.sin(a) * R * k}px) scale(${1 - k * .6})`; s.style.opacity = 1 - k; }, 'out').then(() => s.remove()); } };
  const wob = (el) => { if (!el) return; el.classList.remove('s2-wob'); void el.offsetWidth; el.classList.add('s2-wob'); };
  const hotBtn = (V, label) => V && [...V.fx.querySelectorAll('button.hot')].find(b => b.getAttribute('aria-label') === label);
  // 장면 색이 돌아옴 (장소의 마지막 할 일 뒤)
  function colorIn(V) {
    if (!V || !V.colorImg) return Promise.resolve();
    const c = V.colorImg; c.style.transition = 'none'; c.style.visibility = ''; const a0 = +c.style.opacity || 0;
    for (const l of V.lamps) l.el.classList.add('on');
    G.audio.sfx('sfx_sparkle', 0.6);
    return G.tween(a0, 1, G.reduced() ? 0.3 : 1.6, v => c.style.opacity = v, 'out');
  }
  // 대상(장면 속 누를 곳)을 누를 때까지 기다림. 끌기 없이 누르기만
  function waitTap(target, o = {}) {
    return new Promise((res) => {
      if (!target) return res(true);
      let fin = false;
      target.classList.add('p4-target', 'p4-target-on');
      const go = (e) => { if (fin) return; if (e && (G.dialog.active || G.paused)) return; if (e) { e.stopImmediatePropagation(); e.preventDefault(); }
        fin = true; target.removeEventListener('click', go, true); target.classList.remove('p4-target', 'p4-target-on'); G.help.off(); cur = null; res(true); };
      target.addEventListener('click', go, true);
      cur = { solve: () => go(null) };
      G.help.set({ l1: () => o.hint && say(o.hint), l2: () => { }, l3: () => target.classList.add('p4-target-on'), clear: () => { } });
    });
  }

  // ---- 퍼즐 화면 틀 (p4.js와 같은 모양): 위쪽 루미 말풍선, 왼쪽 아래 [루미] ----
  function screen(cls, keepHud) {
    const root = G.el('div', 'puzzle p4 s2-pz ' + cls, G.$('#world'));
    const top = G.el('div', 'pz-top', root);
    const sayEl = G.el('div', 'pz-say', top); sayEl.style.display = 'none';
    const bl = G.el('div', 'pz-bl', root);
    const lb = G.el('button', 'lumi-btn', bl); lb.type = 'button'; lb.setAttribute('aria-label', '루미 도움');
    const li = G.el('img', '', lb); li.src = G.asset('assets/chars/lumi.png'); li.alt = ''; G.el('span', '', lb, '루미');
    G.onTap(lb, () => G.help.now());
    if (!keepHud) G.hud.hide(true);
    let tok = 0, last = null;
    const S = { root, top, layout: null };
    S.say = async (id) => { const my = ++tok; sayEl.textContent = G.txt(id); sayEl.style.display = ''; await G.audio.voice(id); await G.wait(1.2); if (my === tok) sayEl.style.display = 'none'; };
    S.hush = () => { tok++; sayEl.style.display = 'none'; };
    const re = () => S.layout && S.layout();
    const w = G.every(() => { if (!root.isConnected) { w(); G.resizers.delete(re); return; } const a = !!G.dialog.active; if (a !== last) { last = a; root.classList.toggle('talk', a); requestAnimationFrame(re); } });
    G.resizers.add(re);
    S.end = () => { w(); G.resizers.delete(re); root.remove(); G.help.off(); cur = null; if (!keepHud) G.hud.hide(false); };
    return S;
  }
  function board(parent, W, H, cls) {
    const el = G.el('div', 'p4-board ' + (cls || ''), parent); el.style.width = W + 'px'; el.style.height = H + 'px';
    const B = { el, W, H, k: 1 };
    B.fit = ([x, y, w, h], cover) => { const k = (cover ? Math.max : Math.min)(w / W, h / H); B.k = k; el.style.transform = `translate(${(x + (w - W * k) / 2).toFixed(1)}px,${(y + (h - H * k) / 2).toFixed(1)}px) scale(${k.toFixed(4)})`; };
    return B;
  }
  function area(S) {
    const { W, H, u } = G.stage, rr = S.root.getBoundingClientRect();
    const t = S.top.getBoundingClientRect().bottom - rr.top + u * 12, box = G.$('.dlg-box');
    const b = G.dialog.active && box ? rr.bottom - box.getBoundingClientRect().top + u * 16 : u * 30;
    return [u * 30, t, W - u * 60, Math.max(60, H - t - b)];
  }
  const arrowAt = (parent, el) => { const r = el.getBoundingClientRect(), pr = parent.getBoundingClientRect(); const a = G.el('div', 'arrow p4-arrow', parent, G.arrowHtml()); a.style.left = (r.left - pr.left + r.width / 2) + 'px'; a.style.top = (r.top - pr.top) + 'px'; return a; };

  // ---- 아이템 얻기 카드 (길의 별 카드와 같은 모양, 소리의 별 대사로) ----
  async function presentItem(id) {
    const it = G.D.items.find(x => x.id === id); if (!it) return;
    const g = G.gen; G.busy++;
    if (!has(id)) { G.st.items.push(id); G.save.write(); }
    const m = G.el('div', 'modal get', G.$('#overlay')), sh = G.el('div', 'sheet', m);
    const pic = G.el('div', 'get-pic', sh, G.icon(it.icon));
    G.el('div', 'get-title', sh, it.name);
    G.el('div', 'get-desc', sh, G.txt(it.voice));
    G.audio.sfx('sfx_sparkle', 0.7);
    pic.animate && pic.animate([{ transform: 'scale(.3) rotate(-20deg)', opacity: 0 }, { transform: 'scale(1.15)', opacity: 1, offset: .7 }, { transform: 'scale(1)' }], { duration: 700, easing: 'ease-out' });
    requestAnimationFrame(() => spark(pic, 12));
    await nextBtn(sh, G.audio.voice(it.voice));
    m.remove();
    const bag = [...document.querySelectorAll('#hud .pill')].find(b => b.getAttribute('aria-label') === '가방');
    if (bag && bag.animate) bag.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.25)' }, { transform: 'scale(1)' }], { duration: 400 });
    if (g === G.gen) G.busy = Math.max(0, G.busy - 1);
  }
  function nextBtn(sh, first) {
    const row = G.el('div', 'btn-row', sh);
    const b = G.btn('pill gold dlg-next wait', '다음 ' + G.icon('icon_next'), row, null, '다음'); b.disabled = true;
    let res; const p = new Promise(r => res = r);
    (G.fast() ? Promise.resolve() : first).then(() => { b.disabled = false; b.classList.remove('wait'); b.classList.add('ready'); });
    G.onTap(b, () => { if (b.disabled) return; G.audio.sfx('sfx_tap', 0.5); G.audio.stopVoice(); res(); });
    return p;
  }

  // ================= 별가루 (소리의 별 10곳) =================
  async function gain(k, el, fx, x, y) {
    if (sd().includes(k)) return;
    sd().push(k); G.save.write(); G.audio.sfx('sfx_sparkle', 0.8); if (el) spark(el, 8);
    const n = sd().length, NEED = D2().dustNeed, TOT = D2().dustTotal, up = done('s2plaza_star'), shown = !up && n <= NEED ? `${n}/${NEED}` : `${n}/${TOT}`;
    if (fx) { const pop = G.el('div', 'p4-dust-pop', fx, (G.artImg('stardust') || '') + '<span>별가루 ' + shown + '</span>'); pop.style.left = x + 'px'; pop.style.top = (y - 70) + 'px'; setTimeout(() => pop.remove(), 2400); }
    if (n === 1) await play(['E00_dust_01', 'E00_dust_02']);
    else if (n === NEED && !up) await play(['E00_dust_03']);
    else say('E00_dust_01');
  }
  function dustBtn(V, k, x, y) {
    if (sd().includes(k)) return null;
    const b = G.el('button', 'p4-dust' + (G.lv('hard') ? ' dim' : ''), V.fx, G.artImg('stardust') || G.sparkle()); b.type = 'button'; b.setAttribute('aria-label', '별가루');
    Object.assign(b.style, { left: x + 'px', top: y + 'px', animationDelay: (-Math.random() * 3).toFixed(2) + 's' });
    G.onTap(b, () => {
      if (G.busy > 0 || G.dialog.active || sd().includes(k)) return;
      b.style.pointerEvents = 'none';
      if (b.animate) b.animate([{ transform: 'translate(-50%,-50%) scale(1)', opacity: 1 }, { transform: 'translate(-50%,-110%) scale(1.8)', opacity: 0 }], { duration: 700, easing: 'ease-out', fill: 'forwards' });
      setTimeout(() => b.remove(), 720);
      gain(k, b, V.fx, x, y);
    });
    return b;
  }
  async function popDust(V, k, x, y, el) {
    if (sd().includes(k)) return;
    const d = G.el('div', 'p4-dust pop', V.fx, G.artImg('stardust') || G.sparkle()); Object.assign(d.style, { left: x + 'px', top: y + 'px', pointerEvents: 'none' });
    G.audio.sfx('sfx_sparkle', 0.6);
    if (d.animate) await d.animate([{ transform: 'translate(-50%,-50%) scale(.3)', opacity: 0 }, { transform: 'translate(-50%,-160%) scale(1.3)', opacity: 1, offset: 0.5 }, { transform: 'translate(-50%,-220%) scale(1.6)', opacity: 0 }], { duration: G.reduced() ? 300 : 1000, easing: 'ease-out' }).finished.catch(() => { });
    d.remove(); await gain(k, el, V.fx, x, y);
  }

  // ================= 지도: 길의 별 지도 ↔ 넓은 지도 =================
  const ORIG = {};
  let isExp = false;
  const expanded = () => !!G.st && done('s2_begin');
  const MOBILE = /iP(hone|ad|od)|Android/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  function sync() {
    if (!ORIG.places) { ORIG.places = G.D.places; ORIG.mood = G.D.mood; }
    isExp = expanded();
    if (!isExp) { G.D.places = ORIG.places; G.D.mood = ORIG.mood; return; }
    const M = D2().map;
    if (MOBILE && M.places.map.small) Object.assign(M.places.map, M.places.map.small);   // 휴대폰·태블릿은 작은 지도 그림 (큰 그림은 iOS에서 안 보임)
    G.D.places = M.places;
    G.D.mood = Object.assign({}, M.mood, { villagers: M.mood.villagers.filter(v => !v.s2 || (v.s2 === true ? done('s2_fog') : flagOn(v.s2))) });
  }
  T.sync = sync;
  // 지도 그림에 안개, 소리 구역 색, 가로등, 시끄러운 표시, 쉼터 표시를 더함
  const mv0 = G.mapView;
  G.mapView = (parent, o) => {
    const V = mv0(parent, o);
    if (isExp && G.D.places === D2().map.places) decorate(V);
    return V;
  };
  // 색 번짐 (10/3 프레임 끊김): 예전에는 매 프레임 큰 지도 그림의 마스크를 다시 그려 휴대폰에서 끊김.
  // 이제 컬러 지도 한 장을 그 구역 마스크로 한 번만 덮고 투명도만 바꿈(GPU), 끝나면 마스크를 한 번 고침
  async function bloom(V, ids, dur) {
    const zs = G.D.mood.zones.filter(z => ids.includes(z.id)), col = V.colorImg;
    const ov = G.el('img', 'bg', V.imgs); ov.src = col.src; ov.width = V.W; ov.height = V.H; ov.alt = '';
    const m = zs.map(z => `radial-gradient(ellipse ${z.r[0]}px ${z.r[1]}px at ${z.center[0]}px ${z.center[1]}px, #000 0%, #000 42%, rgba(0,0,0,.55) 72%, transparent 100%)`).join(',');
    Object.assign(ov.style, { maskImage: m, webkitMaskImage: m, opacity: 0, willChange: 'opacity', transition: `opacity ${dur}s ease-out` });
    if (ov.decode) await ov.decode().catch(() => { });
    ov.getBoundingClientRect(); ov.style.opacity = 1;
    await G.wait(dur);
    for (const id of ids) V.s2.b[id] = { a: 1, g: 1 };
    if (V.el.isConnected) V.applyMask();
    ov.remove();
  }
  function decorate(V) {
    const M = D2().map.places.map;
    V.s2 = { b: {}, loud: {}, fog: null };
    const fog = V.s2.fog = G.el('img', 'bg s2-fog', V.imgs); fog.src = G.asset(M.fog[done('s2_fog') ? 1 : 0]); fog.alt = '';
    Object.assign(fog.style, { width: V.W + 'px', height: V.H + 'px' });
    const am0 = V.applyMask;
    V.applyMask = () => {
      for (const z of G.D.mood.zones) if (z.s2) { const b = V.s2.b[z.id]; if (b) { V.alpha[z.id] = b.a; V.grow[z.id] = b.g; } else { V.alpha[z.id] = flagOn(z.s2) ? 1 : 0; V.grow[z.id] = 1; } }
      am0();
    };
    const sl0 = V.setLamps;
    V.setLamps = (stage, all) => { sl0(stage, all); for (const l of V.lamps) if (l.def.s2) l.el.classList.toggle('on', !!all || flagOn(l.def.s2)); };
    // 처음 색이 돌아오는 구역: 작은 자국에서 크게 번짐 (C7과 함께)
    const fresh = G.D.mood.zones.filter(z => z.s2 && z.s2 !== 's2_end' && flagOn(z.s2) && !(G.st.s2bloom || []).includes(z.id));
    if (fresh.length) {
      for (const z of fresh) V.s2.b[z.id] = { a: 0, g: 1 };
      G.wait(0.9).then(() => V.el.isConnected && bloom(V, fresh.map(z => z.id), G.reduced() ? 0.4 : 2.6)).then(() => {
        for (const z of fresh) { delete V.s2.b[z.id]; (G.st.s2bloom = G.st.s2bloom || []).push(z.id); }
        G.save.write(); if (V.el.isConnected) V.applyMask();
      });
    }
  }
  // 지도 위 표시 (지도가 새로 그려질 때마다)
  function mapMarks(V) {
    if (!V || !V.s2) return;
    const P = G.D.places.places.filter(p => /^s2/.test(p.id));
    if (!done('s2_fog')) for (const p of P) V.setMarker(p.id, 'hidden', false);
    // 시끄러운 곳: 아직 끝내지 않은 소리 구역 장소 위에 지글지글 표시
    P.forEach((p, i) => {
      const on = done('s2_fog') && !cleared(p.id) && !done('s2_end'), e = V.s2.loud[p.id];
      if (on && !e) { const at = D2().loud[i]; V.s2.loud[p.id] = loudMark(V.fx, at[0], at[1] - 40, 'map'); }
      if (!on && e) { e.remove(); delete V.s2.loud[p.id]; }
    });
    // 학교 종이 빛으로도 울림 (교실을 끝낸 뒤)
    if (cleared('s2school') && !V.s2.bell) { const at = D2().loud[0]; V.s2.bell = G.el('div', 's2-glow', V.fx); Object.assign(V.s2.bell.style, { left: at[0] + 'px', top: (at[1] + 30) + 'px', zIndex: 2993 }); }
    // 엔딩 뒤: 마을 곳곳 쉼터 표시 (누르면 잠깐 쉼)
    if (done('s2_end') && !V.s2.rest) { V.s2.rest = D2().restMarks.map(at => restMark(V, at)); }
  }
  function restMark(V, at) {
    const b = G.el('button', 's2-restmark', V.fx, G.artImg('mark_rest') || ''); b.type = 'button'; b.setAttribute('aria-label', '쉼터 표시');
    Object.assign(b.style, { left: at[0] + 'px', top: at[1] + 'px' });
    G.onTap(b, () => { if (G.busy > 0 || G.dialog.active) return; calm(); });
    return b;
  }
  // 쉼터 표시를 누르면: 음악과 소리가 작아지고 숨 고르기 그림. [닫기]로 돌아감
  function calm() {
    G.busy++; G.audio.sfx('sfx_tap', 0.4);
    G.audio.music(''); G.audio.ambient([]);
    const m = G.el('div', 'modal s2-calm', G.$('#overlay'));
    G.el('div', 's2-breath', m, G.artImg('mark_rest') || '');
    G.el('div', 's2-calm-t', m, '잠깐 쉬어 가요');
    G.audio.voice('SD04_miru_04');
    const row = G.el('div', 'btn-row', m);
    G.btn('pill gold', G.icon('icon_ok') + ' 닫기', row, () => {
      m.remove(); G.busy = Math.max(0, G.busy - 1); G.audio.stopVoice();
      if (G.screen === 'map') { G.audio.music('music_night'); G.audio.ambient(['amb_crickets']); }
    }, '닫기');
  }

  // ---- 엔진 이름 감싸기 (지도) ----
  const show0 = G.map.show;
  G.map.show = async (o = {}) => { sync(); const r = await show0(o); maybeBegin(); return r; };
  const state0 = G.map.state;
  G.map.state = (p) => (/^s2/.test(p.id) && !done('s2_fog')) ? 'locked' : state0(p);
  const node0 = G.map.node, N2 = { s2school: 'S2_SCHOOL', s2hall: 'S2_HALL', s2rest: 'S2_REST' };
  G.map.node = (id) => (isExp && N2[id]) || node0(id);
  const mm0 = G.p4.mapMarks;
  G.p4.mapMarks = (V) => {
    mm0(V);
    if (!isExp) return;
    const e = V.fx.querySelector('.p4-mpole'), off = D2().map.off;   // 길의 별 안내 기둥: 넓은 지도에서는 옛 마을이 가운데로 옮겨 감
    if (e && !e.dataset.s2) { e.dataset.s2 = 1; e.style.left = (parseFloat(e.style.left) + off[0]) + 'px'; e.style.top = (parseFloat(e.style.top) + off[1]) + 'px'; }
    mapMarks(V);
  };
  // 문이 있는 곳 (공연장: 리듬 자물쇠)
  const gate0 = G.p4.gate;
  G.p4.gate = (p) => { if (p.s2gate) { if (done(p.s2gate)) return false; hallDoor(); return true; } return gate0(p); };
  // 지도 주민의 별가루 (소리 구역 주민 둘)
  const vh0 = G.p4.villagerHas, vd0 = G.p4.villagerDust;
  const s2giver = (vid) => isExp && D2().dustGive.includes(vid);
  G.p4.villagerHas = (vid) => s2giver(vid) ? !!G.st && !sd().includes('map:' + vid) : vh0(vid);
  G.p4.villagerDust = async (vid, el, fx, x, y) => { if (s2giver(vid)) return gain('map:' + vid, el, fx, x, y); return vd0(vid, el, fx, x, y); };
  // 가방: 소리의 별을 시작한 뒤에는 소리의 별 별가루
  const dl0 = G.p4.dustLine;
  G.p4.dustLine = (sh) => { if (!isExp) return dl0(sh); G.el('div', 'p4-bagdust', sh, (G.artImg('stardust') || '') + `<span>별가루 ${sd().length}/${D2().dustTotal}</span>`); };
  // 장면 속 물건의 별가루
  const ah0 = G.p4.afterHot;
  G.p4.afterHot = async (H, V, def, id) => {
    if (!def.s2) return ah0(H, V, def, id);
    const h = H.def; if (!(def.s2dustHot || []).includes(h.id)) return;
    const [x, y, w] = h.rect; await popDust(V, id + ':h:' + h.id, x + w / 2, y + 20, H.btn);
  };
  // 교사용 "이 퍼즐 바로 풀기"
  const can0 = G.p4.can, skip0 = G.p4.skip, reset0 = G.p4.reset;
  G.p4.can = () => !!cur || can0();
  G.p4.skip = () => { if (cur && cur.solve) cur.solve(); else skip0(); };
  G.p4.reset = () => { cur = null; reset0(); };
  // 할 일 카드: "소리의 별 찾기 n/4"
  const hm0 = G.hud.map, rq0 = G.hud.refreshQuest;
  function questFix() {
    if (!isExp) return; const q = G.hud.questEl; if (!q || !q.isConnected) return;
    const e = q.querySelector('.q1'); if (e) e.textContent = '소리의 별 찾기 ' + D2().quest.filter(cleared).length + '/' + D2().quest.length;
  }
  G.hud.map = () => { hm0(); questFix(); };
  G.hud.refreshQuest = () => { rq0(); questFix(); };
  // 연출: 소리의 별 장 제목은 "소리의 별-N". 길의 별 지도 연출(C1·C12)은 원래 지도로
  const cut0 = G.cut.play;
  G.cut.play = async (id, opts = {}) => {
    const s2ch = /^CH:s2/.test(id), old = isExp && /^(C1|C12|PARCH)$/.test(id), cs = G.D.story.chapterStar;
    if (s2ch) G.D.story.chapterStar = D2().chapterStar;
    if (old) { G.D.places = ORIG.places; G.D.mood = ORIG.mood; isExp = false; }
    try { return await cut0(id, opts); } finally { if (s2ch) G.D.story.chapterStar = cs; if (old) sync(); }
  };

  // ================= 도착 연출 (장소 이름) =================
  async function arriveS2(c, root, opts, place) {
    const U = G.cut.util, S = G.D.scenes[place];
    const { V, off } = await U.arrive(c, root, opts, place);
    if (S.zone === 'plaza' || cleared(place)) { V.colorImg.style.visibility = ''; V.colorImg.style.opacity = S.zone === 'plaza' ? V.colorImg.style.opacity : 1; }
    if (c.rm) V.setCam(1200, 540, 1); else V.setCam(1050, 560, 1.25);
    c.t0 = G.t;
    await Promise.all([
      U.fadeIn(c, root, 0.5),
      (async () => { if (!c.rm) await c.tween(0, 1, 3.6, k => V.setCam(1050 + 150 * k, 560 - 20 * k, 1.25 - 0.25 * k), 'io'); })(),
      U.title(c, root, S.name, 'S92_place_' + (S.zone || place), 0.8, 4.4),
    ]);
    V.setCam(1200, 540, 1); off();
  }
  G.cut.add({
    S2A_s2school: (c, r, o) => arriveS2(c, r, o, 's2school'),
    S2A_s2hall: (c, r, o) => arriveS2(c, r, o, 's2hall'),
    S2A_s2rest: (c, r, o) => arriveS2(c, r, o, 's2rest'),
    S2A_s2plaza: (c, r, o) => arriveS2(c, r, o, 's2plaza'),
  });

  // ================= 소리의 별-1: 동쪽 길 (길의 별 엔딩 뒤 저절로) =================
  let beginning = false, pollOff = null;
  const needBegin = () => !!G.st && (G.st.stars || 0) >= 1 && cleared('plaza2') && done('plaza2_star') && !done('s2_begin');
  function maybeBegin() {
    if (pollOff || beginning || !needBegin()) return;
    let calmT = 0; const g = G.gen;
    pollOff = G.every(dt => {
      if (g !== G.gen || !needBegin()) { pollOff(); pollOff = null; return; }
      if (G.busy > 0 || G.dialog.active || G.cut.active || G.screen !== 'map' || G.$('#overlay').children.length) { calmT = 0; return; }
      calmT += dt; if (calmT > 1.0) { pollOff(); pollOff = null; begin(); }
    });
  }
  async function begin() {
    if (beginning) return; beginning = true;
    const g = G.gen, ok = () => g === G.gen;
    try {
      G.help.off(); G.busy++;
      const ch = G.cut.play('CH:s2_1', { key: 's2_1', cover: true });
      G.st.place = G.st.place && N2[G.st.place] ? G.st.place : 'plaza';
      mark('s2_begin');
      await G.wait(0.2); if (!ok()) return;
      await G.map.show({}); if (!ok()) return;   // 넓은 지도 (장 제목 그림 뒤에서 미리 그림)
      G.hud.hide(true);
      await ch; if (!ok()) return;
      G.hud.hide(true);
      const V = G.map.V; if (!V) return;
      G.map.camFree = true;
      const c0 = { ...V.cam }, east = [4900, 1780], rm = G.reduced();
      await G.tween(0, 1, rm ? 0.3 : 2.4, k => V.setCam(c0.x + (east[0] - c0.x) * k, c0.y + (east[1] - c0.y) * k, c0.z), 'io'); if (!ok()) return;
      // 동쪽 하늘의 별이 깜박이고, 안개 속에서 지글지글 (실제 소리는 작고 짧게)
      const s = G.STARS.find(q => q.id === 'sound');
      const star = G.el('div', 's2-star', V.fx, G.starSvg(s, true)); Object.assign(star.style, { left: '4980px', top: '1380px', width: '150px', height: '150px', zIndex: 3005 });
      const blink = star.animate && !rm ? star.animate([{ opacity: .2 }, { opacity: 1 }, { opacity: .2 }], { duration: 1400, iterations: Infinity }) : null;
      const louds = D2().loud.map(at => loudMark(V.fx, at[0], at[1] - 40, 'map'));
      G.audio.sfx('sfx_chime', 0.12, 1.4);
      await G.wait(rm ? 0.4 : 1.6); if (!ok()) return;   // 대화 전에 동쪽 하늘·소리 표시를 먼저 보여 줌
      await play(['SD01_rumi_01', 'SD01_rumi_02'], { noPortraits: true }); if (!ok()) return;   // 첫 두 줄은 인물 그림 없이 (동쪽 풍경이 가리지 않게)
      G.audio.sfx('sfx_click', 0.15, 0.7);
      await play(['SD01_chief_01', 'SD01_chief_02', 'SD01_rumi_03', 'SD01_rumi_04'], { partner: 'chief' }); if (!ok()) return;
      // 안개가 걷힘
      const M = D2().map.places.map, fogB = G.el('img', 'bg s2-fog', null); fogB.src = G.asset(M.fog[1]); fogB.alt = ''; Object.assign(fogB.style, { width: V.W + 'px', height: V.H + 'px' });
      if (V.s2 && V.s2.fog) { V.imgs.insertBefore(fogB, V.s2.fog); G.audio.sfx('sfx_sparkle', 0.7); V.s2.fog.style.opacity = 0; await G.wait(rm ? 0.4 : 2.4); V.s2.fog.remove(); V.s2.fog = fogB; }
      if (!ok()) return;
      mark('s2_fog'); V.setLamps(G.st.mood);
      await play(['SD01_nar_01']); if (!ok()) return;
      louds.forEach(e => e.remove()); if (blink) blink.cancel(); star.remove();
      // 새 곳 (학교)
      G.$('#fade').classList.add('on'); await G.wait(0.45); if (!ok()) return;
      G.map.camFree = false;
      await G.map.show({}); if (!ok()) return;
      G.hud.hide(true);
      const V2 = G.map.V; G.map.camFree = true; V2.setCam(4980, 1950, V2.cam.z);
      G.$('#fade').classList.remove('on');
      const k = V2.markers.s2school; if (k && k.m.animate) k.m.animate([{ transform: 'scale(.3)' }, { transform: 'scale(1.5)' }, { transform: 'scale(1)' }], { duration: 900, easing: 'ease-out' });
      G.audio.sfx('sfx_sparkle', 0.6);
      await G.wait(0.6); if (!ok()) return;
      await play(['SD01_sys_01']); if (!ok()) return;
      G.map.camFree = false;
    } finally {
      beginning = false;
      if (g === G.gen) { G.busy = Math.max(0, G.busy - 1); G.hud.hide(false); G.hud.map(); if (G.screen === 'map') G.map.setHelp(); }
    }
  }

  // ================= 장면마다 (scene.js가 들어갈 때 부름) =================
  for (const id of ['s2school', 's2hall', 's2rest', 's2plaza']) G.sceneFx[id] = (V, def) => fx(V, def, id);
  function fx(V, def, id) {
    if (cleared(id) && id !== 's2plaza') { V.colorImg.style.visibility = ''; V.colorImg.style.opacity = 1; for (const l of V.lamps) l.el.classList.add('on'); }
    (def.s2dust || []).forEach(([x, y], i) => dustBtn(V, id + ':' + i, x, y));
    const loop = (every, fn) => { let t = every * 0.6; const off = G.every(dt => { if (!V.el.isConnected) { off(); return; } if (G.dialog.active || G.paused || G.busy > 0) return; t -= dt; if (t > 0) return; t = every; fn(); }); };
    if (id === 's2school') {
      const N = def.noise; V.s2 = { loud: {} };
      if (!done('s2school_noise') || !done('s2school_fix')) for (const k of noiseNeed(def)) if (!done('s2f_' + k)) V.s2.loud[k] = loudMark(V.fx, N.mark[k][0], N.mark[k][1]);
      if (done('s2f_chair')) tennis(V, def, false);
      if (done('s2f_bell')) bellLight(V, def);
      // 쉽게: 소리 나는 곳이 반짝임
      if (!G.lv('normal') && !done('s2school_noise')) for (const k of noiseNeed(def)) { const b = hotBtn(V, labelOf(def, k)); if (b && b.previousElementSibling) b.previousElementSibling.classList.add('strong'); }
      // 바람이 들어오는 창문, 쉬지 않는 종: 소리 없이 물결 그림으로
      loop(3.2, () => { if (!done('s2f_window')) wave(V.fx, def.wind[0], def.wind[1], 150); if (!done('s2f_bell')) wave(V.fx, def.bellLight[0], def.bellLight[1], 150); });
    }
    if (id === 's2rest') {
      if (done('s2rest_deco')) for (const d of def.deco) obj(V.fx, d.art, d.at[0], d.at[1], d.w);
      // 작은 종소리 찾기: 물결이 제일 큰 덤불 (소리 없이도 풀 수 있게)
      loop(1.8, () => { if (!done('s2rest_deco') || done('s2rest_star')) return; bushWaves(V, def); });
    }
    if (id === 's2plaza') {
      for (const p of def.props || []) obj(V.fx, p.art, p.at[0], p.at[1], p.w);
      if (done('s2plaza_concert')) (def.concertDust || []).forEach(([x, y], i) => dustBtn(V, 's2plaza:c' + i, x, y));
    }
  }
  const labelOf = (def, id) => (def.hotspots.find(h => h.id === id) || {}).label;
  const noiseNeed = (def) => def.noise.order.filter(k => !def.noise.lv[k] || G.lv(def.noise.lv[k]));
  function tennis(V, def, anim) { const t = def.tennis, x = t.reduce((a, q) => a + q[0], 0) / t.length, y = Math.max(...t.map(q => q[1])); obj(V.fx, 'item_tennis', x + 90, y - 10, 80, anim ? 'pop' : ''); }   // 테니스공 주머니를 의자 옆에
  function dropSpot(V, def) {   // 의자 다리 자리: 반짝이는 점선 원 + 위에서 가리키는 화살표
    const r = def.hotspots.find(h => h.id === 'chair').rect, x = r[0] + r[2] / 2, y = r[1] + r[3] * 0.78;
    const e = G.el('div', 's2-drop', V.fx, '<i></i><div class="arrow">' + G.arrowHtml() + '</div>'); Object.assign(e.style, { left: x + 'px', top: y + 'px' }); return e;
  }
  function bellLight(V, def) { const g = G.el('div', 's2-glow', V.fx); Object.assign(g.style, { left: def.bellLight[0] + 'px', top: def.bellLight[1] + 'px' }); return g; }
  function quiet(V, k) { const e = V.s2 && V.s2.loud[k]; if (e) { e.classList.add('gone'); setTimeout(() => e.remove(), 650); delete V.s2.loud[k]; } }
  function bushWaves(V, def) {
    const B = def.bushes, list = B.lv[G.level()] || B.lv.normal, rect = (b) => labelRect(def, b), c = rect(B.star);
    const far = Math.max(1, ...list.map(b => { const r = rect(b); return Math.hypot(r[0] - c[0], r[1] - c[1]); }));
    for (const b of list) {
      const r = rect(b), d = Math.hypot(r[0] - c[0], r[1] - c[1]);
      const size = b === B.star ? 230 : 70 + 70 * (1 - d / far);
      wave(V.fx, r[0], r[1] - 60, size);
    }
  }
  const labelRect = (def, id) => { const h = def.hotspots.find(q => q.id === id); return [h.rect[0] + h.rect[2] / 2, h.rect[1] + h.rect[3] / 2]; };

  // ================= 소리의 별-2: 학교 교실 =================
  G.flows.s2_school = async (ctx) => {
    const { S, V, H, g, complete } = ctx, ok = () => g === G.gen, id = H.def.id, N = S.noise;
    if (id === 'daon') {   // 다온: 교실이 너무 시끄러워
      await play(['SD02_daon_01', 'SD02_daon_02', 'SD02_rumi_02'], { partner: 'daon' }); if (!ok()) return;
      mark('s2s_talk'); G.scene.reveal(); return;
    }
    if (id === 'daon2') {
      if (!done('s2school_fix')) { await play(['SD02_daon_02'], { partner: 'daon' }); return; }
      if (!done('s2school_ask')) return askKids(ctx);
      await play([done('s2school_card') ? 'SD02_daon_08' : 'SD02_daon_10'], { partner: 'daon' }); return;
    }
    if (id === 'v5') { if (!done('s2school_ask')) return askKids(ctx); await play(['SD02_v5_01'], { partner: 'v5' }); return; }
    if (id === 'board') {   // 칠판: 단장님의 리듬 카드
      if (done('s2school_card')) { await play(['SD02_daon_09'], { partner: 'daon' }); return; }
      await play(['SD02_daon_08', 'SD02_daon_07', 'SD02_daon_09'], { partner: 'daon' }); if (!ok()) return;
      await presentItem('rhythm'); if (!ok()) return;
      await colorIn(V); if (!ok()) return;
      complete('s2school_card'); return;
    }
    // 소리 나는 곳 찾기 (의자, 창문, 종 + 어렵게: 사물함)
    if (!N.order.includes(id)) return;
    const need = noiseNeed(S);
    if (!done('s2school_noise')) {
      if (!need.includes(id)) return;   // 쉽게·보통의 사물함: 별가루만
      const [sn, sv, sr] = N.sfx[id]; G.audio.sfx(sn, sv, sr);   // 작고 짧은 소리, 대신 물결 그림이 크게
      wave(V.fx, N.mark[id][0], N.mark[id][1], 220, 2);
      await play([N.line[id]]); if (!ok()) return;
      mark('s2n_' + id);
      if (!need.every(k => done('s2n_' + k))) return;
      complete('s2school_noise');
    }
    if (!done('s2school_fix')) await fix(ctx);
  };
  async function fix({ S, V, g, complete }) {
    const ok = () => g === G.gen, need = noiseNeed(S);
    if (!done('s2f_chair')) {
      await play(['SD02_daon_03'], { partner: 'daon' }); if (!ok()) return;
      await play(['SD02_rumi_07']); if (!ok()) return;
      const spot = dropSpot(V, S);   // 10/4 선생님: 테니스공을 어디에 놓을지 잘 안 보임 → 의자 다리에 반짝 원과 화살표
      const u = await G.p4.useItem('tennis', hotBtn(V, labelOf(S, 'chair')), { say, hint: 'SD02_rumi_07' }); spot.remove(); if (!ok() || !u) return;
      tennis(V, S, true); quiet(V, 'chair'); mark('s2f_chair');
      await play(['SD02_rumi_08']); if (!ok()) return;
    }
    if (!done('s2f_window')) {
      await play(['SD02_rumi_09']); if (!ok()) return;
      await waitTap(hotBtn(V, labelOf(S, 'window')), { hint: 'SD02_rumi_09' }); if (!ok()) return;
      G.audio.sfx('sfx_door', 0.25, 1.3); spark(hotBtn(V, labelOf(S, 'window')), 8); quiet(V, 'window'); mark('s2f_window');
    }
    if (!done('s2f_bell')) {
      await play(['SD02_daon_04'], { partner: 'daon' }); if (!ok()) return;
      await waitTap(hotBtn(V, labelOf(S, 'bell')), { hint: 'SD02_daon_04' }); if (!ok()) return;
      G.audio.sfx('sfx_chime', 0.15, 1.2); bellLight(V, S); quiet(V, 'bell'); mark('s2f_bell');
    }
    if (need.includes('locker') && !done('s2f_locker')) {
      // 10/4 선생님: 덜컹거린다는 말만 반복하지 않고, 문을 눌러 닫고 '딸깍' 하고 끝나게
      await play(['SD02_rumi_13']); if (!ok()) return;
      const lk = hotBtn(V, labelOf(S, 'locker'));
      await waitTap(lk, { hint: 'SD02_rumi_13' }); if (!ok()) return;
      G.audio.sfx('sfx_door', 0.25, 1.1); setTimeout(() => G.audio.sfx('sfx_click', 0.3, 0.8), 260); spark(lk, 8); quiet(V, 'locker'); mark('s2f_locker');
      await play(['SD02_rumi_14']); if (!ok()) return;
    }
    complete('s2school_fix');
    await play(['SD02_rumi_10']);
  }
  // 친구들에게 묻기: 안경 쓴 학생 → 다온 (한 번에 둘 다)
  async function askKids({ g, complete }) {
    const ok = () => g === G.gen;
    G.dialog.open('v5'); await ask('SD02_ply_01'); if (!ok()) return;
    await play(['SD02_v5_01'], { partner: 'v5', keep: true }); if (!ok()) return;
    G.dialog.open('daon'); await ask('SD02_ply_01'); if (!ok()) return;
    await play(['SD02_daon_05', 'SD02_daon_06', 'SD02_daon_10', 'SD02_rumi_11'], { partner: 'daon' }); if (!ok()) return;
    complete('s2school_ask');
    await play(['SD02_rumi_12']);
  }

  // ================= 소리의 별-3: 공연장 =================
  async function hallDoor() {
    const g = G.gen, ok = () => g === G.gen, first = !G.st.seenCutscenes.includes('S2A_s2hall');
    G.busy++; G.$('#fade').classList.add('on'); await G.wait(0.45); G.busy = Math.max(0, G.busy - 1); if (!ok()) return;
    G.map.hide(); G.hud.clear(); G.screen = 'door';
    const S = screen('p4-door');
    const DS = D2().rhythm.door || [1376, 768], B = board(S.root, DS[0], DS[1], 'p4-doorbg'); B.el.style.backgroundImage = `url("${ART('music_door')}")`;
    const plate = G.el('button', 'p4-plate', B.el); plate.type = 'button'; plate.setAttribute('aria-label', '북 자물쇠');
    const P = D2().rhythm.panel; Object.assign(plate.style, { position: 'absolute', left: (P[0] - P[2]) + 'px', top: (P[1] - P[2]) + 'px', width: P[2] * 2 + 'px', height: P[2] * 2 + 'px', borderRadius: '50%', border: 0, background: 'transparent' });
    const tr = G.el('div', 'pz-tr', S.root);
    let step = true;
    const leave = async () => { if (step || G.dialog.active || !ok()) return; S.end(); G.$('#fade').classList.add('on'); await G.wait(0.45); await G.map.show(); G.$('#fade').classList.remove('on'); };
    G.btn('pill', G.icon('icon_map') + ' 지도로', tr, () => leave(), '지도로');
    S.layout = () => B.fit([0, 0, G.stage.W, G.stage.H], DS[0] / DS[1] > 1.2); S.layout();
    if (first) { const ch = G.cut.play('CH:s2hall', { key: 's2hall', cover: true }); G.$('#fade').classList.remove('on'); await ch; G.hud.hide(true); }
    else G.$('#fade').classList.remove('on');
    await G.wait(0.3); if (!ok()) return;
    G.audio.music('music_library'); G.audio.ambient([]);
    await play(['SD03_rumi_01']); if (!ok()) return;
    if (!has('rhythm')) { step = false; return; }
    await play(['SD03_rumi_02']); if (!ok()) return;
    step = false;
    const used = await G.p4.useItem('rhythm', plate, { parent: S.root, say: S.say, hint: 'SD03_rumi_02' }); if (!ok() || !used) return;
    step = true;
    const won = await rhythmLock(S); if (!ok() || !won) return;
    G.audio.sfx('sfx_door', 0.6);
    if (B.el.animate) await B.el.animate([{ filter: 'brightness(1)' }, { filter: 'brightness(1.6)' }, { filter: 'brightness(1)' }], { duration: 900 }).finished.catch(() => { });
    await play(['SD03_rumi_05']); if (!ok()) return;
    mark('s2door_open');
    S.end(); G.$('#fade').classList.add('on'); await G.wait(0.45); if (!ok()) return;
    if (first) { G.hud.hide(true); const a = G.cut.play('S2A_s2hall'); G.$('#fade').classList.remove('on'); await a; if (!ok()) return; G.$('#fade').classList.add('on'); await G.wait(0.3); }
    G.scene.enter('s2hall');
  }
  // 리듬 자물쇠: 카드의 큰 동그라미 = 쿵(큰 북), 작은 동그라미 = 짝(작은 북). 빛나는 순서대로 누름. 틀려도 처음으로 돌아가지 않음
  function rhythmLock(S) {
    return new Promise((res) => {
      const R = D2().rhythm, pat = R[G.level()] || R.normal, easy = !G.lv('normal'), g = G.gen, ok = () => g === G.gen;
      const wrap = G.el('div', 's2-wrap dim', S.root);
      const card = G.el('div', 's2-card', wrap);
      G.el('div', 's2-card-head', card, G.icon('item_rhythm_card') + ' 리듬 카드');
      const beats = [...pat].map(ch => { const b = G.el('div', 's2-beat ' + (ch === 'B' ? 'big' : 'small'), card, G.artImg(ch === 'B' ? 'beat_big' : 'beat_small') || ''); b.dataset.k = ch; return b; });
      const pads = G.el('div', 's2-pads', wrap);
      const pad = (k, label) => { const b = G.btn('s2-pad ' + (k === 'B' ? 'big' : 'small'), `<div class="pimg">${G.artImg(k === 'B' ? 'beat_big' : 'beat_small') || ''}</div><span>${label}</span>`, pads, () => hit(k, b), label); return b; };
      const pB = pad('B', '쿵'), pS = pad('s', '짝');
      let i = 0, fin = false, demo = true, arrow = null;
      const sound = (k) => G.audio.sfx(k === 'B' ? 'sfx_tap' : 'sfx_click', 0.35, k === 'B' ? 0.6 : 1.3);
      const flash = (el, cls) => { el.classList.add(cls); setTimeout(() => el.classList.remove(cls), 280); };
      const nextGlow = () => beats.forEach((b, j) => b.classList.toggle('next', easy && j === i && !fin));
      S.layout = () => { const [x, y, w, h] = area(S); Object.assign(wrap.style, { left: x + 'px', top: y + 'px', width: w + 'px', height: h + 'px' }); const k = Math.min(1, h / (G.stage.u * 560), w / (G.stage.u * 900)); wrap.style.transform = k < 1 ? `scale(${k.toFixed(3)})` : ''; };
      S.layout(); requestAnimationFrame(S.layout);
      wrap.animate && wrap.animate([{ opacity: 0, transform: 'scale(.92)' }, { opacity: 1, transform: 'none' }], { duration: 400, easing: 'ease-out' });
      // 처음: 카드의 동그라미가 차례로 빛남 (소리는 작게, 빛으로도 박자)
      (async () => {
        await play(['SD03_rumi_03', 'SD03_rumi_04']); if (!ok()) return;
        for (let r = 0; r < pat.length; r++) { if (!ok() || fin) return; flash(beats[r], 'flash'); flash(pat[r] === 'B' ? pB : pS, 'hit'); sound(pat[r]); await G.wait(G.reduced() ? 0.35 : 0.6); }
        demo = false; nextGlow();
      })();
      function hit(k, b) {
        if (fin || demo || G.dialog.active) return;
        clear(); sound(k); flash(b, 'hit');
        if (k === pat[i]) { beats[i].classList.add('on'); i++; nextGlow(); if (i >= pat.length) win(); return; }
        wob(b); card.classList.remove('look'); void card.offsetWidth; card.classList.add('look'); S.say('SD03_rumi_03');
      }
      async function win() {
        if (fin) return; fin = true; cur = null; G.help.off(); clear(); S.hush(); nextGlow();
        beats.forEach(b => b.classList.add('on'));
        for (let r = 0; r < beats.length; r++) { G.audio.sfx('sfx_chime', 0.3, 0.9 + r * 0.1); await G.wait(G.reduced() ? 0.05 : 0.22); }
        spark(card, 14); await G.wait(0.8); wrap.remove(); S.layout = null; res(ok());
      }
      function clear() { if (arrow) arrow.remove(); arrow = null; pB.classList.remove('hint'); pS.classList.remove('hint'); }
      const want = () => pat[i] === 'B' ? pB : pS;
      cur = { solve: () => { demo = false; i = pat.length; win(); } };
      G.help.set({ l1: () => S.say('SD03_rumi_04'), l2: () => { if (!arrow && !demo) arrow = arrowAt(S.root, want()); }, l3: () => { if (!demo) want().classList.add('hint'); }, clear });
    });
  }
  G.flows.s2_hall = async (ctx) => {
    const { S, V, H, g, complete } = ctx, ok = () => g === G.gen, id = H.def.id, o = { partner: 'duri' };
    if (id === 'duri') {
      if (!done('s2hall_duri')) {
        await play(['SD03_duri_01', 'SD03_duri_02', 'SD03_duri_03', 'SD03_duri_04'], { ...o, keep: true }); if (!ok()) return;
        await ask('SD03_ply_01', 'icon_star'); if (!ok()) return;
        await play(['SD03_hero_01', 'SD03_duri_05', 'SD03_duri_06', 'SD03_rumi_06'], o); if (!ok()) return;
        complete('s2hall_duri'); return;
      }
      await play([!done('s2hall_seats') ? 'SD03_duri_06' : !done('s2hall_score') ? 'SD03_duri_07' : 'SD03_duri_09'], o); return;
    }
    if (id === 'seats') {
      if (done('s2hall_seats')) { await play(['SD03_rumi_07']); return; }
      const w = await seats(); if (!ok() || !w) return;
      await play(['SD03_rumi_07']); if (!ok()) return;
      await play(['SD03_duri_07'], o); if (!ok()) return;
      complete('s2hall_seats'); return;
    }
    if (id === 'score') {
      if (done('s2hall_score')) { await play(['SD03_duri_09'], o); return; }
      await play(['SD03_rumi_08']); if (!ok()) return;
      await presentItem('score'); if (!ok()) return;
      await play(['SD03_duri_09'], o); if (!ok()) return;
      await colorIn(V); if (!ok()) return;
      complete('s2hall_score'); return;
    }
    if (id === 'drum') {   // 큰 북: 부드러운 쿵 + 물결
      G.audio.sfx('sfx_tap', 0.35, 0.55); wave(V.fx, S.drumAt[0], S.drumAt[1], 260, 2);
      const sp = H.glow; if (sp && sp.animate) sp.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.06)' }, { transform: 'scale(1)' }], { duration: 400 });
    }
  };
  // 자리 정하기: 사람을 누르면 어떤 자리가 편한지 말함. 그 자리로 끌어다 놓음. 다른 자리면 살며시 돌아옴
  function seats() {
    return new Promise((res) => {
      const C = D2().seats, g = G.gen, ok = () => g === G.gen, easy = !G.lv('normal');
      const people = C.people.filter(p => !p.lv || G.lv(p.lv)), need = new Set(people.map(p => p.seat));
      const S = screen('s2-seats');
      const SZ = C.size || [1600, 900], B = board(S.root, SZ[0], SZ[1]); B.el.style.backgroundImage = `url("${ART('hall_seats')}")`; B.el.style.borderRadius = '30px';
      const zones = {};
      for (const [k, z] of Object.entries(C.zones)) {
        if (!need.has(k)) continue;
        const e = zones[k] = G.el('div', 's2-zone', B.el); const [x, y, w, h] = z.rect; Object.assign(e.style, { left: x + 'px', top: y + 'px', width: w + 'px', height: h + 'px' }); e.dataset.k = k;
        G.el('div', 's2-zl', e, (z.art ? G.artImg(z.art) || '' : '') + z.label);
      }
      const tray = G.el('div', 's2-tray', S.root);
      let fin = false, arrow = null, left = people.length;
      const cards = people.map(p => {
        const P = G.D.portraits[p.id], b = G.btn('s2-person', `<img class="pf" src="${G.asset(P ? P.img : 'assets/chars/lumi.png')}" alt=""><span>${p.name}</span>`, tray, () => listen(p, b), p.name);
        G.p4.dragTo(b, () => Object.values(zones), (t) => drop(p, b, t));
        return { p, b };
      });
      S.layout = () => {
        const [x, y, w, h] = area(S), u = G.stage.u;
        // 10/2 선생님: 가로로 넓은 화면은 사람 카드를 오른쪽 세로 줄로 두고 객석 그림을 크게 (루미 버튼 자리는 비움)
        const side = w / h > 1.45; tray.classList.toggle('side', side); tray.classList.toggle('many', people.length > 2);
        if (side) {
          const tw = tray.getBoundingClientRect().width || u * 260, bl = S.root.querySelector('.pz-bl'), lw = bl ? bl.getBoundingClientRect().width * 0.7 : 0;
          Object.assign(tray.style, { left: (x + w - tw) + 'px', top: (y + h / 2) + 'px', transform: 'translateY(-50%)' });
          B.fit([x + lw, y, w - tw - lw - u * 20, h]); return;
        }
        const th = tray.getBoundingClientRect().height || u * 180;
        Object.assign(tray.style, { left: (x + w / 2) + 'px', top: (y + h - th) + 'px', transform: 'translateX(-50%)' });
        B.fit([x, y, w, h - th - u * 20]);
      };
      S.layout(); requestAnimationFrame(S.layout);
      async function listen(p, b) {
        if (fin || G.dialog.active) return; clear();
        await play([p.line], { partner: G.D.portraits[p.id] ? p.id : undefined }); if (!ok()) return;
        if (easy && !b.classList.contains('done')) { const z = zones[p.seat]; z.classList.add('hint'); setTimeout(() => z.classList.remove('hint'), 2600); }
      }
      function drop(p, b, t) {
        if (fin) return; clear();
        if (t.dataset.k !== p.seat) { wob(b); G.audio.sfx('sfx_tap', 0.4); S.say(p.line); return; }
        seat(p, b);
      }
      function seat(p, b) {
        const P = G.D.portraits[p.id], im = G.el('img', 's2-seated', zones[p.seat]); im.src = G.asset(P ? P.img : 'assets/chars/lumi.png'); im.alt = '';
        b.classList.add('done'); G.audio.sfx('sfx_chime', 0.5); spark(im, 8);
        if (--left <= 0) win(); else requestAnimationFrame(S.layout);
      }
      async function win() {
        if (fin) return; fin = true; cur = null; G.help.off(); clear(); S.hush();
        G.audio.sfx('sfx_sparkle', 0.7); await G.wait(1.0); S.end(); res(ok());
      }
      const nextP = () => cards.find(c => !c.b.classList.contains('done'));
      function clear() { if (arrow) arrow.remove(); arrow = null; cards.forEach(c => c.b.classList.remove('hint')); Object.values(zones).forEach(z => z.classList.remove('hint')); }
      cur = { solve: () => { for (const c of cards) if (!c.b.classList.contains('done')) seat(c.p, c.b); } };
      G.help.set({
        l1: () => S.say('SD03_rumi_06'),
        l2: () => { const c = nextP(); if (c && !arrow) arrow = arrowAt(S.root, c.b); },
        l3: () => { const c = nextP(); if (!c) return; c.b.classList.add('hint'); zones[c.p.seat].classList.add('hint'); },
        clear,
      });
    });
  }

  // ================= 소리의 별-4: 쉼터 =================
  G.flows.s2_rest = async (ctx) => {
    const { S, V, H, g, complete } = ctx, ok = () => g === G.gen, id = H.def.id, o = { partner: 'miru' };
    if (id === 'miru') {
      if (!done('s2rest_miru')) {
        await play(['SD04_miru_01', 'SD04_miru_02', 'SD04_miru_03'], { ...o, keep: true }); if (!ok()) return;
        await ask('SD04_ply_01'); if (!ok()) return;
        await play(['SD04_miru_04', 'SD04_miru_05'], o); if (!ok()) return;
        complete('s2rest_miru'); return;
      }
      await play([!done('s2rest_box') ? 'SD04_miru_05' : !done('s2rest_deco') ? 'SD04_miru_06' : !done('s2rest_star') ? 'SD04_miru_12' : 'SD04_miru_15'], o); return;
    }
    if (id === 'box') {
      if (done('s2rest_box')) { await play(['SD04_rumi_03']); return; }
      await play(['SD04_rumi_02']); if (!ok()) return;
      const w = await picLock(); if (!ok() || !w) return;
      await play(['SD04_rumi_03']); if (!ok()) return;
      complete('s2rest_box');
      await play(['SD04_miru_06'], o); return;
    }
    if (id === 'pavilion') {
      if (done('s2rest_deco')) { await play(['SD04_miru_10'], o); return; }
      await play(['SD04_rumi_04']); if (!ok()) return;
      const w = await deco(ctx); if (!ok() || !w) return;
      await play(['SD04_miru_10'], o); if (!ok()) return;
      complete('s2rest_deco');
      await play(['SD04_miru_11', 'SD04_rumi_05', 'SD04_miru_12', 'SD04_rumi_06'], o); if (!ok()) return;
      bushWaves(V, S); return;
    }
    if (/^bush/.test(id)) {
      if (done('s2rest_star')) return;
      const r = labelRect(S, id);
      if (id !== S.bushes.star) {   // 여기가 아니야: 덤불만 살랑, 물결을 보라고 알려 줌 (실패 소리 없음)
        if (H.glow && H.glow.animate) H.glow.animate([{ transform: 'rotate(0)' }, { transform: 'rotate(-3deg)' }, { transform: 'rotate(3deg)' }, { transform: 'rotate(0)' }], { duration: 400 });
        bushWaves(V, S); await play(['SD04_miru_12'], o); return;
      }
      G.audio.sfx('sfx_chime', 0.12, 1.7);   // 아주 작은 종소리
      const s = G.STARS.find(q => q.id === 'sound'), st = G.el('div', 's2-star', V.fx, G.artImg('item_piece_sound') || G.starSvg(s));
      Object.assign(st.style, { left: r[0] + 'px', top: r[1] + 'px', width: '150px', height: '150px', filter: 'grayscale(.7)' });
      await G.tween(0, 1, G.reduced() ? 0.2 : 1.0, k => st.style.transform = `translate(-50%,${-50 - 80 * k}%) scale(${0.4 + 0.6 * k})`, 'out'); if (!ok()) return;
      await play(['SD04_rumi_07']); if (!ok()) return;
      st.remove();
      await presentItem('piece_sound'); if (!ok()) return;
      await play(['SD04_miru_13', 'SD04_miru_14', 'SD04_miru_15'], o); if (!ok()) return;
      await colorIn(V); if (!ok()) return;
      complete('s2rest_star');
    }
  };
  // 그림 자물쇠: 악보 뒤 그림 순서대로 (쉽게 2칸, 보통 3칸, 어렵게 3칸 갔다가 돌아오기)
  function picLock() {
    return new Promise((res) => {
      const L = D2().picLock, g = G.gen, ok = () => g === G.gen, easy = !G.lv('normal');
      const order = easy ? L.order.slice(0, 2) : G.lv('hard') ? [...L.order, ...L.order.slice(0, -1).reverse()] : L.order.slice();
      const S = screen('s2-box');
      const wrap = G.el('div', 's2-wrap dim', S.root);
      const note = G.el('div', 's2-card', wrap);
      G.el('div', 's2-card-head', note, G.icon('item_score') + ' 악보 뒤 그림');
      const np = G.el('div', 's2-note-pics', note), noteImgs = order.map(k => { const i = G.el('img', '', np); i.src = ART(L.art[k]); i.alt = ''; return i; });
      const B = board(wrap, L.size[0], L.size[1]); B.el.style.backgroundImage = `url("${ART('rest_box')}")`; B.el.style.position = 'relative';
      const holder = G.el('div', '', wrap); holder.style.position = 'relative'; holder.appendChild(B.el);
      const nWin = Math.min(order.length, L.win.length);
      const wins = L.win.slice(0, nWin).map(([x, y]) => { const w = G.el('div', 's2-win', B.el); Object.assign(w.style, { left: (x - L.ww / 2) + 'px', top: (y - L.ww / 2) + 'px', width: L.ww + 'px', height: L.ww + 'px' }); return w; });
      const pics = G.el('div', 's2-pics', wrap);
      const btns = {}; for (const k of shuffle(L.order)) btns[k] = G.btn('s2-pic', `<img src="${ART(L.art[k])}" alt=""><span>${L.name[k]}</span>`, pics, () => press(k), L.name[k]);
      let i = 0, fin = false, arrow = null;
      S.layout = () => {
        const [x, y, w, h] = area(S), u = G.stage.u; Object.assign(wrap.style, { left: x + 'px', top: y + 'px', width: w + 'px', height: h + 'px' });
        const rest = note.getBoundingClientRect().height + pics.getBoundingClientRect().height + u * 60, bh = Math.max(80, Math.min(h - rest, w * 0.6 * L.size[1] / L.size[0]));
        const k = bh / L.size[1]; holder.style.width = (L.size[0] * k) + 'px'; holder.style.height = bh + 'px'; B.el.style.position = 'absolute'; B.fit([0, 0, L.size[0] * k, bh]);
        if (arrow) { arrow.remove(); arrow = null; }
      };
      S.layout(); requestAnimationFrame(S.layout);
      const glowNext = () => { for (const k in btns) btns[k].classList.toggle('hint', easy && !fin && order[i] === k); noteImgs.forEach((im, j) => im.classList.toggle('on', j < i)); };
      glowNext();
      function press(k) {
        if (fin || G.dialog.active) return; clear();
        G.audio.sfx('sfx_tap', 0.5);
        if (k !== order[i]) { wob(btns[k]); note.classList.remove('look'); void note.offsetWidth; note.classList.add('look'); S.say('SD04_rumi_02'); return; }
        const w = wins[i < nWin ? i : 2 * (nWin - 1) - i];
        if (i < nWin) { w.innerHTML = `<img src="${ART(L.art[k])}" alt="">`; } else { w.classList.remove('lit'); void w.offsetWidth; }
        w.classList.add('lit'); G.audio.sfx('sfx_chime', 0.35, 0.9 + i * 0.1);
        i++; glowNext(); if (i >= order.length) win();
      }
      async function win() {
        if (fin) return; fin = true; cur = null; G.help.off(); clear(); S.hush(); glowNext();
        G.audio.sfx('sfx_door', 0.5); spark(B.el, 14);
        if (B.el.animate) await B.el.animate([{ filter: 'brightness(1)' }, { filter: 'brightness(1.5)' }, { filter: 'brightness(1)' }], { duration: 800 }).finished.catch(() => { });
        await G.wait(0.4); S.end(); res(ok());
      }
      function clear() { if (arrow) arrow.remove(); arrow = null; for (const k in btns) btns[k].classList.remove('hint'); glowNext(); }
      cur = { solve: () => { while (!fin && i < order.length) press(order[i]); } };
      G.help.set({ l1: () => S.say('SD04_rumi_02'), l2: () => { if (!arrow && !fin) arrow = arrowAt(S.root, btns[order[i]]); }, l3: () => { if (!fin) btns[order[i]].classList.add('hint'); }, clear });
    });
  }
  // 쉼터 꾸미기: 쿠션, 커튼, 헤드폰, 쉬고 싶어요 카드를 쉼터로 끌어다 놓기 (누르기도 됨)
  function deco({ S, V, H, g }) {
    return new Promise((res) => {
      const ok = () => g === G.gen, items = S.deco, target = H.btn;
      const tray = G.el('div', 's2-deco', G.$('#closeup'));
      G.el('div', 'p4-tray-head', tray, G.icon('icon_bag') + ' 상자');
      let left = items.length, busyD = false, fin = false, sel = null;
      target.classList.add('p4-target');
      const put = async (d, b) => {
        if (busyD || fin || b.classList.contains('done')) return; busyD = true; G.help.poke();
        b.classList.add('done'); target.classList.remove('p4-target-on'); sel = null;
        const e = obj(V.fx, d.art, d.at[0], d.at[1], d.w, 'pop'); G.audio.sfx('sfx_chime', 0.45); spark(e, 8);
        if (d.line) { await play([d.line], { partner: 'miru' }); if (!ok()) return; }
        if (d.id === 'cushion') { await popDust(V, 's2rest:cushion', d.at[0], d.at[1] - 40, e); if (!ok()) return; }
        busyD = false;
        if (--left <= 0) end();
      };
      const btns = items.map(d => {
        const b = G.btn('p4-item', `<img src="${ART(d.art)}" alt="">`, tray, () => { if (busyD) return; G.audio.sfx('sfx_tap', 0.5); sel = { d, b }; tray.querySelectorAll('.sel').forEach(q => q.classList.remove('sel')); b.classList.add('sel'); target.classList.add('p4-target-on'); }, d.id);
        G.p4.dragTo(b, () => [target], () => put(d, b), { can: () => !busyD });
        return { d, b };
      });
      const onT = (e) => { if (fin || G.dialog.active || G.paused) return; e.stopImmediatePropagation(); e.preventDefault(); if (sel) put(sel.d, sel.b); };
      target.addEventListener('click', onT, true);
      function end() { if (fin) return; fin = true; cur = null; G.help.off(); target.removeEventListener('click', onT, true); target.classList.remove('p4-target', 'p4-target-on'); tray.remove(); res(ok()); }
      const nextB = () => btns.find(x => !x.b.classList.contains('done'));
      cur = { solve: async () => { for (const x of btns) if (!x.b.classList.contains('done')) { await put(x.d, x.b); } } };
      G.help.set({ l1: () => say('SD04_rumi_04'), l2: () => { }, l3: () => { const n = nextB(); if (n) { n.b.classList.add('sel'); target.classList.add('p4-target-on'); sel = n; } }, clear: () => { } });
    });
  }

  // ================= 소리의 별-5: 광장 음악회 =================
  G.flows.s2_plaza = async (ctx) => {
    const { S, V, H, g, complete } = ctx, ok = () => g === G.gen, id = H.def.id;
    if (id === 'duri') {
      if (done('s2plaza_concert')) { await play(['SD05_duri_02'], { partner: 'duri' }); return; }
      await play(['SD05_duri_01'], { partner: 'duri' }); if (!ok()) return;
      await play(['SD05_miru_01'], { partner: 'miru' }); if (!ok()) return;
      await play(['SD05_daon_01', 'SD05_daon_02'], { partner: 'daon' }); if (!ok()) return;
      await play(['SD05_duri_02'], { partner: 'duri' }); if (!ok()) return;
      await concert(V, S); if (!ok()) return;
      const s = G.STARS.find(q => q.id === 'sound'), st = G.el('div', 's2-star', G.$('#overlay'), G.starSvg(s));
      Object.assign(st.style, { left: '50%', top: '22%', width: G.stage.u * 170 + 'px', height: G.stage.u * 170 + 'px', position: 'absolute', opacity: 0.3, filter: 'grayscale(.8)' });
      await play(['SD05_rumi_01']); if (!ok()) { st.remove(); return; }
      G.audio.sfx('sfx_sparkle', 0.7);
      G.tween(0, 1, 1.6, k => { st.style.opacity = 0.3 + 0.7 * k; st.style.filter = `grayscale(${0.8 * (1 - k)}) drop-shadow(0 0 ${30 * k}px rgba(220,190,255,1))`; });
      await play(['SD05_rumi_02']); st.remove(); if (!ok()) return;
      await play(['SD05_chief_01'], { partner: 'chief' }); if (!ok()) return;
      (S.concertDust || []).forEach(([x, y], i) => { const b = dustBtn(V, 's2plaza:c' + i, x, y); if (b) G.audio.sfx('sfx_sparkle', 0.5); });
      complete('s2plaza_concert'); return;
    }
    if (id === 'pedestal') {
      if (sd().length < D2().dustNeed) { await play(['E11_chief_01'], { partner: 'chief' }); return; }
      if (has('piece_sound')) {
        say('SD05_rumi_03');
        const u = await G.p4.useItem('piece_sound', H.btn, { say, hint: 'SD05_rumi_03' }); if (!u || !ok()) return;
      }
      await starRise(V, H); if (!ok()) return;
      await play(['SD05_chief_02', 'SD05_chief_03'], { partner: 'chief' }); if (!ok()) return;   // 10/3 선생님: 길의 별처럼 촌장님 정리 멘트
      if (!cleared('s2plaza')) G.st.cleared.push('s2plaza');   // 별을 올리면 바로 엔딩 (C7 없이)
      complete('s2plaza_star'); if (!ok()) return;
      await ending();
    }
  };
  // 짧은 음악회: 부드러운 음악, 박자는 가로등 빛과 무대 빛으로도
  // 10/4 선생님: 효과가 부족함 → 약 10초 동안 하늘색 음표가 무대와 사람들 위로 천천히 떠오르고, 모두 박자에 맞춰 살살 몸을 흔듦
  const CONCERT_MUSIC = 'music_concert';   // 오케스트라 음원을 받으면 'music_concert'로 바꿈
  function floatNote(box, x, y) {
    const h = 60 + Math.random() * 40, e = note(box, 'calm', h), sw = (Math.random() < .5 ? -1 : 1) * (30 + Math.random() * 40), up = 260 + Math.random() * 200, rot = (Math.random() - .5) * 30;
    e.style.left = x + 'px'; e.style.top = y + 'px';
    fly(e, [{ transform: 'translate(-50%,-50%) scale(.5)', opacity: 0 },
      { transform: `translate(-50%,-50%) translate(${sw}px,${-up * .3}px) rotate(${rot}deg) scale(1)`, opacity: .95, offset: .25 },
      { transform: `translate(-50%,-50%) translate(${-sw * .6}px,${-up * .7}px) rotate(${-rot}deg) scale(1)`, opacity: .85, offset: .7 },
      { transform: `translate(-50%,-50%) translate(${sw * .4}px,${-up}px) rotate(${rot * .5}deg) scale(.9)`, opacity: 0 }], 3600 + Math.random() * 1200);
  }
  async function concert(V, S) {
    const g = G.gen, rm = G.reduced(), light = G.settings && G.settings.light;
    G.audio.music(CONCERT_MUSIC);
    const glow = G.el('div', 's2-concert', V.fx); Object.assign(glow.style, { left: '1200px', top: '560px' });
    const box = G.el('div', 's2-cnotes', V.fx);
    const sps = ['chief', 'daon', 'duri', 'miru', 'hero'].map(k => V.spr[k]).filter(q => q && q.img.style.display !== 'none'), people = sps.map(q => q.img);
    people.forEach(p => p.style.transformOrigin = '50% 100%');   // 발을 붙인 채 살살 흔들기
    const from = sps.map(q => [q.def.rect[0] + q.def.rect[2] / 2, q.def.rect[1] + 10]);
    from.push([1200, 520], [1050, 600], [1350, 600]);   // 무대 둘레
    const beats = rm ? 4 : 8, per = rm ? 1 : 1.25;   // 약 10초
    for (let i = 0; i < beats && g === G.gen; i++) {
      G.tween(0, 1, per * 0.9, k => glow.style.opacity = Math.sin(k * Math.PI) * 0.6);
      V.lamps.forEach((l, j) => l.el.classList.toggle('on', (i + j) % 2 === 0));
      if (!rm) people.forEach((p, j) => p.animate && p.animate([{ transform: 'rotate(0deg)' }, { transform: `rotate(${j % 2 ? 3 : -3}deg)` }, { transform: 'rotate(0deg)' }, { transform: `rotate(${j % 2 ? -3 : 3}deg)` }, { transform: 'rotate(0deg)' }], { duration: per * 1000, easing: 'ease-in-out' }));
      const n = rm ? 1 : light ? 2 : 4;
      for (let k = 0; k < n; k++) setTimeout(() => { if (g !== G.gen || !box.isConnected || G.paused) return; const [x, y] = from[Math.random() * from.length | 0]; floatNote(box, x + (Math.random() - .5) * 80, y - 20); }, k * per * 1000 / n);
      await G.wait(per);
    }
    glow.remove(); V.lamps.forEach(l => l.el.classList.add('on'));
    setTimeout(() => box.remove(), 5000);   // 떠 있던 음표는 끝까지 올라가 사라짐
    G.audio.music(S.music);
  }
  // 별이 받침대에서 하늘로 + 불꽃놀이
  // 10/3 선생님: 길의 별(C11)과 똑같이. 이 별 이야기의 인물들이 받침대 둘레로 모여 함께 올림 → 빛을 잃은 별이 받침대로 → 빛 기둥 → 기둥 꼭대기에서 별 → 카메라가 밤하늘로 → 광장으로 돌아와 가로등·색·불꽃놀이·「소리의 별」
  const GATHER = { chief: [900, 520], duri: [1380, 430], daon: [1310, 690], miru: [960, 720] };   // 받침대(1098,502,203,215) 둘레 자리 (그림 왼쪽 위)
  async function starRise(V, H) {
    const s = G.STARS.find(q => q.id === 'sound'), ov = G.$('#overlay'), u = G.stage.u, rm = G.reduced();
    const { W, H: SH } = G.stage, wl = V.el.parentNode, S = V.S, ped = S.hotspots.find(h => h.id === 'pedestal').rect;
    const layer = G.el('div', 'layer', ov); layer.style.pointerEvents = 'none';
    G.hud.hide(true);
    V.fx.querySelectorAll('.hot-glow, .mstar').forEach(e => e.style.visibility = 'hidden');   // 옛 자리에 빛 테두리가 남지 않게
    // (가) 인물들이 받침대 둘레로 모임
    const mv = Object.entries(GATHER).map(([k, to]) => { const sp = V.spr[k]; if (!sp || sp.img.style.display === 'none') return null; const r = sp.def.rect; return { e: sp.img, x0: r[0], y0: r[1], x1: to[0], y1: to[1] }; }).filter(Boolean);
    const place = k => mv.forEach(m => { m.e.style.left = (m.x0 + (m.x1 - m.x0) * k) + 'px'; m.e.style.top = (m.y0 + (m.y1 - m.y0) * k) + 'px'; });
    if (rm) place(1); else await G.tween(0, 1, 1.6, place, 'io');
    const [bx, by] = V.toScreen(ped[0] + ped[2] / 2, ped[1] + 40), hs = S.sprites.find(q => q.id === 'hero').rect, [hx, hy] = V.toScreen(hs[0] + hs[2] / 2, hs[1]);
    // (나) 빛을 잃은 별이 주인공에게서 받침대로
    const piece = G.el('div', 'c11-item', layer, G.icon('item_piece_sound')); Object.assign(piece.style, { left: hx + 'px', top: hy + 'px' });
    await G.tween(0, 1, rm ? 0.3 : 1.2, k => { piece.style.left = (hx + (bx - hx) * k) + 'px'; piece.style.top = (hy + (by - hy) * k - Math.sin(k * Math.PI) * 120 * u) + 'px'; }, 'io');
    G.audio.sfx('sfx_star', 0.9);
    const pillar = G.el('div', 'c11-pillar', layer); Object.assign(pillar.style, { left: bx + 'px', top: by + 'px' });
    await G.tween(0, 1, rm ? 0.3 : 1.0, k => { pillar.style.transform = `translate(-50%,-100%) scaleY(${k})`; pillar.style.opacity = k; piece.style.opacity = 1 - k; }, 'out');
    piece.remove(); G.audio.sfx('sfx_sparkle', 0.8); await G.wait(rm ? 0.1 : 0.5);
    // (다) 별이 하늘로, 카메라가 따라 올라가 밤하늘 제자리에
    G.audio.sfx('sfx_starfall', 0.6);
    const POS = [[.5, .42], [.3, .3], [.7, .3], [.2, .55], [.8, .55], [.38, .66], [.62, .66], [.5, .2], [.5, .8]], si = G.STARS.indexOf(s), E = Math.round(SH * 0.5);
    const sky = G.el('div', 'c11-sky', layer); sky.style.backgroundImage = `url("${G.asset('assets/ui/sky.jpg')}")`;
    Object.assign(sky.style, { bottom: 'auto', height: (SH + E) + 'px', opacity: 0 });
    sky.style.maskImage = sky.style.webkitMaskImage = `linear-gradient(to bottom, #000 0, #000 ${SH}px, transparent ${SH + E}px)`;
    const slots = G.STARS.map((q, i) => { const e = G.el('div', 'c11-slot' + (i < si ? ' lit' : '') + (i === si ? ' me' : ''), sky, G.starSvg(q, i <= si)); Object.assign(e.style, { left: POS[i % POS.length][0] * 100 + '%', top: POS[i % POS.length][1] * SH + 'px' }); return e; });
    const big = G.el('div', 'c11-star', layer, G.starSvg(s)); big.style.zIndex = 5;
    const sx0 = bx, sy0 = by - 120 * u, sx1 = POS[si][0] * W, sy1 = POS[si][1] * SH;
    Object.assign(big.style, { left: sx0 + 'px', top: sy0 + 'px', opacity: 0 });
    await G.tween(0, 1, 0.5, k => { big.style.opacity = k; big.style.transform = `translate(-50%,-50%) scale(${0.5 + 0.5 * k})`; }, 'out');
    const pan = (k) => { const d = SH * k; wl.style.transform = `translateY(${d}px)`; sky.style.transform = `translateY(${d - SH}px)`; sky.style.opacity = Math.min(1, k * 2.5); pillar.style.translate = `0 ${d}px`; };
    const fly = (k) => { pan(k); big.style.left = (sx0 + (sx1 - sx0) * k) + 'px'; big.style.top = (sy0 + (sy1 - sy0) * k - Math.sin(k * Math.PI) * 60 * u) + 'px'; big.style.transform = `translate(-50%,-50%) scale(${1 - 0.21 * k})`; };
    if (rm) fly(1); else await G.tween(0, 1, 2.4, fly, 'io');
    big.remove(); slots[si].classList.add('lit'); G.audio.sfx('sfx_chime', 0.7);
    await G.wait(1.6);
    if (rm) pan(0); else await G.tween(1, 0, 2.0, pan, 'io');
    wl.style.transform = ''; sky.remove(); pillar.remove();
    // (마) 가로등이 차례로 켜지고 광장이 완전한 색, 불꽃놀이, 모두 기뻐함
    for (const l of V.lamps) if (!l.el.classList.contains('on')) { l.el.classList.add('on'); G.audio.sfx('sfx_chime', 0.35); await G.wait(0.3); }
    const col = V.colorImg; col.style.visibility = ''; col.style.opacity = 1;
    G.fireworkShow(layer, 5);
    for (const k of ['chief', 'duri', 'daon', 'miru', 'hero']) { const sp = V.spr[k]; if (sp && !rm && sp.img.animate && sp.img.style.display !== 'none') sp.img.animate([{ transform: 'translateY(0)' }, { transform: 'translateY(-16px)' }, { transform: 'translateY(0)' }], { duration: 500, iterations: 2 }); }
    // (바) 「소리의 별」
    const t = G.el('div', 'cut-title c11-title', layer, s.name || '소리의 별'); t.style.opacity = 0;
    await G.tween(0, 1, 0.6, k => { t.style.opacity = k; t.style.transform = `translate(-50%,-50%) scale(${0.8 + 0.2 * k})`; }, 'out');
    await G.wait(2.4);
    if (layer.animate) await layer.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 500 }).finished.catch(() => { });
    layer.remove(); G.hud.hide(false);
  }

  // ================= 소리의 별-6: 엔딩 =================
  async function ending() {
    const g = G.gen, ok = () => g === G.gen, rm = G.reduced();
    if (!cleared('s2plaza')) G.st.cleared.push('s2plaza');
    G.st.place = 'plaza'; G.save.write();
    G.help.off(); G.hud.clear(); G.hud.hide(true); G.busy++;
    try {
      await G.cut.play('CH:s2_6', { key: 's2_6' }); if (!ok()) return;
      G.$('#fade').classList.add('on'); await G.wait(0.45); if (!ok()) return;
      G.scene.hide(); G.map.hide(); sync();
      const world = G.$('#world'); world.innerHTML = '';
      const MV = G.mapView(world, {}); MV.setMood(5); MV.addMarkers();
      for (const p of G.D.places.places) MV.setMarker(p.id, 'done', true);
      for (const k in (MV.s2 || {}).loud || {}) MV.s2.loud[k].remove();
      await MV.ready; if (!ok()) return;
      const cam = [4900, 2050], onR = () => MV.setCam(MV.cam.x, MV.cam.y, MV.cam.z); G.resizers.add(onR);
      MV.setCam(cam[0], cam[1], 1);
      G.audio.music('music_night');
      G.$('#fade').classList.remove('on');
      // 별이 하늘로
      // 10/3 선생님: 별은 광장 받침대에서 이미 올렸으니 지도에서는 다시 올리지 않음
      await play(['SD06_nar_01']); if (!ok()) return;
      // 편안한 소리가 돌아옴: 소리 구역 전체에 색
      if (MV.s2) { G.audio.sfx('sfx_sparkle', 0.7); bloom(MV, ['s2all'], rm ? 0.3 : 2.6); }
      MV.setLamps(5, true);
      await play(['SD06_nar_02']); if (!ok()) return;
      const rest = D2().restMarks.map(at => { const e = G.el('div', 's2-restmark', MV.fx, G.artImg('mark_rest') || ''); Object.assign(e.style, { left: at[0] + 'px', top: at[1] + 'px' }); e.animate && e.animate([{ scale: .2, opacity: 0 }, { scale: 1.2, opacity: 1 }, { scale: 1 }], { duration: 700, easing: 'ease-out' }); return e; });
      G.tween(0, 1, rm ? 0.3 : 2.5, k => MV.setCam(cam[0] + (3900 - cam[0]) * k, cam[1] + (1950 - cam[1]) * k, 1 - 0.25 * k), 'io');
      G.audio.sfx('sfx_chime', 0.4);
      await play(['SD06_miru_01'], { partner: 'miru' }); if (!ok()) return;
      await play(['SD06_duri_01'], { partner: 'duri' }); if (!ok()) return;
      await play(['SD06_chief_01'], { partner: 'chief' }); if (!ok()) return;
      await play(['SD06_rumi_01']); if (!ok()) return;
      rest.forEach(e => e.remove());
      // 밤하늘: 되찾은 별 둘, 다음 별(말의 별)이 깜박임
      await sky(); if (!ok()) return;
      // 되찾은 별 2/8 저장
      G.st.stars = Math.max(G.st.stars || 0, 2); G.st.mood = 5;
      mark('s2_end'); G.save.write();
      await starCard(); if (!ok()) return;
      G.resizers.delete(onR);
      G.$('#fade').classList.add('on'); await G.wait(0.45); if (!ok()) return;
      await G.map.show();
      G.$('#fade').classList.remove('on');
    } finally {
      if (g === G.gen) { G.busy = Math.max(0, G.busy - 1); G.hud.hide(false); }
    }
  }
  async function sky() {
    const g = G.gen, m = G.el('div', 'modal sky-view', G.$('#closeup'));   // 10/4: 대사 창(#dialog)보다 아래 층에 둬야 대사를 넘길 수 있음 (#overlay는 대사 창을 덮어 화면이 멈춤)
    m.style.backgroundImage = `url("${G.asset('assets/ui/sky.jpg')}")`;
    const POS = [[.5, .42], [.3, .3], [.7, .3], [.2, .55], [.8, .55], [.38, .66], [.62, .66], [.5, .2], [.5, .8]], nx = G.STARS.findIndex(s => s.id === D2().next);
    G.STARS.forEach((s, i) => { const e = G.el('div', 'c11-slot' + (i < 2 ? ' me lit' : '') + (i === nx ? ' s2-next' : ''), m, G.starSvg(s, i >= 2)); Object.assign(e.style, { left: POS[i % POS.length][0] * 100 + '%', top: POS[i % POS.length][1] * 100 + '%' }); });
    G.el('div', 'star-count sky-count', m, G.icon('icon_star') + ' 되찾은 별 2/8');
    G.audio.sfx('sfx_chime', 0.5);
    await G.dialog.play(['SD06_nar_03']);
    if (g === G.gen) { await G.wait(0.4); if (m.animate) await m.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 500 }).finished.catch(() => { }); }
    m.remove();
  }
  async function starCard() {
    const s = G.STARS.find(q => q.id === 'sound'), m = G.el('div', 'modal starget', G.$('#overlay')), sh = G.el('div', 'sheet', m);
    const pic = G.el('div', 'star-pic', sh, G.starSvg(s));
    G.el('div', 'get-title', sh, s.name);
    G.el('div', 'get-desc', sh, s.job);
    G.el('div', 'star-count', sh, G.icon('icon_star') + ' 되찾은 별 2/8');
    G.audio.sfx('sfx_star', 0.9);
    pic.animate && pic.animate([{ transform: 'scale(.2) rotate(-40deg)', opacity: 0 }, { transform: 'scale(1.2)', opacity: 1, offset: .7 }, { transform: 'scale(1)' }], { duration: 900, easing: 'ease-out' });
    await nextBtn(sh, G.audio.voice('SD06_sys_01'));
    m.remove();
  }

  // ================= 교사용 챕터 바로 가기 (소리의 별-1 ~ -6) =================
  const CH1 = {
    done: ['meet_lumi', 'plaza_intro', 'plaza_chief', 'plaza_board', 'plaza_post', 'market_intro', 'market_bom', 'market_ask', 'market_map', 'library_intro', 'library_haesol', 'library_tactile', 'library_puzzle', 'plaza_post_ask', 'letter_1', 'letter_2', 'letter_3', 'market_jig', 'libdoor_seen', 'libdoor_open', 'note_got',
      'forest_intro', 'forest_wind', 'forest_star', 'forest_daon', 'plaza2_intro', 'plaza2_board', 'plaza2_road', 'plaza2_look', 'plaza2_star', 'road_tiles'],
    cleared: ['plaza', 'market', 'library', 'forest', 'plaza2'], items: ['note', 'map', 'tactile', 'leaf', 'piece', 'light'],
    seen: ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C10', 'C11', 'C12', 'CH:intro', 'CH:plaza', 'CH:market', 'CH:library', 'CH:forest', 'CH:plaza2', 'CH:ending'],
    visited: ['plaza', 'market', 'library', 'forest', 'plaza2'],
  };
  const STEP = [
    null,
    { done: ['s2_begin', 's2_fog'], seen: ['CH:s2_1'] },
    { done: ['s2school_intro', 's2s_talk', 's2n_chair', 's2n_window', 's2n_bell', 's2n_locker', 's2school_noise', 's2f_chair', 's2f_window', 's2f_bell', 's2f_locker', 's2school_fix', 's2school_ask', 's2school_card'],
      cleared: ['s2school'], items: ['rhythm'], seen: ['CH:s2school', 'S2A_s2school'], dust: ['s2school:0', 's2school:h:locker'], place: 's2school' },
    { done: ['s2door_open', 's2hall_intro', 's2hall_duri', 's2hall_seats', 's2hall_score'], cleared: ['s2hall'], items: ['score'], seen: ['CH:s2hall', 'S2A_s2hall'], dust: ['s2hall:0', 's2hall:h:drum'], place: 's2hall' },
    { done: ['s2rest_intro', 's2rest_miru', 's2rest_box', 's2rest_deco', 's2rest_star'], cleared: ['s2rest'], items: ['piece_sound'], seen: ['CH:s2rest', 'S2A_s2rest'], dust: ['s2rest:0', 's2rest:cushion'], place: 's2rest' },
    { done: ['s2plaza_intro', 's2plaza_concert', 's2plaza_star'], seen: ['CH:s2plaza', 'S2A_s2plaza'], dust: ['s2plaza:c0', 's2plaza:c1'], place: 'plaza' },
  ];
  async function chapter(id) {
    if (!G.st) return;
    const n = +id.split('_')[1], keep = { slot: G.st.slot, name: G.st.name };
    G.flow.reset();
    const st = G.st = Object.assign(G.save.fresh(keep.slot), { name: keep.name });
    st.done.push(...CH1.done); st.cleared.push(...CH1.cleared); st.items.push(...CH1.items); st.seenCutscenes.push(...CH1.seen); st.visited.push(...CH1.visited);
    st.started = true; st.mood = 5; st.quest = 5; st.stars = 1; st.env = { board: true, guide: true }; st.place = 'plaza';
    st.dust = ['plaza:0', 'market:0', 'library:0', 'map:v2', 'map:v3']; st.s2dust = []; st.s2bloom = [];
    for (let i = 1; i < Math.min(n, 6); i++) {
      const s = STEP[i]; st.done.push(...(s.done || [])); st.cleared.push(...(s.cleared || [])); st.items.push(...(s.items || [])); st.seenCutscenes.push(...(s.seen || []));
      st.s2dust.push(...(s.dust || [])); if (s.place) { st.place = s.place; st.visited.push(s.place); } if (s.cleared) st.s2bloom.push(...s.cleared);
    }
    if (n >= 6) { const s = STEP[5]; st.done.push(...s.done); st.seenCutscenes.push(...s.seen); st.s2dust.push(...s.dust); st.place = 'plaza'; G.save.write(); sync(); return ending(); }
    G.save.write();
    return G.flow.resume();
  }
  (function patchFlow() {
    if (!G.flow || !G.flow.chapter) { setTimeout(patchFlow, 30); return; }
    const ch0 = G.flow.chapter;
    G.flow.chapter = (id) => /^s2_\d$/.test(id) ? chapter(id) : ch0(id);
  })();

  T.begin = begin; T.ending = ending; T.chapter = chapter; T.state = () => ({ isExp, dust: G.st && G.st.s2dust });
  return T;
})();

/* ---- s3_word.js ---- */
// s3_word.js — 말의 별 (10/3, 스토리라인 v1.0 · 음성 목록 v1.0 10/3 대본집 반영). 앞 별 코드는 고치지 않고, 엔진이 부르는 이름을 감싸서 이어 붙임
// 흐름: 소리의 별 엔딩 → 말의 별-1 북쪽 길(안개가 걷힘, 엉킨 말풍선) → -2 호숫가 찻집 → -3 나루터 → -4 하랑이네 집 → -5 광장 잔치 → -6 엔딩 (되찾은 별 3/8)
// 주제: 마음을 전하는 방법은 말, 그림, 손짓, 글로 여러 가지. 잘 보고 기다려 주면 마음이 통해요
// 하랑이는 목소리 더빙 없음 (10/3 선생님): 하랑이 대사는 "(안녕)" 괄호 글 + 그림 카드가 차례로 나오고 카드 소리만 남
// 퍼즐은 모두 누르기만으로 풀 수 있음 (끌기도 됨). 틀려도 실패 소리 없이 살며시 돌아오고 루미가 힌트
// 별가루는 따로 셈 (G.st.s3dust, 10곳 중 5개가 있어야 별을 올림)
'use strict';
G.s3 = (() => {
  const T = {};
  const D3 = () => G.D.story.s3;
  const done = (m) => !!G.st && G.st.done.includes(m);
  const mark = (m) => { if (m && G.st && !done(m)) { G.st.done.push(m); G.save.write(); } };
  const has = (id) => !!G.st && G.st.items.includes(id);
  const cleared = (id) => !!G.st && G.st.cleared.includes(id);
  const say = (id) => G.hud.say(id);
  const play = (ids, o) => G.dialog.play(ids, o);
  const ask = (id, icon = 'icon_good') => G.dialog.choose([{ label: G.txt(id), icon, voice: id }], true);
  const sd = () => G.st.s3dust || (G.st.s3dust = []);
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const began = () => done('s3_begin');
  let cur = null;   // 지금 하는 말의 별 퍼즐 (교사용 "이 퍼즐 바로 풀기")

  // ================= 화면 모양 (이 파일의 새 요소만) =================
  const CSS = `
.s3-pz .s3-board { position: absolute; left: 0; top: 0; transform-origin: 0 0; font-family: var(--f-title); color: var(--brown); }
.s3-pz .s3-dim { position: absolute; inset: 0; background: rgba(15, 18, 38, .55); }
.s3-panel { position: absolute; background: #FFF4E0; border: 6px solid #e0b96a; border-radius: 34px; box-shadow: 0 12px 28px rgba(0, 0, 0, .4); }
.s3-card { position: absolute; width: 150px; height: 186px; border: 5px solid #e0b96a; border-radius: 22px; background: #fffaf0; padding: 6px 0 0; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 2px;
  font-family: var(--f-title); font-size: 30px; color: var(--brown); box-shadow: 0 7px 0 #c9a45c; transition: left .35s, top .35s, transform .15s; touch-action: none; }
.s3-card img { width: 128px; height: 128px; object-fit: contain; pointer-events: none; }
.s3-card span { white-space: nowrap; pointer-events: none; }
.s3-card.sel { border-color: #F29BB0; box-shadow: 0 0 0 6px rgba(242, 155, 176, .6), 0 7px 0 #c9a45c; }
.s3-card.hint, .s3-hint { animation: thint 1.4s ease-in-out infinite; }
.s3-card.used { opacity: .25; pointer-events: none; }
.s3-card.say { transform: translateY(-14px) scale(1.08); box-shadow: 0 0 30px rgba(255, 214, 107, 1); }
.s3-slot { position: absolute; width: 162px; height: 198px; border: 6px dashed rgba(138, 106, 78, .6); border-radius: 26px; background: rgba(255, 255, 255, .45); display: flex; align-items: flex-end; justify-content: center; }
.s3-slot .lab { position: absolute; bottom: -54px; left: 50%; transform: translateX(-50%); white-space: nowrap; font-size: 38px; background: #FFF4E0; border-radius: 22px; padding: 0 16px; }
.s3-slot .ghost { position: absolute; inset: 22px; background-size: contain; background-repeat: no-repeat; background-position: center; opacity: .22; }
.s3-slot.on { background: rgba(255, 214, 107, .45); }
.s3-btn { position: absolute; border: 0; border-radius: 40px; background: #FFD66B; box-shadow: 0 8px 0 #c98f14; padding: 14px 40px; font-family: var(--f-title); font-size: 46px; color: var(--brown); cursor: pointer; display: flex; align-items: center; gap: 12px; }
.s3-btn img { height: 54px; }
.s3-btn:disabled { opacity: .4; }
.s3-btn:active { transform: translateY(5px); box-shadow: 0 3px 0 #c98f14; }
.s3-face { position: absolute; display: flex; flex-direction: column; align-items: center; gap: 4px; font-size: 30px; white-space: nowrap; }
.s3-face .pf { width: 150px; height: 150px; border-radius: 50%; object-fit: cover; object-position: 50% 14%; background: #FFF4E0; border: 6px solid #FFD66B; }
.s3-face.on .pf { box-shadow: 0 0 26px rgba(255, 214, 107, 1); }
.s3-bub { position: absolute; width: 170px; height: 150px; background: #fff; border: 5px solid #8a6a4e; border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: left .9s, top .9s; }
.s3-bub img { width: 100px; height: 100px; object-fit: contain; }
.s3-knot { position: absolute; width: 96px; height: 96px; margin: -48px 0 0 -48px; border-radius: 50%; border: 0; padding: 0; pointer-events: none; background: radial-gradient(circle, #fff3c9 0%, #f4a259 60%, #b0663a 100%); box-shadow: 0 0 0 5px #fff, 0 6px 10px rgba(0,0,0,.4); }
.s3-knot.under { filter: grayscale(.7) brightness(.8); }
.s3-cardrow { display: flex; gap: calc(var(--u) * 10); margin-top: calc(var(--u) * 8); flex-wrap: wrap; }
/* 10/4 선생님: 하랑이 대사 창을 낮게 → 괄호 글을 앞에, 그림 카드를 가운데 쪽에 한 줄로 */
#dialog .dlg-text:has(.s3-cardrow) { display: flex; align-items: center; gap: calc(var(--u) * 30); flex-wrap: nowrap; }
#dialog .dlg-text:has(.s3-cardrow) .s3-cardrow { margin-top: 0; flex: 1; justify-content: center; flex-wrap: nowrap; }
#dialog .dlg-box:has(.s3-cardrow) { min-height: 0; }
.s3-cardrow .c { display: flex; flex-direction: column; align-items: center; background: #fffaf0; border: calc(var(--u) * 4) solid #e0b96a; border-radius: calc(var(--u) * 16); padding: calc(var(--u) * 4) calc(var(--u) * 8); font-size: calc(var(--u) * 24); transition: transform .2s; }
.s3-cardrow .c img { width: calc(var(--u) * 76); height: calc(var(--u) * 76); object-fit: contain; }
.s3-cardrow .c.on { transform: translateY(calc(var(--u) * -8)) scale(1.08); box-shadow: 0 0 calc(var(--u) * 20) rgba(255, 214, 107, 1); }
.s3-cardrow .c { animation: s3in .35s ease-out backwards; }
@keyframes s3in { from { transform: scale(.3) rotate(-12deg); opacity: 0; } }
.s3-pop { position: absolute; transform: translate(-50%, -50%); pointer-events: none; z-index: 30; animation: s3in .5s ease-out; }
.s3-pop img { width: 100%; height: 100%; object-fit: contain; }
.s3-fan { animation: s3fan .5s ease-in-out infinite alternate; transform-origin: 50% 100%; }
@keyframes s3fan { from { rotate: -18deg; } to { rotate: 18deg; } }
.s3-drop { animation: s3drop 1.4s ease-in infinite; }
@keyframes s3drop { from { translate: 0 -10px; opacity: 1; } to { translate: 0 30px; opacity: 0; } }
.s3-wob { animation: s3wob .4s ease-in-out; }
@keyframes s3wob { 0%, 100% { rotate: 0deg; } 25% { rotate: -5deg; } 75% { rotate: 5deg; } }
.s3-rip { position: absolute; border-radius: 50%; border: 8px solid rgba(220, 236, 255, .85); cursor: pointer; padding: 0; background: rgba(150, 190, 240, .15); animation: s3rip 1.6s ease-in-out infinite; }
@keyframes s3rip { 0%, 100% { scale: .85; } 50% { scale: 1.12; } }
.s3-rip.gone { animation: s3out .6s ease-in forwards; pointer-events: none; }
@keyframes s3out { to { scale: .1; opacity: 0; } }
.s3-tile { position: absolute; border: 0; padding: 0; border-radius: 18px; background: #7FB77E; box-shadow: inset 0 0 0 5px rgba(74, 59, 50, .35); cursor: pointer; transition: transform .2s; }
.s3-tile svg { width: 100%; height: 100%; display: block; transition: transform .2s; }
.s3-tile.lit { background: #a9d79f; }
.s3-dial { position: absolute; width: 170px; display: flex; flex-direction: column; align-items: center; gap: 8px; }
.s3-dial .num { width: 150px; height: 150px; border-radius: 26px; background: #fff; border: 6px solid #8a6a4e; display: flex; align-items: center; justify-content: center; font-size: 100px; }
.s3-dial button { width: 130px; height: 80px; border: 0; border-radius: 22px; background: #FFD66B; box-shadow: 0 6px 0 #c98f14; cursor: pointer; padding: 0; }
.s3-dial button svg { width: 60px; height: 40px; }
.s3-ring { position: absolute; border-radius: 50%; border: 0; padding: 0; cursor: pointer; background: transparent; touch-action: none; z-index: 2; }
.s3-ring svg { width: 100%; height: 100%; }
.s3-spot { position: absolute; width: 110px; height: 110px; margin: -55px 0 0 -55px; border-radius: 50%; border: 6px solid #fff; background: rgba(255, 214, 107, .85); font-size: 52px; color: var(--brown); cursor: pointer; padding: 0; transition: opacity .5s, transform .3s; }
.s3-spot.out { opacity: .2; pointer-events: none; transform: scale(.7); }
.s3-note { position: absolute; background: #fffdf3; border: 5px solid #c9b48a; border-radius: 16px; padding: 18px 26px; font-size: 40px; cursor: pointer; box-shadow: 0 6px 0 #c9b48a; }
.s3-note.hint { animation: thint 1.4s ease-in-out infinite; }
.s3-row { position: absolute; display: flex; align-items: center; gap: 14px; font-size: 40px; border-radius: 18px; padding: 4px 12px; transition: background .3s; cursor: pointer; }
.s3-row img { width: 86px; height: 86px; object-fit: contain; }
.s3-row.lit { background: rgba(255, 214, 107, .75); }
.s3-mapico { position: absolute; width: 90px; height: 90px; transform: translate(-50%, -50%); pointer-events: none; z-index: 2993; filter: drop-shadow(0 0 8px rgba(255, 240, 200, .9)); }
.s3-mapico img { width: 100%; height: 100%; object-fit: contain; }
.s3-head { position: absolute; left: 50%; top: 40px; transform: translateX(-50%); font-size: 50px; white-space: nowrap; display: flex; align-items: center; gap: 12px; z-index: 2; }
.s3-head .ico { height: 64px; }
.s3-panel > .s3-head { top: 22px; }
.s3-guest { position: absolute; border: 6px solid #e0b96a; border-radius: 30px; background: #fffaf0; display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 14px 0; cursor: pointer; font-family: var(--f-title); font-size: 30px; color: var(--brown); box-shadow: 0 8px 0 #c9a45c; }
.s3-guest .pf { width: 190px; height: 190px; border-radius: 50%; object-fit: cover; object-position: 50% 14%; background: #FFF4E0; border: 6px solid #FFD66B; }
.s3-guest span { white-space: nowrap; font-size: 28px; }
.s3-guest .got { height: 110px; } .s3-guest .got img { width: 110px; height: 110px; object-fit: contain; animation: s3in .4s ease-out; }
.s3-guest.ok { border-color: #7FB77E; }
.s3-how { display: flex; align-items: flex-end; justify-content: center; gap: 6px; height: 104px; }
.s3-how .ico { height: 64px; }
.s3-reedbg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; border-radius: 28px; }
.s3-veil { position: absolute; inset: 0; border-radius: 28px; background: #0b0f22; opacity: .85; pointer-events: none; }
.s3-lglow { position: absolute; border-radius: 50%; background: radial-gradient(circle, rgba(255, 226, 150, .75) 0%, rgba(255, 200, 110, .35) 35%, transparent 70%); opacity: 0; pointer-events: none; mix-blend-mode: screen; }
.s3-hidstar { position: absolute; opacity: 0; pointer-events: none; transition: opacity 1s, transform 1s; }
.s3-hidstar svg, .s3-hidstar img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain; }   /* 그림 속 별 위에 겹쳐 반짝임 */
.s3-hidstar.on { z-index: 3; opacity: 1; transform: scale(1.3); filter: drop-shadow(0 0 24px rgba(255, 190, 220, 1)); animation: s3twk 1s ease-in-out .9s infinite; }
@keyframes s3twk { 0%, 100% { transform: scale(1.3) rotate(0deg); } 50% { transform: scale(1.5) rotate(8deg); } }
.reduce .s3-hidstar.on { animation: none; }
.s3-dshow { position: absolute; border: 6px solid #e0b96a; border-radius: 22px; overflow: hidden; background: #fff; box-shadow: 0 8px 0 #c9a45c; pointer-events: none; }
.s3-dshow img, .s3-dshow svg { width: 100%; height: 100%; display: block; object-fit: cover; }
.s3-dshow > b { position: absolute; left: 10px; top: 4px; font-size: 44px; color: #8a6a4e; text-shadow: 0 0 6px #fff; }
.s3-flipgrab { position: absolute; width: 160px; height: 200px; margin-left: -80px; cursor: grab; touch-action: none; z-index: 20; border-radius: 40px; }
.s3-flipgrab .tr { position: absolute; left: 66px; bottom: 60px; width: 28px; height: 440px; border-radius: 14px; background: repeating-linear-gradient(to top, rgba(255, 214, 107, .9) 0 22px, transparent 22px 40px); opacity: .8; animation: s3up 1.2s linear infinite; }
.s3-flipgrab .hd { position: absolute; left: 10px; bottom: 0; width: 140px; height: 140px; border-radius: 50%; background: #FFF4E0; border: 6px solid #e0b96a; box-shadow: 0 8px 0 #c9a45c; display: flex; align-items: center; justify-content: center; }
.s3-flipgrab .hd img { width: 110px; height: 110px; object-fit: contain; pointer-events: none; }
@keyframes s3up { to { background-position: 0 -40px; } }
.reduce .s3-flipgrab .tr { animation: none; }
.s3-pointer { position: absolute; left: 0; top: 0; width: 1600px; height: 900px; pointer-events: none; z-index: 30; }
.s3-pointer svg { position: absolute; left: 0; top: 0; overflow: visible; }
.s3-pointer path { fill: none; stroke: #F29BB0; stroke-width: 10; stroke-linecap: round; animation: s3dash 1s linear infinite; }
@keyframes s3dash { to { stroke-dashoffset: -64; } }
.s3-phand { position: absolute; width: 110px; height: 110px; margin: -110px 0 0 -55px; animation: s3poke .7s ease-in-out infinite; }
.s3-phand img { width: 100%; height: 100%; object-fit: contain; transform: rotate(-90deg); filter: drop-shadow(0 4px 6px rgba(0,0,0,.35)); }
@keyframes s3poke { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(26px); } }
.reduce .s3-pointer path, .reduce .s3-phand { animation: none; }
.s3-paper { background: #fffdf3; border: 4px solid #c9b48a; border-radius: 10px; padding: 6px 14px; font-size: 32px; transform: rotate(-3deg); white-space: nowrap; }
.s3-torn { position: absolute; right: 0; top: 0; bottom: 0; width: 220px; background: repeating-linear-gradient(170deg, #cfdcec 0 30px, #b9c8dc 30px 34px); clip-path: polygon(30% 0, 100% 0, 100% 100%, 10% 100%, 40% 80%, 15% 60%, 45% 40%, 20% 20%); }
.s3-water { background: linear-gradient(#3f6fb0, #2d4f8a); overflow: hidden; }
.s3-refl { position: absolute; background: rgba(255, 250, 235, .85); border-radius: 26px; transition: filter .4s; }
.s3-lpic { position: absolute; width: 300px; height: 300px; border: 6px dashed #c9b48a; border-radius: 26px; background: #fff; display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; padding: 0; font-family: var(--f-title); color: var(--brown); }
.s3-lpic img { width: 190px; height: 190px; object-fit: contain; }
.s3-lpic .w { font-size: 48px; min-height: 60px; }
.s3-lpic.sel { border-color: #F29BB0; border-style: solid; }
.s3-lpic.ok { border-color: #7FB77E; border-style: solid; background: #f4fbef; }
.s3-row { border: 0; background: transparent; font-family: var(--f-title); color: var(--brown); }
.s3-sig { position: absolute; display: flex; flex-direction: column; align-items: center; padding: 10px; border-radius: 24px; }
.s3-sig > svg { display: inline-block; }
.s3-sig .dots { display: flex; gap: 8px; margin-top: 8px; } .s3-sig .dots i { width: 22px; height: 22px; border-radius: 50%; background: #F4A259; }
.s3-dslot { position: absolute; border: 6px dashed rgba(138, 106, 78, .55); border-radius: 22px; background: rgba(255, 255, 255, .6); overflow: hidden; }
.s3-dslot b { position: absolute; left: 10px; top: 4px; font-size: 44px; color: #8a6a4e; }
.s3-dslot svg, .s3-dslot img, .s3-dpic svg, .s3-dpic img { width: 100%; height: 100%; display: block; object-fit: cover; }
.s3-dslot.on { border-style: solid; border-color: #7FB77E; }
.s3-dpic { position: absolute; padding: 0; border: 6px solid #e0b96a; border-radius: 22px; overflow: hidden; cursor: pointer; background: #fff; box-shadow: 0 8px 0 #c9a45c; }
.s3-dpic.used { visibility: hidden; }
.s3-q { position: absolute; right: 8px; top: 2px; font-size: 52px; color: #F4A259; }
.s3-reedmap { overflow: hidden; }
.s3-dark { overflow: hidden; }
.s3-lightc { position: absolute; inset: 0; background: radial-gradient(circle at 50% 55%, rgba(255, 230, 170, .9), rgba(255, 214, 107, .2) 45%, transparent 70%); opacity: 0; transition: opacity 1.2s; pointer-events: none; }
.s3-lightc.on { opacity: 1; }
.s3-glowc { position: absolute; border-radius: 50%; background: radial-gradient(circle, rgba(255, 236, 170, .75), transparent 70%); pointer-events: none; animation: s3in .8s ease-out; }
.s3-ring.lit { filter: drop-shadow(0 0 30px rgba(255, 214, 107, 1)); }
.s3-station { position: absolute; border: 6px solid #e0b96a; border-radius: 30px; background: #fffaf0; display: flex; flex-direction: column; align-items: center; gap: 10px; padding-top: 16px; opacity: .55; transition: opacity .3s; }
.s3-station .pf { width: 170px; height: 170px; border-radius: 50%; object-fit: cover; object-position: 50% 14%; border: 6px solid #FFD66B; background: #FFF4E0; }
.s3-station .msg { display: flex; gap: 6px; align-items: center; justify-content: center; flex-wrap: wrap; min-height: 160px; padding: 0 10px; }
.s3-station .msg img { width: 86px; height: 86px; object-fit: contain; }
.s3-station .msg .g svg, .s3-station .msg .g img { width: 80px; height: 80px; }
.s3-station.on, .s3-station.now { opacity: 1; } .s3-station.now { border-color: #F29BB0; box-shadow: 0 0 30px rgba(242, 155, 176, .8); }
.s3-arrow { position: absolute; width: 80px; height: 54px; z-index: 3; }
.s3-relay-tray { position: absolute; display: flex; gap: 40px; align-items: center; justify-content: center; }
.s3-opt { border: 6px solid #e0b96a; border-radius: 28px; background: #fffaf0; padding: 16px 26px; cursor: pointer; display: flex; gap: 10px; font-family: var(--f-title); font-size: 44px; color: var(--brown); box-shadow: 0 8px 0 #c9a45c; position: relative; }
.s3-opt .g svg, .s3-opt .g img { width: 120px; height: 120px; display: block; }
.s3-waitq { background: rgba(15, 18, 38, .35); }
.s3-hour { position: relative; width: calc(var(--u) * 260); height: calc(var(--u) * 260); }
.s3-hour img { position: absolute; inset: 22%; width: 56%; height: 56%; object-fit: contain; }
.s3-hour svg { width: 100%; height: 100%; }
.s3-act { flex-direction: column; gap: calc(var(--u) * 20); background: rgba(15, 18, 38, .35); }   /* 10/4 카드 내밀기 */
.s3-actcard { display: flex; flex-direction: column; align-items: center; gap: calc(var(--u) * 8); background: #FFF8E8; border: calc(var(--u) * 6) solid #F29BB0; border-radius: calc(var(--u) * 26); padding: calc(var(--u) * 18) calc(var(--u) * 26); cursor: pointer; font: inherit; color: #4A3B32; }
.s3-actcard img { width: calc(var(--u) * 200); height: calc(var(--u) * 200); object-fit: contain; }
.s3-actcard span { font-size: calc(var(--u) * 46); }
.s3-act.go .s3-actcard { transition: transform .3s; transform: scale(1.15); }
.s3-act.go .s3-wtip { opacity: 0; }
.s3-waitq { flex-direction: column; gap: calc(var(--u) * 18); touch-action: none; }   /* 10/4 손 떼고 기다리기 */
.s3-hour .s3-wpage { position: absolute; inset: 22%; background: #FFF8E8; border: calc(var(--u) * 5) solid #F29BB0; border-radius: calc(var(--u) * 18); display: flex; align-items: center; justify-content: center; }
.s3-hour .s3-wpage img { position: static; width: 82%; height: 82%; object-fit: contain; }
.s3-waitq.end .s3-wpage { animation: s3in .5s ease-out; transform: scale(1.25); }
.s3-waitq.paused .s3-hour { opacity: .6; }
.s3-wtip { font-size: calc(var(--u) * 40); color: #FFF6D6; text-shadow: 0 2px 6px rgba(0, 0, 0, .6); }
.s3-shh { position: absolute; top: calc(var(--sat) + var(--u) * 60); left: 50%; transform: translateX(-50%); background: #FFF8E8; color: #4A3B32; font-size: calc(var(--u) * 38); padding: calc(var(--u) * 14) calc(var(--u) * 30); border-radius: calc(var(--u) * 30); opacity: 0; pointer-events: none; }
.s3-shh.on { animation: s3shh 2.4s ease-out; }
@keyframes s3shh { 0% { opacity: 0; } 12%, 75% { opacity: 1; } 100% { opacity: 0; } }
.reduce .s3-rip, .reduce .s3-fan, .reduce .s3-drop, .reduce .s3-card.hint { animation: none; }
`;
  { const st = document.createElement('style'); st.id = 's3-style'; st.textContent = CSS; document.head.appendChild(st); }

  // ================= 작은 도구 =================
  const ART = (n) => G.art(n) || '';
  const cardImg = (k) => ART('card_' + k);
  const cardWord = (k) => D3().cards[k] || '';
  const spark = (el, n = 10) => { if (!el || !el.getBoundingClientRect) return; const r = el.getBoundingClientRect(), ov = G.$('#overlay'); if (G.settings && G.settings.light) n = 4;
    for (let i = 0; i < n; i++) { const s = G.el('div', 'spk', ov, G.sparkle()); s.style.left = (r.left + r.width / 2) + 'px'; s.style.top = (r.top + r.height / 2) + 'px';
      const a = Math.PI * 2 * i / n, R = G.stage.u * (90 + Math.random() * 90); G.tween(0, 1, 0.9, k => { s.style.transform = `translate(${Math.cos(a) * R * k}px,${Math.sin(a) * R * k}px) scale(${1 - k * .6})`; s.style.opacity = 1 - k; }, 'out').then(() => s.remove()); } };
  const wob = (el) => { if (!el) return; el.classList.remove('s3-wob'); void el.offsetWidth; el.classList.add('s3-wob'); };
  const hotBtn = (V, label) => V && [...V.fx.querySelectorAll('button.hot')].find(b => b.getAttribute('aria-label') === label);
  function colorIn(V) {
    if (!V || !V.colorImg) return Promise.resolve();
    const c = V.colorImg; c.style.transition = 'none'; c.style.visibility = ''; const a0 = +c.style.opacity || 0;
    for (const l of V.lamps) l.el.classList.add('on');
    G.audio.sfx('sfx_sparkle', 0.6);
    return G.tween(a0, 1, G.reduced() ? 0.3 : 1.6, v => c.style.opacity = v, 'out');
  }
  const ARROW_UP = '<svg viewBox="0 0 60 40"><path d="M30 4 L56 36 H4 Z" fill="#8a5a0a"/></svg>', ARROW_DN = '<svg viewBox="0 0 60 40"><path d="M30 36 L56 4 H4 Z" fill="#8a5a0a"/></svg>';

  // ---- 퍼즐 화면 틀 (소리의 별과 같은 모양): 위쪽 루미 말풍선, 왼쪽 아래 [루미], 가운데 판 (판 안 좌표는 고정, 화면에 맞게 줄임) ----
  function screen(cls, W = 1600, H = 900, o = {}) {
    const root = G.el('div', 'puzzle p4 s3-pz ' + cls, G.$('#world'));
    if (o.dim !== false) G.el('div', 's3-dim', root);
    const top = G.el('div', 'pz-top', root);
    const sayEl = G.el('div', 'pz-say', top); sayEl.style.display = 'none';
    const bl = G.el('div', 'pz-bl', root);
    const lb = G.el('button', 'lumi-btn', bl); lb.type = 'button'; lb.setAttribute('aria-label', '루미 도움');
    const li = G.el('img', '', lb); li.src = G.asset('assets/chars/lumi.png'); li.alt = ''; G.el('span', '', lb, '루미');
    G.onTap(lb, () => G.help.now());
    G.hud.hide(true);
    const B = G.el('div', 's3-board', root); B.style.width = W + 'px'; B.style.height = H + 'px';
    let tok = 0, last = null;
    const S = { root, top, B, W, H };
    S.say = async (id) => { const my = ++tok; sayEl.textContent = G.txt(id); sayEl.style.display = ''; await G.audio.voice(id); await G.wait(1.2); if (my === tok) sayEl.style.display = 'none'; };
    S.hush = () => { tok++; sayEl.style.display = 'none'; };
    S.layout = () => {
      const { W: sw, H: sh, u } = G.stage, rr = root.getBoundingClientRect();
      const t = top.getBoundingClientRect().bottom - rr.top + u * 10, box = G.$('.dlg-box');
      const b = G.dialog.active && box ? rr.bottom - box.getBoundingClientRect().top + u * 12 : u * 24;
      const x = u * 24, w = sw - u * 48, h = Math.max(60, sh - t - b), k = Math.min(w / W, h / H);
      B.style.transform = `translate(${(x + (w - W * k) / 2).toFixed(1)}px,${(t + (h - H * k) / 2).toFixed(1)}px) scale(${k.toFixed(4)})`; S.k = k;
    };
    const re = () => S.layout();
    const w = G.every(() => { if (!root.isConnected) { w(); G.resizers.delete(re); return; } const a = !!G.dialog.active; if (a !== last) { last = a; requestAnimationFrame(re); } });
    G.resizers.add(re); S.layout(); requestAnimationFrame(re);
    S.end = () => { w(); G.resizers.delete(re); root.remove(); G.help.off(); cur = null; G.hud.hide(false); };
    S.at = (el, x, y, w, h) => { Object.assign(el.style, { left: x + 'px', top: y + 'px' }); if (w) el.style.width = w + 'px'; if (h) el.style.height = h + 'px'; return el; };
    return S;
  }
  const arrowAt = (S, el) => { const a = G.el('div', 'arrow p4-arrow', S.B, G.arrowHtml()); a.style.left = (el.offsetLeft + el.offsetWidth / 2) + 'px'; a.style.top = el.offsetTop + 'px'; a.style.zIndex = 40; return a; };
  // 그림 카드 한 장 (판 안)
  function card(S, k, x, y, on) {
    const b = G.btn('s3-card', `<img src="${cardImg(k)}" alt=""><span>${cardWord(k)}</span>`, S.B, () => on && on(b), cardWord(k));
    b.dataset.k = k; S.at(b, x, y); return b;
  }
  // 카드 소리를 차례로 (카드가 하나씩 들썩)
  async function sayCards(ks, els) {
    for (let i = 0; i < ks.length; i++) {
      const e = els && els[i]; if (e) e.classList.add('say');
      await G.audio.voice('S93_card_' + ks[i]); await G.wait(0.25);
      if (e) e.classList.remove('say');
    }
  }
  function presentItem(id) { return G.present.item(id); }

  // ================= 하랑이 대사: 목소리 대신 그림 카드 (10/3 선생님) =================
  // 대화창 글 아래에 카드가 한 장씩 나오고, 카드마다 카드 소리. 대화창의 [다음]은 카드가 다 나온 뒤 켜짐
  const voice0 = G.audio.voice, stop0 = G.audio.stopVoice; let ctok = 0, inner = false;
  G.audio.stopVoice = () => { if (!inner) ctok++; stop0(); };
  G.audio.voice = (id, fb) => {
    const L = G.D.dialogues && G.D.dialogues[id];
    if (!L || !L.cards) return voice0(id, fb);
    return cardLine(L);
  };
  const pre0 = G.audio.preload;   // 하랑이 대사는 파일이 없으니 카드 소리를 미리 받음
  G.audio.preload = (ids) => pre0(ids.flatMap(id => { const L = G.D.dialogues && G.D.dialogues[id]; return L && L.cards ? L.cards.map(k => 'S93_card_' + k) : [id]; }));
  async function cardLine(L) {
    G.audio.stopVoice(); const my = ++ctok;
    await G.wait(0.05);
    const host = [...document.querySelectorAll('#dialog .dlg-text, .pz-say')].find(e => e.isConnected && e.style.display !== 'none' && e.textContent.trim().startsWith(L.text));
    let row = null, els = [];
    if (host) { row = G.el('div', 's3-cardrow', host); }
    for (let i = 0; i < L.cards.length; i++) {
      if (my !== ctok) return;
      const k = L.cards[i];
      if (row) { const c = G.el('div', 'c', row, `<img src="${cardImg(k)}" alt=""><span>${cardWord(k)}</span>`); els.push(c); els.forEach(e => e.classList.remove('on')); c.classList.add('on'); }
      inner = true; const p = voice0('S93_card_' + k); inner = false;
      await p; if (my !== ctok) return;
      await G.wait(0.3);
    }
    els.forEach(e => e.classList.remove('on'));
  }
  T.cardLine = cardLine;

  // ================= 별가루 (말의 별 10곳) =================
  async function gain(k, el, fx, x, y) {
    if (sd().includes(k)) return;
    sd().push(k); G.save.write(); G.audio.sfx('sfx_sparkle', 0.8); if (el) spark(el, 8);
    const n = sd().length, NEED = D3().dustNeed, TOT = D3().dustTotal, up = done('s3plaza_star'), shown = !up && n <= NEED ? `${n}/${NEED}` : `${n}/${TOT}`;
    if (fx) { const pop = G.el('div', 'p4-dust-pop', fx, (G.artImg('stardust') || '') + '<span>별가루 ' + shown + '</span>'); pop.style.left = x + 'px'; pop.style.top = (y - 70) + 'px'; setTimeout(() => pop.remove(), 2400); }
    if (n === 1) await play(['E00_dust_01', 'E00_dust_02']);
    else if (n === NEED && !up) await play(['E00_dust_03']);
    else say('E00_dust_01');
  }
  function dustBtn(V, k, x, y) {
    if (sd().includes(k)) return null;
    const b = G.el('button', 'p4-dust' + (G.lv('hard') ? ' dim' : ''), V.fx, G.artImg('stardust') || G.sparkle()); b.type = 'button'; b.setAttribute('aria-label', '별가루');
    Object.assign(b.style, { left: x + 'px', top: y + 'px', animationDelay: (-Math.random() * 3).toFixed(2) + 's' });
    G.onTap(b, () => {
      if (G.busy > 0 || G.dialog.active || sd().includes(k)) return;
      b.style.pointerEvents = 'none';
      if (b.animate) b.animate([{ transform: 'translate(-50%,-50%) scale(1)', opacity: 1 }, { transform: 'translate(-50%,-110%) scale(1.8)', opacity: 0 }], { duration: 700, easing: 'ease-out', fill: 'forwards' });
      setTimeout(() => b.remove(), 720);
      gain(k, b, V.fx, x, y);
    });
    return b;
  }
  async function popDust(V, k, x, y, el) {
    if (sd().includes(k)) return;
    const d = G.el('div', 'p4-dust pop', V.fx, G.artImg('stardust') || G.sparkle()); Object.assign(d.style, { left: x + 'px', top: y + 'px', pointerEvents: 'none' });
    G.audio.sfx('sfx_sparkle', 0.6);
    if (d.animate) await d.animate([{ transform: 'translate(-50%,-50%) scale(.3)', opacity: 0 }, { transform: 'translate(-50%,-160%) scale(1.3)', opacity: 1, offset: 0.5 }, { transform: 'translate(-50%,-220%) scale(1.6)', opacity: 0 }], { duration: G.reduced() ? 300 : 1000, easing: 'ease-out' }).finished.catch(() => { });
    d.remove(); await gain(k, el, V.fx, x, y);
  }

  // ================= 지도 (소리의 별 넓은 지도에 북동 호숫가가 더해짐: gen_word.py) =================
  const isS3 = (id) => /^s3/.test(id);
  // 안개: 말의 별이 시작되고 안개가 걷히면 북동쪽도 걷힌 안개 그림
  const mv0 = G.mapView;
  G.mapView = (parent, o) => {
    const V = mv0(parent, o);
    if (V.s2 && V.s2.fog && done('s3_fog')) V.s2.fog.src = G.asset('assets/map/map2_fog_c.png');
    return V;
  };
  const state0 = G.map.state;
  G.map.state = (p) => {
    if (isS3(p.id) && !done('s3_fog')) return 'locked';
    if (p.id === 'plaza' && cleared('s3harang') && !cleared('s3plaza')) return 'open';
    return state0(p);
  };
  const scOf0 = G.map.sceneOf;
  G.map.sceneOf = (p) => (p.id === 'plaza' && cleared('s3harang') && !cleared('s3plaza')) ? 's3plaza' : scOf0(p);
  const node0 = G.map.node, N3 = { s3cafe: 'S3_CAFE', s3dock: 'S3_DOCK', s3harang: 'S3_HOUSE', s3gate: 'GATE_N' };
  G.map.node = (id) => (began() && N3[id]) || node0(id);
  const mm0 = G.p4.mapMarks;
  G.p4.mapMarks = (V) => {
    mm0(V);
    if (!V.s2) return;
    if (!done('s3_fog')) for (const p of G.D.places.places) if (isS3(p.id)) V.setMarker(p.id, 'hidden', false);
    // 엔딩 뒤: 지도에 그림 표시 (찻집 = 찻잔, 나루터 = 호수, 하랑이네 = 그림)
    if (done('s3_end') && !V.s3ico) V.s3ico = [['s3cafe', 'tea'], ['s3dock', 'lake'], ['s3harang', 'draw']].map(([id, k]) => {
      const p = G.D.places.places.find(q => q.id === id); if (!p) return null;
      const e = G.el('div', 's3-mapico', V.fx, `<img src="${cardImg(k)}" alt="">`); Object.assign(e.style, { left: (p.marker[0] + 110) + 'px', top: (p.marker[1] - 30) + 'px' }); return e;
    });
  };
  // 지도 주민의 별가루 (호숫가 주민 둘)
  const vh0 = G.p4.villagerHas, vd0 = G.p4.villagerDust;
  const s3giver = (vid) => began() && D3().dustGive.includes(vid);
  G.p4.villagerHas = (vid) => s3giver(vid) ? !!G.st && !sd().includes('map:' + vid) : vh0(vid);
  G.p4.villagerDust = async (vid, el, fx, x, y) => { if (s3giver(vid)) return gain('map:' + vid, el, fx, x, y); return vd0(vid, el, fx, x, y); };
  const dl0 = G.p4.dustLine;
  G.p4.dustLine = (sh) => { if (!began()) return dl0(sh); G.el('div', 'p4-bagdust', sh, (G.artImg('stardust') || '') + `<span>별가루 ${sd().length}/${D3().dustTotal}</span>`); };
  // 장면 속 물건의 별가루
  const ah0 = G.p4.afterHot;
  G.p4.afterHot = async (H, V, def, id) => {
    if (!def.s3) return ah0(H, V, def, id);
    const h = H.def; if (!(def.s3dustHot || []).includes(h.id)) return;
    const [x, y, w] = h.rect; await popDust(V, id + ':h:' + h.id, x + w / 2, y + 20, H.btn);
  };
  // 교사용 "이 퍼즐 바로 풀기"
  const can0 = G.p4.can, skip0 = G.p4.skip, reset0 = G.p4.reset;
  G.p4.can = () => !!cur || can0();
  G.p4.skip = () => { if (cur && cur.solve) cur.solve(); else skip0(); };
  G.p4.reset = () => { cur = null; reset0(); };
  // 할 일 카드: "말의 별 찾기 n/4"
  const hm0 = G.hud.map, rq0 = G.hud.refreshQuest;
  function questFix() {
    if (!began()) return; const q = G.hud.questEl; if (!q || !q.isConnected) return;
    const e = q.querySelector('.q1'); if (e) e.textContent = '말의 별 찾기 ' + D3().quest.filter(cleared).length + '/' + D3().quest.length;
  }
  G.hud.map = () => { hm0(); questFix(); };
  G.hud.refreshQuest = () => { rq0(); questFix(); };
  // 장 제목은 "말의 별-N"
  const cut0 = G.cut.play;
  G.cut.play = async (id, opts = {}) => {
    const s3ch = /^CH:s3/.test(id), cs = G.D.story.chapterStar;
    if (s3ch) G.D.story.chapterStar = D3().chapterStar;
    try { return await cut0(id, opts); } finally { if (s3ch) G.D.story.chapterStar = cs; }
  };
  const show0 = G.map.show;
  G.map.show = async (o = {}) => { const r = await show0(o); maybeBegin(); return r; };

  // ================= 도착 연출 (장소 이름) =================
  async function arriveS3(c, root, opts, place) {
    const U = G.cut.util, S = G.D.scenes[place];
    const { V, off } = await U.arrive(c, root, opts, place);
    if (S.zone === 'plaza' || cleared(place)) { V.colorImg.style.visibility = ''; V.colorImg.style.opacity = S.zone === 'plaza' ? V.colorImg.style.opacity : 1; }
    if (c.rm) V.setCam(1200, 540, 1); else V.setCam(1050, 560, 1.25);
    c.t0 = G.t;
    await Promise.all([
      U.fadeIn(c, root, 0.5),
      (async () => { if (!c.rm) await c.tween(0, 1, 3.6, k => V.setCam(1050 + 150 * k, 560 - 20 * k, 1.25 - 0.25 * k), 'io'); })(),
      U.title(c, root, S.name, 'S92_place_' + (S.zone || place), 0.8, 4.4),
    ]);
    V.setCam(1200, 540, 1); off();
  }
  G.cut.add({
    S3A_s3cafe: (c, r, o) => arriveS3(c, r, o, 's3cafe'),
    S3A_s3dock: (c, r, o) => arriveS3(c, r, o, 's3dock'),
    S3A_s3harang: (c, r, o) => arriveS3(c, r, o, 's3harang'),
    S3A_s3plaza: (c, r, o) => arriveS3(c, r, o, 's3plaza'),
  });

  // ================= 말의 별-1: 북쪽 길 (소리의 별 엔딩 뒤 저절로) =================
  let beginning = false, pollOff = null;
  const needBegin = () => !!G.st && (G.st.stars || 0) >= 2 && done('s2_end') && !cleared('s3gate');
  function maybeBegin() {
    if (pollOff || beginning || !needBegin()) return;
    let calmT = 0; const g = G.gen;
    pollOff = G.every(dt => {
      if (g !== G.gen || !needBegin()) { pollOff(); pollOff = null; return; }
      if (G.busy > 0 || G.dialog.active || G.cut.active || G.screen !== 'map' || G.$('#overlay').children.length) { calmT = 0; return; }
      calmT += dt; if (calmT > 1.0) { pollOff(); pollOff = null; begin(); }
    });
  }
  async function camTo(V, x, y, d) { const c0 = { ...V.cam }; await G.tween(0, 1, G.reduced() ? 0.3 : d, k => V.setCam(c0.x + (x - c0.x) * k, c0.y + (y - c0.y) * k, c0.z), 'io'); }
  async function begin() {
    if (beginning) return; beginning = true;
    const g = G.gen, ok = () => g === G.gen;
    try {
      G.help.off(); G.busy++;
      const first = !done('s3_begin');
      const ch = G.cut.play('CH:s3_1', { key: 's3_1', cover: true });
      if (!G.st.place || !/^(plaza|s2)/.test(G.st.place)) G.st.place = 'plaza';
      mark('s3_begin');
      await G.wait(0.2); if (!ok()) return;
      await G.map.show({}); if (!ok()) return;
      G.hud.hide(true);
      await ch; if (!ok()) return;
      G.hud.hide(true);
      let V = G.map.V; if (!V) return;
      G.map.camFree = true;
      const rm = G.reduced(), sky = D3().sky;
      if (!done('s3_fog')) {
        await camTo(V, D3().north[0], D3().north[1], 2.4); if (!ok()) return;
        // 북쪽 하늘에서 분홍 별이 깜박임
        const s = G.STARS.find(q => q.id === 'word');
        const star = G.el('div', 's2-star', V.fx, G.starSvg(s, true)); Object.assign(star.style, { left: sky[0] + 'px', top: sky[1] + 'px', width: '150px', height: '150px', zIndex: 3005 });
        const blink = star.animate && !rm ? star.animate([{ opacity: .2 }, { opacity: 1 }, { opacity: .2 }], { duration: 1400, iterations: Infinity }) : null;
        G.audio.sfx('sfx_chime', 0.15, 1.2);
        await G.wait(rm ? 0.4 : 1.4); if (!ok()) return;
        await play(['WD01_rumi_01'], { noPortraits: true }); if (!ok()) return;
        await play(['WD01_chief_01'], { partner: 'chief' }); if (!ok()) return;
        await play(['WD01_post_01', 'WD01_post_02'], { partner: 'post' }); if (!ok()) return;
        await play(['WD01_rumi_02']); if (!ok()) return;
        await play(['WD01_chief_02'], { partner: 'chief' }); if (!ok()) return;
        await play(['WD01_post_03', 'WD01_post_04'], { partner: 'post' }); if (!ok()) return;
        await play(['WD01_rumi_03']); if (!ok()) return;
        if (!has('s3letter')) { await presentItem('s3letter'); if (!ok()) return; }
        // 안개가 걷힘
        const fogC = G.el('img', 'bg s2-fog', null); fogC.src = G.asset('assets/map/map2_fog_c.png'); fogC.alt = ''; Object.assign(fogC.style, { width: V.W + 'px', height: V.H + 'px' });
        if (V.s2 && V.s2.fog) { V.imgs.insertBefore(fogC, V.s2.fog); G.audio.sfx('sfx_sparkle', 0.7); V.s2.fog.style.opacity = 0; await G.wait(rm ? 0.4 : 2.4); V.s2.fog.remove(); V.s2.fog = fogC; }
        if (!ok()) return;
        mark('s3_fog'); V.setLamps(G.st.mood);
        await play(['WD01_nar_01']); if (!ok()) return;
        if (blink) blink.cancel(); star.remove();
      }
      // 북쪽 입구: 말풍선이 실처럼 엉킴
      await camTo(V, D3().gate[0], D3().gate[1], 1.8); if (!ok()) return;
      await play(['WD01_rumi_04']); if (!ok()) return;
      const won = await tangle(); if (!ok() || !won) return;
      await play(['WD01_rumi_07']); if (!ok()) return;
      await play(['WD01_v5_02'], { partner: 'v5' }); if (!ok()) return;
      if (!cleared('s3gate')) G.st.cleared.push('s3gate'); G.save.write();
      // 새 곳 (찻집)
      G.$('#fade').classList.add('on'); await G.wait(0.45); if (!ok()) return;
      G.map.camFree = false;
      await G.map.show({}); if (!ok()) return;
      G.hud.hide(true);
      V = G.map.V; G.map.camFree = true; V.setCam(4990, 640, V.cam.z);
      G.$('#fade').classList.remove('on');
      const k = V.markers.s3cafe; if (k && k.m.animate) k.m.animate([{ transform: 'scale(.3)' }, { transform: 'scale(1.5)' }, { transform: 'scale(1)' }], { duration: 900, easing: 'ease-out' });
      G.audio.sfx('sfx_sparkle', 0.6);
      await G.wait(0.6); if (!ok()) return;
      await play(['WD01_sys_01']); if (!ok()) return;
      G.map.camFree = false;
    } finally {
      beginning = false;
      if (g === G.gen) { G.busy = Math.max(0, G.busy - 1); G.hud.hide(false); G.hud.map(); if (G.screen === 'map') G.map.setHelp(); }
    }
  }

  // ---- 퍼즐 B: 엉킨 말풍선. 맨 위에 있는 실의 매듭부터 하나씩 눌러 풂 (아래 실의 매듭은 흐림) ----
  function tangle() {
    return new Promise((res) => {
      const g = G.gen, ok = () => g === G.gen, easy = !G.lv('normal');
      const P = D3().tangle.people.filter(p => !p.lv || G.lv(p.lv)), n = P.length;
      const S = screen('s3-tangle', 1600, 900);
      const panel = S.at(G.el('div', 's3-panel', S.B), 40, 20, 1520, 860);
      const ys = P.map((_, i) => 140 + i * (570 / Math.max(1, n - 1 || 1)) * (n > 1 ? 1 : 0) + (n === 1 ? 300 : 0));
      // 말풍선은 주인과 다른 줄에 (엉켜 보이게)
      let perm = P.map((_, i) => i); do perm = shuffle(perm); while (perm.some((p, i) => p === i) && n > 1);
      const ns = 'http://www.w3.org/2000/svg', svg = document.createElementNS(ns, 'svg'); svg.setAttribute('width', 1600); svg.setAttribute('height', 900); svg.style.position = 'absolute'; svg.style.left = svg.style.top = 0; S.B.appendChild(svg);
      const COL = ['#E88D7A', '#7DBBE3', '#7FB77E', '#B58BC4'];
      const faces = P.map((p, i) => {
        const f = S.at(G.el('div', 's3-face', S.B, (G.D.portraits[p.id] ? `<img class="pf" src="${G.asset(G.D.portraits[p.id].img)}" alt="">` : `<img class="pf" src="${G.art('face_dog') || cardImg('dog')}" alt="" style="object-fit:contain">`) + `<span>${p.name}</span>`), 110, ys[i] - 75); return f; });
      const bubs = P.map((p, i) => S.at(G.el('div', 's3-bub', S.B, `<img src="${ART(p.pic)}" alt="">`), 1300, ys[perm[i]] - 75));
      // 실: 사람 i → 말풍선 i (그 말풍선은 perm[i] 줄에). 위·아래 순서 = 그린 순서 (마지막이 맨 위)
      const order = shuffle(P.map((_, i) => i));
      const th = order.map((i, z) => {
        const y0 = ys[i], y1 = ys[perm[i]], x0 = 290, x1 = 1300, c1 = 700 + (z - n / 2) * 60, path = document.createElementNS(ns, 'path');
        const wig = (z % 2 ? 1 : -1) * 160;
        path.setAttribute('d', `M${x0} ${y0} C${c1} ${y0 + wig}, ${c1 + 200} ${y1 - wig}, ${x1} ${y1}`);
        Object.assign(path.style, { fill: 'none', stroke: COL[i % 4], strokeWidth: 16, strokeLinecap: 'round', transition: 'opacity .6s' }); svg.appendChild(path);
        const L = path.getTotalLength ? path.getTotalLength() : 1000, pt = path.getPointAtLength ? path.getPointAtLength(L * (0.3 + 0.4 * (z + 0.5) / n)) : { x: 800, y: (y0 + y1) / 2 };
        const kn = G.el('div', 's3-knot', S.B); S.at(kn, pt.x, pt.y); kn.style.zIndex = 5 + z;   // 10/4: 매듭은 누르는 단추가 아니라 실이 겹친 자리 표시
        return { i, z, path, kn, done: false, x0, y0, y1, c1, wig };
      });
      // 10/4 선생님: 누르기만 하면 쉬움 → 말풍선(실 끝)을 잡고 주인에게 끌어 와서 실을 풂. 위에 있는 실부터 풀 수 있고, 아래 실을 당기면 팽팽해지며 제자리로
      const toB = (e) => { const r = S.B.getBoundingClientRect(), k = r.width / 1600; return [(e.clientX - r.left) / k, (e.clientY - r.top) / k]; };
      const redraw = (t, bx, by, k) => { const cx = t.c1 * (1 - k) + (t.x0 + bx) / 2 * k, w = t.wig * (1 - k); t.path.setAttribute('d', `M${t.x0} ${t.y0} C${cx} ${t.y0 + w}, ${cx + 200 * (1 - k)} ${by - w}, ${bx} ${by}`); };
      th.forEach(t => {
        const b = bubs[t.i]; b.style.touchAction = 'none'; b.style.cursor = 'grab'; b.setAttribute('role', 'button'); b.setAttribute('aria-label', P[t.i].name + '의 실 끝');
        let st = null;
        b.addEventListener('pointerdown', (e) => {
          if (fin || busy || t.done || G.dialog.active) return; clear();
          if (t !== top()) { st = { blocked: true, id: e.pointerId, p0: toB(e), bx: 1300, by: t.y1 }; try { b.setPointerCapture(e.pointerId); } catch (_) { } return; }
          b.style.transition = 'none'; st = { id: e.pointerId, p0: toB(e), bx: 1300, by: t.y1 }; try { b.setPointerCapture(e.pointerId); } catch (_) { } G.audio.sfx('sfx_tap', 0.4);
        });
        b.addEventListener('pointermove', (e) => {
          if (!st || e.pointerId !== st.id) return; const [x, y] = toB(e), dx = x - st.p0[0], dy = y - st.p0[1];
          if (st.blocked) { if (Math.hypot(dx, dy) > 30 && !st.tug) { st.tug = true; const tp = top(); wob(b); if (tp) { wob(bubs[tp.i]); tp.kn.classList.add('s3-hint'); setTimeout(() => tp.kn.classList.remove('s3-hint'), 1500); } G.audio.sfx('sfx_tap', 0.4); S.say('WD01_rumi_21'); } return; }
          const bx = Math.max(300, Math.min(1300, 1300 + dx)), by = Math.max(60, Math.min(800, t.y1 + dy)), k = (1300 - bx) / 1000;
          S.at(b, bx, by - 75); redraw(t, bx, by, k); st.bx = bx; st.by = by;
        });
        const up = (e) => {
          if (!st || e.pointerId !== st.id) return; const s0 = st; st = null; if (s0.blocked) return;
          b.style.transition = '';
          if (s0.bx < 640) { pull(t.z); return; }
          G.tween(0, 1, 0.3, k => { const bx = s0.bx + (1300 - s0.bx) * k, by = s0.by + (t.y1 - s0.by) * k; S.at(b, bx, by - 75); redraw(t, bx, by, (1300 - bx) / 1000); }, 'out');
        };
        b.addEventListener('pointerup', up); b.addEventListener('pointercancel', up);
      });
      let fin = false, busy = false, arrow = null;
      const top = () => { for (let z = th.length - 1; z >= 0; z--) if (!th[z].done) return th[z]; return null; };
      const mark2 = () => { const t = top(); th.forEach(q => { q.kn.classList.toggle('under', !q.done && q !== t); q.kn.classList.toggle('s3-hint', easy && q === t); bubs[q.i].classList.toggle('s3-hint', easy && q === t); }); };
      mark2();
      S.say('WD01_rumi_20');
      async function pull(z) {
        if (fin || busy || G.dialog.active) return; clear();
        const t = th[z]; if (t.done) return;
        if (t !== top()) { wob(t.kn); G.audio.sfx('sfx_tap', 0.4); S.say('WD01_rumi_20'); return; }
        busy = true; t.done = true; G.audio.sfx('sfx_chime', 0.5, 1 + z * 0.1); bubs[t.i].classList.remove('s3-hint');
        t.kn.remove(); t.path.style.opacity = 0;
        const b = bubs[t.i]; S.at(b, 300, ys[t.i] - 75); faces[t.i].classList.add('on'); spark(b, 8);
        const p = P[t.i]; await G.wait(0.9); if (!ok()) return;
        await play([p.line], G.D.portraits[p.id] ? { partner: p.id } : {}); if (!ok()) return;
        busy = false; mark2();
        if (th.every(q => q.done)) win();
      }
      async function win() { if (fin) return; fin = true; cur = null; G.help.off(); clear(); S.hush(); G.audio.sfx('sfx_sparkle', 0.7); await G.wait(0.8); S.end(); res(ok()); }
      function clear() { if (arrow) arrow.remove(); arrow = null; th.forEach(q => q.kn.classList.remove('hint')); }
      cur = { solve: () => { th.forEach(q => { q.done = true; q.kn.remove(); q.path.style.opacity = 0; }); win(); } };
      G.help.set({ l1: () => S.say('WD01_rumi_20'), l2: () => { const t = top(); if (t && !arrow) arrow = arrowAt(S, bubs[t.i]); }, l3: () => { const t = top(); if (t) { t.kn.classList.add('s3-hint'); bubs[t.i].classList.add('s3-hint'); } }, clear });
    });
  }

  // ================= 장면마다 (scene.js가 들어갈 때 부름) =================
  for (const id of ['s3cafe', 's3dock', 's3harang', 's3plaza']) G.sceneFx[id] = (V, def) => fx(V, def, id);
  function fx(V, def, id) {
    if (cleared(id) && id !== 's3plaza') { V.colorImg.style.visibility = ''; V.colorImg.style.opacity = 1; for (const l of V.lamps) l.el.classList.add('on'); }
    (def.s3dust || []).forEach(([x, y], i) => dustBtn(V, id + ':' + i, x, y));
    if (id === 's3cafe') {   // 손님: 쉽게는 2명, 보통 3명, 어렵게 4명 (할아버지)
      if (!G.lv('hard') && V.spr.g_v4) V.spr.g_v4.img.style.display = 'none';
      if (!G.lv('normal') && V.spr.g_v6) V.spr.g_v6.img.style.display = 'none';
    }
    if (id === 's3harang' && !cleared(id)) {   // 10/4 피드백: 회색 마을에서도 하랑이 그림(벽·창가·탁자·상자)만 처음부터 색이 있음
      const P = [[584, 343, 612, 343, 612, 385, 584, 385], [599, 400, 642, 400, 642, 441, 599, 441], [970, 447, 1017, 447, 1017, 489, 970, 489],
        [847, 420, 866, 420, 866, 443, 847, 443], [892, 417, 909, 417, 909, 441, 892, 441], [929, 415, 945, 415, 945, 440, 929, 440],
        [989, 510, 1115, 506, 1126, 542, 997, 551], [842, 664, 908, 662, 910, 708, 845, 710]];
      const d = P.map(q => 'M' + q.join(' ') + 'Z').join('');
      const pic = G.el('img', 'bg s3-drawcol', null); pic.src = V.colorImg.src; pic.width = V.W; pic.height = V.H; pic.alt = ''; pic.style.clipPath = `path('${d}')`;
      V.colorImg.after(pic);
    }
    if (id === 's3harang' && done('s3h_star')) { const r = def.hotspots.find(h => h.id === 'reeds').rect; pop(V.fx, 'card_star', r[0] + r[2] / 2, r[1] + 20, 80); }
    if (id === 's3plaza' && done('s3plaza_relay')) for (const [k, at] of Object.entries(def.feastDust || {})) dustBtn(V, 's3plaza:' + k, at[0], at[1]);
  }
  function pop(parent, art, x, y, w) { const e = G.el('div', 's3-pop', parent, `<img src="${ART(art)}" alt="">`); Object.assign(e.style, { left: x + 'px', top: y + 'px', width: w + 'px', height: w + 'px' }); return e; }

  // ================= 말의 별-2: 호숫가 찻집 =================
  G.flows.s3_cafe = async (ctx) => {
    const { S, V, H, g, complete } = ctx, ok = () => g === G.gen, id = H.def.id, o = { partner: 'moa' };
    if (id === 'moa') {   // 모아 아주머니: 아주 빠르게 말함, 주문이 자꾸 바뀜
      await play(['WD02_moa_01'], o); if (!ok()) return;
      await play(['WD02_rumi_01']); if (!ok()) return;
      await play(['WD02_moa_02', 'WD02_moa_03'], o); if (!ok()) return;
      await play(['WD02_rumi_02']); if (!ok()) return;
      mark('s3c_talk'); G.scene.reveal(); return;
    }
    if (id === 'moa2') {
      if (!done('s3cafe_order')) { await play(['WD02_moa_03'], o); return; }
      if (!done('s3cafe_menu')) { await play(['WD02_moa_07'], o); return; }
      if (!done('s3cafe_window')) { await play(['WD02_moa_15'], o); return; }
      await play(['WD02_moa_18'], o); return;
    }
    if (id === 'guests') {
      if (done('s3cafe_order')) { await play(['WD02_v5_02'], { partner: 'v5' }); return; }
      const w = await orders(); if (!ok() || !w) return;
      await play(['WD02_moa_04', 'WD02_moa_19', 'WD02_moa_05'], { ...o, keep: true }); if (!ok()) return;
      await ask('WD02_ply_01'); if (!ok()) return;
      await play(['WD02_moa_06', 'WD02_moa_07'], o); if (!ok()) return;
      complete('s3cafe_order'); return;
    }
    if (id === 'menu') {
      if (done('s3cafe_menu')) { await play(['WD02_moa_09'], o); return; }
      const M = D3().menuBoard, want = M[G.level()] || M.normal;
      const w = await strip({ mode: 'menu', slots: want, cards: shuffle(want), hint: 'WD02_rumi_07', head: '그림 메뉴판', art: 'item_codeA' }); if (!ok() || !w) return;
      await play(['WD02_moa_08', 'WD02_moa_09'], o); if (!ok()) return;
      complete('s3cafe_menu');
      // 편지를 전함 → 하랑이 이야기 → 창문 단서
      await play(['WD02_rumi_08']); if (!ok()) return;
      await play(['WD02_moa_10', 'WD02_moa_11'], o); if (!ok()) return;
      if (!await cardAct('harang', '하랑 카드를 눌러 보아요')) return;   // 10/4 피드백: 긴 대사 사이 누르기
      await play(['WD02_moa_12', 'WD02_moa_13', 'WD02_moa_14'], o); if (!ok()) return;
      await play(['WD02_rumi_09']); if (!ok()) return;
      await play(['WD02_moa_15'], o); if (!ok()) return;
      say('WD02_rumi_10'); return;
    }
    if (id === 'window') {
      if (done('s3cafe_window')) { await play(['WD02_rumi_11']); return; }
      await play(['WD02_rumi_10']); if (!ok()) return;
      const w = await rub(); if (!ok() || !w) return;
      await play(['WD02_rumi_11']); if (!ok()) return;
      await presentItem('codeA'); if (!ok()) return;
      await play(['WD02_moa_16', 'WD02_moa_20'], o); if (!ok()) return;
      if (!await cardAct('go', '가자 카드로 대답해요')) return;   // 10/4 피드백
      await play(['WD02_moa_17', 'WD02_moa_18'], o); if (!ok()) return;
      await colorIn(V); if (!ok()) return;
      complete('s3cafe_window'); return;
    }
    if (id === 'teapot') { G.audio.sfx('sfx_chime', 0.3, 1.5); const sp = H.glow; if (sp && sp.animate) sp.animate([{ transform: 'rotate(0)' }, { transform: 'rotate(-6deg)' }, { transform: 'rotate(0)' }], { duration: 400 }); }
  };

  // ---- 퍼즐 K: 손님마다 주문하는 방법이 다름 (말, 가리키기, 몸짓, 쪽지). 손님을 누르면 주문, 메뉴를 손님에게 ----
  const HOW = {   // 손님 카드 아래 작은 표시 (그림만)
    say: () => G.art('hint_say') ? `<div class="s3-how"><img src="${G.art('hint_say')}" alt="" style="height:100px"></div>` : `<div class="s3-how">${G.icon('icon_sound')}</div>`,
    point: () => G.art('hint_point') ? `<div class="s3-how"><img src="${G.art('hint_point')}" alt="" style="height:100px"></div>` : G.art('hand_point') ? `<div class="s3-how"><img src="${G.art('hand_point')}" alt="" style="height:72px"></div>` : `<div class="s3-how"><svg viewBox="0 0 100 60" width="110" height="66"><path d="M10 40 h45 a8 8 0 0 0 0-16 h-12 l30 0 a7 7 0 0 0 0-14 h-40 q-20 0-23 20z" fill="#F6D2B4" stroke="#4A3B32" stroke-width="4" stroke-linejoin="round"/><path d="M78 17 l14 0 m-6 -6 l6 6 l-6 6" stroke="#F4A259" stroke-width="5" fill="none" stroke-linecap="round"/></svg></div>`,
    fan: () => G.art('hint_hot') ? `<div class="s3-how"><img src="${G.art('hint_hot')}" alt="" style="height:100px"></div>` : `<div class="s3-how"><svg class="s3-fan" viewBox="0 0 60 70" width="64" height="74"><rect x="14" y="10" width="32" height="44" rx="14" fill="#F6D2B4" stroke="#4A3B32" stroke-width="4"/><path d="M8 30 q-6 -14 4 -22 M52 30 q6 -14 -4 -22" stroke="#7DBBE3" stroke-width="4" fill="none"/></svg><svg class="s3-drop" viewBox="0 0 20 30" width="22" height="34"><path d="M10 2 q8 14 8 18 a8 8 0 0 1 -16 0 q0-4 8-18z" fill="#7DBBE3"/></svg></div>`,
    note: (gu) => `<div class="s3-how"><div class="s3-paper">${gu.note}</div></div>`,
  };
  function orders() {
    return new Promise((res) => {
      const O = D3().orders, g = G.gen, ok = () => g === G.gen, easy = !G.lv('normal');
      const guests = O.guests.filter(q => !q.lv || G.lv(q.lv)), menu = O.menu.filter(k => G.lv('normal') || guests.some(q => q.want === k) || k === 'cookie');
      const S = screen('s3-orders', 1600, 900);
      S.at(G.el('div', 's3-panel', S.B), 40, 20, 1520, 540);
      const gw = 1440 / guests.length;
      const gs = guests.map((q, i) => {
        const P = G.D.portraits[q.id], x = 80 + gw * i + gw / 2 - 130;
        const e = G.btn('s3-guest', `<img class="pf" src="${G.asset(P.img)}" alt=""><span>${q.name}</span>${HOW[q.how](q)}<div class="got"></div>`, S.B, () => listen(q, e), q.name);
        S.at(e, x, 50, 260, 490); e.dataset.id = q.id; return { q, e, done: false, heard: false };
      });
      const items = {};
      menu.forEach((k, i) => { items[k] = card(S, k, 800 - menu.length * 90 + i * 180, 640, (b) => pick(k, b)); G.p4.dragTo(items[k], () => gs.filter(x => !x.done).map(x => x.e), (t) => give(k, t.dataset.id)); });
      let fin = false, sel = null, arrow = null;
      S.say('WD02_rumi_02');
      async function listen(q, e) {
        if (fin || G.dialog.active) return;
        const x = gs.find(z => z.q === q); if (x.done) return;
        if (sel) return give(sel, q.id);
        clear(); G.audio.sfx('sfx_tap', 0.4);
        if (q.how === 'point') pointAt(e, items[q.want]);   // 10/4 선생님: 무엇을 가리키는지 안 보임 → 학생 손끝에서 그 카드까지 점선이 이어지고, 손가락이 카드 위에서 콕콕
        await play([q.line], { partner: q.id }); if (!ok()) return;
        x.heard = true; if (easy) items[q.want].classList.add('hint');
      }
      function pointAt(from, it) {
        S.B.querySelectorAll('.s3-pointer').forEach(q => q.remove());
        const L = (el) => [parseFloat(el.style.left) || 0, parseFloat(el.style.top) || 0, el.offsetWidth, el.offsetHeight];
        const [fx, fy, fw, fh] = L(from), [tx, ty, tw] = L(it), x0 = fx + fw / 2, y0 = fy + fh - 40, x1 = tx + tw / 2, y1 = ty - 70;
        const box = G.el('div', 's3-pointer', S.B), ns = 'http://www.w3.org/2000/svg', svg = document.createElementNS(ns, 'svg');
        svg.setAttribute('width', 1600); svg.setAttribute('height', 900); box.appendChild(svg);
        const ln = document.createElementNS(ns, 'path'); ln.setAttribute('d', `M${x0} ${y0} Q${(x0 + x1) / 2} ${Math.max(y0, y1) + 60} ${x1} ${y1}`); svg.appendChild(ln);
        const len = ln.getTotalLength ? ln.getTotalLength() : 600; ln.style.strokeDasharray = '6 26'; ln.style.strokeDashoffset = 0;
        const h = G.el('div', 's3-phand', box, G.art('hand_point') ? `<img src="${G.art('hand_point')}" alt="">` : '');
        Object.assign(h.style, { left: x1 + 'px', top: y1 + 'px' });
        it.classList.add('s3-hint');
        setTimeout(() => { box.remove(); it.classList.remove('s3-hint'); }, 6000);
      }
      function pick(k, b) { if (fin || G.dialog.active) return; G.audio.sfx('sfx_tap', 0.5); Object.values(items).forEach(c => c.classList.remove('sel')); sel = sel === k ? null : k; if (sel) b.classList.add('sel'); }
      async function give(k, gid) {
        if (fin || G.dialog.active) return; clear();
        const x = gs.find(z => z.q.id === gid); if (!x || x.done) return;
        Object.values(items).forEach(c => c.classList.remove('sel')); sel = null;
        if (x.q.want !== k) { wob(items[k]); wob(x.e); G.audio.sfx('sfx_tap', 0.4); S.say(x.q.help); return; }
        x.done = true; x.e.querySelector('.got').innerHTML = `<img src="${cardImg(k)}" alt="">`; x.e.classList.add('ok'); G.audio.sfx('sfx_chime', 0.5); spark(x.e, 8);
        items[k].classList.remove('hint');
        if (!gs.some(z => !z.done && z.q.want === k)) items[k].classList.add('used');
        await play([x.q.ok], { partner: x.q.id }); if (!ok()) return;
        if (gs.every(z => z.done)) win();
      }
      async function win() { if (fin) return; fin = true; cur = null; G.help.off(); clear(); S.hush(); G.audio.sfx('sfx_sparkle', 0.7); await G.wait(0.8); S.end(); res(ok()); }
      function clear() { if (arrow) arrow.remove(); arrow = null; gs.forEach(z => z.e.classList.remove('s3-hint')); }
      const next = () => gs.find(z => !z.done);
      cur = { solve: () => { gs.forEach(z => { z.done = true; z.e.querySelector('.got').innerHTML = `<img src="${cardImg(z.q.want)}" alt="">`; }); win(); } };
      G.help.set({ l1: () => { const z = next(); S.say(z && z.heard ? z.q.help : 'WD02_rumi_02'); }, l2: () => { const z = next(); if (z && !arrow) arrow = arrowAt(S, z.e); }, l3: () => { const z = next(); if (!z) return; z.e.classList.add('s3-hint'); items[z.q.want].classList.add('hint'); }, clear });
    });
  }

  // ---- 퍼즐 A: 말하기 띠. 카드를 칸에 놓고 [말하기]를 누르면 카드 소리가 차례로 ----
  // menu: 칸마다 낱말이 정해져 있음 (그림 메뉴판 만들기) / free: 아무 카드나 (하랑이에게 카드로 대답하기)
  function strip(o) {
    return new Promise((res) => {
      const g = G.gen, ok = () => g === G.gen, easy = !G.lv('normal'), n = o.slots.length || o.n;
      const S = screen('s3-strip', 1600, 900);
      S.at(G.el('div', 's3-panel', S.B), 40, 20, 1520, 470);
      G.el('div', 's3-head', S.B, o.head || '말하기 띠');
      const sx = 800 - n * 100;
      const slots = [...Array(n)].map((_, i) => {
        const e = S.at(G.el('div', 's3-slot', S.B), sx + i * 200, 150); const want = o.mode === 'menu' ? o.slots[i] : null;
        if (want) { G.el('div', 'lab', e, cardWord(want)); if (easy) G.el('div', 'ghost', e).style.backgroundImage = `url("${cardImg(want)}")`; }
        G.onTap(e, () => tapSlot(i));
        return { e, want, k: null, c: null };
      });
      const talk = G.btn('s3-btn', G.icon('icon_sound') + ' 말하기', S.B, () => speak(), '말하기'); S.at(talk, 660, 520); talk.disabled = true;
      const cw = Math.min(180, 1440 / o.cards.length), cx0 = 800 - o.cards.length * cw / 2;
      const cards = o.cards.map((k, i) => { const b = card(S, k, cx0 + i * cw + (cw - 150) / 2, 650, () => tapCard(b)); G.p4.dragTo(b, () => slots.filter(s => !s.k).map(s => s.e), (t) => put(b, slots.findIndex(s => s.e === t))); return b; });
      if (easy && o.hintCards) o.hintCards.forEach(k => { const b = cards.find(c => c.dataset.k === k); if (b) b.classList.add('hint'); });
      let fin = false, sel = null, arrow = null, talking = false;
      S.say(o.hint);
      function tapCard(b) {
        if (fin || talking || G.dialog.active) return; clear(); G.audio.sfx('sfx_tap', 0.5);
        G.audio.voice('S93_card_' + b.dataset.k);
        if (o.mode !== 'menu') { const i = slots.findIndex(s => !s.k); if (i >= 0) put(b, i); return; }   // 대답: 누르면 바로 다음 칸으로
        cards.forEach(c => c.classList.remove('sel')); sel = sel === b ? null : b; if (sel) b.classList.add('sel');
      }
      function tapSlot(i) {
        if (fin || talking || G.dialog.active) return; const s = slots[i];
        if (s.k) { if (o.mode !== 'menu') { s.c.classList.remove('used'); s.e.innerHTML = ''; s.k = s.c = null; talk.disabled = true; } return; }   // 대답 칸을 누르면 카드가 돌아감
        if (sel) put(sel, i);
      }
      function put(b, i) {
        if (fin || i < 0) return; const s = slots[i]; if (s.k) return; clear();
        cards.forEach(c => c.classList.remove('sel')); sel = null;
        if (s.want && s.want !== b.dataset.k) { wob(b); G.audio.sfx('sfx_tap', 0.4); S.say(o.hint); return; }
        s.k = b.dataset.k; s.c = b; b.classList.add('used'); b.classList.remove('hint');
        s.e.innerHTML = `<img src="${cardImg(s.k)}" alt="" style="width:130px;height:130px;object-fit:contain;margin-bottom:34px">` + (s.want ? `<div class="lab">${cardWord(s.k)}</div>` : `<div class="lab">${cardWord(s.k)}</div>`);
        s.e.classList.add('on'); G.audio.sfx('sfx_chime', 0.4, 1 + i * 0.1); spark(s.e, 6);
        if (slots.every(q => q.k)) { talk.disabled = false; talk.classList.add('s3-hint'); }
      }
      async function speak() {
        if (fin || talking || talk.disabled) return; talking = true; clear(); talk.classList.remove('s3-hint');
        await sayCards(slots.map(s => s.k), slots.map(s => s.e)); if (!ok()) return;
        talking = false; win();
      }
      async function win() { if (fin) return; fin = true; cur = null; G.help.off(); clear(); S.hush(); G.audio.sfx('sfx_sparkle', 0.7); spark(talk, 12); await G.wait(0.8); S.end(); res(slots.map(s => s.k)); }
      function clear() { if (arrow) arrow.remove(); arrow = null; slots.forEach(s => s.e.classList.remove('s3-hint')); }
      const nextS = () => slots.find(s => !s.k);
      const want = (s) => cards.find(c => !c.classList.contains('used') && (!s.want || c.dataset.k === s.want));
      cur = { solve: async () => { for (const s of slots) if (!s.k) { const c = want(s); if (c) put(c, slots.indexOf(s)); } talk.disabled = false; speak(); } };
      G.help.set({
        l1: () => S.say(o.hint),
        l2: () => { if (arrow) return; const s = nextS(); if (s) { const c = want(s); if (c) arrow = arrowAt(S, c); } else arrow = arrowAt(S, talk); },
        l3: () => { const s = nextS(); if (s) { const c = want(s); if (c) c.classList.add('hint'); s.e.classList.add('s3-hint'); } else talk.classList.add('s3-hint'); },
        clear,
      });
    });
  }

  // ---- 김 서린 창 문지르기: 문지르거나 눌러서 김을 닦음 (어렵게: 김이 천천히 다시 서림) → 그림 표 반쪽 ----
  function rub() {
    return new Promise((res) => {
      const g = G.gen, ok = () => g === G.gen, hard = G.lv('hard'), easy = !G.lv('normal');
      const S = screen('s3-rub', 1600, 900);
      const fr = S.at(G.el('div', 's3-panel', S.B), 330, 30, 940, 840); fr.style.background = '#cfdcec'; fr.style.overflow = 'hidden';
      // 창 안쪽: 하랑이가 그린 그림 표 (반쪽만)
      const CD = D3().code.a;
      CD.forEach((k, i) => { const r = S.at(G.el('div', 's3-row', fr, `<img src="${cardImg(k)}" alt=""><span>${cardWord(k)}</span>`), 120, 60 + i * 190); r.style.fontSize = '64px'; r.querySelector('img').style.cssText = 'width:150px;height:150px'; });
      G.el('div', 's3-torn', fr);
      const cv = G.el('canvas', 's3-fogcv', fr); cv.width = 470; cv.height = 420; Object.assign(cv.style, { position: 'absolute', left: 0, top: 0, width: '940px', height: '840px', touchAction: 'none', cursor: 'pointer' });
      const cx = cv.getContext('2d');
      const fog = () => { cx.globalCompositeOperation = 'source-over'; cx.fillStyle = 'rgba(236,240,246,1)'; cx.fillRect(0, 0, 470, 420); for (let i = 0; i < 160; i++) { cx.fillStyle = `rgba(255,255,255,${Math.random() * .5})`; cx.beginPath(); cx.arc(Math.random() * 470, Math.random() * 420, 4 + Math.random() * 14, 0, 7); cx.fill(); } };
      fog();
      let fin = false, down = false, last = null;
      const R = easy ? 55 : 40;
      const toC = (e) => { const r = cv.getBoundingClientRect(); return [(e.clientX - r.left) / r.width * 470, (e.clientY - r.top) / r.height * 420]; };
      const wipe = (p, rad) => { cx.globalCompositeOperation = 'destination-out'; cx.lineCap = 'round'; cx.lineWidth = rad * 2; cx.strokeStyle = '#000';
        cx.beginPath(); cx.moveTo(...(last || p)); cx.lineTo(...p); cx.stroke(); cx.beginPath(); cx.arc(p[0], p[1], rad, 0, 7); cx.fill(); last = p; };
      cv.addEventListener('pointerdown', (e) => { if (fin || G.dialog.active) return; down = true; last = null; try { cv.setPointerCapture(e.pointerId); } catch (_) { } wipe(toC(e), R * 1.3); G.audio.sfx('sfx_tap', 0.25, 1.4); G.help.poke(); check(); });
      cv.addEventListener('pointermove', (e) => { if (!down || fin) return; wipe(toC(e), R); });
      const up = () => { if (down) { down = false; last = null; check(); } };
      cv.addEventListener('pointerup', up); cv.addEventListener('pointercancel', up);
      const clearAmt = () => { const d = cx.getImageData(0, 0, 470, 420).data; let c = 0, n = 0; for (let i = 3; i < d.length; i += 4 * 37) { n++; if (d[i] < 90) c++; } return c / n; };
      function check() { if (!fin && clearAmt() > 0.6) win(); }
      // 어렵게: 김이 다시 조금씩 서림
      const off = G.every(dt => { if (fin || !hard || down || G.dialog.active) return; cx.globalCompositeOperation = 'source-over'; cx.fillStyle = `rgba(236,240,246,${(dt * 0.05).toFixed(3)})`; cx.fillRect(0, 0, 470, 420); });
      async function win() { if (fin) return; fin = true; off(); cur = null; G.help.off(); S.hush(); G.audio.sfx('sfx_sparkle', 0.7);
        await G.tween(1, 0, 0.8, v => cv.style.opacity = v); spark(fr, 14); await G.wait(1.2); S.end(); res(ok()); }
      cur = { solve: () => { cx.clearRect(0, 0, 470, 420); win(); } };
      S.say('WD02_rumi_10');
      G.help.set({ l1: () => S.say('WD02_rumi_10'), l2: () => { }, l3: () => { fr.classList.add('s3-hint'); setTimeout(() => fr.classList.remove('s3-hint'), 3000); }, clear: () => { } });
    });
  }

  // ================= 말의 별-3: 나루터 =================
  G.flows.s3_dock = async (ctx) => {
    const { S, V, H, g, complete } = ctx, ok = () => g === G.gen, id = H.def.id, o = { partner: 'bau' };
    if (id === 'bauFar') { G.audio.sfx('sfx_wind', 0.15, 1.2); await play(['WD03_bau_01', 'WD03_rumi_02']); return; }
    if (id === 'bau') { await play(['WD03_bau_04'], o); return; }
    if (id === 'sign') {
      if (done('s3dock_sign')) { await play(['WD03_rumi_08']); return; }
      await play(['WD03_rumi_03', 'WD03_rumi_04']); if (!ok()) return;
      const w = await sign(); if (!ok() || !w) return;
      await ask('WD03_ply_01', 'icon_star'); if (!ok()) return;
      complete('s3dock_sign');
      await play(['WD03_rumi_09']); return;
    }
    if (id === 'phone') {
      if (done('s3dock_phone')) { await play(['WD03_bau_10']); return; }
      await play(['WD03_rumi_09', 'WD03_rumi_10']); if (!ok()) return;
      const w = await pipes(); if (!ok() || !w) return;
      await play(['WD03_rumi_11'], { keep: true }); if (!ok()) return;
      await ask('WD03_ply_02', 'icon_sound'); if (!ok()) return;
      G.audio.sfx('sfx_chime', 0.3, 1.3);
      await play(['WD03_bau_10']); if (!ok()) return;
      complete('s3dock_phone'); return;
    }
    if (id === 'boat') {
      if (done('s3dock_boat')) return;
      await play(['WD03_rumi_12', 'WD03_bau_02', 'WD03_rumi_13', 'WD03_rumi_14']); if (!ok()) return;
      const w = await fingers(); if (!ok() || !w) return;
      await play(['WD03_rumi_15']); if (!ok()) return;
      await crossBoat(V, S); if (!ok()) return;
      if (V.spr.bau) V.spr.bau.img.style.display = ''; if (V.spr.bauFar) V.spr.bauFar.img.style.display = 'none';
      await play(['WD03_bau_03'], o); if (!ok()) return;
      if (!await cardAct('good', '좋아 카드로 대답해요')) return;   // 10/4 피드백: "내 손짓 신호 어때?"에 엄지 척
      await play(['WD03_bau_04', 'WD03_bau_05', 'WD03_bau_06'], o); if (!ok()) return;
      if (!await cardAct('hi', '손을 흔드는 카드로 인사해요')) return;   // 손짓과 그림으로 얘기하는 바우 아저씨에게
      await play(['WD03_bau_07', 'WD03_bau_08', 'WD03_bau_09'], o); if (!ok()) return;
      await colorIn(V); if (!ok()) return;
      complete('s3dock_boat'); return;
    }
  };
  // 배를 타고 건너는 모습 (배는 배경 그림 안에 있어서 화면을 잠깐 어둡게 했다 밝힘)
  async function crossBoat(V) {
    const h = V.spr.hero && V.spr.hero.img, rm = G.reduced();
    G.audio.sfx('sfx_wind', 0.15, 0.8);
    G.$('#fade').classList.add('on'); await G.wait(rm ? 0.2 : 0.6);
    if (h) h.style.opacity = 1;
    G.$('#fade').classList.remove('on'); await G.wait(0.3);
  }

  // ---- 퍼즐 C: 물결을 하나씩 눌러 잠재우기 → 물에 비친 간판이 거꾸로 → [뒤집어 보기] → 그림 암호 풀기 ----
  function sign() {
    return new Promise((res) => {
      const g = G.gen, ok = () => g === G.gen, hard = G.lv('hard'), easy = !G.lv('normal');
      const S = screen('s3-sign', 1600, 900);
      const water = S.at(G.el('div', 's3-panel s3-water', S.B), 260, 30, 1080, 840);
      const refl = S.at(G.el('div', 's3-refl', water), 140, 120, 800, 600);
      const CD = D3().code.b;
      CD.forEach((k, i) => { const r = S.at(G.el('div', 's3-row', refl, `<img src="${cardImg(k)}" alt=""><span>${cardWord(k)}</span>`), 150, 20 + i * 145); r.style.fontSize = '58px'; });
      refl.style.transform = 'scaleY(-1)';
      let n = D3().ripples[G.level()] || 4, left = n, fin = false, idle = 0, arrow = null;
      const blur = () => { refl.style.filter = `blur(${(left / n * 14).toFixed(1)}px)`; };
      const rips = [];
      const add = () => { const s = 150 + Math.random() * 90, x = 100 + Math.random() * 780, y = 80 + Math.random() * 580;
        const b = G.btn('s3-rip', '', water, () => calm(b), '물결'); S.at(b, x, y, s, s); b.style.animationDelay = (-Math.random() * 1.6).toFixed(2) + 's'; rips.push(b); return b; };
      for (let i = 0; i < n; i++) add();
      blur();
      if (easy) rips[0].classList.add('s3-hint');
      S.say('WD03_rumi_04');
      function calm(b) {
        if (fin || G.dialog.active || b.classList.contains('gone')) return; clear(); idle = 0;
        b.classList.add('gone'); rips.splice(rips.indexOf(b), 1); setTimeout(() => b.remove(), 650);
        G.audio.sfx('sfx_chime', 0.25, 1.5 - left * 0.05); left--; blur();
        if (easy && rips[0]) rips[0].classList.add('s3-hint');
        if (left <= 0) calmDone();
      }
      // 어렵게: 한참 안 누르면 물결 하나가 다시 일어남
      const off = G.every(dt => { if (fin || !hard || left <= 0 || G.dialog.active) return; idle += dt; if (idle > 6 && left < n) { idle = 0; left++; add(); blur(); } });
      let flipB = null;
      async function calmDone() {
        off(); refl.style.filter = ''; G.audio.sfx('sfx_sparkle', 0.6);
        await play(['WD03_rumi_05']); if (!ok()) return;
        // 10/4 선생님: 버튼 대신 손을 잡고 위로 끌어 올리면 간판이 따라 뒤집힘 (반쯤 넘기 전에 놓으면 제자리로)
        flipB = G.el('div', 's3-flipgrab s3-hint', S.B, `<div class="tr"></div><div class="hd">${G.art('hand_hold') || G.art('hand_wave') ? `<img src="${G.art('hand_hold') || G.art('hand_wave')}" alt="">` : ''}</div>`);
        flipB.setAttribute('role', 'button'); flipB.setAttribute('aria-label', '잡고 위로 끌어 뒤집기'); S.at(flipB, 740, 600);
        const hd = flipB.querySelector('.hd'), R = 420; let st = null;
        const set = (k) => { refl.style.transform = `scaleY(${(-1 + 2 * k).toFixed(3)})`; hd.style.transform = `translateY(${(-R * k).toFixed(0)}px)`; };
        flipB.addEventListener('pointerdown', (e) => { if (fin || G.dialog.active) return; clear(); flipB.classList.remove('s3-hint'); st = { y: e.clientY, s: S.B.getBoundingClientRect().height / 900, id: e.pointerId }; try { flipB.setPointerCapture(e.pointerId); } catch (_) { } G.audio.sfx('sfx_tap', 0.4); });
        flipB.addEventListener('pointermove', (e) => { if (!st || e.pointerId !== st.id) return; const k = Math.max(0, Math.min(1, (st.y - e.clientY) / st.s / R)); st.k = k; set(k); if (k > 0.97) { st = null; flip(1); } });
        const up = (e) => { if (!st || e.pointerId !== st.id) return; const k = st.k || 0; st = null;
          if (k > 0.55) flip(k); else { G.tween(k, 0, 0.35, set, 'out'); if (k < 0.05) { flipB.classList.add('s3-hint'); S.say('WD03_rumi_05'); } } };
        flipB.addEventListener('pointerup', up); flipB.addEventListener('pointercancel', up);
        G.onTap(flipB, () => { if (G.reduced()) flip(0); });   // 몸이 불편해 끌기 어려운 경우를 위해: 움직임 줄이기 설정에서는 누르기만 해도 됨
      }
      async function flip(k0 = 0) {
        if (fin) return; fin = true; cur = null; G.help.off(); clear();
        G.audio.sfx('sfx_page', 0.6);
        await G.tween(k0, 1, G.reduced() ? 0.2 : 0.5 * (1 - k0) + 0.15, k => refl.style.transform = `scaleY(${(-1 + 2 * k).toFixed(3)})`, 'out'); if (!ok()) return;
        if (flipB) flipB.remove();
        spark(refl, 12); await play(['WD03_rumi_06']); if (!ok()) return;
        S.end();
        await presentItem('codeB'); if (!ok()) return;
        res(await decode());
      }
      function clear() { if (arrow) arrow.remove(); arrow = null; }
      cur = { solve: () => { if (left > 0) { rips.slice().forEach(b => calm(b)); } else flip(); } };
      G.help.set({ l1: () => S.say(left > 0 ? 'WD03_rumi_04' : 'WD03_rumi_05'), l2: () => { const t = left > 0 ? rips[0] : flipB; if (t && !arrow) arrow = arrowAt(S, t); }, l3: () => { const t = left > 0 ? rips[0] : flipB; if (t) t.classList.add('s3-hint'); }, clear });
    });
  }
  // 그림 암호: 편지 그림을 누르면 그림 표에서 같은 그림이 빛남 (보통부터는 표에서 같은 그림을 직접 찾아 누름)
  function decode() {
    return new Promise((res) => {
      const g = G.gen, ok = () => g === G.gen, easy = !G.lv('normal'), C = D3().code;
      const S = screen('s3-decode', 1600, 900);
      const lt = S.at(G.el('div', 's3-panel', S.B), 40, 30, 760, 840); lt.style.background = '#fffaf0';
      G.el('div', 's3-head', lt, G.icon('item_letter_s3') + ' 하랑이 편지');
      const tb = S.at(G.el('div', 's3-panel', S.B), 840, 30, 720, 840);
      G.el('div', 's3-head', tb, '그림 표');
      const rows = shuffle([...C.a, ...C.b]).map((k, i) => { const r = G.btn('s3-row', `<img src="${cardImg(k)}" alt=""><span>${cardWord(k)}</span>`, tb, () => tapRow(k, r), cardWord(k)); S.at(r, 40 + (i % 2) * 340, 110 + Math.floor(i / 2) * 175); r.dataset.k = k; return r; });
      const pics = C.letter.map((k, i) => {
        const b = G.btn('s3-lpic', `<img src="${cardImg(k)}" alt=""><span class="w"></span>`, lt, () => tapPic(i), '편지 그림'); S.at(b, 60 + (i % 2) * 340, 120 + Math.floor(i / 2) * 340); return { k, b, done: false };
      });
      let fin = false, at = -1, arrow = null;
      S.say('WD03_rumi_07');
      function tapPic(i) {
        if (fin || G.dialog.active) return; const p = pics[i]; if (p.done) return; clear();
        at = i; pics.forEach(q => q.b.classList.toggle('sel', q === p)); G.audio.sfx('sfx_tap', 0.5);
        if (easy) { const r = rows.find(r => r.dataset.k === p.k); r.classList.add('lit'); setTimeout(() => solveOne(i, r), 700); }
      }
      function tapRow(k, r) {
        if (fin || G.dialog.active || at < 0 || easy) { if (!fin && at < 0 && !easy) { const n = pics.find(q => !q.done); if (n) wob(n.b); } return; }
        clear();
        if (pics[at].k !== k) { wob(r); G.audio.sfx('sfx_tap', 0.4); S.say('WD03_rumi_07'); return; }
        r.classList.add('lit'); solveOne(at, r);
      }
      function solveOne(i, r) {
        const p = pics[i]; if (p.done) return; p.done = true; p.b.classList.remove('sel'); p.b.classList.add('ok'); p.b.querySelector('.w').textContent = cardWord(p.k);
        lastV = G.audio.voice('S93_card_' + p.k); spark(p.b, 6); at = -1;
        setTimeout(() => r.classList.remove('lit'), 900);
        if (pics.every(q => q.done)) win();
      }
      let lastV = null;
      // 10/4 선생님: 마지막 카드 '와 줘'가 '와'만 나옴 → 카드 소리가 끝까지 나온 뒤에 루미 말로 넘어감
      async function win() { if (fin) return; fin = true; cur = null; G.help.off(); clear(); if (lastV) await lastV; if (!ok()) return; S.hush(); await G.wait(0.6); if (!ok()) return;
        await play(['WD03_rumi_08']); S.end(); res(ok()); }
      function clear() { if (arrow) arrow.remove(); arrow = null; pics.forEach(q => q.b.classList.remove('s3-hint')); rows.forEach(r => r.classList.remove('s3-hint')); }
      const next = () => pics.find(q => !q.done);
      cur = { solve: () => { pics.forEach((p, i) => { if (!p.done) solveOne(i, rows.find(r => r.dataset.k === p.k)); }); } };
      G.help.set({ l1: () => S.say('WD03_rumi_07'), l2: () => { const p = next(); if (p && !arrow) arrow = arrowAt(S, at >= 0 ? rows.find(r => r.dataset.k === pics[at].k) : p.b); },
        l3: () => { const p = at >= 0 ? pics[at] : next(); if (!p) return; p.b.classList.add('s3-hint'); rows.find(r => r.dataset.k === p.k).classList.add('s3-hint'); }, clear });
    });
  }

  // ---- 퍼즐 G: 종이컵 전화 줄 잇기. 잎 조각을 눌러 돌려서 왼쪽 컵에서 오른쪽 컵까지 실을 이음 ----
  function pipes() {
    return new Promise((res) => {
      const g = G.gen, ok = () => g === G.gen, easy = !G.lv('normal'), [cw, ch] = D3().pipes[G.level()] || [4, 3];
      const S = screen('s3-pipes', 1600, 900);
      S.at(G.el('div', 's3-panel', S.B), 40, 20, 1520, 860).style.background = '#cfe6d0';
      const T = Math.min(200, 1100 / cw, 720 / ch), ox = 800 - cw * T / 2, oy = 450 - ch * T / 2;
      // 정답 길: 왼쪽 r0 줄에서 들어와 칸마다 오른쪽으로, 가끔 위아래로
      const path = []; let r = Math.floor(Math.random() * ch); const r0 = r;
      for (let c = 0; c < cw; c++) { path.push([c, r]); if (c < cw - 1 && Math.random() < 0.55) { const nr = Math.max(0, Math.min(ch - 1, r + (Math.random() < 0.5 ? -1 : 1))); if (nr !== r) { r = nr; path.push([c, r]); } } }
      const r1 = r;
      const D = [[0, -1], [1, 0], [0, 1], [-1, 0]];   // 위 오른쪽 아래 왼쪽
      const dirTo = (a, b) => D.findIndex(d => d[0] === b[0] - a[0] && d[1] === b[1] - a[1]);
      const cell = {};
      path.forEach((p, i) => { const inD = i === 0 ? 3 : dirTo(p, path[i - 1]), outD = i === path.length - 1 ? 1 : dirTo(p, path[i + 1]); cell[p] = { want: [inD, outD] }; });
      const tiles = [];
      for (let y = 0; y < ch; y++) for (let x = 0; x < cw; x++) {
        const c = cell[[x, y]], base = c ? ((c.want[0] + 2) % 4 === c.want[1] ? 'I' : 'L') : (Math.random() < 0.5 ? 'I' : 'L');
        const t = { x, y, base, rot: 0, on: !!c, want: c && c.want };
        t.b = G.btn('s3-tile', pipeSvg(base), S.B, () => turn(t), '잎 조각'); S.at(t.b, ox + x * T + 6, oy + y * T + 6, T - 12, T - 12);
        tiles.push(t);
      }
      const opens = (t) => (t.base === 'I' ? [0, 2] : [0, 1]).map(d => (d + t.rot) % 4);
      const fits = (t) => t.want.every(d => opens(t).includes(d));
      tiles.forEach(t => { do t.rot = Math.floor(Math.random() * 4); while (t.on && fits(t) && Math.random() < 0.85); draw(t); });
      // 컵 두 개
      const cup = (x, y) => { const e = S.at(G.el('div', 's3-pop', S.B, `<img src="${ART('item_cupphone')}" alt="">`), x, y, 130, 130); e.style.animation = 'none'; return e; };
      cup(ox - 80, oy + r0 * T + T / 2); cup(ox + cw * T + 80, oy + r1 * T + T / 2);
      let fin = false, arrow = null;
      S.say('WD03_rumi_10');
      function draw(t) { t.b.querySelector('svg').style.transform = `rotate(${t.rot * 90}deg)`; }
      function turn(t) {
        if (fin || G.dialog.active) return; clear(); t.rot = (t.rot + 1) % 4; draw(t); G.audio.sfx('sfx_tap', 0.35, 1.2);
        if (easy) tiles.forEach(q => q.b.classList.toggle('lit', q.on && fits(q)));
        if (connected()) win();
      }
      function connected() {   // 왼쪽 컵에서 실을 따라감
        let x = 0, y = r0, from = 3, seen = 0;
        while (seen++ < 100) {
          const t = tiles.find(q => q.x === x && q.y === y); if (!t) return false; const o = opens(t); if (!o.includes(from)) return false;
          const out = o.find(d => d !== from); if (x === cw - 1 && y === r1 && out === 1) return true;
          x += D[out][0]; y += D[out][1]; from = (out + 2) % 4; if (x < 0 || y < 0 || x >= cw || y >= ch) return false;
        }
        return false;
      }
      async function win() { if (fin) return; fin = true; cur = null; G.help.off(); clear(); S.hush(); tiles.filter(q => q.on).forEach(q => q.b.classList.add('lit'));
        G.audio.sfx('sfx_sparkle', 0.7); await G.wait(1.0); S.end(); res(ok()); }
      function clear() { if (arrow) arrow.remove(); arrow = null; tiles.forEach(q => q.b.classList.remove('s3-hint')); }
      const wrong = () => tiles.find(q => q.on && !fits(q));
      cur = { solve: () => { tiles.forEach(q => { if (q.on) { while (!fits(q)) q.rot = (q.rot + 1) % 4; draw(q); } }); win(); } };
      G.help.set({ l1: () => S.say('WD03_rumi_10'), l2: () => { const t = wrong(); if (t && !arrow) arrow = arrowAt(S, t.b); }, l3: () => { const t = wrong(); if (t) t.b.classList.add('s3-hint'); }, clear });
    });
  }
  function pipeSvg(kind) {   // 잎 위의 실 (I: 위-아래, L: 위-오른쪽)
    const p = kind === 'I' ? 'M50 0 V100' : 'M50 0 V50 H100';
    return `<svg viewBox="0 0 100 100"><path d="M18 50 q32-40 64 0 q-32 40-64 0z" fill="#9fd08f" opacity=".7"/><path d="${p}" stroke="#E88D7A" stroke-width="12" fill="none" stroke-linecap="round"/></svg>`;
  }

  // ---- 퍼즐 I: 손가락 숫자 신호. 바우 아저씨가 편 손가락을 세어 자물쇠 숫자를 맞춤 (어렵게: 두 손으로 6~9) ----
  function handSvg(n) {   // 손 하나 (손가락 n개 폄, 0~5)
    const art = n >= 1 && G.art('hand_f' + n); if (art) return `<img src="${art}" alt="" style="width:120px;height:144px;object-fit:contain">`;   // 선생님 그림 hand_f1~f5
    let f = '';
    const X = [22, 38, 54, 70];
    for (let i = 0; i < 4; i++) f += i < Math.min(4, n - (n >= 5 ? 1 : 0)) ? `<rect x="${X[i] - 7}" y="6" width="14" height="50" rx="7" fill="#D9A27A" stroke="#4A3B32" stroke-width="3"/>` : `<rect x="${X[i] - 7}" y="40" width="14" height="22" rx="7" fill="#D9A27A" stroke="#4A3B32" stroke-width="3"/>`;
    const th = n >= 5 ? `<rect x="78" y="40" width="14" height="40" rx="7" transform="rotate(-40 85 60)" fill="#D9A27A" stroke="#4A3B32" stroke-width="3"/>` : `<rect x="66" y="62" width="14" height="24" rx="7" transform="rotate(-70 73 74)" fill="#D9A27A" stroke="#4A3B32" stroke-width="3"/>`;
    return `<svg viewBox="0 0 100 120" width="120" height="144">${f}${th}<rect x="12" y="50" width="68" height="62" rx="20" fill="#D9A27A" stroke="#4A3B32" stroke-width="3"/></svg>`;
  }
  function fingers() {
    return new Promise((res) => {
      const g = G.gen, ok = () => g === G.gen, nums = D3().fingers[G.level()] || [2, 4], easy = !G.lv('normal');
      const S = screen('s3-fingers', 1600, 900);
      const sky = S.at(G.el('div', 's3-panel', S.B), 40, 20, 1520, 470); sky.style.background = '#cfe0f2';
      G.el('div', 's3-face', sky, `<img class="pf" src="${G.asset(G.D.portraits.bau.img)}" alt=""><span>바우 아저씨</span>`).style.cssText = 'left:40px;top:120px';
      const gw = 1200 / nums.length;
      const signs = nums.map((v, i) => { const e = S.at(G.el('div', 's3-sig', sky, (v > 5 ? handSvg(5) + handSvg(v - 5) : handSvg(v)) + (easy ? `<div class="dots">${'<i></i>'.repeat(v)}</div>` : '')), 280 + gw * i, 70); return e; });
      const vals = nums.map(() => 0);
      const dials = nums.map((_, i) => {
        const d = S.at(G.el('div', 's3-dial', S.B), 800 - nums.length * 110 + i * 220 + 25, 500);
        G.btn('', ARROW_UP, d, () => set(i, 1), '하나 더');
        const num = G.el('div', 'num', d, '0');
        G.btn('', ARROW_DN, d, () => set(i, -1), '하나 덜');
        return { d, num };
      });
      const open = G.btn('s3-btn', G.icon('icon_ok') + ' 열기', S.B, () => tryOpen(), '열기'); S.at(open, 1250, 700);
      let fin = false, arrow = null;
      S.say('WD03_rumi_14');
      function set(i, dv) { if (fin || G.dialog.active) return; clear(); vals[i] = (vals[i] + dv + 10) % 10; dials[i].num.textContent = vals[i]; G.audio.sfx('sfx_click', 0.3, 1 + vals[i] * 0.05); signs[i].classList.toggle('on', true); }
      async function tryOpen() {
        if (fin || G.dialog.active) return; clear();
        const bad = nums.map((v, i) => v !== vals[i]);
        if (bad.some(Boolean)) { bad.forEach((b, i) => { if (b) { wob(dials[i].d); wob(signs[i]); } }); G.audio.sfx('sfx_tap', 0.4); S.say('WD03_rumi_14'); return; }
        fin = true; cur = null; G.help.off(); S.hush(); G.audio.sfx('sfx_door', 0.5); spark(open, 12); await G.wait(1.0); S.end(); res(ok());
      }
      function clear() { if (arrow) arrow.remove(); arrow = null; dials.forEach(d => d.d.classList.remove('s3-hint')); open.classList.remove('s3-hint'); }
      const next = () => nums.findIndex((v, i) => v !== vals[i]);
      cur = { solve: () => { nums.forEach((v, i) => { vals[i] = v; dials[i].num.textContent = v; }); tryOpen(); } };
      G.help.set({ l1: () => S.say('WD03_rumi_14'), l2: () => { const i = next(); if (arrow) return; arrow = arrowAt(S, i >= 0 ? dials[i].d : open); },
        l3: () => { const i = next(); if (i >= 0) { dials[i].d.classList.add('s3-hint'); signs[i].classList.add('s3-hint'); } else open.classList.add('s3-hint'); }, clear });
    });
  }

  // ================= 말의 별-4: 하랑이네 집 =================
  G.flows.s3_harang = async (ctx) => {
    const { S, V, H, g, complete } = ctx, ok = () => g === G.gen, id = H.def.id, o = { partner: 'harang' };
    const hs = V.spr.harang && V.spr.harang.img;
    if (id === 'harang') {
      if (done('s3h_meet')) { await play(['WD04_harang_06'], o); return; }
      await play(['WD04_harang_01', 'WD04_harang_02'], o); if (!ok()) return;
      await play(['WD04_rumi_01']); if (!ok()) return;
      await play(['WD04_harang_03'], o); if (!ok()) return;
      { const p = pop(V.fx, 'card_lumi', 1420, 470, 120); setTimeout(() => p.remove(), 3500); }   // 하랑이가 쓱쓱 그린 루미
      await play(['WD04_rumi_02', 'WD04_rumi_03']); if (!ok()) return;
      // 루미가 재촉하자 하랑이가 카드 책을 덮고 고개를 돌림
      if (hs) { hs.style.transition = 'transform .5s'; hs.style.transform = 'scaleX(-1)'; }
      G.audio.sfx('sfx_door', 0.15, 1.6);
      await play(['WD04_rumi_04'], { ...o, keep: true }); if (!ok()) return;   // 10/4: 덮는 순간 하랑이 얼굴(흥, 그림 02)이 보이게
      await ask('WD04_ply_01', 'icon_good'); if (!ok()) return;
      await waitQuiet(); if (!ok()) return;   // 정말로 잠깐 기다림 (모래시계)
      await play(['WD04_rumi_05']); if (!ok()) return;
      if (hs) hs.style.transform = '';
      await play(['WD04_harang_04'], o); if (!ok()) return;
      await play(['WD04_rumi_06']); if (!ok()) return;
      const R = D3().reply[G.level()] || D3().reply.normal;
      const w = await strip({ mode: 'free', slots: [], n: R.slots, cards: R.cards, hintCards: R.hint, hint: 'WD04_rumi_06', head: '카드로 대답하기' }); if (!ok() || !w) return;
      await play(['WD04_harang_05'], o); if (!ok()) return;
      // 10/4 피드백: 이번엔 학생이 카드로 묻기 (너, 별, 봤어?) → 하랑이가 그림 일기를 보여 줌
      await play(['WD04_rumi_19']); if (!ok()) return;
      const Q = G.lv('normal') ? ['you', 'star', 'saw'] : ['star', 'saw'], QC = G.lv('hard') ? ['you', 'star', 'saw', 'me', 'lake', 'draw'] : G.lv('normal') ? ['you', 'star', 'saw', 'me'] : Q;
      const q = await strip({ mode: 'menu', slots: Q, cards: shuffle(QC), hint: 'WD04_rumi_19', head: '카드로 물어보기' }); if (!ok() || !q) return;
      await play(['WD04_harang_06'], o); if (!ok()) return;
      complete('s3h_meet'); return;
    }
    if (id === 'diary') {
      if (done('s3h_diary')) { await play(['WD04_rumi_09']); return; }
      await play(['WD04_rumi_20']); if (!ok()) return;   // 10/4: 하랑이가 먼저 보여 줌 (바람에 섞이는 것은 퍼즐 안에서)
      const w = await diary(); if (!ok() || !w) return;
      await play(['WD04_rumi_09', 'WD04_rumi_10']); if (!ok()) return;
      complete('s3h_diary'); return;
    }
    if (id === 'ask') {
      if (done('s3h_ask')) { await play(['WD04_harang_12'], o); return; }
      await play(['WD04_harang_07'], o); if (!ok()) return;
      await play(['WD04_rumi_11']); if (!ok()) return;
      const w = await twenty(); if (!ok() || !w) return;
      await play(['WD04_rumi_12']); if (!ok()) return;
      complete('s3h_ask'); return;
    }
    if (id === 'reeds') {
      if (done('s3h_star')) return;
      await play(['WD04_rumi_13']); if (!ok()) return;
      const w = await hold(); if (!ok() || !w) return;
      const r = H.def.rect, s = G.STARS.find(q => q.id === 'word'), st = G.el('div', 's2-star', V.fx, G.artImg('item_piece_word') || G.starSvg(s));
      Object.assign(st.style, { left: (r[0] + r[2] / 2) + 'px', top: (r[1] + r[3] / 2) + 'px', width: '150px', height: '150px', filter: 'grayscale(.7)' });
      await G.tween(0, 1, G.reduced() ? 0.2 : 1.0, k => st.style.transform = `translate(-50%,${-50 - 80 * k}%) scale(${0.4 + 0.6 * k})`, 'out'); if (!ok()) return;
      await play(['WD04_rumi_14', 'WD04_rumi_15']); if (!ok()) return;
      await play(['WD04_harang_10'], o); if (!ok()) return;
      await play(['WD04_rumi_17']); if (!ok()) return;
      await play(['WD04_harang_11'], o); if (!ok()) return;
      await play(['WD04_rumi_16']); if (!ok()) return;
      st.remove();
      await presentItem('piece_word'); if (!ok()) return;
      await play(['WD04_harang_12'], o); if (!ok()) return;
      await colorIn(V); if (!ok()) return;
      complete('s3h_star');
    }
    if (id === 'cardbox') { G.audio.voice('S93_card_' + shuffle(['hi', 'friend', 'star', 'draw'])[0]); }
  };
  // 10/4 피드백 (대사 3줄 넘으면 한 번 누르기): 긴 대사 사이에 주인공이 카드를 내밀어 대답 (카드 소리)
  function cardAct(k, tip) {
    return new Promise((res) => {
      const g = G.gen, m = G.el('div', 'modal s3-act', G.$('#overlay'));
      const b = G.btn('s3-actcard s3-hint', `<img src="${cardImg(k)}" alt=""><span>${cardWord(k)}</span>`, m, async () => {
        if (b.disabled) return; b.disabled = true; b.classList.remove('s3-hint'); G.audio.sfx('sfx_tap', 0.5); spark(b, 8); m.classList.add('go');
        await G.audio.voice('S93_card_' + k); await G.wait(0.3); m.remove(); res(g === G.gen);
      }, cardWord(k));
      G.el('div', 's3-wtip', m, tip);
    });
  }
  // 기다려 주기 (10/4 피드백: 직접 해 봄). 손을 떼고 있으면 모래시계가 차고, 그동안 하랑이가 카드 책을 한 장씩 넘김.
  //   그 사이 화면을 누르면 모래시계가 잠깐 멈추고 루미가 작게 "쉿". 처음부터가 아니라 멈췄다 이어서 참 (벌이 아님). 다 차면 하랑이가 카드를 척 내밂
  function waitQuiet() {
    return new Promise((res) => {
      const g = G.gen, ok = () => g === G.gen, sec = G.reduced() || G.fast() ? 1.5 : G.lv('hard') ? 5 : G.lv('normal') ? 4 : 3;
      const m = G.el('div', 'modal s3-waitq', G.$('#overlay'));
      const dl = G.$('#dialog'); if (dl) dl.style.visibility = 'hidden';   // 기다리는 동안 대사 창([다음])을 감춤 (누를 것이 없다는 것이 보이게)
      m.innerHTML = `<div class="s3-hour"><div class="s3-wpage"><img src="${cardImg('hi')}" alt=""></div><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,255,255,.3)" stroke-width="8"/><circle class="arc" cx="50" cy="50" r="44" fill="none" stroke="#FFD66B" stroke-width="8" stroke-dasharray="276" stroke-dashoffset="276" transform="rotate(-90 50 50)"/></svg></div>` +
        `<div class="s3-wtip">손을 떼고 기다려요</div><div class="s3-shh">${G.txt('WD04_rumi_18')}</div>`;
      const arc = m.querySelector('.arc'), pg = m.querySelector('.s3-wpage'), pic = pg.querySelector('img'), shh = m.querySelector('.s3-shh');
      const PAGES = ['star', 'draw', 'friend', 'lake', 'good', 'look', 'okay'];
      let t = 0, hold = 0, down = false, flip = 0, n = 0, lastShh = -9, fin = false;
      const turn = () => { pic.src = cardImg(PAGES[n++ % PAGES.length]); G.audio.sfx('sfx_page', 0.25, 1.2); if (pg.animate && !G.reduced()) pg.animate([{ transform: 'rotateY(80deg)' }, { transform: 'rotateY(0)' }], { duration: 260, easing: 'ease-out' }); };
      const press = (e) => { if (fin) return; down = true; hold = 1.2; m.classList.add('paused');
        if (G.t - lastShh > 3) { lastShh = G.t; G.audio.voice('WD04_rumi_18'); shh.classList.remove('on'); void shh.offsetWidth; shh.classList.add('on'); } };
      const lift = () => { down = false; };
      m.addEventListener('pointerdown', press); m.addEventListener('pointerup', lift); m.addEventListener('pointercancel', lift); m.addEventListener('pointerleave', lift);
      const off = G.every(dt => {
        if (!ok() || !m.isConnected) { off(); if (dl) dl.style.visibility = ''; res(); return; }
        if (down || hold > 0) { hold = down ? 1.2 : hold - dt; if (hold <= 0) m.classList.remove('paused'); return; }
        t += dt; flip += dt; arc.style.strokeDashoffset = 276 * (1 - Math.min(1, t / sec));
        if (flip > 0.8 && t < sec) { flip = 0; turn(); }
        if (t >= sec) { off(); done(); }
      });
      async function done() {
        fin = true; pic.src = cardImg('okay'); G.audio.sfx('sfx_chime', 0.35, 1.2); m.classList.remove('paused'); m.classList.add('end');   // 하랑이가 카드를 척
        await G.wait(G.fast() ? 0.4 : 0.9); m.remove(); if (dl) dl.style.visibility = ''; res();
      }
    });
  }

  // ---- 퍼즐 J: 그림 일기 순서. 바람에 섞인 그림을 일어난 차례대로 놓기 (그림은 별의 자리로 알 수 있음) ----
  function diaryPic(n) {   // 선생님 그림 diary_N이 있으면 그 그림. 없으면 코드로 그린 그림
    const a = G.art('diary_' + n); if (a) return `<img src="${a}" alt="">`;
    const st = { 1: [200, 40, 1], 2: [230, 110, 1], 3: [250, 175, 1], 4: [290, 205, 1], 5: [330, 225, .7], 6: [330, 225, .7] }[n];
    const star = (x, y, s, dim) => `<polygon points="${[...Array(10)].map((_, i) => { const r = (i % 2 ? 9 : 22) * s, t = -Math.PI / 2 + i * Math.PI / 5; return (x + r * Math.cos(t)).toFixed(1) + ',' + (y + r * Math.sin(t)).toFixed(1); }).join(' ')}" fill="${dim ? '#d8c3cb' : '#F29BB0'}" stroke="#4A3B32" stroke-width="3"/>`;
    let extra = '';
    if (n === 2) extra = `<path d="M160 20 L${st[0] - 10} ${st[1] - 10}" stroke="#FFD66B" stroke-width="8" stroke-linecap="round" opacity=".8"/>`;
    if (n === 3) extra = `<path d="M225 170 l-18 -10 M275 170 l18 -10 M250 150 v-18" stroke="#FFD66B" stroke-width="6" stroke-linecap="round"/>`;
    if (n === 4) extra = `<path d="M250 200 q12 -14 24 0" stroke="#4A3B32" stroke-width="4" fill="none"/><path d="M262 205 q10 -12 20 0" stroke="#4A3B32" stroke-width="4" fill="none"/>`;
    if (n === 6) extra = `<g><circle cx="90" cy="185" r="20" fill="#F6D2B4" stroke="#4A3B32" stroke-width="3"/><path d="M70 182 q20 -30 40 0" fill="#2B2522"/><rect x="74" y="205" width="32" height="40" rx="10" fill="#FFD66B" stroke="#4A3B32" stroke-width="3"/><path d="M110 210 l40 -20" stroke="#F4A259" stroke-width="7" stroke-linecap="round"/></g>`;
    return `<svg viewBox="0 0 400 260"><rect width="400" height="150" fill="#2E3A6B"/><rect y="150" width="400" height="110" fill="#5d86c4"/>` +
      `<path d="M150 190 q100 -70 200 0" stroke="#A0764F" stroke-width="12" fill="none"/>` +
      `<g stroke="#7FB77E" stroke-width="5">${[300, 318, 336, 354, 372].map(x => `<path d="M${x} 250 l4 -45"/>`).join('')}</g>` +
      `<circle cx="60" cy="40" r="18" fill="#FFF4E0"/>` + extra + star(st[0], st[1], st[2], n >= 5) + `</svg>`;
  }
  function diary() {
    return new Promise((res) => {
      const g = G.gen, ok = () => g === G.gen, easy = !G.lv('normal'), order = D3().diary[G.level()] || D3().diary.normal, n = order.length;
      const S = screen('s3-diary', 1600, 900);
      S.at(G.el('div', 's3-panel', S.B), 40, 20, 1520, 860).style.background = '#fffaf0';
      const pw = Math.min(330, 1400 / n - 20), ph = pw * 0.65, sx = 800 - n * (pw + 20) / 2;
      const slots = order.map((_, i) => { const e = S.at(G.el('div', 's3-dslot', S.B, `<b>${i + 1}</b>`), sx + i * (pw + 20), 80, pw, ph + 20); return { e, v: null }; });
      const pics = shuffle(order).map((v, i) => { const b = G.btn('s3-dpic', diaryPic(v), S.B, () => tap(b), '그림'); b.dataset.v = v; S.at(b, sx + i * (pw + 20), 480, pw, ph); return b; });
      let fin = false, at = 0, arrow = null;
      // 10/4 선생님: 단서 없이 찍게 됨 → 하랑이가 먼저 일기를 순서대로 한 장씩 보여 줌 → 바람이 불어 그림이 날아가 섞임 → 기억해서 다시 놓기
      pics.forEach(p => p.style.visibility = 'hidden');
      (async () => {
        const rm = G.reduced(), show = order.map((v, i) => { const e = S.at(G.el('div', 's3-dshow', S.B, diaryPic(v) + `<b>${i + 1}</b>`), sx + i * (pw + 20), 80, pw, ph + 20); e.style.opacity = 0; return e; });
        await G.wait(0.4); if (!ok()) return;
        for (const e of show) { G.audio.sfx('sfx_page', 0.5); if (rm) e.style.opacity = 1; else G.tween(0, 1, 0.45, k => { e.style.opacity = k; e.style.transform = `scale(${1.25 - 0.25 * k})`; }, 'out'); await G.wait(easy ? 1.6 : 1.3); if (!ok()) return; }
        await G.wait(1.2); if (!ok()) return;
        G.audio.sfx('sfx_wind', 0.5, 0.9);
        await Promise.all(show.map((e, i) => rm ? (e.remove(), null) : G.tween(0, 1, 0.9, k => { e.style.transform = `translate(${(i % 2 ? 1 : -1) * 200 * k}px,${380 * k}px) rotate(${(i % 2 ? 1 : -1) * 40 * k}deg)`; e.style.opacity = 1 - k; }, 'in').then(() => e.remove()))); if (!ok()) return;
        pics.forEach((p, i) => { p.style.visibility = ''; if (!rm && p.animate) p.animate([{ transform: `translateY(-260px) rotate(${(i % 2 ? 1 : -1) * 30}deg)`, opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: 600, delay: i * 70, easing: 'ease-out', fill: 'backwards' }); });
        await play(['WD04_rumi_07']); if (!ok()) return;
        S.say('WD04_rumi_08');
      })();
      function tap(b) {
        if (fin || G.dialog.active || b.classList.contains('used') || b.style.visibility === 'hidden') return; clear();
        if (+b.dataset.v !== order[at]) { wob(b); G.audio.sfx('sfx_tap', 0.4); S.say('WD04_rumi_08'); if (easy) pics.find(p => +p.dataset.v === order[at]).classList.add('s3-hint'); return; }
        b.classList.add('used'); slots[at].e.innerHTML = diaryPic(order[at]) + `<b>${at + 1}</b>`; slots[at].e.classList.add('on'); G.audio.sfx('sfx_chime', 0.45, 0.9 + at * 0.1); spark(slots[at].e, 6);
        at++; if (at >= n) win();
      }
      async function win() { if (fin) return; fin = true; cur = null; G.help.off(); clear(); S.hush(); G.audio.sfx('sfx_sparkle', 0.7); await G.wait(1.2); S.end(); res(ok()); }
      function clear() { if (arrow) arrow.remove(); arrow = null; pics.forEach(p => p.classList.remove('s3-hint')); }
      const want = () => pics.find(p => +p.dataset.v === order[at]);
      cur = { solve: () => { while (!fin && at < n) tap(want()); } };
      G.help.set({ l1: () => S.say('WD04_rumi_08'), l2: () => { const p = want(); if (p && !arrow) arrow = arrowAt(S, p); }, l3: () => { const p = want(); if (p) p.classList.add('s3-hint'); }, clear });
    });
  }

  // ---- 퍼즐 D: 예/아니요 스무고개. 물음 카드를 누르면 하랑이가 엄지(예)나 손바닥(아니요)으로 대답 → 아닌 자리는 흐려짐 ----
  function twenty() {
    return new Promise((res) => {
      const g = G.gen, ok = () => g === G.gen, SP = D3().spots, ids = SP.lv[G.level()] || SP.lv.normal, star = SP.list.find(s => s.id === SP.star);
      const S = screen('s3-twenty', 1600, 900);
      const map = S.at(G.el('div', 's3-panel s3-reedmap', S.B), 40, 20, 1100, 860);
      map.innerHTML = G.art('bg_reedmap') ? `<img class="s3-reedbg" src="${G.art('bg_reedmap')}" alt="">` : `<svg viewBox="0 0 1100 860" width="1100" height="860"><rect width="1100" height="860" rx="28" fill="#9cc79a"/><path d="M0 230 Q550 120 1100 260 V500 Q550 420 0 520Z" fill="#5d86c4"/>` +
        `<path d="M600 530 Q800 420 1010 200" stroke="#A0764F" stroke-width="30" fill="none" stroke-linecap="round"/><path d="M600 530 Q800 420 1010 200" stroke="#7a5638" stroke-width="30" stroke-dasharray="4 26" fill="none"/>` +
        `<g fill="#9A97A8" stroke="#4A3B32" stroke-width="4"><path d="M120 620 l40 -50 60 10 30 50z"/><path d="M90 380 l30 -40 50 8 26 40z"/></g>` +
        `<g stroke="#5f9a5c" stroke-width="7">${[[260, 700], [300, 680], [430, 720], [470, 700], [620, 620], [660, 600], [700, 640]].map(([x, y]) => `<path d="M${x} ${y + 60} l6 -70"/>`).join('')}</g></svg>`;
      const spots = SP.list.filter(s => ids.includes(s.id)).map((s, i) => { const b = G.btn('s3-spot', String(i + 1), map, () => guess(s, b), (i + 1) + '번 자리'); S.at(b, s.at[0] * 1100, s.at[1] * 860); return { s, b, out: false }; });
      const qs = SP.ask.map((k, i) => { const b = card(S, k, 1220, 40 + i * 205, () => question(k, b)); b.style.height = '190px'; G.el('b', 's3-q', b, '?'); return b; });
      let fin = false, busy = false, arrow = null;
      S.say('WD04_rumi_11');
      async function answer(yes) { await play([yes ? 'WD04_harang_08' : 'WD04_harang_09'], { partner: 'harang' }); }
      async function question(k, b) {
        if (fin || busy || G.dialog.active || b.classList.contains('used')) return; busy = true; clear();
        b.classList.add('used'); G.audio.voice('S93_card_' + k); await G.wait(0.8);
        const yes = star.tags.includes(k); await answer(yes); if (!ok()) return;
        spots.forEach(p => { if (!p.out && p.s.tags.includes(k) !== yes) { p.out = true; p.b.classList.add('out'); } });
        G.audio.sfx('sfx_chime', 0.3, yes ? 1.3 : 0.9);
        busy = false; lastOne();
      }
      function lastOne() { const left = spots.filter(p => !p.out); if (left.length === 1) left[0].b.classList.add('s3-hint'); }
      async function guess(s, b) {
        if (fin || busy || G.dialog.active) return; clear();
        if (s !== star) { busy = true; wob(b); await answer(false); if (!ok()) return; const p = spots.find(q => q.s === s); p.out = true; b.classList.add('out'); busy = false; lastOne(); return; }
        fin = true; cur = null; G.help.off(); S.hush(); busy = true; await answer(true); if (!ok()) return;
        b.classList.add('s3-hint'); spark(b, 12); G.audio.sfx('sfx_sparkle', 0.7); await G.wait(1.0); S.end(); res(ok());
      }
      function clear() { if (arrow) arrow.remove(); arrow = null; qs.forEach(q => q.classList.remove('hint')); }
      const nextQ = () => qs.find(q => !q.classList.contains('used') && spots.some(p => !p.out && p.s.tags.includes(q.dataset.k) !== star.tags.includes(q.dataset.k)));
      cur = { solve: () => { const p = spots.find(q => q.s === star); guess(p.s, p.b); } };
      G.help.set({ l1: () => S.say('WD04_rumi_11'), l2: () => { const q = nextQ() || spots.find(p => p.s === star).b; if (!arrow) arrow = arrowAt(S, q.b || q); },
        l3: () => { const q = nextQ(); if (q) q.classList.add('hint'); else spots.find(p => p.s === star).b.classList.add('s3-hint'); }, clear });
    });
  }

  // ---- 퍼즐 E: 등불을 꾹 누르고 있기 (쉽게 1초, 보통 2초, 어렵게 두 곳). 손을 떼면 빛이 천천히 줄어듦 ----
  function hold() {
    return new Promise((res) => {
      const g = G.gen, ok = () => g === G.gen, secs = D3().hold[G.level()] || [2];
      const S = screen('s3-hold', 1600, 900);
      const dark = S.at(G.el('div', 's3-panel s3-dark', S.B), 40, 20, 1520, 860);
      // 10/4 선생님: 배경 그림(bg_reednight)이 오면 그 그림, 없으면 코드 그림
      dark.innerHTML = G.art('bg_reednight') ? `<img class="s3-reedbg" src="${G.art('bg_reednight')}" alt="">` : `<svg viewBox="0 0 1520 860" width="1520" height="860"><rect width="1520" height="860" rx="28" fill="#141a33"/><g stroke="#2f4a3a" stroke-width="12">${[...Array(28)].map((_, i) => `<path d="M${40 + i * 52} 860 l${(i % 3) * 6 - 6} -${220 + (i * 53) % 160}"/>`).join('')}</g></svg>`;
      const hid = G.el('div', 's3-hidstar', dark, G.starSvg(G.STARS.find(q => q.id === 'word') || G.STARS[2], true)); S.at(hid, 872 - 62, 540 - 62, 124, 124);   // 갈대 사이에 숨은 별: 선생님 그림(bg_reednight) 속 별 자리 위에 겹침
      const veil = G.el('div', 's3-veil', dark);   // 어둠: 등불이 밝아질수록 걷힘 (숨은 별도 어둠 아래)
      const light = G.el('div', 's3-lightc', dark);
      const POS = secs.length > 1 ? [[330, 725], [1240, 725]] : [[780, 725]];   // 그림 속 빈 흙길 자리
      const rings = secs.map((sec, i) => {
        const b = G.el('button', 's3-ring', dark); b.type = 'button'; b.setAttribute('aria-label', '등불'); S.at(b, POS[i][0] - 130, POS[i][1] - 130, 260, 260);
        b.innerHTML = `<img src="${ART('item_lantern')}" alt="" style="position:absolute;left:55px;top:50px;width:150px;height:150px"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,.25)" stroke-width="7"/><circle class="arc" cx="50" cy="50" r="45" fill="none" stroke="#FFD66B" stroke-width="7" stroke-dasharray="283" stroke-dashoffset="283" transform="rotate(-90 50 50)"/></svg>`;
        const R = { b, sec, k: 0, down: false, done: false, arc: b.querySelector('.arc'), img: b.querySelector('img') };
        R.glow = G.el('div', 's3-lglow', dark); S.at(R.glow, POS[i][0] - 300, POS[i][1] - 300, 600, 600);   // 누르고 있으면 점점 밝아지는 빛
        b.addEventListener('pointerdown', (e) => { if (fin || R.done || G.dialog.active) return; R.down = true; try { b.setPointerCapture(e.pointerId); } catch (_) { } G.audio.sfx('sfx_tap', 0.3); G.help.poke(); });
        const up = () => { R.down = false; }; b.addEventListener('pointerup', up); b.addEventListener('pointercancel', up); b.addEventListener('pointerleave', up);
        b.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { R.down = true; e.preventDefault(); } }); b.addEventListener('keyup', up);
        return R;
      });
      let fin = false;
      S.say('WD04_rumi_13');
      const off = G.every(dt => {
        if (fin) return;
        for (const R of rings) {
          if (R.done) continue;
          R.k = Math.max(0, Math.min(1, R.k + (R.down ? dt / R.sec : -dt * 0.35)));
          R.arc.style.strokeDashoffset = 283 * (1 - R.k);
          R.glow.style.opacity = R.k.toFixed(3); R.glow.style.transform = `scale(${(0.5 + 0.5 * R.k).toFixed(3)})`; R.img.style.filter = `brightness(${(0.6 + 0.7 * R.k).toFixed(2)})`;
          veil.style.opacity = (0.85 - 0.35 * rings.reduce((a, q) => a + q.k, 0) / rings.length).toFixed(3);
          if (R.k >= 1) { R.done = true; R.down = false; G.audio.sfx('sfx_chime', 0.5, 1.2); R.b.classList.add('lit');
            const c = G.el('div', 's3-glowc', dark); S.at(c, POS[rings.indexOf(R)][0] - 260, POS[rings.indexOf(R)][1] - 260, 520, 520); }
        }
        if (rings.every(R => R.done)) win();
      });
      // 두 등불이 다 밝아지면 어둠이 걷히고 갈대 사이의 별이 반짝이며 커짐
      async function win() { if (fin) return; fin = true; off(); cur = null; G.help.off(); S.hush(); light.classList.add('on'); G.audio.sfx('sfx_sparkle', 0.7);
        G.tween(veil.style.opacity || 0.5, 0, 1.0, v => veil.style.opacity = v); hid.classList.add('on'); await G.wait(0.9); spark(hid, 12); G.audio.sfx('sfx_star', 0.6); await G.wait(2.2); S.end(); res(ok()); }
      cur = { solve: () => { rings.forEach(R => { R.k = 1; R.down = true; }); } };
      G.help.set({ l1: () => S.say('WD04_rumi_13'), l2: () => { }, l3: () => { const R = rings.find(q => !q.done); if (R) R.b.classList.add('s3-hint'); }, clear: () => rings.forEach(R => R.b.classList.remove('s3-hint')) });
    });
  }

  // ================= 말의 별-5: 광장 잔치 =================
  G.flows.s3_plaza = async (ctx) => {
    const { S, V, H, g, complete } = ctx, ok = () => g === G.gen, id = H.def.id;
    if (id === 'harang') {
      if (done('s3plaza_relay')) { await play(['WD05_harang_01'], { partner: 'harang' }); return; }
      await play(['WD05_moa_01'], { partner: 'moa' }); if (!ok()) return;
      await play(['WD05_bau_01'], { partner: 'bau' }); if (!ok()) return;
      await play(['WD05_chief_01'], { partner: 'chief' }); if (!ok()) return;
      await play(['WD05_rumi_01', 'WD05_rumi_02']); if (!ok()) return;
      const w = await relay(); if (!ok() || !w) return;
      await play(['WD05_chief_02'], { partner: 'chief' }); if (!ok()) return;
      await play(['WD05_harang_01'], { partner: 'harang' }); if (!ok()) return;
      await play(['WD05_chief_03'], { partner: 'chief' }); if (!ok()) return;
      // 잔치 별가루: 모아 아주머니, 바우 아저씨
      await play(['WD05_moa_03'], { partner: 'moa' }); if (!ok()) return;
      { const at = S.feastDust.moa; dustBtn(V, 's3plaza:moa', at[0], at[1]); G.audio.sfx('sfx_sparkle', 0.5); }
      await play(['WD05_bau_03'], { partner: 'bau' }); if (!ok()) return;
      { const at = S.feastDust.bau; dustBtn(V, 's3plaza:bau', at[0], at[1]); G.audio.sfx('sfx_sparkle', 0.5); }
      // 별이 다시 빛나기 시작함
      const s = G.STARS.find(q => q.id === 'word'), st = G.el('div', 's2-star', G.$('#overlay'), G.starSvg(s));
      Object.assign(st.style, { left: '50%', top: '22%', width: G.stage.u * 170 + 'px', height: G.stage.u * 170 + 'px', position: 'absolute', opacity: 0.3, filter: 'grayscale(.8)' });
      G.audio.sfx('sfx_sparkle', 0.7);
      G.tween(0, 1, 1.6, k => { st.style.opacity = 0.3 + 0.7 * k; st.style.filter = `grayscale(${0.8 * (1 - k)}) drop-shadow(0 0 ${30 * k}px rgba(242,155,176,1))`; });
      await play(['WD05_rumi_03']); st.remove(); if (!ok()) return;
      await play(['WD05_chief_04'], { partner: 'chief' }); if (!ok()) return;
      complete('s3plaza_relay'); return;
    }
    if (id === 'pedestal') {
      if (sd().length < D3().dustNeed) { await play(['E11_chief_01'], { partner: 'chief' }); return; }
      if (has('piece_word')) {
        say('WD05_rumi_04');
        const u = await G.p4.useItem('piece_word', H.btn, { say, hint: 'WD05_rumi_04' }); if (!u || !ok()) return;
      }
      await starRise(V); if (!ok()) return;
      await play(['WD05_chief_05', 'WD05_chief_06'], { partner: 'chief' }); if (!ok()) return;
      if (!cleared('s3plaza')) G.st.cleared.push('s3plaza');
      complete('s3plaza_star'); if (!ok()) return;
      await ending();
    }
  };
  // ---- 퍼즐 F: 말 전하기 릴레이. 하랑(카드) → 바우(손짓) → 모아(글) → 촌장(말). 같은 뜻을 골라 차례로 전함 ----
  const GEST = {   // 손짓 그림 (선생님 그림 hand_<이름>이 오면 그 그림)
    bow: '<svg viewBox="0 0 100 100"><circle cx="62" cy="34" r="14" fill="#F6D2B4" stroke="#4A3B32" stroke-width="3"/><path d="M30 86 L40 50 Q48 40 60 46" stroke="#7DBBE3" stroke-width="16" fill="none" stroke-linecap="round"/><path d="M60 46 l12 10" stroke="#F6D2B4" stroke-width="7" stroke-linecap="round"/></svg>',
    hold: '<svg viewBox="0 0 100 100"><rect x="14" y="40" width="34" height="28" rx="12" fill="#F6D2B4" stroke="#4A3B32" stroke-width="3"/><rect x="52" y="40" width="34" height="28" rx="12" fill="#D9A27A" stroke="#4A3B32" stroke-width="3"/><path d="M44 54 h12" stroke="#4A3B32" stroke-width="3"/></svg>',
    ball: '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="32" fill="#F4A259" stroke="#4A3B32" stroke-width="3"/><path d="M18 50 h64 M50 18 q-18 32 0 64" stroke="#4A3B32" stroke-width="3" fill="none"/></svg>',
    wave: '<svg viewBox="0 0 100 100"><rect x="30" y="34" width="40" height="46" rx="14" fill="#F6D2B4" stroke="#4A3B32" stroke-width="3"/><path d="M78 30 q10 12 0 24 M86 24 q14 18 0 36" stroke="#4A3B32" stroke-width="3" fill="none"/></svg>',
    stop: '<svg viewBox="0 0 100 100"><rect x="28" y="30" width="44" height="54" rx="14" fill="#F6D2B4" stroke="#4A3B32" stroke-width="3"/>' + [32, 42, 52, 62].map(x => `<rect x="${x}" y="12" width="8" height="26" rx="4" fill="#F6D2B4" stroke="#4A3B32" stroke-width="3"/>`).join('') + '</svg>',
    sleep: '<svg viewBox="0 0 100 100"><path d="M60 18 a32 32 0 1 0 22 52 a26 26 0 1 1 -22 -52z" fill="#FFD66B" stroke="#4A3B32" stroke-width="3"/></svg>',
  };
  const gest = (k) => G.artImg('hand_' + k) || GEST[k];
  function relay() {
    return new Promise((res) => {
      const g = G.gen, ok = () => g === G.gen, R = D3().relay, easy = !G.lv('normal'), hard = G.lv('hard');
      const who = easy ? ['harang', 'moa', 'chief'] : ['harang', 'bau', 'moa', 'chief'];
      const S = screen('s3-relay', 1600, 900);
      S.at(G.el('div', 's3-panel', S.B), 40, 20, 1520, 470);
      const sw = 1440 / who.length;
      const st = who.map((k, i) => {
        const x = 80 + sw * i, e = S.at(G.el('div', 's3-station', S.B, `<img class="pf" src="${G.asset(G.D.portraits[k].img)}" alt=""><div class="msg"></div>`), x, 50, sw - 40, 420);
        if (i < who.length - 1) S.at(G.el('div', 's3-arrow', S.B, '<svg viewBox="0 0 60 40"><path d="M4 20 H44 M34 8 L52 20 L34 32" stroke="#F4A259" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>'), x + sw - 60, 230);
        return { k, e, msg: e.querySelector('.msg') };
      });
      // 하랑이의 카드는 처음부터
      st[0].msg.innerHTML = R.meaning.map(k => `<img src="${cardImg(k)}" alt="">`).join(''); st[0].e.classList.add('on');
      let step = 1, fin = false, arrow = null, opts = [];
      const tray = G.el('div', 's3-relay-tray', S.B); S.at(tray, 80, 520, 1440, 340);
      function show() {
        tray.innerHTML = ''; opts = [];
        st.forEach((s, i) => s.e.classList.toggle('now', i === step));
        const k = st[step].k;
        if (k === 'chief') { win(); return; }
        if (k === 'bau') { S.say('WD05_bau_02'); const list = shuffle([R.bau.ok, ...R.bau.no.slice(0, hard ? 2 : 1)]);
          opts = list.map(set => { const b = G.btn('s3-opt', set.map(q => `<span class="g">${gest(q)}</span>`).join(''), tray, () => choose(b, set === R.bau.ok, set.map(q => `<span class="g">${gest(q)}</span>`).join('')), '손짓'); return b; }); }
        if (k === 'moa') { S.say('WD05_moa_02'); const list = shuffle([R.moa.ok, ...R.moa.no.slice(0, easy ? 1 : hard ? 2 : 1)]);
          opts = list.map(t => { const b = G.btn('s3-opt s3-note', t, tray, () => choose(b, t === R.moa.ok, `<div class="s3-paper">${t}</div>`), t); return b; }); }
        opts.forEach(b => b.dataset.ok = '');
      }
      async function choose(b, right, html) {
        if (fin || G.dialog.active) return; clear();
        if (!right) { wob(b); G.audio.sfx('sfx_tap', 0.4); S.say('WD05_rumi_02'); return; }
        G.audio.sfx('sfx_chime', 0.5, 1 + step * 0.1); st[step].msg.innerHTML = html; st[step].e.classList.add('on'); spark(st[step].e, 8);
        step++; await G.wait(0.6); if (!ok()) return; show();
      }
      async function win() { if (fin) return; fin = true; cur = null; G.help.off(); clear(); S.hush(); tray.innerHTML = ''; st[st.length - 1].e.classList.add('on'); G.audio.sfx('sfx_sparkle', 0.7); await G.wait(1.0); S.end(); res(ok()); }
      function clear() { if (arrow) arrow.remove(); arrow = null; opts.forEach(b => b.classList.remove('s3-hint')); }
      const right = () => { const k = st[step] && st[step].k; return opts.find(b => k === 'bau' ? b.innerHTML.includes(gest(R.bau.ok[0]).slice(0, 40)) && b.innerHTML.includes(gest(R.bau.ok[2]).slice(0, 40)) : b.textContent === R.moa.ok); };
      cur = { solve: () => { step = st.length - 1; show(); } };
      G.help.set({ l1: () => S.say('WD05_rumi_02'), l2: () => { const b = right(); if (b && !arrow) arrow = arrowAt(S, b); }, l3: () => { const b = right(); if (b) b.classList.add('s3-hint'); }, clear });
      show();
    });
  }

  // ---- 별이 받침대에서 하늘로 (길의 별·소리의 별과 같은 차례): 모이기 → 받침대로 → 빛 기둥 → 밤하늘 제자리 → 가로등·색·불꽃놀이 → 「말의 별」 ----
  const GATHER = { chief: [900, 520], bau: [1380, 430], harang: [1310, 690], moa: [960, 720] };
  async function starRise(V) {
    const s = G.STARS.find(q => q.id === 'word'), ov = G.$('#overlay'), u = G.stage.u, rm = G.reduced();
    const { W, H: SH } = G.stage, wl = V.el.parentNode, S = V.S, ped = S.hotspots.find(h => h.id === 'pedestal').rect;
    const layer = G.el('div', 'layer', ov); layer.style.pointerEvents = 'none';
    G.hud.hide(true);
    V.fx.querySelectorAll('.hot-glow, .mstar').forEach(e => e.style.visibility = 'hidden');
    const mv = Object.entries(GATHER).map(([k, to]) => { const sp = V.spr[k]; if (!sp || sp.img.style.display === 'none') return null; const r = sp.def.rect; return { e: sp.img, x0: r[0], y0: r[1], x1: to[0], y1: to[1] }; }).filter(Boolean);
    const place = k => mv.forEach(m => { m.e.style.left = (m.x0 + (m.x1 - m.x0) * k) + 'px'; m.e.style.top = (m.y0 + (m.y1 - m.y0) * k) + 'px'; });
    if (rm) place(1); else await G.tween(0, 1, 1.6, place, 'io');
    const [bx, by] = V.toScreen(ped[0] + ped[2] / 2, ped[1] + 40), hs = S.sprites.find(q => q.id === 'hero').rect, [hx, hy] = V.toScreen(hs[0] + hs[2] / 2, hs[1]);
    const piece = G.el('div', 'c11-item', layer, G.icon('item_piece_word')); Object.assign(piece.style, { left: hx + 'px', top: hy + 'px' });
    await G.tween(0, 1, rm ? 0.3 : 1.2, k => { piece.style.left = (hx + (bx - hx) * k) + 'px'; piece.style.top = (hy + (by - hy) * k - Math.sin(k * Math.PI) * 120 * u) + 'px'; }, 'io');
    G.audio.sfx('sfx_star', 0.9);
    const pillar = G.el('div', 'c11-pillar', layer); Object.assign(pillar.style, { left: bx + 'px', top: by + 'px' });
    await G.tween(0, 1, rm ? 0.3 : 1.0, k => { pillar.style.transform = `translate(-50%,-100%) scaleY(${k})`; pillar.style.opacity = k; piece.style.opacity = 1 - k; }, 'out');
    piece.remove(); G.audio.sfx('sfx_sparkle', 0.8); await G.wait(rm ? 0.1 : 0.5);
    G.audio.sfx('sfx_starfall', 0.6);
    const POS = [[.5, .42], [.3, .3], [.7, .3], [.2, .55], [.8, .55], [.38, .66], [.62, .66], [.5, .2], [.5, .8]], si = G.STARS.indexOf(s), E = Math.round(SH * 0.5);
    const sky = G.el('div', 'c11-sky', layer); sky.style.backgroundImage = `url("${G.asset('assets/ui/sky.jpg')}")`;
    Object.assign(sky.style, { bottom: 'auto', height: (SH + E) + 'px', opacity: 0 });
    sky.style.maskImage = sky.style.webkitMaskImage = `linear-gradient(to bottom, #000 0, #000 ${SH}px, transparent ${SH + E}px)`;
    const slots = G.STARS.map((q, i) => { const e = G.el('div', 'c11-slot' + (i < si ? ' lit' : '') + (i === si ? ' me' : ''), sky, G.starSvg(q, i <= si)); Object.assign(e.style, { left: POS[i % POS.length][0] * 100 + '%', top: POS[i % POS.length][1] * SH + 'px' }); return e; });
    const big = G.el('div', 'c11-star', layer, G.starSvg(s)); big.style.zIndex = 5;
    const sx0 = bx, sy0 = by - 120 * u, sx1 = POS[si][0] * W, sy1 = POS[si][1] * SH;
    Object.assign(big.style, { left: sx0 + 'px', top: sy0 + 'px', opacity: 0 });
    await G.tween(0, 1, 0.5, k => { big.style.opacity = k; big.style.transform = `translate(-50%,-50%) scale(${0.5 + 0.5 * k})`; }, 'out');
    const pan = (k) => { const d = SH * k; wl.style.transform = `translateY(${d}px)`; sky.style.transform = `translateY(${d - SH}px)`; sky.style.opacity = Math.min(1, k * 2.5); pillar.style.translate = `0 ${d}px`; };
    const fly = (k) => { pan(k); big.style.left = (sx0 + (sx1 - sx0) * k) + 'px'; big.style.top = (sy0 + (sy1 - sy0) * k - Math.sin(k * Math.PI) * 60 * u) + 'px'; big.style.transform = `translate(-50%,-50%) scale(${1 - 0.21 * k})`; };
    if (rm) fly(1); else await G.tween(0, 1, 2.4, fly, 'io');
    big.remove(); slots[si].classList.add('lit'); G.audio.sfx('sfx_chime', 0.7);
    await G.wait(1.6);
    if (rm) pan(0); else await G.tween(1, 0, 2.0, pan, 'io');
    wl.style.transform = ''; sky.remove(); pillar.remove();
    for (const l of V.lamps) if (!l.el.classList.contains('on')) { l.el.classList.add('on'); G.audio.sfx('sfx_chime', 0.35); await G.wait(0.3); }
    const col = V.colorImg; col.style.visibility = ''; col.style.opacity = 1;
    G.fireworkShow(layer, 5);
    for (const k of ['chief', 'bau', 'harang', 'moa', 'hero']) { const sp = V.spr[k]; if (sp && !rm && sp.img.animate && sp.img.style.display !== 'none') sp.img.animate([{ transform: 'translateY(0)' }, { transform: 'translateY(-16px)' }, { transform: 'translateY(0)' }], { duration: 500, iterations: 2 }); }
    const t = G.el('div', 'cut-title c11-title', layer, s.name || '말의 별'); t.style.opacity = 0;
    await G.tween(0, 1, 0.6, k => { t.style.opacity = k; t.style.transform = `translate(-50%,-50%) scale(${0.8 + 0.2 * k})`; }, 'out');
    await G.wait(2.4);
    if (layer.animate) await layer.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 500 }).finished.catch(() => { });
    layer.remove(); G.hud.hide(false);
  }

  // ================= 말의 별-6: 엔딩 =================
  async function ending() {
    const g = G.gen, ok = () => g === G.gen, rm = G.reduced();
    if (!cleared('s3plaza')) G.st.cleared.push('s3plaza');
    G.st.place = 'plaza'; G.save.write();
    G.help.off(); G.hud.clear(); G.hud.hide(true); G.busy++;
    try {
      await G.cut.play('CH:s3_6', { key: 's3_6' }); if (!ok()) return;
      G.$('#fade').classList.add('on'); await G.wait(0.45); if (!ok()) return;
      G.scene.hide(); G.map.hide(); G.s2.sync();
      const world = G.$('#world'); world.innerHTML = '';
      const MV = G.mapView(world, {}); MV.setMood(5); MV.addMarkers();
      for (const p of G.D.places.places) MV.setMarker(p.id, 'done', true);
      await MV.ready; if (!ok()) return;
      const cam = [4990, 760], onR = () => MV.setCam(MV.cam.x, MV.cam.y, MV.cam.z); G.resizers.add(onR);
      MV.setCam(cam[0], cam[1], 1);
      G.audio.music('music_night');
      G.$('#fade').classList.remove('on');
      await play(['WD06_nar_01']); if (!ok()) return;
      // 호숫가 전체에 색
      { const z = G.D.mood.zones.find(q => q.id === 's3all'), ovl = G.el('img', 'bg', MV.imgs); ovl.src = MV.colorImg.src; ovl.width = MV.W; ovl.height = MV.H; ovl.alt = '';
        const m = `radial-gradient(ellipse ${z.r[0]}px ${z.r[1]}px at ${z.center[0]}px ${z.center[1]}px, #000 0%, #000 42%, rgba(0,0,0,.55) 72%, transparent 100%)`;
        Object.assign(ovl.style, { maskImage: m, webkitMaskImage: m, opacity: 0, transition: `opacity ${rm ? 0.3 : 2.6}s ease-out` }); ovl.getBoundingClientRect(); ovl.style.opacity = 1; G.audio.sfx('sfx_sparkle', 0.7); }
      MV.setLamps(5, true);
      await play(['WD06_nar_02']); if (!ok()) return;
      // 그림 표시가 생김 (찻집 = 찻잔, 나루터 = 호수, 하랑이네 = 그림)
      const icons = [['s3cafe', 'tea'], ['s3dock', 'lake'], ['s3harang', 'draw']].map(([id, k]) => { const p = G.D.places.places.find(q => q.id === id); const e = G.el('div', 's3-mapico', MV.fx, `<img src="${cardImg(k)}" alt="">`);
        Object.assign(e.style, { left: (p.marker[0] + 110) + 'px', top: (p.marker[1] - 30) + 'px' }); e.animate && e.animate([{ scale: .2, opacity: 0 }, { scale: 1.2, opacity: 1 }, { scale: 1 }], { duration: 700, easing: 'ease-out' }); return e; });
      G.audio.sfx('sfx_chime', 0.4);
      await play(['WD06_moa_01'], { partner: 'moa' }); if (!ok()) return;
      await play(['WD06_bau_01'], { partner: 'bau' }); if (!ok()) return;
      await play(['WD06_harang_01'], { partner: 'harang' }); if (!ok()) return;
      G.tween(0, 1, rm ? 0.3 : 2.5, k => MV.setCam(cam[0] + (3900 - cam[0]) * k, cam[1] + (1500 - cam[1]) * k, 1 - 0.25 * k), 'io');
      await play(['WD06_chief_01'], { partner: 'chief' }); if (!ok()) return;
      await play(['WD06_rumi_01']); if (!ok()) return;
      icons.forEach(e => e.remove());
      await sky(); if (!ok()) return;
      G.st.stars = Math.max(G.st.stars || 0, 3); G.st.mood = 5;
      mark('s3_end'); (G.st.s2bloom = G.st.s2bloom || []).push('s3all'); G.save.write();
      await starCard(); if (!ok()) return;
      G.resizers.delete(onR);
      G.$('#fade').classList.add('on'); await G.wait(0.45); if (!ok()) return;
      await G.map.show();
      G.$('#fade').classList.remove('on');
    } finally {
      if (g === G.gen) { G.busy = Math.max(0, G.busy - 1); G.hud.hide(false); }
    }
  }
  async function sky() {
    const g = G.gen, m = G.el('div', 'modal sky-view', G.$('#closeup'));   // 10/4: 대사 창(#dialog)보다 아래 층에 둬야 대사를 넘길 수 있음 (#overlay는 대사 창을 덮어 화면이 멈춤)
    m.style.backgroundImage = `url("${G.asset('assets/ui/sky.jpg')}")`;
    const POS = [[.5, .42], [.3, .3], [.7, .3], [.2, .55], [.8, .55], [.38, .66], [.62, .66], [.5, .2], [.5, .8]], nx = G.STARS.findIndex(s => s.id === D3().next);
    G.STARS.forEach((s, i) => { const e = G.el('div', 'c11-slot' + (i < 3 ? ' me lit' : '') + (i === nx ? ' s2-next' : ''), m, G.starSvg(s, i >= 3)); Object.assign(e.style, { left: POS[i % POS.length][0] * 100 + '%', top: POS[i % POS.length][1] * 100 + '%' }); });
    G.el('div', 'star-count sky-count', m, G.icon('icon_star') + ' 되찾은 별 3/8');
    G.audio.sfx('sfx_chime', 0.5);
    await G.dialog.play(['WD06_nar_03']);
    if (g === G.gen) { await G.wait(0.4); if (m.animate) await m.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 500 }).finished.catch(() => { }); }
    m.remove();
  }
  async function starCard() {
    const s = G.STARS.find(q => q.id === 'word'), m = G.el('div', 'modal starget', G.$('#overlay')), sh = G.el('div', 'sheet', m);
    const pic = G.el('div', 'star-pic', sh, G.starSvg(s));
    G.el('div', 'get-title', sh, s.name);
    G.el('div', 'get-desc', sh, s.job);
    G.el('div', 'star-count', sh, G.icon('icon_star') + ' 되찾은 별 3/8');
    G.audio.sfx('sfx_star', 0.9);
    pic.animate && pic.animate([{ transform: 'scale(.2) rotate(-40deg)', opacity: 0 }, { transform: 'scale(1.2)', opacity: 1, offset: .7 }, { transform: 'scale(1)' }], { duration: 900, easing: 'ease-out' });
    const row = G.el('div', 'btn-row', sh);
    const b = G.btn('pill gold dlg-next wait', '다음 ' + G.icon('icon_next'), row, null, '다음'); b.disabled = true;
    let r; const p = new Promise(x => r = x);
    (G.fast() ? Promise.resolve() : G.audio.voice('WD06_sys_01')).then(() => { b.disabled = false; b.classList.remove('wait'); b.classList.add('ready'); });
    G.onTap(b, () => { if (b.disabled) return; G.audio.sfx('sfx_tap', 0.5); G.audio.stopVoice(); r(); });
    await p; m.remove();
  }

  // ================= 교사용 챕터 바로 가기 (말의 별-1 ~ -6) =================
  // 앞 별(길의 별·소리의 별)을 모두 끝낸 상태에서 시작
  const DONE12 = {
    done: ['meet_lumi', 'plaza_intro', 'plaza_chief', 'plaza_board', 'plaza_post', 'market_intro', 'market_bom', 'market_ask', 'market_map', 'library_intro', 'library_haesol', 'library_tactile', 'library_puzzle', 'plaza_post_ask', 'letter_1', 'letter_2', 'letter_3', 'market_jig', 'libdoor_seen', 'libdoor_open', 'note_got',
      'forest_intro', 'forest_wind', 'forest_star', 'forest_daon', 'plaza2_intro', 'plaza2_board', 'plaza2_road', 'plaza2_look', 'plaza2_star', 'road_tiles',
      's2_begin', 's2_fog', 's2school_intro', 's2s_talk', 's2n_chair', 's2n_window', 's2n_bell', 's2n_locker', 's2school_noise', 's2f_chair', 's2f_window', 's2f_bell', 's2f_locker', 's2school_fix', 's2school_ask', 's2school_card',
      's2door_open', 's2hall_intro', 's2hall_duri', 's2hall_seats', 's2hall_score', 's2rest_intro', 's2rest_miru', 's2rest_box', 's2rest_deco', 's2rest_star', 's2plaza_intro', 's2plaza_concert', 's2plaza_star', 's2_end'],
    cleared: ['plaza', 'market', 'library', 'forest', 'plaza2', 's2school', 's2hall', 's2rest', 's2plaza'], items: ['note', 'map', 'tactile', 'leaf', 'piece', 'light', 'rhythm', 'score', 'piece_sound'],
    seen: ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C10', 'C11', 'C12', 'CH:intro', 'CH:plaza', 'CH:market', 'CH:library', 'CH:forest', 'CH:plaza2', 'CH:ending',
      'CH:s2_1', 'CH:s2school', 'S2A_s2school', 'CH:s2hall', 'S2A_s2hall', 'CH:s2rest', 'S2A_s2rest', 'CH:s2plaza', 'S2A_s2plaza', 'CH:s2_6'],
    visited: ['plaza', 'market', 'library', 'forest', 'plaza2', 's2school', 's2hall', 's2rest', 's2plaza'],
  };
  const STEP = [
    null,
    { done: ['s3_begin', 's3_fog'], cleared: ['s3gate'], items: ['s3letter'], seen: ['CH:s3_1'] },
    { done: ['s3cafe_intro', 's3c_talk', 's3cafe_order', 's3cafe_menu', 's3cafe_window'], cleared: ['s3cafe'], items: ['codeA'], seen: ['CH:s3cafe', 'S3A_s3cafe'], dust: ['s3cafe:0', 's3cafe:h:teapot'], place: 's3cafe' },
    { done: ['s3dock_intro', 's3dock_sign', 's3dock_phone', 's3dock_boat'], cleared: ['s3dock'], items: ['codeB'], seen: ['CH:s3dock', 'S3A_s3dock'], dust: ['s3dock:0', 's3dock:h:boat'], place: 's3dock' },
    { done: ['s3harang_intro', 's3h_meet', 's3h_diary', 's3h_ask', 's3h_star'], cleared: ['s3harang'], items: ['piece_word'], seen: ['CH:s3harang', 'S3A_s3harang'], dust: ['s3harang:0', 's3harang:h:cardbox', 'map:s3dog', 'map:s3gran'], place: 's3harang' },
    { done: ['s3plaza_intro', 's3plaza_relay', 's3plaza_star'], seen: ['CH:s3plaza', 'S3A_s3plaza'], dust: ['s3plaza:moa', 's3plaza:bau'], place: 'plaza' },
  ];
  async function chapter(id) {
    if (!G.st) return;
    const n = +id.split('_')[1], keep = { slot: G.st.slot, name: G.st.name };
    G.flow.reset();
    const st = G.st = Object.assign(G.save.fresh(keep.slot), { name: keep.name });
    st.done.push(...DONE12.done); st.cleared.push(...DONE12.cleared); st.items.push(...DONE12.items); st.seenCutscenes.push(...DONE12.seen); st.visited.push(...DONE12.visited);
    st.started = true; st.mood = 5; st.quest = 5; st.stars = 2; st.env = { board: true, guide: true }; st.place = 'plaza';
    st.dust = ['plaza:0', 'market:0', 'library:0', 'map:v2', 'map:v3']; st.s2dust = ['s2school:0', 's2school:h:locker', 's2hall:0', 's2hall:h:drum', 's2rest:0', 's2rest:cushion', 's2plaza:c0', 's2plaza:c1']; st.s2bloom = ['s2school', 's2hall', 's2rest'];
    st.s3dust = [];
    for (let i = 1; i < Math.min(n, 6); i++) {
      const s = STEP[i]; st.done.push(...(s.done || [])); st.cleared.push(...(s.cleared || [])); st.items.push(...(s.items || [])); st.seenCutscenes.push(...(s.seen || []));
      st.s3dust.push(...(s.dust || [])); if (s.place) { st.place = s.place; st.visited.push(s.place); } if (s.cleared) st.s2bloom.push(...s.cleared.filter(c => c !== 's3gate'));
    }
    if (n >= 6) { const s = STEP[5]; st.done.push(...s.done); st.seenCutscenes.push(...s.seen); st.s3dust.push(...s.dust); st.place = 'plaza'; G.save.write(); G.s2.sync(); return ending(); }
    G.save.write();
    return G.flow.resume();
  }
  (function patchFlow() {
    if (!G.flow || !G.flow.chapter) { setTimeout(patchFlow, 30); return; }
    const ch0 = G.flow.chapter;
    G.flow.chapter = (id) => /^s3_\d$/.test(id) ? chapter(id) : ch0(id);
  })();

  T.begin = begin; T.ending = ending; T.chapter = chapter; T.state = () => ({ dust: G.st && G.st.s3dust });
  T.tangle = tangle; T.orders = orders; T.strip = strip; T.rub = rub; T.sign = sign; T.decode = decode; T.pipes = pipes; T.fingers = fingers; T.diary = diary; T.twenty = twenty; T.hold = hold; T.relay = relay;   // 점검용
  return T;
})();

/* ---- teacher.js ---- */
// teacher.js — 교사용 설정 (U10, 기획안 7-10). ESC 또는 왼쪽 위 3초. 열려 있는 동안 게임은 멈춤
// 순서: 음성·음량 → 글자 크기 → 도움 시간 → 선택지 누르기 → 챕터 바로 가기 → 연출 → 저장 칸 → 가벼운 모드 → 전체 화면
'use strict';
G.teacher = (() => {
  const T = { open: false };
  let layer = null, lastFsExit = 0, wantFs = false;
  document.addEventListener('fullscreenchange', () => { if (!document.fullscreenElement) lastFsExit = performance.now(); });
  document.addEventListener('webkitfullscreenchange', () => { if (!document.webkitFullscreenElement) lastFsExit = performance.now(); });
  T.toggle = () => (T.open ? T.close() : T.show());
  T.show = () => {
    if (T.open) return;
    T.open = true; G.paused = true; G.audio.pause();
    wantFs = performance.now() - lastFsExit < 4000;   // 전체 화면에서 ESC로 빠져나왔으면 닫을 때 되돌림
    layer = G.$('#teacher'); layer.innerHTML = '';
    render();
  };
  T.close = (after) => {
    if (!T.open) return;
    T.open = false; layer.innerHTML = '';
    if (wantFs) fullscreen(true);
    G.paused = false; G.audio.resume(); G.help.poke();
    if (after) setTimeout(after, 30);
  };
  // 누르기: 게임이 멈춰 있어도 동작해야 하므로 G.onTap을 쓰지 않음
  const tb = (label, parent, fn, cls = '') => { const b = G.el('button', 't-btn ' + cls, parent, label); b.type = 'button'; b.addEventListener('click', (e) => { e.stopPropagation(); fn(b); }); return b; };
  const sec = (panel, title) => { const s = G.el('div', 't-sec', panel); G.el('h4', '', s, title); return s; };
  const row = (s) => G.el('div', 't-row', s);
  const set = (k, v) => { G.settings[k] = v; G.applySettings(); render(); };
  function choice(s, key, opts) { const r = row(s); for (const [v, label] of opts) tb(label, r, () => set(key, v), G.settings[key] === v ? 'on' : ''); return r; }

  function render() {
    const scroll = layer.querySelector('.t-panel')?.scrollTop || 0;
    layer.innerHTML = '';
    const bg = G.el('div', 'teacher', layer);
    bg.addEventListener('click', (e) => { if (e.target === bg) T.close(); });
    const p = G.el('div', 't-panel', bg);
    const h = G.el('h2', '', p, '<span>교사용 설정</span>');
    tb('닫기 (ESC)', h, () => T.close(), 'on t-close');
    G.el('div', 't-help', p, '게임은 잠시 멈춰 있어요. ' + (G.st ? `지금 칸: ${G.st.slot}번${G.st.name ? ' (' + G.save.esc(G.st.name) + ')' : ''}` : '아직 칸을 고르지 않았어요.') + ' (프로토타입 2)');

    // 빠르게 모드 (9/30 선생님 요청, 청선별GO처럼): 대화·연출·걷기를 바로 넘길 수 있게
    let s = sec(p, '빠르게 모드 (선생님 확인·시연용)');
    choice(s, 'fast', [[false, '끄기'], [true, '켜기']]);
    G.el('div', 't-note', s, '켜면 음성이 끝나기 전에도 [다음]을 누를 수 있고, 연출은 처음부터 [건너뛰기]가 보이며, 지도에서 걷기는 바로 도착해요. 선택지는 한 번 누르면 골라져요. 학생이 할 때는 꺼 주세요.');

    // 난이도 (9/30 선생님 요청): 반마다 고름
    s = sec(p, '난이도');
    choice(s, 'level', [['easy', '쉽게'], ['normal', '보통'], ['hard', '어렵게']]);
    G.el('div', 't-note', s, '쉽게: 이름표 4개, 누르면 이름을 읽어 줌, 봄이 아주머니가 바로 보임. 보통: 이름표 5개, 카드와 모양을 비교해야 함, 시장에서 봄이 아주머니 가게를 찾음, 도서관에서 촉각 지도를 찾음. 어렵게: 이름표 6개, 도움 화살표 없음.');

    s = sec(p, '1. 음성과 음량');
    let r = row(s);
    tb(G.settings.voiceOn ? '음성 켜짐' : '음성 꺼짐', r, () => set('voiceOn', !G.settings.voiceOn), G.settings.voiceOn ? 'on' : '');
    const lab = G.el('label', '', r, '음량 '); const rg = G.el('input', '', lab); rg.type = 'range'; rg.min = 0; rg.max = 100; rg.value = Math.round(G.settings.volume * 100);
    const vv = G.el('span', '', lab, rg.value + '%');
    rg.addEventListener('input', () => { G.settings.volume = rg.value / 100; vv.textContent = rg.value + '%'; G.applySettings(); });

    s = sec(p, '2. 글자 크기');
    choice(s, 'textBig', [[false, '보통'], [true, '크게']]);

    s = sec(p, '3. 도움 시간 (루미가 알려 주기까지)');
    choice(s, 'help', [['short', '짧게 20, 40, 60초'], ['normal', '보통 30, 60, 90초'], ['long', '길게 45, 90, 135초'], ['off', '끄기']]);
    G.el('div', 't-note', s, '1단계 질문, 2단계 화살표, 3단계 반짝이는 길. [루미] 버튼을 누르면 바로 3단계.');

    s = sec(p, '4. 선택지 누르기');
    choice(s, 'choiceOne', [[false, '두 번 누르면 선택 (읽어 주고 확인)'], [true, '한 번 누르면 선택']]);

    s = sec(p, '5. 챕터 바로 가기');
    r = row(s);
    for (const ch of G.D.story.chapters) {
      const b = tb(ch.label, r, () => { T.close(() => G.flow.chapter(ch.id)); });
      if (!ch.ready || !G.st) b.disabled = true;
    }
    if (G.p4) { r = row(s); const b = tb('이 퍼즐 바로 풀기', r, () => T.close(() => G.p4.skip())); if (!G.p4.can()) b.disabled = true; }   // 10/1 프로토타입 4: 지금 하는 퍼즐·자물쇠를 바로 풂
    G.el('div', 't-note', s, G.st ? '고른 곳 앞까지의 할 일, 아이템, 마을 단계가 채워진 채로 시작해요.' : '먼저 저장 칸 번호를 고른 뒤에 쓸 수 있어요.');

    s = sec(p, '6. 연출');
    r = row(s); G.el('span', '', r, '다시 보기:');
    for (const [id, label] of [['C1', 'C1 인트로'], ['C2', 'C2 광장 도착'], ['C3', 'C3 시장 도착'], ['C4', 'C4 도서관 도착'], ['C8', 'C8 점자 길 빛남'], ['C7', 'C7 장소 완료']]) tb(label, r, () => T.close(() => { if (!G.cut.active) G.cut.play(id, { replay: true }); }));
    r = row(s); G.el('span', '', r, '움직임 줄이기:');
    const rmv = G.settings.reduceMotion ? 'on' : (G.settings.reduceAuto ? 'auto' : 'off');
    for (const [v, label] of [['auto', '기기 설정 따르기'], ['on', '켜기'], ['off', '끄기']]) tb(label, r, () => { G.settings.reduceMotion = v === 'on'; G.settings.reduceAuto = v === 'auto'; G.applySettings(); render(); }, rmv === v ? 'on' : '');
    r = row(s);
    tb(G.settings.hideSkip ? '건너뛰기 버튼 숨김' : '건너뛰기 버튼 보임', r, () => set('hideSkip', !G.settings.hideSkip), G.settings.hideSkip ? 'on' : '');

    s = sec(p, '7. 저장 칸');
    G.el('div', 't-note', s, `지금 ${G.save.count()}칸 (처음 5칸, 칸이 찰 때마다 한 칸씩 늘어나요). 저장은 이 기기, 이 브라우저에만 돼요. 학교 PC가 초기화되면 5. 챕터 바로 가기로 이어 하세요.`);
    r = row(s); G.el('span', '', r, '지우기:');
    let any = false;
    for (let i = 1; i <= G.save.count(); i++) {
      const d = G.save.load(i); if (!d) continue; any = true;
      const b = tb(`${i}번${d.name ? ' ' + G.save.esc(d.name) : ''}`, r, () => confirmDel(s, i));
      if (G.st && G.st.slot === i) { b.disabled = true; b.title = '지금 쓰는 칸'; }
    }
    if (!any) G.el('span', 't-note', r, '지울 칸이 없어요.');
    else if (G.st) G.el('div', 't-note', s, '지금 쓰는 칸은 지울 수 없어요.');

    s = sec(p, '8. 가벼운 모드');
    choice(s, 'light', [[false, '끄기'], [true, '켜기 (느린 태블릿용: 빛과 반짝이 효과 줄임)']]);

    s = sec(p, '9. 화면');
    r = row(s);
    const fsOn = !!(document.fullscreenElement || document.webkitFullscreenElement);
    tb(fsOn ? '전체 화면 끄기' : '전체 화면', r, () => { wantFs = false; fsOff = fsOn; fullscreen(!fsOn).then(render); });
    G.el('div', 't-note', s, '전체 화면에서는 ESC를 한 번 더 눌러야 이 설정이 열려요 (브라우저 규칙). 아이폰은 “홈 화면에 추가”로 쓰면 전체 화면이 돼요.');
    const pn = layer.querySelector('.t-panel'); if (pn) pn.scrollTop = scroll;
  }
  function confirmDel(s, i) {
    const box = G.el('div', 't-row', s);
    box.style.cssText = 'background:#fde9e2;border-radius:14px;padding:8px 12px';
    G.el('span', '', box, `${i}번 칸을 정말 지울까요? 되돌릴 수 없어요.`);
    tb('지우기', box, () => { G.save.del(i); render(); }, 'warn');
    tb('그만두기', box, () => box.remove());
    box.scrollIntoView && box.scrollIntoView({ block: 'nearest' });
  }
  function fullscreen(on) {
    const d = document, el = d.documentElement;
    try {
      if (on) return Promise.resolve((el.requestFullscreen || el.webkitRequestFullscreen || (() => { })).call(el))
        .then(() => { try { return screen.orientation && screen.orientation.lock && screen.orientation.lock('landscape'); } catch (e) { } }).catch(() => { });
      return Promise.resolve((d.exitFullscreen || d.webkitExitFullscreen || (() => { })).call(d)).catch(() => { });
    } catch (e) { return Promise.resolve(); }
  }
  T.fs = fullscreen;
  // 10/2 선생님: 휴대폰·태블릿은 늘 전체 화면(가로). 홈 화면 앱은 처음부터 전체 화면, 브라우저로 열었거나 뒤로 가기로 빠져나왔으면 다음 누르기에서 다시 전체 화면
  // (교사 설정에서 '전체 화면 끄기'를 누르면 다시 켤 때까지 그대로 둠. 아이폰 사파리는 지원 안 함 → 홈 화면에 추가)
  let fsOff = false;
  if (matchMedia('(pointer: coarse)').matches) {
    const isFs = () => !!(document.fullscreenElement || document.webkitFullscreenElement) || matchMedia('(display-mode: fullscreen)').matches;
    document.addEventListener('pointerup', () => { if (!fsOff && !T.open && !isFs()) fullscreen(true); }, true);
  }
  // 9/30 선생님: 휴대폰·태블릿에서 ESC 대신 누르는 [선생님 설정] 버튼 (왼쪽 가장자리 가운데). icon_teacher.png가 오면 그림, 없으면 글자
  if (matchMedia('(pointer: coarse)').matches) {
    const b = G.el('button', 'tbtn', G.$('#game')); b.type = 'button'; b.setAttribute('aria-label', '선생님 설정'); b.textContent = '설정';
    const im = new Image(); im.alt = ''; im.onload = () => { b.textContent = ''; b.appendChild(im); }; im.src = G.asset('assets/ui/icons/icon_teacher.png');
    b.addEventListener('click', (e) => { e.stopPropagation(); T.toggle(); });
  }
  return T;
})();

/* ---- title.js ---- */
// title.js — 10/2 제목 화면 「별의 스펙트럼」 (선생님: 동화책이 사라락 펴지고, 그림이 슥슥 그려진 뒤, 나눔손글씨 제목이 한 획씩)
// 기획안 별이사라진마을/제목연출/제목연출_기획안_v2.0.md. main.js F.title이 G.titleBook을 부름
// 제목과 글귀: 선생님 붓글씨 그림 2장(에셋원본/선생님그림_1002_제목) → 제목연출/붓글씨/mk.py가 글씨 그림 + 써지는 순서 지도로 바꿈


// 덮인 책 → [책 펴기] → 사라락 넘김(StPageFlip, MIT) → 빈 쪽에 연필 선 → 물감 → 그림 속으로 → 제목이 한 획씩 → 길의 별, 시작하기
// 화면을 누르면 끝 모습으로. 같은 기기 두 번째부터는 짧게. 움직임 줄이기면 바로 끝 모습. 소리는 [책 펴기]를 누른 뒤부터(브라우저 규칙)
// 그림판은 1920x1080 (덮인 책 그림 1376x768을 1.395배). 책 표지 자리 x 656~1281, y 105~910 / 그림 칸 x 66~1246, y 113~900 (3:2)
G.titleBook = (ov, onStart) => {
  const gen = G.gen; let run = 0; const alive = (r) => gen === G.gen && r === run;
  const A = (p) => G.asset('assets/ui/title/' + p);
  const img = (src) => new Promise(res => { const i = new Image(); i.onload = () => res(i); i.onerror = () => res(i); i.src = src; });
  const wait = (s) => new Promise(res => setTimeout(res, s * 1000));
  let seen = false; try { seen = !!localStorage.getItem('starvillage.titleSeen2'); } catch (e) { }
  const k = seen ? 0.5 : 1;
  const t = G.el('div', 'title-screen tb', ov);
  const stage = G.el('div', 'tb-stage', t), cam = G.el('div', 'tb-cam', stage);
  const desk = G.el('img', 'tb-desk', cam); desk.src = A('desk_book.jpg'); desk.alt = '';
  const bookEl = G.el('div', 'tb-book', cam);
  const pages = [];
  // 책장 넘김 도구가 쪽의 style을 통째로 바꾸므로 그림은 안쪽 칸에 둠
  const page = (bg, hard) => { const p = G.el('div', 'tb-page', bookEl); G.el('div', 'tb-pimg', p).style.backgroundImage = `url("${A(bg)}")`; if (hard) p.dataset.density = 'hard'; pages.push(p); };
  page('cover.jpg', true); for (let i = 0; i < 6; i++) page('paper.jpg'); page('back.jpg', true);
  { const ct = G.el('div', 'tb-ctitle', pages[0]), m = `url("${A('title_brush.png')}")`; ct.style.webkitMaskImage = m; ct.style.maskImage = m; }   // 10/4: 표지에 게임 이름 (붓글씨 그림을 금색으로)
  const draw = G.el('div', 'tb-draw', cam);
  const co = G.el('canvas', '', draw), sk = G.el('canvas', '', draw); G.el('div', 'tb-gutter', draw);
  const CW = 1180, CH = 787; [co, sk].forEach(c => { c.width = CW; c.height = CH; });
  const full = G.el('img', 'tb-full', stage); full.src = A('illust.jpg'); full.alt = '';
  const shade = G.el('div', 'tb-shade', stage); // 10/2 선생님: 제목이 잘 보이게 제목 뒤 하늘을 살짝 어둡게
  // 제목·글귀 (10/2 선생님 붓글씨 그림, 단색·테두리 없음): 순서 지도 값이 작은 곳부터 붓이 지나가듯 드러남
  const brush = (cls, name, x, y, w, h) => { const cv = G.el('canvas', 'tb-brush ' + cls, stage); cv.width = w; cv.height = h;
    Object.assign(cv.style, { left: x + 'px', top: y + 'px', width: w + 'px', height: h + 'px' }); return { cv, y, src: [A(name + '.png'), A(name + '_order.png')] }; };
  const T1 = brush('tb-t1', 'title_brush', 400, 70, 1120, 304), T2 = brush('tb-t2', 'motto_brush', 680, 411, 560, 58);   // 10/4 선생님: 부제목 20% 작게 (가운데는 그대로)
  const prep = async (b) => { if (b.o) return b;
    const [ink, ord] = await Promise.all(b.src.map(img)); const w = b.cv.width, h = b.cv.height, c = b.cv.getContext('2d');
    b.c = c; b.ink = ink;
    try { c.drawImage(ink, 0, 0, w, h); b.full = c.getImageData(0, 0, w, h); } catch (e) { b.o = 1; c.clearRect(0, 0, w, h); return b; } // 그림을 읽을 수 없으면 왼쪽부터 쓸어 보이기
    c.clearRect(0, 0, w, h);
    const tc = document.createElement('canvas'); tc.width = w; tc.height = h; const x = tc.getContext('2d'); x.drawImage(ord, 0, 0, w, h);
    // 순서 지도: 빨강·초록 두 칸으로 16비트. 글씨가 있는 칸만 모아 두고 그 칸만 다시 그림
    const od = x.getImageData(0, 0, w, h).data, idx = [], ov = [];
    for (let i = 0; i < w * h; i++) { const v = od[i * 4] * 256 + od[i * 4 + 1]; if (v) { idx.push(i); ov.push(v); } }
    b.idx = Uint32Array.from(idx); b.o = Uint16Array.from(ov);
    b.out = c.createImageData(w, h); return b; };
  const reveal = (b, T) => { if (!b.full) { const w = b.cv.width, h = b.cv.height; b.c.clearRect(0, 0, w, h); b.c.save(); b.c.beginPath(); b.c.rect(0, 0, w * Math.min(1, T), h); b.c.clip(); b.c.drawImage(b.ink, 0, 0, w, h); b.c.restore(); return; }
    // 붓끝 부근은 넓게(전체의 약 4%) 서서히 짙어짐
    const f = b.full.data, d = b.out.data, o = b.o, ix = b.idx, t = T * 65535, SW = 2600;
    for (let n = 0; n < o.length; n++) { let q = (t - o[n]) / SW + 1; q = q < 0 ? 0 : q > 1 ? 1 : q * q * (3 - 2 * q); const j = ix[n] * 4;
      d[j] = f[j]; d[j + 1] = f[j + 1]; d[j + 2] = f[j + 2]; d[j + 3] = f[j + 3] * q; }
    b.c.putImageData(b.out, 0, 0); };
  const showAll = (b) => prep(b).then(() => b.full ? b.c.putImageData(b.full, 0, 0) : reveal(b, 1));
  const openB = G.btn('pill gold tb-open', G.icon('icon_star') + ' 책 펴기', t, () => open(), '책 펴기');
  const startB = G.btn('pill gold t-start', G.icon('icon_star') + ' 시작하기', t, () => { if (t.classList.contains('done')) onStart(); }, '시작하기');
  startB.style.setProperty('--paper', `url("${A('paper.jpg')}")`);   // 10/4 선생님: 시작하기 단추를 연한 버터색 종이로
  if (G.isTouch) G.el('div', 't-note', t, '소리가 안 들리면 옆의 무음 스위치를 확인해 주세요.');
  // 10/4 선생님: 첫 화면 오른쪽 아래 글자(판 날짜, 선생님 설정 안내)는 없앰
  const fit = () => { if (!stage.isConnected) return; const { W, H } = G.stage, s = Math.max(W / 1920, H / 1080); stage.style.transform = `translate(-50%, -50%) scale(${s})`;
    const c = Math.max(0, (1080 - H / s) / 2); T1.cv.style.top = (T1.y + c) + 'px'; T2.cv.style.top = (T2.y + c) + 'px'; shade.style.top = c + 'px'; }; // 휴대폰처럼 위아래가 잘리면 제목을 내림
  fit(); if (!G._tbFit) { G._tbFit = 1; G.resizers.add(() => { const f = G.$('.tb-stage'); if (f && f._fit) f._fit(); }); } stage._fit = fit;
  // 책 (표지 크기 625x805, 표지만 오른쪽에 놓인 덮인 책)
  let pf = null;
  try { pf = new St.PageFlip(bookEl, { width: 625, height: 805, size: 'fixed', showCover: true, usePortrait: false, autoSize: false, drawShadow: true, maxShadowOpacity: 0.45, flippingTime: Math.round(1000 * k), useMouseEvents: false, showPageCorners: false, mobileScrollSupport: false }); pf.loadFromHTML(pages); } catch (e) { console.error(e); pf = null; }
  setTimeout(() => { try { openB.focus({ preventScroll: true }); } catch (e) { } }, 100);
  const ready = Promise.all([img(A('sketch.png')), img(A('illust.jpg'))]);

  // 끝 모습: 그림이 화면 가득, 제목, 길의 별, 시작하기
  const finish = () => {
    run++; t.classList.add('open', 'zoomed', 'done'); full.style.opacity = 1; shade.style.opacity = 1; cam.style.visibility = 'hidden';
    showAll(T1); showAll(T2);
    G.audio.music('music_title');
    try { localStorage.setItem('starvillage.titleSeen2', '1'); } catch (e) { }
    setTimeout(() => { try { startB.focus({ preventScroll: true }); } catch (e) { } }, 50);
  };
  t.addEventListener('pointerdown', (e) => { if (seen && t.classList.contains('open') && !t.classList.contains('done') && !e.target.closest('.t-start')) finish(); });

  // 연필 선: 굵은 붓질이 왼쪽 위부터 지그재그로 지나간 자리만 선이 드러남
  const sketchIn = async (r, sketch, dur) => {
    const m = document.createElement('canvas'); m.width = CW; m.height = CH; const mc = m.getContext('2d'), c = sk.getContext('2d');
    const S = [];
    for (let y = -20, row = 0; y < CH + 60; y += 74, row++) for (let x = -40; x < CW; x += 210) {
      const a = { x: x + Math.random() * 40, y: y + Math.random() * 30 }, b = { x: x + 260 + Math.random() * 60, y: y + (Math.random() - 0.5) * 60 };
      S.push({ a, b, c: { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 + (Math.random() - 0.5) * 80 }, o: x * 0.6 + y + Math.random() * 120 });
    }
    S.sort((p, q) => p.o - q.o);
    mc.lineCap = 'round'; mc.strokeStyle = '#000'; mc.shadowColor = '#000'; mc.shadowBlur = 24; mc.lineWidth = 120;
    const pt = (s, u) => ({ x: (1 - u) * (1 - u) * s.a.x + 2 * (1 - u) * u * s.c.x + u * u * s.b.x, y: (1 - u) * (1 - u) * s.a.y + 2 * (1 - u) * u * s.c.y + u * u * s.b.y });
    const per = dur / (S.length * 0.55 + 4), done = S.map(() => 0), t0 = performance.now();
    await new Promise(res => { const step = () => {
      if (!alive(r)) return res();
      const el = (performance.now() - t0) / 1000;
      S.forEach((s, i) => { const u = Math.max(0, Math.min(1, (el - i * per * 0.55) / (per * 4))); if (u <= done[i]) return;
        mc.beginPath(); const p0 = pt(s, done[i]); mc.moveTo(p0.x, p0.y); for (let v = done[i]; v <= u; v += 0.08) { const p = pt(s, Math.min(v, u)); mc.lineTo(p.x, p.y); } const p1 = pt(s, u); mc.lineTo(p1.x, p1.y); mc.stroke(); done[i] = u; });
      c.globalCompositeOperation = 'source-over'; c.clearRect(0, 0, CW, CH); c.drawImage(sketch, 0, 0, CW, CH); c.globalCompositeOperation = 'destination-in'; c.drawImage(m, 0, 0); c.globalCompositeOperation = 'source-over';
      if (el < dur) requestAnimationFrame(step); else { c.clearRect(0, 0, CW, CH); c.drawImage(sketch, 0, 0, CW, CH); res(); }
    }; requestAnimationFrame(step); });
  };
  // 물감: 여기저기서 둥근 물감 번짐이 커지며 색이 참
  const colorIn = async (r, pic, dur) => {
    const m = document.createElement('canvas'); m.width = CW; m.height = CH; const mc = m.getContext('2d'), c = co.getContext('2d');
    const B = []; for (let gy = 0; gy < 4; gy++) for (let gx = 0; gx < 6; gx++) B.push({ x: (gx + 0.5) * CW / 6 + (Math.random() - 0.5) * 120, y: (gy + 0.5) * CH / 4 + (Math.random() - 0.5) * 100, R: 280 + Math.random() * 120, o: Math.random() });
    B.sort((p, q) => p.o - q.o);
    const grow = dur * 0.45, gap = (dur - grow) / B.length, t0 = performance.now();
    await new Promise(res => { const step = () => {
      if (!alive(r)) return res();
      const el = (performance.now() - t0) / 1000;
      mc.clearRect(0, 0, CW, CH);
      B.forEach((b, i) => { let u = (el - i * gap) / grow; if (u <= 0) return; u = Math.min(1, u); u = 1 - (1 - u) * (1 - u); const R = b.R * u;
        const gr = mc.createRadialGradient(b.x, b.y, R * 0.35, b.x, b.y, R); gr.addColorStop(0, 'rgba(0,0,0,1)'); gr.addColorStop(1, 'rgba(0,0,0,0)'); mc.fillStyle = gr; mc.beginPath(); mc.arc(b.x, b.y, R, 0, 7); mc.fill(); });
      c.globalCompositeOperation = 'source-over'; c.clearRect(0, 0, CW, CH); c.drawImage(pic, 0, 0, CW, CH); c.globalCompositeOperation = 'destination-in'; c.drawImage(m, 0, 0); c.globalCompositeOperation = 'source-over';
      if (el < dur) requestAnimationFrame(step); else { c.clearRect(0, 0, CW, CH); c.drawImage(pic, 0, 0, CW, CH); res(); }
    }; requestAnimationFrame(step); });
  };
  // 붓글씨 쓰기: dur초 동안 순서 지도를 따라 드러남
  const writeBrush = async (r, b, dur) => {
    await prep(b); if (!alive(r)) return; const t0 = performance.now();
    await new Promise(res => { const step = () => {
      if (!alive(r)) return res();
      const u = Math.min(1, (performance.now() - t0) / 1000 / (dur * k)); reveal(b, (u < .5 ? 2 * u * u : 1 - 2 * (1 - u) * (1 - u)) * 1.05);
      if (u < 1) requestAnimationFrame(step); else res();
    }; requestAnimationFrame(step); });
  };

  const open = async () => {
    if (t.classList.contains('open')) return;
    if (matchMedia('(pointer: coarse)').matches) G.teacher.fs(true);
    G.audio.unlock(); t.classList.add('open');
    const r = run;
    if (G.reduced() || !pf) return finish();
    const [sketch, pic] = await ready; if (!alive(r)) return;
    const flips = seen ? 1 : 3;
    // 10/2 선생님: 펼친 책이 왼쪽으로 쏠려 보여서, 표지가 넘어가는 동안 책을 화면 가운데로 옮김 (책상 그림은 왼쪽으로 320px 늘림)
    cam.style.transitionDuration = (1.2 * k) + 's'; cam.style.transform = 'translateX(304px)';
    for (let i = 0; i < flips; i++) { G.audio.sfx('sfx_page', 0.7, 1 + i * 0.08); pf.flipNext('top'); await wait((i === 0 ? 1.0 : 0.62) * k + 0.08); if (!alive(r)) return; if (i === 0) pf.getSettings().flippingTime = Math.round(650 * k); }
    t.classList.add('drawing'); G.audio.sfx('sfx_pencil', 0.35);
    await sketchIn(r, sketch, 3.2 * k); if (!alive(r)) return;
    await colorIn(r, pic, 2.8 * k); if (!alive(r)) return;
    sk.style.opacity = 0;
    G.audio.music('music_title');
    // 그림 칸이 화면을 가득 채우도록 카메라가 들어감 (배율 1920/1180)
    cam.style.transitionDuration = (1.8 * k) + 's'; t.classList.add('zoomed'); cam.style.transform = 'translate(-107.4px, -285px) scale(1.6271)';
    await wait(1.8 * k + 0.05); if (!alive(r)) return;
    full.style.opacity = 1; shade.style.opacity = 1; await wait(0.4); if (!alive(r)) return; cam.style.visibility = 'hidden';
    G.audio.sfx('sfx_chime', 0.3);
    await writeBrush(r, T1, 3.0); if (!alive(r)) return;
    G.audio.voice('S92_title');
    await writeBrush(r, T2, 1.6); if (!alive(r)) return;
    await wait(0.6); if (!alive(r)) return;
    finish();
  };
};

/* ---- bgfill.js ---- */
// bgfill.js — 10/2 선생님: 배경이 단색으로 비어 있던 화면에 어울리는 그림을 흐릿하게 깖
// 그림은 assets/ui/bg/<이름>.jpg (미리 흐리게 만든 작은 그림). 여기서는 CSS 변수 --bg-<이름>만 정하고, 어디에 깔지는 style.css 맨 끝
'use strict';
(() => {
  const r = document.documentElement.style;
  for (const k of ['mode', 'slots', 'library', 'plaza', 'market', 'forest', 's2hall', 's2rest'])
    r.setProperty('--bg-' + k, `url("${G.asset('assets/ui/bg/' + k + '.jpg')}")`);
})();

/* ---- main.js ---- */
// main.js — 시작과 흐름: 타이틀(U1) → 저장 칸 번호 고르기(U2) → 이름 → 인트로 C1 → 루미 만남 → 마을 지도
'use strict';
G.VERSION = '별의 스펙트럼 (2026-10-05)';   // 10/4: 날짜는 build.py가 만든 날로 바꿈
G.defaults = { volume: 0.9, voiceOn: true, textBig: false, help: 'normal', choiceOne: false, reduceMotion: false, reduceAuto: true, hideSkip: false, fast: false, level: 'normal', slotCount: 12, light: false };
G.applySettings = () => {
  const s = G.settings;
  document.documentElement.style.setProperty('--ts', s.textBig ? 1.2 : 1);
  G.$('#game').classList.toggle('reduce', !!G.reduced());
  G.$('#game').classList.toggle('light', !!s.light);
  G.store.set('settings', s);
  G.audio.setVolume();
};

G.flow = (() => {
  const F = {};
  // 다른 흐름으로 건너갈 때 (챕터 바로 가기) 지금 진행 중인 대화·연출·이동을 모두 멈춤
  F.reset = () => {
    G.gen = (G.gen || 0) + 1;
    G.dialog.close(); if (G.cut.active) G.cut.active.skip();
    G.$('#overlay').innerHTML = ''; G.$('#closeup').innerHTML = ''; G.$('#dialog').innerHTML = '';
    G.map.hide(); G.scene.hide(); G.$('#world').innerHTML = '';
    G.hud.clear(); G.hud.hide(false); G.help.off(); G.audio.stopVoice();
    G.busy = 0; G.map.camFree = false; G.map.lumiFree = false; if (G.p4) G.p4.reset();
    G.$('#fade').classList.remove('on');
  };

  // ---- U1 타이틀 ----
  // 10/2 새 제목 「별의 스펙트럼」: 동화책이 펴지고 그림이 그려진 뒤 제목이 써짐 (title.js G.titleBook)
  F.title = () => {
    F.reset(); G.screen = 'title'; G.st = null;
    G.titleBook(G.$('#overlay'), () => F.start());
  };

  // 시작하기 = 소리 켜기 (브라우저 규칙상 첫 누르기에서만 소리를 켤 수 있음)
  F.start = async () => {
    if (matchMedia('(pointer: coarse)').matches) G.teacher.fs(true);   // 9/30 선생님: 휴대폰에서는 처음 누를 때 전체 화면 (아이폰 사파리는 지원 안 함 → 홈 화면에 추가)
    G.audio.unlock(); G.audio.sfx('sfx_tap', 0.6); G.audio.music('music_title');
    const g = G.gen;
    await G.audio.voice('S92_btn_start');
    if (g !== G.gen) return;
    const pick = await G.save.screen();
    if (g !== G.gen) return;
    G.onResize = null;
    let st = pick.data;
    if (!st) {
      const name = await G.save.askName();
      if (g !== G.gen) return;
      st = G.save.fresh(pick.slot); st.name = name;
    }
    G.st = st; G.save.write();
    try { sessionStorage.setItem('bs_play', String(st.slot)); } catch (_) { }   // 10/4: 놀던 중 화면이 새로 켜지면 처음 화면 대신 바로 이어 하기
    G.$('#overlay').innerHTML = '';
    if (!st.done.includes('meet_lumi')) F.intro();
    else F.resume();
  };
  // 10/4 선생님: 놀다가 처음 화면으로 돌아가는 일 → 휴대폰이 메모리가 모자라 탭을 다시 켜거나 새 판이 깔릴 때 페이지가 새로 켜짐.
  // 같은 탭에서 놀던 중이었다면 제목 연출 없이 [이어서 하기] 한 번만 누르면(소리를 켜려면 한 번 눌러야 함) 하던 곳으로 돌아감
  F.quick = () => {
    let slot = null; try { slot = sessionStorage.getItem('bs_play'); } catch (_) { }
    const st = slot && G.save.load(+slot);
    if (!st || !st.done || !st.done.includes('meet_lumi')) return false;
    F.reset(); G.screen = 'title'; G.st = null;
    const ov = G.$('#overlay'), box = G.el('div', 'quick-resume', ov);
    G.el('div', 'qr-msg', box, `${st.slot}번${st.name ? ' ' + String(st.name).replace(/[<>&"]/g, '') : ''} 하던 곳에서 이어서 해요`);
    G.btn('pill gold qr-go', G.icon('icon_star') + ' 이어서 하기', box, () => {
      if (matchMedia('(pointer: coarse)').matches) G.teacher.fs(true);
      G.audio.unlock(); G.audio.sfx('sfx_tap', 0.6);
      G.st = st; ov.innerHTML = ''; F.resume();
    }, '이어서 하기');
    G.btn('pill qr-title', '처음 화면', box, () => { try { sessionStorage.removeItem('bs_play'); } catch (_) { } F.title(); }, '처음 화면');
    return true;
  };
  // 쓰던 칸: 마지막으로 간 곳의 마을 지도
  F.resume = async () => {
    G.$('#fade').classList.add('on'); await G.wait(0.3);
    await G.map.show();
    G.$('#fade').classList.remove('on');
  };

  // ---- 새 칸: C1 → 집 앞 지도에서 루미 만남 → [좋아!] → 광장이 반짝 ----
  F.intro = async () => {
    const g = G.gen, S = G.D.story;
    G.audio.music('music_night'); G.audio.ambient([]);
    await G.cut.play('PARCH');   // 10/1 선생님: 양피지 안으로 들어가며 제 1장 그림이 나옴
    if (g !== G.gen) return;
    await G.cut.play('CH:intro', { key: 'intro', cover: !!G.art('parchment_open') });   // 9/30 장 제목 "제 1 장 별이 사라진 밤"
    if (g !== G.gen) return;
    await G.cut.play('C1');
    if (g !== G.gen) return;
    G.st.place = 'home';
    await G.map.show({ noLumi: true });
    if (g !== G.gen) return;
    G.busy++;
    await G.wait(0.4);
    await G.map.lumiArrive();
    if (g !== G.gen) return;
    await G.dialog.play(S.meet_lumi, { keep: true });
    if (g !== G.gen) return;
    const L = G.D.dialogues[S.accept.button];
    await G.dialog.choose([{ label: L.text, icon: 'icon_good', voice: S.accept.button }], true);
    if (g !== G.gen) return;
    G.dialog.onLine = (id) => {
      if (id === S.after_accept[S.after_accept.length - 1] && !G.st.done.includes('meet_lumi')) {
        G.st.done.push('meet_lumi'); G.st.started = true; G.map.refresh(); G.audio.sfx('sfx_sparkle', 0.6);
      }
    };
    await G.dialog.play(S.after_accept);
    G.dialog.onLine = null;
    if (g !== G.gen) return;
    if (!G.st.done.includes('meet_lumi')) G.st.done.push('meet_lumi');
    G.st.started = true; G.save.write();
    G.busy = Math.max(0, G.busy - 1);
    G.hud.map(); G.map.setHelp();
  };

  // ---- 챕터 바로 가기 (교사용): 그 앞까지 모두 채운 상태로 ----
  F.chapter = async (id) => {
    if (!G.st) return;
    const keep = { slot: G.st.slot, name: G.st.name };
    F.reset();
    const st = G.st = Object.assign(G.save.fresh(keep.slot), { name: keep.name });
    G.audio.music('music_night');
    if (id === 'start') { G.save.write(); return F.intro(); }
    st.done.push('meet_lumi'); st.started = true; st.seenCutscenes.push('C1');
    if (id === 'plaza') { st.place = 'plaza'; G.save.write(); G.$('#fade').classList.add('on'); await G.wait(0.3); return G.scene.enter('plaza'); }
    if (id === 'market') {
      st.done.push('plaza_intro', 'plaza_chief', 'plaza_board', 'plaza_post', 'plaza_post_ask', 'letter_1', 'letter_2', 'letter_3'); st.cleared.push('plaza');
      if (!G.lv('normal')) { st.done.push('note_got'); st.items.push('note'); }   // 10/1: 쉽게는 첫 광장에서 점자 쪽지를 받음
      st.seenCutscenes.push('C2', 'C7'); st.visited.push('plaza'); st.mood = 1; st.quest = 1; st.place = 'plaza';
      st.seen.push('plaza:chief', 'plaza:board', 'plaza:post');
      G.save.write(); return F.resume();
    }
    if (id === 'library') {   // 시장까지 끝, 마을 지도를 가진 채로 도서관 앞 (프로토타입 2)
      st.done.push('plaza_intro', 'plaza_chief', 'plaza_board', 'plaza_post', 'market_intro', 'market_bom', 'market_ask', 'market_map', 'plaza_post_ask', 'letter_1', 'letter_2', 'letter_3', 'market_jig');
      st.cleared.push('plaza', 'market'); if (!G.lv('normal')) { st.done.push('note_got'); st.items.push('note'); } st.items.push('map');
      st.seenCutscenes.push('C2', 'C3', 'C7'); st.visited.push('plaza', 'market'); st.mood = 2; st.quest = 1; st.place = 'market';
      st.seen.push('plaza:chief', 'plaza:board', 'plaza:post', 'market:bom');
      G.save.write(); return F.resume();
    }
    // 9/30 프로토타입 3: 숲 앞(도서관까지 끝) / 두 번째 광장 앞(숲까지 끝) / 엔딩(별을 올린 뒤)
    const lib = () => {
      st.done.push('plaza_intro', 'plaza_chief', 'plaza_board', 'plaza_post', 'market_intro', 'market_bom', 'market_ask', 'market_map', 'library_intro', 'library_haesol', 'library_tactile', 'library_puzzle', 'plaza_post_ask', 'letter_1', 'letter_2', 'letter_3', 'market_jig', 'libdoor_seen', 'libdoor_open', 'note_got');
      st.cleared.push('plaza', 'market', 'library'); st.items.push('note', 'map', 'tactile');
      st.seenCutscenes.push('C2', 'C3', 'C4', 'C7', 'C8'); st.visited.push('plaza', 'market', 'library'); st.mood = 3; st.quest = 3; st.place = 'library';
      st.seen.push('plaza:chief', 'plaza:board', 'plaza:post', 'market:bom', 'library:haesol', 'library:tactile');
    };
    const forest = () => {
      lib(); st.done.push('forest_intro', 'forest_wind', 'forest_star', 'forest_daon'); st.cleared.push('forest'); st.items.push('leaf', 'piece');
      st.seenCutscenes.push('C5'); if ((st.dust || []).length < 5) st.dust = ['plaza:0', 'market:0', 'library:0', 'map:v2', 'map:v3']; st.visited.push('forest'); st.mood = 4; st.quest = 4; st.place = 'forest'; st.seen.push('forest:bushB', 'forest:shine', 'forest:daon');
    };
    if (id === 'forest') { lib(); G.save.write(); return F.resume(); }
    if (id === 'plaza2') { forest(); G.save.write(); return F.resume(); }
    if (id === 'ending') {
      forest(); st.done.push('plaza2_intro', 'plaza2_board', 'plaza2_road', 'plaza2_look', 'plaza2_star'); st.items.push('light'); st.env = { board: true, guide: true };
      st.seenCutscenes.push('C6', 'C10', 'C11'); st.visited.push('plaza2'); st.stars = 1; st.quest = 5; G.save.write();
      return G.flows.ending();
    }
  };
  return F;
})();

// ---- 처음 켜기 ----
(function boot() {
  G.settings = Object.assign({}, G.defaults, G.store.get('settings', {}));
  G.hud.init();
  G.applySettings();
  G.layout();
  window.addEventListener('resize', G.layout);
  if (window.visualViewport) visualViewport.addEventListener('resize', G.layout);
  window.addEventListener('orientationchange', () => setTimeout(G.layout, 300));
  for (const t of [100, 500, 1500]) setTimeout(G.layout, t);   // 10/3: 아이폰 홈 화면 앱은 켠 직후 화면 크기가 늦게 맞춰짐 → 몇 번 더 맞춤
  // 다른 탭으로 가면 소리를 멈춤
  document.addEventListener('visibilitychange', () => { if (document.hidden) G.audio.pause(); else if (!G.paused) G.audio.resume(); });
  const ld = G.$('#loading'); if (ld) ld.remove();
  if (!G.flow.quick()) G.flow.title();
})();
