//declaring variables
var mario,mariorun,mariocollided;
var bg,bgImage;
var brickImage,bricksGroup, obstacles; 
var coin,coinImage,coinsGroup,coinScore=0,coinSound;
var mushImage, turleImage;
var gameState="play"

//preloaded images/animations/sounds
function preload(){
    mariocollided=loadAnimation("images/dead.png");
    mushImage=loadAnimation("images/mush1.png","images/mush2.png","images/mush3.png","images/mush4.png","images/mush5.png","images/mush6.png");
    turtleImage=loadAnimation("images/tur1.png","images/tur2.png","images/tur3.png","images/tur4.png","images/tur5.png",);
    brickImage=loadImage("images/brick.png");
    bgImage=loadImage("images/bgnew.jpg");
    mariorun=loadAnimation("images/mar1.png","images/mar2.png","images/mar3.png","images/mar4.png","images/mar5.png","images/mar6.png","images/mar7.png");
    coinImage=loadAnimation("images/con1.png","images/con2.png","images/con3.png","images/con4.png","images/con5.png","images/con6.png");
    coinSound=loadSound("sounds/coinSound.mp3");
    dieSound=loadSound("sounds/dieSound.mp3");
    restartImage=loadImage("images/restart.jpg")
}


function setup() {
    createCanvas(1000,600);
    //creating background. adding image, and making it move
    bg=createSprite(600,300);
    bg.addImage(bgImage);
    bg.scale=0.5;
    bg.velocityX=-7
    //creating Mario, with his animation
    mario=createSprite(200,505,20,50);
    mario.addAnimation("running",mariorun);
    mario.addAnimation("collided",mariocollided)
    mario.scale=0.2
    restart=createSprite(500,300)
    restart.addImage(restartImage)
    restart.visible=false

    //creating ground
    ground = createSprite(200,585,400,10);    
    ground.visible = false;
    //creating groups
    bricksGroup=new Group();
    coinsGroup=new Group();
    obstacleGroup=new Group();
}

function draw() {
    if(gameState==="play"){
        mario.setCollider("rectangle",0,0,200,500);          
        bg.velocityX = -6;
        mario.scale =0.2;     
    if (bg.x < 100){     
    bg.x=bg.width/4;   }
    if (mario.x < 200){     
    mario.x=200;   }
    if (mario.y < 50){     
        mario.y=50;   }
    if(keyDown("space") ) {     
        mario.velocityY = -14;
    }
    mario.velocityY = mario.velocityY + 0.5;   
    generatebricks();   
    for(var i = 0 ; i< (bricksGroup).length ;i++){     
        var temp = (bricksGroup).get(i) ;          
        if (temp.isTouching(mario)) {        
            mario.collide(temp);       
        }              
    }  
    generateobstacles();
    generatecoins();  
    for(var i = 0 ; i< (coinsGroup).length ;i++){     
        var temp = (coinsGroup).get(i) ;          
        if (temp.isTouching(mario)) {
            coinSound.play();
            coinScore++;
            temp.destroy();
            temp=null;
        }              
    }  
    if (obstacleGroup.isTouching(mario)){
        dieSound.play();
        gameState="end"

    }
 } //ending if statement for play

 else if(gameState==="end"){
     bg.velocityX=0
     mario.velocityX=0
     mario.velocityY=0
     obstacleGroup.setVelocityXEach(0)
     coinGroup.setVelocityXEach(0)
     bricksGroup.setVelocityXEach(0)
     obstacleGroup.setLifetimeEach(-1)
     coinGroup.setLifetimeEach(-1)
     bricksGroup.setLifetimeEach(-1)
     mario.changeAnimation("collided",mariocollided)
     mario.setCollider("rectangle",0,0,300,10);       
     mario.y=570;
     restart.visible=true

     if (mousePressedOver(restart)){
         restartGame();
     }
 } //end statement ends here
    mario.collide(ground);
    drawSprites();
}

function generatebricks(){
    if (frameCount % 70 === 0){
        var brick=createSprite(1200,120,40,10);
        brick.y=random(50,450)
        brick.addImage(brickImage);
        brick.scale=0.5
        brick.velocityX=-5
        brick.lifetime =250;    
        bricksGroup.add(brick);
        
    }
}
function generatecoins(){
    if (frameCount % 50 === 0){
        coin=createSprite(1200,125,20,20);
        coin.addAnimation("coin",coinImage)
        coin.y = random(80,350);
        coin.scale=0.1;
        coin.velocityX=-3;
        coin.lifetime =1200;    
        coinsGroup.add(coin);
        
    }
}
function generateobstacles(){
    if (frameCount % 100 === 0){
        obstacles=createSprite(1200,545,20,20);
        obstacles.velocityX=-4;
        obstacles.scale=0.1;
        var r=Math.round(random(1,2));  
        switch(r){     
            case 1:         
                obstacles.addAnimation("mush",mushImage)        
                break;     
             case 2:          
                obstacles.addAnimation("turtle",turtleImage)         
                break;      
            }
        obstacles.lifetime=300
        obstacleGroup.add(obstacles)    
    }
}


function restartGame(){
    gameState="play"
    obstacleGroup.destroyEach();
    bricksGroup.destroyEach();
    coinsGroup.destroyEach();
    coinScore=0
    mario.changeAnimation("running",mariorun)
    restart.visible=false
}