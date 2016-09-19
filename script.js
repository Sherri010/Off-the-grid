window.focus();
var ground =[[1,1,0,1,1,1,0,1,1,1],
             [0,1,0,1,0,1,0,1,1,0],
             [0,1,0,1,1,1,0,1,0,0],
             [0,1,1,1,1,1,1,1,1,0],
             [0,0,0,1,1,0,1,1,1,1],
             [1,1,1,1,0,0,0,0,1,1]];

///first player : user
//second player :computer
//for player have x and y to work as indxes in grid
var cellsToEat=0;
for(var i=0 ;i<ground.length;i++){
  ground[i].forEach(function(cell){
  cellsToEat+= (cell === 1)?  1:0;
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
   for(var i=0 ; i< this.ground.length ; i++){
      for(var j=0 ; j< this.ground[0].length; j++){
          status = (this.ground[i][j] === 1)? "on":"off";
          this.board.append("<div class='cell "+status+"' id='"+i+j+"'></div>");
      }
    }

  console.log("initializing game...")
}

Game.prototype.addPlayers=function(player){

  this.players.push(player);
  var el=document.getElementsByClassName('cell')[ (player.x * this.ground[0].length) + player.y];

  var elementClassList= $(el).attr('class');  console.log("element"+ elementClassList)
   elementClassList = elementClassList.concat(" "+player.id);
  $(el).attr('class',elementClassList);

}


Game.prototype.announce= function(winner){
  $("#wrapper").hide();
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
    console.log(d.nextMove)
    switch(d.nextMove){
      case 1:
          if( game.ground[d.x][d.y+1] === 1){
        //where player is now
         identifier=d.x.toString()+d.y.toString();
         before =document.getElementById(identifier);
         //where it's going
         d.y=d.y+1
         identifier = d.x.toString()+ (d.y).toString();
         after = document.getElementById(identifier);
         swap_temp =  before.getAttribute('class');
         before.setAttribute('class', swap_temp.slice(0,swap_temp.length-5));
         after.setAttribute('class', after.getAttribute('class')+" "+d.id);
    }
    break;

   case 2:
       if(game.ground[d.x][d.y-1] === 1){
           //where player is now
            identifier=d.x.toString()+d.y.toString();
            before =document.getElementById(identifier);
            //where it's going
            d.y=d.y-1
            identifier = d.x.toString()+ (d.y).toString();
            after = document.getElementById(identifier);
            swap_temp =  before.getAttribute('class');
            before.setAttribute('class', swap_temp.slice(0,swap_temp.length-5));
            after.setAttribute('class', after.getAttribute('class')+" "+d.id);
       }
    break;
    case 3:

      if( game.ground[d.x-1][d.y] === 1){
              //where player is now
               identifier=d.x.toString()+d.y.toString();
               before =document.getElementById(identifier);
               //where it's going
               d.x=d.x-1
               identifier = d.x.toString()+ (d.y).toString();
               after = document.getElementById(identifier);
               swap_temp =  before.getAttribute('class');
               before.setAttribute('class', swap_temp.slice(0,swap_temp.length-5));
               after.setAttribute('class', after.getAttribute('class')+" "+d.id);
          }
          break;

      case 4:
         if(game.ground[d.x+1][d.y] === 1){
                 //where player is now
                  identifier=d.x.toString()+d.y.toString();
                  before =document.getElementById(identifier);
                  //where it's going
                  d.x=d.x+1;
                  identifier = d.x.toString()+ (d.y).toString();
                  after = document.getElementById(identifier);
                  swap_temp =  before.getAttribute('class');
                  before.setAttribute('class', swap_temp.slice(0,swap_temp.length-5));
                  after.setAttribute('class', after.getAttribute('class')+" "+d.id);
         }
      break;
      default:
       break;
     }
         if(player.x === d.x && player.y === d.y) {
           game.announce(d);
         }


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

   if(this.cellsEaten === game.cellsToEat) { game.announce(this);}
}

/////////////////////////////////////
var game = new Game({ board:$('#wrapper'), g:ground, cte:cellsToEat});
var p1= new Player({img:"super.gif", name:"pacman", id:"finder",x:0,y:0 });
var d1=new Devil({name:"lucifer",x:3,y:4,id:"devil"});
console.log(game)
console.log(p1)
game.init();
p1.setReady(game);
game.addPlayers(p1);
game.addPlayers(d1);
d1.move(p1);
});
