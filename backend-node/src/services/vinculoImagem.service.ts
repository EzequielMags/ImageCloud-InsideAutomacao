import ImagensRepository from "../repository/imagens.respository.js"
import { Produto, ProdutosRepository } from "../repository/produtos.repository.js"
import TextService from "./text.service.js"

export default class VinculoImagemService {
  


    static filtrarProdutosSemImagem(produtos: Produto[]): Produto[] {
        return produtos.filter((produto) => produto.image_path === null && produto.image_url === null)
    }
  
    static agruparProdutosPorCategoria(produtos: Produto[]): Record<string, Produto[]> {
        return produtos.reduce((acumulado, produto) => {
            const categoria =  produto.category

            if(!acumulado[categoria]) {
                acumulado[categoria]= []
            }

            acumulado[categoria].push(produto)
            return acumulado
        }, {} as Record <string, Produto[]>)
    }

    static async *vincularImagensAosProdutos(lojaUuid: string) {
        const todosOsProdutos = await ProdutosRepository.buscarTodosProdutosDaLoja(lojaUuid)
        const produtosSemImagem =  this.filtrarProdutosSemImagem(todosOsProdutos)
        const produtosPorCategoria  =  this.agruparProdutosPorCategoria(produtosSemImagem)

        const categorias =  Object.keys(produtosPorCategoria )
    
        for (const categoria of categorias) {
            const imagensDaCategoria = await ImagensRepository.buscarImagensDaCategoria(categoria)
            const imagensComPalavras  = imagensDaCategoria.map((arquivo) => {
                const textoSemExtensao = TextService.extrairTextoSemExtensao(arquivo)
                const textoNormalizado = TextService.normalizarTexto(textoSemExtensao)
                const palavrasChave = TextService.extrairPalavrasChaves(textoNormalizado)

                return {id: arquivo, nome: arquivo, palavrasChave: palavrasChave}
            })

        // continuidade do codigo....
        
        
        }
    }
}

