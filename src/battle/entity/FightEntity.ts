class FightEntity extends BaseEntity{

	private _currentSkillId:number = 0;
	public constructor(model:BaseEntityModel) {
		super(model);
	}

	public useSkill(skillId:number):void
	{
		this._currentSkillId = skillId;
		this.view.useSkill(skillId);
	}

	public get currentSkillId():number
	{
		return this._currentSkillId
	}

	public useNormalSkillByName(skillName:string):void
	{
		let skillId = this.getNormalSkillIdByName(skillName);
		if(skillId == 0){
			return;
		}
		this.useSkill(skillId);
	}

	public get view():FightEntityAvatar
	{
		return this._view as FightEntityAvatar;
	}

	//根据技能名字获取对应的技能id
	public getNormalSkillIdByName(skillName:string):number
	{
		return 0;
	}

	public get entityModel():FightEntityModel
	{
		return this._entityModel as FightEntityModel;
	}

	protected initEntity():void
	{
		this.entityModel.direction = this.entityModel.teamType == TeamType.Team_Me ? Direction.RIGHT :Direction.LEFT
		if(this.entityModel.teamType == TeamType.Team_Me){
			this.entityModel.direction = Direction.RIGHT;
		}else if(this.entityModel.teamType == TeamType.Team_Enemy){
			this.entityModel.direction = Direction.LEFT;
		}
		super.updateViewPosition();
	}
}