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
      // Normaliza o tipo de usuário
      let tipo = usuario.tipoUsuario;

      if (tipo && typeof tipo === 'object') {
        tipo = tipo.nome; // Exemplo: "ADMIN" ou "CLIENTE"
      }

      if (tipo) {
        tipo = tipo.trim().toLowerCase();
      } else {
        tipo = '';
      }

      console.log("Tipo de usuário detectado:", tipo);

      // Cria um objeto padronizado com o campo 'tipo'
      const usuarioFormatado = {
        ...usuario,
        tipo: tipo === 'admin' ? 1 : 2 // 1 = admin, 2 = cliente
      };

      // Salva o usuário logado com tipo padronizado
      localStorage.setItem('usuarioLogado', JSON.stringify(usuarioFormatado));

      // Redireciona com base no tipo
      if (tipo === "admin") {
        window.location.href = "./perfilAdm.html";
      } else if (tipo === "cliente") {
        window.location.href = "./index.html";
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
