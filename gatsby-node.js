const path = require('path');
//const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
              frontmatter {
                  type
                  slug
              }
          }
        }
      }
    }
  `)
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    const postFormat = node.frontmatter.type === 'shader' ?
                        './src/templates/shaderpost.js':
                        './src/templates/textpost.js'; 

    createPage({
      path: `/${node.frontmatter.slug}`,
      component: path.resolve(postFormat),
      context: {
        slug: node.frontmatter.slug,
      },
    })
  })
}