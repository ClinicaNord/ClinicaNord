package com.senai.clinicanord.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.senai.clinicanord.entities.Agendamento;

public interface AgendamentoRepository extends JpaRepository<Agendamento, Long> {

}
