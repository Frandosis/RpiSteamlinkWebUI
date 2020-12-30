
var btnvalue = 0;
var socket = io(); //load socket.io-client and connect to the host that serves the page

socket.on('joined', function (data) { 
    updateBtn(data);
});
socket.on('steambtn', function (data) { //get button status from client
    updateBtn(data);
});

function updateBtn(data){
    btnvalue = data;
    var btn = document.getElementById("steambtn"); //change checkbox according to push button on Raspberry Pi
  
    if (btnvalue) btn.innerHTML = "Launched"; else btn.innerHTML = "Launch Steamlink";
  
}

function steamBtnClick(){
    if (btnvalue == 0){ 
        btnvalue = 1;
        socket.emit("steambtn", btnvalue); //send push button status to back to server
    }
}
