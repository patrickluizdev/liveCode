// Faz a consulta HTTP ao script JavaScript
function inputPage(url) {
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro na resposta da requisição: ' + response.status);
      }
      // console.log(response.text);
      // console.log(response.status);
      return response.text();
    })
    .then(content => {
      const regex = /<!-- Code injected by live-server -->[\s\S]*<\/script>/g;
      cleanTextCode = content.replace(regex, '');
      // console.log(cleanTextCode)
      const preElement = document.getElementById('codigoPagina');
      preElement.className = '';
      preElement.textContent = cleanTextCode;
      hljs.highlightElement(preElement);
      actived(preElement);
    })
    .catch(error => {
      console.error('Erro na consulta HTTP:', error);
    });
}

function actived(element) {
  console.log(element)
  if (!element) {
    console.error('Elemento "codigoPagina" não encontrado.');
    return;
  }
  if (element.classList.contains('language-xml')) {
    clear()
    document.getElementById('navIndex').classList.add('actived');
    document.getElementById('navHtml').classList.add('arquive-actived');
  }
  else if (element.classList.contains('language-css')) {
    clear()
    document.getElementById('navStyle').classList.add('actived');
    document.getElementById('navCss').classList.add('arquive-actived');
  }
  else if (element.classList.contains('hljs')) {
    clear()
    document.getElementById('navScript').classList.add('actived');
    document.getElementById('navJs').classList.add('arquive-actived');
  }
}

function folder(){
  const folderIcon = document.getElementById('folder');
  const navExplorerList = document.querySelector('.nav-explorer ul');
  folderIcon.addEventListener('click', () => {
    if (navExplorerList.style.display === 'none') {
      navExplorerList.style.display = 'block';
    } else {
      navExplorerList.style.display = 'none';
    }
  });
  actived()
}
folder()
function clear(){
  document.querySelectorAll("li").forEach(li => {
    li.classList.remove("actived");
    li.classList.remove("arquive-actived");
  })
}

function copyCode() {
  const codigoPagina = document.getElementById('codigoPagina').textContent;
  const textareaTemporario = document.createElement('textarea');
  textareaTemporario.value = codigoPagina;
  document.body.appendChild(textareaTemporario);
  textareaTemporario.select();
  document.execCommand("copy");
  document.body.removeChild(textareaTemporario);
}


function changeFontSize(fontSize) {
  const element = document.getElementById('fontEvent');
  element.style.fontSize = fontSize;
  console.log(fontSize)

}



// Chamada da função com o URL correto do script
const inputPageStile = 'http://patrickluiz.tech:5500/flexTurismo/style.css';
const inputPageScript = 'http://patrickluiz.tech:5500/flexTurismo/script.js';
const inputPageIndex = 'http://patrickluiz.tech:5500/flexTurismo/index.html';





