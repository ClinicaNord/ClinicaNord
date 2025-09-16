package com.senai.clinicanord.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.senai.clinicanord.entities.Servicos;
import com.senai.clinicanord.repositories.ServicosRepository;

@Service
public class ServicosService {
	@Autowired
	private ServicosRepository servicosRepository;
	
	public Servicos saveServicos( Servicos servicos) {
		return servicosRepository.save(servicos);
	}
	
	public List<Servicos> getAllServicos(){
		return servicosRepository.findAll();
	}
	
	public Servicos getServicosById (Long id) {
		return servicosRepository.findById(id).orElse(null);
	}
	
	public void deleteServicos(Long id) {
		servicosRepository.deleteById(id);
	}


}

