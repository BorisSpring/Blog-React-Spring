package main.service;

import java.util.List;
import java.util.UUID;
import main.model.CategoryDTO;
import main.domain.Category;
import main.exceptions.CategoryException;

public interface CategoryService {

	 Category addCategory(String category) throws CategoryException;
	
	 void deleteCategory(UUID categoryId) throws CategoryException;
	
	 void updateCategory(UUID userId, String categoryName) throws CategoryException;
	
	 List<CategoryDTO> findAllCategories();
	
	 void updateCategoryOrder(UUID categoryId, int orderNumber) throws CategoryException;
	
}
