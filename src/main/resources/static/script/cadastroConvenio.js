// Espera o carregamento completo do DOM
document.addEventListener("DOMContentLoaded", () => {
	const form = document.getElementById("cadastroClienteForm");

	// Adiciona um listener para o envio do formulário
	form.addEventListener("submit", async (event) => {
		event.preventDefault(); // Impede o envio padrão do formulário

		// Captura os valores dos campos do formulário
		const numero = document.getElementById("numero").value;
		const convenio = document.getElementById("convenio").value;
		const validade = document.getElementById("validade").value;
		try { 
			// Envia os dados para o backend via POST
			const response = await fetch("http://localhost:8080/cadastroconvenio", { 
				method: "POST",
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ 
					numero,
					convenio,
					validade
				})
			});

			// Verifica se a resposta foi bem-sucedida
			if (!response.ok) {
				throw new Error('Erro ao cadastrar convênio');
			}

			// Converte a resposta para JSON
			const data = await response.json();

			// Salva o ID do usuário no localStorage
			localStorage.setItem('pessoaId', data.id_usuario);

			// Redireciona para a página de perfil
			window.location.href = './perfilCliente.html';

		} catch (error) {
			// Exibe erro no console e alerta para o usuário
			console.error('Erro no cadastro:', error);
			alert('Falha ao cadastrar convênio. Tente novamente.');
		}
	});
});
