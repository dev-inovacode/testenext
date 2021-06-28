import Head from 'next/head'
import Menu from './components/Menu'
import Dashboard from './components/dashboards'
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
                        <div style={{justifyContent: 'center', marginLeft: 'calc(50% - 500px)'}}>
                            <Dashboard data={week} width={1000} height={300}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboards