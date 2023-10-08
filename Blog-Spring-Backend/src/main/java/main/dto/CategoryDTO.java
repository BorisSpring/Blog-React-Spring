package main.dto;

public class CategoryDTO {

	private Integer id;
	private String name;
	private Integer order;
	private Long blogsCount;

	public CategoryDTO(Integer id, String name, Integer order, Long blogsCount) {
		super();
		this.id = id;
		this.name = name;
		this.order = order;
		this.blogsCount = blogsCount;
	
	
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getOrder() {
		return order;
	}

	public void setOrder(Integer order) {
		this.order = order;
	}

	public Long getBlogsCount() {
		return blogsCount;
	}

	public void setBlogsCount(Long blogsCount) {
		this.blogsCount = blogsCount;
	}
	
	
	


	
	
}
