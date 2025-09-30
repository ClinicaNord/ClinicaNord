package com.senai.clinicanord.entities;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "tb_nomeconvenio")
public class NomeConvenio {
	//ATRIBUTOS
	
			@Id
		    @GeneratedValue(strategy = GenerationType.IDENTITY)
		    @Column(name = "idNomeConv", nullable = false, unique = true)
		    private Long idNomeConv;
			
			@Column(name = "nomeConv", nullable = false)
			private String nomeConv;
			
			
			@OneToMany(mappedBy = "nomeConvenio")
			private List<Convenio> convenios;
			
			//Construtores 
			public NomeConvenio() {
				
			}
			public NomeConvenio(Long idNomeConv, String nomeConv) {
				this.idNomeConv= idNomeConv;
				this.nomeConv = nomeConv;
			}
			
			//Getters e Setters
			public Long getIdNomeConv() {
				return idNomeConv;
			}
			public void setIdNomeConv(Long idNomeConv) {
				this.idNomeConv = idNomeConv;
			}
			public String getNomeConv() {
				return nomeConv;
			}
			public void setNomeConv(String nomeConv) {
				this.nomeConv = nomeConv;
			}
			public List<Convenio> getConvenios() {
				return convenios;
			}
			public void setConvenios(List<Convenio> convenios) {
				this.convenios = convenios;
			}
			
}
