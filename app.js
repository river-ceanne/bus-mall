'use strict';

var imageView = document.getElementById('image-selection');
console.log(imageView);
var images = [];
var clickTries = 25;
var imagesPrev;

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

function showImagesOnView(){

  //clearing set of images
  imageView.innerHTML = '';

  var threeImages = randomImage();
  console.table(threeImages);

  while(!checkFromPrev(threeImages)){
    threeImages = randomImage();
  }


  imagesPrev = threeImages;
  console.table(imagesPrev);

  for(let i = 0; i < 3; i++){
    images[threeImages[i]].render();
  }


  clickTries--;
  console.log('Number of clicks left: ' + clickTries);
  if(clickTries < 0){
    imageView.removeEventListener('click',showImagesOnView);
  }
}

//////IMAGES CONSTRUCTOR FUNCTION////////

function Image(filepath,id,views,clicks){
  this.filepath = 'img/' + filepath;
  console.log(this.filepath);
  this.id = id;
  this.views = views;
  this.clicks = clicks;
  images.push(this);
}

Image.prototype.render = function(){
  var imgEl = document.createElement('img');
  imgEl.id = this.id;
  imgEl.height = 300;
  imgEl.src = this.filepath;
  imageView.appendChild(imgEl);
};

//////MAIN CALLS//////////

new Image('bag.jpg','bag',0,0);
new Image('banana.jpg','banana',0,0);
new Image('bathroom.jpg','bathroom',0,0);
new Image('boots.jpg','boots',0,0);
new Image('breakfast.jpg','breakfast',0,0);
new Image('bubblegum.jpg','bubblegum',0,0);
new Image('chair.jpg','chair',0,0);
new Image('cthulhu.jpg','cthulhu',0,0);
new Image('dog-duck.jpg','dog-duck',0,0);
new Image('dragon.jpg','dragon',0,0);
new Image('pen.jpg','pen',0,0);
new Image('pet-sweep.jpg','pet-sweep',0,0);
new Image('scissors.jpg','scissors',0,0);
new Image('shark.jpg','shark',0,0);
new Image('sweep.png','sweep',0,0);
new Image('tauntaun.jpg','tauntaun',0,0);
new Image('unicorn.jpg','unicorn',0,0);
new Image('usb.gif','usb',0,0);
new Image('water-can.jpg','water-can',0,0);
new Image('wine-glass.jpg','wine-glass',0,0);

console.log('Length of Images Array: ' + images.length);
showImagesOnView();

imageView.addEventListener('click',showImagesOnView);
