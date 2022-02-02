package application;

import java.net.URL;

import java.util.ResourceBundle;



import javafx.beans.value.ChangeListener;
import javafx.beans.value.ObservableValue;

import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.ComboBox;

import javafx.scene.control.Pagination;

import javafx.scene.control.TableColumn;
import javafx.scene.control.TableView;
import javafx.scene.control.TextField;

import javafx.scene.image.ImageView;
import javafx.scene.input.MouseEvent;
import javafx.scene.layout.AnchorPane;






public class mainController {
	
	String id;

	
	 @FXML
	    private AnchorPane anchorMain;
	
	 @FXML
    private ComboBox<String> cmbStatus;
	 
	@FXML
    private AnchorPane anchorBycs;
	
    @FXML
    private ResourceBundle resources;

    @FXML
    private URL location;

    @FXML
    private Button btn3;

    @FXML
    private Button btn2;
    
    @FXML
    private Button drivesBtn;
    
    @FXML
    private ImageView bycAdd›mg;
    
    @FXML
   	private TextField searchTxt;

   	 @FXML
        private Button searchBtn;
   	 
   	@FXML
    private Button refreshBtn;

   
   	 
    @FXML
    private Pagination pagg;
    
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
   
   
    

    
    
    
    
    
    
    
    
    
    
///////////////////////////////////////     HOME    PAGE   BUTON    
    @FXML
    void clkk2(MouseEvent event) {
    	
    		
    	
		

    	try {
      		 FXMLLoader fxmlLoader = new FXMLLoader();
      	     fxmlLoader.setLocation(getClass().getResource("bicycles.fxml"));
      	     AnchorPane anchorPane = fxmlLoader.load();
      	     
      	  anchorPane.sceneProperty().addListener(new ChangeListener<Scene>() {
             @Override
             public void changed(ObservableValue<? extends Scene> observable,
                     Scene oldValue, Scene newValue) {
                 anchorPane.prefWidthProperty().bind(newValue.widthProperty());
                 anchorPane.prefHeightProperty().bind(newValue.heightProperty());
             }
         });

      	    
      	     
      	     anchorBycs.getChildren().setAll(anchorPane);
      	} catch (Exception e) {
      		// TODO: handle exception
      	}
 	
    }
///////////////////////////////////////     HOME    PAGE   BUTON 
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
 ////////////////////////////////////////////     S‹R‹ﬁLER  SAYFASI  CL›K   
    @FXML
    void drivesBtnClk(MouseEvent event) {
    	try {
     		 FXMLLoader fxmlLoader = new FXMLLoader();
     	     fxmlLoader.setLocation(getClass().getResource("drives.fxml"));
     	     AnchorPane anchorPane = fxmlLoader.load();
     	     
     	  anchorPane.sceneProperty().addListener(new ChangeListener<Scene>() {
            @Override
            public void changed(ObservableValue<? extends Scene> observable,
                    Scene oldValue, Scene newValue) {
                anchorPane.prefWidthProperty().bind(newValue.widthProperty());
                anchorPane.prefHeightProperty().bind(newValue.heightProperty());
            }
        });

     	    
     	     
     	     anchorBycs.getChildren().setAll(anchorPane);
     	} catch (Exception e) {
     		// TODO: handle exception
     	}
    }
    
    ////////////////////////////////////////////     S‹R‹ﬁLER  SAYFASI  CL›K       
    
    

    
    
    
    
    
    
    
    
    
    
    
    
    
    

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    

    
    
    
    
    
    
    
    
    
    
    
    

    
    
    
    
    
    
    

    
    
    
    
    
    
    
    
    
    
    
    
    
    

    



////////////////////////////////////////////   KULLANICILAR  SAYFASI  BUTON  CL›K
    @FXML
    void clkk(MouseEvent event) {
    	
    	
    	
    	try {
      		 FXMLLoader fxmlLoader = new FXMLLoader();
      	     fxmlLoader.setLocation(getClass().getResource("users.fxml"));
      	     AnchorPane anchorPane = fxmlLoader.load();
      	     
      	  anchorPane.sceneProperty().addListener(new ChangeListener<Scene>() {
             @Override
             public void changed(ObservableValue<? extends Scene> observable,
                     Scene oldValue, Scene newValue) {
                 anchorPane.prefWidthProperty().bind(newValue.widthProperty());
                 anchorPane.prefHeightProperty().bind(newValue.heightProperty());
             }
         });

      	    
      	     
      	     anchorBycs.getChildren().setAll(anchorPane);
      	} catch (Exception e) {
      		// TODO: handle exception
      	}
    	
         		
}
    	
////////////////////////////////////////////KULLANICILAR  SAYFASI  BUTON  CL›K
    
   
  
    
    
    
    
    
    
    
    
    
    
    

    
    

    @FXML
    void initialize() {
        assert btn3 != null : "fx:id=\"btn3\" was not injected: check your FXML file 'login.fxml'.";
       
        assert tbwwId != null : "fx:id=\"tbwwId\" was not injected: check your FXML file 'main.fxml'.";
        assert tbwwOwner != null : "fx:id=\"tbwwOwner\" was not injected: check your FXML file 'main.fxml'.";
        assert tbwwPrice != null : "fx:id=\"tbwwPrice\" was not injected: check your FXML file 'main.fxml'.";
        assert tbwwStatus != null : "fx:id=\"tbwwStatus\" was not injected: check your FXML file 'main.fxml'.";
        assert anchorBycs != null : "fx:id=\"anchorBycs\" was not injected: check your FXML file 'main.fxml'.";
        clkk2(null);
       
    }
}
