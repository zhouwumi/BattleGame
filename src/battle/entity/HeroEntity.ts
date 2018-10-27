class HeroEntity extends ActorEntity{

	
	private _heroConfig:HeroConfig = null;
	private _skillName2SkillConfig:Object = null;

	public constructor(model:BaseEntityModel,_heroConfig:HeroConfig) {
		super(model);
		this.entityModel.entityType = EntityType.Hero;
		this._heroConfig = _heroConfig;
		this.initSkillMap();
		this.aiComponent = new HeroAiComponent(this);
		this._view = new BattleHeroAvatar(this);
		HeroEntityManager.instance.registerEntity(this);
	}

	protected initEntity():void
	{
		super.initEntity();

		this.entityModel.fightPower = this.heroConfig.fightPower;
		this.entityModel.maxHp = this.heroConfig.maxHp;
		this.entityModel.hp = this.entityModel.maxHp;
		this.entityModel.moveSpeed = this.heroConfig.speed;

		this.entityModel.fightProperty.criticalHitRate = this.heroConfig.criticalHitRate;
		this.entityModel.fightProperty.criticalDefenceRate = this.heroConfig.criticalDefenceRate;
		this.entityModel.fightProperty.damageReduceRate = this.heroConfig.damageReduceRate;
		this.entityModel.fightProperty.criticalHurt = this.heroConfig.criticalHurt;
		this.entityModel.fightProperty.damageReduce = this.heroConfig.damageReduce;
	}

	private initSkillMap():void
	{
		this._skillName2SkillConfig = {};
		let self = this;
		this._heroConfig.allSkills.forEach(function(skillId:number,index:number){
			let skillConfig = BattleConfigLoader.instance.getSkillBattleConfig(self.heroConfig.id,skillId);
			self._skillName2SkillConfig[skillConfig.action] = skillConfig
		});
	}

	public get attackDistance()
	{
		return this._heroConfig.attackDistance;
	}

	public get heroConfig():HeroConfig
	{
		return this._heroConfig;
	}


	public onHpChange():void
	{
		super.onHpChange();
		(this.view as BattleHeroAvatar).updateHp();
		if(this.entityModel.hp <= 0){
			this.destory();
		}
	}

	//销毁掉
	public destory()
	{
		if(this._entityModel.isDead){
			return;
		}
		super.destory();
		HeroEntityManager.instance.removeEntity(this);
	}


	public get entityModel():ActorEntityModel
	{
		return this._entityModel as ActorEntityModel;
	}
	
	public getNormalSkillIdByName(skillName:string):number
	{
		let skillConfig:SkillBattleConfig = this._skillName2SkillConfig[skillName] as SkillBattleConfig
		if(skillConfig){
			return skillConfig.id
		}
		return 0
	}
}