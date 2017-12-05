export { SoundMaster }

import * as Howler from "howler";

class SoundMaster
{
    public static Single:SoundMaster;
    private _Music:any;
    private _Walk:any;
    private _CardboardBoxFall:any;
    private _WoodenBoxFall:any;
    private _MetalBoxFall:any;
    public constructor()
    {
        this.Init();
    }
    private Init()
    {
        this._Music = new Howler.Howl(
            {
                src:"./build/resources/carrying.wav",
                autoplay:false,
                loop:true,
                volume:0.2,
            }
        )

        this._Walk = new Howler.Howl(
            {
                src:"./build/resources/walk.wav",
                autoplay:false,
                loop:true,
                volume:1.5,
            }
        )

        this._CardboardBoxFall = new Howler.Howl(
            {
                src:"./build/resources/cardboard.wav",
                autoplay:false,
                loop:false,
                volume:1.0,
            }
        )

        this._WoodenBoxFall = new Howler.Howl(
            {
                src:"./build/resources/wooden.wav",
                autoplay:false,
                loop:false,
                volume:1.0,
            }
        )

        this._MetalBoxFall = new Howler.Howl(
            {
                src:"./build/resources/metal.wav",
                autoplay:false,
                loop:false,
                volume:1.0,
            }
        )

        this._Music.play();

        SoundMaster.Single = this;
    }
    public Play(Track:string)
    {
        if(Track == "Walk")
        {
            if(!this._Walk.playing()) this._Walk.play();
        }
        else if(Track == "Cardboard")
        {
            this._CardboardBoxFall.play();
        }
        else if(Track == "Wooden")
        {
            this._WoodenBoxFall.play();
        }
        else if(Track == "Metal")
        {
            this._MetalBoxFall.play();
        }
    }
    public Stop(Track:string)
    {
        if(Track == "Walk")
        {
            if(this._Walk.playing())this._Walk.stop();
        }
    }
}