package com.senai.clinicanord.entities;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "tb_usuario")
public class Usuario {
	// Atributos
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "idUsuario", nullable = false)
	private Long idUsuario;
	
	@Column(name = "nomeUsuario", nullable = false, length = 100)
	private String nomeUsuario;
	
	@Column(name = "cpf", nullable = false, length = 11, unique = true)
	private String cpf;
	
	@Column(name = "telefone", nullable = false,  unique = false)
	private String telefone;
	
	@Column(name = "email", nullable = false, unique = true, length = 50)
	private String email;
	
	@Column(name = "senha", nullable = false, length = 50)
	private String senha;
	
	@Column(name = "data_nascimento", unique = false)
	private LocalDate data_nascimento;
	
	@ManyToOne
	@JsonIgnoreProperties
	@JoinColumn(name = "tipoUsuario")
	private TipoUsuario tipoUsuario;
	
	@OneToMany(mappedBy = "usuario")
	
	@ManyToOne
	@JsonIgnoreProperties
	@JoinColumn(name = "convenio")
	private Convenio convenio;
	
	private List<Endereco> enderecos;


	// Construtores
	public Usuario() {

	}

	public Usuario(Long idUsuario, String nomeUsuario, String cpf, String telefone, String email, String senha,
			LocalDate data_nascimento, Endereco endereco) {
		this.idUsuario = idUsuario;
		this.nomeUsuario = nomeUsuario;
		this.cpf = cpf;
		this.telefone = telefone;
		this.email = email;
		this.senha = senha;
		this.data_nascimento = data_nascimento;
		
	}

	public Long getIdUsuario() {
		return idUsuario;
	}

	public void setIdUsuario(Long idUsuario) {
		this.idUsuario = idUsuario;
	}

	public String getNomeUsuario() {
		return nomeUsuario;
	}

	public void setNomeUsuario(String nomeUsuario) {
		this.nomeUsuario = nomeUsuario;
	}

	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public String getTelefone() {
		return telefone;
	}

	public void setTelefone(String telefone) {
		this.telefone = telefone;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getSenha() {
		return senha;
	}

	public void setSenha(String senha) {
		this.senha = senha;
	}

	public LocalDate getData_nascimento() {
		return data_nascimento;
	}

	public void setData_nascimento(LocalDate data_nascimento) {
		this.data_nascimento = data_nascimento;
	}
	public TipoUsuario getTipoUsuario() {
		return tipoUsuario;
	}
	public void setTipoUsuario(TipoUsuario tipoUsuario) {
		this.tipoUsuario = tipoUsuario;
	}

	public Convenio getConvenio() {
		return convenio;
	}

	public void setConvenio(Convenio convenio) {
		this.convenio = convenio;
	}

	public List<Endereco> getEnderecos() {
		return enderecos;
	}

	public void setEnderecos(List<Endereco> enderecos) {
		this.enderecos = enderecos;
	}
	

	



}
