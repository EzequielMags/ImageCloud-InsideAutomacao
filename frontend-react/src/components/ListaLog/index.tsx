import ProdutoLog from "../ProdutoLog"
import type { StatusProduto } from "../ProdutoLog"
import styles from "./lista-log.module.css"


type Props = {
    listaResultados: ListaProdutos[]
}

export type ListaProdutos = {
    uuid: string,
    nome: string,
    status: StatusProduto
}

export default function ListaLog({listaResultados}: Props) {

    return (
    <div className={styles.container}>
        <h2>Log de Produtos</h2>
        <ul>
            {
                listaResultados.map((produto) => (
                    <ProdutoLog
                        key={produto.uuid}
                        nome={produto.nome}
                        status={produto.status}
                    />
                )) 
            }
        </ul>
    </div>
)
    
}