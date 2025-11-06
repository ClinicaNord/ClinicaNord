document.addEventListener("DOMContentLoaded", async () => {
	// Recupera o usuário logado
	const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

	if (!usuarioLogado) {
		alert("Você precisa estar logado para ver seus agendamentos!");
		window.location.href = "./login.html";
		return;
	}

	const usuarioId = usuarioLogado.idUsuario;
	const main = document.querySelector("main.card");

	try {
		// Busca os agendamentos do usuário
		const response = await fetch(`http://localhost:8080/agendamento/usuario/${usuarioId}`);
		if (!response.ok) throw new Error("Erro ao buscar agendamentos");

		const agendamentos = await response.json();
		console.log("Agendamentos recebidos:", agendamentos);

		if (!agendamentos || agendamentos.length === 0) {
			main.innerHTML = "<h2>Você ainda não possui agendamentos.</h2>";
			return;
		}

		const ag = agendamentos[0]; // exibe o primeiro agendamento

		// Preenche os dados corretamente
		document.getElementById("nome").textContent = usuarioLogado.nomeUsuario || ag.usuario?.nome || "";
		document.getElementById("servico").textContent = servico || ag.servicos?.nome || "";

		// Formata a data corretamente
		let dataFormatada = "";
		if (ag.agenda?.data) {
			const dataObj = new Date(ag.agenda.data);
			if (!isNaN(dataObj)) {
				dataFormatada = dataObj.toLocaleDateString("pt-BR");
			} else {
				dataFormatada = ag.agenda.data; // fallback
			}
		}
		document.getElementById("data").textContent = dataFormatada || ag.agenda?.data || "";

		document.getElementById("hora").textContent = hora || ag.agenda?.hora || "";

		// ===== Botões =====
		// Cancelar agendamento
		document.getElementById("cancelar").addEventListener("click", async () => {
			const confirma = confirm("Deseja realmente cancelar este agendamento?");
			if (!confirma) return;

			try {
				const res = await fetch(`http://localhost:8080/agendamento/${ag.idAgendamento}`, {
					method: "DELETE",
				});
				if (res.ok) {
					alert("Agendamento cancelado com sucesso!");
					location.reload();
				} else {
					alert("Erro ao cancelar agendamento.");
				}
			} catch (erro) {
				console.error("Erro ao cancelar:", erro);
				alert("Erro de conexão ao cancelar.");
			}
		});

		// Editar agendamento
		document.getElementById("editar").addEventListener("click", () => {
			window.location.href = `editarAgendamento.html?id=${ag.idAgendamento}`;
		});

		// Novo agendamento
		document.getElementById("novo").addEventListener("click", () => {
			window.location.href = "./agenda.html";
		});

	} catch (err) {
		console.error("Erro ao carregar agendamentos:", err);
		main.innerHTML = "<h2>Erro ao carregar seus agendamentos.</h2>";
	}
});
