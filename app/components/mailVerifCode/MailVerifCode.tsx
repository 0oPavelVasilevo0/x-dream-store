import React from 'react';
import { Html, Container, Heading, Button, Text } from '@react-email/components'

export function MailVerifCode(verificationCode: string) {

  return (
    <Html lang='en'>
      <Container style={{
        maxWidth: '400px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Container style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Heading as='h2' style={{ color: '#3e3c46' }} >copy Your code</Heading>

          <Container style={{ marginTop: '6px', borderRadius: '6px', backgroundColor: '#3e3c46' }} >
            <Container style={{ width: '100%', }}>
              <Text style={{ padding: '4px', color: '#aeea00', textAlign: 'center', fontSize: 24 }} >{verificationCode}</Text>
            </Container>
          </Container>
        </Container>
      </Container>
    </Html>
  );
};
