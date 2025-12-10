package com.ecomarket.notificacion_service.kafka;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PedidoEvent {
    private Long pedidoId;
    private Long productoId;
    private Integer cantidad;
}