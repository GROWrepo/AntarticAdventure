var playGameState;
function PlayGameState(stage)
{
	this.GAME_SPEED = 1.5;
	
	this.background = new PGBackground();
	this.player = new PGPlayer();
	this.object = new PGObject(stage);
	this.Stage = stage;
	
	this.Score = 0;
	this.Stagelength = this.object.getMapLength();
	this.Time = 70;
	
	this.interval = 1000;
	this.inputFrameSkipper = new FrameSkipper(this.interval);
	this.inputFrameSkipper2 = new FrameSkipper(300);
	this.isGameStop=false;
	
	
	this.waitInput= false;
	
	playGameState = this;
}

PlayGameState.prototype.Init = function()
{
	soundSystem.PlayBackgroundMusic("sound/stage1_bgm.mp3");
};
PlayGameState.prototype.Render = function()
{
	var theCanvas = document.getElementById("GameCanvas");
	var Context = theCanvas.getContext("2d");
	
	//Back bg draw
	this.background.RenderLayerBack();
	
	//Front bg draw
	this.background.RenderLayerFront();

	this.object.Render();	
	this.player.Render();
	
	//text filed x : 0 ~ 800 / y : 0 ~ 130
	Context.fillStyle = "#ffffff";
	Context.font = '28px Arial';
	Context.textBaseline = "top";

	Context.fillText("TIME - "+this.Time,80,70);
	
	Context.fillText("HI - "+this.Score,300,40);
	Context.fillText("REST "+this.Stagelength+"km",300,70);
	
	Context.fillText("STAGE - "+this.Stage,550,40);
	
	Context.font = '25px Arial';	
	Context.fillText("SPEED ",550,70);
	for(var i = 0 ; i<((this.GAME_SPEED-0.8)/0.2);i++)
		Context.fillText("■",650+(15*i),68);
	
	if(this.isGameStop){
		Context.save();
		Context.fillStyle = "#000000";
		Context.fillRect(350,300,120,30);//rect
		Context.restore();
		Context.fillText("PAUSE",365,300);
	}
};
PlayGameState.prototype.Update = function()
{
	var tic = this.inputFrameSkipper.isWork();
	
	if(!this.isGameStop){
		if(tic){
			if(this.Time<1)
				this.Notification("TIME_OVER");
			else
				this.Time--;
			//this.inputFrameSkipper.SetDelay(this.interval/GAME_SPEED);
		}
		if(this.inputFrameSkipper2.isWork()){
			if(this.Stagelength<6){
				this.Notification("GOAL");
				this.Stagelength = 0;
			}
			this.Stagelength -= Math.floor(2.2*this.GAME_SPEED);
		}		
		this.background.Update();
		this.object.Update();
		this.player.Update();
		this.object.CheckCollision(this.player.collisionBox,this.player.idle);
	}
	
	if(inputSystem.isKeyDown(13))//enter
	{
		debugSystem.Log("LOG","ENTER");
		if(!this.waitInput){
			soundSystem.PlaySound("sound/game_effect_pause.wav");
			this.isGameStop = !this.isGameStop;
			this.inputFrameSkipper.ReSet();//0
			this.waitInput = true;
			soundSystem.StopBackgroundMusic();
		}
	}
	
	if(this.waitInput && tic){
		this.waitInput= false;
	}
	
	
};
PlayGameState.prototype.Notification = function(msg)
{
	switch(msg)
	{
		case "CHANGE_MAP_A":
			this.background.ChangeBG(0);
		break;
		case "CHANGE_MAP_B":
			this.background.ChangeBG(1);
		break;
		case "CHANGE_MAP_C":
			this.background.ChangeBG(2);
		break;
		case "CHANGE_MAP_D":
			this.background.ChangeBG(3);
		break;
		case "GET_SCORE":
			this.Score+= 50;
		break;
		case "TIME_OVER":
			soundSystem.StopBackgroundMusic();
			soundSystem.PlaySound("sound/game_bgm_lose.ogg");
			ChangeGameState(new TransitionFadeOut(this,new TitleState,1.8));
		break;
		case "CRASH_L_ENEMY":
			this.player.Crash(1);
		break;
		case "CRASH_R_ENEMY":
			this.player.Crash(0);
		break;
		case "CRASH_BIGHOLE":
			this.player.Down();
		break;
		case "GOAL":
			soundSystem.StopBackgroundMusic();
			soundSystem.PlaySound("sound/game_bgm_win.ogg");
			ChangeGameState(new TransitionFadeOut(this,new CreditState,1.6));
		break;
	};
};
