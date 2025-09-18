package com.senai.clinicanord.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.senai.clinicanord.entities.Agendamento;
import com.senai.clinicanord.repositories.AgendamentoRepository;


@Service
public class AgendamentoService {
	//ATRIBUTOS
    @Autowired
    private AgendamentoRepository agendamentoRepository;
    
    //MÉTODOS
    //método para salvar uma nova agendamento
    public Agendamento saveAgendamento( Agendamento agendamento) {
        return agendamentoRepository.save(agendamento);
    }
    
    //método para listar todos as agendamentos salvas
    public List<Agendamento> getAllAgendamento(){
        return agendamentoRepository.findAll();
    }
    
    //método para buscar uma agendamento pelo id
    public Agendamento getAgendamentoById (Long idAgendamento) {
        return agendamentoRepository.findById(idAgendamento).orElse(null);
    }
    
    //método para deletar uma agendamento pelo id
    public void deleteAgendamento(Long idAgendamento) {
        agendamentoRepository.deleteById(idAgendamento);
    }
}
