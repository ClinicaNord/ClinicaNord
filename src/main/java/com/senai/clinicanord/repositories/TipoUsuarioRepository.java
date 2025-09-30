package com.senai.clinicanord.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.senai.clinicanord.entities.TipoUsuario;


@Repository
public interface TipoUsuarioRepository extends  JpaRepository<TipoUsuario, Long> {

}
