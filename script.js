// Chamada URL páginas
const inputPageStile = 'http://patrickluiz.tech:5500/flexTurismo/style.css';
const inputPageScript = 'http://patrickluiz.tech:5500/flexTurismo/script.js';
const inputPageIndex = 'http://patrickluiz.tech:5500/flexTurismo/index.html';
var codigoPagina = document.getElementById('codigoPagina');

function inputPage(url) {
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro na resposta da requisição: ' + response.status);
      }
      return response.text();
    })
    .then(content => {
      const regex = /<!-- Code injected by live-server -->[\s\S]*<\/script>/g;
      const cleanTextCode = content.replace(regex, '');
      codigoPagina.className = '';
      codigoPagina.textContent = cleanTextCode;
      hljs.highlightElement(codigoPagina);
      actived(codigoPagina);
    })
    .catch(error => {
      console.error('Erro na consulta HTTP:', error);
    });
}

function actived(element) {
  if (!element) {
    return;
  }

  clear();

  if (element.classList.contains('language-xml')) {
    navIndex.classList.add('actived');
    navHtml.classList.add('arquive-actived');
  } else if (element.classList.contains('language-css')) {
    navStyle.classList.add('actived');
    navCss.classList.add('arquive-actived');
  } else if (element.classList.contains('hljs')) {
    navScript.classList.add('actived');
    navJs.classList.add('arquive-actived');
  }
}

function folder() {
  const folderIcon = document.getElementById('folder');
  const navExplorerList = document.querySelector('.nav-explorer ul');
  folderIcon.addEventListener('click', () => {
    if (navExplorerList.style.display === 'none') {
      navExplorerList.style.display = 'block';
    } else {
      navExplorerList.style.display = 'none';
    }
  });
  actived();
}

function clear() {
  document.querySelectorAll('li').forEach(li => {
    li.classList.remove('actived');
    li.classList.remove('arquive-actived');
  });
}

function copyCode() {
  // codigoPagina = document.getElementById('codigoPagina').textContent;
  const textareaTemporario = document.createElement('textarea');
  textareaTemporario.value = codigoPagina;
  document.body.appendChild(textareaTemporario);
  textareaTemporario.select();
  document.execCommand('copy');
  document.body.removeChild(textareaTemporario);
}

function changeFontSize(fontSize) {
  fontEvent.style.fontSize = fontSize;
}

folder();
inputPage(inputPageIndex)
