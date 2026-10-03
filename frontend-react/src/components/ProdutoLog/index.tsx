import styles from "./produto-log.module.css"
import { Check, TriangleAlert, X } from "lucide-react"

export type StatusProduto = "vinculado" | "duplicado" | "sem_correspondencia"

type Props = {
    nome: string,
    status: StatusProduto
}

export type ConfiguracaoStatusProduto = {
    icone: React.ReactNode,
    cor: string,
    statusFormatado: string
}

const ConfiguracaoProduto: Record<StatusProduto, ConfiguracaoStatusProduto> = {
    vinculado: {icone: <Check color="#22C55E" size={25} />, cor: "#22C55E", statusFormatado: "Vinculado"},
    duplicado: {icone: <TriangleAlert color="#FDB813" size={25} />, cor: "#FDB813", statusFormatado: "Duplicado"},
    sem_correspondencia: {icone: <X color="#FD1B13" size={25} />, cor: "#FD1B13B3", statusFormatado: "Sem Match"},
}

export default function ProdutoLog({nome, status}: Props) {
    
    const {icone, cor, statusFormatado} = ConfiguracaoProduto[status]

  return(
    <li className={styles.container}>
        <div className={styles.info}>
            {icone}
            <h3>{nome}</h3>
        </div>
        <div className={styles.status}>
            <h3 style={{color: cor}}>{statusFormatado}</h3>
        </div>
    </li>
  )  
}