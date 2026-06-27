/* ==========================================================
   Cart Progress Bar
   Shopify Dawn
   Vanilla JavaScript
========================================================== */

document.addEventListener('DOMContentLoaded', initCartProgress);
document.addEventListener('shopify:section:load', initCartProgress);

function initCartProgress() {
  const progressBar = document.querySelector('.cpb__progress-fill');
  const progressWrapper = document.querySelector('.cpb__progress');

  if (!progressBar || !progressWrapper) return;

  const targetWidth = progressWrapper.getAttribute('aria-valuenow');

  progressBar.style.width = '0%';

  requestAnimationFrame(() => {
    progressBar.style.width = targetWidth + '%';
  });
}

/* Reinitialize after Dawn updates the cart drawer */
document.addEventListener('cart:refresh', initCartProgress);
document.addEventListener('cart:updated', initCartProgress);

/* Observe AJAX cart drawer updates */
const observer = new MutationObserver(() => {
  initCartProgress();
});

document.addEventListener('DOMContentLoaded', () => {
  const drawer = document.querySelector('#CartDrawer');

  if (drawer) {
    observer.observe(drawer, {
      childList: true,
      subtree: true
    });
  }
});