/**
 * 卡牌信息 
 */
class HeroCardModel {

	public id:number = 0;//id
	public quality:number = 0;//品质
	public star:number = 0;//星级
	public level:number = 0;//等级
	public exp:number = 0;
	public skills:Array<any> = null; //技能 HeroCardSkillModel
	public equips:Array<any> = null; //装备 HeroCardEquipModel
	public fightModel:any = null; //战斗信息 HeroCardFightModel
	public config:any = null; //卡牌基本信息  HeroCardConfig

	public constructor() {
	}
}