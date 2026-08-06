$(document).ready(function() {
  var content = document.querySelector('.travel-post .post-content');
  if (!content) return;

  var images = Array.prototype.slice.call(content.querySelectorAll('img'));
  images.forEach(function(image, index) {
    image.setAttribute('decoding', 'async');
    image.setAttribute('loading', index === 0 ? 'eager' : 'lazy');
  });

  Array.prototype.slice.call(content.querySelectorAll('p')).forEach(function(paragraph) {
    var imageEntries = Array.prototype.slice.call(paragraph.children).filter(function(element) {
      return element.matches('a.fancybox') || element.tagName === 'IMG';
    });

    if (!imageEntries.length) return;

    var onlyImages = Array.prototype.slice.call(paragraph.childNodes).every(function(node) {
      if (node.nodeType === Node.TEXT_NODE) return node.textContent.trim() === '';
      if (node.nodeType !== Node.ELEMENT_NODE) return true;
      return node.tagName === 'BR' ||
        node.tagName === 'IMG' ||
        node.matches('a.fancybox') ||
        node.matches('span.caption');
    });

    if (!onlyImages) return;

    var gallery = document.createElement('div');
    gallery.className = 'travel-gallery' + (imageEntries.length === 1 ? ' travel-gallery--single' : '');
    gallery.setAttribute('aria-label', imageEntries.length === 1 ? '旅行照片' : imageEntries.length + ' 张旅行照片');

    imageEntries.forEach(function(entry) {
      var caption = entry.nextElementSibling && entry.nextElementSibling.matches('span.caption')
        ? entry.nextElementSibling
        : null;
      var figure = document.createElement('figure');
      figure.className = 'travel-photo';

      figure.appendChild(entry);
      if (caption && caption.textContent.trim()) {
        var figcaption = document.createElement('figcaption');
        figcaption.className = 'travel-photo__caption';
        figcaption.textContent = caption.textContent.trim();
        figure.appendChild(figcaption);
      }
      if (caption) caption.remove();
      gallery.appendChild(figure);
    });

    paragraph.replaceWith(gallery);
  });

  if (images.length) {
    var count = document.createElement('span');
    count.className = 'travel-photo-count';
    count.innerHTML = '<i class="fa fa-camera" aria-hidden="true"></i> ' + images.length + ' 张照片';
    var meta = document.querySelector('.travel-post .post-meta');
    if (meta) meta.appendChild(count);
  }
});
