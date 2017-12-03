export { Level }

class Level
{
    private _BronzeScore:number;
    private _SilverScore:number;
    private _GoldScore:number;
    private _CraneSpeed:number;
    private _CraneLimit:number;
    private _BoxTypes:any[];
    public get BronzeScore():number { return this._BronzeScore; }
    public get SilverScore():number { return this._SilverScore; }
    public get GoldScore():number { return this._GoldScore; }
    public get CraneSpeed():number { return this._CraneSpeed; }
    public get CraneLimit():number { return this._CraneLimit; }
    public get BoxTypes():any[] { return this._BoxTypes; }
    public constructor(LevelObject:any)
    {
        this._BronzeScore = LevelObject.BronzeScore;
        this._SilverScore = LevelObject.SilverScore;
        this._GoldScore = LevelObject.GoldScore;
        this._CraneSpeed = LevelObject.CraneSpeed;
        this._CraneLimit = LevelObject.CraneLimit;
        this._BoxTypes = LevelObject.BoxTypes;
    }
}