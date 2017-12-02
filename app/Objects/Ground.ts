export  { Ground };

import * as Matter from 'matter-js';

class Ground
{
    private _MatterObject:any;
    public constructor(PhysicsEngine?:any, Position?:any, Size?:any)
    {
        if(Position == null) 
        {
            Position = {X:0, Y:0, Z:0};
        }
        if(Size == null) 
        {
            Size = {X:100, Y:100, Z:100};
        }
        if(PhysicsEngine != null)
        {
            this._MatterObject = Matter.Bodies.rectangle(Position.X, -Position.Y, Size.X, Size.Y, { isStatic: true });
            Matter.World.add(PhysicsEngine.world, [this._MatterObject]);
        }
    }
}