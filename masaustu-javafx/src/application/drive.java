package application;

public class drive {
	int id;
	String tc;
	String bicycle_id;
	Double pay;
	String start_time;
	
	String finish_time;
	String status;
	String minute;
	
	
	public drive(int id,String tc,String bicycle_id,Double pay,String start_time,String finish_time,String status,String minute) {
		this.id=id;
		this.tc=tc;
		this.bicycle_id=bicycle_id;
		this.pay=pay;
		this.start_time=start_time;
		this.finish_time=finish_time;
		this.status=status;
		this.minute=minute;
	}


	public int getId() {
		return id;
	}


	public void setId(int id) {
		this.id = id;
	}


	public String getTc() {
		return tc;
	}


	public void setTc(String tc) {
		this.tc = tc;
	}


	public String getBicycle_id() {
		return bicycle_id;
	}


	public void setBicycle_id(String bicycle_id) {
		this.bicycle_id = bicycle_id;
	}


	public Double getPay() {
		return pay;
	}


	public void setPay(Double pay) {
		this.pay = pay;
	}


	public String getStart_time() {
		return start_time;
	}


	public void setStart_time(String start_time) {
		this.start_time = start_time;
	}


	public String getFinish_time() {
		return finish_time;
	}


	public void setFinish_time(String finish_time) {
		this.finish_time = finish_time;
	}


	public String getStatus() {
		return status;
	}


	public void setStatus(String status) {
		this.status = status;
	}


	public String getMinute() {
		return minute;
	}


	public void setMinute(String minute) {
		this.minute = minute;
	}

}
