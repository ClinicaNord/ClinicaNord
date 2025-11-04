document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    fetch('http://localhost:8080/cadastrocliente/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha })
    })
    .then(res => {
      if (!res.ok) throw new Error("Usuário ou senha incorretos!");
      return res.json();
    })
    .then(usuario => {
         
      localStorage.setItem('usuarioLogado', JSON.stringify(usuario));

      let tipo = usuario.tipoUsuario;

      if (tipo && typeof tipo === 'object') {
       tipo = tipo.nome;
     }

    if (tipo) {
    tipo = tipo.trim().toLowerCase();
    } else {
    tipo = '';
    }
      console.log("Tipo de usuário:", tipo);

     if (tipo === "admin") {
  window.location.href = "perfilAdm.html";
} else if (tipo === "cliente") {
  window.location.href = "index.html";
} else {
  alert("Erro: tipo de usuário não reconhecido!");
}

    })
    .catch(error => {
      console.error("Erro no login:", error);
      alert(error.message);
    });
  });
});
