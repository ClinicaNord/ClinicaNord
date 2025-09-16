package com.senai.clinicanord.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.senai.clinicanord.entities.Servicos;

@Repository
public interface ServicosRepository extends JpaRepository<Servicos, Long>{

}
