type Produto = {
    uuid: string
    sale_name: string
    category: string
    image_path: string | null
    image_url: string | null
}

type RespostaListaProdutos = {
    data: Produto[]
    meta: {
        last_page: number
    }
}

class ProdutosRepository {
    static async buscarProdutosDaLoja(storeUuid: string, page: number = 1): Promise<RespostaListaProdutos> {
        const api = await fetch(`https://api.erpcloud.com.br/api/v1/public/stores/${storeUuid}/products?page=${page}`)
        const response: RespostaListaProdutos = await api.json()
        return response
    }

    static async buscarTodosProdutosDaLoja(storeUuid: string): Promise<Produto[]> {
        const todosProdutos: Produto[] = []
        let page: number = 1
        let lastPage: number | null = null

        do {
            const response = await this.buscarProdutosDaLoja(storeUuid,page )
            todosProdutos.push(...response.data)

            if (lastPage === null || lastPage === undefined) {
                lastPage = response.meta.last_page
            }

            page ++
        } while (page <= lastPage)

        return todosProdutos
    }

    static async atualizarImagemDoProduto(produtoUuid: string, imagem: Buffer) {
        const image = new Blob([Uint8Array.from(imagem)], { type: "image/jpeg" })
        const formData = new FormData()
        formData.append("image", image)
        const api = await fetch(`https://api.erpcloud.com.br/api/v1/public/products/${produtoUuid}/image`, {
            method: "POST",
            body: formData})
    }

    
}
