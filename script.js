var textHolder = document.getElementById('text')
var wind = document.getElementById('window')
var photo = document.getElementById('photo')
var text = textHolder.innerHTML
var lines = text.split("<br>");
var words;
var wordsObjects;
let diff;
var visitCount = document.getElementById('visitCount')
var views;
var chars;
var charsAdd;
var lines;
var words;
let mobileDevice = false;
let ref;
let a, b;
let isLoaded = false;


function init(){
  var firebaseConfig = {
    //personal firebase data goes here

  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  database = firebase.database();

  ref = database.ref('Vellum')
  ref.on('value', gotData, errData);

  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    mobileDevice = true;
  }


}




//insert text from database
function gotData(data){

  var items = data.val();
  var keys = Object.keys(items);

  if(!isLoaded){
    textHolder.innerHTML = items[keys[keys.length-1]]
    split();
  }

}


function errData(err){
  console.log(err);
}





function split(){

  const results = Splitting({ target: textHolder});

  chars = Array.from(document.getElementsByClassName("char"));
  wordsObjects = document.getElementsByClassName("word");
  words = Array.from(document.getElementsByClassName("word"));
  lines = document.getElementsByClassName("line");

  for (var i = 0; i < chars.length; i++) {
    if(chars[i].innerHTML == "x"){
      chars[i].classList.add("alpha");
    }
    chars[i].addEventListener('mouseover', function (event) {
      changeLetter(event)
    })
    chars[i].addEventListener('touchstart', function (event) {
      changeLetter(event)
    })
  }

  isLoaded = true;
  split2()

}

function split2(){

  const results2 = Splitting({ target: wind});
  charsAdd = document.getElementsByClassName("char");
  diff = charsAdd.length - chars.length
  for (var i = 0; i < diff; i++) {
    charsAdd[i].addEventListener('mouseover', function (event) {
      changeLetter(event)
    })
    charsAdd[i].addEventListener('touchstart', function (event) {
      changeLetter(event)
    })
  }

}


function saveData(data){

  var result = ref.push(data, dataSent)

  function dataSent(status){
  }
}


window.onload = (event) => {
  init();

};

window.onunload = (event) => {
  saveText();
};




function changeLetter(e){
  e.target.classList.add("alpha");
}


function previewText(){
  let whole_text = ""
  let diff2 = wordsObjects.length - words.length;

  for(var i = diff2; i < wordsObjects.length; i += 1){
    var children = wordsObjects[i].children;
    for (var t = 0; t < children.length; t++) {
      if(children[t].classList.contains("alpha")){
        whole_text = whole_text.concat("x")
      }else{
        whole_text = whole_text.concat(children[t].innerHTML)
      }
    }

    if(
      wordsObjects[i].style.cssText == '--word-index:138;' ||
      wordsObjects[i].style.cssText == "--word-index:198;" ||
      wordsObjects[i].style.cssText == "--word-index:285;"
    ){

      whole_text = whole_text.concat('<br> <br>')
    }else if(
      i == 206 ||
      i == 266 ||
      i == 353
    ){
      whole_text = whole_text.concat('<br> <br>')


    }
    else{
      whole_text = whole_text.concat(" ")
    }
  }
}


function saveText() {
  let whole_text = ""
  let diff2 = wordsObjects.length - words.length;

  for(var i = diff2; i < wordsObjects.length; i += 1){
    var children = wordsObjects[i].children;
    for (var t = 0; t < children.length; t++) {
      if(children[t].classList.contains("alpha")){
        whole_text = whole_text.concat("x")
      }else{
        whole_text = whole_text.concat(children[t].innerHTML)
      }
    }

    if(
      wordsObjects[i].style.cssText == "--word-index:138;" ||
      wordsObjects[i].style.cssText == "--word-index:198;" ||
      wordsObjects[i].style.cssText == "--word-index:285;" ||
      wordsObjects[i].style.cssText == "--word-index:285;"
    ){
      whole_text = whole_text.concat('<br> <br>')
    }else if(
      i == 206 ||
      i == 266 ||
      i == 353
    ){
      whole_text = whole_text.concat('<br> <br>')

    }else{
      whole_text = whole_text.concat(" ")
    }
  }

  if(whole_text != ""){
    saveData(whole_text)
  }
}



function changeImg(){

  a = window.pageYOffset


  if(mobileDevice){
    b = window.innerHeight/4;
  }else{
    b = document.body.scrollHeight - window.innerHeight
  }

  let c = a / b;

  if(c > 0.25 && c < 0.5){
    photo.src = "vellumramme2.jpg"
  }else if(c > 0.5 && c < 0.75){
    photo.src = "vellumramme3.jpg"
  }else if(c > 0.75){
    photo.src = "vellumramme4.jpg"
  }else if(c < 0.25){
    photo.src = "vellumramme.jpg"
  }
}


window.addEventListener('wheel',function(e){
  changeImg();
})

window.addEventListener('touchmove',function(e){
  changeImg();
})


function enter(){
  let loadingDiv = document.getElementById('intro')
  intro.classList.add("remove")

  let sideDiv = document.getElementById('side')
  sideDiv.classList.add("side2")

  let mainDiv= document.getElementById('main')
  mainDiv.classList.add("main2")
}
