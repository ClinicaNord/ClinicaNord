package com.senai.clinicanord.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.senai.clinicanord.entities.Convenio;

@Repository
public interface ConvenioRepository extends JpaRepository<Convenio, Long> {

}
