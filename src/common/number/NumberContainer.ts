class NumberContainer extends egret.Sprite{

	private numberLinkName:string
	private numberArr:Array<egret.Bitmap>;
	private numberStr:string = ""

	public constructor(numberLinkName) {
		super();
		this.numberLinkName = numberLinkName;
		this.numberArr = [];
		for(var i = 0;i<10;i++){
			let bitmap = new egret.Bitmap();
			this.numberArr.push(bitmap);
		}
	}

	public setNumber(numberStr:string,typePrefix:string = "")
	{
		let numberlen = numberStr.length
		let childrenLen = numberlen;
		let existTypePrefix = typePrefix != ""
		if(existTypePrefix){
			childrenLen = childrenLen + 1;
		}
		let numbers = numberStr.split("");
		while(this.numChildren > childrenLen){
			DisplayUtil.removeFromParent(this.getChildAt(0))
		}
		
		let curChildLen = 0;
		if(existTypePrefix && this.numChildren > 0){
			let child:egret.Bitmap = this.getChildAt(curChildLen) as egret.Bitmap;
			child.texture = RES.getRes(typePrefix)
			curChildLen += 1;
		}else if(existTypePrefix){
			let bitmap = this.getBitmap();
			bitmap.texture = RES.getRes(typePrefix)
			this.addChild(bitmap);
			curChildLen += 1;
		}

		for(let index = curChildLen;index < this.numChildren;index++)
		{
			let numIndex = existTypePrefix ? index - 1:index
			let child:egret.Bitmap = this.getChildAt(index) as egret.Bitmap;
			child.texture = RES.getRes(this.numberLinkName + numbers[numIndex])
		}
		for(let index = this.numChildren;index < childrenLen;index++)
		{
			let numIndex = existTypePrefix ? index - 1:index
			let bitmap = this.getBitmap();
			bitmap.texture = RES.getRes(this.numberLinkName + numbers[numIndex])
			this.addChild(bitmap);
			
		}
		
		let nextX = 0;
		let height = 0;
		for(let index = 0;index < this.numChildren;index++)
		{
			let child = this.getChildAt(index);
			child.x = nextX;
			nextX += child.width;
			height = Math.max(height,child.height);
			
		}
		this.width = nextX;
		this.height = height;
	}

	public getBitmap()
	{
		for(let index = 0;index < 10;index++)
		{
			if(!this.numberArr[index].parent)
			{
				return this.numberArr[index];
			}
		}
		return null;
	}

	public reset()
	{

	}

	public getNumberCount()
	{
		return this.numChildren;
	}

	public setNumberLinkName(name)
	{
		this.numberLinkName = name;
	}
}