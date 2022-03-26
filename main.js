function setup() {
  canvas = createCanvas(210, 210);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier= ml5.imageClassifier("MobileNet",modelloaded);
}
function modelloaded(){
  console.log("modelhasbeenloaded");
}
function draw(){
  image(video,0,0,300,300);
  classifier.classify(video,gotresult);
}
var previousresult="";
function gotresult(error,results){
if(error){
  console.log(error)
}
else{
  if((results[0].confidence>0.5)&&(previousresult!=results[0].label)){
    previousresult=results[0].label;
    var synth=window.speechSynthesis;
    speakdata="object detected is"+previousresult;
    var utterthis=new SpeechSynthesisUtterance(speakdata);
    synth.speak(utterthis);
    document.getElementById("object_name").innerHTML=previousresult;
    document.getElementById("object_accuracy").innerHTML=results[0].confidence.toFixed(3);
  }
}
}