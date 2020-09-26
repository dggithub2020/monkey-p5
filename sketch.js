var monkey, monkeyAnimation, banana, bananaImage;
var gameState, PLAY=1, END=0;
var ground;
var stone, stoneImg;
var bcakground1, backgroundImage;
var ObstaclesGroup, BananaGroup;


function preload(){
monkeyAnimation=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  backgroundImage=loadImage("jungle.jpg");
  
  
  bananaImage=loadImage("banana.png");
  
  stoneImg= loadImage ("stone.png");
 
  
  
}


function setup() {
  createCanvas(600, 400);
 
  background1= createSprite(0,0,600,300);
  background1.addImage(backgroundImage); 
  background1.scale= 1.5;
  background1.velocityX= -2;
  monkey=createSprite(130,308,10,10); 
  monkey.addAnimation("monkey",monkeyAnimation);
  monkey.scale=0.2;

  ground= createSprite(300,340,600,10);
  ground.visible= false;
 
  gameState= PLAY; 
  
  ObstaclesGroup= new Group();
  BananaGroup= new Group();
  
}

function draw() {
  background(1);
  
  //what happens when gamestate play occurs 
  if(gameState === PLAY) {
    Obstacle();
    bananas();
    
    console.log(monkey.y);
    
    if(keyDown("space")) {
      monkey.velocityY= -9;
    }
    monkey.velocityY= monkey.velocityY +0.8;
    ObstaclesGroup.collide(ground);
    if(background1.x<0) {
      background1.x= background1.width/2;
    }
    
    if(monkey.isTouching(ObstaclesGroup)) {
      //clouds.velocityX=0;
      gameState=END; 
      
      
    }
  }

  else if(gameState===END){
      ObstaclesGroup.setVelocityXEach(0);
      BananaGroup.setVelocityXEach(0);
      ObstaclesGroup.visisble=false;
      BananaGroup.visible=false; 
      background1.velocityX=0;  
      ObstaclesGroup.setLifetimeEach(-1);
      BananaGroup.setLifetimeEach(-1);
      monkey.velocityY= 0;
  }

  monkey.collide(ground);  
  
  survivalTime= Math.ceil(World.frameCount/World.frameRate);
  text("Survival Time: "+ survivalTime,100,50);

  
  drawSprites();
}      

function bananas() {
  if(World.frameCount% 40===0) {
  var banana= createSprite(400,206,10,30);
  banana.velocityX=-4;
  banana.scale= 0.05;
  banana.addImage(bananaImage);
  banana.lifetime=400;
  BananaGroup.add(banana);
}
}

function Obstacle() {
if(World.frameCount% 100===0) {
  var stone= createSprite(400,325,25,45);
  stone.scale=0.25;
  stone.addImage(stoneImg);
  stone.velocityX= -2;
  stone.lifetime= 200;
  ObstaclesGroup.add(stone);
  
  }
  
  
}