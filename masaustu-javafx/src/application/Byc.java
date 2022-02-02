package application;



public class Byc {
	String id;
	String userid;
	Double price;
	String status;
	String createdAt;
	String updatedAt;
	Double total_earn;
	Double user_earn;
	Double withdraw;
	

    public Byc(String id, String userid ,Double price , String status ,String createAt , String updateAt , Double total_earn , Double user_earn , Double withdraw) {
        this.id = id;
        this.userid = userid;
        this.price=price;
        this.status=status;
        this.createdAt=createAt;
        this.updatedAt=updateAt;
        this.total_earn=total_earn;
        this.user_earn=user_earn;
        this.withdraw=withdraw;
    }

	

	public Double getTotal_earn() {
		return total_earn;
	}



	public void setTotal_earn(Double total_earn) {
		this.total_earn = total_earn;
	}



	public Double getUser_earn() {
		return user_earn;
	}



	public void setUser_earn(Double user_earn) {
		this.user_earn = user_earn;
	}



	public Double getWithdraw() {
		return withdraw;
	}



	public void setWithdraw(Double withdraw) {
		this.withdraw = withdraw;
	}



	public Double getPrice() {
		return price;
	}



	public void setPrice(Double price) {
		this.price = price;
	}



	public String getStatus() {
		return status;
	}



	public void setStatus(String status) {
		this.status = status;
	}



	public String getCreatedAt() {
		return createdAt;
	}



	public void setCreatedAt(String createdAt) {
		this.createdAt = createdAt;
	}



	public String getUpdatedAt() {
		return updatedAt;
	}



	public void setUpdatedAt(String updatedAt) {
		this.updatedAt = updatedAt;
	}



	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getUserid() {
		return userid;
	}

	public void setUserid(String userid) {
		this.userid = userid;
	}
   
}