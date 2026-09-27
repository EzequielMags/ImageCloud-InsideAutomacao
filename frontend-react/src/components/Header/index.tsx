import styles from "./header.module.css"

export type StatusSincronizacao = "em_espera" | "sincronizado" | "em_andamento"

type Props = {
    status: StatusSincronizacao
}

type ConfiguracaoStatus = {
    texto: string,
    cor: string
}

const configuracaoStatus: Record<StatusSincronizacao, ConfiguracaoStatus> = {
    em_espera: {texto: "Em Espera", cor: "cinza"},
    em_andamento: {texto: "Em andamento", cor: "amarelo"},
    sincronizado: {texto: "Sincronizado", cor: "verde"}
}

export function Header({ status }: Props) {
    const {texto, cor} = configuracaoStatus[status]
    return (
    <header className={styles.cabecalho}>
        <div className={styles.container}>
            {/*ADICIONAR A LOGO DA INSIDE AUTOMAÇÃO (sem a escrita)*/ }
            <h1>ImageCloud</h1>
            <div className={`${styles[cor]} ${styles.statusContainer}`}>
                <span className={`${styles.circle} ${styles[cor]}`}></span>
                <span >{texto}</span>
            </div>
        </div>
    </header>
)
}