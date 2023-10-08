package main.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import main.dto.CategoryDTO;
import main.entity.Category;
import main.exceptions.CategoryException;
import main.service.CategoryService;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

	
	private CategoryService categoryService;

	public CategoryController(CategoryService categoryService) {
		this.categoryService = categoryService;
	}

	@PostMapping
	public ResponseEntity<Category> createCategoryHandler(@RequestBody String category) throws CategoryException{
		
		return ResponseEntity.status(HttpStatus.OK).body(categoryService.addCategory(category));
	}
	
	@PostMapping("/{categoryId}")
	public ResponseEntity<Boolean> updateCategoryHandler(@PathVariable int categoryId, @RequestBody String categoryName) throws CategoryException{
		
		return ResponseEntity.status(HttpStatus.OK).body(categoryService.updateCategory(categoryId, categoryName));
	}
	
	@DeleteMapping("/{categoryId}")
	public ResponseEntity<Boolean> deleteCategoryHandler(@PathVariable int categoryId) throws CategoryException{
		
		 return ResponseEntity.status(HttpStatus.OK).body(categoryService.deleteCategory(categoryId));
	}
	
	@GetMapping
	public ResponseEntity<List<CategoryDTO>> findAllCategoriesHandler(){
		
		return ResponseEntity.status(HttpStatus.OK).body(categoryService.findAllCategories());
	}
	
	@PostMapping("/{categoryId}/{orderId}")
	public ResponseEntity<Boolean> updateCategoryOrder(@PathVariable int categoryId, @PathVariable int orderId) throws CategoryException{
		
		return ResponseEntity.status(HttpStatus.OK).body(categoryService.updateCategoryOrder(categoryId, orderId));
		
	}
}
