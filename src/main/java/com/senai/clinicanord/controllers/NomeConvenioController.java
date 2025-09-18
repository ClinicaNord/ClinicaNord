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

import com.senai.clinicanord.entities.NomeConvenio;
import com.senai.clinicanord.services.NomeConvenioService;



@RestController
@RequestMapping("/nomeConv")
public class NomeConvenioController {

	//ATRIBUTOS
    @Autowired
    private NomeConvenioService nomeConvenioService;

    //MÉTODOS
    //método para postar/salvar um novo nomeConvenio
    @PostMapping
    public NomeConvenio createNomeConv(@RequestBody NomeConvenio nomeConvenio) {
        return nomeConvenioService.saveNomeConv(nomeConvenio);
    }

    //método para listar todos os nomeConvenio
    @GetMapping
    public List<NomeConvenio> getAllNomeConv() {
        return nomeConvenioService.getAllNomeConv();
    }

    //método para buscar o nomeConv pelo id
    @GetMapping("/{id}")
    public NomeConvenio getNomeConv(@PathVariable Long idNomeConv) {
        return nomeConvenioService.getNomeConvById(idNomeConv);
    }


    //método para deletar o nomeConvenio pelo id
    @DeleteMapping("/{id}")
    public void deleteNomeConv(@PathVariable Long iNomeConv) {
        nomeConvenioService.deleteNomeConv(iNomeConv);
    }
}
