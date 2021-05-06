import {useRouter} from 'next/router'
import Cookie from 'js-cookie'
import {BiLogOut} from 'react-icons/bi'
import {FaUser, FaSlackHash} from 'react-icons/fa'
import {GoGraph} from 'react-icons/go'
import {RiTeamFill} from 'react-icons/ri'

function Menu() {
    const history = useRouter()
    
    function redirect(url) {
        const pages = [
            '/profile',
            '/dashboards',
            '/members',
            '/',
            '/login'
        ]
        if(url == pages.length - 1){
            Cookie.remove('userId')
        }
        history.push(pages[url])
    }
    
    return (
        <div className="menu">
            <div>
                <img src="/logo-small.png" alt="Logo"/>
                <p>InovaSup</p>
            </div>
            <ul>
                {Cookie.get('userId') && Cookie.get('userId') != 'client' ? <li onClick={e => (redirect(e.target.value))} value="0"><FaUser className="icons"/> Perfil</li> : ''}
                <li onClick={e => (redirect(e.target.value))} value="1"><GoGraph className="icons"/> Dashboards</li>
                <li onClick={e => (redirect(e.target.value))} value="2"><RiTeamFill className="icons"/> Membros</li>
                <li onClick={e => (redirect(e.target.value))} value="3"><FaSlackHash className="icons"/> Hashtags</li>
                {Cookie.get('userId') && Cookie.get('userId') != 'client' ? <li onClick={e => (redirect(e.target.value))} value="4"><BiLogOut className="icons"/> Sair</li> : ''}
            </ul>
        </div>
    )
}

export default Menu