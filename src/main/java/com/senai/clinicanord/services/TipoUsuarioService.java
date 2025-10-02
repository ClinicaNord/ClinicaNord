package com.senai.clinicanord.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.senai.clinicanord.entities.TipoUsuario;
import com.senai.clinicanord.repositories.TipoUsuarioRepository;

@Service
public class TipoUsuarioService {

	//ATRIBUTOS
    @Autowired
    private TipoUsuarioRepository tipoUsuarioRepository;
    
    //MÉTODOS
    //método para salvar um novo tipousuario
    public TipoUsuario saveTipoUsuario( TipoUsuario tipoUsuario) {
        return tipoUsuarioRepository.save(tipoUsuario);
    }
    
    //método para listar todos os tiposusuarios salvos
    public List<TipoUsuario> getAllTipoUsuario(){
        return tipoUsuarioRepository.findAll();
    }
    
    //método para buscar um tipousuario pelo id
    public TipoUsuario getTipoUsuarioById (Long idTipoUsuario) {
        return tipoUsuarioRepository.findById(idTipoUsuario).orElseThrow(()-> new RuntimeException("Tipo cliente não encontrado"));
    }
    
    //método para deletar uma TipoUsuario pelo id
    public void deleteTipoUsuario(Long idTipoUsuario) {
        tipoUsuarioRepository.deleteById(idTipoUsuario);
    }
}
