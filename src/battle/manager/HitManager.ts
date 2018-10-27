class HitManager {

	private static _instance:HitManager = null;

	public static get instance():HitManager
	{
		if(HitManager._instance == null){
			HitManager._instance = new HitManager();
		}
		return HitManager._instance;
	}

	private _hitCalculateComponent:HitCalculateComponent = null;
	private _hitAcceptDamageComponent:HitAcceptDamageComponent = null;
	private _hitShowBubbleComponent:HitShowBubbleComponent = null;
	private _hitClientComponents:Array<BaseHitComponent> = null;

	public constructor() {
		this._hitClientComponents = [];
		this._hitCalculateComponent = new HitCalculateComponent();
		this._hitAcceptDamageComponent = new HitAcceptDamageComponent();
		this._hitShowBubbleComponent = new HitShowBubbleComponent();

		this._hitClientComponents.push(this._hitCalculateComponent);
		this._hitClientComponents.push(this._hitAcceptDamageComponent);
		this._hitClientComponents.push(this._hitShowBubbleComponent);
	}

	public fightAttackHappen(hitEntity:FightEntity,beHitEntity:FightEntity):void
	{
		let hitResult = new HitResult();
		hitResult.attackEntity = hitEntity;
		hitResult.defenceEntity =beHitEntity;
		hitResult.skillId = hitResult.attackEntity.currentSkillId;
		HitManager.instance.onCollision(hitResult);
	}

	public onCollision(hitResult:HitResult):void
	{
		for(let index = 0;index < this._hitClientComponents.length;index ++)
		{
			let component = this._hitClientComponents[index];
			if(!component.hit(hitResult)){
				return 
			}
		}
		
		//console.log("对象",hitResult.attackEntity.entityModel.id,"(",hitResult.attackEntity.entityModel.teamType,")","对--->敌人",hitResult.defenceEntity.entityModel.id,"造成了伤害",hitResult.damageResult.damage);
	}
}