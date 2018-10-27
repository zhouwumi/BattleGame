class NumberContainerPool {

	private static _instance:NumberContainerPool = null;

	public static get instance():NumberContainerPool
	{
		if(NumberContainerPool._instance == null){
			NumberContainerPool._instance = new NumberContainerPool();
		}
		return NumberContainerPool._instance;
	}
	public static MAX_NUMBER_CONTAINER_NUM = 10;

	private _numberContainers:Array<NumberContainer>;
	public constructor() {
		this._numberContainers = [];
		for(let index = 0;index < NumberContainerPool.MAX_NUMBER_CONTAINER_NUM;index++)
		{
			this._numberContainers.push(new NumberContainer(""));
		}
	}

	public getNumberContainer(linkName:string):NumberContainer
	{
		let firstChild = this._numberContainers[0];
		if(firstChild){
			this._numberContainers.splice(0);
			firstChild.setNumberLinkName(linkName);
		}else{
			firstChild = new NumberContainer(linkName)
		}
		return firstChild
	}

	public returnNumberContainer(numberContainer:NumberContainer):void
	{
		if(this._numberContainers.length >= NumberContainerPool.MAX_NUMBER_CONTAINER_NUM){
			return;
		}
		this._numberContainers.push(numberContainer);
	}

}