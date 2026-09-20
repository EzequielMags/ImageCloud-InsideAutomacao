import Fastify  from "fastify";
import VinculoImagemService from "../services/vinculo-imagem.service.js";

const fastify = Fastify()

fastify.get("/vincular-imagens/:lojaUuid", async(request, reply) => {
    const { lojaUuid } = request.params as { lojaUuid: string }
    let vinculados = 0
    let duplicados = 0 
    let semCorrespondencia = 0 

    reply.raw.writeHead(200, {
        "content-type": "text/event-stream",
        "cache-control": "no-cache",
        "connection": "keep-alive"
    })

    for await (const resultado of VinculoImagemService.vincularImagensAosProdutos(lojaUuid)) {
        if (resultado.status === "sem_correspondencia") {
            semCorrespondencia++
        } 
        if (resultado.status === "duplicado") {
            duplicados++
        } 
        if (resultado.status === "vinculado") {
            vinculados++
        }

        reply.raw.write(`data: ${JSON.stringify(resultado)}\n\n`)
        reply.raw.write(`data: ${JSON.stringify({
            resumo: {vinculados, duplicados, semCorrespondencia}
        })}\n\n`)
    }

    reply.raw.end()
})