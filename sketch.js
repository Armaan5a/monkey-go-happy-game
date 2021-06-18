var ban,mon,ground,score=0,m,bag,stone,obs,obg,gameState="play",stime=0
function preload(){
ban=loadImage("banana.png")
mon=loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  stone=loadImage("obstacle.png")  
}

function setup() {
createCanvas(450,400) 

m=createSprite(80,300,30,30)  
m.addAnimation("monkey",mon)
m.scale=0.15

ground = createSprite(0,350,920,15);

bag = createGroup()
obg = createGroup()
}

function draw() {
background("white")

textSize(18)
text("Score: "+ score, 370,40);  
text("servivleTime: "+ stime,200,40)

  if (gameState === "play"){
 
  if(keyDown("space")&& m.y >= 290) {
 m.velocityY = -18;
}  
m.velocityY = m.velocityY + 0.7  

if (bag.isTouching(m)){
  score=score+1
  bag.destroyEach()
}

if (obg.isTouching(m)){
 gameState="end"
}
ob()
banana()
stime = stime + Math.round(getFrameRate()/60);
}

if(gameState==="end"){
  bag.setVelocityEach(0,0)
 obg.setVelocityEach(0,0) 
m.pause()
bag.setLifetimeEach(-1);
obg.setLifetimeEach(-1);
}
  
  drawSprites()
  m.collide(ground)            

}

function banana(){
if (frameCount%80 ===0){
 ba=createSprite(410,Math.round(random(50,180)),30,30)   
 ba.addImage(ban) 
 ba.scale=0.1
 ba.velocityX=-(5+(score/3))
 ba.lifetime=220
 bag.add(ba)
}  
}

function ob (){
 if (frameCount%135 ===0){ 
obs=createSprite(370,300,30,30)
obs.addImage(stone) 
obs.scale=0.2 
obs.velocityX=-(5+(score/3)) 
obs.lifetime=200
obg.add(obs)
//obs.debug=true 
obs.setCollider("circle",0,0,140);
obs.depth = m.depth;
m.depth = m.depth + 1;
 }
}