package com.ecomarket.usuario_service.controller;

import com.ecomarket.usuario_service.model.Usuario;
import com.ecomarket.usuario_service.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UsuarioService service;

    @PostMapping("/register")
    public ResponseEntity<Usuario> register(@RequestBody Usuario usuario) {
        Usuario nuevoUsuario = service.save(usuario);
        return ResponseEntity.ok(nuevoUsuario);
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Usuario loginRequest) {
        // Usamos la clase Usuario para recibir los datos, aunque solo nos importan email y password
        String token = service.login(loginRequest.getEmail(), loginRequest.getPassword());

        if (token != null) {
            // Devolvemos el token en un JSON
            return ResponseEntity.ok(Map.of("token", token));
        } else {
            return ResponseEntity.status(401).body("Credenciales incorrectas");
        }
    }

}