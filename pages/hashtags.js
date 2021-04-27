import Head from 'next/head'
import {useState, useEffect} from 'react'

import {useRouter} from 'next/router'

import {TiArrowBack} from 'react-icons/ti'
import {AiFillHome} from 'react-icons/ai'
import {BiLogOut} from 'react-icons/bi'
import {FaUser, FaSlackHash} from 'react-icons/fa'

import {dbConnect, jsonify} from '../services/middleware/db'
import Hashtag from '../services/models/QuestionsSchemas'


function Categorias() {
    const [items, setItems] = useState([])
    const [sugest, setSugest] = useState('')
    const [hashtag, setHashtag] = useState('*')
    const [hashtagsList, setHashtagsList] = useState([])
    const [searchText, setSearchText] = useState('')
    const [number, setNumber] = useState('*')
    const [numbersList, setNumberList] = useState([])
    const [group, setGroup] = useState('*')
    const [groupsList, setGroupsList] = useState([])
    const [key, setKey] = useState(0)
    const [itemDetail, setItemDetail] = useState({})
    
    const history = useRouter()
    
    async function getServerSideProps() {
        await dbConnect()
        const hashtags = await Hashtag.find({}).exec()
      
        return jsonify(hashtags)
       
    }
    
    function redirect(url) {
        const pages = [
            '/profile',
            '/',
            '/hashtags',
            '/login'
        ]
        history.push(pages[url])
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
                                    <option value={'*'}>#TODAS</option>
                                    {hashtagsList.map((item) => (
                                        <option value={item.tags}>{item.tags}</option>
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
                                        <tr key={index} onClick={e=> {
                                            setItemDetail(item)
                                            setKey(1)
                                        }}>
                                            <td>
                                                <label>Numero:</label>
                                                <div>{item.number}</div>
                                                <label>Grupo:</label>
                                                <div>{item.group}</div>
                                            </td>
                                            <td>
                                                <label>Pergunta</label>
                                                <p>{item.question}</p>
                                                <label>Resposta</label>
                                                <p>{item.answer === '' ? 'Aguardando resposta...' : item.answer}</p>
                                            </td>
                                            <td>
                                                <label>Hashtag</label>
                                                <div>{item.type}</div>
                                                <label>Status</label>
                                                <div>{item.status.toUpperCase()}</div>
                                            </td>
                                            <td>
                                                <label>Data</label>
                                                <div>{item.date.split(' ')[0]}</div>
                                                <label>Horário</label>
                                                <div>{item.date.split(' ')[1]}</div>
                                            </td>
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
                            <div className="data">{itemDetail.date}</div>
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

    return (
        <div className="mainContainer">
            <Head>
                <title>Hashtags</title>
            </Head>
            <div className="menu">
                <div>
                    <img src="/logo-small.png" alt="Logo"/>
                    <p>InovaSup</p>
                </div>
                <ul>
                    <li onClick={e => (redirect(e.target.value))} value="0"><FaUser className="icons"/> Perfil</li>
                    <li onClick={e => (redirect(e.target.value))} value="1"><AiFillHome className="icons"/> Home</li>
                    <li onClick={e => (redirect(e.target.value))} value="2"><FaSlackHash className="icons"/> Hashtags</li>
                    <li onClick={e => (redirect(e.target.value))} value="3"><BiLogOut className="icons"/> Sair</li>
                </ul>
            </div>
            <div id="background">
                {showDetails()}
            </div>
        </div>
    )
}

export default Categorias