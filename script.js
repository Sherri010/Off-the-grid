window.focus();
var ground =[[1,1,0,1,1,1],
             [0,1,0,1,0,1],
             [0,1,0,1,1,1],
             [0,1,1,1,1,1],
             [0,0,0,1,1,0],
             [1,1,1,1,0,0]];

///first player : user
//second player :computer
//for player have x and y to work as indxes in grid
var cellsToEat=0;
for(var i=0 ;i<ground.length;i++){
  ground[i].forEach(function(cell){
  cellsToEat+=   (cell === 1)?  1:0;
  });
}


$(document).ready(function(){

var interval;
//CREATING GAME OBJECT

function Game(setting){
  this.board=setting.board;
  this.players=[];
  this.ground=setting.g;
  this.cellsToEat=setting.cte;
  //this.currentCell = $('#wrapper div:first-child');

}

Game.prototype.init=function(){
  var status;
   for(var i=0 ; i< 6 ; i++){
      for(var j=0 ; j<6 ; j++){
          status = (this.ground[i][j] === 1)? "on":"off";
          this.board.append("<div class='cell "+status+"' id='"+i+j+"'></div>");
      }
    }

  console.log("initializing game...")
}

Game.prototype.addPlayers=function(player){

  this.players.push(player);
  var el=document.getElementsByClassName('cell')[ player.x*this.ground[0].length+player.y];
  var elementClassList= $(el).attr('class');
  elementClassList = elementClassList.concat(" "+player.id);
  $(el).attr('class',elementClassList);

}
////////////////////////////////////////////////////////////////////////////////////////////
/// CREATING OBJECT TO HOLD POSITION DATA FOR EACH MOVE-can be used for both player and devils
function CurrenPosition(p){
   this.x=p.x;
   this.y=p.y;
}
////////////////////////////////////////////////////////////////////////////////////////////
// CREATING DEVILS
function Devil(setting){
  this.name=setting.name;
  this.id=setting.id;
  this.x=setting.x;
  this.y=setting.y;
  this.nextMove=null;
}

Devil.prototype.move=function(player){
  //1: right    2: left
  //3: up       4: down
  var d=this;
function guessMove(){
    d.nextMove = Math.floor(Math.random() * 4) + 1 ;
if(d.nextMove == 1 && game.ground[d.x][d.y+1] == 1){
        //where player is now
         identifier=d.x.toString()+d.y.toString();
         before =document.getElementById(identifier);
         //where it's going
         d.y+=1
         identifier = d.x.toString()+ (d.y).toString();
         after = document.getElementById(identifier);
         swap_temp =  before.getAttribute('class');
         before.setAttribute('class', swap_temp.slice(0,swap_temp.length-5));
         after.setAttribute('class', after.getAttribute('class')+" "+d.id);
    }


   if(d.nextMove == 2 && game.ground[d.x][d.y-1] == 1){
           //where player is now
            identifier=d.x.toString()+d.y.toString();
            before =document.getElementById(identifier);
            //where it's going
            d.y-=1
            identifier = d.x.toString()+ (d.y).toString();
            after = document.getElementById(identifier);
            swap_temp =  before.getAttribute('class');
            before.setAttribute('class', swap_temp.slice(0,swap_temp.length-5));
            after.setAttribute('class', after.getAttribute('class')+" "+d.id);
       }

      if(d.nextMove == 3 && game.ground[d.x-1][d.y] == 1){
              //where player is now
               identifier=d.x.toString()+d.y.toString();
               before =document.getElementById(identifier);
               //where it's going
               d.x-=1
               identifier = d.x.toString()+ (d.y).toString();
               after = document.getElementById(identifier);
               swap_temp =  before.getAttribute('class');
               before.setAttribute('class', swap_temp.slice(0,swap_temp.length-5));
               after.setAttribute('class', after.getAttribute('class')+" "+d.id);
          }

         if(d.nextMove == 4 && game.ground[d.x+1][d.y] == 1){
                 //where player is now
                  identifier=d.x.toString()+d.y.toString();
                  before =document.getElementById(identifier);
                  //where it's going
                  d.x+=1
                  identifier = d.x.toString()+ (d.y).toString();
                  after = document.getElementById(identifier);
                  swap_temp =  before.getAttribute('class');
                  before.setAttribute('class', swap_temp.slice(0,swap_temp.length-5));
                  after.setAttribute('class', after.getAttribute('class')+" "+d.id);
         }

         if(player.x === d.x && player.y === d.y) {
          $("#wrapper").hide();
          $('body').append("<div id='winner'> Game Over</div>");
          clearInterval(interval);
         $('body').off('keydown'); }


}
        interval =  setInterval(guessMove,200);

}


///////////////////////////////////////////////////////////////////////////////////////////

//CREATING PLAYER OBJECT
function Player(setting){
   this.name=setting.name;
   this.cellsEaten =1;//the initial cell is count as eaten
   this.id=setting.id;
   this.x=setting.x;
   this.y=setting.y;

}

//ADDING EVENTLISTERNER TO PLAYER
Player.prototype.setReady=function(){
        console.log("initializing player...");
        var p=this;
      $('body').keydown(function(e){
        p.repostion(e.which);
    });
    console.log('firing event listener...');
}

Player.prototype.repostion=function(key){
var before,after,identifier,swap_temp;
 switch(key){
   case 38:
       //console.log("up");
     if(game.ground[this.x-1][this.y] == 1){
         //where player is now
          identifier=this.x.toString()+this.y.toString();
          before =document.getElementById(identifier);
          //where it's going
          this.x-=1
          identifier = this.x.toString()+ (this.y).toString();
          after = document.getElementById(identifier);
          swap_temp =  before.getAttribute('class');
           if(after.getAttribute('class').split(' ').indexOf('eaten') == -1)
               this.cellsEaten = this.cellsEaten + 1;
          before.setAttribute('class', "cell eaten");
          after.setAttribute('class', after.getAttribute('class')+" "+this.id);
     }
   else { console.log('blocked');}
     break;
  case 40:
    //  console.log("down");
    if(game.ground[this.x+1][this.y] == 1){

        //where player is now
         identifier=this.x.toString()+this.y.toString();
         before =document.getElementById(identifier);
         //where it's going
         this.x+=1
         identifier = this.x.toString()+ (this.y).toString();
         after = document.getElementById(identifier);
         swap_temp =  before.getAttribute('class');
          if(after.getAttribute('class').split(' ').indexOf('eaten') == -1)
              this.cellsEaten=this.cellsEaten + 1;
         before.setAttribute('class',"cell eaten");
         after.setAttribute('class', after.getAttribute('class')+" "+this.id);
    }   else { console.log('blocked');}

    break;
  case 37:
   //  console.log("left");
   if(game.ground[this.x][this.y-1] === 1){

       //where player is now
        identifier=this.x.toString()+this.y.toString();
        before =document.getElementById(identifier);
        //where it's going
        this.y-=1
        identifier = this.x.toString()+ (this.y).toString();
        after = document.getElementById(identifier);
        swap_temp =  before.getAttribute('class');
       if(after.getAttribute('class').split(' ').indexOf('eaten') == -1)
            this.cellsEaten=this.cellsEaten + 1;
        before.setAttribute('class', "cell eaten");
        after.setAttribute('class', after.getAttribute('class')+" "+this.id);


   }   else { console.log('blocked');}
    break;
  case 39:
    // console.log("right");
     if(game.ground[this.x][this.y+1] === 1){

        //where player is now
         identifier=this.x.toString()+this.y.toString();
         before =document.getElementById(identifier);
         //where it's going
         this.y+=1
         identifier = this.x.toString()+ (this.y).toString();
         after = document.getElementById(identifier);
         swap_temp =  before.getAttribute('class');
         if(after.getAttribute('class').split(' ').indexOf('eaten') == -1)
            this.cellsEaten=this.cellsEaten + 1;
         before.setAttribute('class', "cell eaten");
         after.setAttribute('class', after.getAttribute('class')+" "+this.id);

   }
    else { console.log('blocked');}
    break;
  default:
    break;

 }
   console.log("eaten: "+ this.cellsEaten)

   if(this.cellsEaten === game.cellsToEat) { alert(" You Win! ");}
}

/////////////////////////////////////
var game = new Game({ board:$('#wrapper'), g:ground, cte:cellsToEat});
var p1= new Player({img:"super.gif", name:"man", id:"finder",x:0,y:0 });
var d1=new Devil({name:"lusi",x:5,y:3,id:"devil"});
console.log(game)
console.log(p1)
game.init();
p1.setReady(game);
game.addPlayers(p1);
game.addPlayers(d1);
d1.move(p1);
});
