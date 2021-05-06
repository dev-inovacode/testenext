import Head from 'next/head'
import Menu from './components/Menu'
import Dashboard from './components/Dashboard'
import ChartLine from './components/ChartLine'

function Dashboards() {
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
                        <Dashboard data={[12, 36, 55, 25, 35, 10, 40]} width={500} height={400} color={'blue'}/>
                        <ChartLine data={[12, 36, 55, 25, 35, 10, 40]}  width={500} height={400} color={'blue'}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboards