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

public class drivesController {
	
	String id;
	String bycid;
	
	private static HttpURLConnection con;

    @FXML
    private ResourceBundle resources;

    @FXML
    private URL location;

    @FXML
    private TableView<drive> tablewwDrives;

    @FXML
    private TableColumn<drive, String> clmId;

    @FXML
    private TableColumn<drive, String> clmUser;

    @FXML
    private TableColumn<drive, String> clmBicycleId;

    @FXML
    private TableColumn<drive, String> clmStatus;

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
    		
    		if(tablewwDrives.getItems()!=null) {
    			tablewwDrives.getItems().clear();
        	}
        	
    		tablewwDrives.setItems(parse(GETJSON("all")));
    	}
    	else {

    		if(tablewwDrives.getItems()!=null) {
    			tablewwDrives.getItems().clear();
        	}
    		tablewwDrives.setItems(parse(GETJSON("queryStatus")));
    	}
    }
    
    ////////////////////////////////////      STATUS   COMBO   SELECT  ACTÝON
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    //////////////////////////////////////    YENÝLE   BUTON   CLÝCK
    @FXML
    void refreshBtnClk(MouseEvent event) {
    	refresh();
    }
    //////////////////////////////////////    YENÝLE   BUTON   CLÝCK
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    ////////////////////////////////////              ARAMA   BUTON   CLÝCK 
    @FXML
    void searchBtnClk(MouseEvent event) {
    	
    	
    	if(searchTxt.getText().trim()=="" || searchTxt.getText().trim()==" " || searchTxt.getText()==null) {
    		
        	if(tablewwDrives.getItems()!=null) {
        		tablewwDrives.getItems().clear();
        		
        	}
        	cmbStatus.setValue("Hepsi");
        	tablewwDrives.setItems(parse(GETJSON("all")));
        	
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
    		if(tablewwDrives.getItems()!=null) {
    			tablewwDrives.getItems().clear();
        	}
        	tablewwDrives.setItems(parse(GETJSON("queryIdOrTcOrBicycle_id")));

    	}

    }
    ////////////////////////////////////              ARAMA   BUTON   CLÝCK 
    
    
    
    
    
    
    
    
    
    
    
    
    
    
///////////////////////////////   TABLEVÝEW   VERÝ  SEÇME  -  DETAYLAR  SAYFASI
    @FXML
    void tableUser_clk(MouseEvent event) {
    	drive selected=tablewwDrives.getSelectionModel().getSelectedItem();
    	int idd=selected.getId();
    	this.id=String.valueOf(idd);
    	this.bycid=selected.getBicycle_id();
    	System.out.println(idd);
    	
    	try {
    		System.out.println("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" +this.id);
      		 FXMLLoader loader=new FXMLLoader(getClass().getResource("detailsDrive.fxml"));
      		 AnchorPane pane2=(AnchorPane)loader.load();
      		 detailsDriveController nesne2=loader.getController();
      		 nesne2.doldur(this.id);
      		 nesne2.doldur2(this.bycid);
      		
      		
      		 Scene scene2=new Scene(pane2);
      		
      		
      		 
      		 Stage stage2=new Stage();
      		 stage2.setMinWidth(510);
    		 stage2.setMinHeight(400);
    		 stage2.setMaxWidth(530);
    		 stage2.setMaxHeight(430);
    		 
      		 stage2.setScene(scene2);
      		 stage2.setResizable(false);
      		 stage2.setTitle("SÜRÜÞ :  "+this.id);
      		 stage2.getIcons().add(new Image(getClass().getResourceAsStream("/images/detailsBackground.png")));
      		 stage2.showAndWait();
      		 refresh();
      		
    		
    		} catch(Exception e1) {
    			e1.printStackTrace();
    		}
    }
    
///////////////////////////////   TABLEVÝEW   VERÝ  SEÇME  -  DETAYLAR  SAYFASI 
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    //////////////////////////////////          REFRESH   FONKSÝYONU
    public void refresh() {
    	searchTxt.setText("");
    	cmbStatus.setValue("Hepsi");
    	tablewwDrives.setItems(parse(GETJSON("all")));
    }
    //////////////////////////////////          REFRESH   FONKSÝYONU
    
    
    
    
    
    
    
    
    
    
    
    
    
/////////////////////////////////////         GET   JSON 
public String GETJSON (String method) {
BufferedReader in ;
String inputLine;
StringBuffer content = null;

try {
String surl="https://bisikletimolsun.xyz/api/drive";
URL url = null;
if(method=="all") {
url = new URL("https://bisikletimolsun.xyz/api/drive");
}
else if (method=="queryTc") {
surl=surl+"/query?tc="+this.id;
url=new URL(surl);
System.out.println(surl);
}
else if (method=="queryIdOrTcOrBicycle_id") {
surl=surl+"/query-or?id="+this.id+"&tc="+this.id+"&bicycle_id="+this.id;
url=new URL(surl);
System.out.println(surl);
}
else if (method=="queryStatus") {
surl=surl+"/query?status="+this.id;
url=new URL(surl);
System.out.println(surl);
}
else if (method=="status-type") {
surl=surl+"/status-type";
url=new URL(surl);
System.out.println(surl);
}
else if (method=="bicyle_loc") {
	
	surl="https://bisikletimolsun.xyz/api/bicycle/coords/"+this.bycid;
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









/////////////////////////////////////         GET   JSON 
public String GETJSON (String method , String byc) {
BufferedReader in ;
String inputLine;
StringBuffer content = null;

try {
	String surl;
	URL url = null;
	if(method=="bicyle_loc") {
	surl="https://bisikletimolsun.xyz/api/bicycle/coords/"+byc;
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










public String location (String responseBody) {
	
	try {
		JSONObject album = new JSONObject(responseBody);
		JSONObject albums=album.getJSONObject("data");
		
		String location=albums.getString("lat")+","+albums.getString("lng");
		System.out.println(location);
		String img="https://maps.googleapis.com/maps/api/staticmap?center="+location+"&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C"+location+"&key=AIzaSyAtuGsaesvaujVDFIm8D41nkxXJrKkSrPk";
		return img;
	} catch (Exception e) {
		return null;
	}
	
}








    
    
    



//////////////////////////////JSON   LÝSTESÝ  ÇEKME   
public  ObservableList<drive>  parse (String responseBody) {




try {
ObservableList<drive> list2=FXCollections.observableArrayList();
JSONObject album = new JSONObject(responseBody);
JSONArray albums=album.getJSONArray("data");
for (int i=0;i<albums.length();i++) {
JSONObject album2 = albums.getJSONObject(i);

int id= album2.getInt("id");
String tc = album2.getString("tc");
String bicycle_id =album2.getString("bicycle_id");
Double pay =album2.getDouble("pay");
String start_time =album2.getString("start_time");
String status =album2.getString("status");
String finish_time;
if(status=="notactive") {
	finish_time=album2.getString("finish_time");
	
}
else {
	finish_time ="-";
}


String minute =album2.getString("minute");

System.out.println(i);

list2.add(new drive(id ,tc  ,bicycle_id, pay ,start_time,finish_time,status,minute));
}
return list2;
} catch (Exception e) {
	
// TODO: handle exception
return null;
}
}

//////////////////////////////JSON   LÝSTESÝ  ÇEKME 













/////////////////////////////    TEKLÝ  BÝSÝKLET JSON  ÇEKME
public  drive parse (String responseBody , String i) {
JSONObject album = new JSONObject(responseBody);
JSONObject albums=album.getJSONObject("data");


int id= albums.getInt("id");
String tc = albums.getString("tc");
String bicycle_id =albums.getString("bicycle_id");
Double pay =albums.getDouble("pay");
String start_time =albums.getString("start_time");
String status =albums.getString("status");
String finish_time;
if(status.equals("notactive")) {
	finish_time=albums.getString("finish_time");
	
}
else {
	finish_time ="-";
}


String minute =String.valueOf(albums.getInt("minute"));

String a = id + " ,,, " + tc + " ,,, " ;
System.out.println(a);
drive bb=new drive(id ,tc  ,bicycle_id, pay ,start_time,finish_time,status,minute);
return bb;
}
///////////////////////////////// TEKLÝ  BÝSÝKLET  JSON ÇEKME












//////////////////////////////STATUS    JSON   LÝSTESÝ  ÇEKME   
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
//////////////////////////////STATUS    JSON   LÝSTESÝ  ÇEKME 



    
    
    
    
    
    
    
    
    
    
    
    
    public void doldur() {
    	clmId.setCellValueFactory(new PropertyValueFactory<>("id"));
    	clmUser.setCellValueFactory(new PropertyValueFactory<>("tc"));
    	clmBicycleId.setCellValueFactory(new PropertyValueFactory<>("bicycle_id"));
    	clmStatus.setCellValueFactory(new PropertyValueFactory<>("status"));
    	
    	tablewwDrives.setItems(parse(GETJSON("all")));
    	status(GETJSON("status-type"));
        cmbStatus.getItems().add("Hepsi");
    	}

    @FXML
    void initialize() {
        assert tablewwDrives != null : "fx:id=\"tablewwUsers\" was not injected: check your FXML file 'drives.fxml'.";
        assert clmId != null : "fx:id=\"clmId\" was not injected: check your FXML file 'drives.fxml'.";
        assert clmUser != null : "fx:id=\"clmUser\" was not injected: check your FXML file 'drives.fxml'.";
        assert clmBicycleId != null : "fx:id=\"clmBicycleId\" was not injected: check your FXML file 'drives.fxml'.";
        assert clmStatus != null : "fx:id=\"clmStatus\" was not injected: check your FXML file 'drives.fxml'.";
        assert searchTxt != null : "fx:id=\"searchTxt\" was not injected: check your FXML file 'drives.fxml'.";
        assert searchBtn != null : "fx:id=\"searchBtn\" was not injected: check your FXML file 'drives.fxml'.";
        assert cmbStatus != null : "fx:id=\"cmbStatus\" was not injected: check your FXML file 'drives.fxml'.";
        assert refreshBtn != null : "fx:id=\"refreshBtn\" was not injected: check your FXML file 'drives.fxml'.";
        doldur();

    }
}
