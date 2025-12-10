package com.ecomarket.producto_service.repository;

import com.ecomarket.producto_service.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductoRepository extends JpaRepository<Producto, Long> {
    // Aquí podríamos agregar métodos como findByNombre...
}