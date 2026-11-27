(function () {
  var cfg = window.SITE_CONFIG;
  if (!cfg) return;

  var WA_ICON =
    '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false"><path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>';

  /* Iconos de la franja de confianza. La clave es `icono` en config.js. */
  var ICONS = {
    truck: '<path d="M3 7h11v8H3zM14 10h4l3 3v2h-7z"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
    pin: '<path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7z"/><circle cx="12" cy="9" r="2.6" fill="#fff"/>',
    store: '<path d="M4 4h16l1.4 5.2A3.2 3.2 0 0 1 18.3 13 3.1 3.1 0 0 1 15 10.6 3.1 3.1 0 0 1 11.9 13 3.1 3.1 0 0 1 9 10.6 3.1 3.1 0 0 1 5.7 13 3.2 3.2 0 0 1 2.6 9.2z"/><path d="M4.5 13.6V21h15v-7.4"/>',
    chat: '<path d="M4 4h16v12H8l-4 4z"/>',
    snow: '<path d="M12 2v20M3.5 7l17 10M20.5 7l-17 10"/>'
  };

  function esc(value) {
    return String(value).replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  }

  function icon(name) {
    var body = ICONS[name] || ICONS.snow;
    var filled = name === "truck" || name === "pin" || name === "store" || name === "chat";
    return (
      '<svg class="ico" viewBox="0 0 24 24" width="26" height="26" aria-hidden="true" focusable="false" ' +
      (filled
        ? 'fill="currentColor" stroke="none"'
        : 'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"') +
      ">" + body + "</svg>"
    );
  }

  function waLink(message) {
    var digits = String(cfg.whatsappNumber || "").replace(/\D/g, "");
    return "https://wa.me/" + digits + "?text=" + encodeURIComponent(message || "");
  }

  function buildConsulta(data) {
    var lines = [
      "Hola, soy " + data.nombre.trim() + " de " + data.localidad.trim() + "."
    ];
    if (data.comercio && data.comercio.trim()) {
      lines.push("Comercio: " + data.comercio.trim() + ".");
    }
    lines.push("Quiero consultar por: " + data.tipo.trim() + ".");
    var medidas = [];
    if (data.ancho && data.ancho.trim()) medidas.push("ancho " + data.ancho.trim() + " m");
    if (data.largo && data.largo.trim()) medidas.push("largo " + data.largo.trim() + " m");
    if (data.alto && data.alto.trim()) medidas.push("alto " + data.alto.trim() + " m");
    if (medidas.length) {
      lines.push("Medidas aproximadas de la cámara: " + medidas.join(", ") + ".");
    }
    if (data.producto && data.producto.trim()) {
      lines.push("Producto que se conserva: " + data.producto.trim() + ".");
    }
    lines.push(data.descripcion.trim());
    return lines.join("\n");
  }

  window.AMG = { waLink: waLink, buildConsulta: buildConsulta };

  /* El <title> y la meta description se escriben en index.html para que los
     lean también los buscadores que no ejecutan JavaScript. No los pisamos acá. */

  function setText(id, value) {
    var el = document.getElementById(id);
    if (el && value) el.textContent = value;
  }

  function fill(id, html) {
    var el = document.getElementById(id);
    if (el) el.innerHTML = html;
  }

  document.querySelectorAll("[data-field]").forEach(function (el) {
    var key = el.getAttribute("data-field");
    if (cfg[key]) el.textContent = cfg[key];
  });

  document.querySelectorAll("[data-logo]").forEach(function (el) {
    var lines = cfg.logoLines || ["AMG", "FRIO"];
    el.innerHTML = lines.map(esc).join("<br>");
  });

  document.querySelectorAll("[data-wa]").forEach(function (el) {
    var key = el.getAttribute("data-wa");
    var message = (cfg.messages && cfg.messages[key]) || (cfg.messages && cfg.messages.general) || "";
    el.href = waLink(message);
  });

  document.querySelectorAll("[data-tel]").forEach(function (el) {
    el.href = "tel:+" + String(cfg.whatsappNumber || "").replace(/\D/g, "");
  });

  function waButton(label, message, extraClass) {
    return (
      '<a class="btn-wa' + (extraClass ? " " + extraClass : "") + '" href="' +
      esc(waLink(message)) + '">' + WA_ICON + esc(label) + "</a>"
    );
  }

  /* Franja de confianza */
  var trust = document.getElementById("trust-list");
  if (trust && cfg.confianza && cfg.confianza.length) {
    trust.innerHTML = cfg.confianza.map(function (item) {
      return (
        "<li>" +
          icon(item.icono) +
          "<div><p class=\"trust__title\">" + esc(item.titulo) + "</p>" +
          "<p class=\"trust__detail\">" + esc(item.detalle || "") + "</p></div>" +
        "</li>"
      );
    }).join("");
  }

  /* Atajos de diagnóstico: cada uno abre WhatsApp con el síntoma ya escrito */
  var triage = document.getElementById("triage-grid");
  if (triage && cfg.diagnostico && cfg.diagnostico.items) {
    setText("diagnostico-titulo", cfg.diagnostico.titulo);
    setText("diagnostico-bajada", cfg.diagnostico.bajada);
    triage.innerHTML = cfg.diagnostico.items.map(function (item) {
      return (
        '<a class="triage__item" href="' + esc(waLink(item.mensaje)) + '">' +
          '<span class="triage__text">' + esc(item.etiqueta) + "</span>" +
          '<span class="triage__go" aria-hidden="true">' + WA_ICON + "</span>" +
        "</a>"
      );
    }).join("");
  }

  /* Pasos de «Cómo trabajamos» */
  var steps = document.getElementById("steps-list");
  if (steps && cfg.pasos && cfg.pasos.length) {
    steps.innerHTML = cfg.pasos.map(function (paso, i) {
      return (
        "<li>" +
          '<p class="steps__num">' + (i + 1) + "</p>" +
          "<h3>" + esc(paso.titulo) + "</h3>" +
          "<p>" + esc(paso.detalle || "") + "</p>" +
        "</li>"
      );
    }).join("");
  }

  /* Localidades */
  var zonasList = document.getElementById("zonas-list");
  if (zonasList && cfg.localidades && cfg.localidades.length) {
    zonasList.innerHTML = cfg.localidades.map(function (loc) {
      return "<li>" + esc(loc) + "</li>";
    }).join("");
  }

  /* Sección de cámaras frigoríficas */
  var cam = cfg.camaras;
  if (cam) {
    setText("camaras-titulo", cam.titulo);
    setText("camaras-bajada", cam.bajada);
    if (cam.porQue) {
      setText("camaras-porque-titulo", cam.porQue.titulo);
      setText("camaras-porque-texto", cam.porQue.texto);
      fill("camaras-senales", (cam.porQue.senales || []).map(function (s) {
        return "<li>" + esc(s) + "</li>";
      }).join(""));
    }
    if (cam.tipos) {
      setText("camaras-tipos-titulo", cam.tipos.titulo);
      setText("camaras-tipos-texto", cam.tipos.texto);
      fill("camaras-tipos", (cam.tipos.items || []).map(function (t) {
        return (
          '<div class="temp">' +
            '<p class="temp__name">' + esc(t.titulo) + "</p>" +
            '<p class="temp__range">' + esc(t.rango) + "</p>" +
            '<p class="temp__detail">' + esc(t.detalle) + "</p>" +
          "</div>"
        );
      }).join(""));
    }
    if (cam.dimensionar) {
      setText("camaras-dim-titulo", cam.dimensionar.titulo);
      setText("camaras-dim-texto", cam.dimensionar.texto);
      setText("camaras-dim-resumen", cam.dimensionar.resumen);
      fill("camaras-dim-items", (cam.dimensionar.items || []).map(function (d) {
        return "<li>" + esc(d) + "</li>";
      }).join(""));
      setText("camaras-dim-cierre", cam.dimensionar.cierre);
    }
  }

  var grid = document.getElementById("service-grid");
  var select = document.getElementById("tipo-equipo");
  if (grid && cfg.services) {
    grid.innerHTML = cfg.services.map(function (service) {
      return (
        '<article class="card' + (service.destacado ? " card--top" : "") + '">' +
          '<div class="card__media">' +
            (service.imagen
              ? '<img src="' + esc(service.imagen) + '" alt="' + esc(service.alt) + '" width="960" height="600" loading="lazy" decoding="async">'
              : '<div class="ph ph--service" role="img" aria-label="' + esc(service.titulo) + '"><span class="ph__emoji" aria-hidden="true">' + (service.placeholderEmoji || "📷") + "</span></div>") +
          "</div>" +
          '<div class="card__body">' +
            "<h3>" + esc(service.titulo) + "</h3>" +
            "<p>" + esc(service.descripcion) + "</p>" +
            '<div class="card__actions">' +
              (service.acciones && service.acciones.length
                ? service.acciones.map(function (action) { return waButton(action.etiqueta, action.mensaje); }).join("")
                : waButton("Consultar por WhatsApp", service.mensaje)) +
            "</div>" +
          "</div>" +
        "</article>"
      );
    }).join("");

    if (select) {
      cfg.services.forEach(function (service) {
        var option = document.createElement("option");
        option.value = service.titulo;
        option.textContent = service.titulo;
        select.appendChild(option);
      });
    }
  }

  var camarasBox = document.getElementById("camaras-acciones");
  if (camarasBox && cfg.services) {
    var camaras = null;
    cfg.services.forEach(function (service) {
      if (service.id === "camaras") camaras = service;
    });
    var acciones = (camaras && camaras.acciones) || [];
    camarasBox.innerHTML = acciones.map(function (action) {
      return (
        '<article class="choice">' +
          "<h3>" + esc(action.etiqueta) + "</h3>" +
          waButton("Consultar por WhatsApp", action.mensaje) +
        "</article>"
      );
    }).join("");
  }

  var planes = document.getElementById("propuestas");
  if (planes && cfg.propuestas) {
    planes.innerHTML = cfg.propuestas.map(function (plan) {
      var items = (plan.incluye || []).map(function (item) {
        return "<li>" + esc(item) + "</li>";
      }).join("");
      return (
        '<article class="plan' + (plan.destacado ? " plan--top" : "") + '">' +
          (plan.destacado ? '<p class="plan__flag">La más elegida para comercios</p>' : "") +
          "<h3>" + esc(plan.titulo) + "</h3>" +
          "<p>" + esc(plan.detalle || "") + "</p>" +
          '<ul class="ticks">' + items + "</ul>" +
          waButton("Armar una propuesta", plan.mensaje) +
        "</article>"
      );
    }).join("");
  }

  var clientes = document.getElementById("clientes");
  if (clientes && cfg.showClientLogos) {
    clientes.hidden = false;
    var logos = document.getElementById("client-logos");
    var items = cfg.clientLogos || [];
    if (!items.length) {
      logos.innerHTML = "<li>Cuando haya logos de clientes reales, los publicamos acá.</li>";
    } else {
      logos.innerHTML = items.map(function (item) {
        return '<li><img src="' + esc(item.imagen) + '" alt="' + esc(item.alt || item.nombre || "Logo de cliente") + '"></li>';
      }).join("");
    }
  }

  var trabajosSection = document.getElementById("trabajos");
  var trabajosNav = document.querySelectorAll("[data-nav-trabajos], a[href='#trabajos']");
  if (!cfg.showTrabajos) {
    if (trabajosSection) {
      trabajosSection.hidden = true;
      trabajosSection.setAttribute("hidden", "");
    }
    trabajosNav.forEach(function (el) {
      el.hidden = true;
      el.setAttribute("hidden", "");
    });
  } else {
    if (trabajosSection) {
      trabajosSection.hidden = false;
      trabajosSection.removeAttribute("hidden");
    }
    trabajosNav.forEach(function (el) {
      el.hidden = false;
      el.removeAttribute("hidden");
    });
  }

  var trabajosGrid = document.getElementById("trabajos-grid");
  if (trabajosGrid && cfg.showTrabajos) {
    var trabajos = cfg.trabajos || [];
    if (!trabajos.length) {
      trabajosGrid.innerHTML = [0, 1, 2].map(function () {
        return '<div class="shot"><p class="shot__title">Foto real pendiente</p><p>Acá va una foto de un trabajo de AMG Frío. Todavía no cargamos imágenes.</p></div>';
      }).join("");
    } else {
      trabajosGrid.innerHTML = trabajos.map(function (item) {
        return (
          '<article class="shot shot--real">' +
            '<img src="' + esc(item.imagen) + '" alt="' + esc(item.alt || item.titulo || "") + '" width="800" height="600" loading="lazy" decoding="async">' +
            "<h3>" + esc(item.titulo || "") + "</h3>" +
            "<p>" + esc(item.descripcion || "") + "</p>" +
          "</article>"
        );
      }).join("");
    }
  }

  var antesSection = document.getElementById("antes-despues");
  if (antesSection && !cfg.showAntesDespues) {
    antesSection.hidden = true;
    antesSection.setAttribute("hidden", "");
  }
  var carousel = document.getElementById("antes-carousel");
  if (carousel && cfg.showAntesDespues && cfg.antesDespues && cfg.antesDespues.length) {
    var pairs = cfg.antesDespues;
    var index = 0;

    function pane(src, label, kind) {
      if (src) {
        return '<img src="' + esc(src) + '" alt="' + esc(label) + '" width="640" height="400">';
      }
      return (
        '<div class="ph ph--' + kind + '" role="img" aria-label="' + esc(label) + '">' +
          '<span class="ph__emoji" aria-hidden="true">📷</span>' +
          '<span class="ph__label">' + esc(label) + '</span>' +
        '</div>'
      );
    }

    carousel.innerHTML =
      '<div class="carousel__viewport" tabindex="0">' +
        pairs.map(function (pair, i) {
          return (
            '<article class="carousel__slide" data-index="' + i + '" aria-roledescription="diapositiva">' +
              '<h3>' + esc(pair.titulo) + '</h3>' +
              '<div class="compare">' +
                pane(pair.despues, pair.despuesRotulo, "after") +
                '<div class="compare__before">' + pane(pair.antes, pair.antesRotulo, "before") + '</div>' +
                '<input class="compare__range" type="range" min="8" max="92" value="50" aria-label="Comparar antes y después: ' + esc(pair.titulo) + '">' +
              '</div>' +
            '</article>'
          );
        }).join("") +
      '</div>' +
      '<div class="carousel__bar">' +
        '<button type="button" class="carousel__prev" aria-label="Trabajo anterior">Anterior</button>' +
        '<div class="carousel__dots">' +
          pairs.map(function (pair, i) {
            return '<button type="button" class="carousel__dot" data-go="' + i + '" aria-label="' + esc(pair.titulo) + '"></button>';
          }).join("") +
        '</div>' +
        '<button type="button" class="carousel__next" aria-label="Trabajo siguiente">Siguiente</button>' +
      '</div>';

    var slides = carousel.querySelectorAll(".carousel__slide");
    var dots = carousel.querySelectorAll(".carousel__dot");
    var status = document.createElement("p");
    status.className = "sr-only";
    status.setAttribute("aria-live", "polite");
    carousel.appendChild(status);

    function show(next) {
      index = (next + slides.length) % slides.length;
      slides.forEach(function (slide, i) {
        var on = i === index;
        slide.hidden = !on;
        slide.setAttribute("aria-hidden", on ? "false" : "true");
      });
      dots.forEach(function (dot, i) {
        if (i === index) dot.setAttribute("aria-current", "true");
        else dot.removeAttribute("aria-current");
      });
      status.textContent = pairs[index].titulo + ", " + (index + 1) + " de " + pairs.length;
    }

    carousel.querySelector(".carousel__prev").addEventListener("click", function () { show(index - 1); });
    carousel.querySelector(".carousel__next").addEventListener("click", function () { show(index + 1); });
    dots.forEach(function (dot) {
      dot.addEventListener("click", function () { show(Number(dot.getAttribute("data-go"))); });
    });
    carousel.querySelectorAll(".compare__range").forEach(function (range) {
      function paint() {
        range.parentNode.style.setProperty("--cut", range.value + "%");
      }
      range.addEventListener("input", paint);
      paint();
    });
    var view = carousel.querySelector(".carousel__viewport");
    var startX = null;
    view.addEventListener("pointerdown", function (event) {
      if (event.target.closest("input, button")) return;
      startX = event.clientX;
    });
    view.addEventListener("pointerup", function (event) {
      if (startX === null) return;
      var delta = event.clientX - startX;
      startX = null;
      if (Math.abs(delta) < 48) return;
      show(delta < 0 ? index + 1 : index - 1);
    });
    view.addEventListener("keydown", function (event) {
      if (event.target.classList && event.target.classList.contains("compare__range")) return;
      if (event.key === "ArrowRight") { event.preventDefault(); show(index + 1); }
      if (event.key === "ArrowLeft") { event.preventDefault(); show(index - 1); }
    });
    show(0);
  }

  var quieto = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* Entradas al hacer scroll. Los hijos de una grilla entran escalonados:
     cada uno lleva --i y el CSS lo convierte en un retardo. */
  if (!quieto.matches && "IntersectionObserver" in window) {
    var GRILLAS = "#trust-list, #triage-grid, #service-grid, #propuestas, #steps-list, #zonas-list, .camaras__grid, .temps, .chips, .acc";

    document.querySelectorAll(GRILLAS).forEach(function (grilla) {
      var hijos = grilla.children;
      for (var i = 0; i < hijos.length; i++) {
        hijos[i].classList.add("rise");
        hijos[i].style.setProperty("--i", Math.min(i, 8));
      }
    });

    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        el.classList.add("is-in");
        revealObserver.unobserve(el);
        /* Terminada la entrada sacamos las clases: dejan de pisar el
           transition del hover, que si no quedaría lento y con retardo. */
        if (el.classList.contains("rise")) {
          var orden = parseInt(el.style.getPropertyValue("--i"), 10) || 0;
          setTimeout(function () {
            el.classList.remove("rise", "is-in");
            el.style.removeProperty("--i");
          }, 650 + orden * 70);
        }
      });
    }, { threshold: 0.05, rootMargin: "0px 0px -40px 0px" });

    document.querySelectorAll("main .section, .closer").forEach(function (section) {
      section.classList.add("reveal");
      revealObserver.observe(section);
    });
    document.querySelectorAll(".rise").forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    document.querySelectorAll(".rise, .reveal").forEach(function (el) {
      el.classList.add("is-in");
    });
  }

  /* El encabezado se achica apenas se baja, para dar aire. */
  var header = document.querySelector(".site-header");
  if (header) {
    var ticking = false;
    function marcarScroll() {
      header.classList.toggle("is-stuck", window.scrollY > 40);
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(marcarScroll);
    }, { passive: true });
    marcarScroll();
  }

  var reviews = document.getElementById("resenas");
  if (reviews && cfg.showReviews) {
    reviews.hidden = false;
    var list = document.getElementById("review-list");
    var reviewItems = cfg.reviews || [];
    if (!reviewItems.length) {
      list.innerHTML = "<p>Cuando haya reseñas reales de clientes, las vamos a publicar acá.</p>";
    } else {
      list.innerHTML = reviewItems.map(function (item) {
        return (
          "<blockquote><p>" + esc(item.texto || "") + "</p><footer>" + esc(item.nombre || "") + "</footer></blockquote>"
        );
      }).join("");
    }
  }

  /* Acordeón con apertura suave. El panel cerrado mantiene el atributo hidden
     para que no lo lean los lectores de pantalla; la altura se anima a mano
     porque no se puede hacer una transición desde hidden. */
  /* Deja el panel como quedó: sin altura fija y, si corresponde, oculto.
     Se llama al terminar la transición o por las dudas con un plazo, porque
     si la transición no llega a arrancar transitionend nunca se dispara. */
  function limpiarPanel(panel, ocultar) {
    if (panel._fin) {
      clearTimeout(panel._fin);
      panel._fin = null;
    }
    panel.classList.remove("is-moving");
    panel.style.height = "";
    panel.style.overflow = "";
    if (ocultar) panel.hidden = true;
  }

  function animarAlto(panel, desde, hasta, ocultarAlFinal) {
    panel.classList.add("is-moving");
    panel.style.overflow = "hidden";
    panel.style.height = desde + "px";
    /* Leer una medida obliga al navegador a aplicar la altura de arranque.
       Sin esto agrupa los dos cambios y no hay transición que animar. */
    void panel.offsetHeight;
    panel.style.height = hasta + "px";

    function fin(ev) {
      if (ev && ev.propertyName !== "height") return;
      panel.removeEventListener("transitionend", fin);
      limpiarPanel(panel, ocultarAlFinal);
    }
    panel.addEventListener("transitionend", fin);
    panel._fin = setTimeout(function () {
      panel.removeEventListener("transitionend", fin);
      limpiarPanel(panel, ocultarAlFinal);
    }, 500);
  }

  function abrirPanel(panel) {
    limpiarPanel(panel, false);
    panel.hidden = false;
    if (quieto.matches) return;
    animarAlto(panel, 0, panel.scrollHeight, false);
  }

  function cerrarPanel(panel) {
    limpiarPanel(panel, false);
    if (quieto.matches) {
      panel.hidden = true;
      return;
    }
    animarAlto(panel, panel.scrollHeight, 0, true);
  }

  document.querySelectorAll(".acc__btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var panel = document.getElementById(btn.getAttribute("aria-controls"));
      var open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", open ? "false" : "true");
      if (!panel) return;
      if (open) cerrarPanel(panel);
      else abrirPanel(panel);
    });
  });

  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  function closeNav() {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", "false");
    nav.classList.remove("is-open");
    var label = toggle.querySelector("[data-label]");
    if (label) label.textContent = "Abrir menú";
  }
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", open ? "false" : "true");
      nav.classList.toggle("is-open", !open);
      var label = toggle.querySelector("[data-label]");
      if (label) label.textContent = open ? "Abrir menú" : "Cerrar menú";
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeNav();
    });
  }

  /* Marca en el menú la sección que se está mirando. */
  if (nav && "IntersectionObserver" in window) {
    var navLinks = {};
    nav.querySelectorAll("a[href^='#']").forEach(function (link) {
      navLinks[link.getAttribute("href").slice(1)] = link;
    });
    var visible = {};
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        visible[entry.target.id] = entry.isIntersecting;
      });
      var current = null;
      Object.keys(navLinks).forEach(function (id) {
        if (!current && visible[id]) current = id;
      });
      Object.keys(navLinks).forEach(function (id) {
        if (id === current) navLinks[id].setAttribute("aria-current", "true");
        else navLinks[id].removeAttribute("aria-current");
      });
    }, { rootMargin: "-45% 0px -45% 0px" });
    Object.keys(navLinks).forEach(function (id) {
      var section = document.getElementById(id);
      if (section) spy.observe(section);
    });
  }

  var form = document.getElementById("consulta-form");
  if (form) {
    var fields = [
      { id: "nombre", message: "Ingresá tu nombre." },
      { id: "localidad", message: "Ingresá tu localidad." },
      { id: "tipo-equipo", message: "Elegí el tipo de equipo." },
      { id: "descripcion", message: "Contanos qué problema tiene el equipo." }
    ];

    function showError(id, message) {
      var input = document.getElementById(id);
      var error = document.getElementById(id + "-error");
      if (!input || !error) return;
      if (message) {
        input.setAttribute("aria-invalid", "true");
        error.hidden = false;
        error.textContent = message;
      } else {
        input.removeAttribute("aria-invalid");
        error.hidden = true;
        error.textContent = "";
      }
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var firstInvalid = null;
      var values = {};
      fields.forEach(function (field) {
        var input = document.getElementById(field.id);
        var value = input ? input.value.trim() : "";
        values[field.id] = value;
        if (!value) {
          showError(field.id, field.message);
          if (!firstInvalid) firstInvalid = input;
        } else {
          showError(field.id, "");
        }
      });
      if (firstInvalid) {
        firstInvalid.focus();
        return;
      }
      var text = buildConsulta({
        nombre: values.nombre,
        localidad: values.localidad,
        comercio: (document.getElementById("comercio") || {}).value || "",
        tipo: values["tipo-equipo"],
        ancho: (document.getElementById("ancho") || {}).value || "",
        largo: (document.getElementById("largo") || {}).value || "",
        alto: (document.getElementById("alto") || {}).value || "",
        producto: (document.getElementById("producto") || {}).value || "",
        descripcion: values.descripcion
      });
      if (window.fbq) window.fbq("track", "Lead");
      window.location.href = waLink(text);
    });
  }

  /* Píxel de Meta.
     Sin `metaPixelId` en config.js no se carga nada, no se pide ningún script
     a Facebook y no se rastrea a nadie. Con el ID puesto, se avisa la visita
     y cada clic en WhatsApp o en llamar. */
  var pixelId = String(cfg.metaPixelId || "").replace(/\D/g, "");
  if (pixelId) {
    /* eslint-disable */
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = "2.0"; n.queue = [];
      t = b.createElement(e); t.async = !0; t.src = v;
      s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    }(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    /* eslint-enable */
    window.fbq("init", pixelId);
    window.fbq("track", "PageView");

    document.addEventListener("click", function (event) {
      var link = event.target.closest && event.target.closest("a[href]");
      if (!link || !window.fbq) return;
      var href = link.getAttribute("href") || "";
      if (href.indexOf("https://wa.me/") === 0 || href.indexOf("tel:") === 0) {
        window.fbq("track", "Contact");
      }
    });
  }
})();
