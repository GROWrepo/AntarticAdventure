function onGameInit()
{
	//title
	document.title = "Antartic Adventure";
	
	GAME_FPS = 30;
	debugSystem.debugMode = true;
	
	//resource freeLoading
	//titleImage
	resourcePreLoader.AddImage("img/title_background.png");
	resourcePreLoader.AddImage("img/title_level1_off.png");
	resourcePreLoader.AddImage("img/title_level1_on.png");
	resourcePreLoader.AddImage("img/title_level2_off.png");
	resourcePreLoader.AddImage("img/title_level2_on.png");
	resourcePreLoader.AddImage("img/title_level3_off.png");
	resourcePreLoader.AddImage("img/title_level3_on.png");
	resourcePreLoader.AddImage("img/title_multy_off.png");
	resourcePreLoader.AddImage("img/title_multy_on.png");	
	//gameImage
	resourcePreLoader.AddImage("img/game_bg_sky.png");				//1
	resourcePreLoader.AddImage("img/game_bg_cloud_s.png");			//1
	resourcePreLoader.AddImage("img/game_bg_cloud_m.png");			//1
	resourcePreLoader.AddImage("img/game_bg_cloud_b.png");			//1
	resourcePreLoader.AddImage("img/game_bg_left.png");				//2
	resourcePreLoader.AddImage("img/game_bg_right.png");			//2
	resourcePreLoader.AddImage("img/game_bg_left_ice.png");			//3
	resourcePreLoader.AddImage("img/game_bg_right_ice.png");		//3
	resourcePreLoader.AddImage("img/game_obj_hole.png");			//5
	resourcePreLoader.AddImage("img/game_obj_bighole.png");			//5
	resourcePreLoader.AddImage("img/game_obj_enemy.png");			//5
	resourcePreLoader.AddImage("img/game_obj_plag.png");			//5
	resourcePreLoader.AddImage("img/game_player_crash_left.png");	//7
	resourcePreLoader.AddImage("img/game_player_crash_right.png");	//7
	resourcePreLoader.AddImage("img/game_player_down_idle.png");	//1
	resourcePreLoader.AddImage("img/game_player_down_move.png");	//7
	resourcePreLoader.AddImage("img/game_player_jump.png");			//9
	resourcePreLoader.AddImage("img/game_player_move.png");			//4
	resourcePreLoader.AddImage("img/mgame_background.png");			//4
	resourcePreLoader.AddImage("img/mgame_player_move.png");		//4
	resourcePreLoader.AddImage("img/mgame_rival_move.png");			//4
	resourcePreLoader.AddImage("img/mgame_obj_point.png");			//1
	resourcePreLoader.AddImage("img/mgame_obj_bullet.png");			//1
	//creditImage
	resourcePreLoader.AddImage("img/credit_background.jpg");		//4
	//sound freeLoading
	soundSystem.AddSound("sound/title_start_on.mp3",1);
	soundSystem.AddSound("sound/credit_bgm.mp3",1);
	soundSystem.AddSound("sound/stage1_bgm.mp3",1);
	soundSystem.AddSound("sound/game_bgm_lose.ogg",1);
	soundSystem.AddSound("sound/game_bgm_win.ogg",1);
	soundSystem.AddSound("sound/game_effect_crash.wav",3,0.5);
	soundSystem.AddSound("sound/game_effect_down.wav",1,0.5);
	soundSystem.AddSound("sound/game_effect_jump.wav",1,0.5);
	soundSystem.AddSound("sound/game_effect_pause.wav",1);
	soundSystem.AddSound("sound/game_effect_plag.wav",1);
	soundSystem.AddSound("sound/wait_bgm.mp3",1);
	soundSystem.AddSound("sound/mgame_bgm.mp3",1,0.2);
	soundSystem.AddSound("sound/mgame_effect_crash.wav",2);
	soundSystem.AddSound("sound/mgame_effect_shot.wav",4);
	soundSystem.AddSound("sound/mgame_effect_time.wav",2);
	
	//socket.io
	new gfwSocket("http://127.0.0.1:9892");
	
	//init state setting
	after_loading_state = new TitleState();
//	after_loading_state = new MultiPlayGameState(0);
	setInterval(gameLoop, 1000/GAME_FPS);
}
function onGameDestroy()
{
	if(gfwSocket)
		gfwSocket.Disconnect();
}
//used global
var firstLoading = false;
window.addEventListener("load", onGameInit, false);
window.addEventListener("unload", onGameDestroy, false);