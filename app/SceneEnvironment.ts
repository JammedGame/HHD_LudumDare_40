export  { SceneEnvironment };

import * as Three from 'Three';

class SceneEnvironment
{
    private _Scene:Three.Scene;
    public constructor(Scene:Three.Scene)
    {
        this._Scene = Scene;
        let Floor = new Three.Mesh( new Three.CubeGeometry(7000,10,1000), new Three.MeshPhongMaterial( { color: 0xFF8C00 } ) );
        Floor.position.x = 2000;
        this._Scene.add(Floor);
        let Wall = new Three.Mesh( new Three.CubeGeometry(7000,1200,10), new Three.MeshPhongMaterial( { color: 0xFFD700 } ) );
        Wall.position.x = 2000
        Wall.position.y = 600;
        Wall.position.z = -200;
        this._Scene.add(Wall);
        this.AddLight(0);
        this.AddLight(1500);
        this.AddLight(3000);
        this.AddLight(4500);
    }
    private AddLight(X:number)
    {
        let Light = new Three.SpotLight( 0xffffff, 2, 4000, 0.3, 0.2 );
        this._Scene.add(Light);
        let targetObject = new Three.Object3D();
        targetObject.position.x = X;
        targetObject.position.y = 0;
        targetObject.position.z = -200;
        this._Scene.add(targetObject);
        Light.target = targetObject;
        Light.position.x = X;
        Light.position.z = 200;
        Light.position.y = 2000;
    }
}