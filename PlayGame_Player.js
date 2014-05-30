function PGPlayer()
{
	this.sprplayer = new SpriteAnimation(
		resourcePreLoader.GetImage("img/game_player_move.png"),
		95,84,4,6);
	
	this.x = 400-47;
	this.y = 0;
	
	this.leftBound = 90;
	this.rightBound = 800-90-95;
	
	this.animationBase = 470;//+10
	this.animationJumpOffset = 0;
	this.animationMoveOffset = 36;//Y position
	this.animationDwonIOffset = 66;
	this.animationDownMOffset = 40;

	this.y = this.animationBase + this.animationMoveOffset;
		
	//0 = move, 1 = jump, 2 = crash_left, 3 = crash_right, 4 = down_idle, 5 = down_move
	this.idle = 0;
	this.count = 0;
	this.crashOffset = 10;
	this.stopKey = false;
	this.upState = false;
	
	this.upStack = 0;
	this.downStack = 0;
	this.upStateStack = 0;
	
	this.collisionBox
	={left: this.x,top : this.y+64,right : this.x+95,bottom : this.y+84};
	this.Invalid();
	
	this.inputFrameSkipper = new FrameSkipper(1000);
	this.inputFrameSkipper.Set();//stop
}

PGPlayer.prototype.Render = function(){
	
	var theCanvas = document.getElementById("GameCanvas");
	var Context = theCanvas.getContext("2d");
	
	this.sprplayer.Render(Context);
};
PGPlayer.prototype.Update = function(){
	
	var Speed = 4.0;
	if(this.inputFrameSkipper.isWork()){
		this.Move();
		this.inputFrameSkipper.Set();//stop
	}
	
	if(this.sprplayer.Update()){
		if(this.idle == 1){//move
			this.Move();
		}else if(this.idle == 2 ||this.idle == 3){
			soundSystem.PlaySound("sound/game_effect_crash.wav");
			playGameState.GAME_SPEED = 0.9;
			this.count++;
			this.sprplayer.SetFPS(this.crashOffset+2*this.count);
			if(this.count >= 2){
				this.Move();
				this.count = 0;
			}
		}
		else if(this.idle == 5 && !this.upState){
			this.upStateStack=0;
			this.Down();
		}
	}
	else{		
	if(this.idle == 0 && inputSystem.isKeyDown(88))//x key
		this.Jump();
	else if(this.idle == 2){
		if(this.leftBound<this.x)
			this.x -= (3.0+this.count);
		else
			this.x = this.leftBound;
			
		this.Invalid();}
	else if(this.idle == 3){
		if(this.rightBound>this.x)
			this.x += (3.0+this.count);
		else
			this.x = this.rightBound;
			
		this.Invalid();	
	}
	else if(this.idle == 4 && inputSystem.isKeyDown(88)){
			this.DownMove();
	}
	else if(this.idle == 5 && inputSystem.isKeyDown(88)){
		if(this.upStateStack >= 3){
			playGameState.GAME_SPEED = 1.0;
			this.Shild();
		}else{
			this.upStateStack++;
		}	
	}
	}
	
	if(!this.stopKey){
	if(inputSystem.isKeyDown(37))//left
	{
		if(this.leftBound<this.x)
			this.x -= Speed;
		else
			this.x = this.leftBound;
			
		this.Invalid();
	}
	if(inputSystem.isKeyDown(38))//up
	{
		if(this.upStack >= 5){
		if(playGameState.GAME_SPEED< 2.5)
			playGameState.GAME_SPEED += 0.1;
		else
			playGameState.GAME_SPEED = 2.5;
		
		this.upStack = 0;
		}
		else
			this.upStack++;
	}
	if(inputSystem.isKeyDown(39))//right
	{
		if(this.rightBound>this.x)
			this.x += Speed;
		else
			this.x = this.rightBound;
			
		this.Invalid();	
	}
	if(inputSystem.isKeyDown(40))//down
	{
		if(this.downStack >= 5){
		if(playGameState.GAME_SPEED> 1.0)
			playGameState.GAME_SPEED -= 0.1;
		else
			playGameState.GAME_SPEED = 1.0;
			
		this.downStack = 0;
		}
		else
			this.downStack++;
	}
	}
};
PGPlayer.prototype.Move = function()
{
	this.stopKey=false;
	this.sprplayer.ChangeImage(
		resourcePreLoader.GetImage("img/game_player_move.png"),
			95,84,4,6);
	this.y = this.animationBase + this.animationMoveOffset;
	this.Invalid();
	this.idle = 0;
};
PGPlayer.prototype.Shild = function()
{
	this.stopKey=false;
	this.sprplayer.ChangeImage(
		resourcePreLoader.GetImage("img/game_player_move.png"),
			95,84,4,6);
	this.y = this.animationBase + this.animationMoveOffset;
	this.Invalid();
	this.idle = 6;
	this.inputFrameSkipper.Set();//start
};

PGPlayer.prototype.Jump = function()
{
	soundSystem.PlaySound("sound/game_effect_jump.wav");
	
	this.sprplayer.ChangeImage(
			resourcePreLoader.GetImage("img/game_player_jump.png"),
			95,120,9,12);
		this.y = this.animationBase + this.animationJumpOffset;
		this.Invalid();
		this.idle = 1;
};
PGPlayer.prototype.Crash = function(type)
{	
	soundSystem.PlaySound("sound/game_effect_crash.wav");
				
	playGameState.GAME_SPEED=0;//zero
	this.stopKey=true;
	if(type){
		this.sprplayer.ChangeImage(
			resourcePreLoader.GetImage("img/game_player_crash_left.png"),
			95,120,7,10);
		this.y = this.animationBase + this.animationJumpOffset;
		this.Invalid();
		this.idle = 2;
	}
	else{
		this.sprplayer.ChangeImage(
			resourcePreLoader.GetImage("img/game_player_crash_right.png"),
			95,120,7,10);
		this.y = this.animationBase + this.animationJumpOffset;
		this.Invalid();
		this.idle = 3;
	}
};
PGPlayer.prototype.Down = function()
{
	soundSystem.PlaySound("sound/game_effect_down.wav");
	
	this.stopKey=true;
	playGameState.GAME_SPEED=0;//zero
	
		this.sprplayer.ChangeImage(
			resourcePreLoader.GetImage("img/game_player_down_idle.png"),
			95,54,1,1);
		this.y = this.animationBase + this.animationDwonIOffset;
		this.Invalid();
		this.idle = 4;
};
PGPlayer.prototype.DownMove = function()
{
	this.stopKey=true;
	playGameState.GAME_SPEED=0;//zero
	
		this.sprplayer.ChangeImage(
			resourcePreLoader.GetImage("img/game_player_down_move.png"),
			95,80,7,10);
		this.y = this.animationBase + this.animationDownMOffset;
		this.Invalid();
		this.idle = 5;
};
//PGPlyaer.prototype.Init = function(){};
PGPlayer.prototype.Invalid = function()
{
	this.sprplayer.SetPosition( this.x, this.y);
	this.collisionBox
	={left: this.x,top : this.y+64,right : this.x+95,bottom : this.y+84};
};
