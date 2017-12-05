export { Box };

import * as Three from 'Three';

import { GameObject } from "./GameObject";
import { SoundMaster } from "./../SoundMaster";

class Box extends GameObject
{
    private _SoundType:string;
    private _Score:number;
    public get Score():number { return this._Score; }
    public constructor(Scene:Three.Scene, TexIndex:number, PhysicsEngine?:any, Position?:any, Size?:any, Static?:boolean, Mass?:number)
    {
        super(Scene, TexIndex, PhysicsEngine, Position, Size, Static, Mass);
        switch(TexIndex) { 
        case 0 :
        {
            this._Score = 200;
            this._SoundType = "Cardboard";
            break;
        }
        case 1 :
        {
            this._Score = 300;
            this._SoundType = "Wooden";
            break;
        }
        case 2 :
        {
            this._Score = 400;
            this._SoundType = "Metal";
            break;
        }
        case 3 :
        {
            this._Score = 400;
            this._SoundType = "Cardboard";
            break;
        }
        case 4 :
        {
            this._Score = 600;
            this._SoundType = "Wooden";
            break;
        }
        case 5 : 
        {
            this._Score = 800;
            this._SoundType = "Metal";
            break;
        }
        }
    }
    public PlayFall()
    {
        SoundMaster.Single.Play(this._SoundType);
    }
}