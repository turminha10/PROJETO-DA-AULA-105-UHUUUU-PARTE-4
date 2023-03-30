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

user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");

function send() {
    msg = document.getElementById("msg").value;
    firebase.databas().ref(room_name).push({
        name:user_name,
        message:msg,
        like:0
    });


    document.getElementById("msg").value = "";
}
function getData() {firebase.database().ref("/"+room_name).on('value', function(snapchot) { document.
getElementById("output").innerHTML = ""; snapchot.forEach(function(childSnapchot) {
    childKey = childSnapchot.key; childData = childSnapchot.val();
    if(childKey != "purpose") {
        firebase_message_id = childKey;
        message_data = childData;
        console.log(firebase_message_id);
        console.log(message_data);
        name = message_data['name'];
        message = message_data['message'];
        like = message_data['like'];
        name_width_tag = "<h4>"+ name + "<img class='user_tick' src='tick.png'></h4>";
        message_width_tag = "<h4 class= 'message_h4'>"+ message + "</h4>";
        like_button = "<button class= 'btn btn-warning' id="+firebase_message_id+" onclick= 'updateLike(this.id)'>";
        span_width_tag = "<span class= 'glyphicon glyphicon-thumbs-up'>Curtidas:   "+ like +"</span></button><hr>";

        row = name_width_tag + message_width_tag + like_button + span_width_tag;
        document.getElementById("output").innerHTML += row;
    }
})
});
}
getData();


function updateLike(message_id)
{
    console.log("clicou no botão curtir - "+ message_id);
    button_id = message_id;
    likes =  document.getElementById(button_id).value;
    update_likes = Number(likes) + 1;
    console.log(update_likes);

    firebase.database().ref(room_name).child(message_id).update({
        like:  update_likes
    });
}

function logout() {
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location.replace("index.html");
  }