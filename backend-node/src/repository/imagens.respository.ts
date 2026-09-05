import fs from "fs/promises"         
class ImagensRepository {
    static async buscarImagensDaCategoria(categoria: string): Promise<string[]> {
        const arquivos = await fs.readdir(`./src/assets/Banco de Imagens/${categoria}/SEM LOGO/`)
        return arquivos
    }

    static async lerConteudoDaImagem(caminhoImagem: string): Promise<Buffer> {
        return fs.readFile(caminhoImagem)
    }
}