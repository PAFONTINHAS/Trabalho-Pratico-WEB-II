package com.mmtads.backend.Repository;

import com.mmtads.backend.Model.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Interface Repository para a entidade Categoria.
 * Estende JpaRepository para herdar métodos CRUD prontos.
 * O primeiro parâmetro é a entidade (Categoria) e o segundo é o tipo da chave primária (Long).
 */
@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Long> {

    // O Spring Data JPA já fornece automaticamente:
    // - save() para inserção e atualização
    // - findAll() para listagem
    // - findById() para busca
    // - delete() e deleteById() para remoção
    
    // Métodos personalizados podem ser adicionados aqui se houver necessidade de buscas específicas,
    // como buscar por nome, por exemplo.

}