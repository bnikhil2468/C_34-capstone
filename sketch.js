const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var fruit_con;
var fruit_con_2;
var fruit_con_3;
var rope3;

var star1
var star2

var star_score;
var star_score1
var star_score2
var star_count = 0
var star_img;
var bg_img;
var food;
var rabbit;

var airblower;
var button,button2,button3;
var bunny;
var blink,eat,sad;
var mute_btn;

var fr;

var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');
  star_img = loadImage("star.png")
  
  star_empty = loadAnimation('empty.png')
  star_score1 = loadAnimation('one_star.png')
  star_score2 = loadAnimation('stars.png')

  bk_song = loadSound('sound1.mp3');
  sad_sound = loadSound("sad.wav")
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  air = loadSound('air.wav');

  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");


  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() 
{
  createCanvas(500,700);
  frameRate(80);

  bk_song.play();
  bk_song.setVolume(0.5);

  engine = Engine.create();
  world = engine.world;

  star1 = createSprite(245,65);
  star1.addImage(star_img);
  star1.scale = 0.02
  
  star2 = createSprite(50,335);
  star2.addImage(star_img);
  star2.scale = 0.02

  star_score = createSprite(55,25)
  star_score.addAnimation('empty',star_empty) 
  star_score.addAnimation('one',star_score1)
  star_score.addAnimation('two',star_score2)
  star_score.changeAnimation('empty')
  star_score.scale=0.2
  //btn 1
  button = createImg('cut_btn.png');
  button.position(80,90);
  button.size(50,50);
  button.mouseClicked(drop);

   //btn 2
   button2 = createImg('cut_btn.png');
   button2.position(380,90);
   button2.size(50,50);
   button2.mouseClicked(drop2);
  
   airblower = createImg("baloon2.png")
   airblower.position(225,300)
   airblower.size(100,100)
   airblower.mouseClicked(airblow)

   rope = new Rope(7,{x:100,y:90});
   rope2 = new Rope(7,{x:400,y:90});


  mute_btn = createImg('mute.png');
  mute_btn.position(width-50,20);
  mute_btn.size(50,50);
  mute_btn.mouseClicked(mute);
  
  ground = new Ground(250,height,width,20);
  blink.frameDelay = 20;
  eat.frameDelay = 20;

  bunny = createSprite(120,620,100,100);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');

  
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con_2 = new Link(rope2,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0,width,height);

  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

  rope.show();
  rope2.show();

  Engine.update(engine);
  ground.show();

  drawSprites();

  if(collide(fruit,bunny,80)==true)
  {
    World.remove(engine.world,fruit);
    fruit = null;
    bunny.changeAnimation('eating');
    eating_sound.play();
  }

  if(collide(fruit,star1,20)==true)
  {
    star1.visible=false
    star1=null;
    star_count+=1
    console.log(star_count)
  }

  if(collide(fruit,star2,20)==true)
  {
    star2.visible=false
    star2=null;
    star_count+=1
    console.log(star_count)
  }
  if (star_count==1) {
    star_score.changeAnimation('one')
  } else if(star_count>=2) {
    star_score.changeAnimation('two')
  }
  if(fruit!=null && fruit.position.y>=650)
  {
    bunny.changeAnimation('crying');
    bk_song.stop();
    sad_sound.play();
    fruit=null;
   }
  
}

function drop()
{
  cut_sound.play();
  rope.break();
  fruit_con.dettach();
  fruit_con = null; 
}

function drop2()
{
  cut_sound.play();
  rope2.break();
  fruit_con_2.dettach();
  fruit_con_2 = null;
}

function collide(body,sprite,check_dist)
{
  if(body!=null&&sprite != null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=check_dist)
            {
               return true; 
            }
            else{
              return false;
            }
         }
}


function mute()
{
  if(bk_song.isPlaying())
     {
      bk_song.stop();
     }
     else{
      bk_song.play();
     }
}

function airblow(){
  Matter.Body.applyForce(fruit,{x:0,y:0},{x:0,y:-0.05})
  air.play()
}