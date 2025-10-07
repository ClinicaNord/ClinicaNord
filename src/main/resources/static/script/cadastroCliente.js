// Espera o carregamento completo do DOM
document.addEventListener("DOMContentLoaded", () => {
	const form = document.getElementById("cadastroClienteForm");

	// Adiciona um listener para o envio do formulário
	form.addEventListener("submit", async (event) => {
		event.preventDefault(); // Impede o envio padrão do formulário
		// Captura os valores dos campos do formulário
		const nomeUsuario = document.getElementById("nomeUsuario").value;
		const cpf = document.getElementById("cpf").value;
		const email = document.getElementById("email").value;
		const telefone = document.getElementById("telefone").value;
		const dataNascimento = document.getElementById("data_nascimento").value;
		const senha = document.getElementById("senha").value;
		try { 
			// Envia os dados para o backend via POST
			const response = await fetch("http://localhost:8080/cadastrocliente", { 
				method: "POST",
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ 
					nomeUsuario,
					cpf,
					email,
					telefone,
					senha,
					dataNascimento,
					tipoUsuario: {
						id : 2
					}
				})
			});
			// Verifica se a resposta foi bem-sucedida
			if (!response.ok) {
				throw new Error('Erro ao cadastrar cliente');
			}
			// Converte a resposta para JSON
			const data = await response.json();
			// Salva o ID do usuário no localStorage
			localStorage.setItem('pessoaId', data.idUsuario);
			// Redireciona para a página de cadastro de endereço
			window.location.href = './cadastroendereco.html';
		} catch (error) {
			// Exibe erro no console e alerta para o usuário
			console.error('Erro no cadastro:', error);
			alert('Falha ao cadastrar cliente. Tente novamente.');
		}
	});
});
