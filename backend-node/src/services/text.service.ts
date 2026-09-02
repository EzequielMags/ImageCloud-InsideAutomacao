
const stopWord = ["de", "em", "da", "do", "com", "para"]

type CandidatoComPalavras = {
    id: string
    nome: string
    palavrasChave: string[]
}


class TextService {
    static normalizarTexto(texto: string) {
        const deletaAcento = texto.normalize("NFD")
        return deletaAcento.replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9 ]/g, "").toLowerCase()
    }

    static extrairPalavrasChaves(texto: string) {
        const listaTexto = texto.split(" ")
        const listaFiltrada = listaTexto.filter((p) => !stopWord.includes(p))
        return listaFiltrada
    }

    /**
    * Verifica se um candidato contém todas as palavras exigidas pelo alvo.
    * 
    * Reutilizável nos dois sentidos da comparação do projeto:
    * - alvo = palavras da imagem, candidato = palavras do produto
    *   (usado ao buscar qual produto bate com uma imagem)
    * - alvo = palavras do produto, candidato = palavras da imagem
    *   (usado ao buscar qual imagem bate com um produto)
    */
    static contemPalavrasAlvo(palavrasAlvo: string[],palavrasCandidato: string[]) {
        return palavrasAlvo.every((p) => palavrasCandidato.includes(p))
    }
    
    /**
     * Filtra a lista de candidatos (produto ou imagem), mantendo apenas 
     * os que contêm todas as palavras exigidas pelo alvo.
     * 
     * Reutilizável nos dois sentidos da comparação do projeto:
     * - alvo = palavras da imagem, candidatos = lista de produtos
     *   (usado ao buscar qual produto bate com uma imagem)
     * - alvo = palavras do produto, candidatos = lista de imagens
     *   (usado ao buscar qual imagem bate com um produto)
     */
    static filtrarCandidatos(palavrasAlvo: string[], candidatos: CandidatoComPalavras[]): CandidatoComPalavras[] {
        return candidatos.filter((candidato) => 
            this.contemPalavrasAlvo(palavrasAlvo, candidato.palavrasChave)
        )

    }

    /**
     * Entre os candidatos filtrados, decide qual (ou quais) está(ão) mais 
     * próximo(s) do alvo, comparando o tamanho dos arrays de palavras — 
     * quanto menor a diferença de tamanho, mais exato é o match.
     * Pode retornar mais de um candidato em caso de empate (duplicidade).
     * 
     * Reutilizável nos dois sentidos da comparação do projeto:
     * - alvo = palavras da imagem, candidatos = lista de produtos filtrados
     * - alvo = palavras do produto, candidatos = lista de imagens filtradas
     */

    static decidirVencedor(palavrasAlvo: string[], candidatos: CandidatoComPalavras[]): CandidatoComPalavras[] {
        if (candidatos.length === 0) return []
    
        const candidatosDistancia = candidatos.map((candidato) => ({
            ...candidato,
            distancia: Math.abs(palavrasAlvo.length - candidato.palavrasChave.length)
        }))
    
        const distancias = candidatosDistancia.map((c) => c.distancia)
        const menorDistancia = Math.min(...distancias)
    
        return candidatosDistancia.filter((c) => c.distancia === menorDistancia)
    }
}