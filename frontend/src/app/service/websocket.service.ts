import { Injectable } from '@angular/core';
import { Client, Message } from '@stomp/stompjs';
import { BehaviorSubject } from 'rxjs';
import SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  /**
   * <STOMP client> est un outil ou une bibliothèque qui permet à un client
   * (comme une application web ou mobile) de communiquer avec un serveur WebSocket
   * en utilisant le protocole STOMP
   * 
   * STOMP = Simple Text Oriented Messaging Protocol
   * C'est un protocole qui permet de structurer les messages échangés via WebSocket,
   * un peu comme HTTP structure les requêtes web
   */

  stompClient : Client | null = null; // this instance to handle WebSocket connection


  // Gérer le stream des messages entrants
  private messageSubject = new BehaviorSubject<any>(null);
  public messages$=this.messageSubject.asObservable(); // C'est un observable pour que les composants subscribe to messages

  // Subject to track the connection status (connected:disconnected)
  private connectionSubject = new BehaviorSubject<boolean>(false);
  public connectionStatus$=this.connectionSubject.asObservable(); // This is un observable for components to track connection status



 /**
  *  La fonction suivante va connecter l'utilisateur au chat en temp réel
  *  -> Créer la connexion WebSocket avec SockJS
  *  -> Configurer le client STOMP 
  *  (Quand la connexion résussit)
  *     -> écouter les messages sur /topic/public
  *     -> notifier que le reste du code que la connexion est établie
  *  -> gérer les erreurs du serveur STOMP
  *  -> activer la connexion
  */
  connect(username:string){

    /**
     * On va créer une connexion WebSocket (ou une simulation de WebSocket)
     * entre le navigateur (le client) et le serveur Spring Boot qui écoute à
     * l'adresse : http://localhost:8080/ws
     */
    const socket = new SockJS('http://localhost:8080/ws');

    /**
     * On prépare le client STOMP à se connecter et à gére les
     * messages WebSocket proprement
     */
    this.stompClient = new Client({
      webSocketFactory : ()=> socket, // utiliser la connexion SockJS pour communiquer
      reconnectDelay : 5000, // Se reconnecter automatiquement après 5 secondes en cas de coupure
      debug : (str)=>console.log(str) // afficher les messages de débogage dans la console
    });


    // En cas de connexion réussie
    this.stompClient.onConnect = (frame) => {
      console.log('connexion réussie à WebSocket server');
      this.connectionSubject.next(true); // notifier que la connexion est réussie

      /**
       * On va maintenant écouter les messages envoyés sur /topic/public,
       * et à chaque message reçu, elle le convertit en objet (JSON.parse)
       * puis le transmet à d'autres parties du code via messageSubject
       */
      // subscribe to the '/topic/public' topic to receive public messages
      this.stompClient?.subscribe('/topic/public',(message:Message)=>{
        this.messageSubject.next(JSON.parse(message.body)); // pass the message to subscribers
      });
    };

    
    //  Gérer les erreurs signalés par STOMP
    this.stompClient.onStompError = (frame) =>{
      console.error('Broker reported error : '+frame.headers['message']); // Log the error message
      console.error('Additional details : '+frame.body); // Log additional error details
    };

    /* démarrer la connxion STOMP avec le serveur pour pouvoir
    envoyer et recevoir des messages
    */

    this.stompClient?.activate();
  }





/**
 * La fonction suivante envoie un message de chat (de type CHAT)
 * au serveur via WebSocket, Si la connexion est active.
 * Sinon, elle affiche une erreur.
 */
  sendMessage(username:string, content:string){
    if(this.stompClient && this.stompClient.connected){

      // create a chat message object (on l'a créé aussi dans spring boot)
      const chatMessage={sender:username, content:content, type:'CHAT'};

      // Afficher l'expéditeur avec son message
      console.log(`Message envoyé par ${username} est ${content}`);

      // Publish (send) the message to the '/app/chat.sendMessage' destination
      this.stompClient.publish({
        destination:'/app/chat.sendMessage',
        body: JSON.stringify(chatMessage) // Convert the message to JSON and send
      });

    }else{
      console.error('WebSocket n\'est pas connecté. Unable to send message ');
    }
  }






  disconnect(){
    if(this.stompClient){
      this.stompClient.deactivate(); // deactivate the WebSocket connection
    }
  }


 
}
