export { Box };

import * as Three from 'Three';

import { GameObject } from "./GameObject";

class Box extends GameObject
{
    public constructor(Scene:Three.Scene, PhysicsEngine?:any, Position?:any, Static?:boolean)
    {
        super(Scene, 0, PhysicsEngine, Position, null, Static);
    }
}