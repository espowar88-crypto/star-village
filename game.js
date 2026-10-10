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
  // 10/8 검토: 버튼이 아닌 누를 곳(지도 장소, 장면 속 물건)도 Tab으로 고르고 Enter/Space로 누름 (전자칠판 리모컨·키보드)
  if (!/^(BUTTON|A|INPUT|SELECT)$/.test(elm.tagName)) {
    if (!elm.hasAttribute('tabindex')) elm.tabIndex = 0;
    elm.addEventListener('keydown', (ev) => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); ev.stopPropagation(); elm.click(); } });
  }
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
// 10/6 선생님: 별을 올릴 때 그냥 올라가지 않고, 별가루를 연료처럼 아래로 뿜으며 반짝이는 별 잔상을 남기고 올라감 (인트로·모든 별 받침대 같은 효과)
// 쓰는 법: const tr = G.riseTrail(부모, 별 요소, 별 색, 가볍게?) → 날아가는 동안 tr(k, x, y, 크기) / 화면이 따라 올라가면 tr.shift(내려간 거리) / 끝나면 tr.end()
G.riseTrail = (parent, starEl, col = '#FFD66B', light = false) => {
  // 10/6 선생님 보충: 화려할수록 좋음 → 떠날 때 빛 고리와 반짝이 터짐, 올라가는 동안 빛 번짐·별 잔상·별가루(별 색+금색+흰색), 닿을 때 한 번 더 터짐
  // 휴대폰 끊김 대책: 움직임은 모두 el.animate의 transform·opacity만 (filter 애니메이션 없음)
  const L = G.el('div', 'rtrail', parent); let lastG = -1, lastS = -1, lastP = -1, off = 0, fired = false, px = 0, py = 0, ps = 0;
  const COL = [col, '#FFD66B', '#FFFDF2', col];
  const fade = (el, kf, ms, ease = 'linear') => { const an = el.animate && el.animate(kf, { duration: ms, easing: ease, fill: 'forwards' }); if (an) an.finished.then(() => el.remove(), () => el.remove()); else setTimeout(() => el.remove(), ms); };
  const put = (el, x, y, r) => Object.assign(el.style, { left: x + 'px', top: (y - off) + 'px', width: r + 'px', height: r + 'px', margin: (-r / 2) + 'px 0 0 ' + (-r / 2) + 'px' });
  const spark = (x, y, r, c) => { const e = G.el('div', 'rtrail-s', L, G.sparkle('#FFFDF2', c, 5)); e.style.setProperty('--c', c); put(e, x, y, r); return e; };
  // 빛 고리 + 사방으로 튀는 반짝이
  const burst = (x, y, sz, n) => {
    if (G.reduced()) return;
    const ring = G.el('div', 'rtrail-ring', L); ring.style.setProperty('--c', col); put(ring, x, y, sz * 1.2);
    fade(ring, [{ opacity: .95, transform: 'scale(.3)' }, { opacity: 0, transform: 'scale(2.6)' }], 900, 'ease-out');
    for (let i = 0; i < n; i++) {
      const c = COL[i % COL.length], r = sz * (0.16 + Math.random() * 0.18), e = spark(x, y, r, c);
      const an = (i / n) * Math.PI * 2 + Math.random() * 0.3, d = sz * (0.9 + Math.random() * 0.9), dx = Math.cos(an) * d, dy = Math.sin(an) * d * 0.8;
      fade(e, [{ opacity: 1, transform: 'translate(0,0) scale(.4) rotate(0deg)' }, { opacity: 1, transform: `translate(${dx * .7}px,${dy * .7}px) scale(1.2) rotate(90deg)`, offset: .4 }, { opacity: 0, transform: `translate(${dx}px,${dy + sz * .4}px) scale(.5) rotate(180deg)` }], 900 + Math.random() * 600, 'ease-out');
    }
  };
  const step = (k, x, y, sz, fx = 1) => {   // fx: 별이 작게 보일 때 별가루를 더 크게
    if (G.reduced() || k >= 0.97) return;
    px = x; py = y; ps = sz * fx;
    if (!fired) { fired = true; burst(x, y, sz * fx, light ? 8 : 18); }
    // 빛 번짐: 별 둘레에 별 색 빛이 퍼졌다 사라짐
    if (!light && k - lastP > 0.03) { lastP = k; const g = G.el('div', 'rtrail-glow', L); g.style.setProperty('--c', col); put(g, x, y, sz * 1.1 * fx); fade(g, [{ opacity: .55, transform: 'scale(.7)' }, { opacity: 0, transform: 'scale(1.5)' }], 800); }
    // 별 잔상: 지나간 자리에 같은 별이 옅게 남았다가 사라짐
    if (!light && k - lastG > 0.035 && k < 0.92) { lastG = k; const g = G.el('div', 'rtrail-g', L, starEl.innerHTML); put(g, x, y, sz); fade(g, [{ opacity: 0.6, transform: 'scale(1)' }, { opacity: 0, transform: 'scale(.75)' }], 700); }
    // 별가루 연료: 별 아래로 반짝이와 빛 알갱이가 뿜어져 나와 반짝이며 천천히 떨어져 사라짐
    if (k - lastS > (light ? 0.05 : 0.012)) {
      lastS = k;
      for (let n = 0; n < (light ? 1 : 4); n++) {
        const tw = n < 2, c = COL[(Math.random() * COL.length) | 0], r = (tw ? sz * (0.12 + Math.random() * 0.2) : sz * (0.05 + Math.random() * 0.06)) * fx;
        const e = tw ? spark(0, 0, r, c) : G.el('div', 'rtrail-d', L); if (!tw) e.style.setProperty('--c', c);
        put(e, x + (Math.random() - 0.5) * sz * 0.6, y + sz * (0.15 + Math.random() * 0.3), r);
        const dx = (Math.random() - 0.5) * sz * 0.9 * fx, dy = sz * (0.5 + Math.random() * 0.9) * fx, life = (light ? 900 : 1400) + Math.random() * 1000, rot = tw ? (Math.random() < .5 ? -1 : 1) * 120 : 0;
        fade(e, [{ opacity: 1, transform: 'translate(0,0) scale(1.2) rotate(0deg)' }, { opacity: .55, transform: `translate(${dx * .3}px,${dy * .25}px) scale(.8) rotate(${rot * .3}deg)`, offset: .25 }, { opacity: 1, transform: `translate(${dx * .55}px,${dy * .5}px) scale(1) rotate(${rot * .55}deg)`, offset: .5 }, { opacity: .4, transform: `translate(${dx * .8}px,${dy * .78}px) scale(.6) rotate(${rot * .8}deg)`, offset: .78 }, { opacity: 0, transform: `translate(${dx}px,${dy}px) scale(.35) rotate(${rot}deg)` }], life);
      }
    }
  };
  step.shift = (d) => { off = d; L.style.translate = `0 ${d}px`; };
  step.reset = () => { lastG = lastS = lastP = -1; };   // 10/9: 오래 이어지는 잔상(첫 만남 루미)은 k를 0부터 다시
  step.end = () => { if (fired) burst(px, py, ps, light ? 8 : 16); setTimeout(() => L.remove(), 2600); };
  return step;
};
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
  let master, gVoice, gSfx, gAmb, gMusic, musicEl = null, musicName = '', musicNode = null, ambs = {}, hold = null, lvl = 1, ducked = false;   // hold·lvl: 10/6 음악회 음악을 말의 별 전까지 이어 틂
  const VOL = { voice: 1.0, sfx: 0.6, amb: 0.3, music: 0.35, duck: 0.2 };
  const S = () => G.settings || { volume: 0.9, voiceOn: true };

  // 시작하기 버튼(첫 누르기) 안에서 불러야 아이폰·안드로이드에서 소리가 남
  A.unlock = () => {
    if (A.ready) { if (A.ctx.state !== 'running' && !G.paused) A.ctx.resume(); return; }
    try {
      makeCtx(); A.ready = true; A.setVolume();
    } catch (e) { console.warn('소리 준비 실패', e); }
    // 브라우저 음성(TTS)도 첫 누르기에서 깨워 둠
    try { if (window.speechSynthesis) { const u = new SpeechSynthesisUtterance(' '); u.volume = 0; speechSynthesis.speak(u); } } catch (e) { }
  };
  function makeCtx() {
      const AC = window.AudioContext || window.webkitAudioContext;
      A.ctx = new AC(); master = A.ctx.createGain(); master.connect(A.ctx.destination);
      gVoice = A.ctx.createGain(); gSfx = A.ctx.createGain(); gAmb = A.ctx.createGain(); gMusic = A.ctx.createGain();
      for (const g of [gVoice, gSfx, gAmb, gMusic]) g.connect(master);
      gVoice.gain.value = VOL.voice; gSfx.gain.value = VOL.sfx; gAmb.gain.value = VOL.amb; gMusic.gain.value = VOL.music;
      const b = A.ctx.createBuffer(1, 1, 22050); const s = A.ctx.createBufferSource(); s.buffer = b; s.connect(A.ctx.destination); s.start(0);
      A.ctx.resume && A.ctx.resume();
  }
  // 10/4 선생님: 게임 중 다른 화면에 갔다 오면 소리가 안 나던 것. 아이폰은 돌아와도 소리 엔진을 다시 켜 주지 않고, 누르기 전에는 켤 수도 없음
  //  → 돌아왔을 때 꺼져 있으면 "화면을 눌러 주세요" 판을 띄우고, 누르면 다시 켬. 그래도 안 켜지면 소리 엔진을 새로 만들고 음악·환경음을 다시 틂
  A.rebuild = () => {
    const mName = musicName, aNames = Object.keys(ambs);
    try { A.ctx.close(); } catch (e) { }
    for (const k of Object.keys(loops)) delete loops[k];
    if (musicEl) { try { musicEl.pause(); musicEl.src = ''; } catch (e) { } } musicEl = null; musicNode = null; musicName = '';
    for (const k of Object.keys(ambs)) delete ambs[k];
    A.buffers.clear(); cur = null;
    makeCtx(); A.setVolume();
    if (mName) A.music(mName); if (aNames.length) A.ambient(aNames);
  };
  let tapLayer = null, stuck = false;
  const fixSound = () => {   // 누르기 안에서 부름 (아이폰은 누르기 안에서만 소리를 켤 수 있음)
    if (tapLayer) { tapLayer.remove(); tapLayer = null; }
    if (!A.ready || G.paused || document.hidden) return;
    if (A.ctx.state !== 'running' && (stuck || A.ctx.state === 'interrupted')) { stuck = false; A.rebuild(); return; }   // 한 번 깨워도 안 깬 엔진은 새로 만듦
    if (A.ctx.state !== 'running') try { A.ctx.resume().catch(() => { }); } catch (e) { }
    if (musicEl && musicName && musicEl.paused) musicEl.play().catch(() => { });
    try { speechSynthesis.resume(); } catch (e) { }
    setTimeout(() => { if (A.ready && !G.paused && A.ctx.state !== 'running') { stuck = true; askTap(); } }, 400);
  };
  const askTap = () => {
    if (tapLayer || !A.ready || G.paused || document.hidden || A.ctx.state === 'running') return;
    tapLayer = G.el('button', 'snd-wake', document.body, '<span>화면을 한 번 눌러 주세요.<br>소리가 다시 나요.</span>'); tapLayer.type = 'button';
    tapLayer.addEventListener('click', fixSound);
  };
  const back = () => { if (document.hidden || G.paused || !A.ready) return; A.resume(); setTimeout(askTap, 700); };
  document.addEventListener('visibilitychange', back);
  window.addEventListener('pageshow', back); window.addEventListener('focus', back);
  // 10/4 선생님: 가끔 대사 소리가 안 나던 것. 아이폰은 음악(<audio>)이 바뀌거나 알림이 오면 소리 엔진을 '멈춤(interrupted)'으로 바꾸고
  // 다시 켜 주지 않음 → 소리를 낼 때마다, 화면을 누를 때마다 깨움. 그래도 안 깨면 대사는 <audio>로 따로 틀어 줌
  A.wake = () => { if (!A.ready || G.paused) return; if (A.ctx.state !== 'running') try { A.ctx.resume().catch(() => { }); } catch (e) { } };
  const awake = async () => { if (A.ctx.state === 'running') return true; A.wake(); await Promise.race([new Promise(r => { const f = () => { if (A.ctx.state === 'running') r(); else setTimeout(f, 30); }; f(); }), G.wait(0.5)]); return A.ctx.state === 'running'; };
  ['pointerdown', 'touchend', 'keydown'].forEach(ev => document.addEventListener(ev, (e) => { if (tapLayer && e.target === tapLayer) return; if (A.ready && (A.ctx.state !== 'running' || (musicEl && musicName && musicEl.paused))) fixSound(); }, true));
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
  let cur = null, curEl = null, vseq = 0;
  A.stopVoice = () => { vseq++; if (cur) { try { cur.stop(); } catch (e) { } cur = null; } if (curEl) { try { curEl.pause(); } catch (e) { } curEl = null; } try { speechSynthesis.cancel(); } catch (e) { } };
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
      if (!(await awake())) {   // 소리 엔진이 깨지 않으면 <audio>로 (폴더 판은 mp3 파일이 없어 길이만큼 기다림)
        if (my !== vseq) return fin();
        if (!FILE) { const el = new Audio(await mediaUrl('assets/voice/' + id + '.mp3')); el.volume = Math.min(1, S().volume ?? 0.9); curEl = el; el.onended = () => { if (curEl === el) curEl = null; fin(); }; el.play().catch(() => { }); }
        G.wait(buf.duration + 1.5).then(fin); return;
      }
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
    gMusic.gain.linearRampToValueAtTime((on ? VOL.duck : VOL.music) * lvl, t + 0.4); ducked = on;
    gAmb.gain.cancelScheduledValues(t); gAmb.gain.setValueAtTime(gAmb.gain.value, t);
    gAmb.gain.linearRampToValueAtTime(on ? VOL.amb * 0.3 : VOL.amb, t + 0.3);
    if (musicEl && !musicNode) musicEl.volume = Math.min(1, (on ? VOL.duck : VOL.music) * lvl * (S().volume ?? 0.9));
  }

  // ---- 효과음 ----
  A.sfx = async (name, vol = 1, rate = 1, fx) => {   // 10/1 rate: 음높이 (반딧불 소리 자물쇠), 10/10 fx: {pan 좌우, lp 부드럽게(Hz)} 지도 발소리
    if (!A.ready) return; A.wake();
    try { const buf = await loadBuf(G.asset('assets/audio/' + name + '.mp3')); const s = A.ctx.createBufferSource(); s.buffer = buf; s.playbackRate.value = rate; const g = A.ctx.createGain(); g.gain.value = vol; let n = s;
      if (fx && fx.lp) { const f = A.ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = fx.lp; n.connect(f); n = f; }
      if (fx && fx.pan && A.ctx.createStereoPanner) { const p = A.ctx.createStereoPanner(); p.pan.value = fx.pan; n.connect(p); n = p; }
      n.connect(g); g.connect(gSfx); s.start(); } catch (e) { }
  };

  // ---- 음악 (반복). <audio>가 막힌 환경이면 풀어서 재생으로 바꿈 ----
  const blobUrls = {};
  async function mediaUrl(p) {
    const u = G.asset(p); if (!u.startsWith('data:')) return u;
    if (!blobUrls[p]) { const r = await fetch(u); blobUrls[p] = URL.createObjectURL(await r.blob()); }
    return blobUrls[p];
  }
  // 10/6: 음악 붙잡기. 붙잡은 동안 다른 장면 음악으로 바뀌지 않음 (제목 화면만 예외). k = 크기 (1 = 보통 배경 음악)
  A.musicLevel = (k, sec = 2) => {
    lvl = k; if (!A.ready) return; const t = A.ctx.currentTime;
    gMusic.gain.cancelScheduledValues(t); gMusic.gain.setValueAtTime(gMusic.gain.value, t); gMusic.gain.linearRampToValueAtTime((ducked ? VOL.duck : VOL.music) * k, t + sec);
    if (musicEl && !musicNode) musicEl.volume = Math.min(1, (ducked ? VOL.duck : VOL.music) * k * (S().volume ?? 0.9));
  };
  A.holdMusic = (name, k = 1) => { hold = null; if (name) A.music(name); hold = name || null; A.musicLevel(k, name ? 0.6 : 1.5); };
  A.music = async (name) => {
    if (hold && name !== hold) { if (name !== 'music_title') return; hold = null; A.musicLevel(1, 0.5); }
    if (!A.ready || name === musicName) return; A.wake();
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
        g.gain.linearRampToValueAtTime(ambs[n].lv ?? (n === 'amb_crickets' ? 0.5 : n === 'amb_market' ? 0.6 : 1), A.ctx.currentTime + 1.2);
      } catch (e) { }
    }
  };
  // 10/10 지도 물소리: 물가에 가까울수록 크게 (mapfx.js)
  A.ambientLevel = (name, v) => { const a = ambs[name]; if (!a || !A.ready) return; if (a.lv != null && Math.abs(a.lv - v) < 0.01) return; a.lv = v; if (!a.s) return; const t = A.ctx.currentTime; a.g.gain.cancelScheduledValues(t); a.g.gain.setValueAtTime(a.g.gain.value, t); a.g.gain.linearRampToValueAtTime(v, t + 0.3); };
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
  // 10/8 검토: 저장 판 번호(v). 옛 판 저장은 읽을 때 지금 판으로 고쳐 줌. 저장 모양을 바꾸면 V를 올리고 아래 migrate에 한 줄 더함
  S.V = 2;
  const migrate = (d) => {
    if (!d || d.v >= S.V) return d;
    if (!(d.v >= 2)) { if (d.place === 'market') d.place = 'plaza'; for (const k of ['done', 'items', 'seenCutscenes', 'cleared', 'visited', 'seen']) if (!Array.isArray(d[k])) d[k] = []; }   // v1 → v2: 시장이 빠지기 전 저장은 광장에서 이어 함
    d.v = S.V; return d;
  };
  S.load = (slot) => migrate(G.store.get('slot' + slot, null));
  S.fresh = (slot) => ({
    v: S.V, slot, name: '', stars: 0, place: 'home', chapter: 'start',
    done: [], items: [], mood: 0, env: { board: false, guide: false }, seenCutscenes: [],
    quest: 0, cleared: [], visited: [], seen: [], started: false, updated: new Date().toISOString(),
  });
  S.del = (slot) => { G.store.del('slot' + slot); G.store.del('slot' + slot + '_bak'); };
  // 할 일 하나 끝낼 때, 장소를 나갈 때 부름. 구석의 작은 별이 한 번 반짝 (소리 없음)
  S.write = () => {
    if (!G.st) return;
    G.st.updated = new Date().toISOString();
    const ok = G.store.set('slot' + G.st.slot, G.st);
    const s = G.$('#savedStar'); if (s && ok) { s.classList.remove('blink'); void s.offsetWidth; s.classList.add('blink'); }
    if (!ok && !S.warned) {   // 10/8 검토: 학교 PC에서 저장이 막혀 있으면 한 번 알림 (게임은 그대로 계속)
      S.warned = true;
      const n = G.el('div', 'save-warn', G.$('#game'), '이 컴퓨터에서는 저장이 안 돼요. 다음에는 선생님 설정의 챕터 바로 가기로 이어 하세요.');
      n.style.cssText = 'position:absolute;left:50%;top:3%;transform:translateX(-50%);z-index:90;background:#fff8e6;color:#3b2f28;border:3px solid #e0b96a;border-radius:16px;padding:10px 20px;font-size:calc(var(--u,1px)*30);pointer-events:none';
      setTimeout(() => n.remove(), 8000);
    }
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
  // 10/6 선생님: label을 주면 그 이름으로 (점자 쪽지를 받은 뒤 '도서관으로')
  H.goMap = (fn, label) => {
    if (!root) H.init(); root.querySelectorAll('.hud-go').forEach(e => e.remove());
    const w = G.el('div', 'hud-go', root), nm = label || '지도로';
    G.btn('pill gold', G.icon('icon_map') + ' ' + nm, w, () => { w.remove(); if (!label) G.audio.voice('S92_btn_map'); fn(); }, nm);
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
  // 10/6 선생님(고칠 목록 1-a): 별은 모두 땅에 떨어졌으므로 다음 별은 하늘이 아니라 '광장 받침대의 빈 자리'가 그 별 색으로 깜박여 알려 줌
  // parent 안 아래쪽에 받침대 한 줄(8칸): 올린 별은 빛나고, nextId 자리만 깜박임
  G.pedestalRow = (parent, raised, nextId) => {
    const row = G.el('div', 'ped-row', parent);
    G.el('div', 'ped-name', row, '별 받침대');
    const box = G.el('div', 'ped-slots', row);
    G.STARS.slice(0, 8).forEach((s, i) => {
      const e = G.el('div', 'ped-slot' + (i < raised ? ' lit' : '') + (s.id === nextId ? ' next' : ''), box, i < raised ? G.starSvg(s) : '');
      e.style.setProperty('--sc', s.color || '#FFE9A8');
    });
    return row;
  };
  // 지도 땅에서 별 색 빛이 안개 너머로 새어 나옴 (별이 떨어진 곳). layer = 지도 fx 층, [x, y] = 땅 좌표
  G.groundLeak = (layer, x, y, color, w = 760) => {
    const e = G.el('div', 'ground-leak', layer);
    Object.assign(e.style, { left: x + 'px', top: y + 'px', width: w + 'px', height: w * 0.5 + 'px', zIndex: 3005 });
    e.style.setProperty('--sc', color || '#FFE9A8');
    for (let i = 0; i < 7; i++) { const m = G.el('i', '', e); m.style.left = (15 + i * 11) + '%'; m.style.animationDelay = (i * 0.37) + 's'; }
    return e;
  };
  H.bag = () => {
    const ov = G.$('#overlay');
    const m = G.el('div', 'modal', ov); const sh = G.el('div', 'sheet', m);
    G.busy++;
    G.el('h3', '', sh, G.icon('icon_bag') + ' 가방');
    const slots = G.el('div', 'bag-slots', sh);
    const own = G.st.items.filter(id => id !== 'leaf');   // 10/6 선생님: 쓸 데 없는 나뭇잎은 없앰 (예전 저장에 있어도 안 보임)
    const nm = G.el('div', 'bag-name', sh, own.length ? '' : '아직 가방이 비어 있어요');
    for (let i = 0; i < Math.max(6, own.length); i++) {   // 10/1: 점자 쪽지까지 6칸
      const it = G.D.items.find(x => x.id === own[i]);
      const s = G.el('button', 'bag-slot' + (it ? ' has' : ''), slots, it ? G.icon(G.litIcon(it.id)) : '');   // 10/6: 빛을 찾은 별 s.type = 'button';
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
// help.js — 도움 3단계 (GDD 6-1): 질문 → 화살표 → 반짝이는 길(또는 [루미]), 보통은 10·15·20초
// 대화·연출·이동 중(G.busy)과 교사용 설정이 열려 있을 때는 시간을 세지 않음
'use strict';
G.help = (() => {
  const Hp = {};
  let t = 0, level = 0, h = null, tt = 0, seen3 = false, tog = null;   // tt·seen3·tog: 10/8 검토 '같이 해 볼까?'
  const TIMES = { short: [5, 10, 15], normal: [10, 15, 20], long: [10, 20, 30] };   // 10/8 선생님: 도움이 더 빨리 나오게 (짧게 5~15, 보통 10~20, 길게 10~30초)
  const times = () => TIMES[(G.settings && G.settings.help) || 'normal'];
  G.every(dt => {
    if (tog && !(G.p4 && G.p4.can())) { tog.remove(); tog = null; }
    if (!h || G.busy > 0 || (G.dialog && G.dialog.active) || (G.settings && G.settings.help === 'off')) return;
    t += dt; const T = times();
    if (level < 1 && t >= T[0]) { level = 1; h.l1 && h.l1(); }
    if (level < 2 && t >= T[1]) { level = 2; h.l2 && h.l2(); }
    if (level < 3 && t >= T[2]) { level = 3; seen3 = true; h.l3 && h.l3(); }
    // 10/8 검토: 3단계 도움이 나온 뒤에도 퍼즐이 안 풀리면 (처음부터 3단계 시간 + 20초) 루미가 "같이 해 볼까?" 버튼을 띄움. 누르면 이 퍼즐을 같이 풀어 줌
    tt += dt;
    if (!tog && seen3 && tt >= T[2] + 20 && G.p4 && G.p4.can()) together();
  });
  // 무엇이든 누르면 시간을 처음부터 (보이던 도움 표시는 지움)
  Hp.poke = () => { t = 0; if (level > 0) { level = 0; h && h.clear && h.clear(); } };
  function together() {
    tog = G.btn('pill gold help-together', G.icon('icon_star') + ' 같이 해 볼까?', G.$('#game'), () => {
      const b = tog; tog = null; if (b) b.remove(); tt = -1e9;   // 이 퍼즐에서는 한 번만
      G.audio.sfx('sfx_sparkle', 0.6); if (G.p4.can()) G.p4.skip();
    }, '같이 해 볼까?');
    tog.style.cssText = 'position:absolute;left:50%;bottom:calc(var(--dlgH) + var(--u) * 24);transform:translateX(-50%);z-index:60';
    G.audio.voice('S92_together', '같이 해 볼까?');
  }
  const untog = () => { if (tog) { tog.remove(); tog = null; } tt = 0; seen3 = false; };
  Hp.set = (handlers) => { if (h && h.clear) h.clear(); h = handlers; t = 0; level = 0; untog(); };
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
    V.colorFull = null;
    if (V.monoFreed) { V.monoFreed = false; if (!mono.getAttribute('src')) mono.src = G.asset(M.mono); }
    if (!parts.length) { col.style.visibility = 'hidden'; return; }
    col.style.visibility = '';
    const m = parts.join(',');
    col.style.webkitMaskImage = m; col.style.maskImage = m;
  };
  V.setMood = (stage) => {
    for (const z of MOOD.zones) { V.alpha[z.id] = z.alpha[Math.max(0, Math.min(5, stage))]; V.grow[z.id] = 1; }
    V.applyMask(); V.setLamps(stage);
  };
  // 10/10 메모리 줄이기 2번: 색이 100%로 다 덮이면(fullColor(1)) 가려진 흑백 그림을 메모리에서 비움. 다시 마스크로 돌아가면(applyMask) 다시 불러옴
  V.fullColor = (a) => { V.colorFull = a; col.style.webkitMaskImage = 'none'; col.style.maskImage = 'none'; col.style.visibility = ''; col.style.opacity = a;
    if (a >= 1 && !V.monoFreed && mono.getAttribute('src')) { V.monoFreed = true; setTimeout(() => { if (V.monoFreed) mono.removeAttribute('src'); }, 700); } };   // 700ms: 색이 천천히 나타나는 transition(.6s)이 끝난 뒤

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
  // 10/10 선생님(살아 있는 걸음): walk_<id>_live.png(21칸, 도구/그림만들기/gen_live.py)가 있으면 그것으로.
  //  걷기는 8칸 대신 16칸(칸 사이를 반으로), 서 있을 때 숨쉬기·눈 깜빡임·두리번, 출발·멈춤 때 살짝 내려앉음. 움직임 줄이기면 서 있을 때 움직임 없음
  //  칸: 0~15 걷기, 16 서기, 17 숨, 18 눈 감음, 19 숨+눈 감음, 20 내려앉음
  const ROW = { SE: 0, SW: 1, NW: 2, NE: 3 }, LOOK = { SE: 'SW', SW: 'SE' };
  const LIVE = /\/walk_[^/]+\.png$/;
  V.walkers = [];
  V.walker = (sheet, cls) => {
    const live = LIVE.test(sheet), src = live ? sheet.replace(/\.png$/, '_live.png') : sheet;
    const w = { x: 0, y: 0, dir: 'SE', frame: 8, live, src, ph: Math.random() * 2600, nb: 1500 + Math.random() * 3000, nl: 5000 + Math.random() * 5000, bu: 0, lu: 0, st: 0, ws: -1e9, lf: -1, lt: 0 };
    w.el = G.el('div', 'walker' + (cls ? ' ' + cls : ''), V.fx);
    G.el('div', 'shadow', w.el);
    w.spr = G.el('div', 'sprite', w.el); w.spr.style.backgroundImage = `url("${G.asset(src)}")`;
    if (live) { w.spr.style.backgroundSize = '2100px 520px';   // 살아 있는 그림이 없으면 예전 9칸 그림으로
      const t = new Image(); t.onerror = () => { w.live = false; w.src = sheet; w.spr.style.backgroundImage = `url("${G.asset(sheet)}")`; w.spr.style.backgroundSize = ''; w.bp = ''; w.draw(); }; t.src = G.asset(src); }
    w.occ = G.el('canvas', 'occ', w.el); w.occ.width = 100; w.occ.height = 130; w.occ.style.display = 'none';
    w.set = (x, y) => { w.x = x; w.y = y; w.el.style.transform = `translate(${x.toFixed(1)}px,${y.toFixed(1)}px)`; const z = Math.round(y); if (z !== w.z) { w.z = z; w.el.style.zIndex = z; } V.occDirty(w); };   // 10/4 폰 끊김: 바뀔 때만 씀
    w.col = () => {
      if (!w.live) return w.frame;
      const now = performance.now(), rm = G.reduced();
      if (w.frame !== 8) {
        if (w.lf === 8 || w.lf === -1) w.ws = now;
        if (w.frame !== w.lf) { w.lf = w.frame; w.lt = now; }
        if (!rm && now - w.ws < 90) return 20;   // 출발: 살짝 내려앉았다가
        return w.frame * 2 + (now - w.lt >= 50 ? 1 : 0);
      }
      if (w.lf !== 8) { if (w.lf !== -1) w.st = now; w.lf = 8; }
      if (rm) return 16;
      if (now - w.st < 120) return 20;            // 멈춤: 살짝 내려앉음
      if (now > w.nb) { w.bu = now + 120; w.nb = now + (Math.random() < 0.25 ? 260 : 2000 + Math.random() * 3000); }
      const br = (now + w.ph) % 2600 < 1100, bl = now < w.bu;
      return bl ? (br ? 19 : 18) : (br ? 17 : 16);
    };
    w.row = () => {
      if (!w.live || w.frame !== 8 || G.reduced() || !LOOK[w.dir] || G.busy > 0) { w.lu = 0; return ROW[w.dir]; }
      const now = performance.now();
      if (!w.lu && now > w.nl) { w.lu = now + 1100 + Math.random() * 700; w.nl = now + 5000 + Math.random() * 5000; }
      if (w.lu && now > w.lu) w.lu = 0;
      return ROW[w.lu ? LOOK[w.dir] : w.dir];
    };
    w.draw = () => { const c = w.col(), r = w.row(); const bp = `${-c * 100}px ${-r * 130}px`; if (bp !== w.bp) { w.bp = bp; w.c = c; w.r = r; w.spr.style.backgroundPosition = bp; if (w.hid) V.occDirty(w); } };
    w.face = (dx, dy) => { w.dir = dy >= 0 ? (dx >= 0 ? 'SE' : 'SW') : (dx >= 0 ? 'NE' : 'NW'); };
    w.draw();
    V.walkers.push(w);
    return w;
  };
  // 서 있는 사람의 숨쉬기·깜빡임 (0.1초마다, 바뀔 때만 씀)
  const idleT = setInterval(() => { if (!el.isConnected) { if (V.seen) clearInterval(idleT); return; } V.seen = true; for (const w of V.walkers) if (w.live && w.frame === 8) w.draw(); }, 100);

  // ---- 10/10 선생님(숲길 가려지기): 길 앞쪽(화면 아래쪽)의 나무·집·가로등·문이 인물을 가림 ----
  //  <지도>_depth.png(지도 절반 크기, 소리의별/지도/도구/가려지기_1010/gen_depth.py): 키 큰 물건 점마다 그 바로 아래 땅의 y.
  //  인물 발보다 땅이 앞(아래)인 점만 지도 그림 그대로 인물 위에 다시 그림. 다 가려져도 놓치지 않게 흐리게 비춤
  V.monoImg = mono;
  const dsrc = /map2?_color(_s)?\.jpg$/.test(M.color) ? M.color.replace(/_color(_s)?\.jpg$/, '_depth.png') : null;   // _s = 휴대폰용 작은 지도 그림(깊이는 같은 것)
  // 10/10 소리의 별에서 놀다 처음 화면(이어서 하기)으로 튕김: 지도를 열 때마다 깊이 그림을 큰 캔버스(넓은 지도 2880x1620)에 새로 풀어
  //  휴대폰 메모리가 쌓여 페이지가 다시 켜짐 → 한 번만 풀어 두고 같이 쓰며, 다 쓴 캔버스는 바로 비움
  const DC = G.depthCache || (G.depthCache = {});
  const useDepth = (d) => { V.depth = { w: d.w, h: d.h, k: V.W / d.w, gy: d.gy }; for (const w of V.walkers) V.occDirty(w); };
  if (dsrc && DC[dsrc]) { if (DC[dsrc].gy) useDepth(DC[dsrc]); else DC[dsrc].wait.push(useDepth); }
  else if (dsrc) {
    const ent = DC[dsrc] = { wait: [useDepth] };
    const done = (w, h, gy) => { Object.assign(ent, { w, h, gy }); const ws = ent.wait; ent.wait = []; for (const f of ws) f(ent); };
    const im = new Image();
    im.onerror = () => { delete DC[dsrc]; };
    im.onload = () => {
      try {
        const w = im.width, h = im.height;
        const c = document.createElement('canvas'); c.width = w; c.height = h;
        const x = c.getContext('2d', { willReadFrequently: true }); x.drawImage(im, 0, 0);
        const d = x.getImageData(0, 0, w, h).data, gy = new Uint16Array(w * h);
        for (let i = 0; i < gy.length; i++) if (d[i * 4 + 3] > 128) gy[i] = (d[i * 4] * 256 + d[i * 4 + 1] || 1) | (d[i * 4 + 3] < 255 ? 0x8000 : 0);   // 10/10 알파 254 = 올라설 수 있는 땅(전망대 언덕 윗면·계단, fix_plateau.py)
        c.width = c.height = 0;   // iOS는 다 쓴 캔버스 메모리를 늦게 돌려줌
        done(w, h, gy);
      } catch (e) { delete DC[dsrc]; }
    };
    const src = G.asset(dsrc);
    // 10/10 메모리 줄이기 4번: 웹 주소는 미리 만든 숫자 파일(<지도>_depth.dep, depth_pack.py)을 바로 읽음 → PNG를 캔버스에 풀 때의 순간 +37MB 없음.
    //  DecompressionStream이 없거나 파일을 못 받으면 예전처럼 PNG로(폴더 판·한 파일은 PNG 그대로)
    const viaPng = () => {
      if (location.protocol === 'file:' && !/^data:/.test(src)) {   // 폴더 판: 파일로 연 그림은 점을 못 읽음 → <이름>.js 글자판으로 받음
        window.__depth = (u, b64) => { if (u === dsrc) im.src = 'data:image/png;base64,' + b64; };
        const sc = document.createElement('script'); sc.src = src + '.js'; document.head.appendChild(sc);
      } else im.src = src;
    };
    if (/^https?:$/.test(location.protocol) && typeof DecompressionStream === 'function' && !window.EMBED?.[dsrc]) {
      fetch(dsrc.replace(/\.png$/, '.dep')).then((r) => { if (!r.ok) throw 0; return r.arrayBuffer(); })
        .then((b) => new Response(new Blob([b]).stream().pipeThrough(new DecompressionStream('deflate'))).arrayBuffer())
        .then((b) => { const hd = new Uint16Array(b, 0, 2), w = hd[0], h = hd[1]; if (b.byteLength !== 4 + w * h * 2) throw 0; done(w, h, new Uint16Array(b, 4, w * h)); })
        .catch(viaPng);
    } else viaPng();
  }
  const occQ = new Set(); let occRaf = 0;
  V.occDirty = (w) => { if (!V.depth) return; occQ.add(w); if (!occRaf) occRaf = requestAnimationFrame(() => { occRaf = 0; for (const q of occQ) occlude(q); occQ.clear(); }); };
  const sheets = {};
  const mask = document.createElement('canvas'); mask.width = 100; mask.height = 130; const mctx = mask.getContext('2d'); const mdat = mctx.createImageData(100, 130);
  V.colorAlphaAt = (x, y) => {   // applyMask와 같은 계산(그 점 하나)
    if (col.style.visibility === 'hidden') return 0;
    if (V.colorFull != null) return V.colorFull;
    let keep = 1;
    for (const z of MOOD.zones) {
      const a = V.alpha[z.id] || 0; if (a < 0.003) continue;
      const k = V.grow[z.id] ?? 1, rx = Math.max(1, z.r[0] * k), ry = Math.max(1, z.r[1] * k), t = Math.hypot((x - z.center[0]) / rx, (y - z.center[1]) / ry);
      const v = t <= 0.42 ? a : t <= 0.72 ? a + (a * 0.55 - a) * (t - 0.42) / 0.3 : t < 1 ? a * 0.55 * (1 - (t - 0.72) / 0.28) : 0;
      keep *= 1 - v;
    }
    return 1 - keep;
  };
  function occlude(w) {
    const D = V.depth, cv = w.occ;
    if (!D || !w.el.isConnected || w.el.style.display === 'none') { cv.style.display = 'none'; w.hid = false; return; }
    const fx = Math.round(w.x), fy = Math.round(w.y), x0 = fx - 50, y0 = fy - 104, px = mdat.data;
    // 10/10 선생님(전망대): 발밑이 언덕 윗면이면 언덕 아래 땅 높이를 발 높이로 (위에 선 인물을 언덕·언덕 위 집이 가리지 않게)
    const fsx = Math.floor(fx / D.k), fsy = Math.floor((fy - 3) / D.k), gf = fsy >= 0 && fsy < D.h && fsx >= 0 && fsx < D.w ? D.gy[fsy * D.w + fsx] : 0;
    const up = !!(gf & 0x8000), lim = (up ? Math.max(fy, gf & 0x7fff) : fy) + 4, jmax = up ? 104 : 130;   // 언덕 위면 발 아래(그림자)는 안 덮음
    let any = false;
    for (let j = 0; j < 130; j++) {
      const sy = Math.floor((y0 + j) / D.k);
      for (let i = 0; i < 100; i++) {
        const sx = Math.floor((x0 + i) / D.k), o = (j * 100 + i) * 4;
        const g = sy >= 0 && sy < D.h && sx >= 0 && sx < D.w ? D.gy[sy * D.w + sx] : 0;
        const f = j < jmax && (g & 0x7fff) > lim; px[o + 3] = f ? 255 : 0; if (f) any = true;
      }
    }
    if (!any) { cv.style.display = 'none'; w.hid = false; return; }
    mctx.putImageData(mdat, 0, 0);
    const c = cv.getContext('2d'); c.globalCompositeOperation = 'source-over'; c.globalAlpha = 1; c.clearRect(0, 0, 100, 130);
    const draw = (img, a) => { if (!img || !img.naturalWidth || a <= 0.003) return; const s = img.naturalWidth / V.W; c.globalAlpha = a; c.drawImage(img, x0 * s, y0 * s, 100 * s, 130 * s, 0, 0, 100, 130); };
    draw(mono, 1); draw(col, V.colorAlphaAt(fx, fy) * (+(col.style.opacity || 1)));
    if (V.s2 && V.s2.fog) draw(V.s2.fog, +(V.s2.fog.style.opacity || 1));
    if (V.fxPatch) V.fxPatch(c, x0, y0);   // 10/10 지도 밤 덧칠(mapfx.js)
    // 가로등 불빛 (지도 위 불빛과 같은 모양)
    const light = !!el.closest('.light');
    for (const L of V.lamps) {
      if (!L.el.classList.contains('on')) continue;
      const lx = L.def.at[0] - x0, ly = L.def.at[1] - 4 - y0, R = 110 * Math.SQRT2;
      if (lx < -R || lx > 100 + R || ly < -R || ly > 130 + R) continue;
      const g = c.createRadialGradient(lx, ly, 0, lx, ly, R);
      g.addColorStop(0, 'rgba(255,246,214,1)'); g.addColorStop(0.05, 'rgba(255,246,214,1)'); g.addColorStop(0.14, 'rgba(255,214,120,.65)'); g.addColorStop(0.38, 'rgba(244,162,89,.25)'); g.addColorStop(0.68, 'rgba(244,162,89,0)');
      c.globalCompositeOperation = light ? 'source-over' : 'screen'; c.globalAlpha = light ? 0.55 : 1; c.fillStyle = g; c.fillRect(0, 0, 100, 130);
    }
    c.globalAlpha = 1; c.globalCompositeOperation = 'destination-in'; c.drawImage(mask, 0, 0);
    // 가려진 부분에 인물을 흐리게
    const sh = sheets[w.src] || (sheets[w.src] = Object.assign(new Image(), { src: G.asset(w.src) }));
    if (sh.complete && sh.naturalWidth) { const k = sh.naturalWidth / (w.live ? 21 : 9) / 100; c.globalCompositeOperation = 'source-atop'; c.globalAlpha = 0.35; c.imageSmoothingEnabled = false; c.drawImage(sh, (w.c ?? w.frame) * 100 * k, (w.r ?? ROW[w.dir]) * 130 * k, 100 * k, 130 * k, 0, 0, 100, 130); }
    c.globalAlpha = 1; c.globalCompositeOperation = 'source-over';
    cv.style.display = ''; w.hid = true;
  }

  // ---- 카메라: 가운데 (x,y), 확대 z. 지도 밖이 보이지 않게 막음 (free면 안 막음) ----
  // 10/10 선생님: 휴대폰에서 넓은 지도(소리의 별부터)를 멀리 보면 메모리가 모자라 페이지가 다시 켜짐(이어서 하기 화면, 별 엔딩 연출에서도)
  //  → 휴대폰은 넓은 지도를 지도 화면 처음 보기(1.4배)보다 멀리 보지 않음. 옛 지도(길의 별)·PC·태블릿·전자칠판은 그대로
  V.zMin = (!o.free && /map2_/.test(M.color) && (/iPhone|iPod/.test(navigator.userAgent) || /Android.*Mobile/.test(navigator.userAgent))) ? 1.4 : 0;
  V.setCam = (x, y, z = V.cam.z) => {
    const { W, H, ws, u } = G.stage;
    if (!o.free) z = Math.max(z, W / (ws * V.W), H / (ws * V.H), V.zMin);   // 10/1 선생님: 지도보다 멀리 빼서 둘레에 여백이 생기지 않게
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
// 10/8 검토: 어려운 낱말이 처음 나오면 작은 그림 카드가 잠깐 떴다 사라짐 (선생님 그림 assets/ui/art/word_*.jpg, 칸마다 한 번)
const WORD_CARDS = [['경첩', 'word_hinge'], ['걸쇠', 'word_latch'], ['도르래', 'word_pulley'], ['전망대', 'word_view'], ['나루터', 'word_dock']];
function wordCard(id) {
  const L = G.D.dialogues[id]; if (!L || !L.text || !G.st) return;
  const seen = G.st.wordSeen || (G.st.wordSeen = []);
  const w = WORD_CARDS.find(([k, a]) => L.text.includes(k) && !seen.includes(k) && G.art(a)); if (!w) return;
  seen.push(w[0]);
  const c = G.el('div', 'word-card', G.$('#game'), `<img src="${G.art(w[1])}" alt=""><span>${w[0]}</span>`);
  c.setAttribute('aria-hidden', 'true');
  setTimeout(() => { c.classList.add('out'); setTimeout(() => c.remove(), 500); }, 3200);
}
G.dialog = (() => {
  const Dl = { active: false };
  const BAND = { lumi: '#FFD66B', hero: '#7FB77E', chief: '#A0764F', post: '#5B8FD0', haesol: '#3AA39A', daon: '#E88D7A', villager: '#B58BC4', nar: '', ui: '' };
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
  // opts.partner: 오른쪽 인물 ('chief', 'post', 'haesol'), opts.keep: 끝나도 창을 닫지 않음, opts.noPortraits: 인물 그림 없이
  Dl.play = async (ids, opts = {}) => {
    if (!ids || !ids.length) return;
    // 10/9 선생님: 상대를 적지 않은 대화(장소 첫 방문 등)는 대사에서 상대를 찾음 (촌장 대사인데 루미 대화처럼 나오던 문제)
    let partner = opts.partner;
    if (!('partner' in opts) && !opts.noPortraits) {
      const P = G.D.portraits || {};
      partner = (ids.map(i => (G.D.dialogues[i] || {}).speaker).find(sp => sp && sp !== 'hero' && sp !== 'lumi' && P[sp])) || (Dl.active ? Dl.partner : null);
    }
    open(partner, opts.noPortraits);
    G.audio.preload(ids.slice(0, 3));
    for (let i = 0; i < ids.length; i++) {
      G.audio.preload(ids.slice(i + 1, i + 3));
      lastLine = i === ids.length - 1 && !opts.keep;
      show(ids[i]); wordCard(ids[i]); if (Dl.onLine) Dl.onLine(ids[i]);
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
    // 10/6 선생님: 점자책 장면은 종이에 볼록 솟은 점만 (칸 테두리·빈 자리 없음, 종이색 + 빛·그림자)
    if (o.emboss) {
      g = g.replace('</defs>', `<radialGradient id="${id}e" cx="38%" cy="34%" r="66%"><stop offset="0" stop-color="#FFFFFA"/><stop offset=".6" stop-color="#F3E7D0"/><stop offset="1" stop-color="#D8C6A6"/></radialGradient></defs>`);
      cells.forEach((dots, i) => { const x = m.pad + i * m.pitch, y = m.pad;
        for (const d of dots) { const px = x + POS[d][0] * s, py = y + POS[d][1] * s, r = m.r * 0.95;
          g += `<circle cx="${(px + 0.07 * s).toFixed(1)}" cy="${(py + 0.09 * s).toFixed(1)}" r="${(r * 1.08).toFixed(1)}" fill="rgba(110,80,50,0.26)"/>` +
            `<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="${r.toFixed(1)}" fill="url(#${id}e)" stroke="rgba(140,110,78,0.28)" stroke-width="${(0.025 * s).toFixed(1)}"/>`; } });
      return g + '</svg>';
    }
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
      const P = G.D.places.nodes, pd = G.D.places.pedestal, land = pd ? [pd[0], pd[1] - 5] : [P.PLAZA[0], P.PLAZA[1] - 70];   // 10/8 넓힌 광장: 받침대가 광장 가운데로 옮겨감
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
      await Promise.all([c.wait(0.4), (async () => { for (const q of S) { if (q === road) continue; pop(q.el); c.sfx('sfx_chime', 0.12); await c.wait(0.3); } })()]);
      // (3) 별마다 마을로 빛줄기 (별이 하는 일)
      await Promise.all([say('S01_nar_03'), c.tween(0, 0.55, 1.4, v => S.forEach(q => { if (q !== road) q.bm.style.opacity = v; }))]);
      // (4) 광장으로 내려가 주민들이 함께 방법을 찾는 마을 → 길의 별이 별 받침대에서 하늘로
      c.tween(0.55, 0, 1.2, v => S.forEach(q => { if (q !== road) q.bm.style.opacity = v; }));   // 9/30: 아직 없는 길의 별 빛줄기가 잠깐 보이던 것 고침
      await cam(1400, 640, 1.1, 2.6);   // 10/8 검토: S01_nar_05 뺌
      road.el.style.left = land[0] + 'px'; road.el.style.top = land[1] + 'px'; road.el.style.opacity = 1;
      c.sfx('sfx_sparkle', 0.6);
      // 9/30 선생님: 별 받침대에서 올라가는 별을 카메라가 따라감 (별이 늘 화면 가운데 조금 아래)
      const c0 = { ...V.cam };
      // 10/6 선생님: 별가루를 연료처럼 뿜으며 반짝이는 잔상을 남기고 올라감 (모든 별 받침대와 같은 효과, core.js G.riseTrail)
      const rtr = G.riseTrail(starL, road.el, road.s.color, !!(c.light || c.skipped)), rsz = parseFloat(road.el.style.width) || 92;
      road.el.style.zIndex = 5;
      await Promise.all([
        say('S01_nar_06'),
        c.tween(0, 1, c.rm ? 0.1 : 3.8, k => {
          const x = land[0] + (road.at[0] - land[0]) * k, y = land[1] + (road.at[1] - land[1]) * k;
          road.el.style.left = x + 'px'; road.el.style.top = y + 'px';
          if (c.rm) return;
          if (!c.skipped) rtr(k, x, y, rsz, 1.8);
          const f = Math.min(1, k / 0.18), b = f * f * (3 - 2 * f);   // 처음 잠깐은 카메라가 별 쪽으로 부드럽게 붙음
          V.setCam(c0.x + (x - c0.x) * b, c0.y + (y - 90 - c0.y) * b, c0.z + (1 - c0.z) * k);
        }, 'io'),
      ]);
      rtr.end(); pop(road.el); c.sfx('sfx_chime', 0.4);
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
      await Promise.all([fall(S[8], 8), c.tween(1, 0.25, 2, v => dotL.style.opacity = v)]);   // 10/7 길의 별 줄이기: S01_nar_08 줄 뺌
      // (6) 마을로: 가로등이 광장 가까운 것부터 꺼지고, 색이 빠짐
      await cam(1400, 700, 1.1, c.rm ? 0 : 2.4);
      const ls = [...V.lamps].sort((a, b) => Math.hypot(a.def.at[0] - land[0], a.def.at[1] - land[1]) - Math.hypot(b.def.at[0] - land[0], b.def.at[1] - land[1]));
      await Promise.all([
        c.wait(0.2),   // 10/8 검토: S01_nar_09 뺌
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
      if (c.rm) V.setCam(V.home()[0], V.home()[1], 1); else V.setCam(V.home()[0] - 200, V.home()[1] + 20, 1.3);
      c.t0 = G.t;
      const title = G.el('div', 'cut-title', root, '광장'); title.style.opacity = 0;
      await Promise.all([
        fadeIn(c, root, 0.5),
        (async () => { if (!c.rm) await c.tween(0, 1, 3.4, k => V.setCam(V.home()[0] - 200 + 200 * k, V.home()[1] + 20 - 20 * k, 1.3 - 0.3 * k), 'io'); })(),
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
      V.setCam(V.home()[0], V.home()[1], 1); V.showBack(false);
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
      root.style.opacity = opts.cover ? 1 : 0;
      // 10/8 40분 수업: 별마다 4장 앞은 '쉬어 가는 곳'. 처음 볼 때만 묻고, 쉬기를 고르면 처음 화면으로 (진행은 저장돼 있어 이어 하기로 여기부터)
      if (+T[0] === 4 && !opts.replay && !G.fast() && !(G.settings && G.settings.noRest) && G.st && !G.st.seenCutscenes.includes('CH:' + key)) {
        root.style.opacity = 1; const rb = G.el('div', 'ch-rest', root);
        G.el('div', 'ch-rest-t', rb, G.txt('S92_rest') || '여기까지 하고 쉬어도 돼요.');
        const bs = G.el('div', 'ch-rest-b', rb);
        const pick = await new Promise(r => { G.btn('pill', '계속하기', bs, () => r(1), '계속하기'); G.btn('pill', '여기서 쉬기', bs, () => r(0), '여기서 쉬기'); G.audio.voice('S92_rest'); });
        G.audio.stopVoice && G.audio.stopVoice(); rb.remove();
        if (!pick) { G.save.write(); location.reload(); return new Promise(() => { }); }
      }   // 10/1 cover: 그림이 처음부터 화면을 덮음 (장소 모습이 먼저 비치지 않게)
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

    // ---- C4 도서관 도착 (7초): 나무 문이 천천히 열림 → 따뜻한 빛이 쏟아짐 → 먼지가 반짝 → 해솔 사서가 인사 → 「도서관」 ----
    async C4(c, root, opts) {
      const { V, off } = await arrive(c, root, opts, 'library');
      V.setCam(V.home()[0], V.home()[1], 1);
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
            dl.style.transform = `perspective(${G.stage.W}px) rotateY(${80 * k}deg)`; dr.style.transform = `perspective(${G.stage.W}px) rotateY(${-80 * k}deg)`;   // 10/9 선생님: 문짝은 안쪽으로 열려 돌 테두리 뒤에 숨음(테두리는 끝까지 그대로)
          }, 'io');
          if (!c.rm) await c.tween(0, 1, 0.5, k => { door.style.opacity = 1 - k; door.style.transform = `scale(${1 + 0.12 * k})`; }, 'in');   // 열린 문 안으로 들어감
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
// 10/10 선생님(살아 있는 걸음): 천천히 출발하고 천천히 멈춤 (처음 0.2초 동안 빨라지고, 마지막 45px에서 느려짐)
G.walkEase = (t, rem) => G.reduced() ? 1 : Math.max(0.35, Math.min(1, 0.35 + t / 0.3, 0.35 + rem / 70));
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
    // 10/10 선생님(지도 생동감 1): 1.4배 가까이 보기 (V.zBase = 예전 보기, 휠·두 손가락으로 예전만큼 멀리까지 뺄 수 있음)
    const zm = V.zMin; V.zMin = 0; V.setCam(hero.x, hero.y - 40); V.zBase = V.cam.z; V.zMin = zm; V.setCam(hero.x, hero.y - 40, V.zBase * ZDEF);   // 처음 보기는 휴대폰 한계(V.zMin)와 상관없이 셈
    V.fxHero = hero; V.fxLumi = () => (lumi && lumi.style.display !== 'none' ? lumiPos : null);
    offs.push(G.every(update)); update(10);
    G.resizers.add(onResize);
    dragCam(world);
    G.hud.map();
    G.audio.music('music_night'); G.audio.ambient(['amb_crickets', 'amb_fountain']);   // 10/10 A3: 물소리는 물가에 가까울수록 (mapfx.js)
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
    if (G.p4 && G.p4.accessMarks) G.p4.accessMarks(V);   // 10/9 수정안 3단계: 모두의 지도
  };

  function placeLumi() { if (lumi) lumi.style.transform = `translate(${lumiPos.x.toFixed(1)}px,${lumiPos.y.toFixed(1)}px)`; }
  function update(dt) {
    if (!V) return;
    // 루미는 주인공 오른쪽 위를 살짝 늦게 따라옴
    if (hero && lumi && !Mp.lumiFree) {
      const lt = V.lumiTarget && V.lumiTarget(hero, dt);   // 10/10 A1: 주인공 둘레를 날고, 가끔 갈 곳을 알려 줌 (mapfx.js)
      const tx = lt ? lt[0] : hero.x + 60, ty = lt ? lt[1] : hero.y - 150, k = Math.min(1, dt * (lt ? lt[2] : 4));
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
  // 10/9 수정안 3단계: 지도 확대 (휠, 두 손가락). 1배~2배. 확대하면 모두의 지도 표시가 보임
  const ZDEF = 1.4, ZMAX = 2 * ZDEF;   // 10/10: 처음 보기가 1.4배라 확대 끝·모두의 지도 표시도 그만큼 (표시는 처음 보기보다 1.3배 더 가까이)
  // 10/10 선생님: 휴대폰에서 지도를 멀리 빼면 메모리가 모자라 페이지가 다시 켜짐(이어서 하기 화면) → 휴대폰은 처음 보기보다 멀리 못 뺌(확대는 그대로, PC·태블릿·전자칠판은 그대로)
  const PHONE = /iPhone|iPod/.test(navigator.userAgent) || /Android.*Mobile/.test(navigator.userAgent);
  function zoomTo(z) { if (!V) return; const z0 = V.zBase || (V.zBase = V.cam.z), zt = z0 * ZDEF * 1.3; V.setCam(V.cam.x, V.cam.y, Math.max(PHONE ? z0 * ZDEF : z0, Math.min(z0 * ZMAX, z))); V.fx.classList.toggle('zoomed', V.cam.z >= zt); Mp.userCam = true; if (V.cam.z < zt) V.fx.querySelectorAll('.acc-tip').forEach(t => t.remove()); }
  function dragCam(world) {
    let st = null; const pts = new Map(); let pinch = null;
    const wheel = (e) => { if (!V || walking || G.busy > 0 || G.paused || G.screen !== 'map') return; e.preventDefault(); zoomTo(V.cam.z * (e.deltaY < 0 ? 1.12 : 1 / 1.12)); };
    world.addEventListener('wheel', wheel, { passive: false }); offs.push(() => world.removeEventListener('wheel', wheel));
    const pd = (e) => { pts.set(e.pointerId, [e.clientX, e.clientY]); if (pts.size === 2 && V) { const [a, b] = [...pts.values()]; pinch = { d: Math.hypot(a[0] - b[0], a[1] - b[1]) || 1, z: V.cam.z }; st = null; } };
    const pm = (e) => { if (!pts.has(e.pointerId)) return; pts.set(e.pointerId, [e.clientX, e.clientY]); if (pinch && pts.size === 2) { const [a, b] = [...pts.values()]; zoomTo(pinch.z * Math.hypot(a[0] - b[0], a[1] - b[1]) / pinch.d); G._suppressClick = true; setTimeout(() => G._suppressClick = false, 60); } };
    const pu = (e) => { pts.delete(e.pointerId); if (pts.size < 2) pinch = null; };
    world.addEventListener('pointerdown', pd); window.addEventListener('pointermove', pm); window.addEventListener('pointerup', pu); window.addEventListener('pointercancel', pu);
    offs.push(() => { world.removeEventListener('pointerdown', pd); window.removeEventListener('pointermove', pm); window.removeEventListener('pointerup', pu); window.removeEventListener('pointercancel', pu); });
    const down = (e) => {
      if (!V || walking || Mp.camFree || G.busy > 0 || G.paused || G.screen !== 'map' || pinch) return;
      st = { id: e.pointerId, x: e.clientX, y: e.clientY, cx: V.cam.x, cy: V.cam.y, on: false };
    };
    const move = (e) => {
      if (!st || e.pointerId !== st.id || !V || pinch) return;
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
    if (offNode()) pts.unshift([hero.x, hero.y]);   // 10/9 선생님: 주민 앞에 가 있던 자리에서 출발
    if (pts.length > 1) {
      let len = 0; for (let i = 1; i < pts.length; i++) len += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
      const W = G.D.places.walk, dur = Math.max(W.minSec, Math.min(W.maxSec, len / W.speed)), speed = len / dur;
      G.busy++;
      const visited = G.st.visited.includes(p.id);
      walking = { skip: G.fast() };   // 빠르게 모드면 걷기를 바로 건너뜀
      if (visited) G.hud.skip(() => { if (walking) walking.skip = true; });
      if (p.walkLine) G.hud.say(p.walkLine);
      await new Promise(res => {
        let seg = 1, d = 0, dd = 0, t = 0, stepT = 0, stepN = 0;
        const off = G.every(dt => {
          if (!walking) { off(); res(); return; }
          if (walking.skip) { const e = pts[pts.length - 1]; hero.set(e[0], e[1]); off(); res(); return; }
          t += dt; const e = G.walkEase(t, len - dd); d += speed * dt * e; dd += speed * dt * e; stepT += dt;
          while (seg < pts.length) {
            const a = pts[seg - 1], b = pts[seg], L = Math.hypot(b[0] - a[0], b[1] - a[1]);
            if (d <= L) { const k = d / L; hero.set(a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k); hero.face(b[0] - a[0], b[1] - a[1]); break; }
            d -= L; seg++;
          }
          if (seg >= pts.length) { const e = pts[pts.length - 1]; hero.set(e[0], e[1]); off(); res(); return; }
          hero.frame = Math.floor(t * 10) % 8; hero.draw();
          if (stepT > 0.4) { stepT = 0; stepSfx(stepN++); }
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
  Mp.lumiArrive = async (o = {}) => {
    const from = G.D.places.nodes.PLAZA;
    Mp.lumiFree = true; lumi.style.display = '';
    lumiPos.x = from[0]; lumiPos.y = from[1] - 180; placeLumi();
    G.audio.sfx('sfx_sparkle', 0.7);
    const tx = hero.x + 60, ty = hero.y - 150;
    let sx = lumiPos.x, sy = lumiPos.y;
    // 10/9 선생님: 첫 만남 루미는 별 올리기처럼 별가루 잔상을 남기며 공처럼 통통 튀어 다님 (떨어져 헤매는 루미를 잡는 느낌). 움직임 줄이기면 예전처럼 떠 있기만
    const rm = G.reduced(), BH0 = 110, BT = 0.8;   // 튀는 높이, 한 번 튀는 시간(초)
    const tr = o.catchMe && !rm ? G.riseTrail(V.fx, lumi, '#FFD66B') : null, lsz = lumi.offsetWidth || 90;
    let tk = 0; const offT = tr ? G.every(dt => { tk += dt / 12; if (tk > 0.9) { tk = 0; tr.reset(); } tr(tk, lumiPos.x, lumiPos.y, lsz); }) : null;
    if (o.catchMe) {   // 10/8 검토: 처음에 학생이 떨어지는 루미를 눌러서 받아 줌 (누를 때까지 주인공 위에서 튀어 다님, 30초 지나면 저절로)
      // 10/10 선생님: 1.4배 가까이 보기 뒤로 루미가 화면 위로 잘려 PC에서 누르기 어려웠음 → 지금 보이는 화면 높이에 맞춰 위 20% 아래에서 튀게 (모든 기기)
      const vh = G.stage.H / (G.stage.ws * V.cam.z), BH = Math.min(BH0, vh * 0.15), vTop = V.cam.y - vh / 2;
      const mx = tx, my = Math.min(hero.y - 130, Math.max(ty - 260, vTop + vh * 0.2 + BH));
      await G.tween(0, 1, rm ? 0.3 : 1.6, k => { lumiPos.x = sx + (mx - sx) * k; lumiPos.y = sy + (my - sy) * k - (rm ? 0 : Math.abs(Math.sin(k * Math.PI * 2)) * BH); placeLumi(); }, 'io');
      let wx = mx, dir = Math.random() < 0.5 ? 1 : -1, ph = 0;
      const offW = rm ? null : G.every(dt => {
        wx += dir * 95 * dt; if (wx > mx + 200) dir = -1; else if (wx < mx - 200) dir = 1;
        ph += dt / BT; const b = Math.abs(Math.sin(ph * Math.PI)), sq = b < 0.12 ? 1 - (0.12 - b) * 1.2 : 1;   // 바닥에 닿을 때 살짝 납작
        lumiPos.x = wx; lumiPos.y = my - b * BH;
        lumi.style.transform = `translate(${lumiPos.x.toFixed(1)}px,${lumiPos.y.toFixed(1)}px) scale(${(2 - sq).toFixed(3)},${sq.toFixed(3)})`;
      });
      lumi.classList.add('lumi-catch'); lumi.tabIndex = 0; lumi.setAttribute('role', 'button'); lumi.setAttribute('aria-label', '루미 받아 주기');
      const say = G.hud.say('S01_nar_10');
      await new Promise((done) => {
        let end = false; const fin = () => { if (end) return; end = true; clearTimeout(t); lumi.removeEventListener('click', tap); lumi.removeEventListener('keydown', key); done(); };
        const tap = (e) => { if (G.paused) return; e.stopPropagation(); fin(); };
        const key = (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); fin(); } };
        const t = setTimeout(fin, 30000);
        lumi.addEventListener('click', tap); lumi.addEventListener('keydown', key);
      });
      if (offW) offW();
      lumi.classList.remove('lumi-catch'); lumi.removeAttribute('tabindex'); lumi.removeAttribute('role');
      G.audio.sfx('sfx_chime', 0.6); void say;
      sx = lumiPos.x; sy = lumiPos.y; placeLumi();
    }
    await G.tween(0, 1, G.reduced() ? 0.3 : 2.2, k => {
      lumiPos.x = sx + (tx - sx) * k; lumiPos.y = sy + (ty - sy) * k - Math.sin(k * Math.PI) * 160; placeLumi();
    }, 'io');
    if (offT) { offT(); tr.end(); }
    Mp.lumiFree = false;
  };

  // ---- 10/9 선생님: 주민을 누르면 주인공이 지도 길을 따라 그 앞까지 걸어감 (걸음 빠르기는 장소 걷기와 같음, 빠르게 모드·움직임 줄이기면 바로 옆에 섬) ----
  function offNode() { const n = G.D.places.nodes[Mp.node(G.st.place)]; return !!(hero && n && Math.hypot(hero.x - n[0], hero.y - n[1]) > 3); }
  function walkToVillager(w) {
    if (!hero || !V) return Promise.resolve();
    const N = G.D.places.nodes, n0 = Mp.node(G.st.place), off = offNode(), goal = [w.x, w.y];
    const len = (q) => { let s = 0; for (let i = 1; i < q.length; i++) s += Math.hypot(q[i][0] - q[i - 1][0], q[i][1] - q[i - 1][1]); return s; };
    const proj = (pt) => { let b = null; for (const [a, c] of G.D.places.edges) { const A = N[a], C = N[c]; if (!A || !C) continue; const dx = C[0] - A[0], dy = C[1] - A[1], L2 = dx * dx + dy * dy || 1, t = Math.max(0, Math.min(1, ((pt[0] - A[0]) * dx + (pt[1] - A[1]) * dy) / L2)), p = [A[0] + dx * t, A[1] + dy * t], dd = Math.hypot(pt[0] - p[0], pt[1] - p[1]); if (!b || dd < b.dd) b = { a, c, p, dd }; } return b; };
    const gp = proj(goal), hp = off ? proj([hero.x, hero.y]) : null, H = [hero.x, hero.y];
    const starts = off ? (hp ? [hp.a, hp.c].map(nm => ({ nm, q: [H, hp.p, N[nm]] })) : [{ nm: n0, q: [H, N[n0]] }]) : [{ nm: n0, q: [H] }];
    const cands = [];
    for (const s of starts) for (const e of (gp ? [gp.a, gp.c] : [n0])) cands.push([...s.q, ...G.mapPath(s.nm, e).map(k => N[k]), ...(gp ? [gp.p] : []), goal]);
    if (off && hp && gp && ((hp.a === gp.a && hp.c === gp.c))) cands.push([H, hp.p, gp.p, goal]);   // 같은 길 위
    let q = cands.reduce((b, c) => (!b || len(c) < len(b)) ? c : b, null) || [H, goal];
    q = q.filter((p, i) => i === 0 || Math.hypot(p[0] - q[i - 1][0], p[1] - q[i - 1][1]) > 1);
    // 주민 바로 앞에서 멈춤
    const STOP = 70; let total = len(q);
    if (total <= STOP + 10) { hero.face(goal[0] - hero.x, goal[1] - hero.y); hero.frame = 8; hero.draw(); return Promise.resolve(); }
    let keep = total - STOP; const pts = [q[0]];
    for (let i = 1; i < q.length; i++) { const a = q[i - 1], b = q[i], L = Math.hypot(b[0] - a[0], b[1] - a[1]); if (keep <= L) { const k = keep / L; pts.push([a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k]); break; } keep -= L; pts.push(b); }
    total = len(pts);
    Mp.userCam = false; clearHint(); clearEnter();
    const W = G.D.places.walk, dur = Math.max(0.3, Math.min(W.maxSec, total / W.speed)), speed = total / dur, g = G.gen;
    const fin = () => { const e = pts[pts.length - 1]; hero.set(e[0], e[1]); hero.face(goal[0] - e[0], goal[1] - e[1]); hero.frame = 8; hero.draw(); };
    if (G.fast() || G.reduced()) { fin(); return Promise.resolve(); }
    G.busy++; walking = { skip: false };
    return new Promise(res => {
      let seg = 1, d = 0, dd = 0, t = 0, stepT = 0, stepN = 0;
      const done = () => { off2(); if (g === G.gen && hero) fin(); walking = null; G.busy = Math.max(0, G.busy - 1); res(); };
      const off2 = G.every(dt => {
        if (!walking || !V || g !== G.gen) { off2(); G.busy = Math.max(0, G.busy - 1); res(); return; }
        t += dt; const e = G.walkEase(t, total - dd); d += speed * dt * e; dd += speed * dt * e; stepT += dt;
        while (seg < pts.length) {
          const a = pts[seg - 1], b = pts[seg], L = Math.hypot(b[0] - a[0], b[1] - a[1]);
          if (d <= L) { const k = d / L; hero.set(a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k); hero.face(b[0] - a[0], b[1] - a[1]); break; }
          d -= L; seg++;
        }
        if (seg >= pts.length) { done(); return; }
        hero.frame = Math.floor(t * 10) % 8; hero.draw();
        if (stepT > 0.4) { stepT = 0; stepSfx(stepN++); }
      });
      offs.push(off2);
    });
  }

  // 10/10 A3: 발소리는 주인공이 있는 쪽(좌우)에서, 풀밭이면 부드럽게
  function stepSfx(n) { const f = V && V.stepFx ? V.stepFx(hero) : null; G.audio.sfx(n % 2 ? 'sfx_step2' : 'sfx_step1', 0.35 * (f ? f.vol : 1), f ? 0.92 + Math.random() * 0.16 : 1, f); }

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
      const id0 = stage >= 5 ? d.line.replace(/_a$/, '_b') : d.line;
      const ids = (G.p4 && G.p4.villagerLines && G.p4.villagerLines(d.id, id0, !!(gift && G.p4.villagerHas(d.id)))) || [id0];   // 10/6 소리의 별: 주인공이 먼저 묻고 주민이 줌
      const id = ids[ids.length - 1]; const L = G.D.dialogues[id]; if (!L) return;
      bub = true; v.pause = 1e9; w.frame = 8; w.draw();
      const g0 = G.gen; await walkToVillager(w); bub = null;   // 10/9 선생님: 주인공이 주민 앞까지 걸어간 뒤 대화
      if (!V || g0 !== G.gen) return;
      v.pause = 0; v.pause = Math.max(v.pause, 5); w.frame = 8; w.face(hero.x - w.x, hero.y - w.y); w.draw();
      if (G.D.portraits[d.id] && !G.dialog.active) {   // 10/1 선생님 배경 주민 일러스트: 대화창에 얼굴과 함께
        bub = true; v.pause = 1e9; await G.dialog.play(ids, { partner: d.id });
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
      // 10/10 A2: 주인공이 가까이 오면 걸음을 멈추고 돌아보며 고개를 끄덕 (움직임 줄이기면 안 함)
      if (hero && !bub && !G.reduced() && !(G.settings && G.settings.light)) {
        const dh = Math.hypot(hero.x - w.x, hero.y - w.y);
        if (dh < 170 && !v.greet) { v.greet = true; w.greet = performance.now() + 150; v.pause = Math.max(v.pause, 1.6); }
        else if (dh > 260) v.greet = false;
        if (v.greet && v.pause > 0) w.face(hero.x - w.x, hero.y - w.y);
      }
      if (v.pause > 0) {
        v.pause -= dt; w.frame = 8;
        if (stage === 0 && !bub && !v.greet) { v.look += dt; if (v.look > 0.9) { v.look = 0; const ds = ['SE', 'SW', 'NE', 'NW']; w.dir = ds[(ds.indexOf(w.dir) + 1) % 4]; } }
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
// 10/4 선생님(미루 다리가 사라짐): 인물 그림이 자리 칸보다 키가 크면(발이 잘리지 않게 위로 늘린 그림) 폭과 발 자리는 그대로 두고 위로 키움
G.tallDh = (img, r) => Math.max(0, (parseFloat(img.style.height) || r[3]) - r[3]);   // 위로 키운 만큼 (모여 서기 때 발 자리 맞춤)
G.fitTall = (img, r) => { const f = () => { const nw = img.naturalWidth, nh = img.naturalHeight; if (!nw || !nh || nh / nw <= (r[3] / r[2]) * 1.04) return; const h = r[2] * nh / nw; img.style.height = h + 'px'; img.style.top = (parseFloat(img.style.top) + r[3] - h) + 'px'; };
  if (img.complete && img.naturalWidth) f(); else img.addEventListener('load', f, { once: true }); };
// 장면 그림은 2400x1080: 가운데 1920 = 16:9, 가운데 1440 = 4:3 핵심 영역 (누를 곳은 모두 여기)
// 프로토타입 2: 누를 곳 하나가 할 일 여러 개를 이어서 할 수 있음 (flow: flows.js, more: 이어지는 할 일),
//   after: 다른 할 일을 끝낸 뒤에 나타나는 누를 곳 (도서관 촉각 지도), randomSfx: 가끔 나는 소리 (도서관 책장 넘기는 소리)
// 프로토타입 3: until: 그 할 일을 끝내면 사라지는 누를 곳, gone: 자기 할 일을 끝내면 인물과 함께 사라짐 (다온이 광장으로 뛰어감),
//   noStar: 할 일 동그라미를 누를 곳 옆에 그리지 않음 (답을 알려 주지 않게), linesAfter: 할 일에 따라 바뀌는 대사,
//   장면 zone: 색 번짐 구역 (두 번째 광장은 광장 구역), 인물 그림 showAfter / awayBetween: 할 일에 따라 보이고 사라짐
// 10/8 넓힌 광장 (그림이 화면보다 큼): cam = 평소 카메라 자리, fest = {until, cam} 잔치 할 일을 마치기 전에는 잔치 마당 쪽,
//   인물·누를 곳의 at2 = {after, rect, glow} 그 할 일을 마치면 옮겨 서는 자리 (잔치가 끝나면 받침대 쪽으로 걸어옴)
'use strict';
// ---- 장면 그림 한 벌 (연출 C2·C7도 같이 씀) ----
G.sceneView = (parent, id, o = {}) => {
  const S = G.D.scenes[id], [W, H] = S.size;
  const V = { W, H, S, cam: { x: W / 2, y: H / 2, z: 1 }, spr: {} };
  const did = (m) => !!(G.st && G.st.done.includes(m));
  V.rectOf = (d) => (d.at2 && did(d.at2.after)) ? d.at2.rect : d.rect;
  V.home = () => (S.fest && !did(S.fest.until)) ? S.fest.cam : (S.cam || [W / 2, H / 2]);
  const el = V.el = G.el('div', 'world', parent); el.style.width = W + 'px'; el.style.height = H + 'px';
  const mono = G.el('img', 'bg', el); mono.src = G.asset(S.image.mono); mono.width = W; mono.height = H; mono.alt = '';
  const col = V.colorImg = G.el('img', 'bg', el); col.src = G.asset(S.image.color); col.width = W; col.height = H; col.alt = ''; col.style.transition = 'opacity .8s';
  V.ready = Promise.all([mono, col].map(i => i.decode ? i.decode().catch(() => { }) : Promise.resolve()));
  V.lamps = (S.lamps || []).map((p, i) => { const g = G.el('div', 'lamp-glow', el); g.style.left = p[0] + 'px'; g.style.top = p[1] + 'px'; g.style.transform = 'scale(1.5)'; return { el: g, from: (S.lampFrom || [])[i] ?? 5 }; });
  V.fx = G.el('div', 'layer', el);
  const addImg = (src, r) => { const i = G.el('img', 'scene-sprite idle', V.fx); i.src = G.asset(src); i.alt = ''; Object.assign(i.style, { left: r[0] + 'px', top: r[1] + 'px', width: r[2] + 'px', height: r[3] + 'px', animationDelay: (-Math.random() * 3).toFixed(2) + 's' }); G.fitTall(i, r); return i; };
  for (const sp of S.sprites) {
    const r0 = V.rectOf(sp), v = V.spr[sp.id] = { img: addImg(sp.img, r0), def: sp, rect: r0 };
    if (sp.flat) v.img.classList.remove('idle');
    if (sp.back) { v.back = addImg(sp.back.img, sp.back.rect); v.back.style.transition = v.img.style.transition = 'opacity .5s'; }
    if (sp.lumi) {
      const l = V.lumi = G.el('div', 'scene-sprite', V.fx); const li = G.el('img', '', l); li.src = G.asset('assets/chars/lumi.png'); li.alt = '';
      V.lumiOff = [sp.lumi[0] - sp.rect[0], sp.lumi[1] - sp.rect[1]]; V.lumiAt = [r0[0] + V.lumiOff[0], r0[1] + V.lumiOff[1]];
      Object.assign(l.style, { left: (V.lumiAt[0] - 55) + 'px', top: (V.lumiAt[1] - 55) + 'px', width: '110px', height: '110px' });
      li.style.cssText = 'width:100%;height:100%;animation:bob 2.4s ease-in-out infinite';
    }
  }
  // 10/10 선생님: 장면 속 픽셀 인물도 숨쉬기·눈 깜빡임 (gen_scene_live.py가 만든 <그림>_b·_k·_bk.png, 목록 data/scene_live.json). 움직임 줄이기면 멈춤
  const LV = G.D.sceneLive || {}, lives = [];
  const liveOf = (img, src) => { if (!LV[src]) return; const fr = [src, ...['_b', '_k', '_bk'].map(s => src.replace(/\.png$/, s + '.png'))].map(G.asset);
    fr.slice(1).forEach(u => { new Image().src = u; }); img.classList.remove('idle');
    lives.push({ img, fr, ph: Math.random() * 2600, nb: performance.now() + 1500 + Math.random() * 3000, bu: 0, cur: 0 }); };
  for (const k in V.spr) { const v = V.spr[k]; liveOf(v.img, v.def.img); if (v.back) liveOf(v.back, v.def.back.img); }
  if (lives.length) { let seen = false; const tick = setInterval(() => {
    if (!el.isConnected) { if (seen) clearInterval(tick); return; } seen = true;
    const now = performance.now(), rm = G.reduced();
    for (const L of lives) { let i = 0;
      if (!rm) { if (now > L.nb) { L.bu = now + 120; L.nb = now + (Math.random() < 0.25 ? 260 : 2000 + Math.random() * 3000); } i = ((now + L.ph) % 2600 < 1100 ? 1 : 0) + (now < L.bu ? 2 : 0); }
      if (i !== L.cur) { L.cur = i; L.img.src = L.fr[i]; } } }, 100); }
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
  V.setCam(V.home()[0], V.home()[1], 1);
  // 인물 그림을 새 자리로 걸어가게 (발 자리 기준, 위로 키운 그림도 맞춤)
  V.walk = (k, rect, d) => {
    const v = V.spr[k]; if (!v) return Promise.resolve(); const a = v.rect, dh = G.tallDh(v.img, a), dh2 = Math.max(0, (parseFloat(v.img.style.height) || a[3]) - rect[3]);
    const lu = k === 'hero' && V.lumi ? V.lumi : null;
    const set = (t) => { const x = a[0] + (rect[0] - a[0]) * t, y = a[1] - dh + (rect[1] - dh2 - a[1] + dh) * t; v.img.style.left = x + 'px'; v.img.style.top = y + 'px';
      if (lu) { lu.style.left = (x + V.lumiOff[0] - 55) + 'px'; lu.style.top = (y + dh + V.lumiOff[1] - 55) + 'px'; } };
    v.rect = rect; if (lu) V.lumiAt = [rect[0] + V.lumiOff[0], rect[1] + V.lumiOff[1]];
    if (G.reduced() || !d) { set(1); return Promise.resolve(); }
    return G.tween(0, 1, d, set, 'io');
  };
  // 10/8 선생님: 잔치 뒤 픽셀 걷기 그림으로 광장 길(at2.walk.path, 발 자리 점들)을 따라 걸어가 자리 잡기
  const liveSheet = (src) => { const m = /\/walk_([^/]+)\.png$/.exec(src); return m && Object.values(LV).includes(m[1]) ? src.replace(/\.png$/, '_live.png') : src; };   // 10/10: 16자세 부드러운 걸음 그림
  const sheets = {};   // 걷기 그림 미리 불러 둠 (처음 걷는 사람이 깜빡 사라지지 않게)
  V.sheet = (src) => { if (!sheets[src]) { const im = new Image(); im.src = G.asset(src); sheets[src] = im; } return sheets[src]; };
  for (const sp of (S.sprites || [])) if (sp.at2 && sp.at2.walk && sp.at2.walk.sheet) V.sheet(liveSheet(sp.at2.walk.sheet));
  for (const w of Object.values(S.gatherWalk || {})) if (w && w.sheet) V.sheet(liveSheet(w.sheet));
  V.walkPath = (k, rect, w, d) => {
    const v = V.spr[k]; if (!v || !w || !w.path || w.path.length < 2) return V.walk(k, rect, d);
    if (G.reduced() || !d) return V.walk(k, rect, 0);
    d = Math.max(w.minD ?? 3, d - (w.delay || 0));   // 늦게 출발한 사람은 조금 빨리 걸어 다 같이 자리 잡음
    const r0 = v.rect, c0 = [r0[0] + r0[2] / 2, r0[1] + r0[3] - 18], P = Math.hypot(c0[0] - w.path[0][0], c0[1] - w.path[0][1]) > 30 ? [c0, ...w.path] : w.path;   // 10/9: 인물 옆에 가 있던 주인공은 지금 자리에서 출발
    const kk = w.k, cw = 200 * kk, ch = 260 * kk, lu = k === 'hero' && V.lumi ? V.lumi : null;
    const sheet = liveSheet(w.sheet), lv = sheet !== w.sheet;
    const seg = []; let L = 0; for (let i = 1; i < P.length; i++) { const l = Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]); seg.push(l); L += l; }
    const el = G.el('div', 'scene-walker', V.fx);
    Object.assign(el.style, { position: 'absolute', width: cw + 'px', height: ch + 'px', backgroundImage: `url("${G.asset(sheet)}")`, backgroundSize: `${(lv ? 4200 : 1800) * kk}px ${1040 * kk}px`, imageRendering: 'pixelated', pointerEvents: 'none', display: 'none' });
    const at = (s) => { let i = 0; while (i < seg.length - 1 && s > seg[i]) { s -= seg[i]; i++; } const t = seg[i] ? Math.min(1, s / seg[i]) : 1; return [P[i][0] + (P[i + 1][0] - P[i][0]) * t, P[i][1] + (P[i + 1][1] - P[i][1]) * t]; };
    const ROW = { SE: 0, SW: 1, NW: 2, NE: 3 }, fps = Math.min(14, 4 + (L / d) * 0.03); let dir = 'SE', t0 = 0;   // 걸음 빠르기는 지도 걷기와 같은 식
    const put = (x, y, f) => { el.style.left = (x - w.fx * kk) + 'px'; el.style.top = (y + w.foot - w.fy * kk) + 'px'; el.style.zIndex = Math.round(y / 10);
      el.style.backgroundPosition = `${-f * cw}px ${-ROW[dir] * ch}px`;
      if (lu) { lu.style.left = (x - rect[2] / 2 + V.lumiOff[0] - 55) + 'px'; lu.style.top = (y + 18 - rect[3] + V.lumiOff[1] - 55) + 'px'; } };
    const hide = (on) => { v.img.style.visibility = on ? 'hidden' : ''; if (v.back) v.back.style.visibility = on ? 'hidden' : ''; };
    // 10/8 선생님: 걷기 그림이 다 불러지기 전에 서 있는 그림을 숨기면 잠깐 사라져 보임 → 그림이 준비된 뒤 바꿈
    const im = V.sheet(sheet);
    return Promise.all([G.wait(w.delay || 0), im.decode ? im.decode().catch(() => {}) : null]).then(() => { if (!V.spr[k]) return; put(P[0][0], P[0][1], lv ? 16 : 8); el.style.display = ''; hide(true);
      return G.tween(0, 1, d, (q) => { const s = q * L, p = at(s), a = at(Math.min(L, s + 40)), dx = a[0] - p[0], dy = a[1] - p[1];   // 앞쪽 40px를 보고 방향을 정해 자주 뒤집히지 않게
        if (Math.hypot(dx, dy) > 4) dir = (dy >= 0 || w.front) ? (dx >= 0 ? 'SE' : 'SW') : (dx >= 0 ? 'NE' : 'NW');   // front: 뒷모습 칸이 없는 사람(해솔)
        t0 = q * d; put(p[0], p[1], q >= 1 ? (lv ? 16 : 8) : lv ? Math.floor(t0 * fps * 2) % 16 : Math.floor(t0 * fps) % 8); }, 'lin'); })
      .then(() => { V.walk(k, rect, 0); el.remove(); hide(false); });
  };
  // 10/8 선생님: 별 올리러 받침대 둘레로 모일 때도 픽셀 걷기 (길은 장면 데이터 gatherWalk, 없으면 예전처럼 미끄러져 감)
  V.gather = (GA, d) => {
    const gd = S.gatherDelta || [0, 0], GW = S.gatherWalk || {};
    return Promise.all(Object.entries(GA).map(([k, to]) => { const sp = V.spr[k]; if (!sp || sp.img.style.display === 'none') return null;
      const r = sp.rect || sp.def.rect, r1 = [to[0] + gd[0], to[1] + gd[1], r[2], r[3]];
      return GW[k] ? V.walkPath(k, r1, GW[k], d) : V.walk(k, r1, G.reduced() ? 0 : 1.6); }));
  };
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
    busy = false;   // 10/6 선생님: 대화 도중 ESC 다시 하기 → 끝나지 않은 흐름이 busy를 남겨 장면 누르기·[지도로]가 막혔음
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
      const [x, y, w, hh] = h.rect || h.def.rect, W = Math.max(w, min), HH = Math.max(hh, min);
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
      const moved = h.at2 && G.st.done.includes(h.at2.after), hr = moved ? h.at2.rect : h.rect, hg = moved ? h.at2.glow : h.glow;
      Object.assign(glow.style, { left: hg[0] + 'px', top: hg[1] + 'px', width: hg[2] + 'px', height: hg[3] + 'px' }); G.fitTall(glow, hg);
      if (G.st.seen.includes(id + ':' + h.id)) glow.classList.add('seen');
      if (h.cls) glow.classList.add(h.cls);   // 10/1: 물건 그림 자체를 보여 주는 누를 곳 (편지)
      let star = null;
      if (h.mission && !h.noStar) {
        star = G.el('div', 'mstar', V.fx); star.style.left = (hr[0] + hr[2] / 2) + 'px'; star.style.top = (hr[1] - 6) + 'px';
        setStar(star, allDone(h));
      }
      const btn = G.el('button', 'hot', V.fx); btn.type = 'button'; btn.setAttribute('aria-label', h.label);
      btn.style.zIndex = h.z || (h.mission ? 20 : 10);
      const H = { def: h, glow, star, btn, rect: hr };
      G.onTap(btn, () => tapHot(H));
      hots.push(H);
      showHot(H, shown(h));
      if (h.hideLv && G.lv('normal') && !G.st.seen.includes(id + ':' + h.id)) glow.classList.add('hide');   // 보통부터: 반짝이지 않아 찾아야 함
      if (h.twinkle && !(h.twinkleLv && G.lv(h.twinkleLv))) { H.tw = G.el('div', 'twinkle p3tw', V.fx, G.sparkle()); Object.assign(H.tw.style, { left: (hr[0] + hr[2] / 2) + 'px', top: (hr[1] + hr[3] / 2) + 'px' }); showHot(H, shown(h)); }
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
    if (V && S.fest && m === S.fest.until) festMove(m);
    return true;
  }
  // 10/8 선생님: 잔치는 잔치 마당에서, 별 올리기는 받침대 앞에서. 잔치를 마치면 카메라가 받침대 쪽으로 가고 인물들이 걸어옴
  async function festMove(m) {
    const v0 = V, c0 = { ...V.cam }, to = S.cam || [V.W / 2, V.H / 2], rm = G.reduced(), d = rm ? 0 : 5;   // 10/8 선생님: 5초쯤 걸어가 자리 잡기
    const hs = hots.filter(H => H.def.at2 && H.def.at2.after === m);
    G.busy = (G.busy || 0) + 1;
    hs.forEach(H => { H.glow.style.visibility = 'hidden'; if (H.star) H.star.style.visibility = 'hidden'; });
    const walks = S.sprites.filter(sp => sp.at2 && sp.at2.after === m).map(sp => V.walkPath(sp.id, sp.at2.rect, sp.at2.walk, d));
    const pan = rm ? (V.setCam(to[0], to[1], 1), Promise.resolve()) : G.tween(0, 1, d, k => { if (V === v0) V.setCam(c0.x + (to[0] - c0.x) * k, c0.y + (to[1] - c0.y) * k, c0.z + (1 - c0.z) * k); }, 'io');
    await Promise.all([pan, ...walks]);
    G.busy--;
    if (V !== v0) return;
    for (const H of hs) {
      const r = H.def.at2.rect, gl = H.def.at2.glow; H.rect = r;
      Object.assign(H.glow.style, { left: gl[0] + 'px', top: gl[1] + 'px', width: gl[2] + 'px', height: gl[3] + 'px', visibility: '' }); G.fitTall(H.glow, gl);
      if (H.star) Object.assign(H.star.style, { left: (r[0] + r[2] / 2) + 'px', top: (r[1] - 6) + 'px', visibility: '' });
    }
    sizeHots();
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
    if (h.id !== 'hero' && G.D.portraits[h.id] && V.spr[h.id]) { await heroToNpc(h.id); if (g !== G.gen || !V) { busy = false; return; } }   // 10/9 선생님: 인물 앞까지 걸어간 뒤 대화
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
  // 10/9 선생님: 인물을 누르면 주인공이 그 옆까지 픽셀 걸음으로 걸어감 (장면 걷기와 같은 빠르기, 빠르게 모드·움직임 줄이기면 바로 옆에 섬)
  function heroToNpc(id) {
    const hs = V.spr.hero, ns = V.spr[id];
    if (!hs || !ns || hs.img.style.display === 'none' || ns.img.style.display === 'none') return Promise.resolve();
    const a = hs.rect, b = ns.rect, foot = (r) => [r[0] + r[2] / 2, r[1] + r[3] - 18], fa = foot(a), fb = foot(b), side = fa[0] <= fb[0] ? -1 : 1;
    const to = [Math.max(a[2] / 2, Math.min(V.W - a[2] / 2, fb[0] + side * (a[2] / 2 + b[2] / 2 - 50))), fb[1]], L = Math.hypot(to[0] - fa[0], to[1] - fa[1]);
    if (L < 40) return Promise.resolve();
    const r = [to[0] - a[2] / 2, to[1] + 18 - a[3], a[2], a[3]], d = G.fast() ? 0 : Math.min(4, Math.max(0.4, L / 300));
    return V.walkPath('hero', r, { sheet: 'assets/chars/walk_hero.png', k: 1, fx: 100, fy: 212, foot: 14, minD: 0, path: [fa, to] }, d);
  }
  function popStar(el) { el.animate && el.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.8)' }, { transform: 'scale(1)' }], { duration: 700, easing: 'ease-out' }); }

  function showCloseup(kind) {
    const cu = G.$('#closeup'); cu.innerHTML = '';
    closeup = G.el('div', 'closeup', cu);
    if (kind === 'braille_book') {   // 해솔의 점자책 한 쪽: 확정된 점자 낱말 (별 / 축제)
      const bk = G.el('div', 'book-big' + (G.art('book_open') ? ' art' : ''), closeup), pg = G.el('div', 'book-page', bk);
      if (G.art('book_open')) bk.style.backgroundImage = `url("${G.art('book_open')}")`;
      for (const c of G.D.puzzles.braille1.book) G.el('div', 'book-line', pg, G.braille.svg(c, 30, { emboss: !!G.art('book_open') }));
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
        const t = target(); if (!t || arrowEl || !V) return; const r = t.rect || t.def.rect;
        arrowEl = G.el('div', 'arrow', V.fx, G.arrowHtml());
        Object.assign(arrowEl.style, { left: (r[0] + r[2] / 2) + 'px', top: (r[1] - 40) + 'px', zIndex: 30 });
      },
      l3: () => {
        const t = target(); if (!t || !V) return;
        t.glow.classList.remove('seen', 'hide'); t.glow.classList.add('strong');
        if (trailEl) return;
        const a = V.lumiAt || [1200, 800], r = t.rect || t.def.rect, b = [r[0] + r[2] / 2, r[1] + r[3] * 0.75];
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


  // ---- 도서관: 해솔 사서 (점자책 보여 주기 → 주인공 질문 버튼) ----
  F.library_haesol = async ({ complete, closeup, hideCloseup, g }) => {
    const ok = () => g === G.gen;
    G.dialog.onLine = (lid) => { if (lid === 'S05_haesol_03') closeup('braille_book'); if (lid === 'S05_rumi_02') hideCloseup(); };
    await G.dialog.play(['S05_haesol_01', 'S05_haesol_02', 'S05_haesol_03', 'S05_rumi_01', 'S05_rumi_02']   /* 10/8 작가: 두 번째 '어서 와'(S05_haesol_04) 뺌 */, { partner: 'haesol', keep: true });
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
  const NAME = { daon: '다온', haesol: '해솔', post: '이음 아저씨', chief: '촌장' };   // 10/6 선생님이 정한 이름
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
    // 10/9 수정안 3단계: 두 사람 모드는 카드를 두 묶음으로 나눔 (친구 1: 큰 글씨·그림, 친구 2: 점자·소리)
    const duo = !!(G.settings && G.settings.duo) && !view, grp = {};
    if (duo) { tray.classList.add('duo'); for (const [k, t] of [[1, '친구 1'], [2, '친구 2']]) { const e = G.el('div', 'pz2-grp', tray); G.el('div', 'pz2-grp-head', e, t); grp[k] = e; } }
    for (const c of D.cards) {
      const b = G.el('button', 'pz2-card' + (G.art('card_blank') ? ' art' : ''), duo ? grp[c.id === 'big' || c.id === 'pic' ? 1 : 2] : tray); b.type = 'button'; b.setAttribute('aria-label', c.label + ' 카드');
      if (G.art('card_blank')) b.style.backgroundImage = `url("${G.art('card_blank')}")`;
      const f = cardFace[c.id]; G.el('div', 'pz2-card-pic', b, typeof f === 'function' ? f() : f);
      G.el('div', 'pz2-card-label', b, c.label);
      if (!G.lv('normal')) G.onTap(b, () => attach(c));   // 10/7 선생님: 카드는 끌어다 붙이기만 (쉽게 단계만 누르기도)
      if (G.p4) G.p4.dragTo(b, () => [board], () => { if (!b.classList.contains('used')) attach(c); });
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
    // 10/6 선생님: 나뭇잎 아이템은 쓸 데가 없어 주지 않음
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
    // 10/7 선생님: 고르기 대신, 가방에서 끌어다 그 자리에 놓아 세움
    G.dialog.close();
    const put = await p3DragInstall(V, S, ['pole', 'blocks'], opts); if (!ok() || !put) return;
    await G.cut.play('C10', { live: { V, S } }); if (!ok()) return;
    const blocks = V.spr.blocks && V.spr.blocks.img;
    G.dialog.onLine = (id) => { if (blocks) blocks.classList.toggle('shine', id === 'S10_haesol_04' || id === 'S10_haesol_05'); };
    await G.dialog.play(['S10_haesol_03', 'S10_haesol_04', 'S10_haesol_05'], { partner: 'haesol', keep: true });
    G.dialog.onLine = null; if (blocks) blocks.classList.remove('shine'); if (!ok()) return;
    await G.dialog.play(['S10_post_03'], { partner: 'post' }); if (!ok()) return;
    await p3WalkAway(V, S); if (!ok()) return;
    if (!await G.p4.askHelp(V, 'haesol', 'S10_ply_02')) return;   // 10/9 수정안: 돕기 전에 먼저 묻기, 거절도 괜찮다
    await G.dialog.play(['S10_haesol_06', 'S10_haesol_07'], { partner: 'haesol' }); if (!ok()) return;
    G.st.env.guide = true;
    complete('plaza2_road');
  },
  // 할 일 3 (1): 게시판 함께 보기 → 주민이 모두 모임 → 가방 속 빛을 잃은 별이 반짝 → 별 받침대가 열림
  // 10/6 선생님: auto면 게시판 다시 보기 없이, 길 깔기가 끝나면 화면이 잠깐 어두워졌다가 모두 모인 모습으로
  async plaza2_look({ V, complete, g, auto }) {
    const ok = () => g === G.gen;
    let dark = null;
    if (auto) {
      dark = G.el('div', '', document.body); Object.assign(dark.style, { position: 'fixed', inset: '0', background: '#0d1024', opacity: '0', zIndex: '9000', pointerEvents: 'auto', transition: 'opacity .7s ease' });
      requestAnimationFrame(() => { dark.style.opacity = '1'; }); await G.wait(1.0); if (!ok()) { dark.remove(); return; }
    } else {
      await G.dialog.play(['S11_rumi_04']); if (!ok()) return;
      await G.puzzle2.play({ look: true }); if (!ok()) return;
    }
    const post = V && V.spr.post;   // 도서관에 다녀온 우편배달부도 돌아옴
    if (post) { post.img.style.display = ''; if (!dark && post.img.animate) post.img.animate([{ opacity: 0, transform: 'translateY(-30px)' }, { opacity: 1, transform: 'none' }], { duration: 600 }); }
    if (dark) { await G.wait(0.5); dark.style.opacity = '0'; await G.wait(0.75); dark.remove(); if (!ok()) return; }
    if (V) for (const k of ['chief', 'post', 'daon', 'haesol']) { const s = V.spr[k]; if (s && s.img.animate) s.img.animate([{ transform: 'translateY(0)' }, { transform: 'translateY(-14px)' }, { transform: 'translateY(0)' }], { duration: 500, delay: 150 * ['chief', 'post', 'daon', 'haesol'].indexOf(k) }); }
    await G.dialog.play(['S09_rumi_04'], { partner: 'chief', keep: true }); if (!ok()) return;   // 10/8 검토: 같은 뜻 S09_chief_02 뺌
    G.dialog.close();
    if (!await G.p4.daonGuide('road', 'S11_daon_10', 'S11_daon_11')) return;   // 10/9 수정안 3단계: 다온의 쉬운 안내판
    // C1 (10/5): 찾은 방법을 하나씩 별에게 돌려줌
    if (!await G.starCard('road', [{ text: '가', label: '큰 글씨' }, { art: 'board_picture', label: '그림' }, { art: 'opt_bell', label: '소리 기둥' }, { art: 'braille_plate', label: '점자' }])) return;
    G.audio.sfx('sfx_sparkle', 0.8);   // 10/6 선생님: 잠깐 나왔다 사라지는 은색 별 그림(p3GlowPiece)은 뺌
    await G.dialog.play(['S11_rumi_05']); if (!ok()) return;
    complete('plaza2_look');
    await G.dialog.play(['S11_rumi_01']);
  },
  // 할 일 3 (2): 별 받침대 → C11 → 별 얻기 (퀘스트 5/5)
  async plaza2_star({ V, S, complete, g }) {
    const ok = () => g === G.gen;
    await G.cut.play('C11', { live: { V, S } }); if (!ok()) return;
    await G.dialog.play(['S11_rumi_02']); if (!ok()) return;
    if (!await G.p4.beforeAfter('board_before', 'board_after', 'S11_rumi_10')) return;   // 10/9 수정안 3단계: 셋째 교훈은 전과 후 그림으로. 10/7 길의 별 줄이기: S11_rumi_03 줄 뺌
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

// 10/7 선생님: 안내 기둥과 노란 길은 가방에서 끌어다 그 자리에 놓아 세움 (쉽게 단계는 그 자리를 눌러도 됨)
function p3DragInstall(V, S, keys, opts) {
  return new Promise((res) => {
    const g = G.gen, ok = () => g === G.gen;
    const tray = G.el('div', 'p4-tray', S.root);
    G.el('div', 'p4-tray-head', tray, G.icon('icon_bag') + ' 가방');
    const spot = {}, btn = {};
    let busy = false, n = keys.length;
    const rectOf = (k) => k === 'pole' ? [S.pole[0] - 80, S.pole[1] - 210, 160, 230] : (V.spr[k] ? V.spr[k].def.rect : [S.pole[0] - 300, S.pole[1] - 120, 300, 160]);
    const done = async (k) => {
      if (busy || !btn[k]) return; busy = true;
      btn[k].remove(); btn[k] = null; spot[k].remove();
      await p3Install(V, k); busy = false;
      if (!ok()) return res(false);
      if (--n <= 0) { tray.remove(); res(true); }
    };
    for (const k of keys) {
      const r = rectOf(k);
      const t = G.el('div', 'p4-spot', V.fx); t.setAttribute('aria-label', opts[k].label + ' 놓을 자리');
      Object.assign(t.style, { left: r[0] + 'px', top: r[1] + 'px', width: r[2] + 'px', height: r[3] + 'px' });
      spot[k] = t;
      const b = G.btn('p4-item', G.artImg(opts[k].art) || G.icon(opts[k].icon), tray, () => G.audio.sfx('sfx_tap', 0.5), opts[k].label);
      b.title = opts[k].label;
      btn[k] = b;
      if (!G.lv('normal')) G.onTap(t, () => done(k));   // 쉽게 단계: 자리를 눌러도 됨
      G.p4.dragTo(b, () => keys.filter(q => btn[q]).map(q => spot[q]), (el) => { const q = keys.find(x => spot[x] === el); if (q) done(q); }, { can: () => !busy });
    }
  });
}

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
    if (c.rm) V.setCam(V.home()[0], V.home()[1], 1); else V.setCam(V.home()[0] - 300, V.home()[1] + 20, 1.3);
    c.t0 = G.t;
    await Promise.all([
      U.fadeIn(c, root, 0.5),
      (async () => { if (!c.rm) await c.tween(0, 1, 3.6, k => V.setCam(V.home()[0] - 300 + 300 * k, V.home()[1] + 20 - 20 * k, 1.3 - 0.3 * k), 'io'); })(),
      (async () => { await c.until(0.4); c.sfx('sfx_wind', 0.8); if (!c.skipped && !c.light) { G.leafPuff(V, [700, 500], 5); G.leafPuff(V, S.wind, 5); } })(),
      (async () => { await c.until(2.0); if (!c.skipped) { const [x, y] = V.toScreen(S.wind[0] + 40, S.wind[1] - 150); G.waveMark(root, x, y, 2); } })(),
      (async () => { await c.until(2.6); if (c.skipped || c.light) return;
        for (let i = 0; i < 8; i++) { const f = G.el('div', 'firefly rise' + (G.art('firefly') ? ' art' : ''), root, G.artImg('firefly') || ''); Object.assign(f.style, { left: (G.stage.W * (0.2 + Math.random() * 0.6)) + 'px', top: (G.stage.H * (0.6 + Math.random() * 0.3)) + 'px' });
          c.tween(0, 1, 3 + Math.random(), k => { f.style.transform = `translateY(${-G.stage.H * 0.4 * k}px)`; f.style.opacity = Math.sin(k * Math.PI); }, 'lin').then(() => f.remove()); } })(),
      U.title(c, root, '숲 입구', 'S92_place_forest', 4.2, 6.9),
    ]);
    V.setCam(V.home()[0], V.home()[1], 1); off();
  },
  // ---- C6 광장(두 번째) 도착 (6초): 주민들이 게시판 앞에 모여 있음 → 머리 위에 물음표가 하나씩 → 다온이 뛰어옴 ----
  async C6(c, root, opts) {
    const U = G.cut.util, { V, off } = await U.arrive(c, root, opts, 'plaza2');
    if (c.rm) V.setCam(V.home()[0], V.home()[1], 1); else V.setCam(V.home()[0] + 150, V.home()[1] + 100, 1.3);
    c.t0 = G.t;
    const marks = [];
    await Promise.all([
      U.fadeIn(c, root, 0.5),
      (async () => { if (!c.rm) await c.tween(0, 1, 3.4, k => V.setCam(V.home()[0] + 150 - 150 * k, V.home()[1] + 100 - 100 * k, 1.3 - 0.3 * k), 'io'); })(),
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
    V.setCam(V.home()[0], V.home()[1], 1); off();
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
    // 10/4 선생님: 별을 올릴 때는 촌장과 이 별 이야기의 인물들이 받침대 둘레로 모여 같이 올림 (소리의 별, 말의 별과 같은 방법)
    // 10/7 길의 별 줄이기: 시장과 봄이 아주머니가 없어져서 봄이 아주머니는 모임에서 뺌
    const GA = { chief: [880, 500], haesol: [1360, 440], daon: [1370, 870], post: [680, 600] };
    V.fx.querySelectorAll('.hot-glow, .mstar').forEach(e => e.style.visibility = 'hidden');   // 옛 자리에 빛 테두리가 남지 않게
    await Promise.race([V.gather(GA, c.skipped ? 0 : 4), c.skipP]);   // 10/8 선생님: 받침대로 올 때도 픽셀 걷기로 광장 길을 따라
    c.voice('S11_nar_01');
    // (가) 빛을 잃은 별과 별빛 조각이 주인공에게서 받침대로 날아감
    const piece = G.el('div', 'c11-item', root, G.icon(G.litIcon('piece'))), light = G.el('div', 'c11-item', root, G.icon('item_light'));
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
    // 10/6 선생님: 별가루를 연료처럼 뿜으며 반짝이는 잔상을 남기고 올라감 (core.js G.riseTrail, 인트로와 같은 효과)
    const tr = G.riseTrail(root, big, star.color), bs = big.offsetWidth || 190 * u;
    const pan = (k) => { const d = H * k; tr.shift(d); if (wl) wl.style.transform = `translateY(${d}px)`; sky.style.transform = `translateY(${d - H}px)`; sky.style.opacity = Math.min(1, k * 2.5); pillar.style.translate = `0 ${d}px`; };
    const fly = (k) => { pan(k); const x = sx0 + (sx1 - sx0) * k, y = sy0 + (sy1 - sy0) * k - Math.sin(k * Math.PI) * 60 * u; big.style.left = x + 'px'; big.style.top = y + 'px'; big.style.transform = `translate(-50%,-50%) scale(${1 - 0.21 * k})`; tr(k, x, y, bs * (1 - 0.21 * k)); };
    if (c.rm) fly(1); else await c.tween(0, 1, 2.4, fly, 'io'); tr.end();
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
    // 10/6 선생님: 다음 별은 하늘에서 깜박이지 않고, 광장 받침대의 빈 자리가 그 별 색으로 깜박임
    const nxt = G.pedestalRow(sky, 1, E.nextStar); nxt.style.opacity = 0;
    await G.cut.util.fadeIn(c, sky, 0.8);
    await Promise.all([
      c.tween(0, 1, 0.8, k => nxt.style.opacity = k),
      (async () => { await c.wait(1.0); await c.voice(E.next); })(),
    ]);
    await c.wait(1.2);
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
  // 10/6 고칠 목록 9: 그 장에서 배운 것을 별에게 돌려준 뒤에는 가방 속 별도 빛나는 별 (길의 별 → 소리의 별 → 말의 별 모두 같은 규칙)
  const LITBY = { piece: 'plaza2_look', piece_sound: 's2plaza_concert', piece_word: 's3plaza_relay' };
  G.litIcon = (id) => { const it = (G.D.items || []).find(x => x.id === id), ic = it ? it.icon : 'item_' + id; return LITBY[id] && G.st && (G.st.done || []).includes(LITBY[id]) ? 'item_' + id + '_lit' : ic; };

  // ---- 퍼즐 화면 틀 (puzzle.js와 같은 모양): 위쪽 할 일 + 루미 말풍선, 왼쪽 아래 [루미] ----
  function screen(cls, task) {
    const root = G.el('div', 'puzzle p4 ' + cls, G.$('#world'));
    const top = G.el('div', 'pz-top', root);
    if (task) { const t = G.el('button', 'quest pz-task', top); t.type = 'button'; const tl = G.el('img', 'pz-tlumi', t); tl.src = G.asset('assets/chars/lumi.png'); tl.alt = ''; G.el('div', 'q2', t, G.txt(task)); G.onTap(t, () => G.audio.voice(task)); }
    const sayEl = G.el('div', 'pz-say', top); sayEl.style.display = 'none';
    placeBg(root);
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
  // 10/9 개선 2: 퍼즐 화면 뒤에 지금 장면 그림을 흐리게 깖 (작게 줄였다 키워 흐림, 새 그림 없음). 못 읽으면 그대로 광장
  const bgCache = {};
  function placeBg(root) {
    const im = [...document.querySelectorAll('#world img.bg')].filter(i => i.complete && i.naturalWidth && getComputedStyle(i).opacity > 0.5).pop();
    if (!im) return;
    try {
      if (!bgCache[im.src]) { const c = document.createElement('canvas'); c.width = 96; c.height = 54; c.getContext('2d').drawImage(im, 0, 0, 96, 54); bgCache[im.src] = c.toDataURL('image/jpeg', 0.8); }
      root.style.setProperty('--bg-plaza', `url("${bgCache[im.src]}")`);
    } catch (_) { }
  }
  // 그림 판 (W x H 판 좌표) → 화면 네모 안에 맞춤
  function board(parent, W, H, cls) {
    const el = G.el('div', 'p4-board ' + (cls || ''), parent); el.style.width = W + 'px'; el.style.height = H + 'px';
    const B = { el, W, H, k: 1, x: 0, y: 0 };
    B.fit = (r, cover) => { if (r.alt && !cover && Math.min(r.alt[2] / W, r.alt[3] / H) > Math.min(r[2] / W, r[3] / H)) r = r.alt; const [x, y, w, h] = r; const k = (cover ? Math.max : Math.min)(w / W, h / H); B.k = k; B.x = x + (w - W * k) / 2; B.y = y + (h - H * k) / 2; el.style.transform = `translate(${B.x.toFixed(1)}px,${B.y.toFixed(1)}px) scale(${k.toFixed(4)})`; };
    B.at = (e) => { const r = el.getBoundingClientRect(); return [(e.clientX - r.left) * W / r.width, (e.clientY - r.top) * H / r.height]; };   // 화면 → 판 좌표
    return B;
  }
  // 할 일 줄 아래, 대화창 위의 빈 곳 (화면 좌표)
  function area(S) {
    const { W, H, u } = G.stage, rr = S.root.getBoundingClientRect();
    const t = S.top.getBoundingClientRect().bottom - rr.top + u * 12, box = G.$('.dlg-box');
    const b = G.dialog.active && box ? rr.bottom - box.getBoundingClientRect().top + u * 16 : u * 30;
    const a = [u * 30, t, W - u * 60, Math.max(60, H - t - b)];
    // 10/9 개선 1: 왼쪽 아래 루미 단추를 판이 덮지 않게, 아래를 비우거나(a) 왼쪽을 비운(alt) 자리 중 판이 더 크게 남는 쪽을 B.fit이 고름
    const lb = !G.dialog.active && S.root.querySelector('.pz-bl .lumi-btn');
    if (lb && lb.offsetParent) { const r = lb.getBoundingClientRect(), top = r.top - rr.top - u * 10, right = r.right - rr.left + u * 14;
      if (top < a[1] + a[3]) { const alt = [right, a[1], W - right - u * 30, a[3]]; a[3] = Math.max(60, top - a[1]); a.alt = alt; } }
    return a;
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
    const ic = G.litIcon(id), lit = ic !== it.icon;   // 10/6 선생님: 받침대로 끌 때는 빛을 찾은 별 (별 1, 2, 3 모두)
    const b = G.btn('p4-item' + (lit ? ' lit' : ''), G.icon(ic), tray, () => { G.audio.sfx('sfx_tap', 0.5); b.classList.add('sel'); target.classList.add('p4-target-on'); }, it.name);
    target.classList.add('p4-target');
    let fin = false, arrow = null;
    // 10/7 선생님: 장치를 쓰는 곳은 끌어다 놓기만. 쉽게 단계에서만 누르기도 남김
    const onT = (e) => { if (fin || G.dialog.active || G.paused) return; e.stopImmediatePropagation(); use(); };
    const tapOk = !G.lv('normal');
    if (tapOk) target.addEventListener('click', onT, true);
    P.dragTo(b, () => [target], () => use());
    const clear = () => { if (arrow) arrow.remove(); arrow = null; b.classList.remove('hint'); target.classList.remove('p4-target-on'); };
    async function use() {
      if (fin) return; fin = true; G.help.off(); clear(); cur = null;
      if (tapOk) target.removeEventListener('click', onT, true); target.classList.remove('p4-target');
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

  // ---- 10/9 수정안 3단계: "도와줄까?" 카드. 처음이면 카드를 받고, 가방에서 인물(who)에게 끌어다 놓으면 주인공이 묻는 말(lineId)을 함.
  //      인물이 화면에 없으면 예전처럼 고르기 단추로 물음. 대답(받아들임·자기 방법·거절)은 부르는 쪽에서 이어서 들려줌 ----
  P.askHelp = async (V, who, lineId) => {
    const g = G.gen, ok = () => g === G.gen;
    if (!has('help')) { G.dialog.close(); await G.present.item('help'); if (!ok()) return false; await G.dialog.play(['S90_rumi_help']); if (!ok()) return false; }
    const v = V && V.spr && V.spr[who], t = v && v.img && v.img.style.display !== 'none' && v.img.isConnected ? v.img : null;
    if (!t) { await G.dialog.choose([{ label: G.txt(lineId), icon: 'icon_good', voice: lineId }], true); return ok(); }
    G.dialog.close(); G.hud.say('S90_hint_help');
    const u = await P.useItem('help', t, { say: (id) => G.hud.say(id), hint: 'S90_hint_help' }); if (!u || !ok()) return false;
    await G.dialog.play([lineId]); return ok();
  };

  // ---- 10/9 수정안 3단계: 모두의 지도. 장소를 끝내면 지도에 접근성 표시가 생기고, 지도를 확대하면 보임. 누르면 한 줄 설명 ----
  //      그림은 선생님 그림 mapmark_<키>가 오면 그림+이름, 없으면 이름만
  const ACC = [
    ['plaza2', 'plaza', [-190, 50], 'block', '점자블록', '발로 느끼는 노란 길이에요. 막대는 계속 가, 점은 멈춰.'],
    ['plaza2', 'library', [-150, 70], 'pole', '소리 안내 기둥', '누르면 소리로 길을 알려 줘요.'],
    ['s2rest', 's2rest', [-150, 60], 'rest', '쉼터', '시끄러울 때 조용히 쉬어 가는 곳이에요.'],
    ['s2hall', 's2hall', [-150, 60], 'lamp', '빛 알림등', '소리 대신 빛으로도 알려 줘요.'],
    ['s3cafe', 's3cafe', [-150, 60], 'menu', '그림 메뉴판', '그림을 보고 고를 수 있어요.'],
    ['s3dock', 's3dock', [-150, 60], 'wave', '손짓 인사', '손으로도 인사할 수 있어요.'],
    ['s4shop', 's4shop', [-150, 60], 'ramp', '경사로', '바퀴도, 무릎이 아픈 사람도 오를 수 있어요.'],
    ['s4flower', 's4flower', [-150, 60], 'button', '낮은 단추', '누구나 손이 닿는 높이예요.'],
    ['s5play', 's5play', [-150, 60], 'turnboard', '그림 차례판', '누구 차례인지, 얼마나 기다리는지 보여요.'],   // 10/10 마음의 별
    ['s5pond', 's5pond', [-150, 60], 'flag', '쉼터 깃발', '힘들면 쉬어 가는 자리예요.'],
  ];
  P.accessMarks = (V) => {
    if (!V || !V.fx || !G.st) return;
    for (const [need, place, [ox, oy], key, name, text] of ACC) {
      if (!(G.st.cleared || []).includes(need) || V.fx.querySelector(`.acc-mark[data-k="${key}"]`)) continue;
      const p = G.D.places.places.find(q => q.id === place); if (!p || !p.marker) continue;
      const b = G.el('button', 'acc-mark', V.fx, (G.artImg('mapmark_' + key) || '') + `<span>${name}</span>`); b.type = 'button'; b.dataset.k = key; b.setAttribute('aria-label', name);
      b.style.left = (p.marker[0] + ox) + 'px'; b.style.top = (p.marker[1] + oy) + 'px';
      b.addEventListener('click', (e) => { e.stopPropagation(); const o = b.querySelector('.acc-tip'); V.fx.querySelectorAll('.acc-tip').forEach(t => t.remove()); if (!o) { G.el('div', 'acc-tip', b, text); G.audio.sfx('sfx_tap', 0.4); } }, true);
    }
  };

  // ---- 10/9 수정안 3단계: 다온의 쉬운 안내판. 그림 쪽지 세 장 가운데 알맞은 하나를 안내판에 끌어다 붙임(쉽게는 눌러도 됨)
  //      다른 그림이면 살짝 흔들리고 다온이 한 번 더 권함(실패음 없음). 그림이 아직 없으면 건너뜀 ----
  const GUIDE = { road: ['guide_books', 'guide_shoe', 'guide_umbrella'], sound: ['guide_rest', 'guide_drum', 'guide_run'], word: ['guide_tea', 'guide_ice', 'guide_ball'], door: ['guide_ramp', 'guide_stairs', 'guide_ladder'], heart: ['guide_turnboard', 'guide_textsign', 'guide_whistle'] };   // 첫째가 알맞은 그림
  const GPLACE = { road: '도서관', sound: '공연장', word: '찻집', door: '꽃집', heart: '놀이터' };
  P.daonGuide = (key, ask, yes) => new Promise(async (res) => {
    const set = GUIDE[key]; if (!set || !set.every(a => G.art(a))) return res(true);
    const g = G.gen, ok = () => g === G.gen, easy = !G.lv('normal');
    await G.dialog.play([ask], { partner: 'daon' }); if (!ok()) return res(false);
    G.dialog.close();
    const S = screen('p4-guide', 'S90_task_guide'), B = board(S.root, 1400, 820, 'p4-gboard');
    const sign = G.el('div', 'p4-gsign', B.el); if (G.art('board_front')) { sign.classList.add('art'); sign.style.borderImageSource = `url("${G.art('board_front')}")`; }
    const slot = G.el('div', 'p4-gslot', sign); if (G.art('slot_frame')) { slot.classList.add('art'); slot.style.backgroundImage = `url("${G.art('slot_frame')}")`; } G.el('div', 'p4-glabel', sign, GPLACE[key] + ' 안내판');
    const dn = G.el('img', 'p4-gdaon', B.el); dn.src = G.asset('assets/scenes/plaza2_daon.png'); dn.alt = '다온';
    let fin = false, arrow = null;
    const notes = shuffle(set.map((a, i) => ({ a, right: i === 0 }))).map((o, k) => {
      const b = G.el('button', 'p4-gnote', B.el, G.artImg(o.a) || ''); b.type = 'button'; b.setAttribute('aria-label', '그림 쪽지');
      Object.assign(b.style, { left: (730 + k * 215) + 'px', top: '290px' }); o.b = b;
      P.dragTo(b, () => [slot], () => pick(o), { can: () => !fin });
      G.onTap(b, () => { if (easy) pick(o); else S.say('S90_task_guide'); });
      return o;
    });
    const good = notes.find(o => o.right);
    function clear() { if (arrow) arrow.remove(); arrow = null; notes.forEach(o => o.b.classList.remove('hint')); }
    async function pick(o) {
      if (fin || G.dialog.active) return; clear();
      if (!o.right) { o.b.animate && o.b.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(-8px)' }, { transform: 'translateX(8px)' }, { transform: 'translateX(0)' }], { duration: 300 }); return S.say('S90_daon_retry'); }
      win();
    }
    async function win() {
      if (fin) return; fin = true; cur = null; G.help.off(); clear();
      slot.innerHTML = G.artImg(good.a) || ''; slot.classList.add('on'); good.b.style.visibility = 'hidden';
      G.audio.sfx('sfx_click', 0.6); G.audio.sfx('sfx_sparkle', 0.7); spark(slot, 10);
      await G.wait(0.9); S.end(); if (!ok()) return res(false);
      await G.dialog.play([yes], { partner: 'daon' }); res(ok());
    }
    S.layout = () => B.fit(area(S)); S.layout(); requestAnimationFrame(S.layout);
    G.help.set({
      l1: () => S.say('S90_task_guide'),
      l2: () => { if (arrow) return; const r = good.b.getBoundingClientRect(), rr = S.root.getBoundingClientRect(); arrow = arrowAt(S.root, r.left - rr.left + r.width / 2, r.top - rr.top); },
      l3: () => good.b.classList.add('hint'),
      clear,
    });
    cur = { solve: () => win() };
  });

  // ---- 10/9 수정안 3단계: 수어 인사. 동작 그림을 한 장씩 크게 보여 주고, 학생이 따라 한 뒤 '했어요'를 누름. 그림을 누르면 이름을 다시 들려줌 ----
  P.signs = (list, task) => new Promise(async (res) => {
    list = list.filter(([a]) => G.art(a)); if (!list.length) return res(true);
    const g = G.gen, ok = () => g === G.gen;
    const S = screen('p4-sign', task), B = board(S.root, 1200, 760, 'p4-sboard');
    const card = G.el('button', 'p4-scard', B.el); card.type = 'button';
    const name = G.el('div', 'p4-sname', B.el), dots = G.el('div', 'p4-sdots', B.el, list.map(() => '<i>' + G.svgDot(false) + '</i>').join(''));
    let i = -1, fin = false, arrow = null;
    const yes = G.btn('pill gold p4-syes', '했어요', B.el, () => next());
    G.onTap(card, () => { if (i >= 0) G.audio.voice(list[i][1]); });
    function clear() { if (arrow) arrow.remove(); arrow = null; yes.classList.remove('hint'); }
    async function next() {
      if (fin || G.dialog.active) return; clear();
      if (i >= 0) { dots.children[i].classList.add('on'); dots.children[i].innerHTML = G.svgDot(true); G.audio.sfx('sfx_click', 0.6); }
      if (++i >= list.length) return win();
      card.innerHTML = G.artImg(list[i][0]) || ''; name.textContent = G.txt(list[i][1]);
      yes.disabled = true; await G.audio.voice(list[i][1]); await G.wait(0.6); if (!ok()) return; yes.disabled = false;
    }
    async function win() {
      if (fin) return; fin = true; cur = null; G.help.off(); clear(); G.audio.sfx('sfx_sparkle', 0.7); spark(card, 10);
      await G.wait(0.8); S.end(); res(ok());
    }
    S.layout = () => B.fit(area(S)); S.layout(); requestAnimationFrame(S.layout);
    G.help.set({
      l1: () => S.say(task),
      l2: () => { if (arrow) return; const r = yes.getBoundingClientRect(), rr = S.root.getBoundingClientRect(); arrow = arrowAt(S.root, r.left - rr.left + r.width / 2, r.top - rr.top); },
      l3: () => yes.classList.add('hint'),
      clear,
    });
    cur = { solve: () => win() };
    next();
  });

  // ---- 10/9 수정안 3단계: 전과 후 그림. 같은 장면 두 장을 겹치고 가운데 막대 손잡이를 옆으로 끌면 바뀐 모습(후)이 드러남
  //      거의 끝까지 끌면 끝. 쉽게는 손잡이를 누르면 저절로 끝까지. 그림이 아직 없으면 건너뜀 ----
  // 10/9 개선 4: 끝까지 끈 뒤 바뀐 곳을 테두리 빛으로 하나씩 짚음 (그림 비율 [x, y, w, h], 새 그림 없음)
  const BASPOT = {
    board_after: [[.044, .782, .92, .124], [.375, .216, .25, .38], [.437, .639, .125, .073], [.587, .553, .063, .136]],
    s2hall_after: [[.025, .42, .225, .52], [.27, .42, .27, .36], [.6875, .19, .056, .15]],
    s3cafe_after: [[.6, .083, .1, .28], [.4375, .556, .0875, .139]],
    s4flower_after: [[.6, .667, .125, .167], [.7375, .222, .05, .444], [.827, .426, .03, .074]],
    s5play_after: [[.135, .545, .18, .25], [.318, .51, .05, .25], [.88, .57, .07, .13]],   // 10/10 마음의 별: 그림 차례판, 작은 풍경 소리, 쉼터 깃발
  };
  P.beforeAfter = (before, after, done) => new Promise(async (res) => {
    if (!G.art(before) || !G.art(after)) return res(true);
    const g = G.gen, ok = () => g === G.gen, easy = !G.lv('normal');
    const im0 = new Image(); im0.src = G.art(before); try { await im0.decode(); } catch (_) { }
    if (!ok()) return res(false);
    const W = im0.naturalWidth || 1600, H = im0.naturalHeight || 900;
    const S = screen('p4-ba', 'S90_task_ba'), B = board(S.root, W, H, 'p4-baboard');
    const a = G.el('img', 'p4-baimg', B.el); a.src = G.art(before); a.alt = ''; a.style.width = W + 'px'; a.style.height = H + 'px';
    const wrap = G.el('div', 'p4-bawrap', B.el), b = G.el('img', 'p4-baimg', wrap); b.src = G.art(after); b.alt = ''; b.style.width = W + 'px'; b.style.height = H + 'px';
    G.el('span', 'p4-batag l', B.el, '바뀐 뒤'); G.el('span', 'p4-batag r', B.el, '바뀌기 전');
    const bar = G.el('div', 'p4-babar', B.el), knob = G.el('button', 'p4-baknob', bar, G.artImg('ba_knob') || '<i class="l"></i><i class="r"></i>');
    if (G.art('ba_knob')) knob.classList.add('art'); if (G.art('ba_bar')) { bar.classList.add('art'); bar.style.setProperty('--babar', `url("${G.art('ba_bar')}")`); } knob.type = 'button'; knob.setAttribute('aria-label', '막대 손잡이');
    let p = 0.06, fin = false, drag = null, arrow = null;
    const set = (v) => { p = Math.max(0.06, Math.min(1, v)); wrap.style.width = (p * W) + 'px'; bar.style.left = (p * W) + 'px'; };
    set(p);
    function clear() { if (arrow) arrow.remove(); arrow = null; knob.classList.remove('hint'); }
    B.el.addEventListener('pointerdown', (e) => { if (fin || G.dialog.active || G.paused) return; drag = e.pointerId; try { B.el.setPointerCapture(e.pointerId); } catch (_) { } clear(); G.help.poke(); set(B.at(e)[0] / W); });
    B.el.addEventListener('pointermove', (e) => { if (drag !== e.pointerId || fin) return; set(B.at(e)[0] / W); if (p > 0.92) win(); });
    const up = (e) => { if (drag === e.pointerId) drag = null; };
    B.el.addEventListener('pointerup', up); B.el.addEventListener('pointercancel', up);
    G.onTap(knob, () => { if (easy) win(); });
    async function win() {
      if (fin) return; fin = true; drag = null; cur = null; G.help.off(); clear();
      const p0 = p; await G.tween(0, 1, G.reduced() ? 0.15 : 0.6, k => set(p0 + (1 - p0) * k), 'io'); if (!ok()) return res(false);
      bar.style.opacity = '0'; G.audio.sfx('sfx_sparkle', 0.8);
      for (const [x, y, w, h] of BASPOT[after] || []) { const e = G.el('div', 'p4-baspot', B.el); Object.assign(e.style, { left: x * W + 'px', top: y * H + 'px', width: w * W + 'px', height: h * H + 'px' });
        e.animate && e.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 400, fill: 'forwards' }); G.audio.sfx('sfx_chime', 0.35); await G.wait(G.reduced() ? 0.3 : 0.8); if (!ok()) return res(false); }
      if (done) await G.dialog.play([done]); if (!ok()) return res(false);
      await G.wait(0.4); S.end(); res(ok());
    }
    S.layout = () => B.fit(area(S)); S.layout(); requestAnimationFrame(S.layout);
    G.help.set({
      l1: () => S.say('S90_task_ba'),
      l2: () => { if (arrow) return; const r = knob.getBoundingClientRect(), rr = S.root.getBoundingClientRect(); arrow = arrowAt(S.root, r.left - rr.left + r.width / 2, r.top - rr.top); },
      l3: () => knob.classList.add('hint'),
      clear,
    });
    cur = { solve: () => win() };
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
      [[150, 110, 330, 230], [560, 90, 360, 260], [1000, 120, 300, 220], [300, 390, 420, 190], [820, 400, 470, 170]].forEach(([x, y, w, h], k) => {
        const art = G.art('bd_note' + (k + 1));   // 10/10 선생님 그림 쪽지 (없으면 코드 쪽지)
        const n = G.el('div', 'p4-paper' + (art ? ' art' : ''), B.el, art ? `<img src="${art}" alt="">` : ''); Object.assign(n.style, { left: x + 'px', top: y + 'px', width: w + 'px', height: h + 'px', transform: `rotate(${(Math.random() * 4 - 2).toFixed(1)}deg)` });
        if (!art) for (let i = 0; i < Math.floor(h / 40); i++) { const l = G.el('i', '', n); l.style.width = (50 + Math.random() * 45) + '%'; }
      });
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
        showing = false; pos = 0; marks();
      }
      // 10/9 수정안: 쉽게 단계는 본 순서를 번호로 계속 남겨 둠(기억하지 않아도 보고 누르기)
      const marks = () => { flies.forEach(b => { const o = b.querySelector('.seq-no'); if (o) o.remove(); }); if (G.lv('normal')) return; seq.forEach((i, k) => { G.el('span', 'seq-no', flies[i], String(k + 1)); }); };
      async function tap(i) {
        if (showing || fin || G.dialog.active) return;
        clear(); glow(i, 0.45);
        if (seq[pos] === i) { const o = flies[i].querySelector('.seq-no'); if (o) o.classList.add('done'); pos++; if (pos >= seq.length) win(); return; }
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
      const bgArt = G.art('tiles_bg'), K = 1.116, TX = -115, TY = 5;   // 10/1 선생님 그림(1264x848): 그림 속 길이 빈칸 자리에 오게. 10/6 오른쪽 빈 곳 없게 그림을 1384로 늘림(make_tilesbg.py)
      if (bgArt) { B.el.classList.add('art'); Object.assign(B.el.style, { backgroundImage: `url("${bgArt}")`, backgroundSize: `${1384 * K}px ${848 * K}px`, backgroundPosition: `${TX}px ${TY}px` }); }
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
        // 10/7 선생님: 블록은 끌어다 놓기만 (쉽게 단계만 고르고 누르기도). 돌리기는 그대로 누르기
        if (sel && !G.lv('normal')) put(c, sel); else if (!ok_(c)) S.say('E90_hint_10');
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
    // 광장 촌장: 처음 이야기 + 점자 쪽지 (10/7부터 모든 단계에서 처음 말할 때 바로 줌)
    async plaza_chief({ H, complete, g }) {
      const ok = () => g === G.gen, give = !has('note');   // 10/7 길의 별 줄이기: 어느 단계든 처음 말할 때 쪽지를 줌 (도서관에서 다시 돌아오는 길을 지움)
      const first = !done('plaza_chief');
      if (first || !give) { await G.dialog.play(H.def.lines, { partner: 'chief', keep: give }); if (!ok()) return; complete('plaza_chief'); }
      if (!give) return;
      await G.dialog.choose([{ label: G.txt('S03_ply_02'), icon: 'icon_star', voice: 'S03_ply_02' }], true); if (!ok()) return;   // 10/8 선생님: 주인공이 먼저 묻고, 촌장님이 해솔이 이야기를 하며 쪽지를 줌
      await G.dialog.play(['E05_chief_00', 'E05_chief_01', 'E03_chief_02', 'E03_chief_03'], { partner: 'chief' }); if (!ok()) return;
      await G.present.item('note'); if (!ok()) return;
      mark('note_got'); G.map.refresh(); document.querySelectorAll('.p4-askq').forEach(e => e.remove());
      if (ok() && (G.hud.nextPlace() || {}).id === 'library') G.hud.goMap(() => G.scene.leave(), '도서관으로');   // 10/6 선생님: 쪽지를 받으면 가운데 [도서관으로] → 지도
    },
    // 우편배달부: 편지가 날아감 → 편지 찾기 → 다 찾으면 원래 이야기
    async plaza_post({ complete, g }) {
      const ok = () => g === G.gen, o = { partner: 'post' };
      if (done('plaza_post')) { await G.dialog.play(['S03_post_06'], o); return; }
      if (!done('plaza_post_ask')) { await G.dialog.play(['S03_post_01', 'E03_post_01', 'E03_post_02'], o); if (!ok()) return; mark('plaza_post_ask'); G.scene.reveal(); return; }
      if (!lettersDone()) { await G.dialog.play(['E03_post_02'], o); return; }
      // 10/7 길의 별 줄이기: 시장·봄이 아주머니 대신 우편배달부가 도서관을 알려 주고 마을 지도를 줌
      await G.dialog.play(['E03_post_03', 'S03_post_02', 'S03_post_03', 'S03_post_04', 'S03_rumi_07', 'S03_post_06', 'S03_post_07'], { partner: 'post', keep: true }); if (!ok()) return;
      G.dialog.close();
      await G.present.item('map'); if (!ok()) return;
      await G.dialog.play(['S04_rumi_02'], o); if (!ok()) return;
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
    // 도서관 해솔: 자물쇠를 열고 들어왔으면 문 이야기를 더함
    async library_haesol({ complete, closeup, hideCloseup, g }) {
      const ok = () => g === G.gen, opt = (id, icon) => ({ label: G.txt(id), icon, voice: id });
      G.dialog.onLine = (lid) => { if (lid === 'S05_haesol_03') closeup('braille_book'); if (lid === 'S05_rumi_02') hideCloseup(); };
      const door = done('libdoor_open') ? ['E05_haesol_01', 'E05_haesol_02', 'E05_haesol_03'] : [];
      await G.dialog.play(['S05_haesol_01', ...door, 'S05_haesol_02', 'S05_haesol_03', 'S05_rumi_01', 'S05_rumi_02']   /* 10/8 작가: 두 번째 '어서 와'(S05_haesol_04) 뺌 */, { partner: 'haesol', keep: true });
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
      if (!await P.askHelp(V, 'haesol', 'S10_ply_02')) return;   // 10/9 수정안: 돕기 전에 먼저 묻기, 거절도 괜찮다
      await G.dialog.play(['S10_haesol_06', 'S10_haesol_07'], { partner: 'haesol' }); if (!ok()) return;
      G.st.env.guide = true;
      complete('plaza2_road');
      if (!done('plaza2_look')) await G.flows.plaza2_look({ V, complete, g, auto: true });   // 10/6 선생님: 게시판 다시 보기 없이 바로 모두 모임
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

/* ---- starcard.js ---- */
// starcard.js — 별 카드 완성 (10/5 기획 리뷰 C1, 선생님 허락)
// 모두 모인 뒤, 이번 별에서 찾은 방법 그림을 하나씩 눌러 빛을 잃은 별에게 돌려주면 별이 빛남.
// 틀린 답 없음(모두 정답), 실패음 없음, 도움 3단계. 별마다 한 줄로 부름:
//   await G.starCard('word', [{ art: 'card_draw', label: '그림' }, { text: '가', label: '글' }, ...])
// 루미 빛 (D3): 되찾은 별이 늘수록 지도와 [루미] 단추의 루미 둘레 빛이 조금씩 커짐 (움직이지 않는 filter, 바뀔 때만 씀)
'use strict';
G.starCard = (() => {
  const CSS = `
.sc-card { display: block; background: rgba(15, 18, 38, .62); }
.sc-wrap { position: absolute; left: 50%; top: 43%; width: calc(var(--u) * 1100); height: calc(var(--u) * 560); transform: translate(-50%, -50%); }
.sc-star { position: absolute; left: 50%; top: 50%; width: calc(var(--u) * 255); height: calc(var(--u) * 255); transform: translate(-50%, -50%); opacity: .35; filter: grayscale(.85); transition: opacity .5s, filter .5s; pointer-events: none; }
.sc-star svg, .sc-star img { width: 100%; height: 100%; display: block; }
.sc-it { position: absolute; width: calc(var(--u) * 210); transform: translate(-50%, -50%); display: flex; flex-direction: column; align-items: center; gap: calc(var(--u) * 8); background: #FFF8E8; border: calc(var(--u) * 6) solid #FFD66B; border-radius: calc(var(--u) * 28); padding: calc(var(--u) * 14); cursor: pointer; font: inherit; color: #4A3B32; opacity: .78; outline: none; }
.sc-it:focus-visible { box-shadow: 0 0 0 calc(var(--u) * 6) #FFF1B8; }
.sc-it .pic { width: calc(var(--u) * 150); height: calc(var(--u) * 110); display: flex; align-items: center; justify-content: center; overflow: hidden; border-radius: calc(var(--u) * 14); }
.sc-it .pic img { max-width: 100%; max-height: 100%; object-fit: contain; }
.sc-it .pic b { font-size: calc(var(--u) * 100); line-height: 1; font-weight: normal; }
.sc-it span { font-size: calc(var(--u) * 40); }
.sc-it.hint { opacity: 1; animation: scHint 1.2s ease-in-out infinite; }
@keyframes scHint { 50% { transform: translate(-50%, -50%) scale(1.08); } }
.sc-it.used { visibility: hidden; }
.sc-tip { position: absolute; left: 50%; bottom: calc(var(--sab) + var(--u) * 24); transform: translateX(-50%); font-size: calc(var(--u) * 46); color: #FFF6D6; text-shadow: 0 2px 6px rgba(0, 0, 0, .6); white-space: nowrap; }
.sc-card.go .sc-tip { opacity: 0; transition: opacity .4s; }
.lumi-f img, .lumi-btn img { filter: drop-shadow(0 0 calc(3px + var(--lumi-g, 0) * 4px) rgba(255, 228, 140, calc(.35 + var(--lumi-g, 0) * .07))); }
@media (prefers-reduced-motion: reduce) { .sc-it.hint { animation: none; box-shadow: 0 0 0 calc(var(--u) * 8) #FFF1B8; } }
`;
  let styled = false, lastN = -1;
  const style = () => { if (!styled) { G.el('style', '', document.head, CSS); styled = true; } };
  // D3 루미 빛: 되찾은 별 수가 바뀔 때만 변수 하나를 씀
  G.every(() => { const n = Math.min(8, (G.st && G.st.stars) || 0); if (n !== lastN) { lastN = n; style(); document.documentElement.style.setProperty('--lumi-g', n); } });

  const picOf = (it) => it.text ? `<b>${it.text}</b>` : it.icon ? G.icon(it.icon) : (G.artImg(it.art) || '');
  return (starId, items) => new Promise((res) => {
    style();
    const g = G.gen, ok = () => g === G.gen, s = G.STARS.find(q => q.id === starId);
    const m = G.el('div', 'modal sc-card', G.$('#overlay'));
    const wrap = G.el('div', 'sc-wrap', m);
    const star = G.el('div', 'sc-star', wrap, G.starSvg(s));
    const tip = G.el('div', 'sc-tip', m, G.txt('S94_rumi_card'));
    const n = items.length; let left = n, fin = false;
    const glow = () => { const k = 1 - left / n; star.style.opacity = (0.35 + 0.65 * k).toFixed(2); star.style.filter = `grayscale(${(0.85 * (1 - k)).toFixed(2)}) drop-shadow(0 0 ${Math.round(34 * k)}px ${s.color})`; };
    const btns = items.map((it, i) => {
      const a = (-90 + 360 * (i + 0.5) / n) * Math.PI / 180;
      const b = G.btn('sc-it', `<div class="pic">${picOf(it)}</div><span>${it.label}</span>`, wrap, () => take(b), it.label);
      b.style.left = (50 + Math.cos(a) * 36) + '%'; b.style.top = (50 + Math.sin(a) * 34) + '%';
      return b;
    });
    const next = () => btns.find(b => !b.classList.contains('used'));
    async function take(b) {
      if (fin || b.disabled) return; b.disabled = true;
      btns.forEach(x => x.classList.remove('hint'));
      G.audio.sfx('sfx_sparkle', 0.55, 0.9 + (n - left) * 0.08);
      const r1 = b.getBoundingClientRect(), r2 = star.getBoundingClientRect();
      if (b.animate && !G.reduced()) {
        const dx = (r2.left + r2.width / 2) - (r1.left + r1.width / 2), dy = (r2.top + r2.height / 2) - (r1.top + r1.height / 2);
        const fly = b.cloneNode(true); fly.disabled = true; fly.style.pointerEvents = 'none'; wrap.appendChild(fly); b.classList.add('used');
        await fly.animate([{ transform: 'translate(-50%,-50%)', opacity: 1 }, { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(.15)`, opacity: 0 }], { duration: 550, easing: 'ease-in' }).finished.catch(() => { });
        fly.remove();
      } else b.classList.add('used');
      if (!ok()) return;
      left--; glow();
      if (left <= 0) win();
    }
    async function win() {
      fin = true; G.help.off(); m.classList.add('go');
      G.audio.sfx('sfx_star', 0.8);
      if (star.animate && !G.reduced()) star.animate([{ transform: 'translate(-50%,-50%) scale(1)' }, { transform: 'translate(-50%,-50%) scale(1.18)' }, { transform: 'translate(-50%,-50%) scale(1)' }], { duration: 900, easing: 'ease-out' });
      await G.wait(G.fast() ? 0.4 : 1.4);
      m.remove(); res(ok());
    }
    const off = G.every(() => { if (!m.isConnected) return off(); if (!ok()) { off(); m.remove(); res(false); } });
    glow();
    G.audio.voice('S94_rumi_card');
    G.help.set({ l1: () => G.audio.voice('S94_rumi_card'), l2: () => { const b = next(); if (b) b.classList.add('hint'); }, l3: () => btns.forEach(b => { if (!b.classList.contains('used')) b.classList.add('hint'); }), clear: () => btns.forEach(b => b.classList.remove('hint')) });
  });
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
.s2-beat.hide { background: rgba(255, 246, 220, .25); border: calc(var(--u) * 4) dashed rgba(224, 185, 106, .9); }
.s2-beat.hide img { opacity: 0; }
.s2-again { margin-top: calc(var(--u) * 18); }
.s2-again.off { opacity: .45; pointer-events: none; }
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
.s2-pic.blink { animation: s2picblink .5s steps(2, jump-none) infinite; box-shadow: 0 0 calc(var(--u) * 24) #ffb070; }   /* 10/8 검토: 그림자는 고정, 테두리 색만 바뀜. 이름이 아래 s2blink와 겹쳐 있던 것도 나눔 */
@keyframes s2picblink { 0% { border-color: #e0b96a; } 100% { border-color: #ff7a3c; } }
.s2-slots { display: flex; gap: calc(var(--u) * 14); justify-content: center; }
.s2-slot { width: calc(var(--u) * 96); height: calc(var(--u) * 96); border-radius: calc(var(--u) * 20); border: calc(var(--u) * 4) dashed rgba(224, 185, 106, .9); background: rgba(255, 246, 220, .25); display: flex; align-items: center; justify-content: center; }
.s2-slot img { width: 84%; height: 84%; object-fit: contain; animation: s2pop .45s ease-out; }
.s2-slot.lit { border-style: solid; background: rgba(255, 230, 150, .7); box-shadow: 0 0 calc(var(--u) * 24) rgba(255, 214, 107, 1); }
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
.s2-spot { position: absolute; width: 0; height: 0; z-index: 2990; }
.s2-spot i { position: absolute; left: -70px; top: -70px; width: 140px; height: 140px; border-radius: 50%; border: 7px dashed #FFD66B; background: rgba(255, 214, 107, .22); box-shadow: 0 0 30px rgba(255, 214, 107, .9); animation: s2drop 1.1s ease-in-out infinite; }
.s2-spot.small i { left: -48px; top: -48px; width: 96px; height: 96px; }
.s2-spot.p4-target-on i, .s2-spot.drop-on i { background: rgba(255, 214, 107, .55); }
.s2-oil { position: absolute; width: 18px; height: 18px; border-radius: 50% 50% 50% 0; background: #E8B23A; box-shadow: 0 0 8px rgba(255, 214, 107, .9); pointer-events: none; z-index: 2992; }
.s2-pane { position: absolute; z-index: 2991; background: linear-gradient(135deg, rgba(200, 230, 255, .55), rgba(150, 190, 230, .35)); border: 8px solid #8a5a3a; border-radius: 6px; box-shadow: 0 6px 14px rgba(0,0,0,.35); transition: opacity .8s; }
.s2-pane.shut { opacity: 0; }
.s2-pane .hd { position: absolute; left: -46px; top: 50%; width: 76px; height: 76px; margin-top: -38px; border-radius: 50%; background: radial-gradient(circle, #FFE9A8 0%, #FFD66B 55%, #c98f14 100%); border: 6px solid #fff; box-shadow: 0 0 22px rgba(255, 214, 107, 1); cursor: grab; animation: s2drop 1.1s ease-in-out infinite; }
.s2-gap { position: absolute; z-index: 2990; background: repeating-linear-gradient(90deg, rgba(160, 200, 255, .0) 0 14px, rgba(220, 240, 255, .35) 14px 18px); }
.modal.s2-bellbox .sheet { display: flex; flex-direction: column; align-items: center; gap: calc(var(--u) * 24); padding: calc(var(--u) * 36) calc(var(--u) * 60); }
.s2-bellbox .bb-title { font-family: var(--f-title); font-size: calc(var(--u) * 48); color: var(--brown); }
.s2-bellbox .bb-bars { display: flex; align-items: flex-end; gap: calc(var(--u) * 12); height: calc(var(--u) * 220); }
.s2-bellbox .bb-bars i { width: calc(var(--u) * 46); border-radius: calc(var(--u) * 10); background: #e7dccb; border: calc(var(--u) * 4) solid #b9a88f; }
.s2-bellbox .bb-bars i.green { border-color: #4f9a5a; background: #d7efd6; }
.s2-bellbox .bb-bars i.on { background: #F29B6B; }
.s2-bellbox .bb-bars i.green.on { background: #6cc077; }
.s2-bellbox .bb-btns { display: flex; gap: calc(var(--u) * 40); }
.s2-bellbox .bb-sign { font-family: Arial, sans-serif; font-weight: 900; margin-right: .2em; }
.s2-bellbox .bb-btn { font-family: var(--f-title); font-size: calc(var(--u) * 46); min-width: calc(var(--u) * 220); min-height: calc(var(--u) * 110); border: 0; border-radius: calc(var(--u) * 30); background: #FFD66B; box-shadow: 0 calc(var(--u) * 8) 0 #c98f14; color: var(--brown); cursor: pointer; }
.s2-bellbox .sheet.ok { box-shadow: 0 0 calc(var(--u) * 60) rgba(108, 192, 119, .9); }
.s2-drop { position: absolute; width: 0; height: 0; pointer-events: none; z-index: 2990; }
.s2-drop i { position: absolute; left: -95px; top: -60px; width: 190px; height: 120px; border-radius: 50%; border: 7px dashed #FFD66B; background: rgba(255, 214, 107, .22); box-shadow: 0 0 30px rgba(255, 214, 107, .9); animation: s2drop 1.1s ease-in-out infinite; }
.s2-drop .arrow { left: 0; top: -125px; }
@keyframes s2drop { 0%, 100% { transform: scale(.92); opacity: .75; } 50% { transform: scale(1.06); opacity: 1; } }
.reduce .s2-drop i { animation: none; }
.reduce .s2-loud, .reduce .s2-glow, .reduce .s2-calm .s2-breath { animation: none; }
.c11-slot.s2-next { opacity: .85; filter: drop-shadow(0 0 22px rgba(242, 155, 176, 1)); animation: s2blink 1.2s ease-in-out infinite; }   /* 10/8 검토: 빛 번짐은 고정, opacity만 움직임 */
@keyframes s2blink { 0%, 100% { opacity: .35; } 50% { opacity: 1; } }
.s2-cnotes { position: absolute; left: 0; top: 0; width: 0; height: 0; pointer-events: none; z-index: 2995; }
.s2-cnotes .s2-note { left: auto; top: auto; filter: drop-shadow(0 0 10px rgba(125, 187, 227, .9)); }
.s2-concert { position: absolute; width: 900px; height: 900px; margin: -450px 0 0 -450px; border-radius: 50%; pointer-events: none; z-index: 17; mix-blend-mode: screen; opacity: 0;
  background: radial-gradient(circle, rgba(255, 236, 170, .6) 0%, rgba(200, 160, 240, .35) 40%, rgba(200, 160, 240, 0) 70%); }

/* 10/6 학교 고치기 네 장면 */
.s2-fixbg { background-size: cover; }
.s2-fobj { position: absolute; transform: translate(-50%, -50%); pointer-events: none; z-index: 5; }
.s2-fobj.pop { animation: s2pop .5s ease-out; }
.s2-fobj.glow { filter: drop-shadow(0 0 30px rgba(255, 220, 120, 1)) drop-shadow(0 0 60px rgba(255, 220, 120, .8)); }
.s2-fspot { border: 0; background: none; padding: 0; cursor: pointer; z-index: 8; }
.s2-fspot i { pointer-events: auto; }
.s2-fbasket { position: absolute; left: 0; top: 520px; width: 320px; height: 248px; border: 0; background: none; cursor: grab; z-index: 7; }
.s2-fbasket .s2-ball { position: absolute; left: 150px; top: 40px; width: 70px; height: 70px; border-radius: 50%; background: radial-gradient(circle at 35% 35%, #f3ff9a, #c9e83a 60%, #95b51c); box-shadow: 0 0 22px rgba(255, 214, 107, 1); animation: s2drop 1.1s ease-in-out infinite; }
.s2-fbasket.hint .s2-ball { box-shadow: 0 0 40px 10px rgba(255, 214, 107, 1); }
/* 10/7 선생님: 테니스공 한 개를 끌어다 끼움 */
.s2-fball1 { width: 150px; height: 150px; top: 600px; left: 70px; display: flex; align-items: center; justify-content: center; }
.s2-fball1 img { width: 100%; height: 100%; object-fit: contain; filter: drop-shadow(0 0 26px rgba(255, 214, 107, .95)); animation: s2drop 1.1s ease-in-out infinite; }
.s2-fball1.hint img { filter: drop-shadow(0 0 40px rgba(255, 214, 107, 1)); }
.s2-pull i { border-style: solid; }
.s2-fclip { position: absolute; overflow: hidden; z-index: 4; }
.s2-fclip .s2-fobj { transform: none; left: 0; }
.s2-fhd { position: absolute; top: 50%; width: 84px; height: 84px; margin: -42px 0 0 -14px; border-radius: 50%; border: 6px solid #fff; background: radial-gradient(circle, rgba(255, 233, 168, .5) 0%, rgba(255, 214, 107, .35) 60%, rgba(201, 143, 20, .2) 100%); box-shadow: 0 0 24px rgba(255, 214, 107, 1); cursor: grab; animation: s2drop 1.1s ease-in-out infinite; }
.s2-fobj.flut { animation: s2flut 2.4s ease-in-out infinite; z-index: 6; }
.s2-fobj.flut2 { animation: s2flut 1.7s ease-in-out infinite reverse; z-index: 6; }
@keyframes s2flut { 0%, 100% { transform: translate(-50%, -50%) rotate(-10deg) translate(0, 0); } 50% { transform: translate(-50%, -50%) rotate(14deg) translate(-90px, 40px); } }
.s2-flatch { pointer-events: auto; cursor: pointer; z-index: 7; }
.s2-fbars { position: absolute; display: flex; align-items: flex-end; gap: 8px; z-index: 5; padding: 6px 10px; box-sizing: border-box; }
.s2-fbars i { flex: 1; border-radius: 6px; background: #e7dccb; border: 3px solid #b9a88f; }
.s2-fbars i.green { border-color: #4f9a5a; background: #d7efd6; }
.s2-fbars i.on { background: #F29B6B; }
.s2-fbars i.green.on { background: #6cc077; }
.s2-fbars.ok { filter: drop-shadow(0 0 18px rgba(108, 192, 119, 1)); }
.s2-fknob { position: absolute; width: 130px; height: 130px; margin: -65px 0 0 -65px; border: 0; background: none; padding: 0; cursor: pointer; z-index: 7; }
.s2-fknob img { width: 100%; height: 100%; }
.s2-fknob b { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-family: Arial, sans-serif; font-weight: 900; font-size: 70px; color: #5a3a24; }
.s2-fknob.hint { filter: drop-shadow(0 0 22px rgba(255, 214, 107, 1)); animation: s2drop 1.1s ease-in-out infinite; }
/* 10/7 선생님: 종 소리 크기는 손잡이를 끌어서 맞춤 */
.s2-fslide { position: absolute; height: 46px; border-radius: 23px; background: #efe4d2; border: 5px solid #b9a88f; box-sizing: border-box; z-index: 6; }
.s2-fslide .gr { position: absolute; top: 0; bottom: 0; background: rgba(108, 192, 119, .45); }
.s2-fhandle { position: absolute; top: 50%; width: 120px; height: 120px; margin: -60px 0 0 -60px; border: 0; background: none; padding: 0; cursor: grab; touch-action: none; z-index: 8; }
.s2-fhandle img { width: 100%; height: 100%; }
.s2-fhandle.hint { filter: drop-shadow(0 0 26px rgba(255, 214, 107, 1)); animation: s2drop 1.1s ease-in-out infinite; }
.s2-fknob.off { opacity: .4; pointer-events: none; }
.s2-fdoor { position: absolute; z-index: 3; transform-origin: 0 50%; background-size: 1376px 768px; cursor: pointer; }
.s2-meter { position: absolute; left: 50%; top: calc(var(--u) * 20); transform: translateX(-50%); display: flex; align-items: center; gap: calc(var(--u) * 10); padding: calc(var(--u) * 10) calc(var(--u) * 22); border-radius: calc(var(--u) * 30); background: rgba(255, 250, 240, .92); box-shadow: 0 calc(var(--u) * 4) calc(var(--u) * 14) rgba(0, 0, 0, .25); z-index: 50; pointer-events: none; }
.s2-meter .mt { font-family: var(--f-title); font-size: calc(var(--u) * 30); color: var(--brown); display: flex; align-items: center; gap: .3em; }
.s2-meter .mt .ico, .s2-meter .mt img { width: 1.1em; height: 1.1em; }
.s2-meter i { width: calc(var(--u) * 46); height: calc(var(--u) * 30); border-radius: calc(var(--u) * 8); background: #F29B6B; border: calc(var(--u) * 3) solid #c9653a; transition: background .6s, border-color .6s; }
.s2-meter i.ok { background: #6cc077; border-color: #4f9a5a; }
.s2-meter.all { animation: s2out 1.6s ease-in forwards; }
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
  // 10/6 선생님(고칠 목록 4-a): 학교를 한 번 살펴본 뒤에야 별가루를 가짐. 주인공이 먼저 묻고 주민이 줌
  const schoolSeen = () => !!G.st && ((G.st.visited || []).includes('s2school') || done('s2school_intro') || (G.st.cleared || []).includes('s2school'));
  G.p4.villagerHas = (vid) => s2giver(vid) ? !!G.st && schoolSeen() && !sd().includes('map:' + vid) : vh0(vid);
  const vl0 = G.p4.villagerLines;
  G.p4.villagerLines = (vid, id, has) => {
    if (!s2giver(vid)) return vl0 ? vl0(vid, id, has) : null;
    if (has) return ['SD00_hero_ask', vid === 'chaei' ? 'S91_chaei' : 'SD00_v4_dust'];
    if (vid === 'chaei') return [sd().includes('map:chaei') ? 'SD00_chaei_after' : 'SD00_chaei_wait'];
    return null;
  };
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
    if (c.rm) V.setCam(V.home()[0], V.home()[1], 1); else V.setCam(V.home()[0] - 150, V.home()[1] + 20, 1.25);
    c.t0 = G.t;
    await Promise.all([
      U.fadeIn(c, root, 0.5),
      (async () => { if (!c.rm) await c.tween(0, 1, 3.6, k => V.setCam(V.home()[0] - 150 + 150 * k, V.home()[1] + 20 - 20 * k, 1.25 - 0.25 * k), 'io'); })(),
      U.title(c, root, S.name, 'S92_place_' + (S.zone || place), 0.8, 4.4),
    ]);
    V.setCam(V.home()[0], V.home()[1], 1); off();
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
      // 10/6 선생님: 별은 땅에 떨어졌음 → 동쪽 땅에서 보랏빛이 안개 너머로 새어 나오고, 안개 속에서 지글지글 (실제 소리는 작고 짧게)
      const s = G.STARS.find(q => q.id === 'sound');
      const star = G.groundLeak(V.fx, 4980, 1760, s.color), blink = null;
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
      meter(V, def);
      // 쉽게: 소리 나는 곳이 반짝임
      if (!G.lv('normal') && !done('s2school_noise')) for (const k of noiseNeed(def)) { const b = hotBtn(V, labelOf(def, k)); if (b && b.previousElementSibling) b.previousElementSibling.classList.add('strong'); }
      // 10/6 선생님(고칠 목록 5): 들어가면 고장 난 것들 소리가 겹쳐서 계속 남. 고칠 때마다 그 소리만 꺼짐. 소리에 예민한 학생을 생각해 작게, 대사 중에는 더 작게
      const MIX = { chair: ['loop_chair', 0.42, 1, 6.4], window: ['loop_wind', 0.38, 1, 7.4], bell: ['loop_bell', 0.32, 1, 2.4], locker: ['loop_locker', 0.42, 1, 5.8] };   // 10/6 선생님: 더 소란스럽게   // 10/6 선생님 효과음(에셋원본/효과음_1006)
      for (const k of noiseNeed(def)) {
        if (done('s2f_' + k) || !MIX[k]) continue;
        const [n, vol, rate, every] = MIX[k]; let t = Math.random() * every;
        const off = G.every(dt => { if (!V.el.isConnected || done('s2f_' + k)) { off(); return; } if (G.paused || V.s2['hush' + k[0].toUpperCase() + k.slice(1)]) return; t -= dt; if (t > 0) return; t = every * (0.95 + Math.random() * 0.15); G.audio.sfx(n, vol * (G.dialog.active ? 0.7 : 1), rate); });
      }
      // 바람이 들어오는 창문, 쉬지 않는 종: 물결 그림도 함께
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
  function bellLight(V, def, anim) {   // 10/6: 종 옆에 붙인 빛 알림등 + 종이 울릴 때 함께 반짝이는 빛
    const [x, y] = def.bellLight, lamp = obj(V.fx, 'item_flashlamp', x, y, 110, anim ? 'pop' : ''); lamp.style.transform = 'translate(-50%, -50%)';
    const g = G.el('div', 's2-glow', V.fx); Object.assign(g.style, { left: x + 'px', top: y + 'px' }); return g;
  }
  function dropSpot2(V, x, y, cls = '') { const e = G.el('div', 's2-spot ' + cls, V.fx, '<i></i>'); Object.assign(e.style, { left: x + 'px', top: y + 'px' }); return e; }
  function oilSpray(V, x, y) {
    G.audio.sfx('sfx_spray', 0.5);   // 칙 (선생님 효과음)
    for (let i = 0; i < 9; i++) { const d = G.el('div', 's2-oil', V.fx); Object.assign(d.style, { left: x + 'px', top: y + 'px' });
      const a = -Math.PI / 2 + (Math.random() - 0.5) * 1.6, R = 40 + Math.random() * 60;
      d.animate && d.animate([{ transform: 'translate(-50%,-50%) scale(.4)', opacity: 1 }, { transform: `translate(calc(-50% + ${Math.cos(a) * R}px), calc(-50% + ${Math.sin(a) * R + 30}px)) scale(1)`, opacity: 0 }], { duration: 700, easing: 'ease-out' }).finished.then(() => d.remove()).catch(() => d.remove()); }
  }
  // 창문: 열린 유리를 손잡이로 끌어 닫기 (끝까지 닫으면 끝)
  function slideWindow(V, def) {
    return new Promise((res) => {
      const g = G.gen, [x, y, w, h] = def.pane, open = w * 0.85;
      const pane = G.el('div', 's2-pane', V.fx, '<b class="hd"></b>'); Object.assign(pane.style, { left: (x + open) + 'px', top: y + 'px', width: w + 'px', height: h + 'px' });
      const hd = pane.querySelector('.hd'); hd.style.touchAction = 'none'; hd.setAttribute('role', 'button'); hd.setAttribute('aria-label', '창문 손잡이');
      const gap = G.el('div', 's2-gap', V.fx); Object.assign(gap.style, { left: x + 'px', top: y + 'px', width: open + 'px', height: h + 'px' });
      let st = null, cur = open, fin = false;
      const k = () => { const r = V.fx.getBoundingClientRect(); return r.width / (V.W || def.size[0]) || 1; };
      const setX = (v) => { cur = Math.max(0, Math.min(open, v)); pane.style.left = (x + cur) + 'px'; gap.style.width = cur + 'px'; };
      hd.addEventListener('pointerdown', (e) => { if (fin || G.dialog.active) return; st = { id: e.pointerId, x: e.clientX, c: cur }; try { hd.setPointerCapture(e.pointerId); } catch (_) { } G.audio.sfx('sfx_tap', 0.4); });
      hd.addEventListener('pointermove', (e) => { if (!st || e.pointerId !== st.id) return; setX(st.c + (e.clientX - st.x) / k()); if (cur < 3) done_(); });
      const up = (e) => { if (!st || e.pointerId !== st.id) return; st = null; if (cur < open * 0.15) done_(); };
      hd.addEventListener('pointerup', up); hd.addEventListener('pointercancel', up);
      G.onTap(gap, () => { if (!fin && !st) { G.audio.sfx('sfx_tap', 0.3); hd.classList.add('s3-hint'); setTimeout(() => hd.classList.remove('s3-hint'), 1400); } });
      function done_() { if (fin) return; fin = true; setX(0); gap.remove(); hd.remove(); pane.classList.add('shut'); setTimeout(() => pane.remove(), 900); res(g === G.gen); }
    });
  }
  // 종 소리 상자: [-] [+]로 소리 눈금을 초록 칸에 맞춤. 너무 줄이면 '안 들리는 친구가 있어'
  function bellBox(def) {
    return new Promise((res) => {
      const g = G.gen, B = def.bellBox, root = G.el('div', 'modal s2-bellbox', G.$('#overlay')), sh = G.el('div', 'sheet', root);
      G.el('div', 'bb-title', sh, '종 소리 상자');
      const bars = G.el('div', 'bb-bars', sh), btns = G.el('div', 'bb-btns', sh);
      const cells = Array.from({ length: B.max }, (_, i) => { const c = G.el('i', (i + 1 >= B.green[0] && i + 1 <= B.green[1]) ? 'green' : '', bars); c.style.height = (30 + i * 14) + '%'; return c; });
      let lv = B.start, fin = false, t = null, warned = false;
      const draw = () => cells.forEach((c, i) => c.classList.toggle('on', i < lv));
      const ring = () => { G.audio.sfx('sfx_chime', 0.04 + 0.05 * lv, 1.3); };
      const inGreen = () => lv >= B.green[0] && lv <= B.green[1];
      const press = async (d) => {
        if (fin || G.dialog.active) return; lv = Math.max(1, Math.min(B.max, lv + d)); draw(); ring(); clearTimeout(t);
        if (lv < B.green[0]) { if (!warned || lv === 1) { warned = true; await G.dialog.play(['SD02_rumi_32']); } return; }
        if (inGreen()) t = setTimeout(async () => { if (fin || !inGreen() || g !== G.gen) return; fin = true; G.audio.sfx('sfx_sparkle', 0.6); sh.classList.add('ok'); await G.wait(0.7); root.remove(); res(g === G.gen); }, 1200);
      };
      G.btn('bb-btn', '<b class="bb-sign">-</b> 작게', btns, () => press(-1), '작게');
      G.btn('bb-btn', '<b class="bb-sign">+</b> 크게', btns, () => press(1), '크게');
      draw(); ring();
    });
  }
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
      if (!done('s2school_fix')) { await play(done('s2school_noise') ? ['SD02_rumi_40'] : ['SD02_daon_02'], done('s2school_noise') ? {} : { partner: 'daon' }); return; }
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
      complete('s2school_noise'); meter(V, S);
      await play(['SD02_rumi_40']); return;
    }
    if (!done('s2school_fix') && need.includes(id) && !done('s2f_' + id)) await fixOne(id, ctx);
  };
  // 10/6 선생님: 학교 고치기 네 장면. 소리를 다 찾은 뒤 교실에서 소리 나는 곳을 누르면 그 물건을 크게 보는 장면으로 넘어가 하나씩 고침(순서는 아이가 고름, 모든 난이도)
  async function fixOne(k, { S: def, V, g, complete }) {
    const ok = () => g === G.gen;
    G.busy++; G.$('#fade').classList.add('on'); await G.wait(0.45); G.busy = Math.max(0, G.busy - 1); if (!ok()) return;
    const P = screen('s2-fix'), B = board(P.root, 1376, 768, 's2-fixbg'); B.el.style.backgroundImage = `url("${ART('fix_' + k + '_bg')}")`;
    P.layout = () => B.fit([0, 0, G.stage.W, G.stage.H], true); P.layout();
    G.$('#fade').classList.remove('on'); await G.wait(0.35);
    let won = false; try { won = await FIX[k](P, B, ok, V); } catch (e) { console.error('학교 고치기 오류', k, e); }
    if (!ok()) return P.end();
    if (won) { mark('s2f_' + k); G.save.write(); }
    G.$('#fade').classList.add('on'); await G.wait(0.45); P.end(); if (!ok()) return;
    if (won) { quiet(V, k); if (k === 'chair') tennis(V, def, true); if (k === 'bell') bellLight(V, def, true); meter(V, def); }
    G.$('#fade').classList.remove('on'); await G.wait(0.4); if (!ok() || !won) return;
    spark(hotBtn(V, labelOf(def, k)), 8);
    if (!noiseNeed(def).every(q => done('s2f_' + q))) return;
    complete('s2school_fix'); meter(V, def);
    await play(['SD02_rumi_10']);
  }
  // 교실 위 소리 막대 4칸: 고칠 때마다 한 칸씩 초록
  function meter(V, def) {
    let m = V.el.parentNode && V.el.parentNode.querySelector('.s2-meter');
    if (done('s2school_fix') || !done('s2school_noise')) { if (m) { m.classList.add('all'); setTimeout(() => m.remove(), 1800); } return; }
    if (!m) { m = G.el('div', 's2-meter', V.el.parentNode); G.el('span', 'mt', m, G.icon('icon_sound') + ' 교실 소리'); for (const k of noiseNeed(def)) G.el('i', '', m).dataset.k = k; }
    m.querySelectorAll('i').forEach(c => c.classList.toggle('ok', done('s2f_' + c.dataset.k)));
  }
  const bel = (parent, cls, x, y, w, h, html = '') => { const e = G.el('div', cls, parent, html); Object.assign(e.style, { left: x + 'px', top: y + 'px' }); if (w) e.style.width = w + 'px'; if (h) e.style.height = h + 'px'; return e; };
  const bimg = (parent, name, x, y, w, cls = '') => { const e = G.el('img', 's2-fobj ' + cls, parent); e.src = ART(name); e.alt = ''; Object.assign(e.style, { left: x + 'px', top: y + 'px', width: w + 'px' }); return e; };
  const tapSpot = (parent, x, y, small, label) => { const e = G.el('button', 's2-spot s2-fspot' + (small ? ' small' : ''), parent, '<i></i>'); e.type = 'button'; e.setAttribute('aria-label', label || '여기'); Object.assign(e.style, { left: x + 'px', top: y + 'px' }); return e; };
  const shake = (el, px = 6) => el.animate && el.animate([{ transform: 'translateX(0)' }, { transform: `translateX(-${px}px)` }, { transform: `translateX(${px}px)` }, { transform: 'translateX(0)' }], { duration: 320 });
  const FIX = {
    // 의자: 바구니의 테니스공을 끌어 다리 끝에 끼움 (쉽게: 앞 두 다리)
    chair: (P, B, ok, V0) => new Promise(async (res) => {
      const ALL = [[592, 600], [928, 690], [826, 505], [1128, 560]], legs = G.lv('normal') ? ALL : ALL.slice(0, 2);
      const marks = legs.map(([x, y]) => loudMark(B.el, x, y - 30));
      await play(['SD02_daon_03'], { partner: 'daon' }); if (!ok()) return res(false);
      await play(['SD02_rumi_07']); if (!ok()) return res(false);
      // 10/7 선생님: 바구니 대신 테니스공 한 개를 끌어다 다리에 끼움
      const basket = G.el('button', 's2-fbasket s2-fball1', B.el, `<img src="${ART('item_tennis_one') || ART('item_tennis')}" alt="">`); basket.type = 'button'; basket.setAttribute('aria-label', '테니스공');
      let left = legs.length, fin = false;
      const spots = legs.map(([x, y], i) => { const s = tapSpot(B.el, x, y, !G.lv('normal') ? false : G.lv('hard'), '의자 다리'); s.dataset.i = i; if (!G.lv('normal')) G.onTap(s, () => put(s)); return s; });   // 10/7 선생님: 끌어다 끼우기만 (쉽게 단계만 누르기도)
      const put = (s) => {
        if (fin || G.dialog.active || !s.isConnected) return; G.help.poke();
        const [x, y] = legs[+s.dataset.i]; s.remove(); marks[+s.dataset.i].classList.add('gone');
        const ball = bimg(B.el, 'fix_tennis_ball', x, y + 8, 78, 'pop'); ball.style.transform = 'translate(-50%,-62%)';
        G.audio.sfx('sfx_tap', 0.6); G.audio.sfx('sfx_chime', 0.25, 1.3);
        if (--left === 0) end();
      };
      G.p4.dragTo(basket, () => spots.filter(s => s.isConnected), (t) => put(t));
      G.onTap(basket, () => { G.audio.sfx('sfx_tap', 0.4); spots.forEach(s => s.classList.add('p4-target-on')); setTimeout(() => spots.forEach(s => s.classList.remove('p4-target-on')), 1200); });
      const finish = async () => { if (fin) return; fin = true; G.help.off(); cur = null; spots.forEach(s => s.remove()); res(ok()); };
      async function end() { if (fin) return; if (V0 && V0.s2) V0.s2.hushChair = true; await G.wait(0.4); shake(B.el, 10); await G.wait(0.5); if (!ok()) return res(false); await play(['SD02_rumi_08']); finish(); }
      cur = { solve: () => { spots.filter(s => s.isConnected).forEach(put); } };
      G.help.set({ l1: () => P.say('SD02_rumi_07'), l2: () => basket.classList.add('hint'), l3: () => spots.forEach(s => s.classList.add('p4-target-on')), clear: () => basket.classList.remove('hint') });
    }),
    // 창문: 손잡이를 잡고 옆으로 끌어 닫고 → 걸쇠를 눌러 잠금. 날리던 종이가 창틀에 내려앉음
    window: (P, B, ok, V) => new Promise(async (res) => {
      const O = [735, 92, 380, 532], open = O[2] * 0.82;
      const clip = bel(B.el, 's2-fclip', O[0], O[1], O[2], O[3]);
      const pane = bimg(clip, 'fix_pane', 0, -6, O[2] + 14); pane.style.height = (O[3] + 14) + 'px';
      const hd = G.el('button', 's2-fhd', clip); hd.type = 'button'; hd.setAttribute('aria-label', '창문 손잡이'); hd.style.touchAction = 'none';
      const paper = bimg(B.el, 'fix_paper', 860, 300, 120, 'flut'); const leaf = ART('wind_leaf') ? bimg(B.el, 'wind_leaf', 950, 220, 60, 'flut2') : null;
      const wm = loudMark(B.el, 930, 360);
      let cur0 = open, st = null, fin = false;
      const setX = (v) => { cur0 = Math.max(0, Math.min(open, v)); pane.style.transform = `translateX(${cur0}px)`; hd.style.left = (cur0 + 6) + 'px'; };
      setX(open);
      await play(['SD02_rumi_09']); if (!ok()) return res(false);
      hd.addEventListener('pointerdown', (e) => { if (fin || G.dialog.active) return; st = { id: e.pointerId, x: e.clientX, c: cur0 }; try { hd.setPointerCapture(e.pointerId); } catch (_) { } G.audio.sfx('sfx_tap', 0.4); G.help.poke(); });
      hd.addEventListener('pointermove', (e) => { if (!st || e.pointerId !== st.id) return; setX(st.c + (e.clientX - st.x) / (B.k || 1)); if (cur0 < 4) shut(); });
      const up = (e) => { if (!st || e.pointerId !== st.id) return; st = null; if (cur0 < open * 0.15) shut(); };
      hd.addEventListener('pointerup', up); hd.addEventListener('pointercancel', up);
      async function shut() {
        if (fin) return; fin = true; st = null; setX(0); hd.remove(); G.help.off(); cur = null;
        G.audio.sfx('sfx_window_close', 0.5); wm.classList.add('gone'); if (V && V.s2) V.s2.hushWindow = true;
        paper.classList.remove('flut'); paper.animate && paper.animate([{ left: '860px', top: '300px', transform: 'translate(-50%,-50%) rotate(0deg)' }, { left: '560px', top: '690px', transform: 'translate(-50%,-50%) rotate(-12deg)' }], { duration: 1400, easing: 'ease-in-out', fill: 'forwards' });
        if (leaf) leaf.remove();
        await G.wait(1.0); if (!ok()) return res(false);
        await play(['SD02_rumi_41']); if (!ok()) return res(false);
        const la = bimg(B.el, 'fix_latch_open', 660, 352, 96, 's2-flatch'); la.style.transform = 'translate(-50%,-50%)'; la.style.touchAction = 'none';
        const spot = tapSpot(B.el, 762, 352, true, '걸쇠 고리');   // 10/7 선생님: 걸쇠를 고리까지 끌어다 걸기
        cur = { solve: () => lock() };
        G.help.set({ l1: () => P.say('SD02_rumi_41'), l2: () => { }, l3: () => spot.classList.add('p4-target-on'), clear: () => { } });
        let locked = false;
        async function lock() { if (locked) return; locked = true; G.help.off(); cur = null; spot.remove(); la.src = ART('fix_latch_shut'); la.style.width = '112px'; G.audio.sfx('sfx_click', 0.6); spark(la, 6);
          await G.wait(0.6); if (!ok()) return res(false); await play(['SD02_rumi_42']); res(ok()); }
        G.p4.dragTo(la, () => [spot], () => { if (!G.dialog.active) lock(); });
        if (!G.lv('normal')) { G.onTap(spot, () => { if (!G.dialog.active) lock(); }); G.onTap(la, () => { if (!G.dialog.active) lock(); }); }
      }
      cur = { solve: () => shut() };
      G.help.set({ l1: () => P.say('SD02_rumi_09'), l2: () => hd.classList.add('s3-hint'), l3: () => hd.classList.add('s3-hint'), clear: () => hd.classList.remove('s3-hint') });
    }),
    // 종: 소리 상자의 [-][+]로 초록 칸에 맞추고 → 빛 알림등을 종 옆에 붙이고 → 울려 보기
    bell: (P, B, ok, V) => new Promise(async (res) => {
      const D = G.D.scenes && G.D.scenes.s2school, BB = (D && D.bellBox) || { max: 7, start: 7, green: [3, 4] };
      const bm = loudMark(B.el, 705, 240);
      await play(['SD02_daon_04'], { partner: 'daon' }); if (!ok()) return res(false);
      await play(['SD02_rumi_31']); if (!ok()) return res(false);
      const bars = bel(B.el, 's2-fbars', 570, 470, 224, 112);
      const cells = Array.from({ length: BB.max }, (_, i) => { const c = G.el('i', (i + 1 >= BB.green[0] && i + 1 <= BB.green[1]) ? 'green' : '', bars); c.style.height = (24 + i * 12) + '%'; return c; });
      let lv = BB.start, t = null, warned = false, boxDone = false;
      const draw = () => cells.forEach((c, i) => c.classList.toggle('on', i < lv));
      const inGreen = () => lv >= BB.green[0] && lv <= BB.green[1];
      const mk = (x, sign, d, label) => { const b = G.el('button', 's2-fknob', B.el, `<img src="${ART('fix_knob')}" alt=""><b>${sign}</b>`); b.type = 'button'; b.setAttribute('aria-label', label); Object.assign(b.style, { left: x + 'px', top: '528px' }); G.onTap(b, () => press(d)); return b; };
      const press = async (d) => {
        if (boxDone || G.dialog.active) return; G.help.poke(); lv = Math.max(1, Math.min(BB.max, lv + d)); draw(); G.audio.sfx('sfx_chime', 0.04 + 0.05 * lv, 1.3); clearTimeout(t);
        if (lv < BB.green[0]) { if (!warned || lv === 1) { warned = true; await play(['SD02_rumi_32']); } return; }
        if (inGreen()) t = setTimeout(() => { if (!boxDone && inGreen() && ok()) boxOk(); }, 1200);
      };
      // 10/7 선생님: [-][+] 누르기 대신 손잡이를 끌어서 소리 크기를 맞춤 (쉽게 단계는 [-][+]도 남김)
      const easyKnob = !G.lv('normal');
      const kL = easyKnob ? mk(470, '-', -1, '작게') : null, kR = easyKnob ? mk(895, '+', 1, '크게') : null;
      const SX = 470, SW = 425;   // 손잡이가 움직이는 길 (왼쪽 끝 ~ 오른쪽 끝)
      const slide = bel(B.el, 's2-fslide', SX, 652, SW, 46);
      { const gr = G.el('div', 'gr', slide); const a = (BB.green[0] - 1) / (BB.max - 1), b = (BB.green[1] - 1) / (BB.max - 1);
        gr.style.left = (a * 100) + '%'; gr.style.width = ((b - a) * 100) + '%'; }
      const hand = G.el('button', 's2-fhandle', B.el, `<img src="${ART('fix_knob')}" alt="">`); hand.type = 'button'; hand.setAttribute('aria-label', '소리 크기 손잡이');
      hand.style.top = '675px';
      const handX = () => { hand.style.left = (SX + SW * (lv - 1) / (BB.max - 1)) + 'px'; };
      handX();
      { let dr = null;
        const atX = (cx) => { const r = slide.getBoundingClientRect(), k = Math.max(0, Math.min(1, (cx - r.left) / r.width)); return 1 + Math.round(k * (BB.max - 1)); };
        hand.addEventListener('pointerdown', (e) => { if (boxDone || G.dialog.active || G.paused) return; dr = e.pointerId; hand.classList.add('dragging'); try { hand.setPointerCapture(e.pointerId); } catch (_) { } });
        hand.addEventListener('pointermove', (e) => { if (dr !== e.pointerId) return; const n = atX(e.clientX); if (n !== lv) { press(n - lv); handX(); } });
        const upH = (e) => { if (dr !== e.pointerId) return; dr = null; hand.classList.remove('dragging'); handX(); };
        hand.addEventListener('pointerup', upH); hand.addEventListener('pointercancel', upH);
      }
      draw();
      cur = { solve: () => { lv = BB.green[0]; draw(); handX(); boxOk(); } };
      G.help.set({ l1: () => P.say('SD02_rumi_31'), l2: () => hand.classList.add('hint'), l3: () => hand.classList.add('hint'), clear: () => hand.classList.remove('hint') });
      async function boxOk() {
        if (boxDone) return; boxDone = true; clearTimeout(t); G.help.off(); cur = null; G.audio.sfx('sfx_sparkle', 0.6); bars.classList.add('ok'); if (kL) kL.classList.add('off'); if (kR) kR.classList.add('off'); hand.classList.add('off'); hand.style.pointerEvents = 'none';
        bm.classList.add('gone'); if (V && V.s2) V.s2.hushBell = true;
        await G.wait(0.8); if (!ok()) return res(false);
        await play(['SD02_rumi_33']); if (!ok()) return res(false);
        const spot = tapSpot(B.el, 1008, 232, false, '종 옆 빈 자리');
        const u = await G.p4.useItem('flashlamp', spot, { parent: P.root, say: P.say, hint: 'SD02_rumi_33' }); if (!ok() || !u) return res(false);
        spot.remove();
        const lamp = bimg(B.el, 'fix_lamp_off', 1008, 232, 112, 'pop'); lamp.style.transform = 'translate(-50%,-50%)';
        await G.wait(0.8); if (!ok()) return res(false);
        for (let i = 0; i < 3; i++) {   // 울려 보기: 종이 알맞게 울리면 알림등이 반짝
          G.audio.sfx('sfx_chime', 0.2, 1.2); lamp.src = ART('fix_lamp_on'); lamp.classList.add('glow'); wave(B.el, 705, 240, 160);
          await G.wait(0.5); lamp.src = ART('fix_lamp_off'); lamp.classList.remove('glow'); await G.wait(0.35); if (!ok()) return res(false);
        }
        lamp.src = ART('fix_lamp_on'); lamp.classList.add('glow');
        await play(['SD02_daon_11'], { partner: 'daon' }); res(ok());
      }
    }),
    // 사물함: 기름 뿌리개를 경첩 두 곳에 대고 → 문을 살짝 움직여 봄 (삐걱 소리 없음)
    locker: (P, B, ok, V) => new Promise(async (res) => {
      const H = [[475, 215], [475, 615]];
      const door = bel(B.el, 's2-fdoor', 466, 40, 380, 728); door.style.backgroundImage = `url("${ART('fix_locker_bg')}")`; door.style.backgroundPosition = '-466px -40px';
      const marks = H.map(([x, y]) => loudMark(B.el, x, y));
      const rock = (loud) => { if (door.animate) door.animate([{ transform: 'perspective(1400px) rotateY(0deg)' }, { transform: 'perspective(1400px) rotateY(-14deg)' }, { transform: 'perspective(1400px) rotateY(0deg)' }], { duration: 900, easing: 'ease-in-out' }); if (loud) G.audio.sfx('loop_locker', 0.5); };
      rock(true);
      await play(['SD02_rumi_13']); if (!ok()) return res(false);
      for (let i = 0; i < H.length; i++) {
        const [hx, hy] = H[i], sp = tapSpot(B.el, hx, hy, true, '경첩');
        const u = await G.p4.useItem('oil', sp, { parent: P.root, say: P.say, hint: 'SD02_rumi_13' }); if (!ok() || !u) return res(false);
        sp.remove(); oilSpray({ fx: B.el }, hx, hy); marks[i].classList.add('gone');
      }
      if (V && V.s2) V.s2.hushLocker = true;
      await G.wait(0.6); if (!ok()) return res(false);
      await play(['SD02_rumi_43']); if (!ok()) return res(false);
      const sp = tapSpot(B.el, 700, 400, false, '사물함 문 손잡이');   // 10/7 선생님: 손잡이를 옆으로 끌어서 열기
      const pull = tapSpot(B.el, 300, 400, false, '여는 쪽'); pull.classList.add('s2-pull');
      let fin = false;
      const go = async () => { if (fin || G.dialog.active) return; fin = true; G.help.off(); cur = null; sp.remove(); pull.remove(); rock(false); setTimeout(() => G.audio.sfx('sfx_click', 0.3, 0.8), 820); await G.wait(1.1); if (!ok()) return res(false); spark(door, 8); await play(['SD02_rumi_14']); res(ok()); };
      G.p4.dragTo(sp, () => [pull], go);
      if (!G.lv('normal')) { G.onTap(sp, go); G.onTap(door, go); }
      cur = { solve: go };
      G.help.set({ l1: () => P.say('SD02_rumi_43'), l2: () => { }, l3: () => pull.classList.add('p4-target-on'), clear: () => { } });
    }),
  };
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
  // 리듬 자물쇠: 큰 동그라미 = 쿵(큰 북), 작은 동그라미 = 짝(손뼉). 틀려도 처음으로 돌아가지 않음
  // 10/6 고칠 목록 7: 쉬움 쿵짝쿵짝(동그라미 보임), 보통 쿵짝쿵짝쿵·어려움 6박 무작위는 동그라미를 가리고 듣고 맞춤. 틀리면 다시 들려주며 동그라미가 차례로 빛남
  function rhythmLock(S) {
    return new Promise((res) => {
      const R = D2().rhythm, easy = !G.lv('normal'), g = G.gen, ok = () => g === G.gen;
      let pat = R[G.level()] || R.normal;
      if (G.lv('hard')) { do { pat = 'B' + Array.from({ length: 5 }, () => Math.random() < 0.5 ? 'B' : 's').join(''); } while (!pat.includes('s') || pat.includes('BBB') || pat.includes('sss')); }
      const wrap = G.el('div', 's2-wrap dim', S.root);
      const card = G.el('div', 's2-card', wrap);
      G.el('div', 's2-card-head', card, G.icon('item_rhythm_card') + ' 리듬 카드');
      const beats = [...pat].map(ch => { const b = G.el('div', 's2-beat ' + (ch === 'B' ? 'big' : 'small') + (easy ? '' : ' hide'), card, G.artImg(ch === 'B' ? 'beat_big' : 'beat_small') || ''); b.dataset.k = ch; return b; });
      const pads = G.el('div', 's2-pads', wrap);
      const pad = (k, label) => { const b = G.btn('s2-pad ' + (k === 'B' ? 'big' : 'small'), `<div class="pimg">${G.artImg(k === 'B' ? 'beat_big' : 'beat_small') || ''}</div><span>${label}</span>`, pads, () => hit(k, b), label); return b; };
      const pB = pad('B', '쿵'), pS = pad('s', '짝');
      const again = G.btn('pill s2-again', G.icon('icon_sound') + ' 다시 듣기', wrap, () => { if (!demo && !fin) listen(false); }, '다시 듣기');
      let i = 0, fin = false, demo = true, arrow = null;
      const sound = (k) => k === 'B' ? G.audio.sfx('sfx_kung', 0.6) : G.audio.sfx('sfx_jjak', 0.5);
      const flash = (el, cls) => { el.classList.add(cls); setTimeout(() => el.classList.remove(cls), 280); };
      const nextGlow = () => beats.forEach((b, j) => b.classList.toggle('next', easy && j === i && !fin));
      S.layout = () => { const [x, y, w, h] = area(S); Object.assign(wrap.style, { left: x + 'px', top: y + 'px', width: w + 'px', height: h + 'px' }); const k = Math.min(1, h / (G.stage.u * 640), w / (G.stage.u * 1000)); wrap.style.transform = k < 1 ? `scale(${k.toFixed(3)})` : ''; };
      S.layout(); requestAnimationFrame(S.layout);
      wrap.animate && wrap.animate([{ opacity: 0, transform: 'scale(.92)' }, { opacity: 1, transform: 'none' }], { duration: 400, easing: 'ease-out' });
      // 들려주기: 쉬움은 동그라미가 빛나며, 보통·어려움은 소리만 (light = 틀렸을 때 빛 힌트)
      async function listen(light) {
        demo = true; again.classList.add('off');
        for (let r = 0; r < pat.length; r++) {
          if (!ok() || fin) return;
          if (easy || light) { const b = beats[r]; b.classList.remove('hide'); flash(b, 'flash'); if (!easy && r >= i) setTimeout(() => b.classList.add('hide'), 420); flash(pat[r] === 'B' ? pB : pS, 'hit'); }
          sound(pat[r]); await G.wait(G.reduced() ? 0.4 : 0.62);
        }
        demo = false; again.classList.remove('off'); nextGlow();
      }
      (async () => {
        await play(easy ? ['SD03_rumi_03', 'SD03_rumi_04'] : ['SD03_rumi_03', 'SD03_rumi_11']); if (!ok()) return;
        await listen(false);
      })();
      async function hit(k, b) {
        if (fin || demo || G.dialog.active) return;
        clear(); sound(k); flash(b, 'hit');
        if (k === pat[i]) { beats[i].classList.remove('hide'); beats[i].classList.add('on'); i++; nextGlow(); if (i >= pat.length) win(); return; }
        wob(b); demo = true; beats[i].classList.remove('hide'); beats[i].classList.add('flash');   // 다음 동그라미를 먼저 보여 줌 await G.wait(0.5); if (!ok() || fin) return;
        await play([easy ? 'SD03_rumi_04' : 'SD03_rumi_12']); if (!ok() || fin) return;
        await listen(true);
      }
      async function win() {
        if (fin) return; fin = true; cur = null; G.help.off(); clear(); S.hush(); nextGlow(); again.remove();
        beats.forEach(b => { b.classList.remove('hide'); b.classList.add('on'); });
        for (let r = 0; r < beats.length; r++) { G.audio.sfx('sfx_chime', 0.3, 0.9 + r * 0.1); await G.wait(G.reduced() ? 0.05 : 0.22); }
        spark(card, 14); await G.wait(0.8); wrap.remove(); S.layout = null; res(ok());
      }
      function clear() { if (arrow) arrow.remove(); arrow = null; pB.classList.remove('hint'); pS.classList.remove('hint'); }
      const want = () => pat[i] === 'B' ? pB : pS;
      cur = { solve: () => { demo = false; i = pat.length; win(); } };
      G.help.set({ l1: () => { if (!demo) listen(true); }, l2: () => { if (!arrow && !demo) arrow = arrowAt(S.root, want()); }, l3: () => { if (!demo) want().classList.add('hint'); }, clear });
    });
  }
  G.flows.s2_hall = async (ctx) => {
    const { S, V, H, g, complete } = ctx, ok = () => g === G.gen, id = H.def.id, o = { partner: 'duri' };
    if (id === 'duri') {
      if (!done('s2hall_duri')) {
        await play(['SD03_duri_01', 'SD03_duri_02', 'SD03_duri_03', 'SD03_duri_04'], { ...o, keep: true }); if (!ok()) return;
        // C2 (10/5): 내 생각도 말해 볼 수 있음. 다른 답도 좋은 생각으로 받아 줌
        const pick = await G.dialog.choose([{ label: G.txt('SD03_ply_01'), icon: 'icon_star', voice: 'SD03_ply_01' }, { label: G.txt('SD03_ply_02'), icon: 'icon_sound', voice: 'SD03_ply_02' }], true); if (!ok()) return;
        if (pick === 1) { await play(['SD03_duri_10'], { ...o, keep: true }); if (!ok()) return; await ask('SD03_ply_01', 'icon_star'); if (!ok()) return; }
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
      G.audio.sfx('sfx_kung', 0.45); wave(V.fx, S.drumAt[0], S.drumAt[1], 260, 2);
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
      await play(['SD04_miru_13', 'SD04_miru_14'], o); if (!ok()) return;
      if (!await G.p4.askHelp(V, 'miru', 'SD04_ply_02')) return;   // 10/9 수정안: 먼저 묻기
      await play(['SD04_miru_15', 'SD04_miru_20'], o); if (!ok()) return;   // 10/9 개선 6: 미루가 조용한 길 안내
      await colorIn(V); if (!ok()) return;
      complete('s2rest_star');
    }
  };
  // 소리 자물쇠 (10/6 고칠 목록 8): 소리 악보를 상자에 대면 종·북·피리 소리가 차례로 남. 들은 순서대로 그림을 누름
  // 칸 수 = 누를 수 (쉽게 2, 보통 3, 어렵게 5). 틀리면 다시 들려주며 다음에 누를 그림 테두리가 깜박임
  function picLock() {
    return new Promise(async (res) => {
      const L = D2().picLock, g = G.gen, ok = () => g === G.gen, easy = !G.lv('normal');
      const order = easy ? L.order.slice(0, 2) : G.lv('hard') ? [...L.order, ...L.order.slice(0, -1).reverse()] : L.order.slice();
      const SFX = { bell: ['sfx_ibell', 0.5, 1], drum: ['sfx_kung', 0.6, 1], flute: ['sfx_pipe', 0.5, 1] };   // 선생님 효과음: 종·큰 북·리코더
      const S = screen('s2-box');
      const wrap = G.el('div', 's2-wrap dim', S.root);
      const slots = G.el('div', 's2-slots', wrap), cells = order.map(() => G.el('div', 's2-slot', slots));
      const B = board(wrap, L.size[0], L.size[1]); B.el.style.backgroundImage = `url("${ART('rest_box')}")`; B.el.style.position = 'relative';
      const holder = G.el('div', '', wrap); holder.style.position = 'relative'; holder.appendChild(B.el);
      const pics = G.el('div', 's2-pics', wrap);
      const btns = {}; for (const k of shuffle(L.order)) btns[k] = G.btn('s2-pic', `<img src="${ART(L.art[k])}" alt=""><span>${L.name[k]}</span>`, pics, () => press(k), L.name[k]);
      const again = G.btn('pill s2-again off', G.icon('icon_sound') + ' 다시 듣기', wrap, () => { if (!demo && !fin) listen(false); }, '다시 듣기');
      let i = 0, fin = false, arrow = null, demo = true;
      S.layout = () => {
        const [x, y, w, h] = area(S), u = G.stage.u; Object.assign(wrap.style, { left: x + 'px', top: y + 'px', width: w + 'px', height: h + 'px' });
        const rest = slots.getBoundingClientRect().height + pics.getBoundingClientRect().height + again.getBoundingClientRect().height + u * 90, bh = Math.max(80, Math.min(h - rest, w * 0.5 * L.size[1] / L.size[0]));
        const k = bh / L.size[1]; holder.style.width = (L.size[0] * k) + 'px'; holder.style.height = bh + 'px'; B.el.style.position = 'absolute'; B.fit([0, 0, L.size[0] * k, bh]);
        if (arrow) { arrow.remove(); arrow = null; }
      };
      S.layout(); requestAnimationFrame(S.layout);
      const glowNext = () => { for (const k in btns) btns[k].classList.toggle('hint', easy && !fin && !demo && order[i] === k); };
      const blinkNext = (on) => { for (const k in btns) btns[k].classList.toggle('blink', on && order[i] === k); };
      async function listen(hint) {
        demo = true; again.classList.add('off'); glowNext(); blinkNext(hint);
        for (let r = 0; r < order.length; r++) {
          if (!ok() || fin) return;
          const [n, v, rt] = SFX[order[r]]; G.audio.sfx(n, v, rt);
          if (B.el.animate) B.el.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.03)' }, { transform: 'scale(1)' }], { duration: 300 });
          await G.wait(G.reduced() ? 0.8 : 1.4);
        }
        demo = false; again.classList.remove('off'); glowNext();
        if (hint) setTimeout(() => blinkNext(false), 2600);
      }
      // 먼저 소리 악보를 상자에 댐
      const used = await G.p4.useItem('score', B.el, { parent: S.root, say: S.say, hint: 'SD04_rumi_02' }); if (!ok() || !used) return;
      await play(['SD04_rumi_11']); if (!ok()) return;
      await listen(false);
      async function press(k) {
        if (fin || demo || G.dialog.active) return; clear();
        const [n, v, rt] = SFX[k]; G.audio.sfx(n, v * 0.7, rt);
        if (k !== order[i]) {
          wob(btns[k]); demo = true; blinkNext(true); await G.wait(0.4); if (!ok() || fin) return;
          await play(['SD04_rumi_12']); if (!ok() || fin) return;
          await listen(true); return;
        }
        blinkNext(false);
        const c = cells[i]; c.innerHTML = `<img src="${ART(L.art[k])}" alt="">`; c.classList.add('lit');
        i++; glowNext(); if (i >= order.length) win();
      }
      async function win() {
        if (fin) return; fin = true; cur = null; G.help.off(); clear(); S.hush(); glowNext(); blinkNext(false); again.remove();
        G.audio.sfx('sfx_door', 0.5); spark(B.el, 14);
        if (B.el.animate) await B.el.animate([{ filter: 'brightness(1)' }, { filter: 'brightness(1.5)' }, { filter: 'brightness(1)' }], { duration: 800 }).finished.catch(() => { });
        await G.wait(0.4); S.end(); res(ok());
      }
      function clear() { if (arrow) arrow.remove(); arrow = null; for (const k in btns) btns[k].classList.remove('hint'); glowNext(); }
      cur = { solve: () => { demo = false; while (!fin && i < order.length) press(order[i]); } };
      G.help.set({ l1: () => { if (!demo) listen(true); }, l2: () => { if (!arrow && !fin && !demo) arrow = arrowAt(S.root, btns[order[i]]); }, l3: () => { if (!fin && !demo) btns[order[i]].classList.add('hint'); }, clear });
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
      // 10/7 선생님: 물건은 끌어다 놓기만 (쉽게 단계만 고르고 누르기도)
      const onT = (e) => { if (fin || G.dialog.active || G.paused) return; e.stopImmediatePropagation(); e.preventDefault(); if (sel) put(sel.d, sel.b); };
      const tapOk = !G.lv('normal');
      if (tapOk) target.addEventListener('click', onT, true);
      function end() { if (fin) return; fin = true; cur = null; G.help.off(); if (tapOk) target.removeEventListener('click', onT, true); target.classList.remove('p4-target', 'p4-target-on'); tray.remove(); res(ok()); }
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
      await play(['SD04_rumi_21']); if (!ok()) return;   // 10/9 개선 6
      await play(['SD05_duri_01'], { partner: 'duri' }); if (!ok()) return;
      await play(['SD05_miru_01'], { partner: 'miru' }); if (!ok()) return;
      // B5 (10/5): 미루를 위해 음악회를 바꾸는 장면
      await play(['SD05_duri_10'], { partner: 'duri' }); if (!ok()) return;
      await play(['SD05_miru_10'], { partner: 'miru' }); if (!ok()) return;
      await play(['SD05_daon_01', 'SD05_daon_02'], { partner: 'daon' }); if (!ok()) return;
      await play(['SD05_duri_02'], { partner: 'duri' }); if (!ok()) return;
      await concert(V, S); if (!ok()) return;
      await play(['SD05_rumi_01']); if (!ok()) return;
      if (!await G.p4.daonGuide('sound', 'SD05_daon_10', 'SD05_daon_11')) return;   // 10/9 수정안 3단계: 다온의 쉬운 안내판
      // C1 (10/5): 찾은 방법을 하나씩 별에게 돌려줌
      if (!await G.starCard('sound', [{ art: 'hall_seats', label: '편한 자리' }, { art: 'item_headphones', label: '헤드폰' }, { art: 'item_cushion', label: '쉼터' }, { art: 'item_tennis', label: '테니스공' }])) return;
      const s = G.STARS.find(q => q.id === 'sound'), st = G.el('div', 's2-star', G.$('#closeup'), G.starSvg(s));
      Object.assign(st.style, { left: '50%', top: '22%', width: G.stage.u * 145 + 'px', height: G.stage.u * 145 + 'px', position: 'absolute', marginLeft: (-G.stage.u * 72) + 'px', filter: 'drop-shadow(0 0 30px rgba(220,190,255,1))' });
      await play(['SD05_rumi_02']); st.remove(); if (!ok()) return;
      if (!await G.p4.beforeAfter('s2hall_before', 's2hall_after', 'SD05_rumi_20')) return;   // 10/9 수정안 3단계: 셋째 교훈은 전과 후 그림으로
      // 10/8 작가: SD05_chief_01(별이 하던 일 말하기) 뺌 - 별 카드가 보여 줌
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
      await play(['SD05_chief_02'], { partner: 'duri' }); if (!ok()) return;   // 10/8 검토: 깨달음은 북을 크게 치던 두리 단장이 (번호 그대로, 목소리 두리)
      await play(['SD05_chief_03'], { partner: 'chief' }); if (!ok()) return;   // 촌장님은 선배로 한마디
      if (!cleared('s2plaza')) G.st.cleared.push('s2plaza');   // 별을 올리면 바로 엔딩 (C7 없이)
      complete('s2plaza_star'); if (!ok()) return;
      await ending();
    }
  };
  // 짧은 음악회: 부드러운 음악, 박자는 가로등 빛과 무대 빛으로도
  // 10/4 선생님: 효과가 부족함 → 약 10초 동안 하늘색 음표가 무대와 사람들 위로 천천히 떠오르고, 모두 박자에 맞춰 살살 몸을 흔듦
  const CONCERT_MUSIC = 'music_orchestra';   // 10/6 선생님 오케스트라 음악: 음악회 10초는 크게, 그 뒤 작게 말의 별 시작 전까지
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
    G.audio.holdMusic(CONCERT_MUSIC, 2.2);
    const sg = S.stage || [1200, 560], glow = G.el('div', 's2-concert', V.fx); Object.assign(glow.style, { left: sg[0] + 'px', top: sg[1] + 'px' });   // 10/8: 잔치 마당 무대 위
    const box = G.el('div', 's2-cnotes', V.fx);
    const sps = ['chief', 'daon', 'duri', 'miru', 'hero'].map(k => V.spr[k]).filter(q => q && q.img.style.display !== 'none'), people = sps.map(q => q.img);
    people.forEach(p => p.style.transformOrigin = '50% 100%');   // 발을 붙인 채 살살 흔들기
    const from = sps.map(q => { const r = q.rect || q.def.rect; return [r[0] + r[2] / 2, r[1] + 10]; });
    from.push([sg[0], sg[1] - 40], [sg[0] - 150, sg[1] + 40], [sg[0] + 150, sg[1] + 40]);   // 무대 둘레
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
    G.audio.musicLevel(0.8, 3);   // 음악은 끊지 않고 작게 이어짐 (말의 별 시작에서 놓음)
  }
  // 별이 받침대에서 하늘로 + 불꽃놀이
  // 10/3 선생님: 길의 별(C11)과 똑같이. 이 별 이야기의 인물들이 받침대 둘레로 모여 함께 올림 → 빛을 잃은 별이 받침대로 → 빛 기둥 → 기둥 꼭대기에서 별 → 카메라가 밤하늘로 → 광장으로 돌아와 가로등·색·불꽃놀이·「소리의 별」
  const GATHER = { chief: [900, 520], duri: [1380, 430], daon: [1370, 870], miru: [960, 720] };   // 받침대(1098,502,203,215) 둘레 자리 (그림 왼쪽 위)
  async function starRise(V, H) {
    const s = G.STARS.find(q => q.id === 'sound'), ov = G.$('#overlay'), u = G.stage.u, rm = G.reduced();
    const { W, H: SH } = G.stage, wl = V.el.parentNode, S = V.S, ped = S.hotspots.find(h => h.id === 'pedestal').rect;
    const layer = G.el('div', 'layer', ov); layer.style.pointerEvents = 'none';
    G.hud.hide(true);
    V.fx.querySelectorAll('.hot-glow, .mstar').forEach(e => e.style.visibility = 'hidden');   // 옛 자리에 빛 테두리가 남지 않게
    // (가) 인물들이 받침대 둘레로 모임
    await V.gather(GATHER, 4);   // 10/8 선생님: 받침대로 올 때도 픽셀 걷기로 광장 길을 따라
    const [bx, by] = V.toScreen(ped[0] + ped[2] / 2, ped[1] + 40), hs = (V.spr.hero && V.spr.hero.rect) || S.sprites.find(q => q.id === 'hero').rect, [hx, hy] = V.toScreen(hs[0] + hs[2] / 2, hs[1]);
    // (나) 빛을 잃은 별이 주인공에게서 받침대로
    const piece = G.el('div', 'c11-item', layer, G.icon(G.litIcon('piece_sound')));   // 10/6: 받침대로 가는 별은 빛나는 별 Object.assign(piece.style, { left: hx + 'px', top: hy + 'px' });
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
    // 10/6 선생님: 별가루를 연료처럼 뿜으며 반짝이는 잔상을 남기고 올라감 (core.js G.riseTrail, 인트로와 같은 효과)
    const tr = G.riseTrail(layer, big, s.color), bs = big.offsetWidth || 190 * u;
    const pan = (k) => { const d = SH * k; tr.shift(d); wl.style.transform = `translateY(${d}px)`; sky.style.transform = `translateY(${d - SH}px)`; sky.style.opacity = Math.min(1, k * 2.5); pillar.style.translate = `0 ${d}px`; };
    const fly = (k) => { pan(k); const x = sx0 + (sx1 - sx0) * k, y = sy0 + (sy1 - sy0) * k - Math.sin(k * Math.PI) * 60 * u; big.style.left = x + 'px'; big.style.top = y + 'px'; big.style.transform = `translate(-50%,-50%) scale(${1 - 0.21 * k})`; tr(k, x, y, bs * (1 - 0.21 * k)); };
    if (rm) fly(1); else await G.tween(0, 1, 2.4, fly, 'io'); tr.end();
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
      await G.wait(rm ? 0.4 : 2.6); if (!ok()) return;   // D1 (10/5): 해설 대신 색이 번지는 모습을 보여 줌
      const rest = D2().restMarks.map(at => { const e = G.el('div', 's2-restmark', MV.fx, G.artImg('mark_rest') || ''); Object.assign(e.style, { left: at[0] + 'px', top: at[1] + 'px' }); e.animate && e.animate([{ scale: .2, opacity: 0 }, { scale: 1.2, opacity: 1 }, { scale: 1 }], { duration: 700, easing: 'ease-out' }); return e; });
      G.tween(0, 1, rm ? 0.3 : 2.5, k => MV.setCam(cam[0] + (3900 - cam[0]) * k, cam[1] + (1950 - cam[1]) * k, 1 - 0.25 * k), 'io');
      G.audio.sfx('sfx_chime', 0.4);
      await play(['SD06_miru_01'], { partner: 'miru' }); if (!ok()) return;
      await play(['SD06_duri_01'], { partner: 'duri' }); if (!ok()) return;
      // 10/8 작가: SD06_chief_01(교훈 되풀이) 뺌
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
    G.STARS.forEach((s, i) => { const e = G.el('div', 'c11-slot' + (i < 2 ? ' me lit' : ''), m, G.starSvg(s, i >= 2)); Object.assign(e.style, { left: POS[i % POS.length][0] * 100 + '%', top: POS[i % POS.length][1] * 100 + '%' }); });
    G.el('div', 'star-count sky-count', m, G.icon('icon_star') + ' 되찾은 별 2/8');
    G.pedestalRow(m, 2, D2().next);   // 10/6: 다음 별은 하늘이 아니라 받침대 빈 자리가 깜박여 알려 줌
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
    done: ['meet_lumi', 'plaza_intro', 'plaza_chief', 'plaza_board', 'plaza_post', 'library_intro', 'library_haesol', 'library_tactile', 'library_puzzle', 'plaza_post_ask', 'letter_1', 'letter_2', 'letter_3', 'market_jig', 'libdoor_seen', 'libdoor_open', 'note_got',
      'forest_intro', 'forest_wind', 'forest_star', 'forest_daon', 'plaza2_intro', 'plaza2_board', 'plaza2_road', 'plaza2_look', 'plaza2_star', 'road_tiles'],
    cleared: ['plaza', 'market', 'library', 'forest', 'plaza2'], items: ['note', 'map', 'tactile', 'piece', 'light'],
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

  // ================= 작은 도구 (말의 별과 같음) =================
  const ART = (n) => G.art(n) || '';
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
  function presentItem(id) { return G.present.item(id); }

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
    // 10/6 선생님: 말의 별 엔딩 뒤에는 마을 모든 장소에 그림 표시. 선생님 그림 place_<장소>가 오면 그것을 먼저 씀, 없으면 비슷한 그림, 그것도 없으면 그 장소는 비워 둠
    if (done('s3_end') && !V.s3ico) V.s3ico = MAPICO3.map(([id, k]) => {
      const p = G.D.places.places.find(q => q.id === id), src = G.art('place_' + id) || G.art(k); if (!p || !src) return null;
      const e = G.el('div', 's3-mapico', V.fx, `<img src="${src}" alt="">`); Object.assign(e.style, { left: (p.marker[0] + 110) + 'px', top: (p.marker[1] - 30) + 'px' }); return e;
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
    if (c.rm) V.setCam(V.home()[0], V.home()[1], 1); else V.setCam(V.home()[0] - 150, V.home()[1] + 20, 1.25);
    c.t0 = G.t;
    await Promise.all([
      U.fadeIn(c, root, 0.5),
      (async () => { if (!c.rm) await c.tween(0, 1, 3.6, k => V.setCam(V.home()[0] - 150 + 150 * k, V.home()[1] + 20 - 20 * k, 1.25 - 0.25 * k), 'io'); })(),
      U.title(c, root, S.name, 'S92_place_' + (S.zone || place), 0.8, 4.4),
    ]);
    V.setCam(V.home()[0], V.home()[1], 1); off();
  }
  G.cut.add({
    S3A_s3cafe: (c, r, o) => arriveS3(c, r, o, 's3cafe'),
    S3A_s3dock: (c, r, o) => arriveS3(c, r, o, 's3dock'),
    S3A_s3harang: (c, r, o) => arriveS3(c, r, o, 's3harang'),
    S3A_s3plaza: (c, r, o) => arriveS3(c, r, o, 's3plaza'),
  });


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
  // ================= 말의 별만의 도구 (그림 카드, 엔딩 뒤 지도 표시) =================
  const cardImg = (k) => ART('card_' + k);
  const MAPICO3 = [['s3cafe', 'card_tea'], ['s3dock', 'card_lake'], ['s3harang', 'card_draw'], ['plaza', 'card_plaza'], ['market', 'card_bread'], ['library', 'place_library'],
    ['forest', 'place_forest'], ['s2school', 'place_s2school'], ['s2hall', 'pic_drum'], ['s2rest', 'mark_rest']];   // 장소 그림 표시 (엔딩 뒤 지도)
  const cardWord = (k) => D3().cards[k] || '';
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
.s3-bub.s3-live { animation: s3live 1.8s ease-in-out infinite; box-shadow: 0 0 28px 6px rgba(255, 214, 107, .6); }   /* 10/8 검토: 그림자는 고정, 테두리 색만 바뀜 */
@keyframes s3live { 50% { border-color: #FFD66B; } }
.s3-bub img { width: 100px; height: 100px; object-fit: contain; }
.s3-knot { position: absolute; width: 96px; height: 96px; margin: -48px 0 0 -48px; border-radius: 50%; border: 0; padding: 0; pointer-events: none; background: radial-gradient(circle, #fff3c9 0%, #f4a259 60%, #b0663a 100%); box-shadow: 0 0 0 5px #fff, 0 6px 10px rgba(0,0,0,.4); }
.s3-knot.under { filter: grayscale(.7) brightness(.8); }
.s3-knot.art { background: none; box-shadow: none; } .s3-knot.art img { width: 100%; height: 100%; object-fit: contain; display: block; filter: drop-shadow(0 4px 4px rgba(0,0,0,.35)); }
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
.s3-tile.off { opacity: .3; cursor: default; }
.s3-tile .leaf { width: 100%; height: 100%; display: block; transition: transform .2s; pointer-events: none; }
.s3-tile:has(.leaf) { background: transparent; box-shadow: none; } .s3-tile.lit .leaf { filter: brightness(1.12) drop-shadow(0 0 8px #FFD66B); }
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
.s3-water { background: linear-gradient(#3f6fb0, #2d4f8a); background-size: cover; background-position: center; overflow: hidden; }
.s3-water.art .s3-rip { border-color: rgba(60, 110, 185, .75); background: rgba(255, 255, 255, .2); }
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
.s3-arrow { position: absolute; width: 80px; height: 54px; z-index: 3; } .s3-arrow img.side { width: 60px; height: 60px; transform: rotate(-90deg); display: block; margin: -3px auto 0; }
.s3-relay-tray { position: absolute; display: flex; gap: 40px; align-items: center; justify-content: center; }
.s3-opt { border: 6px solid #e0b96a; border-radius: 28px; background: #fffaf0; padding: 16px 26px; cursor: pointer; display: flex; gap: 10px; font-family: var(--f-title); font-size: 44px; color: var(--brown); box-shadow: 0 8px 0 #c9a45c; position: relative; }
.s3-opt .g svg, .s3-opt .g img { width: 120px; height: 120px; display: block; }
.s3-dslot .s3-ghost { position: absolute; inset: 0; opacity: .35; pointer-events: none; }
.s3-dslot .s3-ghost > * { width: 100%; height: 100%; }
.s3-opt > img { width: 120px; height: 120px; object-fit: contain; display: block; }
.s3-waitq { background: rgba(15, 18, 38, .35); }
.s3-hour { position: relative; width: calc(var(--u) * 260); height: calc(var(--u) * 260); }
.s3-hour img { position: absolute; inset: 22%; width: 56%; height: 56%; object-fit: contain; }
.s3-hour svg { width: 100%; height: 100%; }
.s3-cover { position: absolute; left: 50%; top: calc(var(--sat) + var(--u) * 30); transform: translateX(-50%); display: flex; gap: calc(var(--u) * 40); align-items: center; pointer-events: none; }   /* 10/5 B4 */
.s3-cover img, .s3-cover svg { width: calc(var(--u) * 250); height: calc(var(--u) * 250); object-fit: contain; filter: drop-shadow(0 4px 10px rgba(0, 0, 0, .45)); }
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

  // ================= 말의 별-1: 북쪽 길 (소리의 별 엔딩 뒤 저절로) =================
  async function begin() {
    if (beginning) return; beginning = true;
    const g = G.gen, ok = () => g === G.gen;
    try {
      G.help.off(); G.busy++;
      G.audio.holdMusic(null); G.audio.music('music_night');   // 10/6: 소리의 별 음악회 음악을 여기서 놓음
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
        // 10/6 선생님: 북쪽 호숫가 땅에서 분홍빛이 안개 너머로 새어 나옴 (별은 땅에 떨어졌음)
        const s = G.STARS.find(q => q.id === 'word');
        const star = G.groundLeak(V.fx, sky[0], sky[1] + 520, s.color), blink = null;
        G.audio.sfx('sfx_chime', 0.15, 1.2);
        await G.wait(rm ? 0.4 : 1.4); if (!ok()) return;
        await play(['WD01_rumi_01'], { noPortraits: true }); if (!ok()) return;
        await play(['WD01_post_01', 'WD01_chief_01', 'WD01_post_02'], { partner: 'post' }); if (!ok()) return;   // 10/8 검토: 별 이름은 이음 아저씨가 소식으로 (WD01_chief_01 번호 그대로, 목소리 이음)
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
      await play(['WD01_rumi_04', 'WD01_rumi_30']); if (!ok()) return;   // 10/9 개선 6: 퍼즐 까닭
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
        const f = S.at(G.el('div', 's3-face', S.B, (G.D.portraits[p.id] ? `<img class="pf" src="${G.asset(G.D.portraits[p.id].img)}" alt="">` : `<img class="pf" src="${G.art('face_dog') || cardImg('dog')}" alt="" style="object-fit:contain;object-position:50% 50%">`) + `<span>${p.name}</span>`), 110, ys[i] - 75); return f; });
      const bubs = P.map((p, i) => S.at(G.el('div', 's3-bub s3-live', S.B, `<img src="${ART(p.pic)}" alt="">`), 1300, ys[perm[i]] - 75));   // 10/6 선생님: 움직일 수 있는 말풍선은 테두리가 천천히 빛남(s3-live), 맞추면 꺼짐
      // 실: 사람 i → 말풍선 i (그 말풍선은 perm[i] 줄에). 위·아래 순서 = 그린 순서 (마지막이 맨 위)
      const order = shuffle(P.map((_, i) => i));
      const th = order.map((i, z) => {
        const y0 = ys[i], y1 = ys[perm[i]], x0 = 290, x1 = 1300, c1 = 700 + (z - n / 2) * 60, path = document.createElementNS(ns, 'path');
        const wig = (z % 2 ? 1 : -1) * 160;
        path.setAttribute('d', `M${x0} ${y0} C${c1} ${y0 + wig}, ${c1 + 200} ${y1 - wig}, ${x1} ${y1}`);
        Object.assign(path.style, { fill: 'none', stroke: COL[i % 4], strokeWidth: 16, strokeLinecap: 'round', transition: 'opacity .6s' }); svg.appendChild(path);
        const L = path.getTotalLength ? path.getTotalLength() : 1000, pt = path.getPointAtLength ? path.getPointAtLength(L * (0.3 + 0.4 * (z + 0.5) / n)) : { x: 800, y: (y0 + y1) / 2 };
        const kn = G.el('div', 's3-knot' + (G.art('s3_knot') ? ' art' : ''), S.B, G.art('s3_knot') ? `<img src="${G.art('s3_knot')}" alt="">` : ''); S.at(kn, pt.x, pt.y); kn.style.zIndex = 5 + z;   // 10/4: 매듭은 누르는 단추가 아니라 실이 겹친 자리 표시
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
        busy = true; t.done = true; G.audio.sfx('sfx_chime', 0.5, 1 + z * 0.1); bubs[t.i].classList.remove('s3-hint', 's3-live');
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
      await play(['WD02_moa_04', 'WD02_moa_05'], { ...o, keep: true }); if (!ok()) return;   // 10/8 검토: 교훈을 먼저 말하는 WD02_moa_19 뺌
      // 10/5 기획 리뷰 C3: 해답을 학생이 고름 (어느 쪽도 틀리지 않음)
      const i = await G.dialog.choose([{ label: G.txt('WD02_ply_01'), icon: 'icon_good', voice: 'WD02_ply_01' }, { label: G.txt('WD02_ply_02'), icon: 'icon_sound', voice: 'WD02_ply_02' }], true); if (!ok()) return;
      if (i === 1) { await play(['WD02_moa_21'], { ...o, keep: true }); if (!ok()) return; await ask('WD02_ply_01'); if (!ok()) return; }
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
      await play(['WD02_moa_13', 'WD02_moa_14'], o);   // 10/8 작가: moa_12는 moa_11에 합침 if (!ok()) return;
      await play(['WD02_rumi_09']); if (!ok()) return;
      await play(['WD02_moa_15'], o); if (!ok()) return;
      say('WD02_rumi_10'); return;
    }
    if (id === 'window') {
      if (done('s3cafe_window')) { await play(['WD02_rumi_11']); return; }
      await play(['WD02_rumi_30', 'WD02_rumi_10']); if (!ok()) return;   // 10/9 개선 6: 퍼즐 까닭
      const w = await rub(); if (!ok() || !w) return;
      await play(['WD02_rumi_11']); if (!ok()) return;
      await presentItem('codeA'); if (!ok()) return;
      await play(['WD02_moa_16', 'WD02_moa_20'], o); if (!ok()) return;
      if (!await cardAct('go', '가자 카드로 대답해요')) return;   // 10/4 피드백
      await play(['WD02_moa_18'], o);   // 10/8 작가: moa_17은 moa_20에 합침 if (!ok()) return;
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
      shuffle(menu).forEach((k, i) => { items[k] = card(S, k, 800 - menu.length * 90 + i * 180, 640, (b) => pick(k, b)); G.p4.dragTo(items[k], () => gs.filter(x => !x.done).map(x => x.e), (t) => give(k, t.dataset.id)); });
      let fin = false, sel = null, arrow = null;
      S.say('WD02_rumi_02');
      async function listen(q, e) {
        if (fin || G.dialog.active) return;
        const x = gs.find(z => z.q === q); if (x.done) return;
        if (sel && easy) return give(sel, q.id);   // 10/7 선생님: 카드는 끌어다 주기만 (쉽게 단계만 고르고 누르기도)
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
        G.audio.voice('S93_card_' + b.dataset.k);   // 10/7 선생님: 누르면 카드 소리는 그대로 들려 줌
        if (!easy) return;   // 10/7 선생님: 칸에 놓는 것은 끌어다 놓기만 (쉽게 단계만 누르기도)
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
      function check() { if (!fin && clearAmt() > (easy ? 0.3 : 0.6)) win(); }   // 10/5 E2: 쉽게는 조금만 닦아도
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
      await play(['WD03_rumi_03', 'WD03_rumi_32', 'WD03_rumi_04']); if (!ok()) return;   // 10/9 개선 6: 퍼즐 까닭
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
      await play(['WD03_bau_04', 'WD03_bau_05'], o);   // 10/8 작가: 독백 줄임(06은 05에 합침) if (!ok()) return;
      if (!await cardAct('hi', '손을 흔드는 카드로 인사해요')) return;   // 손짓과 그림으로 얘기하는 바우 아저씨에게
      await play(['WD03_bau_07'], o); if (!ok()) return;   // 08은 07에 합침
      // 10/9 수정안 3단계: 바우의 손짓 신호 → 진짜 수어 인사 세 가지 (말의 별에서 미리 보여 주고 함께의 별에서 다시 씀)
      await play(['WD03_bau_20'], o); if (!ok()) return;
      G.dialog.close(); if (!await G.p4.signs([['sign_hello', 'WD03_sign_01'], ['sign_thanks', 'WD03_sign_02'], ['sign_together', 'WD03_sign_03']], 'WD03_rumi_31')) return;
      await play(['WD03_rumi_30']); if (!ok()) return;
      await play(['WD03_bau_09'], o); if (!ok()) return;
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
      const water = S.at(G.el('div', 's3-panel s3-water', S.B), 260, 30, 1080, 840); if (G.art('s3_water')) { water.style.backgroundImage = `url("${G.art('s3_water')}")`; water.classList.add('art'); }   // 10/10 선생님 물 그림
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
        if (easy && rips.length > 1) { rips.filter(x => x !== b).forEach(x => setTimeout(() => calm(x), 120)); }   // 10/5 E1: 쉽게는 한 번 누르면 물결이 모두 잔잔해짐
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
        G.onTap(flipB, () => { if (G.reduced() || easy) flip(0); });   // 10/5 E1: 쉽게도 누르기만 하면 뒤집힘   // 몸이 불편해 끌기 어려운 경우를 위해: 움직임 줄이기 설정에서는 누르기만 해도 됨
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
        if (!c && !G.lv('hard')) { t.b.classList.add('off'); t.b.disabled = true; }   // 10/8: 쉽게·보통은 길 아닌 잎을 흐리게(공간 추론 부담 줄임)
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
      function draw(t) { t.b.querySelector('svg, img').style.transform = `rotate(${t.rot * 90}deg)`; }
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
    const art = G.art('s3_leaf_' + kind); if (art) return `<img class="leaf" src="${art}" alt="" draggable="false">`;   // 10/10 선생님 그림
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
      const g = G.gen, ok = () => g === G.gen, nums0 = D3().fingers[G.level()] || [2, 4], nums = nums0.map(() => 1 + Math.floor(Math.random() * (G.lv('hard') ? 9 : 5))), easy = !G.lv('normal');   // 10/8: 다시 할 때 답이 바뀌게(자리 수는 단계대로)
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
      { const cv = coverShow(); await play(['WD04_rumi_04'], { ...o, keep: true }); cv.remove(); } if (!ok()) return;   // 10/4: 덮는 순간 하랑이 얼굴(흥, 그림 02)이 보이게. 10/5 B4: 덮인 표지(분홍 말풍선 별)도 크게
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
      // 10/9 수정안 3단계: "도와줄까?" 카드 → 하랑이는 카드로 "괜찮아, 나" (거절도 괜찮다) → 기다리기
      if (!await G.p4.askHelp(V, 'harang', 'WD04_ply_03')) return;
      await play(['WD04_harang_13'], o); if (!ok()) return;
      await play(['WD04_rumi_21']); if (!ok()) return;
      await ask('WD04_ply_04', 'icon_good'); if (!ok()) return;
      await waitQuiet(); if (!ok()) return;
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
      { const cv = coverShow(true); await play(['WD04_harang_10'], o); if (ok()) await play(['WD04_rumi_17']); cv.remove(); } if (!ok()) return;   // 10/5 B4: 표지 별과 찾은 별을 나란히
      await play(['WD04_harang_11'], o); if (!ok()) return;
      await play(['WD04_rumi_16']); if (!ok()) return;
      st.remove();
      await presentItem('piece_word'); if (!ok()) return;
      await play(['WD04_harang_12', 'WD04_harang_20'], o); if (!ok()) return;
      await play(['WD04_rumi_22']); if (!ok()) return;   // 10/9 개선 6: 하랑이 카드로 지름길 안내
      await colorIn(V); if (!ok()) return;
      complete('s3h_star');
    }
    if (id === 'cardbox') { G.audio.voice('S93_card_' + shuffle(['hi', 'friend', 'star', 'draw'])[0]); }
  };
  // 10/5 기획 리뷰 B4: 하랑이 카드 책 표지 (#closeup: 대사 창 아래 층이라 [다음]을 누를 수 있음)
  function coverShow(withStar) {
    const e = G.el('div', 's3-cover', G.$('#closeup'), `<img src="${G.art('item_cardbook')}" alt="">` + (withStar ? (G.artImg('item_piece_word') || G.starSvg(G.STARS.find(q => q.id === 'word'))) : ''));
    if (e.animate && !G.reduced()) e.animate([{ opacity: 0, transform: 'translateX(-50%) scale(.7)' }, { opacity: 1, transform: 'translateX(-50%) scale(1)' }], { duration: 400, easing: 'ease-out' });
    return e;
  }
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
        if (easy) slots.forEach((q, i) => { if (!q.v) q.e.innerHTML = `<div class="s3-ghost">${diaryPic(order[i])}</div><b>${i + 1}</b>`; });   // 10/9 수정안: 쉽게는 본 순서를 칸에 흐리게 남김
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
      cur = { solve: async () => { while (!fin && at < n && ok()) { const k = at; tap(want()); if (at === k) await G.wait(0.3); } } };   // 10/8: 그림 보여 주는 중이면 기다렸다 놓음(무한 반복 막기)
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
      await play(['WD05_daon_01'], { partner: 'daon' }); if (!ok()) return;   // 10/8 검토: 별 1~2의 다온이 잔치에
      if (!await cardAct('good', '촌장님과 함께 좋아 카드로 대답해요')) return;   // 10/5 기획 리뷰 A3: 어른이 하랑이 방법(카드)으로 대답
      // 잔치 별가루: 모아 아주머니, 바우 아저씨
      await play(['WD05_moa_03'], { partner: 'moa' }); if (!ok()) return;
      { const at = S.feastDust.moa; dustBtn(V, 's3plaza:moa', at[0], at[1]); G.audio.sfx('sfx_sparkle', 0.5); }
      await play(['WD05_bau_03'], { partner: 'bau' }); if (!ok()) return;
      { const at = S.feastDust.bau; dustBtn(V, 's3plaza:bau', at[0], at[1]); G.audio.sfx('sfx_sparkle', 0.5); }
      // 별이 다시 빛나기 시작함
      // 10/5 기획 리뷰 C1: 우리가 찾은 방법을 학생이 별에게 돌려주면 별이 빛남 (틀린 답 없음)
      if (!await G.p4.daonGuide('word', 'WD05_daon_10', 'WD05_daon_11')) return;   // 10/9 수정안 3단계: 다온의 쉬운 안내판
      if (!await G.starCard('word', [{ art: 'card_draw', label: '그림' }, { art: 'hand_wave', label: '손짓' }, { text: '가', label: '글' }, { art: 'card_wait', label: '기다리기' }])) return;
      const s = G.STARS.find(q => q.id === 'word'), st = G.el('div', 's2-star', G.$('#closeup'), G.starSvg(s));
      Object.assign(st.style, { left: '50%', top: '22%', width: G.stage.u * 145 + 'px', height: G.stage.u * 145 + 'px', position: 'absolute', marginLeft: (-G.stage.u * 72) + 'px', filter: 'drop-shadow(0 0 30px rgba(242,155,176,1))' });
      await play(['WD05_rumi_03']); st.remove(); if (!ok()) return;
      if (!await G.p4.beforeAfter('s3cafe_before', 's3cafe_after', 'WD05_rumi_20')) return;   // 10/9 수정안 3단계: 셋째 교훈은 전과 후 그림으로
      // 10/8 작가: WD05_chief_04(별이 하던 일 말하기) 뺌 - 별 카드가 보여 줌
      complete('s3plaza_relay'); return;
    }
    if (id === 'pedestal') {
      if (sd().length < D3().dustNeed) { await play(['E11_chief_01'], { partner: 'chief' }); return; }
      if (has('piece_word')) {
        say('WD05_rumi_04');
        const u = await G.p4.useItem('piece_word', H.btn, { say, hint: 'WD05_rumi_04' }); if (!u || !ok()) return;
      }
      await starRise(V); if (!ok()) return;
      // 10/9 수정안: WD05_chief_05·06 뺌 (촌장이 하랑이 카드로 직접 대답하는 장면이 대신함)
      if (!cleared('s3plaza')) G.st.cleared.push('s3plaza');
      complete('s3plaza_star'); if (!ok()) return;
      await ending();
    }
  };
  // ---- 퍼즐 F: 하랑이의 카드 초대에 모두가 자기 방법으로 대답. 바우(손짓)·모아(글)·촌장(카드). 10/9 수정안: 통역 사슬이 아니라 각자 하랑이에게 직접 대답 ----
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
        if (i === 0) S.at(G.el('div', 's3-arrow', S.B, G.art('hint_arrow') ? `<img class="side" src="${G.art('hint_arrow')}" alt="">` : '<svg viewBox="0 0 60 40"><path d="M4 20 H44 M34 8 L52 20 L34 32" stroke="#F4A259" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>'), x + sw - 60, 230);   // 10/10: 코드 화살표 대신 있는 화살표 그림을 옆으로
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
        if (k === 'chief') { S.say('WD05_chief_07'); const list = shuffle([R.chief.ok, ...R.chief.no.slice(0, easy ? 1 : 2)]);
          opts = list.map(set => { const h = set.map(q => `<img src="${cardImg(q)}" alt="">`).join(''); const b = G.btn('s3-opt', h, tray, () => choose(b, set === R.chief.ok, h), '카드'); b.dataset.set = set.join(','); return b; }); }
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
        step++; await G.wait(0.6); if (!ok()) return; if (step >= st.length) { win(); return; } show();
      }
      async function win() { if (fin) return; fin = true; cur = null; G.help.off(); clear(); S.hush(); tray.innerHTML = ''; st[st.length - 1].e.classList.add('on'); G.audio.sfx('sfx_sparkle', 0.7); await G.wait(1.0); S.end(); res(ok()); }
      function clear() { if (arrow) arrow.remove(); arrow = null; opts.forEach(b => b.classList.remove('s3-hint')); }
      const right = () => { const k = st[step] && st[step].k; return opts.find(b => k === 'chief' ? b.dataset.set === R.chief.ok.join(',') : k === 'bau' ? b.innerHTML.includes(gest(R.bau.ok[0]).slice(0, 40)) && b.innerHTML.includes(gest(R.bau.ok[2]).slice(0, 40)) : b.textContent === R.moa.ok); };
      cur = { solve: () => { step = st.length; win(); } };
      G.help.set({ l1: () => S.say('WD05_rumi_02'), l2: () => { const b = right(); if (b && !arrow) arrow = arrowAt(S, b); }, l3: () => { const b = right(); if (b) b.classList.add('s3-hint'); }, clear });
      show();
    });
  }

  // ---- 별이 받침대에서 하늘로 (길의 별·소리의 별과 같은 차례): 모이기 → 받침대로 → 빛 기둥 → 밤하늘 제자리 → 가로등·색·불꽃놀이 → 「말의 별」 ----
  const GATHER = { chief: [900, 520], bau: [1380, 430], harang: [1370, 870], moa: [960, 720] };
  async function starRise(V) {
    const s = G.STARS.find(q => q.id === 'word'), ov = G.$('#overlay'), u = G.stage.u, rm = G.reduced();
    const { W, H: SH } = G.stage, wl = V.el.parentNode, S = V.S, ped = S.hotspots.find(h => h.id === 'pedestal').rect;
    const layer = G.el('div', 'layer', ov); layer.style.pointerEvents = 'none';
    G.hud.hide(true);
    V.fx.querySelectorAll('.hot-glow, .mstar').forEach(e => e.style.visibility = 'hidden');
    await V.gather(GATHER, 4);   // 10/8 선생님: 받침대로 올 때도 픽셀 걷기로 광장 길을 따라
    const [bx, by] = V.toScreen(ped[0] + ped[2] / 2, ped[1] + 40), hs = (V.spr.hero && V.spr.hero.rect) || S.sprites.find(q => q.id === 'hero').rect, [hx, hy] = V.toScreen(hs[0] + hs[2] / 2, hs[1]);
    const piece = G.el('div', 'c11-item', layer, G.icon(G.litIcon('piece_word')));   // 10/6: 받침대로 가는 별은 빛나는 별 Object.assign(piece.style, { left: hx + 'px', top: hy + 'px' });
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
    // 10/6 선생님: 별가루를 연료처럼 뿜으며 반짝이는 잔상을 남기고 올라감 (core.js G.riseTrail, 인트로와 같은 효과)
    const tr = G.riseTrail(layer, big, s.color), bs = big.offsetWidth || 190 * u;
    const pan = (k) => { const d = SH * k; tr.shift(d); wl.style.transform = `translateY(${d}px)`; sky.style.transform = `translateY(${d - SH}px)`; sky.style.opacity = Math.min(1, k * 2.5); pillar.style.translate = `0 ${d}px`; };
    const fly = (k) => { pan(k); const x = sx0 + (sx1 - sx0) * k, y = sy0 + (sy1 - sy0) * k - Math.sin(k * Math.PI) * 60 * u; big.style.left = x + 'px'; big.style.top = y + 'px'; big.style.transform = `translate(-50%,-50%) scale(${1 - 0.21 * k})`; tr(k, x, y, bs * (1 - 0.21 * k)); };
    if (rm) fly(1); else await G.tween(0, 1, 2.4, fly, 'io'); tr.end();
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
      await G.wait(rm ? 0.4 : 2.6); if (!ok()) return;   // 10/5 D2: 같은 교훈을 말하는 이야기꾼 줄(WD06_nar_02)은 빼고, 색이 번지는 것만 보여 줌
      // 그림 표시가 생김 (찻집 = 찻잔, 나루터 = 호수, 하랑이네 = 그림)
      const icons = [['s3cafe', 'tea'], ['s3dock', 'lake'], ['s3harang', 'draw']].map(([id, k]) => { const p = G.D.places.places.find(q => q.id === id); const e = G.el('div', 's3-mapico', MV.fx, `<img src="${cardImg(k)}" alt="">`);
        Object.assign(e.style, { left: (p.marker[0] + 110) + 'px', top: (p.marker[1] - 30) + 'px' }); e.animate && e.animate([{ scale: .2, opacity: 0 }, { scale: 1.2, opacity: 1 }, { scale: 1 }], { duration: 700, easing: 'ease-out' }); return e; });
      G.audio.sfx('sfx_chime', 0.4);
      await play(['WD06_moa_01'], { partner: 'moa' }); if (!ok()) return;
      await play(['WD06_bau_01'], { partner: 'bau' }); if (!ok()) return;
      await play(['WD06_harang_01'], { partner: 'harang' }); if (!ok()) return;
      G.tween(0, 1, rm ? 0.3 : 2.5, k => MV.setCam(cam[0] + (3900 - cam[0]) * k, cam[1] + (1500 - cam[1]) * k, 1 - 0.25 * k), 'io');
      await G.wait(1.5); if (!ok()) return;   // 10/8 작가: WD06_chief_01(교훈 되풀이) 뺌
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
    G.STARS.forEach((s, i) => { const e = G.el('div', 'c11-slot' + (i < 3 ? ' me lit' : ''), m, G.starSvg(s, i >= 3)); Object.assign(e.style, { left: POS[i % POS.length][0] * 100 + '%', top: POS[i % POS.length][1] * 100 + '%' }); });
    G.el('div', 'star-count sky-count', m, G.icon('icon_star') + ' 되찾은 별 3/8');
    G.pedestalRow(m, 3, D3().next || (G.STARS[3] && G.STARS[3].id));   // 10/6: 받침대 빈 자리가 깜박임
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

  const DONE12 = {
    done: ['meet_lumi', 'plaza_intro', 'plaza_chief', 'plaza_board', 'plaza_post', 'library_intro', 'library_haesol', 'library_tactile', 'library_puzzle', 'plaza_post_ask', 'letter_1', 'letter_2', 'letter_3', 'market_jig', 'libdoor_seen', 'libdoor_open', 'note_got',
      'forest_intro', 'forest_wind', 'forest_star', 'forest_daon', 'plaza2_intro', 'plaza2_board', 'plaza2_road', 'plaza2_look', 'plaza2_star', 'road_tiles',
      's2_begin', 's2_fog', 's2school_intro', 's2s_talk', 's2n_chair', 's2n_window', 's2n_bell', 's2n_locker', 's2school_noise', 's2f_chair', 's2f_window', 's2f_bell', 's2f_locker', 's2school_fix', 's2school_ask', 's2school_card',
      's2door_open', 's2hall_intro', 's2hall_duri', 's2hall_seats', 's2hall_score', 's2rest_intro', 's2rest_miru', 's2rest_box', 's2rest_deco', 's2rest_star', 's2plaza_intro', 's2plaza_concert', 's2plaza_star', 's2_end'],
    cleared: ['plaza', 'market', 'library', 'forest', 'plaza2', 's2school', 's2hall', 's2rest', 's2plaza'], items: ['note', 'map', 'tactile', 'piece', 'light', 'rhythm', 'score', 'piece_sound'],
    seen: ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C10', 'C11', 'C12', 'CH:intro', 'CH:plaza', 'CH:market', 'CH:library', 'CH:forest', 'CH:plaza2', 'CH:ending',
      'CH:s2_1', 'CH:s2school', 'S2A_s2school', 'CH:s2hall', 'S2A_s2hall', 'CH:s2rest', 'S2A_s2rest', 'CH:s2plaza', 'S2A_s2plaza', 'CH:s2_6'],
    visited: ['plaza', 'market', 'library', 'forest', 'plaza2', 's2school', 's2hall', 's2rest', 's2plaza'],
  };
  // ================= 교사용 챕터 바로 가기 (말의 별-1 ~ -6) =================
  // 앞 별(길의 별·소리의 별)을 모두 끝낸 상태에서 시작
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

/* ---- s4_door.js ---- */
// s4_door.js — 문턱의 별 (10/6, 기획안 아티팩트 review/s4_plan 제출 · 음성 목록 문턱의별_음성목록_v1.0.csv). 앞 별 코드는 고치지 않음
// 흐름: 말의 별 엔딩 → 문턱의 별-1 언덕길(누리, 모두의 지도) → -2 목공방(도르래 문, 판자 시험대) → -3 꽃집(상자 밀기, 막대 손잡이, 단추 높이) → -4 전망대(길 조각, 단추 문, 망원경) → -5 광장 잔치(별 카드, 별 올리기) → -6 엔딩
// 주제: 문턱·계단·무거운 문이 막는 것이지 사람이 못하는 게 아님. 길과 문을 바꾸면 모두 함께 들어갈 수 있음
// 뼈대(퍼즐 틀, 별가루, 지도, 도착, 별 올리기, 엔딩, 교사 챕터)는 s3_word.js에서 가져와 이름만 바꿈 (문턱의별/코드/mk_s4js.py). 화면 모양은 s3- CSS를 같이 씀
'use strict';
G.s4 = (() => {
  const T = {};
  const D4 = () => G.D.story.s4;
  const done = (m) => !!G.st && G.st.done.includes(m);
  const mark = (m) => { if (m && G.st && !done(m)) { G.st.done.push(m); G.save.write(); } };
  const has = (id) => !!G.st && G.st.items.includes(id);
  const cleared = (id) => !!G.st && G.st.cleared.includes(id);
  const say = (id) => G.hud.say(id);
  const play = (ids, o) => G.dialog.play(ids, o);
  const ask = (id, icon = 'icon_good') => G.dialog.choose([{ label: G.txt(id), icon, voice: id }], true);
  const sd = () => G.st.s4dust || (G.st.s4dust = []);
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const began = () => done('s4_begin');
  let cur = null;   // 지금 하는 문턱의 별 퍼즐 (교사용 "이 퍼즐 바로 풀기")

  // ================= 작은 도구 (말의 별과 같음) =================
  const ART = (n) => G.art(n) || '';
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
  function presentItem(id) { return G.present.item(id); }

  // ================= 별가루 (문턱의 별 10곳) =================
  async function gain(k, el, fx, x, y) {
    if (sd().includes(k)) return;
    sd().push(k); G.save.write(); G.audio.sfx('sfx_sparkle', 0.8); if (el) spark(el, 8);
    const n = sd().length, NEED = D4().dustNeed, TOT = D4().dustTotal, up = done('s4plaza_star'), shown = !up && n <= NEED ? `${n}/${NEED}` : `${n}/${TOT}`;
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
  const isS4 = (id) => /^s4/.test(id);
  // 안개: 문턱의 별이 시작되고 안개가 걷히면 북동쪽도 걷힌 안개 그림
  const mv0 = G.mapView;
  G.mapView = (parent, o) => {
    const V = mv0(parent, o);
    if (V.s2 && V.s2.fog && done('s4_fog')) V.s2.fog.src = G.asset('assets/map/map2_fog_d.png');
    return V;
  };
  const state0 = G.map.state;
  G.map.state = (p) => {
    if (isS4(p.id) && !done('s4_fog')) return 'locked';
    if (p.id === 'plaza' && cleared('s4view') && !cleared('s4plaza')) return 'open';
    return state0(p);
  };
  const scOf0 = G.map.sceneOf;
  G.map.sceneOf = (p) => (p.id === 'plaza' && cleared('s4view') && !cleared('s4plaza')) ? 's4plaza' : scOf0(p);
  const node0 = G.map.node, N4 = { s4shop: 'S4_SHOP', s4flower: 'S4_FLOWER', s4view: 'S4_VIEW', s4gate: 'GATE_N' };
  G.map.node = (id) => (began() && N4[id]) || node0(id);
  const mm0 = G.p4.mapMarks;
  G.p4.mapMarks = (V) => {
    mm0(V);
    if (!V.s2) return;
    if (!done('s4_fog')) for (const p of G.D.places.places) if (isS4(p.id)) V.setMarker(p.id, 'hidden', false);
    // 엔딩 뒤: 지도에 그림 표시 (찻집 = 찻잔, 나루터 = 호수, 하랑이네 = 그림)
    // 10/6 선생님: 문턱의 별 엔딩 뒤에는 마을 모든 장소에 그림 표시. 선생님 그림 place_<장소>가 오면 그것을 먼저 씀, 없으면 비슷한 그림, 그것도 없으면 그 장소는 비워 둠
    if (done('s4_end') && !V.s4ico) V.s4ico = MAPICO4.map(([id, k]) => {
      const p = G.D.places.places.find(q => q.id === id), src = G.art('place_' + id) || G.art(k); if (!p || !src) return null;
      const e = G.el('div', 's3-mapico', V.fx, `<img src="${src}" alt="">`); Object.assign(e.style, { left: (p.marker[0] + 110) + 'px', top: (p.marker[1] - 30) + 'px' }); return e;
    });
  };
  // 지도 주민의 별가루 (호숫가 주민 둘)
  const vh0 = G.p4.villagerHas, vd0 = G.p4.villagerDust;
  const s4giver = (vid) => began() && D4().dustGive.includes(vid);
  G.p4.villagerHas = (vid) => s4giver(vid) ? !!G.st && !sd().includes('map:' + vid) : vh0(vid);
  G.p4.villagerDust = async (vid, el, fx, x, y) => { if (s4giver(vid)) return gain('map:' + vid, el, fx, x, y); return vd0(vid, el, fx, x, y); };
  const dl0 = G.p4.dustLine;
  G.p4.dustLine = (sh) => { if (!began()) return dl0(sh); G.el('div', 'p4-bagdust', sh, (G.artImg('stardust') || '') + `<span>별가루 ${sd().length}/${D4().dustTotal}</span>`); };
  // 장면 속 물건의 별가루
  const ah0 = G.p4.afterHot;
  G.p4.afterHot = async (H, V, def, id) => {
    if (!def.s4) return ah0(H, V, def, id);
    const h = H.def; if (!(def.s4dustHot || []).includes(h.id)) return;
    const [x, y, w] = h.rect; await popDust(V, id + ':h:' + h.id, x + w / 2, y + 20, H.btn);
  };
  // 교사용 "이 퍼즐 바로 풀기"
  const can0 = G.p4.can, skip0 = G.p4.skip, reset0 = G.p4.reset;
  G.p4.can = () => !!cur || can0();
  G.p4.skip = () => { if (cur && cur.solve) cur.solve(); else skip0(); };
  G.p4.reset = () => { cur = null; reset0(); };
  // 할 일 카드: "문턱의 별 찾기 n/4"
  const hm0 = G.hud.map, rq0 = G.hud.refreshQuest;
  function questFix() {
    if (!began()) return; const q = G.hud.questEl; if (!q || !q.isConnected) return;
    const e = q.querySelector('.q1'); if (e) e.textContent = '문턱의 별 찾기 ' + D4().quest.filter(cleared).length + '/' + D4().quest.length;
  }
  G.hud.map = () => { hm0(); questFix(); };
  G.hud.refreshQuest = () => { rq0(); questFix(); };
  // 장 제목은 "문턱의 별-N"
  const cut0 = G.cut.play;
  G.cut.play = async (id, opts = {}) => {
    const s4ch = /^CH:s4/.test(id), cs = G.D.story.chapterStar;
    if (s4ch) G.D.story.chapterStar = D4().chapterStar;
    try { return await cut0(id, opts); } finally { if (s4ch) G.D.story.chapterStar = cs; }
  };
  const show0 = G.map.show;
  G.map.show = async (o = {}) => { const r = await show0(o); maybeBegin(); return r; };

  // ================= 도착 연출 (장소 이름) =================
  async function arriveS4(c, root, opts, place) {
    const U = G.cut.util, S = G.D.scenes[place];
    const { V, off } = await U.arrive(c, root, opts, place);
    if (S.zone === 'plaza' || cleared(place)) { V.colorImg.style.visibility = ''; V.colorImg.style.opacity = S.zone === 'plaza' ? V.colorImg.style.opacity : 1; }
    if (c.rm) V.setCam(V.home()[0], V.home()[1], 1); else V.setCam(V.home()[0] - 150, V.home()[1] + 20, 1.25);
    c.t0 = G.t;
    await Promise.all([
      U.fadeIn(c, root, 0.5),
      (async () => { if (!c.rm) await c.tween(0, 1, 3.6, k => V.setCam(V.home()[0] - 150 + 150 * k, V.home()[1] + 20 - 20 * k, 1.25 - 0.25 * k), 'io'); })(),
      U.title(c, root, S.name, 'S92_place_' + (S.zone || place), 0.8, 4.4),
    ]);
    V.setCam(V.home()[0], V.home()[1], 1); off();
  }
  G.cut.add({
    S4A_s4shop: (c, r, o) => arriveS4(c, r, o, 's4shop'),
    S4A_s4flower: (c, r, o) => arriveS4(c, r, o, 's4flower'),
    S4A_s4view: (c, r, o) => arriveS4(c, r, o, 's4view'),
    S4A_s4plaza: (c, r, o) => arriveS4(c, r, o, 's4plaza'),
  });


  let beginning = false, pollOff = null;
  const needBegin = () => !!G.st && (G.st.stars || 0) >= 3 && done('s3_end') && !cleared('s4gate');
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
  // ================= 문턱의 별만의 화면 모양 (나머지는 말의 별 s3- 모양을 같이 씀) =================
  const CSS4 = `
.s4-bg { position: absolute; inset: 0; border-radius: 34px; background-size: cover; background-position: center; box-shadow: 0 12px 28px rgba(0, 0, 0, .4); overflow: hidden; }
.s4-dots { display: flex; flex-wrap: wrap; justify-content: center; align-content: center; gap: 10px; width: 100%; height: 100%; }
.s4-dots i { width: 34px; height: 34px; border-radius: 50%; background: #3B2A26; display: block; }
.s4-plate { position: absolute; border-radius: 50%; background: #F1E2C4; border: 8px solid #8B5E3C; padding: 30px; box-sizing: border-box; }
.s4-door { position: absolute; background: #8B5E3C; border: 8px solid #5E4030; border-radius: 18px 18px 6px 6px; transform-origin: 0 50%; transition: transform 1.2s ease-in-out; }
.s4-door.open { transform: perspective(1400px) rotateY(-70deg); }
.s4-sill { position: absolute; background: #6B4A30; border-radius: 10px; }
.s4-rope { position: absolute; width: 8px; background: #C9A27A; transform-origin: 50% 0; }
.s4-hook { position: absolute; width: 70px; height: 60px; border: 10px solid #555; border-top: 0; border-radius: 0 0 40px 40px; box-sizing: border-box; transition: top .6s ease-out; }
.s4-w { position: absolute; width: 150px; height: 150px; border-radius: 50%; border: 0; padding: 26px; box-sizing: border-box; background: radial-gradient(circle at 35% 30%, #9a9a9a, #4d4d4d); box-shadow: 0 8px 0 #2f2f2f; cursor: pointer; transition: left .5s ease-out, top .5s ease-out; }
.s4-w img, .s4-pic img { width: 100%; height: 100%; object-fit: contain; pointer-events: none; }
.s4-w .s4-dots i { width: 26px; height: 26px; background: #FFF4E0; }
.s4-w.art, .s4-pic.art { background: none; box-shadow: none; padding: 0; }
.s4-plank { position: absolute; height: 34px; background: #C9A27A; border: 5px solid #8B5E3C; border-radius: 8px; transform-origin: 0 50%; box-sizing: border-box; }
.s4-car { position: absolute; width: 120px; height: 80px; transform-origin: 50% 100%; }
.s4-car .b { position: absolute; left: 0; right: 0; top: 0; height: 52px; background: #E8573F; border-radius: 22px 30px 10px 10px; border: 4px solid #3B2A26; }
.s4-car .w { position: absolute; bottom: 0; width: 34px; height: 34px; border-radius: 50%; background: #3B2A26; }
.s4-step { position: absolute; background: #C9A27A; border: 5px solid #8B5E3C; box-sizing: border-box; }
.s4-choice { position: absolute; border: 6px solid #e0b96a; border-radius: 24px; background: #FFF8E8; cursor: pointer; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; font-family: var(--f-title); font-size: 40px; color: var(--brown); box-shadow: 0 7px 0 #c9a45c; }
.s4-choice.used { opacity: .35; pointer-events: none; }
.s4-cell { position: absolute; width: 160px; height: 160px; box-sizing: border-box; border: 3px solid rgba(139, 94, 60, .35); background: rgba(255, 244, 224, .35); }
.s4-cell.path { background: rgba(127, 183, 126, .35); }
.s4-crate { position: absolute; border: 0; padding: 0; border-radius: 16px; background: #C9A27A; box-shadow: inset 0 0 0 8px #8B5E3C, 0 6px 0 rgba(0, 0, 0, .25); cursor: pointer; transition: left .3s ease-out, top .3s ease-out; display: flex; align-items: center; justify-content: center; gap: 12px; }
.s4-crate i { width: 52px; height: 52px; border-radius: 50%; display: block; border: 4px solid #3B2A26; }
.s4-crate.sel { box-shadow: inset 0 0 0 8px #8B5E3C, 0 0 0 8px #FFD66B; }
.s4-crate.v { flex-direction: column; }
.s4-arr { position: absolute; width: 96px; height: 96px; border-radius: 50%; border: 0; background: #FFD66B; box-shadow: 0 6px 0 #c98f14; cursor: pointer; z-index: 5; display: flex; align-items: center; justify-content: center; }
.s4-arr svg { width: 56px; height: 56px; }
.s4-arr.art { background: none; box-shadow: none; }
.s4-arr img { width: 100%; height: 100%; object-fit: contain; pointer-events: none; }
.s4-plate.art { background: none; border: 0; padding: 0; }
.s4-plate.art img, .s4-hookimg img, .s4-wheel img { width: 100%; height: 100%; object-fit: fill; display: block; pointer-events: none; }
.s4-hookimg { position: absolute; transition: height .6s ease-out; }
.s4-wheel { position: absolute; }
.s4-plank.art { background: center / 100% 100% no-repeat; border: 0; border-radius: 0; height: 46px; }
.s4-ring { position: absolute; pointer-events: none; z-index: 2; }
.s4-tile.art { background: none; box-shadow: none; }
.s4-tile img { width: 100%; height: 100%; display: block; transition: transform .2s; pointer-events: none; }
.s4-tile.ok img { filter: drop-shadow(0 0 10px #FFF1B8); }
.s4-mark { position: absolute; font-family: var(--f-title); font-size: 38px; color: #FFF4E0; background: rgba(59, 42, 38, .75); border-radius: 18px; padding: 4px 16px; white-space: nowrap; }
.s4-cart { position: absolute; width: 150px; height: 150px; transition: left 1.6s ease-in-out; z-index: 4; }
.s4-cart img { width: 100%; height: 100%; object-fit: contain; }
.s4-drawer { position: absolute; background: #A0764F; border: 8px solid #6B4A30; border-radius: 14px; cursor: pointer; transition: transform .5s ease-out; }
.s4-drawer::after { content: ''; position: absolute; left: 50%; top: 40%; width: 80px; height: 18px; margin-left: -40px; background: #E6B54A; border-radius: 9px; }
.s4-drawer.open { transform: translateY(40px); }
.s4-leverimg { position: absolute; transform-origin: 159px 41px; transition: transform .4s; z-index: 4; }
.s4-leverimg img { width: 100%; height: 100%; transform: scaleX(-1); display: block; }
.s4-btnimg { position: absolute; z-index: 4; }
.s4-btnimg img { width: 100%; height: 100%; object-fit: contain; display: block; }
.s4-cab { position: absolute; background: none; padding: 0; border: 6px solid #FFD66B; border-radius: 22px; cursor: pointer; animation: s4cab 1.6s ease-in-out infinite; }
.s4-cab.open { animation: none; opacity: 0; pointer-events: none; }
@keyframes s4cab { 0%, 100% { opacity: .35; } 50% { opacity: 1; } }
.s4-knob { position: absolute; width: 70px; height: 70px; border-radius: 50%; background: #E6B54A; border: 6px solid #8a6a0a; }
.s4-lever { position: absolute; width: 200px; height: 44px; border-radius: 22px; background: #E6B54A; border: 6px solid #8a6a0a; transform-origin: 22px 50%; transition: transform .4s; }
.s4-mount { position: absolute; width: 90px; height: 90px; border-radius: 50%; background: #F1E2C4; border: 6px dashed #8B5E3C; }
.s4-btnon { position: absolute; width: 90px; height: 90px; border-radius: 50%; background: #7FB77E; border: 10px solid #FFD66B; box-sizing: border-box; }
.s4-scope { position: absolute; overflow: hidden; border-radius: 50%; border: 14px solid #8a6a0a; box-shadow: 0 0 0 6000px rgba(15, 18, 38, .82); touch-action: none; cursor: grab; }
.s4-land { position: absolute; left: 0; top: 0; background-size: 100% 100%; }
.s4-glint { position: absolute; width: 70px; height: 70px; margin: -35px 0 0 -35px; border-radius: 50%; border: 0; background: radial-gradient(circle, #eaffc8 0, #7FB77E 35%, rgba(127, 183, 126, 0) 70%); animation: s4tw 1.4s ease-in-out infinite; cursor: pointer; }
@keyframes s4tw { 50% { transform: scale(1.35); opacity: .7; } }
.s4-tile { position: absolute; width: 170px; height: 170px; border: 0; padding: 0; border-radius: 18px; background: #9fcf8f; box-shadow: inset 0 0 0 5px rgba(74, 59, 50, .35); cursor: pointer; }
.s4-tile svg { width: 100%; height: 100%; display: block; transition: transform .2s; }
.s4-tile.grass { background: #b7dca8; cursor: default; }
.s4-tile.ok svg { filter: drop-shadow(0 0 10px #FFF1B8); }
.reduce .s4-glint { animation: none; }
.s4-pc { position: absolute; border: 0; padding: 0; background: none; cursor: grab; transition: left .45s ease-out, top .45s ease-out, width .45s, height .45s; z-index: 6; }
.s4-pc img { width: 100%; height: 100%; object-fit: contain; pointer-events: none; display: block; }
.s4-pc.set { cursor: default; z-index: 5; }
.s4-car { position: absolute; z-index: 7; cursor: grab; transform-origin: 50% 85%; }
.s4-car.dragging { cursor: grabbing; filter: drop-shadow(0 0 10px rgba(255, 214, 107, .9)); }
.s4-car img, .s4-pud img { width: 100%; height: 100%; object-fit: contain; pointer-events: none; display: block; }
.s4-duo { position: absolute; z-index: 7; transform: translateX(-50%); white-space: nowrap; font-family: var(--f-title); font-size: 40px; color: #6b4a32; background: #fffaf0; border: 4px solid #6b4a32; border-radius: 30px; padding: 4px 22px; pointer-events: none; }
.s4-pud { position: absolute; z-index: 6; transition: left .45s ease-out, top .45s ease-out; }
.s4-pud.s4-live { cursor: grab; outline: 6px dashed #FFD66B; outline-offset: 4px; border-radius: 40px; }
.s4-pud.gone { opacity: .55; }
.s4-road { position: absolute; border: 0; background: none; padding: 0; z-index: 4; }
.s4-roadglow { position: absolute; left: 0; top: 0; pointer-events: none; z-index: 5; }
.s4-slot { position: absolute; border-radius: 18px; }
.s4-slot.drop-on { outline: 8px solid #FFD66B; outline-offset: -4px; background: rgba(255, 214, 107, .18); }
.s4-slot.s3-hint { outline: 8px dashed #FFD66B; outline-offset: -4px; }
.s4-tray { position: absolute; border-radius: 26px; background: rgba(255, 248, 232, .78); border: 5px solid #e0b96a; }
`;
  { const st = document.createElement('style'); st.id = 's4-style'; st.textContent = CSS4; document.head.appendChild(st); }
  const MAPICO4 = [['s4shop', 'item_plank'], ['s4flower', 'item_button'], ['s4view', 'item_s4map']];   // 엔딩 뒤 지도 그림 표시 (선생님 그림 place_<장소>가 먼저)
  const lv = () => G.level();
  const dotsHtml = (n) => '<div class="s4-dots">' + '<i></i>'.repeat(n) + '</div>';
  const artOr = (name, html) => ART(name) ? `<img src="${ART(name)}" alt="">` : html;
  function bgOf(S, name, color) { const b = G.el('div', 's4-bg', S.B); if (ART(name)) b.style.backgroundImage = `url("${ART(name)}")`; else b.style.background = color; return b; }
  // 별 조각 빛 (광장에서 별 카드를 마친 뒤)
  const li0 = G.litIcon; G.litIcon = (id) => (id === 'piece_door' && done('s4plaza_card')) ? 'item_piece_door_lit' : li0(id);

  // ================= 문턱의 별-1: 언덕길 (말의 별 엔딩 뒤 저절로) =================
  async function begin() {
    if (beginning) return; beginning = true;
    const g = G.gen, ok = () => g === G.gen, no = { partner: 'nuri' };
    try {
      G.help.off(); G.busy++;
      G.audio.music('music_night');
      const ch = G.cut.play('CH:s4_1', { key: 's4_1', cover: true });
      if (!G.st.place || !/^(plaza|s2|s3)/.test(G.st.place)) G.st.place = 'plaza';
      mark('s4_begin');
      await G.wait(0.2); if (!ok()) return;
      await G.map.show({}); if (!ok()) return;
      G.hud.hide(true);
      await ch; if (!ok()) return;
      G.hud.hide(true);
      let V = G.map.V; if (!V) return;
      G.map.camFree = true;
      const rm = G.reduced(), sky = D4().sky;
      if (!done('s4_fog')) {
        await camTo(V, D4().north[0], D4().north[1], 2.4); if (!ok()) return;
        const s = G.STARS.find(q => q.id === 'door'), star = G.groundLeak(V.fx, sky[0], sky[1] + 360, s.color);   // 언덕 위에서 초록빛이 새어 나옴
        G.audio.sfx('sfx_chime', 0.15, 1.2);
        await G.wait(rm ? 0.4 : 1.4); if (!ok()) return;
        await play(['TD01_nar_01', 'TD01_nar_02'], { noPortraits: true }); if (!ok()) return;
        await play(['TD01_rumi_01'], { noPortraits: true }); if (!ok()) return;
        await play(['TD01_chief_01', 'TD01_hero_01', 'TD01_chief_02'], { partner: 'chief' }); if (!ok()) return;
        await play(['TD01_rumi_02']); if (!ok()) return;
        const fogD = G.el('img', 'bg s2-fog', null); fogD.src = G.asset('assets/map/map2_fog_d.png'); fogD.alt = ''; Object.assign(fogD.style, { width: V.W + 'px', height: V.H + 'px' });
        if (V.s2 && V.s2.fog) { V.imgs.insertBefore(fogD, V.s2.fog); G.audio.sfx('sfx_sparkle', 0.7); V.s2.fog.style.opacity = 0; await G.wait(rm ? 0.4 : 2.4); V.s2.fog.remove(); V.s2.fog = fogD; }
        if (!ok()) return;
        mark('s4_fog'); V.setLamps(G.st.mood); star.remove();
      }
      // 언덕길: 누리를 만남
      await camTo(V, D4().gate[0], D4().gate[1], 1.8); if (!ok()) return;
      await play(['TD01_nuri_01', 'TD01_hero_02', 'TD01_nuri_02', 'TD01_nuri_03', 'TD01_nuri_04'], no); if (!ok()) return;
      await play(['TD01_rumi_03']); if (!ok()) return;
      if (!done('s4gate_path')) {   // 10/8 검토 보강: 언덕길에도 퍼즐 하나 (누리와 같이 갈 길 찾기)
        if (!await G.p4.askHelp(V, 'nuri', 'TD01_ply_02')) return;   // 10/9 수정안: 돕기 전에 먼저 묻기
        await play(['TD01_nuri_14'], no); if (!ok()) return;
        await play(['TD01_rumi_10']); if (!ok()) return;
        G.busy = Math.max(0, G.busy - 1); const w = await hillPath(); G.busy++; if (!ok() || !w) return;
        mark('s4gate_path'); await play(['TD01_nuri_12'], no); if (!ok()) return;
      }
      await play(['TD01_nuri_05'], { ...no, keep: true }); if (!ok()) return;
      await ask('TD01_ply_01'); if (!ok()) return;
      await play(['TD01_nuri_06'], no); if (!ok()) return;
      if (!has('s4map')) { await presentItem('s4map'); if (!ok()) return; }
      if (!cleared('s4gate')) G.st.cleared.push('s4gate'); G.save.write();
      G.$('#fade').classList.add('on'); await G.wait(0.45); if (!ok()) return;
      G.map.camFree = false;
      await G.map.show({}); if (!ok()) return;
      G.hud.hide(true);
      V = G.map.V; G.map.camFree = true; V.setCam(3800, 700, V.cam.z);
      G.$('#fade').classList.remove('on');
      const k = V.markers.s4shop; if (k && k.m.animate) k.m.animate([{ transform: 'scale(.3)' }, { transform: 'scale(1.5)' }, { transform: 'scale(1)' }], { duration: 900, easing: 'ease-out' });
      G.audio.sfx('sfx_sparkle', 0.6);
      await G.wait(0.6); if (!ok()) return;
      await play(['S92_now_s4shop']); if (!ok()) return;
      G.map.camFree = false;
    } finally {
      beginning = false;
      if (g === G.gen) { G.busy = Math.max(0, G.busy - 1); G.hud.hide(false); G.hud.map(); if (G.screen === 'map') G.map.setHelp(); }
    }
  }
  // 지도 주민이 별가루를 줄 때 한 줄 (청람 할아버지, 다솜 아주머니)
  const vd4 = G.p4.villagerDust;
  G.p4.villagerDust = async (vid, el, fx, x, y) => { const ln = began() && (D4().dustLine || {})[vid]; if (ln && !sd().includes('map:' + vid)) await play([].concat(ln), { partner: vid }); return vd4(vid, el, fx, x, y); };

  // ================= 장면마다 (scene.js가 들어갈 때 부름) =================
  for (const id of ['s4shop', 's4flower', 's4view', 's4plaza']) G.sceneFx[id] = (V, def) => fx(V, def, id);
  function fx(V, def, id) {
    if (cleared(id) && id !== 's4plaza') { V.colorImg.style.visibility = ''; V.colorImg.style.opacity = 1; for (const l of V.lamps) l.el.classList.add('on'); }
    (def.s4dust || []).forEach(([x, y], i) => dustBtn(V, id + ':' + i, x, y));
    if (id === 's4shop' && V.spr.maru) V.spr.maru.img.style.display = done('s4shop_door') ? '' : 'none';
    if (id === 's4view' && done('s4view_door') && V.spr.door) V.spr.door.img.style.opacity = 0.35;
    if (id === 's4plaza' && done('s4plaza_card')) for (const [k, at] of Object.entries(def.feastDust || {})) dustBtn(V, 's4plaza:' + k, at[0], at[1]);
  }

  // ================= 문턱의 별-2: 목공방 =================
  G.flows.s4_shop = async (ctx) => {
    const { V, H, g, complete } = ctx, ok = () => g === G.gen, id = H.def.id, mo = { partner: 'maru' }, no = { partner: 'nuri' };
    if (id === 'door') {
      if (done('s4shop_door')) { await play(['TD02_maru_03'], mo); return; }
      await play(['TD02_rumi_01']); if (!ok()) return;
      await play(['TD02_maru_01'], mo); if (!ok()) return;
      await play(['TD02_nuri_01'], no); if (!ok()) return;
      await play(['TD02_maru_14'], mo); if (!ok()) return;   // 10/9 수정안: 누구나 열 수 있는 문(추)
      const w = await pulley(); if (!ok() || !w) return;
      if (V.spr.maru) { V.spr.maru.img.style.display = ''; V.spr.maru.img.animate && V.spr.maru.img.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 600 }); }
      await play(['TD02_maru_02', 'TD02_maru_03', 'TD02_maru_04'], mo); if (!ok()) return;
      await play(['TD02_nuri_02'], no); if (!ok()) return;
      await play(['TD02_maru_05', 'TD02_hero_01', 'TD02_maru_06'], mo); if (!ok()) return;
      await play(['TD02_rumi_03']); if (!ok()) return;
      await play(['TD02_maru_07'], mo); if (!ok()) return;
      complete('s4shop_door'); say('TD02_rumi_04'); return;
    }
    if (id === 'bench') {
      if (done('s4shop_ramp')) { await play(['TD02_maru_09'], mo); return; }
      await play(['TD02_rumi_04'], no); if (!ok()) return;
      const w = await planks(); if (!ok() || !w) return;
      await play(['TD02_nuri_04'], no); if (!ok()) return;
      await play(['TD02_maru_08', 'TD02_maru_09'], mo); if (!ok()) return;
      if (!done('s4shop_rail')) {   // 10/8 검토 보강: 계단 옆 난간 기둥
        await play(['TD02_maru_11'], mo); if (!ok()) return;
        const w2 = await railPosts(); if (!ok() || !w2) return;
        mark('s4shop_rail'); await play(['TD02_maru_12'], mo); if (!ok()) return;
      }
      await play(['TD02_maru_10'], mo); if (!ok()) return;
      if (!has('plank')) { await presentItem('plank'); if (!ok()) return; }
      await colorIn(V); if (!ok()) return;
      await play(['TD02_nuri_05'], no); if (!ok()) return;
      complete('s4shop_ramp'); return;
    }
    if (id === 'maru') { await play([done('s4shop_ramp') ? 'TD02_maru_09' : 'TD02_maru_07'], mo); return; }
    if (id === 'nuri') { await play([done('s4shop_ramp') ? 'TD02_nuri_05' : done('s4shop_door') ? 'TD02_nuri_02' : 'TD01_nuri_06'], no); }
  };

  // ---- 퍼즐: 도르래 문. 문에 그려진 점만큼 추를 고리에 검 (어렵게: 추 두 개를 더해 5). 넘치면 추가 살며시 돌아옴 ----
  function pulley() {
    return new Promise((res) => {
      const g = G.gen, ok = () => g === G.gen, P = D4().pulley[lv()] || D4().pulley.normal;
      const S = screen('s4z-pull', 1600, 900); bgOf(S, 'td_door_bg', 'linear-gradient(#5E4A3A,#3B2A26)');
      const hasBg = !!ART('td_door_bg');
      const door = S.at(G.el('div', 's4-door', S.B), 470, 110, 560, 640); if (hasBg) door.style.background = 'transparent', door.style.borderColor = 'transparent';
      if (!hasBg) S.at(G.el('div', 's4-sill', S.B), 440, 740, 620, 50);
      const PL = ART('td_plate_' + P.need), plate = S.at(G.el('div', 's4-plate' + (PL ? ' art' : ''), S.B, PL ? `<img src="${PL}" alt="">` : dotsHtml(P.need)), 640, 230, 220, 220);
      // 10/10 선생님: 코드 그림 빼기. 배경 그림에 도르래·밧줄·고리가 있으면 그 고리에 걸고, 없으면 선생님 그림(td_pulley·td_hook), 그것도 없으면 코드 그림
      const HK = !hasBg && ART('td_hook') && ART('td_pulley'), HY = hasBg ? 470 : 380;
      const rope = hasBg || HK ? null : S.at(G.el('div', 's4-rope', S.B), 1236, 60, 0, 330);
      if (!hasBg && !HK) G.el('div', 's4-plate', S.B).style.cssText = 'left:1190px;top:30px;width:100px;height:100px;padding:0';
      const hook = hasBg ? S.at(G.el('div', 's4-hookimg', S.B), 1180, HY, 100, 100) : HK ? S.at(G.el('div', 's4-hookimg', S.B, `<img src="${ART('td_hook')}" alt="">`), 1200, 90, 72, 365) : S.at(G.el('div', 's4-hook', S.B), 1205, 380);
      if (HK) S.at(G.el('div', 's4-wheel', S.B, `<img src="${ART('td_pulley')}" alt="">`), 1176, 0, 110, 162);
      const WP = [[260, 730], [440, 730], [1100, 730]];
      let on = [], fin = false;
      const ws = P.weights.map((n, i) => {
        // 10/7 선생님: 추는 고리로 끌어다 걺 (쉽게 단계만 누르기도)
        const b = G.btn('s4-w' + (ART('td_w' + n) ? ' art' : ''), artOr('td_w' + n, dotsHtml(n)), S.B, () => { if (!G.lv('normal')) tap(b); }, '점 ' + n + '개 추');
        b.dataset.n = n; S.at(b, WP[i][0], WP[i][1]); b.home = WP[i];
        G.p4.dragTo(b, () => [hook], () => tap(b), { can: () => !fin && !on.includes(b) });
        return b;
      });
      const sum = () => on.reduce((a, b) => a + +b.dataset.n, 0);
      const hang = () => { const lift = Math.min(1, sum() / P.need); on.forEach((b, i) => S.at(b, hasBg ? 1155 : 1170, (hasBg ? 545 : 450) + i * 120 + lift * 0)); if (hasBg) { } else if (rope) { hook.style.top = (380 + on.length * 20) + 'px'; rope.style.height = (330 + on.length * 20) + 'px'; } else hook.style.height = (365 + on.length * 20) + 'px'; door.style.transform = `translateY(${-lift * 30}px)`; };
      async function tap(b) {
        if (fin || G.dialog.active || on.includes(b)) return;
        G.help.poke(); G.audio.sfx('sfx_tap', 0.5); on.push(b); hang();
        if (sum() === P.need) return win();
        if (sum() > P.need || on.length >= 2 || !G.lv('hard')) {   // 너무 무거우면 살며시 돌아옴
          fin = true; await G.wait(0.7); wob(plate);
          on.forEach(x => S.at(x, x.home[0], x.home[1])); on = []; hang(); door.style.transform = '';
          await G.wait(0.4); fin = false; S.say('TD02_rumi_02');
        }
      }
      async function win() {
        if (fin && on.length === 0) return; fin = true; cur = null; G.help.off(); S.hush();
        G.audio.sfx('sfx_sparkle', 0.7); spark(plate, 12); await G.wait(0.5);
        door.style.transform = ''; door.classList.add('open'); G.audio.sfx('sfx_chime', 0.5);
        await G.wait(G.reduced() ? 0.3 : 1.4); S.end(); res(ok());
      }
      cur = { solve: () => { on = []; const pick = P.need <= 3 ? [P.need] : [2, 3]; pick.forEach(n => { const b = ws.find(x => +x.dataset.n === n); if (b) on.push(b); }); hang(); win(); } };
      S.say('TD02_rumi_02');
      G.help.set({ l1: () => S.say('TD02_rumi_02'), l2: () => wob(plate), l3: () => { const b = ws.find(x => +x.dataset.n === (P.need <= 3 ? P.need : 2)); if (b) { b.classList.add('s3-hint'); setTimeout(() => b.classList.remove('s3-hint'), 3000); } }, clear: () => { } });
    });
  }

  // ---- 퍼즐: 판자 시험대. 판자를 골라 계단에 걸치고 누리의 장난감 차를 굴려 봄 (긴 판자만 끝까지 올라감, 실패음 없음) ----
  function planks() {
    return new Promise((res) => {
      const g = G.gen, ok = () => g === G.gen, KS = D4().planks[lv()] || D4().planks.normal;
      const S = screen('s4z-ramp', 1600, 900); bgOf(S, 'td_ramp_bg', 'linear-gradient(#8a6a4e,#5E4A3A)');
      const TOP = [1150, 360], BASE = 660, LEN = { short: 330, mid: 470, long: 760 }, ART4 = { short: 'td_plank_s', mid: 'td_plank_m', long: 'td_plank_l' }, NAME = { short: '짧은 판자', mid: '중간 판자', long: '긴 판자' };
      if (!ART('td_ramp_bg')) { S.at(G.el('div', 's4-sill', S.B), 120, BASE, 1360, 40); [0, 1, 2].forEach(i => S.at(G.el('div', 's4-step', S.B), TOP[0] + i * 90, TOP[1] + (2 - i) * 0 - i * 0, 300 - i * 90, BASE - TOP[1])); }
      const plank = G.el('div', 's4-plank', S.B); plank.style.display = 'none';   // 10/10: 선생님 판자 그림 td_plank_s/m/l이 있으면 그림으로
      const car = S.at(G.el('div', 's4-car', S.B, ART('td_car') ? `<img src="${ART('td_car')}" alt="" style="width:100%;height:100%;object-fit:contain">` : '<div class="b"></div><i class="w" style="left:10px"></i><i class="w" style="right:10px"></i>'), 160, BASE - 80);
      let fin = false, busy = false;
      const ch = KS.map((k, i) => {
        const b = G.btn('s4-choice', (ART(ART4[k]) ? `<img src="${ART(ART4[k])}" alt="" style="width:${LEN[k] * 0.36}px;height:34px;object-fit:fill">` : `<div style="width:${LEN[k] * 0.32}px;height:24px;background:#C9A27A;border:4px solid #8B5E3C;border-radius:6px"></div>`) + `<span>${NAME[k]}</span>`, S.B, () => pick(k, b), NAME[k]);
        S.at(b, 260 + i * 380, 730, 330, 140); return b;
      });
      async function pick(k, b) {
        if (fin || busy || G.dialog.active) return; busy = true; G.help.poke(); G.audio.sfx('sfx_tap', 0.5);
        const L = LEN[k], dy = BASE - TOP[1], dx = Math.sqrt(Math.max(1, L * L - dy * dy)), x0 = TOP[0] - dx, ang = Math.atan2(-dy, dx);
        Object.assign(plank.style, { display: '', left: x0 + 'px', top: (BASE - 17) + 'px', width: L + 'px', transform: `rotate(${ang}rad)` });
        if (ART(ART4[k])) { plank.classList.add('art'); plank.style.backgroundImage = `url("${ART(ART4[k])}")`; plank.style.top = (BASE - 23) + 'px'; }
        S.at(car, x0 - 130, BASE - 80); car.style.transform = '';
        await G.wait(0.5);
        const good = k === 'long', far = good ? 1 : 0.45, rm = G.reduced();
        const at = (t) => { const x = x0 + dx * t, y = BASE - dy * t; car.style.left = (x - 60) + 'px'; car.style.top = (y - 80) + 'px'; car.style.transform = `rotate(${t > 0 ? ang : 0}rad)`; };
        S.at(car, x0 - 60, BASE - 80); G.audio.sfx('sfx_tap', 0.3, 0.6);
        await G.tween(0, far, rm ? 0.3 : (good ? 2.2 : 1.2), at, good ? 'io' : 'out');
        if (good) { at(1); car.style.transform = ''; S.at(car, TOP[0] + 40, TOP[1] - 80); return win(); }
        await G.tween(far, 0, rm ? 0.3 : 1.0, at, 'in'); car.style.transform = '';
        b.classList.add('used'); await S.say('TD02_nuri_03'); busy = false;
      }
      async function win() { fin = true; cur = null; G.help.off(); S.hush(); G.audio.sfx('sfx_sparkle', 0.8); spark(car, 12); await G.wait(1.2); S.end(); res(ok()); }
      cur = { solve: () => { if (!busy) pick('long', ch[KS.indexOf('long')]); } };
      G.help.set({ l1: () => S.say('TD02_rumi_04'), l2: () => { }, l3: () => { const b = ch[KS.indexOf('long')]; b.classList.add('s3-hint'); setTimeout(() => b.classList.remove('s3-hint'), 3000); }, clear: () => { } });
    });
  }

  // ---- 10/8 검토 보강 퍼즐 3개가 같이 쓰는 틀: 그림 조각을 알맞은 자리로 끌어다 놓기 (쉽게는 눌러도 됨). 틀린 자리면 살며시 제자리로 ----
  // o: { cls, bg, color, tray: [x,y,w,h], items: [{ id, art, x, y, w, h }], slots: [{ id, x, y, w, h, fit }], fits(item, slot), won(), wrong(item, slot), hint, l3() }
  function placePz(o) {
    return new Promise((res) => {
      const g = G.gen, ok = () => g === G.gen;
      const S = screen('s4z-place ' + o.cls, 1600, 900); bgOf(S, o.bg, o.color);
      if (o.tray) S.at(G.el('div', 's4-tray', S.B), ...o.tray);
      (o.pre || []).forEach(([art, x, y, w, h]) => { const e = S.at(G.el('img', 's4-pre', S.B), x, y, w, h); e.src = ART(art); e.alt = ''; Object.assign(e.style, { position: 'absolute', objectFit: 'fill' }); });   // 미리 꽂혀 있는 것
      let fin = false, busy = false;
      const slots = o.slots.map(s => { const el = S.at(G.el('div', 's4-slot', S.B), s.x, s.y, s.w, s.h); return Object.assign(s, { el, item: null }); });
      const free = () => slots.filter(s => !s.item).map(s => s.el);
      const home = (it) => S.at(it.el, it.x, it.y, it.w, it.h);
      const items = o.items.map(it => {
        it.el = G.btn('s4-pc', `<img src="${ART(it.art) || ''}" alt="">`, S.B, () => { if (G.lv('easy') && !it.slot) { const s = slots.find(q => !q.item && o.fits(it, q)); if (s) put(it, s); } }, it.label || '');
        home(it); it.slot = null;
        G.p4.dragTo(it.el, free, (t) => put(it, slots.find(s => s.el === t)), { can: () => !fin && !busy && !it.slot });
        return it;
      });
      async function put(it, s) {
        if (fin || busy || !s || s.item || it.slot) return; G.help.poke();
        if (!o.fits(it, s)) {
          busy = true; G.audio.sfx('sfx_tap', 0.4, 0.7);
          S.at(it.el, s.x + (s.w - it.w) / 2, s.y + (s.h - it.h) / 2); await G.wait(0.5); home(it); wob(it.el);
          if (o.wrong) await o.wrong(it, s); busy = false; return;
        }
        s.item = it; it.slot = s; it.el.classList.add('set'); G.audio.sfx('sfx_chime', 0.5);
        if (s.fit === 'fill') S.at(it.el, s.x, s.y, s.w, s.h);
        else { const k = Math.min(s.w / it.w, s.h / it.h); S.at(it.el, s.x + (s.w - it.w * k) / 2, s.y + s.h - it.h * k, it.w * k, it.h * k); }
        if (o.placed) o.placed(it, s);
        if (o.won()) { fin = true; cur = null; G.help.off(); S.hush(); await G.wait(0.5); G.audio.sfx('sfx_sparkle', 0.8); spark(it.el, 12); await G.wait(1.2); S.end(); res(ok()); }
      }
      const next = () => { for (const it of items) if (!it.slot) { const s = slots.find(q => !q.item && o.fits(it, q)); if (s) return [it, s]; } return null; };
      cur = { solve: async () => { let n; while (!fin && (n = next())) { await put(n[0], n[1]); await G.wait(0.3); } } };
      G.help.set({
        l1: () => S.say(o.hint), l2: () => { },
        l3: () => { const n = next(); if (!n) return; n[1].el.classList.add('s3-hint'); wob(n[0].el); setTimeout(() => n[1].el.classList.remove('s3-hint'), 3000); },
        clear: () => slots.forEach(s => s.el.classList.remove('s3-hint')),
      });
      S.items = items; S.slots = slots;
    });
  }
  // 언덕길: 누리 장난감 차를 끌어 길을 따라 올라감 (쉽게 2갈래, 보통 3갈래, 어렵게는 비탈길에 웅덩이)
  // 10/8 선생님: 맞는 길은 끝까지 올라가고, 험한 길은 가다가 차가 넘어지며 "이 길로는 갈 수 없어". 웅덩이를 만나면 먼저 웅덩이를 없애고 다시 올라감
  function hillPath() {
    return new Promise((res) => {
      const g = G.gen, ok = () => g === G.gen, L = lv(), easy = L === 'easy', hard = L === 'hard';
      const S = screen('s4z-place s4z-hill', 1600, 900); bgOf(S, 'td_hill_bg', 'linear-gradient(#7FB77E,#4F7A4E)');
      const ST = [800, 790];
      const RT = {
        stair: { pts: [ST, [600, 715], [470, 650], [420, 590], [365, 480], [315, 380], [300, 265]], fail: 0.45, say: 'TD01_nuri_10' },
        pebble: { pts: [ST, [790, 690], [800, 575], [860, 460], [925, 340], [905, 270]], fail: 0.5, say: 'TD01_nuri_11' },
        slope: { pts: [ST, [990, 745], [1150, 635], [1285, 520], [1400, 420], [1440, 335], [1335, 272]] },
      };
      const ids = easy ? ['stair', 'slope'] : ['stair', 'pebble', 'slope'];
      for (const id of ids) {   // 길이 표 (0~1 위치 계산용)
        const r = RT[id]; r.len = [0]; for (let i = 1; i < r.pts.length; i++) r.len.push(r.len[i - 1] + Math.hypot(r.pts[i][0] - r.pts[i - 1][0], r.pts[i][1] - r.pts[i - 1][1]));
      }
      const at = (r, t) => { const d = t * r.len[r.len.length - 1]; let i = 1; while (i < r.len.length - 1 && r.len[i] < d) i++;
        const k = (d - r.len[i - 1]) / ((r.len[i] - r.len[i - 1]) || 1), a = r.pts[i - 1], b = r.pts[i]; return [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, Math.atan2(b[1] - a[1], b[0] - a[0])]; };
      const near = (r, x, y) => { let best = [1e9, 0];   // 끈 자리에서 가장 가까운 길 위치
        for (let i = 1; i < r.pts.length; i++) { const a = r.pts[i - 1], b = r.pts[i], dx = b[0] - a[0], dy = b[1] - a[1], q = Math.max(0, Math.min(1, ((x - a[0]) * dx + (y - a[1]) * dy) / (dx * dx + dy * dy)));
          const px = a[0] + dx * q, py = a[1] + dy * q, d = Math.hypot(x - px, y - py); if (d < best[0]) best = [d, (r.len[i - 1] + q * (r.len[i] - r.len[i - 1])) / r.len[r.len.length - 1]]; }
        return best; };
      const CW = 200, CH = 140;
      const car = G.el('div', 's4-car', S.B, `<img src="${ART('td_car')}" alt="">`); car.setAttribute('aria-label', '누리 장난감 차'); car.style.touchAction = 'none';
      let route = null, t = 0, busy = false, fin = false, stuck = false, pud = null, zone = null, arrow = null, glow = null;
      function place(x, y, ang = 0, rot = 0) {
        const s = 0.45 + 0.55 * Math.max(0, Math.min(1, (y - 265) / (ST[1] - 265)));
        const flip = route && Math.cos(ang) < -0.2 ? -1 : 1;   // 왼쪽으로 가면 차가 왼쪽을 봄
        Object.assign(car.style, { left: (x - CW * s / 2) + 'px', top: (y - CH * s + 10) + 'px', width: CW * s + 'px', height: CH * s + 'px', transform: `scaleX(${flip}) rotate(${rot}deg)` });
      }
      const home = () => { route = null; t = 0; stuck = false; place(...ST); };
      home();
      const duo = !!(G.settings && G.settings.duo), tags = [];   // 10/9 수정안 3단계: 두 사람 모드는 한 학생이 웅덩이를 치우고 다른 학생이 차를 몲
      if (hard || duo) {   // 비탈길 웅덩이: 차가 만나면 먼저 옆 풀밭으로 끌어서 치움
        pud = S.at(G.el('div', 's4-pud', S.B, `<img src="${ART('td_puddle')}" alt="">`), 1100, 560, 300, 150); pud.dataset.t = '0.33';
        zone = S.at(G.el('div', 's4-slot', S.B), 1180, 700, 400, 190);
        G.p4.dragTo(pud, () => [zone], () => { if (!pud || fin) return; G.audio.sfx('sfx_chime', 0.5); S.at(pud, 1230, 730, 300, 150); pud.classList.add('gone'); pud = null; zone.classList.remove('s3-hint'); G.help.poke(); }, { can: () => !fin && !!pud && (stuck || (duo && !busy)) });
        if (duo) { tags.push(S.at(G.el('div', 's4-duo', S.B, '친구 1: 웅덩이 치우기'), 1080, 500)); tags.push(S.at(G.el('div', 's4-duo', S.B, '친구 2: 차 몰기'), 640, 830)); }
      }
      const pudT = 0.33;
      S.say('TD01_rumi_10');
      // 끌기: 처음 움직인 쪽으로 길이 정해지고, 차는 그 길 위만 따라감
      let drag = null;
      const bxy = (e) => { const r = S.B.getBoundingClientRect(); return [(e.clientX - r.left) / r.width * 1600, (e.clientY - r.top) / r.height * 900]; };
      car.addEventListener('pointerdown', (e) => { if (fin || busy || G.dialog.active) return; drag = e.pointerId; try { car.setPointerCapture(e.pointerId); } catch (_) { } G.help.poke(); clear(); car.classList.add('dragging'); });
      car.addEventListener('pointermove', (e) => {
        if (drag !== e.pointerId || fin || busy) return;
        const [x, y] = bxy(e);
        if (!route) {
          if (Math.hypot(x - ST[0], y - ST[1]) < 40) return;
          let best = null; for (const id of ids) { const n = near(RT[id], x, y); if (!best || n[0] < best[1][0]) best = [id, n]; }
          route = best[0]; G.audio.sfx('sfx_tap', 0.4);
        }
        const r = RT[route], n = near(r, x, y);
        if (n[0] > 220) return;
        let nt = Math.min(n[1], t + 0.08);   // 한 번에 너무 멀리 뛰지 않게
        if (route === 'slope' && pud && nt > pudT) nt = pudT;
        t = Math.max(0, nt); const [px, py, a] = at(r, t); place(px, py, a);
        if (r.fail && t >= r.fail) tumble();
        else if (route === 'slope' && pud && t >= pudT - 0.005 && !stuck) blocked();
        else if (route === 'slope' && t >= 0.97) win();
      });
      const up = (e) => { if (drag !== e.pointerId) return; drag = null; car.classList.remove('dragging'); if (fin || busy) return; if (!stuck && t < 0.97) rollBack(); };
      car.addEventListener('pointerup', up); car.addEventListener('pointercancel', up);
      // 쉽게 단계: 길을 눌러도 차가 그 길로 감
      if (easy) for (const id of ids) { const [x, y] = at(RT[id], 0.35); const b = G.btn('s4-road', '', S.B, () => drive(id), '길'); S.at(b, x - 90, y - 70, 180, 140); }
      async function drive(id) {
        if (fin || busy || G.dialog.active) return; route = id; const r = RT[id], end = r.fail || (id === 'slope' && pud ? pudT : 1);
        busy = true; await G.tween(t, end, 1.6, k => { t = k; const [x, y, a] = at(r, k); place(x, y, a); }, 'io'); busy = false; if (!ok()) return;
        if (r.fail) tumble(); else if (id === 'slope' && pud) blocked(); else win();
      }
      async function rollBack() {
        const r = RT[route]; if (!r) return home(); busy = true;
        await G.tween(t, 0, 0.5, k => { const [x, y, a] = at(r, k); place(x, y, a); }, 'out'); busy = false; if (ok()) home();
      }
      async function tumble() {   // 험한 길: 덜컹 하다 옆으로 넘어짐 → 누리 말 → 처음 자리로
        if (busy || fin) return; busy = true; drag = null; const r = RT[route], [x, y, a] = at(r, t);
        G.audio.sfx('sfx_tap', 0.6, 0.6);
        if (!G.reduced()) {
          await G.tween(0, 1, 0.35, k => place(x + Math.sin(k * 40) * 6, y, a), 'lin');
          G.audio.sfx('sfx_flap', 0.5, 0.7);
          await G.tween(0, 1, 0.6, k => place(x + 40 * k * (route === 'stair' ? 1 : -1), y + 50 * k * k, a, 110 * k), 'in');
        }
        spark(car, 6); await G.wait(0.3); if (!ok()) return;
        await play([r.say], { partner: 'nuri' }); if (!ok()) return;
        car.style.opacity = 0; home(); await G.tween(0, 1, 0.4, k => car.style.opacity = k); busy = false;
      }
      async function blocked() {   // 웅덩이 앞에서 멈춤 → 먼저 웅덩이 없애기
        if (stuck) return; stuck = true; busy = true; drag = null; wob(car);
        await play(['TD01_nuri_13'], { partner: 'nuri' }); busy = false; if (!ok()) return;
        if (pud) { wob(pud); pud.classList.add('s4-live'); }
      }
      async function win() {
        if (fin) return; fin = true; busy = true; cur = null; G.help.off(); clear(); S.hush();
        const r = RT.slope; await G.tween(t, 1, 0.8 * (1 - t) + 0.2, k => { const [x, y, a] = at(r, k); place(x, y, a); }, 'out'); if (!ok()) return;
        G.audio.sfx('sfx_sparkle', 0.8); spark(car, 12); await G.wait(1.2); S.end(); res(ok());
      }
      function clear() { if (arrow) arrow.remove(); arrow = null; if (glow) glow.remove(); glow = null; if (zone) zone.classList.remove('s3-hint'); }
      cur = { solve: async () => { if (pud) { S.at(pud, 1230, 730, 300, 150); pud = null; } stuck = false; busy = false; if (!fin) await drive('slope'); } };
      G.help.set({
        l1: () => S.say('TD01_rumi_10'),
        l2: () => { if (!arrow) arrow = arrowAt(S, stuck && pud ? pud : car); },
        l3: () => { if (stuck && zone) { zone.classList.add('s3-hint'); return; } if (glow) return;   // 비탈길을 빛으로 보여 줌
          glow = G.el('div', 's4-roadglow', S.B, `<svg viewBox="0 0 1600 900" width="1600" height="900"><polyline points="${RT.slope.pts.map(p => p.join(',')).join(' ')}" fill="none" stroke="#FFD66B" stroke-width="26" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="2 40" opacity=".9"/></svg>`);
          setTimeout(() => { if (glow) glow.remove(); glow = null; }, 3500); },
        clear,
      });
    });
  }
  // 목공방: 계단 옆 점선 자리에 난간 기둥 꽂기 (쉽게 앞 2개, 보통 앞·가운데 4개, 어렵게 6개). 10/8 선생님: 실제 기둥은 길이가 같으니 키로 나누지 않음 - 같은 기둥이 어느 자리든 원근에 맞게 커지고 작아짐
  function railPosts() {
    const L = lv();
    const SP = [['front', 830, 454, 68, 346], ['front', 1368, 454, 64, 346], ['mid', 898, 348, 54, 292], ['mid', 1302, 348, 56, 292], ['back', 952, 268, 42, 208], ['back', 1244, 268, 42, 208]];
    const n = L === 'easy' ? 2 : L === 'hard' ? 6 : 4;
    const slots = SP.slice(0, n).map(([k, x, y, w, h], i) => ({ id: 'p' + i, k, x, y, w, h, fit: 'fill' }));
    const pre = SP.slice(n).map(([k, x, y, w, h]) => ['td_post_4', x, y, w, h]);   // 남는 점선 자리는 기둥이 이미 꽂혀 있음
    const items = slots.map((s, i) => ({ id: 'post' + i, art: 'td_post_4', w: 104 * 0.5, h: 545 * 0.5, label: '난간 기둥' }));
    shuffle(items).forEach((it, i) => { it.x = 70 + i * 110; it.y = 860 - it.h; });
    return placePz({
      cls: 's4z-rail', bg: 'td_rail_bg', color: 'linear-gradient(#8a6a4e,#5E4A3A)', tray: [40, 560, 690, 320], items, slots, pre, hint: 'TD02_rumi_10',
      fits: () => true, won: () => items.every(it => it.slot),
    });
  }
  // 꽃집: 통로(노란 점선) 안 화분을 옆 선반 빈자리로 옮겨 길 넓히기 (쉽게 2개, 보통 3개, 어렵게 4개)
  function aislePots() {
    const L = lv(), n = L === 'easy' ? 2 : L === 'hard' ? 4 : 3;
    const slots = [[10, 230, 135, 170], [145, 230, 135, 170], [20, 430, 250, 150], [1350, 250, 240, 150]].map(([x, y, w, h], i) => ({ id: 's' + i, x, y, w, h }));
    const P = [['td_pot_1', 224, 335], ['td_pot_2', 257, 419], ['td_pot_3', 259, 580], ['td_pot_4', 377, 359]].slice(0, n);
    const ord = shuffle(P.map((_, i) => i)), items = P.map(([art, w, h], i) => { const k = 230 / h; return { id: art, art, w: w * k, h: 230, x: 380 + ord[i] * (880 / n), y: 600, label: '화분' }; });   // 10/8: 화분 자리가 매번 바뀜
    return placePz({
      cls: 's4z-aisle', bg: 'td_aisle_bg', color: 'linear-gradient(#FFF1D6,#E8D3B0)', items, slots, hint: 'TD03_rumi_10',
      fits: () => true, won: () => items.every(it => it.slot),
    });
  }

  // ================= 문턱의 별-3: 꽃집 =================
  G.flows.s4_flower = async (ctx) => {
    const { V, H, g, complete } = ctx, ok = () => g === G.gen, id = H.def.id, dn = { partner: 'yunseul' }, no = { partner: 'nuri' };
    if (id === 'boxes') {
      if (done('s4flower_box')) { await play(['TD03_yunseul_04'], dn); return; }
      await play(['TD03_yunseul_01', 'TD03_yunseul_02'], dn); if (!ok()) return;
      await play(['TD03_nuri_01'], no); if (!ok()) return;
      await play(['TD03_yunseul_03', 'TD03_rumi_01'], dn); if (!ok()) return;
      const w = await crates(); if (!ok() || !w) return;
      await play(['TD03_yunseul_04'], dn); if (!ok()) return;
      complete('s4flower_box'); say('TD03_rumi_03'); return;
    }
    if (id === 'door') {
      if (done('s4flower_door')) { await play(['TD03_yunseul_09'], dn); return; }
      await play(['TD03_nuri_02'], no); if (!ok()) return;
      await play(['TD03_yunseul_05'], dn); if (!ok()) return;
      await play(['TD03_rumi_03']); if (!ok()) return;
      await play(['TD03_yunseul_06'], dn); if (!ok()) return;
      const w = await shopDoor(); if (!ok() || !w) return;
      await play(['TD03_yunseul_10', 'TD03_yunseul_11'], dn); if (!ok()) return;
      if (!has('button')) { await presentItem('button'); if (!ok()) return; }
      if (!done('s4flower_aisle')) {   // 10/8 검토 보강: 통로의 화분을 선반으로
        await play(['TD03_yunseul_20'], dn); if (!ok()) return;
        await play(['TD03_rumi_10']); if (!ok()) return;
        const w2 = await aislePots(); if (!ok() || !w2) return;
        mark('s4flower_aisle'); await play(['TD03_nuri_10'], no); if (!ok()) return;
      }
      await colorIn(V); if (!ok()) return;
      await play(['TD03_nuri_04'], no); if (!ok()) return;
      complete('s4flower_door'); return;
    }
    if (id === 'yunseul') { await play([done('s4flower_door') ? 'TD03_yunseul_09' : done('s4flower_box') ? 'TD03_yunseul_05' : 'TD03_yunseul_03'], dn); return; }
    if (id === 'nuri') { await play([done('s4flower_door') ? 'TD03_nuri_04' : done('s4flower_box') ? 'TD03_nuri_02' : 'TD03_nuri_01'], no); }
  };

  // ---- 퍼즐: 화분 상자 밀기 (위에서 본 바닥 6칸 x 4줄). 상자를 누르면 길게 놓인 쪽 양 끝에 화살표 → 한 칸씩 밂. 둘째 줄(문 → 계산대)이 비면 성공 ----
  const ARR = (r) => ART('td_arrow') ? `<img src="${ART('td_arrow')}" alt="" style="transform:rotate(${r}deg)">` : `<svg viewBox="0 0 60 60" style="transform:rotate(${r}deg)"><path d="M30 6 L54 40 H38 V56 H22 V40 H6 Z" fill="#8a5a0a"/></svg>`;
  const ARRC = () => 's4-arr' + (ART('td_arrow') ? ' art' : '');   // 10/10 선생님 화살표 단추 그림
  function crates() {
    return new Promise((res) => {
      const g = G.gen, ok = () => g === G.gen, C = 6, R = 4, P = 1, CS = 160, X0 = 320, Y0 = 130;
      const S = screen('s4z-crate', 1600, 900); bgOf(S, 'td_shop_floor', 'linear-gradient(#e9d8b4,#d7c093)');
      if (!ART('td_shop_floor')) for (let r = 0; r < R; r++) for (let c = 0; c < C; c++) S.at(G.el('div', 's4-cell' + (r === P ? ' path' : ''), S.B), X0 + c * CS, Y0 + r * CS);
      S.at(G.el('div', 's4-mark', S.B, '문'), X0 - 110, Y0 + P * CS + 50); S.at(G.el('div', 's4-mark', S.B, '계산대'), X0 + C * CS + 16, Y0 + P * CS + 50);
      const cart = S.at(G.el('div', 's4-cart', S.B, artOr('td_cart', '') + (ART('nuri_00') || ART('td_cart') ? '' : `<img src="${G.asset(G.D.portraits.nuri.img)}" alt="">`)), X0 - 170, Y0 + P * CS);
      const FL = ['#F29BB0', '#FFD66B', '#E88D7A', '#7DBBE3', '#B58BC4'];
      let bs = (D4().crates[lv()] || D4().crates.normal).map((q, i) => ({ o: q[0], r: q[1], c: q[2], i }));
      const cellsOf = (b) => b.o === 'v' ? [[b.r, b.c], [b.r + 1, b.c]] : [[b.r, b.c], [b.r, b.c + 1]];
      const occ = (skip) => { const s = new Set(); bs.forEach(b => { if (b !== skip) cellsOf(b).forEach(([r, c]) => s.add(r * 10 + c)); }); return s; };
      const canMove = (b, d) => { const n = b.o === 'v' ? { ...b, r: b.r + d } : { ...b, c: b.c + d }, o = occ(b); return cellsOf(n).every(([r, c]) => r >= 0 && r < R && c >= 0 && c < C && !o.has(r * 10 + c)) ? n : null; };
      const els = bs.map(b => {
        const e = G.btn('s4-crate ' + b.o, artOr(b.o === 'v' ? 'td_crate_v' : 'td_crate_h', [0, 1].map(j => `<i style="background:${FL[(b.i + j) % FL.length]}"></i>`).join('')), S.B, () => select(b), '화분 상자');
        Object.assign(e.style, { width: (b.o === 'v' ? CS : CS * 2) - 16 + 'px', height: (b.o === 'v' ? CS * 2 : CS) - 16 + 'px' }); b.e = e; return e;
      });
      const place = (b) => S.at(b.e, X0 + b.c * CS + 8, Y0 + b.r * CS + 8);
      bs.forEach(place);
      let sel = null, arrs = [], fin = false;
      const clearArr = () => { arrs.forEach(a => a.remove()); arrs = []; };
      function select(b) {
        if (fin || G.dialog.active) return; G.help.poke(); G.audio.sfx('sfx_tap', 0.4);
        if (sel) sel.e.classList.remove('sel'); sel = b; b.e.classList.add('sel'); clearArr();
        for (const d of [-1, 1]) {
          if (!canMove(b, d)) continue;
          const end = d < 0 ? [b.r, b.c] : cellsOf(b)[1], ar = b.o === 'v' ? (d < 0 ? 0 : 180) : (d < 0 ? 270 : 90);
          const x = X0 + end[1] * CS + CS / 2 + (b.o === 'h' ? d * (CS / 2 + 10) : 0) - 48, y = Y0 + end[0] * CS + CS / 2 + (b.o === 'v' ? d * (CS / 2 + 10) : 0) - 48;
          const a = G.btn(ARRC(), ARR(ar), S.B, () => move(b, d), '상자 밀기'); S.at(a, x, y); arrs.push(a);
        }
        if (!arrs.length) wob(b.e);
      }
      function move(b, d) {
        if (fin) return; const n = canMove(b, d); if (!n) return;
        b.r = n.r; b.c = n.c; place(b); G.audio.sfx('sfx_tap', 0.35, 0.7);
        if (!occ().size || ![...Array(C).keys()].some(c => occ().has(P * 10 + c))) return win();
        select(b);
      }
      async function win() {
        fin = true; cur = null; clearArr(); if (sel) sel.e.classList.remove('sel'); G.help.off(); S.hush();
        G.audio.sfx('sfx_sparkle', 0.7); await G.wait(0.3);
        cart.style.left = (X0 + C * CS - 160) + 'px'; await G.wait(G.reduced() ? 0.3 : 1.8);
        spark(cart, 12); await G.wait(0.8); S.end(); res(ok());
      }
      cur = { solve: () => win() };
      S.say('TD03_rumi_02');
      G.help.set({ l1: () => S.say('TD03_rumi_02'), l2: () => { const b = bs.find(q => cellsOf(q).some(([r]) => r === P)); if (b) wob(b.e); },
        l3: () => { const b = bs.find(q => cellsOf(q).some(([r]) => r === P) && (canMove(q, -1) || canMove(q, 1))) || bs.find(q => canMove(q, -1) || canMove(q, 1)); if (b) { b.e.classList.add('s3-hint'); setTimeout(() => b.e.classList.remove('s3-hint'), 3000); } }, clear: () => { } });
    });
  }

  // ---- 퍼즐: 꽃집 문. 서랍에서 막대 손잡이를 찾아 둥근 손잡이 자리에 닮 → 단추 높이 고르기 (어떤 답도 좋은 생각, 같이 생각해 낮은 곳) ----
  function shopDoor() {
    return new Promise((res) => {
      const g = G.gen, ok = () => g === G.gen, ITS = D4().drawer[lv()] || D4().drawer.normal, dn = { partner: 'yunseul' }, no = { partner: 'nuri' };
      const S = screen('s4z-sdoor', 1600, 900); bgOf(S, 'td_shopdoor_bg', 'linear-gradient(#cfe3c4,#9fc690)');
      const noBg = !ART('td_shopdoor_bg');
      if (noBg) { const d = S.at(G.el('div', 's4-door', S.B), 520, 60, 420, 780); d.style.background = '#7FB77E'; }
      const KN = [850, 470], MT = [[1150, 200], [1150, 430], [1150, 660]];   // 손잡이, 단추 자리 (높은 곳, 가운데, 낮은 곳)
      const knob = noBg ? S.at(G.el('div', 's4-knob', S.B), KN[0] - 35, KN[1] - 35) : null;   // 10/8 선생님: 코드 그림 빼고 그림 속 둥근 손잡이를 씀
      const KB = [940, 500];   // 그림 속 둥근 손잡이 자리
      if (noBg) MT.forEach(([x, y]) => S.at(G.el('div', 's4-mount', S.B), x - 45, y - 45));
      const drawer = G.btn(noBg ? 's4-drawer' : 's4-cab', '', S.B, () => openDrawer(), '서랍'); if (noBg) S.at(drawer, 160, 660, 300, 170); else S.at(drawer, 312, 612, 246, 236);   // 10/8 선생님: 그림 속 서랍장이 반짝이고, 누르면 손잡이 고르기
      let fin = false, opened = false;
      const NM = { lever: '막대 손잡이', knob: '둥근 손잡이', car: '장난감 차' };
      const PIC = { lever: ['td_lever', '<div style="width:150px;height:30px;background:#E6B54A;border:5px solid #8a6a0a;border-radius:15px"></div>'], knob: ['td_knob', '<div style="width:60px;height:60px;background:#E6B54A;border:5px solid #8a6a0a;border-radius:50%"></div>'], car: ['td_car', '<div style="width:90px;height:50px;background:#E8573F;border-radius:16px"></div>'] };
      let opts = [];
      function openDrawer() {
        if (opened || fin || G.dialog.active) return; opened = true; G.help.poke(); drawer.classList.add('open'); drawer.disabled = true; G.audio.sfx('sfx_tap', 0.5);
        opts = ITS.map((k, i) => { const b = G.btn('s4-choice', `<div class="s4-pic${ART(PIC[k][0]) ? ' art' : ''}" style="height:80px;display:flex;align-items:center">${artOr(PIC[k][0], PIC[k][1])}</div><span>${NM[k]}</span>`, S.B, () => pick(k, b), NM[k]); S.at(b, 120 + i * 230, 420 - (i % 2) * 0, 210, 190); b.dataset.k = k; return b; });
      }
      async function pick(k, b) {
        if (fin || G.dialog.active) return;
        if (k !== 'lever') { wob(b); S.say('TD03_yunseul_06'); return; }
        fin = true; G.help.off(); S.hush(); opts.forEach(o => o.remove());
        let lev;
        if (knob || !ART('td_lever')) { if (knob) knob.remove(); lev = S.at(G.el('div', 's4-lever', S.B), KN[0] - 22, KN[1] - 22); }
        else { lev = S.at(G.el('div', 's4-leverimg', S.B, `<img src="${ART('td_lever')}" alt="">`), KB[0] - 159, KB[1] - 41, 200, 82); }   // 받은 막대 손잡이 그림, 둥근 손잡이 자리에서 문 안쪽으로
        G.audio.sfx('sfx_chime', 0.5); spark(lev, 8);
        await G.wait(0.6); lev.style.transform = lev.classList.contains('s4-leverimg') ? 'rotate(-28deg)' : 'rotate(28deg)'; await G.wait(0.5); lev.style.transform = '';
        await play(['TD03_yunseul_07', 'TD03_yunseul_08'], { ...dn, keep: true }); if (!ok()) return S.end();
        // 단추 높이: 어떤 답도 받아 줌
        const i = await G.dialog.choose(['TD03_ply_01', 'TD03_ply_02', 'TD03_ply_03'].map(v => ({ label: G.txt(v), icon: 'icon_good', voice: v })), true); if (!ok()) return S.end();
        const tmp = ART('item_button') ? S.at(G.el('div', 's4-btnimg', S.B, `<img src="${ART('item_button')}" alt="">`), MT[i][0] - 50, MT[i][1] - 50, 100, 100) : S.at(G.el('div', 's4-btnon', S.B), MT[i][0] - 45, MT[i][1] - 45); G.audio.sfx('sfx_tap', 0.5);
        await play(['TD03_rumi_04']); if (!ok()) return S.end();
        if (i !== 2) { await G.tween(0, 1, G.reduced() ? 0.2 : 0.7, k2 => { tmp.style.top = (MT[i][1] - 45 + (MT[2][1] - MT[i][1]) * k2) + 'px'; }, 'io'); }
        spark(tmp, 10); G.audio.sfx('sfx_sparkle', 0.6);
        await play(['TD03_nuri_03'], no); if (!ok()) return S.end();
        await play(['TD03_yunseul_09'], dn); if (!ok()) return S.end();
        cur = null; S.end(); res(ok());
      }
      cur = { solve: () => { if (!opened) openDrawer(); const b = opts.find(o => o.dataset.k === 'lever'); if (b) pick('lever', b); } };
      S.say('TD03_yunseul_06');
      G.help.set({ l1: () => S.say('TD03_yunseul_06'), l2: () => wob(opened ? (opts.find(o => o.dataset.k === 'lever') || drawer) : drawer),
        l3: () => { const e = opened ? opts.find(o => o.dataset.k === 'lever') : drawer; if (e) { e.classList.add('s3-hint'); setTimeout(() => e.classList.remove('s3-hint'), 3000); } }, clear: () => { } });
    });
  }

  // ================= 문턱의 별-4: 전망대 =================
  G.flows.s4_view = async (ctx) => {
    const { V, H, g, complete } = ctx, ok = () => g === G.gen, id = H.def.id, no = { partner: 'nuri' };
    if (id === 'path') {
      if (done('s4view_path')) { await play(['TD04_nuri_02'], no); return; }
      await play(['TD04_nuri_01', 'TD04_nuri_10'], no); if (!ok()) return;
      // 10/7 수석 디렉터 규칙: 마음이 닫히는 순간 (누리가 돌아섬) → 고르기로 엶. 어떤 답도 받아 주고 원래 답으로
      const nb = V.spr.nuri && V.spr.nuri.img; if (nb) { nb.style.scale = '-1 1'; nb.style.opacity = 0.6; }
      const i = await G.dialog.choose(['TD04_ply_04', 'TD04_ply_05', 'TD04_ply_06'].map(v => ({ label: G.txt(v), icon: 'icon_good', voice: v })), true); if (!ok()) return;
      if (i !== 0) { await play(['TD04_rumi_08']); if (!ok()) return; }
      if (nb) { nb.style.scale = ''; nb.style.opacity = ''; }
      await play(['TD04_nuri_11'], no); if (!ok()) return;
      // 지난 별 인물: 길의 별 해솔. 노란 길(점자블록)이 이 퍼즐의 둘째 열쇠
      await play(['TD04_haesol_01', 'TD04_haesol_02'], { partner: 'haesol' }); if (!ok()) return;
      await play(['TD04_rumi_01']); if (!ok()) return;
      const w = await tiles(); if (!ok() || !w) return;
      await play(['TD04_nuri_02'], no); if (!ok()) return;
      await play(['TD04_haesol_03'], { partner: 'haesol' }); if (!ok()) return;
      complete('s4view_path'); say('TD04_rumi_03'); return;
    }
    if (id === 'door') {
      if (done('s4view_door')) { await play(['TD04_nuri_03'], no); return; }
      await play(['TD04_rumi_03']); if (!ok()) return;
      await play(['TD04_hero_01'], no); if (!ok()) return;
      say('TD04_hero_01');
      const u = await G.p4.useItem('button', H.btn, { say, hint: 'TD04_hero_01' }); if (!u || !ok()) return;
      const d = V.spr.door && V.spr.door.img; if (d) await G.tween(1, 0.35, G.reduced() ? 0.2 : 1.0, v => d.style.opacity = v); G.audio.sfx('sfx_chime', 0.5);
      await play(['TD04_nuri_03'], no); if (!ok()) return;
      complete('s4view_door'); say('TD04_rumi_04'); return;
    }
    if (id === 'scope') {
      if (done('s4view_scope')) { await play(['TD04_nuri_07'], no); return; }
      await play(['TD04_nuri_04', 'TD04_nuri_05', 'TD04_nuri_20'], no); if (!ok()) return;   // 10/9 개선 6: 앉은 눈높이 까닭
      await play(['TD04_rumi_04']); if (!ok()) return;
      const w = await scope(); if (!ok() || !w) return;
      await play(['TD04_rumi_05']); if (!ok()) return;
      if (!await G.p4.askHelp(V, 'nuri', 'TD04_ply_07')) return;   // 10/9 수정안: 돕기 전에 먼저 묻기
      await play(['TD04_nuri_06'], no); if (!ok()) return;
      // 누리가 새 경사로로 내려가 별을 가져옴
      const n = V.spr.nuri && V.spr.nuri.img, rm = G.reduced();
      if (n) { await G.tween(1, 0, rm ? 0.2 : 0.8, v => { n.style.opacity = v; n.style.translate = `${(1 - v) * -120}px 0`; }); await G.wait(rm ? 0.3 : 1.6); await G.tween(0, 1, rm ? 0.2 : 0.8, v => { n.style.opacity = v; n.style.translate = `${(1 - v) * -120}px 0`; }); n.style.translate = ''; }
      if (!ok()) return;
      await play(['TD04_nuri_09'], no); if (!ok()) return;
      if (!has('piece_door')) { await presentItem('piece_door'); if (!ok()) return; }
      await play(['TD04_nuri_07', 'TD04_nuri_08', 'TD04_hero_02'], no); if (!ok()) return;
      await play(['TD04_rumi_07']); if (!ok()) return;
      await colorIn(V); if (!ok()) return;
      complete('s4view_scope'); return;
    }
    if (id === 'nuri') { await play([done('s4view_scope') ? 'TD04_nuri_07' : done('s4view_path') ? 'TD04_nuri_04' : 'TD04_nuri_01'], no); }
  };

  // ---- 퍼즐: 길 조각 돌리기. 누리 지도 위 조각을 눌러 돌려 집 → 전망대 길을 이음. 계단 칸에는 가방의 경사판을 놓음 ----
  // 방향 0 위, 1 오른쪽, 2 아래, 3 왼쪽. 곧은 조각 = 왼-오(돌림 0), 꺾인 조각 = 위-오(돌림 0)
  function tileSvg(kind, stair, plank, yel) {
    if (ART('td_tile_I')) return `<img src="${ART(stair ? (plank ? 'td_tile_ramp' : 'td_tile_stair') : (kind === 'I' ? 'td_tile_I' : 'td_tile_L') + (yel ? '' : '_gap'))}" alt="">`;   // 10/10 선생님 길 조각 그림 td_tiles
    const p = kind === 'I' ? 'M0 50 H100' : 'M50 0 V50 H100';
    let s = `<svg viewBox="0 0 100 100"><path d="${p}" stroke="#A0764F" stroke-width="30" fill="none" stroke-linecap="butt"/><path d="${p}" stroke="#d9b98a" stroke-width="18" fill="none"/>`;
    if (yel) s += `<path d="${p}" stroke="#FFD66B" stroke-width="7" stroke-dasharray="6 3" fill="none"/>`;   // 노란 길 (점자블록)
    if (stair) s += [30, 42, 54, 66].map(x => `<rect x="${x}" y="35" width="8" height="30" fill="#9A97A8"/>`).join('');
    if (plank) s += '<rect x="20" y="38" width="60" height="24" rx="4" fill="#C9A27A" stroke="#8B5E3C" stroke-width="4"/>';
    return s + '</svg>';
  }
  function tiles() {
    return new Promise((res) => {
      const g = G.gen, ok = () => g === G.gen, T4 = D4().tiles[lv()] || D4().tiles.normal, [NC, NR] = T4.size, CS = 180;
      const S = screen('s4z-tiles', 1600, 900); bgOf(S, 'td_map_bg', 'linear-gradient(#FFF4E0,#F1E2C4)');
      const X0 = (1600 - NC * CS) / 2, Y0 = 130 + (600 - NR * CS) / 2;
      const dirTo = (a, b) => b[0] > a[0] ? 1 : b[0] < a[0] ? 3 : b[1] > a[1] ? 2 : 0;
      const route = T4.route, cells = route.map((p, i) => {
        const a = i === 0 ? 3 : dirTo(p, route[i - 1]), b = i === route.length - 1 ? 1 : dirTo(p, route[i + 1]);
        const need = [a, b].sort().join(), kind = (a + 2) % 4 === b ? 'I' : 'L';
        const rots = [0, 1, 2, 3].filter(r => (kind === 'I' ? [(3 + r) % 4, (1 + r) % 4] : [r % 4, (1 + r) % 4]).sort().join() === need);
        return { p, kind, rots, stair: i === T4.stair, rot: 0, plank: false, yel: true };
      });
      // 노란 길이 끊긴 칸 (계단 칸·첫 칸은 빼고 고르게)
      const cand = cells.filter((c, i) => i > 0 && !c.stair), ng = Math.min(T4.gaps || 0, cand.length);
      for (let k = 0; k < ng; k++) cand[Math.floor((k + 0.5) * cand.length / ng)].yel = false;
      const fixed = (q) => q.rots.includes(q.rot) && (!q.stair || q.plank) && q.yel;
      cells.forEach(c => { if (c.stair) c.rot = c.rots[0]; else { const bad = [0, 1, 2, 3].filter(r => !c.rots.includes(r)); c.rot = bad[Math.floor(Math.random() * bad.length)]; } });
      const inRoute = (x, y) => cells.some(c => c.p[0] === x && c.p[1] === y);
      for (let y = 0; y < NR; y++) for (let x = 0; x < NC; x++) if (!inRoute(x, y)) S.at(G.el('div', 's4-tile grass' + (ART('td_tile_grass') ? ' art' : ''), S.B, ART('td_tile_grass') ? `<img src="${ART('td_tile_grass')}" alt="">` : ''), X0 + x * CS + 5, Y0 + y * CS + 5);
      const st = route[0], en = route[route.length - 1];
      S.at(G.el('div', 's4-mark', S.B, '누리 집'), X0 - 170, Y0 + st[1] * CS + 60); S.at(G.el('div', 's4-mark', S.B, '전망대'), X0 + NC * CS + 14, Y0 + en[1] * CS + 60);
      let fin = false, sayStair = false, sayYel = false;
      const draw = (c) => { c.e.innerHTML = tileSvg(c.kind, c.stair, c.plank, c.yel); c.e.firstChild.style.transform = `rotate(${c.rot * 90}deg)`; c.e.classList.toggle('ok', fixed(c)); };
      cells.forEach(c => { c.e = G.btn('s4-tile' + (ART('td_tile_I') ? ' art' : ''), '', S.B, () => tap(c), c.stair ? '계단 조각' : '길 조각'); S.at(c.e, X0 + c.p[0] * CS + 5, Y0 + c.p[1] * CS + 5); draw(c); });
      const okAll = () => cells.every(fixed);
      const yelNext = () => { if (!sayYel && cells.every(c => c.rots.includes(c.rot) && (!c.stair || c.plank)) && !okAll()) { sayYel = true; S.say('TD04_rumi_09'); const c = cells.find(q => !q.yel); if (c) wob(c.e); } };
      async function tap(c) {
        if (fin || G.dialog.active) return; G.help.poke();
        if (c.stair) {
          if (c.plank) return;
          if (!sayStair) { sayStair = true; S.say('TD04_rumi_02'); }
          const u = await G.p4.useItem('plank', c.e, { parent: S.root, say: S.say, hint: 'TD04_rumi_02' }); if (!u || !ok()) return;
          c.plank = true; draw(c); if (okAll()) win(); else yelNext(); return;
        }
        if (!c.yel && c.rots.includes(c.rot)) { c.yel = true; draw(c); G.audio.sfx('sfx_chime', 0.4); spark(c.e, 3); if (okAll()) win(); return; }   // 노란 길 잇기
        c.rot = (c.rot + 1) % 4; draw(c); G.audio.sfx('sfx_tap', 0.35, 1.2);
        if (okAll()) win(); else yelNext();
      }
      async function win() { if (fin) return; fin = true; cur = null; G.help.off(); S.hush(); G.audio.sfx('sfx_sparkle', 0.8); for (const c of cells) { spark(c.e, 3); await G.wait(G.reduced() ? 0.02 : 0.12); } await G.wait(1.0); S.end(); res(ok()); }
      cur = { solve: () => { cells.forEach(c => { c.rot = c.rots[0]; c.plank = true; c.yel = true; draw(c); }); win(); } };
      S.say('TD04_rumi_01');
      G.help.set({ l1: () => S.say(sayYel ? 'TD04_rumi_09' : 'TD04_rumi_01'), l2: () => { const c = cells.find(q => !fixed(q)); if (c) wob(c.e); },
        l3: () => { const c = cells.find(q => !fixed(q)); if (c) { c.e.classList.add('s3-hint'); setTimeout(() => c.e.classList.remove('s3-hint'), 3000); } }, clear: () => { } });
    });
  }

  // ---- 퍼즐: 망원경. 작은 시야를 끌거나 화살표로 옮겨 누리가 본 곳(꽃밭 사이 초록빛)을 찾아 누름 ----
  function scope() {
    return new Promise((res) => {
      const g = G.gen, ok = () => g === G.gen, SP = D4().scope, R = (SP[lv()] || SP.normal).r;
      const S = screen('s4z-scope', 1600, 900); bgOf(S, 'td_view_bg', 'linear-gradient(#2a2f52,#151a33)');
      const LW = 2400, LH = 1350, CX = 800, CY = 430;
      const box = S.at(G.el('div', 's4-scope', S.B), CX - R, CY - R, R * 2, R * 2);
      if (ART('td_scope_ring')) { box.style.borderColor = 'transparent'; const RR = R / 0.7; S.at(G.el('img', 's4-ring', S.B), CX - RR, CY - RR, RR * 2, RR * 2).src = ART('td_scope_ring'); }   // 10/10 선생님 망원경 테두리 그림
      const land = G.el('div', 's4-land', box); Object.assign(land.style, { width: LW + 'px', height: LH + 'px', backgroundImage: `url("${ART('td_view_land') || G.asset('assets/map/map2_color_s.jpg')}")` });
      const gl = G.btn('s4-glint', '', land, () => win(), '초록빛'); Object.assign(gl.style, { left: SP.glint[0] * LW + 'px', top: SP.glint[1] * LH + 'px' });
      let vx = LW * 0.2, vy = LH * 0.2, fin = false;   // 시야 가운데가 보는 풍경 자리
      const set = () => { vx = Math.max(R, Math.min(LW - R, vx)); vy = Math.max(R, Math.min(LH - R, vy)); land.style.transform = `translate(${R - vx}px,${R - vy}px)`; };
      set();
      let drag = null;
      box.addEventListener('pointerdown', (e) => { if (fin || G.dialog.active || e.target === gl) return; drag = [e.clientX, e.clientY, vx, vy]; try { box.setPointerCapture(e.pointerId); } catch (_) { } G.help.poke(); });
      box.addEventListener('pointermove', (e) => { if (!drag) return; const k = S.k || 1; vx = drag[2] - (e.clientX - drag[0]) / k; vy = drag[3] - (e.clientY - drag[1]) / k; set(); });
      const up = () => { drag = null; }; box.addEventListener('pointerup', up); box.addEventListener('pointercancel', up);
      [[0, 0, -1, CX - 48, CY - R - 120], [180, 0, 1, CX - 48, CY + R + 24], [270, -1, 0, CX - R - 130, CY - 48], [90, 1, 0, CX + R + 34, CY - 48]].forEach(([r, dx, dy, x, y]) => {
        const a = G.btn(ARRC(), ARR(r), S.B, () => { if (fin) return; G.help.poke(); G.audio.sfx('sfx_tap', 0.3); const x0 = vx, y0 = vy; G.tween(0, 1, 0.3, k => { vx = x0 + dx * 160 * k; vy = y0 + dy * 160 * k; set(); }, 'out'); }, '망원경 돌리기'); S.at(a, x, y);
      });
      if (ART('td_nuri_draw')) S.at(G.el('div', 's3-panel', S.B, `<img src="${ART('td_nuri_draw')}" alt="" style="width:100%;height:100%;object-fit:contain">`), 1240, 560, 300, 260);
      async function win() { if (fin || G.dialog.active) return; fin = true; cur = null; G.help.off(); S.hush(); G.audio.sfx('sfx_sparkle', 0.9); spark(gl, 14); await G.wait(1.3); S.end(); res(ok()); }
      cur = { solve: () => { vx = SP.glint[0] * LW; vy = SP.glint[1] * LH; set(); win(); } };
      S.say('TD04_rumi_04');
      G.help.set({ l1: () => S.say('TD04_rumi_04'), l2: () => { const x0 = vx, y0 = vy, tx = x0 + (SP.glint[0] * LW - x0) * 0.5, ty = y0 + (SP.glint[1] * LH - y0) * 0.5; G.tween(0, 1, 0.8, k => { vx = x0 + (tx - x0) * k; vy = y0 + (ty - y0) * k; set(); }, 'io'); },
        l3: () => { const x0 = vx, y0 = vy; G.tween(0, 1, 0.8, k => { vx = x0 + (SP.glint[0] * LW - x0) * k; vy = y0 + (SP.glint[1] * LH - y0) * k; set(); }, 'io'); }, clear: () => { } });
    });
  }

  // ================= 문턱의 별-5: 광장 잔치 =================
  G.flows.s4_plaza = async (ctx) => {
    const { S, V, H, g, complete } = ctx, ok = () => g === G.gen, id = H.def.id;
    if (id === 'nuri') {
      if (done('s4plaza_card')) { await play(['TD05_nuri_01'], { partner: 'nuri' }); return; }
      await play(['TD05_chief_01'], { partner: 'chief' }); if (!ok()) return;
      await play(['TD05_maru_01'], { partner: 'maru' }); if (!ok()) return;
      await play(['TD05_chief_03'], { partner: 'maru' }); if (!ok()) return;   // 10/8 검토: 깨달음은 문턱을 고집하던 마루 할머니가 (번호 그대로, 목소리 마루)
      { const at = S.feastDust.maru; dustBtn(V, 's4plaza:maru', at[0], at[1]); G.audio.sfx('sfx_sparkle', 0.5); }
      await play(['TD05_yunseul_01'], { partner: 'yunseul' }); if (!ok()) return;
      { const at = S.feastDust.yunseul; dustBtn(V, 's4plaza:yunseul', at[0], at[1]); G.audio.sfx('sfx_sparkle', 0.5); }
      await play(['TD05_nuri_01'], { partner: 'nuri' }); if (!ok()) return;
      await play(['TD05_daon_01'], { partner: 'daon' }); if (!ok()) return;   // 10/8 검토: 다온이 잔치에
      await play(['TD05_rumi_01']); if (!ok()) return;   // 10/7 교훈은 말로 두 번까지: 별이 하던 일은 플레이어가 별 카드로 찾음 (TD05_rumi_02 뺌)
      // 별 카드: 우리가 바꾼 방법을 별에게 돌려주면 별이 빛남 (틀린 답 없음)
      if (!await G.p4.daonGuide('door', 'TD05_daon_10', 'TD05_daon_11')) return;   // 10/9 수정안 3단계: 다온의 쉬운 안내판
      if (!await G.starCard('door', [{ art: 'item_plank', label: '비탈길' }, { art: 'item_lever', label: '막대 손잡이' }, { art: 'item_button', label: '누름 단추' }, { art: 'item_s4map', label: '모두의 지도' }])) return;
      if (!await G.p4.beforeAfter('s4flower_before', 's4flower_after', 'TD05_rumi_20')) return;   // 10/9 수정안 3단계: 셋째 교훈은 전과 후 그림으로
      complete('s4plaza_card'); return;   // 10/8 검토: 엔딩 촌장님 세 줄 연속 줄임 (TD05_chief_02 뺌, 탭했을 때 한마디로만 남음)
    }
    if (id === 'pedestal') {
      if (sd().length < D4().dustNeed) { await play(['E11_chief_01'], { partner: 'chief' }); return; }
      if (has('piece_door')) {
        say('TD04_rumi_07');
        const u = await G.p4.useItem('piece_door', H.btn, { say, hint: 'TD04_rumi_07' }); if (!u || !ok()) return;
      }
      await play(['TD05_nuri_02'], { partner: 'nuri' }); if (!ok()) return;
      await starRise(V); if (!ok()) return;
      await play(['TD05_rumi_03']); if (!ok()) return;
      if (!cleared('s4plaza')) G.st.cleared.push('s4plaza');
      complete('s4plaza_star'); if (!ok()) return;
      await ending();
    }
  };
  // ---- 별이 받침대에서 하늘로 (길의 별·소리의 별과 같은 차례): 모이기 → 받침대로 → 빛 기둥 → 밤하늘 제자리 → 가로등·색·불꽃놀이 → 「문턱의 별」 ----
  const GATHER = { chief: [900, 520], maru: [1380, 430], nuri: [1370, 870], yunseul: [960, 720] };
  async function starRise(V) {
    const s = G.STARS.find(q => q.id === 'door'), ov = G.$('#overlay'), u = G.stage.u, rm = G.reduced();
    const { W, H: SH } = G.stage, wl = V.el.parentNode, S = V.S, ped = S.hotspots.find(h => h.id === 'pedestal').rect;
    const layer = G.el('div', 'layer', ov); layer.style.pointerEvents = 'none';
    G.hud.hide(true);
    V.fx.querySelectorAll('.hot-glow, .mstar').forEach(e => e.style.visibility = 'hidden');
    await V.gather(GATHER, 4);   // 10/8 선생님: 받침대로 올 때도 픽셀 걷기로 광장 길을 따라
    const [bx, by] = V.toScreen(ped[0] + ped[2] / 2, ped[1] + 40), hs = (V.spr.hero && V.spr.hero.rect) || S.sprites.find(q => q.id === 'hero').rect, [hx, hy] = V.toScreen(hs[0] + hs[2] / 2, hs[1]);
    const piece = G.el('div', 'c11-item', layer, G.icon(G.litIcon('piece_door')));   // 10/6: 받침대로 가는 별은 빛나는 별 Object.assign(piece.style, { left: hx + 'px', top: hy + 'px' });
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
    // 10/6 선생님: 별가루를 연료처럼 뿜으며 반짝이는 잔상을 남기고 올라감 (core.js G.riseTrail, 인트로와 같은 효과)
    const tr = G.riseTrail(layer, big, s.color), bs = big.offsetWidth || 190 * u;
    const pan = (k) => { const d = SH * k; tr.shift(d); wl.style.transform = `translateY(${d}px)`; sky.style.transform = `translateY(${d - SH}px)`; sky.style.opacity = Math.min(1, k * 2.5); pillar.style.translate = `0 ${d}px`; };
    const fly = (k) => { pan(k); const x = sx0 + (sx1 - sx0) * k, y = sy0 + (sy1 - sy0) * k - Math.sin(k * Math.PI) * 60 * u; big.style.left = x + 'px'; big.style.top = y + 'px'; big.style.transform = `translate(-50%,-50%) scale(${1 - 0.21 * k})`; tr(k, x, y, bs * (1 - 0.21 * k)); };
    if (rm) fly(1); else await G.tween(0, 1, 2.4, fly, 'io'); tr.end();
    big.remove(); slots[si].classList.add('lit'); G.audio.sfx('sfx_chime', 0.7);
    await G.wait(1.6);
    if (rm) pan(0); else await G.tween(1, 0, 2.0, pan, 'io');
    wl.style.transform = ''; sky.remove(); pillar.remove();
    for (const l of V.lamps) if (!l.el.classList.contains('on')) { l.el.classList.add('on'); G.audio.sfx('sfx_chime', 0.35); await G.wait(0.3); }
    const col = V.colorImg; col.style.visibility = ''; col.style.opacity = 1;
    G.fireworkShow(layer, 5);
    for (const k of ['chief', 'maru', 'nuri', 'yunseul', 'hero']) { const sp = V.spr[k]; if (sp && !rm && sp.img.animate && sp.img.style.display !== 'none') sp.img.animate([{ transform: 'translateY(0)' }, { transform: 'translateY(-16px)' }, { transform: 'translateY(0)' }], { duration: 500, iterations: 2 }); }
    const t = G.el('div', 'cut-title c11-title', layer, s.name || '문턱의 별'); t.style.opacity = 0;
    await G.tween(0, 1, 0.6, k => { t.style.opacity = k; t.style.transform = `translate(-50%,-50%) scale(${0.8 + 0.2 * k})`; }, 'out');
    await G.wait(2.4);
    if (layer.animate) await layer.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 500 }).finished.catch(() => { });
    layer.remove(); G.hud.hide(false);
  }


  // ================= 문턱의 별-6: 엔딩 (말의 별 엔딩과 같은 차례, 언덕에 색이 번짐) =================
  async function ending() {
    const g = G.gen, ok = () => g === G.gen, rm = G.reduced();
    if (!cleared('s4plaza')) G.st.cleared.push('s4plaza');
    G.st.place = 'plaza'; G.save.write();
    G.help.off(); G.hud.clear(); G.hud.hide(true); G.busy++;
    try {
      await G.cut.play('CH:s4_6', { key: 's4_6' }); if (!ok()) return;
      G.$('#fade').classList.add('on'); await G.wait(0.45); if (!ok()) return;
      G.scene.hide(); G.map.hide(); G.s2.sync();
      const world = G.$('#world'); world.innerHTML = '';
      const MV = G.mapView(world, {}); MV.setMood(5); MV.addMarkers();
      for (const p of G.D.places.places) MV.setMarker(p.id, 'done', true);
      await MV.ready; if (!ok()) return;
      const cam = [3980, 600], onR = () => MV.setCam(MV.cam.x, MV.cam.y, MV.cam.z); G.resizers.add(onR);
      MV.setCam(cam[0], cam[1], 1);
      G.audio.music('music_night');
      G.$('#fade').classList.remove('on');
      // 언덕 전체에 색
      { const z = G.D.mood.zones.find(q => q.id === 's4all'), ovl = G.el('img', 'bg', MV.imgs); ovl.src = MV.colorImg.src; ovl.width = MV.W; ovl.height = MV.H; ovl.alt = '';
        const m = `radial-gradient(ellipse ${z.r[0]}px ${z.r[1]}px at ${z.center[0]}px ${z.center[1]}px, #000 0%, #000 42%, rgba(0,0,0,.55) 72%, transparent 100%)`;
        Object.assign(ovl.style, { maskImage: m, webkitMaskImage: m, opacity: 0, transition: `opacity ${rm ? 0.3 : 2.6}s ease-out` }); ovl.getBoundingClientRect(); ovl.style.opacity = 1; G.audio.sfx('sfx_sparkle', 0.7); }
      MV.setLamps(5, true);
      // 그림 표시 (목공방 = 판자, 꽃집 = 단추, 전망대 = 지도). 선생님 그림 place_<장소>가 있으면 그것
      const icons = MAPICO4.map(([id, k]) => { const p = G.D.places.places.find(q => q.id === id), src = G.art('place_' + id) || G.art(k); if (!p || !src) return null; const e = G.el('div', 's3-mapico', MV.fx, `<img src="${src}" alt="">`);
        Object.assign(e.style, { left: (p.marker[0] + 110) + 'px', top: (p.marker[1] - 30) + 'px' }); e.animate && e.animate([{ scale: .2, opacity: 0 }, { scale: 1.2, opacity: 1 }, { scale: 1 }], { duration: 700, easing: 'ease-out' }); return e; }).filter(Boolean);
      await G.wait(rm ? 0.5 : 3.0); if (!ok()) return;   // 10/7 교훈 세 번째는 말 대신 마을 변화로 (TD06_nar_01 뺌)
      icons.forEach(e => e.remove());
      await sky(); if (!ok()) return;
      G.st.stars = Math.max(G.st.stars || 0, 4); G.st.mood = 5;
      mark('s4_end'); (G.st.s2bloom = G.st.s2bloom || []).push('s4all'); G.save.write();
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
    const POS = [[.5, .42], [.3, .3], [.7, .3], [.2, .55], [.8, .55], [.38, .66], [.62, .66], [.5, .2], [.5, .8]], nx = G.STARS.findIndex(s => s.id === D4().next);
    G.STARS.forEach((s, i) => { const e = G.el('div', 'c11-slot' + (i < 4 ? ' me lit' : ''), m, G.starSvg(s, i >= 4)); Object.assign(e.style, { left: POS[i % POS.length][0] * 100 + '%', top: POS[i % POS.length][1] * 100 + '%' }); });
    G.el('div', 'star-count sky-count', m, G.icon('icon_star') + ' 되찾은 별 4/8');
    G.pedestalRow(m, 4, D4().next || (G.STARS[4] && G.STARS[4].id));   // 10/6: 받침대 빈 자리가 깜박임
    G.audio.sfx('sfx_chime', 0.5);
    await G.dialog.play(['TD06_nar_03']);
    if (g === G.gen) { await G.wait(0.4); if (m.animate) await m.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 500 }).finished.catch(() => { }); }
    m.remove();
  }
  async function starCard() {
    const s = G.STARS.find(q => q.id === 'door'), m = G.el('div', 'modal starget', G.$('#overlay')), sh = G.el('div', 'sheet', m);
    const pic = G.el('div', 'star-pic', sh, G.starSvg(s));
    G.el('div', 'get-title', sh, s.name);
    G.el('div', 'get-desc', sh, s.job);
    G.el('div', 'star-count', sh, G.icon('icon_star') + ' 되찾은 별 4/8');
    G.audio.sfx('sfx_star', 0.9);
    pic.animate && pic.animate([{ transform: 'scale(.2) rotate(-40deg)', opacity: 0 }, { transform: 'scale(1.2)', opacity: 1, offset: .7 }, { transform: 'scale(1)' }], { duration: 900, easing: 'ease-out' });
    const row = G.el('div', 'btn-row', sh);
    const b = G.btn('pill gold dlg-next wait', '다음 ' + G.icon('icon_next'), row, null, '다음'); b.disabled = true;
    let r; const p = new Promise(x => r = x);
    (G.fast() ? Promise.resolve() : G.audio.voice('TD06_nar_02')).then(() => { b.disabled = false; b.classList.remove('wait'); b.classList.add('ready'); });
    G.onTap(b, () => { if (b.disabled) return; G.audio.sfx('sfx_tap', 0.5); G.audio.stopVoice(); r(); });
    await p; m.remove();
  }

  const DONE12 = {
    done: ['meet_lumi', 'plaza_intro', 'plaza_chief', 'plaza_board', 'plaza_post', 'library_intro', 'library_haesol', 'library_tactile', 'library_puzzle', 'plaza_post_ask', 'letter_1', 'letter_2', 'letter_3', 'market_jig', 'libdoor_seen', 'libdoor_open', 'note_got',
      'forest_intro', 'forest_wind', 'forest_star', 'forest_daon', 'plaza2_intro', 'plaza2_board', 'plaza2_road', 'plaza2_look', 'plaza2_star', 'road_tiles',
      's2_begin', 's2_fog', 's2school_intro', 's2s_talk', 's2n_chair', 's2n_window', 's2n_bell', 's2n_locker', 's2school_noise', 's2f_chair', 's2f_window', 's2f_bell', 's2f_locker', 's2school_fix', 's2school_ask', 's2school_card',
      's2door_open', 's2hall_intro', 's2hall_duri', 's2hall_seats', 's2hall_score', 's2rest_intro', 's2rest_miru', 's2rest_box', 's2rest_deco', 's2rest_star', 's2plaza_intro', 's2plaza_concert', 's2plaza_star', 's2_end'],
    cleared: ['plaza', 'market', 'library', 'forest', 'plaza2', 's2school', 's2hall', 's2rest', 's2plaza'], items: ['note', 'map', 'tactile', 'piece', 'light', 'rhythm', 'score', 'piece_sound'],
    seen: ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C10', 'C11', 'C12', 'CH:intro', 'CH:plaza', 'CH:market', 'CH:library', 'CH:forest', 'CH:plaza2', 'CH:ending',
      'CH:s2_1', 'CH:s2school', 'S2A_s2school', 'CH:s2hall', 'S2A_s2hall', 'CH:s2rest', 'S2A_s2rest', 'CH:s2plaza', 'S2A_s2plaza', 'CH:s2_6'],
    visited: ['plaza', 'market', 'library', 'forest', 'plaza2', 's2school', 's2hall', 's2rest', 's2plaza'],
  };
  // ================= 교사용 챕터 바로 가기 (문턱의 별-1 ~ -6) =================
  // 앞 별(길의 별·소리의 별·말의 별)을 모두 끝낸 상태에서 시작
  const DONE3 = {
    done: ['s3_begin', 's3_fog', 's3cafe_intro', 's3c_talk', 's3cafe_order', 's3cafe_menu', 's3cafe_window', 's3dock_intro', 's3dock_sign', 's3dock_phone', 's3dock_boat',
      's3harang_intro', 's3h_meet', 's3h_diary', 's3h_ask', 's3h_star', 's3plaza_intro', 's3plaza_relay', 's3plaza_star', 's3_end'],
    cleared: ['s3gate', 's3cafe', 's3dock', 's3harang', 's3plaza'], items: ['s3letter', 'codeA', 'codeB', 'piece_word'],
    seen: ['CH:s3_1', 'CH:s3cafe', 'S3A_s3cafe', 'CH:s3dock', 'S3A_s3dock', 'CH:s3harang', 'S3A_s3harang', 'CH:s3plaza', 'S3A_s3plaza', 'CH:s3_6'],
    visited: ['s3cafe', 's3dock', 's3harang'],
    dust: ['s3cafe:0', 's3cafe:h:teapot', 's3dock:0', 's3dock:h:boat', 's3harang:0', 's3harang:h:cardbox', 'map:s3dog', 'map:s3gran', 's3plaza:moa', 's3plaza:bau'],
  };
  const STEP = [
    null,
    { done: ['s4_begin', 's4_fog'], cleared: ['s4gate'], items: ['s4map'], seen: ['CH:s4_1'] },
    { done: ['s4shop_intro', 's4shop_door', 's4shop_ramp'], cleared: ['s4shop'], items: ['plank'], seen: ['CH:s4shop', 'S4A_s4shop'], dust: ['s4shop:0', 's4shop:h:bench'], place: 's4shop' },
    { done: ['s4flower_intro', 's4flower_box', 's4flower_door'], cleared: ['s4flower'], items: ['button'], seen: ['CH:s4flower', 'S4A_s4flower'], dust: ['s4flower:0', 's4flower:h:door'], place: 's4flower' },
    { done: ['s4view_intro', 's4view_path', 's4view_door', 's4view_scope'], cleared: ['s4view'], items: ['piece_door'], seen: ['CH:s4view', 'S4A_s4view'], dust: ['s4view:0', 's4view:h:scope', 'map:s4gran', 'map:seoyeon'], place: 's4view' },
    { done: ['s4plaza_intro', 's4plaza_card', 's4plaza_star'], seen: ['CH:s4plaza', 'S4A_s4plaza'], dust: ['s4plaza:maru', 's4plaza:yunseul'], place: 'plaza' },
  ];
  async function chapter(id) {
    if (!G.st) return;
    const n = +id.split('_')[1], keep = { slot: G.st.slot, name: G.st.name };
    G.flow.reset();
    const st = G.st = Object.assign(G.save.fresh(keep.slot), { name: keep.name });
    for (const D of [DONE12, DONE3]) { st.done.push(...D.done); st.cleared.push(...D.cleared); st.items.push(...D.items); st.seenCutscenes.push(...D.seen); st.visited.push(...D.visited); }
    st.started = true; st.mood = 5; st.quest = 5; st.stars = 3; st.env = { board: true, guide: true }; st.place = 'plaza';
    st.dust = ['plaza:0', 'market:0', 'library:0', 'map:v2', 'map:v3']; st.s2dust = ['s2school:0', 's2school:h:locker', 's2hall:0', 's2hall:h:drum', 's2rest:0', 's2rest:cushion', 's2plaza:c0', 's2plaza:c1'];
    st.s2bloom = ['s2school', 's2hall', 's2rest', 's3cafe', 's3dock', 's3harang', 's3all']; st.s3dust = DONE3.dust.slice(); st.s4dust = [];
    for (let i = 1; i < Math.min(n, 6); i++) {
      const s = STEP[i]; st.done.push(...(s.done || [])); st.cleared.push(...(s.cleared || [])); st.items.push(...(s.items || [])); st.seenCutscenes.push(...(s.seen || []));
      st.s4dust.push(...(s.dust || [])); if (s.place) { st.place = s.place; st.visited.push(s.place); } if (s.cleared) st.s2bloom.push(...s.cleared.filter(c => c !== 's4gate'));
    }
    if (n >= 6) { const s = STEP[5]; st.done.push(...s.done); st.seenCutscenes.push(...s.seen); st.s4dust.push(...s.dust); st.place = 'plaza'; G.save.write(); G.s2.sync(); return ending(); }
    G.save.write();
    return G.flow.resume();
  }
  (function patchFlow() {
    if (!G.flow || !G.flow.chapter) { setTimeout(patchFlow, 30); return; }
    const ch0 = G.flow.chapter;
    G.flow.chapter = (id) => /^s4_\d$/.test(id) ? chapter(id) : ch0(id);
  })();

  T.begin = begin; T.ending = ending; T.chapter = chapter; T.state = () => ({ dust: G.st && G.st.s4dust });
  T.pulley = pulley; T.planks = planks; T.crates = crates; T.shopDoor = shopDoor; T.tiles = tiles; T.scope = scope;   // 점검용
  return T;
})();

/* ---- s5_mind.js ---- */
// s5_mind.js — 마음의 별 (10/10, 기획안 v2.0 · 대본집 최종 마음의별_음성목록_v1.0.csv). 앞 별 코드는 고치지 않음
// 흐름: 문턱의 별 엔딩 → 마음의 별-1 놀이터(되감기 찾기, 모래시계 나누기, 차례판) → -2 연못 다리(누리 지도 표시, 창고 자물쇠, 매트 깔기) → -3 공원 무대(수현이 자리에서 다시 보기, 묻기·기다리기·해답 고르기, 잔치 순서판) → -4 광장 모임(다온 안내판, 별 카드, 전과 후, 별 올리기) → -5 엔딩
// 주제: 왜 그랬을까? 이유가 있어요. 이유는 사람 안이 아니라 환경(가려진 표지판, 큰 소리, 갑자기 바뀐 순서, 젖은 다리)에서 찾음
// 뼈대는 별틀/frame.json (python3 mk_star.py s5.json). 화면 모양은 말의 별 s3-, 문턱의 별 s4- CSS를 같이 씀
'use strict';
G.s5 = (() => {
  const T = {};
  const D5 = () => G.D.story.s5;
  const done = (m) => !!G.st && G.st.done.includes(m);
  const mark = (m) => { if (m && G.st && !done(m)) { G.st.done.push(m); G.save.write(); } };
  const has = (id) => !!G.st && G.st.items.includes(id);
  const cleared = (id) => !!G.st && G.st.cleared.includes(id);
  const say = (id) => G.hud.say(id);
  const play = (ids, o) => G.dialog.play(ids, o);
  const ask = (id, icon = 'icon_good') => G.dialog.choose([{ label: G.txt(id), icon, voice: id }], true);
  const sd = () => G.st.s5dust || (G.st.s5dust = []);
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const began = () => done('s5_begin');
  let cur = null;   // 지금 하는 마음의 별 퍼즐 (교사용 "이 퍼즐 바로 풀기")

  // ================= 작은 도구 (말의 별과 같음) =================
  const ART = (n) => G.art(n) || '';
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
  function presentItem(id) { return G.present.item(id); }

  // ================= 별가루 (마음의 별 10곳) =================
  async function gain(k, el, fx, x, y) {
    if (sd().includes(k)) return;
    sd().push(k); G.save.write(); G.audio.sfx('sfx_sparkle', 0.8); if (el) spark(el, 8);
    const n = sd().length, NEED = D5().dustNeed, TOT = D5().dustTotal, up = done('s5plaza_star'), shown = !up && n <= NEED ? `${n}/${NEED}` : `${n}/${TOT}`;
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
  const isS5 = (id) => /^s5/.test(id);
  // 안개: 마음의 별이 시작되고 안개가 걷히면 북동쪽도 걷힌 안개 그림
  const mv0 = G.mapView;
  G.mapView = (parent, o) => {
    const V = mv0(parent, o);
    if (V.s2 && V.s2.fog && done('s5_fog')) V.s2.fog.src = G.asset('assets/map/map2_fog_e.png');
    return V;
  };
  const state0 = G.map.state;
  G.map.state = (p) => {
    if (isS5(p.id) && !done('s5_fog')) return 'locked';
    if (p.id === 'plaza' && cleared('s5stage') && !cleared('s5plaza')) return 'open';
    return state0(p);
  };
  const scOf0 = G.map.sceneOf;
  G.map.sceneOf = (p) => (p.id === 'plaza' && cleared('s5stage') && !cleared('s5plaza')) ? 's5plaza' : scOf0(p);
  const node0 = G.map.node, N5 = { s5play: 'S5_PLAY', s5pond: 'S5_POND', s5stage: 'S5_STAGE', s5gate: 'FOREST' };
  G.map.node = (id) => (began() && N5[id]) || node0(id);
  const mm0 = G.p4.mapMarks;
  G.p4.mapMarks = (V) => {
    mm0(V);
    if (!V.s2) return;
    if (!done('s5_fog')) for (const p of G.D.places.places) if (isS5(p.id)) V.setMarker(p.id, 'hidden', false);
    // 엔딩 뒤: 지도에 그림 표시 (찻집 = 찻잔, 나루터 = 호수, 하랑이네 = 그림)
    // 10/6 선생님: 마음의 별 엔딩 뒤에는 마을 모든 장소에 그림 표시. 선생님 그림 place_<장소>가 오면 그것을 먼저 씀, 없으면 비슷한 그림, 그것도 없으면 그 장소는 비워 둠
    if (done('s5_end') && !V.s5ico) V.s5ico = MAPICO5.map(([id, k]) => {
      const p = G.D.places.places.find(q => q.id === id), src = G.art('place_' + id) || G.art(k); if (!p || !src) return null;
      const e = G.el('div', 's3-mapico', V.fx, `<img src="${src}" alt="">`); Object.assign(e.style, { left: (p.marker[0] + 110) + 'px', top: (p.marker[1] - 30) + 'px' }); return e;
    });
  };
  // 지도 주민의 별가루 (호숫가 주민 둘)
  const vh0 = G.p4.villagerHas, vd0 = G.p4.villagerDust;
  const s5giver = (vid) => began() && D5().dustGive.includes(vid);
  G.p4.villagerHas = (vid) => s5giver(vid) ? !!G.st && !sd().includes('map:' + vid) : vh0(vid);
  G.p4.villagerDust = async (vid, el, fx, x, y) => { if (s5giver(vid)) return gain('map:' + vid, el, fx, x, y); return vd0(vid, el, fx, x, y); };
  const dl0 = G.p4.dustLine;
  G.p4.dustLine = (sh) => { if (!began()) return dl0(sh); G.el('div', 'p4-bagdust', sh, (G.artImg('stardust') || '') + `<span>별가루 ${sd().length}/${D5().dustTotal}</span>`); };
  // 장면 속 물건의 별가루
  const ah0 = G.p4.afterHot;
  G.p4.afterHot = async (H, V, def, id) => {
    if (!def.s5) return ah0(H, V, def, id);
    const h = H.def; if (!(def.s5dustHot || []).includes(h.id)) return;
    const [x, y, w] = h.rect; await popDust(V, id + ':h:' + h.id, x + w / 2, y + 20, H.btn);
  };
  // 교사용 "이 퍼즐 바로 풀기"
  const can0 = G.p4.can, skip0 = G.p4.skip, reset0 = G.p4.reset;
  G.p4.can = () => !!cur || can0();
  G.p4.skip = () => { if (cur && cur.solve) cur.solve(); else skip0(); };
  G.p4.reset = () => { cur = null; reset0(); };
  // 할 일 카드: "마음의 별 찾기 n/4"
  const hm0 = G.hud.map, rq0 = G.hud.refreshQuest;
  function questFix() {
    if (!began()) return; const q = G.hud.questEl; if (!q || !q.isConnected) return;
    const e = q.querySelector('.q1'); if (e) e.textContent = '마음의 별 찾기 ' + D5().quest.filter(cleared).length + '/' + D5().quest.length;
  }
  G.hud.map = () => { hm0(); questFix(); };
  G.hud.refreshQuest = () => { rq0(); questFix(); };
  // 장 제목은 "마음의 별-N"
  const cut0 = G.cut.play;
  G.cut.play = async (id, opts = {}) => {
    const s5ch = /^CH:s5/.test(id), cs = G.D.story.chapterStar;
    if (s5ch) G.D.story.chapterStar = D5().chapterStar;
    try { return await cut0(id, opts); } finally { if (s5ch) G.D.story.chapterStar = cs; }
  };
  const show0 = G.map.show;
  G.map.show = async (o = {}) => { const r = await show0(o); maybeBegin(); return r; };

  // ================= 도착 연출 (장소 이름) =================
  async function arriveS5(c, root, opts, place) {
    const U = G.cut.util, S = G.D.scenes[place];
    const { V, off } = await U.arrive(c, root, opts, place);
    if (S.zone === 'plaza' || cleared(place)) { V.colorImg.style.visibility = ''; V.colorImg.style.opacity = S.zone === 'plaza' ? V.colorImg.style.opacity : 1; }
    if (c.rm) V.setCam(V.home()[0], V.home()[1], 1); else V.setCam(V.home()[0] - 150, V.home()[1] + 20, 1.25);
    c.t0 = G.t;
    await Promise.all([
      U.fadeIn(c, root, 0.5),
      (async () => { if (!c.rm) await c.tween(0, 1, 3.6, k => V.setCam(V.home()[0] - 150 + 150 * k, V.home()[1] + 20 - 20 * k, 1.25 - 0.25 * k), 'io'); })(),
      U.title(c, root, S.name, 'S92_place_' + (S.zone || place), 0.8, 4.4),
    ]);
    V.setCam(V.home()[0], V.home()[1], 1); off();
  }
  G.cut.add({
    S5A_s5play: (c, r, o) => arriveS5(c, r, o, 's5play'),
    S5A_s5pond: (c, r, o) => arriveS5(c, r, o, 's5pond'),
    S5A_s5stage: (c, r, o) => arriveS5(c, r, o, 's5stage'),
    S5A_s5plaza: (c, r, o) => arriveS5(c, r, o, 's5plaza'),
  });


  let beginning = false, pollOff = null;
  const needBegin = () => !!G.st && (G.st.stars || 0) >= 4 && done('s4_end') && !cleared('s5gate');
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
  // ================= 마음의 별만의 화면 모양 (판·조각·쟁반은 문턱의 별 s4- 모양을 같이 씀) =================
  const CSS5 = `
.s5-over { position: absolute; object-fit: contain; pointer-events: none; opacity: 0; transition: opacity .6s; }
.s5z-rw.past .s5-over { opacity: 1; }
.s5z-rw .s4-bg { transition: filter .8s; }
.s5z-rw.past .s4-bg { filter: sepia(.55) saturate(.8) brightness(1.05); }
.s5-tag { position: absolute; font-family: var(--f-title); font-size: 46px; color: #FFF4E0; background: rgba(59, 42, 38, .78); border-radius: 22px; padding: 6px 24px; opacity: 0; transition: opacity .6s; pointer-events: none; }
.s5z-rw.past .s5-tag { opacity: 1; }
.s5-bar { position: absolute; height: 26px; border-radius: 13px; background: rgba(255, 248, 232, .85); border: 5px solid #8B5E3C; box-sizing: border-box; }
.s5-bar i { position: absolute; right: 0; top: 0; bottom: 0; border-radius: 13px; background: #FFD66B; }
.s5-knob { position: absolute; width: 110px; height: 110px; border-radius: 50%; border: 6px solid #8B5E3C; background: #FFF8E8; box-shadow: 0 7px 0 #c9a45c; cursor: grab; touch-action: none; display: flex; align-items: center; justify-content: center; padding: 0; z-index: 6; }
.s5-knob svg { width: 64px; height: 64px; pointer-events: none; }
.s5-knob.dragging { cursor: grabbing; }
.s5-ring { position: absolute; border-radius: 50%; border: 9px solid #FFD66B; box-shadow: 0 0 18px #FFD66B, inset 0 0 14px rgba(255, 214, 107, .6); pointer-events: none; transform: translate(-50%, -50%); }
.s5-ring.hint { border-style: dashed; opacity: .7; box-shadow: none; }
.s5-hg { position: absolute; border: 0; padding: 0; background: none; cursor: grab; touch-action: none; transition: transform .3s; z-index: 4; }
.s5-hg img { width: 100%; height: 100%; object-fit: contain; display: block; pointer-events: none; }
.s5-hg.sel { filter: drop-shadow(0 0 14px #FFD66B); }
.s5-hg.drop-on { filter: drop-shadow(0 0 18px #FFD66B); transform: scale(1.06); }
.s5-sand { position: absolute; display: flex; flex-wrap: wrap-reverse; justify-content: center; gap: 8px; width: 230px; pointer-events: none; }
.s5-sand i { width: 40px; height: 40px; border-radius: 50%; background: radial-gradient(circle at 35% 30%, #FFF1B8, #E6B54A 70%); border: 3px solid #8a6a0a; display: block; }
.s5-sand.even i { border-color: #4F7A4E; box-shadow: 0 0 10px #FFF1B8; }
.s5-panel { position: absolute; border-radius: 28px; background: rgba(255, 248, 232, .9); border: 6px solid #e0b96a; box-sizing: border-box; display: flex; align-items: center; justify-content: center; gap: 18px; font-family: var(--f-title); font-size: 52px; color: var(--brown); }
.s5-panel img { width: 120px; height: 120px; object-fit: contain; }
.s5-dial { position: absolute; display: flex; flex-direction: column; align-items: center; gap: 10px; z-index: 5; }
.s5-dial .d { width: 150px; height: 150px; border-radius: 22px; background: #3B2A26; color: #FFD66B; font-family: var(--f-title); font-size: 110px; line-height: 150px; text-align: center; box-shadow: inset 0 0 0 8px #8a6a0a; }
.s5-dial .d.ok { color: #9fe08f; }
.s5-dial button { width: 130px; height: 84px; border-radius: 22px; border: 0; background: #FFD66B; box-shadow: 0 6px 0 #c98f14; cursor: pointer; display: flex; align-items: center; justify-content: center; }
.s5-dial button svg { width: 60px; height: 40px; pointer-events: none; }
.s5-bagm .sheet { display: flex; flex-direction: column; align-items: center; gap: calc(var(--u) * 14); }
.s5-bagrow { display: flex; align-items: center; gap: calc(var(--u) * 90); }
.s5-bagpic { width: calc(var(--u) * 210); height: calc(var(--u) * 210); cursor: grab; touch-action: none; }
.s5-bagpic .ico, .s5-bagt .ico { width: 100%; height: 100%; object-fit: contain; pointer-events: none; }
.s5-bagt { width: calc(var(--u) * 170); height: calc(var(--u) * 170); border-radius: calc(var(--u) * 30); border: calc(var(--u) * 6) dashed #e0b96a; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: calc(var(--u) * 14); box-sizing: border-box; font-family: var(--f-title); font-size: calc(var(--u) * 30); color: var(--brown); }
.s5-bagt.drop-on { border-style: solid; background: rgba(255, 214, 107, .3); }
.s5-bagtip { font-family: var(--f-title); font-size: calc(var(--u) * 34); color: var(--brown); }
.s5-card { position: absolute; left: 50%; top: 42%; transform: translate(-50%, -50%); width: calc(var(--u) * 340); height: calc(var(--u) * 340); border-radius: calc(var(--u) * 36); background: #FFF8E8; border: calc(var(--u) * 8) solid #e0b96a; box-shadow: 0 calc(var(--u) * 12) calc(var(--u) * 30) rgba(0, 0, 0, .4); padding: calc(var(--u) * 16); box-sizing: border-box; }
.s5-card img { width: 100%; height: 100%; object-fit: contain; }
.s5-wait { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: calc(var(--u) * 18); }
.s5-wait .pic { width: calc(var(--u) * 240); height: calc(var(--u) * 240); position: relative; }
.s5-wait .pic img { position: absolute; inset: calc(var(--u) * 40); width: calc(100% - var(--u) * 80); height: calc(100% - var(--u) * 80); object-fit: contain; }
.s5-wait svg { position: absolute; inset: 0; width: 100%; height: 100%; transform: rotate(-90deg); }
.s5-wait .tip { font-family: var(--f-title); font-size: calc(var(--u) * 40); color: #FFF4E0; }
`;
  { const st = document.createElement('style'); st.id = 's5-style'; st.textContent = CSS5; document.head.appendChild(st); }
  const MAPICO5 = [['s5play', 'guide_turnboard'], ['s5pond', 'item_flag5'], ['s5stage', 'item_starbox']];   // 엔딩 뒤 지도 그림 표시 (선생님 그림 place_<장소>가 먼저)
  const lv = () => G.level();
  function bgOf(S, name, color, fill) { const b = G.el('div', 's4-bg', S.B); if (ART(name)) b.style.backgroundImage = `url("${ART(name)}")`; else b.style.background = color; if (fill) b.style.backgroundSize = '100% 100%'; return b; }
  const ARROW_L = '<svg viewBox="0 0 60 60"><path d="M6 30 L34 6 V20 H54 V40 H34 V54 Z" fill="#8a5a0a"/></svg>';
  const su = { partner: 'suhyeon' }, so = { partner: 'soyul' }, gu = { partner: 'gureum' }, no = { partner: 'nuri' };
  // 별 조각 빛 (광장에서 별 카드를 마친 뒤)
  const li0 = G.litIcon; G.litIcon = (id) => (id === 'piece_heart' && done('s5plaza_card')) ? 'item_piece_heart_lit' : li0(id);

  // ================= 마음의 별-1: 공원이 보임 (문턱의 별 엔딩 뒤 저절로) =================
  async function begin() {
    if (beginning) return; beginning = true;
    const g = G.gen, ok = () => g === G.gen;
    try {
      G.help.off(); G.busy++;
      G.audio.music('music_night');
      const ch = G.cut.play('CH:s5_1', { key: 's5_1', cover: true });
      if (!G.st.place || !/^(plaza|s2|s3|s4)/.test(G.st.place)) G.st.place = 'plaza';
      mark('s5_begin');
      await G.wait(0.2); if (!ok()) return;
      await G.map.show({}); if (!ok()) return;
      G.hud.hide(true);
      await ch; if (!ok()) return;
      G.hud.hide(true);
      let V = G.map.V; if (!V) return;
      G.map.camFree = true;
      const rm = G.reduced(), sky = D5().sky;
      if (!done('s5_fog')) {
        await camTo(V, D5().north[0], D5().north[1], 2.4); if (!ok()) return;
        const s = G.STARS.find(q => q.id === 'heart'), star = G.groundLeak(V.fx, sky[0], sky[1] + 360, s.color);   // 공원에서 주황빛이 새어 나옴
        G.audio.sfx('sfx_chime', 0.15, 1.2);
        await G.wait(rm ? 0.4 : 1.4); if (!ok()) return;
        await play(['HM01_nar_01'], { noPortraits: true }); if (!ok()) return;
        await play(['HM01_rumi_01'], { noPortraits: true }); if (!ok()) return;
        await play(['HM01_chief_01', 'HM01_hero_01', 'HM01_chief_02'], { partner: 'chief' }); if (!ok()) return;
        await play(['HM01_nuri_01'], no); if (!ok()) return;
        const fogE = G.el('img', 'bg s2-fog', null); fogE.src = G.asset('assets/map/map2_fog_e.png'); fogE.alt = ''; Object.assign(fogE.style, { width: V.W + 'px', height: V.H + 'px' });
        if (V.s2 && V.s2.fog) { V.imgs.insertBefore(fogE, V.s2.fog); G.audio.sfx('sfx_sparkle', 0.7); V.s2.fog.style.opacity = 0; await G.wait(rm ? 0.4 : 2.4); V.s2.fog.remove(); V.s2.fog = fogE; }
        if (!ok()) return;
        mark('s5_fog'); V.setLamps(G.st.mood); star.remove();
      }
      if (!cleared('s5gate')) G.st.cleared.push('s5gate'); G.save.write();
      G.$('#fade').classList.add('on'); await G.wait(0.45); if (!ok()) return;
      G.map.camFree = false;
      await G.map.show({}); if (!ok()) return;
      G.hud.hide(true);
      V = G.map.V; G.map.camFree = true; V.setCam(1150, 650, V.cam.z);
      G.$('#fade').classList.remove('on');
      const k = V.markers.s5play; if (k && k.m.animate) k.m.animate([{ transform: 'scale(.3)' }, { transform: 'scale(1.5)' }, { transform: 'scale(1)' }], { duration: 900, easing: 'ease-out' });
      G.audio.sfx('sfx_sparkle', 0.6);
      await G.wait(0.6); if (!ok()) return;
      await play(['S92_now_s5play']); if (!ok()) return;
      G.map.camFree = false;
    } finally {
      beginning = false;
      if (g === G.gen) { G.busy = Math.max(0, G.busy - 1); G.hud.hide(false); G.hud.map(); if (G.screen === 'map') G.map.setHelp(); }
    }
  }
  // 지도 주민이 별가루를 줄 때 한 줄 (이든, 모아 아주머니)
  const vd5 = G.p4.villagerDust;
  G.p4.villagerDust = async (vid, el, fx, x, y) => { const ln = began() && (D5().dustLine || {})[vid]; if (ln && !sd().includes('map:' + vid)) await play([].concat(ln), { partner: vid }); return vd5(vid, el, fx, x, y); };

  // ================= 장면마다 (scene.js가 들어갈 때 부름) =================
  for (const id of ['s5play', 's5pond', 's5stage', 's5plaza']) G.sceneFx[id] = (V, def) => fx(V, def, id);
  function fx(V, def, id) {
    if (cleared(id) && id !== 's5plaza') { V.colorImg.style.visibility = ''; V.colorImg.style.opacity = 1; for (const l of V.lamps) l.el.classList.add('on'); }
    (def.s5dust || []).forEach(([x, y], i) => dustBtn(V, id + ':' + i, x, y));
    if (id === 's5pond' && done('s5pond_star') && V.spr.paperstar) V.spr.paperstar.img.style.display = 'none';
    if (id === 's5plaza' && done('s5plaza_card')) for (const [k, at] of Object.entries(def.feastDust || {})) dustBtn(V, 's5plaza:' + k, at[0], at[1]);
  }
  const fade = async (sp, to) => { const e = sp && sp.img; if (!e) return; const a = +getComputedStyle(e).opacity; if (to > 0) e.style.display = ''; await G.tween(a, to, G.reduced() ? 0.2 : 0.7, v => e.style.opacity = v); if (to === 0) e.style.display = 'none'; e.style.opacity = ''; };

  // ---- 가방에 넣기: 물건을 끌어 가방 칸에 넣음 (쉽게는 눌러도 됨). 이미 있으면 건너뜀 ----
  function toBag(id, line) {
    return new Promise((res) => {
      const it = G.D.items.find(x => x.id === id), g = G.gen;
      if (!it || has(id)) return res(true);
      G.dialog.close();
      const m = G.el('div', 'modal get s5-bagm', G.$('#overlay')), sh = G.el('div', 'sheet', m);
      G.el('div', 'get-title', sh, G.txt(line));
      const row = G.el('div', 's5-bagrow', sh);
      const pic = G.el('div', 's5-bagpic', row, G.icon(it.icon)); pic.setAttribute('aria-label', it.name);
      const bag = G.el('div', 's5-bagt', row, G.icon('icon_bag') + '<span>가방</span>');
      G.el('div', 's5-bagtip', sh, '끌어서 가방에 넣어요');
      G.audio.sfx('sfx_sparkle', 0.6); G.audio.voice(line);
      let fin = false;
      const put = async () => {
        if (fin) return; fin = true; G.help.off(); cur = null;
        if (!G.st.items.includes(id)) G.st.items.push(id); G.save.write();
        G.audio.sfx('sfx_chime', 0.6); spark(bag, 10); pic.style.visibility = 'hidden';
        if (bag.animate) bag.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.2)' }, { transform: 'scale(1)' }], { duration: 400 });
        await G.wait(G.reduced() ? 0.3 : 0.9); m.remove(); res(g === G.gen);
      };
      G.p4.dragTo(pic, () => [bag], put, { can: () => !fin });
      G.onTap(pic, () => { if (!G.lv('normal')) put(); });
      cur = { solve: put };
      G.help.set({ l1: () => G.audio.voice(line), l2: () => wob(pic), l3: () => { wob(pic); bag.classList.add('drop-on'); setTimeout(() => bag.classList.remove('drop-on'), 2000); }, clear: () => { } });
    });
  }
  // ---- 기다리기: 손을 떼고 잠깐 기다림 (모래시계처럼 둥근 띠가 참) ----
  function waitOn(art) {
    return new Promise((res) => {
      const g = G.gen, sec = G.reduced() || G.fast() ? 1.5 : G.lv('hard') ? 5 : G.lv('normal') ? 4 : 3;
      const m = G.el('div', 'modal s5-wait', G.$('#overlay'));
      m.innerHTML = `<div class="pic"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,255,255,.3)" stroke-width="8"/><circle class="arc" cx="50" cy="50" r="44" fill="none" stroke="#FFD66B" stroke-width="8" stroke-linecap="round" stroke-dasharray="276.5" stroke-dashoffset="276.5"/></svg><img src="${ART(art)}" alt=""></div><div class="tip">기다려요</div>`;
      const arc = m.querySelector('.arc');
      G.tween(0, 1, sec, k => arc.setAttribute('stroke-dashoffset', (276.5 * (1 - k)).toFixed(1)), 'lin').then(async () => { G.audio.sfx('sfx_chime', 0.4); await G.wait(0.3); m.remove(); res(g === G.gen); });
    });
  }
  // ---- 그림 카드로 말하기: 큰 카드를 보이며 카드 소리 (대사 창 아래 층) ----
  async function showCard(art, line) {
    const m = G.el('div', 'modal', G.$('#closeup')), c = G.el('div', 's5-card', m, `<img src="${ART(art)}" alt="">`);
    G.audio.sfx('sfx_page', 0.4);
    if (c.animate && !G.reduced()) c.animate([{ transform: 'translate(-50%,-50%) scale(.3)', opacity: 0 }, { transform: 'translate(-50%,-50%) scale(1)', opacity: 1 }], { duration: 450, easing: 'ease-out' });
    await play([line]); m.remove();
  }

  // ================= 마음의 별-1: 놀이터 =================
  G.flows.s5_play = async (ctx) => {
    const { V, H, g, complete } = ctx, ok = () => g === G.gen, id = H.def.id;
    if (id === 'swing') {
      if (done('s5play_rewind')) { await play(['HM01_rumi_05']); return; }
      if (!done('s5p_invite')) {
        await play(['HM01_nar_02', 'HM01_nar_03'], { noPortraits: true }); if (!ok()) return;
        await play(['HM01_soyul_02'], so); if (!ok()) return;
        if (!await toBag('invite', 'HM01_sys_02')) return;   // 첫 조작까지 대사가 길어 사이에 조작 하나
        mark('s5p_invite');
      }
      await play(['HM01_soyul_10', 'HM01_soyul_01'], so); if (!ok()) return;
      await play(['HM01_gureum_01'], gu); if (!ok()) return;
      await play(['HM01_suhyeon_01'], su); if (!ok()) return;
      await play(['HM01_soyul_11'], so); if (!ok()) return;
      G.audio.sfx('sfx_chime', 0.2, 0.7);   // 큰 종: 그림으로 크게, 소리는 작게
      await play(['HM01_gureum_10'], gu); if (!ok()) return;
      await play(['HM01_rumi_02', 'HM01_rumi_03']); if (!ok()) return;
      const w = await rewind({ bg: 'hm_play_bg', spots: D5().rewindPlay, over: [['hm_linekids', 690, 255, 186, 129]], hint: 'HM01_rumi_03' }); if (!ok() || !w) return;
      await play(['HM01_rumi_05']); if (!ok()) return;
      await play(['HM01_soyul_03'], so); if (!ok()) return;
      complete('s5play_rewind'); say('HM01_rumi_06'); return;
    }
    if (id === 'suhyeon') {
      if (done('s5play_sand')) { await play(['HM01_suhyeon_03'], su); return; }
      await play(['HM01_rumi_06']); if (!ok()) return;
      if (!await G.p4.askHelp(V, 'suhyeon', 'HM01_hero_05')) return;   // 돕기 전에 먼저 묻기. 거절도 괜찮아요
      await play(['HM01_suhyeon_02'], su); if (!ok()) return;
      await play(['HM01_rumi_07']); if (!ok()) return;
      if (!await waitOn('item_paperstar')) return;
      await play(['HM01_suhyeon_03'], su); if (!ok()) return;
      await play(['HM01_gureum_02'], gu); if (!ok()) return;
      await play(['HM01_soyul_04'], so); if (!ok()) return;
      await play(['HM01_gureum_03'], gu); if (!ok()) return;
      await play(['HM01_rumi_08']); if (!ok()) return;
      const w = await sandPz(); if (!ok() || !w) return;
      await play(['HM01_gureum_04'], gu); if (!ok()) return;
      await play(['HM01_rumi_09']); if (!ok()) return;
      complete('s5play_sand'); say('HM01_rumi_09'); return;
    }
    if (id === 'sign') {
      if (done('s5play_board')) { await play(['HM01_suhyeon_06'], su); return; }
      await play(['HM01_suhyeon_04', 'HM01_suhyeon_05'], su); if (!ok()) return;   // 수현이가 퍼즐 열쇠를 쥠
      const w = await turnBoard(); if (!ok() || !w) return;
      await play(['HM01_suhyeon_06'], su); if (!ok()) return;
      await play(['HM01_gureum_05'], gu); if (!ok()) return;
      if (!has('hourglass')) { await presentItem('hourglass'); if (!ok()) return; }
      await play(['HM01_nuri_02', 'HM01_nuri_03'], no); if (!ok()) return;
      await colorIn(V); if (!ok()) return;
      complete('s5play_board'); return;
    }
    if (id === 'soyul') { await play([done('s5play_rewind') ? 'HM01_soyul_03' : 'HM01_soyul_10'], so); return; }
    if (id === 'gureum') { await play([done('s5play_sand') ? 'HM01_gureum_04' : done('s5play_rewind') ? 'HM01_gureum_02' : 'HM01_gureum_01'], gu); return; }
    if (id === 'nuri') { await play([done('s5play_board') ? 'HM01_nuri_03' : 'HM01_nuri_01'], no); }
  };

  // ---- 퍼즐: 되감기 찾기. 막대를 왼쪽으로 끌어 아까 일을 되감은 뒤, 이상한 곳을 누름 (틀려도 실패음 없이 "여기는 괜찮아 보여") ----
  // o: { bg, spots: [[x, y, r, 대사]], over: [[그림, x, y, w, h]] (되감았을 때만 보이는 것), hint }
  function rewind(o) {
    return new Promise((res) => {
      const g = G.gen, ok = () => g === G.gen, W = 1600, H = 679, easy = !G.lv('normal');
      const S = screen('s5z-rw', W, H); bgOf(S, o.bg, 'linear-gradient(#3B4A6B,#2a3350)', true);
      (o.over || []).forEach(([a, x, y, w, h]) => { const e = S.at(G.el('img', 's5-over', S.B), x, y, w, h); e.src = ART(a); e.alt = ''; });
      S.at(G.el('div', 's5-tag', S.B, '아까'), 40, 30);
      const X0 = 260, X1 = 1340, bar = S.at(G.el('div', 's5-bar', S.B), X0, 600, X1 - X0, 26), fill = G.el('i', '', bar);
      const knob = G.btn('s5-knob', ARROW_L, S.B, () => { if (easy && !past) go(1); }, '되감기 막대');
      let p = 0, past = false, fin = false, busy = false, drag = null, arrow = null, lastNo = -9;
      const found = o.spots.map(() => false), rings = [];
      const setP = (v) => { p = Math.max(0, Math.min(1, v)); S.at(knob, X1 - p * (X1 - X0) - 55, 558); fill.style.width = (p * 100) + '%'; };
      setP(0);
      function go(v) { setP(v); if (p >= 0.96 && !past) { past = true; S.root.classList.add('s5-past'); S.root.classList.add('past'); G.audio.sfx('sfx_page', 0.5, 0.8); knob.style.display = 'none'; bar.style.opacity = '.4'; clear();
        if (easy) o.spots.forEach(([x, y, r], i) => { rings[i] = S.at(G.el('div', 's5-ring hint', S.B), x, y, r * 2, r * 2); }); } }
      const bxy = (e) => { const r = S.B.getBoundingClientRect(); return [(e.clientX - r.left) / r.width * W, (e.clientY - r.top) / r.height * H]; };
      knob.style.touchAction = 'none';
      knob.addEventListener('pointerdown', (e) => { if (fin || past || G.dialog.active) return; drag = e.pointerId; try { knob.setPointerCapture(e.pointerId); } catch (_) { } knob.classList.add('dragging'); G.help.poke(); clear(); });
      knob.addEventListener('pointermove', (e) => { if (drag !== e.pointerId || past) return; const [x] = bxy(e); go((X1 - x) / (X1 - X0)); });
      const up = (e) => { if (drag !== e.pointerId) return; drag = null; knob.classList.remove('dragging'); if (!past) G.tween(p, 0, 0.4, setP, 'out'); };
      knob.addEventListener('pointerup', up); knob.addEventListener('pointercancel', up);
      S.B.addEventListener('pointerdown', async (e) => {
        if (!past || fin || busy || G.dialog.active || e.target === knob) return;
        const [x, y] = bxy(e); G.help.poke(); clear();
        const i = o.spots.findIndex(([sx, sy, r], k) => !found[k] && Math.hypot(x - sx, y - sy) <= r);
        if (i < 0) { if (o.spots.some(([sx, sy, r], k) => found[k] && Math.hypot(x - sx, y - sy) <= r)) return; if (G.t - lastNo > 2) { lastNo = G.t; S.say('HM01_rumi_04'); } return; }
        busy = true; found[i] = true; const [sx, sy, r, line] = o.spots[i];
        if (rings[i]) rings[i].remove(); rings[i] = S.at(G.el('div', 's5-ring', S.B), sx, sy, r * 2, r * 2);
        G.audio.sfx('sfx_chime', 0.5); spark(rings[i], 8);
        await play([line]); busy = false; if (!ok()) return;
        if (found.every(Boolean)) win();
      });
      async function win() { if (fin) return; fin = true; cur = null; G.help.off(); S.hush(); G.audio.sfx('sfx_sparkle', 0.8); await G.wait(1.0); S.end(); res(ok()); }
      function clear() { if (arrow) arrow.remove(); arrow = null; }
      cur = { solve: async () => { go(1); for (let i = 0; i < found.length; i++) if (!found[i]) { found[i] = true; const [sx, sy, r] = o.spots[i]; S.at(G.el('div', 's5-ring', S.B), sx, sy, r * 2, r * 2); } win(); } };
      S.say(o.hint);
      G.help.set({
        l1: () => S.say(o.hint),
        l2: () => { if (!past && !arrow) arrow = arrowAt(S, knob); },
        l3: () => { if (!past) { wob(knob); return; } const i = found.indexOf(false); if (i < 0) return; const [x, y, r] = o.spots[i]; const e = S.at(G.el('div', 's5-ring hint', S.B), x, y, r * 2, r * 2); setTimeout(() => e.remove(), 3000); },
        clear,
      });
    });
  }

  // ---- 퍼즐: 모래시계 나누기. 모래시계를 끌어 다른 모래시계에 대면 모래가 한 칸 옮겨 감. 모두 같은 칸이 되면 끝 (쉽게는 차례로 눌러도 됨) ----
  function sandPz() {
    return new Promise((res) => {
      const g = G.gen, ok = () => g === G.gen, A = (D5().sand[lv()] || D5().sand.normal).slice(), n = A.length, goal = A.reduce((a, b) => a + b, 0) / n;
      const S = screen('s5z-sand', 1600, 900); bgOf(S, 'hm_play_bg', 'linear-gradient(#3B4A6B,#2a3350)');
      S.at(G.el('div', 's4-tray', S.B), 120, 90, 1360, 760);
      S.at(G.el('div', 's5-panel', S.B, `<img src="${ART('card_hourglass')}" alt=""><span>모두 같은 시간</span>`), 470, 110, 660, 150);
      const X = n === 2 ? [480, 920] : [300, 700, 1100];   // 모래시계는 모두 같은 크기 (모래 칸 수만 다름)
      let fin = false, busy = false, sel = null;
      const hgs = A.map((_, i) => {
        const w = 175, h = 265, b = G.btn('s5-hg', `<img src="${ART('hm_hg2')}" alt="">`, S.B, () => tap(i), '모래시계');
        S.at(b, X[i] + 100 - w / 2, 590 - h, w, h);
        G.p4.dragTo(b, () => hgs.filter((_, j) => j !== i).map(q => q.b), (t) => pour(i, hgs.findIndex(q => q.b === t)), { can: () => !fin && !busy });
        const s = S.at(G.el('div', 's5-sand', S.B), X[i] - 15, 610); return { b, s };
      });
      const draw = () => hgs.forEach((q, i) => { q.s.innerHTML = '<i></i>'.repeat(A[i]); q.s.classList.toggle('even', A[i] === goal); });
      draw();
      function tap(i) {
        if (fin || busy || G.dialog.active) return; if (G.lv('normal')) { wob(hgs[i].b); return; }
        if (sel === null) { sel = i; hgs[i].b.classList.add('sel'); G.audio.sfx('sfx_tap', 0.4); return; }
        const a = sel; hgs[a].b.classList.remove('sel'); sel = null; if (a !== i) pour(a, i);
      }
      async function pour(i, j) {
        if (fin || busy || j < 0 || i === j) return; G.help.poke();
        if (A[i] === 0) { wob(hgs[i].b); return; }
        busy = true; A[i]--; A[j]++; G.audio.sfx('sfx_tap', 0.5, 1.3);
        const b = hgs[i].b; if (b.animate && !G.reduced()) await b.animate([{ transform: 'rotate(0)' }, { transform: `rotate(${j > i ? 25 : -25}deg)` }, { transform: 'rotate(0)' }], { duration: 450 }).finished.catch(() => { });
        draw(); busy = false; if (!ok()) return;
        if (A.every(v => v === goal)) win();
      }
      async function win() { fin = true; cur = null; G.help.off(); S.hush(); G.audio.sfx('sfx_sparkle', 0.8); hgs.forEach(q => spark(q.b, 6)); await G.wait(1.2); S.end(); res(ok()); }
      const best = () => { let a = 0, b = 0; A.forEach((v, i) => { if (v > A[a]) a = i; if (v < A[b]) b = i; }); return [a, b]; };
      cur = { solve: () => { A.fill(goal); draw(); win(); } };
      S.say('HM01_rumi_08');
      G.help.set({ l1: () => S.say('HM01_rumi_08'), l2: () => { const [a] = best(); wob(hgs[a].b); }, l3: () => { const [a, b] = best(); hgs[b].b.classList.add('s3-hint'); wob(hgs[a].b); setTimeout(() => hgs[b].b.classList.remove('s3-hint'), 3000); }, clear: () => { } });
    });
  }

  // ---- 문턱의 별 placePz와 같은 틀 (조각을 알맞은 자리로 끌어다 놓기, 쉽게는 눌러도 됨). wrong(item, slot, S)에 퍼즐 화면도 넘김 ----
  function placePz(o) {
    return new Promise((res) => {
      const g = G.gen, ok = () => g === G.gen;
      const S = screen('s4z-place ' + o.cls, o.W || 1600, o.H || 900); bgOf(S, o.bg, o.color, o.fill);
      if (o.tray) S.at(G.el('div', 's4-tray', S.B), ...o.tray);
      (o.pre || []).forEach(([art, x, y, w, h]) => { const e = S.at(G.el('img', 's4-pre', S.B), x, y, w, h); e.src = ART(art); e.alt = ''; Object.assign(e.style, { position: 'absolute', objectFit: 'contain' }); });
      let fin = false, busy = false;
      const slots = o.slots.map(s => { const el = S.at(G.el('div', 's4-slot', S.B), s.x, s.y, s.w, s.h); if (o.dash) { el.style.outline = '7px dashed #FFD66B'; el.style.background = 'rgba(59, 42, 38, .18)'; } return Object.assign(s, { el, item: null }); });
      const free = () => slots.filter(s => !s.item).map(s => s.el);
      const home = (it) => S.at(it.el, it.x, it.y, it.w, it.h);
      const items = o.items.map(it => {
        it.el = G.btn('s4-pc', `<img src="${ART(it.art) || ''}" alt="">`, S.B, () => { if (G.lv('easy') && !it.slot) { const s = slots.find(q => !q.item && o.fits(it, q)); if (s) put(it, s); else wob(it.el); } }, it.label || '');
        home(it); it.slot = null;
        G.p4.dragTo(it.el, free, (t) => put(it, slots.find(s => s.el === t)), { can: () => !fin && !busy && !it.slot });
        return it;
      });
      async function put(it, s) {
        if (fin || busy || !s || s.item || it.slot) return; G.help.poke();
        if (!o.fits(it, s)) {
          busy = true; G.audio.sfx('sfx_tap', 0.4, 0.7);
          S.at(it.el, s.x + (s.w - it.w) / 2, s.y + (s.h - it.h) / 2); await G.wait(0.5); home(it); wob(it.el);
          if (o.wrong) await o.wrong(it, s, S); busy = false; return;
        }
        s.item = it; it.slot = s; it.el.classList.add('set'); G.audio.sfx('sfx_chime', 0.5); if (o.dash) { s.el.style.outline = ''; s.el.style.background = ''; }
        if (s.fit === 'fill') S.at(it.el, s.x, s.y, s.w, s.h);
        else { const k = Math.min(s.w / it.w, s.h / it.h); S.at(it.el, s.x + (s.w - it.w * k) / 2, s.y + (s.h - it.h * k) / 2, it.w * k, it.h * k); }
        if (o.won()) { fin = true; cur = null; G.help.off(); S.hush(); await G.wait(0.5); G.audio.sfx('sfx_sparkle', 0.8); spark(it.el, 12); await G.wait(1.2); S.end(); res(ok()); }
      }
      const next = () => { for (const it of items) if (!it.slot) { const s = slots.find(q => !q.item && o.fits(it, q)); if (s) return [it, s]; } return null; };
      cur = { solve: async () => { let n; while (!fin && (n = next())) { await put(n[0], n[1]); await G.wait(0.3); } } };
      S.say(o.hint);
      G.help.set({
        l1: () => S.say(o.hint), l2: () => { },
        l3: () => { const n = next(); if (!n) return; n[1].el.classList.add('s3-hint'); wob(n[0].el); setTimeout(() => n[1].el.classList.remove('s3-hint'), 3000); },
        clear: () => slots.forEach(s => s.el.classList.remove('s3-hint')),
      });
    });
  }
  const trayRow = (items, x0, y, w) => { const n = items.length, step = w / n; shuffle(items.map((_, i) => i)).forEach((k, i) => { const it = items[i]; it.x = x0 + k * step + (step - it.w) / 2; it.y = y; }); return items; };
  // 놀이터: 차례판. 수현이가 말한 대로 얼굴 카드를 판에 걺 (수현이는 이미 첫째 칸)
  const FACE = { suhyeon: '수현', soyul: '소율', bomi: '보미', taeo: '태오', jia: '지아' };
  function turnBoard() {
    const T = D5().turn, P = T[lv()] || T.normal, SL = [[599, 322, 151, 196], [788, 322, 172, 196], [999, 322, 172, 196], [1212, 322, 182, 196]];
    const pre = (P.pre || []).map((k, i) => k && ['face_' + k, ...SL[i]]).filter(Boolean);
    const slots = T.order.map((k, i) => ({ id: k, x: SL[i][0], y: SL[i][1], w: SL[i][2], h: SL[i][3] })).filter((s, i) => !(P.pre || [])[i]);
    const items = trayRow(P.cards.map(k => ({ id: k, art: 'face_' + k, w: 150, h: 150, label: FACE[k] })), 200, 700, 1200);
    return placePz({ cls: 's5z-turn', bg: 'hm_turn_bg', color: 'linear-gradient(#3B4A6B,#2a3350)', fill: true, tray: [180, 680, 1240, 190], items, slots, pre, hint: 'HM01_suhyeon_05',
      fits: (it, s) => it.id === s.id, won: () => items.every(it => it.id === 'jia' || it.slot), wrong: () => play(['HM01_suhyeon_05'], su) });
  }

  // ================= 마음의 별-2: 연못 다리 =================
  G.flows.s5_pond = async (ctx) => {
    const { V, H, g, complete } = ctx, ok = () => g === G.gen, id = H.def.id;
    if (id === 'gureum') {
      if (done('s5pond_map')) { await play([done('s5pond_mat') ? 'HM02_gureum_06' : 'HM02_gureum_02'], gu); return; }
      await play(['HM02_gureum_01'], gu); if (!ok()) return;
      await play(['HM02_soyul_01'], so); if (!ok()) return;
      await G.dialog.choose(['HM02_ply_01', 'HM02_ply_02'].map(v => ({ label: G.txt(v), icon: 'icon_good', voice: v })), true); if (!ok()) return;
      await play(['HM02_gureum_02'], gu); if (!ok()) return;   // 아저씨는 아직 마음을 닫음
      await play(['HM02_nuri_01', 'HM02_nuri_02'], no); if (!ok()) return;   // 지난 별 인물(누리)이 열쇠
      await play(['HM02_rumi_01']); if (!ok()) return;
      const w = await slipMap(); if (!ok() || !w) return;
      await play(['HM02_hero_01', 'HM02_hero_10']); if (!ok()) return;
      await play(['HM02_rumi_02']); if (!ok()) return;
      complete('s5pond_map'); say('HM02_rumi_02'); return;
    }
    if (id === 'shed') {
      if (done('s5pond_lock')) { await play(['HM02_rumi_04']); return; }
      await play(['HM02_nuri_03'], no); if (!ok()) return;
      await play(['HM02_rumi_03']); if (!ok()) return;
      const w = await padlock(); if (!ok() || !w) return;
      complete('s5pond_lock'); say('HM02_rumi_04'); return;
    }
    if (id === 'bridge') {
      if (done('s5pond_mat')) { await play(['HM02_hero_02']); return; }
      await play(['HM02_rumi_04']); if (!ok()) return;
      const w = await mats(); if (!ok() || !w) return;
      await play(['HM02_hero_02']); if (!ok()) return;
      await play(['HM02_gureum_03'], gu); if (!ok()) return;
      await play(['HM02_soyul_02'], so); if (!ok()) return;   // 아이들이 처음으로 "왜?"를 물음
      await play(['HM02_gureum_04', 'HM02_gureum_05'], gu); if (!ok()) return;
      await play(['HM02_soyul_03'], so); if (!ok()) return;
      await play(['HM02_gureum_06', 'HM02_gureum_07'], gu); if (!ok()) return;
      if (!await toBag('flag5', 'HM02_sys_01')) return;
      complete('s5pond_mat'); return;
    }
    if (id === 'paperstar') {
      if (done('s5pond_star')) return;
      await play(['HM02_hero_03']); if (!ok()) return;   // 수현이가 접던 종이별 (복선)
      if (!has('paperstar')) { G.st.items.push('paperstar'); G.save.write(); }
      const p = V.spr.paperstar; if (p) { spark(p.img, 10); G.audio.sfx('sfx_chime', 0.5); await fade(p, 0); }
      await play(['HM02_nuri_04'], no); if (!ok()) return;
      await colorIn(V); if (!ok()) return;
      complete('s5pond_star'); return;
    }
    if (id === 'soyul') { await play([done('s5pond_mat') ? 'HM02_soyul_03' : 'HM02_soyul_01'], so); return; }
    if (id === 'nuri') { await play([done('s5pond_mat') ? 'HM02_nuri_04' : done('s5pond_map') ? 'HM02_nuri_03' : 'HM02_nuri_02'], no); }
  };
  // 누리 지도의 미끄러운 곳 표시를 다리 위로 옮김 (쉽게 3, 보통 4, 어렵게 5 + 조용한 곳·쉼터 표시도 제자리로)
  const SLIPAT = [[720, 410], [820, 385], [920, 400], [770, 480], [880, 480]];
  function slipMap() {
    const n = D5().slips[lv()] || 4, hard = lv() === 'hard';
    const slots = SLIPAT.slice(0, n).map(([x, y], i) => ({ id: 'b' + i, kind: 'slip', x: x - 48, y: y - 48, w: 96, h: 96, fit: 'fill' }));
    if (hard) slots.push({ id: 'quiet', kind: 'quiet', x: 1300, y: 170, w: 96, h: 96, fit: 'fill' }, { id: 'rest', kind: 'rest', x: 1180, y: 620, w: 96, h: 96, fit: 'fill' });
    const items = trayRow(slots.map((s, i) => ({ id: 'm' + i, kind: s.kind, art: 'sym_' + s.kind, w: 110, h: 110, label: s.kind === 'slip' ? '미끄러운 곳 표시' : s.kind === 'rest' ? '쉼터 표시' : '조용한 곳 표시' })), 160, 772, 1280);
    return placePz({ cls: 's5z-map', bg: 'hm_map_bg', color: '#FFF8E8', fill: true, tray: [140, 752, 1320, 140], items, slots, dash: true, hint: 'HM02_rumi_01',
      fits: (it, s) => it.kind === s.kind, won: () => items.every(it => it.slot) });
  }
  // 창고 자물쇠: 숫자 = 지도의 미끄러운 곳 수 (쪽지 힌트). 위·아래 단추로 숫자를 맞추면 열림
  function padlock() {
    return new Promise((res) => {
      const g = G.gen, ok = () => g === G.gen, need = D5().slips[lv()] || 4;
      const S = screen('s5z-lock', 1600, 679); bgOf(S, 'hm_shed_bg', 'linear-gradient(#8a6a4e,#5E4A3A)', true);
      const note = S.at(G.el('div', 's5-panel', S.B, `<img src="${ART('item_mat')}" alt=""><img src="${ART('sym_slip')}" alt=""><span>?</span>`), 160, 120, 520, 190);
      const dial = S.at(G.el('div', 's5-dial', S.B), 650, 170), upB = G.btn('', ARROW_UP, dial, () => turn(1), '숫자 올리기'), d = G.el('div', 'd', dial, '0'), dnB = G.btn('', ARROW_DN, dial, () => turn(-1), '숫자 내리기');
      let v = 0, fin = false, tm = null;
      function turn(k) { if (fin || G.dialog.active) return; G.help.poke(); v = (v + k + 10) % 10; d.textContent = v; G.audio.sfx('sfx_tap', 0.4, 1 + v * 0.03); clearTimeout(tm); if (v === need) tm = setTimeout(win, 700); }
      async function win() { if (fin || v !== need) return; fin = true; cur = null; G.help.off(); S.hush(); d.classList.add('ok'); G.audio.sfx('sfx_door', 0.5); spark(d, 12); await G.wait(1.3); S.end(); res(ok()); }
      cur = { solve: () => { v = need; d.textContent = v; win(); } };
      S.say('HM02_rumi_03');
      G.help.set({ l1: () => S.say('HM02_rumi_03'), l2: () => wob(note), l3: () => { note.querySelector('span').textContent = need; wob(note); }, clear: () => { } });
      void upB; void dnB;
    });
  }
  // 젖은 판자 위에 매트 깔기 (미끄러운 곳 수만큼)
  const MATAT = [[500, 530], [330, 640], [830, 410], [540, 690], [880, 505]];
  function mats() {
    const n = D5().slips[lv()] || 4;
    const slots = MATAT.slice(0, n).map(([x, y], i) => ({ id: 's' + i, x: x - 100, y: y - 52, w: 200, h: 104, fit: 'fill' }));
    const items = slots.map((s, i) => ({ id: 'mat' + i, art: 'item_mat', w: 150, h: 130, label: '매트', x: 1190 + (i % 2) * 175, y: 330 + Math.floor(i / 2) * 150 }));
    return placePz({ cls: 's5z-mat', bg: 'hm_bridge_bg', color: 'linear-gradient(#3B4A6B,#2a3350)', fill: true, tray: [1160, 310, 400, 470], items, slots, dash: true, hint: 'HM02_rumi_04',
      fits: () => true, won: () => items.every(it => it.slot) });
  }

  // ================= 마음의 별-3: 공원 무대 =================
  G.flows.s5_stage = async (ctx) => {
    const { V, H, g, complete } = ctx, ok = () => g === G.gen, id = H.def.id;
    if (id === 'stage') {
      if (done('s5stage_rewind')) { await play(['HM03_rumi_02']); return; }
      if (!done('s5s_hide')) {
        await play(['HM03_soyul_01'], so); if (!ok()) return;
        await play(['HM03_suhyeon_01'], su); if (!ok()) return;
        await play(['HM03_soyul_02'], so); if (!ok()) return;   // 순서를 바꾸고 음악을 크게 (그림으로 크게, 소리는 작게)
        if (!G.reduced() && V.el.animate) V.el.animate([{ translate: '0 0' }, { translate: '6px 0' }, { translate: '-6px 0' }, { translate: '0 0' }], { duration: 300, iterations: 3 });
        G.audio.sfx('sfx_tap', 0.3, 0.6);
        await play(['HM03_nar_01'], { noPortraits: true }); if (!ok()) return;
        await fade(V.spr.suhyeon, 0); mark('s5s_left');
        await play(['HM03_soyul_03'], so); if (!ok()) return;   // 마음이 닫히는 순간 (규칙 5): 소율이 무대 뒤로 숨음
        await fade(V.spr.soyul, 0); mark('s5s_hide');
      }
      await play(['HM03_rumi_01', 'HM03_rumi_04']); if (!ok()) return;
      const w = await rewind({ bg: 'hm_stage_bg', spots: D5().rewindStage, over: [['item_paperstar', 204, 498, 60, 60]], hint: 'HM03_rumi_04' }); if (!ok() || !w) return;
      await play(['HM03_rumi_02']); if (!ok()) return;
      complete('s5stage_rewind'); say('HM03_rumi_03'); return;
    }
    if (id === 'suhyeon2') {
      if (done('s5stage_ask')) { await play(['HM03_suhyeon_05'], su); return; }
      if (!done('s5s_back')) {
        await play(['HM03_rumi_03']); if (!ok()) return;
        if (!await G.p4.askHelp(V, 'suhyeon2', 'HM03_hero_01')) return;
        await showCard('card_rest', 'S93_card_rest'); if (!ok()) return;   // 수현이는 그림 카드로 답함 (자기 방법)
        await play(['HM03_rumi_10']); if (!ok()) return;
        if (!await waitOn('card_rest')) return;
        await play(['HM03_rumi_05']); if (!ok()) return;
        await G.dialog.choose(['HM03_ply_01', 'HM03_ply_02', 'HM03_ply_03'].map(v => ({ label: G.txt(v), icon: 'icon_good', voice: v })), true); if (!ok()) return;   // 해답 고르기: 어느 것이든 좋은 생각
        await play(['HM03_rumi_06']); if (!ok()) return;
        mark('s5s_back'); if (V.refreshSprites) V.refreshSprites();
        const s2 = V.spr.soyul2; if (s2) { s2.img.style.opacity = 0; await fade(s2, 1); }
      }
      await play(['HM03_soyul_04'], so); if (!ok()) return;
      await play(['HM03_suhyeon_02', 'HM03_suhyeon_03'], su); if (!ok()) return;   // 서로 묻기
      await play(['HM03_soyul_05'], so); if (!ok()) return;
      await play(['HM03_suhyeon_04'], su); if (!ok()) return;
      await play(['HM03_soyul_10', 'HM03_soyul_06'], so); if (!ok()) return;
      complete('s5stage_ask'); say('HM03_rumi_07'); return;
    }
    if (id === 'board') {
      if (done('s5stage_party')) { await play(['HM03_soyul_07'], so); return; }
      await play(['HM03_rumi_07', 'HM03_rumi_08']); if (!ok()) return;
      const w = await party(); if (!ok() || !w) return;
      await showCard('card_gift', 'S93_card_gift'); if (!ok()) return;   // 소율이 수현이 방법(그림 카드)으로 알려 줌
      await play(['HM03_suhyeon_05', 'HM03_suhyeon_06'], su); if (!ok()) return;
      await play(['HM03_hero_05']); if (!ok()) return;
      await play(['HM03_soyul_07'], so); if (!ok()) return;
      await play(['HM03_rumi_09']); if (!ok()) return;
      if (!has('piece_heart')) { await presentItem('piece_heart'); if (!ok()) return; }
      await colorIn(V); if (!ok()) return;
      complete('s5stage_party'); return;
    }
    if (id === 'speaker') { await play([done('s5stage_party') ? 'HM03_rumi_08' : done('s5stage_rewind') ? 'HM03_hero_02' : 'HM03_soyul_02'], done('s5stage_rewind') ? {} : so); return; }
    if (id === 'soyul2') { await play([done('s5stage_party') ? 'HM03_soyul_07' : 'HM03_soyul_06'], so); return; }
    if (id === 'nuri') { await play(['HM02_nuri_04'], no); }
  };
  // 잔치 순서판: 그림 카드를 순서대로 (노래, 촛불, 선물, 케이크), 모래시계 카드, 쉼터 깃발은 스피커에서 먼 나무 그늘 돌 자리
  const PARTYX = [407, 542, 675, 807, 942, 1075];
  function party() {
    const T = D5().party, P = T[lv()] || T.normal, slot = (i) => ({ x: PARTYX[i], y: 369, w: 116, h: 143 });
    const pre = (P.pre || []).map(k => ['card_' + k, ...Object.values(slot(T.order.indexOf(k)))]);
    const slots = T.order.filter(k => !(P.pre || []).includes(k)).map(k => ({ id: k, ...slot(T.order.indexOf(k)) }));
    const cards = P.cards.map(k => ({ id: k, art: 'card_' + k, w: 120, h: 120, label: '그림 카드' }));
    if (P.hg) { slots.push({ id: 'hourglass', ...slot(4) }); cards.push({ id: 'hourglass', art: 'card_hourglass', w: 120, h: 120, label: '모래시계 카드' }); }
    slots.push({ id: 'flag', x: 1200, y: 600, w: 130, h: 200 }); cards.push({ id: 'flag', art: 'item_flag5', w: 100, h: 150, label: '쉼터 깃발' });
    const items = trayRow(cards, 60, 745, 1000);
    return placePz({ cls: 's5z-party', bg: 'hm_party_bg', color: 'linear-gradient(#3B4A6B,#2a3350)', fill: true, tray: [40, 725, 1040, 160], items, slots, pre, dash: true, hint: 'HM03_rumi_07',
      fits: (it, s) => it.id === s.id, won: () => items.every(it => it.id === 'line' || it.slot), wrong: (it, s, S) => S.say('HM03_rumi_07') });
  }

  // ================= 마음의 별-4: 광장 모임 =================
  G.flows.s5_plaza = async (ctx) => {
    const { S, V, H, g, complete } = ctx, ok = () => g === G.gen, id = H.def.id;
    if (id === 'soyul') {
      if (done('s5plaza_card')) { await play(['HM03_soyul_07'], so); return; }
      await play(['HM04_chief_01'], { partner: 'chief' }); if (!ok()) return;
      await play(['HM04_gureum_01'], gu); if (!ok()) return;
      { const at = S.feastDust.gureum; dustBtn(V, 's5plaza:gureum', at[0], at[1]); G.audio.sfx('sfx_sparkle', 0.5); }
      await play(['HM04_chief_02'], { partner: 'chief' }); if (!ok()) return;   // 촌장님은 선배 (규칙 3)
      { const at = S.feastDust.suhyeon; dustBtn(V, 's5plaza:suhyeon', at[0], at[1]); G.audio.sfx('sfx_sparkle', 0.5); }
      if (!await G.p4.daonGuide('heart', 'HM04_daon_01', 'HM04_daon_02')) return;   // 다온의 쉬운 안내판 (그림 차례판이 알맞음)
      await play(['HM04_rumi_01']); if (!ok()) return;
      // 별 카드: 공원에서 바꾼 방법을 별에게 돌려주면 별이 빛남 (틀린 답 없음)
      if (!await G.starCard('heart', [{ text: '왜?', label: '물어보기' }, { art: 'guide_turnboard', label: '보이는 순서' }, { art: 'card_hourglass', label: '기다리는 시간' }, { art: 'card_rest', label: '쉬는 자리' }])) return;
      await play(['HM04_rumi_02']); if (!ok()) return;
      await play(['HM04_nuri_01'], no); if (!ok()) return;
      if (!await G.p4.beforeAfter('s5play_before', 's5play_after', 'HM04_rumi_04')) return;   // 셋째 교훈은 말 대신 마을 변화 (전과 후 그림)
      complete('s5plaza_card'); return;
    }
    if (id === 'pedestal') {
      if (sd().length < D5().dustNeed) { await play(['E11_chief_01'], { partner: 'chief' }); return; }
      if (has('piece_heart')) {
        say('HM03_rumi_09');
        const u = await G.p4.useItem('piece_heart', H.btn, { say, hint: 'HM03_rumi_09' }); if (!u || !ok()) return;
      }
      await play(['HM04_suhyeon_01'], su); if (!ok()) return;
      await play(['HM04_soyul_01'], so); if (!ok()) return;
      await starRise(V); if (!ok()) return;
      await play(['HM04_rumi_03']); if (!ok()) return;
      if (!cleared('s5plaza')) G.st.cleared.push('s5plaza');
      complete('s5plaza_star'); if (!ok()) return;
      await ending();
    }
  };
  // ---- 별이 받침대에서 하늘로 (길의 별·소리의 별과 같은 차례): 모이기 → 받침대로 → 빛 기둥 → 밤하늘 제자리 → 가로등·색·불꽃놀이 → 「마음의 별」 ----
  const GATHER = { chief: [900, 520], gureum: [1380, 410], nuri: [1390, 880], suhyeon: [960, 720], soyul: [870, 900] };
  async function starRise(V) {
    const s = G.STARS.find(q => q.id === 'heart'), ov = G.$('#overlay'), u = G.stage.u, rm = G.reduced();
    const { W, H: SH } = G.stage, wl = V.el.parentNode, S = V.S, ped = S.hotspots.find(h => h.id === 'pedestal').rect;
    const layer = G.el('div', 'layer', ov); layer.style.pointerEvents = 'none';
    G.hud.hide(true);
    V.fx.querySelectorAll('.hot-glow, .mstar').forEach(e => e.style.visibility = 'hidden');
    await V.gather(GATHER, 4);   // 10/8 선생님: 받침대로 올 때도 픽셀 걷기로 광장 길을 따라
    const [bx, by] = V.toScreen(ped[0] + ped[2] / 2, ped[1] + 40), hs = (V.spr.hero && V.spr.hero.rect) || S.sprites.find(q => q.id === 'hero').rect, [hx, hy] = V.toScreen(hs[0] + hs[2] / 2, hs[1]);
    const piece = G.el('div', 'c11-item', layer, G.icon(G.litIcon('piece_heart')));   // 10/6: 받침대로 가는 별은 빛나는 별 Object.assign(piece.style, { left: hx + 'px', top: hy + 'px' });
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
    // 10/6 선생님: 별가루를 연료처럼 뿜으며 반짝이는 잔상을 남기고 올라감 (core.js G.riseTrail, 인트로와 같은 효과)
    const tr = G.riseTrail(layer, big, s.color), bs = big.offsetWidth || 190 * u;
    const pan = (k) => { const d = SH * k; tr.shift(d); wl.style.transform = `translateY(${d}px)`; sky.style.transform = `translateY(${d - SH}px)`; sky.style.opacity = Math.min(1, k * 2.5); pillar.style.translate = `0 ${d}px`; };
    const fly = (k) => { pan(k); const x = sx0 + (sx1 - sx0) * k, y = sy0 + (sy1 - sy0) * k - Math.sin(k * Math.PI) * 60 * u; big.style.left = x + 'px'; big.style.top = y + 'px'; big.style.transform = `translate(-50%,-50%) scale(${1 - 0.21 * k})`; tr(k, x, y, bs * (1 - 0.21 * k)); };
    if (rm) fly(1); else await G.tween(0, 1, 2.4, fly, 'io'); tr.end();
    big.remove(); slots[si].classList.add('lit'); G.audio.sfx('sfx_chime', 0.7);
    await G.wait(1.6);
    if (rm) pan(0); else await G.tween(1, 0, 2.0, pan, 'io');
    wl.style.transform = ''; sky.remove(); pillar.remove();
    for (const l of V.lamps) if (!l.el.classList.contains('on')) { l.el.classList.add('on'); G.audio.sfx('sfx_chime', 0.35); await G.wait(0.3); }
    const col = V.colorImg; col.style.visibility = ''; col.style.opacity = 1;
    G.fireworkShow(layer, 5);
    for (const k of ['chief', 'gureum', 'nuri', 'suhyeon', 'soyul', 'hero']) { const sp = V.spr[k]; if (sp && !rm && sp.img.animate && sp.img.style.display !== 'none') sp.img.animate([{ transform: 'translateY(0)' }, { transform: 'translateY(-16px)' }, { transform: 'translateY(0)' }], { duration: 500, iterations: 2 }); }
    const t = G.el('div', 'cut-title c11-title', layer, s.name || '마음의 별'); t.style.opacity = 0;
    await G.tween(0, 1, 0.6, k => { t.style.opacity = k; t.style.transform = `translate(-50%,-50%) scale(${0.8 + 0.2 * k})`; }, 'out');
    await G.wait(2.4);
    if (layer.animate) await layer.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 500 }).finished.catch(() => { });
    layer.remove(); G.hud.hide(false);
  }


  // ================= 마음의 별-5: 엔딩 (문턱의 별 엔딩과 같은 차례, 공원에 색이 번짐) =================
  async function ending() {
    const g = G.gen, ok = () => g === G.gen, rm = G.reduced();
    if (!cleared('s5plaza')) G.st.cleared.push('s5plaza');
    G.st.place = 'plaza'; G.save.write();
    G.help.off(); G.hud.clear(); G.hud.hide(true); G.busy++;
    try {
      await G.cut.play('CH:s5_5', { key: 's5_5' }); if (!ok()) return;
      G.$('#fade').classList.add('on'); await G.wait(0.45); if (!ok()) return;
      G.scene.hide(); G.map.hide(); G.s2.sync();
      const world = G.$('#world'); world.innerHTML = '';
      const MV = G.mapView(world, {}); MV.setMood(5); MV.addMarkers();
      for (const p of G.D.places.places) MV.setMarker(p.id, 'done', true);
      await MV.ready; if (!ok()) return;
      const cam = [1150, 650], onR = () => MV.setCam(MV.cam.x, MV.cam.y, MV.cam.z); G.resizers.add(onR);
      MV.setCam(cam[0], cam[1], 1);
      G.audio.music('music_night');
      G.$('#fade').classList.remove('on');
      // 공원 전체에 색
      { const z = G.D.mood.zones.find(q => q.id === 's5all'), ovl = G.el('img', 'bg', MV.imgs); ovl.src = MV.colorImg.src; ovl.width = MV.W; ovl.height = MV.H; ovl.alt = '';
        const m = `radial-gradient(ellipse ${z.r[0]}px ${z.r[1]}px at ${z.center[0]}px ${z.center[1]}px, #000 0%, #000 42%, rgba(0,0,0,.55) 72%, transparent 100%)`;
        Object.assign(ovl.style, { maskImage: m, webkitMaskImage: m, opacity: 0, transition: `opacity ${rm ? 0.3 : 2.6}s ease-out` }); ovl.getBoundingClientRect(); ovl.style.opacity = 1; G.audio.sfx('sfx_sparkle', 0.7); }
      MV.setLamps(5, true);
      // 그림 표시 (놀이터 = 차례판, 연못 다리 = 쉼터 깃발, 무대 = 종이별 상자). 선생님 그림 place_<장소>가 있으면 그것
      const icons = MAPICO5.map(([id, k]) => { const p = G.D.places.places.find(q => q.id === id), src = G.art('place_' + id) || G.art(k); if (!p || !src) return null; const e = G.el('div', 's3-mapico', MV.fx, `<img src="${src}" alt="">`);
        Object.assign(e.style, { left: (p.marker[0] + 110) + 'px', top: (p.marker[1] - 30) + 'px' }); e.animate && e.animate([{ scale: .2, opacity: 0 }, { scale: 1.2, opacity: 1 }, { scale: 1 }], { duration: 700, easing: 'ease-out' }); return e; }).filter(Boolean);
      await G.wait(rm ? 0.5 : 3.0); if (!ok()) return;   // 교훈 세 번째는 말 대신 마을 변화로
      await play(['HM05_nar_01'], { noPortraits: true }); if (!ok()) return;
      icons.forEach(e => e.remove());
      await sky(); if (!ok()) return;
      G.st.stars = Math.max(G.st.stars || 0, 5); G.st.mood = 5;
      mark('s5_end'); (G.st.s2bloom = G.st.s2bloom || []).push('s5all'); G.save.write();
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
    const POS = [[.5, .42], [.3, .3], [.7, .3], [.2, .55], [.8, .55], [.38, .66], [.62, .66], [.5, .2], [.5, .8]], nx = G.STARS.findIndex(s => s.id === D5().next);
    G.STARS.forEach((s, i) => { const e = G.el('div', 'c11-slot' + (i < 5 ? ' me lit' : ''), m, G.starSvg(s, i >= 5)); Object.assign(e.style, { left: POS[i % POS.length][0] * 100 + '%', top: POS[i % POS.length][1] * 100 + '%' }); });
    G.el('div', 'star-count sky-count', m, G.icon('icon_star') + ' 되찾은 별 5/8');
    G.pedestalRow(m, 5, D5().next || (G.STARS[5] && G.STARS[5].id));   // 10/6: 받침대 빈 자리가 깜박임
    G.audio.sfx('sfx_chime', 0.5);
    await G.dialog.play(['HM06_nar_03']);
    if (g === G.gen) { await G.wait(0.4); if (m.animate) await m.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 500 }).finished.catch(() => { }); }
    m.remove();
  }
  async function starCard() {
    const s = G.STARS.find(q => q.id === 'heart'), m = G.el('div', 'modal starget', G.$('#overlay')), sh = G.el('div', 'sheet', m);
    const pic = G.el('div', 'star-pic', sh, G.starSvg(s));
    G.el('div', 'get-title', sh, s.name);
    G.el('div', 'get-desc', sh, s.job);
    G.el('div', 'star-count', sh, G.icon('icon_star') + ' 되찾은 별 5/8');
    G.audio.sfx('sfx_star', 0.9);
    pic.animate && pic.animate([{ transform: 'scale(.2) rotate(-40deg)', opacity: 0 }, { transform: 'scale(1.2)', opacity: 1, offset: .7 }, { transform: 'scale(1)' }], { duration: 900, easing: 'ease-out' });
    const row = G.el('div', 'btn-row', sh);
    const b = G.btn('pill gold dlg-next wait', '다음 ' + G.icon('icon_next'), row, null, '다음'); b.disabled = true;
    let r; const p = new Promise(x => r = x);
    (G.fast() ? Promise.resolve() : G.audio.voice('HM05_nar_03')).then(() => { b.disabled = false; b.classList.remove('wait'); b.classList.add('ready'); });
    G.onTap(b, () => { if (b.disabled) return; G.audio.sfx('sfx_tap', 0.5); G.audio.stopVoice(); r(); });
    await p; m.remove();
  }

  const DONE12 = {
    done: ['meet_lumi', 'plaza_intro', 'plaza_chief', 'plaza_board', 'plaza_post', 'market_intro', 'market_bom', 'market_ask', 'market_map', 'library_intro', 'library_haesol', 'library_tactile', 'library_puzzle', 'plaza_post_ask', 'letter_1', 'letter_2', 'letter_3', 'market_jig', 'libdoor_seen', 'libdoor_open', 'note_got',
      'forest_intro', 'forest_wind', 'forest_star', 'forest_daon', 'plaza2_intro', 'plaza2_board', 'plaza2_road', 'plaza2_look', 'plaza2_star', 'road_tiles',
      's2_begin', 's2_fog', 's2school_intro', 's2s_talk', 's2n_chair', 's2n_window', 's2n_bell', 's2n_locker', 's2school_noise', 's2f_chair', 's2f_window', 's2f_bell', 's2f_locker', 's2school_fix', 's2school_ask', 's2school_card',
      's2door_open', 's2hall_intro', 's2hall_duri', 's2hall_seats', 's2hall_score', 's2rest_intro', 's2rest_miru', 's2rest_box', 's2rest_deco', 's2rest_star', 's2plaza_intro', 's2plaza_concert', 's2plaza_star', 's2_end'],
    cleared: ['plaza', 'market', 'library', 'forest', 'plaza2', 's2school', 's2hall', 's2rest', 's2plaza'], items: ['note', 'map', 'tactile', 'piece', 'light', 'rhythm', 'score', 'piece_sound'],
    seen: ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C10', 'C11', 'C12', 'CH:intro', 'CH:plaza', 'CH:market', 'CH:library', 'CH:forest', 'CH:plaza2', 'CH:ending',
      'CH:s2_1', 'CH:s2school', 'S2A_s2school', 'CH:s2hall', 'S2A_s2hall', 'CH:s2rest', 'S2A_s2rest', 'CH:s2plaza', 'S2A_s2plaza', 'CH:s2_6'],
    visited: ['plaza', 'market', 'library', 'forest', 'plaza2', 's2school', 's2hall', 's2rest', 's2plaza'],
  };
  // ================= 교사용 챕터 바로 가기 (마음의 별-1 ~ -5) =================
  // 앞 별(길·소리·말·문턱의 별)을 모두 끝낸 상태에서 시작 (DONE3은 s4/chapter.js와 같음)
  const DONE3 = {
    done: ['s3_begin', 's3_fog', 's3cafe_intro', 's3c_talk', 's3cafe_order', 's3cafe_menu', 's3cafe_window', 's3dock_intro', 's3dock_sign', 's3dock_phone', 's3dock_boat',
      's3harang_intro', 's3h_meet', 's3h_diary', 's3h_ask', 's3h_star', 's3plaza_intro', 's3plaza_relay', 's3plaza_star', 's3_end'],
    cleared: ['s3gate', 's3cafe', 's3dock', 's3harang', 's3plaza'], items: ['s3letter', 'codeA', 'codeB', 'piece_word'],
    seen: ['CH:s3_1', 'CH:s3cafe', 'S3A_s3cafe', 'CH:s3dock', 'S3A_s3dock', 'CH:s3harang', 'S3A_s3harang', 'CH:s3plaza', 'S3A_s3plaza', 'CH:s3_6'],
    visited: ['s3cafe', 's3dock', 's3harang'],
    dust: ['s3cafe:0', 's3cafe:h:teapot', 's3dock:0', 's3dock:h:boat', 's3harang:0', 's3harang:h:cardbox', 'map:s3dog', 'map:s3gran', 's3plaza:moa', 's3plaza:bau'],
  };
  const DONE4 = {
    done: ['s4_begin', 's4_fog', 's4gate_path', 's4shop_intro', 's4shop_door', 's4shop_ramp', 's4shop_rail', 's4flower_intro', 's4flower_box', 's4flower_aisle', 's4flower_door',
      's4view_intro', 's4view_path', 's4view_door', 's4view_scope', 's4plaza_intro', 's4plaza_card', 's4plaza_star', 's4_end'],
    cleared: ['s4gate', 's4shop', 's4flower', 's4view', 's4plaza'], items: ['s4map', 'plank', 'button', 'piece_door'],
    seen: ['CH:s4_1', 'CH:s4shop', 'S4A_s4shop', 'CH:s4flower', 'S4A_s4flower', 'CH:s4view', 'S4A_s4view', 'CH:s4plaza', 'S4A_s4plaza', 'CH:s4_6'],
    visited: ['s4shop', 's4flower', 's4view'],
    dust: ['s4shop:0', 's4shop:h:bench', 's4flower:0', 's4flower:h:door', 's4view:0', 's4view:h:scope', 'map:s4gran', 'map:seoyeon', 's4plaza:maru', 's4plaza:yunseul'],
  };
  const STEP = [
    null,
    { done: ['s5_begin', 's5_fog', 's5play_intro', 's5p_invite', 's5play_rewind', 's5play_sand', 's5play_board'], cleared: ['s5gate', 's5play'], items: ['invite', 'help', 'hourglass'],
      seen: ['CH:s5_1', 'S5A_s5play'], dust: ['s5play:0', 's5play:h:sign'], place: 's5play' },
    { done: ['s5pond_intro', 's5pond_map', 's5pond_lock', 's5pond_mat', 's5pond_star'], cleared: ['s5pond'], items: ['flag5', 'paperstar'], seen: ['CH:s5pond', 'S5A_s5pond'], dust: ['s5pond:0', 's5pond:h:shed'], place: 's5pond' },
    { done: ['s5stage_intro', 's5s_left', 's5s_hide', 's5stage_rewind', 's5s_back', 's5stage_ask', 's5stage_party'], cleared: ['s5stage'], items: ['piece_heart'], seen: ['CH:s5stage', 'S5A_s5stage'],
      dust: ['s5stage:0', 's5stage:h:board', 'map:s5iden', 'map:s5moa'], place: 's5stage' },
    { done: ['s5plaza_intro', 's5plaza_card', 's5plaza_star'], seen: ['CH:s5plaza', 'S5A_s5plaza'], dust: ['s5plaza:gureum', 's5plaza:suhyeon'], place: 'plaza' },
  ];
  async function chapter(id) {
    if (!G.st) return;
    const n = +id.split('_')[1], keep = { slot: G.st.slot, name: G.st.name };
    G.flow.reset();
    const st = G.st = Object.assign(G.save.fresh(keep.slot), { name: keep.name });
    for (const D of [DONE12, DONE3, DONE4]) { st.done.push(...D.done); st.cleared.push(...D.cleared); st.items.push(...D.items); st.seenCutscenes.push(...D.seen); st.visited.push(...D.visited); }
    st.started = true; st.mood = 5; st.quest = 5; st.stars = 4; st.env = { board: true, guide: true }; st.place = 'plaza';
    st.dust = ['plaza:0', 'market:0', 'library:0', 'map:v2', 'map:v3']; st.s2dust = ['s2school:0', 's2school:h:locker', 's2hall:0', 's2hall:h:drum', 's2rest:0', 's2rest:cushion', 's2plaza:c0', 's2plaza:c1'];
    st.s2bloom = ['s2school', 's2hall', 's2rest', 's3cafe', 's3dock', 's3harang', 's3all', 's4shop', 's4flower', 's4view', 's4all']; st.s3dust = DONE3.dust.slice(); st.s4dust = DONE4.dust.slice(); st.s5dust = [];
    for (let i = 1; i < Math.min(n, 5); i++) {
      const s = STEP[i]; st.done.push(...(s.done || [])); st.cleared.push(...(s.cleared || [])); st.items.push(...(s.items || [])); st.seenCutscenes.push(...(s.seen || []));
      st.s5dust.push(...(s.dust || [])); if (s.place) { st.place = s.place; st.visited.push(s.place); } if (s.cleared) st.s2bloom.push(...s.cleared.filter(c => c !== 's5gate'));
    }
    if (n >= 5) { const s = STEP[4]; st.done.push(...s.done); st.seenCutscenes.push(...s.seen); st.s5dust.push(...s.dust); st.place = 'plaza'; G.save.write(); G.s2.sync(); return ending(); }
    G.save.write();
    return G.flow.resume();
  }
  (function patchFlow() {
    if (!G.flow || !G.flow.chapter) { setTimeout(patchFlow, 30); return; }
    const ch0 = G.flow.chapter;
    G.flow.chapter = (id) => /^s5_\d$/.test(id) ? chapter(id) : ch0(id);
  })();

  T.begin = begin; T.ending = ending; T.chapter = chapter; T.state = () => ({ dust: G.st && G.st.s5dust });
  T.rewind = rewind; T.sandPz = sandPz; T.turnBoard = turnBoard; T.slipMap = slipMap; T.padlock = padlock; T.mats = mats; T.party = party; T.toBag = toBag;   // 점검용
  return T;
})();

/* ---- mapfx.js ---- */
// mapfx.js — 10/10 선생님(지도 생동감, 시안 review/mapfx1010 1~5 + review/mapfx2_1010 A1~A6)
//  지도 그림 위에 밤 덧칠·구름 그림자(곱하기 캔버스)와 가로등 바닥빛·창문 불빛·루미 빛·반딧불·물 반짝임·강물 물결·꽃잎·발밑 먼지·별똥별(빛 캔버스)을 얹음.
//  두 캔버스는 화면에 보이는 만큼만 그림(지도 전체 크기 캔버스는 휴대폰에서 무거움). 인물은 빛 받기(가까운 불빛 쪽 따뜻하게, 먼 곳은 달빛 푸르게)와 테두리.
//  물·풀·창문 자리는 data/mapfx.json(소리의별/지도/도구/가려지기_1010/gen_mapfx.py, 창문은 3D 렌더의 창문 모델 자리).
//  움직임 줄이기: 날리는 것·깜빡임 없이 빛만. 가벼운 모드(G.settings.light): 모두 끔.
'use strict';
(() => {
  const mv0 = G.mapView;
  G.mapView = (parent, o = {}) => { const V = mv0(parent, o); try { attach(V); } catch (e) { console.error(e); } return V; };

  const NIGHT = 0.42;
  const glowCache = {};
  function glow(r, g, b) {   // 둥근 빛 한 장 (그릴 때 크기·세기만 바꿈)
    const k = r + ',' + g + ',' + b; if (glowCache[k]) return glowCache[k];
    const c = document.createElement('canvas'); c.width = c.height = 64; const x = c.getContext('2d');
    const gr = x.createRadialGradient(32, 32, 0, 32, 32, 32);
    gr.addColorStop(0, `rgba(${r},${g},${b},1)`); gr.addColorStop(0.3, `rgba(${r},${g},${b},.42)`); gr.addColorStop(1, `rgba(${r},${g},${b},0)`);
    x.fillStyle = gr; x.fillRect(0, 0, 64, 64); return (glowCache[k] = c);
  }
  const off = () => !!(G.settings && G.settings.light);
  const rnd = (a, b) => a + Math.random() * (b - a);

  function attach(V) {
    const M = G.D.places.map, all = G.D.mapfx; if (!all) return;
    const D = all[/map2_/.test(M.color) ? 'map2' : 'map']; if (!D) return;
    const MOOD = G.D.mood;
    // ---- 캔버스 두 장: 지도 그림과 인물 사이 ----
    const layer = G.el('div', 'layer mapfx', null); V.el.insertBefore(layer, V.fx);
    // 밤 덧칠·구름은 판 하나씩(곱하기, 다시 그리지 않음), 빛은 캔버스(밝게, 30번/초)
    const nightEl = G.el('div', 'mfx-night', layer), add = G.el('canvas', 'mfx-add', layer);
    const ac = add.getContext('2d');
    const lc = document.createElement('canvas'), lx = lc.getContext('2d');   // 10/11 가로등·창문·루미 빛만 따로(가려지는 조각에도 같은 빛을 그리려고)
    let cw = 0, ch = 0, vx0 = 0, vy0 = 0, sc = 1, vw = 1, vh = 1;
    // ---- 풀밭 칸 ----
    const gbits = Uint8Array.from(atob(D.grass), c => c.charCodeAt(0));
    V.grassAt = (x, y) => { const i = Math.floor(x / D.cell), j = Math.floor(y / D.cell); if (i < 0 || j < 0 || i >= D.gw || j >= D.gh) return false; const n = j * D.gw + i; return !!(gbits[n >> 3] & (128 >> (n & 7))); };
    // ---- 상태 ----
    V.stage = 5; const sm0 = V.setMood; V.setMood = (s) => { V.stage = Math.max(0, Math.min(5, s)); return sm0(s); };
    V.night = 0; V.fxN = 0; V.fxHero = null; V.fxLumi = null;
    let T = 0, dawn = 0, ripT = 0, shootT = 3, litT = 0, sndT = 0, prevA = null;
    const flies = [], petals = [], parts = [], burst = [], ripples = [], shoot = [], reveals = [];
    const clouds = Array.from({ length: 4 }, (_, i) => ({ x: (i + 0.3) * V.W / 4, y: rnd(0.15, 0.85) * V.H, w: rnd(560, 760), el: G.el('div', 'mfx-cloud', layer) }));
    for (const k of clouds) { k.el.style.width = k.w + 'px'; k.el.style.height = k.w / 2 + 'px'; }
    let skip = 0;
    const inView = (x, y, m) => x > vx0 - m && x < vx0 + vw + m && y > vy0 - m && y < vy0 + vh + m;
    const greenIn = () => { const c = D.green.filter(p => inView(p[0], p[1], -20)); return c.length ? c[Math.floor(Math.random() * c.length)] : null; };
    // A4: 색이 번지는 구역에서 반딧불이 퍼지고, 창문·가로등이 가운데부터 차례로 켜짐
    const litF = (x, y) => { let f = 1; for (const r of reveals) { const d = Math.hypot(x - r.c[0], (y - r.c[1]) * 1.3); if (d > r.R + 90) continue; f = Math.min(f, Math.max(0, Math.min(1, (r.t / r.dur * r.R - d) / 90))); } return f; };
    function lightAt(x, y) {
      let L = 0;
      for (const l of V.lamps) { if (!l.el.classList.contains('on')) continue; const d = Math.hypot(x - l.def.at[0], (y - l.def.at[1]) * 1.4); if (d < 260) L += (1 - d / 260) ** 2; }
      const lu = V.fxLumi && V.fxLumi(); if (lu) { const d = Math.hypot(x - lu.x, y - lu.y); if (d < 200) L += (1 - d / 200) ** 2 * 0.8; }
      return Math.min(1, L);
    }
    V.fxSpark = (x, y) => { if (!G.reduced() && !off()) parts.push({ x: x + rnd(-7, 7), y: y + rnd(-7, 7), vx: rnd(-5, 5), vy: rnd(12, 24), g: 0, t: 0, life: rnd(0.9, 1.4), kind: 'spark' }); };

    // ---- 인물: 빛 받기·테두리, 주민 끄덕 (A2) ----
    const wk0 = V.walker;
    V.walker = (sheet, cls) => {
      const w = wk0(sheet, cls);
      w.tint = G.el('div', 'tint', null); w.el.insertBefore(w.tint, w.occ);
      const c0 = w.col;
      w.col = () => { if (w.greet && w.live && w.frame === 8 && !G.reduced()) { const d = performance.now() - w.greet; if (d > 0 && d < 800 && d % 400 < 190) return 20; } return c0(); };
      const d0 = w.draw;
      w.draw = () => {
        d0();
        if (w.tsrc !== w.src) { w.tsrc = w.src; const u = `url("${G.asset(w.src)}")`, sz = w.live ? '2100px 520px' : '900px 520px'; const s = w.tint.style; s.webkitMaskImage = s.maskImage = u; s.webkitMaskSize = s.maskSize = sz; }
        if (w.tbp !== w.bp) { w.tbp = w.bp; w.tint.style.webkitMaskPosition = w.tint.style.maskPosition = w.bp; }
      };
      w.draw(); w.lit = -1;
      return w;
    };
    function relight(w) {
      if (off()) { if (w.lit !== -2) { w.lit = -2; w.spr.style.filter = ''; w.tint.style.backgroundColor = 'transparent'; } return; }
      const L = Math.round(lightAt(w.x, w.y - 40) * 10) / 10; if (L === w.lit) return; w.lit = L;
      const rc = L > 0.35 ? 'rgba(255,226,170,.5)' : 'rgba(190,214,255,.5)';
      w.spr.style.filter = `drop-shadow(1.5px 0 0 ${rc}) drop-shadow(-1.5px 0 0 ${rc}) drop-shadow(0 -1.5px 0 ${rc})`;
      w.tint.style.backgroundColor = L < 0.25 ? `rgba(40,48,110,${((0.25 - L) * 0.7).toFixed(3)})` : `rgba(255,196,120,${(0.38 * L).toFixed(3)})`;
    }

    // ---- 가려지는 곳(나무·집을 인물 위에 다시 그린 조각)에도 같은 밤 덧칠 ----
    // 10/11 선생님(두리 단장 둘레 네모): 조각에는 밤 덧칠만 있고 구름·창문 불빛·가로등 바닥빛이 없어 둘레와 밝기가 달라 네모로 보였음 → 같은 순서로 모두 그림
    V.fxPatch = (c, x0, y0) => {
      if (!V.night) return;
      c.globalCompositeOperation = 'multiply'; c.globalAlpha = V.night; c.fillStyle = 'rgb(120,128,190)'; c.fillRect(0, 0, 100, 130);
      for (const k of clouds) { if (Math.abs(k.x - x0 - 50) > k.w / 2 + 60 || Math.abs(k.y - y0 - 65) > k.w / 4 + 70) continue; c.save(); c.translate(k.x - x0, k.y - y0); c.scale(1, 0.5); c.globalAlpha = 0.28; c.drawImage(glow(70, 80, 130), -k.w / 2, -k.w / 2, k.w, k.w); c.restore(); }
      if (cw) { c.globalCompositeOperation = 'screen'; c.globalAlpha = 1; c.drawImage(lc, (x0 - vx0) * sc, (y0 - vy0) * sc, 100 * sc, 130 * sc, 0, 0, 100, 130); }
      c.globalAlpha = 1;
    };

    // ---- A1 루미: 주인공 둘레를 돌고, 가끔 갈 곳 쪽으로 날아가 알려 줌. 지나간 자리에 별가루 ----
    const LU = { guide: null, next: 3, trail: 0, px: null, py: null };
    V.lumiTarget = (hero, dt) => {
      if (off() || G.reduced()) { LU.guide = null; return null; }
      LU.next -= dt;
      if (!LU.guide && LU.next < 0) {
        LU.next = 7;
        const np = hero.frame === 8 && G.hud.nextPlace && G.st && G.st.done.includes('meet_lumi') ? G.hud.nextPlace() : null;
        if (np) { const d = Math.hypot(np.marker[0] - hero.x, np.marker[1] - hero.y); if (d > 90 && d < 420) LU.guide = { p: np.marker, t: 0 }; }
      }
      if (LU.guide) { LU.guide.t += dt; const p = LU.guide.p; if (LU.guide.t > 2.2 || hero.frame !== 8) LU.guide = null; else return [p[0] + Math.cos(T * 4) * 16, p[1] - 90 + Math.sin(T * 4) * 10, 2.2]; }
      return [hero.x + 10 + Math.cos(T * 1.7) * 56, hero.y - 140 + Math.sin(T * 1.7) * 22 + Math.sin(T * 3.1) * 5, 3.5];
    };
    // A3: 걸음 소리는 화면 왼쪽·오른쪽 위치대로, 풀밭이면 부드럽게
    V.stepFx = (w) => ({ pan: Math.max(-1, Math.min(1, (w.x - V.cam.x) / (vw / 2 || 1))), lp: V.grassAt(w.x, w.y + 2) ? 700 : 0, vol: V.grassAt(w.x, w.y + 2) ? 0.6 : 1 });

    function dust(w) {
      const g = V.grassAt(w.x, w.y + 2);
      for (let i = 0; i < (g ? 4 : 5); i++) {
        const a = Math.PI + Math.random() * Math.PI;
        parts.push(g ? { x: w.x + rnd(-7, 7), y: w.y, vx: Math.cos(a) * 30, vy: rnd(-80, -40), g: 160, t: 0, life: 0.5, kind: 'leaf', c: Math.random() < 0.5 ? '#7fb069' : '#a7c96f' }
          : { x: w.x + rnd(-6, 6), y: w.y, vx: rnd(-20, 20), vy: rnd(-26, -10), g: 0, t: 0, life: 0.6, kind: 'dust' });
      }
    }

    // ---- 매 장면 ----
    const stop = G.every((dt) => {
      if (!V.el.isConnected) { if (V.fxSeen) { stop(); add.width = add.height = lc.width = lc.height = 0; } return; }   // 10/10: 지도를 떠나면 빛 캔버스를 비움(휴대폰 메모리)
      V.fxSeen = true;
      const { W, H, ws } = G.stage; if (!W) return;
      if (off()) { if (layer.style.display !== 'none') { layer.style.display = 'none'; V.night = 0; for (const w of V.walkers) relight(w); } return; }
      layer.style.display = '';
      T += dt; const rm = G.reduced(), stg = V.stage;
      // 구름 그림자 (판을 옮기기만)
      for (const k of clouds) { if (!rm) { k.x += dt * 14; if (k.x > V.W + 500) { k.x = -500; k.y = rnd(0.15, 0.85) * V.H; } } k.el.style.transform = `translate(${(k.x - k.w / 2).toFixed(0)}px,${(k.y - k.w / 4).toFixed(0)}px)`; }
      // 빛 캔버스는 두 번에 한 번 그림 (그 사이 시간은 다음에 합침)
      skip += dt; if (++V.fxN % 2) return; dt = skip; skip = 0;
      // 보이는 곳
      const s = ws * V.cam.z; vw = W / s; vh = H / s; vx0 = V.cam.x - vw / 2; vy0 = V.cam.y - vh / 2;
      const q = Math.min(0.75, 700 / W), nw = Math.round(W * q), nh = Math.round(H * q);
      if (nw !== cw || nh !== ch) { cw = add.width = lc.width = nw; ch = add.height = lc.height = nh; }
      sc = cw / vw;
      add.style.transform = `translate(${vx0.toFixed(1)}px,${vy0.toFixed(1)}px) scale(${(vw / cw).toFixed(5)})`;
      // A6 별을 되찾을수록 별똥별이 자주, 8개면 새벽빛
      const stars = (G.st && G.st.stars) || 0;
      dawn += ((stars >= 8 ? 1 : 0) - dawn) * Math.min(1, dt * 1.5);
      const nn = V.el.closest('.light') ? 0 : NIGHT * (1 - dawn * 0.6);
      if (Math.abs(nn - V.night) > 0.002 || nightEl.style.opacity === '') { V.night = nn; nightEl.style.opacity = nn.toFixed(3); }
      // A4 구역 색 번짐 알아채기
      const cur = {}; for (const z of MOOD.zones) cur[z.id] = (V.alpha[z.id] || 0) * Math.min(1, V.grow[z.id] ?? 1);
      if (prevA) for (const z of MOOD.zones) { const d = cur[z.id] - prevA[z.id]; if (d > 0.0005 && d < 0.2 && !(z.fxT > T - 8)) { z.fxT = T; reveals.push({ c: z.center, R: Math.max(z.r[0], z.r[1]) * 1.2, t: 0, dur: 3.2 }); if (!rm) for (let i = 0; i < 46; i++) { const a = Math.random() * 6.28, v = rnd(60, 220); burst.push({ x: z.center[0], y: z.center[1] - 40, vx: Math.cos(a) * v, vy: Math.sin(a) * v * 0.6, t: 0, life: rnd(4, 6), ph: rnd(0, 6) }); } } }
      prevA = cur;
      for (let i = reveals.length - 1; i >= 0; i--) { reveals[i].t += dt; if (reveals[i].t > reveals[i].dur + 1) reveals.splice(i, 1); }

      // ---- 빛 ----
      ac.setTransform(1, 0, 0, 1, 0, 0); ac.globalAlpha = 1; ac.globalCompositeOperation = 'source-over'; ac.clearRect(0, 0, cw, ch);
      ac.setTransform(sc, 0, 0, sc, -vx0 * sc, -vy0 * sc); ac.globalCompositeOperation = 'lighter';
      const dark = V.night > 0;
      lx.setTransform(1, 0, 0, 1, 0, 0); lx.globalAlpha = 1; lx.globalCompositeOperation = 'source-over'; lx.clearRect(0, 0, cw, ch);
      lx.setTransform(sc, 0, 0, sc, -vx0 * sc, -vy0 * sc); lx.globalCompositeOperation = 'lighter';
      if (dark) {
        // 가로등 바닥빛 (살짝 흔들림)
        const gl = glow(255, 190, 110), gb = glow(255, 236, 190);
        for (const l of V.lamps) {
          if (!l.el.classList.contains('on')) continue; const [x, y] = l.def.at; if (!inView(x, y, 260)) continue;
          const lf = litF(x, y); if (lf <= 0) continue;
          const fl = rm ? 0.92 : 0.9 + Math.sin(T * 3 + x) * 0.05 + Math.sin(T * 7.3 + y) * 0.03, R = 230 * fl;
          lx.globalAlpha = 0.32 * lf; lx.drawImage(gl, x - R, y + 60 - R * 0.62, R * 2, R * 1.24);
          lx.globalAlpha = 0.7 * lf; lx.drawImage(gb, x - 46 * fl, y - 4 - 46 * fl, 92 * fl, 92 * fl);
        }
        // 창문 불빛: 색이 돌아온 곳만
        const gw = glow(255, 190, 100);
        D.windows.forEach(([x, y], i) => {
          if (!inView(x, y, 30)) return;
          const on = V.colorAlphaAt(x, y) * litF(x, y) * (rm ? 0.85 : 0.75 + 0.25 * Math.sin(T * 0.7 + i * 1.7)); if (on < 0.02) return;
          lx.globalAlpha = 0.8 * on; lx.drawImage(gw, x - 26, y - 26, 52, 52);
        });
        // 루미 빛
        const lu = V.fxLumi && V.fxLumi();
        if (lu && inView(lu.x, lu.y, 190)) { lx.globalAlpha = 0.45; lx.drawImage(glow(255, 236, 160), lu.x - 190, lu.y - 190, 380, 380); }
      }
      ac.setTransform(1, 0, 0, 1, 0, 0); ac.globalAlpha = 1; ac.drawImage(lc, 0, 0); ac.setTransform(sc, 0, 0, sc, -vx0 * sc, -vy0 * sc);
      if (!rm) {
        // 물 반짝임
        ac.fillStyle = 'rgb(220,235,255)';
        D.water.forEach(([x, y], i) => { if (!inView(x, y, 10)) return; const a = Math.max(0, Math.sin(T * 2.2 + i * 2.39)) ** 8; if (a < 0.02) return; ac.globalAlpha = a * 0.9; ac.fillRect(x - 3, y, 7, 2); ac.fillRect(x, y - 2, 1, 6); });
        // A5 강물 물결 (오른쪽으로 흘러감)
        if (D.water.length) {
          ripT -= dt; let n = 0;
          while (ripT < 0 && n++ < 6) { ripT += 0.06; const p = D.water[Math.floor(Math.random() * D.water.length)]; if (inView(p[0], p[1], 40)) ripples.push({ x: p[0], y: p[1], t: 0, life: rnd(2.6, 4.1), w: rnd(10, 26) }); }
          if (ripT < 0) ripT = 0;
          ac.lineCap = 'round'; ac.lineWidth = 2; ac.strokeStyle = 'rgb(205,226,255)';
          for (let i = ripples.length - 1; i >= 0; i--) { const r = ripples[i]; r.t += dt; r.x += dt * 16; r.y += dt * 2.5; if (r.t > r.life) { ripples.splice(i, 1); continue; } ac.globalAlpha = Math.sin(r.t / r.life * Math.PI) * 0.55; ac.beginPath(); ac.moveTo(r.x - r.w / 2, r.y); ac.quadraticCurveTo(r.x, r.y - 3, r.x + r.w / 2, r.y); ac.stroke(); }
        }
        // 반딧불 (마을이 살아날수록 많이), 보이는 곳 풀밭에서
        const nf = 6 + stg * 4;
        while (flies.length < nf) { const p = greenIn(); if (!p) break; flies.push({ x: p[0], y: p[1] - 30, a: rnd(0, 6.28), s: rnd(0.3, 0.8), ph: rnd(0, 6) }); }
        if (flies.length > nf) flies.length = nf;
        const gf = glow(230, 255, 140);
        for (const f of flies) {
          if (!inView(f.x, f.y, 120)) { const p = greenIn(); if (p) { f.x = p[0]; f.y = p[1] - 30; } }
          f.a += (Math.random() - 0.5) * dt * 3; f.x += Math.cos(f.a) * f.s * 20 * dt; f.y += Math.sin(f.a) * f.s * 14 * dt;
          ac.globalAlpha = 0.9 * (0.5 + 0.5 * Math.sin(T * 2.5 + f.ph)); ac.drawImage(gf, f.x - 14, f.y - 14, 28, 28);
        }
        // A4 퍼지는 반딧불
        for (let i = burst.length - 1; i >= 0; i--) {
          const f = burst[i]; f.t += dt; if (f.t > f.life) { burst.splice(i, 1); continue; }
          const k = Math.exp(-f.t * 1.2); f.x += f.vx * dt * k + Math.sin(T * 2 + f.ph) * 8 * dt; f.y += f.vy * dt * k - 6 * dt;
          ac.globalAlpha = (1 - f.t / f.life) * (0.6 + 0.4 * Math.sin(T * 5 + f.ph)); ac.drawImage(gf, f.x - 16, f.y - 16, 32, 32);
        }
        // 발밑 먼지·풀잎, 루미 별가루
        for (const w of V.walkers) { if (w.frame !== 8 && w.frame !== w.pf && (w.frame === 0 || w.frame === 4) && w.el.style.display !== 'none' && inView(w.x, w.y, 40)) dust(w); w.pf = w.frame; }
        const lu = V.fxLumi && V.fxLumi();
        if (lu) { LU.trail -= dt; const sp = LU.px == null ? 0 : Math.hypot(lu.x - LU.px, lu.y - LU.py) / Math.max(dt, 1e-3); LU.px = lu.x; LU.py = lu.y; if (LU.trail < 0) { LU.trail = sp > 40 ? 0.03 : 0.12; V.fxSpark(lu.x, lu.y + 10); } }
        for (let i = parts.length - 1; i >= 0; i--) {
          const p = parts[i]; p.t += dt; if (p.t > p.life) { parts.splice(i, 1); continue; }
          p.x += p.vx * dt; p.y += p.vy * dt; p.vy += p.g * dt; const a = 1 - p.t / p.life;
          if (p.kind === 'dust') { ac.globalAlpha = a * 0.4; ac.drawImage(glow(225, 210, 185), p.x - 4 - p.t * 14, p.y - 4 - p.t * 14, 8 + p.t * 28, 8 + p.t * 28); }
          else if (p.kind === 'leaf') { ac.globalAlpha = a; ac.fillStyle = p.c; ac.fillRect(p.x - 2, p.y - 2, 4, 3); }
          else { ac.globalAlpha = a * 0.9; ac.fillStyle = 'rgb(255,226,140)'; ac.fillRect(p.x - 1.5, p.y - 1.5, 3, 3); if (a > 0.6) { ac.globalAlpha = (a - 0.6) * 2; ac.fillStyle = 'rgb(255,250,220)'; ac.fillRect(p.x - 0.5, p.y - 3, 1, 7); ac.fillRect(p.x - 3, p.y - 0.5, 7, 1); } }
        }
        // 꽃잎 (마을이 꽤 살아난 뒤)
        const np = stg >= 3 ? (stg - 2) * 6 : 0;
        while (petals.length < np) petals.push({ x: rnd(vx0, vx0 + vw), y: rnd(vy0, vy0 + vh), r: rnd(0, 6.28), v: rnd(0.6, 1.2), c: Math.random() < 0.5 ? 'rgb(246,193,207)' : 'rgb(251,224,230)' });
        if (petals.length > np) petals.length = np;
        ac.globalCompositeOperation = 'source-over';
        for (const p of petals) {
          p.x += dt * 38 * p.v; p.y += dt * 22 * p.v + Math.sin(T * 2 + p.r) * 0.4; p.r += dt * 2;
          if (!inView(p.x, p.y, 40)) { if (Math.random() < 0.5) { p.x = vx0 - 20; p.y = rnd(vy0, vy0 + vh); } else { p.x = rnd(vx0, vx0 + vw); p.y = vy0 - 20; } }
          ac.save(); ac.translate(p.x, p.y); ac.rotate(p.r); ac.scale(1, Math.abs(Math.cos(p.r * 1.3)) * 0.8 + 0.2); ac.globalAlpha = 0.9; ac.fillStyle = p.c; ac.beginPath(); ac.ellipse(0, 0, 5, 3, 0, 0, 7); ac.fill(); ac.restore();
        }
        ac.globalCompositeOperation = 'lighter';
      }
      // ---- 화면 기준: 별똥별, 새벽빛 ----
      ac.setTransform(q, 0, 0, q, 0, 0);
      if (!rm && stars > 0 && dark) {
        shootT -= dt;
        if (shootT < 0) { shootT = Math.max(1.6, 12 - stars * 1.3) * rnd(0.7, 1.3); shoot.push({ x: rnd(0.3, 1.1) * W, y: rnd(-0.03, 0.2) * H, t: 0, life: 1.1 }); }
      }
      for (let i = shoot.length - 1; i >= 0; i--) {
        const p = shoot[i]; p.t += dt; if (p.t > p.life) { shoot.splice(i, 1); continue; }
        const k = p.t / p.life, L = W * 0.32, hx = p.x - k * L, hy = p.y + k * L * 0.58, a = Math.sin(k * Math.PI), tl = W * 0.1;
        const g = ac.createLinearGradient(hx, hy, hx + tl, hy - tl * 0.58); g.addColorStop(0, `rgba(255,250,225,${a.toFixed(3)})`); g.addColorStop(1, 'rgba(255,250,225,0)');
        ac.globalAlpha = 1; ac.strokeStyle = g; ac.lineWidth = 3; ac.beginPath(); ac.moveTo(hx, hy); ac.lineTo(hx + tl, hy - tl * 0.58); ac.stroke();
        ac.fillStyle = `rgba(255,255,240,${a.toFixed(3)})`; ac.beginPath(); ac.arc(hx, hy, 3, 0, 7); ac.fill();
      }
      if (dawn > 0.01) { const g = ac.createLinearGradient(0, 0, W * 0.62, H); g.addColorStop(0, `rgba(255,170,130,${(0.3 * dawn).toFixed(3)})`); g.addColorStop(0.5, `rgba(255,150,170,${(0.12 * dawn).toFixed(3)})`); g.addColorStop(1, 'rgba(255,150,170,0)'); ac.globalAlpha = 1; ac.fillStyle = g; ac.fillRect(0, 0, W, H); }
      ac.globalAlpha = 1; ac.globalCompositeOperation = 'source-over';

      // ---- 인물 빛 받기 (0.2초마다), 가려진 조각은 구름이 지나가니 가끔 다시 ----
      litT -= dt; if (litT < 0) { litT = 0.2; for (const w of V.walkers) { relight(w); if (w.hid) V.occDirty(w); } }   // 가려진 조각도 빛·구름이 바뀌니 다시
      // A3 물소리: 주인공이 물가에 가까울수록 크게
      sndT -= dt;
      if (sndT < 0 && V.fxHero && G.audio.ambientLevel) {
        sndT = 0.25; const h = V.fxHero; let m = 1e9;
        for (const [x, y] of D.water) { const d = Math.hypot(x - h.x, y - h.y); if (d < m) m = d; }
        G.audio.ambientLevel('amb_fountain', Math.max(0, Math.min(1, 1 - (m - 80) / 420)) * 0.7);
      }
    });
  }
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
    G.el('div', 't-help', p, '게임은 잠시 멈춰 있어요. ' + (G.st ? `지금 칸: ${G.st.slot}번${G.st.name ? ' (' + G.save.esc(G.st.name) + ')' : ''}` : '아직 칸을 고르지 않았어요.'));

    // 빠르게 모드 (9/30 선생님 요청, 청선별GO처럼): 대화·연출·걷기를 바로 넘길 수 있게
    let s = sec(p, '빠르게 모드 (선생님 확인·시연용)');
    choice(s, 'fast', [[false, '끄기'], [true, '켜기']]);
    G.el('div', 't-note', s, '켜면 음성이 끝나기 전에도 [다음]을 누를 수 있고, 연출은 처음부터 [건너뛰기]가 보이며, 지도에서 걷기는 바로 도착해요. 선택지는 한 번 누르면 골라져요. 학생이 할 때는 꺼 주세요.');

    // 난이도 (9/30 선생님 요청): 반마다 고름
    s = sec(p, '난이도');
    choice(s, 'level', [['easy', '쉽게'], ['normal', '보통'], ['hard', '어렵게']]);
    G.el('div', 't-note', s, '쉽게: 이름표 4개, 누르면 이름을 읽어 줌. 보통: 이름표 5개, 카드와 모양을 비교해야 함, 도서관에서 촉각 지도를 찾음. 어렵게: 이름표 6개, 도움 화살표 없음.');

    s = sec(p, '1. 음성과 음량');
    let r = row(s);
    tb(G.settings.voiceOn ? '음성 켜짐' : '음성 꺼짐', r, () => set('voiceOn', !G.settings.voiceOn), G.settings.voiceOn ? 'on' : '');
    const lab = G.el('label', '', r, '음량 '); const rg = G.el('input', '', lab); rg.type = 'range'; rg.min = 0; rg.max = 100; rg.value = Math.round(G.settings.volume * 100);
    const vv = G.el('span', '', lab, rg.value + '%');
    rg.addEventListener('input', () => { G.settings.volume = rg.value / 100; vv.textContent = rg.value + '%'; G.applySettings(); });

    s = sec(p, '2. 글자 크기');
    choice(s, 'textBig', [[false, '보통'], [true, '크게']]);

    s = sec(p, '3. 도움 시간 (루미가 알려 주기까지)');
    choice(s, 'help', [['short', '짧게 5, 10, 15초'], ['normal', '보통 10, 15, 20초'], ['long', '길게 10, 20, 30초'], ['off', '끄기']]);
    G.el('div', 't-note', s, '1단계 질문, 2단계 화살표, 3단계 반짝이는 길. [루미] 버튼을 누르면 바로 3단계.');

    s = sec(p, '4. 선택지 누르기');
    choice(s, 'choiceOne', [[false, '두 번 누르면 선택 (읽어 주고 확인)'], [true, '한 번 누르면 선택']]);

    s = sec(p, '5. 챕터 바로 가기');
    if (!T.chOpen) {   // 10/9 선생님: 챕터 바로 가기는 비밀번호(처음 881111)를 넣어야 열림, 한 번 열면 게임을 다시 켤 때까지 열려 있음
      r = row(s);
      const pw = G.el('input', '', r); pw.type = 'password'; pw.inputMode = 'numeric'; pw.autocomplete = 'off'; pw.placeholder = '비밀번호';
      pw.style.cssText = 'font:inherit;font-size:22px;width:8em;padding:6px 12px;border-radius:12px;border:2px solid #b9a27a';
      const msg = G.el('span', 't-note', r, '');
      const go = () => { if (pw.value === String(G.store.get('teacherPw', '881111'))) { T.chOpen = true; render(); } else { pw.value = ''; msg.textContent = '비밀번호가 달라요.'; pw.focus(); } };
      pw.addEventListener('keydown', (e) => { if (e.key !== 'Escape') e.stopPropagation(); if (e.key === 'Enter') go(); });
      r.insertBefore(tb('열기', r, go), msg);
      G.el('div', 't-note', s, '교사용 비밀번호를 넣으면 열려요.');
    } else {
      r = row(s);
      for (const ch of G.D.story.chapters) {
        const b = tb(ch.label, r, () => confirmJump(s, ch));   // 10/8 검토: 바로 가기는 지금 칸을 덮어쓰므로 한 번 더 묻고, 바뀌기 전 진행을 보관
        if (!ch.ready || !G.st) b.disabled = true;
      }
      if (G.p4) { r = row(s); const b = tb('이 퍼즐 바로 풀기', r, () => T.close(() => G.p4.skip())); if (!G.p4.can()) b.disabled = true; }   // 10/1 프로토타입 4: 지금 하는 퍼즐·자물쇠를 바로 풂
      const bak = G.st && G.store.get('slot' + G.st.slot + '_bak', null);
      if (bak) { r = row(s); tb('바로 가기 전으로 되돌리기', r, () => { G.store.set('slot' + bak.slot, bak); G.store.del('slot' + bak.slot + '_bak'); try { sessionStorage.setItem('bs_play', String(bak.slot)); } catch (_) { } location.reload(); }); }
      G.el('div', 't-note', s, G.st ? '고른 곳 앞까지의 할 일, 아이템, 마을 단계가 채워진 채로 시작해요.' : '먼저 저장 칸 번호를 고른 뒤에 쓸 수 있어요.');
    }

    s = sec(p, '6. 연출');
    r = row(s); G.el('span', '', r, '다시 보기:');
    for (const [id, label] of [['C1', 'C1 인트로'], ['C2', 'C2 광장 도착'], ['C4', 'C4 도서관 도착'], ['C8', 'C8 점자 길 빛남'], ['C7', 'C7 장소 완료']]) tb(label, r, () => T.close(() => { if (!G.cut.active) G.cut.play(id, { replay: true }); }));
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

    s = sec(p, '8-2. 두 사람 모드');   // 10/9 수정안 3단계: 전자칠판 앞 두 학생이 나눠 풀기
    if (G.settings.duo === undefined) G.settings.duo = false;
    choice(s, 'duo', [[false, '끄기'], [true, '켜기 (두 학생이 나눠 풀기: 언덕길, 게시판)']]);

    s = sec(p, '9. 화면');
    r = row(s);
    const fsOn = !!(document.fullscreenElement || document.webkitFullscreenElement);
    tb(fsOn ? '전체 화면 끄기' : '전체 화면', r, () => { wantFs = false; fsOff = fsOn; fullscreen(!fsOn).then(render); });
    G.el('div', 't-note', s, '전체 화면에서는 ESC를 한 번 더 눌러야 이 설정이 열려요 (브라우저 규칙). 아이폰은 “홈 화면에 추가”로 쓰면 전체 화면이 돼요.');
    const pn = layer.querySelector('.t-panel'); if (pn) pn.scrollTop = scroll;
  }
  function confirmJump(s, ch) {
    const box = G.el('div', 't-row', s);
    box.style.cssText = 'background:#fde9e2;border-radius:14px;padding:8px 12px';
    G.el('span', '', box, `${G.st.slot}번 칸의 진행이 「${ch.label}」로 바뀌어요. 지금 진행은 보관해 두니 [바로 가기 전으로 되돌리기]로 돌아올 수 있어요.`);
    tb('바로 가기', box, () => { G.store.set('slot' + G.st.slot + '_bak', JSON.parse(JSON.stringify(G.st))); T.close(() => G.flow.chapter(ch.id)); }, 'warn');
    tb('그만두기', box, () => box.remove());
    box.scrollIntoView && box.scrollIntoView({ block: 'nearest' });
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
  // 10/6 선생님: 최종본 전까지 표지(책 펴기) 화면에서만 오른쪽 아래에 최종 수정 일시를 작게 (개발자 확인용, 책을 펴면 사라짐)
  if (G.BUILT && !/__/.test(G.BUILT)) G.el('div', 'tb-ver', t, '최종 수정 ' + G.BUILT);
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

  // 10/6 선생님: 제목은 한 글자씩 왼쪽 위에서 오른쪽 아래로 스르륵 + 작은 별빛이 글자 길을 따라 지나감 (붓 순서 방식은 글씨가 잘려 보여서 바꿈)
  const CUTS = [0, 226, 410, 600, 790, 955, 1121];   // title_brush.png 글자 나눔(가로 위치)
  const STAR = '<svg viewBox="0 0 100 100"><path d="M50 4 C54 38 62 46 96 50 C62 54 54 62 50 96 C46 62 38 54 4 50 C38 46 46 38 50 4 Z" fill="#FFFDF2" stroke="#FFD66B" stroke-width="5" stroke-linejoin="round"/></svg>';
  const dust = (x, y) => { const e = G.el('div', 'tb-dust', stage); e.style.left = x + 'px'; e.style.top = y + 'px';
    const dx = (Math.random() - .5) * 40, dy = 25 + Math.random() * 55;
    e.animate([{ opacity: 1, transform: 'translate(0,0) scale(1.2)' }, { opacity: 0, transform: `translate(${dx}px,${dy}px) scale(.4)` }], { duration: (900 + Math.random() * 600) * k, easing: 'linear', fill: 'both' }).finished.then(() => e.remove(), () => e.remove()); };
  const letterIn = async (r, b, gap, each) => {
    await prep(b); if (!alive(r)) return;
    const w = b.cv.width, h = b.cv.height, c = b.c, f = b.full && b.full.data;
    const L = CUTS.slice(0, -1).map((x0, i) => { const x1 = Math.min(w, CUTS[i + 1]); let y0 = 0, y1 = h;
      if (f) { y0 = h; y1 = 0; for (let y = 0; y < h; y++) for (let x = x0; x < x1; x++) if (f[(y * w + x) * 4 + 3] > 20) { if (y < y0) y0 = y; y1 = y + 1; break; } if (y1 <= y0) { y0 = 0; y1 = h; } }
      return { x0, x1, y0, y1, last: 0 }; });
    const tc = document.createElement('canvas'); tc.width = w; tc.height = h; const x = tc.getContext('2d');
    const ox = parseFloat(b.cv.style.left), oy = () => parseFloat(b.cv.style.top), BAND = .35, total = (gap * (L.length - 1) + each) * k, t0 = performance.now();
    await new Promise(res => { const step = () => {
      if (!alive(r)) { L.forEach(l => l.sp && l.sp.remove()); return res(); }
      const el = (performance.now() - t0) / 1000; c.clearRect(0, 0, w, h);
      L.forEach((l, i) => { const u = Math.min(1, Math.max(0, (el - i * gap * k) / (each * k))); if (u <= 0) return;
        const bw = l.x1 - l.x0, e = u < .5 ? 2 * u * u : 1 - 2 * (1 - u) * (1 - u);
        if (u >= 1) { c.drawImage(b.ink, l.x0, 0, bw, h, l.x0, 0, bw, h); if (l.sp) { l.sp.remove(); l.sp = null; } return; }
        const s = e * (1 + BAND), P = (q) => [l.x0 + bw * q, l.y0 + (l.y1 - l.y0) * q], A = P(s - BAND), B = P(s);
        x.globalCompositeOperation = 'source-over'; x.clearRect(l.x0, 0, bw, h); x.drawImage(b.ink, l.x0, 0, bw, h, l.x0, 0, bw, h);
        const g = x.createLinearGradient(A[0], A[1], B[0], B[1]); g.addColorStop(0, '#000'); g.addColorStop(1, 'rgba(0,0,0,0)');
        x.globalCompositeOperation = 'destination-in'; x.fillStyle = g; x.fillRect(l.x0, 0, bw, h); x.globalCompositeOperation = 'source-over';
        c.drawImage(tc, l.x0, 0, bw, h, l.x0, 0, bw, h);
        // 작은 별빛: 글자 상자의 왼쪽 위에서 오른쪽 아래로
        if (!l.sp) { l.sp = G.el('div', 'tb-spark', stage); l.sp.innerHTML = STAR; }
        const [px, py] = P(.05 + .9 * e), sx = ox + px, sy = oy() + py;
        l.sp.style.left = sx + 'px'; l.sp.style.top = sy + 'px'; l.sp.style.opacity = u < .15 ? u / .15 : u > .85 ? (1 - u) / .15 : 1;
        l.sp.style.transform = `rotate(${u * 180}deg) scale(${.7 + .5 * Math.sin(u * Math.PI)})`;
        if (u - l.last > .08) { l.last = u; dust(sx, sy); } });
      if (el < total) requestAnimationFrame(step); else { L.forEach(l => l.sp && l.sp.remove()); c.drawImage(b.ink, 0, 0, w, h); res(); }
    }; requestAnimationFrame(step); });
  };

  // 부제목: 왼쪽에서 오른쪽으로 부드럽게 (10/6 시안 2번과 같이)
  const wipeIn = async (r, b, dur) => {
    await prep(b); if (!alive(r)) return; const w = b.cv.width, h = b.cv.height, c = b.c, t0 = performance.now();
    await new Promise(res => { const step = () => {
      if (!alive(r)) return res(); const u = Math.min(1, (performance.now() - t0) / 1000 / (dur * k)), e = (u < .5 ? 2 * u * u : 1 - 2 * (1 - u) * (1 - u)) * 1.25;
      c.globalCompositeOperation = 'source-over'; c.clearRect(0, 0, w, h); c.drawImage(b.ink, 0, 0, w, h);
      const g = c.createLinearGradient(w * (e - .25), 0, w * e, 0); g.addColorStop(0, '#000'); g.addColorStop(1, 'rgba(0,0,0,0)');
      c.globalCompositeOperation = 'destination-in'; c.fillStyle = g; c.fillRect(0, 0, w, h); c.globalCompositeOperation = 'source-over';
      if (u < 1) requestAnimationFrame(step); else { c.clearRect(0, 0, w, h); c.drawImage(b.ink, 0, 0, w, h); res(); }
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
    await letterIn(r, T1, .32, .95); if (!alive(r)) return;
    G.audio.voice('S92_title');
    await wipeIn(r, T2, 1.4); if (!alive(r)) return;
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
G.VERSION = '별의 스펙트럼 (2026-10-11)';
G.BUILT = '2026-10-11 07:11';   // 10/6 선생님: 최종본 전까지 표지 오른쪽 아래에 최종 수정 일시 (개발자 확인용)   // 10/4: 날짜는 build.py가 만든 날로 바꿈
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
    await G.map.lumiArrive({ catchMe: true });
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
    if (id === 'library') {   // 10/7 길의 별 줄이기: 광장까지 끝, 점자 쪽지와 마을 지도를 가진 채로 도서관 앞
      st.done.push('plaza_intro', 'plaza_chief', 'plaza_board', 'plaza_post', 'plaza_post_ask', 'letter_1', 'letter_2', 'letter_3', 'note_got');
      st.cleared.push('plaza'); st.items.push('note', 'map');
      st.seenCutscenes.push('C2', 'C7'); st.visited.push('plaza'); st.mood = 2; st.quest = 1; st.place = 'plaza';
      st.seen.push('plaza:chief', 'plaza:board', 'plaza:post');
      G.save.write(); return F.resume();
    }
    // 9/30 프로토타입 3: 숲 앞(도서관까지 끝) / 두 번째 광장 앞(숲까지 끝) / 엔딩(별을 올린 뒤)
    const lib = () => {
      st.done.push('plaza_intro', 'plaza_chief', 'plaza_board', 'plaza_post', 'library_intro', 'library_haesol', 'library_tactile', 'library_puzzle', 'plaza_post_ask', 'letter_1', 'letter_2', 'letter_3', 'libdoor_seen', 'libdoor_open', 'note_got');
      st.cleared.push('plaza', 'library'); st.items.push('note', 'map', 'tactile');
      st.seenCutscenes.push('C2', 'C4', 'C7', 'C8'); st.visited.push('plaza', 'library'); st.mood = 3; st.quest = 3; st.place = 'library';
      st.seen.push('plaza:chief', 'plaza:board', 'plaza:post', 'library:haesol', 'library:tactile');
    };
    const forest = () => {
      lib(); st.done.push('forest_intro', 'forest_wind', 'forest_star', 'forest_daon'); st.cleared.push('forest'); st.items.push('piece');
      st.seenCutscenes.push('C5'); if ((st.dust || []).length < 5) st.dust = ['plaza:0', 'plaza:h:fountain', 'library:0', 'map:v2', 'map:v3']; st.visited.push('forest'); st.mood = 4; st.quest = 4; st.place = 'forest'; st.seen.push('forest:bushB', 'forest:shine', 'forest:daon');
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
  G.settings.fast = false;   // 10/6 선생님: 게임을 켤 때마다 빠르게 모드는 꺼진 채로 시작 (켜면 이번 판에서만)
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
