import { useEffect, useRef } from "react";
import { ContainerScene } from "./Scene.elements";
import { cleanUpScene, fecthFloatPointsElements, initScene } from "./Script";
import { FloatPoint, FloatPointText , FloatPointLabel,SceneContainer, SceneWrapper  } from "./styles";

const Scene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    initScene(mountRef);
    fecthFloatPointsElements();

    return () => {
      cleanUpScene();
    };
  }, []);

  return (
    <>
      <SceneContainer>
        <SceneWrapper>
          <ContainerScene className='SceneContainer' ref={mountRef}>
          </ContainerScene>

          <FloatPoint className="float-point float-point-1">
            <FloatPointLabel className="float-point-label">
              1
            </FloatPointLabel>

            <FloatPointText className="float-point-text">
              Loren Ipsum
            </FloatPointText>
          </FloatPoint>

          <FloatPoint className="float-point float-point-2">
            <FloatPointLabel className="float-point-label">
              2
            </FloatPointLabel>

            <FloatPointText className="float-point-text">
              Loren Ipsum
            </FloatPointText>
          </FloatPoint>
        </SceneWrapper>
        
      </SceneContainer>


    </>

  );
};

export default Scene;
