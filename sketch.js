var player;
var playerWalk;
var playerClimb;
var playerJump;
var player;
var guard1, guard2, guard3, guard4, guard5;
var robot1, robot2;
var robot;
var door;
var wall1; 
var floor = 5;
var block1, block2, block3;
var invisGround, invisGround2;
var ladderIMG, ladder;
var guardBlock1, guardBlock2;
var backgroundIMG;

function preload(){
  playerWalk = loadAnimation("images/alienWalk1.png", "images/alienWalk2.png");
  playerClimb = loadAnimation("images/alienClimb1.png", "images/alienClimb2.png");
  playerDuck = loadImage("images/alienDuck.png");
  playerAlien = loadImage("images/alien.png");
  playerJump = loadImage("images/alienJump.png");
  robot1 = loadImage("images/Robot1.png");
  robot2 = loadImage("images/Robot2.png");
  ladderIMG = loadImage("images/ladder.png");
  backgroundIMG = loadImage("images/bg1.png");

}


function setup() {
  createCanvas(1200,800);
  guard1 = createSprite(600, 450, 50, 50);
  guard2 = createSprite(800, 450, 50, 50);
  player = createSprite(250, 435, 20, 20);
  ladder = createSprite(700, 450, 20, 20);
  guardBlock1 = createSprite(850, 435, 10, 10);
  //block3 = createSprite();

  //add animation
  block2 = createSprite(600, 200, 1200, 50);
  ladder.addImage("up", ladderIMG);
  ladder.scale = 5.5;
  player.addAnimation("Walk", playerWalk);
  player.addAnimation("Climb", playerClimb);
  player.addImage("Duck", playerDuck);
  player.addImage("alien", playerAlien);
  player.addImage("Jump", playerJump);
  block1 = createSprite(450, 412, 50, 75);
  guard1.addImage("bot2", robot2);
  guard1.addImage("bot1", robot1);
  guard1.scale = 0.09;
  guard1.debug = true;
  guard1.velocityX = -4;
  guard2.addImage("bot1", robot1);
  guard2.addImage("bot2", robot2);
  guard2.scale = 0.09;
  guard2.debug = true;
  invisGround = createSprite(600, 460, 1200, 20);
  invisGround.visible = false;
  //invisGround2 = createSprite(600, 200, 1200, 50);
  //invisGround2.visible = false;
}
function draw() {
  background(backgroundIMG); 
  
  fill(155);
  rect(0, 450, 1200, 200);
  fill(125);
  rect(0, 50, 200, 600);

  player.velocityY = player.velocityY + 0.8;

  player.collide(invisGround);
  //player.collide(invisGround2);

  ladder.depth = player.depth;
  ladder.depth = ladder.depth - 1;

  if(player.y > 130){
    player.velocityY = 0;
  }

  if(player.y > 130 && player.isTouching(ladder) && keyDown('space')){
    climb();
    player.velocityY = 3;
  }

  if(keyDown('space') && player.isTouching(ladder)){
    climb();
    player.velocityY = -3;
  }

  if(keyWentUp('space')){
    player.velocityY = 3;
  }

  if(keyDown(RIGHT_ARROW)){
    playerRight();
  }

  if(keyDown(LEFT_ARROW)){
    playerLeft();
  }

  if(keyDown(UP_ARROW)){
    Jump(); 
  }
/*
  if(keyDown(DOWN_ARROW)){
    playerDown();
  }
*/
  if(keyDown(DOWN_ARROW)){
    Duck();
  }
  
  if(keyWentUp(DOWN_ARROW)){
    player.changeAnimation("alien", playerAlien);
  }

  if(keyWentUp(UP_ARROW)){
    player.changeAnimation("alien", playerAlien);
  }

  if(guard1.x - player.x <= 40){
    textSize(30);
    text("LKHJ", 400, 400);
  }

  if(guard1.isTouching(block1)){
    guard1.changeAnimation("bot1", robot1);
    guard1.velocityX = 3;
  }

  if(guard1.isTouching(guardBlock1)){
    guard1.changeAnimation("bot2", robot2);
    guard1.velocityX = -3;
  }

  drawSprites();
}

function playerRight(){
  player.changeAnimation("Walk", playerWalk);
  player.velocityY = 0;
  player.x = player.x + 5;
}

function playerLeft(){
  player.velocityY = 0;
  player.x = player.x - 5;
}

function Jump(){
  player.changeAnimation("Jump", playerJump);
  player.velocityY = -8;
}

function Duck(){
  player.changeAnimation("Duck", playerDuck);
}

function climb(){
  player.changeAnimation("Climb", playerClimb);
  //player.y = player.y + 5;
}
/*
function playerDown(){
  player.changeAnimation("Jump", playerJump);
  player.y = player.y + 5;
}
*/