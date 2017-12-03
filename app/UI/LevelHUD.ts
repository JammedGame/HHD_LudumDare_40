export { LevelHUD }

import { Level } from "./../Levels/Level";

class LevelHUD
{
    private _Level:Level;
    private _HUDScore:HTMLElement;
    private _HUDPass:HTMLElement;
    private _HUDLevel:HTMLElement;
    public constructor(Level:Level)
    {
        this._Level = Level;
        this._HUDScore = document.getElementById("lvl-score");
        this._HUDPass = document.getElementById("lvl-pass");
        this._HUDLevel = document.getElementById("lvl-current");
        this.Update();
    }
    public SetLevel(Level:Level) : void
    {
        this._Level = Level;
    }
    public Update()
    {
        this._HUDLevel.innerHTML = "Level: " + this._Level.Number;
        this._HUDPass.innerHTML = "Pass: " + this._Level.Pass + " / " + this._Level.Passes;
        this._HUDScore.innerHTML = "Score: " + this._Level.Score + " / " + this._Level.BronzeScore;
    }
}