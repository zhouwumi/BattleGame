class BattleCreateEntityEvent extends egret.Event{

	public entity:BaseEntity = null;

	public constructor(entity:BaseEntity) {
		super(BattleEventType.ADD_ENTITY);
		this.entity = entity;
	}
	
}