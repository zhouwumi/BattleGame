/**
 * 卡牌角色动作
 */
class FightActions {

	public static STAND:string = "stand";  //站立
	public static MOVE:string = "move";	   //移动
	public static ATTACK1:string = "attack1";//攻击动作1
	public static ATTACK2:string = "attack2";//攻击动作2
	public static ATTACK3:string = "attack3";//攻击动作3
	public static ATTACK4:string = "attack4";//攻击动作4
	public static ATTACK5:string = "attack5";//攻击动作5
	public static BUFF1:string = "buff1";//buff动作
	public static BUFF2:string = "buff2";//buff动作

	public static ALL_ACTIONS = [FightActions.STAND,FightActions.MOVE,FightActions.ATTACK1,FightActions.ATTACK2,FightActions.ATTACK3,FightActions.ATTACK4,FightActions.ATTACK5,FightActions.BUFF1,FightActions.BUFF2];
	public static FIGHT_ATTACK = [FightActions.ATTACK1,FightActions.ATTACK2,FightActions.ATTACK3,FightActions.ATTACK4,FightActions.ATTACK5];
}