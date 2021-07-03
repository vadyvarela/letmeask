import { useHistory } from 'react-router-dom'
import { FormEvent, useState } from 'react'

import ilustratiImg from '../assets/images/illustration.svg'
import logo from '../assets/images/logo.svg'
import googleIcon from '../assets/images/google-icon.svg'

import '../styles/auth.scss'
import { Button } from '../components/Button'
import { useAuth } from '../hooks/userAuth'
import { database } from '../services/firebase'

export function Home() {
  const history = useHistory();
  const { user, SignInWithGoogle } = useAuth()
  const [roomCode, setRoomCode] = useState('')

  async function handleCreateRoom() {
    if(!user) {
      await SignInWithGoogle()
    }
    history.push('/rooms/new')
  }

  async function handleJoinRoom(event: FormEvent){
    event.preventDefault()

    if(roomCode.trim() === ''){
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();
    if(!roomRef.exists()){
      alert('Romm does not exists');
      return;
    }

    history.push(`rooms/${roomCode}`)

  }

  return (
    <div id="page-auth">
      <aside>
        <img src={ilustratiImg} alt="Logo" />
        <strong> Crie salas de Q&amp;A ao-vivo </strong>
        <p> Tire as duvidas da sua audiencia em tempo real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logo} alt="LetMeAsk" />
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIcon} alt="Logo" />
            Crie sua sala com o google
          </button>

          <div className="separator"> ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom} action="">
            <input 
              type="text"
              placeholder="Digite o codigo da sala" 
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit"> Entrar na sala </Button>
          </form>
        </div>
      </main>
    </div>
  )
}