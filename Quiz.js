class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    //write code here to hide question elements
        question.hide();
    //write code to change the background color here
    background("Yellow");
    //write code to show a heading for showing the result of Quiz
    fill("blue");
    textSize(30);
    text("result" ,350,20);
    text("-----------------------",350,3);
    
    //call getContestantInfo( ) here
    Contestant.getPlayerInfo();
    
    //write condition to check if contestantInfor is not undefined
    if( allContestants !==undefined){
      fill("Blue");
      textSize(20);
     text("NOTE: contestant who answered correct are highlighted in green colour",130,230);
     
     }
    //write code to add a note here
      for( var plr in allContestants){
         //write code to highlight contest who answered correctly
        var correctanswer="2";
        if(correctanswer===allContestants[plr].answer)
          fill("Green");
        
        else
          fill("red");
        
        yPosition +=30;
        textSize(20);
        text(allContestants[plr].name +":" + allContestants[plr].answer,330,yPosition);
      }
    
  }

}
