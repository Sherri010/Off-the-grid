
var ground =[[1,1,0,1,1,1],
             [0,1,0,1,0,1],
             [0,1,0,1,1,1],
             [0,1,1,1,1,1],
             [0,0,0,1,1,0],
             [1,1,1,1,0,0]];

///first player : user
//second player :computer
//for player have x and y to work as indxes in grid

$(document).ready(function(){

//CREATING GAME OBJECT

function Game(setting){
  this.board=setting.board;
  this.players=[];
  this.ground=setting.g;
  //this.currentCell = $('#wrapper div:first-child');

}

Game.prototype.init=function(){
  var status;
   for(var i=0 ; i< 6 ; i++){
      for(var j=0 ; j<6 ; j++){
          status = (this.ground[i][j] === 1)? "on":"off";
          this.board.append("<div class='cell "+status+"'></div>");
      }
    }

  console.log("initializing game...")
}

Game.prototype.addPlayers=function(finder){
  // this.players.push(runner);
   this.players.push(finder);
  $($('#wrapper div:first-child')).attr("id",finder.id);

}


function Player(setting){
   this.img=setting.img;
   this.name=setting.name;
   this.id=setting.id;

}
//add action listener on players

Player.prototype.setReady=function(){
        console.log("initializing player...");
        var p=this;
      $('body').keydown(function(e){
        p.repostion(e.which);
    });

}

Player.prototype.repostion=function(key){
 switch(key){
   case 38:
     console.log("up");
     break;
  case 40:
    console.log("down");
    break;
  case 37:
    console.log("left");
    break;
  case 39:
    console.log("right");
    break;
  default:
    break;

 }
}
// I can check my sibilings -
/////////////////////////////////////
var game = new Game({ board:$('#wrapper'), g:ground});
var p1= new Player({img:"super.gif", name:"man", id:"finder" });
game.init();
p1.setReady();
game.addPlayers(p1);

});
