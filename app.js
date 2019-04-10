'use strict';

var imageView = document.getElementById('image-selection');
var scores = document.getElementById('scores');
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
    displayScores();
    displayChart();
    return;
  }

  showImagesOnView();

  console.log(e.target.id);
  if(e.target.id !== null){
    addClicksOnImage(e.target.id);
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

/////////////////////////////////////////////////
function displayChart(){

  var csc = document.getElementById('click-stats-chart');
  new Chart(csc, {
    type: 'bar',
    data: {
      labels: imageLabels,
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.4)',
          'rgba(54, 162, 235, 0.4)',
          'rgba(255, 206, 86, 0.4)',
          'rgba(75, 192, 192, 0.4)',
          'rgba(153, 102, 255, 0.4)',
          'rgba(255, 159, 64, 0.4)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
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

function Img(filepath,id){
  this.filepath = 'img/' + filepath;
  console.log(this.filepath);
  this.id = id;
  this.views = 0;
  this.clicks = 0;
  imageLabels.push(id);
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

new Img('bag.jpg','bag');
new Img('banana.jpg','banana');
new Img('bathroom.jpg','bathroom');
new Img('boots.jpg','boots');
new Img('breakfast.jpg','breakfast');
new Img('bubblegum.jpg','bubblegum');
new Img('chair.jpg','chair');
new Img('cthulhu.jpg','cthulhu');
new Img('dog-duck.jpg','dog-duck');
new Img('dragon.jpg','dragon');
new Img('pen.jpg','pen');
new Img('pet-sweep.jpg','pet-sweep');
new Img('scissors.jpg','scissors');
new Img('shark.jpg','shark');
new Img('sweep.png','sweep');
new Img('tauntaun.jpg','tauntaun');
new Img('unicorn.jpg','unicorn');
new Img('usb.gif','usb');
new Img('water-can.jpg','water-can');
new Img('wine-glass.jpg','wine-glass');

console.log('Length of Images Array: ' + images.length);
showImagesOnView();

imageView.addEventListener('click',clickedImage);
