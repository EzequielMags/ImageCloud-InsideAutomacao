import { useState } from "react"
import styles from "./form.module.css"


type Props = {
  aoSincronizar: (uuid: string) => void
}

export default function Form({ aoSincronizar }: Props) {
    const [valueInput, setValueInput] = useState<string>("")
 
    return(
        <form className={styles.form} onSubmit={(event) => {
            event.preventDefault()
            aoSincronizar(valueInput)
          }}> 
            <input placeholder="Digite o Uuid da loja" type="text" value={valueInput} onChange={(event) => {
              
              setValueInput(event.target.value)}
    
            } />
                  
            <button type='submit'>Sincronizar</button>
    
          </form>

    )
}