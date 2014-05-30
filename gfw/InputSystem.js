window.addEventListener("mousemove", onMouseMove, false);
window.addEventListener("keydown", onKeyDown, false);
window.addEventListener("keyup", onKeyUp, false);

function InputSystem()
{
	//used mouse
	this.mouseX = 0;
	this.mouseY = 0;
	//used key
	this.isKeyPressed = [];
	
	return this;
}
//key
InputSystem.prototype.isKeyDown = function(keyCode)
{
	if(this.isKeyPressed[keyCode] == true)
		return true;
	else
		return false;
};
//mouse
InputSystem.prototype.getMousePositionX = function()
{
	return this.mouseX;
};
InputSystem.prototype.getMousePositionY = function()
{
	return this.mouseY;
};

function onMouseMove(e)
{
	var theCanvas = document.getElementById("GameCanvas");
	
	inputSystem.mouseX = e.clientX - theCanvas.offsetLeft;
	inputSystem.mouseY = e.clientY - theCanvas.offsetTop;
}
function onKeyDown(e)
{//change true
	inputSystem.isKeyPressed[e.keyCode] = true;
}
function onKeyUp(e)
{//change false
	inputSystem.isKeyPressed[e.keyCode] = false;
}

var inputSystem = new InputSystem();