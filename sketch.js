var dragon,dragonImg
var vampire,vampireImg
var fireball, fireBallImg 
var background1,backgroundImg 
var life = 5

var score = 0
var gameState = "play"


function preload(){
dragonImg = loadImage("Dragon.png")
vampireImg = loadImage("Vampire.jpeg")
fireBallImg = loadImage("fire ball.jpeg ")
backgroundImg = loadImage("bg.png")
}




function setup() {
  createCanvas(800,400);
 
  background1 = createSprite(600,300,400,20)
  background1.addImage(backgroundImg)
  backgroundImg.scale = 1.15

  dragon = createSprite(50,300)
  dragon.addImage(dragonImg)
  dragon.scale = 0.09

  vampireGroup = new Group()
  fireballGroup = new Group()
}

function draw() {
  background(255,255,255); 

  spawnVampires()
  
  if(keyDown("Up_Arrow")){
    dragon.y = dragon.y -3
    }
    
    if(keyDown("Down_Arrow")){
        dragon.y = dragon.y +3
    }

    if(keyDown("Right_Arrow")){
      dragon.x = dragon.x +3
  }

    if(vampireGroup.isTouching(dragon)){
      dragon.destroy()
      
  }


    if(keyWentDown("space")){
      fireball = createSprite(100,100)
      fireball.x = dragon.x
      fireball.y = dragon.y
      fireball.addImage(fireBallImg)
      fireball.scale = 0.1
      fireball.velocityX = 5
      
fireballGroup.add(fireball)
      }

      function spawnVampires(){
        if(frameCount % 80 === 0){
          vampire = createSprite(500,100)
          vampire.x = random(500,800)
          vampire.y = random(10,300)
          vampire.addImage(vampireImg)
          vampire.scale = 0.09
          vampire.velocityX = -1
        if(score>20){
        vampire.velocityX = -5
        }
          vampireGroup.add(vampire)
        }
        }



for(var i = 0; i<vampireGroup.length; i++){
if(vampireGroup[i].isTouching(fireballGroup)){
vampireGroup[i].destroy()
fireballGroup.destroyEach()
score = score +5
}
}


  drawSprites();

  fill('red')
textSize(20)
text("Life:"+life,100,20)
fill('red')
textSize(20)
text("Score:"+score, 200 ,20)
}