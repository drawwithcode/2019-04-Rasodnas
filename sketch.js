let stickArray = [];
let mySong;
let stickDist = 100;
var analyzer;

function preload() {
  mySong = loadSound("shame_cutcut.mp3");
}


function setup() {
  createCanvas(windowWidth,windowHeight);
  background('black');
  angleMode(RADIANS);
  rectMode(CENTER);

  stickCol = Math.round(width/stickDist);
  stickRow = Math.round(height/stickDist);

  // STICK INSTANCES
  for (let yi = 0; yi < stickRow; yi++) {
    for (let xi = 0; xi < stickCol; xi++) {

        let stickTmp = new Stick((xi * stickDist), (yi * stickDist));
        stickArray.push(stickTmp);
    }
  }

  fft = new p5.FFT();
  fft.setInput(mySong);

  analyzer = new p5.Amplitude();
  analyzer.setInput(mySong);

}


function draw() {
    mySong.loop();
    background('black');

    // iterate through all the array objects
    for (let i = 0; i < stickArray.length ; i++) {
        push();

        let volume = analyzer.getLevel();
        volume = map(volume, 0, 1, 0, 15);

        stickArray[i].vol = volume;
        stickArray[i].behave();
        stickArray[i].display();
        pop();
    }




}


function Stick(_x, _y) {
  this.x = _x;
  this.y = _y;
  this.a = 0;
  this.b = 0;
  this.h = 100;
  this.w = 0;
  this.vol = 1;
  // this.w = 1;

  this.behave = function(){
      // change the angle according to mouse pos
      // this.a = atan2(mouseY - height / 2, mouseX - width / 2);
      // this.a = noise(frameCount/100)*10;

      if (this.vol > 10) {
        this.a += this.vol/300;
      }
      else {
        this.a -= this.vol/300;
      }

      if (mouseIsPressed){
        if (mouseX > this.x - stickDist && mouseX < this.x + stickDist && mouseY > this.y - stickDist && mouseY < this.y + stickDist) {
            this.a = atan2(mouseY - height / 2, mouseX - width / 2);
            // this.a = volume;
        }
      }


      // change the stroke weight according to softened mouse distance fromt the stick
      // this.w = this.w * (sqrt((_x^2 + mouseX^2) - (_y^2 + mouseY^2))) / 10;
  }

  this.display = function(){
      push();
      translate(this.x,this.y);
      // console.log(this.x);
      // console.log(this.y);
      rotate(this.a);
      fill(0);
      stroke(255);
      strokeWeight(this.vol);
      rect(0,0,this.b,this.h);
      pop();
  }

}
