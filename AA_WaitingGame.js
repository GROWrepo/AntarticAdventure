function WaitMultiPlayGameState()
{
	gfwSocket.On("start_game",function (msg)
	{
		soundSystem.ExitBackgroundMusic();
		if(msg == "L")
			ChangeGameState(new MultiPlayGameState(0));
		else if(msg == "R")
			ChangeGameState(new MultiPlayGameState(1));
	});
	
	this.inputFrameSkipper = new FrameSkipper(1000);
	this.length = 0;
}
WaitMultiPlayGameState.prototype.Init = function()
{
	this.length = 0;
	soundSystem.PlayBackgroundMusic("sound/wait_bgm.mp3");
	gfwSocket.Emit("want_game");
};
WaitMultiPlayGameState.prototype.Render = function()
{
	var theCanvas = document.getElementById("GameCanvas");
	var Context = theCanvas.getContext("2d");
	
	Context.fillStyle = "#ffffff";
	Context.font = '35px Arial';
	Context.textBaseline = "top";
	Context.fillText("Waiting",300,250);
	
	for(var i =0; i<this.length;i++)
		Context.fillText(".",420+i*15,250);
};
WaitMultiPlayGameState.prototype.Update = function()
{
	if(this.inputFrameSkipper.isWork()){
		this.length++;
		if(this.length>5)
			this.length = 0;
	}
};
