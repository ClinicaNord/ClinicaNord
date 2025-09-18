package com.senai.clinicanord.entities;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name = "tb_agenda")
public class Agenda {

	//ATRIBUTOS
	
		@Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Column(name = "idAgenda", nullable = false, unique = true)
	    private Long idAgenda;
		
		@Column(name= "Data", nullable = false)
		private Date data;
		
		@Column(name = "hora", nullable = false)
		private String hora;
		
		@Column(name = "diponibilidade", nullable = false)
		private Boolean diponibilidade;
		
		// CONSTRUTORES
		
		public Agenda() {
			
		}
		public Agenda(Long idAgenda, Date data, String hora, Boolean disponibilidade) {
			this.idAgenda = idAgenda;
			this.data = data;
			this.hora= hora;
			this.diponibilidade = disponibilidade;
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
		public Boolean getDiponibilidade() {
			return diponibilidade;
		}
		public void setDiponibilidade(Boolean diponibilidade) {
			this.diponibilidade = diponibilidade;
		}
		
		
		
}
