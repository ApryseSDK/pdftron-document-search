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
      },
      viewer.current
    ).then(async (instance) => {
      setInstance(instance);
      const { documentViewer, Search } = instance.Core;

      // load document
      const storageRef = storage.ref();
      const URL = await storageRef.child(docRef).getDownloadURL();
      documentViewer.loadDocument(URL);

      // perform search
      documentViewer.addEventListener('documentLoaded', () => {
        if (searchTerm) {
          const mode = Search.Mode.PAGE_STOP | Search.Mode.HIGHLIGHT;
          documentViewer.textSearchInit(searchTerm, mode);
        } else if (pageNumber) {
          documentViewer.setCurrentPage(pageNumber);
        }
      });
    });
  }, [docRef, pageNumber, searchTerm]);

  const download = () => {
    instance.UI.downloadPdf(true);
  };

  const doneViewing = async () => {
    navigate('/');
  };

  return (
    <div className={'prepareDocument'}>
      <Box display='flex' direction='row' flex='grow'>
        <Column span={2}>
          <Box padding={3}>
            <Heading size='md'>View Document</Heading>
          </Box>
          <Box padding={3}>
            <Row gap={1}>
              <Stack>
                <Box padding={2}>
                  <Button
                    onClick={download}
                    accessibilityLabel='download signed document'
                    text='Download'
                    iconEnd='download'
                  />
                </Box>
                <Box padding={2}>
                  <Button
                    onClick={doneViewing}
                    accessibilityLabel='complete signing'
                    text='Done viewing'
                    iconEnd='check'
                  />
                </Box>
              </Stack>
            </Row>
          </Box>
        </Column>
        <Column span={10}>
          <div className='webviewer' ref={viewer}></div>
        </Column>
      </Box>
    </div>
  );
};

export default ViewDocument;
