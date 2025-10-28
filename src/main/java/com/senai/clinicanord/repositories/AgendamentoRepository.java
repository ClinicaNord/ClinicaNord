package com.senai.clinicanord.repositories;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.senai.clinicanord.entities.Agendamento;


@Repository
public interface AgendamentoRepository extends JpaRepository<Agendamento, Long> {
	List<Agendamento> findByUsuarioIdUsuario(Long idUsuario);
}
