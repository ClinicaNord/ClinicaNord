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

import com.senai.clinicanord.entities.Convenio;
import com.senai.clinicanord.services.ConvenioService;


@RestController
@RequestMapping("/convenio")
public class ConvenioController {

	//ATRIBUTOS
    @Autowired
    private ConvenioService convenioService;

    //MÉTODOS
    //método para postar/salvar um novo convenio
    @PostMapping
    public Convenio createConvenio(@RequestBody Convenio convenio) {
        return convenioService.saveConvenio(convenio);
    }

    //método para listar todos os convenios
    @GetMapping
    public List<Convenio> getAllConvenio() {
        return convenioService.getAllConvenio();
    }

    //método para buscar o convenio pelo id
    @GetMapping("/{id}")
    public Convenio getConvenio(@PathVariable Long idConvenio) {
        return convenioService.getConvenioById(idConvenio);
    }


    //método para deletar o convenio pelo id
    @DeleteMapping("/{id}")
    public void deleteConvenio (@PathVariable Long idConvenio) {
        convenioService.deleteConvenio(idConvenio);
    
}
}
