
class RoundsConfig {

	public roundConfigs:Array<RoundConfig> = null;
	public constructor(roundsConfig:Array<Object>) {
		this.roundConfigs = [];
		let self = this;
		roundsConfig.forEach(function(roundItemConfig:Object,index:number){
			let roundConfig:RoundConfig = new RoundConfig(roundItemConfig as Array<Object>);
			self.roundConfigs.push(roundConfig);
		})
	}

}

class RoundConfig{

	public heroConfigs:Array<RoundHeroConfig> = null;
	public constructor(roundConfig:Array<Object>) {
		this.heroConfigs = [];
		let self = this;
		roundConfig.forEach(function(heroConfig:Object,index:number){
			let roundHeroConfig:RoundHeroConfig = new RoundHeroConfig(heroConfig);
			self.heroConfigs.push(roundHeroConfig);
		})
	}

}

class RoundHeroConfig{
	public heroId:number;
	public team:number;
	public x:number;
	public y:number;

	public constructor(config:Object)
	{
		this.heroId = config["heroId"] || 0;
		this.team = config["team"] || 0;
		this.x = config["x"] || 0;
		this.y = config["y"] || 0;
	}
}