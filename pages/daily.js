import Head from 'next/head'
import Cookie from 'js-cookie'
import {useState, useEffect} from 'react'
import axios from 'axios'

import {TiArrowBack} from 'react-icons/ti'
import {FaHeart} from 'react-icons/fa'

import Menu from './components/Menu'
import {useRouter} from 'next/router'


function Daily() {
    const [items, setItems] = useState([])
    const [activity, setActivity] = useState('')
    const [key, setKey] = useState(0)
    const [historicDate, setHistoricDate] = useState(inputToday())
    const [historic, setHistoric] = useState([])
    
    const history = useRouter()

    useEffect(() => {
        getDailyToday()
    }, [])

    useEffect(() => {
        if(key == 1) {
            getHistoric()
        }else {
            setHistoricDate(inputToday())
            setHistoric([])
        }
    },[key, historicDate])

    function getDate(){
        let dt = new Date()
        dt.setHours(dt.getHours() - 3)
        let dt_reg = ("0" + dt.getDate()).slice(-2) + "/" + ("0" + (dt.getMonth() + 1)).slice(-2) + "/" + dt.getFullYear()

        return dt_reg
    }

    function getDailyToday() {
        axios.get(`/api/dailys/atDay`).then(
            response => {
                setItems(response.data.reverse())
            }
        )
    }

    function getHistoric() {
        axios.get(`/api/dailys/historic/${historicDate}`).then(
            response => {
                setHistoric(response.data.reverse())
            }
        )
    }

    function inputToday() {
        let dt   = new Date()
        dt.setHours(dt.getHours() - 3)
        return (dt.getFullYear() + "-" + ("0" + (dt.getMonth() + 1)).slice(-2) + "-" + ("0" + dt.getDate()).slice(-2))
    }

    function showDetails() {
        switch (key) {
            case 0:
                return (
                    <div className="contentContainer">
                        <div className="title">
                            <h1>Daily</h1>
                        <div>
                            <button onClick={e=> {setKey(1)}}>HISTÓRICO</button>
                        </div>
                        </div>
                        {Cookie.get('userId') ?
                            <div className="filters">
                                <div className="filter">
                                    <div style={{display:'none', width: '100%'}}>
                                        <button style={{fontSize: "20px", padding: "5px 20px" ,marginLeft: 'calc(100% - 110px)'}} onClick={e => {}}>+</button>
                                    </div>
                                    <label>Atividades</label>
                                    <textarea type="text" value={activity} onChange={e=> {setActivity(e.target.value)}}/>
                                </div>
                            </div>
                        : ''}
                        {Cookie.get('userId') ?
                            <div className="sugestion">
                                <div >
                                    <button style={{margin: 0}} onClick={e => {saveActivity ()}}>Enviar</button>
                                </div>
                            </div>
                        : ''}
                        <div className="list">
                            <h1 style={{color: '#404040', textAlign: 'right'}}>Atividades do dia {getDate()}</h1>
                            <table>
                                <thead>
                                    <tr id="header">
                                        <th>#</th>
                                        <th>NOME</th>
                                        <th>ATIVIDADES</th>
                                        <th>DATA/HORA</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((item, index) => {
                                        return (
                                            <tr>
                                                <th>{index + 1}</th>
                                                <th>{item.name}</th>
                                                <th>
                                                    {item.activity.split('\n').map((it) => (
                                                        <p style={{margin: '0px', textIndent: '0px'}}>{it}</p>
                                                    ))}
                                                </th>
                                                <th style={{textAlign:'left'}}>
                                                    <div>{item.date}</div>
                                                    <div>{item.hour}</div>
                                                </th>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )
                break
            case 1:
                return (
                    <div className="contentContainer">
                        <div className="title">
                            <h1>Daily Histórico</h1>
                            <TiArrowBack 
                                style={{color: 'white', fontSize: '30px', cursor: 'pointer'}}
                                onClick={e=> {
                                    setKey(0)
                                }}
                            />
                        </div>
                        <div className="filters">
                            <div className="filter">
                                <label>Data</label>
                                <input
                                    type='date'
                                    value={historicDate}
                                    onChange={e=> {setHistoricDate(e.target.value)}}
                                />
                            </div>
                        </div>
                        <div className="list">
                            <table>
                                <thead>
                                    <tr id="header">
                                        <th>#</th>
                                        <th>NOME</th>
                                        <th>ATIVIDADES</th>
                                        <th>DATA/HORA</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {historic.map((item, index) => {
                                        return (
                                            <tr>
                                                <th>{index + 1}</th>
                                                <th>{item.name}</th>
                                                <th>
                                                    {item.activity.split('\n').map((it) => (
                                                        <p style={{margin: '0px', textIndent: '0px'}}>{it}</p>
                                                    ))}
                                                </th>
                                                <th style={{textAlign:'left'}}>
                                                    <div>{item.date}</div>
                                                    <div>{item.hour}</div>
                                                </th>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )
                break
            default:
                return (
                    <div className="contentContainer">
                        Error
                    </div>
                )
                break
        }
    }

    function saveActivity   () {
        let options = {
            headers: {
                'Content-Type': ['application/json']
            }
        }

        const reg = {
            id: Cookie.get('userId'),
            activity: activity
        }

        axios.post('/api/dailys/activityRegister', reg, options).then(
            response => {
                setActivity('')
                window.alert('Atividades enviadas!')
                getDailyToday()
                
            },
            response => {
                window.alert('Temos um problemas...')
            }
        )
    }

    return (
        <div className="mainContainer">
            <Head>
                <title>Daily - INOVACODE</title>
            </Head>
            <Menu/>
            <div id="background">
                {showDetails()}
            </div>
        </div>
    )
}

export default Daily