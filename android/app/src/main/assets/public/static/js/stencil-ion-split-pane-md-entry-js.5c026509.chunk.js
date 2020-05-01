(this["webpackJsonpphoto-gallery"]=this["webpackJsonpphoto-gallery"]||[]).push([[41],{177:function(i,e,t){"use strict";t.r(e),t.d(e,"ion_split_pane",(function(){return r}));var s=t(19),n=t(7),l=t(8),o=t(20),a=t(16),d={xs:"(min-width: 0px)",sm:"(min-width: 576px)",md:"(min-width: 768px)",lg:"(min-width: 992px)",xl:"(min-width: 1200px)",never:""},r=function(){function i(e){Object(n.a)(this,i),Object(o.l)(this,e),this.visible=!1,this.disabled=!1,this.when=d.lg,this.ionSplitPaneVisible=Object(o.f)(this,"ionSplitPaneVisible",7)}return Object(l.a)(i,[{key:"visibleChanged",value:function(i){var e={visible:i,isPane:this.isPane.bind(this)};this.ionSplitPaneVisible.emit(e)}},{key:"connectedCallback",value:function(){this.styleChildren(),this.updateState()}},{key:"disconnectedCallback",value:function(){this.rmL&&(this.rmL(),this.rmL=void 0)}},{key:"updateState",value:function(){var i=this;if(this.rmL&&(this.rmL(),this.rmL=void 0),this.disabled)this.visible=!1;else{var e=this.when;if("boolean"!==typeof e){var t=d[e]||e;if(0!==t.length){if(window.matchMedia){var s=function(e){i.visible=e.matches},n=window.matchMedia(t);n.addListener(s),this.rmL=function(){return n.removeListener(s)},this.visible=n.matches}}else this.visible=!1}else this.visible=e}}},{key:"isPane",value:function(i){return!!this.visible&&(i.parentElement===this.el&&i.classList.contains("split-pane-side"))}},{key:"styleChildren",value:function(){for(var i=this.contentId,e=this.el.children,t=this.el.childElementCount,s=!1,n=0;n<t;n++){var l=e[n],o=void 0!==i&&l.id===i;if(o){if(s)return void console.warn("split pane cannot have more than one main node");s=!0}p(l,o)}s||console.warn("split pane does not have a specified main node")}},{key:"render",value:function(){var i,e=Object(a.b)(this);return Object(o.j)(o.b,{class:(i={},Object(s.a)(i,e,!0),Object(s.a)(i,"split-pane-".concat(e),!0),Object(s.a)(i,"split-pane-visible",this.visible),i)},Object(o.j)("slot",null))}},{key:"el",get:function(){return Object(o.g)(this)}}],[{key:"watchers",get:function(){return{visible:["visibleChanged"],disabled:["updateState"],when:["updateState"]}}}]),i}(),p=function(i,e){var t,s;e?(t="split-pane-main",s="split-pane-side"):(t="split-pane-side",s="split-pane-main");var n=i.classList;n.add(t),n.remove(s)};r.style={ios:":host{--side-width:100%;left:0;right:0;top:0;bottom:0;display:-ms-flexbox;display:flex;position:absolute;-ms-flex-direction:row;flex-direction:row;-ms-flex-wrap:nowrap;flex-wrap:nowrap;contain:strict}::slotted(ion-menu.menu-pane-visible){-ms-flex:0 1 auto;flex:0 1 auto;width:var(--side-width);min-width:var(--side-min-width);max-width:var(--side-max-width)}:host(.split-pane-visible) ::slotted(.split-pane-side),:host(.split-pane-visible) ::slotted(.split-pane-main){left:0;right:0;top:0;bottom:0;position:relative;-webkit-box-shadow:none !important;box-shadow:none !important;z-index:0}:host(.split-pane-visible) ::slotted(.split-pane-main){-ms-flex:1;flex:1}:host(.split-pane-visible) ::slotted(.split-pane-side:not(ion-menu)),:host(.split-pane-visible) ::slotted(ion-menu.split-pane-side.menu-enabled){display:-ms-flexbox;display:flex;-ms-flex-negative:0;flex-shrink:0}::slotted(.split-pane-side:not(ion-menu)){display:none}:host(.split-pane-visible) ::slotted(.split-pane-side){-ms-flex-order:-1;order:-1}:host(.split-pane-visible) ::slotted(.split-pane-side[side=end]){-ms-flex-order:1;order:1}:host{--border:0.55px solid var(--ion-item-border-color, var(--ion-border-color, var(--ion-color-step-250, #c8c7cc)));--side-min-width:270px;--side-max-width:28%}:host(.split-pane-visible) ::slotted(.split-pane-side){min-width:var(--side-min-width);max-width:var(--side-max-width);border-right:var(--border);border-left:0}:host(.split-pane-visible) ::slotted(.split-pane-side[side=end]){min-width:var(--side-min-width);max-width:var(--side-max-width);border-right:0;border-left:var(--border)}",md:":host{--side-width:100%;left:0;right:0;top:0;bottom:0;display:-ms-flexbox;display:flex;position:absolute;-ms-flex-direction:row;flex-direction:row;-ms-flex-wrap:nowrap;flex-wrap:nowrap;contain:strict}::slotted(ion-menu.menu-pane-visible){-ms-flex:0 1 auto;flex:0 1 auto;width:var(--side-width);min-width:var(--side-min-width);max-width:var(--side-max-width)}:host(.split-pane-visible) ::slotted(.split-pane-side),:host(.split-pane-visible) ::slotted(.split-pane-main){left:0;right:0;top:0;bottom:0;position:relative;-webkit-box-shadow:none !important;box-shadow:none !important;z-index:0}:host(.split-pane-visible) ::slotted(.split-pane-main){-ms-flex:1;flex:1}:host(.split-pane-visible) ::slotted(.split-pane-side:not(ion-menu)),:host(.split-pane-visible) ::slotted(ion-menu.split-pane-side.menu-enabled){display:-ms-flexbox;display:flex;-ms-flex-negative:0;flex-shrink:0}::slotted(.split-pane-side:not(ion-menu)){display:none}:host(.split-pane-visible) ::slotted(.split-pane-side){-ms-flex-order:-1;order:-1}:host(.split-pane-visible) ::slotted(.split-pane-side[side=end]){-ms-flex-order:1;order:1}:host{--border:1px solid var(--ion-item-border-color, var(--ion-border-color, var(--ion-color-step-150, rgba(0, 0, 0, 0.13))));--side-min-width:270px;--side-max-width:28%}:host(.split-pane-visible) ::slotted(.split-pane-side){min-width:var(--side-min-width);max-width:var(--side-max-width);border-right:var(--border);border-left:0}:host(.split-pane-visible) ::slotted(.split-pane-side[side=end]){min-width:var(--side-min-width);max-width:var(--side-max-width);border-right:0;border-left:var(--border)}"}}}]);
//# sourceMappingURL=stencil-ion-split-pane-md-entry-js.5c026509.chunk.js.map