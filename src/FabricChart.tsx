import React, {useState} from "react";
import {Fabric} from "./csv-parse.ts";
import {Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";

interface FabricChartProps {
    fabrics: Fabric[];
    chartableAttributes: string[];
    metric: boolean;
}

interface SelectorProps {
    attributes: string[];
    setAttribute: (string) => void;
    currentAttribute: string;
    label: string;
    metric: boolean;
}

let unsafe_selector_counter = 0;

const Selector = (props: SelectorProps) => {
    unsafe_selector_counter += 1;
    const labelId = `input-label-${unsafe_selector_counter}`;
    const selectId = `select-${unsafe_selector_counter}`;

    const makeAttrTitleCase = (attrName: string) => {
        const prettifiedAttributes = {
            "fabricWeight": "Fabric Weight",
            "tearStrengthWarp": "Warp Tear Strength",
            "tearStrengthFill": "Fill Tear Strength",
            "averageTearStrength": "Combined Tear Strength",
            "waterproof": "Waterproof Rating",
            "abrasion": "Abrasion Resistance"
        }

        return prettifiedAttributes[attrName];
    }

    const getUnits = (attrName: string, metric: boolean) => {
        const units = {
            "fabricWeight": metric ? "g/m²" : "oz/yd²",
            "tearStrengthWarp": metric ? "N" : "lbs",
            "tearStrengthFill": metric ? "N" : "lbs",
            "averageTearStrength": metric ? "N" : "lbs",
            "waterproof": metric ? "bar" : "psi",
            "abrasion": "cycles"
        }
        return units[attrName];
    }

    const getAttrText = (attrName: string, metric: boolean) => {
        return `${makeAttrTitleCase(attrName)} (${getUnits(attrName, metric)})`
    }

    return (
        <Box sx={{
            minWidth: 200,
            m: 2
        }}>
            <FormControl fullWidth>
                <InputLabel id={labelId}>{props.label}</InputLabel>
                <Select
                    labelId={labelId}
                    id={selectId}
                    value={props.currentAttribute}
                    label={props.label}
                    onChange={props.setAttribute}
                >
                    {props.attributes.map((attribute, index) => (
                        <MenuItem value={attribute} key={index}>
                            {getAttrText(attribute, props.metric)}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    )
}

export const FabricChart = (props: FabricChartProps) => {
    const [indAttr, setIndAttr] = useState("fabricWeight");
    const [depAttr, setDepAttr] = useState("abrasion")

    return (
        <div className={'flex flex-col'}>
            <p>chart here</p>
            <div className={'flex flex-row'}>
                <Selector attributes={props.chartableAttributes}
                          setAttribute={(event: SelectChangeEvent) => { setIndAttr(event.target.value); }}
                          currentAttribute={indAttr}
                          label={"X Axis"}
                          metric={props.metric}
                />
                <Selector attributes={props.chartableAttributes}
                          setAttribute={(event: SelectChangeEvent) => { setDepAttr(event.target.value); }}
                          currentAttribute={depAttr}
                          label={"Y Axis"}
                          metric={props.metric}
                />
            </div>
        </div>
    )
}