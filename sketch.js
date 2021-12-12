var zombie, zombieImg;
var tom, tomImg,tomImg2,tomImg3
var background1,backgroundImg;
var life = 5;
var bulletImg,bullet
var zombieGroup, bulletGroup;

var score = 0
var gameState = "play"




function preload(){
tomImg = loadAnimation("shooter_1.png");
tomImg2 = loadAnimation("shooter_2.png");
tomImg3 = loadAnimation("shooter_3.png");
zombieImg = loadImage("zombie.png");
backgroundImg = loadImage("bg.jpeg");
bulletImg = loadAnimation("bullet1.png");
}



function setup(){
createCanvas(windowWidth, windowHeight);

background1 = createSprite(windowWidth/2,windowHeight/2)
background1.addImage(backgroundImg)
background1.scale = 1.15

tom = createSprite(80,440)
tom.addAnimation('eyes open',tomImg2)
tom.addAnimation('gun firing' ,tomImg3)
tom.scale = 0.3

bulletGroup = new Group()
zombieGroup = new Group()
}


function draw(){
background('black')


if(gameState === "play"){

spawnZombies()



if(keyDown("Up_Arrow")){
tom.y = tom.y -7
}

if(keyDown("Down_Arrow")){
    tom.y = tom.y +7
}

if(keyDown("Right_Arrow")){
    tom.x = tom.x +7
}

if(keyDown("Left_Arrow")){
    tom.x = tom.x -7
}


if(keyWentDown("space")){
tom.changeAnimation('gun firing')
bullet = createSprite(100,100)
bullet.y = tom.y -2
bullet.x = tom.x
bullet.addAnimation('firing',bulletImg);
bullet.scale = 0.1
bullet.velocityX = 50
bulletGroup.add(bullet)
}

else if(keyWentUp("space")){
tom.changeAnimation('eyes open')
}

if(zombieGroup.isTouching(bulletGroup)){
    for(var i = 0; i<zombieGroup.length; i++){
        if(zombieGroup[i].isTouching(bulletGroup)){
        zombieGroup[i].destroy()
        bulletGroup.destroyEach()
        score = score +2
        }
        }
}

if(zombieGroup.isTouching(tom)){
    for(var i = 0; i<zombieGroup.length; i++){
        if(zombieGroup[i].isTouching(tom)){
        zombieGroup[i].destroy()
        life = life-1
        if(life<=0){
        tom.destroy()
        gameState = "end";
        }
        }
    }
}

drawSprites()

fill('red')
textSize(40)
text("Life:"+life,windowWidth -170, windowHeight-700)
fill('red')
textSize(40)
text("Score:"+score,windowWidth -200, windowHeight - 650)

}

if(gameState === "end"){
    zombieGroup.destroyEach()


 fill('green')
textSize(50)
text("Game Over", 600,400)

}


}


function spawnZombies(){
    if(frameCount % 10=== 0){
        zombie = createSprite(1000,420);
        zombie.x = random(1000,2000)
        zombie.y = random(420, 800)
        zombie.addImage(zombieImg)
        zombie.scale = 0.11
        zombie.velocityX = -3
    
    zombieGroup.add(zombie)
    }
    }


