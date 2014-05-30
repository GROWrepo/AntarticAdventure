function Timer()
{
	this.nowFrame = 0;
	timerSystem.timers.push(this);
	
	this.isUpdate = true;
	
	return this;
}
Timer.prototype.Reset = function()
{
	this.nowFrame = 0;
};

Timer.prototype.Set = function()//on off
{
	this.isUpdate = !this.isUpdate;
};

function TimerSystem()
{
	this.timers = new Array();
	return this;
}
TimerSystem.prototype.Update = function ()
{
	for(var i = 0; i< this.timers.length; i++)
	{
		if(this.timers[i].isUpdate)
			this.timers[i].nowFrame += 1000 / GAME_FPS;
		
	}
};

var timerSystem = new TimerSystem();
