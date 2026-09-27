import { useState } from 'react'
import './App.css'
import { type StatusSincronizacao, Header } from './components/Header'
import Form from './components/Form'


function App() {

  const [statusHeader, setStatusHeader]= useState<StatusSincronizacao>("sincronizado") 
  return (

    <main >
      <Header status={statusHeader}/>
      <Form />
   
     
    </main>
  )
}

export default App
