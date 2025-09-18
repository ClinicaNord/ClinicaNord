package com.senai.clinicanord.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.senai.clinicanord.entities.Usuario;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long>{
	//ta pra encontrar por nome de usuário
		Usuario findByNomeUsuario(String nomeUsuario);
		
		//consulta para encontrar por email
		Usuario findByEmail(String email);
}
