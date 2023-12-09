// // FabricTableOld.tsx
// import React, { useState } from 'react';
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Paper,
//     Select,
//     MenuItem,
//     FormControl,
//     InputLabel,
//     Checkbox,
//     ListItemText,
//     OutlinedInput,
//     SelectChangeEvent, TableSortLabel, TextField
// } from '@mui/material';
// import {Fabric} from "./csv-parse.ts";
//
// const allColumns: string[] = ['fabricName', 'brand', 'line', 'countryOfOrigin', 'construction', 'fabricWeight', 'tearStrengthWarp', 'tearStrengthFill', 'averageTearStrength', 'waterproof', 'abrasion', 'width', 'price', 'filmBacking', 'fluorocarbonFreeDWR', 'cleenTec', 'carbonOffset', 'laminatedMaterial', 'handFeel', 'recycled'];
// const defaultColumns: string[] = ['fabricName', 'fabricWeight', 'averageTearStrength', 'waterproof', 'abrasion', 'price'];
//
// type Order = 'asc' | 'desc';
//
// const isString = (value: string | number): boolean => typeof value === 'string';
// const isNumber = (value: string | number): boolean => typeof value === 'number';
// const isEnum = (value: string): boolean => ['low', 'moderate', 'high', 'yes', 'no', 'unclear', 'techy', 'softer', 'partially'].includes(value);
//
// // Example enum values for simplicity; adjust as necessary
// const enumOptions: { [key: string]: string[] } = {
//     price: ['low', 'moderate', 'high'],
//     filmBacking: ['yes', 'no'],
//     fluorocarbonFreeDWR: ['yes', 'no'],
//     carbonOffset: ['yes', 'no'],
//     laminatedMaterial: ['yes', 'no'],
//     handFeel: ['techy', 'softer'],
//     recycled: ['yes', 'no']
// };
//
// const FabricTableOld: React.FC<{ fabrics: Fabric[] }> = ({ fabrics }) => {
//     const [selectedColumns, setSelectedColumns] = useState<string[]>(defaultColumns);
//     const [filters, setFilters] = useState<{ [key: string]: any }>({});
//     const [orderBy, setOrderBy] = useState<string>('');
//     const [order, setOrder] = useState<Order>('asc');
//
//     const handleColumnChange = (event: SelectChangeEvent<string[]>) => {
//         setSelectedColumns(event.target.value as string[]);
//     };
//
//     const handleFilterChange = (columnName: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
//         setFilters({ ...filters, [columnName]: event.target.value });
//     };
//
//     const handleNumberFilterChange = (columnName: string, type: 'gte' | 'lte') => (event: React.ChangeEvent<HTMLInputElement>) => {
//         const value = event.target.value;
//         setFilters({
//             ...filters,
//             [columnName]: { ...filters[columnName], [type]: value }
//         });
//     }
//
//     const handleEnumFilterChange = (columnName: string, option: string) => (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
//         const currentOptions = filters[columnName] || [];
//         setFilters({
//             ...filters,
//             [columnName]: checked
//                 ? [...currentOptions, option]
//                 : currentOptions.filter((o: string) => o !== option)
//         });
//     };
//
//     // Updated filtering logic for different column types
//     const applyFilters = (fabric: Fabric) => {
//         return selectedColumns.every((columnName) => {
//             const filterValue = filters[columnName];
//             const fabricValue = fabric[columnName as keyof Fabric];
//
//             if (isString(fabricValue)) {
//                 return fabricValue.toString().toLowerCase().includes(filterValue?.toLowerCase() || '');
//             } else if (isNumber(fabricValue)) {
//                 const { gte, lte } = filterValue || {};
//                 return (gte ? fabricValue >= Number(gte) : true) && (lte ? fabricValue <= Number(lte) : true);
//             } else if (isEnum(fabricValue, columnName as keyof Fabric)) {
//                 return filterValue ? filterValue.includes(fabricValue) : true;
//             } else {
//                 return true;
//             }
//         });
//     };
//
//     const getFilterInput = (columnName: keyof Fabric) => {
//         const firstValue = fabrics[0][columnName];
//
//         if (isString(firstValue)) {
//             return (
//                 <TextField
//                     size="small"
//                     placeholder={`Filter ${columnName}`}
//                     value={filters[columnName] || ''}
//                     onChange={handleFilterChange(columnName)}
//                 />
//             );
//         } else if (isNumber(firstValue)) {
//             return (
//                 <div>
//                     <TextField
//                         size="small"
//                         type="number"
//                         placeholder={`>=`}
//                         onChange={handleNumberFilterChange(columnName, 'gte')}
//                     />
//                     <TextField
//                         size="small"
//                         type="number"
//                         placeholder={`<=`}
//                         onChange={handleNumberFilterChange(columnName, 'lte')}
//                     />
//                 </div>
//             );
//         } else if (isEnum(firstValue, columnName)) {
//             return enumOptions[columnName].map(option => (
//                 <div key={option}>
//                     <Checkbox
//                         checked={filters[columnName]?.includes(option) || false}
//                         onChange={handleEnumFilterChange(columnName, option)}
//                     />
//                     {option}
//                 </div>
//             ));
//         }
//     };
//
//
//     const handleSort = (columnName: string) => {
//         const isAsc = orderBy === columnName && order === 'asc';
//         setOrder(isAsc ? 'desc' : 'asc');
//         setOrderBy(columnName);
//     };
//
//     const filteredFabrics = fabrics.filter((fabric) =>
//         selectedColumns.every((columnName) =>
//             fabric[columnName].toString().toLowerCase().includes(filters[columnName]?.toLowerCase() || '')
//         )
//     );
//
//     const sortFabrics = (a: Fabric, b: Fabric) => {
//         if (orderBy === '') return 0;
//         if (a[orderBy] < b[orderBy]) return order === 'asc' ? -1 : 1;
//         if (a[orderBy] > b[orderBy]) return order === 'asc' ? 1 : -1;
//         return 0;
//     };
//
//     const toTitleCase = (camelCaseString: string) => {
//         return camelCaseString
//             .replace(/([A-Z])/g, ' $1')
//             .replace(/^./, (str) => str.toUpperCase())
//             .trim();
//     };
//
//     const isSelected = (columnName: string) => selectedColumns.includes(columnName);
//
//     return (
//         <div>
//             <FormControl sx={{ m: 1, width: 300 }}>
//                 <InputLabel id="column-selector-label">Select Columns</InputLabel>
//                 <Select
//                     labelId="column-selector-label"
//                     multiple
//                     value={selectedColumns}
//                     onChange={handleColumnChange}
//                     input={<OutlinedInput label="Select Columns" />}
//                     renderValue={(selected) => selected.map((s) => toTitleCase(s)).join(', ')}
//                 >
//                     {allColumns.map((name) => (
//                         <MenuItem key={name} value={name}>
//                             <Checkbox checked={isSelected(name)} />
//                             <ListItemText primary={toTitleCase(name)} />
//                         </MenuItem>
//                     ))}
//                 </Select>
//             </FormControl>
//             <TableContainer component={Paper}>
//                 <Table aria-label="fabric table">
//                     <TableHead>
//                         <TableRow>
//                             {allColumns.map((columnName) => (
//                                 selectedColumns.includes(columnName) && <TableCell key={columnName}>
//                                     <TableSortLabel
//                                         active={orderBy === columnName}
//                                         direction={orderBy === columnName ? order : 'asc'}
//                                         onClick={() => handleSort(columnName)}
//                                     >
//                                         {columnName}
//                                     </TableSortLabel>
//                                     <TextField
//                                         size="small"
//                                         placeholder={`Filter ${columnName}`}
//                                         value={filters[columnName] || ''}
//                                         onChange={handleFilterChange(columnName)}
//                                     />
//                                 </TableCell>
//                             ))}
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {filteredFabrics.sort(sortFabrics).map((fabric, index) => (
//                             <TableRow key={index}>
//                                 {allColumns.map((columnName) => (
//                                     selectedColumns.includes(columnName) && <TableCell key={columnName}>{(fabric as never)[columnName]}</TableCell>
//                                 ))}
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//         </div>
//     );
// };
//
// export default FabricTableOld;
