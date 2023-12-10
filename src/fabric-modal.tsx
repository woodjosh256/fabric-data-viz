import React from "react";
import {Fabric} from "./csv-parse.ts";
import {Box, Grid, Modal, Typography} from "@mui/material";

interface FabricModalProps {
    fabric: Fabric;
    metric: boolean;
    open: boolean;
    close: () => void;
}


const titleMap = {
    id: 'ID',
    name: 'Name',
    brand: 'Brand',
    line: 'Line',
    construction: 'Construction',
    fabricWeight: 'Fabric Weight',
    tearStrengthWarp: 'Tear Strength (Warp)',
    tearStrengthFill: 'Tear Strength (Fill)',
    averageTearStrength: 'Average Tear Strength',
    waterproof: 'Waterproof Rating',
    abrasion: 'Abrasion Resistance',
    width: 'Width',
    price: 'Price Range',
    filmBacking: 'Film Backing',
    carbonOffset: 'Carbon Offset',
    laminatedMaterial: 'Laminated Material',
    handFeel: 'Hand Feel',
    recycled: 'Recycled Material',
    colorsAvailable: 'Available Colors',
    printable: 'Good for Dye Sublimation Printing',
};

export const FabricModal = (props: FabricModalProps) => {
    return (
        <div className={'flex items-center h-full'}>
            <Modal open={props.open} onClose={props.close}>
                <Box sx={{
                    backgroundColor: 'background.paper',
                    padding: 4,
                    borderRadius: 2,
                    maxWidth: 600,
                    margin: 'auto',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '80%'
                }}
                >
                    <Typography variant="h6" gutterBottom>
                        Fabric Details
                    </Typography>
                    <Grid container spacing={1}>
                        {Object.entries(props.fabric).map(([key, value]) => (
                            key != 'id' && key != 'colorCount' && (<Grid item xs={6} key={key}>
                                <Typography variant="subtitle1"><strong>{titleMap[key]}</strong></Typography>
                                <Typography variant="body1">{value.toString()}</Typography>
                            </Grid>)
                        ))}
                    </Grid>
                </Box>
            </Modal>
        </div>
    );
};