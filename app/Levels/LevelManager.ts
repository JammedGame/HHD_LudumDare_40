export { LevelManager }

import { Level } from "./Level";
import { Levels } from "./Levels";
import { LevelHUD } from "./../UI/LevelHUD";

class LevelManager
{
    private _Index:number;
    private _Level:Level;
    private _HUD:LevelHUD;
    public get Level():Level { return this._Level; }
    public constructor(Start?:number)
    {
        if(Start == null) Start = 0;
        this._Index = Start;
        this._Level = new Level(Levels[Start]);
        this._HUD = new LevelHUD(this._Level);
    }
    public Update() : void
    {
        this._HUD.Update();
    }
    public Next() : void
    {
        if(this._Level.Pass == this._Level.Passes)
        {
            if(this._Level.Score >= this._Level.BronzeScore)
            {
                this._Index++;
                this._Level = new Level(Levels[this._Index]);
                this._HUD.SetLevel(this._Level);
            }
            else
            {
                this._Level.Reset();
                this._HUD.Update();
            }
        }
        else
        {
            this._Level.Pass += 1;
        }
    }
}