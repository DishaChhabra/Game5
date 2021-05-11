var snake, apple, powerSp, powerGrp, text1, text2
var score = 0
var lives = 3
var gameState = 0

function preload(){
 appleImg = loadImage("apple.gif")
 snake1Img = loadImage("snake1.png")
 snake2Img = loadImage("snake2.png")
 snake3Img = loadImage("snake3.png")
 snake4Img = loadImage("snake4.png")
 powerImg = loadImage("power.png")
}
function setup() {
  createCanvas(1200,600);
  snake = createSprite(200, 400, 20, 20);
  snake.shapeColor = "white"
  snake.velocityX = 5
  snake.addImage(snake1Img)
  snake.scale = 0.25
  //snake.debug = true
  apple = createSprite(600,250,20,20)
  apple.shapeColor = "red"
  apple.addImage(appleImg)
  apple.scale = 0.1
  edges = createEdgeSprites()
  restart = createButton("RESTART")
  restart.position(560,300)
  powerGrp = createGroup()
  start = createButton("START")
  start.position(560, 280)
  howto = createButton("HOW TO PLAY")
  howto.position(535, 320)
}

function draw() {
  background("black");
  if(gameState === 0){
      //howto.show()
      start.show()
      apple.visible = false
      snake.visible = false
      restart.hide()
      howto.mousePressed(() =>{
        howto.hide()
        start.position(560, 400)
        text1 = createElement("h3")
        text1.html("Use your arrow keys to move the snake around.")
        text1.position(430, 290)
        text1.style("color", "white")
        
        text2 = createElement("h3")
        text2.html("Touch the red apple to score a point and touch the blue one to score three.")
        text2.position(330, 310)
        text2.style("color", "white")
      })
      start.mousePressed(() => {
        howto.hide()
        start.hide()
        gameState = 1
        snake.visible = true
        text1.hide()
        text2.hide()
        
      })
  }
  if(gameState === 1){
    restart.hide()
    snake.visible = true
    apple.visible = true
    if(snake.isTouching(apple)){
      apple.x = random(20,1180)
      apple.y = random(20,580)
      score++
    }
    powerFun()
    if(snake.isTouching(powerGrp)){
      score = score+3
      lives = 3
      powerGrp.destroyEach()
    }
    console.log(frameCount)
    if(keyDown("left")){
      snake.velocityX = -5
      snake.velocityY = 0
      snake.addImage(snake2Img)
      snake.setCollider("rectangle", 0,0,800,200)
    }
    if(keyDown("right")){
      snake.velocityX = 5
      snake.velocityY = 0
      snake.addImage(snake1Img)
      snake.setCollider("rectangle", 0,0,800,200)
    }
    if(keyDown("down")){
      snake.velocityY = 5
      snake.velocityX = 0
      snake.addImage(snake3Img)
      snake.setCollider("rectangle", 0,0,200,800)
    }
    if(keyDown("up")){
      snake.velocityY = -5
      snake.velocityX = 0
      snake.addImage(snake4Img)
      snake.setCollider("rectangle", 0,0,200,800)
    }
    if(snake.isTouching(edges)){
      snake.velocityX = 5
      snake.velocityY = 0
      lives--
      snake.x = 200
      snake.y = 400
      snake.addImage(snake1Img)
    }
    if(lives === 0){
      gameState = 2
    }
  } 
  if(gameState === 2){
    apple.visible = false;
    snake.visible = false;
    restart.show()
    restart.mousePressed(()=>{
      gameState = 0
      score = 0
      lives = 3
      snake.x = 200
      snake.y = 400
      snake.velocityX = 5
      snake.velocityY = 0
    })

  }
  drawSprites();
  text("Score : " + score, 15, 20)
  text("Lives : " + lives, 15, 40)
}

function powerFun(){
  if(frameCount%500 === 0){
    powerSp = createSprite(random(20,1180), random(20, 580), 20, 20)
    powerSp.addImage(powerImg)
    powerSp.scale = 0.2
    powerSp.lifetime = 200
    powerGrp.add(powerSp)

  }
}