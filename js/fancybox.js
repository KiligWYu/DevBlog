(function () {
  'use strict';
  document.querySelectorAll('.post-content img').forEach(function (image) {
    if (image.classList.contains('nofancybox') || image.closest('a')) return;
    var link = document.createElement('a');
    link.href = image.getAttribute('data-src') || image.src;
    link.className = 'fancybox';
    link.title = image.alt;
    link.setAttribute('rel', 'gallery');
    link.setAttribute('aria-label', image.alt || 'View image');
    image.before(link);
    link.appendChild(image);
    if (image.alt) {
      var caption = document.createElement('span');
      caption.className = 'caption';
      caption.textContent = image.alt;
      link.after(caption);
    }
  });
  if (window.jQuery && jQuery.fn.fancybox) {
    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    jQuery('.fancybox').attr('rel', 'gallery').fancybox({
      animationEffect: reducedMotion ? false : 'fade',
      transitionEffect: false,
      openEffect: reducedMotion ? 'none' : 'fade',
      closeEffect: reducedMotion ? 'none' : 'fade',
      nextEffect: 'none',
      prevEffect: 'none',
      helpers: { title: { type: 'inside' } }
    });
  }
}());
