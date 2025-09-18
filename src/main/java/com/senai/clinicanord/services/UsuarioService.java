package com.senai.clinicanord.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.senai.clinicanord.entities.Usuario;
import com.senai.clinicanord.repositories.UsuarioRepository;

@Service
public class UsuarioService {
	
	@Autowired
	private UsuarioRepository usuarioRepository;
	
	public Usuario saveUsuario( Usuario usuario) {
		return usuarioRepository.save(usuario);
	}
	
	public List<Usuario> getAllUsuario(){
		return usuarioRepository.findAll();
	}
	
	public Usuario getUsuarioById (Long id) {
		return usuarioRepository.findById(id).orElse(null);
	}
	
	public void deleteUsuario(Long id) {
		usuarioRepository.deleteById(id);
	}
	public Usuario findByNomeUsuario(String nomeUsuario) {
		return usuarioRepository.findByNomeUsuario(nomeUsuario);
	}
	
	public Usuario autenticarPessoa(String email, String senha) {
		
		//Buscar no banco de dados um usuário que tenha o email informado
		Usuario pessoa = usuarioRepository.findByEmail(email);
		
		//verifica se o usuário foi encontrado e se a senha informada confere com a senha do usuário
		if (pessoa != null && pessoa.getSenha().equals(senha)) {
			//se email e senha estiverem corretos, retorna o objeto usuário autenticado 
			return pessoa;
		}else {
			//se o usuário não existir ou a senha não estiver correta, retorna null(falha na autenticação)
			return null;
		}
	}

}

