(()=>{'use strict';
if(window.CookieScript?.instance?.__tdbLite)return;
const VERSION='2.0.0-mounted-nav-exact-test';
const COOKIE_NAME='CookieScriptConsent';
const COOKIE_DAYS=30;
const ALL_CATEGORIES=['performance','strict','targeting','functionality'];
const STRICT_ONLY=['strict'];
const WRAPPER_ID='cookiescript_injected_wrapper';
const CLOSE_TOTAL_MS=470;
const CSS=`
#cookiescript_injected_wrapper{
  position:fixed;inset:0;z-index:2147483600!important;padding:0;
  background:transparent!important;pointer-events:none!important;
  visibility:hidden!important;opacity:1!important;transform:none!important;
}
#cookiescript_injected_wrapper.tdb-consent-active{
  pointer-events:auto!important;visibility:visible!important;
}
html body #cookiescript_backdrop{
  position:fixed;inset:0;z-index:2147483601!important;
  background:rgba(17,17,17,.18)!important;opacity:0!important;
  transform:translateZ(0)!important;
  transition:opacity 420ms cubic-bezier(.4,0,.2,1)!important;
  animation:none!important;pointer-events:auto;
  will-change:auto;backface-visibility:hidden;-webkit-backface-visibility:hidden;
  contain:paint;
}
html body #cookiescript_injected_wrapper.tdb-consent-active #cookiescript_backdrop{
  will-change:opacity;
}
html body #cookiescript_injected_wrapper.tdb-consent-open #cookiescript_backdrop{
  opacity:1!important;
}
html body #cookiescript_injected{
  position:fixed;left:20px;bottom:20px;z-index:2147483602!important;
  width:30rem!important;max-width:100%!important;min-width:100px!important;
  max-height:85%;margin:0 auto!important;padding:2rem!important;
  box-sizing:border-box;overflow-y:auto;overscroll-behavior:contain;
  -webkit-overflow-scrolling:touch;pointer-events:auto;text-align:left;
  background-color:#f9f2e6!important;color:#2d2d2d;
  box-shadow:1px 2px 8px 0 rgba(0,0,0,.35);
  opacity:1!important;font:400 14px 'Sweet Sans Pro X',sans-serif!important;
  transform:translate3d(0,calc(100% + 24px),0)!important;
  transition:transform 420ms cubic-bezier(.4,0,.2,1)!important;
  animation:none!important;will-change:auto;
  backface-visibility:hidden;-webkit-backface-visibility:hidden;contain:paint;
}
html body #cookiescript_injected_wrapper.tdb-consent-active #cookiescript_injected{
  will-change:transform;
}
html body #cookiescript_injected_wrapper.tdb-consent-open #cookiescript_injected{
  transform:translate3d(0,0,0)!important;
}
html body #cookiescript_injected_wrapper.tdb-consent-closing #cookiescript_injected{
  pointer-events:none!important;
}
html body #cookiescript_injected .tdb-consent-motion{
  opacity:0!important;transform:translate3d(0,.75rem,0)!important;
  transition:none!important;animation:none!important;will-change:auto;
  backface-visibility:hidden;-webkit-backface-visibility:hidden;
}
html body #cookiescript_injected_wrapper.tdb-consent-active #cookiescript_injected .tdb-consent-motion{
  will-change:opacity,transform;
}
html body #cookiescript_injected_wrapper.tdb-consent-open #cookiescript_injected .tdb-consent-motion{
  animation:tdb-consent-text-in 520ms cubic-bezier(.5,0,1,1) 70ms both!important;
}
html body #cookiescript_injected_wrapper.tdb-consent-closing #cookiescript_injected .tdb-consent-motion{
  animation:tdb-consent-text-out 420ms cubic-bezier(0,0,.2,1) both!important;
}
@keyframes tdb-consent-text-in{
  from{opacity:0;transform:translate3d(0,.75rem,0)}
  to{opacity:1;transform:translate3d(0,0,0)}
}
@keyframes tdb-consent-text-out{
  0%{opacity:1;transform:translate3d(0,0,0)}
  20%{opacity:.5;transform:translate3d(0,-.2rem,0)}
  42%{opacity:.15;transform:translate3d(0,-.45rem,0)}
  68%{opacity:0;transform:translate3d(0,-.75rem,0)}
  100%{opacity:0;transform:translate3d(0,-.95rem,0)}
}
#cookiescript_header{
  background:transparent;z-index:999998;text-align:left;padding:10px 0;
  font:300 1.5rem/1.3 'Sweet Sans Pro X',sans-serif!important;
  color:var(--color-text-alternate,#2d2d2d);margin:0 0 .5em;letter-spacing:.15rem;
}
#cookiescript_description{
  font-family:'Sweet Sans Pro X',sans-serif!important;font-size:12px;
  letter-spacing:.3px;line-height:1.4;font-weight:400;
  color:rgba(0,0,0,.65)!important;margin:0 0 2rem!important;
}
#cookiescript_buttons{
  display:flex!important;flex-direction:row;font-weight:700;
  justify-content:space-between;margin:0 -5px;flex-wrap:wrap!important;gap:.5rem!important;
}
html body #cookiescript_injected #cookiescript_accept,
html body #cookiescript_injected #cookiescript_reject{
  font-family:'Sweet Sans Pro X',sans-serif!important;font-weight:400!important;
  border-radius:.3125rem!important;cursor:pointer!important;padding:.1rem!important;
  text-transform:none!important;flex-grow:1;margin:0 5px 13px;min-width:103px;
  white-space:nowrap;text-align:center;font-size:12px;letter-spacing:.4px;
  outline-offset:2px;transition:background-color 100ms ease,color 100ms ease,opacity 100ms ease!important;
}
#cookiescript_accept{border:0;background:#000;color:#fff;line-height:3.2}
#cookiescript_accept:hover{background-color:rgba(0,0,0,.25)}
html body #cookiescript_reject{
  border:1px solid #000!important;background:transparent!important;
  color:#2d2d2d;line-height:3;opacity:.8!important;
}
html body #cookiescript_reject:hover,
html body #cookiescript_reject:focus-visible{
  background-color:#ebebeb!important;color:rgba(0,0,0,.25);opacity:1!important;
}
@media screen and (max-width:767px){
  html body #cookiescript_injected{
    width:100vw!important;max-width:100vw!important;min-width:100vw!important;
    left:0!important;right:0!important;bottom:0!important;
    padding-left:2rem!important;padding-right:2rem!important;
    box-sizing:border-box!important;margin:0!important;border-radius:0!important;
    transform:translate3d(0,100%,0)!important;
  }
  html body #cookiescript_injected_wrapper.tdb-consent-open #cookiescript_injected{
    transform:translate3d(0,0,0)!important;
  }
}
@media print{#cookiescript_injected_wrapper{display:none!important}}
`;
const HTML=`<div id="${WRAPPER_ID}" data-cs-id="cookiescript_injected" aria-hidden="true"><div id="cookiescript_backdrop" aria-hidden="true"></div><div id="cookiescript_injected" tabindex="-1" role="dialog" aria-modal="true" aria-label="Cookie consent dialog" data-nosnippet><div class="tdb-consent-motion"><div class="cookiescript_pre_header"><div class="cookiescript_header_actions"></div></div><div id="cookiescript_header">WE VALUE YOUR PRIVACY</div><div id="cookiescript_description"><span>To respect your privacy, we use cookies only where they add value. Accept all to enjoy the full Dental Barns experience (videos, before &amp; after galleries, and interactive content).<br><br>Or continue to browse the website with essential cookies only.</span></div><div id="cookiescript_buttons"><div id="cookiescript_accept" tabindex="0" role="button">Accept all (full experience)</div><div id="cookiescript_reject" tabindex="0" role="button">Essential only</div></div></div></div></div>`;
let open=false,closing=false,mounted=false,lastFocus=null,openFrame1=0,openFrame2=0,closeTimer=0,pendingAfterClose=null,interactionLocked=false,refs=null;
function unique(values){return[...new Set((values||[]).filter(Boolean))]}
function safeDecode(value){try{return decodeURIComponent(value)}catch{return value}}
function normaliseCategories(value,action){let categories=value;if(typeof categories==='string'){try{categories=JSON.parse(categories)}catch{categories=categories.split(',')}}if(!Array.isArray(categories))categories=[];categories=unique(categories.map(String));if(action==='accept'&&categories.length===0)categories=ALL_CATEGORIES.slice();if(!categories.includes('strict'))categories.push('strict');return categories}
function readDecision(){const row=document.cookie.split('; ').find(item=>item.startsWith(`${COOKIE_NAME}=`));if(!row)return{action:undefined,categories:STRICT_ONLY.slice()};const raw=row.slice(COOKIE_NAME.length+1);let data=null;for(const candidate of[raw,safeDecode(raw)]){try{data=JSON.parse(candidate);break}catch{}}if(!data||typeof data!=='object')return{action:undefined,categories:STRICT_ONLY.slice()};let action=data.action??data.a;if(action==='acceptall')action='accept';if(!['accept','reject'].includes(action))action=undefined;const state={action,categories:normaliseCategories(data.categories??data.c,action)};if(data.key)state.key=data.key;return state}
function writeDecision(action,categories){const storedCategories=action==='accept'?unique(categories.filter(category=>category!=='strict')):[];const value=encodeURIComponent(JSON.stringify({action,categories:storedCategories,consenttime:Math.floor(Date.now()/1000)}));const expires=new Date(Date.now()+COOKIE_DAYS*864e5).toUTCString();const secure=location.protocol==='https:'?'; Secure':'';document.cookie=`${COOKIE_NAME}=${value}; Expires=${expires}; Path=/; SameSite=Lax${secure}`}
function dispatch(name,detail){document.dispatchEvent(new CustomEvent(name,{bubbles:true,cancelable:true,detail}))}
function pushConsentUpdate(categories){window.dataLayer=window.dataLayer||[];window.dataLayer.push({event:`CookieScriptConsentUpdated[${categories.join(',')}]`})}
function dispatchState(){dispatch('CookieScriptCurrentState',api.currentState())}
function dispatchCategories(categories){categories.forEach(category=>dispatch(`CookieScriptCategory-${category}`))}
function ensureStyle(){if(document.querySelector('style[data-tdb-cookie-consent-lite]'))return;const style=document.createElement('style');style.setAttribute('data-tdb-cookie-consent-lite',VERSION);style.textContent=CSS;document.head.appendChild(style)}
function activateWithKeyboard(element,callback){element.addEventListener('click',callback);element.addEventListener('keydown',event=>{if(!['Enter',' ','Spacebar'].includes(event.key))return;event.preventDefault();callback()})}
function cancelOpenFrames(){if(openFrame1)cancelAnimationFrame(openFrame1);if(openFrame2)cancelAnimationFrame(openFrame2);openFrame1=openFrame2=0}
function isEditable(target){return target instanceof Element&&Boolean(target.closest('input,textarea,select,[contenteditable="true"]'))}
function blockBackgroundMotion(event){if(!interactionLocked||!refs)return;if(refs.panel.contains(event.target))return;event.preventDefault()}
function blockScrollKeys(event){if(!interactionLocked)return;if(event.metaKey||event.ctrlKey||event.altKey||isEditable(event.target))return;if(event.key===' '&&event.target instanceof Element&&event.target.closest('button,a,[role="button"],input'))return;if(['ArrowUp','ArrowDown','PageUp','PageDown','Home','End',' '].includes(event.key))event.preventDefault()}
function mount(){if(mounted&&refs)return refs;ensureStyle();let wrapper=document.getElementById(WRAPPER_ID);if(!wrapper){document.body.insertAdjacentHTML('beforeend',HTML);wrapper=document.getElementById(WRAPPER_ID)}const panel=document.getElementById('cookiescript_injected');const accept=document.getElementById('cookiescript_accept');const reject=document.getElementById('cookiescript_reject');refs={wrapper,panel,accept,reject};if(!mounted){activateWithKeyboard(accept,api.acceptAllAction);activateWithKeyboard(reject,api.rejectAllAction);panel.addEventListener('keydown',event=>{if(event.key!=='Tab')return;const controls=[accept,reject];const index=controls.indexOf(document.activeElement);if(event.shiftKey&&index<=0){event.preventDefault();reject.focus()}else if(!event.shiftKey&&index===controls.length-1){event.preventDefault();accept.focus()}});document.addEventListener('wheel',blockBackgroundMotion,{passive:false,capture:true});document.addEventListener('touchmove',blockBackgroundMotion,{passive:false,capture:true});document.addEventListener('keydown',blockScrollKeys,true);mounted=true}return refs}
function show(){const{wrapper,panel}=mount();if(open&&wrapper.classList.contains('tdb-consent-open'))return;clearTimeout(closeTimer);closeTimer=0;pendingAfterClose=null;cancelOpenFrames();lastFocus=document.activeElement;open=true;closing=false;wrapper.setAttribute('aria-hidden','false');wrapper.classList.add('tdb-consent-active');wrapper.classList.remove('tdb-consent-open','tdb-consent-closing');interactionLocked=true;openFrame1=requestAnimationFrame(()=>{openFrame1=0;if(!open||closing)return;openFrame2=requestAnimationFrame(()=>{openFrame2=0;if(!open||closing)return;wrapper.classList.add('tdb-consent-open');panel.focus({preventScroll:true})})})}
function finishHide(){if(!refs)return;const{wrapper}=refs;wrapper.classList.remove('tdb-consent-active','tdb-consent-open','tdb-consent-closing');wrapper.setAttribute('aria-hidden','true');interactionLocked=false;open=false;closing=false;const afterClose=pendingAfterClose;pendingAfterClose=null;if(lastFocus instanceof HTMLElement&&document.contains(lastFocus))lastFocus.focus({preventScroll:true});if(typeof afterClose==='function')afterClose()}
function hide(afterClose){const{wrapper}=mount();if(closing)return;cancelOpenFrames();clearTimeout(closeTimer);pendingAfterClose=typeof afterClose==='function'?afterClose:null;if(!wrapper.classList.contains('tdb-consent-active')){finishHide();return}closing=true;wrapper.classList.add('tdb-consent-closing');wrapper.classList.remove('tdb-consent-open');closeTimer=setTimeout(finishHide,CLOSE_TOTAL_MS)}
function acceptAll(){if(closing)return;writeDecision('accept',ALL_CATEGORIES);hide(()=>{api.onAcceptAll();dispatch('CookieScriptAcceptAll');dispatchState();dispatchCategories(ALL_CATEGORIES);pushConsentUpdate(ALL_CATEGORIES)})}
function rejectAll(){if(closing)return;writeDecision('reject',STRICT_ONLY);hide(()=>{api.onReject();dispatch('CookieScriptReject');dispatchState();dispatchCategories(STRICT_ONLY);pushConsentUpdate(STRICT_ONLY)})}
const api={__tdbLite:true,version:VERSION,onAcceptAll(){},onAccept(){},onReject(){},onClose(){},dispatchEventNames:[],currentState:readDecision,categories:()=>ALL_CATEGORIES.slice(),expireDays:()=>COOKIE_DAYS,hash:()=>`tdb-cookie-consent-lite-${VERSION}`,show,showDetails:show,hide:()=>hide(()=>api.onClose()),acceptAllAction:acceptAll,rejectAllAction:rejectAll,acceptAction(categories){if(Array.isArray(categories)&&categories.includes('performance'))acceptAll();else rejectAll()},applyCurrentCookiesState:dispatchState,forceDispatchCSLoadEvent(){dispatch('CookieScriptLoaded')},getCookieValueForQueryArg(){const row=document.cookie.split('; ').find(item=>item.startsWith(`${COOKIE_NAME}=`));return row?`${COOKIE_NAME}=${encodeURIComponent(row.slice(COOKIE_NAME.length+1))}`:''}};
window.CookieScript=window.CookieScript||function CookieScript(){};window.CookieScript.instance=api;window.CookieScript.init=()=>api;window.CookieScript.autoDisable=()=>{};window.CookieScript.autoDisableStop=()=>{};
function boot(){mount();const state=readDecision();if(!state.action)show();dispatch('CookieScriptLoaded');dispatch('CookieScriptCurrentState',state)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
