
class ObjectPool{
	private name:string = "";
	private clazz:any = null;

	private idleObjects:Array<Object> = null;
	public constructor(name:string){
		this.name = name;
		this.clazz = egret.getDefinitionByName(this.name);
		this.idleObjects = [];
	}

	public getObject():Object{
		if(this.idleObjects.length > 0){
			return this.idleObjects.pop();
		}
		return new this.clazz();
	}

	public returnObject(object:Object):void
	{
		this.idleObjects.push(object);
	}

}

class ObjectManager {
	public obj_id:number = 0;
	private _objectPools:Object = null;

	private static _instance:ObjectManager = null;

	public static get instance():ObjectManager
	{
		if(ObjectManager._instance == null){
			ObjectManager._instance = new ObjectManager();
		}
		return ObjectManager._instance;
	}

	//唯一标识id
	public getObjId():number
	{
		return ++this.obj_id;
	}

	public constructor() {
		this._objectPools = {};
	}

	public getPool(poolname:string):ObjectPool{
		if(!this._objectPools[poolname]){
			this._objectPools[poolname] = new ObjectPool(poolname);
		}
		return this._objectPools[poolname];
	}

	

}