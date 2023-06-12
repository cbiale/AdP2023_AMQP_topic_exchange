import amqp from 'amqplib';
import {Buffer} from 'buffer';

async function publicar() {
  try {
    // se conecta al broker
    const coneccion = await amqp.connect('amqp://adp:adp@localhost:5672');
    // creamos un canal
    const canal = await coneccion.createChannel();
    
    const nombreExchange = 'topic_exchange';
    const routingKey = 'sensores.temperatura';

    await canal.assertExchange(nombreExchange, 'topic', { durable: true });

    const mensajes = ['Mensaje L 1', 'Mensaje L 2', 'Mensaje L 3'];

    for (const mensaje of mensajes) {
      canal.publish(nombreExchange, routingKey, Buffer.from(mensaje));
      console.log(`[productor] Mensaje enviado: ${mensaje}`);
    }
    
    // cerramos el canal
    await canal.close();
    // cerramos la coneccion
    await coneccion.close();
  } catch (error) {
    console.error('Error:', error);
  }
}

publicar();
