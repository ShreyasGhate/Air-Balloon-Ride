var balloon,balloon_123;
var database,position;
var backgroundImg, firebase;
function preload(){
backgroundImg = loadImage("Hot Air Ballon-01.png")
balloon_123 = loadImage("Hot Air Ballon-02.png")
}
function setup() {
  createCanvas(1500,700);

   database=firebase.database();
 balloon= createSprite(200, 200, 50, 50);
 balloon.addImage(balloon_123)
 balloon.scale=0.5



 var balloonPosition =database.ref('balloon/position')
 balloonPosition.on("value",readPosition,showError) 

}

function draw() {
  background(backgroundImg); 
  
  if (keyDown(LEFT_ARROW)) {
    balloon.x=balloon.x-5 
  }

  if (keyDown(RIGHT_ARROW)) {
    balloon.x = balloon.x + 5
  }

  if (keyDown(UP_ARROW)) {
    updateHeight(0,-5)
    balloon.y = balloon.y - 5
    balloon.scale=balloon.scale-0.005
  }

  if (keyDown(DOWN_ARROW)) {
    updateHeight(0, +5)
    balloon.y = balloon.y +5
    balloon.scale = balloon.scale +0.005
  }
  drawSprites();

  textSize(18)
  fill("black")
  strokeWeight(1)
  stroke("purple")
  text("Hot Air Balloon ", 1239, 580)

  
  textSize(18)
  fill("black")
  strokeWeight(1)
  stroke("purple")
  text("Ride!", 1278, 600)

  textSize(40)
  fill(0,0,0)
  text("Press Arrow Key To Make Balloon Fly", 100, 50)
}

function updateHeight(x, y) {
  database.ref('balloon/position').set({

    x: balloon.position.x + x,
    y: balloon.position.y + y
    
  })


}
function readPosition(data){
  position = data.val();
  console.log(position.x);
  balloon.x = position.x;
  balloon.y = position.y;
}

function showError(){
  console.log("Error in writing to the database");
}
