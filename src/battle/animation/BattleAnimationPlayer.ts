class BattleAnimationPlayer {
	public avatar:BaseEntityAvatar;
	public armatureName:string;
	public bodyAnimation:db.DragonBonesAnimation;
	private _isDataReady:boolean
	private _scripts:Array<BaseScript> = null;
	private _isUpdating:boolean = false;
	private _skillBattleConfig:SkillBattleConfig = null

	public constructor(avatar:BaseEntityAvatar,armatureName:string) {
		this.avatar = avatar
		this.armatureName = armatureName;
		this._scripts = [];
		this._skillBattleConfig = null;
	}

	public update():void
	{
		if(this._scripts.length > 0)
		{
			this._isUpdating = true;
			this._scripts.forEach(function(script:BaseScript,index:number){
				script.update();
			},this);
			this._isUpdating = false;
			for(let index = this._scripts.length - 1 ;index >= 0; index --){
				let script = this._scripts[index]
				if(script.isEnd()){
					this._scripts.splice(index);
				}
			}
		}
	}

	public loadAnimation():void
	{
		if(this.avatar == null){
			return;
		}
		
		if(this.isHero()){
			this.bodyAnimation = CommonUtils.createDragonBones(this.armatureName);
			
		}else if(this.isRemote()){
			this.bodyAnimation = CommonUtils.createDragonBones(this.armatureName);
		}
		this.avatar.getLayer(AvatarLayer.Buff_Background).addChild(this.bodyAnimation);
		if(this.bodyAnimation.isDataReady()){
			this.onLoadAnimationCompelete()
		}else{
			this.bodyAnimation.readyCallback = this.onLoadAnimationCompelete;
			this.bodyAnimation.readyCallObject = this;
		}

	}

	public onLoadAnimationCompelete():void
	{
		this.bodyAnimation.readyCallback = null;
		this.bodyAnimation.readyCallObject = null;
		let self = this;
		egret.setTimeout(function(){
			self.avatar.viewReady();
		},this,1);
		

		this.getEgretArmatureDisplay().addEventListener(dragonBones.EventObject.COMPLETE, this.playCompeleteHandler, this);
		this.getEgretArmatureDisplay().addEventListener(dragonBones.EventObject.FRAME_EVENT, this.playFrameHandler, this);
	}

	public playCompeleteHandler(event:dragonBones.AnimationEvent):void
	{
		let eventObject = event.eventObject;
		if(this._skillBattleConfig && this._skillBattleConfig.action == eventObject.animationState.name)
		{
			let endScripts = this._skillBattleConfig.endScripts;
			endScripts.forEach(function(frameScript:Object,index:number){
				let newScript = BattleScriptFactory.createScript(this.avatar.battleEntity,this,frameScript);
				this.addScript(newScript)
			},this);
		}

		if(!FightUtils.isLoopAction(eventObject.animationState.name))
		{
			if(this.isHero()){
		//		this.bodyAnimation.play(FightActions.STAND);
				let thisEntity:FightEntity = this.avatar.battleEntity as FightEntity
				thisEntity.useNormalSkillByName(FightActions.STAND)
			}
		}

	}

	public playFrameHandler(event:dragonBones.AnimationEvent):void
	{
		let eventObject = event.eventObject;
		let frameScripts = this._skillBattleConfig.frameScripts[event.frameLabel]
		if(frameScripts){
			frameScripts.forEach(function(frameScript:Object,index:number){
				let newScript = BattleScriptFactory.createScript(this.avatar.battleEntity,this,frameScript);
				this.addScript(newScript)
			},this);
		}
	}

	public addScript(script:BaseScript):void
	{
		this._scripts.push(script);
		script.start();
	}

	public removeScript(script:BaseScript):void
	{
		if(this._isUpdating){
			return
		}
		let index = this._scripts.indexOf(script)
		this._scripts.splice(index);
	}

	public getBodyAnimation():db.DragonBonesAnimation
	{
		return this.bodyAnimation;
	}

	public getEgretArmatureDisplay():dragonBones.EgretArmatureDisplay
	{
		return this.bodyAnimation.display;
	}

	public get isDataReady():boolean
	{
		return this.bodyAnimation.isDataReady();
	}

	public useSkill(skillId:number):void
	{
		
		let skillBattleConfig = null;
		if(this.isHero()){
			let thisEntity = this.avatar.battleEntity as HeroEntity;
			skillBattleConfig = BattleConfigLoader.instance.getSkillBattleConfig(thisEntity.heroConfig.id,skillId);
		}else if(this.isRemote()){  //暂时远程还不是通过使用技能来做动作

		}
		this._skillBattleConfig = skillBattleConfig
		let action = skillBattleConfig.action;
		if(skillBattleConfig.isAttack || skillBattleConfig.isBuff)
		{
			this.play(skillBattleConfig.action,1)
		}else{
			this.play(skillBattleConfig.action,0)
		}
		let startScripts = this._skillBattleConfig.startScripts
		startScripts.forEach(function(script:Object,index:number,scripts:Array<Object>){
			let newScript = BattleScriptFactory.createScript(this.avatar.battleEntity,this,script);
			this.addScript(newScript)
		},this);
		
	}

	public play(animationName?: string | null, playTimes?: number):void
	{
		this.bodyAnimation.play(animationName,playTimes);
	}

	public gotoAndPlay(animationName: string,playTimes?: number):void
	{
		this.bodyAnimation.gotoAndPlay(animationName,playTimes);
	}

	public gotoAndStop(animationName: string, time?: number):void
	{
		this.bodyAnimation.gotoAndStop(animationName,time);
	}

	public isHero():boolean
	{
		return this.avatar.battleEntity.entityModel.entityType == EntityType.Hero
	}

	public isRemote():boolean
	{
		return this.avatar.battleEntity.entityModel.entityType == EntityType.Remote
	}
}