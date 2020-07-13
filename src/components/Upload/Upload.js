import React, { useState } from 'react';
import { Link } from '@reach/router';
import { auth, signInWithGoogle } from '../../Firebase/firebase';
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

const Upload = () => {

  return (
    <div>
      <Box padding={3}>
        <Container>
          <Box padding={3}>
            <Heading size="md">Upload new documents</Heading>
          </Box>
          <Box padding={2}>
            <Button
              onClick={() => {}}
              text="Upload"
              color="blue"
              inline
            />
          </Box>
        </Container>
      </Box>
    </div>
  );
};
export default Upload;