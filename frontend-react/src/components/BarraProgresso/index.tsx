import styles from "./barraProgresso.module.css"

export type PropsProgresso = {
    percent: number
    
}

export function BarraProgresso({percent}: PropsProgresso) {
    let textoDinamico = ""
    let corBarraProgresso

    if (percent === 100){
        textoDinamico = "Imagens Sincronizadas"
        corBarraProgresso = "#22C55E"
    }   else {
        textoDinamico = "Sincronizando Imagens..."
        corBarraProgresso = "#F58220"
    }

    return(
        <div className={styles.container}>
            <h2>{textoDinamico}</h2>
            <div style={{border: `2px solid ${corBarraProgresso}`}} className={`${styles.progress}`}>
                <div style={{width: `${percent}%`, backgroundColor: `${corBarraProgresso}`}}></div>{percent}%
            </div> 
        </div>
    )
}