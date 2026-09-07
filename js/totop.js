(function () {
  'use strict';
  var rocket = document.getElementById('rocket');
  if (!rocket) return;
  function update() {
    var visible = window.scrollY > 500;
    rocket.classList.toggle('show', visible);
    rocket.tabIndex = visible ? 0 : -1;
    rocket.setAttribute('aria-hidden', String(!visible));
  }
  window.addEventListener('scroll', update, { passive: true });
  rocket.addEventListener('click', function (event) {
    event.preventDefault();
    document.getElementById('logo').focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  });
  update();
}());
