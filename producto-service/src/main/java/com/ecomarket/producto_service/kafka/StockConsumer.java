package com.ecomarket.producto_service.kafka;


import com.ecomarket.producto_service.model.Producto;
import com.ecomarket.producto_service.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class StockConsumer {

    @Autowired
    private ProductoRepository repository;

    // Escucha el topic "pedido-creado-topic"
    // El groupId "stock-group" sirve para identificar quién está leyendo
    @KafkaListener(topics = "pedido-creado-topic", groupId = "stock-group")
    public void consumirEvento(PedidoEvent evento) {
        System.out.println("📩 Evento recibido en Productos: Se vendieron "
                + evento.getCantidad() + " unidades del producto " + evento.getProductoId());

        // 1. Buscar el producto
        Optional<Producto> productoOpt = repository.findById(evento.getProductoId());

        if (productoOpt.isPresent()) {
            Producto producto = productoOpt.get();

            // 2. Descontar stock (Validando que no quede negativo)
            int nuevoStock = producto.getStock() - evento.getCantidad();

            if (nuevoStock >= 0) {
                producto.setStock(nuevoStock);
                repository.save(producto);
                System.out.println("✅ Stock actualizado. Nuevo stock: " + nuevoStock);
            } else {
                System.out.println("❌ ERROR: Stock insuficiente para el pedido " + evento.getPedidoId());
                // Aquí en un sistema real enviaríamos un evento de "PedidoCancelado"
                // para revertir la venta (Saga de Compensación).
            }
        } else {
            System.out.println("⚠️ Producto no encontrado: " + evento.getProductoId());
        }
    }
}
