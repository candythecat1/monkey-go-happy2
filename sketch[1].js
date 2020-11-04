var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running,monkey_standing;
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup
var survivalTime = 0; 
var score = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")

  monkey_walking = loadImage("sprite_0.png")
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400);
monkey = createSprite(80,315,20,20);
monkey.addAnimation("moving",monkey_running);
monkey.scale = 0.15;
  
ground = createSprite(400,350,900,10);
ground.velocityX = -6;
ground.x = ground.width/2;
console.log(ground.x);
  
bananaGroup = new Group();
obstaclesGroup = new Group();
  score = 0;
  
}


function draw() {
  background("white");
  drawSprites();
  fruit();
  obstacles();
  
  stroke("white")
  textSize(20);
  fill("white");
  text ("score: "+score,200,200);
  
  stroke("black")
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate())
  text("survivalTime: "+survivalTime,100,50)
  
   if (gameState===PLAY){
      if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
if(keyDown("space")&& monkey.y >= 230) {
        monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8 
      if (monkey.isTouching(obstaclesGroup)){
      gameState = END
    }
   }
  else if (gameState === END) {
   monkey.destroy();
    obstaclesGroup.destroyEach();
    bananaGroup.destroyEach();
 survivalTime = 0;
  }

monkey.collide(ground);
  
 
   
  
}

function fruit(){
  if (frameCount % 80 === 0){
 banana = createSprite(200,Math.round(random(120,200)),20,20);
banana.addImage(bananaImage);
  banana.scale = 0.13;
  banana.velocityX = -4;
      bananaGroup.add(banana);
  }
    
  if (monkey.isTouching(bananaGroup)){
    banana.destroy();
    score = score+1
  
  }
  
}

function obstacles(){
if (frameCount % 60 === 0){
obstacle = createSprite(350,320,20,20);
  obstacle.velocityX = -6
obstacle.addImage(obstacleImage);
  obstacle.scale = 0.17;
  
   obstaclesGroup.add(obstacle);
 }
}


