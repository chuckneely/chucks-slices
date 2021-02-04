import { graphql } from 'gatsby';
import React from 'react';
import BeersList from '../components/BeersList';
import SEO from '../components/SEO';

export default function BeersPage({ data }) {
  const beers = data.beers.nodes;
  return (
    <>
      <SEO title={`Beers! We have ${beers.length} in stock`} />
      <h2 className="center">
        We have {beers.length} beer{beers.length !== 1 && 's'} available!
      </h2>
      <BeersList beers={beers} />
    </>
  );
}

export const query = graphql`
  query {
    beers: allBeer {
      nodes {
        id
        image
        name
        price
        rating {
          average
          reviews
        }
      }
    }
  }
`;
