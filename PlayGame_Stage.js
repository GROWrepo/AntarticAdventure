function PGStage()
{
	
	this.Stage1 = [1,4,2,1,3,5,1,4,2,12,6,3,6,1,4,10,3,2,5,1,4,11,3,2,10,5,6,1,4,3,2,5,6,7,8,1,1,4,2,1,3,5,1,4,2,6,3,6,1];	
	this.Stage2 = [1,4,2,1,3,5,1,4,2,12,6,3,6,1,4,10,3,2,5,1,4,11,3,2,10,5,6,1,4,3,2,5,6,7,8,1,1,4,2,1,3,5,1,4,2,6,3,6,1];
	this.Stage3 = [1,4,2,1,3,5,1,4,2,12,6,3,6,1,4,10,3,2,5,1,4,11,3,2,10,5,6,1,4,3,2,5,6,7,8,1,1,4,2,1,3,5,1,4,2,6,3,6,1];
	
	this.Stage1length = 700;
	this.Stage2length = 800;
	this.Stage3length = 900;
	
	this.nIndex = 0;
	this.nStage = new Array();
	this.nStagelength;
}

PGStage.prototype.SetStage = function (stage){
	
	switch(stage){
		case 1:
		this.nStage = this.Stage1;
		this.nStagelength = this.Stage1length;
		break;
		case 2:
		this.nStage = this.Stage2;
		this.nStagelength = this.Stage2length;
		break;
		case 3:
		this.nStage = this.Stage3;
		this.nStagelength = this.Stage3length;
		break;
	};
};

PGStage.prototype.GetMap = function (){
	if(this.nIndex<this.nStage.length)
		return this.nStage[this.nIndex++];
	else
		return 0;
};
PGStage.prototype.GetMapSize = function (){
	return this.nStage.length;
};
PGStage.prototype.GetStagelength = function (){
	return this.nStagelength;
};