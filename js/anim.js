(() => {
  const rm = matchMedia('(prefers-reduced-motion:reduce)').matches;

  // scroll progress bar
  const bar = document.createElement('div');
  bar.id = 'bar';
  document.body.prepend(bar);

  // stagger siblings
  document.querySelectorAll('.grid,.gg,.tags,.line').forEach(p =>
    [...p.children].forEach((c, i) => c.style.setProperty('--d', (i % 6) * 0.1 + 's')));

  // floating colour blobs
  document.querySelectorAll('.hero,.ph,.stats').forEach(h => {
    [['#e73916', 360, '-80px', 'auto', 'auto', '-60px', '0s'],
     ['#f4c27a', 280, 'auto', '-60px', '-70px', 'auto', '-4s']].forEach(b => {
      const d = document.createElement('div');
      d.className = 'blob';
      Object.assign(d.style, { background: b[0], width: b[1] + 'px', height: b[1] + 'px', top: b[2], right: b[3], bottom: b[4], left: b[5], animationDelay: b[6] });
      h.appendChild(d);
    });
  });

  // hero scroll cue + scrolling ticker (home page only)
  const hero = document.querySelector('.hero');
  if (hero) {
    const cue = document.createElement('div');
    cue.className = 'cue';
    hero.appendChild(cue);
    const words = ['Lit to Lighten', 'Women Empowerment', 'Children &amp; Seniors', 'Anti-Human Trafficking', 'Health &amp; HIV Care', 'Urban Poor Empowerment', 'Since 1965'];
    const row = words.map(w => '<span>' + w + '</span><i>&#10022;</i>').join('');
    const t = document.createElement('div');
    t.className = 'tk';
    t.innerHTML = '<div>' + row + row + row + row + '</div>';
    hero.after(t);
  }

  // 3D tilt on cards
  if (!rm && matchMedia('(hover:hover)').matches) {
    document.querySelectorAll('.card').forEach(c => {
      c.addEventListener('mousemove', e => {
        const r = c.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        c.style.transform = 'perspective(700px) rotateY(' + x * 9 + 'deg) rotateX(' + -y * 9 + 'deg) translateY(-6px)';
      });
      c.addEventListener('mouseleave', () => { c.style.transform = ''; });
    });
  }

  // scroll progress + timeline line
  const line = document.querySelector('.line');
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = 'scaleX(' + (max > 0 ? scrollY / max : 0) + ')';
    if (line) {
      const r = line.getBoundingClientRect();
      line.style.setProperty('--p', Math.max(0, Math.min(1, (innerHeight * 0.6 - r.top) / r.height)));
    }
  };
  onScroll();
  addEventListener('scroll', onScroll, { passive: true });

  // gallery lightbox
  const lb = document.createElement('div');
  lb.id = 'lb';
  lb.innerHTML = '<img alt="">';
  document.body.appendChild(lb);
  document.querySelectorAll('.gg img').forEach(i => i.addEventListener('click', () => {
    lb.firstChild.src = i.src;
    lb.firstChild.alt = i.alt;
    lb.classList.add('o');
  }));
  lb.addEventListener('click', () => lb.classList.remove('o'));
  addEventListener('keydown', e => { if (e.key === 'Escape') lb.classList.remove('o'); });
})();
