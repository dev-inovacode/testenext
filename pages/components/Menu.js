import {useRouter} from 'next/router'
import Cookie from 'js-cookie'
import {BiLogIn, BiLogOut} from 'react-icons/bi'
import {BsCalendar, BsExclamationDiamond} from 'react-icons/bs'
import {FaUser, FaSlackHash} from 'react-icons/fa'
import {GoGraph} from 'react-icons/go'
import {RiTeamFill} from 'react-icons/ri'

function Menu() {
    const history = useRouter()
    
    function redirect(url) {
        const pages = [
            '/login',
            '/profile',
            '/daily',
            '/pendencies',
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
                {Cookie.get('userId')?
                    <li onClick={e => (redirect(e.target.value))} value="1"><FaUser className="icons"/> Perfil</li>
                    :
                    <li onClick={e => (redirect(e.target.value))} value="0"><BiLogIn className="icons"/> Login</li>
                }
                <li onClick={e => (redirect(e.target.value))} value="2"><BsCalendar className="icons"/> Daily</li>
                <li onClick={e => (redirect(e.target.value))} value="3"><BsExclamationDiamond className="icons"/> Pendências</li>
                <li onClick={e => (redirect(e.target.value))} value="4"><GoGraph className="icons"/> Dashboards</li>
                <li onClick={e => (redirect(e.target.value))} value="5"><RiTeamFill className="icons"/> Membros</li>
                <li onClick={e => (redirect(e.target.value))} value="6"><FaSlackHash className="icons"/> Hashtags</li>
                {Cookie.get('userId') ? <li onClick={e => (redirect(e.target.value))} value="7"><BiLogOut className="icons"/> Sair</li> : ''}
            </ul>
        </div>
    )
}

export default Menu