"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const amqplib_1 = __importDefault(require("amqplib"));
const buffer_1 = require("buffer");
function publicar() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // se conecta al broker
            const coneccion = yield amqplib_1.default.connect('amqp://adp:adp@localhost:5672');
            // creamos un canal
            const canal = yield coneccion.createChannel();
            const nombreExchange = 'topic_exchange';
            const routingKey = 'actuadores.luz';
            yield canal.assertExchange(nombreExchange, 'topic', { durable: true });
            const mensajes = ['Mensaje L 1', 'Mensaje L 2', 'Mensaje L 3'];
            for (const mensaje of mensajes) {
                canal.publish(nombreExchange, routingKey, buffer_1.Buffer.from(mensaje));
                console.log(`[productor] Mensaje enviado: ${mensaje}`);
            }
            // cerramos el canal
            yield canal.close();
            // cerramos la coneccion
            yield coneccion.close();
        }
        catch (error) {
            console.error('Error:', error);
        }
    });
}
publicar();
