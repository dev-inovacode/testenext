import Head from 'next/head'
import Menu from './components/Menu'
import ChartText from './components/chart'
import Teste from './components/teste'
import axios from 'axios'
import { useEffect, useState } from 'react'

function Dashboards() {
    const [week, setWeek] = useState([])
    useEffect(() => {
        axios.get('/api/dash/weekResume').then(
            response => {
                setWeek(response.data)
                console.log(response.data)
            }
        )
    }, [])

    return(
        <div className="mainContainer">
            <Head>
                <title>Dashboards</title>
            </Head>
            <Menu/>
            <div id="background">
                <div className="contentContainer">
                    <div className="title">
                        <h1 onClick={e => {setI(!i)
                        console.log(i ? lista[0] : lista[1])}}>Dashboards</h1>
                    </div>
                    <div style={{marginTop: '20px'}}>
                       <ChartText data={week} largura={1000}/>
                    </div>
                    <div style={{marginTop: '20px'}}>
                       <Teste data={week}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboards