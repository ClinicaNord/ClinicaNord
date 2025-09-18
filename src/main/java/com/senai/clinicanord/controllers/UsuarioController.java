package com.senai.clinicanord.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.senai.clinicanord.entities.Usuario;
import com.senai.clinicanord.services.UsuarioService;

@RestController
@RequestMapping("/cadastrocliente")
public class UsuarioController {

	@Autowired
	private UsuarioService usuarioService;

	@PostMapping
	public Usuario createUsuario(@RequestBody Usuario usuario) {
		return usuarioService.saveUsuario(usuario);
	}

	@GetMapping
	public List<Usuario> getAllUsuario() {
		return usuarioService.getAllUsuario();
	}

	@GetMapping("/{id}")
	public Usuario getUsuario(@PathVariable Long id) {
		return usuarioService.getUsuarioById(id);
	}

	@PutMapping
	public Usuario editUsuario(@RequestBody Usuario usuario) {
		return usuarioService.saveUsuario(usuario);
	}

	@DeleteMapping("/{id}")
	public void deleteUsuario(@PathVariable Long id) {
		usuarioService.deleteUsuario(id);
	}
	
	//buscar por nome de usuário 
	@GetMapping("/buscarpornomeusuario")
	public Usuario getByNomeUsuario(@RequestParam String nomeUsuario) {
		return usuarioService.findByNomeUsuario(nomeUsuario);
	}
		
	@PostMapping("/login")
	public ResponseEntity<Usuario> login(@RequestBody Usuario loginRequest) {
	    Usuario pessoa = usuarioService.autenticarPessoa(loginRequest.getEmail(), loginRequest.getSenha());
	    if (pessoa != null) {
	        return ResponseEntity.ok(pessoa);
	    } else {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
	    }
	}


}

