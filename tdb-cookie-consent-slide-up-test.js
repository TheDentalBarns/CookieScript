(() => {
  'use strict';

  if (window.CookieScript?.instance?.__tdbLite) return;

  const VERSION = '1.1.0-slide-up-test';
  const COOKIE_NAME = 'CookieScriptConsent';
  const COOKIE_DAYS = 30;
  const ALL_CATEGORIES = ['performance', 'strict', 'targeting', 'functionality'];
  const STRICT_ONLY = ['strict'];
  const WRAPPER_ID = 'cookiescript_injected_wrapper';
  const MOTION_MS = 420;

  const CSS = `
    #cookiescript_injected_wrapper {
      position: fixed;
      inset: 0;
      z-index: 999996;
      padding: 0;
      background: transparent !important;
      pointer-events: none;
    }

    #cookiescript_injected {
      background-color: #f9f2e6 !important;
      z-index: 999997;
      opacity: 1;
      font-size: 14px;
      font-weight: 400;
      font-family: 'Sweet Sans Pro X', sans-serif !important;
      box-shadow: 1px 2px 8px 0 rgba(0, 0, 0, 0.35);
      color: #2d2d2d;
      box-sizing: border-box;
      bottom: 20px;
      left: 20px;
      position: fixed;
      text-align: left;
      max-height: 85%;
      overflow-y: auto;
      width: 30rem !important;
      max-width: 100% !important;
      min-width: 100px !important;
      margin: 0 auto !important;
      padding: 2rem !important;
      pointer-events: auto;
      transform: translate3d(0, calc(100% + 24px), 0);
      transition: transform 420ms cubic-bezier(0.4, 0, 0.2, 1);
      will-change: transform;
    }

    #cookiescript_injected.tdb-cookie-visible {
      transform: translate3d(0, 0, 0);
    }

    #cookiescript_header {
      background-color: transparent;
      z-index: 999998;
      text-align: left;
      padding: 10px 0;
      font: 300 1.5rem/1.3 'Sweet Sans Pro X', sans-serif !important;
      color: var(--color-text-alternate, #2d2d2d);
      margin: 0 0 0.5em;
      letter-spacing: 0.15rem;
    }

    #cookiescript_description {
      font-family: 'Sweet Sans Pro X', sans-serif !important;
      font-size: 12px;
      letter-spacing: 0.3px;
      line-height: 1.4;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.65) !important;
      margin: 0 0 2rem !important;
    }

    #cookiescript_buttons {
      display: flex !important;
      flex-direction: row;
      font-weight: 700;
      justify-content: space-between;
      margin: 0 -5px;
      flex-wrap: wrap !important;
      gap: 0.5rem !important;
    }

    #cookiescript_accept,
    #cookiescript_reject {
      font-family: 'Sweet Sans Pro X', sans-serif !important;
      font-weight: 400 !important;
      border-radius: 0.3125rem !important;
      cursor: pointer !important;
      padding: 0.1rem !important;
      text-transform: none !important;
      flex-grow: 1;
      margin: 0 5px 13px;
      min-width: 103px;
      white-space: nowrap;
      transition: all 0.1s ease-in-out;
      text-align: center;
      font-size: 12px;
      letter-spacing: 0.4px;
      outline-offset: 2px;
    }

    #cookiescript_accept {
      border: 0;
      background-color: #000;
      color: #fff;
      line-height: 3.2;
    }

    #cookiescript_accept:hover {
      background-color: rgba(0, 0, 0, 0.25);
    }

    #cookiescript_reject {
      border: 1px solid #000 !important;
      background-color: transparent !important;
      color: #2d2d2d;
      line-height: 3;
    }

    #cookiescript_reject:hover {
      background-color: #ebebeb !important;
      color: rgba(0, 0, 0, 0.25);
    }

    @media screen and (max-width: 767px) {
      #cookiescript_injected {
        width: 100vw !important;
        max-width: 100vw !important;
        min-width: 100vw !important;
        left: 0 !important;
        right: 0 !important;
        bottom: 0 !important;
        padding-left: 2rem !important;
        padding-right: 2rem !important;
        box-sizing: border-box !important;
        margin: 0 !important;
        border-radius: 0 !important;
        transform: translate3d(0, 100%, 0);
      }
    }

    @media print {
      #cookiescript_injected_wrapper {
        display: none !important;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      #cookiescript_injected {
        transition: none !important;
      }
    }
  `;

  const HTML = `
    <div id="${WRAPPER_ID}" data-cs-id="cookiescript_injected">
      <div id="cookiescript_injected" tabindex="0" role="dialog" aria-modal="false" aria-label="Cookie consent dialog" data-nosnippet>
        <div class="cookiescript_pre_header">
          <div class="cookiescript_header_actions"></div>
        </div>
        <div id="cookiescript_header">WE VALUE YOUR PRIVACY</div>
        <div id="cookiescript_description">
          <span>To respect your privacy, we use cookies only where they add value. Accept all to enjoy the full Dental Barns experience (videos, before &amp; after galleries, and interactive content).<br><br>Or continue to browse the website with essential cookies only.</span>
        </div>
        <div id="cookiescript_buttons">
          <div id="cookiescript_accept" tabindex="0" role="button">Accept all (full experience)</div>
          <div id="cookiescript_reject" tabindex="0" role="button">Essential only</div>
        </div>
      </div>
    </div>
  `;

  let open = false;
  let lastFocus = null;

  function unique(values) {
    return [...new Set((values || []).filter(Boolean))];
  }

  function safeDecode(value) {
    try {
      return decodeURIComponent(value);
    } catch {
      return value;
    }
  }

  function normaliseCategories(value, action) {
    let categories = value;

    if (typeof categories === 'string') {
      try {
        categories = JSON.parse(categories);
      } catch {
        categories = categories.split(',');
      }
    }

    if (!Array.isArray(categories)) categories = [];
    categories = unique(categories.map(String));

    if (action === 'accept' && categories.length === 0) {
      categories = ALL_CATEGORIES.slice();
    }

    if (!categories.includes('strict')) categories.push('strict');
    return categories;
  }

  function readDecision() {
    const row = document.cookie
      .split('; ')
      .find(item => item.startsWith(`${COOKIE_NAME}=`));

    if (!row) return { action: undefined, categories: STRICT_ONLY.slice() };

    const raw = row.slice(COOKIE_NAME.length + 1);
    let data = null;

    for (const candidate of [raw, safeDecode(raw)]) {
      try {
        data = JSON.parse(candidate);
        break;
      } catch {}
    }

    if (!data || typeof data !== 'object') {
      return { action: undefined, categories: STRICT_ONLY.slice() };
    }

    let action = data.action ?? data.a;
    if (action === 'acceptall') action = 'accept';
    if (!['accept', 'reject'].includes(action)) action = undefined;

    const categories = normaliseCategories(data.categories ?? data.c, action);
    const state = { action, categories };
    if (data.key) state.key = data.key;
    return state;
  }

  function writeDecision(action, categories) {
    const storedCategories =
      action === 'accept'
        ? unique(categories.filter(category => category !== 'strict'))
        : [];

    const value = encodeURIComponent(
      JSON.stringify({
        action,
        categories: storedCategories,
        consenttime: Math.floor(Date.now() / 1000),
      }),
    );

    const expires = new Date(Date.now() + COOKIE_DAYS * 864e5).toUTCString();
    const secure = location.protocol === 'https:' ? '; Secure' : '';

    document.cookie = `${COOKIE_NAME}=${value}; Expires=${expires}; Path=/; SameSite=Lax${secure}`;
  }

  function dispatch(name, detail) {
    document.dispatchEvent(
      new CustomEvent(name, { bubbles: true, cancelable: true, detail }),
    );
  }

  function pushConsentUpdate(categories) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: `CookieScriptConsentUpdated[${categories.join(',')}]`,
    });
  }

  function dispatchState() {
    dispatch('CookieScriptCurrentState', api.currentState());
  }

  function dispatchCategories(categories) {
    categories.forEach(category => dispatch(`CookieScriptCategory-${category}`));
  }

  function ensureStyle() {
    if (document.querySelector('style[data-tdb-cookie-consent-lite]')) return;

    const style = document.createElement('style');
    style.setAttribute('data-tdb-cookie-consent-lite', VERSION);
    style.textContent = CSS;
    document.head.appendChild(style);
  }

  function activateWithKeyboard(element, callback) {
    element.addEventListener('click', callback);
    element.addEventListener('keydown', event => {
      if (!['Enter', ' ', 'Spacebar'].includes(event.key)) return;
      event.preventDefault();
      callback();
    });
  }

  function show() {
    if (open || document.getElementById(WRAPPER_ID)) return;

    ensureStyle();
    lastFocus = document.activeElement;
    document.body.insertAdjacentHTML('beforeend', HTML);
    open = true;

    const panel = document.getElementById('cookiescript_injected');
    const accept = document.getElementById('cookiescript_accept');
    const reject = document.getElementById('cookiescript_reject');

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        panel.classList.add('tdb-cookie-visible');
      });
    });

    activateWithKeyboard(accept, api.acceptAllAction);
    activateWithKeyboard(reject, api.rejectAllAction);

    panel.addEventListener('keydown', event => {
      if (event.key !== 'Tab') return;

      const controls = [accept, reject];
      const index = controls.indexOf(document.activeElement);

      if (event.shiftKey && index <= 0) {
        event.preventDefault();
        reject.focus();
      } else if (!event.shiftKey && index === controls.length - 1) {
        event.preventDefault();
        accept.focus();
      }
    });
  }

  function hide() {
    const wrapper = document.getElementById(WRAPPER_ID);
    if (!wrapper) return;

    const panel = document.getElementById('cookiescript_injected');

    const finish = () => {
      wrapper.remove();
      open = false;

      if (lastFocus instanceof HTMLElement && document.contains(lastFocus)) {
        lastFocus.focus({ preventScroll: true });
      }
    };

    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      finish();
      return;
    }

    panel.classList.remove('tdb-cookie-visible');
    setTimeout(finish, MOTION_MS);
  }

  function acceptAll() {
    writeDecision('accept', ALL_CATEGORIES);
    hide();

    setTimeout(() => {
      api.onAcceptAll();
      dispatch('CookieScriptAcceptAll');
      dispatchState();
      dispatchCategories(ALL_CATEGORIES);
      pushConsentUpdate(ALL_CATEGORIES);
    }, 100);
  }

  function rejectAll() {
    writeDecision('reject', STRICT_ONLY);
    hide();

    setTimeout(() => {
      api.onReject();
      dispatch('CookieScriptReject');
      dispatchState();
      dispatchCategories(STRICT_ONLY);
      pushConsentUpdate(STRICT_ONLY);
    }, 100);
  }

  const api = {
    __tdbLite: true,
    version: VERSION,
    onAcceptAll() {},
    onAccept() {},
    onReject() {},
    onClose() {},
    dispatchEventNames: [],
    currentState: readDecision,
    categories: () => ALL_CATEGORIES.slice(),
    expireDays: () => COOKIE_DAYS,
    hash: () => `tdb-cookie-consent-lite-${VERSION}`,
    show,
    showDetails: show,
    hide,
    acceptAllAction: acceptAll,
    rejectAllAction: rejectAll,
    acceptAction(categories) {
      if (Array.isArray(categories) && categories.includes('performance')) {
        acceptAll();
      } else {
        rejectAll();
      }
    },
    applyCurrentCookiesState: dispatchState,
    forceDispatchCSLoadEvent() {
      dispatch('CookieScriptLoaded');
    },
    getCookieValueForQueryArg() {
      const row = document.cookie
        .split('; ')
        .find(item => item.startsWith(`${COOKIE_NAME}=`));

      return row
        ? `${COOKIE_NAME}=${encodeURIComponent(row.slice(COOKIE_NAME.length + 1))}`
        : '';
    },
  };

  window.CookieScript = window.CookieScript || function CookieScript() {};
  window.CookieScript.instance = api;
  window.CookieScript.init = () => api;
  window.CookieScript.autoDisable = () => {};
  window.CookieScript.autoDisableStop = () => {};

  function boot() {
    ensureStyle();
    const state = readDecision();
    if (!state.action) show();
    dispatch('CookieScriptLoaded');
    dispatch('CookieScriptCurrentState', state);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();
