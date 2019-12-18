import React, { useRef} from 'react'; 
import { graphql } from 'gatsby';
import { useRender, Canvas } from 'react-three-fiber';

const MainObject = (props) => {
    const ref = useRef();
    useRender(() => ref.current.material.uniforms.time.value += 0.05);
    return (
            <mesh visible
                   ref={ref}>
                <planeBufferGeometry attach="geometry" args={[2,2]} />
                <shaderMaterial
                    attach="material"
                    fragmentShader={props.shader}
                    uniforms={{
                        resolution: {type: "v2", value: [props.width, props.height]},
                        time: {type: "f", value: 0},
                    }}
                />
            </mesh>
    );
}

export default ({ data }) => {
    const aspect = window.innerHeight / window.innerWidth;
    const w = 800;
    const h = 620;
    const post = data.markdownRemark;
    return(
        <div>
            <Canvas style={{width: `${w}px`, height: `${h}px`, background: "#000000"}}
                camera={{position: [0, 0, 1], aspect: aspect, viwport: [w, h]}}
                gl2={true}
                >
                    <MainObject width={w} height={h} shader={post.rawMarkdownBody} />
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