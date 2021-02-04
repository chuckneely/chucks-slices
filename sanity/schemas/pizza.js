import { FaIgloo } from 'react-icons/fa';
import { MdLocalPizza as icon } from 'react-icons/md';
import PriceInput from '../components/PriceInput';

export default {
  name: 'pizza',
  title: 'Pizzas',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name',
      title: 'Pizza Name',
      type: 'string',
      description: 'Name of the pizza',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 100,
      },
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'Price of the pizza in GBP',
      validation: (Rule) => Rule.min(1000).max(50000),
      // TODO: Add custom input component
      inputComponent: PriceInput,
    },
    {
      name: 'vegetarian',
      title: 'Vegetarian?',
      type: 'boolean',
      options: {
        layout: 'checkbox',
      },
    },
    {
      name: 'toppings',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'topping' }] }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
      vegetarian: 'vegetarian',
      topping0: 'toppings.0.name',
      topping1: 'toppings.1.name',
      topping2: 'toppings.2.name',
      topping3: 'toppings.3.name',
    },
    prepare: ({ title, media, vegetarian, ...toppings }) => {
      const tops = Object.values(toppings).filter(Boolean);
      return {
        media,
        title: `${title}${vegetarian === undefined ? '' : ' 🌱'}`,
        subtitle: Object.values(tops).join(', '),
      };
    },
  },
};
