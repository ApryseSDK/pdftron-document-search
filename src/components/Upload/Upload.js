import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from '@reach/router';
import { storage } from '../../Firebase/firebase';
import { selectUser } from '../../Firebase/firebaseSlice';
import { Box, Button, Container, Heading } from 'gestalt';
import 'gestalt/dist/gestalt.css';

const Upload = () => {
  const filePicker = useRef(null);
  const user = useSelector(selectUser);

  const { uid, email } = user;

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
        const referenceString = `documents/${uid}-${file.name}-${Date.now()}.${file.type}`;
        const docRef = storageRef.child(referenceString);
        docRef.put(file).then(function (snapshot) {
          console.log('Uploaded the blob');
        });

        // iterate over all pages available and extract text
        let i;
        for (i = 0; i < doc.getPageCount(); i++) {
          doc.loadPageText(i, text => {
            console.log(text);
          });
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
