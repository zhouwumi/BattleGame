class BaseBuff {
	private _duration:number;
	private _attachHost:BaseEntity;
	private _target:ActorEntity
	private _traits:Array<BaseTrait>

	private _isStart:boolean = false;
	private _bufferInfo:BufferInfo;
	private _startTime:number;
	private _endTime:number;
	private _params:Object;

	public constructor(bufferInfo:BufferInfo,duration:number,params:Object = null)
	{
		this._bufferInfo = bufferInfo;
		this._duration = duration;
		this._params = params;
	}

	public get target():ActorEntity
	{
		return this._target;
	}

	public set target(target:ActorEntity)
	{
		this._target = target;
		this.initBufferTrait();
	}


	public get attachHost():BaseEntity
	{
		return this._attachHost
	}

	public set attachHost(attachHost)
	{
		this._attachHost = attachHost
	}

	public start():void
	{
		this._startTime = egret.getTimer();
		this._endTime = this._startTime + this.duration;
		this._isStart = true;
		this._traits.forEach(function(trait:BaseTrait,index:number,traits:Array<BaseTrait>){
			trait.onStart();
		},this)
		
	}

	public onEnterFrame():void
	{
		if(!this._isStart){
			return;
		}
		this._traits.forEach(function(trait:BaseTrait,index:number,traits:Array<BaseTrait>){
			trait.onEnterFrame();
		},this)
		if(egret.getTimer() >= this._endTime){
			this.target.removeBuff(this._bufferInfo.id);
		}

	}

	/**
	 * 停止次buff
	 */
	public stop():void
	{
		this._isStart = false;
		this._target = null;
		this._attachHost = null;
		this._traits.forEach(function(trait:BaseTrait,index:number,traits:Array<BaseTrait>){
			trait.onStopTrait();
		},this)
		
	}

	private initBufferTrait():void
	{
		this._traits = [];
		let self = this;
		this._bufferInfo.traitInfos.forEach(function(traitInfo:Object,index:number,traitInfos:Array<Object>){
			let traitInstance = BuffTraitFactory.createBuffTrait(traitInfo);
			traitInstance.bind(this);
			self._traits.push(traitInstance);
		},this)
	}
	

	public get duration():number
	{
		return this._duration
	}

	public set duration(_duration:number)
	{
		this._duration = _duration;
		this._endTime = egret.getTimer() + this._startTime
		this._traits.forEach(function(trait:BaseTrait,index:number,traits:Array<BaseTrait>){
			trait.onDurationUpdate();
		},this)
	}

	public get isStart():boolean
	{
		return this._isStart
	}

	public set isStart(isStart:boolean)
	{
		this._isStart = isStart;
	}

	public get bufferInfo():BufferInfo
	{
		return this._bufferInfo
	}
}