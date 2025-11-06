package com.senai.clinicanord.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.senai.clinicanord.entities.Usuario;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    // Busca exata (já existente)
    Usuario findByNomeUsuario(String nomeUsuario);

    // Busca por email (já existente)
    Usuario findByEmail(String email);

    // 🔍 NOVA: busca parcial por nome de usuário (sem diferença de maiúsculas)
    @Query("SELECT u FROM Usuario u WHERE LOWER(u.nomeUsuario) LIKE LOWER(CONCAT('%', :nome, '%'))")
    List<Usuario> buscarPorNomeParcial(@Param("nome") String nome);
}