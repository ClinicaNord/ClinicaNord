package com.senai.clinicanord.entities;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;


@Entity
@Table(name = "tb_agenda")
public class Agenda {

	//ATRIBUTOS
	
		@Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Column(name = "id_agenda", nullable = false, unique = true)
	    private Long idAgenda;
		
		@Column(name= "data_agenda", nullable = false)
		private Date data;
		
		@Column(name = "hora", nullable = false)
		private String hora;
		
		@Column(name = "disponibilidade", nullable = false)
		private Boolean disponibilidade;
		
		@JsonIgnore
		@OneToMany(mappedBy = "agenda")
		private List<Agendamento> agendamento;
		
		// CONSTRUTORES
		
		public Agenda() {
			
		}
		public Agenda(Long idAgenda, Date data, String hora, Boolean disponibilidade) {
			this.idAgenda = idAgenda;
			this.data = data;
			this.hora= hora;
			this.disponibilidade = disponibilidade;
		}
		
		//GETTERS E SETTERS
		public Long getIdAgenda() {
			return idAgenda;
		}
		public void setIdAgenda(Long idAgenda) {
			this.idAgenda = idAgenda;
		}
		public Date getData() {
			return data;
		}
		public void setData(Date data) {
			this.data = data;
		}
		public String getHora() {
			return hora;
		}
		public void setHora(String hora) {
			this.hora = hora;
		}
		public Boolean getDisponibilidade() {
			return disponibilidade;
		}
		public void setDisponibilidade(Boolean disponibilidade) {
			this.disponibilidade = disponibilidade;
		}
		public List<Agendamento> getAgendamento() {
			return agendamento;
		}
		public void setAgendamento(List<Agendamento> agendamento) {
			this.agendamento = agendamento;
		}
		
		
		
}
