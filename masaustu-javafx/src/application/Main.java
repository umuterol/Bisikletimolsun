package application;
	
import javafx.application.Application;
import javafx.application.Platform;
import javafx.stage.Stage;
import javafx.scene.Scene;
import javafx.scene.image.Image;
import javafx.scene.layout.AnchorPane;
import javafx.fxml.FXMLLoader;


public class Main extends Application {
	@Override
	public void start(Stage primaryStage) {
		try {
			
			
			AnchorPane root = (AnchorPane)FXMLLoader.load(getClass().getResource("main.fxml"));
			Scene scene = new Scene(root);
			scene.getStylesheets().add(getClass().getResource("/css/application.css").toExternalForm());
			
			primaryStage.setMinWidth(1185);
			primaryStage.setMinHeight(635);
			primaryStage.setScene(scene);
			primaryStage.setOnHidden(e -> Platform.exit());
			
			primaryStage.setTitle("BÝSÝKLETÝMOLSUN");
			primaryStage.getIcons().add(new Image(getClass().getResourceAsStream("/images/bisikletimolsun2.png")));
			
			primaryStage.show();
		} catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	public static void main(String[] args) {
		launch(args);
	}
}
