// Subcritical Systems — rebuild scripts (vanilla JS, no build step)

document.addEventListener('DOMContentLoaded', () => {
  initNavToggle();
  initHeroStarburst();
  initDiagram();
  initFaq();
  initContactForm();
  initActiveNav();
});

/* ---------- Mobile nav ---------- */
function initNavToggle() {
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (!toggle || !links) return;
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  links.querySelectorAll('a').forEach((a) =>
    a.addEventListener('click', () => {
      links.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    })
  );
}

/* ---------- Hero starburst mark ---------- */
// Recreates the client's dandelion/starburst logo mark as an inline SVG so it
// scales cleanly and carries a continuous "energizing" animation (rays draw
// in once, then keep shimmering and slowly orbiting, with the whole mark
// gently breathing) — swap this for their real logo file once available.
function initHeroStarburst() {
  const svg = document.getElementById('heroStarburst');
  if (!svg) return;
  const ns = 'http://www.w3.org/2000/svg';
  const cx = 700, cy = 260; // burst center sits right of the wordmark (bigger viewBox: 0 0 960 520)
  const rayCount = 46;
  const wrapper = document.createElementNS(ns, 'g');
  wrapper.setAttribute('class', 'hero-mark-group');
  const g = document.createElementNS(ns, 'g');
  wrapper.appendChild(g);

  for (let i = 0; i < rayCount; i++) {
    const angle = (i / rayCount) * Math.PI * 2 + (i % 2 === 0 ? 0.05 : -0.03);
    const len = 110 + Math.random() * 130;
    const x2 = cx + Math.cos(angle) * len;
    const y2 = cy + Math.sin(angle) * len;

    const ray = document.createElementNS(ns, 'line');
    ray.setAttribute('x1', cx);
    ray.setAttribute('y1', cy);
    ray.setAttribute('x2', x2);
    ray.setAttribute('y2', y2);
    ray.setAttribute('stroke', '#ffffff');
    ray.setAttribute('stroke-width', '1');
    ray.setAttribute('class', 'beam-ray');
    ray.style.animationDelay = `${i * 0.03}s, ${i * 0.09}s`;
    g.appendChild(ray);

    const dot = document.createElementNS(ns, 'circle');
    dot.setAttribute('cx', x2);
    dot.setAttribute('cy', y2);
    dot.setAttribute('r', '4.5');
    dot.setAttribute('fill', '#ffffff');
    g.appendChild(dot);

    // A slow orbiting trail dot on a subset of rays for continuous motion
    if (i % 3 === 0) {
      const orbit = document.createElementNS(ns, 'circle');
      const orbitLen = len * (0.4 + Math.random() * 0.35);
      const ox = cx + Math.cos(angle) * orbitLen;
      const oy = cy + Math.sin(angle) * orbitLen;
      orbit.setAttribute('cx', ox);
      orbit.setAttribute('cy', oy);
      orbit.setAttribute('r', '2');
      orbit.setAttribute('fill', 'var(--accent)');
      orbit.setAttribute('class', 'beam-ray-trail');
      orbit.style.animationDuration = `${14 + Math.random() * 10}s`;
      orbit.style.animationDelay = `${Math.random() * -20}s`;
      g.appendChild(orbit);
    }
  }

  // A single long horizontal ray to the left, matching the reference mark
  const longRay = document.createElementNS(ns, 'line');
  longRay.setAttribute('x1', 70);
  longRay.setAttribute('y1', cy);
  longRay.setAttribute('x2', cx);
  longRay.setAttribute('y2', cy);
  longRay.setAttribute('stroke', '#ffffff');
  longRay.setAttribute('stroke-width', '1');
  g.insertBefore(longRay, g.firstChild);

  const center = document.createElementNS(ns, 'circle');
  center.setAttribute('cx', cx);
  center.setAttribute('cy', cy);
  center.setAttribute('r', '5');
  center.setAttribute('fill', '#ffffff');
  center.setAttribute('class', 'beam-dot');
  g.appendChild(center);

  svg.appendChild(wrapper);
}

/* ---------- Technology diagram interactivity ---------- */
// Uses the real diagram image (images/energy-amplifier-diagram.png) with
// invisible, percentage-positioned hotspot buttons layered on top, so the
// hover/focus tooltip behavior works against the client's actual graphic.
function initDiagram() {
  const wrap = document.getElementById('diagramImageWrap');
  const tooltip = document.getElementById('diagramTooltip');
  const toggle = document.getElementById('beamToggle');
  if (!wrap || !tooltip) return;

  const hotspots = wrap.querySelectorAll('.hotspot');

  const copy = {
    accelerator: ['Proton Accelerator', 'Fires a high-energy proton beam down the line toward the spallation target — this is the throttle for the whole plant.'],
    beam: ['Proton Beam', 'The beam is the on/off switch. Cut it, and neutron production — and fission — stops within moments.'],
    core: ['Energy Amplifier Core', 'A subcritical fuel assembly: deliberately short of what it needs to sustain a chain reaction on its own.'],
    fuel: ['Fuel', 'Fissile fuel surrounding the spallation target. It only fissions while neutrons keep arriving from the beam.'],
    exchanger: ['Heat Exchanger', 'Transfers heat from the primary lead-coolant loop into a secondary loop that drives the turbine.'],
    pump1: ['Pump', 'Circulates coolant through the primary loop around the core.'],
    pump2: ['Pump', 'Circulates coolant through the secondary loop toward the turbine.'],
    turbine: ['Turbine', 'A standard steam turbine — the same proven equipment used in conventional power plants.'],
    generator: ['Generator', 'Converts the turbine’s mechanical spin into electricity.'],
    grid: ['Electrical Grid', 'Delivers the finished power to homes, businesses and data centers.'],
  };

  hotspots.forEach((node) => {
    const key = node.getAttribute('data-key');
    const entry = copy[key];
    if (!entry) return;
    const show = () => {
      hotspots.forEach((n) => n.classList.remove('is-active'));
      node.classList.add('is-active');
      tooltip.innerHTML = `<span class="tag">${entry[0]}</span><p>${entry[1]}</p>`;
    };
    node.addEventListener('mouseenter', show);
    node.addEventListener('focus', show);
    node.addEventListener('click', show);
    node.setAttribute('tabindex', '0');
  });

  if (toggle) {
    toggle.addEventListener('click', () => {
      const isOn = toggle.classList.toggle('is-on');
      toggle.setAttribute('aria-checked', String(isOn));
      wrap.classList.toggle('beam-off', !isOn);
      tooltip.innerHTML = isOn
        ? '<span class="tag">Beam on</span><p>Neutrons are flowing into the core. Fission is running, and heat is moving through the plant.</p>'
        : '<span class="tag">Beam off</span><p>No neutrons, no fission. This is the entire safety case: switching the accelerator off is enough to stop the reaction.</p>';
    });
  }
}

/* ---------- FAQ accordion ---------- */
function initFaq() {
  document.querySelectorAll('.faq-item').forEach((item) => {
    const q = item.querySelector('.faq-q');
    if (!q) return;
    q.addEventListener('click', () => {
      const wasOpen = item.classList.contains('is-open');
      item.parentElement.querySelectorAll('.faq-item').forEach((i) => i.classList.remove('is-open'));
      if (!wasOpen) item.classList.add('is-open');
    });
  });
}

/* ---------- Contact form (no backend wired yet) ---------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const note = document.getElementById('contactFormNote');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (note) {
      note.textContent = "Thanks — this demo doesn't send messages yet. Wire this form to your email or CRM before launch.";
      note.style.color = '#d9a45a';
    }
  });
}

/* ---------- Active nav link on scroll ---------- */
function initActiveNav() {
  const sections = ['aboutus', 'technology', 'team'].map((id) => document.getElementById(id)).filter(Boolean);
  const links = Array.from(document.querySelectorAll('.nav-links a'));
  if (!sections.length || !links.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((l) => l.classList.remove('is-active'));
        const match = links.find((l) => l.getAttribute('href') === `#${entry.target.id}`);
        if (match) match.classList.add('is-active');
      });
    },
    { rootMargin: '-40% 0px -50% 0px' }
  );
  sections.forEach((s) => observer.observe(s));
}
