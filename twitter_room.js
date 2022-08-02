const firebaseConfig = {
  apiKey: "AIzaSyAY3EPbRX8yyOagETd2Uw3g5PbWcaMckVw",
  authDomain: "twitter-6e6d3.firebaseapp.com",
  databaseURL: "https://twitter-6e6d3-default-rtdb.firebaseio.com",
  projectId: "twitter-6e6d3",
  storageBucket: "twitter-6e6d3.appspot.com",
  messagingSenderId: "876009106598",
  appId: "1:876009106598:web:9b739e640d1444d1225867"
  };
  

  firebase.initializeApp(firebaseConfig);
username = localStorage.getItem('username');
room_name = localStorage.getItem('room_name');
document.getElementById('user_name').innerHTML = 'Hola '+ username + '!';

function addRoom() {
  room_name = document.getElementById("room_name").value;

  firebase.database().ref("/").child(room_name).update({
    purpose: "adding room name"
  });

  localStorage.setItem("room_name", room_name);
  window.location.replace("twitter_page.html");

}

function getData() {
  firebase.database().ref("/" + room_name).on('value', function (snapshot) {
    document.getElementById("output").innerHTML = "";
    snapshot.forEach(function (childSnapshot) {
      childKey = childSnapshot.key;
      childData = childSnapshot.val();
      if (childKey != "purpose") {
        firebase_message_id = childKey;
        message_data = childData;
        
        console.log(firebase_message_id);
        console.log(message_data);
        name = message_data['name'];
        message = message_data['message'];
        like = message_data['like'];
        name_with_tag = "<h4> " + name + "<img class='user_tick' src='tick.png'></h4>";
        message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
        like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick='updateLike(this.id)'>";
        span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button><hr>";

        row = name_with_tag + message_with_tag + like_button + span_with_tag;
        document.getElementById("output").innerHTML += row;
      }
    });
  });
}
getData();


function logout() {
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location.replace("index.html");
}


function redirectToRoomName(name) {
 
  localStorage.setItem("room_name", name);
  window.location = "twitter_page.html";
  console.log(name);
}