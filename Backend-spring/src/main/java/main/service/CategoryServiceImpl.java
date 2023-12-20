package main.service;

import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import main.model.CategoryDTO;
import main.domain.Category;
import main.exceptions.CategoryException;
import main.repository.CategoryRepository;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

	private final CategoryRepository categoryRepo;


	@Override
	public Category addCategory(String categoryName) throws CategoryException {

		categoryName = categoryName.replaceAll("\"", "");

		if(categoryRepo.existsByName(categoryName))
			throw new CategoryException("There is alerdy category with same name!");

		return categoryRepo.save(Category.builder()
										.order(null)
										.name(categoryName)
										.build());
	}

	@Override
	public void deleteCategory(UUID categoryId) throws CategoryException {

		if (!categoryRepo.existsById(categoryId))
			throw new CategoryException("Category with id " + categoryId + " doesnt exists");

		categoryRepo.deleteById(categoryId);
	}

	@Override
	public void updateCategory(UUID categoryId, String categoryName) throws CategoryException {

		Category category = categoryRepo.findById(categoryId).orElseThrow(() -> new CategoryException("Category with id " + categoryId + " not found!"));

		if (categoryRepo.existsByName(categoryName))
			throw new CategoryException("Category with that name alerdy exists");

		category.setName(categoryName.replaceAll("\"", ""));
		categoryRepo.saveAndFlush(category);
	}

	@Override
	public void updateCategoryOrder ( UUID categoryId, int orderNumber) throws CategoryException {

		Category category = categoryRepo.findById(categoryId).orElseThrow(() -> new CategoryException("Categoryi with id " + categoryId + " doesnt exists"));

		if(categoryRepo.existsByOrder(orderNumber))
			throw new CategoryException("There is alerdy category with same order number!");

		category.setOrder(orderNumber);
		categoryRepo.saveAndFlush(category);
	}

	@Override
	public List<CategoryDTO> findAllCategories() {
		return categoryRepo.findAllCategoryDTO();
	}
}