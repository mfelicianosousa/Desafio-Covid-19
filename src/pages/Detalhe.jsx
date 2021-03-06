import React, {useEffect, useState} from 'react'
import { PageHeader, Tabs, Collapse, Spin } from "antd";

import {useHistory, useParams} from 'react-router-dom'
import axios from 'axios'
import { endpoint } from '../common/constantes'
import "./Detalhe.css"


const { TabPane } = Tabs ;
const { Panel } = Collapse;

const Detalhe = () => {

    const [title, setTitle] = useState("");
    const [dataCases, setDataCases] = useState({});
    const [vaccines, setVaccines] = useState({});

    // Loading
    const [loadingCases, setLoadingCases] = useState(false) 
    const [loadingVaccines, setLoadingVaccines] = useState(false) 
    const params = useParams();
    const history = useHistory();

    async function getCases(){
        console.log(params.pais );
        if(Object.keys(dataCases).length ===0 ) {
            setLoadingCases(true)
            const res = await axios.get(`${endpoint}/cases?country=${params.pais}`)
            if (res.status === 200){
                console.log(res.data );
                setDataCases( res.data )
            }
            setLoadingCases(false)
        }
    }
    async function getVaccination(){
        
        if(Object.keys(vaccines).length ===0 ) {
            setLoadingVaccines(true)
            const res = await axios.get(`${endpoint}/vaccines?country=${params.pais}`)
            if (res.status === 200){
                console.log(res.data );
                setVaccines( res.data );
            }
            setLoadingVaccines(false)   
        }
    }
    function onChangeTab(activeKey){
 
        if(activeKey === "1") {
           
           getCases();
         }
        if(activeKey === "2") { 
            getVaccination();
        }
        

    }

    useEffect(() => {
        
        getCases();
       // eslint-disable-next-line 
    },[])

    useEffect(() => {
        console.log(params.pais );
        if (params.pais ){
            setTitle(params.pais)
        }
    },[params])

    return <div>
        <PageHeader
            className="site-page-header"
            onBack={() => history.goBack() }
            title={title}
            subTitle="COVID-19 Casos e Vacina????o "/>

          <Tabs onChange={onChangeTab} defaultActiveKey="1">
          <TabPane tab="Casos" key="1" style={{ minHeight: 100 }}>
          <Spin spinning={loadingCases}>
                <Collapse accordion defaultActiveKey={["0"]}>
                    {Object.keys(dataCases).map((item, index) => {
                        const obj = dataCases[item]
                        return (
                            <Panel header={item} key={index}>
                                <p>
                                    <b>Confirmadas</b> { obj.confirmed }
                                </p>

                                <p>
                                    <b>Mortes</b> { obj.deaths }
                                </p>
                                <p>
                                    <b>Recuperados</b> { obj.recovered}
                                </p>

                            </Panel>
                        )

                    })}

                </Collapse>

            </Spin>
          </TabPane>

          <TabPane tab="Vacina????o" key="2" style={{ minHeight: 100 }}>
          <Spin spinning={loadingVaccines}>
            <Collapse defaultActiveKey={["0"]}>
              {Object.keys(vaccines).map((item, index) => {
                const obj = vaccines[item];
                return (
                  <Panel header={item} key={index}>
                    <p>
                      <b>Popula????o: </b> {obj.population}
                    </p>
                    <p>
                      <b>Expectativa de vida: </b> {obj.life_expectancy}
                    </p>
                    <p>
                      <b>Pessoas Vacinadas: </b> {obj.people_vaccinated}
                    </p>
                    <p>
                      <b>Pessoas Parcialmente Vacinadas: </b> {obj.people_partially_vaccinated}
                    </p>
                  </Panel>
                );
              })}
            </Collapse>
          </Spin>
        </TabPane>
        </Tabs>
        
    </div>
}
export default Detalhe;