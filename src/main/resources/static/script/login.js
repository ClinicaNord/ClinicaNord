document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');

       form.addEventListener('submit', function(event) {
        event.preventDefault();

        localStorage.removeItem('usuarioLogado');

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
      console.log("Resposta do servidor:", usuario);

      alert(`Login realizado com sucesso! Bem-vindo, ${usuario.nomeUsuario || usuario.nome}`);

      localStorage.setItem('usuarioLogado', JSON.stringify(usuario));

      const tipo = usuario.tipoUsuario?.nome?.trim().toLowerCase();
      console.log("Tipo de usuário:", tipo);

      if (tipo === "admin") {
        window.location.href = "perfilAdm.html";
      } else if (tipo === "cliente") {
        window.location.href = "perfilCliente.html";
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
