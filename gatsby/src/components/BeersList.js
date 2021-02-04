import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

const BeerStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  > div {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: space-evenly;
    padding: 2rem;
    text-align: center;
    border: 1px solid rgba(0, 0, 0, 0.1);
    img {
      display: grid;
      width: 100%;
      height: 200px;
      object-fit: contain;
      align-items: center;
      font-size: 12px;
    }
  }
`;

export default function BeerList({ beers }) {
  return (
    <BeerStyles>
      {beers.map((beer) => {
        const rating = Math.round(beer.rating.average);
        return (
          <div key={beer.id}>
            <h3>
              <span className="mark">{beer.name}</span>
            </h3>
            {beer.image && <img src={beer.image} alt={beer.name} />}
            {beer.price && <p>{beer.price}</p>}
            <p title={`${rating} our of 5 stars`}>
              {`⭐`.repeat(Math.round(rating))}
              <span style={{ filter: `grayscale(100%)` }}>
                {`⭐`.repeat(5 - rating)}
              </span>
              <span> ({beer.rating.reviews})</span>
            </p>
          </div>
        );
      })}
      ;
    </BeerStyles>
  );
}
