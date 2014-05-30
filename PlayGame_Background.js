function PGBackground()
{
	this.imgBackgroundLeft = new SpriteAnimation(
		resourcePreLoader.GetImage("img/game_bg_left.png"),
		355,80,2,3);
	this.imgBackgroundRight = new SpriteAnimation(
		resourcePreLoader.GetImage("img/game_bg_right.png"),
		355,80,2,3);
		
	this.imgBackgroundLeft.SetPosition(0,300);
	this.imgBackgroundRight.SetPosition(445,300);
	
	this.imgBackgroundSky = resourcePreLoader.GetImage("img/game_bg_sky.png");
	
	this.inputFrameSkipper = new FrameSkipper(2000);
	
	//cloud
	this.cloud = new PGCloud();
}

PGBackground.prototype.RenderLayerFront = function()
{
	var theCanvas = document.getElementById("GameCanvas");
	var Context = theCanvas.getContext("2d");
};
PGBackground.prototype.RenderLayerBack = function ()
{
	var theCanvas = document.getElementById("GameCanvas");
	var Context = theCanvas.getContext("2d");
	
	Context.save();
	Context.fillStyle = "#ffffff";
	Context.fillRect(0,300,800,300);	
	Context.restore();
		
	this.imgBackgroundLeft.Render(Context);
	this.imgBackgroundRight.Render(Context);
	Context.drawImage(this.imgBackgroundSky,0,130);
	
	for(var i = 0; i<this.cloud.arrObjects.length; i++)
	{
		this.cloud.arrObjects[i].Render(Context);
	}
};

PGBackground.prototype.Update = function ()
{
	var speed = 1.2;//cloud speed
	
	this.imgBackgroundLeft.UpdateFPS(playGameState.GAME_SPEED);
	this.imgBackgroundRight.UpdateFPS(playGameState.GAME_SPEED);	
	
//	debugSystem.Log("LOG",this.cloud.arrObjects.length);
	for(var i = 0; i<this.cloud.arrObjects.length; i++)
	{
		if(this.cloud.arrObjects[i].GetPosition()<130)
			this.cloud.Reset(i);
		else if(this.cloud.arrObjects[i].GetPosition()<170)
			this.cloud.arrObjects[i].ChangeImg(this.cloud.imgBackgroundCloud_b);
		else if(this.cloud.arrObjects[i].GetPosition()<210)
			this.cloud.arrObjects[i].ChangeImg(this.cloud.imgBackgroundCloud_m);
		
		if(i==0)//left
			this.cloud.arrObjects[i].Translate(-(speed*5/4*playGameState.GAME_SPEED),-(speed*3/4*playGameState.GAME_SPEED));
		else if (i==1)//right
			this.cloud.arrObjects[i].Translate(+(speed*5/4*playGameState.GAME_SPEED),-(speed*3/4*playGameState.GAME_SPEED));
		else if(i == 2)//left
			this.cloud.arrObjects[i].Translate(-(speed*4/3*playGameState.GAME_SPEED),-(speed*4/5*playGameState.GAME_SPEED));
		else if(i == 3)//right
			this.cloud.arrObjects[i].Translate(+(speed*4/3*playGameState.GAME_SPEED),-(speed*4/5*playGameState.GAME_SPEED));
	}
	
	if(this.inputFrameSkipper.isWork()){
		this.cloud.AddObject();
	}
};
PGBackground.prototype.ChangeBG = function (index){
	
	if(index == 1){
	this.imgBackgroundLeft = new SpriteAnimation(
		resourcePreLoader.GetImage("img/game_bg_left_ice.png"),
		355,241,3,4);
	this.imgBackgroundRight = new SpriteAnimation(
		resourcePreLoader.GetImage("img/game_bg_right_ice.png"),
		355,241,3,4);
		
	this.imgBackgroundLeft.SetPosition(0,300);
	this.imgBackgroundRight.SetPosition(445,300);
	}else if(index == 0){
	this.imgBackgroundLeft = new SpriteAnimation(
		resourcePreLoader.GetImage("img/game_bg_left.png"),
		355,80,2,3);
	this.imgBackgroundRight = new SpriteAnimation(
		resourcePreLoader.GetImage("img/game_bg_right.png"),
		355,80,2,3);
		
	this.imgBackgroundLeft.SetPosition(0,300);
	this.imgBackgroundRight.SetPosition(445,300);
	}else if(index ==2){
	this.imgBackgroundLeft = new SpriteAnimation(
		resourcePreLoader.GetImage("img/game_bg_left_ice.png"),
		355,241,3,4);
	this.imgBackgroundRight = new SpriteAnimation(
		resourcePreLoader.GetImage("img/game_bg_right.png"),
		355,80,2,3);
		
	this.imgBackgroundLeft.SetPosition(0,300);
	this.imgBackgroundRight.SetPosition(445,300);
	}else if(index == 3){
		debugSystem.Log("LOG","OFF");
	this.imgBackgroundLeft = new SpriteAnimation(
		resourcePreLoader.GetImage("img/game_bg_left.png"),
		355,80,2,3);
	this.imgBackgroundRight = new SpriteAnimation(
		resourcePreLoader.GetImage("img/game_bg_right_ice.png"),
		355,241,3,4);
		
	this.imgBackgroundLeft.SetPosition(0,300);
	this.imgBackgroundRight.SetPosition(445,300);
	}
};

function PGCloud()
{
	this.imgBackgroundCloud_s = resourcePreLoader.GetImage("img/game_bg_cloud_s.png");
	this.imgBackgroundCloud_m = resourcePreLoader.GetImage("img/game_bg_cloud_m.png");
	this.imgBackgroundCloud_b = resourcePreLoader.GetImage("img/game_bg_cloud_b.png");
	//start Position
	this.intCloudX = 400;
	this.intCloudY = 280;
	
	this.arrObjects = new Array();
	this.MaxObject = 4;// just 4 cloud
	this.CurrentObjects = 0;
}
PGCloud.prototype.AddObject = function (){

	if(this.CurrentObjects<this.MaxObject){
		var cloud = new GraphicObject(this.imgBackgroundCloud_s);
		if(this.CurrentObjects==0)
			cloud.SetPosition(this.intCloudX-50,this.intCloudY);
		else if(this.CurrentObjects==1)
			cloud.SetPosition(this.intCloudX+50,this.intCloudY);
		else if(this.CurrentObjects==2)
			cloud.SetPosition(this.intCloudX-100,this.intCloudY);
		else if(this.CurrentObjects==3)
			cloud.SetPosition(this.intCloudX+100,this.intCloudY);

		this.arrObjects.push(cloud);
		this.CurrentObjects++;
	}		
};

PGCloud.prototype.Reset = function (index){
	
	this.arrObjects[index].ChangeImg(this.imgBackgroundCloud_s);
	
	if(index==0)
		this.arrObjects[index].SetPosition(this.intCloudX-RandomNextInt(0,50),this.intCloudY);
	else if(index==1)
		this.arrObjects[index].SetPosition(this.intCloudX+RandomNextInt(0,50),this.intCloudY);
	else if(index==2)
		this.arrObjects[index].SetPosition(this.intCloudX-RandomNextInt(50,100),this.intCloudY);
	else if(index==3)
		this.arrObjects[index].SetPosition(this.intCloudX+RandomNextInt(50,100),this.intCloudY);

};