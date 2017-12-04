export { BoxTypeDisplay }

import { Level } from "./../Levels/Level";

const BOX_TYPE_DISPLAYS_AMOUNT = 6;

class BoxTypeDisplay
{
    private static TextureUrls = ["build/resources/box0.png", "build/resources/box1.png", "build/resources/box2.png", "build/resources/box3.png", "build/resources/box4.png", "build/resources/box5.png"];
    private _Level:Level;
    private _BoxDivs:HTMLElement[];
    private _BoxImgs:HTMLImageElement[];
    private _BoxTexts:HTMLElement[];
    public constructor(Level:Level)
    {
        this._Level = Level;
        this._BoxDivs = [];
        this._BoxImgs = [];
        this._BoxTexts = [];
        for(let i = 1; i < BOX_TYPE_DISPLAYS_AMOUNT + 1; i++)
        {
            this._BoxDivs.push(document.getElementById("ui-elements-box-"+i));
            this._BoxImgs.push(<HTMLImageElement>document.getElementById("ui-elements-box-"+i+"-img"));
            this._BoxTexts.push(document.getElementById("ui-elements-box-"+i+"-text"));
        }
        this.HardUpdate();
    }
    public SetLevel(Level:Level) : void
    {
        this._Level = Level;
        this.HardUpdate();
    }
    public Update() : void
    {
        for(let i = 0; i < this._Level.NowBoxTypes.length && i < BOX_TYPE_DISPLAYS_AMOUNT; i++)
        {
            this._BoxTexts[i].innerHTML = this._Level.NowBoxTypes[i].Amount;
        }
    }
    private HardUpdate() : void
    {
        for(let i = 0; i < BOX_TYPE_DISPLAYS_AMOUNT; i++)
        {
            this._BoxDivs[i].style.display = "none";
        }
        for(let i = 0; i < this._Level.NowBoxTypes.length && i < BOX_TYPE_DISPLAYS_AMOUNT; i++)
        {
            this._BoxDivs[i].style.display = "block";
            this._BoxImgs[i].src = BoxTypeDisplay.TextureUrls[this.BoxTypeToIndex(this._Level.NowBoxTypes[i].Type)];
            this._BoxTexts[i].innerHTML = this._Level.NowBoxTypes[i].Amount;
        }
    }
    private BoxTypeToIndex(Type:string) : number
    {
        if(Type == "Cardboard") return 0;
        if(Type == "Wooden") return 1;
        if(Type == "Metal") return 2;
        if(Type == "Large Cardboard") return 3;
        if(Type == "Large Wooden") return 4;
        if(Type == "Large Metal") return 5;
        return -1;
    }
}