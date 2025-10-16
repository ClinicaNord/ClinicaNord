 const inputNome = document.getElementById('nomePaciente');
        const tabelaPacientes = document.getElementById('tabelaPacientes').querySelector('tbody');
        const tabelaAgendamentos = document.getElementById('tabelaAgendamentos').querySelector('tbody');
        const agendamentosDiv = document.getElementById('agendamentos');
        const nomePacienteSpan = document.getElementById('nomePacienteSelecionado');

        inputNome.addEventListener('input', async () => {
            const nome = inputNome.value;
            tabelaPacientes.innerHTML = '';
            agendamentosDiv.style.display = 'none';

            if(nome.length === 0) return;

            try {
                const res = await fetch(`/cadastrocliente/buscarpornomeusuario?nomeUsuario=${encodeURIComponent(nome)}`);
                if(!res.ok) throw new Error('Erro ao buscar pacientes');

                const pacientes = await res.json();

                pacientes.forEach(paciente => {
                    const tr = document.createElement('tr');
                    tr.style.cursor = 'pointer';
                    tr.innerHTML = `<td>${paciente.nomeUsuario}</td><td>${paciente.email}</td>`;
                    tr.onclick = () => mostrarAgendamentos(paciente.id, paciente.nomeUsuario);
                    tabelaPacientes.appendChild(tr);
                });
            } catch(e) {
                console.error(e);
            }
        });

        async function mostrarAgendamentos(pacienteId, nomePaciente){
            try {
                const res = await fetch(`/agendamento/paciente/${pacienteId}`);
                if(!res.ok) throw new Error('Erro ao buscar agendamentos');

                const agendamentos = await res.json();

                tabelaAgendamentos.innerHTML = '';
                nomePacienteSpan.textContent = nomePaciente;

                if(agendamentos.length === 0){
                    const tr = document.createElement('tr');
                    tr.innerHTML = `<td colspan="2">Sem agendamentos</td>`;
                    tabelaAgendamentos.appendChild(tr);
                } else {
                    agendamentos.forEach(a => {
                        const tr = document.createElement('tr');
                        tr.innerHTML = `<td>${a.dataHora}</td><td>${a.servico || '-'}</td>`;
                        tabelaAgendamentos.appendChild(tr);
                    });
                }

                agendamentosDiv.style.display = 'block';
            } catch(e){
                console.error(e);
            }
        }