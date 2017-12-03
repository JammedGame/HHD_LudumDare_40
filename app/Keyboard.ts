export { Keyboard }

class Keyboard
{
    private _LeftDown:boolean;
    private _RightDown:boolean;
    private _SpaceDown:boolean;
    public get Left():boolean { return this._LeftDown; }
    public get Right():boolean { return this._RightDown; }
    public get Space():boolean { return this._SpaceDown; }
    public constructor()
    {
        this.Init();
    }
    public Init() : void
    {
        this._LeftDown = false;
        this._RightDown = false;
        this._SpaceDown = false;
        document.addEventListener("keydown", this.KeyDown.bind(this)); 
        document.addEventListener("keyup", this.KeyUp.bind(this)); 
    }
    public KeyDown(event)
    {
        //console.log(event);
        if(event.keyCode == 32)
        {
            this._SpaceDown = true;
        }
        if(event.keyCode == 37)
        {
            this._LeftDown = true;
        }
        else if(event.keyCode == 39)
        {
            this._RightDown = true;
        }
    }
    public KeyUp(event)
    {
        if(event.keyCode == 37 || event.keyCode == 39)
        {
            this._LeftDown = false;
            this._RightDown = false;
        }
        if(event.keyCode == 32)
        {
            this._SpaceDown = false;
        }
    }
}