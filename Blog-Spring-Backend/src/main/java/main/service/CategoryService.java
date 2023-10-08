package main.service;

import java.util.List;

import main.dto.CategoryDTO;
import main.entity.Category;
import main.exceptions.CategoryException;

public interface CategoryService {

	public Category addCategory(String category) throws CategoryException;
	
	public boolean deleteCategory(int categoryId) throws CategoryException;
	
	public boolean updateCategory(int userId, String categoryName) throws CategoryException;
	
	public List<CategoryDTO> findAllCategories();
	
	public boolean updateCategoryOrder(int categoryId, int orderNumber) throws CategoryException;
	
}
