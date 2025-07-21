document.addEventListener('DOMContentLoaded', function () {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const nav = document.getElementById('nav');

  toggleBtn.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
});