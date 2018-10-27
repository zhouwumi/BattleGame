class RoundManager {

	private static _instance:RoundManager = null;

	public static get instance():RoundManager
	{
		if(RoundManager._instance == null){
			RoundManager._instance = new RoundManager();
		}
		return RoundManager._instance;
	}

	private _currentRound:number = -1;
	private _currRoundsConfig:RoundsConfig = null;
	private _maxRoundCount:number = 0;

	public constructor() {

	}

	public loadRound(roundId):void
	{
		this._currRoundsConfig = BattleConfigLoader.instance.getRoundsConfig(roundId);
		this._currentRound = -1;
		this._maxRoundCount = this._currRoundsConfig.roundConfigs.length;
	}

	public gotoNextRound():void
	{
		this._currentRound += 1;
		if(this._currentRound >= this._maxRoundCount){
			console.log("######敌方全部被杀了，游戏结束###")
			battleScene.mapView.playBattleFail();
			return;
		}
		let roundConfig:RoundConfig = this._currRoundsConfig.roundConfigs[this._currentRound];
		let self = this;
		roundConfig.heroConfigs.forEach(function(heroConfig:RoundHeroConfig,index:number){
			let entity = HeroEntityManager.instance.createEntity(heroConfig);
			battleScene.mapView.addEntity(entity);
		})
	}
}