import { Box, Divider, Typography } from '@mui/material'
import { useSession } from 'next-auth/react'
import React from 'react'

export default function HelloContent() {
    const { data: session, status } = useSession()
    return (
        <>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                height: 'calc(50vh - 12px)'
            }}>
                {(status !== "authenticated") ? (
                    <Typography fontSize={26} >
                        Hello! Dream Store is glad to see you! You can register or login to make unusual purchases, or just look at cool content!
                    </Typography>
                ) : (
                    <>
                        <Typography fontSize={22}>
                            {'Hello, '}{session.user?.name}{'!'}
                        </Typography>
                        <Divider flexItem />
                        <Typography fontSize={16}>
                            {'Welcome to the Dream Store! Enjoy these extraordinary products!'}
                        </Typography>
                    </>
                )}
            </Box>
            <Divider />
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: 'calc(50vh - 12px)'
            }}>
                {'This store is made for fun. No payments, everything is fictitious. Cool pictures obtained using the NASA API, as well as funny jokes that not everyone will understand. The fictitious price calculation is taken from the Bitcoin APi)))'}
            </Box>
        </>
    )
}
