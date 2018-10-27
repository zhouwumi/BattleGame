class RemoteEntityManager extends BaseEntityManager{

	private static _instance:RemoteEntityManager = null;

	public static get instance():RemoteEntityManager
	{
		if(RemoteEntityManager._instance == null){
			RemoteEntityManager._instance = new RemoteEntityManager();
		}
		return RemoteEntityManager._instance;
	}

	public constructor() {
		super();
	}


	public tryGenerateRemote(remoteId:number,target:FightEntity,hostEntity:FightEntity):RemoteEntity
	{
		let remoteConfig:RemoteConfig = BattleConfigLoader.instance.getRemoteConfig(remoteId);
		let teamType = hostEntity ? hostEntity.entityModel.teamType : TeamType.Team_Me;

		let entityModel = new RemoteEntityModel();
		entityModel.teamType = teamType
		entityModel.target = target;
		entityModel.hostTarget = hostEntity;
		let newEntity = new RemoteEntity(entityModel,remoteConfig);
		battleScene.mapView.addEntity(newEntity);
		return newEntity;
	}

	

}