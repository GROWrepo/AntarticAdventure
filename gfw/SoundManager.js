function SoundSystem()
{
	this.isLoadComplete = false;
	this.nowResourceLoadedCount = 0;//currunt loading num
	this.intAllResourceCount = 0;//all of loading num
	this.volume = 1;//volume size
	this.arrSounds = new Array();//nested Sound
	this.backgroundMusic = undefined;//bgm
	
	return this;
}

SoundSystem.prototype.AddSound = function(fileName, resourceCount, volume)
{
	var SOUND_RESOURCE_MAX = 8;
	
	if(resourceCount == undefined)
		resourceCount = SOUND_RESOURCE_MAX;
	

	if(volume == undefined)
		volume = this.volume;

	for(var i = 0; i <resourceCount; i++)
	{
		var soundMusic = new Audio();
		soundMusic.src = fileName;
		soundMusic.volume = volume;
		soundMusic.isPlayed = false;
		soundMusic.addEventListener("canplaythrough", onLoadSoundComplete, false);
		soundMusic.addEventListener("ended", function()
		{
			if(window.chrome) this.load();
			this.pause();
		}, false);
		
		document.body.appendChild(soundMusic);
		
		this.arrSounds.push({name: fileName, sound: soundMusic, isPlayed: false});
		this.intAllResourceCount++;
	}
};

SoundSystem.prototype.PlaySound = function(fileName)
{
	//sound play
	for(var i = 0; i < this.arrSounds.length; i++)
	{
		if(this.arrSounds[i].name == fileName)
		{
			if(this.arrSounds[i].sound.ended == true || this.arrSounds[i].sound.isPlayed == false)
			{
				if(this.arrSounds[i].sound.paused)
				{
//					this.arrSounds[i].sound.volume = isVolume; // not used
					this.arrSounds[i].sound.play();
					this.arrSounds[i].isPlayed = true;
					break;
				}
			}
		}
	}
};

SoundSystem.prototype.PlayBackgroundMusic = function(fileName)
{
	if(this.backgroundMusic)//if now bgm playing
	{
		this.backgroundMusic.sound.pause();
		this.backgroundMusic.isPlayed = false;
		this.backgroundMusic = undefined;
	}
	for(var i = 0;i<this.arrSounds.length; i++)
	{
		if(this.arrSounds[i].name == fileName)
		{
			var backgroundMusic= this.arrSounds[i];
			backgroundMusic.sound.pause();//first stop
			if(window.crome) backgroundMusic.sound.load();
			backgroundMusic.sound.loop = true;//loop on
			backgroundMusic.isPlayed = true;
			backgroundMusic.sound.play();
			
			this.backgroundMusic = backgroundMusic; // change bgm
		}
	}
};
SoundSystem.prototype.StopBackgroundMusic = function(){
	
	if(this.backgroundMusic.isPlayed){
		this.backgroundMusic.sound.pause();
		this.backgroundMusic.isPlayed = false;
	}
	else{
		this.backgroundMusic.sound.play();
		this.backgroundMusic.isPlayed = true;
	}
};
SoundSystem.prototype.ExitBackgroundMusic = function(){
	
	if(this.backgroundMusic.isPlayed){
		this.backgroundMusic.sound.pause();
		this.backgroundMusic.isPlayed = false;
		this.backgroundMusic.currentTime = 0;
	}
};
//backgroundMusic.sound
SoundSystem.prototype.SetVolume = function (volume)
{
	this.volume = volume;
	
	for(var i = 0;i<this.arrSounds.length;i++)
	{
		this.arrSounds[i].sound.volume = this.volume;
	}
};

var soundSystem = new SoundSystem();

function onLoadSoundComplete()
{
	soundSystem.nowResourceLoadedCount++;
	
	if(soundSystem.nowResourceLoadedCount <= soundSystem.intAllResourceCount)
	{
		soundSystem.isLoadComplete = true;
	}
}