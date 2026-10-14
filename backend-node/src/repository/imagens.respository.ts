import fs from "fs/promises"
export default class ImagensRepository {
    static async buscarImagensDaCategoria(categoria: string): Promise<string[]> {
        
        try {
            const arquivos = await fs.readdir(`./src/assets/Banco de Imagens/${categoria}/`)
            return arquivos
            
        } catch (error) {
            if( error instanceof Error && "code" in error ) {
                if( error.code === "ENOENT") {
                    return []
                } else {
                    throw error
                }
            } else {
                throw new Error(`Falha ao buscar Imagens da Categoria`, {cause: error}) 
            }
        }
    }

    static async lerConteudoDaImagem(caminhoImagem: string): Promise<Buffer> {
        return fs.readFile(caminhoImagem)
    }

}