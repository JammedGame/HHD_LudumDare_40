export  { GameObject };

import * as Three from 'Three';
import * as Matter from 'matter-js';

class GameObject
{
    private _MatterObject:any;
    private _ThreeObject:Three.Object;
    public get Position() { return this._ThreeObject.position; }
    public set Position(value) { this._ThreeObject.position = value; }
    public get Rotation() { return this._ThreeObject.rotation; }
    public set Rotation(value) { this._ThreeObject.rotation = value; }
    public constructor(Scene:Three.Scene, TextureIndex:number, PhysicsEngine?:any, Position?:any, Size?:any, Static?:boolean)
    {
        if(GameObject.Textures == null) GameObject.LoadTextures();
        if(Size == null) 
        {
            Size = {X:100, Y:100, Z:100};
        }
        this._ThreeObject = new Three.Mesh( new Three.CubeGeometry(Size.X,Size.Y,Size.Z), new Three.MeshPhongMaterial( { color: 0xffffff, map:GameObject.Textures[TextureIndex] } ) );
        if(Position)
        {
            this._ThreeObject.position.x = Position.X
            this._ThreeObject.position.y = Position.Y
            this._ThreeObject.position.z = Position.Z
        }
        Scene.add(this._ThreeObject);
        if(PhysicsEngine != null)
        {
            this._MatterObject = Matter.Bodies.rectangle(this._ThreeObject.position.x, -this._ThreeObject.position.y, Size.X,Size.Y, { isStatic: !!Static });
            Matter.World.add(PhysicsEngine.world, [this._MatterObject]);
        }
    }
    public Update() : void
    {
        if(this._MatterObject != null)
        {
            this._ThreeObject.position.x = this._MatterObject.position.x;
            this._ThreeObject.position.y = -this._MatterObject.position.y;
            this._ThreeObject.rotation.z = -this._MatterObject.angle;
        }
    }
    public static Textures:any[];
    public static LoadTextures()
    {
        let TextureUrls = ["build/resources/box.png"];
        let TextureLoader = new Three.TextureLoader();
        let Textures : Three.Texture[] = [];
        for(let j = 0; j < TextureUrls.length; j++)
        {
            let NewTexture = TextureLoader.load(TextureUrls[j]);
            Textures.push(NewTexture);
        }
        GameObject.Textures = Textures;
    }
}