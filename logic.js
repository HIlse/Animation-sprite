var canvas = document.getElementById('game_canvas');
var ctx = canvas.getContext("2d");

var images = {};

var sources = {
        BGI: 'https://s26.postimg.org/5xvlq2h9l/BGI.png',
        birdImg: 'https://s26.postimg.org/gd6dcq3u1/bird.png',
        groundImg: 'https://s26.postimg.org/ugxn7dlnt/ground.png',
        bot: 'https://s26.postimg.org/wwzgl83qh/bot.png',
        top: 'https://s26.postimg.org/9y7cg1x49/top.png'
      };

loadImages(sources);

var birdOb = new Bird();
var groundOb = new Ground();

var blockOb = new Array();

ctx.drawImage(images["BGI"], 0,0);
for( i = 1; i<=100; i++)
    {
        blockOb[i] = new Block();
        blockOb[i].botY = Math.round(150 + Math.random()*200);
        blockOb[i].topY = blockOb[i].botY - 100-320;
        if(i==1) blockOb[i].X = 400;
        else
        blockOb[i].X = blockOb[i-1].X + 144;
    }

function loadImages(sources) 
{
//        var images = {};
//        var loadedImages = 0;
        var numImages = 0;
        // get num of sources
        for(var src in sources) {
          numImages++;
        }
        for(var src in sources) {
          images[src] = new Image();
          
            
          images[src].src = sources[src];
        }
}

setInterval(function(){Draw()}, 16);

function Draw()
{
    ctx.beginPath();   
    ctx.rect(0,0,1550,900);
    ctx.fillStyle = "white";
    ctx.fill();  
    ctx.drawImage(images["BGI"], 0,0);
    
    for(j = 1; j<=100; j++)
        {
            blockOb[j].drawBlock();
        }
    
    groundOb.drawGround();
    birdOb.drawBird();
    
}

function Bird()
{
    this.sX = 0;
    this.X = 100;
    this.Y = 100;
    this.time = 0;
    this.frame = 0;
    
    this.drawBird = function()
    {
        this.time += 10;
        this.sX = 36*this.frame; 
       
        ctx.drawImage(images["birdImg"],this.sX,0,36,25,this.X,this.Y,36,25);
        
        if(this.time>=60)
            {                
                this.frame++;              
                this.time= 0;
            }
        if(this.frame>2) {this.frame = 0;}
    }
}

function Ground()
{
    this.sX = 0;
    this.time = 0;
    
    this.drawGround = function()
    {
        this.time++;
        this.sX++;
//        if (this.time >= )
//            {
//                this.sX++;
//                this.time = 0;
//            }
        
        ctx.drawImage(images["groundImg"],this.sX,0,288,112,0,400,288,112);
        if(this.sX == 48) this.sX = 0;
        
    }
}

function Block()
{
    this.X = 300;
    
    this.botY = 0;   
        
    this.topY = 0;
    
    this.time = 0;
    
    this.drawBlock = function()
    {
        this.time ++;
        this.X--;
//        if (this.time >= 1)
//            {
//                this.X--;
//                this.time = 0;
//            }
        ctx.drawImage(images["bot"],this.X,this.botY,52,320);
        ctx.drawImage(images["top"],this.X,this.topY,52,320);
    }
    
}
