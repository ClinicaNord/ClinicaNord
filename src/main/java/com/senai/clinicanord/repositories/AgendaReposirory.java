package com.senai.clinicanord.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.senai.clinicanord.entities.Agenda;

public interface AgendaReposirory extends JpaRepository<Agenda , Long> {

}
