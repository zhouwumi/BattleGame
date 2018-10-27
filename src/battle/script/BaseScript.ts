class BaseScript {

	protected _entity:BaseEntity;
	protected _animationPlayer:BattleAnimationPlayer
	protected _startTime:number;
	protected _duration:number;
	protected _isStart:boolean;
	protected _isEnd:boolean;

	public constructor(entity:BaseEntity,animationPlayer:BattleAnimationPlayer) {
		this._entity = entity;
		this._animationPlayer = animationPlayer;
		this._isStart = false;
	}

	public setParams(params:Object):void
	{
	}

	public start():void
	{
		this._isStart = true;
		this._startTime = egret.getTimer();
		this.onStart();
	}

	protected onStart():void
	{

	}

	public update():boolean
	{
		let thisTime = egret.getTimer();
		if(thisTime - this._startTime >= this._duration){
			this.stop();
			return false;
		}
		
		return this.onUpdate();
	}

	protected onUpdate():boolean
	{
		return true;
	}

	protected onStop():void
	{

	}

	public stop():void
	{
		this.onStop();
		this._animationPlayer.removeScript(this);
	}

	public isStart():boolean
	{
		return this._isStart
	}

	public isEnd():boolean
	{
		return this._isEnd
	}

}