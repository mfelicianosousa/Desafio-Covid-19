import React, { useState, useEffect} from 'react'
import {Form, Select, Button } from "antd"
import axios from "axios"
import {endpoint} from '../common/constantes'
import {useHistory} from 'react-router-dom'
// inicio 01:01
const Home = () => {

    const [form] = Form.useForm()
    const [loading, setLoading ] = useState(false)
    const [paises, setPaises] = useState([])
    
    const history = useHistory() // url que acesso, historico do browse 

    async function getPaises(){
        setLoading(true);
        const res = await axios.get(`${endpoint}/cases`) ;
        if (res.status === 200){
            // console.log(paises);
            setPaises( Object.keys(res.data) )
        }
        setLoading(false);
    }
    function selecionarPais() {

        form.validateFields().then((values)=> {
            // console.log( values );
            history.push(`/${values.pais}`) ;
        })
    }

    function onFinish(values ) {
        history.push(`/${values.pais}`) ;
    }


    useEffect(() => {
        getPaises();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]) ;

    return ( 
     <div>
       <Form initialValues={ {pais: 'Brazil'} } onFinish={onFinish} form={form}>
           <Form.Item name="pais" rules={ [ { required: true, message: "Campo Obrigatório"} ] }>
                <Select onChange={selecionarPais} placeHolder="Selecione o País" loading={loading}>
                    <Select.Option>Selecione</Select.Option> 
                    {paises.map(pais => (
                        <Select.Option key={pais} value={pais}>{pais}</Select.Option>
                    ))}
                </Select>
           </Form.Item>
           <Button htmlType='submit'> Selecionar </Button>
       </Form>
    </div>
    )
}
export default Home;