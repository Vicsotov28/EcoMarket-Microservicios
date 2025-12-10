package com.ecomarket.producto_service.controller;

import com.ecomarket.producto_service.model.Producto;
import com.ecomarket.producto_service.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/productos")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductoController {

    @Autowired
    private ProductoRepository repository;

    // Listar todos los productos
    @GetMapping
    public List<Producto> listar() {
        return repository.findAll();
    }

    // Crear un producto (Para llenar el catálogo)
    @PostMapping
    public Producto crear(@RequestBody Producto producto) {
        return repository.save(producto);
    }

    // Buscar por ID (Útil para el carrito)
    @GetMapping("/{id}")
    public Producto obtener(@PathVariable Long id) {
        return repository.findById(id).orElseThrow();
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        repository.deleteById(id);
    }
}