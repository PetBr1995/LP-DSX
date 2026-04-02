(function () {
  "use strict";

  // Evita inicializar duas vezes.
  if (window.__DSX_TRACKER_INITIALIZED__) return;
  window.__DSX_TRACKER_INITIALIZED__ = true;

  // =============================
  // Reset v0: base minima e segura
  // =============================
  var VERSION = "reset-v2";
  var FORM_SELECTOR = "#lead-form, [data-lead-form]";
  var CTA_SELECTOR = '[data-cta="sympla"], a[href*="sympla.com"]';
  var SECTION_SELECTOR = "[data-section]";
  var SECTION_BOOTSTRAP_TIMEOUT_MS = 12000;

  var state = {
    startedAt: new Date().toISOString(),
    page: window.location.pathname + window.location.search,
    referrer: document.referrer || null,
    events: [],
    lastScrollY: window.scrollY || window.pageYOffset || 0,
    sections: {},
    sectionObserverStarted: false,
  };

  function init() {
    trackPageView();
    trackSectionCompletion();
    trackCtaClick();
    trackFormSubmit();
    exposeDebugApi();
    log("initialized", {
      version: VERSION,
      form_selector: FORM_SELECTOR,
      cta_selector: CTA_SELECTOR,
      section_selector: SECTION_SELECTOR,
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

  function trackSectionCompletion() {
    if (!("IntersectionObserver" in window)) {
      log("section_observer_unavailable", { reason: "IntersectionObserver missing" });
      return;
    }

    waitAndStartSectionObserver();
  }

  function waitAndStartSectionObserver() {
    var startedAt = Date.now();
    var rootNode = document.documentElement || document.body;
    var mutationObserver = null;
    var intervalId = null;

    function cleanup() {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }

      if (mutationObserver) {
        mutationObserver.disconnect();
        mutationObserver = null;
      }
    }

    function tryStart(source) {
      if (state.sectionObserverStarted) return true;

      var nodes = document.querySelectorAll(SECTION_SELECTOR);
      if (nodes.length) {
        startSectionObserver(nodes);
        log("section_observer_ready", {
          source: source,
          total_sections: nodes.length,
        });
        cleanup();
        return true;
      }

      var timedOut = Date.now() - startedAt >= SECTION_BOOTSTRAP_TIMEOUT_MS;
      if (timedOut) {
        log("section_observer_unavailable", {
          reason: "No [data-section] nodes found",
          waited_ms: SECTION_BOOTSTRAP_TIMEOUT_MS,
        });
        cleanup();
        return false;
      }

      return false;
    }

    if (tryStart("init")) return;

    if (rootNode && "MutationObserver" in window) {
      mutationObserver = new MutationObserver(function () {
        tryStart("mutation");
      });
      mutationObserver.observe(rootNode, { childList: true, subtree: true });
    }

    intervalId = window.setInterval(function () {
      tryStart("interval");
    }, 250);

    window.addEventListener(
      "load",
      function () {
        tryStart("window_load");
      },
      { once: true }
    );
  }

  function startSectionObserver(nodes) {
    state.sectionObserverStarted = true;
    state.sections = {};

    nodes.forEach(function (node) {
      var sectionKey = getSectionKey(node);
      state.sections[sectionKey] = {
        seen: false,
        completed: false,
      };
    });

    var observer = new IntersectionObserver(
      function (entries) {
        var currentScrollY = window.scrollY || window.pageYOffset || 0;
        var scrollingDown = currentScrollY >= state.lastScrollY;

        entries.forEach(function (entry) {
          var sectionKey = getSectionKey(entry.target);
          var progress = state.sections[sectionKey];
          if (!progress || progress.completed) return;

          if (entry.isIntersecting) {
            progress.seen = true;
            return;
          }

          // "Percorreu a secao" = entrou em viewport e saiu pelo topo no scroll para baixo.
          var passedThroughSection = progress.seen && scrollingDown && entry.boundingClientRect.bottom <= 0;
          if (!passedThroughSection) return;

          progress.completed = true;
          pushEvent("section_completed", {
            section: sectionKey,
            section_id: entry.target.id || null,
            message: "Usuario percorreu a secao especifica",
          });
        });

        state.lastScrollY = currentScrollY;
      },
      {
        threshold: 0,
      }
    );

    Array.prototype.forEach.call(nodes, function (node) {
      observer.observe(node);
    });
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

  function getSectionKey(node) {
    if (!node || !(node instanceof Element)) return "unknown-section";
    return (
      normalizeText(node.getAttribute("data-section")) ||
      normalizeText(node.id) ||
      "unknown-section"
    );
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
