class FightEntityAvatar extends BaseEntityAvatar{

	protected defenceShape:egret.Shape;
	private defenceBoxs:Array<DecisionBox>;

	private attackShape:egret.Shape;
	private attackBoxs:Array<DecisionBox>;

	private currentFrame:number;
	private currentAttackBox:DecisionBox = null;
	private currentDefenceBox:DecisionBox = null;


	public constructor(entity:BaseEntity) {
		super(entity);
		this.defenceShape = new egret.Shape();
		this.addChild(this.defenceShape);
		this.defenceShape.visible = false;

		this.attackShape = new egret.Shape();
		this.addChild(this.attackShape);
		this.attackShape.visible = false;

		this.currentFrame = -1;
	}

	//目前只支持英雄
	public useSkill(skillId:number):void
	{
		
		this.animationPlayer.useSkill(skillId);
		let thisEntity = this.battleEntity as HeroEntity;
		let skillBattleConfig = BattleConfigLoader.instance.getSkillBattleConfig(thisEntity.heroConfig.id,skillId);
		this.defenceBoxs = skillBattleConfig.defenceBoxs;
		if(this.defenceBoxs.length <= 0){
			this.defenceShape.visible = false;
		}else{
			this.defenceShape.visible = true;
		}
		this.attackBoxs = skillBattleConfig.attackBoxs;
		if(this.attackBoxs.length <= 0){
			this.attackShape.visible = false;
		}else{
			this.attackShape.visible = true;
		}
		if(this.currentDefenceBox){
			HitCheckManager.instance.unregisterDefenceBox(this.currentDefenceBox);
			this.currentDefenceBox = null;
		}
		if(this.currentAttackBox){
			HitCheckManager.instance.unregisterAttackBox(this.currentAttackBox);
			this.currentAttackBox = null;
		}
		this.currentFrame = -1;
		
	}

	public update()
	{
		super.update();
		let frame = this.bodyAnimation.getCurrentFrame();
		if(frame == this.currentFrame){
			return;
		}
		this.currentFrame = frame;
		let frameIndex = 0;
		for(let _index in this.defenceBoxs)
		{
			let defenceBox = this.defenceBoxs[_index];
			let curMax = frameIndex + defenceBox.duration;
			frameIndex = curMax;
			if(this.currentFrame <= curMax){
				if(this.currentDefenceBox && this.currentDefenceBox.equalScope(defenceBox)){

				}else{
					if(this.currentDefenceBox){
						HitCheckManager.instance.unregisterDefenceBox(this.currentDefenceBox);
					}
					this.currentDefenceBox = DecisionBox.copyBox(defenceBox);
					this.currentDefenceBox.entity = this.battleEntity as FightEntity;
					this.drawBox(this.currentDefenceBox,DecisionBox.DecisionBoxType_Defence);
					HitCheckManager.instance.registerDefenceBox(this.currentDefenceBox);
				}
				break;
			}
		}
		
		frameIndex = 0;
		for(let _index in this.attackBoxs)
		{
			let attackBox = this.attackBoxs[_index];
			let curMax = frameIndex + attackBox.duration;
			frameIndex = curMax;
			if(this.currentFrame <= curMax){
				if(this.currentAttackBox && this.currentAttackBox.equalScope(attackBox)){

				}else{
					if(this.currentAttackBox){
						HitCheckManager.instance.unregisterAttackBox(this.currentAttackBox);
					}
					this.currentAttackBox = DecisionBox.copyBox(attackBox);
					this.currentAttackBox.entity = this.battleEntity as FightEntity;
					this.drawBox(this.currentAttackBox,DecisionBox.DecisionBoxType_Attack);
					HitCheckManager.instance.registerAttackBox(this.currentAttackBox);
				}
				break;
			}
		}
	}

	private drawBox(decisionBox:DecisionBox,boxType:number)
	{
		if(DEBUG_DECISION_BOX == 0){
			return
		}
		let decisionShape = this.defenceShape;
		let color = 0x0000ff;
		if(boxType == DecisionBox.DecisionBoxType_Attack)
		{
			decisionShape = this.attackShape;
			color = 0xff0000;
		}

		decisionShape.graphics.clear();
		let decisionRectangle = decisionBox.getLocalRectangle();
		let startX = decisionRectangle.x;
		let endX = decisionRectangle.x + decisionRectangle.width;
		let startY = decisionRectangle.y;
		let endY = decisionRectangle.y + decisionRectangle.height;
		decisionShape.graphics.beginFill(color,0.5)
		decisionShape.graphics.moveTo(startX,startY);
		decisionShape.graphics.lineTo(endX,startY);
		decisionShape.graphics.lineTo(endX,endY);
		decisionShape.graphics.lineTo(startX,endY);
		decisionShape.graphics.lineTo(startX,startY);
		decisionShape.graphics.endFill();
		
		decisionShape.visible = true;
	}

	public destory():void
	{
		super.destory();
	}
}