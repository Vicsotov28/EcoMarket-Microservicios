# 🌿 EcoMarket SPA - Arquitectura de Microservicios

> **Plataforma de E-commerce distribuida, resiliente y basada en eventos.**

Este proyecto implementa una arquitectura de **Microservicios** para una tienda de productos ecológicos. Utiliza **Spring Boot** para el backend, **React** para el frontend, **PostgreSQL** como base de datos y **Apache Kafka** para la comunicación asíncrona entre servicios.

---

## 🚀 Tecnologías Utilizadas

* **Frontend:** React JS, Bootstrap 5, Axios, Context API.
* **Backend:** Java 17, Spring Boot 3.x.
* **Base de Datos:** PostgreSQL 15 (Patrón *Database-per-Service*).
* **Mensajería:** Apache Kafka + Zookeeper (Event-Driven Architecture).
* **Infraestructura:** Docker & Docker Compose.
* **Seguridad:** JWT (JSON Web Tokens).

---

## 🏗️ Arquitectura del Sistema

El sistema está compuesto por 4 microservicios independientes y un frontend:

1.  **Usuario-Service (Puerto 8081):** Gestión de autenticación y tokens JWT.
2.  **Producto-Service (Puerto 8082):** Catálogo de productos y control de stock.
3.  **Pedido-Service (Puerto 8083):** Gestión de compras. Actúa como *Productor* de eventos Kafka.
4.  **Notificacion-Service (Puerto 8084):** *Consumidor* de Kafka. Simula envío de correos al confirmar una compra.
5.  **Frontend (Puerto 3000):** SPA en React.

### 🔄 Flujo de Compra (Event-Driven)
1.  El usuario confirma la compra en el Frontend.
2.  **Pedido-Service** guarda la orden y emite el evento `PedidoCreado` a Kafka.
3.  **Producto-Service** escucha el evento y descuenta el stock automáticamente.
4.  **Notificacion-Service** escucha el evento y envía un correo de confirmación.

*Este diseño asegura que la venta no se bloquee si el servicio de correos falla.*

---

## 🛠️ Guía de Instalación y Ejecución

Sigue estos pasos para levantar el proyecto en tu máquina local.

### Prerrequisitos
* [Docker Desktop](https://www.docker.com/products/docker-desktop/) (Instalado y corriendo).
* [Java JDK 17](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html).
* [Node.js](https://nodejs.org/en/download).
* IntelliJ IDEA (o tu IDE favorito).

### Paso 1: Clonar el repositorio
```bash
git clone [https://github.com/Vicsotov28/EcoMarket-Microservicios.git]
cd EcoMarket-Microservicios
```

### Paso 2: Clonar el repositorio
Ejecuta el siguiente comando en la raíz del proyecto para iniciar PostgreSQL, Kafka y Zookeeper:
```bash
docker-compose up -d
```
### Paso 3: Iniciar Microservicios (Backend)
Abre el proyecto en tu IDE y ejecuta las aplicaciones Spring Boot en el siguiente orden:

* **UsuarioServiceApplication** 
* **ProductoServiceApplication** 
* **PedidoServiceApplication** 
* **NotificacionServiceApplication**

### Paso 4: Iniciar Frontend (React)
Abre una terminal nueva, navega a la carpeta del frontend e inicia la aplicación:
```bash
cd ecomarket-frontend
npm install
npm start
```
La aplicación se abrirá automáticamente en http://localhost:3000.

### 🧪 Credenciales de Prueba
Para probar el flujo completo, puedes usar el siguiente usuario pre-registrado (o crear uno nuevo):

* **Email:** juan@ecomarket.com
* **Contraseña:** juanPassword123

### 👥 Equipo de Desarrollo
Proyecto desarrollado para la asignatura de Arquitectura.
* **Vicente Soto**
* **Juan Carrillo**
* **Benjamín Lackington**
* **Alonzo Cruz**
