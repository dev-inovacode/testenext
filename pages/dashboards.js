import Head from 'next/head'
import Menu from './components/Menu'
import Teste from './components/teste'
import axios from 'axios'
import { useEffect, useState } from 'react'

function Dashboards() {
    const [week, setWeek] = useState([])
    useEffect(() => {
        axios.get('/api/dash/weekResume').then(
            response => {
                setWeek(response.data)
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
                        <h1>Dashboards</h1>
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