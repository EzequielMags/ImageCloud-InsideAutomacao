import Fastify  from "fastify";
import VinculoImagemService from "../services/vinculo-imagem.service.js";
import VinculoImagemController from "../controllers/vinculo-imagem.controller.js";

const fastify = Fastify()

fastify.get("/vincular-imagens/:lojaUuid", (request, reply) => VinculoImagemController.vinculoImagem(request, reply))