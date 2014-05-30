function FrameSkipper(delay)
{
	this.timer = new Timer();
	this.delay = delay;
}

FrameSkipper.prototype.isWork = function ()
{
	if(this.timer.nowFrame > this.delay)
	{
		this.timer.Reset();
		return true;
	}
	return false;
};
FrameSkipper.prototype.Set = function ()
{
	this.timer.Set();
};
FrameSkipper.prototype.SetDelay = function (delay)
{
	this.delay = delay;
};
FrameSkipper.prototype.ReSet = function (delay)
{
	this.timer.Reset();
};