import productStore from '@/app/store/productStore'
import { customTheme } from '@/app/theme/theme'
import { Box, Card, CardContent, CardMedia, IconButton, Modal, Paper, Typography, useMediaQuery } from '@mui/material'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { observer } from 'mobx-react';
import React from 'react'

interface ModalProps {
    open: boolean;
    handleClose: () => void;
}

export default observer(function ModalWindow({ open, handleClose }: ModalProps) {
    const isExtraSmallScreen = useMediaQuery(customTheme.breakpoints.down('md'))
    const isXUltraSmallScreen = useMediaQuery(customTheme.breakpoints.down('xs'))

    const selectedProduct = productStore.selectedProduct;

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{
                position: isXUltraSmallScreen ? null : 'absolute',
                top: '50%',
                left: '50%',
                transform: isXUltraSmallScreen ? null : 'translate(-50%, -50%)',
                boxShadow: 24,
                width: isExtraSmallScreen ? '100%' : '88ch',
                maxHeight: isExtraSmallScreen ? '100vh' : '98%',
                display: isXUltraSmallScreen ? 'flex' : null,
                flexDirection: isXUltraSmallScreen ? 'column' : null,
            }}>
                <Card component={Paper} elevation={6} sx={{
                    borderRadius: isExtraSmallScreen ? 0 : 2,
                    height: isXUltraSmallScreen ? '100vh' : null,
                    maxHeight: isXUltraSmallScreen ? null : '96vh',
                    overflowY: 'auto',
                    overFlowX: 'auto',
                    display: isXUltraSmallScreen ? 'flex' : null,
                    flexDirection: isXUltraSmallScreen ? 'column' : null,
                }}>
                    <CardMedia
                        component="img"
                        image={selectedProduct && selectedProduct.hdurl}
                        alt={selectedProduct && selectedProduct.title}
                        sx={{
                            maxHeight: isXUltraSmallScreen ? '100vh' : '64vh',
                            objectFit: 'contain',
                            width: isXUltraSmallScreen ? '100%' : null,
                            flexGrow: isXUltraSmallScreen ? 1 : null,
                        }}
                    />
                    <CardContent sx={{
                        p: 0,
                        flexGrow: 1,
                    }}>
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: 1, alignItems: 'center', p: isXUltraSmallScreen ? '4px 8px' : 1 }}>
                            <Typography variant="h6" component="h2" p={1}>
                                {selectedProduct && selectedProduct.title}
                                <Typography fontSize={12}>
                                    {selectedProduct && selectedProduct.date}
                                </Typography>
                            </Typography>
                            <IconButton color='warning' size='small' onClick={handleClose}>
                                <CloseRoundedIcon />
                            </IconButton>
                        </Box>
                        <Box sx={{
                            p: 0.5,
                            maxHeight: '100%',
                            overflowY: 'auto',
                            flexGrow: 1,
                            display: 'flex',
                            flexDirection: 'column',
                        }}>
                            <Typography variant="body2" component="p"
                                sx={{
                                    p: 0.5,
                                    bgcolor: 'background.paper',
                                }}>
                                {selectedProduct && selectedProduct.explanation}
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Modal>
    )
}
)
