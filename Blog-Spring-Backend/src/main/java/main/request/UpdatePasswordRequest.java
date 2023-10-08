package main.request;

import jakarta.validation.constraints.NotNull;

public class UpdatePasswordRequest {

	@NotNull(message="Required")
	private int userId;
	@NotNull(message="Required")
	private String oldPassword;
	@NotNull(message="Required")
	private String newPassword;
	@NotNull(message="Required")
	private String repeatedNewPassword;
	
	
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public String getOldPassword() {
		return oldPassword;
	}
	public void setOldPassword(String oldPassword) {
		this.oldPassword = oldPassword;
	}
	public String getNewPassword() {
		return newPassword;
	}
	public void setNewPassword(String newPassword) {
		this.newPassword = newPassword;
	}
	public String getRepeatedNewPassword() {
		return repeatedNewPassword;
	}
	public void setRepeatedNewPassword(String repeatedNewPassword) {
		this.repeatedNewPassword = repeatedNewPassword;
	}
	
	
	
}
