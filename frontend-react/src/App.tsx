import { useState } from 'react'
import './App.css'
import { type StatusSincronizacao, Header } from './components/Header'

function App() {

  const [statusHeader, setStatusHeader]= useState<StatusSincronizacao>("em_andamento") 

  return (

    <main>
      <Header status={statusHeader}/>
    </main>
  )
}

export default App
