package com.senai.clinicanord.entities;



import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import jakarta.persistence.Table;

@Table(name = "tb_carteirinha")
@Entity
public class Carteirinha {
	// Atributos
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "idConvenio", nullable = false, unique = true)
	private Long idConvenio;

	@Column(name = "numero", nullable = false)
	private String numero;

	@Column(name = "convenio", nullable = false)
	private String convenio;

	@Column(name = "validade", nullable = false)
	private String validade;

	
	
	@ManyToOne
	@JsonIgnoreProperties
	@JoinColumn(name = "usuario")
	private Usuario usuario;

	@ManyToOne
	@JsonIgnoreProperties
	@JoinColumn(name = "nomeConvenio")
	private NomeConvenio nomeConvenio;

	// CONSTRUTORES
	public Carteirinha() {

	}

	public Carteirinha(Long idConvenio, String numero, String convenio, String validade) {
		this.idConvenio = idConvenio;
		this.numero = numero;
		this.convenio = convenio;
		this.validade = validade;
	}

	// GETTERS E SETTERSS
	public Long getIdConvenio() {
		return idConvenio;
	}

	public void setIdConvenio(Long idConvenio) {
		this.idConvenio = idConvenio;
	}

	public String getNumero() {
		return numero;
	}

	public void setNumero(String numero) {
		this.numero = numero;
	}

	public String getConvenio() {
		return convenio;
	}

	public void setConvenio(String convenio) {
		this.convenio = convenio;
	}

	public String getValidade() {
		return validade;
	}

	public void setValidade(String validade) {
		this.validade = validade;
	}

	

	public NomeConvenio getNomeConvenio() {
		return nomeConvenio;
	}

	public void setNomeConvenio(NomeConvenio nomeConvenio) {
		this.nomeConvenio = nomeConvenio;
	}

	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}
	

}
