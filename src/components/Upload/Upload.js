import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from '@reach/router';
import { storage } from '../../Firebase/firebase';
import { selectUser } from '../../Firebase/firebaseSlice';
import { Box, Button, Container, Heading } from 'gestalt';
import algoliasearch from 'algoliasearch';
import 'gestalt/dist/gestalt.css';

const Upload = () => {
  const filePicker = useRef(null);
  const user = useSelector(selectUser);

  // initialize algolia
  const client = algoliasearch(
    process.env.REACT_APP_ALGOLIA_APP_ID,
    process.env.REACT_APP_ALGOLIA_API_KEY,
  );
  const index = client.initIndex(process.env.REACT_APP_ALGOLIA_INDEX_NAME);

  const { uid } = user;

  useEffect(() => {
    // listener for the file picker
    filePicker.current.onchange = async e => {
      const file = e.target.files[0];
      if (file) {
        // load up PDFTron SDK without the WebViewer
        const CoreControls = window.CoreControls;
        CoreControls.setWorkerPath('/webviewer');
        const doc = await CoreControls.createDocument(file);

        // upload document to Firebase Storage
        const storageRef = storage.ref();
        const referenceString = `documents/${uid}-${Date.now()}-${file.name}`;
        const docRef = storageRef.child(referenceString);
        docRef.put(file).then(function (snapshot) {
          console.log('Uploaded the file');
        });

        // upload text to be indexed
        const pushData = async (text, pageNumber) => {
          await index.saveObject(
            {
              title: file.name,
              description: text,
              pageNumber,
              docRef: referenceString,
            },
            {
              autoGenerateObjectIDIfNotExist: true,
            },
          );
        };

        // iterate over all pages available and extract text
        let i;
        for (i = 0; i < doc.getPageCount(); i++) {
          let pageNum = i + 1;
          doc.loadPageText(i, text => pushData(text, pageNum));
        }
      }
    };
  }, []);

  return (
    <div>
      <Box padding={3}>
        <Container>
          <Box padding={3}>
            <Heading size="md">Upload new documents</Heading>
          </Box>
          <Box padding={2}>
            <Button
              onClick={() => {
                if (filePicker) {
                  filePicker.current.click();
                }
              }}
              accessibilityLabel="upload a document"
              text="Upload a document"
              iconEnd="add-circle"
            />
          </Box>
        </Container>
      </Box>
      <input type="file" ref={filePicker} style={{ display: 'none' }} />
    </div>
  );
};
export default Upload;
