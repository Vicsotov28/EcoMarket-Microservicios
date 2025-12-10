package com.ecomarket.pedido_service.controller;


import com.ecomarket.pedido_service.kafka.PedidoEvent;
import com.ecomarket.pedido_service.kafka.PedidoProducer;
import com.ecomarket.pedido_service.model.Pedido;
import com.ecomarket.pedido_service.repository.PedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/pedidos")
@CrossOrigin(origins = "http://localhost:3000")
public class PedidoController {

    @Autowired
    private PedidoRepository repository;

    @Autowired
    private PedidoProducer producer;

    @PostMapping
    public Pedido crearPedido(@RequestBody Pedido pedido) {
        // 1. Guardamos el pedido en Base de Datos (Estado PENDIENTE)
        pedido.setEstado("PENDIENTE");
        Pedido pedidoGuardado = repository.save(pedido);

        // 2. Avisamos a Kafka para que ProductoService descuente el stock
        PedidoEvent evento = new PedidoEvent(
                pedidoGuardado.getId(),
                pedidoGuardado.getProductoId(),
                pedidoGuardado.getCantidad()
        );
        producer.enviarEventoPedidoCreado(evento);

        return pedidoGuardado;
    }
}