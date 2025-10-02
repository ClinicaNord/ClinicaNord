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

INSERT IGNORE INTO tb_usuario(id_usuario, nome_usuario, cpf, telefone, email, senha, data_nascimento, tipo_usuario_id)VALUES
(1, "Cristiane", 00000000000, 15999999999,"cristiane@gmail.com", "12345", 20.05.2000,2);