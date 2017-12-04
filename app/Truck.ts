export { Truck }

import * as Three from 'Three';
import * as Matter from 'matter-js';

class Truck
{
    private static Geometry:any;
    private Scene:Three.Scene;
    private _Engine:any;
    public constructor(Scene:Three.Scene, PhysicsEngine:any)
    {
        this.Scene = Scene;
        this._Engine = PhysicsEngine;
        if(Truck.Textures == null) Truck.LoadTextures();
        if(!Truck.Geometry) this.LoadGeometry();
        else
        {
            Scene.add(Truck.Geometry);
            this.CreateCollider();
        }
    }
    private LoadGeometry() : void
    {
        var Loader = new Three.JSONLoader();
        Loader.load( 'build/resources/Truck.json', this.LoadFinished.bind(this));
    }
    private LoadFinished(geometry, materials) : void
    {
        geometry.uvsNeedUpdate = true;
        let Mesh = new Three.Mesh( geometry, new Three.MeshLambertMaterial( { color: 0xffffff, map:Truck.Textures[0] }));
        Mesh.rotation.y = -Math.PI / 2;
        Mesh.scale.set(80,80,80);
        Mesh.position.set(3100,200,100);
        this.Scene.add(Mesh);
        this.CreateCollider();
    }
    private CreateCollider() : void
    {
        let Collider = Matter.Bodies.rectangle(3400, -110, 800, 220, { isStatic: true });
        Matter.World.add(this._Engine.world, [Collider]);
    }
    public static Textures:any[];
    public static LoadTextures()
    {
        let TextureUrls = ["build/resources/Truck.png"];
        let TextureLoader = new Three.TextureLoader();
        let Textures : Three.Texture[] = [];
        for(let j = 0; j < TextureUrls.length; j++)
        {
            let NewTexture = TextureLoader.load(TextureUrls[j]);
            NewTexture.wrapT = NewTexture.wrapS = Three.RepeatWrapping;
            Textures.push(NewTexture);
        }
        Truck.Textures = Textures;
    }
}