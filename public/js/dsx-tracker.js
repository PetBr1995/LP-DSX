(function () {
  "use strict";

  // Evita inicializar duas vezes.
  if (window.__DSX_TRACKER_INITIALIZED__) return;
  window.__DSX_TRACKER_INITIALIZED__ = true;

  // =============================
  // Reset v0: base minima e segura
  // =============================
  var VERSION = "reset-v0";
  var FORM_SELECTOR = "#lead-form, [data-lead-form]";
  var CTA_SELECTOR = '[data-cta="sympla"], a[href*="sympla.com"]';

  var state = {
    startedAt: new Date().toISOString(),
    page: window.location.pathname + window.location.search,
    referrer: document.referrer || null,
    events: [],
  };

  function init() {
    trackPageView();
    trackCtaClick();
    trackFormSubmit();
    exposeDebugApi();
    log("initialized", {
      version: VERSION,
      form_selector: FORM_SELECTOR,
      cta_selector: CTA_SELECTOR,
    });
  }

  function trackPageView() {
    pushEvent("page_view", {
      title: document.title || null,
      url: window.location.href,
      referrer: state.referrer,
    });
  }

  function trackCtaClick() {
    document.addEventListener(
      "click",
      function (event) {
        var target = event.target;
        if (!(target instanceof Element)) return;

        var cta = target.closest(CTA_SELECTOR);
        if (!cta) return;

        pushEvent("cta_click", {
          text: normalizeText(cta.textContent),
          href: cta.getAttribute("href") || null,
          id: cta.id || null,
          classes: cta.className || null,
        });
      },
      true
    );
  }

  function trackFormSubmit() {
    document.addEventListener(
      "submit",
      function (event) {
        var form = event.target;
        if (!(form instanceof HTMLFormElement)) return;
        if (!form.matches(FORM_SELECTOR)) return;

        var fields = readFormFields(form);
        pushEvent("lead_form_submit", {
          form_id: form.id || null,
          field_names: Object.keys(fields),
          has_name: !!fields.name,
          has_email: !!fields.email,
          has_phone: !!fields.phone,
          has_cargo: !!fields.cargo,
        });
      },
      true
    );
  }

  function readFormFields(form) {
    var data = new FormData(form);
    var map = {};

    data.forEach(function (value, key) {
      if (typeof key !== "string") return;
      var normalizedKey = key.trim().toLowerCase();
      if (!normalizedKey) return;
      map[normalizedKey] = normalizeText(String(value || ""));
    });

    return {
      name: pickFirst(map, ["name", "nome", "full_name", "nome_completo"]),
      email: pickFirst(map, ["email", "e-mail", "mail"]),
      phone: pickFirst(map, ["phone", "telefone", "celular", "whatsapp", "tel"]),
      cargo: pickFirst(map, ["cargo", "perfil", "voce_e", "você_e"]),
    };
  }

  function pushEvent(name, data) {
    var item = {
      name: name,
      at: new Date().toISOString(),
      page: state.page,
      data: data || {},
    };

    state.events.push(item);
    log("event", item);
  }

  function exposeDebugApi() {
    window.DSXTracker = {
      version: VERSION,
      getState: function () {
        return {
          startedAt: state.startedAt,
          page: state.page,
          referrer: state.referrer,
          totalEvents: state.events.length,
          events: state.events.slice(),
        };
      },
      clearEvents: function () {
        state.events = [];
        log("events_cleared");
      },
      track: function (name, data) {
        if (!name) return;
        pushEvent(String(name), data || {});
      },
    };
  }

  function pickFirst(obj, keys) {
    for (var i = 0; i < keys.length; i++) {
      var k = keys[i];
      if (obj[k]) return obj[k];
    }
    return null;
  }

  function normalizeText(value) {
    var text = String(value == null ? "" : value).replace(/\s+/g, " ").trim();
    return text || null;
  }

  function log(name, data) {
    try {
      if (!window.console || typeof window.console.log !== "function") return;
      window.console.log("[DSX Tracker]", name, data || {});
    } catch {
      // no-op
    }
  }

  init();
})();
