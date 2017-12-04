export { Character }

import * as Three from 'Three';
import * as OBJLoader from "three-obj-loader";
OBJLoader(Three);

class Character
{
    private _Mixer:any;
    private static Geometry:any;
    private Scene:Three.Scene;
    public get Mixer():any { return this._Mixer; }
    public constructor(Scene:Three.Scene)
    {
        this.Scene = Scene;
        if(Character.Textures == null) Character.LoadTextures();
        if(!Character.Geometry) this.LoadGeometry();
        else
        {
            Scene.add(Character.Geometry);
        }
    }
    private LoadGeometry() : void
    {
        var Loader = new Three.JSONLoader();
        Loader.load( 'build/resources/untitled.json', this.LoadFinished.bind(this));
    }
    private LoadFinished(geometry, materials) : void
    {
        geometry.uvsNeedUpdate = true;
        let Mesh = new Three.SkinnedMesh( geometry, new Three.MeshLambertMaterial( { color: 0xffffff, map:Character.Textures[0] }));
        Mesh.scale.set(100,100,100);
        Mesh.rotation.y = Math.PI / 2;
        Mesh.position.x = -100;
        Mesh.position.y = 0;

        this.Scene.add(Mesh);

        let clip = Three.AnimationClip.findByName( Mesh.geometry.animations, 'Armature|Main|Layer0' );
        let AM = new Three.AnimationMixer(Mesh);
        this._Mixer = AM;
        let AA = AM.clipAction(clip);
        AA.play();
    }
    public static Textures:any[];
    public static LoadTextures()
    {
        let TextureUrls = ["build/resources/char2.png"];
        let TextureLoader = new Three.TextureLoader();
        let Textures : Three.Texture[] = [];
        for(let j = 0; j < TextureUrls.length; j++)
        {
            let NewTexture = TextureLoader.load(TextureUrls[j]);
            NewTexture.wrapT = NewTexture.wrapS = Three.RepeatWrapping;
            Textures.push(NewTexture);
        }
        Character.Textures = Textures;
    }
}