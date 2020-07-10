import React from 'react';
import { Router, navigate } from '@reach/router';

import {
  Box,
  Button,
  Toast,
  Container,
  Text,
  TextField,
  Heading,
} from 'gestalt';
import 'gestalt/dist/gestalt.css';

const Navigate = () => {
  return (
    <Box padding={3}>
      <Container>
        <Box padding={3}>
          <Box padding={1}>
            <Heading size="md">Upload new documents</Heading>
          </Box>
          <Box padding={1}>
            <Text>
              You can upload a new document, which will be indexed for searching
              and saved to file storage.
            </Text>
          </Box>
          <Box padding={1}>
            <Button
              onClick={event => {
                navigate('/upload');
              }}
              text="Upload"
              color="blue"
              inline
            />
          </Box>
        </Box>
        <Box padding={3}>
          <Box padding={1}>
            <Heading size="md">Search existing documents</Heading>
          </Box>
          <Box padding={1}>
            <Text>
              You can search for existing documents and view them in PDFTron
              WebViewer.
            </Text>
          </Box>
          <Box padding={1}>
            <Button
              onClick={event => {
                navigate('/search');
              }}
              text="Search"
              color="blue"
              inline
            />
          </Box>
        </Box>
        <Box padding={3}>
          <Box padding={1}>
            <Heading size="md">Profile</Heading>
          </Box>
          <Box padding={1}>
            <Text>You can sign out from the application.</Text>
          </Box>
          <Box padding={1}>
            <Button
              onClick={event => {
                navigate('/profile');
              }}
              text="Profile"
              color="blue"
              inline
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Navigate;
