package com.senai.clinicanord.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.senai.clinicanord.entities.Agenda;

@Repository
public interface AgendaReposirory extends JpaRepository<Agenda , Long> {
	
	List<Agenda> findByDisponibilidadeTrue();


}