class BattleHeroMoveState extends BaseAiState{

	private target:HeroEntity;
	private moveDir:number = 0;//Direction
	private speedX:number = 0;
	private speedY:number = 0;
	private targetX:number = 0;
	private targetY:number = 0;

	public constructor(aiComponent:BaseAIComponent) {
		super(aiComponent);
	}

	public stateIn():void
	{
		//console.log("进入了移动状态",this.aiComponent.HeroEntity.TeamType)
		let thisEntity:HeroEntity = this.aiComponent.battleEntity as HeroEntity
		thisEntity.useNormalSkillByName(FightActions.MOVE)
		//this.aiComponent.battleEntity.view.doAction(FightActions.MOVE);
	}


	public setTarget(target:HeroEntity):void
	{
		this.target = target;
		let thisEntity:HeroEntity = this.aiComponent.battleEntity as HeroEntity

		if(this.target.entityModel.x > this.aiComponent.battleEntity.entityModel.x){
			this.targetX = this.target.entityModel.x - (thisEntity.heroConfig.attackDistance - thisEntity.heroConfig.attackDistance * 1/4 * Math.random());
			this.speedX = this.aiComponent.battleEntity.entityModel.moveSpeed
			this.aiComponent.battleEntity.entityModel.direction = Direction.RIGHT;
		}else{
			this.speedX = this.aiComponent.battleEntity.entityModel.moveSpeed * -1
			this.targetX = this.target.entityModel.x + (thisEntity.heroConfig.attackDistance - thisEntity.heroConfig.attackDistance * 1/4 * Math.random());
			this.aiComponent.battleEntity.entityModel.direction = Direction.LEFT;
		}
		
		if(this.target.entityModel.y > this.aiComponent.battleEntity.entityModel.y){
			this.speedY = this.aiComponent.battleEntity.entityModel.moveSpeed
		}else{
			this.speedY = this.aiComponent.battleEntity.entityModel.moveSpeed * -1
		}

		let deltaY = this.aiComponent.battleEntity.entityModel.y - this.target.entityModel.y
		if(Math.abs(deltaY) > 50){
			this.targetY = this.target.entityModel.y + Math.random() * 50 * (deltaY > 0 ? 1:-1);
			let deltaSpeed = Math.abs(this.targetY - this.aiComponent.battleEntity.entityModel.y)/Math.abs(this.targetX - this.aiComponent.battleEntity.entityModel.x);
			deltaSpeed = Math.min(deltaSpeed,1);
			if(this.targetY > this.aiComponent.battleEntity.entityModel.y){
				this.speedY = this.aiComponent.battleEntity.entityModel.moveSpeed * deltaSpeed
			}else{
				this.speedY = this.aiComponent.battleEntity.entityModel.moveSpeed * -1 * deltaSpeed
			}
			if(deltaSpeed > 1){
				console.log("##################",deltaSpeed,this.speedY,this.speedX)
			}
		}else{
			this.speedY = 0;
			this.targetY = this.aiComponent.battleEntity.entityModel.y;
		}

	}

	public stateUpdate()
	{
		if(!this.target){
			return;
		}
		let thisEntity:HeroEntity = this.aiComponent.battleEntity as HeroEntity
		this.aiComponent.battleEntity.entityModel.x += this.speedX;
		this.aiComponent.battleEntity.entityModel.y += this.speedY;
		if(this.speedX > 0 && this.aiComponent.battleEntity.entityModel.x >= this.target.entityModel.x - thisEntity.heroConfig.attackDistance){
			this.aiComponent.changeState(BattleStateType.IDLE);
		}else if(this.speedX < 0 && this.aiComponent.battleEntity.entityModel.x <= this.target.entityModel.x + thisEntity.heroConfig.attackDistance){
			this.aiComponent.changeState(BattleStateType.IDLE);
		}
	}

	public stateOut()
	{
		this.target = null;
	}
}