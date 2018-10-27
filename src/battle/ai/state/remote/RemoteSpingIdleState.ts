class RemoteSpingIdleState extends BaseAiState{
	
	public constructor(aiComponent:BaseAIComponent) {
		super(aiComponent);
	}

	public stateIn():void
	{
		let thisComponent = this.aiComponent as RemoteSpingAiComponent;
		let curTarget = thisComponent.battleEntity.entityModel.target
		if(curTarget && !curTarget.entityModel.isDead){ //第一次创建弹射远程的时候,可能已经有目标,此时直接切换到攻击状态
			thisComponent.changeState(BattleStateType.MOVE);
		}
	}

	public stateUpdate():void
	{
		super.stateUpdate();
		
		let thisComponent = this.aiComponent as RemoteSpingAiComponent;
		let target = this.searchTarget();
		if(!target){
			thisComponent.changeState(BattleStateType.DEAD);
			return;
		}

		let thisEntity:RemoteEntity = thisComponent.battleEntity as RemoteEntity;
		thisEntity.entityModel.target = target;
		thisComponent.changeState(BattleStateType.MOVE);

	}

	public searchTarget():FightEntity
	{
		let entitys:Array<FightEntity> = null;
		let thisComponent = this.aiComponent as RemoteSpingAiComponent;
		if(thisComponent.battleEntity.entityModel.teamType == TeamType.Team_Me){
			entitys = HeroEntityManager.instance.getEntitys(TeamType.Team_Enemy);
		}else if(thisComponent.battleEntity.entityModel.teamType == TeamType.Team_Enemy){
			entitys = HeroEntityManager.instance.getEntitys(TeamType.Team_Me);
		}
		
		let retEntity:FightEntity = null;
		let minDistance = 10000;
		for(let index = 0;index < entitys.length;index++){
			let entity = entitys[index]
			let distance = this.getDistanceX(entity)
			if(minDistance > distance && DisplayUtil.isEntityInStageScope(entity) && !thisComponent.isTargetHasBeSpring(entity)){
				retEntity = entity
			}
		}
		return retEntity;
	}

}