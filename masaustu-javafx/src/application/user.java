package application;

public class user {
	String tc;
	String name;
	String surname;
	String email;
	String birth;
	String phone;
	String status;

	public user(String tc,String name,String surname,String email,String birth , String phone ,String status) {
		this.tc=tc;
		this.name=name;
		this.surname=surname;
		this.email=email;
		this.birth=birth;
		this.phone=phone;
		this.status=status;
	}

	public String getTc() {
		return tc;
	}

	public void setTc(String tc) {
		this.tc = tc;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getBirth() {
		return birth;
	}

	public void setBirth(String birth) {
		this.birth = birth;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
}
