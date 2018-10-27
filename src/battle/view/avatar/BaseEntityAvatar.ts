class BaseEntityAvatar extends egret.DisplayObjectContainer{

	public static BODY_SIZE_WIDTH = 40;
	public static BODY_SIZE_HEIGHT = 120;

	protected _isViewReady:boolean = false;
	protected _entity:BaseEntity = null;
	protected _avatarLayers:Array<egret.DisplayObjectContainer> = null
	protected _animationPlayer:BattleAnimationPlayer;

	public constructor(entity:BaseEntity) {
		super();
		this._entity = entity;
		this._avatarLayers = [];
		for(let layerIndex = 1;layerIndex <= AvatarLayer.Max;layerIndex++){
			let layerContainer = new egret.DisplayObjectContainer();
			this._avatarLayers[layerIndex] = layerContainer
			this.addChildAt(layerContainer,layerIndex);
		}
	}

	public update():void
	{
		if(this._animationPlayer)
		{
			this._animationPlayer.update()
		}
	}

	public get isViewReady():boolean
	{
		return this._isViewReady;
	}

	//动画数据准备好了的回调
	public viewReady():void
	{
		this._isViewReady = true;
		this.battleEntity.tryStartAi();
	}

	//更新面向
	public updateDirection():void
	{
		if(this.bodyAnimation){
			this.bodyAnimation.scaleX = this.battleEntity.entityModel.direction == Direction.RIGHT ? 1:-1;
		}
	}

	public doAction(actionName:string)
	{
		if(this._animationPlayer.isDataReady){
			this._animationPlayer.play(actionName,FightUtils.isLoopAction(actionName) ? 0:1);
		}
	}

	public get battleEntity():BaseEntity
	{
		return this._entity
	}

	public getLayer(layerIndex:number):egret.DisplayObjectContainer
	{
		if(layerIndex <= 0){
			layerIndex = 1
		}
		if(layerIndex > AvatarLayer.Max)
		{
			layerIndex = AvatarLayer.Max
		}
		return this._avatarLayers[layerIndex]
	}

	public get bodyAnimation():db.DragonBonesAnimation
	{
		return this._animationPlayer.getBodyAnimation();
	}

	public get animationPlayer():BattleAnimationPlayer
	{
		return this._animationPlayer;
	}

	public destory():void
	{
		this.visible = false;
		if(this.bodyAnimation)
		{
			this.bodyAnimation.destory();
		}
	}
}