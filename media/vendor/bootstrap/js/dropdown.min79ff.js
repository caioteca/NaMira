import{P as Popper,c as createPopper}from"./popper.min.js?5.2.3";import{c as isRTL,E as EventHandler,d as defineJQueryPlugin,B as BaseComponent,S as SelectorEngine,j as isDisabled,n as noop,M as Manipulator,k as isElement,h as getElement,i as isVisible,b as getNextActiveElement}from"./dom.min.js?5.2.3";const NAME="dropdown",DATA_KEY="bs.dropdown",EVENT_KEY=`.${DATA_KEY}`,DATA_API_KEY=".data-api",ESCAPE_KEY="Escape",TAB_KEY="Tab",ARROW_UP_KEY="ArrowUp",ARROW_DOWN_KEY="ArrowDown",RIGHT_MOUSE_BUTTON=2,EVENT_HIDE=`hide${EVENT_KEY}`,EVENT_HIDDEN=`hidden${EVENT_KEY}`,EVENT_SHOW=`show${EVENT_KEY}`,EVENT_SHOWN=`shown${EVENT_KEY}`,EVENT_CLICK_DATA_API=`click${EVENT_KEY}.data-api`,EVENT_KEYDOWN_DATA_API=`keydown${EVENT_KEY}.data-api`,EVENT_KEYUP_DATA_API=`keyup${EVENT_KEY}.data-api`,CLASS_NAME_SHOW="show",CLASS_NAME_DROPUP="dropup",CLASS_NAME_DROPEND="dropend",CLASS_NAME_DROPSTART="dropstart",CLASS_NAME_DROPUP_CENTER="dropup-center",CLASS_NAME_DROPDOWN_CENTER="dropdown-center",SELECTOR_DATA_TOGGLE='[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)',SELECTOR_DATA_TOGGLE_SHOWN=`${SELECTOR_DATA_TOGGLE}.show`,SELECTOR_MENU=".dropdown-menu",SELECTOR_NAVBAR=".navbar",SELECTOR_NAVBAR_NAV=".navbar-nav",SELECTOR_VISIBLE_ITEMS=".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)",PLACEMENT_TOP=isRTL()?"top-end":"top-start",PLACEMENT_TOPEND=isRTL()?"top-start":"top-end",PLACEMENT_BOTTOM=isRTL()?"bottom-end":"bottom-start",PLACEMENT_BOTTOMEND=isRTL()?"bottom-start":"bottom-end",PLACEMENT_RIGHT=isRTL()?"left-start":"right-start",PLACEMENT_LEFT=isRTL()?"right-start":"left-start",PLACEMENT_TOPCENTER="top",PLACEMENT_BOTTOMCENTER="bottom",Default={autoClose:!0,boundary:"clippingParents",display:"dynamic",offset:[0,2],popperConfig:null,reference:"toggle"},DefaultType={autoClose:"(boolean|string)",boundary:"(string|element)",display:"string",offset:"(array|string|function)",popperConfig:"(null|object|function)",reference:"(string|element|object)"};class Dropdown extends BaseComponent{constructor(e,t){super(e,t),this._popper=null,this._parent=this._element.parentNode,this._menu=SelectorEngine.next(this._element,SELECTOR_MENU)[0]||SelectorEngine.prev(this._element,SELECTOR_MENU)[0]||SelectorEngine.findOne(SELECTOR_MENU,this._parent),this._inNavbar=this._detectNavbar()}static get Default(){return Default}static get DefaultType(){return DefaultType}static get NAME(){return NAME}toggle(){return this._isShown()?this.hide():this.show()}show(){if(isDisabled(this._element)||this._isShown())return;const e={relatedTarget:this._element};if(!EventHandler.trigger(this._element,EVENT_SHOW,e).defaultPrevented){if(this._createPopper(),"ontouchstart"in document.documentElement&&!this._parent.closest(".navbar-nav"))for(const e of[].concat(...document.body.children))EventHandler.on(e,"mouseover",noop);this._element.focus(),this._element.setAttribute("aria-expanded",!0),this._menu.classList.add("show"),this._element.classList.add("show"),EventHandler.trigger(this._element,EVENT_SHOWN,e)}}hide(){if(isDisabled(this._element)||!this._isShown())return;const e={relatedTarget:this._element};this._completeHide(e)}dispose(){this._popper&&this._popper.destroy(),super.dispose()}update(){this._inNavbar=this._detectNavbar(),this._popper&&this._popper.update()}_completeHide(e){if(!EventHandler.trigger(this._element,EVENT_HIDE,e).defaultPrevented){if("ontouchstart"in document.documentElement)for(const e of[].concat(...document.body.children))EventHandler.off(e,"mouseover",noop);this._popper&&this._popper.destroy(),this._menu.classList.remove("show"),this._element.classList.remove("show"),this._element.setAttribute("aria-expanded","false"),Manipulator.removeDataAttribute(this._menu,"popper"),EventHandler.trigger(this._element,EVENT_HIDDEN,e)}}_getConfig(e){if("object"==typeof(e=super._getConfig(e)).reference&&!isElement(e.reference)&&"function"!=typeof e.reference.getBoundingClientRect)throw new TypeError(`${NAME.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);return e}_createPopper(){if(void 0===Popper)throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");let e=this._element;"parent"===this._config.reference?e=this._parent:isElement(this._config.reference)?e=getElement(this._config.reference):"object"==typeof this._config.reference&&(e=this._config.reference);const t=this._getPopperConfig();this._popper=createPopper(e,this._menu,t)}_isShown(){return this._menu.classList.contains("show")}_getPlacement(){const e=this._parent;if(e.classList.contains("dropend"))return PLACEMENT_RIGHT;if(e.classList.contains("dropstart"))return PLACEMENT_LEFT;if(e.classList.contains("dropup-center"))return"top";if(e.classList.contains("dropdown-center"))return"bottom";const t="end"===getComputedStyle(this._menu).getPropertyValue("--bs-position").trim();return e.classList.contains("dropup")?t?PLACEMENT_TOPEND:PLACEMENT_TOP:t?PLACEMENT_BOTTOMEND:PLACEMENT_BOTTOM}_detectNavbar(){return null!==this._element.closest(".navbar")}_getOffset(){const{offset:e}=this._config;return"string"==typeof e?e.split(",").map((e=>Number.parseInt(e,10))):"function"==typeof e?t=>e(t,this._element):e}_getPopperConfig(){const e={placement:this._getPlacement(),modifiers:[{name:"preventOverflow",options:{boundary:this._config.boundary}},{name:"offset",options:{offset:this._getOffset()}}]};return(this._inNavbar||"static"===this._config.display)&&(Manipulator.setDataAttribute(this._menu,"popper","static"),e.modifiers=[{name:"applyStyles",enabled:!1}]),{...e,..."function"==typeof this._config.popperConfig?this._config.popperConfig(e):this._config.popperConfig}}_selectMenuItem(e){let{key:t,target:n}=e;const o=SelectorEngine.find(SELECTOR_VISIBLE_ITEMS,this._menu).filter((e=>isVisible(e)));o.length&&getNextActiveElement(o,n,t===ARROW_DOWN_KEY,!o.includes(n)).focus()}static jQueryInterface(e){return this.each((function(){const t=Dropdown.getOrCreateInstance(this,e);if("string"==typeof e){if(void 0===t[e])throw new TypeError(`No method named "${e}"`);t[e]()}}))}static clearMenus(e){if(2===e.button||"keyup"===e.type&&"Tab"!==e.key)return;const t=SelectorEngine.find(SELECTOR_DATA_TOGGLE_SHOWN);for(const n of t){const t=Dropdown.getInstance(n);if(!t||!1===t._config.autoClose)continue;const o=e.composedPath(),r=o.includes(t._menu);if(o.includes(t._element)||"inside"===t._config.autoClose&&!r||"outside"===t._config.autoClose&&r)continue;if(t._menu.contains(e.target)&&("keyup"===e.type&&"Tab"===e.key||/input|select|option|textarea|form/i.test(e.target.tagName)))continue;const s={relatedTarget:t._element};"click"===e.type&&(s.clickEvent=e),t._completeHide(s)}}static dataApiKeydownHandler(e){const t=/input|textarea/i.test(e.target.tagName),n="Escape"===e.key,o=[ARROW_UP_KEY,ARROW_DOWN_KEY].includes(e.key);if(!o&&!n)return;if(t&&!n)return;e.preventDefault();const r=this.matches(SELECTOR_DATA_TOGGLE)?this:SelectorEngine.prev(this,SELECTOR_DATA_TOGGLE)[0]||SelectorEngine.next(this,SELECTOR_DATA_TOGGLE)[0]||SelectorEngine.findOne(SELECTOR_DATA_TOGGLE,e.delegateTarget.parentNode),s=Dropdown.getOrCreateInstance(r);if(o)return e.stopPropagation(),s.show(),void s._selectMenuItem(e);s._isShown()&&(e.stopPropagation(),s.hide(),r.focus())}}if(EventHandler.on(document,EVENT_KEYDOWN_DATA_API,SELECTOR_DATA_TOGGLE,Dropdown.dataApiKeydownHandler),EventHandler.on(document,EVENT_KEYDOWN_DATA_API,SELECTOR_MENU,Dropdown.dataApiKeydownHandler),EventHandler.on(document,EVENT_CLICK_DATA_API,Dropdown.clearMenus),EventHandler.on(document,EVENT_KEYUP_DATA_API,Dropdown.clearMenus),EventHandler.on(document,EVENT_CLICK_DATA_API,SELECTOR_DATA_TOGGLE,(function(e){e.preventDefault(),Dropdown.getOrCreateInstance(this).toggle()})),defineJQueryPlugin(Dropdown),window.bootstrap=window.bootstrap||{},window.bootstrap.Dropdown=Dropdown,Joomla&&Joomla.getOptions){const e=Joomla.getOptions("bootstrap.dropdown");"object"==typeof e&&null!==e&&Object.keys(e).forEach((t=>{const n=e[t],o={interval:n.interval?n.interval:5e3,pause:n.pause?n.pause:"hover"},r=Array.from(document.querySelectorAll(t));r.length&&r.map((e=>new window.bootstrap.Dropdown(e,o)))}))}export{Dropdown as D};