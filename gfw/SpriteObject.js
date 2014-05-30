function SpriteObject(img, width, height, totalFrameCount)
{
	this.x = 0;
	this.y = 0;
	this.img = img;
	
	this.width = width;
	this.height = height;
	
	this.totalFrameCount = totalFrameCount;
	
	this.currentCount = 0;
	this.type;
	
	return this;
}

SpriteObject.prototype.Render = function (context)
{
	context.drawImage(this.img,
		this.width * this.currentCount, 0,
		this.width, this.height,
		this.x, this.y,
		this.width, this.height);
};

SpriteObject.prototype.Next = function(index)
{
	//this.currentCount++;
	
	//if(this.currentCount>this.totalFrameCount)
	//	this.currentCount = 0;
	this.currentCount = index;
};
SpriteObject.prototype.GetTotalFrameCount = function()
{
	return this.totalFrameCount;
};
SpriteObject.prototype.Translate = function(x, y)
{
	this.x += x;
	this.y += y;
};

SpriteObject.prototype.SetPosition = function(x, y)
{
	this.x = x;
	this.y = y;
};

SpriteObject.prototype.GetPosition = function(){
	return this.y;
};