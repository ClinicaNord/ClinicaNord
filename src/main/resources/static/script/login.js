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
			.then(response => {
				// Se login for bem-sucedido, retorna os dados do usuário
				if (response.ok) {
					return response.json();
				} 
				// Se as credenciais estiverem erradas
				else if (response.status === 401) {
					throw new Error('Email ou senha inválidos.');
				} 
				// Para outros erros
				else {
					throw new Error('Erro na autenticação.');
				}
			})
			.then(usuario => {
				// Exibe mensagem de boas-vindas
				alert('Login realizado com sucesso! Bem-vindo, ' + usuario.nomeUsuario);
				
				// Redireciona para a página de perfil
				window.location.href = 'perfilusuario.html';
				
				// Armazena os dados do usuário logado no localStorage
				localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
			})
			.catch(error => {
				// Exibe mensagem de erro em caso de falha
				alert(error.message);
			});
	});
});
