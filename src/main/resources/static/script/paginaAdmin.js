    function salvarConfig() {
      const dias = document.getElementById("dias").value.split(",").map(d => d.trim());
      const horarios = document.getElementById("horarios").value.split(",").map(h => h.trim());

      const config = { dias, horarios };
      localStorage.setItem("agendaConfig", JSON.stringify(config));

      alert("Configurações salvas com sucesso!");
    }