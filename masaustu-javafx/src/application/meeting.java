package application;

import javafx.scene.image.Image;
import javafx.scene.image.ImageView;

public class meeting {
	String id;
	String userId;
	ImageView imgURL;
	String imgURLL;
	String date;
	Double price;

	public meeting(String id,String userId,ImageView imgURL,String date,Double price , String imgURLL) {
		this.id=id;
		this.userId=userId;
		this.imgURL=imgURL;
		this.date=date;
		this.price=price;
		this.imgURLL=imgURLL;
		
	}

	public String getImgURLL() {
		return imgURLL;
	}

	public void setImgURLL(String imgURLL) {
		this.imgURLL = imgURLL;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public ImageView getImgURL() {
		return imgURL;
	}

	public void setImgURL(ImageView imgURL) {
		this.imgURL = imgURL;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}
	
}
