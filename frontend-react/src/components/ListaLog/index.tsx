import ProdutoLog from "../ProdutoLog"
import type { StatusProduto } from "../ProdutoLog"
import styles from "./lista-log.module.css"



type ListaProdutos = {
    nome: string,
    status: StatusProduto
}

export default function ListaLog({/*adicionar parametro de produtos*/}) {


    const produtosMockados: ListaProdutos[] = [
        {
            nome: "Produto 1",
            status: "vinculado"
        },
        {
            nome: "Produto 2",
            status: "duplicado"
        },
        {
            nome: "Produto 3",
            status: "sem_correspondencia"
        },
    ]

    return (
    <div className={styles.container}>
        <h2>Log de Produtos</h2>
        <ul>
            {
                produtosMockados.map((produto) => (
                    <ProdutoLog
                        key={produto.nome}
                        nome={produto.nome}
                        status={produto.status}
                    />
                )) 
            }
        </ul>
    </div>
)
    
}