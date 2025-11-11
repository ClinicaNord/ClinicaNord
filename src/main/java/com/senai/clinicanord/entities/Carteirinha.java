package com.senai.clinicanord.entities;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "tb_carteirinha")
public class Carteirinha {

	// ====== Atributos ======
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_carteirinha", nullable = false, unique = true)
    private Long idCarteirinha;

    @Column(name = "numero", nullable = false)
    private String numero;

    @Column(name = "validade", nullable = false)
    private LocalDate validade;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    @JsonManagedReference
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "nome_convenio_id", nullable = false)
    @JsonManagedReference
    private NomeConvenio nomeConvenio;

    // ===== Construtores =====
    public Carteirinha() {}

    public Carteirinha(String numero, LocalDate validade, Usuario usuario, NomeConvenio nomeConvenio) {
        this.numero = numero;
        this.validade = validade;
        this.usuario = usuario;
        this.nomeConvenio = nomeConvenio;
    }

    // ===== Getters e Setters =====
    public Long getIdCarteirinha() {
        return idCarteirinha;
    }

    public void setIdCarteirinha(Long idCarteirinha) {
        this.idCarteirinha = idCarteirinha;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public LocalDate getValidade() {
        return validade;
    }

    public void setValidade(LocalDate validade) {
        this.validade = validade;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public NomeConvenio getNomeConvenio() {
        return nomeConvenio;
    }

    public void setNomeConvenio(NomeConvenio nomeConvenio) {
        this.nomeConvenio = nomeConvenio;
    }
}
