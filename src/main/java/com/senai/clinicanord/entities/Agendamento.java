package com.senai.clinicanord.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tb_agendamento")
public class Agendamento {

	@Id
	 @GeneratedValue(strategy = GenerationType.IDENTITY)
	 @Column(name = "idAgendamento", nullable = false, unique = true)
	 private Long idAgendamento;
	 
	 // CONSTRUTORES
	 public Agendamento() {
		 
	 }
	 public Agendamento(Long idAgendamento) {
		 this.idAgendamento = idAgendamento;
	 }
	 
	 // GETTERS E SETTERS
	public Long getIdAgendamento() {
		return idAgendamento;
	}
	public void setIdAgendamento(Long idAgendamento) {
		this.idAgendamento = idAgendamento;
	}
	 

}
