import { useState } from 'react'
import './App.css'
import { type StatusSincronizacao, Header } from './components/Header'
import Form from './components/Form'
import { BarraProgresso } from './components/BarraProgresso'


function App() {

  const [statusHeader, setStatusHeader]= useState<StatusSincronizacao>("sincronizado") 
  return (

    <main >
      <Header status={statusHeader}/>
      <Form />
      <BarraProgresso />
     
    </main>
  )
}

export default App
