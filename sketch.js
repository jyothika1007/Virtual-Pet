//Create variables here
var dog;
var happyDog;
var database;
var foodS,foodStock;
var dogImg ,happyDogImg;
function preload()
{
	//load images here
  dogImg = loadImage("images/dogImg.png");
 happyDogImg = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500, 500);
  
  dog = createSprite(250,350);
  dog.addImage(dogImg);
  dog.scale=0.2;

  database = firebase.database();
  
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
}

function draw() {  
background(46,139,87);

if(keyWentDown(UP_ARROW)){
  writeStock(foodS);
  dog.addImage(happyDogImg);
}

  drawSprites();
  //add styles here
textSize(20);
fill(255);
text("Food remaining :"+foodS,150,200);

textSize(15)
text("Note : Press UP_ARROW Key To Feed Jimmy Milk",80,30)
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })
}
