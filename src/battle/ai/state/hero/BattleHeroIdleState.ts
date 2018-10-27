class BattleHeroIdleState extends BaseAiState{

	private thisEntity:HeroEntity = null;

	public constructor(aiComponent:BaseAIComponent) {
		super(aiComponent);
		this.thisEntity = this.aiComponent.battleEntity as HeroEntity;
	}

	public stateIn():void
	{
		let thisEntity:HeroEntity = this.aiComponent.battleEntity as HeroEntity
		thisEntity.useNormalSkillByName(FightActions.STAND)
	}

	public stateUpdate():void
	{
		super.stateUpdate();
		if(this.thisEntity.entityModel.teamType == TeamType.Team_Enemy){
			let num = Math.random() * 100  //给一定的概率保持空闲状态
			if(num < 50){
				return;
			}
		}
		
		let target = this.searchTarget();
		if(!target){
			return;
		}

		let thisComponent:HeroAiComponent = this.aiComponent as HeroAiComponent;
		let distance = this.getDistanceX(target);
		
		if(distance <= this.thisEntity.attackDistance){
			thisComponent.attackTarget(target);
		}else{
			thisComponent.moveToTarget(target);
		}
	}

	public searchTarget():HeroEntity
	{
		let entitys:Array<HeroEntity> = null;
		if(this.thisEntity.entityModel.teamType == TeamType.Team_Me){
			entitys = HeroEntityManager.instance.getEntitys(TeamType.Team_Enemy);
		}else if(this.thisEntity.entityModel.teamType == TeamType.Team_Enemy){
			entitys = HeroEntityManager.instance.getEntitys(TeamType.Team_Me);
		}
		let retEntity:HeroEntity = null;
		let minDistance = 10000;
		let thisComponent:HeroAiComponent = this.aiComponent as HeroAiComponent;
		for(let index = 0;index < entitys.length;index++){
			let entity = entitys[index]
			let distance = this.getDistanceX(entity)
			if(minDistance > distance && distance < this.thisEntity.heroConfig.searchScope + Math.random() * this.thisEntity.heroConfig.searchScope * 1/4){
				retEntity = entity
				minDistance = distance;
			}
		}
		
		return retEntity;
	}
}