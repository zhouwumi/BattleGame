class BaseTrait {

	public params:Object
	private _buff:BaseBuff;
	public constructor(params:Object) {
		this.params = params
	}

	public bind(buff:BaseBuff):void
	{
		this._buff = buff;
		this.onBindEnd();
	}

	/**
	 * 绑定buff结束
	 */
	public onBindEnd():void
	{

	}

	public onStart():void
	{

	}

	public onEnterFrame():void
	{

	}

	/**
	 * 时长更新了
	 */
	public onDurationUpdate():void
	{

	}

	/**
	 * 特征脚本移除
	 */
	public onStopTrait():void
	{

	}

	public get buffer():BaseBuff
	{
		return this._buff
	}


}
