const header = document.querySelector('header');
const secoes = document.querySelectorAll('section[id]');
const linksNav = document.querySelectorAll('.nav-links a[href^="#"]');
const menuToggle = document.getElementById('menu-toggle');
const btnTopo = document.getElementById('voltar-topo');

// Header com sombra ao rolar + destaque do link ativo
function aoRolar(){
  header.classList.toggle('scrolled', window.scrollY > 20);
  btnTopo.classList.toggle('visivel', window.scrollY > 500);

  let atual = '';
  secoes.forEach(sec => {
    const topo = sec.offsetTop - 120;
    if (window.scrollY >= topo) atual = sec.getAttribute('id');
  });
  linksNav.forEach(link => {
    link.classList.toggle('ativo', link.getAttribute('href') === '#' + atual);
  });
}
window.addEventListener('scroll', aoRolar);
aoRolar();

// Fecha o menu mobile ao clicar em um link
linksNav.forEach(link => link.addEventListener('click', () => { menuToggle.checked = false; }));

// Voltar ao topo
btnTopo.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Acordeão de FAQ
document.querySelectorAll('.faq-pergunta').forEach(botao => {
  botao.addEventListener('click', () => {
    const resposta = botao.nextElementSibling;
    const aberto = botao.getAttribute('aria-expanded') === 'true';

    document.querySelectorAll('.faq-pergunta').forEach(b => {
      b.setAttribute('aria-expanded', 'false');
      b.nextElementSibling.style.maxHeight = null;
    });

    if (!aberto){
      botao.setAttribute('aria-expanded', 'true');
      resposta.style.maxHeight = resposta.scrollHeight + 'px';
    }
  });
});

// Validação do formulário de suporte
const form = document.getElementById('form-contato');
const msgSucesso = document.getElementById('msg-sucesso');

function mostrarErro(campoId, texto){
  document.getElementById('erro-' + campoId).textContent = texto;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let valido = true;
  msgSucesso.classList.remove('mostrar');

  const nome = document.getElementById('nome');
  const email = document.getElementById('email');

  mostrarErro('nome', ''); mostrarErro('email', '');

  if (nome.value.trim().length < 3){
    mostrarErro('nome', 'Digite seu nome completo.'); valido = false;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())){
    mostrarErro('email', 'Digite um e-mail válido.'); valido = false;
  }

  if (valido){
    msgSucesso.classList.add('mostrar');
    form.reset();
    setTimeout(() => msgSucesso.classList.remove('mostrar'), 5000);
  }
});
