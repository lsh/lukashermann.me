import React, { useEffect, useState } from "react";
import { graphql, Link } from 'gatsby';
import Style from '../styles/gallery.module.css';

export default ({ data }) => {
    const allNodes = data.allMarkdownRemark.edges;
    const shaderNodes = allNodes.filter(obj => obj.node.frontmatter.type === 'shader');
    const liveNodes = allNodes.filter(obj => obj.node.frontmatter.type === 'live');
    const archNodes = allNodes.filter(obj => obj.node.frontmatter.type === 'arch');
    const [nodes, setNodes] = useState(allNodes); 
    const [newNodes, setNewNodes] = useState(allNodes); 
    useEffect(()=> {
      setNodes(newNodes);
    }, [newNodes]);

    return (
        <div>
          <div className={Style.filters}>
            <p className={Style.filterItemNoLink}>Filters:</p>
            <p onClick={() => {setNodes([]); setNewNodes(allNodes)}} className={Style.filterItem}>All</p>
            <p onClick={() => {setNodes([]); setNewNodes(archNodes)}} className={Style.filterItem}>Architecture</p>
            <p onClick={() => {setNodes([]); setNewNodes(shaderNodes)}} className={Style.filterItem}>Shaders</p>
            <p onClick={() => {setNodes([]); setNewNodes(liveNodes)}} className={Style.filterItem}>Live</p>
          </div>
            {nodes.map(({ node }, index) => (
                <Link key={node.id} to={node.frontmatter.slug} className={Style.portfolioItem} style={{
                        animationDelay: `${index * 0.2}s`,
                    }}>
                        <img alt={`thumbnail-${node.frontmatter.name}`}
                            style={{
                              animationDelay: `${index * 0.2}s`,
                              opacity: '0'
                            }}
                            className={`thumbnail thumbnail-${index}`}
                            src={`${node.frontmatter.thumbnail.publicURL}`} />
                </Link>
            ))}
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
