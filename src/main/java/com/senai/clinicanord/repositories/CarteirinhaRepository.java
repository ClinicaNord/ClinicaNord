package com.senai.clinicanord.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.senai.clinicanord.entities.Carteirinha;


@Repository
public interface CarteirinhaRepository extends JpaRepository<Carteirinha, Long> {

	   Carteirinha findByNomeUsuario(String nomeUsuario);
}
