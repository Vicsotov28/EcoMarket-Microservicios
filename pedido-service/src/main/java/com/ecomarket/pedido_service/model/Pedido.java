package com.ecomarket.pedido_service.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "pedidos")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long usuarioId;   // ¿Quién compró?
    private Long productoId;  // ¿Qué compró? (Usaremos tus IDs 1, 2, 3 o 4)
    private Integer cantidad; // ¿Cuántos?
    private Double precioTotal;

    private String estado;    // "PENDIENTE", "CONFIRMADO"
    private LocalDateTime fecha;

    @PrePersist
    protected void onCreate() {
        fecha = LocalDateTime.now();
        if (estado == null) estado = "PENDIENTE";
    }
}
