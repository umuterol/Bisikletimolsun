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
import javafx.stage.Stage;

public class detailsController {
	
	String id;
	String price;
	String Status;
	int responseCode;
	
	bicyclesController nesne=new bicyclesController();
	
    @FXML
    private ResourceBundle resources;
    
    @FXML
    private Label errorLbl;

    @FXML
    private Label succesLbl;
    
    @FXML
    private Label yesLbl;

    @FXML
    private Label noLbl;

    @FXML
    private URL location;

    @FXML
    private TextField idTxt;

    @FXML
    private TextField ownerTxt1;

    @FXML
    private TextField priceTxt;

    @FXML
    private TextField updateAtTxt;

    @FXML
    private TextField createAtTxt;
    
    @FXML
    private TextField total_earnTxt;

    @FXML
    private TextField withdrawTxt;

    @FXML
    private TextField user_earnTxt;

    @FXML
    private Button deleteBtn;

    @FXML
    private Button updateBtn;

    @FXML
    private Button saveBtn;

    @FXML
    private ComboBox<String> cmbStatus;
    
    @FXML
    private Button cancelBtn;
    
    
    
    
    
    
    
    
    /////////////////////////////////////////         ÝPTAL  BUTON  CLÝK 

    @FXML
    void cancelBtnClk(MouseEvent event) {
    	priceTxt.setText(this.price);
    	cmbStatus.setValue(this.Status);
    	priceTxt.setDisable(true);
    	cmbStatus.setDisable(true);
    	saveBtn.setVisible(false);
    	updateBtn.setVisible(true);
    	deleteBtn.setVisible(true);
    	cancelBtn.setVisible(false);
    	
    }
    /////////////////////////////////////////         ÝPTAL  BUTON  CLÝK 
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    /////////////////////////////////////////         SÝL  BUTON  CLÝK 

    @FXML
    void deleteBtnClk(MouseEvent event) {
    	
    	yesLbl.setVisible(true);
    	noLbl.setVisible(true);
    	
    	
    }
    /////////////////////////////////////////         SÝL  BUTON  CLÝK 
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
  ////////////////////////////////////////    EVET   LABEL  CLÝK  
    @FXML
    void yesLblClk(MouseEvent event) {
    	
    	yesLbl.setVisible(false);
    	noLbl.setVisible(false);
    	
    	try {
    		String surl="https://bisikletimolsun.xyz/api/bicycle/delete/"+idTxt.getText().trim();
    		URL url = new URL(surl);
        	HttpURLConnection http = (HttpURLConnection)url.openConnection();
        	http.setRequestMethod("DELETE");
        	http.setRequestProperty("Accept", "*/*");
        	http.setRequestProperty("Content-Type", "application/json");

        	System.out.println(http.getResponseCode() + " " + http.getResponseMessage());
        	http.disconnect();
        	Stage stage = (Stage) deleteBtn.getScene().getWindow();
            stage.close();
            
		} catch (Exception e) {
			// TODO: handle exception
		}
    	
    	
    }
    
    
    ////////////////////////////////////////    EVET   LABEL  CLÝK  
    
    ////////////////////////////////////////    HAYIR   LABEL  CLÝK  
    @FXML
    void noLblClik(MouseEvent event) {
    	
    	yesLbl.setVisible(false);
    	noLbl.setVisible(false);

    }
    ////////////////////////////////////////    HAYIR   LABEL  CLÝK  
    
    
    
    
    
    
    
    
    
    
    
    
    
    ////////////////////////////////////////    KAYDET   BUTON  CLÝK  

    @FXML
    void saveBtnClk(MouseEvent event) {
    	try {
    		String surl="https://bisikletimolsun.xyz/api/bicycle/update/" + this.id;
    		URL url = new URL(surl);
        	HttpURLConnection http = (HttpURLConnection)url.openConnection();
        	http.setRequestMethod("PUT");
        	http.setDoOutput(true);
        	http.setRequestProperty("Content-Type", "application/json");

        	String data = "{ \"price\":\""+priceTxt.getText().trim()+"\" , \"status\": \""+cmbStatus.getValue()      +"\" }";

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
    		priceTxt.setDisable(true);
        	cmbStatus.setDisable(true);
        	saveBtn.setVisible(false);
        	updateBtn.setVisible(true);
        	deleteBtn.setVisible(true);
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
    	priceTxt.setDisable(false);
    	cmbStatus.setDisable(false);
    	deleteBtn.setVisible(false);
    	saveBtn.setVisible(true);
    	updateBtn.setVisible(false);
    	cancelBtn.setVisible(true);
    	succesLbl.setVisible(false);
    	errorLbl.setVisible(false);
    	yesLbl.setVisible(false);
    	noLbl.setVisible(false);
    	this.price=priceTxt.getText().trim();
    	this.Status=cmbStatus.getValue();
    	this.id=idTxt.getText().trim();
      
    	
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
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    ///////////////////////////////////////         BÝLGÝLERÝ   DOLDUR   FONKSÝYONU
    
    
    public void doldur(String id) {
    	this.id=id;
    	System.out.println("fonksiyona girdi" + this.id);
    	
    	bicyclesController nesne=new bicyclesController();
        //nesne.parse(nesne.GETJSON(this.id), this.id);
        Byc bicyle=nesne.parse(nesne.GETJSON(this.id), this.id);
        
        String bycId=String.valueOf(bicyle.getId());
        String owner=String.valueOf(bicyle.getUserid());
        Double price=Double.valueOf(bicyle.getPrice());
        String status=String.valueOf(bicyle.getStatus());
        String createAt=String.valueOf(bicyle.getCreatedAt());
        String updateAt=String.valueOf(bicyle.getUpdatedAt());
        Double total_earn=Double.valueOf(bicyle.getTotal_earn());
        Double user_earn=Double.valueOf(bicyle.getUser_earn());
        Double withdraw=Double.valueOf(bicyle.getWithdraw());
        
        idTxt.setText(bycId);
        ownerTxt1.setText(owner);
        priceTxt.setText(String.valueOf(price));
        cmbStatus.setValue(status);
        createAtTxt.setText(createAt);
        updateAtTxt.setText(updateAt);
        total_earnTxt.setText(String.valueOf(total_earn));
        user_earnTxt.setText(String.valueOf(user_earn));
        withdrawTxt.setText(String.valueOf(withdraw));
        
    }
    
    ///////////////////////////////////////         BÝLGÝLERÝ   DOLDUR   FONKSÝYONU
    
    
    
    
    
    
    
    @FXML
    void initialize() {
        assert idTxt != null : "fx:id=\"idTxt\" was not injected: check your FXML file 'details.fxml'.";
        assert ownerTxt1 != null : "fx:id=\"ownerTxt1\" was not injected: check your FXML file 'details.fxml'.";
        assert priceTxt != null : "fx:id=\"priceTxt\" was not injected: check your FXML file 'details.fxml'.";
        assert updateAtTxt != null : "fx:id=\"updateAtTxt\" was not injected: check your FXML file 'details.fxml'.";
        assert createAtTxt != null : "fx:id=\"createAtTxt\" was not injected: check your FXML file 'details.fxml'.";
        assert deleteBtn != null : "fx:id=\"deleteBtn\" was not injected: check your FXML file 'details.fxml'.";
        assert updateBtn != null : "fx:id=\"updateBtn\" was not injected: check your FXML file 'details.fxml'.";
        assert saveBtn != null : "fx:id=\"saveBtn\" was not injected: check your FXML file 'details.fxml'.";
        assert cmbStatus != null : "fx:id=\"cmbStatus\" was not injected: check your FXML file 'details.fxml'.";
        assert total_earnTxt != null : "fx:id=\"total_earnTxt\" was not injected: check your FXML file 'details.fxml'.";
        assert withdrawTxt != null : "fx:id=\"withdrawTxt\" was not injected: check your FXML file 'details.fxml'.";
        assert user_earnTxt != null : "fx:id=\"user_earnTxt\" was not injected: check your FXML file 'details.fxml'.";

        
        status(nesne.GETJSON("status-type"));
        cancelBtn.setVisible(false);
        updateBtn.setVisible(true);
        deleteBtn.setVisible(true);
    	saveBtn.setVisible(false);
    	succesLbl.setVisible(false);
    	errorLbl.setVisible(false);
    	yesLbl.setVisible(false);
    	noLbl.setVisible(false);
    }
}
