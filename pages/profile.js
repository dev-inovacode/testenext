import Head from 'next/head'
import {useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import Cookie from 'js-cookie'
import InputMask from 'react-input-mask'

import Menu from './components/Menu'
import axios from 'axios'

function Profile() {
    const [member, setMember] = useState(null)
    const [userFunction, setUserFunction] = useState('')
    const [userPhone, setUserPhone] = useState('')
    const [userMail, setUserMail] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [windowConfirm, setWindowConfirm] = useState(false)
    const [windowId, setWindowId] = useState('')

    const history = useRouter()

    const functionList = [
        'Atendimento Comercial',
        'CEO',
        'Consultor Comercial/Implantação',
        'Consultora de Projetos',
        'Consultoria Belt',
        'Compras',
        'Coordenador de Implantação',
        'Coordenadora de Expedição - SP',
        'Coordenador de Suporte',
        'Customer Success',
        'Desenvolvedor Júnior',
        'Desenvolvedor Sênior',
        'Estagiário de Engenharia',
        'Gestor Comercial',
        'Gestão e Processos',
        'Gestor de Marketing e Parcerias',
        'Impressões/Técnica de Suporte',
        'Jurídico/Licitação',
        'Parcerias e CRM',
        'Secretário Executivo',
        'Técnico de Suporte/Expedição - SC',
        'Técnico de Suporte'
    ]

    useEffect(()=> {
        if(!(Cookie.get('userId'))) {
            history.push('/login')
        }
    }, [])

    useEffect(() => {
        getUser()
    }, [])
    
    function windowShow(status) {
        if(status == 'open') {
            setWindowConfirm(true)
        }else if(status == 'close') {
            setWindowConfirm(false)
        }

    }

    function getUser() {
        axios.get(`/api/users/${Cookie.get('userId')}`).then(
            response => {
                setMember(response.data)
                setUserMail(response.data.email)
                setUserPhone(response.data.phone)
                setUserFunction(response.data.function)
                setUserPassword(response.data.password)
            }
        )
    }

    function userUpdate() {
        let options = {
            headers: {
                'Content-Type': ['application/json']
            }
        }

        const reg = {
            _id: Cookie.get('userId'),
            function: userFunction,
            email: userMail,
            password: userPassword,
            phone: userPhone
        }

        axios.post(`/api/users/update`, reg, options).then(
            response => {
                window.alert('Perfil Atualizado!')
                windowShow('close')
            },
            response => {
                window.alert('Algo deu errado...')
            }
        )
    }

    return (
        <div className="mainContainer">
            <Head>
                <title>Perfil</title>
            </Head>
            {windowConfirm ?
                <div className='extra'>
                    <div className='extracontainer' style={{marginLeft:'calc(50vw - 250px)', width:'500px'}}>
                        <div className="title">
                            <h1>Perfil</h1>
                        </div>
                        <p style={{marginTop:'10px'}}>Tem certeza que quer atualizar seu perfil?</p>
                        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', marginTop:'20px'}}>
                            <button onClick={e=> {
                                userUpdate()

                            }}>ATUALIZAR</button>
                            <button onClick={e=> {windowShow('close')}}>CANCELAR</button>
                        </div>
                    </div>
                </div>
            : ''}
            <Menu/>
            <div id="background">
                <div className="contentContainer">
                    <div className="title">
                        <h1>{member ? member.name : 'Usuário não encontrado'}</h1>
                    </div>
                    <div className="userProfile">
                        <div>
                            <img src='/userImg.png' alt="User" style={{width: '200px', height: '200px', borderRadius:'20px'}}/>
                        </div>
                        <div className="infoProfile">
                            <div>
                                <label>Função:</label>
                                <select
                                    id="fc"
                                    value={userFunction}
                                    onChange={e => {setUserFunction(e.target.value)}}
                                >
                                    {functionList.sort().map((item, index) => (
                                        <option key={index} value={item}>{item}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label>Celular:</label>
                                <InputMask
                                    id="phc"
                                    mask={"(99) 99999-9999"}
                                    value={userPhone}
                                    onChange={e => {setUserPhone(e.target.value)}}
                                />
                            </div>
                            <div>
                                <label>Email:</label>
                                <input
                                    value={userMail}
                                    onChange={e=>{setUserMail(e.target.value)}}
                                />
                            </div>
                            <div>
                                <label>Senha:</label>
                                <input
                                    type='password'
                                    value={userPassword}
                                    onChange={e=>{setUserPassword(e.target.value)}}
                                />
                            </div>
                            <div style={{marginTop: '10px'}}>
                                <button onClick={e=>{windowShow('open')}}>ATUALIZAR</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile