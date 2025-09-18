package com.senai.clinicanord.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.senai.clinicanord.entities.NomeConvenio;
import com.senai.clinicanord.repositories.NomeConvenioRepository;



@Service
public class NomeConvenioService {
	//ATRIBUTOS
    @Autowired
    private NomeConvenioRepository nomeConvenioRepository;
    
    //MÉTODOS
    //método para salvar um novo nomeConvenio
    public NomeConvenio saveNomeConv( NomeConvenio nomeConvenio) {
        return nomeConvenioRepository.save(nomeConvenio);
    }
    
    //método para listar todos os nomesConvenio salvas
    public List<NomeConvenio> getAllNomeConv(){
        return nomeConvenioRepository.findAll();
    }
    
    //método para buscar um nomeConv pelo id
    public NomeConvenio getNomeConvById (Long idNomeConv) {
        return nomeConvenioRepository.findById(idNomeConv).orElse(null);
    }
    
    //método para deletar um nomeConv pelo id
    public void deleteNomeConv(Long idNomeConv) {
        nomeConvenioRepository.deleteById(idNomeConv);
    }
}
