
window.addEventListener("mousedown", onMouseDown, false);
window.addEventListener("mouseup", onMouseUp, false);

var GAME_FPS;
var game_state = new LoadingState();
var after_loading_state;

function onMouseDown(e)
{
	if(game_state.onMouseDown != undefined)
		game_state.onMouseDown(e);
}
function onMouseUp(e)
{
	if(game_state.onMouseUp != undefined)
		game_state.onMouseUp(e);
}
function ChangeGameState(nextGameState)
{
	if(nextGameState.Init == undefined)
		return;
	if(nextGameState.Update == undefined)
		return;
	if(nextGameState.Render == undefined)
		return;
		
	game_state = nextGameState;
	
	game_state.Init();
}
function Update()
{
	//timer update
	timerSystem.Update();
	
	//update
	game_state.Update();
	
	//use debugMode
	debugSystem.UseDebugMode();
}

function Render()
{
	//draw
	var theCanvas = document.getElementById("GameCanvas");
	var Context = theCanvas.getContext("2d");
	
	Context.fillStyle = "#000000";
	Context.fillRect(0,0,800,600);

	game_state.Render();
	
	if(debugSystem.debugMode)
	{
	//FPS
	Context.fillStyle = "#ffffff";
	Context.font = '15px Arial';
	Context.textBaseline = "top";
	Context.fillText("fps : " + frameCounter.Lastfps, 10, 10);
	}
}

function gameLoop()
{
	Update();
	Render();
	
	frameCounter.countFrame();
}