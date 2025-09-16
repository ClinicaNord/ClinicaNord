package com.senai.clinicanord.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tb_servicos")
public class Servicos {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "idServicos", nullable = false)
	private Long idServicos;
	
	@Column(name = "nomeServicos", nullable = false, length = 100)
	private String servicos;
	
	//construtores
	public Servicos() {
		
	}
	
	public Servicos(Long idServicos, String servicos) {
		this.idServicos = idServicos;
		this.servicos = servicos;
	}

	public Long getIdServicos() {
		return idServicos;
	}

	public void setIdServicos(Long idServicos) {
		this.idServicos = idServicos;
	}

	public String getServicos() {
		return servicos;
	}

	public void setServicos(String servicos) {
		this.servicos = servicos;
	}
}
