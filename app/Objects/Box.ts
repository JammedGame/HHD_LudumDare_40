export { Box };

import * as Three from 'Three';

import { GameObject } from "./GameObject";

class Box extends GameObject
{
    private _Score:number;
    public get Score():number { return this._Score; }
    public constructor(Scene:Three.Scene, TexIndex:number, PhysicsEngine?:any, Position?:any, Size?:any, Static?:boolean, Mass?:number)
    {
        super(Scene, TexIndex, PhysicsEngine, Position, Size, Static, Mass);
        switch(TexIndex) { 
        case 0 : this._Score = 200;
                 break;
        case 1 : this._Score = 300;
                 break;
        case 2 : this._Score = 400;
                 break;
        case 3 : this._Score = 400;
                 break;
        case 4 : this._Score = 600;
                 break;
        case 5 : this._Score = 800;
                 break;       
        
        }
        
    }
}