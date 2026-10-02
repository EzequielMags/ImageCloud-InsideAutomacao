import ProdutoLog from "../ProdutoLog"
import type { StatusProduto } from "../ProdutoLog"
import styles from "./lista-log.module.css"



export default function ListaLog({/*adicionar parametro de produtos*/}) {

    const produtosMockados = [
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
            {produtosMockados.map((produto) => {
                return <ProdutoLog nome={produto.nome} status={produto.status as StatusProduto} />
            })/* .map da lista de produtos * */}
        </ul>
    </div>
)
    
}