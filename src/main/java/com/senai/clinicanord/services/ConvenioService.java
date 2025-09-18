package com.senai.clinicanord.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.senai.clinicanord.entities.Convenio;
import com.senai.clinicanord.repositories.ConvenioRepository;


@Service
public class ConvenioService {

	//ATRIBUTOS
    @Autowired
    private ConvenioRepository convenioRepository;
    
    //MÉTODOS
    //método para salvar um novo convenio
    public Convenio saveConvenio( Convenio convenio) {
        return convenioRepository.save(convenio);
    }
    
    //método para listar todos os convenios salvos
    public List<Convenio> getAllConvenio(){
        return convenioRepository.findAll();
    }
    
    //método para buscar um convenio pelo id
    public Convenio getConvenioById (Long idConvenio) {
        return convenioRepository.findById(idConvenio).orElse(null);
    }
    
    //método para deletar uma agenda pelo id
    public void deleteConvenio(Long idConvenio) {
        convenioRepository.deleteById(idConvenio);
    }
}
