import React, {useEffect, useState} from 'react'
import {Fabric, getFabricData} from "./csv-parse.ts";
import {FabricTable} from "./fabric-table.tsx";
import {FabricChart} from "./FabricChart.tsx";
import {FabricModal} from "./fabric-modal.tsx";

function App() {

    const tempFabric = getFabricData()[0]; // only have this here to not deal with correct typing

    const [metric, setMetric] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalFabric, setModalFabric] = useState(tempFabric);

    useEffect(() => {
        getFabricData();
    }, [])

    function openFabricModal(fabric: Fabric) {
        setModalFabric(fabric);
        setModalOpen(true);
    }

    function closeFabricModal() {
        setModalOpen(false);
    }

    return (
        <div className={'flex flex-col'}>
            <FabricModal fabric={modalFabric} metric={metric} open={modalOpen} close={closeFabricModal}/>
            <FabricChart metric={metric} fabrics={getFabricData()}
                         openFabricModal={openFabricModal}
                         chartableAttributes={["averageTearStrength", "abrasion", "fabricWeight"]} />
            <FabricTable metric={metric} setMetric={setMetric} fabrics={getFabricData()} />
        </div>
    )
}

export default App
