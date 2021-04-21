import React, {useEffect, useState} from 'react'
import {PageHeader, Tabs, Collapse } from "antd" ;
import {useHistory, useParams} from 'react-router-dom'
import axios from 'axios'
import { endpoint } from '../common/constantes'

import "./Detalhe.css"

const { TabPane } = Tabs ;
const { Panel } = Collapse;

const Detalhe = () => {

   

    const [title, setTitle] = useState("");
    const [dataCases, setDataCases] = useState();
    const [dataVaccination, setDataVaccination] = useState();
    const params = useParams();
    const history = useHistory();
    
    async function getCases(){
        console.log('passei, getCases ... ok' );
        const res = await axios.get(`${endpoint}/cases?country=${params.pais}`)
        if (res.status === 200){
            console.log(res.data );
            setDataCases( res.data )
        }
    }

    async function getVaccination(){
        const res = await axios.get(`${endpoint}/vaccines?country=${params.pais}`)
        if (res.status === 200){
            console.log(res.data );
            setDataVaccination( res.data )
        }
    }

    function onChangeTab( activeKey ){
        if (activeKey ==="1") {
            console.log('passei onChangeTab ... chamando getCases ' );
            getCases() 
        }
        if (activeKey ==="2") {
            getVaccination() 
        }
    }

    useEffect(() => {
        getCases() 
        // eslint-disable-next-line
    },[])

    useEffect(() => {
        if (params.pais ){
            setTitle(params.pais)
        }
    },[params])


    return <div>
        <PageHeader
            className="site-page-header"
            onBack={() => history.goBack() }
            title={title}
            subTitle="COVID-19 Casos e Vacinação " />

        <Tabs onChange={onChangeTab}  defaultActiveKey="1" style={{ marginBottom: 32 }}>
          <TabPane tab="Casos" key="1">
                <Collapse defaultActiveKey={['1']}>
                    {Object.keys(dataCases).map((item,index) => {
                        const obj =dataCases[item]
                        return <Panel header={item} key={index}> </Panel>
                    }) }

                </Collapse>
          </TabPane>
          <TabPane tab="Vacinação" key="2">
            Vacinação
          </TabPane>
          
        </Tabs>
    </div>
  
}
export default Detalhe;