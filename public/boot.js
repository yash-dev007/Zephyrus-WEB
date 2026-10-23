/*
 * Pre-paint feature flags. Kept as an external, same-origin file so the
 * production CSP can stay at script-src 'self' without inline hashes.
 */
(function () {
  var root = document.documentElement;
  root.classList.add('js');

  try {
    var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    var saveData = Boolean(connection && connection.saveData);
    var reducedData = window.matchMedia('(prefers-reduced-data: reduce)').matches;
    if (saveData || reducedData) {
      root.classList.add('grain-off', 'reduced-data');
    }
  } catch (error) {
    /* Feature detection must never block the page. */
  }
})();
