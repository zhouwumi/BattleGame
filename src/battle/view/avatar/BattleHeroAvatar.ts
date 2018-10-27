/**
 * 人物中心在脚底,正中间
 */
class BattleHeroAvatar extends ActorAvatar{

	

	public hpProgress:GameProgressBar;
	public nameLabel:eui.Label;
	private curHp:number;

	public constructor(entity:HeroEntity) {
		super(entity);

		this.hpProgress = new GameProgressBar("battle_bloodbar_bg_png", "battle_bloodbar_sprite_png");
		this.getLayer(AvatarLayer.Body).addChild(this.hpProgress);

		this.nameLabel = new eui.Label();
		this.nameLabel.text = this.battleEntity.heroConfig.name;
		this.nameLabel.size = 15;  //这个必须放在前面，否则anchorOffsetX不准确
		this.nameLabel.anchorOffsetX = this.nameLabel.width * 0.5;
		this.getLayer(AvatarLayer.Body).addChild(this.nameLabel);
		
		this.nameLabel.y = BaseEntityAvatar.BODY_SIZE_HEIGHT * -1 - 20;
		this.hpProgress.anchorOffsetX = this.hpProgress.width * 0.5
		this.hpProgress.y = BaseEntityAvatar.BODY_SIZE_HEIGHT * -1;
		
		this._animationPlayer = new BattleAnimationPlayer(this,this.battleEntity.heroConfig.animation);
		this._animationPlayer.loadAnimation();
		this.curHp = 0;
	}

	//动画数据准备好了的回调
	public viewReady():void
	{
		let self = this;
		this.updateHp();
		super.viewReady();
	}


	//更新血量
	public updateHp():void
	{
		let deltaHp = this.battleEntity.entityModel.hp - this.curHp;
		this.hpProgress.setPercent(this.battleEntity.entityModel.hp/this.battleEntity.entityModel.maxHp)
		this.curHp = this.battleEntity.entityModel.hp
	}

	public get battleEntity():HeroEntity
	{
		return this._entity as HeroEntity
	}

}