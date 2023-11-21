package main.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import main.model.CategoryDTO;
import main.domain.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, UUID>{

	
	@Query("SELECT NEW main.model.CategoryDTO(c.id, c.name, c.order, COUNT(b.id)) FROM Category c LEFT JOIN c.blogs b GROUP BY c.id , c.name, c.order ORDER BY c.order ")
	List<CategoryDTO> findAllCategoryDTO();

	Boolean existsByName(String categoryName);

	Boolean existsByOrder(Integer orderNumber);
}
