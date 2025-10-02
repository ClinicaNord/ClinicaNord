package com.senai.clinicanord.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.senai.clinicanord.entities.Carteirinha;
import com.senai.clinicanord.repositories.CarteirinhaRepository;


@Service
public class CarteirinhaService {

	//ATRIBUTOS
    @Autowired
    private CarteirinhaRepository carteirinhaRepository;
    
    //MÉTODOS
    //método para salvar um novo convenio
    public Carteirinha saveCarteirinha( Carteirinha carteirinha) {
        return carteirinhaRepository.save(carteirinha);
    }
    
    //método para listar todos os convenios salvos
    public List<Carteirinha> getAllCarteirinha(){
        return carteirinhaRepository.findAll();
    }
    
    //método para buscar um convenio pelo id
    public Carteirinha getCarteirinhaById (Long idCarteirinha) {
        return carteirinhaRepository.findById(idCarteirinha).orElse(null);
    }
    
    //método para deletar uma agenda pelo id
    public void deleteCarteirinha(Long idCarteirinha) {
        carteirinhaRepository.deleteById(idCarteirinha);
    }
}
