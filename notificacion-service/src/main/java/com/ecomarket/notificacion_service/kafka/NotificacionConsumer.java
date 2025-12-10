package com.ecomarket.notificacion_service.kafka;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class NotificacionConsumer {

    @KafkaListener(topics = "pedido-creado-topic", groupId = "email-group")
    public void enviarNotificacion(PedidoEvent evento) {
        // Aquí simularíamos el envío real de un correo con JavaMailSender
        System.out.println("📧 ENVIANDO CORREO A CLIENTE:");
        System.out.println("   Hola! Tu pedido #" + evento.getPedidoId() + " ha sido confirmado.");
        System.out.println("   Producto ID: " + evento.getProductoId());
        System.out.println("   Cantidad: " + evento.getCantidad());
        System.out.println("   Estado: EN CAMINO 🚚");
        System.out.println("------------------------------------------------");
    }
}
