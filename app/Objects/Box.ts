export { Box };

import * as Three from 'Three';

import { GameObject } from "./GameObject";

class Box extends GameObject
{
    private _Score:number;
    public get Score():number { return this._Score; }
    public constructor(Scene:Three.Scene, PhysicsEngine?:any, Position?:any, Static?:boolean)
    {
        super(Scene, 0, PhysicsEngine, Position, null, Static);
        this._Score = 200;
    }
}