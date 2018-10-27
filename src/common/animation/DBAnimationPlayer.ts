class DBAnimationPlayer {

	private animation:db.DragonBonesAnimation;
	private animationName:string;
	private playTimes:number;
	public playCompeleteCallback = null;
	public playCompeleteObject = null;

	public playFrameCallback = null;
	public playFrameObject = null;

	public constructor() {
	}

	public playAnimation(animation:db.DragonBonesAnimation,animationName:string,playTimes:number = 0)
	{
		this.animation = animation;
		this.animationName = animationName;
		this.playTimes = playTimes;
		if(this.animation.isDataReady()){
			this.onLoadCompelete()
		}else{
			this.animation.readyCallback = this.onLoadCompelete;
			this.animation.readyCallObject = this;
		}
	}

	public onLoadCompelete()
	{
		this.animation.readyCallback = null;
		this.animation.readyCallObject = null;

		this.animation.display.addEventListener(dragonBones.EventObject.COMPLETE, this.playCompeleteHandler, this);
		this.animation.display.addEventListener(dragonBones.EventObject.FRAME_EVENT, this.playFrameHandler, this);
		this.animation.play(this.animationName,this.playTimes);
	}

	public playCompeleteHandler(event:dragonBones.AnimationEvent):void
	{
		let eventObject = event.eventObject;
		if(this.playCompeleteCallback){
			this.playCompeleteCallback.call(this.playCompeleteObject,eventObject);
		}
	}

	public playFrameHandler(event:dragonBones.AnimationEvent):void
	{
		let eventObject = event.eventObject;
		if(this.playFrameCallback){
			this.playFrameCallback.call(this.playFrameObject,eventObject);
		}
	}
}