package com.senai.clinicanord.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "tb_agendamento")
public class Agendamento {

	@Id
	 @GeneratedValue(strategy = GenerationType.IDENTITY)
	 @Column(name = "id_agendamento", nullable = false, unique = true)
	 private Long idAgendamento;
	
	@ManyToOne
	//@JsonIgnore
	@JoinColumn(name = "servicos_id")
	private Servicos servicos;
	
	@ManyToOne
	//@JsonIgnore
	@JoinColumn(name = "usuario_id")
	private Usuario usuario;
	
	@ManyToOne
	//@JsonIgnore
	@JoinColumn(name = "agenda_id")
	private Agenda agenda;
	 
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
	public Servicos getServicos() {
		return servicos;
	}
	public void setServicos(Servicos servicos) {
		this.servicos = servicos;
	}
	public Usuario getUsuario() {
		return usuario;
	}
	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}
	public Agenda getAgenda() {
		return agenda;
	}
	public void setAgenda(Agenda agenda) {
		this.agenda = agenda;
	}
	
	 

}
