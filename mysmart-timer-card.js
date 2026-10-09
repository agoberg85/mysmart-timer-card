const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),i=new WeakMap;let r=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const s=this.t;if(e&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=i.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&i.set(s,t))}return t}toString(){return this.cssText}};const n=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:a,defineProperty:o,getOwnPropertyDescriptor:d,getOwnPropertyNames:l,getOwnPropertySymbols:c,getPrototypeOf:h}=Object,u=globalThis,m=u.trustedTypes,p=m?m.emptyScript:"",_=u.reactiveElementPolyfillSupport,g=(t,e)=>t,f={toAttribute(t,e){switch(e){case Boolean:t=t?p:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},y=(t,e)=>!a(t,e),b={attribute:!0,type:String,converter:f,reflect:!1,useDefault:!1,hasChanged:y};Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let $=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);void 0!==i&&o(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:r}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const n=i?.call(this);r?.call(this,e),this.requestUpdate(t,n,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(g("elementProperties")))return;const t=h(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(g("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(g("properties"))){const t=this.properties,e=[...l(t),...c(t)];for(const s of e)this.createProperty(s,t[s])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const s=this._$Eu(t,e);void 0!==s&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(n(t))}else void 0!==t&&e.push(n(t));return e}static _$Eu(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const s=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((s,i)=>{if(e)s.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of i){const i=document.createElement("style"),r=t.litNonce;void 0!==r&&i.setAttribute("nonce",r),i.textContent=e.cssText,s.appendChild(i)}})(s,this.constructor.elementStyles),s}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(void 0!==i&&!0===s.reflect){const r=(void 0!==s.converter?.toAttribute?s.converter:f).toAttribute(e,s.type);this._$Em=t,null==r?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(t,e){const s=this.constructor,i=s._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=s.getPropertyOptions(i),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:f;this._$Em=i;const n=r.fromAttribute(e,t.type);this[i]=n??this._$Ej?.get(i)??n,this._$Em=null}}requestUpdate(t,e,s,i=!1,r){if(void 0!==t){const n=this.constructor;if(!1===i&&(r=this[t]),s??=n.getPropertyOptions(t),!((s.hasChanged??y)(r,e)||s.useDefault&&s.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,s))))return;this.C(t,e,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:r},n){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==r||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,s]of t){const{wrapped:t}=s,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,s,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[g("elementProperties")]=new Map,$[g("finalized")]=new Map,_?.({ReactiveElement:$}),(u.reactiveElementVersions??=[]).push("2.1.2");const v=globalThis,w=t=>t,A=v.trustedTypes,k=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,x="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,E="?"+S,C=`<${E}>`,M=document,P=()=>M.createComment(""),D=t=>null===t||"object"!=typeof t&&"function"!=typeof t,T=Array.isArray,N="[ \t\n\f\r]",H=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,O=/-->/g,U=/>/g,F=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),R=/'/g,L=/"/g,j=/^(?:script|style|textarea|title)$/i,K=(t=>(e,...s)=>({_$litType$:t,strings:e,values:s}))(1),z=Symbol.for("lit-noChange"),I=Symbol.for("lit-nothing"),B=new WeakMap,q=M.createTreeWalker(M,129);function W(t,e){if(!T(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==k?k.createHTML(e):e}const V=(t,e)=>{const s=t.length-1,i=[];let r,n=2===e?"<svg>":3===e?"<math>":"",a=H;for(let e=0;e<s;e++){const s=t[e];let o,d,l=-1,c=0;for(;c<s.length&&(a.lastIndex=c,d=a.exec(s),null!==d);)c=a.lastIndex,a===H?"!--"===d[1]?a=O:void 0!==d[1]?a=U:void 0!==d[2]?(j.test(d[2])&&(r=RegExp("</"+d[2],"g")),a=F):void 0!==d[3]&&(a=F):a===F?">"===d[0]?(a=r??H,l=-1):void 0===d[1]?l=-2:(l=a.lastIndex-d[2].length,o=d[1],a=void 0===d[3]?F:'"'===d[3]?L:R):a===L||a===R?a=F:a===O||a===U?a=H:(a=F,r=void 0);const h=a===F&&t[e+1].startsWith("/>")?" ":"";n+=a===H?s+C:l>=0?(i.push(o),s.slice(0,l)+x+s.slice(l)+S+h):s+S+(-2===l?e:h)}return[W(t,n+(t[s]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class Y{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let r=0,n=0;const a=t.length-1,o=this.parts,[d,l]=V(t,e);if(this.el=Y.createElement(d,s),q.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=q.nextNode())&&o.length<a;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(x)){const e=l[n++],s=i.getAttribute(t).split(S),a=/([.?@])?(.*)/.exec(e);o.push({type:1,index:r,name:a[2],strings:s,ctor:"."===a[1]?X:"?"===a[1]?tt:"@"===a[1]?et:Q}),i.removeAttribute(t)}else t.startsWith(S)&&(o.push({type:6,index:r}),i.removeAttribute(t));if(j.test(i.tagName)){const t=i.textContent.split(S),e=t.length-1;if(e>0){i.textContent=A?A.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],P()),q.nextNode(),o.push({type:2,index:++r});i.append(t[e],P())}}}else if(8===i.nodeType)if(i.data===E)o.push({type:2,index:r});else{let t=-1;for(;-1!==(t=i.data.indexOf(S,t+1));)o.push({type:7,index:r}),t+=S.length-1}r++}}static createElement(t,e){const s=M.createElement("template");return s.innerHTML=t,s}}function J(t,e,s=t,i){if(e===z)return e;let r=void 0!==i?s._$Co?.[i]:s._$Cl;const n=D(e)?void 0:e._$litDirective$;return r?.constructor!==n&&(r?._$AO?.(!1),void 0===n?r=void 0:(r=new n(t),r._$AT(t,s,i)),void 0!==i?(s._$Co??=[])[i]=r:s._$Cl=r),void 0!==r&&(e=J(t,r._$AS(t,e.values),r,i)),e}class G{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??M).importNode(e,!0);q.currentNode=i;let r=q.nextNode(),n=0,a=0,o=s[0];for(;void 0!==o;){if(n===o.index){let e;2===o.type?e=new Z(r,r.nextSibling,this,t):1===o.type?e=new o.ctor(r,o.name,o.strings,this,t):6===o.type&&(e=new st(r,this,t)),this._$AV.push(e),o=s[++a]}n!==o?.index&&(r=q.nextNode(),n++)}return q.currentNode=M,i}p(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class Z{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=I,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=J(this,t,e),D(t)?t===I||null==t||""===t?(this._$AH!==I&&this._$AR(),this._$AH=I):t!==this._$AH&&t!==z&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>T(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==I&&D(this._$AH)?this._$AA.nextSibling.data=t:this.T(M.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,i="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=Y.createElement(W(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new G(i,this),s=t.u(this.options);t.p(e),this.T(s),this._$AH=t}}_$AC(t){let e=B.get(t.strings);return void 0===e&&B.set(t.strings,e=new Y(t)),e}k(t){T(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const r of t)i===e.length?e.push(s=new Z(this.O(P()),this.O(P()),this,this.options)):s=e[i],s._$AI(r),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=w(t).nextSibling;w(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class Q{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,r){this.type=1,this._$AH=I,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=r,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=I}_$AI(t,e=this,s,i){const r=this.strings;let n=!1;if(void 0===r)t=J(this,t,e,0),n=!D(t)||t!==this._$AH&&t!==z,n&&(this._$AH=t);else{const i=t;let a,o;for(t=r[0],a=0;a<r.length-1;a++)o=J(this,i[s+a],e,a),o===z&&(o=this._$AH[a]),n||=!D(o)||o!==this._$AH[a],o===I?t=I:t!==I&&(t+=(o??"")+r[a+1]),this._$AH[a]=o}n&&!i&&this.j(t)}j(t){t===I?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class X extends Q{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===I?void 0:t}}class tt extends Q{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==I)}}class et extends Q{constructor(t,e,s,i,r){super(t,e,s,i,r),this.type=5}_$AI(t,e=this){if((t=J(this,t,e,0)??I)===z)return;const s=this._$AH,i=t===I&&s!==I||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==I&&(s===I||i);i&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){J(this,t)}}const it=v.litHtmlPolyfillSupport;it?.(Y,Z),(v.litHtmlVersions??=[]).push("3.3.3");const rt=globalThis;class nt extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{const i=s?.renderBefore??e;let r=i._$litPart$;if(void 0===r){const t=s?.renderBefore??null;i._$litPart$=r=new Z(e.insertBefore(P(),t),t,void 0,s??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return z}}nt._$litElement$=!0,nt.finalized=!0,rt.litElementHydrateSupport?.({LitElement:nt});const at=rt.litElementPolyfillSupport;at?.({LitElement:nt}),(rt.litElementVersions??=[]).push("4.2.2");const ot="idle",dt="active",lt="paused";function ct(t){if(null==t||""===t)return 0;if("number"==typeof t)return Number.isFinite(t)?Math.max(0,Math.round(t)):0;if("object"==typeof t){const e=Number(t.hours)||0,s=Number(t.minutes)||0,i=Number(t.seconds)||0;return Math.max(0,Math.round(3600*e+60*s+i))}let e=String(t).trim(),s=0;const i=e.match(/^(-?\d+)\s+days?,\s*(.*)$/);if(i&&(s=Number(i[1])||0,e=i[2]),/^\d+(\.\d+)?$/.test(e))return Math.max(0,Math.round(86400*s+Number(e)));const r=e.split(":").map(t=>Number(t));if(!r.length||r.some(t=>!Number.isFinite(t)))return 0;const[n,a,o]=3===r.length?r:2===r.length?[0,r[0],r[1]]:[0,0,r[0]];return Math.max(0,Math.round(86400*s+3600*n+60*a+o))}function ht(t){const e=Math.max(0,Math.round(Number(t)||0));return[Math.floor(e/3600),Math.floor(e%3600/60),e%60].map(t=>String(t).padStart(2,"0")).join(":")}function ut(t){const e=Math.max(0,Math.floor(Number(t)||0));return{minutes:String(Math.floor(e/60)).padStart(2,"0"),seconds:String(e%60).padStart(2,"0")}}function mt(t){return Math.max(0,Math.min(5999,Math.round(Number(t)||0)))}function pt(t,e,s){const i=mt(t);let r=Math.floor(i/60),n=i%60;return"minutes"===e?r=Math.max(0,Math.min(99,r+s)):n=((n+s)%60+60)%60,mt(60*r+n)}function _t(t,e=Date.now()){if(!t)return{status:ot,remaining:0,duration:0,finishesAt:0};const s=t.attributes||{},i=[dt,lt].includes(t.state)?t.state:ot,r=ct(s.duration),n=s.finishes_at?Date.parse(s.finishes_at):0;let a=0;return i===dt&&Number.isFinite(n)&&n>0?a=Math.max(0,(n-e)/1e3):i!==dt&&i!==lt||(a=ct(s.remaining)),{status:i,remaining:a,duration:r,finishesAt:Number.isFinite(n)?n:0}}function gt(t){return t?`${t.entity_id}|${t.last_changed||""}`:""}const ft={en:{missing_entity:"Timer entity {entity} was not found. Create a timer helper and set it as entity.",start:"Start",pause:"Pause",resume:"Resume",stop:"Stop",restart:"Restart",clear:"Clear",add_seconds:"Add {count} seconds",add_minute:"Add 1 minute",add_minutes:"Add {count} minutes",increase_minutes:"More minutes",decrease_minutes:"Fewer minutes",increase_seconds:"More seconds",decrease_seconds:"Fewer seconds",minutes:"Minutes",seconds:"Seconds",timer_done:"Timer finished. Tap to dismiss.",preset_soft_eggs:"Soft-boiled eggs",preset_hard_eggs:"Hard-boiled eggs",preset_pasta:"Pasta",preset_rice:"Rice",preset_boiling_water:"Boiling water",preset_al_dente:"Al dente",preset_low_heat:"Lid on, low heat"},nb:{missing_entity:"Fant ikke timer-entiteten {entity}. Opprett en timer-hjelper og bruk den som entity.",start:"Start",pause:"Pause",resume:"Fortsett",stop:"Stopp",restart:"Start på nytt",clear:"Nullstill",add_seconds:"Legg til {count} sekunder",add_minute:"Legg til 1 minutt",add_minutes:"Legg til {count} minutter",increase_minutes:"Flere minutter",decrease_minutes:"Færre minutter",increase_seconds:"Flere sekunder",decrease_seconds:"Færre sekunder",minutes:"Minutter",seconds:"Sekunder",timer_done:"Timeren er ferdig. Trykk for å lukke.",preset_soft_eggs:"Bløtkokte egg",preset_hard_eggs:"Hardkokte egg",preset_pasta:"Pasta",preset_rice:"Ris",preset_boiling_water:"Kokende vann",preset_al_dente:"Al dente",preset_low_heat:"Lokk på, lav varme"}};function yt(t,e,s={}){const i=function(t){const e=[t?.locale?.language,t?.language,t?.selectedLanguage,"undefined"!=typeof navigator?navigator.language:""].filter(Boolean),s=String(e[0]||"en").toLowerCase();return s.startsWith("nb")||s.startsWith("nn")||s.startsWith("no")?"nb":"en"}(t),r=ft[i]||ft.en,n=ft.en[e]||e;return(r[e]||n).replace(/\{(\w+)\}/g,(t,e)=>String(s[e]??""))}const bt=((t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,s,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1],t[0]);return new r(i,t,s)})`
      :host {
        display: block;
        --mysmart-timer-card-background: var(--ha-card-background, var(--card-background-color, #2e2e2e));
        --mysmart-timer-ink: var(--primary-text-color, #ffffff);
        --mysmart-timer-muted: var(--secondary-text-color, rgba(255, 255, 255, 0.6));
        --mysmart-timer-accent: var(--active-big, var(--accent-color, #ff8b5e));
        --mysmart-timer-digit-color: var(--mysmart-timer-ink);
        --mysmart-timer-separator-color: var(--mysmart-timer-digit-color);
        --mysmart-timer-arrow-color: var(--mysmart-timer-muted);
        --mysmart-timer-button-background: rgba(255, 255, 255, 0.06);
        --mysmart-timer-button-color: var(--mysmart-timer-ink);
        --mysmart-timer-play-background: var(--mysmart-timer-accent);
        --mysmart-timer-play-color: rgba(0, 0, 0, 0.82);
        --mysmart-timer-preset-background: var(--mysmart-timer-card-background);
        --mysmart-timer-preset-icon-background: rgba(255, 255, 255, 0.06);
        --mysmart-timer-preset-icon-color: var(--mysmart-timer-ink);
        --mysmart-timer-preset-active-background: var(--mysmart-timer-accent);
        --mysmart-timer-preset-active-color: rgba(0, 0, 0, 0.82);
        --mysmart-timer-flash-background: #ffffff;
        --mysmart-timer-flash-color: #171313;
        --mysmart-timer-digit-width: 0.6em;
        --mysmart-timer-presets-width: 412px;
      }

      ha-card.shell {
        position: relative;
        height: var(--mysmart-timer-card-height, auto);
        border: 0;
        border-radius: 32px;
        background: transparent;
        box-shadow: none;
        overflow: visible;
        color: var(--mysmart-timer-ink);
      }

      button {
        font: inherit;
        color: inherit;
        border: 0;
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;
      }

      .layout {
        position: relative;
        display: grid;
        grid-template-columns: minmax(0, 1fr) var(--mysmart-timer-presets-width);
        gap: 10px;
        height: 100%;
        min-height: 288px;
      }

      .layout.no-presets {
        grid-template-columns: minmax(0, 1fr);
      }

      .main {
        position: relative;
        display: grid;
        grid-template-columns: auto minmax(0, 1fr);
        align-items: center;
        gap: 24px;
        padding: 22px 22px 22px 28px;
        border-radius: 32px;
        background: var(--mysmart-timer-card-background);
        overflow: hidden;
        min-width: 0;
      }

      /* Flash layer sits under the content so a gradient flash color still works. */
      .main::before {
        content: '';
        position: absolute;
        inset: 0;
        background: var(--mysmart-timer-flash-background);
        opacity: 0;
        pointer-events: none;
      }

      .main > * {
        position: relative;
      }

      .clock {
        display: flex;
        align-items: center;
        color: var(--mysmart-timer-digit-color);
      }

      .field,
      .separator {
        display: grid;
        grid-template-rows: 32px auto 32px;
        justify-items: center;
        gap: 2px;
      }

      .digits,
      .separator-line {
        font-size: 104px;
        font-weight: 300;
        letter-spacing: -0.03em;
        line-height: 1;
        padding: 6px 4px;
      }

      .digits {
        display: flex;
        border-radius: 20px;
        outline: none;
        touch-action: none;
        user-select: none;
        -webkit-user-select: none;
      }

      .is-editable .digits {
        cursor: ns-resize;
      }

      .digits:focus-visible {
        box-shadow: 0 0 0 2px var(--mysmart-timer-accent);
      }

      /* Each digit gets a fixed-width slot, so proportional fonts like Space Grotesk don't jump while counting. */
      .digit {
        display: inline-block;
        width: var(--mysmart-timer-digit-width);
        text-align: center;
        font-variant-numeric: tabular-nums;
      }

      /* Same colon as the wall clock: a smaller ":" raised with vertical-align: super and nudged back down.
         It sits in a line with the digits' font size and padding, so it shares their baseline.
         line-height: 0 keeps the raised glyph from making that line taller. */
      .separator-line {
        grid-row: 2;
        padding-inline: 0;
        color: var(--mysmart-timer-separator-color);
      }

      .colon {
        font-size: 0.6em;
        line-height: 0;
        vertical-align: super;
        position: relative;
        top: var(--mysmart-timer-colon-offset, 18px);
        padding: 0 10px;
      }

      .arrow {
        width: 48px;
        height: 32px;
        display: grid;
        place-items: center;
        border-radius: 999px;
        background: transparent;
        color: var(--mysmart-timer-arrow-color);
        transition: opacity 240ms ease;
        touch-action: manipulation;
      }

      .clock:not(.is-editable) .arrow {
        opacity: 0;
        pointer-events: none;
      }

      .controls {
        justify-self: end;
        align-self: end;
        display: flex;
        align-items: center;
        gap: 10px;
        flex-wrap: wrap;
        justify-content: flex-end;
      }

      .chip,
      .round-button {
        height: 48px;
        background: var(--mysmart-timer-button-background);
        color: var(--mysmart-timer-button-color);
        border-radius: 999px;
        touch-action: manipulation;
      }

      .chip {
        padding: 0 18px;
        font-size: 14px;
        font-weight: 600;
        white-space: nowrap;
      }

      .round-button {
        width: 48px;
        display: grid;
        place-items: center;
      }

      .play-button {
        width: 72px;
        height: 72px;
        display: grid;
        place-items: center;
        border-radius: 999px;
        background: var(--mysmart-timer-play-background);
        color: var(--mysmart-timer-play-color);
        --mdc-icon-size: 30px;
        touch-action: manipulation;
      }

      .chip:disabled,
      .round-button:disabled,
      .play-button:disabled {
        opacity: 0.45;
        cursor: default;
      }

      .presets {
        display: grid;
        grid-auto-rows: minmax(0, 1fr);
        gap: 8px;
        min-height: 0;
      }

      .preset {
        display: grid;
        grid-template-columns: auto minmax(0, 1fr) auto;
        align-items: center;
        gap: 16px;
        padding: 8px 26px 8px 8px;
        min-height: 0;
        border-radius: 32px;
        background: var(--mysmart-timer-preset-background);
        color: var(--mysmart-timer-ink);
        text-align: left;
        transition: background 200ms ease, color 200ms ease;
      }

      .preset-icon {
        width: 52px;
        height: 52px;
        display: grid;
        place-items: center;
        border-radius: 999px;
        background: var(--mysmart-timer-preset-icon-background);
        color: var(--mysmart-timer-preset-icon-color);
      }

      .preset-copy {
        display: grid;
        gap: 2px;
        min-width: 0;
      }

      .preset-name,
      .preset-subtitle {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .preset-name {
        font-size: var(--ha-font-size-m, 14px);
        font-weight: 600;
      }

      .preset-subtitle {
        font-size: 14px;
        font-weight: 500;
        color: var(--mysmart-timer-muted);
      }

      .preset-time {
        font-size: var(--ha-font-size-m, 14px);
        font-weight: 600;
        font-variant-numeric: tabular-nums;
      }

      .preset.active {
        background: var(--mysmart-timer-preset-active-background);
        color: var(--mysmart-timer-preset-active-color);
      }

      .preset.active .preset-subtitle {
        color: inherit;
        opacity: 0.72;
      }

      .preset.active .preset-icon {
        background: rgba(0, 0, 0, 0.1);
        color: inherit;
      }

      .alarm-catcher {
        position: absolute;
        inset: 0;
        z-index: 5;
        border-radius: 32px;
        cursor: pointer;
      }

      .shell.is-alarm .main::before {
        animation: mysmart-timer-flash 1.2s ease-in-out infinite;
      }

      .shell.is-alarm .main {
        animation: mysmart-timer-flash-ink 1.2s ease-in-out infinite;
      }

      .shell.is-alarm .clock {
        color: inherit;
      }

      .shell.is-alarm .separator-line {
        color: inherit;
      }

      .controls {
        transition: opacity 240ms ease;
      }

      .shell.is-alarm .controls {
        opacity: 0;
      }

      @keyframes mysmart-timer-flash {
        0%, 100% { opacity: 0; }
        40%, 60% { opacity: 1; }
      }

      @keyframes mysmart-timer-flash-ink {
        0%, 100% { color: var(--mysmart-timer-ink); }
        40%, 60% { color: var(--mysmart-timer-flash-color); }
      }

      .error {
        padding: 22px 28px;
        border-radius: 32px;
        background: var(--mysmart-timer-card-background);
        color: var(--mysmart-timer-muted);
      }

      @media (prefers-reduced-motion: reduce) {
        .arrow,
        .preset {
          transition: none;
        }
      }
`,$t={card_background:"--mysmart-timer-card-background",text_color:"--mysmart-timer-ink",muted_color:"--mysmart-timer-muted",accent_color:"--mysmart-timer-accent",digit_color:"--mysmart-timer-digit-color",separator_color:"--mysmart-timer-separator-color",arrow_color:"--mysmart-timer-arrow-color",button_background:"--mysmart-timer-button-background",button_color:"--mysmart-timer-button-color",play_button_background:"--mysmart-timer-play-background",play_button_color:"--mysmart-timer-play-color",preset_background:"--mysmart-timer-preset-background",preset_icon_background:"--mysmart-timer-preset-icon-background",preset_icon_color:"--mysmart-timer-preset-icon-color",preset_active_background:"--mysmart-timer-preset-active-background",preset_active_color:"--mysmart-timer-preset-active-color",flash_background:"--mysmart-timer-flash-background",flash_color:"--mysmart-timer-flash-color",presets_width:"--mysmart-timer-presets-width",height:"--mysmart-timer-card-height"};function vt(t){try{return window.localStorage?.getItem(t)??null}catch(t){return null}}function wt(t,e){try{null==e?window.localStorage?.removeItem(t):window.localStorage?.setItem(t,e)}catch(t){}}class At extends nt{static get properties(){return{hass:{},config:{},_draft:{state:!0},_tick:{state:!0},_dismissedKey:{state:!0},_observedFinishKey:{state:!0},_startedPreset:{state:!0}}}static get styles(){return bt}constructor(){super(),this._draft=null,this._tick=Date.now(),this._dismissedKey="",this._observedFinishKey="",this._startedPreset=null,this._baseDuration=0,this._clock=null,this._previousSnapshot=null,this._drag=null,this._holdTimer=null,this._holdHandled=!1,this._dragMoveHandler=this._handleDragMove.bind(this),this._dragEndHandler=this._handleDragEnd.bind(this)}setConfig(t){if(!t?.entity)throw new Error("You need to define a timer entity (entity: timer.kitchen)");const e=this.config?.entity!==t.entity;this.config={auto_dismiss:120,seconds_step:5,quick_add:[30,60,300],running_add:60,...t},e&&this._restoreLocalState()}static getStubConfig(t){return{entity:Object.keys(t?.states||{}).find(t=>t.startsWith("timer."))||"timer.kitchen"}}getCardSize(){return 5}getGridOptions(){return{columns:12,rows:5,min_rows:4}}connectedCallback(){super.connectedCallback(),this._syncClock()}disconnectedCallback(){super.disconnectedCallback(),this._stopClock(),this._stopHold(),this._endDrag()}updated(t){super.updated(t),t.has("hass")&&this._trackTransitions(),this._syncClock()}_t(t,e){return yt(this.hass,t,e)}_storageKey(t){return`mysmart-timer-card:${this.config?.entity}:${t}`}_restoreLocalState(){const t=Number(vt(this._storageKey("draft")));this._draft=Number.isFinite(t)&&null!==vt(this._storageKey("draft"))?mt(t):null,this._dismissedKey=vt(this._storageKey("dismissed"))||"",this._baseDuration=Number(vt(this._storageKey("base")))||0;try{const t=JSON.parse(vt(this._storageKey("preset"))||"null");this._startedPreset=t&&Number.isInteger(t.index)?t:null}catch(t){this._startedPreset=null}}_setDraft(t){this._draft=mt(t),wt(this._storageKey("draft"),String(this._draft))}_setStartedPreset(t){this._startedPreset=t,wt(this._storageKey("preset"),t?JSON.stringify(t):null)}_setBaseDuration(t){this._baseDuration=t,wt(this._storageKey("base"),t?String(t):null)}_stateObj(){return this.hass?.states?.[this.config?.entity]}_snapshot(){return _t(this._stateObj(),Date.now())}_currentDraft(){if(null!=this._draft)return this._draft;return mt(ct(this._stateObj()?.attributes?.duration)||300)}_presets(){return function(t,e=[]){return(Array.isArray(t)?t:e).filter(t=>t&&"object"==typeof t).map(t=>({name:String(t.name??""),subtitle:String(t.subtitle??""),icon:String(t.icon||"mdi:timer-outline"),duration:ct(t.duration)})).filter(t=>t.duration>0)}(this.config?.presets,function(t){const e=e=>yt(t,e);return[{name:e("preset_soft_eggs"),subtitle:e("preset_boiling_water"),icon:"mdi:egg-outline",duration:"6:00"},{name:e("preset_hard_eggs"),subtitle:e("preset_boiling_water"),icon:"mdi:egg-fried",duration:"9:00"},{name:e("preset_pasta"),subtitle:e("preset_al_dente"),icon:"mdi:noodles",duration:"10:00"},{name:e("preset_rice"),subtitle:e("preset_low_heat"),icon:"mdi:rice",duration:"12:00"}]}(this.hass))}_isAlarm(){const t=this._stateObj();return function(t,{nowMs:e=Date.now(),autoDismissSeconds:s=0,dismissedKey:i="",observedFinish:r=!1}={}){if(!t||t.state!==ot)return!1;if("finished"!==t.attributes?.last_transition&&!r)return!1;if(i&&i===gt(t))return!1;if(s>0){const i=Date.parse(t.last_changed||"");if(Number.isFinite(i)&&e-i>1e3*s)return!1}return!0}(t,{nowMs:Date.now(),autoDismissSeconds:Number(this.config?.auto_dismiss)||0,dismissedKey:this._dismissedKey,observedFinish:Boolean(this._observedFinishKey)&&this._observedFinishKey===gt(t)})}_trackTransitions(){const t=this._stateObj(),e=Date.now();(function(t,e,s=Date.now()){return Boolean(t&&t.status===dt&&e?.state===ot&&t.finishesAt>0&&t.finishesAt<=s+1500)})(this._previousSnapshot,t,e)&&(this._observedFinishKey=gt(t));const s=_t(t,e);s.status===ot&&this._startedPreset&&this._setStartedPreset(null),this._previousSnapshot=s}_syncClock(){const t=this._stateObj()?.state;this.isConnected&&(t===dt||this._isAlarm())?this._clock||(this._tick=Date.now(),this._clock=window.setInterval(()=>{this._tick=Date.now()},250)):this._stopClock()}_stopClock(){this._clock&&(window.clearInterval(this._clock),this._clock=null)}_callTimer(t,e={}){return this.hass.callService("timer",t,{entity_id:this.config.entity,...e})}async _start(){if(this._snapshot().status===lt)return void await this._callTimer("start");const t=this._currentDraft();t<=0||(this._setStartedPreset(null),this._setBaseDuration(t),await this._callTimer("start",{duration:ht(t)}))}async _pause(){await this._callTimer("pause")}async _stop(){this._setStartedPreset(null),await this._callTimer("cancel")}async _restart(){const t=this._snapshot(),e=this._baseDuration||t.duration;e<=0||(this._startedPreset&&this._setStartedPreset({...this._startedPreset,duration:e}),await this._callTimer("start",{duration:ht(e)}))}async _addTime(t){const e=this._snapshot();if(e.status===ot)return void this._setDraft(this._currentDraft()+t);const s=Math.max(1,Math.ceil(e.remaining)+t);this._startedPreset&&this._setStartedPreset({...this._startedPreset,duration:s}),await this._callTimer("start",{duration:ht(s)}),e.status===lt&&await this._callTimer("pause")}async _startPreset(t,e){this._setDraft(t.duration),this._setBaseDuration(t.duration),this._setStartedPreset({index:e,duration:t.duration}),await this._callTimer("start",{duration:ht(t.duration)})}_dismissAlarm(t){t.stopPropagation(),t.preventDefault();const e=gt(this._stateObj());this._dismissedKey=e,this._observedFinishKey="",wt(this._storageKey("dismissed"),e)}_secondsStep(){return Math.max(1,Math.min(30,Math.round(Number(this.config?.seconds_step)||5)))}_fieldStep(t){return"minutes"===t?1:this._secondsStep()}_stepField(t,e){this._setDraft(pt(this._currentDraft(),t,e*this._fieldStep(t)))}_startDrag(t,e){if(!this._isEditable()||"mouse"===t.pointerType&&0!==t.button)return;t.preventDefault();const s=t.currentTarget;this._drag={field:e,startY:t.clientY,startDraft:this._currentDraft(),pointerId:t.pointerId,target:s};try{s.setPointerCapture?.(t.pointerId)}catch(t){}window.addEventListener("pointermove",this._dragMoveHandler),window.addEventListener("pointerup",this._dragEndHandler),window.addEventListener("pointercancel",this._dragEndHandler)}_handleDragMove(t){if(!this._drag)return;const{field:e,startY:s,startDraft:i}=this._drag,r=Math.round((s-t.clientY)/14);this._setDraft(pt(i,e,r*this._fieldStep(e)))}_handleDragEnd(){this._endDrag()}_endDrag(){if(this._drag?.target?.hasPointerCapture?.(this._drag.pointerId))try{this._drag.target.releasePointerCapture(this._drag.pointerId)}catch(t){}window.removeEventListener("pointermove",this._dragMoveHandler),window.removeEventListener("pointerup",this._dragEndHandler),window.removeEventListener("pointercancel",this._dragEndHandler),this._drag=null}_handleWheel(t,e){this._isEditable()&&(t.preventDefault(),this._stepField(e,t.deltaY<0?1:-1))}_handleFieldKeydown(t,e){this._isEditable()&&("ArrowUp"===t.key||"ArrowRight"===t.key?(t.preventDefault(),this._stepField(e,1)):"ArrowDown"!==t.key&&"ArrowLeft"!==t.key||(t.preventDefault(),this._stepField(e,-1)))}_startHold(t,e,s){!this._isEditable()||"mouse"===t.pointerType&&0!==t.button||(this._holdHandled=!0,this._stepField(e,s),this._stopHold(),this._holdTimer=window.setTimeout(()=>{this._holdTimer=window.setInterval(()=>this._stepField(e,s),90)},400))}_stopHold(){this._holdTimer&&(window.clearTimeout(this._holdTimer),window.clearInterval(this._holdTimer),this._holdTimer=null)}_handleArrowClick(t,e){this._holdHandled?this._holdHandled=!1:this._stepField(t,e)}_isEditable(){return this._snapshot().status===ot&&!this._isAlarm()}_styleMap(){return Object.entries($t).filter(([t])=>void 0!==this.config?.[t]&&""!==this.config?.[t]).map(([t,e])=>`${e}:${["height","presets_width"].includes(t)?function(t){return"number"==typeof t||/^\d+(\.\d+)?$/.test(String(t).trim())?`${t}px`:String(t)}(this.config[t]):this.config[t]}`).join(";")}render(){if(!this.config||!this.hass)return I;if(!this._stateObj())return K`
        <ha-card class="shell" style=${this._styleMap()}>
          <div class="error">${this._t("missing_entity",{entity:this.config.entity})}</div>
        </ha-card>
      `;const t=this._snapshot(),e=this._isAlarm(),s=t.status===ot&&!e,i=e?0:t.status===ot?this._currentDraft():(r=t.remaining,Math.max(0,Math.ceil((Number(r)||0)-.05)));var r;const n=this._presets(),a=function(t,e,s=-1){return e&&e.status!==ot?s>=0&&s<t.length?s:t.findIndex(t=>t.duration===e.duration):-1}(n,t,this._startedPreset&&this._startedPreset.duration===t.duration?this._startedPreset.index:-1);return K`
      <ha-card class="shell ${e?"is-alarm":""}" style=${this._styleMap()}>
        <div class="layout ${n.length?"":"no-presets"}">
          <div class="main">
            ${this._renderClock(i,s)}
            ${this._renderControls(t)}
          </div>

          ${n.length?K`
            <div class="presets">
              ${n.map((t,e)=>K`
                <button
                  class="preset ${e===a?"active":""}"
                  aria-pressed=${e===a?"true":"false"}
                  @click=${()=>this._startPreset(t,e)}
                >
                  <span class="preset-icon"><ha-icon icon=${t.icon}></ha-icon></span>
                  <span class="preset-copy">
                    <span class="preset-name">${t.name}</span>
                    ${t.subtitle?K`<span class="preset-subtitle">${t.subtitle}</span>`:I}
                  </span>
                  <span class="preset-time">${function(t){const e=Math.max(0,Math.round(Number(t)||0));if(e>=3600){const t=Math.floor(e/3600),{minutes:s,seconds:i}=ut(e%3600);return`${t}:${s}:${i}`}const{minutes:s,seconds:i}=ut(e);return`${s}:${i}`}(t.duration)}</span>
                </button>
              `)}
            </div>
          `:I}

          ${e?K`
            <div
              class="alarm-catcher"
              role="button"
              tabindex="0"
              aria-label=${this._t("timer_done")}
              @pointerdown=${t=>this._dismissAlarm(t)}
              @keydown=${t=>{"Enter"!==t.key&&" "!==t.key||this._dismissAlarm(t)}}
            ></div>
          `:I}
        </div>
      </ha-card>
    `}_renderClock(t,e){const{minutes:s,seconds:i}=ut(t);return K`
      <div class="clock ${e?"is-editable":""}" role="timer" aria-live="off">
        ${this._renderField("minutes",s,e)}
        <div class="separator" aria-hidden="true"><div class="separator-line"><span class="colon">:</span></div></div>
        ${this._renderField("seconds",i,e)}
      </div>
    `}_renderField(t,e,s){const i=this._t("minutes"===t?"increase_minutes":"increase_seconds"),r=this._t("minutes"===t?"decrease_minutes":"decrease_seconds");return K`
      <div class="field">
        ${this._renderArrow(t,1,"mdi:chevron-up",i,s)}
        <div
          class="digits"
          role="spinbutton"
          tabindex=${s?"0":"-1"}
          aria-label=${this._t(t)}
          aria-valuenow=${String(Number(e))}
          aria-valuemin="0"
          aria-valuemax=${"minutes"===t?"99":"59"}
          aria-readonly=${s?"false":"true"}
          @pointerdown=${e=>this._startDrag(e,t)}
          @wheel=${e=>this._handleWheel(e,t)}
          @keydown=${e=>this._handleFieldKeydown(e,t)}
        >
          ${[...e].map(t=>K`<span class="digit">${t}</span>`)}
        </div>
        ${this._renderArrow(t,-1,"mdi:chevron-down",r,s)}
      </div>
    `}_renderArrow(t,e,s,i,r){return K`
      <button
        class="arrow"
        aria-label=${i}
        tabindex=${r?"0":"-1"}
        ?disabled=${!r}
        @pointerdown=${s=>this._startHold(s,t,e)}
        @pointerup=${()=>this._stopHold()}
        @pointerleave=${()=>this._stopHold()}
        @pointercancel=${()=>this._stopHold()}
        @click=${()=>this._handleArrowClick(t,e)}
      >
        <ha-icon icon=${s}></ha-icon>
      </button>
    `}_quickAddLabel(t){return t%60==0?`+${t/60} min`:`+${t} s`}_quickAddAria(t){return 60===t?this._t("add_minute"):t%60==0?this._t("add_minutes",{count:t/60}):this._t("add_seconds",{count:t})}_renderControls(t){if(t.status===ot){const t=(Array.isArray(this.config?.quick_add)?this.config.quick_add:[]).map(t=>ct(t)).filter(t=>t>0),e=this._currentDraft();return K`
        <div class="controls">
          ${t.map(t=>K`
            <button class="chip" aria-label=${this._quickAddAria(t)} @click=${()=>this._addTime(t)}>
              ${this._quickAddLabel(t)}
            </button>
          `)}
          <button class="round-button" aria-label=${this._t("clear")} ?disabled=${e<=0} @click=${()=>this._setDraft(0)}>
            <ha-icon icon="mdi:backspace-outline"></ha-icon>
          </button>
          <button class="play-button" aria-label=${this._t("start")} ?disabled=${e<=0} @click=${()=>this._start()}>
            <ha-icon icon="mdi:play"></ha-icon>
          </button>
        </div>
      `}const e=ct(this.config?.running_add),s=t.status===dt;return K`
      <div class="controls">
        <button class="round-button" aria-label=${this._t("stop")} @click=${()=>this._stop()}>
          <ha-icon icon="mdi:close"></ha-icon>
        </button>
        <button class="round-button" aria-label=${this._t("restart")} @click=${()=>this._restart()}>
          <ha-icon icon="mdi:restart"></ha-icon>
        </button>
        ${e>0?K`
          <button class="chip" aria-label=${this._quickAddAria(e)} @click=${()=>this._addTime(e)}>
            ${this._quickAddLabel(e)}
          </button>
        `:I}
        <button
          class="play-button"
          aria-label=${s?this._t("pause"):this._t("resume")}
          @click=${()=>s?this._pause():this._start()}
        >
          <ha-icon icon=${s?"mdi:pause":"mdi:play"}></ha-icon>
        </button>
      </div>
    `}}customElements.get("mysmart-timer-card")||customElements.define("mysmart-timer-card",At),window.customCards=window.customCards||[],window.customCards.push({type:"mysmart-timer-card",name:"MySmart Timer Card",description:"A touch-friendly kitchen timer driven by a timer helper, with draggable digits and presets."});
//# sourceMappingURL=mysmart-timer-card.js.map
