import React, {useState, useEffect, useRef} from "react";
import { graphql, Link } from 'gatsby';
import Style from '../styles/gallery.module.css';

export default ({ data, location }) => {

    const allNodes = data.allMarkdownRemark.edges;
    const webNodes = allNodes.filter(obj => obj.node.frontmatter.type === 'shader'
                                         || obj.node.frontmatter.type === 'web');
    const liveNodes = allNodes.filter(obj => obj.node.frontmatter.type === 'live');
    const archNodes = allNodes.filter(obj => obj.node.frontmatter.type === 'arch');

    const nodes = [
      { title: 'Web', desc: 'Shaders, WebGL, and everything deployed on the web', nodes: webNodes },
      { title: 'Live', desc: 'Installations, live performances, and all other physical work', nodes: liveNodes },
      { title: 'Architecture', desc: 'A collection of projects done in Carnegie Mellon’s School of Architecture', nodes: archNodes },
    ]

    const prevs = location.state ? location.state.prevsection : 0; 

    const [currentSection, setSection] = useState(prevs);
    const [refs] = useState([0, ...nodes].map(s => useRef(null)));

    useEffect(() => {
      async function handleKey(e) {
        const newSection = e.key === "ArrowLeft"
          ? Math.max(currentSection-1, 0)
          : e.key === "ArrowRight"
            ? Math.min(currentSection+1, nodes.length)
            : currentSection
        setSection(newSection)
      }

      document.addEventListener('keydown', handleKey, false)
      refs[currentSection].current.scrollIntoView({behavior: "smooth"});
      return () => {
        document.removeEventListener('keydown', handleKey, false)
        refs[currentSection].current.scrollIntoView({behavior: "smooth"});
      }
    })

    return (
      <div>
        <div className={Style.main}>
          <div className={Style.section} ref={refs[0]}>
              <div className={Style.descriptionContainer}>
                <div className={Style.description}>
                  <h1>Hey,<br/>I'm Lukas</h1>
                  <p>I'm a creative technologist &amp; a student at Carnegie Mellon University studying Architecture and minoring in Human Computer Interaction.
                  <br/>
                  <a href="https://drive.google.com/file/d/18Bc1r-EAcIMSVAzuf7nTKncOJZGFcnEg/view?usp=sharing">Resume</a> <a href="https://github.com/lsh">GitHub</a> <a href="https://twitter.com/lukashermann_">Twitter</a>
                  </p>
                </div>
              </div>
          </div>
          {nodes.map((n, i) => (
            <div key={n.title} className={Style.section} ref={refs[i+1]}>
              <div className={Style.descriptionContainer}>
                <div className={Style.description}>
                  <h2>{n.title}</h2>
                  <p>{n.desc}</p>
                </div>
              </div>
              <div className={Style.thumbnailContainer}>
                <div className={Style.thumbnails}>
                  {n.nodes.map(({node}) => (
                    <Link key={node.frontmatter.slug}
                          to={'/'+node.frontmatter.slug}
                          className={Style.portfolioItem}
                          state={{prevsection: i+1}}
                    >
                      <img alt={`thumbnail-${node.frontmatter.name}`}
                          src={node.frontmatter.thumbnail.publicURL}
                          className={Style.thumbnail}
                      />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))
          }
        </div>
        <div className={Style.scrollLabel}>
          &larr; &rarr; To Navigate<br />
          Developed by Lukas Hermann with Gatsby
        </div>
      </div>
    );
}

export const query = graphql`
    {
        allMarkdownRemark(sort: {fields: frontmatter___date, order: DESC}) {
            edges {
              node {
                id
                frontmatter {
                  date
                  slug
                  name
                  type
                  thumbnail {
                    publicURL
                  }
                }
              }
            }
          }
    }
`
