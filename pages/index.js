import Head from 'next/head'
import Cookie from 'js-cookie'
import {useState, useEffect} from 'react'
import axios from 'axios'

import {TiArrowBack} from 'react-icons/ti'
import {FaHeart} from 'react-icons/fa'

import Menu from './components/Menu'
import {useRouter} from 'next/router'


function Hashtags() {
    const [items, setItems] = useState([])
    const [sugest, setSugest] = useState('')
    const [hashtag, setHashtag] = useState('#FAQ')
    const [hashtagsList, setHashtagsList] = useState([])
    const [searchText, setSearchText] = useState('')
    const [number, setNumber] = useState('*')
    const [numbersList, setNumberList] = useState([])
    const [group, setGroup] = useState('*')
    const [groupsList, setGroupsList] = useState([])
    const [key, setKey] = useState(0)
    const [itemDetail, setItemDetail] = useState({})
    
    const history = useRouter()

    useEffect(()=> {
        getTags()
    }, [])
    
    useEffect(()=> {
        getItems()
        getNumbers()
        getGroups()
    }, [hashtag])

    function getItems() {
        axios.get(`/api/questions/${hashtag.substr(1)}`).then(
            response => {
                setItems(response.data.reverse())
            }
        )
    }

    function getTags() {
        axios.get('/api/tags').then(
            response => {
                setHashtagsList(response.data)
            }
        )
    }

    function getNumbers() {
        axios.get(`/api/distinct/${hashtag.substr(1)}/number`).then(
            response => {
                setNumberList(response.data)
            }
        )
    }

    function getGroups() {
        axios.get(`/api/distinct/${hashtag.substr(1)}/group`).then(
            response => {
                setGroupsList(response.data)
            }
        )
    }

    function showDetails() {
        switch (key) {
            case 0:
                return (
                    <div className="contentContainer">
                        <div className="title">
                            <h1>Hashtags</h1>
                        </div>
                        <div className="sugestion">
                            <p>Não encontrou o seu assunto de interrese? que tal nos sugerir uma nova categoria?</p>
                            <div>
                                <input type="text" value={sugest} onChange={e=> {setSugest(e.target.value)}}/>
                                <button onClick={e => {saveSugest()}}>Enviar</button>
                            </div>
                        </div>
                        <div className="filters">
                            <div className="filter">
                                <label>Hashtag</label>
                                <select
                                    value={hashtag}
                                    onChange={e=> {setHashtag(e.target.value)}}
                                >
                                    <option value={'#*'}>#TODAS</option>
                                    {hashtagsList.map((item, index) => (
                                        <option key={index} value={item.tags}>{item.tags}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="filter">
                                <label>Pergunta</label>
                                <input type="text" value={searchText} onChange={e=> {setSearchText(e.target.value)}}/>
                            </div>
                            <div className="filter">
                                <label>Numero</label>
                                <select value={number} onChange={e=> {setNumber(e.target.value)}}>
                                    <option value="*">Todos</option>
                                    {numbersList.map((item, index) => (
                                        <option key={index} value={item}>{item}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="filter">
                                <label>Grupo</label>
                                <select value={group} onChange={e=> {setGroup(e.target.value)}}>
                                    <option value="*">Todos</option>
                                    {groupsList.map((item, index) => (
                                        <option key={index} value={item}>{item}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="list">
                            <table id="hashList">
                                <tbody>
                                    {items.filter((item) => {
                                        if(
                                            (number === '*' || number === item.number) &&
                                            (group === '*' || group === item.group) &&
                                            (item.question.search(searchText) > -1)
                                        ){return item}
                                    }).map((item, index) => (
                                        <tr key={index}
                                            onClick={e=> {
                                                setItemDetail(item)
                                                setKey(1)
                                            }}
                                        >
                                            <th>
                                                <label>Numero:</label>
                                                <div>{item.number}</div>
                                                <label>Grupo:</label>
                                                <div>{item.group}</div>
                                            </th>
                                            <th>
                                                <label>Pergunta</label>
                                                <p>{item.question}</p>
                                                <label>Resposta</label>
                                                <p>{item.answer === '' ? 'Aguardando resposta...' : item.answer}</p>
                                            </th>
                                            <th>
                                                <label>Hashtag</label>
                                                <div>{item.type}</div>
                                                <label>Status</label>
                                                <div>{item.status.toUpperCase()}</div>
                                            </th>
                                            <th>
                                                <label>Data</label>
                                                <div>{item.date}</div>
                                                <label>Horário</label>
                                                <div>{item.hour}</div>
                                            </th>
                                        </tr>
                                    ))}
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
                            <h1>Hashtags</h1>
                            <TiArrowBack 
                                style={{color: 'white', fontSize: '30px', cursor: 'pointer'}}
                                onClick={e=> {
                                    setKey(0)
                                    setItemDetail({})
                                }}
                            />
                        </div>
                        <div className="itemsContentContainer">
                            <div className="title">
                                <h1>Numero: {itemDetail.number}</h1>
                                <h1>Grupo: {itemDetail.group}</h1>
                            </div>
                            <div className="questions">
                                <h3>Pergunta</h3>
                                <p>{itemDetail.question}</p>
                                <h3>Resposta</h3>
                                <p>{itemDetail.answer === '' ? 'Aguardando resposta...' : itemDetail.answer}</p>
                            </div>
                            <div className="data">{itemDetail.date} {itemDetail.hour}</div>
                            <div style={{display: 'flex', flexDirection: 'row'}}>
                                <FaHeart style= {{fontSize: '25px', cursor: 'pointer', color: 'gray'}}/> <p>{['*', '*', '*'].map((item, index) => {return (index == 2 ? `${item}...` : `${item},`)})}</p>
                            </div>
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

    function redirect(url) {
        const pages = [
            '/profile',
            '/',
            '/login'
        ]
        if(url == pages.length - 1){
            sessionStorage.removeItem('userId')
        }
        history.push(pages[url])
    }

    function saveSugest() {
        let options = {
            headers: {
                'Content-Type': ['application/json']
            }
        }

        axios.post('/api/sugestion', {sugestion: sugest}, options).then(
            response => {
                setSugest('')
                window.alert('Sugestão enviada!')
                getItems()
                getNumbers()
                getGroups()
            },
            response => {
                window.alert('Temos um problemas...')
            }
        )
    }

    return (
        <div className="mainContainer">
            <Head>
                <title>Hashtags</title>
            </Head>
            <Menu/>
            <div id="background">
                {showDetails()}
            </div>
        </div>
    )
}

export default Hashtags