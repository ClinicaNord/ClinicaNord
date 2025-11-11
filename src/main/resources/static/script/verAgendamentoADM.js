document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("cardsContainer");

  try {
    // Faz a requisição ao backend
    const resposta = await fetch("http://localhost:8080/api/agendamentos");
    const agendamentos = await resposta.json();

    // Limpa container (opcional)
    container.innerHTML = "";

    // Cria um card para cada agendamento
    agendamentos.forEach((ag) => {
      const card = document.createElement("div");
      card.classList.add("card-agendamento");
      card.innerHTML = `
          <ul>
          <li><b>Nome do paciente:</b> ${ag.nomeUsuario}</li>
          <li><b>Tipo da terapia:</b> ${ag.tipoTerapia}</li>
          <li><b>Dia da semana:</b> ${ag.diaSemana}</li>
          <li><b>Horário:</b> ${ag.horario}</li>
          <li><b>Terapeuta:</b> ${ag.terapeuta}</li>
        </ul>
        <div class="card-buttons">
          <button class="btn-cancelar" onclick="cancelarAgendamento(${ag.id})">Cancelar agendamento</button>
          <button class="btn-nota" onclick="adicionarNota(${ag.id})">Adicionar nota</button>
        </div>
      `;
      container.appendChild(card);
    });

  } catch (erro) {
    console.error("Erro ao carregar agendamentos:", erro);
    container.innerHTML = "<p>Erro ao carregar os agendamentos.</p>";
  }
});

// Funções simuladas
function cancelarAgendamento(id) {
  alert(`Agendamento ${id} cancelado.`);
}

function adicionarNota(id) {
  alert(`Adicionar nota ao agendamento ${id}.`);
}
