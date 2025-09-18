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

import com.senai.clinicanord.entities.TipoUsuario;
import com.senai.clinicanord.services.TipoUsuarioService;


@RestController
@RequestMapping("/agendamento")
public class TipoUsuarioController {
	  @Autowired
	    private TipoUsuarioService tipoUsuarioService;

	    //MÉTODOS
	    //método para postar/salvar um novo tipoUsuario
	    @PostMapping
	    public TipoUsuario createTipoUsuario(@RequestBody TipoUsuario tipoUsuario) {
	        return tipoUsuarioService.saveTipoUsuario(tipoUsuario);
	    }

	    //método para listar todos os TiposUsuarios
	    @GetMapping
	    public List<TipoUsuario> getAllTipoUsuario() {
	        return tipoUsuarioService.getAllTipoUsuario();
	    }

	    //método para buscar o tipoUsuario pelo id
	    @GetMapping("/{id}")
	    public TipoUsuario getTipoUsuario(@PathVariable Long idTipoUsuario) {
	        return tipoUsuarioService.getTipoUsuarioById(idTipoUsuario);
	    }


	    //método para deletar o TipoUsuario pelo id
	    @DeleteMapping("/{id}")
	    public void deleteTipoUsuario (@PathVariable Long idTipoUsuario) {
	        tipoUsuarioService.deleteTipoUsuario(idTipoUsuario);
	    
	}

}
