package main.dto;

public class BlogDTO {

	private Integer id;
	private Boolean enabled;
	private String title;
	private Integer important;
	private String categoryName;
	
	
	public BlogDTO(Integer id, Boolean enabled, String title, Integer important, String categoryName) {
		this.id = id;
		this.enabled = enabled;
		this.title = title;
		this.important = important;
		this.categoryName = categoryName;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}


	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Boolean getEnabled() {
		return enabled;
	}

	public void setEnabled(Boolean enabled) {
		this.enabled = enabled;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Integer getImportant() {
		return important;
	}

	public void setImportant(Integer important) {
		this.important = important;
	}
	
	

	
	
}
