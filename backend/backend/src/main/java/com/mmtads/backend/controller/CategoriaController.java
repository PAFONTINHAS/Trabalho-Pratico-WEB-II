package com.mmtads.backend.controller;

import com.mmtads.backend.Model.Categoria;
import com.mmtads.backend.Repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/categorias")
public class CategoriaController {

    @Autowired
    private CategoriaRepository categoriaRepository;

    // RF017 - Listagem (Read All): GET /api/categorias
    @GetMapping
    public List<Categoria> listarTodos() {
        return categoriaRepository.findAll();
    }

    // RF017 - Buscar por ID (Read One): GET /api/categorias/{id}
    @GetMapping("/{id}")
    public ResponseEntity<Categoria> buscarPorId(@PathVariable Long id) {
        Optional<Categoria> categoria = categoriaRepository.findById(id);
        return categoria.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // RF017 - Inserção (Create): POST /api/categorias
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Categoria criar(@RequestBody Categoria categoria) {
        return categoriaRepository.save(categoria);
    }

    // RF017 - Atualização (Update): PUT /api/categorias/{id}
    @PutMapping("/{id}")
    public ResponseEntity<Categoria> atualizar(@PathVariable Long id, @RequestBody Categoria categoriaDetalhes) {
        return categoriaRepository.findById(id)
                .map(categoriaExistente -> {
                    // Atualiza apenas o campo 'nome'
                    categoriaExistente.setNome(categoriaDetalhes.getNome());
                    Categoria atualizada = categoriaRepository.save(categoriaExistente);
                    return ResponseEntity.ok(atualizada);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // RF017 - Remoção (Delete): DELETE /api/categorias/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        if (!categoriaRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        categoriaRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
