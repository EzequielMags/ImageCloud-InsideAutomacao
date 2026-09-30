import { useState } from "react"
import styles from "./barraProgresso.module.css"



export type PropsProgresso = {
    cor: string,
    percent: number
    
}

export function BarraProgresso() {
    const [progress, setProgress] = useState<number>(10)
    return(
        <div className={styles.container}>
            <h2>Sincronizando Imagens...</h2>
            <div className={`${styles.progress}`}>
                <div style={{width: `${progress}%`}}></div>{progress}%
            </div> 
        </div>
    )
}