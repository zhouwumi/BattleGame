class BaseEntity extends egret.HashObject{

	public aiComponent:BaseAIComponent; //角色的ai
	protected _view:BaseEntityAvatar;	//角色的形象展示
	protected _isReady:boolean = false; //此角色是否准备好了
	protected _entityModel:BaseEntityModel;

	public constructor(model:BaseEntityModel) {
		super();
		model.entity = this;
		this._entityModel = model;

	}

	public pauseEntity():void
	{
	}

	public resumeEntity():void
	{
	}

	//开启ai
	public tryStartAi():boolean
	{
		if(this._isReady){
			return false;
		}
		this.initEntity();
		if(this.view && this.view.isViewReady){
			this._isReady = true;
			/*
			if(this instanceof ActorEntity)
			{
				let thisEntity:FightEntity = this as FightEntity
				thisEntity.useNormalSkillByName(FightActions.STAND)
			//	this.view.bodyAnimation.play(FightActions.STAND,0)
			}*/
			this.aiComponent.start();
			return true;
		}
		return false;
	}

	//view准备好,正式初始化实体
	protected initEntity():void
	{
	}

	public get entityModel():BaseEntityModel
	{
		return this._entityModel;
	}

	public update():boolean
	{
		if(!this._isReady){
			return false;
		}
		this.aiComponent.update();
		this.view.update();
		return true;
	}

	protected updateViewPosition():void
	{
		this.view.x = this._entityModel.x;
		this.view.y = this._entityModel.y;
	}
	
	public onPositionChange():void
	{
		this.updateViewPosition();
	}

	public onDirectionChange():void
	{
		if(this.view && this.view.isViewReady){
			this.view.updateDirection();
		}
	}

	public onHpChange():void
	{

	}

	public get attackDistance()
	{
		console.log("please override this method");
		return 0;
	}

	public destory()
	{
		this._entityModel.isDead = true;
		this.aiComponent.changeState(BattleStateType.DEAD);
	}

	public get view():BaseEntityAvatar
	{
		return this._view;
	}

}