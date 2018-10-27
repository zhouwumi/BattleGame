class BattleHeroAttackState extends BaseAiState{

	private target:HeroEntity;
	private attackTime:number;
	private attackSkillIndex:number = 0;
	private attackTimes:number = 0;
	private thisEntity:HeroEntity = null;

	public constructor(aiComponent:BaseAIComponent) {
		super(aiComponent);
		this.thisEntity = this.aiComponent.battleEntity as HeroEntity;
		this.attackSkillIndex = 0;
	}


	public setTarget(target:HeroEntity):void
	{
		this.target = target;
		let entityModel = this.aiComponent.battleEntity.entityModel as ActorEntityModel
		if(entityModel)
		{
			entityModel.target = this.target;
		}
	}

	public stateIn():void
	{
	//	this.attackSkillIndex = 0;
		this.attackTime = 0;
		this.attackTimes = 0;
	}

	// 需要注意目标死亡了的情况,以后添加这个处理
	public stateUpdate()
	{
		if(!this.target){
			return;
		}
		
		if(this.target.entityModel.x > this.aiComponent.battleEntity.entityModel.x){
			this.aiComponent.battleEntity.entityModel.direction = Direction.RIGHT;
		}else{
			this.aiComponent.battleEntity.entityModel.direction = Direction.LEFT;
		}

		if(this.target.entityModel.isDead){
			this.aiComponent.changeState(BattleStateType.IDLE);
			return;
		}
		if(this.getDistanceX(this.target) > this.aiComponent.battleEntity.attackDistance){
		//	console.log("攻击状态转换成空闲状态")
			this.aiComponent.changeState(BattleStateType.IDLE)
			return
		}

		if(this.attackTime> 0 && egret.getTimer() - this.attackTime < this.thisEntity.heroConfig.attackInterval){
			return;
		}
		
		let thisComponent:HeroAiComponent = this.aiComponent as HeroAiComponent;
		//console.log("播放攻击动作")
		//let allSkillIds = thisComponent.battleEntity.heroConfig.buffSkills.concat(thisComponent.battleEntity.heroConfig.fightSkills)
		let allSkillIds = this.thisEntity.heroConfig.fightSkills;
		let damage = this.thisEntity.entityModel.fightPower
		if(this.thisEntity.entityModel.teamType == TeamType.Team_Me){
		//	allSkillIds = [10001004,10001005,10001006,10001007];
		}else{
			damage = Math.floor(damage * Math.random() * 0.01);
		}
		let skillId = allSkillIds[this.attackSkillIndex++%allSkillIds.length];
		
		let skillBattleConfig = BattleConfigLoader.instance.getSkillBattleConfig(this.thisEntity.heroConfig.id,skillId);
		if(skillBattleConfig.isAttack && (this.attackSkillIndex - Math.floor(Math.random() * allSkillIds.length))%allSkillIds.length == 10000 && this.thisEntity.entityModel.teamType == TeamType.Team_Me){
		//	RemoteEntityManager.instance.tryGenerateRemote(20002,this.target,this.aiComponent.battleEntity);
		}else if(skillBattleConfig.isBuff && this.thisEntity.entityModel.teamType == TeamType.Team_Me){
		//	this.target.addBuff(1,6000,thisComponent.battleEntity);
		}else{
			HitManager.instance.fightAttackHappen(this.thisEntity,this.target);
			//this.target.entityModel.hp -= damage;
		}
		this.thisEntity.useSkill(skillId);
		this.attackTime = egret.getTimer();
		this.attackTimes++
	//	console.log("我方英雄打击的对象",this.target.x,this.target.y)
	}

	public stateOut():void
	{
		let entityModel = this.thisEntity.entityModel as ActorEntityModel
		if(entityModel)
		{
			entityModel.lastTarget = this.target
			entityModel.target = null;
		}
	}
}