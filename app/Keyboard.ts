export { Keyboard }

class Keyboard
{
    private _LeftDown:boolean;
    private _RightDown:boolean;
    private _SpaceDown:boolean;
    private _ResetDown:boolean;
    public get Left():boolean { return this._LeftDown; }
    public get Right():boolean { return this._RightDown; }
    public get Space():boolean { return this._SpaceDown; }
    public get Reset():boolean { return this._ResetDown; }
    public set Reset(value) { this._ResetDown = value; }
    public constructor()
    {
        this.Init();
    }
    public Init() : void
    {
        this._LeftDown = false;
        this._RightDown = false;
        this._SpaceDown = false;
        this._ResetDown = false;
        document.addEventListener("keydown", this.KeyDown.bind(this)); 
        document.addEventListener("keyup", this.KeyUp.bind(this)); 
    }
    public KeyDown(event)
    {
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
        if(event.keyCode == 82)
        {
            this._ResetDown = true;
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
        if(event.keyCode == 82)
        {
            this._ResetDown = false;
        }
    }
}