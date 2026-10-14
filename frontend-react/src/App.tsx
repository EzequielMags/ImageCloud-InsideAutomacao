import { useState } from 'react'
import './App.css'
import { type StatusSincronizacao, Header } from './components/Header'
import Form from './components/Form'
import { BarraProgresso } from './components/BarraProgresso'
import ListaLog, { type ListaProdutos } from './components/ListaLog'





function App() {



  function aoSincronizar(uuid: string) {
    
    if (uuid.trim() === "") return console.log("Coloque um Uuid") // criar um componente para esse erro
    
    setStatusHeader("em_andamento")

    const eventSource = new EventSource(`http://localhost:8080/vincular-imagens/${uuid}`)
    // adicionar o VinculoImagem.service com o uuid
    
    eventSource.onmessage = ((e) => {
      
      const dados = JSON.parse(e.data)
      
      if ("resumo" in dados) {
        setStatusHeader("sincronizado")
        eventSource.close()
      }

      if ("produto" in dados) {
        
        const novoItem = {
          uuid: dados.produto.uuid,
          nome: dados.produto.sale_name,
          status: dados.status,

        }
        setListaResultados((prevLista) => [...prevLista, novoItem])
      }

      if ("quantidadeDeProdutos" in dados) {
        setQuantidadeTotal(dados.quantidadeDeProdutos)
      } 
    })
  }


  const [quantidadeTotal, setQuantidadeTotal] = useState<number>(0) 
  const [listaResultados, setListaResultados] = useState<ListaProdutos[]>([])
  const [statusHeader, setStatusHeader]= useState<StatusSincronizacao>("em_espera") 
  
  const progress =   quantidadeTotal === 0 ? 0 : Math.floor(listaResultados.length / quantidadeTotal * 100)

  return (

    <main>
      <Header status={statusHeader}/>
      <Form aoSincronizar={aoSincronizar}/>
      <BarraProgresso percent={progress}/>
      <hr />
      <ListaLog listaResultados={listaResultados}/>
    </main>
  )
}

export default App
