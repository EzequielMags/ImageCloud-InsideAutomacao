import ImagensRepository from "../repository/imagens.respository.js"
import { Produto, ProdutosRepository } from "../repository/produtos.repository.js"
import TextService from "./text.service.js"

export default class VinculoImagemService {

    static filtrarProdutosSemImagem(produtos: Produto[]): Produto[] {
        // retorna apenas os produtos que NÂO CONSTA IMAGEM
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
        // função principal, que rodará tudo
        const todosOsProdutos = await ProdutosRepository.buscarTodosProdutosDaLoja(lojaUuid)
        const produtosSemImagem =  this.filtrarProdutosSemImagem(todosOsProdutos)
        const produtosPorCategoria  =  this.agruparProdutosPorCategoria(produtosSemImagem)

        yield {quantidadeDeProdutos: produtosSemImagem.length}

        const categorias =  Object.keys(produtosPorCategoria )
    
        for (const categoria of categorias) {
            const imagensDaCategoria = await ImagensRepository.buscarImagensDaCategoria(categoria)
            const imagensFormatadas  = imagensDaCategoria.map((arquivo) => {
                const textoSemExtensao = TextService.extrairTextoSemExtensao(arquivo)
                const textoNormalizado = TextService.normalizarTexto(textoSemExtensao)
                const palavrasChave = TextService.extrairPalavrasChaves(textoNormalizado)

                return {id: arquivo, nome: arquivo, palavrasChave: palavrasChave}
            })
            
            const produtosDaCategoria = produtosPorCategoria[categoria]
            /// produtosPorCategoria[categoria] é acesso por índice em um Record, então o TypeScript trata o valor como Produto[] | undefined. O for...of não aceita isso sem checagem.
            ///Foi adicionado um if (!produtosDaCategoria) continue antes do loop. Com isso o compilador entende que, dentro do for, a lista existe. O erro some.
            
            if (!produtosDaCategoria) continue 

            for (const produto of produtosDaCategoria) {
                const nomeProduto = produto.sale_name
                const produtoNormalizado = TextService.normalizarTexto(nomeProduto)
                const palavrasChaveProduto = TextService.extrairPalavrasChaves(produtoNormalizado)
                const imagensFiltradas = TextService.filtrarCandidatos(palavrasChaveProduto, imagensFormatadas)
            
                const listaVencedores = TextService.decidirVencedor(palavrasChaveProduto, imagensFiltradas)

                if (listaVencedores.length === 0) {
                    yield {
                        produto: produto,
                        status: "sem_correspondencia",
                    }

                } else {
                    // chamar upload
                    const imagemVencedora = listaVencedores[0]
                    
                    if (!imagemVencedora) continue
                   
                    const conteudoImagem = await ImagensRepository.lerConteudoDaImagem(`./src/assets/Banco de Imagens/${categoria}/SEM LOGO/${imagemVencedora.nome}`)
                   
                    await ProdutosRepository.atualizarImagemDoProduto(produto.uuid, conteudoImagem)
                    if (listaVencedores.length > 1) {
                
                        yield {
                            produto: produto,
                            imagens: listaVencedores,
                            status: "duplicado"
                        }
                    } else {
                       
                        yield {
                            produto: produto,
                            imagem: imagemVencedora,
                            status: "vinculado"
                        }
                    }
                    
                }

                
            }

        }
    }
}

