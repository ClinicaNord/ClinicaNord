package com.senai.clinicanord.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.senai.clinicanord.entities.Servicos;
import com.senai.clinicanord.services.ServicosService;

@RestController
@RequestMapping("/servicos")
public class ServicosController {

	@Autowired
	private ServicosService servicosService;

	@PostMapping
	public Servicos createServicos(@RequestBody Servicos servicos) {
		return servicosService.saveServicos(servicos);
	}

	@GetMapping
	public List<Servicos> getAllServicos() {
		return servicosService.getAllServicos();
	}

	@GetMapping("/{id}")
	public Servicos getServicos(@PathVariable Long id) {
		return servicosService.getServicosById(id);
	}

	@PutMapping
	public Servicos editServicos(@RequestBody Servicos servicos) {
		return servicosService.saveServicos(servicos);
	}

	@DeleteMapping("/{id}")
	public void deleteServicos(@PathVariable Long id) {
		servicosService.deleteServicos(id);
	}
}
