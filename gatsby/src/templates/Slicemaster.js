import React from 'react';
import Img from 'gatsby-image';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import SEO from '../components/SEO';

const PersonStyles = styled.div`
  text-align: center;
  .gatsby-image-wrapper {
    margin: 3rem auto;
  }
`;

export default function Slicemaster({ data: { person } }) {
  return (
    <PersonStyles>
      <SEO title={person.name} image={person.image?.asset?.fluid?.src} />
      <h1>
        Meet <span className="mark">{person.name}</span>
      </h1>
      <Img fluid={person.image.asset.fluid} alt={person.name} />
      {person.description}
    </PersonStyles>
  );
}

// This needs to be dynamic based on the slug passed via contect in gatsby-node.js
export const query = graphql`
  query($slug: String!) {
    person: sanityPerson(slug: { current: { eq: $slug } }) {
      name
      id
      description
      image {
        asset {
          fluid(maxWidth: 1000, maxHeight: 750) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
`;
