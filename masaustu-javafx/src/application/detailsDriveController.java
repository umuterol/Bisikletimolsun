package application;

import java.net.URL;
import java.util.ResourceBundle;
import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.control.TextField;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.scene.input.MouseEvent;

public class detailsDriveController {
	
	String id;
	String location_url;
	String bycId;
	String status;

    @FXML
    private ResourceBundle resources;

    @FXML
    private URL location;

    @FXML
    private TextField idTxt;

    @FXML
    private TextField UserTcTxt;

    @FXML
    private TextField bicycle_idTxt;

    @FXML
    private TextField finish_timeTxt;

    @FXML
    private TextField start_timeTxt;

    @FXML
    private TextField statusTxt;

    @FXML
    private TextField minuteTxt;

    @FXML
    private TextField payTxt;
    
    @FXML
    private Button byc_location;

    @FXML
    private Button back;

    @FXML
    private ImageView location_img;
    
    
    
    
    @FXML
    void locationBtnClk(MouseEvent event) {
        location_img.setVisible(true);
    	back.setVisible(true);
    	byc_location.setVisible(false);
    	
    }
    
    @FXML
    void backBtnClk(MouseEvent event) {
    	location_img.setVisible(false);
    	back.setVisible(false);
    	byc_location.setVisible(true);
    }
    
    
    
    
    
    
    
    
    //////////////////////////////////////////////     DETAYLAR  DOLDUR   FONKSÝYONU   
    public void doldur(String id) {
    	this.id=id;
    	
    	
    	drivesController nesne1=new drivesController();
    	drive drive=nesne1.parse(nesne1.GETJSON(this.id), this.id);
    	
    	String idd=String.valueOf(drive.getId());
    	String tc=String.valueOf(drive.getTc());
    	String bicycle_id=String.valueOf(drive.getBicycle_id());
    	String pay=String.valueOf(drive.getPay());
    	String start_time=String.valueOf(drive.getStart_time());
    	String finish_time=String.valueOf(drive.getFinish_time());
    	String status=String.valueOf(drive.getStatus());
    	String minute=String.valueOf(drive.getMinute());
    	
    	idTxt.setText(idd);
    	UserTcTxt.setText(tc);
    	bicycle_idTxt.setText(bicycle_id);
    	payTxt.setText(pay);
    	start_timeTxt.setText(start_time);
    	finish_timeTxt.setText(finish_time);
    	statusTxt.setText(status);
    	minuteTxt.setText(minute);
    	
    	
    	if(status.equals("notactive")) {
    		byc_location.setVisible(false);
    	}
    	else if(status.equals("active")) {
    		byc_location.setVisible(true);
    	}
    	
    	
    	
    	
    	
    }
    
    
    
    
    
    public void doldur2(String bycId) {
    	this.bycId=bycId;
    	drivesController nesne1=new drivesController();
    	String img=nesne1.location(nesne1.GETJSON("bicyle_loc",bycId));
    	
    	location_img.setImage(new Image(img));
    	
    }
 //////////////////////////////////////////////DETAYLAR  DOLDUR   FONKSÝYONU   

    @FXML
    void initialize() {
        assert idTxt != null : "fx:id=\"idTxt\" was not injected: check your FXML file 'detailsDrive.fxml'.";
        assert UserTcTxt != null : "fx:id=\"UserTcTxt\" was not injected: check your FXML file 'detailsDrive.fxml'.";
        assert bicycle_idTxt != null : "fx:id=\"bicycle_idTxt\" was not injected: check your FXML file 'detailsDrive.fxml'.";
        assert finish_timeTxt != null : "fx:id=\"finish_timeTxt\" was not injected: check your FXML file 'detailsDrive.fxml'.";
        assert start_timeTxt != null : "fx:id=\"start_timeTxt\" was not injected: check your FXML file 'detailsDrive.fxml'.";
        assert statusTxt != null : "fx:id=\"statusTxt\" was not injected: check your FXML file 'detailsDrive.fxml'.";
        assert minuteTxt != null : "fx:id=\"minuteTxt\" was not injected: check your FXML file 'detailsDrive.fxml'.";
        assert payTxt != null : "fx:id=\"payTxt\" was not injected: check your FXML file 'detailsDrive.fxml'.";
        assert byc_location != null : "fx:id=\"byc_location\" was not injected: check your FXML file 'detailsDrive.fxml'.";
        assert back != null : "fx:id=\"back\" was not injected: check your FXML file 'detailsDrive.fxml'.";
        assert location_img != null : "fx:id=\"location_img\" was not injected: check your FXML file 'detailsDrive.fxml'.";
        back.setVisible(false);
        location_img.setVisible(false);
       
        
        

    }
}
