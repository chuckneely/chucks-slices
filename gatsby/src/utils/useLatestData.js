import { useEffect, useState } from 'react';

export default function useLatestData() {
  // hot slices
  const [hotSlices, setHotSlices] = useState();
  // slicemasters
  const [sliceMasters, setSliceMasters] = useState();

  const gql = String.raw; // fakes graphql auto formatting

  const deets = `
    name
    _id
    image {
      asset {
        url
        metadata {
          lqip
        }
      }
    }
  `;

  // Use a side effect to fetch the data from the graphQl endpoint
  useEffect(function () {
    // when the component loads, fecth the data
    fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: gql`
          query {
            StoreSettings(id: "downtown") {
              name
              sliceMasters {
                ${deets}
              }
              hotSlices {
                ${deets}
              }
            }
          }
        `,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        // TODO: check for erros
        // set data to state
        setHotSlices(res.data.StoreSettings.hotSlices);
        setSliceMasters(res.data.StoreSettings.sliceMasters);
      });
  }, []);
  return {
    sliceMasters,
    hotSlices,
  };
}
