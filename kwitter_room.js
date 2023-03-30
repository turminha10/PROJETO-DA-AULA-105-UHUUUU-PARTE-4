const firebaseConfig = {
    apiKey: "AIzaSyDFhOvS8EFONtzvQisjMM4BmU4yKV6doZY",
    authDomain: "kwitter-ea12c.firebaseapp.com",
    databaseURL: "https://kwitter-ea12c-default-rtdb.firebaseio.com",
    projectId: "kwitter-ea12c",
    storageBucket: "kwitter-ea12c.appspot.com",
    messagingSenderId: "965946376078",
    appId: "1:965946376078:web:51355b7f51b424b1eceedf",
    measurementId: "G-Q5SF5MNBYW"
  };
  
firebase.initializeApp(firebaseConfig);

user_name = localStorage.get_item("user_name")

document.getElementById("user_name").innerHTML = "Bem vindo(a) ," + user_name + "!";

function addRoom( ){
    room_name = document.getElementById("room_name").value;

    firebase.database().ref("/").child(room_name).updte({
    });

    localStorage.setItem("room_name" , room_name);

    window.location = "kwitter_page.html"
}

function getData () {
    firebase.database().ref("/").on('value' , function(snapshot) {document.getElementById("output").innerHTML = "";
   snapshot.forEach(function(childsnapshot)  { childKey = childsnapshot.key;
      room_names = childKey;
      console.log("nome da sala:" + room_names);
      row = "<div class = 'room_name' id="+room_names+"onclick='rediectToRoomName(this.id) ' >#"+room_names+"</div><hr>";
      document.getElementById("output").innerHTML += row;
});
});
}

get_data();


function rediectToRoomName (name) {
   console.log(name);
   localStorage.setItem("room_name", name);
     window.location = "kwitter_page.html";
}

function logout() {
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name")
  window.location = "index.html";
}