import path from 'path';
import fetch from 'isomorphic-fetch';

async function turningPizzasIntoPages({ graphql, actions }) {
  // 1 Get a template for this page
  const pizzaTemplate = path.resolve('./src/templates/Pizza.js');
  // 2. Query all the pizzas
  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);
  // console.log(data);
  // 3. Loop over each pizza and create a page for that pizza
  data.pizzas.nodes.forEach((pizza) => {
    actions.createPage({
      // what is the URL for this new page?
      path: `pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      context: {
        slug: pizza.slug.current,
      },
    });
  });
}

async function turningToppingsIntoPages({ graphql, actions }) {
  // 1. Get the Template
  const toppingTemplate = path.resolve('./src/pages/pizzas.js');
  // 2.Query all of the toppings
  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
        }
      }
    }
  `);
  // 3. Create a page for that topping
  data.toppings.nodes.forEach((topping) => {
    // console.log(`Creating apage for ${topping.name}`);
    actions.createPage({
      path: `topping/${topping.name}`,
      component: toppingTemplate,
      context: {
        topping: topping.name,
        // TODO Regex for toppings
        toppingRegex: `/${topping.name}/i`,
      },
    });
  });
}

async function fetchBeersAndTurnIntoNodes({
  actions,
  createNodeId,
  createContentDigest,
}) {
  // 1. Freth a list of beers
  const res = await fetch('https://api.sampleapis.com/beers/ale');
  const beers = await res.json();
  // console.log(beers);
  // 2. Loop over each one
  for (const beer of beers) {
    // Create a node for each beer
    const nodeMeta = {
      id: createNodeId(`beer-${beer.name}`),
      parent: null,
      children: [],
      internal: {
        type: 'Beer',
        mediaType: 'application/json',
        contentDigest: createContentDigest(beer),
      },
    };
    actions.createNode({
      ...beer,
      ...nodeMeta,
    });
  }
  // 3. Create node for that beer
}

async function turnSlicemastersIntoPages({ graphql, actions }) {
  // 1. Query all slicemasters
  const { data } = await graphql(`
    query {
      slicemasters: allSanityPerson {
        totalCount
        nodes {
          name
          id
          slug {
            current
          }
        }
      }
    }
  `);
  // 2. TODO: Turn each slicematser into their own page
  // 3. Figure out how pages there are bases on how many slicemasters there are
  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE);
  const pageCount = Math.ceil(data.slicemasters.totalCount / pageSize);

  // 4. Loop from 1 to n and create pages for them
  Array.from({ length: pageCount }).forEach((_, i) => {
    // console.log(`Creating page ${i}`);
    actions.createPage({
      path: `/slicemasters/${i + 1}`,
      component: path.resolve('./src/pages/slicemasters.js'),
      // this data is passed to the template when we create it
      context: {
        skip: i * pageSize,
        currentPage: i + 1,
        pageSize,
      },
    });
  });

  // 5. Loop over each slicemaster and create a page for that person
  data.slicemasters.nodes.forEach((person) => {
    actions.createPage({
      // what is the URL for this new page?
      path: `slicemaster/${person.slug.current}`,
      component: path.resolve('./src/templates/Slicemaster.js'),
      context: {
        slug: person.slug.current,
      },
    });
  });
}

export async function sourceNodes(params) {
  // fetch a list of beers and source them into our gatsby api
  await Promise.all([fetchBeersAndTurnIntoNodes(params)]);
}

export async function createPages(params) {
  // Create pages dynamically
  // Wait for all promises to be resolved before finishing this function
  await Promise.all([
    turningPizzasIntoPages(params),
    turningToppingsIntoPages(params),
    turnSlicemastersIntoPages(params),
  ]);
  // 1. Pizzas
  // 2. Toppings
  // 3. Slicemasters
}
