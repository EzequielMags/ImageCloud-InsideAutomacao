import { useState } from 'react'
import './App.css'
import { type StatusSincronizacao, Header } from './components/Header'
import Form from './components/Form'
import { BarraProgresso } from './components/BarraProgresso'
import ListaLog from './components/ListaLog'


function App() {

  const [statusHeader, setStatusHeader]= useState<StatusSincronizacao>("sincronizado") 
  
  const [progress, setProgress] = useState<number>(100)
  return (

    <main>
      <Header status={statusHeader}/>
      <Form />
      <BarraProgresso percent={progress}/>
      <hr />
      <ListaLog />
    </main>
  )
}

export default App
