var canvas, backgroundImage;
var database, read, position;

var AB, bg, ABImage;

var x,y;
var height;
var bigBalloon, smallBalloon;

function preload(){

  bg = loadImage("images/Hot Air Ballon-01.png")
  ABImage = loadAnimation("images/Hot Air Ballon-02.png","images/Hot Air Ballon-03.png","images/Hot Air Ballon-04.png")
  
}


function setup() {
  database = firebase.database()
  createCanvas(1000,900);
  AB = createSprite(400, 200, 50, 50);
  AB.addAnimation("ABAni", ABImage);

  read = database.ref('Balloon/height');
  read.on("value", readHeight,showError)

  AB.scale = 0.5

  
}

function draw() {
  background(bg);  


  

  if(height !== undefined){

    if(keyDown(LEFT_ARROW)){
      updateheight(-10,0);
    }
    else if(keyDown(RIGHT_ARROW)){
      updateheight(10,0);
    }
    else if(keyDown(UP_ARROW)){
      updateheight(0,-10);
      AB.scale = AB.scale -0.005
    }
    else if(keyDown(DOWN_ARROW)){
      updateheight(0,+10);
      AB.scale = AB.scale +0.005
    }


}

  drawSprites();
  textSize(20);
  fill("black")
  text("USE ARROW KEYS TO MOVE THE AIR BALLOON",150,100);
  
  
}

//reading data from db
function readHeight(data){
  height = data.val();
  
  AB.x =height.x
  AB.y = height.y
  
}

//writing data
function updateheight(x,y){

  database.ref('Balloon/height').set({

      'x' : height.x + x,
      'y' : height.y + y  
  })

}

function showError(){

  console.log("Error")
}