/**
 * 战斗时间控制器
 * 需要的游戏暂停而且要没帧更新的，向这里注册
 */
class BattleTimeController extends egret.DisplayObjectContainer{

	private _callbackList = [];
	private _callbackObjectList = [];
	private _callbackArgList = [];
	private _lastStamp:number = 0;

	public constructor() {
		super();
		this.once(egret.Event.ADDED_TO_STAGE,this.addToStage,this);
	}

	private addToStage(event:egret.Event):void
	{
		this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
	}

	private onEnterFrame(event:egret.Event):void
	{
		for(let index = 0;index < this._callbackList.length;index++)
		{
			this._callbackList[index].apply(this._callbackObjectList[index]);
		}
	}

	public registerCallback(method,thisObject,/*...args*/):void
	{
		this._callbackList.push(method);
		this._callbackObjectList.push(thisObject);
	//	this._callbackArgList.push(args);
	}

	public removeCallback(method,thisObject):boolean
	{
		let index = this._callbackList.indexOf(method);
		if(index == -1 && thisObject == this._callbackObjectList[index]){
			this._callbackList.splice(index);
			this._callbackObjectList.splice(index);
			return true;
		}
		return false;
	}

	public stopGame():void
	{

	}

	public resumeGame():void
	{

	}
}