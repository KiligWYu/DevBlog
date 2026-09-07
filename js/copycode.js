(function () {
  'use strict';

  var script = document.currentScript;
  var successText = script && script.getAttribute('successtext') || 'Copied';

  function fallbackCopy(text) {
    var field = document.createElement('textarea');
    field.value = text;
    field.style.position = 'fixed';
    field.style.opacity = '0';
    document.body.appendChild(field);
    field.select();
    try {
      if (!document.execCommand('copy')) throw new Error('Copy failed');
    } finally {
      field.remove();
    }
  }

  document.querySelectorAll('figure.highlight, .post-content > pre').forEach(function (block) {
    var code = block.querySelector('.code pre') || (block.tagName === 'PRE' ? block : null);
    if (!code) return;
    code.tabIndex = 0;
    code.setAttribute('aria-label', 'Code block');
    // A wrapper keeps controls outside the text copied from plain code blocks.
    var container = block;
    if (block.tagName === 'PRE') {
      container = document.createElement('div');
      container.className = 'plain-code';
      block.before(container);
      container.appendChild(block);
    }
    container.classList.add('has-copy');
    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'btn-copy';
    button.textContent = 'Copy';
    button.setAttribute('aria-label', 'Copy code');
    var status = document.createElement('span');
    status.className = 'copy-status';
    status.setAttribute('role', 'status');
    container.append(button, status);
    var reset;
    button.addEventListener('click', async function () {
      clearTimeout(reset);
      try {
        var value = code.textContent;
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(value);
        } else {
          fallbackCopy(value);
        }
        status.textContent = successText;
      } catch (error) {
        status.textContent = 'Copy failed. Select the code to copy it.';
      }
      button.focus({ preventScroll: true });
      reset = setTimeout(function () { status.textContent = ''; }, 4000);
    });
  });
}());
