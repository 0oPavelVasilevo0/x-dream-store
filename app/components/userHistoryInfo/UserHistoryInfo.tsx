import productStore from '@/app/store/productStore'
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Box, Divider, IconButton, MenuItem, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Image from 'next/image'
import React from 'react'
import { observer } from 'mobx-react';

export default observer(function UserHistoryInfo() {
    const history = productStore.selectedHistoryInfoProduct

    const handleDelete = (index: number) => {
        productStore.removeSelectedHistoryInfoProduct(index);
    };

    return (
            <Accordion sx={{ display: (history.length > 0) ? 'block' : 'none' }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <Typography fontSize={14}>
                        {(history.length > 0) ? 'Your order history' : 'no order history'}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <>
                        {history && history.map((product: any, index: number) => (
                            <Box key={index} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1 }}>
                                    <MenuItem sx={{ width: '80%', gap: 1, p: 0.5 }}>
                                        <Image
                                            alt="img"
                                            src={product.url}
                                            height={40}
                                            width={30}
                                            loading='lazy'
                                        />
                                        <Typography noWrap fontSize={12}>
                                            {product.title}
                                        </Typography>
                                    </MenuItem>
                                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <IconButton
                                            size={'small'}
                                            color='warning'
                                            aria-label="delete"
                                            onClick={() => handleDelete(index)}
                                        >
                                            <DeleteIcon fontSize={'small'} />
                                        </IconButton>
                                    </Box>
                                </Box>
                            </Box>
                        ))}
                    </>
                </AccordionDetails>
            </Accordion>
    )
}
)
