package com.ecomarket.usuario_service.service;

import com.ecomarket.usuario_service.model.Usuario;
import com.ecomarket.usuario_service.repository.UsuarioRepository;
import com.ecomarket.usuario_service.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository repository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    // Método para registrar un usuario
    public Usuario save(Usuario usuario) {
        // Encriptamos la contraseña antes de guardar
        usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
        return repository.save(usuario);
    }

    // Método para buscar por email (lo usaremos en el login)
    public Optional<Usuario> findByEmail(String email) {
        return repository.findByEmail(email);
    }

    public String login(String email, String password) {
        // 1. Buscamos al usuario
        Optional<Usuario> usuarioOpt = repository.findByEmail(email);

        if (usuarioOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();
            // 2. Verificamos si la contraseña coincide (usando BCrypt)
            if (passwordEncoder.matches(password, usuario.getPassword())) {
                // 3. Si coincide, generamos y devolvemos el Token
                return jwtUtil.generateToken(usuario.getEmail(), usuario.getRol());
            }
        }
        // Si falla algo, devolvemos null (o podríamos lanzar una excepción)
        return null;
    }

}