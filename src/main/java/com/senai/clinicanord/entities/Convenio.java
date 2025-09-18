package com.senai.clinicanord.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Table(name = "tb_convenio")
@Entity
public class Convenio {
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
		
		//CONSTRUTORES
		public Convenio () {
			
		}
		public Convenio(Long idConvenio, String numero, String convenio, String validade) {
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
		
		



}
