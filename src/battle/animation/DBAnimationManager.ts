class DBAnimationManager extends egret.DisplayObjectContainer{

	private _dbAnimations:Array<db.DragonBonesAnimation> = [];
	private _lastStamp:number = 0;
	private _stopTimeStamp:number = 0;
	private _isStop:boolean = false;

	private static _instance:DBAnimationManager = null;
	public static get instance():DBAnimationManager
	{
		if(DBAnimationManager._instance == null){
			DBAnimationManager._instance = new DBAnimationManager();
		}
		return DBAnimationManager._instance;
	}

	public constructor() {
		super();
		this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
		this._lastStamp = egret.getTimer();
		this._stopTimeStamp = 0;
	}

	private onEnterFrame(event:egret.Event):void
	{
		if(this._isStop){
			return;
		}
		let curTime = egret.getTimer();
		let passedTime = curTime - this._lastStamp;
		this._lastStamp = curTime;
		dragonBones.WorldClock.clock.advanceTime(passedTime * 0.001);
	}

	public addAnimation(animation:db.DragonBonesAnimation):void
	{
		dragonBones.WorldClock.clock.add(animation.display.armature);
		this._dbAnimations.push(animation)
	}

	public removeAnimation(animation:db.DragonBonesAnimation):void
	{
		let index = this._dbAnimations.indexOf(animation);
		this._dbAnimations.splice(index);
		dragonBones.WorldClock.clock.remove(animation.display.armature);
	}


	public pause():void
	{
		this._isStop = true;
		this._stopTimeStamp = egret.getTimer();
	}

	public resume():void
	{
		this._isStop = false;
		let curTime = egret.getTimer();
		this._lastStamp = curTime - this._stopTimeStamp + this._lastStamp;
		this._stopTimeStamp = 0;
	}
}