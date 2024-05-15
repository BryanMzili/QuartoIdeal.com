package com.bryanmzili.QuartoIdeal.service;

import com.bryanmzili.QuartoIdeal.data.AvaliacaoEntity;
import com.bryanmzili.QuartoIdeal.data.AvaliacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AvaliacaoService {

    @Autowired
    AvaliacaoRepository avaliacaoRepository;

    public AvaliacaoEntity criarAvaliacao(AvaliacaoEntity avaliacao) {
        avaliacaoRepository.save(avaliacao);
        return avaliacao;
    }

    /*public AnaliseEntity atualizarAnalise(Integer AnaliseId, AnaliseEntity analiseRequest) {
        AnaliseEntity analise = getAnaliseId(AnaliseId);

        analise.setFilme(analiseRequest.getFilme());
        analise.setAnalise(analiseRequest.getAnalise());
        analise.setNota(analiseRequest.getNota());

        analiseRepository.save(analise);
        return analise;
    }

    public List<AnaliseEntity> getAnaliseByIdFilme(Integer filmeId) {
        return analiseRepository.findAnaliseByIdFilme(filmeId);
    }

    public AnaliseEntity getAnaliseId(Integer analiseId) {
        return analiseRepository.findById(analiseId).orElse(null);
    }

    public List<AnaliseEntity> listarTodosAnalises() {
        return analiseRepository.findAll();
    }

    public void deletarAnalise(Integer analiseId) {
        AnaliseEntity Analise = getAnaliseId(analiseId);
        analiseRepository.deleteById(Analise.getId());
    }*/
}
