package com.senai.clinicanord.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.senai.clinicanord.entities.Carteirinha;
import com.senai.clinicanord.entities.NomeConvenio;
import com.senai.clinicanord.entities.Usuario;
import com.senai.clinicanord.repositories.CarteirinhaRepository;
import com.senai.clinicanord.repositories.NomeConvenioRepository;
import com.senai.clinicanord.repositories.UsuarioRepository;

@Service
public class CarteirinhaService {

    @Autowired
    private CarteirinhaRepository carteirinhaRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private NomeConvenioRepository nomeConvenioRepository;

    // SALVAR
    public Carteirinha saveCarteirinha(Carteirinha carteirinha) {

        if (carteirinha.getUsuario() == null || carteirinha.getUsuario().getIdUsuario() == null) {
            throw new RuntimeException("Usuário inválido ou não informado!");
        }

        if (carteirinha.getNomeConvenio() == null || carteirinha.getNomeConvenio().getIdNomeConv() == null) {
            throw new RuntimeException("Convênio inválido ou não informado!");
        }

        Usuario usuario = usuarioRepository.findById(carteirinha.getUsuario().getIdUsuario())
        	    .orElseThrow(() -> new RuntimeException("Usuário não encontrado!"));

        NomeConvenio convenio = nomeConvenioRepository.findById(carteirinha.getNomeConvenio().getIdNomeConv())
                .orElseThrow(() -> new RuntimeException("Convênio não encontrado!"));

        carteirinha.setUsuario(usuario);
        carteirinha.setNomeConvenio(convenio);

        return carteirinhaRepository.save(carteirinha);
    }

    // LISTAR TODOS
    public List<Carteirinha> getAllCarteirinha() {
        return carteirinhaRepository.findAll();
    }

    // BUSCAR POR ID
    public Carteirinha getCarteirinhaById(Long idCarteirinha) {
        return carteirinhaRepository.findById(idCarteirinha).orElse(null);
    }
    
    public Carteirinha findByNomeUsuario(Long idUsuario) {
		return carteirinhaRepository.findByNomeUsuario(idUsuario);
	}

    // DELETAR
    public void deleteCarteirinha(Long idCarteirinha) {
        carteirinhaRepository.deleteById(idCarteirinha);
    }
}
