function TransitionFadeOut(prevState, nextState, delay)
{
	this.prevState = prevState;
	this.nextState = nextState;
	this.delay = delay;
	
	this.alpha = 0;
}

TransitionFadeOut.prototype.Render = function()
{
	//paint
	var theCanvas = document.getElementById("GameCanvas");
	var context = theCanvas.getContext("2d");
	
	this.prevState.Render();
	
	var oldAlpha = context.globalAlpha;
	var oldFillStyle = context.fillStyle;
	
	context.globalAlpha = this.alpha/255;
	context.fillStyle = "#000000";
	context.fillRect(0, 0, 800, 600);
	context.globalAlpha = oldAlpha;
	context.fillStyle = oldFillStyle;
};

TransitionFadeOut.prototype.Update = function()
{
	this.alpha += this.delay;
	if(this.alpha >= 255)
	{
		ChangeGameState(this.nextState);
	}
};
TransitionFadeOut.prototype.Init = function(){};

function TransitionFadeIn(prevState, nextState, delay)
{
	this.prevState = prevState;
	this.nextState = nextState;
	this.delay = delay;
	
	this.alpha = 255;
}

TransitionFadeIn.prototype.Render = function()
{
	//paint
	var theCanvas = document.getElementById("GameCanvas");
	var context = theCanvas.getContext("2d");
	
	this.prevState.Render();
	
	var oldAlpha = context.globalAlpha;
	var oldFillStyle = context.fillStyle;
	
	context.globalAlpha = this.alpha/255;
	context.fillStyle = "#000000";
	context.fillRect(0, 0, 800, 600);
	context.globalAlpha = oldAlpha;
	context.fillStyle = oldFillStyle;
};

TransitionFadeIn.prototype.Update = function()
{
	this.alpha -= this.delay;
	if(this.alpha <= 0)
	{
		ChangeGameState(this.nextState);
	}
};
TransitionFadeIn.prototype.Init = function(){};

function TransitionUp(prevState, nextState, lastPosition,startPosition,delay)
{
	this.prevState = prevState;
	this.nextState = nextState;
	this.startPosition = startPosition;
	this.lastPosition= lastPosition;
	
	this.delay = delay;
}
TransitionUp.prototype.Render = function()
{
	//paint
	var theCanvas = document.getElementById("GameCanvas");
	var Context = theCanvas.getContext("2d");
	
	debugSystem.Log("LOG","FadeUp");
	
	Context.save();
	Context.translate(0,this.startPosition);
	this.prevState.Render();
	Context.restore();
};
TransitionUp.prototype.Update = function()
{
	if(this.startPosition <= this.lastPosition)
	{
		ChangeGameState(this.nextState);
	}
	else
	{
		this.startPosition -= this.delay;
	}
};
TransitionUp.prototype.Init = function(){};