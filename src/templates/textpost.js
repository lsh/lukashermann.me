import React from 'react';
import { graphql, Link } from 'gatsby';
import Style from '../styles/post.module.css'

export default ({ data, location }) => {
    const { state = {} } = location;
    const { prevsection } = state;

    const post = data.markdownRemark;
    return (
        <div className={Style.content}>
            <Link to={'/'} className={Style.home} state={{prevsection: prevsection}}>&larr;Home</Link>
            <h1 className={Style.postheader}>{post.frontmatter.name}</h1>
            <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
    );
}

export const query = graphql`
    query($slug: String!) {
        markdownRemark(frontmatter: { slug: { eq: $slug } } ) {
            html
            frontmatter {
                name
            }
        }
    }
`;