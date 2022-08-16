window.addEventListener('DOMContentLoaded', ()=>{

    const canvas = document.getElementById('renderCanvas');
    const engine = new BABYLON.Engine(canvas, true);
    const scene = new BABYLON.Scene(engine);

    ///////////////////////////////////////////////CAMERAS//////////////////////////////////////////
    
    // const camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0, 0, -15), scene);
    const cameraTarget = new BABYLON.ArcRotateCamera('cameraTarget', 5, 1, 30, new BABYLON.Vector3(0, -4, 0), scene);
    //const UniversalCamera = new BABYLON.UniversalCamera('UniversalCamera', new BABYLON.Vector3(0, 0, -15), scene);
    cameraTarget.attachControl(canvas);

    ///////////////////////////////////////////////IMPORTS TEXTURES/////////////////////////////////////////////

    const groundTexture = new BABYLON.StandardMaterial('groundTexture', scene);
    groundTexture.diffuseTexture = new BABYLON.Texture('Texture/TextureMadeira.png', scene);
    const gramaTexture = new BABYLON.StandardMaterial('gramaTexture', scene);
    gramaTexture.diffuseTexture = new BABYLON.Texture('Texture/grama.jpg', scene);
   
    ///////////////////////////////////////////////IMPORTS MESHS/////////////////////////////////////////////

    const carro = new BABYLON.SceneLoader.Append("assets/", "gurgel.gltf", scene);

   
        //scene.createDefaultCameraOrLight(true, true, true);
        //carro.material = new BABYLON.StandardMaterial("carroMaterial", scene);	
        //carro.backFaceCulling = true
      





        

    ///////////////////////////////////////////////LIGHTS/////////////////////////////////////////////
    
    var light2 = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 5, 0), scene);
    //var light2 = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(1, 10, 1), scene);
    //var light3 = new BABYLON.DirectionalLight("DirectionalLight", new BABYLON.Vector3(1, -1, 1), scene);
    //var light4 = new BABYLON.SpotLight("spotLight", new BABYLON.Vector3(0, 30, -10), new BABYLON.Vector3(0, -1, 0), Math.PI / 3, 2, scene);
    
    //light.shadowEnabled = true;
    light2.intensity = 0.5;
  
    ///////////////////////////////////////////////MATERIALS//////////////////////////////////////////

    var WireFrameMaterial = new BABYLON.StandardMaterial("WireFrameMaterial", scene);
    WireFrameMaterial.diffuseColor = new BABYLON.Color3(1, 0, 1);
    WireFrameMaterial.specularColor = new BABYLON.Color3(0.5, 0.6, 0.87);
    WireFrameMaterial.emissiveColor = new BABYLON.Color3(1, 1, 1);
    WireFrameMaterial.ambientColor = new BABYLON.Color3(0.23, 0.98, 0.53);

    const vermelho = new BABYLON.StandardMaterial("vermelho", scene);
    vermelho.diffuseColor = new BABYLON.Color3(1, 0, 0);

    const azul = new BABYLON.StandardMaterial("azul", scene);
    azul.diffuseColor = new BABYLON.Color3(0, 0, 1);

    const verde = new BABYLON.StandardMaterial("verde", scene);
    verde.diffuseColor = new BABYLON.Color3(0, 1, 0);
    
    ///////////////////////////////////////////////MESHES/////////////////////////////////////////////
   
    const sphere = BABYLON.Mesh.CreateSphere('sphere', 16, 2, scene);
    const sphere2 = BABYLON.Mesh.CreateSphere('sphere2', 16, 2, scene);
    const box = BABYLON.Mesh.CreateBox('box', 2, scene);
    const ground = new BABYLON.Mesh.CreateGround('ground', 10, 10, 2, scene);
    const torus = new BABYLON.Mesh.CreateTorus('torus', 2, 0.5, 16, scene);
    const parede = new BABYLON.Mesh.CreatePlane('parede', 10, scene);

    ///////////////////////////////////////////////SET POSITONS/////////////////////////////////////////////
    
    ground.position.y = -5;
    box.position.x = 3;
    sphere.position.y = -4;
    sphere2.position.y = 4;
    torus.position.x = -3;
    parede.position.z = 5;
    light2.position = new BABYLON.Vector3(0, 0, -10);
    

    ///////////////////////////////////////////////SET ACTIONS/////////////////////////////////////////////

    torus.actionManager = new BABYLON.ActionManager(scene);
    torus.actionManager.registerAction(clickEvent()); 

    ///////////////////////////////////////////////SET MATERIALS/////////////////////////////////////////////

    box.material = WireFrameMaterial;
    WireFrameMaterial.wireframe = true; //set material wireframe to true
    sphere2.material = azul;
    sphere.material = vermelho;
    parede.material = azul;
    torus.material = verde;
    parede.material = groundTexture;
    ground.material = gramaTexture;

    
    ///////////////////////////////////////////////UPDATE/////////////////////////////////////////////
    var sobe = true;
    var viraLado = false;
    engine.runRenderLoop(()=>{
        scene.render();
        
        box.rotation.z += 0.03;
        box.rotation.y += 0.03;
        
        ///////////////////////////////////////////////zigzag ball

        if (sphere.position.y >= 2) 
        {
            sobe = false;
            if (sphere2.material == azul)
            {
                sphere2.material = vermelho;
                sphere.material = azul;
                
            }
            else
            {
                sphere2.material = azul;
                sphere.material = vermelho;
            }
        }
        else if(sphere.position.y <= -4) {
            sobe = true;
        }

        if(sobe){
            sphere.position.y += 0.01; 
        }
        else{
            sphere.position.y += -0.01;
        }

        ///////////////////////////////////////////////rotate torus
        if (viraLado) {
            torus.rotation.z += .009;
        }
        else {
            torus.rotation.z -= .009;
        }

        ///////////////////////////////////////////////UPDATE
    });
   
    function clickEvent(){ //Codigo executor na hora do click/
        let execCode =  new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, (event) => {
           if(viraLado)
            {
                viraLado = false;
            }
            else
            {
                viraLado = true;
            }
        });
        return execCode;
     }

});