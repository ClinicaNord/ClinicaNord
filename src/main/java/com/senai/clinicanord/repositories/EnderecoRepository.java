package com.senai.clinicanord.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.senai.clinicanord.entities.Endereco;
@Repository
public interface EnderecoRepository extends JpaRepository<Endereco, Long>{

}
