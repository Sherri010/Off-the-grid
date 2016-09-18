
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
          this.board.append("<div class='cell "+status+"' id='"+i+j+"'></div>");
      }
    }

  console.log("initializing game...")
}

Game.prototype.addPlayers=function(finder){
  // this.players.push(runner);
   this.players.push(finder);
  var elementClassList= $('div:eq(1)').attr('class');
  elementClassList = elementClassList.concat(" "+finder.id);
  $('div:eq(1)').attr('class',elementClassList);
}

/// CREATING OBJECT TO HOLD POSITION DATA FOR EACH MOVE, LIKE A TEMP VAR
function CurrenPosition(p){
   this.x=p.x;
   this.y=p.y;
}


//CREATING PLAYER OBJECT
function Player(setting){
   this.img=setting.img;
   this.name=setting.name;
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
     if(game.ground[p1Current.x-1][p1Current.y] == 1){

         //where player is now
          identifier=p1Current.x.toString()+p1Current.y.toString();
          before =document.getElementById(identifier);
          //where it's going
          p1Current.x-=1
          identifier = p1Current.x.toString()+ (p1Current.y).toString();
          after = document.getElementById(identifier);
          swap_temp =  before.getAttribute('class');
          before.setAttribute('class', swap_temp.slice(0,swap_temp.length-7));
          after.setAttribute('class', after.getAttribute('class')+" "+p1.id);
     }
   else { console.log('blocked');}
     break;
  case 40:
    //  console.log("down");
    if(game.ground[p1Current.x+1][p1Current.y] == 1){

        //where player is now
         identifier=p1Current.x.toString()+p1Current.y.toString();
         before =document.getElementById(identifier);
         //where it's going
         p1Current.x+=1
         identifier = p1Current.x.toString()+ (p1Current.y).toString();
         after = document.getElementById(identifier);
         swap_temp =  before.getAttribute('class');
         before.setAttribute('class', swap_temp.slice(0,swap_temp.length-7));
         after.setAttribute('class', after.getAttribute('class')+" "+p1.id);
    }   else { console.log('blocked');}

    break;
  case 37:
   //  console.log("left");
   if(game.ground[p1Current.x][p1Current.y-1] === 1){

       //where player is now
        identifier=p1Current.x.toString()+p1Current.y.toString();
        before =document.getElementById(identifier);
        //where it's going
        p1Current.y-=1
        identifier = p1Current.x.toString()+ (p1Current.y).toString();
        after = document.getElementById(identifier);
        swap_temp =  before.getAttribute('class');
        before.setAttribute('class', swap_temp.slice(0,swap_temp.length-7));
        after.setAttribute('class', after.getAttribute('class')+" "+p1.id);


   }   else { console.log('blocked');}
    break;
  case 39:
    // console.log("right");
     if(game.ground[p1Current.x][p1Current.y+1] === 1){

        //where player is now
         identifier=p1Current.x.toString()+p1Current.y.toString();
         before =document.getElementById(identifier);
         //where it's going
         p1Current.y+=1
         identifier = p1Current.x.toString()+ (p1Current.y).toString();
         after = document.getElementById(identifier);
         swap_temp =  before.getAttribute('class');
         before.setAttribute('class', swap_temp.slice(0,swap_temp.length-7));
         after.setAttribute('class', after.getAttribute('class')+" "+p1.id);

   }
   else { console.log('blocked');}
    break;
  default:
    break;

 }
}

/////////////////////////////////////
var game = new Game({ board:$('#wrapper'), g:ground});
var p1= new Player({img:"super.gif", name:"man", id:"finder",x:0,y:0 });
var p1Current = new CurrenPosition(p1);

game.init();
p1.setReady(game);
game.addPlayers(p1);

});
