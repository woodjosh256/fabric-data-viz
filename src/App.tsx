import React, {useEffect, useState} from 'react'
import './App.css'
import {getFabricData} from "./csv-parse.ts";
import {FabricTable} from "./fabric-table.tsx";
import {FabricChart} from "./FabricChart.tsx";

function App() {

    const [metric, setMetric] = useState(false);

    useEffect(() => {
        getFabricData();
    }, [])

    return (
        <div className={'flex flex-col'}>
            <FabricChart metric={metric} fabrics={getFabricData()} chartableAttributes={["fabricWeight", "tearStrengthWarp", "tearStrengthFill", "averageTearStrength", "waterproof", "abrasion"]} />
            <FabricTable metric={metric} setMetric={setMetric} fabrics={getFabricData()} />
        </div>
    )
}

export default App
