function CreditState()
{
	this.imgBackground = resourcePreLoader.GetImage("img/credit_background.jpg");
	this.sprplayer = new SpriteAnimation(
		resourcePreLoader.GetImage("img/game_player_move.png"),
		95,84,4,6);
	this.sprplayer.SetPosition( 670, 150);

	this.BackButton = false;

	this.plag = false;
	this.y = 550;
	return this;
}
CreditState.prototype.Render = function(){
	var theCanvas = document.getElementById("GameCanvas");
	var Context = theCanvas.getContext("2d");
	
	//draw background
	Context.drawImage(this.imgBackground, 0, 0);
	
	Context.fillStyle = "#ffffff";
	Context.font = '28px Arial';
	Context.textBaseline = "top";

	if(this.plag){
	Context.fillText("Thanks for Play.",80,this.y+150);
	Context.fillText("This is made by HTML5 & Canvas",80,this.y+230);
	Context.fillText("I don't want 'Bug Report'",80,this.y+270);
	Context.fillText("E-Mail : keicoon15@gmail.com",80,this.y+320);
	Context.fillText("Bye.. Bye..",80,this.y+390);

	}else{
	if(this.y+200 > 0 &&this.y+200 <600)
	Context.fillText("Graphic : Nintendo",300,this.y+200);
	if(this.y+300 > 0 &&this.y+300 <600)
	Context.fillText("Sound   : google",300,this.y+300);
	if(this.y+400 > 0 &&this.y+400 <600)
	Context.fillText("Logic   : me..",300,this.y+400);
	if(this.y+500 > 0 &&this.y+500 <600)
	Context.fillText("Made    : Garuya",300,this.y+500);
	}
	
	this.sprplayer.Render(Context);
	Context.font = '35px Arial';
	Context.fillText("Back",680,50);
};
CreditState.prototype.Update = function()
{	
	var delay = 3.0;
	
	this.sprplayer.Update();
	
	if(this.plag){
		if(this.y >0)
		this.y -= delay;
		else
		this.y = 0;
	}
	else{
		if(this.y >-500)
			this.y -= delay;
		else{
			this.y = 550;
			this.plag = true;
		}
	}
	if(inputSystem.mouseX > 680 && inputSystem.mouseY > 50
		&& inputSystem.mouseX < 750 && inputSystem.mouseY < 80 )
		{
			this.BackButton = true;
		}
		else
			this.BackButton = false;
};
CreditState.prototype.onMouseDown = function ()
{
	if(this.BackButton){
		soundSystem.StopBackgroundMusic();
		ChangeGameState(new TitleState());
	}
};
CreditState.prototype.Init = function()
{
	soundSystem.PlayBackgroundMusic("sound/credit_bgm.mp3");
};
