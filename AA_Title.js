function TitleState()
{
	this.imgBackground = resourcePreLoader.GetImage("img/title_background.png");
	this.flagButtonLevel1 = false;
	this.imgButtonLevel1Off = resourcePreLoader.GetImage("img/title_level1_off.png");
	this.imgButtonLevel1On = resourcePreLoader.GetImage("img/title_level1_on.png");
	this.flagButtonLevel2 = false;
	this.imgButtonLevel2Off = resourcePreLoader.GetImage("img/title_level2_off.png");
	this.imgButtonLevel2On = resourcePreLoader.GetImage("img/title_level2_on.png");
	this.flagButtonLevel3 = false;
	this.imgButtonLevel3Off = resourcePreLoader.GetImage("img/title_level3_off.png");
	this.imgButtonLevel3On = resourcePreLoader.GetImage("img/title_level3_on.png");	
	this.flagButtonMulty = false;
	this.imgButtonMultyOff = resourcePreLoader.GetImage("img/title_multy_off.png");
	this.imgButtonMultyOn = resourcePreLoader.GetImage("img/title_multy_on.png");
	
	
	this.inputFrameSkipper = new FrameSkipper(300);
	this.flag=false;
	this.InGame=false;
	return this;
}
TitleState.prototype.Render = function()
{
	var theCanvas = document.getElementById("GameCanvas");
	var Context = theCanvas.getContext("2d");
	
	//draw background
	Context.drawImage(this.imgBackground, 0, 0);
	
	if(!firstLoading){
		
	if(this.InGame && this.flagButtonLevel1){//level 1
		if(this.inputFrameSkipper.isWork())
			this.flag = !this.flag;
			
			if(this.flag)
				Context.drawImage(this.imgButtonLevel1On,345,390);
			
	}else{
	if(this.flagButtonLevel1)
		Context.drawImage(this.imgButtonLevel1On,345,390);
	else
		Context.drawImage(this.imgButtonLevel1Off,345,390);
	}
	
	if(this.InGame && this.flagButtonLevel2){//level 2
		if(this.inputFrameSkipper.isWork())
			this.flag = !this.flag;
			
			if(this.flag)
				Context.drawImage(this.imgButtonLevel2On,345,390);

	}else{
	if(this.flagButtonLevel2)	
		Context.drawImage(this.imgButtonLevel2On,345,445);
	else
		Context.drawImage(this.imgButtonLevel2Off,345,445);
	}
	
	if(this.InGame && this.flagButtonLevel3){//level 3
		if(this.inputFrameSkipper.isWork())
			this.flag = !this.flag;
			
			if(this.flag)
				Context.drawImage(this.imgButtonLevel3On,345,390);

	}else{	
	if(this.flagButtonLevel3)
		Context.drawImage(this.imgButtonLevel3On,345,500);
	else
		Context.drawImage(this.imgButtonLevel3Off,345,500);
	}
		
	if(this.flagButtonMulty)
		Context.drawImage(this.imgButtonMultyOn,500,500);
	else
		Context.drawImage(this.imgButtonMultyOff,500,500);
	
	}
};

TitleState.prototype.UpdateUI = function()
{
	var offSet = 16;
	
	if(inputSystem.mouseX > 345 && inputSystem.mouseY > 390 + offSet
		&& inputSystem.mouseX < 345 + 132 && inputSystem.mouseY < 390 + 55 - offSet)
		{
			if(this.flagButtonLevel1 == false)
				this.flagButtonLevel1 = true;
		}
		else
			this.flagButtonLevel1 = false;
		
	if(inputSystem.mouseX > 345 && inputSystem.mouseY > 445 + offSet
		&& inputSystem.mouseX < 345 + 132 && inputSystem.mouseY < 445 + 55 - offSet)
		{
			if(this.flagButtonLevel2 == false)
				this.flagButtonLevel2 = true;
		}
		else
			this.flagButtonLevel2 = false;
			
	if(inputSystem.mouseX > 345 && inputSystem.mouseY > 500 + offSet
		&& inputSystem.mouseX < 345 + 132 && inputSystem.mouseY < 500 + 55 - offSet)
		{
			if(this.flagButtonLevel3 == false)
				this.flagButtonLevel3 = true;
		}
		else
			this.flagButtonLevel3 = false;
			
	if(inputSystem.mouseX > 500 && inputSystem.mouseY > 500 + offSet
		&& inputSystem.mouseX < 500 + 132 && inputSystem.mouseY < 500 + 55 - offSet)
		{
			if(this.flagButtonMulty == false)
				this.flagButtonMulty = true;
		}
		else
			this.flagButtonMulty = false;		
};

TitleState.prototype.onMouseDown = function ()
{
	if(!this.InGame){
		
	if(this.flagButtonLevel1){
		this.InGame=true;
		this.flag=true;
		
		soundSystem.PlaySound("sound/title_start_on.mp3");
		setTimeout(function(){
			ChangeGameState(new PlayGameState(1));
			}
		,5000);
	}
	if(this.flagButtonLevel2){
		this.InGame=true;
		this.flag=true;
		
		soundSystem.PlaySound("sound/title_start_on.mp3");
		setTimeout(function(){
			ChangeGameState(new PlayGameState(2));
			}
		,5000);
	}
	if(this.flagButtonLevel3){
		this.InGame=true;
		this.flag=true;
		
		soundSystem.PlaySound("sound/title_start_on.mp3");
		setTimeout(function(){
			ChangeGameState(new PlayGameState(3));
			}
		,5000);
	}
	if(this.flagButtonMulty){
		ChangeGameState(new WaitMultiPlayGameState());
	}
	
	}
};
TitleState.prototype.Update = function()
{	
	if(!this.InGame)
		this.UpdateUI();
};

TitleState.prototype.Init = function()
{
	firstLoading = !firstLoading;
	
	if(firstLoading){
		ChangeGameState(new TransitionUp(this,this,0,600.0,8.0));	
	}
};
