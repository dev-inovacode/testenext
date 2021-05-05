import Head from 'next/head'
import Cookie from 'js-cookie'
import {useEffect, useState} from 'react'
import axios from 'axios'

import Menu from './components/Menu'

function Members() {
    const [members, setMembers] = useState([])

    useEffect(() => {
        if(!(Cookie.get('userId'))) {
            Cookie.set('userId', 'client')
        }
    }, [])

    useEffect(() => {
        axios.get('/api/users/members', {}).then(
            response => {
                setMembers(response.data)
            }
        )
    }, [])

    return (
        <div className="mainContainer">
            <Head>
                <title>Membros</title>
            </Head>
            <Menu/>
            <div id="background">
            <div className="contentContainer">
                    <div className="title">
                        <h1>Membros InovaOne</h1>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                        {members.map((member, index) => (
                            <div key={index} className="infoProfile" style={{margin: '10px', width: '130px'}}>
                                <img src='/userImg.png' alt="User" style={{width: '130px', height: '130px', borderRadius:'13px'}}/>
                                {false ? <div>{member._id}</div> : ''}
                                <div style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{member.name}</div>
                                <div style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{member.function}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Members