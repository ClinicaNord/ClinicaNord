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

import com.senai.clinicanord.entities.Carteirinha;
import com.senai.clinicanord.services.CarteirinhaService;


@RestController
@RequestMapping("/carteirinha")
public class CarteirinhaController {

	//ATRIBUTOS
    @Autowired
    private CarteirinhaService carteirinhaService;

    //MÉTODOS
    //método para postar/salvar um novo convenio
    @PostMapping
    public Carteirinha createCarteirinha(@RequestBody Carteirinha carteirinha) {
        return carteirinhaService.saveCarteirinha(carteirinha);
    }

    //método para listar todos os convenios
    @GetMapping
    public List<Carteirinha> getAllCarteirinha() {
        return carteirinhaService.getAllCarteirinha();
    }

    //método para buscar o convenio pelo id
    @GetMapping("/{id}")
    public Carteirinha getCarteirinha(@PathVariable Long idCarteirinha) {
        return carteirinhaService.getCarteirinhaById(idCarteirinha);
    }


    //método para deletar o convenio pelo id
    @DeleteMapping("/{id}")
    public void deleteCarteirinha (@PathVariable Long idCarteirinha) {
        carteirinhaService.deleteCarteirinha(idCarteirinha);
    
}
}
