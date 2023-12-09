import React from 'react';
import {Fabric} from "./csv-parse.ts";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {CustomGridToolbar} from "./grid-toolbar.tsx";

const ozPerSquareYardToGramsPerSquareMeter = (oz: number) => oz * 33.906;
const lbsForceToNewtons = (lbs: number) => lbs * 4.44822;
const inchesToCentimeters = (inches: number) => inches * 2.54;
const psiToBar = (psi: number) => psi * 0.0689476;

interface FabricTableProps {
    fabrics: Fabric[];
    metric: boolean;
    setMetric: (metric: boolean) => void;
}

export const FabricTable = (props: FabricTableProps) => {
    const fabricWeightValueGetter = params => props.metric ? ozPerSquareYardToGramsPerSquareMeter(params.value as number).toFixed(2) : params.value;
    const forceValueGetter = params => props.metric ? lbsForceToNewtons(params.value as number).toFixed(2) : params.value;
    const lengthValueGetter = params => props.metric ? inchesToCentimeters(params.value as number).toFixed(2) : params.value;
    const pressureValueGetter = params => props.metric ? psiToBar(params.value as number).toFixed(2) : params.value;

    const fabricWeightValueFormatter = params => props.metric ? `${params.value} g/m²` : `${params.value} oz/yd²`;
    const forceValueFormatter = params => props.metric ? `${params.value} N` : `${params.value} lbs`;
    const lengthValueFormatter = params => props.metric ? `${params.value} cm` : `${params.value} in`;
    const pressureValueFormatter = params => props.metric ? `${params.value} bar` : `${params.value} psi`;
    const abrasionValueFormatter = params => `${params.value} cycles`;


    const COLUMNS: GridColDef<Fabric>[] = [
        { field: 'line', headerName: 'Line', width: 150 },
        { field: 'name', headerName: 'Name', width: 180 },
        { field: 'brand', headerName: 'Brand', width: 150 },
        { field: 'construction', headerName: 'Construction', width: 300 },
        { field: 'fabricWeight', headerName: 'Weight', width: 100, valueGetter: fabricWeightValueGetter, valueFormatter: fabricWeightValueFormatter },
        { field: 'abrasion', headerName: 'Abrasion Resistance', width: 160, valueFormatter: abrasionValueFormatter },
        { field: 'tearStrengthWarp', headerName: 'Tear Strength (warp)', width: 200, valueGetter: forceValueGetter, valueFormatter: forceValueFormatter },
        { field: 'tearStrengthFill', headerName: 'Tear Strength (fill)', width: 200, valueGetter: forceValueGetter, valueFormatter: forceValueFormatter},
        { field: 'averageTearStrength', headerName: 'Tear Strength', width: 120, valueGetter: forceValueGetter, valueFormatter: forceValueFormatter },
        { field: 'waterproof', headerName: 'Waterproof', width: 100, valueGetter: pressureValueGetter, valueFormatter: pressureValueFormatter },
        { field: 'width', headerName: 'Roll Width', width: 90, valueGetter: lengthValueGetter, valueFormatter: lengthValueFormatter },
        { field: 'price', headerName: 'Price', width: 90 },
        { field: 'filmBacking', headerName: 'Seam Tapable (has film backing)', width: 230 },
        { field: 'carbonOffset', headerName: 'Carbon Offset', width: 120 },
        { field: 'laminatedMaterial', headerName: 'Laminate', width: 80 },
        { field: 'handFeel', headerName: 'Hand Feel', width: 90 },
        { field: 'recycled', headerName: 'Recycled', width: 90 },
    ]
    // const VISIBLE_COLUMNS = ['line', 'name', 'fabricWeight', 'abrasion', 'averageTearStrength', 'waterproof', 'recycled'];


    const gridToolbar = () => <CustomGridToolbar metric={props.metric} setMetric={props.setMetric} />;

    return (
        <div className={`m-4 h-full`}>
            <DataGrid rows={props.fabrics}
                      columns={COLUMNS}
                      slots={{
                          toolbar: gridToolbar,
                      }}
                      className={'max-h-[30rem]'}
                      hideFooterSelectedRowCount={true}
                      hideFooter={true}
                      disableColumnFilter={true}
                      disableColumnMenu={true}
                      initialState={{
                          columns: {
                              columnVisibilityModel: {
                                  brand: false,
                                  construction: false,
                                  tearStrengthWarp: false,
                                  tearStrengthFill: false,
                                  width: false,
                                  price: false,
                                  filmBacking: false,
                                  carbonOffset: false,
                                  laminatedMaterial: false,
                                  handFeel: false
                              }
                          }
                      }}
            />
        </div>
    );
};