// Enables you to place your marker

const clickTarget = document.getElementById('map');

clickTarget.addEventListener('click', function(e) {
  const rect = clickTarget.getBoundingClientRect();
  const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
  const yPercent = ((e.clientY - rect.top) / rect.height) * 100;
  console.log(`X: ${xPercent.toFixed(2)}%, Y: ${yPercent.toFixed(2)}%`);
});
