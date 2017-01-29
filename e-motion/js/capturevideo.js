function take_snapshot() {
    Webcam.snap(function(data_uri) {
		document.getElementById('results').innerHTML = '<img id="base64image" src="'+data_uri+'"/>';
		SaveSnap();
	});
}

function ShowCam(){
Webcam.set({width: 320,height: 240,image_format: 'jpeg',jpeg_quality: 100});
Webcam.attach('#my_camera');
}

function SaveSnap(){
    var file = document.getElementById("base64image").src.substring(23).replace('','+');
	var img = Base64Binary.decodeArrayBuffer(file);
    var ajax = new XMLHttpRequest();
    ajax.addEventListener("load", function(event) { uploadcomplete(event); }, false);
    ajax.open("POST", "https://api.projectoxford.ai/emotion/v1.0/recognize","image/jpg");
	ajax.setRequestHeader("Content-Type","application/octet-stream");
	//ajax.setRequestHeader("Accept-Encoding","gzip, deflate");
	ajax.setRequestHeader("Accept","text/html,application/xhtml+xml,application/xml");
	ajax.setRequestHeader("Ocp-Apim-Subscription-Key","5a8753340fbc495b8d59347c13910f9d");
	ajax.send(img);
}

function uploadcomplete(event){
	var xmlDoc = event.target.responseXML;
	var maxEmotion;
	var audio;
	var list = xmlDoc.getElementsByTagName("scores");
	console.log(list);
}

window.onload= ShowCam;
