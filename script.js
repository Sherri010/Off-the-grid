window.focus();
var ground =[[1,1,0,1,1,1,0,1,1,1],
             [0,1,0,1,0,1,0,1,1,0],
             [0,1,0,1,1,1,0,1,0,0],
             [0,1,1,1,1,1,1,1,1,0],
             [0,0,0,1,1,0,1,1,1,1],
             [1,1,1,1,0,0,0,0,1,1]];
var Arrows = {
  left: 37 ,
  up : 38 ,
  right : 39 ,
  down : 40

}
///first player : user
//second player :computer
//for player have x and y to work as indxes in grid
var cellsToEat=0;
for(var i=0 ;i<ground.length;i++){
  ground[i].forEach(function(cell){
  cellsToEat+= (cell === 1)?  1:0;
  });
}

console.log('has to catch: '+cellsToEat);

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
  if($('#winner')){$('body').children('#winner').remove();}
  this.board.show();
   for(var i=0 ; i< this.ground.length ; i++){
      for(var j=0 ; j< this.ground[0].length; j++){
          status = (this.ground[i][j] === 1)? "on":"off";
          this.board.append("<div class='cell "+status+"' id='"+i+j+"'></div>");
      }
    }
  $('#reset').show();
  console.log("initializing game...");
}

Game.prototype.addPlayers=function(player){

  this.players.push(player);
  var el=document.getElementsByClassName('cell')[ (player.x * this.ground[0].length) + player.y];

  var elementClassList= $(el).attr('class');  console.log("element"+ elementClassList)
   elementClassList = elementClassList.concat(" "+player.id);
  $(el).attr('class',elementClassList);

}


Game.prototype.announce = function(winner){
  this.board.hide();
   var msg = " <div id='winner'>Winner Is <span id='yellow'>"+ winner.name +"</span></div>";
  $('body').append(msg);
  clearInterval(interval);
 $('body').off('keydown');

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

    //where player is now
     identifier=d.x.toString()+d.y.toString();
     before =document.getElementById(identifier);

    switch(d.nextMove){
      case 1:

          if(d.y+1 < game.ground[0].length && game.ground[d.x][d.y+1] === 1){

              d.y=d.y+1;
          }
          break;

      case 2:

         if(d.y-1 > -1 && game.ground[d.x][d.y-1] === 1){

               d.y=d.y-1;
          }
          break;
     case 3:
        if(d.x-1 > -1 && game.ground[d.x-1][d.y] === 1){
               d.x=d.x-1;
          }
          break;

      case 4:

         if(d.x+1 <game.ground.length && game.ground[d.x+1][d.y] === 1){

              d.x=d.x+1;
         }
        break;

      default:
        break;
     }

         identifier = d.x.toString()+ d.y.toString();
         after = document.getElementById(identifier);
         swap_temp =  before.getAttribute('class');
         before.setAttribute('class', swap_temp.slice(0,swap_temp.length-'devil'.length));
         after.setAttribute('class', after.getAttribute('class')+" "+d.id);

         if(player.x === d.x && player.y === d.y) {
             game.announce(d);
         }

}
        interval =  setInterval(guessMove,200);

}

Devil.prototype.reset = function(setting){
  this.x=setting.x;
  this.y=setting.y;
  this.nextMove=null;

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
var before,after=null,identifier,swap_temp;
var keys=[37,38,39,40];
identifier=this.x.toString()+this.y.toString();
before =document.getElementById(identifier);

 switch(key){
   case Arrows.up:
       //console.log("up");
     if( this.x-1 > -1 && game.ground[this.x-1][this.y] === 1){
          this.x= this.x-1;
          identifier = this.x.toString()+(this.y).toString();
          after = document.getElementById(identifier);
     }else {console.log('block');}
     break;
  case Arrows.down:
    //  console.log("down");
    if(this.x+1 <game.ground.length && game.ground[this.x+1][this.y] === 1){
         this.x= this.x+1;
         identifier = this.x.toString()+(this.y).toString();
         after = document.getElementById(identifier);
    }else {console.log('block');}
    break;
  case Arrows.left:
   //  console.log("left");
   if( this.y-1 > -1 && game.ground[this.x][this.y-1] === 1){
        this.y= this.y - 1;
        identifier = this.x.toString()+(this.y).toString();
        after = document.getElementById(identifier);
   }else {console.log('block');}
    break;
  case Arrows.right:
    // console.log("right");
     if(this.y+1 < game.ground[0].length && game.ground[this.x][this.y+1] === 1){
        this.y= this.y+1;
        identifier = this.x.toString()+(this.y).toString();
        after = document.getElementById(identifier);
   }else {console.log('block');}

    break;
  default:
    break;
 }

if(after != null){
 swap_temp =  before.getAttribute('class');
  if( after.getAttribute('class').split(' ').indexOf('eaten') === -1 ){
      this.cellsEaten = this.cellsEaten + 1;
      console.log(this.cellsEaten);
    }
 before.setAttribute('class', "cell eaten");
 after.setAttribute('class', after.getAttribute('class')+" "+this.id);
 }
   //console.log("eaten: "+ this.cellsEaten)

   if(this.cellsEaten === game.cellsToEat) {game.announce(this);}
}

Player.prototype.reset = function(setting){
   this.cellsEaten =1
   this.x=setting.x;
   this.y=setting.y;

}


/////////////////////////////////////
var game = new Game({ board:$('#wrapper'), g:ground, cte:cellsToEat});
var p1= new Player({img:"super.gif", name:"pacman", id:"finder",x:0,y:0 });
var d1=new Devil({name:"ghost",x:3,y:4,id:"devil"});
console.log(game)
console.log(p1)
game.init();
$("#reset").on('click',function(){
   p1.reset({x:0,y:0});
   d1.reset({x:3,y:4});
   $('#wrapper').html('');
   clearInterval(interval);
   game.init();
   p1.setReady(game);
   game.addPlayers(p1);
   game.addPlayers(d1);
   d1.move(p1)
   console.log("reseting players...");
});
p1.setReady(game);
game.addPlayers(p1);
game.addPlayers(d1);
d1.move(p1);
});
