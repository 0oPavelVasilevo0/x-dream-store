import React from 'react';
import { Html, Container, Img, Heading, Button } from '@react-email/components'

export function MailContent(products: any[]) {

    return (
        <Html lang='en'>
            <Container style={{
                maxWidth: '400px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Container style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Heading as='h2' style={{ color: '#3e3c46' }} >Your Order</Heading>
                    {products.map((product) => (
                        <Container style={{ marginTop: '6px', borderRadius: '6px', backgroundColor: '#3e3c46' }} key={product.url}>
                            <Img src={product.url} alt={product.title} width="100%" height="auto" style={{ borderRadius: '6px 6px 0 0' }} />
                            <Container style={{ width: '100%', }}>
                                <Heading as='h4' style={{ padding: '4px', color: '#aeea00', textAlign: 'center', }} >{product.title}</Heading>
                                <Button href={product.hdurl} download style={{
                                    width: '100%',
                                    padding: '10px 0',
                                    backgroundColor: '#28272e',
                                    color: '#aeea00',
                                    textAlign: 'center',
                                    textDecoration: 'none',
                                    borderRadius: '0 0 4px 4px',
                                }}>
                                    Download Image
                                </Button>
                            </Container>
                        </Container>
                    ))}
                </Container>
            </Container>
        </Html>
    );
};
