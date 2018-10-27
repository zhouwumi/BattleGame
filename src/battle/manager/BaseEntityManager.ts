class BaseEntityManager extends egret.DisplayObject{

	protected _entitys:Array<BaseEntity> = null
	protected _isStopped:boolean = false;
	public constructor() {
		super();
		this._entitys = [];
		this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
	}

	protected onEnterFrame():boolean
	{
		if(this._isStopped){
			return false;
		}
		this._entitys.forEach(function(entity:BaseEntity,index:number,entitys:Array<BaseEntity>){
			entity.update();
		},this)
		return true;
	}

	public registerEntity(entity:BaseEntity):boolean
	{
		let index = this._entitys.indexOf(entity);
		if(index != -1){
			return false;
		}
		this._entitys.push(entity);
		this.dispatchEvent(new BattleCreateEntityEvent(entity));
		return true;
	}

	public removeEntity(entity:BaseEntity):boolean
	{
		
		let index = this._entitys.indexOf(entity);
		if(index == -1){
			return false;
		}
		this._entitys.splice(index,1)
		this.dispatchEvent(new BattleRemoveEntityEvent(entity));
		return true;
	}

	public getEntitys(teamType:number):Array<BaseEntity>
	{
		let ret = [];
		for(let index = 0;index < this._entitys.length;index++){
			let fightEntity = this._entitys[index] as FightEntity;
			if(fightEntity && fightEntity.entityModel.teamType == teamType){
				ret.push(this._entitys[index])
			}
		}
		return ret;
	}

	public get entitys():Array<BaseEntity>{
		return this._entitys
	}

	public pause():void
	{
		this._isStopped = true;
		this._entitys.forEach(function(entity:BaseEntity,index:number){
			entity.pauseEntity()
		},this)
	}

	public resume():void
	{
		this._isStopped = false;
		this._entitys.forEach(function(entity:BaseEntity,index:number){
			entity.resumeEntity()
		},this)
	}
}