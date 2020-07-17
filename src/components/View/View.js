import React, { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { navigate } from '@reach/router';
import { Box, Column, Heading, Row, Stack, Button } from 'gestalt';
import { selectDocToView } from './ViewSlice';
import { storage } from '../../Firebase/firebase';
import WebViewer from '@pdftron/webviewer';
import 'gestalt/dist/gestalt.css';
import './View.css';

const ViewDocument = () => {
  const [instance, setInstance] = useState(null);

  const doc = useSelector(selectDocToView);
  const { docRef, searchTerm, pageNumber } = doc;

  const viewer = useRef(null);

  useEffect(() => {
    WebViewer(
      {
        path: 'webviewer',
        disabledElements: [
          'toolsButton',
          'searchButton',
          'menuButton',
          'contextMenuPopup',
          'freeHandToolGroupButton',
          'textToolGroupButton',
          'shapeToolGroupButton',
          'signatureToolButton',
          'eraserToolButton',
          'stickyToolButton',
          'freeTextToolButton',
          'miscToolGroupButton',
        ],
      },
      viewer.current,
    ).then(async instance => {
      setInstance(instance);

      const { docViewer } = instance;

      console.log('WebViewer');

      // load document
      const storageRef = storage.ref();
      const URL = await storageRef.child(docRef).getDownloadURL();
      console.log(URL);
      instance.docViewer.loadDocument(URL);

      // perform search
      docViewer.on('documentLoaded', () => {
        if (searchTerm) {
            const mode = docViewer.SearchMode.e_page_stop | docViewer.SearchMode.e_highlight;
            docViewer.textSearchInit(searchTerm, mode);
        } else if (pageNumber) {
            docViewer.setCurrentPage(pageNumber);
        }
      });
    });
  }, []);

  const download = () => {
    instance.downloadPdf(true);
  };

  const doneViewing = async () => {
    navigate('/');
  };

  return (
    <div className={'prepareDocument'}>
      <Box display="flex" direction="row" flex="grow">
        <Column span={2}>
          <Box padding={3}>
            <Heading size="md">View Document</Heading>
          </Box>
          <Box padding={3}>
            <Row gap={1}>
              <Stack>
                <Box padding={2}>
                  <Button
                    onClick={download}
                    accessibilityLabel="download signed document"
                    text="Download"
                    iconEnd="download"
                  />
                </Box>
                <Box padding={2}>
                  <Button
                    onClick={doneViewing}
                    accessibilityLabel="complete signing"
                    text="Done viewing"
                    iconEnd="check"
                  />
                </Box>
              </Stack>
            </Row>
          </Box>
        </Column>
        <Column span={10}>
          <div className="webviewer" ref={viewer}></div>
        </Column>
      </Box>
    </div>
  );
};

export default ViewDocument;
