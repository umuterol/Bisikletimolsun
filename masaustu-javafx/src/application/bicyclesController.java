package application;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ResourceBundle;

import org.json.JSONArray;
import org.json.JSONObject;

import javafx.beans.value.ChangeListener;
import javafx.beans.value.ObservableValue;
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
import javafx.scene.image.ImageView;
import javafx.scene.input.MouseEvent;
import javafx.scene.layout.AnchorPane;
import javafx.stage.Stage;

public class bicyclesController {
	
	String id;
	 private static HttpURLConnection con;

    @FXML
    private ResourceBundle resources;

    @FXML
    private URL location;

    @FXML
    private AnchorPane anchorBycss;

    @FXML
    private TextField searchTxt;

    @FXML
    private ComboBox<String> cmbStatus;

    @FXML
    private Button searchBtn;

    @FXML
    private TableView<Byc> tableww;
    
    @FXML
    private TableColumn<Byc , String> tbwwId;

    @FXML
    private TableColumn<Byc , String> tbwwOwner;
    

    @FXML
    private TableColumn<Byc, String> tbwwPrice;

    @FXML
    private TableColumn<Byc , String> tbwwStatus;

    @FXML
    private ImageView bycAddÝmg;

    @FXML
    private Button refreshBtn;
    
    
    
    
    
    
    
    
    
    
    
    
    
    /////////////////////////////////////         GET   JSON 
    public String GETJSON (String method) {
    	BufferedReader in ;
    	String inputLine;
    	StringBuffer content = null;
    	
    	try {
    		String surl="https://bisikletimolsun.xyz/api/bicycle";
    		URL url = null;
    		if(method=="all") {
			url = new URL("https://bisikletimolsun.xyz/api/bicycle");
    		}
    		else if (method=="queryOwnerOrId") {
    			surl=surl+"/query-or?owner="+this.id+"&id="+this.id;
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
    		else  {
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
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    //////////////////////////////            BÝSÝKLET    JSON   LÝSTESÝ  ÇEKME   
    public  ObservableList<Byc>  parse (String responseBody) {
    	
    	

    	try {
    		ObservableList<Byc> list2=FXCollections.observableArrayList();
        	JSONObject album = new JSONObject(responseBody);
    		JSONArray albums=album.getJSONArray("data");
        	for (int i=0;i<albums.length();i++) {
        		JSONObject album2 = albums.getJSONObject(i);
        		String userid = album2.getString("owner");
        		String id =album2.getString("id");
        		Double price =album2.getDouble("price");
        		String status =album2.getString("status");
        		String createdAt =album2.getString("createdAt");
        		String updatedAt =album2.getString("updatedAt");
        		Double total_earn=album2.getDouble("total_earn");
        		Double user_earn=album2.getDouble("user_earn");
        		Double withdraw=album2.getDouble("withdraw");
        		
        		System.out.println(i);
        		
        		list2.add(new Byc(id ,userid ,price , status , createdAt ,updatedAt,total_earn,user_earn,withdraw));
        	}
        	return list2;
		} catch (Exception e) {
			// TODO: handle exception
			return null;
		}
    	
    	
    	
		
    
    }
    
    //////////////////////////////            BÝSÝKLET    JSON   LÝSTESÝ  ÇEKME   
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
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
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    /////////////////////////////    TEKLÝ  BÝSÝKLET JSON  ÇEKME
    public  Byc parse (String responseBody , String i) {
			JSONObject album = new JSONObject(responseBody);
			JSONObject albums=album.getJSONObject("data");
    	
    		
			String userid = albums.getString("owner");
    		String id =albums.getString("id");
    		Double price =albums.getDouble("price");
    		String status =albums.getString("status");
    		String createdAt =albums.getString("createdAt");
    		String updatedAt =albums.getString("updatedAt");
    		Double total_earn=albums.getDouble("total_earn");
    		Double user_earn=albums.getDouble("user_earn");
    		Double withdraw=albums.getDouble("withdraw");
    		
    		String a = id + " ,,, " + userid + " ,,, " ;
    		System.out.println(a);
    		Byc bb=new Byc(id ,userid ,price , status , createdAt ,updatedAt,total_earn,user_earn,withdraw);
		return bb;
    }
    ///////////////////////////////// TEKLÝ  BÝSÝKLET  JSON ÇEKME
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    //////////////////////////////////////////          YENÝLE  FONKSÝYONU
    public void refresh() {
    	searchTxt.setText("");
    	cmbStatus.setValue("Hepsi");
    	tableww.setItems(parse(GETJSON("all")));

	}
    //////////////////////////////////////////         YENÝLE   FONKSÝYONU
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
////////////////////////////TABLEVÝEW   SETCELVALUEFACTORY 
public void valueFatory() {
tbwwId.setCellValueFactory(new PropertyValueFactory<>("id"));
tbwwOwner.setCellValueFactory(new PropertyValueFactory<>("userid"));
tbwwPrice.setCellValueFactory(new PropertyValueFactory<>("price"));
tbwwStatus.setCellValueFactory(new PropertyValueFactory<>("status"));


}
////////////////////////////TABLEVÝEW   SETCELVALUEFACTORY

    
    
    
    
    
    
    
    
    
    
    
    

//////////////////////////////////BÝSÝKLET   EKLEE   ÝMAGE  CLÝK  
@FXML
void bycAddPress(MouseEvent event) {



try {
FXMLLoader fxmlLoader = new FXMLLoader();
fxmlLoader.setLocation(getClass().getResource("bycAdd.fxml"));
AnchorPane anchorPane = fxmlLoader.load();

anchorPane.sceneProperty().addListener(new ChangeListener<Scene>() {
@Override
public void changed(ObservableValue<? extends Scene> observable,
Scene oldValue, Scene newValue) {
anchorPane.prefWidthProperty().bind(newValue.widthProperty());
anchorPane.prefHeightProperty().bind(newValue.heightProperty());
}
});



anchorBycss.getChildren().setAll(anchorPane);
} catch (Exception e) {
// TODO: handle exception
}

}

//////////////////////////////////        BÝSÝKLET   EKLEE   ÝMAGE  CLÝK 



















//////////////////////////////STATUS  COMBO SELECT  ACTÝON 
@FXML
void cmbAction(ActionEvent event) {
searchTxt.setText("");

this.id=cmbStatus.getSelectionModel().getSelectedItem();

if(this.id=="Hepsi") {
if(tableww.getItems()!=null) {
tableww.getItems().clear();
}

tableww.setItems(parse(GETJSON("all")));
}
else {

if(tableww.getItems()!=null) {
tableww.getItems().clear();
}
tableww.setItems(parse(GETJSON("queryStatus")));
}


}
//////////////////////////////        STATUS  COMBO SELECT  ACTÝON 

















///////////////////////////    REFRESH   BUTON  CLÝCK   
@FXML
void refreshBtnClk(MouseEvent event) {
	refresh();
}
///////////////////////////    REFRESH   BUTON  CLÝCK 












////////////////////////////////////            ARAMA   BUTONU  CLÝK
@FXML
void searchBtnClk(MouseEvent event) {
	
	
	if(searchTxt.getText().trim()=="" || searchTxt.getText().trim()==" "  || searchTxt.getText()==null) {
		
    	if(tableww.getItems()!=null) {
    		tableww.getItems().clear();
    		
    	}
    	cmbStatus.setValue("Hepsi");
    	tableww.setItems(parse(GETJSON("all")));
    	
	}
	else {
		this.id=searchTxt.getText().trim();
		System.out.println("dönnennnn  stringgg"+searchTxt.getText().trim());
		if(tableww.getItems()!=null) {
    		tableww.getItems().clear();
    	}
    	tableww.setItems(parse(GETJSON("queryOwnerOrId")));

	}
}
////////////////////////////////////            ARAMA   BUTONU  CLÝK

















///////////////////////////////   TABLEVÝEW   VERÝ  SEÇME  -  DETAYLAR  SAYFASI
@FXML
void tableww_clk(MouseEvent event) {
	
	Byc selected=tableww.getSelectionModel().getSelectedItem();
	String idd=selected.getId();
	this.id=String.valueOf(idd);
	System.out.println(idd);
	
	try {
		System.out.println("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" +this.id);
  		 FXMLLoader loader=new FXMLLoader(getClass().getResource("details.fxml"));
  		 AnchorPane pane2=(AnchorPane)loader.load();
  		 detailsController nesne2=loader.getController();
  		nesne2.doldur(this.id);
  		
  		 Scene scene2=new Scene(pane2);
  		
  		
  		 
  		 Stage stage2=new Stage();
  		 stage2.setMinWidth(510);
		 stage2.setMinHeight(400);
		 stage2.setMaxWidth(530);
		 stage2.setMaxHeight(430);
		 
  		 stage2.setScene(scene2);
  		 stage2.setResizable(false);
  		 stage2.setTitle("BÝSÝKLET :  "+this.id);
  		 stage2.getIcons().add(new Image(getClass().getResourceAsStream("/images/detailsBackground.png")));
  		 stage2.showAndWait();
  		 refresh();
  		
		
		} catch(Exception e1) {
			e1.printStackTrace();
		}
}
///////////////////////////////   TABLEVÝEW   VERÝ  SEÇME  -  DETAYLAR  SAYFASI



















    @FXML
    void initialize() {
        assert anchorBycss != null : "fx:id=\"anchorBycs\" was not injected: check your FXML file 'bicycles.fxml'.";
        assert searchTxt != null : "fx:id=\"searchTxt\" was not injected: check your FXML file 'bicycles.fxml'.";
        assert cmbStatus != null : "fx:id=\"cmbStatus\" was not injected: check your FXML file 'bicycles.fxml'.";
        assert searchBtn != null : "fx:id=\"searchBtn\" was not injected: check your FXML file 'bicycles.fxml'.";
        assert tableww != null : "fx:id=\"tableww\" was not injected: check your FXML file 'bicycles.fxml'.";
        assert tbwwId != null : "fx:id=\"tbwwId\" was not injected: check your FXML file 'bicycles.fxml'.";
        assert tbwwOwner != null : "fx:id=\"tbwwOwner\" was not injected: check your FXML file 'bicycles.fxml'.";
        assert tbwwPrice != null : "fx:id=\"tbwwPrice\" was not injected: check your FXML file 'bicycles.fxml'.";
        assert tbwwStatus != null : "fx:id=\"tbwwStatus\" was not injected: check your FXML file 'bicycles.fxml'.";
        assert bycAddÝmg != null : "fx:id=\"bycAddÝmg\" was not injected: check your FXML file 'bicycles.fxml'.";
        assert refreshBtn != null : "fx:id=\"refreshBtn\" was not injected: check your FXML file 'bicycles.fxml'.";
        status(GETJSON("status-type"));
        cmbStatus.getItems().add("Hepsi");
        valueFatory();
        tableww.setItems(parse(GETJSON("all")));
    }
}
