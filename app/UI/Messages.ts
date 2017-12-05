export { Messages }

import { Level } from "./../Levels/Level";

class Messages
{
    private _Level:Level;
    private _MSGPass:HTMLElement;
    private _MSGLevel:HTMLElement;
    private _MSGFail:HTMLElement;
    public constructor(Level:Level)
    {
        this._Level = Level;
        this._MSGLevel = document.getElementById("msg-level");
        this._MSGPass = document.getElementById("msg-pass");
        this._MSGFail = document.getElementById("msg-fail");
    }
    public SetLevel(Level:Level) : void
    {
        this._Level = Level;
    }
    public Show() : void
    {
        if(this._Level.Pass == this._Level.Passes || !this.CheckIfBoxes())
        {
            if(this._Level.Score >= this._Level.BronzeScore)
            {
                this._MSGLevel.style.display = "inline";
            }
            else
            {
                this._MSGFail.style.display = "inline";
            }
        }
        else
        {
            this._MSGPass.style.display = "inline";
        }
    }
    public Hide() : void
    {
        this._MSGLevel.style.display = "none";
        this._MSGFail.style.display = "none";
        this._MSGPass.style.display = "none";
    }
    private CheckIfBoxes()
    {
        let BoxCount = 0;
        for(let i = 0; i < this._Level.NowBoxTypes.length; i++)
        {
            BoxCount += this._Level.NowBoxTypes[i].Amount;
        }
        return BoxCount != 0;
    }
}