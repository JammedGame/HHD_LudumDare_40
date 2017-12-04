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
        this._Score = 200;
    }
}