class HeroEntityManager extends BaseEntityManager{
	private static _instance:HeroEntityManager = null;
	private _curIndex:number;

	public static get instance():HeroEntityManager
	{
		if(HeroEntityManager._instance == null){
			HeroEntityManager._instance = new HeroEntityManager();
		}
		return HeroEntityManager._instance;
	}

	public constructor() {
		super();
		this._curIndex = 1;
	}

	protected onEnterFrame():boolean
	{
		if(!super.onEnterFrame()){
			return false;
		}
		let comp = function(a:BaseEntity,b:BaseEntity):boolean{
			return a.entityModel.y >= b.entityModel.y;
		}
		this._entitys = this._entitys.sort((a:BaseEntity,b:BaseEntity) =>{
			if(a.entityModel.y > b.entityModel.y){
				return 1;
			}
			if(a.entityModel.y < b.entityModel.y){
				return -1;
			}
			return 0;
		});

		this._entitys.forEach(function(entity:BaseEntity,index:number){
			entity.view.parent.setChildIndex(entity.view,index);
		})
	}
	
	public getEntitys(teamType:TeamType):Array<HeroEntity>
	{
		let ret = [];
		for(let index = 0;index < this._entitys.length;index++){
			let fightEntity = this._entitys[index] as FightEntity;
			if(fightEntity.entityModel.teamType == teamType){
				ret.push(fightEntity)
			}
		}
		return ret;
	}

	public removeEntity(entity:BaseEntity):boolean
	{
		if(super.removeEntity(entity)){
			let enemyEntitys = this.getEntitys(TeamType.Team_Enemy)
			if(enemyEntitys.length <= 0){
				console.log("######敌方全部被杀了，开启下一波###")
				RoundManager.instance.gotoNextRound();
			}else{
				let myEntitys = this.getEntitys(TeamType.Team_Me)
				if(myEntitys.length <= 0){
					console.log("######我方全部被杀了，游戏结束###")
					return;
				}
			}
			
			return true;
		}
		return false;
	}



	public createEntity(config:RoundHeroConfig):HeroEntity
	{
		let heroId = config.heroId;
		let entityModel = new ActorEntityModel();
		entityModel.teamType = config.team;
		entityModel.x = config.x;
		entityModel.y = CommonUtils.stage.stageHeight - config.y;
		let heroConfig = BattleConfigLoader.instance.getHeroConfig(heroId);
		let newEntity = new HeroEntity(entityModel,heroConfig);
		return newEntity;
	}

	public tryGenerateEmemy(teamType:TeamType):HeroEntity
	{
		let myEntity = this.getMyEntity()
		let heroId = 10001//"wuyazi"
		if(teamType == TeamType.Team_Me){
			heroId = 10002 //"duanyu";
		}
		let heroConfig = BattleConfigLoader.instance.getHeroConfig(heroId);
		let entityModel = new ActorEntityModel();
		entityModel.teamType = teamType
		entityModel.y = CommonUtils.stage.stageHeight - 400;
		
		if(teamType == TeamType.Team_Me){
			if(myEntity){
				let num = Math.floor(Math.random() * 30) * (Math.floor(Math.random() * 2) == 1 ? 1:-1);
				entityModel.x = entityModel.x + num;
			}else{
				entityModel.x = 100;
			}
		}else{
			if(myEntity){
				entityModel.x = myEntity.entityModel.x + CommonUtils.stage.stageWidth;
			//	let num = Math.floor(Math.random() * 100) * (Math.floor(Math.random() * 2) == 1 ? 1:-1);
				let num = 100 * this._curIndex;
				entityModel.y = myEntity.entityModel.y + num
				this._curIndex *=-1
			}else{
				entityModel.x = CommonUtils.stage.stageWidth - 100;
				let num = Math.floor(Math.random() * 100) * (Math.floor(Math.random() * 2) == 1 ? 1:-1);
				entityModel.y = CommonUtils.stage.stageHeight - 400 + num;
			}
		}
		let newEntity = new HeroEntity(entityModel,heroConfig);
		return newEntity
	}

	public getMyEntity():HeroEntity
	{
		for(let index = 0;index < this._entitys.length;index ++)
		{
			let fightEntity = this._entitys[index] as FightEntity;
			if(fightEntity.entityModel.teamType == TeamType.Team_Me){
				return fightEntity as HeroEntity;
			}
		}
		return null;
	}

}