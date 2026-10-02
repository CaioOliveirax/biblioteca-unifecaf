// Fecha o menu mobile ao clicar em um link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('menu-toggle').checked = false;
  });
});

// Botão voltar ao topo
const btnTopo = document.getElementById('voltar-topo');
window.addEventListener('scroll', () => {
  btnTopo.classList.toggle('visivel', window.scrollY > 400);
});
btnTopo.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Acordeão do FAQ
document.querySelectorAll('.faq-pergunta').forEach(botao => {
  botao.addEventListener('click', () => {
    const resposta = botao.nextElementSibling;
    const aberto = resposta.style.maxHeight;
    document.querySelectorAll('.faq-resposta').forEach(r => r.style.maxHeight = null);
    if (!aberto) resposta.style.maxHeight = resposta.scrollHeight + 'px';
  });
});

// Carrossel de depoimentos
const trilho = document.querySelector('.depo-trilho');
const slides = document.querySelectorAll('.depo-trilho .card-depo');
const dotsContainer = document.getElementById('depo-dots');
let indice = 0;

slides.forEach((_, i) => {
  const dot = document.createElement('button');
  if (i === 0) dot.classList.add('ativo');
  dot.addEventListener('click', () => irPara(i));
  dotsContainer.appendChild(dot);
});
const dots = dotsContainer.querySelectorAll('button');

function irPara(i) {
  indice = (i + slides.length) % slides.length;
  trilho.style.transform = `translateX(-${indice * 100}%)`;
  dots.forEach(d => d.classList.remove('ativo'));
  dots[indice].classList.add('ativo');
}

document.querySelector('.depo-anterior').addEventListener('click', () => irPara(indice - 1));
document.querySelector('.depo-proximo').addEventListener('click', () => irPara(indice + 1));

// Validação simples do formulário
document.getElementById('form-contato').addEventListener('submit', (e) => {
  e.preventDefault();
  document.getElementById('msg-sucesso').classList.add('mostrar');
});
