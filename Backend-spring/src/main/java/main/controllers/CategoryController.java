package main.controllers;

import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import main.model.CategoryDTO;
import main.domain.Category;
import main.exceptions.CategoryException;
import main.service.CategoryService;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {
	
	private final CategoryService categoryService;

	@PostMapping
	public ResponseEntity<Category> createCategoryHandler(@RequestBody String category) throws CategoryException{
		return ResponseEntity.status(HttpStatus.CREATED).body(categoryService.addCategory(category));
	}
	
	@PutMapping("/{categoryId}")
	@ResponseStatus(HttpStatus.OK)
	public void updateCategoryHandler(@PathVariable(name = "categoryId") UUID categoryId, @RequestBody String categoryName) throws CategoryException{
		categoryService.updateCategory(categoryId, categoryName);
	}
	
	@DeleteMapping("/{categoryId}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void  deleteCategoryHandler(@PathVariable(name = "categoryId") UUID categoryId) throws CategoryException{
		categoryService.deleteCategory(categoryId);
	}
	
	@GetMapping
	public ResponseEntity<List<CategoryDTO>> findAllCategoriesHandler(){
		return ResponseEntity.ok(categoryService.findAllCategories());
	}
	
	@PutMapping("/{categoryId}/{order}")
	@ResponseStatus(HttpStatus.OK)
	public void updateCategoryOrder(@PathVariable(name = "categoryId") UUID categoryId, @PathVariable("order") Integer orderId) throws CategoryException{
		categoryService.updateCategoryOrder(categoryId, orderId);
	}
}
