package application;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ResourceBundle;

import org.json.JSONArray;
import org.json.JSONObject;

import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.ComboBox;
import javafx.scene.control.TableColumn;
import javafx.scene.control.TableView;
import javafx.scene.control.TextField;
import javafx.scene.control.cell.PropertyValueFactory;
import javafx.scene.image.Image;
import javafx.scene.input.MouseEvent;
import javafx.scene.layout.AnchorPane;
import javafx.stage.Stage;

public class usersController {
	String id;
	
	private static HttpURLConnection con;

    @FXML
    private ResourceBundle resources;

    @FXML
    private URL location;

    @FXML
    private AnchorPane usersPane;

    @FXML
    private TableView<user> tablewwUsers;

    @FXML
    private TableColumn<user, String> clmTc;

    @FXML
    private TableColumn<user, String> clmName;

    @FXML
    private TableColumn<user, String> clmSurname;

    @FXML
    private TableColumn<user, String> clmStatus;

    @FXML
    private TableColumn<user, String> clmPhone;
    
    @FXML
    private TextField searchTxt;

    @FXML
    private Button searchBtn;
    
    @FXML
    private ComboBox<String> cmbStatus;

    @FXML
    private Button refreshBtn;
    
    
    
    
    ////////////////////////////////////      STATUS   COMBO   SELECT  ACTÝON

    @FXML
    void cmbAction(ActionEvent event) {
    	this.id=cmbStatus.getSelectionModel().getSelectedItem();
    	searchTxt.setText("");
    	if(this.id=="Hepsi") {
    		
    		if(tablewwUsers.getItems()!=null) {
    			tablewwUsers.getItems().clear();
        	}
        	
    		tablewwUsers.setItems(parse(GETJSON("all")));
    	}
    	else {

    		if(tablewwUsers.getItems()!=null) {
        		tablewwUsers.getItems().clear();
        	}
        	tablewwUsers.setItems(parse(GETJSON("queryStatus")));
    	}
    }
    
    ////////////////////////////////////      STATUS   COMBO   SELECT  ACTÝON
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    ////////////////////////////////////              ARAMA   BUTON   CLÝCK 

    @FXML
    void searchBtnClk(MouseEvent event) {
    	
    	
    	if(searchTxt.getText().trim()=="" || searchTxt.getText().trim()==" " || searchTxt.getText()==null) {
    		
        	if(tablewwUsers.getItems()!=null) {
        		tablewwUsers.getItems().clear();
        		
        	}
        	cmbStatus.setValue("Hepsi");
        	tablewwUsers.setItems(parse(GETJSON("all")));
        	
    	}
    	else {
    		
        	try {
				System.out.println(java.net.URLEncoder.encode(searchTxt.getText().trim(), "UTF-8").replace("+", "%20"));
				this.id=java.net.URLEncoder.encode(searchTxt.getText().trim(), "UTF-8").replace("+", "%20");
	        	System.out.println("dönnennnn  stringgg"+searchTxt.getText().trim());
			} catch (UnsupportedEncodingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
    		if(tablewwUsers.getItems()!=null) {
        		tablewwUsers.getItems().clear();
        	}
        	tablewwUsers.setItems(parse(GETJSON("queryTcOrName")));

    	}
    }
    
    
    ////////////////////////////////////              ARAMA   BUTON   CLÝCK 
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    //////////////////////////////////////    YENÝLE   BUTON   CLÝCK
    @FXML
    void refreshBtnClk(MouseEvent event) {
    	refresh();
    }
    //////////////////////////////////////    YENÝLE   BUTON   CLÝCK
    
    
    
    
    
    
    
    
    
    
    
    
    
    //////////////////////////////////          REFRESH   FONKSÝYONU
    public void refresh() {
    	searchTxt.setText("");
    	cmbStatus.setValue("Hepsi");
    	tablewwUsers.setItems(parse(GETJSON("all")));
    }
    //////////////////////////////////          REFRESH   FONKSÝYONU
    
    
    
    
    
    
    
    

  



/////////////////////////////////////         GET   JSON 
public String GETJSON (String method) {
	BufferedReader in ;
	String inputLine;
	StringBuffer content = null;
	
	try {
		String surl="https://bisikletimolsun.xyz/api/user/identity";
		URL url = null;
		if(method=="all") {
		url = new URL("https://bisikletimolsun.xyz/api/user/identity");
		}
		else if (method=="queryTc") {
			surl=surl+"/query?tc="+this.id;
			url=new URL(surl);
			System.out.println(surl);
		}
		else if (method=="queryTcOrName") {
			surl=surl+"/query-or?tc="+this.id+"&name="+this.id;
			url=new URL(surl);
			System.out.println(surl);
		}
		else if (method=="queryStatus") {
			surl=surl+"/query?status="+this.id;
			url=new URL(surl);
			System.out.println(surl);
		}
		else if (method=="status-type") {
			surl=surl+"-status-type";
			url=new URL(surl);
			System.out.println(surl);
		}
		else {
			surl =surl+"/"+method;
			url=new URL(surl);
			System.out.println(surl);
		}
		con = (HttpURLConnection) url.openConnection();
		con.setRequestProperty("Content-Type", "application/json");
		
		con.setRequestMethod("GET");
		con.setConnectTimeout(5000);
		con.setReadTimeout(5000);
		int status = con.getResponseCode();
		//System.out.println(status);
		
		if (status > 299) {
			in = new BufferedReader( new InputStreamReader(con.getErrorStream()));
					
					content = new StringBuffer();
					while ((inputLine = in.readLine()) != null) {
					    content.append(inputLine);
					}
					in.close();
		}
		else {
			in = new BufferedReader(new InputStreamReader(con.getInputStream()));
					
					content = new StringBuffer();
					while ((inputLine = in.readLine()) != null) {
					    content.append(inputLine);
					}
					in.close();
		}
		
		
		
		
		
	} catch (MalformedURLException e) {
		
		e.printStackTrace();
	} catch (IOException e) {
		
		e.printStackTrace();
	}
	finally {
		con.disconnect();
	}
	return content.toString();
}
/////////////////////////////////////          GET   JSON  










//////////////////////////////                JSON   LÝSTESÝ  ÇEKME   
public  ObservableList<user>  parse (String responseBody) {
	
	
	System.out.println(responseBody);

	try {
		ObservableList<user> list2=FXCollections.observableArrayList();
    	JSONObject album = new JSONObject(responseBody);
		JSONArray albums=album.getJSONArray("data");
		
    	for (int i=0;i<albums.length();i++) {
    		JSONObject album2 = albums.getJSONObject(i);
    		
    		
    		String tc = album2.getString("tc");
    		String name =album2.getString("name");
    		String surname =album2.getString("surname");
    		
    		String email =String.valueOf(album2.get("email"));
    		
    		String birth =String.valueOf(album2.get("birth"));
    		String phone =album2.getString("phone");
    		String status =album2.getString("status");
    		
    		System.out.println(i);
    		
    		list2.add(new user(tc ,name  ,surname, email ,birth,phone,status)); 
    	}
    	return list2;
	} catch (Exception e) {
		// TODO: handle exception
		return null;
	}
}

//////////////////////////////                JSON   LÝSTESÝ  ÇEKME  















/////////////////////////////    TEKLÝ  BÝSÝKLET JSON  ÇEKME
public  user parse (String responseBody , String i) {
		JSONObject album = new JSONObject(responseBody);
		JSONObject albums=album.getJSONObject("data");
	
		
		String tc = albums.getString("tc");
		String name =albums.getString("name");
		String surname =albums.getString("surname");
		String email =String.valueOf(albums.get("email"));
		String birth =String.valueOf(albums.get("birth"));
		String phone =albums.getString("phone");
		String status =albums.getString("status");
		
		String a = id + " ,,, " + tc + " ,,, " ;
		System.out.println(a);
		user bb=new user(tc ,name  ,surname, email ,birth,phone,status);
	return bb;
}
///////////////////////////////// TEKLÝ  BÝSÝKLET  JSON ÇEKME

















//////////////////////////////            STATUS    JSON   LÝSTESÝ  ÇEKME   
public void status(String responseBody) {
	System.out.println(responseBody);
	

	try {
		
    	JSONObject album = new JSONObject(responseBody);
		JSONArray albums=album.getJSONArray("data");
    	for (int i=0;i<albums.length();i++) {
    		JSONObject album2 = albums.getJSONObject(i);
    		
    		String id =album2.getString("id");
    		System.out.println("sýralamma"+ i);
    		
    		
    		cmbStatus.getItems().add(id);
    
           
    	}
	} catch (Exception e) {
		// TODO: handle exception
		System.out.println("catch e gþrdþþ");
		
	}
}
//////////////////////////////            STATUS    JSON   LÝSTESÝ  ÇEKME 











///////////////////////////////   TABLEVÝEW   VERÝ  SEÇME  -  DETAYLAR  SAYFASI

@FXML
void tableUser_clk(MouseEvent event) {
	user selected=tablewwUsers.getSelectionModel().getSelectedItem();
	String idd=selected.getTc();
	this.id=String.valueOf(idd);
	System.out.println(idd);
	
	try {
		System.out.println("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" +this.id);
  		 FXMLLoader loader=new FXMLLoader(getClass().getResource("detailsUser.fxml"));
  		 AnchorPane pane2=(AnchorPane)loader.load();
  		 detailsUserController nesne2=loader.getController();
  		 nesne2.doldur(this.id);
  		
  		
  		 Scene scene2=new Scene(pane2);
  		
  		
  		 
  		 Stage stage2=new Stage();
  		 stage2.setMinWidth(510);
		 stage2.setMinHeight(400);
		 stage2.setMaxWidth(530);
		 stage2.setMaxHeight(430);
		 
  		 stage2.setScene(scene2);
  		 stage2.setResizable(false);
  		 stage2.setTitle("KULLANICI :  "+this.id);
  		 stage2.getIcons().add(new Image(getClass().getResourceAsStream("/images/detailsBackground.png")));
  		 stage2.showAndWait();
  		 refresh();
  		
		
		} catch(Exception e1) {
			e1.printStackTrace();
		}
}

///////////////////////////////   TABLEVÝEW   VERÝ  SEÇME  -  DETAYLAR  SAYFASI












public void doldur() {
	clmTc.setCellValueFactory(new PropertyValueFactory<>("tc"));
	clmName.setCellValueFactory(new PropertyValueFactory<>("name"));
	clmSurname.setCellValueFactory(new PropertyValueFactory<>("surname"));
	clmStatus.setCellValueFactory(new PropertyValueFactory<>("status"));
	clmPhone.setCellValueFactory(new PropertyValueFactory<>("phone"));
	tablewwUsers.setItems(parse(GETJSON("all")));
	
	status(GETJSON("status-type"));
    cmbStatus.getItems().add("Hepsi");
	}


@FXML
void initialize() {
    assert usersPane != null : "fx:id=\"usersPane\" was not injected: check your FXML file 'users.fxml'.";
    assert tablewwUsers != null : "fx:id=\"tablewwUsers\" was not injected: check your FXML file 'users.fxml'.";
    assert clmTc != null : "fx:id=\"clmTc\" was not injected: check your FXML file 'users.fxml'.";
    assert clmName != null : "fx:id=\"clmName\" was not injected: check your FXML file 'users.fxml'.";
    assert clmSurname != null : "fx:id=\"clmSurname\" was not injected: check your FXML file 'users.fxml'.";
    assert clmStatus != null : "fx:id=\"clmStatus\" was not injected: check your FXML file 'users.fxml'.";
    assert clmPhone != null : "fx:id=\"clmPhone\" was not injected: check your FXML file 'users.fxml'.";
    doldur();
    
    
}
}
