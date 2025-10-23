// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', () => {
	const form = document.getElementById('loginForm');

	// Adiciona um listener para o envio do formulário de login
	form.addEventListener('submit', function(event) {
		event.preventDefault(); // Impede o envio padrão do formulário

		// Captura os valores digitados nos campos de email e senha
		const email = document.getElementById('email').value;
		const senha = document.getElementById('senha').value;

		// Envia os dados para o backend para autenticação
		fetch('http://localhost:8080/cadastrocliente/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: email,
				senha: senha
			})
})
	.then(res => {
		if (!res.ok) throw new Error("Usuário ou senha incorretos!");
		return res.json();
	})
	.then(usuario => {
		// Exibe mensagem de boas-vindas
		alert('Login realizado com sucesso! Bem-vindo, ' + usuario.nomeUsuario);

		// Armazena os dados do usuário logado no localStorage
		localStorage.setItem('usuarioLogado', JSON.stringify(usuario));

		// Redireciona para a página de acordo com o tipo de usuário
		const tipo = usuario.tipoUsuario?.nome?.trim().toLowerCase();

    if (tipo === "admin") {
  window.location.href = "perfilAdm.html";
} else if (tipo === "cliente") {
     window.location.href = "index.html";
   } else {
     alert("Erro no cadastro, tente novamente");
  }

	})
	.catch(error => {
		// Exibe mensagem de erro em caso de falha
		alert(error.message);
	});
	});
});
