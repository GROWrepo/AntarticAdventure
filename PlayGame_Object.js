function PGObject(stage){
	
	this.intStartX = 297;
	this.intStartY = 300;
	
	this.floatSpeedX = 206/(Math.sqrt(225*225+206*206));
	this.floatSpeedY = 225/(Math.sqrt(225*225+206*206));
	
	this.A_arrObjects = new Array();
	this.AddObject(this.A_arrObjects,"hole");
	this.AddObject(this.A_arrObjects,"null");
	this.AddObject(this.A_arrObjects,"plag");
	
	this.B_arrObjects = new Array();
	this.AddObject(this.B_arrObjects,"hole");
	this.AddObject(this.B_arrObjects,"enemy");
	this.AddObject(this.B_arrObjects,"null");
	
	this.C_arrObjects = new Array();
	this.AddObject(this.C_arrObjects,"hole");
	this.AddObject(this.C_arrObjects,"null");
	this.AddObject(this.C_arrObjects,"enemy");
	
	this.D_arrObjects = new Array();
	this.AddObject(this.D_arrObjects,"null");
	this.AddObject(this.D_arrObjects,"hole");
	this.AddObject(this.D_arrObjects,"plag");
	
	this.E_arrObjects = new Array();
	this.AddObject(this.E_arrObjects,"bighole");
	this.AddObject(this.E_arrObjects,"null");
	this.AddObject(this.E_arrObjects,"null");
	
	this.F_arrObjects = new Array();
	this.AddObject(this.F_arrObjects,"plag");
	this.AddObject(this.F_arrObjects,"bighole");
	this.AddObject(this.F_arrObjects,"null");
	
	this.N_arrObjects = new Array();
	
	this.stage = new PGStage();
	this.stage.SetStage(stage);//stage select
	this.MapSize = this.stage.GetMapSize();
	this.MapIndex = 0;
	
	this.getMap();
	this.interval = 3000;
	
	this.inputFrameSkipper = new FrameSkipper(this.interval);
	this.inputFrameSkipper.Set();
	
	this.isNextMap = false;
	this.isGet=false;
}
PGObject.prototype.AddObject = function (arr, type)
{
	var obj;
	
	if(type == "hole"){
		obj = new SpriteObject(
		resourcePreLoader.GetImage("img/game_obj_hole.png"),
		206,75,5);
		
		obj.SetPosition(this.intStartX,this.intStartY);
		obj.type = type;
	}
	else if(type == "bighole"){
		obj = new SpriteObject(
		resourcePreLoader.GetImage("img/game_obj_bighole.png"),
		412,75,5);
		
		obj.SetPosition(this.intStartX,this.intStartY);
		obj.type = type;
	}
	else if(type == "enemy"){
		obj = new SpriteObject(
		resourcePreLoader.GetImage("img/game_obj_enemy.png"),
		206,75,5);
		
		obj.SetPosition(this.intStartX,this.intStartY);
		obj.type = type;
	}else if(type == "plag"){
		obj = new SpriteObject(
		resourcePreLoader.GetImage("img/game_obj_plag.png"),
		206,75,5);
		
		obj.SetPosition(this.intStartX,this.intStartY);
		obj.type = type;
	}
	else if(type == "null"){
		obj = null;
	}
	arr.push(obj);
};
PGObject.prototype.Render = function ()
{
	var theCanvas = document.getElementById("GameCanvas");
	var Context = theCanvas.getContext("2d");
	
	for(var i = 0; i<3; i++){
		if(this.N_arrObjects[i]==null)//error process
			continue;
		if(this.N_arrObjects[i].type == "plag"){
			if(!this.isGet)
				this.N_arrObjects[i].Render(Context);}
		else
			this.N_arrObjects[i].Render(Context);
	}
};
PGObject.prototype.Update = function ()
{
	var speed = 3.0;//Object speed
	
	if(!this.isNextMap){
	for(var i = 0; i<3; i++){
		
		if(this.N_arrObjects[i]==null)//error process
			continue;
			
		if(this.N_arrObjects[i].GetPosition()>600){//reset
			if(!this.isNextMap){
			this.isNextMap = true;
			this.inputFrameSkipper.SetDelay(this.interval/(playGameState.GAME_SPEED*1.5));
			this.inputFrameSkipper.Set();
			this.isGet=false;
			}		
			continue;
		}
		else if(this.N_arrObjects[i].GetPosition()>493)//4
			this.N_arrObjects[i].Next(4);
		else if(this.N_arrObjects[i].GetPosition()>443)//3
			this.N_arrObjects[i].Next(3);
		else if(this.N_arrObjects[i].GetPosition()>403)//2
			this.N_arrObjects[i].Next(2);
		else if(this.N_arrObjects[i].GetPosition()>343)//1
			this.N_arrObjects[i].Next(1);
		
		if(i == 0)
			this.N_arrObjects[i].Translate(-(this.floatSpeedX*speed*playGameState.GAME_SPEED),(this.floatSpeedY*speed*playGameState.GAME_SPEED));
		else if (i== 1)
			this.N_arrObjects[i].Translate(0,(this.floatSpeedY*speed*playGameState.GAME_SPEED));
		else if (i ==2)
			this.N_arrObjects[i].Translate((this.floatSpeedX*speed*playGameState.GAME_SPEED),(this.floatSpeedY*speed*playGameState.GAME_SPEED));
		}
	}
	
//	debugSystem.Log("LOG",this.inputFrameSkipper.isWork());
	
	if(this.inputFrameSkipper.isWork()){
		this.inputFrameSkipper.Set();
		this.isNextMap = false;
		this.getMap();
		for(var i = 0; i<3; i++){
			if(this.N_arrObjects[i]==null)//error process
				continue;
				
			this.N_arrObjects[i].Next(0);
			this.N_arrObjects[i].SetPosition(this.intStartX,this.intStartY);
		}
	}	
};
PGObject.prototype.getMap = function (){
		var objType;
		
		objType = this.stage.GetMap();
		
		switch(objType){
			case 1:
			this.N_arrObjects = this.A_arrObjects;
			break;
			case 2:
			this.N_arrObjects = this.B_arrObjects;
			break;
			case 3:
			this.N_arrObjects = this.C_arrObjects;
			break;
			case 4:
			this.N_arrObjects = this.D_arrObjects;
			break;
			case 5:
			this.N_arrObjects = this.E_arrObjects;
			break;
			case 6:
			this.N_arrObjects = this.F_arrObjects;
			break;
			case 8://get score

			break;
			case 9:
			break;
			case 10://map
			playGameState.Notification("CHANGE_MAP_A");
			this.getMap();
			break;
			case 11://map
			playGameState.Notification("CHANGE_MAP_B");
			this.getMap();
			break;
			case 12:
			playGameState.Notification("CHANGE_MAP_C");
			this.getMap();
			break;
			case 13:
			playGameState.Notification("CHANGE_MAP_D");
			this.getMap();
			break;
			case 0:
			debugSystem.Log("LOG","End Stage");
			break;
		};	
};
PGObject.prototype.getMapLength = function (){
	return this.stage.GetStagelength();
};
PGObject.prototype.CheckCollision = function (player,idle){
	
	for(var i = 0; i<3; i++){
		var obj = this.N_arrObjects[i];
		
		if(obj == null || obj.currentCount != 4)
			continue;
		
//		debugSystem.Log("LOG",obj.currentCount);
		if(idle == 0 && obj.type == "hole")
		{
			var collisionBox//42~68
			={left :obj.x,top:obj.y+42,right:obj.x+206,bottom:obj.y+68};
			if(IsCollisionRect(player.left,player.right,player.top,player.bottom,collisionBox.left,collisionBox.right,collisionBox.top,collisionBox.bottom))//l r t b
			{
				if(player.left+player.right < collisionBox.left+collisionBox.right){//left Crash
					playGameState.Notification("CRASH_L_ENEMY");}
				else{
					playGameState.Notification("CRASH_R_ENEMY");}	
			}
		}
		else if( obj.type == "enemy"){
			var collisionBox//42~68
			={left :obj.x,top:obj.y,right:obj.x+206,bottom:obj.y+68};
			if(idle == 0 && IsCollisionRect(player.left,player.right,player.top,player.bottom,collisionBox.left,collisionBox.right,collisionBox.top+42,collisionBox.bottom))//l r t b
			{
				if(player.left+player.right < collisionBox.left+collisionBox.right)//left Crash
					playGameState.Notification("CRASH_L_ENEMY");
				else
					playGameState.Notification("CRASH_R_ENEMY");
			}
			if(idle == 1 && IsCollisionRect(player.left,player.right,player.top,player.bottom,collisionBox.left+80,collisionBox.right-80,collisionBox.top+10,collisionBox.bottom-42))
				playGameState.Notification("CRASH_R_ENEMY");
		}
		else if(idle == 0 && obj.type == "bighole"){
			var collisionBox//42~68
			={left :obj.x,top:obj.y+42,right:obj.x+412,bottom:obj.y+68};
			if(IsCollisionRect(player.left,player.right,player.top,player.bottom,collisionBox.left,collisionBox.right-300,collisionBox.top,collisionBox.bottom))//left crash
			{
				playGameState.Notification("CRASH_L_ENEMY");
			}
			else if(IsCollisionRect(player.left,player.right,player.top,player.bottom,collisionBox.left+112,collisionBox.right-112,collisionBox.top,collisionBox.bottom))//center down
			{
				playGameState.Notification("CRASH_BIGHOLE");
			}
			else if(IsCollisionRect(player.left,player.right,player.top,player.bottom,collisionBox.left+300,collisionBox.right,collisionBox.top,collisionBox.bottom))//rigft crash
			{
				playGameState.Notification("CRASH_R_ENEMY");
			}
		}
		else if(idle == 0 && !this.isGet && obj.type == "plag"){
			var collisionBox//42~68
			={left :obj.x+92,top:obj.y+21,right:obj.x+142,bottom:obj.y+68};
			if(IsCollisionRect(player.left,player.right,player.top,player.bottom,collisionBox.left,collisionBox.right,collisionBox.top,collisionBox.bottom)){
				this.isGet=true;
				playGameState.Notification("GET_SCORE");
				soundSystem.PlaySound("sound/game_effect_plag.wav");
			}
		}
	}
};