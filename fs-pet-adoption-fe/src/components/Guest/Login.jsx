import React, { useEffect, useContext, useRef } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import { useNavigate } from 'react-router-dom';
import { UsersContextInstance } from '../../context/UsersContext';

function Login({ isOpen, onOpen, onClose }) {
  const navigate = useNavigate();

  const { setErrorMsgClient, loginReq } = useContext(UsersContextInstance);

  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const navigateHome = () => {
    navigate('/');
  };

  useEffect(() => {
    setErrorMsgClient('');
    onOpen();
  }, []);

  return (
    <div>
      <Modal initialFocusRef={initialRef} finalFocusRef={finalRef} isOpen={isOpen} onClose={navigateHome}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Tabs variant='soft-rounded' colorScheme='purple'>
              <TabList>
                <Tab>Login</Tab>
                <Tab>Sign Up</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <LoginForm initialRef={initialRef} onClose={onClose} loginReq={loginReq}></LoginForm>
                </TabPanel>
                <TabPanel>
                  <SignUpForm initialRef={initialRef} onClose={onClose} loginReq={loginReq}></SignUpForm>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Login;
