var playGameState;

function MultiPlayGameState(type)
{
	this.backround = resourcePreLoader.GetImage("img/mgame_background.png");
	this.safe = resourcePreLoader.GetImage("img/mgame_obj_safe.png");// 
	
	this.player = new MGRivalPlayer(type);
	this.rival = new MGRivalPlayer(1-type);
	playGameState = this;
	this.BackButton = false;

	gfwSocket.On("msg_in_game",function(msg)
	{
		switch(msg)
		{
			case "LEFT":
			playGameState.rival.Move(0);
			break;
			case "UP":
			playGameState.rival.Move(1);
			break;
			case "RIGHT":
			playGameState.rival.Move(2);
			break;
			case "DOWN":
			playGameState.rival.Move(3);
			break;
			case "TEXT_A":
			playGameState.rival.ShowText(0);
			break;
			case "TEXT_B":
			playGameState.rival.ShowText(1);
			break;
			case "MAKEBULLET":
			playGameState.rival.MakeBullet();
			break;
		};
	});
	gfwSocket.On("result_game",function(result)
	{
		soundSystem.ExitBackgroundMusic();
		playGameState.isGameOver = true;
		switch(result)
		{
			case "WIN":
			playGameState.isWin = true;
			break;
			case "LOSE":
			playGameState.isWin = false;
			break;
		}
	});
	gfwSocket.On("rotaion",function(value)
	{
		playGameState.rival.Rotation(0,value);
	});
	
	this.isGameOver = false;
	this.isReady = true;
	this.isReadyCount = 3;
	this.isWin = null;
	
	this.inputFrameSkipper = new FrameSkipper(1000);
	
}
MultiPlayGameState.prototype.Init = function()
{
	this.BackButton = false;
	this.isGameOver = false;
	this.isReady = true;
	this.isReadyCount = 3;
	this.isWin = null;
	
	soundSystem.PlayBackgroundMusic("sound/mgame_bgm.mp3");
};

MultiPlayGameState.prototype.Render = function()
{
	var theCanvas = document.getElementById("GameCanvas");
	var Context = theCanvas.getContext("2d");

	//bg
	Context.drawImage(this.backround,0,0);
	
	this.player.Render(1);//player
	this.rival.Render(0);
	
	if(this.isReady){
		Context.fillStyle = "#000000";
		Context.font = '45px Arial';
		Context.textBaseline = "top";
		Context.fillText(""+this.isReadyCount,370,200);
	}
	
	if(this.isGameOver){
		
		Context.fillStyle = "#000000";
		Context.font = '45px Arial';
		Context.textBaseline = "top";
		
		if(this.isWin){
			Context.fillText("LOSE",320,200);
		}
		else{
			Context.fillText("WIN",320,200);	
		}

		Context.fillRect(300,450,210,50);//rect

		Context.fillStyle = "#ffffff";
		Context.fillText("GO TITLE",300,450);
		
	}
};
MultiPlayGameState.prototype.Update = function()
{
	if(this.isReady){
	if(this.inputFrameSkipper.isWork()){
		soundSystem.PlaySound("sound/mgame_effect_time.wav");
		this.isReadyCount--;
		if(this.isReadyCount<0)
			this.isReady=false;
	}}
	else{
	if(!this.isGameOver){
	if(inputSystem.isKeyDown(65))//left
	{
		this.player.Move(0);
		gfwSocket.Emit("msg_in_game","LEFT");	
	}
	if(inputSystem.isKeyDown(87))//up
	{
		this.player.Move(1);
		gfwSocket.Emit("msg_in_game","UP");	
	}
	if(inputSystem.isKeyDown(68))//right
	{
		this.player.Move(2);
		gfwSocket.Emit("msg_in_game","RIGHT");	
	}
	if(inputSystem.isKeyDown(83))//down
	{
		this.player.Move(3);
		gfwSocket.Emit("msg_in_game","DOWN");	
	}
	
	if(inputSystem.isKeyDown(49))//chat A type
	{
		this.player.ShowText(0);
		gfwSocket.Emit("msg_in_game","TEXT_A");//A = GO
	}
	if(inputSystem.isKeyDown(50))//chat B type
	{
		this.player.ShowText(1);
		gfwSocket.Emit("msg_in_game","TEXT_B");//B = STOP
	}
	
	this.player.Update(1);
	this.rival.Update(0);
	
	this.player.CheckCollision(this.rival.collisionBox);
	}else{
		if(inputSystem.mouseX > 300 && inputSystem.mouseY > 450
		&& inputSystem.mouseX < 600 && inputSystem.mouseY < 520 )
		{
			this.BackButton = true;
		}
		else
			this.BackButton = false;	
	}
	}
};
MultiPlayGameState.prototype.onMouseDown = function ()
{
	if(!this.isGameOver && this.player.MakeBullet()){
		gfwSocket.Emit("msg_in_game","MAKEBULLET");
	}
	if(this.isGameOver && this.BackButton){
		ChangeGameState(new TitleState());
	}
};
MultiPlayGameState.prototype.Notification = function(msg, value)
{
	switch(msg)
	{
		case "CRASH":
		gfwSocket.Emit("msg_in_game","GAME_OVER");
		break;
		case "ROTATION":
		gfwSocket.Emit("rotaion",value);
		break;
	}	
};