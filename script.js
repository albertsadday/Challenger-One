

// ——————————————————————————————————————————————————
// TextScramble
// ——————————————————————————————————————————————————

class TextScramble {
    constructor(el) {
      this.el = el
      this.chars = '!<>-_\\/[]{}—=+*^?#________'
      this.update = this.update.bind(this)
    }
    setText(newText) {
      const oldText = this.el.innerText
      const length = Math.max(oldText.length, newText.length)
      const promise = new Promise((resolve) => this.resolve = resolve)
      this.queue = []
      for (let i = 0; i < length; i++) {
        const from = oldText[i] || ''
        const to = newText[i] || ''
        const start = Math.floor(Math.random() * 40)
        const end = start + Math.floor(Math.random() * 40)
        this.queue.push({ from, to, start, end })
      }
      cancelAnimationFrame(this.frameRequest)
      this.frame = 0
      this.update()
      return promise
    }
    update() {
      let output = ''
      let complete = 0
      for (let i = 0, n = this.queue.length; i < n; i++) {
        let { from, to, start, end, char } = this.queue[i]
        if (this.frame >= end) {
          complete++
          output += to
        } else if (this.frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = this.randomChar()
            this.queue[i].char = char
          }
          output += `<span class="dud">${char}</span>`
        } else {
          output += from
        }
      }
      this.el.innerHTML = output
      if (complete === this.queue.length) {
        this.resolve()
      } else {
        this.frameRequest = requestAnimationFrame(this.update)
        this.frame++
      }
    }
    randomChar() {
      return this.chars[Math.floor(Math.random() * this.chars.length)]
    }
  }
  
  // ——————————————————————————————————————————————————
  // Example
  // ——————————————————————————————————————————————————
  
  const phrases = [
    'Equipo One - Oracle Next Education,',
    'Alura Latam',
 
    'Oracle Educacíon',
    ' Challenger  One',
    'Encriptador de textos',
    'Front-end developer By Luis Izquierdo '
  ]
  
  const el = document.querySelector('.text')
  const fx = new TextScramble(el)
  
  let counter = 0
  const next = () => {
    fx.setText(phrases[counter]).then(() => {
      setTimeout(next, 800)
    })
    counter = (counter + 1) % phrases.length
  }
  
  next()











window.addEventListener('DOMContentLoaded', () => {
    // Mostrar loading al cargar la página
    showLoading();

    // Ocultar loading después de 2 segundos (simulando carga)
    setTimeout(hideLoading, 2000);
});

document.getElementById('encriptar').addEventListener('click', () => {
    const texto = document.getElementById('campo-entrada').value.toLowerCase();
    const encriptado = encriptarTexto(texto);
    document.getElementById('campo-salida').value = encriptado;
    showAlert('Texto encriptado correctamente', 'success');
});

document.getElementById('desencriptar').addEventListener('click', () => {
    const texto = document.getElementById('campo-entrada').value.toLowerCase();
    const desencriptado = desencriptarTexto(texto);
    document.getElementById('campo-salida').value = desencriptado;
    showAlert('Texto desencriptado correctamente', 'success');
});

document.getElementById('copiar').addEventListener('click', () => {
    const texto = document.getElementById('campo-salida').value;
    copyToClipboard(texto);
    showAlert('Texto copiado al portapapeles', 'success');
});

function encriptarTexto(texto) {
    // Aplicar encriptación según las reglas dadas
    texto = texto.replace(/e/g, 'enter');
    texto = texto.replace(/i/g, 'imes');
    texto = texto.replace(/a/g, 'ai');
    texto = texto.replace(/o/g, 'ober');
    texto = texto.replace(/u/g, 'ufat');
    return texto;
}

function desencriptarTexto(texto) {
    // Deshacer la encriptación aplicando los cambios inversos
    texto = texto.replace(/ufat/g, 'u');
    texto = texto.replace(/ober/g, 'o');
    texto = texto.replace(/ai/g, 'a');
    texto = texto.replace(/imes/g, 'i');
    texto = texto.replace(/enter/g, 'e');
    return texto;
}

function showLoading() {
    const loadingElement = document.createElement('div');
    loadingElement.id = 'loading';
    document.body.appendChild(loadingElement);
}

function hideLoading() {
    const loadingElement = document.getElementById('loading');
    if (loadingElement) {
        loadingElement.remove();
    }
}

function copyToClipboard(text) {
    // Crear un elemento de texto temporal y copiar el texto
    const tempElement = document.createElement('textarea');
    tempElement.value = text;
    document.body.appendChild(tempElement);
    tempElement.select();
    document.execCommand('copy');
    document.body.removeChild(tempElement);
}

function showAlert(message, icon) {
    // Mostrar alerta utilizando SweetAlert2
    Swal.fire({
        icon: icon,
        text: message,
        timer: 1500,
        timerProgressBar: true,
        toast: true,
        position: 'top-end',
        showConfirmButton: false
    });
}



