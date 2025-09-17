/* Minimal JS for: year, scroll fade-ins, small hover lights */
document.addEventListener('DOMContentLoaded', function () {
  // year in footer
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // add fade-in class to article blocks & card content for animation
  const toWatch = document.querySelectorAll('.post, .card, .content > *');
  toWatch.forEach(el => el.classList.add('fade-in'));

  // IntersectionObserver to reveal elements on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        // optional: unobserve after reveal to keep things light
        io.unobserve(entry.target);
      }
    });
  }, {threshold: 0.08});

  document.querySelectorAll('.fade-in').forEach(el => io.observe(el));

  // subtle neon cursor hover effect on links
  document.querySelectorAll('a').forEach(a => {
    a.addEventListener('mousemove', (e) => {
      // (intentionally tiny, non-resource-heavy effect)
      a.style.transform = 'translateY(-2px)';
    });
    a.addEventListener('mouseleave', () => {
      a.style.transform = '';
    });
  });

  // accessibility: respect reduced motion
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (mq && mq.matches) {
    document.querySelectorAll('.fade-in').forEach(el => {
      el.style.transition = 'none';
      el.classList.add('show');
    });
    const bg = document.getElementById('bg-anim');
    if (bg) bg.style.animation = 'none';
  }
});
