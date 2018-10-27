/**
 * 碰撞检测器
 * 此游戏暂时不使用碰撞的方式来触发伤害。
 */
class HitCheckManager extends egret.DisplayObject{


	private static _instance:HitCheckManager = null;

	private _defenceBoxs:Array<DecisionBox>;
	private _attackBoxs:Array<DecisionBox>;
	private _hitRecords:Object = null;
	private _recordHitInfos:Object = null;

	public static get instance():HitCheckManager
	{
		if(HitCheckManager._instance == null){
			HitCheckManager._instance = new HitCheckManager();
		}
		return HitCheckManager._instance;
	}

	public constructor() {
		super();
		this._defenceBoxs = [];
		this._attackBoxs = [];
		this._recordHitInfos = {};
		this._hitRecords = {};
	 //	this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
	}

	protected onEnterFrame():void
	{
		for(let attackIndex = 0;attackIndex < this._attackBoxs.length;attackIndex++)
		{
			let attackBox:DecisionBox = this._attackBoxs[attackIndex];
			for(let defenceIndex = 0;defenceIndex < this._defenceBoxs.length;defenceIndex++)
			{
				let defenceBox:DecisionBox = this._defenceBoxs[defenceIndex];
				if(this.checkCanHit(attackBox,defenceBox)){
					let intersionRect = this.hitCheck(attackBox,defenceBox)
					if(!intersionRect.isEmpty()){
						let hitResult = new HitResult();
						hitResult.attackEntity = attackBox.entity as FightEntity;
						hitResult.defenceEntity = attackBox.entity as FightEntity;
						hitResult.skillId = hitResult.attackEntity.currentSkillId;
						HitManager.instance.onCollision(hitResult);
						console.log("######碰撞了##")
					}
				}
			}
		}
	}

	private checkCanHit(attackBox:DecisionBox,defenceBox:DecisionBox):boolean
	{
		if(attackBox.entity == defenceBox.entity){
			return false;
		}
		
		if(attackBox.entity.entityModel.teamType == defenceBox.entity.entityModel.teamType){
			return false;
		}

		if(attackBox.entity.entityModel.isDead || defenceBox.entity.entityModel.isDead){
			return false;
		}

		if(defenceBox.entity instanceof RemoteEntity){
			return false;
		}

		return true;
	}

	public hitCheck(attackBox:DecisionBox,defenceBox:DecisionBox):egret.Rectangle
	{
		let intersionRect = attackBox.intersectDecisionBox(defenceBox);
	//	console.log("###hitCheck####1111###",intersionRect)
		if(intersionRect.isEmpty()){
			return new egret.Rectangle(0,0,0,0);
		}
		let deltaY = Math.abs(attackBox.entity.entityModel.y - defenceBox.entity.entityModel.y);
	//	console.log("###hitCheck#######",deltaY,attackBox.z,defenceBox.z)
		if(deltaY > attackBox.z/2 + defenceBox.z/2){
			if(attackBox.entity.entityModel.teamType == TeamType.Team_Me){
			//	console.log("#########hitCheck########",deltaY,attackBox.z,defenceBox.z)
			}
			return new egret.Rectangle(0,0,0,0);
		}

		let lastHitTime = this.getLastHitTime(attackBox,defenceBox);
		if(lastHitTime == 0){
			this.addHitRecord(attackBox,defenceBox);
		}else{
			let currentTime = egret.getTimer();
			if(currentTime - lastHitTime >= attackBox.hitInterval){
				this.addHitRecord(attackBox,defenceBox);
			}else{
				return new egret.Rectangle(0,0,0,0);
			}
		}
		return intersionRect;
	}

	private addHitRecord(attackBox:DecisionBox,defenceBox:DecisionBox):void
	{
		let info = this._hitRecords[attackBox.hashCode]
		if(!info){
			info = {};
			this._hitRecords[attackBox.hashCode] = info
		}
		info[defenceBox.hashCode] = egret.getTimer();
	}

	private getLastHitTime(attackBox:DecisionBox,defenceBox:DecisionBox):number
	{
		let info = this._hitRecords[attackBox.hashCode];
		if(!info){
			return 0;
		}
		if(info[defenceBox.hashCode]){
			return info[defenceBox.hashCode]
		}
		return 0;
	}

	private removeHitRecord(attackBox:DecisionBox):void
	{
		this._hitRecords[attackBox.hashCode] = null;
	}

	public registerDefenceBox(defenceBox:DecisionBox):void
	{
		if(this._defenceBoxs.indexOf(defenceBox) == -1)
		{
			this._defenceBoxs.push(defenceBox);
		}

	}

	public unregisterDefenceBox(defenceBox:DecisionBox):void
	{
		let idx = this._defenceBoxs.indexOf(defenceBox);
		if(idx != -1)
		{
			this._defenceBoxs.splice(idx);
		}
	}

	public registerAttackBox(attackBox:DecisionBox):void
	{
		if(this._attackBoxs.indexOf(attackBox) == -1)
		{
			this._attackBoxs.push(attackBox);
		}
	}

	public unregisterAttackBox(attackBox:DecisionBox):void
	{
		this.removeHitRecord(attackBox);
		let idx = this._attackBoxs.indexOf(attackBox);
		if(idx != -1)
		{
			this._attackBoxs.splice(idx);
		}
	}
}