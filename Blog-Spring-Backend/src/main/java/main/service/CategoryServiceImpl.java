package main.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import main.dto.CategoryDTO;
import main.entity.Category;
import main.exceptions.CategoryException;
import main.repository.CategoryRepository;

@Service
public class CategoryServiceImpl implements CategoryService {

	private CategoryRepository categoryRepo;

	public CategoryServiceImpl(CategoryRepository categoryRepo) {
		this.categoryRepo = categoryRepo;
	}

	@Override
	public Category addCategory(String categoryName) throws CategoryException {

		Category category = new Category();
		categoryName = categoryName.replaceAll("\"", "");
		category.setName(categoryName);

		Category savedCategory = categoryRepo.save(category);
		
		if(savedCategory == null) {
			throw new CategoryException("Failed to add new category");
		}else {
			return category;
		}
	}

	@Override
	public boolean deleteCategory(int categoryId) throws CategoryException {
		
		if(categoryRepo.existsById(categoryId)) {
			categoryRepo.deleteById(categoryId);
			return true;
		}else {
			throw new CategoryException("Category with id " + categoryId + " doesnt exists");
		}
	}

	@Override
	public boolean updateCategory(int categoryId, String categoryName) throws CategoryException {
		 
		 Optional<Category> opt = categoryRepo.findById(categoryId);
		 
		 if(opt.isPresent()) {
			 Category category = opt.get();
			 categoryName = categoryName.replaceAll("\"", "");
			 category.setName(categoryName);
			 Category updatedCategory = categoryRepo.save(category);		 
			 if(updatedCategory == null) {
				 throw new CategoryException("Failed to update category name");
			 }
			 return true;
		 }else {
				throw new CategoryException("Category with id " + categoryId + " doesnt exists");
		 }
	}

	@Override
	public List<CategoryDTO> findAllCategories() {
		return categoryRepo.findAllCategoryDTO();
	}

	@Override
	public boolean updateCategoryOrder(int categoryId, int orderNumber) throws CategoryException {
			
		 Optional<Category> opt = categoryRepo.findById(categoryId);
		 
		 if(opt.isPresent()) {
			 	Category category = opt.get();
			 	category.setOrder(orderNumber);
			 	category = categoryRepo.save(category);
			 	
			 	if(category == null) {
			 		throw new CategoryException("Fail to update category order!");
			 	}
			 	return true;
		 }
		 throw new CategoryException("Categoryi with id " + categoryId + " doesnt exists");
	}

}
