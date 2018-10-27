class BattleHeroDeadState extends BaseAiState{

	public constructor(aiComponent:BaseAIComponent) {
		super(aiComponent);
	}

	public stateIn():void
	{
		this.aiComponent.stop();
		let thisComponent:HeroAiComponent = this.aiComponent as HeroAiComponent;
		let thisEntity = thisComponent.battleEntity;
		let buffSkills = thisComponent.battleEntity.heroConfig.buffSkills
		if(buffSkills.length > 0){
			let skillId = buffSkills[0];
			let skillBattleConfig = BattleConfigLoader.instance.getSkillBattleConfig(thisEntity.heroConfig.id,skillId)
			this.aiComponent.battleEntity.view.doAction(skillBattleConfig.action);
		}
		let self = this;
		egret.setTimeout(function(){
			self.playDeadAnimation();
			DisplayUtil.removeFromParent(self.aiComponent.battleEntity.view);
		},this,800);
	}

	public playDeadAnimation()
	{
		let deadAnimation = CommonUtils.createDragonBones("bigfla","siwang");
		deadAnimation.x = this.aiComponent.battleEntity.entityModel.x;
		deadAnimation.y = this.aiComponent.battleEntity.entityModel.y;
		this.aiComponent.battleEntity.view.parent.addChild(deadAnimation);
		let player = new DBAnimationPlayer()
		player.playCompeleteCallback = function(){
			DisplayUtil.removeFromParent(deadAnimation);
		}

		player.playAnimation(deadAnimation,"1",1);
	}
}