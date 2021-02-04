import { MdStore as icon } from 'react-icons/md';

export default {
  name: 'storeSettings',
  title: 'Settings',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name',
      title: 'Store Name',
      type: 'string',
      description: 'Name of the store',
    },
    {
      name: 'headline',
      title: 'Headline',
      type: 'string',
      description: 'Main header of site',
    },
    {
      name: 'openingTimes',
      title: 'Opening Times',
      type: 'string',
      description: 'e.g: Open 11am to 11pm',
    },
    {
      name: 'sliceMasters',
      title: 'Slicemasters Currently Slicing',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'person' }] }],
    },
    {
      name: 'hotSlices',
      title: 'Hot slices in the case',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'pizza' }] }],
    },
  ],
};
