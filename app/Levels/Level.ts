export { Level }

class Level
{
    private _Pass:number;
    private _Score:number;
    private _Passes:number;
    private _Number:number;
    private _BronzeScore:number;
    private _SilverScore:number;
    private _GoldScore:number;
    private _CraneSpeed:number;
    private _CraneLimit:number;
    private _BoxTypes:any[];
    public get Pass():number { return this._Pass; }
    public set Pass(value) { this._Pass = value; }
    public get Score():number { return this._Score; }
    public set Score(value) { this._Score = value; }
    public get Number():number { return this._Number; }
    public get Passes():number { return this._Passes; }
    public get BronzeScore():number { return this._BronzeScore; }
    public get SilverScore():number { return this._SilverScore; }
    public get GoldScore():number { return this._GoldScore; }
    public get CraneSpeed():number { return this._CraneSpeed; }
    public get CraneLimit():number { return this._CraneLimit; }
    public get BoxTypes():any[] { return this._BoxTypes; }
    public constructor(LevelObject:any)
    {
        this._Pass = 1;
        this._Score = 0;
        this._Passes = LevelObject.Passes;
        this._Number = LevelObject.Index + 1;
        this._BronzeScore = LevelObject.BronzeScore;
        this._SilverScore = LevelObject.SilverScore;
        this._GoldScore = LevelObject.GoldScore;
        this._CraneSpeed = LevelObject.CraneSpeed;
        this._CraneLimit = LevelObject.CraneLimit;
        this._BoxTypes = LevelObject.BoxTypes;
    }
}