import { useEffect } from 'react';

/**
 * useBloomMotion
 * Registers all GSAP / Lenis animations for the Bloom showcase.
 * Must be called inside a 'use client' component.
 * All GSAP + Lenis imports are dynamic so this is SSR-safe.
 */
export function useBloomMotion(): void {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let lenis: any = null;
    const cleanupFns: Array<() => void> = [];

    (async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      const { Draggable } = await import('gsap/Draggable');
      const { default: Lenis } = await import('lenis');

      gsap.registerPlugin(ScrollTrigger, Draggable);

      const $ = (s: string, ctx?: Element | Document | null): HTMLElement | null =>
        (ctx ?? document).querySelector(s) as HTMLElement | null;
      const $$ = (s: string, ctx?: Element | Document | null): HTMLElement[] =>
        Array.from((ctx ?? document).querySelectorAll(s)) as HTMLElement[];

      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;

      const EASES: Record<string, string> = {
        bounce: 'back.out(1.7)',
        smooth: 'power3.out',
        snappy: 'expo.out',
      };
      const state = { speed: 1, ease: 'bounce', reduced: prefersReduced };
      const dur = (d: number) => d / state.speed;
      const ease = () => EASES[state.ease];

      // ── THEME ──────────────────────────────────────────────────────────────
      const root = document.documentElement;
      const themeToggle = $('#themeToggle') as HTMLButtonElement | null;

      function setTheme(t: string, animate?: boolean) {
        root.setAttribute('data-theme', t);
        themeToggle?.setAttribute('aria-pressed', String(t === 'dark'));
        try { localStorage.setItem('bloom_theme', t); } catch (_) { /* ignore */ }

        // GSAP owns the knob x-position so it never conflicts with CSS transform.
        // CSS handles background-color via [data-theme="dark"] selector.
        const knobX = t === 'dark' ? 28 : 0;
        if (animate && !state.reduced) {
          gsap.fromTo('.theme-toggle .knob', { scale: 0.6 }, { x: knobX, scale: 1, duration: 0.5, ease: 'back.out(2.2)' });
        } else {
          gsap.set('.theme-toggle .knob', { x: knobX });
        }
      }
      try { setTheme(localStorage.getItem('bloom_theme') ?? 'light'); } catch (_) { setTheme('light'); }

      if (themeToggle) {
        const handler = () => {
          setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark', true);
          ScrollTrigger.refresh();
        };
        themeToggle.addEventListener('click', handler);
        cleanupFns.push(() => themeToggle.removeEventListener('click', handler));
      }

      // ── SMOOTH SCROLL ──────────────────────────────────────────────────────
      if (!state.reduced) {
        lenis = new Lenis({ duration: 1.1, smoothWheel: true, wheelMultiplier: 1, touchMultiplier: 1.6 });
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((t: number) => lenis.raf(t * 1000));
        gsap.ticker.lagSmoothing(0);
      }

      $$('a[href^="#"]').forEach(a => {
        const handler = (e: Event) => {
          const id = a.getAttribute('href');
          if (!id || id.length < 2) return;
          const el = $(id);
          if (!el) return;
          e.preventDefault();
          if (lenis) lenis.scrollTo(el, { offset: -10 });
          else el.scrollIntoView();
        };
        a.addEventListener('click', handler);
        cleanupFns.push(() => a.removeEventListener('click', handler));
      });

      // ── CUSTOM CURSOR ──────────────────────────────────────────────────────
      const cursor = $('.cursor');
      const ring = $('.cursor-ring');

      if (!isTouch && !state.reduced && cursor && ring) {
        document.body.classList.add('has-cursor');
        const cx = gsap.quickTo(cursor, 'x', { duration: 0.12, ease: 'power3' });
        const cy = gsap.quickTo(cursor, 'y', { duration: 0.12, ease: 'power3' });
        const rx = gsap.quickTo(ring, 'x', { duration: 0.32, ease: 'power3' });
        const ry = gsap.quickTo(ring, 'y', { duration: 0.32, ease: 'power3' });

        const onMove = (e: MouseEvent) => { cx(e.clientX); cy(e.clientY); rx(e.clientX); ry(e.clientY); };
        window.addEventListener('mousemove', onMove, { passive: true });
        cleanupFns.push(() => window.removeEventListener('mousemove', onMove));

        const grow = () => gsap.to(ring, { scale: 1.7, opacity: 0.35, duration: 0.3, ease: 'power3' });
        const shrink = () => gsap.to(ring, { scale: 1, opacity: 0.6, duration: 0.3, ease: 'power3' });

        $$('a, button, .magnetic, .h-chip, .habit, input').forEach(el => {
          el.addEventListener('mouseenter', grow);
          el.addEventListener('mouseleave', shrink);
          cleanupFns.push(() => {
            el.removeEventListener('mouseenter', grow);
            el.removeEventListener('mouseleave', shrink);
          });
        });

        const onDown = () => gsap.to([cursor, ring], { scale: 0.7, duration: 0.15 });
        const onUp = () => { gsap.to(cursor, { scale: 1, duration: 0.2 }); shrink(); };
        window.addEventListener('mousedown', onDown);
        window.addEventListener('mouseup', onUp);
        cleanupFns.push(() => {
          window.removeEventListener('mousedown', onDown);
          window.removeEventListener('mouseup', onUp);
        });
      } else if (cursor && ring) {
        gsap.set([cursor, ring], { opacity: 0 });
      }

      // ── MAGNETIC BUTTONS ──────────────────────────────────────────────────
      if (!isTouch && !state.reduced) {
        $$('.magnetic').forEach(el => {
          const strength = el.classList.contains('btn') ? 0.4 : 0.3;
          const onMouseMove = (e: MouseEvent) => {
            const r = el.getBoundingClientRect();
            gsap.to(el, {
              x: (e.clientX - (r.left + r.width / 2)) * strength,
              y: (e.clientY - (r.top + r.height / 2)) * strength,
              duration: 0.5,
              ease: 'power3.out',
            });
          };
          const onLeave = () => gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' });
          el.addEventListener('mousemove', onMouseMove);
          el.addEventListener('mouseleave', onLeave);
          cleanupFns.push(() => {
            el.removeEventListener('mousemove', onMouseMove);
            el.removeEventListener('mouseleave', onLeave);
          });
        });
      }

      // ── HERO TEXT SPLIT ────────────────────────────────────────────────────
      $$('[data-w]').forEach(word => {
        if (word.querySelector('.char')) return; // StrictMode double-run guard
        const text = word.textContent ?? '';
        word.textContent = '';
        word.setAttribute('aria-hidden', 'true');
        text.split('').forEach(ch => {
          const span = document.createElement('span');
          span.className = 'char';
          span.textContent = ch;
          word.appendChild(span);
        });
      });

      function playHero() {
        const tl = gsap.timeline({ defaults: { ease: ease() } });
        tl.from('.hero .char', { yPercent: 120, opacity: 0, rotation: 6, stagger: 0.028, duration: dur(0.9), ease: 'back.out(1.9)' })
          .from('.hero-copy .reveal', { y: 26, opacity: 0, stagger: 0.09, duration: dur(0.7), ease: ease() }, '-=0.5')
          .from('#heroPhone', { y: 60, opacity: 0, rotateY: -18, scale: 0.92, duration: dur(1), ease: 'power3.out' }, '-=0.9')
          .from('.chip', { scale: 0, opacity: 0, stagger: 0.12, duration: dur(0.7), ease: 'back.out(2)' }, '-=0.6')
          .from('.scroll-cue', { opacity: 0, y: 10, duration: dur(0.5) }, '-=0.2');
        return tl;
      }

      if (!state.reduced) {
        playHero();
      } else {
        gsap.set('.hero .char, .hero-copy .reveal, #heroPhone, .chip', { clearProps: 'all' });
      }

      if (!state.reduced) {
        gsap.to('.scroll-cue .mouse', { y: 6, repeat: -1, yoyo: true, duration: 0.9, ease: 'sine.inOut' });
      }

      // ── BLOBS ──────────────────────────────────────────────────────────────
      if (!state.reduced) {
        gsap.to('.blob.b1', { x: 60,  y: 40,  scale: 1.1,  duration: 9,  repeat: -1, yoyo: true, ease: 'sine.inOut' });
        gsap.to('.blob.b2', { x: -50, y: 60,  scale: 1.15, duration: 11, repeat: -1, yoyo: true, ease: 'sine.inOut' });
        gsap.to('.blob.b3', { x: 70,  y: -40, scale: 1.1,  duration: 13, repeat: -1, yoyo: true, ease: 'sine.inOut' });
        gsap.to('.blob.b4', { x: -60, y: -30, scale: 1.2,  duration: 10, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      }

      // ── HERO PHONE TILT ────────────────────────────────────────────────────
      const heroStage = $('#heroStage');
      const heroPhone = $('#heroPhone');

      if (heroStage && heroPhone && !isTouch && !state.reduced) {
        const rotY = gsap.quickTo(heroPhone, 'rotationY', { duration: 0.6, ease: 'power3' });
        const rotX = gsap.quickTo(heroPhone, 'rotationX', { duration: 0.6, ease: 'power3' });

        const chipMovers = $$('.chip').map(c => ({
          el: c,
          depth: parseFloat(c.getAttribute('data-depth') ?? '0.08'),
          qx: gsap.quickTo(c, 'x', { duration: 0.8, ease: 'power3' }),
          qy: gsap.quickTo(c, 'y', { duration: 0.8, ease: 'power3' }),
        }));

        const onMove = (e: MouseEvent) => {
          const r = heroStage.getBoundingClientRect();
          const px = (e.clientX - (r.left + r.width / 2)) / r.width;
          const py = (e.clientY - (r.top + r.height / 2)) / r.height;
          rotY(px * 18);
          rotX(-py * 14);
          chipMovers.forEach(m => { m.qx(-px * 60 * m.depth * 12); m.qy(-py * 60 * m.depth * 12); });
        };
        const onLeave = () => {
          gsap.to(heroPhone, { rotationY: 0, rotationX: 0, duration: 1, ease: 'elastic.out(1,0.5)' });
          chipMovers.forEach(m => gsap.to(m.el, { x: 0, y: 0, duration: 1, ease: 'elastic.out(1,0.4)' }));
        };

        heroStage.addEventListener('mousemove', onMove);
        heroStage.addEventListener('mouseleave', onLeave);
        cleanupFns.push(() => {
          heroStage.removeEventListener('mousemove', onMove);
          heroStage.removeEventListener('mouseleave', onLeave);
        });

        gsap.to(heroPhone, { y: -14, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      }

      // ── COUNTERS ──────────────────────────────────────────────────────────
      function fmtCount(n: number, suffix: string): string {
        let out: string;
        if (n >= 1_000_000)      out = (n / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
        else if (suffix === 'k') out = String(Math.round(n));
        else if (suffix === '★') out = (n / 10).toFixed(1);
        else                     out = Math.round(n).toLocaleString('en-US');

        if (suffix === '+') return out + '+';
        if (suffix === 'k') return out + 'k';
        if (suffix === '★') return out + '★';
        return out;
      }

      $$('[data-count]').forEach(el => {
        const target = parseFloat(el.getAttribute('data-count') ?? '0');
        const suffix = el.getAttribute('data-suffix') ?? '';
        const obj = { v: 0 };
        ScrollTrigger.create({
          trigger: el,
          start: 'top 88%',
          once: true,
          onEnter: () => {
            if (state.reduced) { el.textContent = fmtCount(target, suffix); return; }
            gsap.to(obj, {
              v: target,
              duration: dur(1.8),
              ease: 'power2.out',
              onUpdate: () => { el.textContent = fmtCount(obj.v, suffix); },
            });
          },
        });
      });

      // ── SECTION REVEALS ───────────────────────────────────────────────────
      if (!state.reduced) {
        $$('.section-head .eyebrow, .section-head h2, .section-head p, .builder-copy > *').forEach(el => {
          gsap.from(el, {
            y: 30,
            opacity: 0,
            duration: dur(0.7),
            ease: ease(),
            scrollTrigger: { trigger: el, start: 'top 85%' },
          });
        });
      }

      // ── PINNED SHOWCASE ───────────────────────────────────────────────────
      const pinPhone   = $('#pinPhone');
      const screens    = $$('#pinPhone [data-screen]');
      const copySteps  = $$('.pin-copy .step');
      const sideSteps  = $$('.pin-side .step');
      const dots       = $$('.progress-dots .pd');

      function setStep(i: number) {
        [copySteps, sideSteps].forEach(group =>
          group.forEach((s, idx) => {
            const on = idx === i;
            if (on && !s.classList.contains('active')) {
              s.classList.add('active');
              gsap.fromTo(
                s.children,
                { y: 24, opacity: 0 },
                { y: 0, opacity: 1, duration: dur(0.5), stagger: 0.06, ease: ease() },
              );
            } else if (!on) {
              s.classList.remove('active');
            }
          }),
        );
        dots.forEach((d, idx) => d.classList.toggle('on', idx === i));
      }

      let curStep = -1;
      const updateStepByProgress = (p: number) => {
        const i = p < 0.24 ? 0 : p < 0.5 ? 1 : p < 0.76 ? 2 : 3;
        if (i !== curStep) { curStep = i; setStep(i); }
      };

      // Confetti DOM pieces for the celebrate screen
      const celebrate = $('.app-screen.s-celebrate');
      const confettiColors = ['--violet', '--coral', '--lime', '--sky', '--sun', '--pink'];
      const confettiPieces: HTMLElement[] = [];

      if (celebrate) {
        for (let i = 0; i < 16; i++) {
          const c = document.createElement('span');
          c.className = 'confetti';
          c.style.background = `var(${confettiColors[i % confettiColors.length]})`;
          celebrate.appendChild(c);
          confettiPieces.push(c);
        }
      }

      if (pinPhone && screens.length && !state.reduced) {
        gsap.set(screens[0], { opacity: 1 });
        const checks = $$('[data-screen="0"] [data-h]');
        checks.forEach(h => {
          const c = $('.check', h);
          if (c) gsap.set(c, { backgroundColor: 'rgba(0,0,0,0)' });
        });

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: '.pin-stage',
            start: 'top top',
            end: '+=420%',
            scrub: 0.7,
            pin: true,
            anticipatePin: 1,
            onUpdate: (self: any) => updateStepByProgress(self.progress),
            invalidateOnRefresh: true,
          },
        });

        // Habit check-off animation
        checks.forEach((h, idx) => {
          const chk   = $('.check', h);
          const svgEl = chk ? $('svg', chk) : null;
          const tt    = $('.tt b', h);
          const t     = idx * 0.18;
          if (chk)   tl.to(chk,   { backgroundColor: 'var(--lime)', borderColor: 'var(--lime)', duration: 0.18 }, t);
          if (svgEl) tl.to(svgEl, { opacity: 1, scale: 1, duration: 0.18, ease: 'back.out(2.5)' }, t);
          if (tt)    tl.to(tt,    { opacity: 0.5, duration: 0.18 }, t);
        });

        // Screen transitions
        tl.to(screens[0], { opacity: 0, scale: 0.95, duration: 0.3 }, 0.85)
          .fromTo(screens[1], { opacity: 0, scale: 1.04 }, { opacity: 1, scale: 1, duration: 0.3 }, 0.9)
          .from('#celebrateBadge', { scale: 0, rotate: -40, duration: 0.4, ease: 'back.out(2)' }, 1.0);

        confettiPieces.forEach((c, i) => {
          const angle = (i / confettiPieces.length) * Math.PI * 2;
          const dist  = 90 + Math.random() * 70;
          tl.fromTo(c,
            { x: 0, y: 0, opacity: 1, rotate: 0 },
            { x: Math.cos(angle) * dist, y: Math.sin(angle) * dist - 30, rotate: Math.random() * 720 - 360, opacity: 0, duration: 0.9, ease: 'power2.out' },
            1.0,
          );
        });

        tl.to(screens[1], { opacity: 0, scale: 0.95, duration: 0.3 }, 1.95)
          .fromTo(screens[2], { opacity: 0, scale: 1.04 }, { opacity: 1, scale: 1, duration: 0.3 }, 2.0);

        const ringFill = $('#ringFill');
        const ringNum  = $('#ringNum');
        const ringObj  = { v: 0 };
        if (ringFill) tl.to(ringFill, { strokeDashoffset: 465 * (1 - 0.83), duration: 0.9, ease: 'power2.out' }, 2.05);
        tl.to(ringObj, {
          v: 12,
          duration: 0.9,
          ease: 'power2.out',
          onUpdate: () => { if (ringNum) ringNum.textContent = String(Math.round(ringObj.v)); },
        }, 2.05);

        tl.to(screens[2], { opacity: 0, scale: 0.95, duration: 0.3 }, 2.95)
          .fromTo(screens[3], { opacity: 0, scale: 1.04 }, { opacity: 1, scale: 1, duration: 0.3 }, 3.0);

        $$('#insightBars .bar').forEach((b, i) => {
          gsap.set(b, { scaleY: 0 });
          tl.to(b, { scaleY: parseFloat(b.getAttribute('data-v') ?? '1'), duration: 0.5, ease: 'back.out(1.6)' }, 3.05 + i * 0.06);
        });
        tl.from('.s-insights .mini-stat', { y: 20, opacity: 0, stagger: 0.1, duration: 0.4 }, 3.05);

        setStep(0);
      } else if (pinPhone) {
        // Reduced-motion fallback: show last screen statically
        gsap.set(screens, { opacity: 0 });
        if (screens.length) gsap.set(screens[screens.length - 1], { opacity: 1 });
        $$('#insightBars .bar').forEach(b => gsap.set(b, { scaleY: parseFloat(b.getAttribute('data-v') ?? '1') }));
        const ringFill = $('#ringFill');
        if (ringFill) gsap.set(ringFill, { strokeDashoffset: 465 * 0.17 });
        const ringNum = $('#ringNum');
        if (ringNum) ringNum.textContent = '12';
        copySteps.forEach(s => { s.style.display = 'block'; s.style.marginBottom = '28px'; });
        sideSteps.forEach(s => { s.style.display = 'none'; });
        dots.forEach(d => { d.style.display = 'none'; });
      }

      // ── INTERACTIVE BUILDER ────────────────────────────────────────────────
      const dropzone  = $('#dropzone');
      const placedList = $('#placedList');
      const dzEmpty   = $('#dzEmpty');
      const dzCount   = $('#dzCount');
      const placed    = new Set<string>();

      function updateCount() {
        if (dzCount) dzCount.textContent = placed.size + (placed.size === 1 ? ' habit' : ' habits');
        if (dzEmpty) dzEmpty.style.display = placed.size ? 'none' : 'block';
      }

      function burst(target: HTMLElement, colorVar?: string) {
        const r   = target.getBoundingClientRect();
        const bx  = r.left + r.width / 2;
        const by  = r.top + 40;
        for (let i = 0; i < 12; i++) {
          const p = document.createElement('span');
          p.style.cssText = `position:fixed;left:${bx}px;top:${by}px;width:9px;height:9px;border-radius:2px;z-index:9000;pointer-events:none;background:var(${colorVar ?? confettiColors[i % confettiColors.length]});`;
          document.body.appendChild(p);
          const a = Math.random() * Math.PI * 2;
          const d = 50 + Math.random() * 80;
          gsap.to(p, {
            x: Math.cos(a) * d,
            y: Math.sin(a) * d - 20,
            rotate: Math.random() * 540,
            opacity: 0,
            duration: dur(0.8),
            ease: 'power2.out',
            onComplete: () => p.remove(),
          });
        }
      }

      function flashDup(name: string) {
        const ex = placedList?.querySelector(`[data-name="${name}"]`) as HTMLElement | null;
        if (ex) gsap.fromTo(ex, { x: -6 }, { x: 0, duration: 0.4, ease: 'elastic.out(1,0.3)' });
      }

      function addHabit(name: string, colorVar: string) {
        if (placed.has(name)) { flashDup(name); return; }
        placed.add(name);

        const row = document.createElement('div');
        row.className = 'placed';
        row.dataset.name = name;
        row.innerHTML = `<span class="pdot" style="background:var(${colorVar})"></span><span>${name}</span><button class="x" aria-label="Remove ${name}"><svg viewBox="0 0 24 24" width="14" height="14" fill="none"><path d="M6 6 18 18M18 6 6 18" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg></button>`;
        placedList?.appendChild(row);
        updateCount();

        gsap.from(row, {
          height: 0, opacity: 0, scale: 0.9,
          duration: dur(0.45), ease: ease(),
          onComplete: () => gsap.set(row, { clearProps: 'height' }),
        });

        (row.querySelector('.x') as HTMLButtonElement | null)?.addEventListener('click', () => {
          placed.delete(name);
          gsap.to(row, {
            opacity: 0, x: 20, height: 0, margin: 0, padding: 0,
            duration: dur(0.3),
            onComplete: () => { row.remove(); updateCount(); },
          });
        });

        if (!state.reduced && dropzone) burst(dropzone, colorVar);
      }

      $$('.h-chip').forEach(chip => {
        const name     = chip.getAttribute('data-habit') ?? '';
        const colorVar = chip.getAttribute('data-color') ?? '';
        let dragged    = false;

        const onClick = () => { if (!dragged) addHabit(name, colorVar); };
        chip.addEventListener('click', onClick);
        cleanupFns.push(() => chip.removeEventListener('click', onClick));

        if (!state.reduced) {
          Draggable.create(chip, {
            type: 'x,y',
            zIndexBoost: true,
            onPress()      { dragged = false; },
            onDragStart()  { dragged = true; gsap.to(chip, { scale: 1.08, duration: 0.2 }); },
            onDrag(this: any) {
              if (!dropzone) return;
              const r = dropzone.getBoundingClientRect();
              dropzone.classList.toggle(
                'hot',
                this.pointerX > r.left && this.pointerX < r.right &&
                this.pointerY > r.top  && this.pointerY < r.bottom,
              );
            },
            onDragEnd(this: any) {
              if (!dropzone) return;
              const r = dropzone.getBoundingClientRect();
              const inside = this.pointerX > r.left && this.pointerX < r.right &&
                             this.pointerY > r.top  && this.pointerY < r.bottom;
              dropzone.classList.remove('hot');
              gsap.to(chip, { x: 0, y: 0, scale: 1, duration: 0.7, ease: 'elastic.out(1,0.5)' });
              if (inside) addHabit(name, colorVar);
              setTimeout(() => { dragged = false; }, 50);
            },
          });
        }
      });
      updateCount();

      // ── CTA BURST ─────────────────────────────────────────────────────────
      $$('[data-cta]').forEach(b => {
        const handler = () => { if (!state.reduced) burst(b as HTMLElement); };
        b.addEventListener('click', handler);
        cleanupFns.push(() => b.removeEventListener('click', handler));
      });

      // ── MOTION CONTROLS PANEL ─────────────────────────────────────────────
      const speedEl  = $('#speed') as HTMLInputElement | null;
      const speedVal = $('#speedVal');

      if (speedEl && speedVal) {
        const handler = () => {
          state.speed = parseFloat(speedEl.value);
          speedVal.textContent = state.speed.toFixed(1) + '×';
          gsap.globalTimeline.timeScale(state.speed);
        };
        speedEl.addEventListener('input', handler);
        cleanupFns.push(() => speedEl.removeEventListener('input', handler));
      }

      $$('#easeSeg button').forEach(b => {
        const handler = () => {
          $$('#easeSeg button').forEach(x => x.classList.remove('on'));
          b.classList.add('on');
          state.ease = b.getAttribute('data-ease') ?? 'bounce';
        };
        b.addEventListener('click', handler);
        cleanupFns.push(() => b.removeEventListener('click', handler));
      });

      const reduceSwitch = $('#reduceSwitch');
      if (reduceSwitch) {
        const handler = () => {
          const on = !reduceSwitch.classList.contains('on');
          reduceSwitch.classList.toggle('on', on);
          reduceSwitch.setAttribute('aria-checked', String(on));
          document.body.classList.toggle('reduce-motion', on);
          if (on) {
            gsap.globalTimeline.timeScale(6);
            document.body.classList.remove('has-cursor');
            if (cursor && ring) gsap.to([cursor, ring], { opacity: 0, duration: 0.2 });
          } else {
            gsap.globalTimeline.timeScale(state.speed);
            if (!isTouch && cursor && ring) {
              document.body.classList.add('has-cursor');
              gsap.to([cursor, ring], { opacity: 1, duration: 0.2 });
            }
          }
        };
        reduceSwitch.addEventListener('click', handler);
        cleanupFns.push(() => reduceSwitch.removeEventListener('click', handler));
      }

      const replayBtn = $('#replayBtn');
      if (replayBtn) {
        const handler = () => {
          if (lenis) lenis.scrollTo(0, { immediate: true });
          else window.scrollTo(0, 0);
          gsap.set('.chip', { x: 0, y: 0 });
          if (!document.body.classList.contains('reduce-motion')) playHero();
        };
        replayBtn.addEventListener('click', handler);
        cleanupFns.push(() => replayBtn.removeEventListener('click', handler));
      }

      const ctlCollapse = $('#ctlCollapse');
      const controls    = $('#controls');
      if (ctlCollapse && controls) {
        const handler = () => {
          controls.classList.toggle('collapsed');
          gsap.fromTo(controls, { scale: 0.96 }, { scale: 1, duration: 0.3, ease: 'back.out(2)' });
        };
        ctlCollapse.addEventListener('click', handler);
        cleanupFns.push(() => ctlCollapse.removeEventListener('click', handler));
      }

      const onLoad = () => ScrollTrigger.refresh();
      window.addEventListener('load', onLoad);
      cleanupFns.push(() => window.removeEventListener('load', onLoad));
    })();

    return () => {
      cleanupFns.forEach(fn => fn());
      lenis?.destroy();
    };
  }, []);
}
