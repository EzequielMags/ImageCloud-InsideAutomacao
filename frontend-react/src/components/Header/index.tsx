import styles from "./header.module.css"

type StatusSincronizacao = "em_espera" | "sincronizado" | "em_andamento"

type Props = {
    status: StatusSincronizacao
}
export default function Header({ status }: Props) {
return (
    <header className={styles.cabecalho}>

    </header>
)
}