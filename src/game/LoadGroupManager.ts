class  LoadGroupManager {
	private static _instance:LoadGroupManager = null;

	private _isDispatching:boolean = false;
	private _dirtyRemoveItems:Array<DirtyRemoveItem> = null;

	public static get instance():LoadGroupManager{
		if(LoadGroupManager._instance == null){
			LoadGroupManager._instance = new LoadGroupManager();
		}
		return LoadGroupManager._instance;
	}

	private _mapGroupName2Listener:Object = null;
	public constructor() {
		this._isDispatching = false;
		this._mapGroupName2Listener = {};
		this._dirtyRemoveItems = [];
		RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onGroupComplete,this);
		RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR,this.onGroupError,this);
		RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onGroupProgress,this);
	}

	private onGroupComplete(evt:RES.ResourceEvent):void
	{
		this._isDispatching = true;
		let groupName = evt.groupName;
		let loadItems:Array<LoadItem> = this._mapGroupName2Listener[groupName];
		for(let index = 0;index < loadItems.length;index++){
			let loadItem = loadItems[index];
			if(loadItem.compeleteCallback){
				loadItem.compeleteCallback.apply(loadItem.callObject);
			}
		//	console.log("产生了回调了",loadItems.length);
		}
		this._isDispatching = false;
		this.clearDirtyRemoveItems();
	}

	private onGroupError(evt:RES.ResourceEvent):void
	{
		this._isDispatching = true;
		let groupName = evt.groupName;
		let loadItems:Array<LoadItem> = this._mapGroupName2Listener[groupName];
		for(let index = 0;index < loadItems.length;index++){
			let loadItem = loadItems[index];
			if(loadItem.errorCallback){
				loadItem.errorCallback.apply(loadItem.callObject);
			}
		}
		this._isDispatching = false;
		this.clearDirtyRemoveItems();
	}

	//这里不知道怎么传递参数
	private onGroupProgress(evt:RES.ResourceEvent):void
	{
		this._isDispatching = true;
		let groupName = evt.groupName;
		let loadItems:Array<LoadItem> = this._mapGroupName2Listener[groupName];
		for(let index = 0;index < loadItems.length;index++){
			let loadItem = loadItems[index];
			if(loadItem.progressCallback){
				loadItem.progressCallback.call(loadItem.callObject,[evt.itemsLoaded,evt.itemsTotal]);
			}
		}
		this._isDispatching = false;
		this.clearDirtyRemoveItems();
	}

	public loadGroup(groupName:string,compeleteCallback:Function,errorCallback:Function,progressCallback:Function,callObject:Object):void
	{
		let loadItems:Array<LoadItem> = this._mapGroupName2Listener[groupName];
		if(!loadItems){
			this._mapGroupName2Listener[groupName] = loadItems = [];
		}

		let exist = false;
		for(let index = 0;index < loadItems.length;index ++){
			let curItem:LoadItem = loadItems[index];
			if(curItem.callObject == callObject){
				curItem.compeleteCallback = compeleteCallback ? compeleteCallback :curItem.compeleteCallback;
				curItem.errorCallback = errorCallback ? errorCallback :curItem.errorCallback;
				curItem.progressCallback = progressCallback ? progressCallback :curItem.progressCallback;
				exist = true;
				break;
			}
		}
		
		if(!exist){
			let newItem = new LoadItem(compeleteCallback,errorCallback,progressCallback,callObject);
			loadItems.push(newItem);
		}

		RES.loadGroup(groupName);
	}

	private clearDirtyRemoveItems():void
	{
		if(this._isDispatching){
			return;
		}
		if(this._dirtyRemoveItems.length > 0){
			var self = this;
			this._dirtyRemoveItems.forEach(function(removeItem:DirtyRemoveItem,index:number){
				self.removeGroupListener(removeItem.groupName,removeItem.callObject);
			},this);
			this._dirtyRemoveItems.length = 0;
		}
	}

	public removeGroupListener(groupName:string,callObject:Object):void
	{
		if(this._isDispatching){
			this._dirtyRemoveItems.push(new DirtyRemoveItem(groupName,callObject));
			return;
		}
		let loadItems:Array<LoadItem> = this._mapGroupName2Listener[groupName];
		if(!loadItems){
			return;
		}
		for(let index = 0;index < loadItems.length;index ++){
			let curItem:LoadItem = loadItems[index];
			if(curItem.callObject == callObject){
				loadItems.splice(index);
				return;
			}
		}
	}

	private removeAllEventListener():void
	{
		RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onGroupComplete,this);
		RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR,this.onGroupError,this);
		RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onGroupProgress,this);
	}

	public destoryInstance():void
	{
		if(LoadGroupManager._instance){
			LoadGroupManager._instance.removeAllEventListener();
			LoadGroupManager._instance = null;
		}
	}

}

class LoadItem{
	public compeleteCallback:Function = null;
	public errorCallback:Function = null;
	public progressCallback:Function = null;
	public callObject:Object = null;
	public constructor(_compeleteCallback:Function,_errorCallback:Function,_progressCallback:Function,_callObject:Object){
		this.compeleteCallback = _compeleteCallback;
		this.errorCallback = _errorCallback;
		this.progressCallback = _progressCallback;
		this.callObject = _callObject;
	}
}

class DirtyRemoveItem{
	public groupName:string;
	public callObject:Object = null;
	public constructor(_groupName:string,_callObject:Object){
		this.groupName = _groupName;
		this.callObject = _callObject;
	}
}