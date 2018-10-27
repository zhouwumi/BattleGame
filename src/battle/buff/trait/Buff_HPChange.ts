class Buff_HPChange extends BaseTrait{

	private _changeType:number;
	private _changeValue:number;
	private _interval:number;
	private _realChangeValue:number;
	private _startTime:number;

	public constructor(params:Object) {
		super(params)
		this._changeType = params["changeType"];
		this._changeValue = params["changeValue"];
		this._interval = params["interval"];
	//	console.log("###Buff_HPChange  constructor#####")
	}

	public onStart():void
	{
		this._startTime = egret.getTimer();
	//	console.log("###Buff_HPChange  onStart#####")
	}

	public onBindEnd():void
	{
		this._realChangeValue = this._changeType == BufferTypes.Promote ? this._changeValue:this._changeValue * -1;
	//	console.log("###Buff_HPChange  onBindEnd#####")
	}

	public onEnterFrame():void
	{
		if(egret.getTimer() - this._startTime >= this._interval){
			(this.buffer.target.entityModel as ActorEntityModel).hp += this._realChangeValue;
			this._startTime =this._startTime + this._interval;
	//		console.log("Buff_HPChange 角色血量发生了变化")
		}
	//	console.log("###Buff_HPChange  onEnterFrame#####",egret.getTimer(),this._startTime,this._interval)
	}


}