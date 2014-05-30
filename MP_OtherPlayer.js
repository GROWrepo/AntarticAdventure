 function MGRivalPlayer(player)
 {
 	this.sprPlayer;
	this.point = resourcePreLoader.GetImage("img/mgame_obj_point.png");//
	this.x;
	this.y = 300;
	this.rotation;
	
	this.player = player;
	
	this.centralx;//central
	this.centraly;
	
	this.isChat = false;
	this.ChatType = null;

	this.isReady = true;
	
	this.leftBound = 0;
	this.rightBound = 800-(95/2);
	this.topBound = 0;
	this.bottomBound = 600-(84/2);
	
	this.collisionBox
	={left: this.x,top : this.y,right : this.x+95,bottom : this.y+84};
	

	this.inputFrameSkipper = new FrameSkipper(3000);
	this.inputFrameSkipper.Set();//stop
	
	this.inputFrameSkipper2 = new FrameSkipper(2000);//2second
	this.inputFrameSkipper2.Set();//stop
	
	this.Init();
	
	this.bullet = new Array();
 }
MGRivalPlayer.prototype.Init = function(){
	if(this.player == 0){//player
	this.sprPlayer = new SpriteAnimation(
		resourcePreLoader.GetImage("img/mgame_player_move.png"),
		95/2,84/2,4,6);
	this.x = 100;
	}
	else if(this.player == 1){//rival
	this.sprPlayer = new SpriteAnimation(
		resourcePreLoader.GetImage("img/mgame_rival_move.png"),
		95/2,84/2,4,6);
	this.x = 500;
	}
	
	this.Invalid();
};
MGRivalPlayer.prototype.Render = function(type){
 	var theCanvas = document.getElementById("GameCanvas");
	var Context = theCanvas.getContext("2d");
	
	for(var i = 0; i<this.bullet.length; i++)
		this.bullet[i].Render();
		
	if(type)//only player
		Context.drawImage(this.point,this.x+16,this.y-24);
	
	Context.save();
	Context.translate(this.centralx, this.centraly);
	Context.rotate(-this.rotation);
	this.sprPlayer.SetPosition( -(95/4) ,-(84/4));
	this.sprPlayer.Render(Context);
	Context.restore();
		
	if(this.isChat){
		Context.fillStyle = "#000000";
		Context.font = '20px Arial';
		Context.textBaseline = "top";	
		if(this.ChatType == 0){
			Context.fillText("GO",this.x,this.y-25);
		}
		else if(this.ChatType == 1){
			Context.fillText("STOP",this.x,this.y-25);
		}
	}
	
};

MGRivalPlayer.prototype.Update = function(type){
	
	if(type)//player
	{
	this.Rotation(type);
	
	if(this.isChat && this.inputFrameSkipper.isWork()){//timer on
		this.isChat = false;
		this.inputFrameSkipper.Set();//stop
	}
	}
	
	if( !this.isReady && this.inputFrameSkipper2.isWork()){
		this.inputFrameSkipper2.Set();
		this.isReady = true;
	}
	for(var i = 0; i<this.bullet.length; i++){
		if(!this.bullet[i].Update())
			this.DeleteBullet(i);
	}
			
	this.sprPlayer.Update();
};
MGRivalPlayer.prototype.Rotation = function (type,value){
	if(type){
	var delta_x = inputSystem.mouseX-this.centralx;
	var delta_y = inputSystem.mouseY-this.centraly;
	
	this.rotation = Math.atan2(-delta_x,-delta_y);//*(180/Math.PI);
	
	playGameState.Notification("ROTATION",this.rotation);
	}else{
	this.rotation = value;//*(180/Math.PI);	
	}
};
MGRivalPlayer.prototype.Move = function(value){
	
	var Speed = 6.0;
	
	//l u r d
	if(value == 0){
		if(this.leftBound<this.x)
			this.x -= Speed;
		else
			this.x = this.leftBound;
			
		this.Invalid();
	}
	
	if(value == 1){
		if(this.topBound<this.y)
			this.y -= Speed;
		else
			this.y = this.topBound;
			
		this.Invalid();
	}
	
	if(value == 2){
		if(this.rightBound>this.x)
			this.x += Speed;
		else
			this.x = this.rightBound;
			
		this.Invalid();
	}
	
	if(value == 3){
		if(this.bottomBound>this.y)
			this.y += Speed;
		else
			this.y = this.bottomBound;
			
		this.Invalid();
	}
};
MGRivalPlayer.prototype.ShowText = function(type){
	
	if(!this.isChat){
		this.isChat=true;
		this.ChatType = type;
		this.inputFrameSkipper.Set();
	}
};
MGRivalPlayer.prototype.MakeBullet = function(){

	if( this.isReady && this.bullet.length<5){
		
	soundSystem.PlaySound("sound/mgame_effect_shot.wav");
	
	this.inputFrameSkipper2.Set();//start
	this.isReady = false;
	var obj;
	var Speed = 3.0;
	
	var rotation = -this.rotation - (Math.PI/2);
	
	var x_s = Speed * Math.cos(rotation);
	var y_s = Speed * Math.sin(rotation);
	
	obj = new Bullet(this.centralx,this.centraly,x_s,y_s,this.rotation);			
	this.bullet.push(obj);
	return true;
	}else
		return false;
};
MGRivalPlayer.prototype.DeleteBullet = function(index){
		
	this.bullet.splice(index,1);//delete motion
	
};
MGRivalPlayer.prototype.Invalid = function()
{
	this.sprPlayer.SetPosition( this.x, this.y);
	this.collisionBox
	={left: this.x,top : this.y,right : this.x+95,bottom : this.y+84};
	
	this.centralx = this.x+95/4;
	this.centraly = this.y+84/4;
	
};
MGRivalPlayer.prototype.CheckCollision = function(player)
{
	var offset = 4;
	
	for(var i = 0; i<this.bullet.length; i++){
		var obj = this.bullet[i];
	
		var collisionBox//42~68
			={left :obj.x+3 - offset ,top:obj.y + 6 - offset,right:obj.x+ 3 + offset,bottom:obj.y + 6 + offset};
		
		if(IsCollisionRect(player.left,player.right,player.top,player.bottom,collisionBox.left,collisionBox.right,collisionBox.top,collisionBox.bottom)){//l r t b
			soundSystem.PlaySound("sound/mgame_effect_crash.wav");
			playGameState.Notification("CRASH");
		}
	}
};

function Bullet(x,y,x_s,y_s,rotation){
	
	this.img = resourcePreLoader.GetImage("img/mgame_obj_bullet.png");
	this.x = x;
	this.y = y;
	
	this.width = 6;
	this.height = 13;
	
	this.x_s = x_s;
	this.y_s = y_s;
	
	this.rotation = rotation;
}
Bullet.prototype.Render = function(){
	var theCanvas = document.getElementById("GameCanvas");
	var Context = theCanvas.getContext("2d");
	
	Context.save();
	
	Context.translate( this.x + this.width/2, this.y + this.height/2);
	Context.rotate(-this.rotation);

	Context.drawImage(this.img,-(this.width/2),-(this.height/2));
	
	Context.restore();
};
Bullet.prototype.Update = function(){
	
	this.x += this.x_s;
	if(this.x<0 || this.x>800)
		return false;
		
	this.y += this.y_s;
	if(this.y<0 || this.y >600)
		return false;
	
	return true;
};