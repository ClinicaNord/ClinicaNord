package com.senai.clinicanord.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.senai.clinicanord.entities.TipoUsuario;



public interface TipoUsuarioRepository extends  JpaRepository<TipoUsuario, Long> {

}
