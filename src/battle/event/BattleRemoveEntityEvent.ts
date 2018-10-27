class BattleRemoveEntityEvent extends egret.Event{
	public entity:BaseEntity = null;

	public constructor(entity:BaseEntity) {
		super(BattleEventType.REMOVE_ENTITY);
		this.entity = entity;
	}
}