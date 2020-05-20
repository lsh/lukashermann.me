import React from "react";
import { graphql, Link } from 'gatsby';
import Style from '../styles/gallery.module.css';

export default ({ data }) => {
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

    return (
        <div className={Style.main}>
          {nodes.map((n, i) => (
            <div key={n.title} className={Style.section}>
              <div className={Style.description}>
                <h2>{n.title}</h2>
                <p>{n.desc}</p>
              </div>
              <div className={Style.thumbnails}>
                {n.nodes.map(({node}) => (
                  <Link key={node.frontmatter.slug}
                        to={node.frontmatter.slug}
                        className={Style.portfolioItem}
                  >
                    <img alt={`thumbnail-${node.frontmatter.name}`}
                        src={node.frontmatter.thumbnail.publicURL}
                        className={Style.thumbnail}
                    />
                  </Link>
                ))}
              </div>
            </div>
          ))
          }
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
