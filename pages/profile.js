import Head from 'next/head'
import {useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import Cookie from 'js-cookie'

import Menu from './components/Menu'
import Dashboard from './components/Dashboard'
import axios from 'axios'

function Profile() {
    const [member, setMember] = useState()
    const history = useRouter()

    useEffect(()=> {
        if(!(Cookie.get('userId') && Cookie.get('userId') != 'client')) {
            history.push('/login')
        }
    }, [])

    useEffect(() => {
        axios.get(`/api/users/${Cookie.get('userId')}`).then(
            response => {
                setMember(response.data)
            },
            response => {
                setMember(null)
            }
        )
    }, [])

    return (
        <div className="mainContainer">
            <Head>
                <title>Perfil</title>
            </Head>
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
                        {member ?
                        <div className="infoProfile">
                            <label>Função:</label>
                            <p>{member.function}</p>
                            <label>Celular:</label>
                            <p>{member.phone}</p>
                            <label>Email:</label>
                            <p>{member.email}</p>
                        </div>
                        :''}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile