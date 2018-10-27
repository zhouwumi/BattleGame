class RemoteMoveTargetState extends BaseAiState{

	protected targetX:number = 0;
	protected targetY:number = 0;
	protected degree:number = 0;
	protected dirX:number = 0;
	protected dirY:number = 0;
	protected target:FightEntity = null;

	public constructor(aiComponent:BaseAIComponent) {
		super(aiComponent);
	}


	public stateIn():void
	{
		let thisEntity = this.aiComponent.battleEntity as RemoteEntity
		thisEntity.view.visible = true;
		
		(thisEntity.view as BattleRemoteAvatar).doAction(thisEntity.remoteConfig.action,thisEntity.remoteConfig.isLoop);

		let target = thisEntity.entityModel.target;
		if(!target){
			console.log("remote has no target");
			this.stateOut();
			return;
		}
		this.target = target;
		this.targetX = target.entityModel.x;
		this.targetY = target.entityModel.y - 60; //减去身高的一半，刚好打击在了身体中部

		thisEntity.entityModel.x = thisEntity.entityModel.hostTarget.entityModel.x;
		thisEntity.entityModel.y = thisEntity.entityModel.hostTarget.entityModel.y;
		this.dirX = target.entityModel.x - thisEntity.entityModel.x;
		this.dirY = target.entityModel.y - thisEntity.entityModel.y;

		if(this.targetX == thisEntity.entityModel.x){
			this.degree = this.targetX > thisEntity.entityModel.x ? 0:Math.PI;
		}else{
			this.degree = Math.atan(Math.abs(this.targetY - thisEntity.entityModel.y)/Math.abs(this.targetX - thisEntity.entityModel.x));
		}
		thisEntity.view.rotation = this.degree * 360/Math.PI;
	}

	public stateUpdate()
	{
		let isXEnd = this.dirX <= 0 && this.aiComponent.battleEntity.entityModel.x <= this.targetX || this.dirX >= 0 && this.aiComponent.battleEntity.entityModel.x >= this.targetX;
		let isYEnd = this.dirY <= 0 && this.aiComponent.battleEntity.entityModel.y <= this.targetY || this.dirY >= 0 && this.aiComponent.battleEntity.entityModel.y >= this.targetY;

		if(isXEnd && isYEnd)
		{
		//	console.log("########stateUpdate到达了目的地#########")
			this.handleMoveOver();
			return;
		}
		let thisEntity = this.aiComponent.battleEntity as RemoteEntity
		let nextX,nextY;
		if(this.targetX >= thisEntity.entityModel.x){
			nextX = thisEntity.entityModel.x + thisEntity.remoteConfig.moveSpeed * Math.cos(this.degree);
			if(nextX >= this.targetX){
				nextX = this.targetX;
			}
		}else{
			nextX = thisEntity.entityModel.x - thisEntity.remoteConfig.moveSpeed * Math.cos(this.degree);
			if(nextX <= this.targetX){
				nextX = this.targetX;
			}
		}

		if(this.targetY >= thisEntity.entityModel.y){
			nextY = thisEntity.entityModel.y + thisEntity.remoteConfig.moveSpeed * Math.sin(this.degree);
			if(nextY >= this.targetY){
				nextY = this.targetY;
			}
		}else{
			nextY = thisEntity.entityModel.y - thisEntity.remoteConfig.moveSpeed * Math.sin(this.degree);
			if(nextY <= this.targetY){
				nextY = this.targetY;
			}
		}

		
		isXEnd = this.dirX <= 0 && nextX <= this.targetX || this.dirX >= 0 && nextX >= this.targetX;
		isYEnd = this.dirY <= 0 && nextY <= this.targetY || this.dirY >= 0 && nextY >= this.targetY;

	//	console.log("远程当前目标为：",nextX,nextY,this.degree,Math.sin(this.degree),Math.cos(this.degree))
		if(isXEnd && isYEnd){
			nextX = this.targetX;
			nextY = this.targetY;
		}
		
		this.aiComponent.battleEntity.entityModel.x = nextX
		this.aiComponent.battleEntity.entityModel.y = nextY
	}

	protected handleMoveOver():void
	{
		this.aiComponent.stop();
		this.aiComponent.battleEntity.destory();
	}


	public stateOut()
	{
		let thisEntity = this.aiComponent.battleEntity as RemoteEntity;
		if(this.target && this.target instanceof HeroEntity){
			
			(this.target as HeroEntity).entityModel.hp -= 2;
			thisEntity.entityModel.target = null;//清空攻击的目标
			thisEntity.entityModel.lastTarget = this.target; //设置上一个攻击的目标
			this.target = null;//退出此状态，清空当前目标
		}
	}

}