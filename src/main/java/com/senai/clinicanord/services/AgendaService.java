package com.senai.clinicanord.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.senai.clinicanord.entities.Agenda;
import com.senai.clinicanord.repositories.AgendaReposirory;


@Service
public class AgendaService {

	//ATRIBUTOS
    @Autowired
    private AgendaReposirory agendaRepository;
    
    //MÉTODOS
    //método para salvar uma nova agenda
    public Agenda saveAgenda( Agenda agenda) {
        return agendaRepository.save(agenda);
    }
    
    //método para listar todos as agendas salvas
    public List<Agenda> getAllAgenda(){
        return agendaRepository.findAll();
    }
    
    //método para buscar uma agenda pelo id
    public Agenda getAgendaById (Long idAgenda) {
        return agendaRepository.findById(idAgenda).orElse(null);
    }
    
    //método para deletar uma agenda pelo id
    public void deleteAgenda(Long idAgenda) {
        agendaRepository.deleteById(idAgenda);
    }
}
