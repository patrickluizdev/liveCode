// Chamada URL páginas
const inputPageStile = 'http://patrickluiz.tech:5500/flexTurismo/src/style.css';
const inputPageScript = 'http://patrickluiz.tech:5500/flexTurismo/src/script.js';
const inputPageIndex = 'http://patrickluiz.tech:5500/flexTurismo/index.html';

function inputPage(url) {
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro na resposta da requisição: ' + response.status);
      }
      return response.text();
    })
    .then(content => {
      var codigoPagina = document.getElementById('codigoPagina');
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
  const subFolder = document.getElementById('subItem');
  const navExplorerList = document.querySelector('.nav-explorer ul');
  const explorerFolder = document.querySelector('.sub-item');

  folderIcon.addEventListener('click', () => {
    if (navExplorerList.style.display === 'none') {
      navExplorerList.style.display = 'block';
    } else {
      navExplorerList.style.display = 'none';
    }
  });
  subFolder.addEventListener('click', () => {
    if (explorerFolder.style.display === 'none') {
      explorerFolder.style.display = 'block';
    } else {
      explorerFolder.style.display = 'none';
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
  var codigoPagina = document.getElementById('codigoPagina').textContent;
  const textareaTemporario = document.createElement('textarea');
  textareaTemporario.value = codigoPagina;
  document.body.appendChild(textareaTemporario);
  textareaTemporario.select();
  document.execCommand('copy');
  document.body.removeChild(textareaTemporario);
  loader()
}

function changeFontSize(fontSize) {
  fontEvent.style.fontSize = fontSize;
}

function themeUser(){
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      console.log("Navegador com tema escuro")
    } else {
      console.log("Navegador com tema escuro")
    }
}

function loader() {
  const loanderEvent = document.getElementsByTagName("body")[0];
  loanderEvent.style.cursor = 'progress';
  const tooltip = document.querySelector('#tooltip');
  tooltip.style.display = 'block';
  
  setTimeout(() => {
    tooltip.style.display = 'none';
    loaderEvent.style.cursor = 'auto';
  }, 1000);
}



/* <link rel="shortcut icon" type="image/x-icon" href="src/img/images.png"></link> */
themeUser()
folder();
inputPage(inputPageIndex)

