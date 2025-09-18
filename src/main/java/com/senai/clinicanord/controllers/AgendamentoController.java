package com.senai.clinicanord.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.senai.clinicanord.entities.Agendamento;
import com.senai.clinicanord.services.AgendamentoService;



@RestController
@RequestMapping("/agendamento")
public class AgendamentoController {

	//ATRIBUTOS
    @Autowired
    private AgendamentoService agendamentoService;

    //MÉTODOS
    //método para postar/salvar um novo agendamento
    @PostMapping
    public Agendamento createAgendamento(@RequestBody Agendamento agendamento) {
        return agendamentoService.saveAgendamento(agendamento);
    }

    //método para listar todos os agendamentos
    @GetMapping
    public List<Agendamento> getAllAgendamento() {
        return agendamentoService.getAllAgendamento();
    }

    //método para buscar o agendamento pelo id
    @GetMapping("/{id}")
    public Agendamento getAgendamento(@PathVariable Long idAgendamento) {
        return agendamentoService.getAgendamentoById(idAgendamento);
    }


    //método para deletar o agendamento pelo id
    @DeleteMapping("/{id}")
    public void deleteAgendamento (@PathVariable Long idAgendamento) {
        agendamentoService.deleteAgendamento(idAgendamento);
    
}
}
