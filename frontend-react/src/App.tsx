import { useState } from 'react'
import './App.css'
import { type StatusSincronizacao, Header } from './components/Header'
import Form from './components/Form'
import { BarraProgresso } from './components/BarraProgresso'
import ListaLog from './components/ListaLog'


function App() {

  const [statusHeader, setStatusHeader]= useState<StatusSincronizacao>("em_espera") 
  const [progress, setProgress] = useState<number>(0)
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
