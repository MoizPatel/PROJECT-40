var lion, lioni;
var chickeni, stonei;
var restarti, gameoveri;
var gameover, restart;
var ground, background;
var score = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var FoodGroup, ObstacleGroup;
var cam;
var delta = 0.01;
var junglei;

function preload(){
  lioni = loadImage("lion.jpg");
  chickeni = loadImage("food.jpg");
  stonei = loadImage("obstacle.jpg");
  gameoveri = loadImage("go.png");
  restarti = loadImage("restart.png")
  junglei  = loadImage("jungle.jpg");

}

function setup() {
  createCanvas(600,200);
  
  ground = createSprite(300,180,600,5);
  lion = createSprite(50,139,10,10);
  lion.addImage(lioni);
  lion.scale = 0.06;
  gameover = createSprite(280,70,10,10);
  restart = createSprite(280,110,10,10);
  FoodGroup = createGroup();
  ObstacleGroup = createGroup();
  //cam = createCamera();
  
 // cam.pan(-0.8);
}

function draw() {
  background("white");
  text("score = "+score,250,10)
  ground.velocityX = -5;
  if (ground.x<0){
    ground.x = ground.width/2;
  }
  if (keyDown("space")&&lion.y>=50){
    lion.velocityY = -3;
  }
   console.log(lion.y);
   // cam.pan(delta);

  // every 160 frames, switch direction
  if (frameCount % 160 === 0) {
   delta *= -1;
  }

  camera.position.x = lion.x;
  camera.position.y = lion.y;
 
  lion.velocityY = lion.velocityY+0.8;
  lion.collide(ground);
  gameover.addImage(gameoveri);
  gameover.scale = 0.5;
  restart.addImage(restarti);
  restart.scale = 0.5
  if(gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    food();
    obstacle();
    gameover.visible = false;
    restart.visible = false;
    if(FoodGroup.isTouching(lion)){
      FoodGroup[0].destroy();
    }
    if (ObstacleGroup.isTouching(lion)){
      lion.visible = false
      gameState = END;
      
    }
    
  }

   if (score>500) {
     textSize(50);
     stroke(50);
     fill("yellow") ;
     text("YOU WIN",50,100);
     score = 500;
    ground.velocityX = 0;
    gameover.visible = false;
    restart.visible = false;
    FoodGroup.destroyEach();
    ObstacleGroup.destroyEach()
    lion.destroy();
   }
  
  if(gameState ===END){
    ground.velocityX = 0;
    gameover.visible = true;
    restart.visible = true;
    FoodGroup.destroyEach();
    ObstacleGroup.destroyEach();
    
     if(mousePressedOver(restart)){
    reset();
  }
  }
  
 drawSprites();
}

function food(){
  if (frameCount % 80===0){
  var chicken = createSprite(600,Math.round(random(20,150)),10,10);
  chicken.addImage(chickeni);
  chicken.scale = 0.19;
  chicken.velocityX = -5;
  chicken.lifetime = 300;
  FoodGroup.add(chicken);
  }
}

function obstacle(){
  if (frameCount % 300===0){
  var stone = createSprite(600,148,10,10);
  stone.addImage(stonei);
  stone.scale = 0.06;
  stone.velocityX = -5;
  stone.lifetime = 300;
  ObstacleGroup.add(stone);
  }
}

function reset(){
  gameState = PLAY;
  gameover.visible = false;
  restart.visible = false;
  lion.visible = true;
  score = 0;
}