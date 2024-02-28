// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, {useState} from "react";
import {Fabric} from "./csv-parse.ts";
import {Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {Scatter} from "react-chartjs-2";
import {Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Tooltip} from "chart.js";
import zoomPlugin from 'chartjs-plugin-zoom';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend, zoomPlugin);

interface FabricChartProps {
    fabrics: Fabric[];
    chartableAttributes: string[];
    metric: boolean;
    openFabricModal: (fabric: Fabric) => void;
}

interface SelectorProps {
    attributes: string[];
    setAttribute: (string) => void;
    currentAttribute: string;
    label: string;
    metric: boolean;
    disabled?: boolean;
}

let unsafe_selector_counter = 0;

const makeAttrTitleCase = (attrName: string) => {
    const prettifiedAttributes = {
        "fabricWeight": "Fabric Weight",
        "tearStrengthWarp": "Warp Tear Strength",
        "tearStrengthFill": "Fill Tear Strength",
        "averageTearStrength": "Combined Tear Strength",
        "waterproof": "Waterproof Rating",
        "abrasion": "Abrasion Resistance",
        "colorCount": "Number of Colors"
    }

    return prettifiedAttributes[attrName];
}

export const getUnits = (attrName: string, metric: boolean) => {
    const units = {
        "fabricWeight": metric ? "g/m²" : "oz/yd²",
        "tearStrengthWarp": metric ? "N" : "lbs",
        "tearStrengthFill": metric ? "N" : "lbs",
        "averageTearStrength": metric ? "N" : "lbs",
        "waterproof": metric ? "bar" : "psi",
        "abrasion": "cycles"
    }
    if (attrName in units) {
        return units[attrName];
    } else {
        return false;
    }
}

const Selector = (props: SelectorProps) => {
    unsafe_selector_counter += 1;
    const labelId = `input-label-${unsafe_selector_counter}`;
    const selectId = `select-${unsafe_selector_counter}`;

    return (
        <Box sx={{
            minWidth: 250,
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
                    disabled={props.disabled}
                >
                    {props.attributes.map((attribute, index) => (
                        <MenuItem value={attribute} key={index}>
                            {makeAttrTitleCase(attribute)}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    )
}

function Pallet() {
    const colors = ["#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#3D9970", "#111111", "#AAAAAA"];
    this.current = 0;

    this.getNext = () => {
        const color = colors[this.current];
        this.current += 1;
        return color;
    }
}


export const FabricChart = (props: FabricChartProps) => {
    const [indAttr, setIndAttr] = useState("fabricWeight");
    const [depAttr, setDepAttr] = useState("abrasion")

    const pallet = new Pallet();

    const groupedByLine = props.fabrics.reduce((grouped, fabric) => {
        if (!grouped[fabric.line]) {
            grouped[fabric.line] = [];
        }
        grouped[fabric.line].push(fabric);
        return grouped;
    }, {});

    const data = {
        datasets: Object.keys(groupedByLine).map(line => {
            return {
                label: line,
                data: groupedByLine[line].map((fabric) => ({
                    x: fabric[indAttr],
                    y: fabric[depAttr],
                    fabric: fabric
                })),
                backgroundColor: pallet.getNext()
            }
        })
    }

    const chartOptions = {
        scales: {
            x: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: `${makeAttrTitleCase(indAttr)} (${getUnits(indAttr, props.metric)})`
                }
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: `${makeAttrTitleCase(depAttr)} (${getUnits(depAttr, props.metric)})`
                }
            }
        },
        responsive: true,
        onClick: (event, elements, chart) => {
            if (elements.length > 0) {
                const firstElement = elements[0];
                const datasetIndex = firstElement.datasetIndex;
                const dataIndex = firstElement.index;
                const dataset = chart.data.datasets[datasetIndex];
                const dataPoint = dataset.data[dataIndex];

                props.openFabricModal(dataPoint.fabric);
            }
        },
        plugins: {
            tooltip: {
                enabled: true,
                callbacks: {
                    label: (context) => { return context.raw.fabric.name; }
                },
            },
            zoom: {
                pan: {
                    enabled: true,
                },
                zoom: {
                    wheel: {
                        enabled: true,
                    },
                    pinch: {
                        enabled: false
                    },
                    mode: 'y',
                },
                limits: {
                    x: {min: 'original', max: 'original'},
                    y: {min: 'original', max: 'original'},
                }
            }
        }
    }

    return (
        <div className={'flex flex-col items-center p-2'}>
            <div className={'flex flex-col'}>
                <div className={'flex flex-row items-center flex-wrap'}>
                    <Selector attributes={props.chartableAttributes}
                              setAttribute={(event: SelectChangeEvent) => {
                                  setDepAttr(event.target.value);
                              }}
                              currentAttribute={depAttr}
                              label={"Y Axis"}
                              metric={props.metric}
                    />
                    <p>vs</p>
                    <Selector attributes={props.chartableAttributes}
                              setAttribute={(event: SelectChangeEvent) => {
                                  setIndAttr(event.target.value);
                              }}
                              currentAttribute={indAttr}
                              label={"X Axis"}
                              metric={props.metric}
                              disabled={false}
                    />
                </div>
                <p className={'text-center'}>Scroll to zoom. Click on data point for more info.</p>
                <Scatter data={data} options={chartOptions}/>
            </div>
        </div>
    )
}