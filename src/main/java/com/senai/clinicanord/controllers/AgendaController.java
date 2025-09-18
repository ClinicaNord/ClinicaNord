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

import com.senai.clinicanord.entities.Agenda;
import com.senai.clinicanord.services.AgendaService;


@RestController
@RequestMapping("/agenda")
public class AgendaController {

	//ATRIBUTOS
    @Autowired
    private AgendaService agendaService;

    //MÉTODOS
    //método para postar/salvar uma nova agenda
    @PostMapping
    public Agenda createAgenda(@RequestBody Agenda agenda) {
        return agendaService.saveAgenda(agenda);
    }

    //método para listar todas as agendas
    @GetMapping
    public List<Agenda> getAllAgenda() {
        return agendaService.getAllAgenda();
    }

    //método para buscar a agenda pelo id
    @GetMapping("/{id}")
    public Agenda getAgenda(@PathVariable Long idAgenda) {
        return agendaService.getAgendaById(idAgenda);
    }


    //método para deletar a agenda pelo id
    @DeleteMapping("/{id}")
    public void deleteAgenda(@PathVariable Long idAgenda) {
        agendaService.deleteAgenda(idAgenda);
    }
}
