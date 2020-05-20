import React, { useRef } from 'react'; 
import { graphql } from 'gatsby';
import { useFrame, Canvas, useThree } from 'react-three-fiber';
import { useWindowDimensions, useScrollPosition } from '../util';
import Style from '../styles/shader.module.css';

const MainObject = (props) => {
    const ref = useRef();
    const { size } = useThree();
    const resize = useWindowDimensions();
    const scroll = useScrollPosition();

    useFrame(() => {
        ref.current.material.uniforms.time.value += 0.05
        ref.current.material.uniforms.resolution.value = [size.width, size.height]
    });

    return (
            <mesh visible
                   key={[resize, scroll]}
                   ref={ref}>
                <planeBufferGeometry attach="geometry" args={[2,2]} />
                <shaderMaterial
                    attach="material"
                    fragmentShader={props.shader}
                    uniforms={{
                        resolution: {type: "v2", value: [size.width, size.height]},
                        time: {type: "f", value: 0},
                    }} />
            </mesh>
    );
}

export default ({ data }) => {
    const post = data.markdownRemark;
    return(
        <div className={Style.canvasContainer}>
            <Canvas className={Style.canvas}
                    camera={{position: [0, 0, 1]}}
                    gl2={true} >
                    <MainObject shader={post.rawMarkdownBody} />
            </Canvas>
        </div>
    );
}

export const query = graphql`
    query($slug: String!) {
        markdownRemark(frontmatter: { slug: { eq: $slug } } ) {
            rawMarkdownBody
            frontmatter {
                name
            }
        }
    }
`;
