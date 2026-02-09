document.querySelector('.click').addEventListener('click', () => {
  alert('Evento Click');
});

window.addEventListener('load', () => {
  document.querySelector('.onload').style.background = 'green';
});

document.querySelector('.move').addEventListener('mousemove', () => {
  document.querySelector('.move').textContent = 'Moviendo...';
});

window.addEventListener('scroll', () => {
  document.querySelector('.scroll').style.background = 'purple';

  const scrollY = window.scrollY;

  const fondo = document.querySelector('.parallax-fondo');
  const img = document.querySelector('.parallax-img');

  fondo.style.transform = `translateY(${scrollY * 0.2}px)`;
  img.style.transform = `translateY(${scrollY * 0.5}px)`;
});
