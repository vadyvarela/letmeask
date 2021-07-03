import { Link, useHistory } from 'react-router-dom'
import { FormEvent, useState } from 'react'
import ilustratiImg from '../assets/images/illustration.svg'
import logo from '../assets/images/logo.svg'

import '../styles/auth.scss'
import { Button } from '../components/Button'
import { database } from '../services/firebase'
import { useAuth } from '../hooks/userAuth'
// import { useAuth } from '../hooks/userAuth'

export function NewRoom() {

  const { user } = useAuth();
  const history = useHistory()
  const [newRoom, setNewRoom] = useState('');
  
  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault()

    if(newRoom.trim() === ''){
      return;
    }

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id
    });

    history.push(`/rooms/${firebaseRoom.key}`)

  } 
  // const { user } = useAuth()
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
          <h2> Criar uma nova sala </h2>
          
          <form onSubmit={handleCreateRoom} action="">
            <input 
              type="text"
              placeholder="Nome da sala" 
              onChange={event => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit"> Criar sala </Button>
          </form>
          <p> Quer entrar em una nova sala? <Link to="/"> Click Aqui</Link> </p>
        </div>
      </main>
    </div>
  )
}