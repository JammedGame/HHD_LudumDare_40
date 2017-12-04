export { Character }

import * as Three from 'Three';
import * as OBJLoader from "three-obj-loader";
OBJLoader(Three);

class Character
{
    private _File1:any;
    private _File2:any;
    private _File3:any;
    private _Mixer:any;
    private static Geometry:any;
    private Scene:Three.Scene;
    public get Mixer():any { return this._Mixer; }
    public constructor(Scene:Three.Scene)
    {
        this.Scene = Scene;
        if(Character.Textures == null) Character.LoadTextures();
        if(!Character.Geometry) this.LoadGeometry1();
        else
        {
            Scene.add(Character.Geometry);
        }
    }
    private LoadGeometry1() : void
    {
        var Loader = new Three.JSONLoader();
        Loader.load( 'build/resources/idle.json', this.LoadGeometry2.bind(this));
    }
    private LoadGeometry2(Geometry) : void
    {
        this._File1 = Geometry;
        var Loader = new Three.JSONLoader();
        Loader.load( 'build/resources/walk.json', this.LoadGeometry3.bind(this));
    }
    private LoadGeometry3(Geometry) : void
    {
        this._File2 = Geometry;
        var Loader = new Three.JSONLoader();
        Loader.load( 'build/resources/moonwalk.json', this.LoadFinished.bind(this));
    }
    private LoadFinished(Geometry, materials) : void
    {
        this._File3 = Geometry;
        let Mesh = new Three.SkinnedMesh( this._File2, new Three.MeshLambertMaterial( { color: 0xffffff, map:Character.Textures[0], skinning: true }));
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