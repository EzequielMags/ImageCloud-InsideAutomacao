
class VinculoImagemService {
    static extrairTexto(caminhoCompleto: string) {
        const caminhoSeparado = caminhoCompleto.split("/")
        const categoria = caminhoSeparado[1]
        const nomeArquivoComExtensao = caminhoSeparado.at(-1)
        const nomeArquivo = nomeArquivoComExtensao?.split(".").slice(0, -1).join(".")
        return {
            categoria,
            nomeArquivo
        }
    }

  
}


