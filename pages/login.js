import Head from 'next/head'
import {useState} from 'react'
import axios from 'axios'
import {useRouter} from 'next/router'
import InputMask from 'react-input-mask'

function Login() {
    const [userLogin, setUserLogin] = useState('')
    const [passLogin, setPassLogin] = useState('')
    const [usernameRegister, setUsernameRegister] = useState('')
    const [nameRegister, setNameRegister] = useState('')
    const [functionRegister, setFunctionRegister] = useState('')
    const [emailRegister, setEmailRegister] = useState('')
    const [phoneRegister, setPhoneRegister] = useState('')
    const [passRegister, setPassRegister] = useState('')
    const [rpassRegister, setRPassRegister] = useState('')
    
    const history = useRouter()

    function Log(){
        let options = {
            headers: {
                'Content-Type': ['application/json']
            }
        }

        if(userLogin !== "" && passLogin !=="") {
            axios.post(`/api/users/login`, {userLogin: userLogin, passLogin: passLogin}, options).then(
                response => {
                    if(response.data && response.data.username === userLogin) {
                      sessionStorage.setItem('userId', response.data._id)
                      history.push('/')
                    }else{
                        window.alert('Usuario ou senha incorretos')
                    }
                },
                response => {
                  window.alert('Tivemos algum problema')
                }
            )
        }else {
          window.alert('Campos não preenchidos!')
        }
    }

    async function Reg(){
        if(usernameRegister === '') {
          window.alert("Ops... \nFaltou informar o Nome de Usuário!")
        } else if(nameRegister === '') {
          window.alert("Ops... \nFaltou informar o seu Nome!")
        } else if(functionRegister === '') {
          window.alert("Ops... \nFaltou selecionar sua Função!")
        } else if(emailRegister === '') {
          window.alert("Ops... \nFaltou informar o seu E-mail!")
        } else if(phoneRegister === '' || phoneRegister.indexOf('_') > -1) {
          window.alert("Ops... \nFaltou informar o seu Número de celular!")
        }else if(passRegister !== rpassRegister || passRegister === '' || rpassRegister === ''){
          window.alert("Atenção! \nAs Senhas não conferem")
        } else if(passRegister.length < 6) {
          window.alert("Atenção! \nA Senha deve possuir no mínimo 6 digitos")
        } else {
            let reg = {
                "username": usernameRegister,
                "name": nameRegister,
                "function": functionRegister,
                "email": emailRegister,
                "password": passRegister,
                "phone": phoneRegister,
            }

            let options = {
                headers: {
                    'Content-Type': ['application/json']
                }
            }

            await api.post('/api/users/register', reg, options
            ).then(
                response => {
                    localStorage.setItem('userId', response.data._id)
                    window.alert(`Usuário ${response.data.username} cadastrado!`)
                },
                response => {
                    window.alert(`Opa...\nTemos um problema!\n${response.data.error}`)
                }
            )
        }
    }

    return (
        <div className="mainContainerLog">
            <Head>
                <title>Login / Cadastro</title>
            </Head>
            <div id="logoContainer">
                <div id="logo">
                    <img src='/logo-small.png' alt="Logo InovaOne"/>
                </div>
                <div id="empty"></div>
            </div>
            <div className="formContainer">
                <div id="login" className="container">
                    <div className="title">
                        <h1>Já possuo uma conta</h1>
                    </div>
                    <label htmlFor="ul">Usuário</label>
                    <input
                        id="ul"
                        value={userLogin}
                        onChange={e => setUserLogin(e.target.value)}
                    />
                    <label htmlFor="pl">Senha</label>
                    <input
                        id="pl"
                        type="password"
                        value={passLogin}
                        onChange={e => setPassLogin(e.target.value)}
                    />
                    <button id="bl" onClick={Log}>ACESSAR</button>
                </div>
                <div id="register" className="container">
                    <div className="title">
                        <h1>Sou novo por aqui</h1>
                    </div>
                    <label htmlFor="uc">Nome de Usuário</label>
                    <input
                        id="uc"
                        value={usernameRegister}
                        onChange={e => setUsernameRegister(e.target.value)}
                    />
                    <label htmlFor="nc">Nome</label>
                    <input
                        id="nc"
                        value={nameRegister}
                        onChange={e => setNameRegister(e.target.value)}
                    />
                    <label htmlFor="fc">Função</label>
                    <select
                        id="fc"
                        value={functionRegister}
                        onChange={e => setFunctionRegister(e.target.value)}
                    >
                        <option value={'Atendimento'}>Atendimento</option>
                        <option value={'Suporte'}>Suporte</option>
                        <option value={'Implantação'}>Implantação</option>
                        <option value={'Desenvolvimento'}>Desenvolvimento</option>
                    </select>
                    <label htmlFor="ec">E-mail</label>
                    <input
                        id="ec"
                        type="email"
                        value={emailRegister}
                        onChange={e => setEmailRegister(e.target.value)}
                    />
                    <label htmlFor="phc">Número de celular</label>
                    <InputMask
                        id="phc"
                        mask="(99) 99999-9999"
                        value={phoneRegister}
                        onChange={e => setPhoneRegister(e.target.value)}
                    />
                    <div id="pass">
                        <div>
                            <label htmlFor="sc">Senha</label>
                            <input
                              id="sc"
                              type="password"
                              value={passRegister}
                              onChange={e => setPassRegister(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="rc">Repetir</label>
                            <input
                              id="rc"
                              type="password"
                              value={rpassRegister}
                              onChange={e => setRPassRegister(e.target.value)}
                            />
                        </div>
                    </div>
                    <button id="bc" onClick={Reg}>CADASTRAR</button>
                </div>
            </div>
        </div>
    )
}

export default Login