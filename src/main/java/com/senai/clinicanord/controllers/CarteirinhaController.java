package com.senai.clinicanord.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.senai.clinicanord.entities.Carteirinha;

import com.senai.clinicanord.services.CarteirinhaService;

@CrossOrigin(origins = "http://localhost:5500") // ou a porta onde seu front está
@RestController
@RequestMapping("/carteirinha")
public class CarteirinhaController {

    @Autowired
    private CarteirinhaService carteirinhaService;

    @PostMapping
    public Carteirinha createCarteirinha(@RequestBody Carteirinha carteirinha) {
        return carteirinhaService.saveCarteirinha(carteirinha);
    }

    @GetMapping
    public List<Carteirinha> getAllCarteirinha() {
        return carteirinhaService.getAllCarteirinha();
    }
    

  

    @GetMapping("/{id}")
    public Carteirinha getCarteirinha(@PathVariable("id") Long idCarteirinha) {
        return carteirinhaService.getCarteirinhaById(idCarteirinha);
    }

    @DeleteMapping("/{id}")
    public void deleteCarteirinha(@PathVariable("id") Long idCarteirinha) {
        carteirinhaService.deleteCarteirinha(idCarteirinha);
    }
}
