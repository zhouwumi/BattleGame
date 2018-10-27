module db {
	export class DragonBonesAnimation extends egret.DisplayObjectContainer{

		private _display:dragonBones.EgretArmatureDisplay = null
		private _isDataReady:boolean = false;
		private _dragonBonesName:string = "";
		private _armatureName:string = "";
		private _dragonBonesJson:string = "";
		private _textureJson:string = "";
		private _texturePng:string = "";
		public readyCallback:Function = null;
		public readyCallObject:Object = null;
		public currentFrame:number = 0;

		public constructor(dragonBonesName:string,armaturenName:string = "") {
			super();
			this._dragonBonesName = dragonBonesName;
			this._dragonBonesJson = dragonBonesName + "_skeleton_ske_json";
			this._textureJson = dragonBonesName + "_skeleton_tex_json";
			this._texturePng = dragonBonesName + "_skeleton_tex_png";

			this._armatureName = armaturenName;
			if(armaturenName == ""){
				this._armatureName = dragonBonesName;
			}

			LoadGroupManager.instance.loadGroup(dragonBonesName,this.loadComplete,null,null,this);
		}

		//获取当前动画名称
		public getCurrentAnimationName():string
		{
			//每次调用animationConfig,在get函数中会主动清空，不知道为啥官网要这样做。。。
			return this.display.animation["gameAnimationConfig"].animation
		}
		//获取当前动画运行到第几帧了
		public getCurrentFrame():number
		{
			if(!this._isDataReady){
				return this.currentFrame;
			}
			let animation = this.display.animation;
			let name = this.display.animation["gameAnimationConfig"].animation
			let animationData = this.display.animation.animations[name]
			let animationState = this.display.animation.getState(name);
			let frame = animationState.currentTime/animationState.totalTime * animationData.frameCount
			this.currentFrame = Math.floor(frame) == frame ?  Math.floor(frame): Math.floor(frame)+1
			this.currentFrame = Math.max(Math.min(this.currentFrame,animationData.frameCount),1)
			return this.currentFrame;
		}

		/*
		private loadComplete():void
		{
			LoadGroupManager.instance.removeGroupListener(this._armatureName,this);

			var dragonbonesData = RES.getRes(this._dragonBonesJson);  
			var textureData = RES.getRes(this._textureJson);  
			var texture = RES.getRes(this._texturePng);
			let egretFactory: dragonBones.EgretFactory = new dragonBones.EgretFactory();
			egretFactory.parseDragonBonesData(dragonbonesData);  
			egretFactory.parseTextureAtlasData(textureData, texture);
			let name = this.getArmatureName()
			let armatureDisplay: dragonBones.EgretArmatureDisplay = egretFactory.buildArmatureDisplay(name);
			this._display = armatureDisplay
			this.addChild(armatureDisplay)
			if(this._animationTypes == DragonBonesAnimationTypes.Hero){
				this._display.animation.play(FightActions.STAND);
			}
			
			this._isDataReady = true;
			if(this.readyCallback){
				this.readyCallback.call(this.readyCallObject);
			}
		//	armatureDisplay.addEventListener(dragonBones.EventObject.START, this.animationEventHandler, this);
		//	armatureDisplay.addEventListener(dragonBones.EventObject.LOOP_COMPLETE, this.animationEventHandler, this);
		//	armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, this.animationEventHandler, this);
		//	armatureDisplay.addEventListener(dragonBones.EventObject.FADE_IN, this.animationEventHandler, this);
		//	armatureDisplay.addEventListener(dragonBones.EventObject.FADE_IN_COMPLETE, this.animationEventHandler, this);
		//	armatureDisplay.addEventListener(dragonBones.EventObject.FADE_OUT, this.animationEventHandler, this);
		//	armatureDisplay.addEventListener(dragonBones.EventObject.FADE_OUT_COMPLETE, this.animationEventHandler, this);
		//	armatureDisplay.addEventListener(dragonBones.FrameEvent.ANIMATION_FRAME_EVENT, this.animationEventHandler, this);
		}*/

		private loadComplete():void
		{
			LoadGroupManager.instance.removeGroupListener(this._armatureName,this);

			var dragonbonesData = RES.getRes(this._dragonBonesJson);  
			var textureData = RES.getRes(this._textureJson);  
			var texture = RES.getRes(this._texturePng);
			let egretFactory: dragonBones.EgretFactory = new dragonBones.EgretFactory();
			egretFactory.parseDragonBonesData(dragonbonesData);  
			egretFactory.parseTextureAtlasData(textureData, texture);
			let armature:dragonBones.Armature= egretFactory.buildArmature(this._armatureName);
			this._display = armature.display
			let animation = this.display.animation;
			this.addChild(this._display)
			DBAnimationManager.instance.addAnimation(this);
			
			this._isDataReady = true;
			if(this.readyCallback){
				this.readyCallback.call(this.readyCallObject);
			}
		}
		

		public get display():dragonBones.EgretArmatureDisplay{
			return this._display;
		}

		public play(animationName?: string | null, playTimes?: number):void
		{
			this.display.animation.play(animationName,playTimes);
		}

		public gotoAndPlay(animationName: string,playTimes?: number):void
		{
			this.display.animation.gotoAndPlay(animationName,0,0,playTimes);
		}

		public gotoAndStop(animationName: string, time?: number):void
		{
			this.display.animation.gotoAndStop(animationName,time);
			
		}


		public isDataReady():boolean
		{
			return this._isDataReady;
		}

		public destory():void
		{
			DBAnimationManager.instance.removeAnimation(this);
		}
	}
}