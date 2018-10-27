class BattleConfigLoader {

	private static _instance:BattleConfigLoader = null;

	public static get instance():BattleConfigLoader
	{
		if(BattleConfigLoader._instance == null){
			let instance = new BattleConfigLoader();
			BattleConfigLoader._instance = instance
			instance.init();
		}
		return BattleConfigLoader._instance;
	}

	private _mapId2HeroConfig:Object = null;
	private _mapId2RemoteConfig:Object = null;
	private _mapBufferId2BufferInfo:Object = null;
	private _mapHeroId2SkillConfigs:Object = null;
	private _mapRoundId2RoundsConfig:Object = null;

	public constructor() {
		this._mapId2HeroConfig = {};
		this._mapId2RemoteConfig = {};
		this._mapBufferId2BufferInfo = {};
		this._mapHeroId2SkillConfigs = {};
		this._mapRoundId2RoundsConfig = {};
	}

	private init():void
	{
		this.loadHeroConfig();
		this.loadRemoteConfig();
		this.loadBufferConfig();
	}

	public loadHeroConfig():void
	{
		let heroConfigs = RES.getRes("heros_json");
		if(heroConfigs instanceof Array)
		{
			let self = this;
			heroConfigs.forEach(function(heroConfig:Object,index:number){
				let newHeroConfig = new HeroConfig(heroConfig);
				let heroId = newHeroConfig.id;
				self._mapId2HeroConfig[heroId] = newHeroConfig;
			},this);
		}
	}

	public getHeroConfig(heroId:number):HeroConfig
	{
		return this._mapId2HeroConfig[heroId];
	}

	public loadRemoteConfig():void
	{
		let remoteConfigs = RES.getRes("remotes_json");
		if(remoteConfigs instanceof Array)
		{
			let self = this;
			remoteConfigs.forEach(function(remoteConfig:Object,index:number){
				let newRemoteConfig = new RemoteConfig(remoteConfig);
				self._mapId2RemoteConfig[newRemoteConfig.id] = newRemoteConfig;
			},this);
		}
	}

	public getRemoteConfig(remoteId:number):RemoteConfig
	{
		return this._mapId2RemoteConfig[remoteId];
	}

	public loadBufferConfig():void
	{
		let bufferConfigs = RES.getRes("buffer_json");
		if(bufferConfigs instanceof Array)
		{
			let self = this;
			bufferConfigs.forEach(function(bufferConfig:Object,index:number){
				let bufferInfo = new BufferInfo(bufferConfig);
				self._mapBufferId2BufferInfo[bufferInfo.id] = bufferInfo
			},this);
		}
	}

	public getBufferInfo(id):BufferInfo
	{
		return this._mapBufferId2BufferInfo[id];
	}


	public loadSkillBattleConfig(heroId:number):void
	{
		if(this._mapHeroId2SkillConfigs[heroId]){
			return;
		}
		let skillConfigs = RES.getRes("skill_"+heroId+"_json");
		
		if(skillConfigs instanceof Array)
		{
			let skillBattleConfigs = [];
			skillConfigs.forEach(function(config:Object,index:number){
				let skillBattle = new SkillBattleConfig(config);
				skillBattleConfigs.push(skillBattle)
			},this);
			this._mapHeroId2SkillConfigs[heroId] = skillBattleConfigs
		}
	}

	public getSkillBattleConfig(heroId:number,skillId:number):SkillBattleConfig
	{
		let skillBattleConfigs = this.getSkillBattleConfigs(heroId);
		for(let index = 0;index < skillBattleConfigs.length;index++)
		{
			let skillConfig = skillBattleConfigs[index];
			if(skillConfig.id == skillId){
				return skillConfig;
			}
		}
		return null;
	}

	public getSkillBattleConfigs(heroId:number):Array<SkillBattleConfig>
	{
		if(!this._mapHeroId2SkillConfigs[heroId]){
			this.loadSkillBattleConfig(heroId);
		}
		return this._mapHeroId2SkillConfigs[heroId];
	}

	public getRoundsConfig(roundId:number):RoundsConfig
	{
		let roundsConfig = this._mapRoundId2RoundsConfig[roundId]
		if(roundsConfig){
			return roundsConfig;
		}
		let localConfig = RES.getRes("round"+roundId+"_json");
		roundsConfig = new RoundsConfig(localConfig)
		this._mapRoundId2RoundsConfig[roundId] = roundsConfig;
		return roundsConfig;
	}
}