'use strict';

var imageView = document.getElementById('image-selection');
var scores = document.getElementById('scores');
console.log(imageView);
var images = [];
var clickTries = 25;
var imagesPrev;
//********************************************** */
///////////////FUNCTIONS/////////////////////////
/////////////////////////////////////////////////
function randomImage(){
  var mythree = [];
  var numEq = false;
  var randNum = Math.floor(Math.random() * (19 - 0 + 1));
  mythree.push(randNum);
  while(mythree.length < 3){
    randNum = Math.floor(Math.random() * (19 - 0 + 1));
    for(let i = 0; i < mythree.length; i++){
      if(mythree[i] === randNum){
        console.log(mythree[i] + ' equals ' + randNum);
        numEq = true;
        break;
      }
    }
    if(!numEq){
      mythree.push(randNum);
    }
    numEq = false;
  }


  console.log(mythree);
  return mythree;
}
/////////////////////////////////////////////////
function checkFromPrev(currImages){
  for(let i = 0;i < currImages.length; i++){
    if(clickTries === 25){
      break;
    }
    if(currImages[i] === imagesPrev[0] ||
            currImages[i] === imagesPrev[1] ||
            currImages[i] === imagesPrev[2]){
      return false;
    }
  }

  return true;//they are unique from previous
}
/////////////////////////////////////////////////
function addClicksOnImage(id){
  var found = false;
  var i = 0;
  while(!found){
    if(id === images[i].id){
      images[i].clicks++;
      console.log(images[i].id + ' : ' + images[i].clicks + ' clicks.');
      found = true;
    }
    i++;
  }
}


/////////////////////////////////////////////////
function showImagesOnView(){

  //clearing set of images
  imageView.innerHTML = '';

  //generate 3 set of random indexes for images
  var threeImages = randomImage();
  console.table(threeImages);

  //check if image-indexes are same as previous, else generate random again
  while(!checkFromPrev(threeImages)){
    threeImages = randomImage();
  }

  //save current random image-index
  imagesPrev = threeImages;
  console.table(imagesPrev);

  for(let i = 0; i < 3; i++){
    images[threeImages[i]].render();
  }

}
/////////////////////////////////////////////////
function clickedImage(e){

  showImagesOnView();

  console.log(e.target.id);
  if(e.target.id !== null){
    addClicksOnImage(e.target.id);
  }

  clickTries--;
  console.log('Number of clicks left: ' + clickTries);
  if(clickTries <= 0){
    imageView.removeEventListener('click',clickedImage);
    console.log('clickTries: ' + clickTries + ' - removedEventListener');
    displayScores();

  }

}
/////////////////////////////////////////////////
function displayScores(){

  var h2El = document.createElement('h2');
  h2El.textContent = 'Clicked Images Stats';
  scores.appendChild(h2El);

  for(let i = 0; i < images.length; i++){
    var liEl = document.createElement('li');
    liEl.textContent = images[i].id + ' image has ' + images[i].clicks +
        ' click(s) out of ' + images[i].views + ' view(s).';
    scores.appendChild(liEl);
  }
}

//////IMG CONSTRUCTOR FUNCTION////////

function Img(filepath,id,views,clicks){
  this.filepath = 'img/' + filepath;
  console.log(this.filepath);
  this.id = id;
  this.views = views;
  this.clicks = clicks;
  images.push(this);
}

Img.prototype.render = function(){
  var imgEl = document.createElement('img');
  imgEl.id = this.id;
  imgEl.height = 300;
  imgEl.src = this.filepath;
  imageView.appendChild(imgEl);
  this.views++;//this will track render count/views
  console.log(this.id + ' views are ' + this.views);
};

//////MAIN CALLS//////////

new Img('bag.jpg','bag',0,0);
new Img('banana.jpg','banana',0,0);
new Img('bathroom.jpg','bathroom',0,0);
new Img('boots.jpg','boots',0,0);
new Img('breakfast.jpg','breakfast',0,0);
new Img('bubblegum.jpg','bubblegum',0,0);
new Img('chair.jpg','chair',0,0);
new Img('cthulhu.jpg','cthulhu',0,0);
new Img('dog-duck.jpg','dog-duck',0,0);
new Img('dragon.jpg','dragon',0,0);
new Img('pen.jpg','pen',0,0);
new Img('pet-sweep.jpg','pet-sweep',0,0);
new Img('scissors.jpg','scissors',0,0);
new Img('shark.jpg','shark',0,0);
new Img('sweep.png','sweep',0,0);
new Img('tauntaun.jpg','tauntaun',0,0);
new Img('unicorn.jpg','unicorn',0,0);
new Img('usb.gif','usb',0,0);
new Img('water-can.jpg','water-can',0,0);
new Img('wine-glass.jpg','wine-glass',0,0);

console.log('Length of Images Array: ' + images.length);
showImagesOnView();

imageView.addEventListener('click',clickedImage);
