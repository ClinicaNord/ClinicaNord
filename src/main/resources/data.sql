INSERT IGNORE INTO tb_tipo_usuario (id_tipo_usuario, nome) VALUES
(1, 'Admin'),
(2, 'Cliente');

INSERT IGNORE INTO tb_servicos (id_servicos, nome_servicos) VALUES
(1, 'Audiometria Clínica'),
(2, 'FonoTerapia'),
(3, 'Reabilitação Auditiva');

INSERT IGNORE INTO tb_nomeConvenio (id_nome_conv, nome_conv) VALUES
(1, 'Funcerv'),
(2, 'Apas');

INSERT IGNORE INTO tb_usuario (id_usuario, nome_usuario, cpf, telefone, email, senha, data_nascimento, tipo_usuario) VALUES
(1, 'Cristiane Mattos', '45113473871', '15988345655', 'cristianemattos@gmail.com', '12345', '1973-05-27', 1);

INSERT IGNORE INTO tb_endereco (id_endereco, bairro, cep, cidade, complemento, uf, rua, usuario_id) VALUES
(1, 'jardim sao paulo', '18051895', 'sorocaba', 'portão branco', 'SP', 'Luiz antonio pereira', 1);

INSERT IGNORE INTO tb_carteirinha (id_carteirinha, numero, validade, usuario_id, nome_convenio_id) VALUES
(2, '344', '2088-05-05', 1, 1);

INSERT IGNORE INTO tb_agenda(id_agenda, data_agenda, disponibilidade, hora) VALUES
(1,"2025-11-11",true,"16:00");

INSERT IGNORE INTO tb_agendamento(id_agendamento, agenda_id, servicos_id, usuario_id) VALUES
(1,1,1,1);
