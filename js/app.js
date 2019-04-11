'use strict';

var imageView = document.getElementById('image-selection');
var clickRate = [];
var clicks = [];
console.log(imageView);
var images = [];
var imageLabels = [];
var clickTries = 25;
var imagesPrev;

//********************************************** */
///////////////FUNCTIONS/////////////////////////
///******************************************** */
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
  console.log('checkFromPrev() entered');
  for(let i = 0;i < currImages.length; i++){

    //we can use imagesPrev.includes(x) or imagesPrev.indexOf(x)
    if(imagesPrev.includes(currImages[i])){
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
      console.log('clicks on image: ' + images[i].id + ' before adding 1: ' + images[i].click);
      images[i].click++;
      clicks[i]++;
      console.log('clicks on image: ' + images[i].id + ' after adding 1: ' + images[i].click);
      clickRate[i] = ((images[i].click / images[i].views) * 100).toFixed(2);
      console.log('click rate is ' + clickRate[i]);
      console.log(images[i].id + ' : ' + images[i].click + ' clicks.');
      console.log(images[i].id + ' : ' + images[i].views + ' views.');
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

  if(clickTries >= 25){
    imagesPrev = threeImages;
    console.log('set first imagesPrev to initial threeImages');
  }else {
    //check if image-indexes are same as previous, else generate random again
    while(!checkFromPrev(threeImages)){
      threeImages = randomImage();
      console.log('image(s) the same as previous, re-shuffling..');
    }

    //save current random image-index
    imagesPrev = threeImages;
    console.table(imagesPrev);
  }

  for(let i = 0; i < 3; i++){
    images[threeImages[i]].render();
  }

}
/////////////////////////////////////////////////
function clickedImage(e){

  clickTries--;
  console.log('Number of clicks left: ' + clickTries);
  if(clickTries <= 0){
    imageView.removeEventListener('click',clickedImage);
    console.log('clickTries: ' + clickTries + ' - removedEventListener');
    displayStatChart();
    displayClicksChart();
    localStorage.setItem('images',JSON.stringify(images));
    localStorage.setItem('clickRate',JSON.stringify(clickRate));
    localStorage.setItem('clicks',JSON.stringify(clicks));
    return;
  }

  console.log(e.target.id);
  if(e.target.id !== null && e.target.id !== imageView.id){
    addClicksOnImage(e.target.id);
  }else{
    alert('Click on an image, not borders.');
    clickTries++;
    return;
  }

  showImagesOnView();

}

/////////////////////////////////////////////////
function displayStatChart(){

  var csc = document.getElementById('click-stats-chart');
  new Chart(csc, {
    type: 'bar',
    data: {
      labels: imageLabels,
      datasets: [{
        label: '% of Clicks on Images',
        data: clickRate,
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderWidth: 2
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

/////////////////////////////////////////////////
function displayClicksChart(){

  var nocc = document.getElementById('number-of-clicks-chart');
  new Chart(nocc, {
    type: 'bar',
    data: {
      labels: imageLabels,
      datasets: [{
        label: '# of Clicks on Images',
        data: clicks,
        backgroundColor: '#FFC0CB',
        borderWidth: 2
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });

}

//////IMG CONSTRUCTOR FUNCTION////////

function Img(filepath,id,views,click){
  this.filepath = filepath;
  console.log(this.filepath);
  this.id = id;
  this.views = views;
  this.click = click;
  imageLabels.push(id);
  images.push(this);
  clickRate.push(0);
  clicks.push(0);
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

////*******JSON Parsing on local storage******////
function parseJSONLocalStorage(){

  var storedImages = JSON.parse(localStorage.getItem('images'));
  console.table(images);
  images = [];
  console.log('length of images array: ' + images.length);
  console.log('storedImages length: ' + storedImages.length);

  for(let i = 0; i < storedImages.length; i++){
    new Img(storedImages[i].filepath,storedImages[i].id,storedImages[i].views,storedImages[i].click);
  }

  console.table(images);

  console.log('json clickRate: ' + localStorage.getItem('clickRate'));
  clickRate = JSON.parse(localStorage.getItem('clickRate'));
  console.log('parsed clickRate: ' + clickRate);

  clicks = JSON.parse(localStorage.getItem('clicks'));
  console.log('parsed clicks: ' + clicks);

}
/*********/////MAIN CALLS///////****************/

if(localStorage.getItem('images')) {
  console.log('Storage set with data, will parse and re-populate dataset');
  parseJSONLocalStorage();
  console.log('... stored data loaded.');
}else {
  //population of data objects if no local storage is set
  console.log('Storage is not set, initializing objects to start . . .');

  new Img('img/bag.jpg','bag',0,0);
  new Img('img/banana.jpg','banana',0,0);
  new Img('img/bathroom.jpg','bathroom',0,0);
  new Img('img/boots.jpg','boots',0,0);
  new Img('img/breakfast.jpg','breakfast',0,0);
  new Img('img/bubblegum.jpg','bubblegum',0,0);
  new Img('img/chair.jpg','chair',0,0);
  new Img('img/cthulhu.jpg','cthulhu',0,0);
  new Img('img/dog-duck.jpg','dog-duck',0,0);
  new Img('img/dragon.jpg','dragon',0,0);
  new Img('img/pen.jpg','pen',0,0);
  new Img('img/pet-sweep.jpg','pet-sweep',0,0);
  new Img('img/scissors.jpg','scissors',0,0);
  new Img('img/shark.jpg','shark',0,0);
  new Img('img/sweep.png','sweep',0,0);
  new Img('img/tauntaun.jpg','tauntaun',0,0);
  new Img('img/unicorn.jpg','unicorn',0,0);
  new Img('img/usb.gif','usb',0,0);
  new Img('img/water-can.jpg','water-can',0,0);
  new Img('img/wine-glass.jpg','wine-glass',0,0);

  console.log('images initialized');
}

showImagesOnView();

imageView.addEventListener('click',clickedImage);
