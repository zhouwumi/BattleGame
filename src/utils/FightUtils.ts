class FightUtils {
	
	public static isLoopAction(actionName:string):boolean
	{
		return actionName == FightActions.STAND || actionName == FightActions.MOVE;
	}
}