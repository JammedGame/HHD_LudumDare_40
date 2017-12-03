export { LevelManager }

import { Level } from "./Level";
import { Levels } from "./Levels";

class LevelManager
{
    private _Index:number;
    private _Level:Level;
    public get Level():Level { return this._Level; }
    public constructor(Start?:number)
    {
        if(Start == null) Start = 0;
        this._Index = Start;
        this._Level = new Level(Levels[Start]);
    }
}