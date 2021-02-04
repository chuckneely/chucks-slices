import React from 'react';
import S from '@sanity/desk-tool/structure-builder';

// build a custom sidebar
export default function Sidebar() {
  return S.list()
    .title(`Slick's Slices`)
    .items([
      // Creat a new sub item
      S.listItem()
        .title('Home Page')
        .icon(() => <strong>🏠 </strong>)
        .child(
          S.editor()
            .schemaType('storeSettings')
            // make a new document ID so we don;t have a random string)
            .documentId('downtown')
        ),
      // add in the rest of our document items to the sidebar
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== 'storeSettings'
      ),
    ]);
}
