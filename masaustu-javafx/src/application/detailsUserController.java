package application;

import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.ResourceBundle;

import org.json.JSONArray;
import org.json.JSONObject;

import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.control.ComboBox;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;
import javafx.scene.input.MouseEvent;

public class detailsUserController {
	
	String id;
	String status;
	int responseCode;
	
	usersController nesne1=new usersController();

    @FXML
    private ResourceBundle resources;

    @FXML
    private URL location;

    @FXML
    private TextField tcTxt;

    @FXML
    private TextField nameTxt;

    @FXML
    private TextField surnameTxt;

    @FXML
    private TextField phoneTxt;

    @FXML
    private TextField mailTxt;

    @FXML
    private TextField birthTxt;

    @FXML
    private ComboBox<String> cmbStatus;

    @FXML
    private Button updateBtn;

    @FXML
    private Button cancelBtn;

    @FXML
    private Button saveBtn;

    @FXML
    private Label succesLbl;

    @FXML
    private Label errorLbl;

    
    
    
    
    
    /////////////////////////////////////////         ÝPTAL  BUTON  CLÝK 
    @FXML
    void cancelBtnClk(MouseEvent event) {
    	cmbStatus.setValue(this.status);
    	cmbStatus.setDisable(true);
    	saveBtn.setVisible(false);
    	updateBtn.setVisible(true);
    	cancelBtn.setVisible(false);
    }
    /////////////////////////////////////////         ÝPTAL  BUTON  CLÝK 
    
    
    
    
    
    
    

    
    
    
    
    ////////////////////////////////////////    KAYDET   BUTON  CLÝK  
    @FXML
    void saveBtnClk(MouseEvent event) {
    	try {
    		String surl="https://bisikletimolsun.xyz/api/user/identity/update/" + this.id;
    		URL url = new URL(surl);
        	HttpURLConnection http = (HttpURLConnection)url.openConnection();
        	http.setRequestMethod("PUT");
        	http.setDoOutput(true);
        	http.setRequestProperty("Content-Type", "application/json");

        	String data = "{ \"status\": \""+cmbStatus.getValue()      +"\" }";

        	byte[] out = data.getBytes(StandardCharsets.UTF_8);

        	OutputStream stream = http.getOutputStream();
        	stream.write(out);

        	System.out.println(http.getResponseCode() + " " + http.getResponseMessage());
        	this.responseCode=http.getResponseCode();
        	http.disconnect();
		} catch (Exception e) {
			// TODO: handle exception
		}
    	
    	if(this.responseCode==200) {
    		
        	cmbStatus.setDisable(true);
        	saveBtn.setVisible(false);
        	updateBtn.setVisible(true);
        	
        	cancelBtn.setVisible(false);
        	succesLbl.setVisible(true);
        	errorLbl.setVisible(false);
    	}
    	else {
    		succesLbl.setVisible(false);
        	errorLbl.setVisible(true);
    	}
    }
    ////////////////////////////////////////    KAYDET   BUTON  CLÝK  
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    ////////////////////////////////////////    GÜNCELLE   BUTON  CLÝK 

    @FXML
    void updateBtnClk(MouseEvent event) {
    	cmbStatus.setDisable(false);
    	saveBtn.setVisible(true);
    	updateBtn.setVisible(false);
    	cancelBtn.setVisible(true);
    	succesLbl.setVisible(false);
    	errorLbl.setVisible(false);
    	this.status=cmbStatus.getValue();
    }
    ////////////////////////////////////////    GÜNCELLE   BUTON  CLÝK 
    
    
    
    
    
    
    
    
    
    
    
    
    
    
///////////////////////////////////////        GET  STATUS   FONKSÝYONU  
public void status(String responseBody) {
System.out.println(responseBody);


try {

JSONObject album = new JSONObject(responseBody);
JSONArray albums=album.getJSONArray("data");
for (int i=0;i<albums.length();i++) {
JSONObject album2 = albums.getJSONObject(i);

String id =album2.getString("id");



cmbStatus.getItems().add(id);


}
} catch (Exception e) {
// TODO: handle exception
System.out.println("catch e gþrdþþ");

}
}
///////////////////////////////////////        GET  STATUS   FONKSÝYONU 
    
    
    
    
    
    
    
    
    
    
    
    
    

    @FXML
    void initialize() {
        assert tcTxt != null : "fx:id=\"tcTxt\" was not injected: check your FXML file 'detailsUser.fxml'.";
        assert nameTxt != null : "fx:id=\"nameTxt\" was not injected: check your FXML file 'detailsUser.fxml'.";
        assert surnameTxt != null : "fx:id=\"surnameTxt\" was not injected: check your FXML file 'detailsUser.fxml'.";
        assert phoneTxt != null : "fx:id=\"phoneTxt\" was not injected: check your FXML file 'detailsUser.fxml'.";
        assert mailTxt != null : "fx:id=\"mailTxt\" was not injected: check your FXML file 'detailsUser.fxml'.";
        assert birthTxt != null : "fx:id=\"birthTxt\" was not injected: check your FXML file 'detailsUser.fxml'.";
        assert cmbStatus != null : "fx:id=\"cmbStatus\" was not injected: check your FXML file 'detailsUser.fxml'.";
        assert updateBtn != null : "fx:id=\"updateBtn\" was not injected: check your FXML file 'detailsUser.fxml'.";
        assert cancelBtn != null : "fx:id=\"cancelBtn\" was not injected: check your FXML file 'detailsUser.fxml'.";
        assert saveBtn != null : "fx:id=\"saveBtn\" was not injected: check your FXML file 'detailsUser.fxml'.";
        assert succesLbl != null : "fx:id=\"succesLbl\" was not injected: check your FXML file 'detailsUser.fxml'.";
        assert errorLbl != null : "fx:id=\"errorLbl\" was not injected: check your FXML file 'detailsUser.fxml'.";
        
        status(nesne1.GETJSON("status-type"));
        cancelBtn.setVisible(false);
        updateBtn.setVisible(true);
        
    	saveBtn.setVisible(false);
    	succesLbl.setVisible(false);
    	errorLbl.setVisible(false);

    }


    
    
    
    
    
    
    
    
    
    
    
    
 //////////////////////////////////////////////     DETAYLAR  DOLDUR   FONKSÝYONU   
    public void doldur(String id) {
    	this.id=id;
    	
    	
    	usersController nesne1=new usersController();
    	user user=nesne1.parse(nesne1.GETJSON(this.id), this.id);
    	
    	String tc=String.valueOf(user.getTc());
    	String name=String.valueOf(user.getName());
    	String surname=String.valueOf(user.getSurname());
    	String email=String.valueOf(user.getEmail());
    	String birth=String.valueOf(user.getBirth());
    	String phone=String.valueOf(user.getPhone());
    	String status=String.valueOf(user.getStatus());
    	
    	tcTxt.setText(tc);
    	nameTxt.setText(name);
    	surnameTxt.setText(surname);
    	mailTxt.setText(email);
    	birthTxt.setText(birth);
    	phoneTxt.setText(phone);
    	cmbStatus.setValue(status);
    	
    	
    }
 //////////////////////////////////////////////DETAYLAR  DOLDUR   FONKSÝYONU   

  
}
