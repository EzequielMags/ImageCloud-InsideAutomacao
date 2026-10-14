import Fastify from "fastify";
import VinculoImagemController from "../controllers/vinculo-imagem.controller.js";

const fastify = Fastify({ logger: true })

fastify.get("/vincular-imagens/:lojaUuid", (request, reply) =>
    VinculoImagemController.vinculoImagem(request, reply)
)

const PORT = 8080
fastify.listen({ port: PORT, host: "127.0.0.1" }, (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }

    console.log("Servidor rodando", address)
})
