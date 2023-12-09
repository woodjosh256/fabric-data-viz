import React from "react";
import {
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarFilterButton,
    GridToolbarQuickFilter
} from "@mui/x-data-grid";
import {ToggleButton, ToggleButtonGroup} from "@mui/material";

interface CustomGridToolbarProps {
    metric: boolean;
    setMetric: (metric: boolean) => void;
}

export const CustomGridToolbar = (props: CustomGridToolbarProps) => {
    return (
        <GridToolbarContainer sx={{p: 2}} className={"w-full p-8"}>
            <GridToolbarQuickFilter />
            <GridToolbarColumnsButton/>
            <GridToolbarFilterButton />
            <div className={"flex-grow"}></div>
            <ToggleButtonGroup value={props.metric} size={"small"} exclusive={true}
                               onChange={(event: React.MouseEvent<HTMLElement>,
                                          newVal: boolean | null) => props.setMetric(newVal)}
                               className={'float-right'}
            >
                <ToggleButton value={true}>Metric</ToggleButton>
                <ToggleButton value={false}>Imperial</ToggleButton>
            </ToggleButtonGroup>
        </GridToolbarContainer>
    );
}