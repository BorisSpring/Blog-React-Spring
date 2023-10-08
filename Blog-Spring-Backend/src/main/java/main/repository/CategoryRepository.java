package main.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import main.dto.CategoryDTO;
import main.entity.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer>{

	
	@Query("SELECT NEW main.dto.CategoryDTO(c.id, c.name, c.order, COUNT(b.id)) FROM Category c LEFT JOIN c.blogs b GROUP BY c.id , c.name, c.order ORDER BY c.order ")
	List<CategoryDTO> findAllCategoryDTO();
	
}
