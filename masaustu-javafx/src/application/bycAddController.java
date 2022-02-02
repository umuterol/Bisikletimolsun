package application;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.ResourceBundle;

import org.json.JSONArray;
import org.json.JSONObject;

import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;

import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.TableColumn;
import javafx.scene.control.TableView;
import javafx.scene.control.TextField;
import javafx.scene.control.cell.PropertyValueFactory;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.scene.input.MouseEvent;

import javafx.stage.FileChooser;
import javafx.stage.FileChooser.ExtensionFilter;


public class bycAddController {
	int responseCode;
	List<String> fileList;
	String id;
	meeting selected;
	private static HttpURLConnection con;
    @FXML
    private ResourceBundle resources;

    @FXML
    private ImageView bycImg;
    
    @FXML
    private URL location;

    @FXML
    private Button btnFile;
    
    @FXML
    private TextField ownerTxt;

    @FXML
    private TextField priceTxt;

    @FXML
    private Button bycAddBtn;
    

    @FXML
    private Label successLbl;

    @FXML
    private Label errorLbl;
    

    @FXML
    private TableView<meeting> tbwwMeeting;
    
    @FXML
    private TableColumn<String, meeting> clmId;
    
    @FXML
    private TableColumn<String, meeting> clmDate;

    @FXML
    private TableColumn<String, meeting> clmUserId;

    @FXML
    private TableColumn<Image, meeting> clmImg;

    @FXML
    void bycAddBtnClk(MouseEvent event) {
    	 successLbl.setVisible(false);
         errorLbl.setVisible(false);
    	if(ownerTxt.getText().trim()=="" || priceTxt.getText().trim()=="") {
    		errorLbl.setVisible(true);
    		System.out.println();
    	}
    	else {
    		bycCreate();
    	}
    	if(responseCode==200) {
    		ownerTxt.clear();
    		priceTxt.clear();
    		successLbl.setVisible(true);
    	}
    	else {
    		errorLbl.setVisible(true);
    	}
    	tbwwMeeting.setItems(parse(GETJSON("queryStatusWaiting")));
    	
    }
    
    
    
    public void bycCreate() {
    	System.out.println("\"");
    	
    	try {
    		URL url = new URL("https://bisikletimolsun.xyz/api/bicycle/create");
    		HttpURLConnection http = (HttpURLConnection)url.openConnection();
        	http.setRequestMethod("POST");
        	http.setDoOutput(true);
        	http.setRequestProperty("Content-Type", "application/json");
        	http.setRequestProperty("Accept", "application/json");

        	String data = "{ \"owner\":\"" +ownerTxt.getText().trim() +  "\" , \"price\":\""  +priceTxt.getText().trim()+    "\"  ,  \"img\":\" " +this.selected.getImgURLL() +"\"}";
        	System.out.println(data);

        	byte[] out = data.getBytes(StandardCharsets.UTF_8);

        	OutputStream stream = http.getOutputStream();
        	stream.write(out, 0, out.length);

        	System.out.println(http.getResponseCode() + " " + http.getResponseMessage());
        	this.responseCode=Integer.valueOf(http.getResponseCode());
        	
        	http.disconnect();
		} catch (Exception e) {
			// TODO: handle exception
		
		}
    	
    	
    	try {
    		String surl="https://bisikletimolsun.xyz/api/bicycle/meeting/update/" + this.id;
    		URL url = new URL(surl);
        	HttpURLConnection http = (HttpURLConnection)url.openConnection();
        	http.setRequestMethod("PUT");
        	http.setDoOutput(true);
        	http.setRequestProperty("Content-Type", "application/json");

        	String data = "{ \"status\": \"confirmed\" }";

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
    		
    	}
    	else {
    		
    	}
    		
    	
    }

    @FXML
    void fileChooser(ActionEvent event) {
    	
    	    FileChooser fileChooser = new FileChooser();
    	    fileChooser.getExtensionFilters().add(new ExtensionFilter("Ýmage Files", fileList));
    	    File file = fileChooser.showOpenDialog(null);
    	     
    	    if (file != null) {
    	    	System.out.println(file.getAbsolutePath());
    	    	Image i=new Image(file.toURI().toString());
    	    	bycImg.setImage(i);
    	    }
    	
    	
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    /////////////////////////////////////         GET   JSON 
    public String GETJSON (String method) {
    	BufferedReader in ;
    	String inputLine;
    	StringBuffer content = null;
    	
    	try {
    		String surl="https://bisikletimolsun.xyz/api/bicycle/meeting/";
    		URL url = null;
    		if(method=="all") {
			url = new URL("https://bisikletimolsun.xyz/api/bicycle/meeting/");
    		}
    		else if (method=="queryOwnerOrId") {
    			surl=surl+"/query-or?owner="+this.id+"&id="+this.id;
    			url=new URL(surl);
				System.out.println(surl);
    		}
    		else if (method=="queryStatusWaiting") {
    			surl=surl+"query?status=waiting";
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
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    //////////////////////////////            RANDEVU    JSON   LÝSTESÝ  ÇEKME   
    public  ObservableList<meeting>  parse (String responseBody) {
    	
    	System.out.println(responseBody);

    	try {
    		ObservableList<meeting> list2=FXCollections.observableArrayList();
        	JSONObject album = new JSONObject(responseBody);
    		JSONArray albums=album.getJSONArray("data");
        	for (int i=0;i<albums.length();i++) {
        		
        		JSONObject album2 = albums.getJSONObject(i);
        		
        		String userid = album2.getString("tc");
        		String id =String.valueOf(album2.get("id"));
        		Double price =album2.getDouble("price");
        		
        		String imgURL =album2.getString("bicycle_img");
        		String date =String.valueOf(album2.get("createdAt"));
        		
        		ImageView img=new ImageView(new Image(album2.getString("bicycle_img") , 50, 50, false, false));
        		
        		
        		
        		System.out.println(i);
        		
        		list2.add(new meeting(id ,userid ,img , date , price , imgURL));
        	}
        	return list2;
		} catch (Exception e) {
			// TODO: handle exception
			return null;
		}
    	
    	
    	
		
    
    }
    
    //////////////////////////////            RANDEVU    JSON   LÝSTESÝ  ÇEKME  
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    /////////////////////////////    TEKLÝ  RANDEVU JSON  ÇEKME
    public  meeting parse (String responseBody , String i) {
			JSONObject album = new JSONObject(responseBody);
			JSONObject albums=album.getJSONObject("data");
    	
    		
			
    		
    		String userid = albums.getString("tc");
    		String id =String.valueOf(albums.get("id"));
    		Double price =albums.getDouble("price");
    		
    		String imgURL =albums.getString("bicycle_img");
    		String date =String.valueOf(albums.get("createdAt"));
    		ImageView img=new ImageView(new Image(albums.getString("bicycle_img")));
    		
    		String a = id + " ,,, " + userid + " ,,, " ;
    		System.out.println(a);
    		meeting bb=new meeting(id ,userid ,img , date , price ,imgURL);
		return bb;
    }
    ///////////////////////////////// TEKLÝ  RANDEVU  JSON ÇEKME
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    @FXML
    void tbwwClk(MouseEvent event) {
    	this.selected=tbwwMeeting.getSelectionModel().getSelectedItem();
    	String idd=this.selected.getId();
    	this.id=String.valueOf(idd);
    	System.out.println(idd);
    	ownerTxt.setText(this.selected.getUserId());
    	priceTxt.setText(this.selected.getPrice().toString());
    	bycImg.setImage(new Image(this.selected.getImgURLL().toString()));
    
    }
    
    
    
    
    void doldur() {
    	tbwwMeeting.setItems(parse(GETJSON("queryStatusWaiting")));
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
////////////////////////////TABLEVÝEW   SETCELVALUEFACTORY 
public void valueFatory() {
clmId.setCellValueFactory(new PropertyValueFactory<>("id"));
clmUserId.setCellValueFactory(new PropertyValueFactory<>("userId"));
clmImg.setCellValueFactory(new PropertyValueFactory<>("imgURL"));
clmDate.setCellValueFactory(new PropertyValueFactory<>("date"));


doldur();

}
////////////////////////////TABLEVÝEW   SETCELVALUEFACTORY

    @FXML
    void initialize() {
        assert btnFile != null : "fx:id=\"btnFile\" was not injected: check your FXML file 'bycAdd.fxml'.";
        assert tbwwMeeting != null : "fx:id=\"tbwwMeeting\" was not injected: check your FXML file 'bycAdd.fxml'.";
        assert clmId != null : "fx:id=\"clmId\" was not injected: check your FXML file 'bycAdd.fxml'.";
        assert clmDate != null : "fx:id=\"clmDate\" was not injected: check your FXML file 'bycAdd.fxml'.";
        assert clmUserId != null : "fx:id=\"clmUserId\" was not injected: check your FXML file 'bycAdd.fxml'.";
        assert clmImg != null : "fx:id=\"clmImg\" was not injected: check your FXML file 'bycAdd.fxml'.";
        
        successLbl.setVisible(false);
        errorLbl.setVisible(false);
        fileList = new ArrayList<>();
        fileList.add("*.jpg");
        fileList.add("*.jpeg");
        fileList.add("*.png");
        btnFile.setVisible(false);   
        valueFatory();
       
        }
    	
}
