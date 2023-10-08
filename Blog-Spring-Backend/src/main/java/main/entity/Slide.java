package main.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name="slide")
public class Slide {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@NotNull(message = "Image required")
	private String image;
	
	@NotNull(message = "Title required")
	private String title;
	
	@NotNull(message = "Button Title required")
	private String buttonTitle;
	
	@NotNull(message = "Button url required")
	private String buttonUrl;

	private boolean enabled;
	
	private Integer orderNumber;
	
	
	public Slide() {

	}


	public int getId() {
		return id;
	}


	public void setId(int id) {
		this.id = id;
	}


	public String getImage() {
		return image;
	}


	public void setImage(String image) {
		this.image = image;
	}


	public String getTitle() {
		return title;
	}


	public void setTitle(String title) {
		this.title = title;
	}


	public String getButtonTitle() {
		return buttonTitle;
	}


	public void setButtonTitle(String buttonTitle) {
		this.buttonTitle = buttonTitle;
	}


	public String getButtonUrl() {
		return buttonUrl;
	}


	public void setButtonUrl(String buttonUrl) {
		this.buttonUrl = buttonUrl;
	}


	public boolean isEnabled() {
		return enabled;
	}


	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}


	public Integer getOrderNumber() {
		return orderNumber;
	}


	public void setOrderNumber(Integer orderNumber) {
		this.orderNumber = orderNumber;
	}


	
	
	
	
}
