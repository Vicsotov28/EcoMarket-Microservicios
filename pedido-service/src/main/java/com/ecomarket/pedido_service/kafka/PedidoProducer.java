package com.ecomarket.pedido_service.kafka;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.Message;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.stereotype.Service;

@Service
public class PedidoProducer {

    @Autowired
    private KafkaTemplate<String, PedidoEvent> kafkaTemplate;

    public void enviarEventoPedidoCreado(PedidoEvent evento) {
        // Creamos un mensaje para el topic "pedido-creado-topic"
        Message<PedidoEvent> message = MessageBuilder
                .withPayload(evento)
                .setHeader(KafkaHeaders.TOPIC, "pedido-creado-topic")
                .build();

        kafkaTemplate.send(message);
        System.out.println("📢 Evento enviado a Kafka: Pedido " + evento.getPedidoId());
    }
}