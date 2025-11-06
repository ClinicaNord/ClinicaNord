        const inputNome = document.getElementById('nomeUsuario');
        const tabelaUsuario = document.getElementById('tabelaUsuario').querySelector('tbody');
        const tabelaAgendamentos = document.getElementById('tabelaAgendamentos').querySelector('tbody');
        const agendamentosDiv = document.getElementById('agendamentos');
        const nomeUsuarioSpan = document.getElementById('nomeUsuarioSelecionado');

        inputNome.addEventListener('input', async () => {
            const nome = inputNome.value;
            tabelaUsuario.innerHTML = '';
            agendamentosDiv.style.display = 'none';

            if(nome.length === 0) return;

            try {
                const res = await fetch(`/cadastrocliente/buscarpornomeusuario?nomeUsuario=${encodeURIComponent(nome)}`);
                if(!res.ok) throw new Error('Erro ao buscar pacientes');

                const Usuario = await res.json();

                Usuario.forEach(Usuario => {
                    const tr = document.createElement('tr');
                    tr.style.cursor = 'pointer';
                    tr.innerHTML = `<td>${Usuario.nomeUsuario}</td><td>${Usuario.email}</td>`;
                    tr.onclick = () => mostrarAgendamentos(idUsuario, Usuario.nomeUsuario);
                    tabelaUsuario.appendChild(tr);
                });
            } catch(e) {
                console.error(e);
            }
        });

        async function mostrarAgendamentos(idUsuario, nomeUsuario){
            try {
                const res = await fetch(`/agendamento/usuario/${usuarioIdId}`);
                if(!res.ok) throw new Error('Erro ao buscar agendamentos');

                const agendamentos = await res.json();

                tabelaAgendamentos.innerHTML = '';
                nomeUsuarioSpan.textContent = nomeUsuario;

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