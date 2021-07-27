import Head from 'next/head'
import Cookie from 'js-cookie'
import {useState, useEffect} from 'react'
import axios from 'axios'

import {TiArrowBack} from 'react-icons/ti'
import {FaHeart} from 'react-icons/fa'

import Menu from './components/Menu'
import {useRouter} from 'next/router'


function Pendencies() {
    const [items, setItems] = useState([])
    const [pendency, setPendency] = useState('')
    const [keyChange, setKeyChange] = useState(0)
    const [historicDate, setHistoricDate] = useState(inputToday())
    const [typeSearch, setTypeSearch] = useState('Registrado')
    const [responsibleList, setResponsibleList] = useState([])
    const [responsibleOpt, setResponsibleOpt] = useState('*')
    const [historic, setHistoric] = useState([])
    const [windowConfirm, setWindowConfirm] = useState(false)
    const [windowText, setWindowText] = useState('')
    const [windowId, setWindowId] = useState('')
    
    const history = useRouter()

    useEffect(() => {
        getPendenciesToday()
    }, [])

    useEffect(() => {
        if(keyChange == 1) {
            getHistoric()
            getResponsibles()
        }else {
            setHistoricDate(inputToday())
            setHistoric([])
            setResponsibleList([])
            setResponsibleOpt('*')
            setTypeSearch('Registrado')
        }
    },[keyChange, historicDate, typeSearch, responsibleOpt])

    function getResponsibles() {
        axios.get('/api/users/members').then(
            response => {
                setResponsibleList(response.data)
            }
        )
    }

    function getDate(){
        let dt = new Date()
        dt.setHours(dt.getHours() - 3)
        let dt_reg = ("0" + dt.getDate()).slice(-2) + "/" + ("0" + (dt.getMonth() + 1)).slice(-2) + "/" + dt.getFullYear()

        return dt_reg
    }

    function windowShow(item, status) {
        if(status == 'open') {
            setWindowConfirm(true)
            setWindowText(item.pendency)
            setWindowId(item._id)
        }else if(status == 'close') {
            setWindowConfirm(false)
            setWindowText('')
            setWindowId('')
        }

    }

    function getPendenciesToday() {
        axios.get(`/api/pendencies/untilNow/${Cookie.get('userId') ? Cookie.get('userId') : '*'}`).then(
            response => {
                setItems(response.data.reverse())
            }
        )
    }

    function getHistoric() {
        axios.get(`/api/pendencies/historic/${typeSearch}/${historicDate}/${responsibleOpt}`).then(
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
        switch (keyChange) {
            case 0:
                return (
                    <div className="contentContainer">
                        <div className="title">
                            <h1>Pendências</h1>
                        <div>
                            <button onClick={e=> {setKeyChange(1)}}>HISTÓRICO</button>
                        </div>
                        </div>
                        {Cookie.get('userId') ?
                            <div className="filters">
                                <div className="filter">
                                    <label>Pendência</label>
                                    <textarea type="text" value={pendency} onChange={e=> {setPendency(e.target.value)}}/>
                                </div>
                            </div>
                        : ''}
                        {Cookie.get('userId') ?
                            <div className="sugestion">
                                <div >
                                    <button style={{margin: 0}} onClick={e => {savePendency ()}}>Enviar</button>
                                </div>
                            </div>
                        : ''}
                        <div className="list">
                            <h1 style={{color: '#404040', textAlign: 'right'}}>Pendências até o dia {getDate()}</h1>
                            <table>
                                <thead>
                                    <tr id="header">
                                        <th>#</th>
                                        <th>RESPONSAVEL</th>
                                        <th>PENDÊNCIAS</th>
                                        <th>DATA/HORA</th>
                                        <th>RESOLVIDO</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <th>{index + 1}</th>
                                                <th>{item.responsible.name}</th>
                                                <th>
                                                    {item.pendency.split('\n').map((it) => (
                                                        <p style={{margin: '0px', textIndent: '0px'}}>{it}</p>
                                                    ))}
                                                </th>
                                                <th style={{textAlign:'left'}}>
                                                    <div>{item.date}</div>
                                                    <div>{item.hour}</div>
                                                </th>
                                                {item.solved ?
                                                    <th style={{textAlign:'left'}}>
                                                        <div>{item.s_date}</div>
                                                        <div>{item.s_hour}</div>
                                                    </th>
                                                :
                                                    <th>
                                                        {Cookie.get('userId') == item.responsible._id ?
                                                            <button onClick={e=> {windowShow(item, 'open')}}>Marcar como Resolvido</button>
                                                        :
                                                            'Ainda pendente'
                                                        }
                                                    </th>
                                                }
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
                            <h1>Histórico de Pendências</h1>
                            <TiArrowBack 
                                style={{color: 'white', fontSize: '30px', cursor: 'pointer'}}
                                onClick={e=> {
                                    setKeyChange(0)
                                }}
                            />
                        </div>
                        <div className="filters">
                            <div className="filter">
                                <label>Membro</label>
                                <select
                                    value={responsibleOpt}
                                    onChange={e=> {setResponsibleOpt(e.target.value)}}
                                >
                                    <option value='*'>Todos</option>
                                    {responsibleList.map((item, index) => (
                                        <option key={index} value={item._id}>{item.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="filter">
                                <label>Tipo de Pesquisa</label>
                                <select
                                    value={typeSearch}
                                    onChange={e=> {setTypeSearch(e.target.value)}}
                                >
                                    <option value='Registrado'>Data de Registro</option>
                                    <option value='Resolvido'>Data de Finalização</option>
                                </select>
                            </div>
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
                                        <th>RESPONSAVEL</th>
                                        <th>PENDÊNCIAS</th>
                                        <th>DATA/HORA</th>
                                        <th>RESOLVIDO</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {historic.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <th>{index + 1}</th>
                                                <th>{item.responsible.name}</th>
                                                <th>
                                                    {item.pendency.split('\n').map((it) => (
                                                        <p style={{margin: '0px', textIndent: '0px'}}>{it}</p>
                                                    ))}
                                                </th>
                                                <th style={{textAlign:'left'}}>
                                                    <div>{item.date}</div>
                                                    <div>{item.hour}</div>
                                                </th>
                                                {item.solved ?
                                                    <th style={{textAlign:'left'}}>
                                                        <div>{item.s_date}</div>
                                                        <div>{item.s_hour}</div>
                                                    </th>
                                                :
                                                    <th>
                                                        {Cookie.get('userId') == item.responsible._id ?
                                                            <button onClick={e=> {windowShow(item, 'open')}}>Marcar como Resolvido</button>
                                                        :
                                                            'Ainda pendente'
                                                        }
                                                    </th>
                                                }
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

    function savePendency() {
        let options = {
            headers: {
                'Content-Type': ['application/json']
            }
        }

        const reg = {
            id: Cookie.get('userId'),
            pendency: pendency
        }

        axios.post('/api/pendencies/pendencyRegister', reg, options).then(
            response => {
                setPendency('')
                window.alert('Pendências Registradas!')
                getPendenciesToday()    
            },
            response => {
                window.alert('Temos um problemas...')
            }
        )
    }

    function updatePendency(pendencyId) {
        let options = {
            headers: {
                'Content-Type': ['application/json']
            }
        }

        const reg = {
            pendencyId: pendencyId
        }

        axios.post('/api/pendencies/pendencyUpdate', reg, options).then(
            response => {
                setPendency('')
                window.alert('Pendências Atualizada!')
                getPendenciesToday()    
                windowShow({}, 'close')
            },
            response => {
                window.alert('Temos um problemas...')
            }
        )
    }

    return (
        <div className="mainContainer">
            <Head>
                <title>Pendências - INOVACODE</title>
            </Head>
            <Menu/>
            {windowConfirm ?
                <div className='extra'>
                    <div className='extracontainer' style={{marginLeft:'calc(50vw - 250px)', width:'500px'}}>
                        <div className="title">
                            <h1>Pendência</h1>
                        </div>
                        {windowText.split('\n').map((it) => (
                            <p>{it}</p>
                        ))}
                        <p style={{marginTop:'10px'}}>Tem certeza que quer atualizar pendência como concluida?</p>
                        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', marginTop:'20px'}}>
                            <button onClick={e=> {updatePendency(windowId)}}>ATUALIZAR</button>
                            <button onClick={e=> {windowShow({}, 'close')}}>CANCELAR</button>
                        </div>
                    </div>
                </div>
            : ''}
            <div id="background">
                {showDetails()}
            </div>
        </div>
    )
}

export default Pendencies