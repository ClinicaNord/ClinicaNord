// Aguarda o carregamento completo do DOM
document.addEventListener("DOMContentLoaded", () => {	  
	
	// Adiciona evento ao campo de CEP
	document.getElementById("cep").addEventListener("input", async function() {
		const cep = this.value.replace(/\D/g, ""); // Remove caracteres não numéricos
		
		if (cep.length === 8) { // Verifica se o CEP tem 8 dígitos
			try {
				// Faz requisição à API ViaCEP
				const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`); 
				
				if (!response.ok) throw new Error("Erro ao buscar o CEP");
				
				const dados = await response.json();
				
				// Verifica se o CEP é inválido
				if (dados.erro) {
					alert("CEP não encontrado.");
					return;
				}
				
				// Preenche os campos do formulário com os dados retornados
				document.getElementById("rua").value = dados.logradouro; 
				document.getElementById("bairro").value = dados.bairro;
				document.getElementById("cidade").value = dados.localidade;
				document.getElementById("estado").value = dados.estado;
			
			} catch (error) {
				alert("Erro ao buscar o endereço: " + error.message);
			}
		}
	});
	
	const form = document.getElementById("cadastroEndereco");
	
	const pessoaId = localStorage.getItem('pessoaId'); // Obtém ID da pessoa salva anteriormente

	// Se não houver pessoaId, redireciona para o cadastro de cliente
	if (!pessoaId) {
		alert("Pessoa não encontrada. Por favor, cadastre uma pessoa primeiro.");
		window.location.href = "cadastrocliente.html";
		return;
	}

	// Evento de envio do formulário de endereço
	form.addEventListener("submit", async (event) => {
		event.preventDefault(); // Impede o envio padrão do formulário

		// Captura os valores dos campos
		const estado = document.getElementById("estado").value;
		const cidade = document.getElementById("cidade").value;
		const bairro = document.getElementById("bairro").value;
		const numero = document.getElementById("numero").value;
		const cep = document.getElementById("cep").value;
		const rua = document.getElementById("rua").value;
		const complemento = document.getElementById("complemento").value;

		// Envia os dados para o backend via POST
		const response = await fetch("http://localhost:8080/cadastroenderecos", { 
			method: "POST",
			headers: {
				"Content-Type": "application/json" 
			},
			body: JSON.stringify({ 
				estado,
				cidade,
				bairro,
				rua,
				cep,
				numero,
				complemento,
				pessoa: {
					id_usuario: pessoaId
				}
			})
		})
		.then(response => {
			if (!response.ok) {
				throw new Error('Erro ao cadastrar endereço');
			}
			return response.json();
		})
		.then(data => {
			// Cadastro realizado com sucesso
			alert("Cadastro de endereço realizado com sucesso!");
			localStorage.removeItem('pessoaId'); // Remove o ID do localStorage
			window.location.href = './index.html'; // Redireciona para a página inicial
		})
		.catch(error => {
			// Em caso de erro, exibe no console e alerta o usuário
			console.error('Erro no cadastro:', error);
			alert('Falha ao cadastrar endereço. Tente novamente.');
		});
	});	
});
