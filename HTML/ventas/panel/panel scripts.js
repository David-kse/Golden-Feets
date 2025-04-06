<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Panel de Ventas - Golden Feets</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css">
    <style>
        :root {
            --primary-color: #6a5af9;
            --secondary-color: #d73bf6;
            --primary-gradient: linear-gradient(135deg, #6a5af9, #d73bf6);
            --hover-shadow: 0 15px 25px rgba(0,0,0,0.15);
            --icon-bg: #e6f2ff;
            --text-color: #2c3e50;
            --accent-color: #ff6b6b;
            --background-color: #f4f6f9;
            --white: #ffffff;
            --shadow-light: 0 4px 8px rgba(0, 0, 0, 0.1);
            --shadow-medium: 0 6px 12px rgba(0, 0, 0, 0.08);
            --success-color: #10b981;
            --warning-color: #f59e0b;
            --danger-color: #ef4444;
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            font-family: 'Arial', sans-serif;
            background-color: var(--background-color);
            color: var(--text-color);
            line-height: 1.6;
        }

        /* Stat Card Styles */
        .stat-card {
            background-color: var(--white);
            border-radius: 1rem;
            box-shadow: var(--shadow-medium);
            transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
            overflow: hidden;
        }

        .stat-card:hover {
            transform: translateY(-8px);
            box-shadow: var(--hover-shadow);
            background: linear-gradient(145deg, var(--white), #f0f0f0);
        }

        /* Icon Container */
        .icon-container {
            width: 54px;
            height: 54px;
            border-radius: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: var(--icon-bg);
            transition: transform 0.3s ease;
        }

        .icon-container:hover {
            transform: rotate(15deg) scale(1.1);
        }

        /* Trend Indicators */
        .trend-up {
            color: var(--success-color);
            font-weight: bold;
            animation: pulse 1.5s infinite;
        }

        .trend-down {
            color: var(--danger-color);
            font-weight: bold;
        }

        /* Avatar Styles */
        .avatar {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--white);
            font-weight: 600;
            background: var(--primary-gradient);
            transition: all 0.3s ease;
            font-size: 2rem;
            margin: 0 auto;
        }

        .avatar:hover {
            transform: scale(1.1) rotate(5deg);
            box-shadow: 0 8px 15px rgba(0,0,0,0.2);
        }

        /* Search Container */
        .search-container {
            position: relative;
            width: 300px;
        }

        .search-container i {
            position: absolute;
            left: 15px;
            top: 50%;
            transform: translateY(-50%);
            color: #6b7280;
            transition: color 0.3s ease;
        }

        .search-input {
            padding-left: 45px;
            border: 2px solid #e0e7ff;
            transition: border-color 0.3s ease;
            width: 100%;
        }

        .search-input:focus {
            border-color: var(--primary-color);
        }

        /* Profile Card */
        .profile-card {
            background: var(--primary-gradient);
            color: var(--white);
            border-radius: 1rem;
            transition: transform 0.4s ease;
            box-shadow: var(--shadow-light);
            height: 100%;
        }

        .profile-card:hover {
            transform: scale(1.02);
        }

        .profile-stats {
            background-color: rgba(255,255,255,0.15);
            border-radius: 0.75rem;
        }

        /* Sidebar */
        #sidebar {
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            z-index: 100;
            width: 250px;
            padding: 48px 0 0;
            background-color: var(--white);
            box-shadow: 5px 0 15px rgba(0, 0, 0, 0.05);
            transition: width 0.3s ease;
        }

        #sidebar .nav-link {
            font-weight: 500;
            color: #333;
            transition: all 0.3s ease;
            padding: 10px 15px;
            display: block;
            border-radius: 0.5rem;
            margin: 0.25rem 1rem;
        }

        #sidebar .nav-link.active {
            color: var(--primary-color);
            background-color: #f0f3ff;
            font-weight: 600;
        }

        #sidebar .nav-link:hover:not(.active) {
            background-color: #f8f9fa;
            transform: translateX(5px);
        }

        #sidebar .nav-link i {
            margin-right: 12px;
            transition: transform 0.3s ease;
        }

        #sidebar .nav-link:hover i {
            transform: scale(1.2);
        }

        /* Main Content */
        main {
            margin-left: 250px;
            transition: margin 0.3s ease;
        }

        /* Table Styles */
        .table-responsive {
            overflow-x: auto;
        }

        .table {
            width: 100%;
            margin-bottom: 1rem;
            color: var(--text-color);
        }

        .table th {
            background-color: #f8f9fa;
            font-weight: 600;
        }

        .table-striped tbody tr:nth-of-type(odd) {
            background-color: rgba(0, 0, 0, 0.02);
        }

        .table-hover tbody tr:hover {
            background-color: rgba(0, 0, 0, 0.04);
        }

        /* Button Styles */
        .btn-action {
            padding: 0.25rem 0.5rem;
            font-size: 0.875rem;
            border-radius: 0.25rem;
        }

        /* Toast Notification */
        .toast-container {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1100;
        }

        /* Form Validation */
        .is-invalid {
            border-color: var(--danger-color) !important;
        }

        .invalid-feedback {
            color: var(--danger-color);
            font-size: 0.875rem;
            margin-top: 0.25rem;
            display: none;
        }

        /* Utilities */
        .d-none {
            display: none !important;
        }

        .cursor-pointer {
            cursor: pointer;
        }

        /* Animations */
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .fade-in {
            animation: fadeIn 0.5s ease-out;
        }

        /* Responsive adjustments */
        @media (max-width: 992px) {
            #sidebar {
                width: 220px;
            }
            main {
                margin-left: 220px;
            }
        }

        @media (max-width: 768px) {
            #sidebar {
                width: 0;
                overflow: hidden;
            }
            main {
                margin-left: 0;
            }
            .search-container {
                width: 100%;
                margin-top: 1rem;
            }
        }
    </style>
</head>
<body class="bg-light">
    <!-- Toast Notifications -->
    <div class="toast-container"></div>
    
    <!-- Nueva Venta Modal -->
    <div class="modal fade" id="nuevaVentaModal" tabindex="-1" aria-labelledby="nuevaVentaModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="nuevaVentaModalLabel">Formulario de Compra de Zapatillas</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="ventaForm" class="row g-3 needs-validation" novalidate>
                        <!-- Información Personal -->
                        <div class="col-12">
                            <h6 class="mb-3">Información Personal</h6>
                        </div>
                        <div class="col-md-4">
                            <label for="nombreCompleto" class="form-label">Nombre Completo*</label>
                            <input type="text" class="form-control" id="nombreCompleto" required>
                            <div class="invalid-feedback">Por favor ingrese el nombre completo</div>
                        </div>
                        <div class="col-md-4">
                            <label for="email" class="form-label">Correo Electrónico*</label>
                            <input type="email" class="form-control" id="email" required>
                            <div class="invalid-feedback">Por favor ingrese un correo válido</div>
                        </div>
                        <div class="col-md-4">
                            <label for="telefono" class="form-label">Teléfono*</label>
                            <input type="tel" class="form-control" id="telefono" required>
                            <div class="invalid-feedback">Por favor ingrese un teléfono válido</div>
                        </div>

                        <!-- Información del Producto -->
                        <div class="col-12 mt-4">
                            <h6 class="mb-3">Información del Producto</h6>
                        </div>
                        <div class="col-md-6">
                            <label for="producto" class="form-label">Producto*</label>
                            <select class="form-select" id="producto" required>
                                <option value="">Seleccione un producto</option>
                                <option>Zapatilla Deportiva</option>
                                <option>Bota Militar</option>
                                <option>Zapato Formal</option>
                                <option>Sandalia</option>
                                <option>Bota de Trekking</option>
                                <option>Zapatilla para Correr</option>
                                <option>Bota de Motocicleta</option>
                                <option>Zapato Casual</option>
                                <option>Zapatilla de Skate</option>
                                <option>Zapato de Vestir</option>
                            </select>
                            <div class="invalid-feedback">Por favor seleccione un producto</div>
                        </div>
                        <div class="col-md-3">
                            <label for="talla" class="form-label">Talla*</label>
                            <select class="form-select" id="talla" required>
                                <option value="">Seleccione una talla</option>
                                <option>36 EU / 3.5 UK</option>
                                <option>37 EU / 4 UK</option>
                                <option>38 EU / 5 UK</option>
                                <option>39 EU / 5.5 UK</option>
                                <option>40 EU / 6 UK</option>
                                <option>41 EU / 7 UK</option>
                                <option>42 EU / 8 UK</option>
                                <option>43 EU / 9 UK</option>
                            </select>
                            <div class="invalid-feedback">Por favor seleccione una talla</div>
                        </div>
                        <div class="col-md-3">
                            <label for="cantidad" class="form-label">Cantidad*</label>
                            <input type="number" class="form-control" id="cantidad" min="1" value="1" required>
                            <div class="invalid-feedback">La cantidad debe ser al menos 1</div>
                        </div>
                        <div class="col-md-6">
                            <label for="precio" class="form-label">Precio Unitario ($)*</label>
                            <input type="number" class="form-control" id="precio" min="0" step="0.01" required>
                            <div class="invalid-feedback">Ingrese un precio válido</div>
                        </div>
                        <div class="col-md-6">
                            <label for="total" class="form-label">Total ($)</label>
                            <input type="text" class="form-control" id="total" readonly>
                        </div>

                        <!-- Dirección de Envío -->
                        <div class="col-12 mt-4">
                            <h6 class="mb-3">Dirección de Envío</h6>
                        </div>
                        <div class="col-12">
                            <label for="direccion" class="form-label">Dirección*</label>
                            <input type="text" class="form-control" id="direccion" required>
                            <div class="invalid-feedback">Por favor ingrese una dirección</div>
                        </div>
                        <div class="col-md-6">
                            <label for="ciudad" class="form-label">Ciudad*</label>
                            <input type="text" class="form-control" id="ciudad" required>
                            <div class="invalid-feedback">Por favor ingrese una ciudad</div>
                        </div>
                        <div class="col-md-6">
                            <label for="codigoPostal" class="form-label">Código Postal*</label>
                            <input type="text" class="form-control" id="codigoPostal" required>
                            <div class="invalid-feedback">Por favor ingrese un código postal</div>
                        </div>

                        <!-- Método de Pago -->
                        <div class="col-12 mt-4">
                            <h6 class="mb-3">Método de Pago*</h6>
                        </div>
                        <div class="col-12">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="metodoPago" id="tarjetaCredito" value="tarjeta" checked required>
                                <label class="form-check-label" for="tarjetaCredito">
                                    Tarjeta de Crédito
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="metodoPago" id="paypal" value="paypal">
                                <label class="form-check-label" for="paypal">
                                    PayPal
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="metodoPago" id="efectivo" value="efectivo">
                                <label class="form-check-label" for="efectivo">
                                    Efectivo
                                </label>
                            </div>
                            <div class="invalid-feedback">Por favor seleccione un método de pago</div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="submit" form="ventaForm" class="btn btn-primary">Procesar Compra</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Editar Perfil Modal -->
    <div class="modal fade" id="editarPerfilModal" tabindex="-1" aria-labelledby="editarPerfilModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="editarPerfilModalLabel">Editar Perfil</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="editarPerfilForm" class="needs-validation" novalidate>
                        <div class="row g-3">
                            <div class="col-12">
                                <label for="editNombre" class="form-label">Nombre Completo*</label>
                                <input type="text" class="form-control" id="editNombre" required>
                                <div class="invalid-feedback">Por favor ingrese su nombre</div>
                            </div>
                            <div class="col-md-6">
                                <label for="editEmail" class="form-label">Correo Electrónico*</label>
                                <input type="email" class="form-control" id="editEmail" required>
                                <div class="invalid-feedback">Por favor ingrese un correo válido</div>
                            </div>
                            <div class="col-md-6">
                                <label for="editTelefono" class="form-label">Teléfono*</label>
                                <input type="tel" class="form-control" id="editTelefono" required>
                                <div class="invalid-feedback">Por favor ingrese un teléfono válido</div>
                            </div>
                            <div class="col-12">
                                <label for="editDireccion" class="form-label">Dirección*</label>
                                <input type="text" class="form-control" id="editDireccion" required>
                                <div class="invalid-feedback">Por favor ingrese una dirección</div>
                            </div>
                            <div class="col-12">
                                <label for="editCargo" class="form-label">Cargo*</label>
                                <input type="text" class="form-control" id="editCargo" required>
                                <div class="invalid-feedback">Por favor ingrese su cargo</div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-primary" id="guardarCambiosPerfil">Guardar Cambios</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Editar Venta Modal -->
    <div class="modal fade" id="editarVentaModal" tabindex="-1" aria-labelledby="editarVentaModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="editarVentaModalLabel">Editar Venta</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="editarVentaForm" class="needs-validation" novalidate>
                        <div class="row g-3">
                            <div class="col-12">
                                <label for="editCliente" class="form-label">Cliente*</label>
                                <input type="text" class="form-control" id="editCliente" required>
                                <div class="invalid-feedback">Por favor ingrese el cliente</div>
                            </div>
                            <div class="col-md-6">
                                <label for="editProducto" class="form-label">Producto*</label>
                                <input type="text" class="form-control" id="editProducto" required>
                                <div class="invalid-feedback">Por favor ingrese el producto</div>
                            </div>
                            <div class="col-md-3">
                                <label for="editCantidad" class="form-label">Cantidad*</label>
                                <input type="number" class="form-control" id="editCantidad" min="1" required>
                                <div class="invalid-feedback">La cantidad debe ser al menos 1</div>
                            </div>
                            <div class="col-md-3">
                                <label for="editTotal" class="form-label">Total ($)*</label>
                                <input type="text" class="form-control" id="editTotal" required>
                                <div class="invalid-feedback">Por favor ingrese el total</div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-primary" id="guardarCambiosVenta">Guardar Cambios</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Editar Cliente Modal -->
    <div class="modal fade" id="editarClienteModal" tabindex="-1" aria-labelledby="editarClienteModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="editarClienteModalLabel">Editar Cliente</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="editarClienteForm" class="needs-validation" novalidate>
                        <div class="row g-3">
                            <div class="col-12">
                                <label for="editNombreCliente" class="form-label">Nombre*</label>
                                <input type="text" class="form-control" id="editNombreCliente" required>
                                <div class="invalid-feedback">Por favor ingrese el nombre</div>
                            </div>
                            <div class="col-md-6">
                                <label for="editEmailCliente" class="form-label">Email*</label>
                                <input type="email" class="form-control" id="editEmailCliente" required>
                                <div class="invalid-feedback">Por favor ingrese un email válido</div>
                            </div>
                            <div class="col-md-6">
                                <label for="editTelefonoCliente" class="form-label">Teléfono*</label>
                                <input type="tel" class="form-control" id="editTelefonoCliente" required>
                                <div class="invalid-feedback">Por favor ingrese un teléfono válido</div>
                            </div>
                            <div class="col-12">
                                <label for="editUltimaCompra" class="form-label">Última Compra*</label>
                                <input type="date" class="form-control" id="editUltimaCompra" required>
                                <div class="invalid-feedback">Por favor ingrese la fecha de última compra</div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-primary" id="guardarCambiosCliente">Guardar Cambios</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Menú Lateral -->
    <div class="container-fluid">
        <div class="row">
            <nav id="sidebar" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                <div class="position-sticky pt-3">
                    <div class="text-center mb-4">
                        <img src="https://via.placeholder.com/150" alt="Logo Golden Feets" class="img-fluid mb-2" style="max-width: 80%;">
                        <h5 class="text-primary">Golden Feets</h5>
                    </div>
                    <ul class="nav flex-column">
                        <li class="nav-item">
                            <a class="nav-link active" href="#inicio" data-section="inicio">
                                <i class="bi bi-house-door me-2"></i>
                                Inicio
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#estadisticas" data-section="estadisticas">
                                <i class="bi bi-graph-up me-2"></i>
                                Estadísticas
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#ventas" data-section="ventas">
                                <i class="bi bi-cart me-2"></i>
                                Ventas
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#clientes" data-section="clientes">
                                <i class="bi bi-people me-2"></i>
                                Clientes
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#inventario" data-section="inventario">
                                <i class="bi bi-box-seam me-2"></i>
                                Inventario
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#reportes" data-section="reportes">
                                <i class="bi bi-file-earmark-text me-2"></i>
                                Reportes
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#configuracion" data-section="configuracion">
                                <i class="bi bi-gear me-2"></i>
                                Configuración
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>

            <!-- Contenido Principal -->
            <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <!-- Encabezado -->
                <header class="bg-white shadow-sm sticky-top" style="z-index: 10;">
                    <div class="container-fluid py-3">
                        <div class="d-flex flex-wrap justify-content-between align-items-center">
                            <div class="d-flex align-items-center gap-3">
                                <button class="btn btn-outline-primary d-md-none" id="sidebarToggle">
                                    <i class="bi bi-list"></i>
                                </button>
                                <h1 class="h4 mb-0">Panel de Ventas</h1>
                                <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#nuevaVentaModal">
                                    <i class="bi bi-plus-circle me-2"></i>Nueva Venta
                                </button>
                            </div>
                            <div class="d-flex align-items-center gap-3">
                                <div class="search-container">
                                    <i class="bi bi-search"></i>
                                    <input type="text" class="form-control search-input" placeholder="Buscar...">
                                </div>
                                <div class="dropdown">
                                    <button class="btn btn-light dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i class="bi bi-bell"></i>
                                        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                            3
                                        </span>
                                    </button>
                                    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                                        <li><h6 class="dropdown-header">Notificaciones</h6></li>
                                        <li><a class="dropdown-item" href="#">Nueva venta realizada</a></li>
                                        <li><a class="dropdown-item" href="#">Cliente agregado</a></li>
                                        <li><a class="dropdown-item" href="#">Inventario actualizado</a></li>
                                        <li><hr class="dropdown-divider"></li>
                                        <li><a class="dropdown-item" href="#">Ver todas</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <!-- Contenido -->
                <div class="container-fluid py-4">
                    <!-- Inicio -->
                    <section id="inicio" class="row g-4">
                        <!-- Perfil -->
                        <div class="col-12 col-lg-4">
                            <div class="profile-card p-4 shadow-sm">
                                <div class="text-center mb-4">
                                    <div class="avatar mx-auto mb-3">JM</div>
                                    <h4 class="mb-1" id="nombrePerfil">Jose Martinez</h4>
                                    <p class="mb-0" id="cargoPerfil">Vendedor</p>
                                </div>
                                
                                <div class="profile-stats p-3 mb-3">
                                    <div class="row">
                                        <div class="col-4 text-center">
                                            <h6 class="mb-1">Ventas</h6>
                                            <span class="fw-bold" id="ventasTotales">2.345</span>
                                        </div>
                                        <div class="col-4 text-center">
                                            <h6 class="mb-1">Ingresos</h6>
                                            <span class="fw-bold" id="ingresosTotales">$45K</span>
                                        </div>
                                        <div class="col-4 text-center">
                                            <h6 class="mb-1">Clientes</h6>
                                            <span class="fw-bold" id="clientesTotales">1.420</span>
                                        </div>
                                    </div>
                                </div>

                                <div class="mb-3">
                                    <h6>Información de Contacto</h6>
                                    <p class="mb-1" id="emailPerfil"><i class="bi bi-envelope me-2"></i>JoseMartinez12@Gmail.es</p>
                                    <p class="mb-1" id="telefonoPerfil"><i class="bi bi-telephone me-2"></i>305 959 65523</p>
                                    <p class="mb-0" id="direccionPerfil"><i class="bi bi-geo-alt me-2"></i>CR 45 #34F sur, Bogotá</p>
                                </div>

                                <div class="d-grid gap-2">
                                    <button class="btn btn-light" data-bs-toggle="modal" data-bs-target="#editarPerfilModal"><i class="bi bi-pencil me-2"></i>Editar Perfil</button>
                                    <button class="btn btn-outline-light" id="cerrarSesion"><i class="bi bi-box-arrow-right me-2"></i>Cerrar Sesión</button>
                                </div>
                            </div>
                        </div>

                        <!-- Estadísticas -->
                        <div class="col-12 col-lg-8">
                            <div class="row g-4">
                                <!-- Ingresos Totales -->
                                <div class="col-12 col-md-6 col-lg-4">
                                    <div class="stat-card bg-white p-4 shadow-sm">
                                        <div class="d-flex justify-content-between align-items-center mb-3">
                                            <div class="icon-container">
                                                <i class="bi bi-currency-dollar text-primary fs-4"></i>
                                            </div>
                                            <span class="trend-up"><i class="bi bi-arrow-up"></i> 20.1%</span>
                                        </div>
                                        <h6 class="text-muted mb-1">Ingresos Totales</h6>
                                        <h3 class="mb-0" id="ingresosCard">$45.231,89</h3>
                                    </div>
                                </div>

                                <!-- Ventas -->
                                <div class="col-12 col-md-6 col-lg-4">
                                    <div class="stat-card bg-white p-4 shadow-sm">
                                        <div class="d-flex justify-content-between align-items-center mb-3">
                                            <div class="icon-container">
                                                <i class="bi bi-graph-up text-primary fs-4"></i>
                                            </div>
                                            <span class="trend-up"><i class="bi bi-arrow-up"></i> 8.2%</span>
                                        </div>
                                        <h6 class="text-muted mb-1">Ventas</h6>
                                        <h3 class="mb-0" id="ventasCard">2.345</h3>
                                    </div>
                                </div>

                                <!-- Clientes -->
                                <div class="col-12 col-md-6 col-lg-4">
                                    <div class="stat-card bg-white p-4 shadow-sm">
                                        <div class="d-flex justify-content-between align-items-center mb-3">
                                            <div class="icon-container">
                                                <i class="bi bi-people text-primary fs-4"></i>
                                            </div>
                                            <span class="trend-up"><i class="bi bi-arrow-up"></i> 5.7%</span>
                                        </div>
                                        <h6 class="text-muted mb-1">Clientes</h6>
                                        <h3 class="mb-0" id="clientesCard">1.420</h3>
                                    </div>
                                </div>
                            </div> 

                            <!-- Gráficos y Ventas Recientes -->
                            <div class="row g-4 mt-2">
                                <!-- Gráfico de Ventas -->
                                <div class="col-12">
                                    <div class="bg-white p-4 shadow-sm rounded">
                                        <div class="d-flex justify-content-between align-items-center mb-4">
                                            <h5 class="mb-0">Resumen de Ventas</h5>
                                            <div class="d-flex align-items-center gap-2">
                                                <i class="bi bi-calendar3"></i>
                                                <select class="form-select form-select-sm" id="periodoVentas">
                                                    <option value="7">Últimos 7 días</option>
                                                    <option value="30" selected>Últimos 30 días</option>
                                                    <option value="90">Últimos 3 meses</option>
                                                </select>
                                            </div>
                                        </div>
                                        <canvas id="salesChart" width="400" height="200"></canvas>
                                    </div>
                                </div>
                            </div>

                            <!-- Lista de Ventas Recientes -->
                            <div class="row g-4 mt-2">
                                <div class="col-12">
                                    <div class="bg-white p-4 shadow-sm rounded">
                                        <div class="d-flex justify-content-between align-items-center mb-4">
                                            <h5 class="mb-0">Ventas Recientes</h5>
                                            <a href="#ventas" class="btn btn-sm btn-outline-primary" data-section="ventas">Ver todas</a>
                                        </div>
                                        <div class="table-responsive">
                                            <table class="table table-striped table-hover">
                                                <thead>
                                                    <tr>
                                                        <th>Cliente</th>
                                                        <th>Producto</th>
                                                        <th>Cantidad</th>
                                                        <th>Total</th>
                                                        <th>Fecha</th>
                                                        <th>Acciones</th>
                                                    </tr>
                                                </thead>
                                                <tbody id="ventasRecientes">
                                                    <!-- Las ventas se cargarán dinámicamente -->
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <!-- Estadísticas -->
                    <section id="estadisticas" class="row g-4 d-none">
                        <div class="col-12">
                            <div class="d-flex justify-content-between align-items-center mb-4">
                                <h2>Estadísticas</h2>
                                <div class="d-flex align-items-center gap-2">
                                    <i class="bi bi-calendar3"></i>
                                    <select class="form-select form-select-sm" id="periodoEstadisticas">
                                        <option value="7">Últimos 7 días</option>
                                        <option value="30" selected>Últimos 30 días</option>
                                        <option value="90">Últimos 3 meses</option>
                                        <option value="365">Último año</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row g-4">
                                <!-- Gráfico de Ventas -->
                                <div class="col-12 col-lg-6">
                                    <div class="bg-white p-4 shadow-sm rounded">
                                        <h5 class="mb-4">Gráfico de Ventas</h5>
                                        <canvas id="salesChartFull" width="400" height="250"></canvas>
                                    </div>
                                </div>
                                <!-- Gráfico de Ingresos -->
                                <div class="col-12 col-lg-6">
                                    <div class="bg-white p-4 shadow-sm rounded">
                                        <h5 class="mb-4">Gráfico de Ingresos</h5>
                                        <canvas id="incomeChart" width="400" height="250"></canvas>
                                    </div>
                                </div>
                                <!-- Métricas Clave -->
                                <div class="col-12">
                                    <div class="bg-white p-4 shadow-sm rounded">
                                        <h5 class="mb-4">Métricas Clave</h5>
                                        <div class="row">
                                            <div class="col-6 col-md-3 mb-4">
                                                <div class="text-center">
                                                    <h6 class="text-muted">Ventas Totales</h6>
                                                    <h3 class="text-primary">2,345</h3>
                                                </div>
                                            </div>
                                            <div class="col-6 col-md-3 mb-4">
                                                <div class="text-center">
                                                    <h6 class="text-muted">Ingresos Totales</h6>
                                                    <h3 class="text-success">$45,231</h3>
                                                </div>
                                            </div>
                                            <div class="col-6 col-md-3 mb-4">
                                                <div class="text-center">
                                                    <h6 class="text-muted">Clientes Nuevos</h6>
                                                    <h3 class="text-info">142</h3>
                                                </div>
                                            </div>
                                            <div class="col-6 col-md-3 mb-4">
                                                <div class="text-center">
                                                    <h6 class="text-muted">Productos Vendidos</h6>
                                                    <h3 class="text-warning">3,456</h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <!-- Ventas -->
                    <section id="ventas" class="row g-4 d-none">
                        <div class="col-12">
                            <div class="d-flex justify-content-between align-items-center mb-4">
                                <h2>Ventas</h2>
                                <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#nuevaVentaModal">
                                    <i class="bi bi-plus-circle me-2"></i>Nueva Venta
                                </button>
                            </div>
                            <div class="bg-white p-4 shadow-sm rounded">
                                <div class="d-flex justify-content-between align-items-center mb-4">
                                    <div class="d-flex align-items-center gap-2">
                                        <div class="input-group" style="width: 250px;">
                                            <input type="text" class="form-control" placeholder="Buscar ventas..." id="buscarVentas">
                                            <button class="btn btn-outline-secondary" type="button">
                                                <i class="bi bi-search"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="d-flex align-items-center gap-2">
                                        <label for="filtroVentas" class="mb-0">Filtrar por:</label>
                                        <select class="form-select form-select-sm" id="filtroVentas">
                                            <option value="todas">Todas</option>
                                            <option value="semana">Esta semana</option>
                                            <option value="mes">Este mes</option>
                                            <option value="año">Este año</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="table-responsive">
                                    <table class="table table-striped table-hover">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Cliente</th>
                                                <th>Producto</th>
                                                <th>Cantidad</th>
                                                <th>Total</th>
                                                <th>Fecha</th>
                                                <th>Estado</th>
                                                <th>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody id="listaVentas">
                                            <!-- Las ventas se cargarán dinámicamente -->
                                        </tbody>
                                    </table>
                                </div>
                                <nav aria-label="Page navigation" class="mt-4">
                                    <ul class="pagination justify-content-center">
                                        <li class="page-item disabled">
                                            <a class="page-link" href="#" tabindex="-1" aria-disabled="true">Anterior</a>
                                        </li>
                                        <li class="page-item active"><a class="page-link" href="#">1</a></li>
                                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                                        <li class="page-item">
                                            <a class="page-link" href="#">Siguiente</a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </section>

                    <!-- Clientes -->
                    <section id="clientes" class="row g-4 d-none">
                        <div class="col-12">
                            <div class="d-flex justify-content-between align-items-center mb-4">
                                <h2>Clientes</h2>
                                <button class="btn btn-primary" id="nuevoClienteBtn">
                                    <i class="bi bi-plus-circle me-2"></i>Nuevo Cliente
                                </button>
                            </div>
                            <div class="bg-white p-4 shadow-sm rounded">
                                <div class="d-flex justify-content-between align-items-center mb-4">
                                    <div class="d-flex align-items-center gap-2">
                                        <div class="input-group" style="width: 250px;">
                                            <input type="text" class="form-control" placeholder="Buscar clientes..." id="buscarClientes">
                                            <button class="btn btn-outline-secondary" type="button">
                                                <i class="bi bi-search"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="d-flex align-items-center gap-2">
                                        <label for="filtroClientes" class="mb-0">Ordenar por:</label>
                                        <select class="form-select form-select-sm" id="filtroClientes">
                                            <option value="recientes">Más recientes</option>
                                            <option value="antiguos">Más antiguos</option>
                                            <option value="nombre">Nombre (A-Z)</option>
                                            <option value="ventas">Mayor comprador</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="table-responsive">
                                    <table class="table table-striped table-hover">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Nombre</th>
                                                <th>Email</th>
                                                <th>Teléfono</th>
                                                <th>Compras</th>
                                                <th>Total Gastado</th>
                                                <th>Última Compra</th>
                                                <th>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody id="listaClientes">
                                            <!-- Los clientes se cargarán dinámicamente -->
                                        </tbody>
                                    </table>
                                </div>
                                <nav aria-label="Page navigation" class="mt-4">
                                    <ul class="pagination justify-content-center">
                                        <li class="page-item disabled">
                                            <a class="page-link" href="#" tabindex="-1" aria-disabled="true">Anterior</a>
                                        </li>
                                        <li class="page-item active"><a class="page-link" href="#">1</a></li>
                                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                                        <li class="page-item">
                                            <a class="page-link" href="#">Siguiente</a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </section>

                    <!-- Inventario -->
                    <section id="inventario" class="row g-4 d-none">
                        <div class="col-12">
                            <h2>Inventario</h2>
                            <div class="bg-white p-4 shadow-sm rounded">
                                <h5 class="mb-4">Lista de Productos</h5>
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Producto</th>
                                            <th>Categoría</th>
                                            <th>Stock</th>
                                            <th>Precio</th>
                                            <th>Estado</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>Zapatilla Deportiva</td>
                                            <td>Deportes</td>
                                            <td>45</td>
                                            <td>$75.00</td>
                                            <td><span class="badge bg-success">Disponible</span></td>
                                            <td>
                                                <button class="btn btn-sm btn-primary">Editar</button>
                                                <button class="btn btn-sm btn-danger">Eliminar</button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>Bota Militar</td>
                                            <td>Casual</td>
                                            <td>12</td>
                                            <td>$120.00</td>
                                            <td><span class="badge bg-warning text-dark">Bajo Stock</span></td>
                                            <td>
                                                <button class="btn btn-sm btn-primary">Editar</button>
                                                <button class="btn btn-sm btn-danger">Eliminar</button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>Zapato Formal</td>
                                            <td>Formal</td>
                                            <td>0</td>
                                            <td>$90.00</td>
                                            <td><span class="badge bg-danger">Agotado</span></td>
                                            <td>
                                                <button class="btn btn-sm btn-primary">Editar</button>
                                                <button class="btn btn-sm btn-danger">Eliminar</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>

                    <!-- Reportes -->
                    <section id="reportes" class="row g-4 d-none">
                        <div class="col-12">
                            <h2>Reportes</h2>
                            <div class="bg-white p-4 shadow-sm rounded">
                                <h5 class="mb-4">Generar Reportes</h5>
                                <div class="row g-4">
                                    <div class="col-md-6">
                                        <div class="card h-100">
                                            <div class="card-body">
                                                <h5 class="card-title">Reporte de Ventas</h5>
                                                <p class="card-text">Genera un reporte detallado de todas las ventas en un período específico.</p>
                                                <div class="mb-3">
                                                    <label for="fechaInicioVentas" class="form-label">Fecha Inicio</label>
                                                    <input type="date" class="form-control" id="fechaInicioVentas">
                                                </div>
                                                <div class="mb-3">
                                                    <label for="fechaFinVentas" class="form-label">Fecha Fin</label>
                                                    <input type="date" class="form-control" id="fechaFinVentas">
                                                </div>
                                                <button class="btn btn-primary">Generar Reporte</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="card h-100">
                                            <div class="card-body">
                                                <h5 class="card-title">Reporte de Clientes</h5>
                                                <p class="card-text">Genera un reporte de los clientes y sus compras.</p>
                                                <div class="mb-3">
                                                    <label for="tipoReporteClientes" class="form-label">Tipo de Reporte</label>
                                                    <select class="form-select" id="tipoReporteClientes">
                                                        <option>Clientes nuevos</option>
                                                        <option>Clientes frecuentes</option>
                                                        <option>Clientes inactivos</option>
                                                        <option>Todos los clientes</option>
                                                    </select>
                                                </div>
                                                <button class="btn btn-primary">Generar Reporte</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <!-- Configuración -->
                    <section id="configuracion" class="row g-4 d-none">
                        <div class="col-12">
                            <h2>Configuración</h2>
                            <div class="bg-white p-4 shadow-sm rounded">
                                <h5 class="mb-4">Ajustes del Sistema</h5>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="card mb-4">
                                            <div class="card-header">
                                                <h6 class="mb-0">Configuración General</h6>
                                            </div>
                                            <div class="card-body">
                                                <div class="mb-3">
                                                    <label for="nombreTienda" class="form-label">Nombre de la Tienda</label>
                                                    <input type="text" class="form-control" id="nombreTienda" value="Golden Feets">
                                                </div>
                                                <div class="mb-3">
                                                    <label for="moneda" class="form-label">Moneda</label>
                                                    <select class="form-select" id="moneda">
                                                        <option>Dólar ($)</option>
                                                        <option>Euro (€)</option>
                                                        <option selected>Peso Colombiano ($)</option>
                                                    </select>
                                                </div>
                                                <button class="btn btn-primary">Guardar Cambios</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="card mb-4">
                                            <div class="card-header">
                                                <h6 class="mb-0">Notificaciones</h6>
                                            </div>
                                            <div class="card-body">
                                                <div class="form-check form-switch mb-3">
                                                    <input class="form-check-input" type="checkbox" id="notificacionesEmail" checked>
                                                    <label class="form-check-label" for="notificacionesEmail">Notificaciones por Email</label>
                                                </div>
                                                <div class="form-check form-switch mb-3">
                                                    <input class="form-check-input" type="checkbox" id="notificacionesSistema" checked>
                                                    <label class="form-check-label" for="notificacionesSistema">Notificaciones del Sistema</label>
                                                </div>
                                                <div class="form-check form-switch mb-3">
                                                    <input class="form-check-input" type="checkbox" id="recordatoriosStock">
                                                    <label class="form-check-label" for="recordatoriosStock">Recordatorios de Stock Bajo</label>
                                                </div>
                                                <button class="btn btn-primary">Guardar Cambios</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script>
       // Clase para manejar el almacenamiento local
class LocalStorageManager {
    constructor() {
        this.ventasKey = 'goldenFeetsVentas';
        this.clientesKey = 'goldenFeetsClientes';
        this.perfilKey = 'goldenFeetsPerfil';
        this.configKey = 'goldenFeetsConfig';
    }

    // Guardar datos
    guardarDatos(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    // Obtener datos
    obtenerDatos(key) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    }

    // Inicializar datos si no existen
    inicializarDatosIniciales() {
        if (!this.obtenerDatos(this.ventasKey)) {
            const ventasIniciales = [
                { id: 1, cliente: 'Juan Pérez', producto: 'Zapatilla Deportiva', cantidad: 2, total: 150, fecha: '2023-10-15', estado: 'completado' },
                { id: 2, cliente: 'María Gómez', producto: 'Zapato Formal', cantidad: 1, total: 120, fecha: '2023-10-14', estado: 'completado' },
                { id: 3, cliente: 'Carlos Rodríguez', producto: 'Bota de Trekking', cantidad: 1, total: 200, fecha: '2023-10-13', estado: 'completado' },
                { id: 4, cliente: 'Ana López', producto: 'Sandalia', cantidad: 3, total: 90, fecha: '2023-10-12', estado: 'completado' },
                { id: 5, cliente: 'Pedro Sánchez', producto: 'Bota Militar', cantidad: 1, total: 180, fecha: '2023-10-11', estado: 'pendiente' }
            ];
            this.guardarDatos(this.ventasKey, ventasIniciales);
        }

        if (!this.obtenerDatos(this.clientesKey)) {
            const clientesIniciales = [
                { id: 1, nombre: 'Juan Pérez', email: 'juan@example.com', telefono: '123-456-7890', compras: 5, totalGastado: 750, ultimaCompra: '2023-10-15' },
                { id: 2, nombre: 'María Gómez', email: 'maria@example.com', telefono: '987-654-3210', compras: 3, totalGastado: 360, ultimaCompra: '2023-10-14' },
                { id: 3, nombre: 'Carlos Rodríguez', email: 'carlos@example.com', telefono: '555-555-5555', compras: 2, totalGastado: 380, ultimaCompra: '2023-10-13' },
                { id: 4, nombre: 'Ana López', email: 'ana@example.com', telefono: '111-222-3333', compras: 1, totalGastado: 90, ultimaCompra: '2023-10-12' },
                { id: 5, nombre: 'Pedro Sánchez', email: 'pedro@example.com', telefono: '444-444-4444', compras: 1, totalGastado: 180, ultimaCompra: '2023-10-11' }
            ];
            this.guardarDatos(this.clientesKey, clientesIniciales);
        }

        if (!this.obtenerDatos(this.perfilKey)) {
            const perfilInicial = {
                nombre: 'Jose Martinez',
                email: 'JoseMartinez12@Gmail.es',
                telefono: '305 959 65523',
                direccion: 'CR 45 #34F sur, Bogotá',
                cargo: 'Vendedor',
                avatar: 'JM'
            };
            this.guardarDatos(this.perfilKey, perfilInicial);
        }

        if (!this.obtenerDatos(this.configKey)) {
            const configInicial = {
                moneda: 'Peso Colombiano ($)',
                notificacionesEmail: true,
                notificacionesSistema: true,
                recordatoriosStock: false
            };
            this.guardarDatos(this.configKey, configInicial);
        }
    }
}

// Clase para manejar las notificaciones
class NotificacionManager {
    constructor() {
        this.toastContainer = document.querySelector('.toast-container');
    }

    mostrarNotificacion(mensaje, tipo = 'success', duracion = 5000) {
        const toast = document.createElement('div');
        toast.className = `toast align-items-center text-white bg-${tipo} border-0 fade-in`;
        toast.setAttribute('role', 'alert');
        toast.setAttribute('aria-live', 'assertive');
        toast.setAttribute('aria-atomic', 'true');
        
        toast.innerHTML = `
            <div class="d-flex">
                <div class="toast-body d-flex align-items-center">
                    <i class="bi ${this.getIconoTipo(tipo)} me-2"></i>
                    ${mensaje}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        `;
        
        this.toastContainer.appendChild(toast);
        const bsToast = new bootstrap.Toast(toast, {
            delay: duracion
        });
        bsToast.show();
        
        // Eliminar el toast después de que se cierre
        toast.addEventListener('hidden.bs.toast', () => {
            toast.remove();
        });
    }

    getIconoTipo(tipo) {
        const iconos = {
            'success': 'bi-check-circle-fill',
            'danger': 'bi-exclamation-triangle-fill',
            'warning': 'bi-exclamation-circle-fill',
            'info': 'bi-info-circle-fill'
        };
        return iconos[tipo] || 'bi-info-circle-fill';
    }
}

// Clase principal de la aplicación
class GoldenFeetsApp {
    constructor() {
        this.storage = new LocalStorageManager();
        this.notificacion = new NotificacionManager();
        this.ventas = [];
        this.clientes = [];
        this.perfil = {};
        this.config = {};
        this.graficos = {};
        
        this.inicializar();
    }
    
    inicializar() {
        // Inicializar datos
        this.storage.inicializarDatosIniciales();
        this.cargarDatos();
        
        // Configurar eventos
        this.configurarEventos();
        
        // Mostrar sección inicial
        this.mostrarSeccion('inicio');
        
        // Inicializar gráficos
        this.inicializarGraficos();
        
        // Cargar datos en las tablas
        this.cargarVentasRecientes();
        this.cargarListaVentas();
        this.cargarListaClientes();
        
        // Configurar animaciones de carga
        this.configurarAnimaciones();
    }
    
    configurarAnimaciones() {
        // Animación para elementos que aparecen al cargar
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate__animated', 'animate__fadeInUp');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        document.querySelectorAll('.stat-card, .profile-card, table').forEach(el => {
            observer.observe(el);
        });
    }
    
    cargarDatos() {
        this.ventas = this.storage.obtenerDatos(this.storage.ventasKey) || [];
        this.clientes = this.storage.obtenerDatos(this.storage.clientesKey) || [];
        this.perfil = this.storage.obtenerDatos(this.storage.perfilKey) || {};
        this.config = this.storage.obtenerDatos(this.storage.configKey) || {};
        
        // Actualizar UI con los datos cargados
        this.actualizarPerfilUI();
        this.actualizarConfigUI();
    }
    
    actualizarPerfilUI() {
        if (this.perfil) {
            document.getElementById('nombrePerfil').textContent = this.perfil.nombre || '';
            document.getElementById('cargoPerfil').textContent = this.perfil.cargo || '';
            document.getElementById('emailPerfil').innerHTML = `<i class="bi bi-envelope me-2"></i>${this.perfil.email || ''}`;
            document.getElementById('telefonoPerfil').innerHTML = `<i class="bi bi-telephone me-2"></i>${this.perfil.telefono || ''}`;
            document.getElementById('direccionPerfil').innerHTML = `<i class="bi bi-geo-alt me-2"></i>${this.perfil.direccion || ''}`;
            
            // Actualizar avatar
            const avatar = document.querySelector('.avatar');
            if (this.perfil.avatar) {
                avatar.textContent = this.perfil.avatar;
            }
            
            // Actualizar también los campos del modal de edición
            document.getElementById('editNombre').value = this.perfil.nombre || '';
            document.getElementById('editEmail').value = this.perfil.email || '';
            document.getElementById('editTelefono').value = this.perfil.telefono || '';
            document.getElementById('editDireccion').value = this.perfil.direccion || '';
            document.getElementById('editCargo').value = this.perfil.cargo || '';
        }
    }
    
    actualizarConfigUI() {
        if (this.config) {
            // Configuración general
            document.getElementById('nombreTienda').value = 'Golden Feets';
            document.getElementById('moneda').value = this.config.moneda || 'Peso Colombiano ($)';
            
            // Notificaciones
            document.getElementById('notificacionesEmail').checked = this.config.notificacionesEmail || false;
            document.getElementById('notificacionesSistema').checked = this.config.notificacionesSistema || false;
            document.getElementById('recordatoriosStock').checked = this.config.recordatoriosStock || false;
        }
    }
    
    configurarEventos() {
        // Eventos del menú lateral
        document.querySelectorAll('[data-section]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const seccion = link.getAttribute('data-section');
                this.mostrarSeccion(seccion);
                
                // Animación de icono
                const icon = link.querySelector('i');
                icon.classList.add('animate__animated', 'animate__rubberBand');
                setTimeout(() => {
                    icon.classList.remove('animate__animated', 'animate__rubberBand');
                }, 1000);
            });
        });
        
        // Toggle del sidebar en móviles
        document.getElementById('sidebarToggle').addEventListener('click', () => {
            const sidebar = document.getElementById('sidebar');
            sidebar.classList.toggle('d-none');
            sidebar.classList.add('animate__animated', 'animate__fadeInLeft');
        });
        
        // Evento para cerrar sesión
        document.getElementById('cerrarSesion').addEventListener('click', () => {
            if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
                this.notificacion.mostrarNotificacion('Sesión cerrada correctamente');
                // Aquí podrías redirigir a la página de login
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 1500);
            }
        });
        
        // Evento para guardar cambios de perfil
        document.getElementById('guardarCambiosPerfil').addEventListener('click', () => {
            if (this.validarFormulario('editarPerfilForm')) {
                this.perfil = {
                    nombre: document.getElementById('editNombre').value.trim(),
                    email: document.getElementById('editEmail').value.trim(),
                    telefono: document.getElementById('editTelefono').value.trim(),
                    direccion: document.getElementById('editDireccion').value.trim(),
                    cargo: document.getElementById('editCargo').value.trim(),
                    avatar: document.getElementById('editNombre').value.trim().split(' ').map(n => n[0]).join('').toUpperCase()
                };
                
                this.storage.guardarDatos(this.storage.perfilKey, this.perfil);
                this.actualizarPerfilUI();
                
                const modal = bootstrap.Modal.getInstance(document.getElementById('editarPerfilModal'));
                modal.hide();
                
                this.notificacion.mostrarNotificacion('Perfil actualizado correctamente');
            }
        });
        
        // Evento para procesar nueva venta
        document.getElementById('ventaForm').addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (this.validarFormulario('ventaForm')) {
                const nuevaVenta = {
                    id: this.ventas.length > 0 ? Math.max(...this.ventas.map(v => v.id)) + 1 : 1,
                    cliente: document.getElementById('nombreCompleto').value.trim(),
                    producto: document.getElementById('producto').value,
                    cantidad: parseInt(document.getElementById('cantidad').value),
                    total: parseFloat(document.getElementById('total').value.replace('$', '')),
                    fecha: new Date().toISOString().split('T')[0],
                    estado: 'completado',
                    email: document.getElementById('email').value.trim(),
                    telefono: document.getElementById('telefono').value.trim(),
                    direccion: document.getElementById('direccion').value.trim(),
                    ciudad: document.getElementById('ciudad').value.trim(),
                    codigoPostal: document.getElementById('codigoPostal').value.trim(),
                    metodoPago: document.querySelector('input[name="metodoPago"]:checked').value
                };
                
                this.ventas.unshift(nuevaVenta);
                this.storage.guardarDatos(this.storage.ventasKey, this.ventas);
                
                // Verificar si el cliente ya existe
                const clienteExistente = this.clientes.find(c => c.email === nuevaVenta.email);
                
                if (clienteExistente) {
                    // Actualizar cliente existente
                    clienteExistente.compras += 1;
                    clienteExistente.totalGastado += nuevaVenta.total;
                    clienteExistente.ultimaCompra = nuevaVenta.fecha;
                } else {
                    // Crear nuevo cliente
                    const nuevoCliente = {
                        id: this.clientes.length > 0 ? Math.max(...this.clientes.map(c => c.id)) + 1 : 1,
                        nombre: nuevaVenta.cliente,
                        email: nuevaVenta.email,
                        telefono: nuevaVenta.telefono,
                        compras: 1,
                        totalGastado: nuevaVenta.total,
                        ultimaCompra: nuevaVenta.fecha
                    };
                    this.clientes.push(nuevoCliente);
                }
                
                this.storage.guardarDatos(this.storage.clientesKey, this.clientes);
                
                // Cerrar modal y resetear formulario
                const modal = bootstrap.Modal.getInstance(document.getElementById('nuevaVentaModal'));
                modal.hide();
                document.getElementById('ventaForm').reset();
                
                // Actualizar UI
                this.cargarVentasRecientes();
                this.cargarListaVentas();
                this.cargarListaClientes();
                this.actualizarGraficos();
                
                this.notificacion.mostrarNotificacion('Venta registrada correctamente');
                
                // Mostrar animación de confirmación
                const confirmacion = document.createElement('div');
                confirmacion.className = 'position-fixed top-50 start-50 translate-middle';
                confirmacion.innerHTML = `
                    <div class="animate__animated animate__zoomIn animate__faster bg-success text-white p-3 rounded-circle shadow-lg">
                        <i class="bi bi-check-lg fs-1"></i>
                    </div>
                `;
                document.body.appendChild(confirmacion);
                setTimeout(() => {
                    confirmacion.remove();
                }, 1000);
            }
        });
        
        // Evento para calcular total al cambiar cantidad o precio
        document.getElementById('cantidad').addEventListener('change', this.calcularTotalVenta.bind(this));
        document.getElementById('precio').addEventListener('change', this.calcularTotalVenta.bind(this));
        
        // Evento para guardar cambios en venta editada
        document.getElementById('guardarCambiosVenta').addEventListener('click', () => {
            if (this.validarFormulario('editarVentaForm')) {
                const ventaId = parseInt(document.getElementById('editarVentaForm').dataset.ventaId);
                const ventaIndex = this.ventas.findIndex(v => v.id === ventaId);
                
                if (ventaIndex !== -1) {
                    this.ventas[ventaIndex] = {
                        ...this.ventas[ventaIndex],
                        cliente: document.getElementById('editCliente').value.trim(),
                        producto: document.getElementById('editProducto').value.trim(),
                        cantidad: parseInt(document.getElementById('editCantidad').value),
                        total: parseFloat(document.getElementById('editTotal').value.replace('$', ''))
                    };
                    
                    this.storage.guardarDatos(this.storage.ventasKey, this.ventas);
                    
                    const modal = bootstrap.Modal.getInstance(document.getElementById('editarVentaModal'));
                    modal.hide();
                    
                    this.cargarVentasRecientes();
                    this.cargarListaVentas();
                    this.actualizarGraficos();
                    
                    this.notificacion.mostrarNotificacion('Venta actualizada correctamente');
                }
            }
        });
        
        // Evento para guardar cambios en cliente editado
        document.getElementById('guardarCambiosCliente').addEventListener('click', () => {
            if (this.validarFormulario('editarClienteForm')) {
                const clienteId = parseInt(document.getElementById('editarClienteForm').dataset.clienteId);
                const clienteIndex = this.clientes.findIndex(c => c.id === clienteId);
                
                if (clienteIndex !== -1) {
                    this.clientes[clienteIndex] = {
                        ...this.clientes[clienteIndex],
                        nombre: document.getElementById('editNombreCliente').value.trim(),
                        email: document.getElementById('editEmailCliente').value.trim(),
                        telefono: document.getElementById('editTelefonoCliente').value.trim(),
                        ultimaCompra: document.getElementById('editUltimaCompra').value
                    };
                    
                    this.storage.guardarDatos(this.storage.clientesKey, this.clientes);
                    
                    const modal = bootstrap.Modal.getInstance(document.getElementById('editarClienteModal'));
                    modal.hide();
                    
                    this.cargarListaClientes();
                    
                    this.notificacion.mostrarNotificacion('Cliente actualizado correctamente');
                }
            }
        });
        
        // Evento para nuevo cliente
        document.getElementById('nuevoClienteBtn').addEventListener('click', () => {
            // Abrir modal de nueva venta con foco en la sección de información personal
            const nuevaVentaModal = new bootstrap.Modal(document.getElementById('nuevaVentaModal'));
            nuevaVentaModal.show();
            
            // Animación del botón
            const btn = document.getElementById('nuevoClienteBtn');
            btn.classList.add('animate__animated', 'animate__pulse');
            setTimeout(() => {
                btn.classList.remove('animate__animated', 'animate__pulse');
            }, 1000);
        });
        
        // Evento para guardar configuración
        document.querySelectorAll('#configuracion .btn-primary').forEach(btn => {
            btn.addEventListener('click', () => {
                this.config = {
                    moneda: document.getElementById('moneda').value,
                    notificacionesEmail: document.getElementById('notificacionesEmail').checked,
                    notificacionesSistema: document.getElementById('notificacionesSistema').checked,
                    recordatoriosStock: document.getElementById('recordatoriosStock').checked
                };
                
                this.storage.guardarDatos(this.storage.configKey, this.config);
                this.notificacion.mostrarNotificacion('Configuración guardada correctamente');
            });
        });
        
        // Configurar validación de formularios
        this.configurarValidacionFormularios();
    }
    
    calcularTotalVenta() {
        const cantidad = parseInt(document.getElementById('cantidad').value) || 0;
        const precio = parseFloat(document.getElementById('precio').value) || 0;
        const total = cantidad * precio;
        
        document.getElementById('total').value = total.toFixed(2);
    }
    
    validarFormulario(formId) {
        const form = document.getElementById(formId);
        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            
            // Encontrar el primer campo inválido y enfocarlo
            const invalidField = form.querySelector(':invalid');
            if (invalidField) {
                invalidField.focus();
                
                // Agregar animación al campo inválido
                invalidField.classList.add('animate__animated', 'animate__headShake');
                setTimeout(() => {
                    invalidField.classList.remove('animate__animated', 'animate__headShake');
                }, 1000);
            }
            
            return false;
        }
        return true;
    }
    
    configurarValidacionFormularios() {
        // Validación en tiempo real para email
        document.getElementById('email')?.addEventListener('input', function() {
            if (this.validity.typeMismatch) {
                this.setCustomValidity('Por favor ingrese un correo electrónico válido');
            } else {
                this.setCustomValidity('');
            }
        });
        
        // Validación en tiempo real para teléfono
        document.getElementById('telefono')?.addEventListener('input', function() {
            const phoneRegex = /^[0-9\-\+]{9,15}$/;
            if (!phoneRegex.test(this.value)) {
                this.setCustomValidity('Por favor ingrese un número de teléfono válido');
            } else {
                this.setCustomValidity('');
            }
        });
    }
    
    mostrarSeccion(seccionId) {
        // Ocultar todas las secciones con animación
        document.querySelectorAll('section').forEach(section => {
            if (!section.classList.contains('d-none')) {
                section.classList.add('animate__animated', 'animate__fadeOut');
                setTimeout(() => {
                    section.classList.add('d-none');
                    section.classList.remove('animate__animated', 'animate__fadeOut');
                }, 300);
            }
        });
        
        // Mostrar la sección seleccionada con animación
        const seccion = document.getElementById(seccionId);
        if (seccion) {
            setTimeout(() => {
                seccion.classList.remove('d-none');
                seccion.classList.add('animate__animated', 'animate__fadeIn');
                
                // Eliminar la clase de animación después de que termine
                setTimeout(() => {
                    seccion.classList.remove('animate__animated', 'animate__fadeIn');
                }, 500);
            }, 300);
        }
        
        // Actualizar el menú activo
        document.querySelectorAll('[data-section]').forEach(link => {
            if (link.getAttribute('data-section') === seccionId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
        
        // Actualizar gráficos si es necesario
        if (seccionId === 'estadisticas') {
            this.actualizarGraficos();
        }
        
        // Desplazarse al inicio de la sección
        setTimeout(() => {
            seccion.scrollIntoView({ behavior: 'smooth' });
        }, 350);
    }
    
    inicializarGraficos() {
        // Datos para los gráficos (podrían venir de una API en una aplicación real)
        const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
        const ventasData = [1200, 1900, 3000, 5000, 2000, 3000, 4000, 3500, 4200, 3800, 4500, 5000];
        const ingresosData = [1500, 2000, 2500, 3000, 3500, 4000, 4500, 4000, 4200, 4800, 5200, 6000];
        
        // Gráfico de ventas en el inicio
        this.graficos.salesChart = this.crearGrafico(
            'salesChart', 
            'line', 
            meses.slice(0, 6), 
            ventasData.slice(0, 6),
            'rgba(106, 90, 249, 0.2)',
            'rgba(106, 90, 249, 1)',
            'Ventas mensuales'
        );
        
        // Gráfico de ventas completo en la sección de estadísticas
        this.graficos.salesChartFull = this.crearGrafico(
            'salesChartFull', 
            'bar', 
            meses, 
            ventasData,
            'rgba(106, 90, 249, 0.2)',
            'rgba(106, 90, 249, 1)',
            'Ventas anuales'
        );
        
        // Gráfico de ingresos en la sección de estadísticas
        this.graficos.incomeChart = this.crearGrafico(
            'incomeChart', 
            'line', 
            meses, 
            ingresosData,
            'rgba(215, 59, 246, 0.2)',
            'rgba(215, 59, 246, 1)',
            'Ingresos mensuales ($)'
        );
    }
    
    crearGrafico(id, tipo, labels, data, bgColor, borderColor, label) {
        const ctx = document.getElementById(id).getContext('2d');
        return new Chart(ctx, {
            type: tipo,
            data: {
                labels: labels,
                datasets: [{
                    label: label,
                    data: data,
                    backgroundColor: bgColor,
                    borderColor: borderColor,
                    borderWidth: 2,
                    tension: 0.4,
                    fill: tipo === 'line'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false
                    }
                },
                hover: {
                    mode: 'nearest',
                    intersect: true
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
                animation: {
                    duration: 1000,
                    easing: 'easeOutQuart'
                }
            }
        });
    }
    
    actualizarGraficos() {
        // Actualizar datos de los gráficos basados en las ventas reales
        const ventasPorMes = this.calcularVentasPorMes();
        const ingresosPorMes = this.calcularIngresosPorMes();
        const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
        
        // Actualizar gráfico de ventas en inicio
        if (this.graficos.salesChart) {
            this.graficos.salesChart.data.labels = meses.slice(0, 6);
            this.graficos.salesChart.data.datasets[0].data = ventasPorMes.slice(0, 6);
            this.graficos.salesChart.update();
        }
        
        // Actualizar gráfico de ventas completo
        if (this.graficos.salesChartFull) {
            this.graficos.salesChartFull.data.labels = meses;
            this.graficos.salesChartFull.data.datasets[0].data = ventasPorMes;
            this.graficos.salesChartFull.update();
        }
        
        // Actualizar gráfico de ingresos
        if (this.graficos.incomeChart) {
            this.graficos.incomeChart.data.labels = meses;
            this.graficos.incomeChart.data.datasets[0].data = ingresosPorMes;
            this.graficos.incomeChart.update();
        }
    }
    
    calcularVentasPorMes() {
        // Agrupar ventas por mes (ejemplo simplificado)
        return Array(12).fill(0).map((_, i) => {
            return Math.floor(Math.random() * 5000) + 1000;
        });
    }
    
    calcularIngresosPorMes() {
        // Agrupar ingresos por mes (ejemplo simplificado)
        return Array(12).fill(0).map((_, i) => {
            return Math.floor(Math.random() * 10000) + 2000;
        });
    }
    
    cargarVentasRecientes() {
        const tbody = document.getElementById('ventasRecientes');
        tbody.innerHTML = '';
        
        // Ordenar ventas por fecha (más recientes primero)
        const ventasOrdenadas = [...this.ventas].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
        
        // Mostrar solo las 5 más recientes
        ventasOrdenadas.slice(0, 5).forEach(venta => {
            const tr = document.createElement('tr');
            tr.className = 'animate__animated animate__fadeIn';
            tr.innerHTML = `
                <td>${venta.cliente}</td>
                <td>${venta.producto}</td>
                <td>${venta.cantidad}</td>
                <td>$${venta.total.toFixed(2)}</td>
                <td>${venta.fecha}</td>
                <td>
                    <button class="btn btn-sm btn-outline-primary" data-bs-toggle="modal" data-bs-target="#editarVentaModal" data-venta-id="${venta.id}">
                        <i class="bi bi-pencil"></i>
                    </button>
                </td>
            `;
            tbody.appendChild(tr);
        });
        
        // Configurar evento para editar venta
        document.querySelectorAll('[data-venta-id]').forEach(btn => {
            btn.addEventListener('click', () => {
                const ventaId = parseInt(btn.getAttribute('data-venta-id'));
                this.cargarDatosVentaEdicion(ventaId);
            });
        });
    }
    
    cargarListaVentas() {
        const tbody = document.getElementById('listaVentas');
        tbody.innerHTML = '';
        
        this.ventas.forEach(venta => {
            const tr = document.createElement('tr');
            tr.className = 'animate__animated animate__fadeIn';
            tr.innerHTML = `
                <td>${venta.id}</td>
                <td>${venta.cliente}</td>
                <td>${venta.producto}</td>
                <td>${venta.cantidad}</td>
                <td>$${venta.total.toFixed(2)}</td>
                <td>${venta.fecha}</td>
                <td><span class="badge ${venta.estado === 'completado' ? 'bg-success' : 'bg-warning'}">${venta.estado}</span></td>
                <td>
                    <button class="btn btn-sm btn-outline-primary me-1" data-bs-toggle="modal" data-bs-target="#editarVentaModal" data-venta-id="${venta.id}">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger" data-venta-id="${venta.id}">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            `;
            tbody.appendChild(tr);
        });
        
        // Configurar eventos para editar y eliminar ventas
        document.querySelectorAll('[data-venta-id]').forEach(btn => {
            if (btn.getAttribute('data-bs-toggle') === 'modal') {
                btn.addEventListener('click', () => {
                    const ventaId = parseInt(btn.getAttribute('data-venta-id'));
                    this.cargarDatosVentaEdicion(ventaId);
                });
            } else {
                btn.addEventListener('click', () => {
                    const ventaId = parseInt(btn.getAttribute('data-venta-id'));
                    this.eliminarVenta(ventaId);
                });
            }
        });
    }
    
    cargarListaClientes() {
        const tbody = document.getElementById('listaClientes');
        tbody.innerHTML = '';
        
        this.clientes.forEach(cliente => {
            const tr = document.createElement('tr');
            tr.className = 'animate__animated animate__fadeIn';
            tr.innerHTML = `
                <td>${cliente.id}</td>
                <td>${cliente.nombre}</td>
                <td>${cliente.email}</td>
                <td>${cliente.telefono}</td>
                <td>${cliente.compras}</td>
                <td>$${cliente.totalGastado.toFixed(2)}</td>
                <td>${cliente.ultimaCompra}</td>
                <td>
                    <button class="btn btn-sm btn-outline-primary me-1" data-bs-toggle="modal" data-bs-target="#editarClienteModal" data-cliente-id="${cliente.id}">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger" data-cliente-id="${cliente.id}">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            `;
            tbody.appendChild(tr);
        });
        
        // Configurar eventos para editar y eliminar clientes
        document.querySelectorAll('[data-cliente-id]').forEach(btn => {
            if (btn.getAttribute('data-bs-toggle') === 'modal') {
                btn.addEventListener('click', () => {
                    const clienteId = parseInt(btn.getAttribute('data-cliente-id'));
                    this.cargarDatosClienteEdicion(clienteId);
                });
            } else {
                btn.addEventListener('click', () => {
                    const clienteId = parseInt(btn.getAttribute('data-cliente-id'));
                    this.eliminarCliente(clienteId);
                });
            }
        });
    }
    
    cargarDatosVentaEdicion(ventaId) {
        const venta = this.ventas.find(v => v.id === ventaId);
        if (venta) {
            const form = document.getElementById('editarVentaForm');
            form.dataset.ventaId = ventaId;
            
            document.getElementById('editCliente').value = venta.cliente;
            document.getElementById('editProducto').value = venta.producto;
            document.getElementById('editCantidad').value = venta.cantidad;
            document.getElementById('editTotal').value = venta.total.toFixed(2);
        }
    }
    
    cargarDatosClienteEdicion(clienteId) {
        const cliente = this.clientes.find(c => c.id === clienteId); // Complete the find condition
        if (cliente) {
            const form = document.getElementById('editarClienteForm');
            form.dataset.clienteId = clienteId; // Store the client ID in the form
            
            // Populate the modal fields
            document.getElementById('editNombreCliente').value = cliente.nombre || '';
            document.getElementById('editEmailCliente').value = cliente.email || '';
            document.getElementById('editTelefonoCliente').value = cliente.telefono || '';
            document.getElementById('editUltimaCompra').value = cliente.ultimaCompra || '';
        }
    }

    eliminarVenta(ventaId) {
        if (confirm(`¿Estás seguro de que deseas eliminar la venta con ID ${ventaId}?`)) {
            this.ventas = this.ventas.filter(v => v.id !== ventaId);
            this.storage.guardarDatos(this.storage.ventasKey, this.ventas);
            
            this.cargarVentasRecientes();
            this.cargarListaVentas();
            this.actualizarGraficos();
            
            this.notificacion.mostrarNotificacion(`Venta ${ventaId} eliminada correctamente`, 'danger');
        }
    }
    
    eliminarCliente(clienteId) {
        if (confirm(`¿Estás seguro de que deseas eliminar el cliente con ID ${clienteId}? Esto también eliminará sus ventas asociadas.`)) {
            const clienteAEliminar = this.clientes.find(c => c.id === clienteId);
            if (!clienteAEliminar) return;

            // Filtrar cliente
            this.clientes = this.clientes.filter(c => c.id !== clienteId);
            this.storage.guardarDatos(this.storage.clientesKey, this.clientes);
            
            // Opcional: Eliminar las ventas asociadas a este cliente (basado en el nombre, podría ser mejor usar un ID de cliente si estuviera disponible en las ventas)
            this.ventas = this.ventas.filter(v => v.cliente !== clienteAEliminar.nombre);
            this.storage.guardarDatos(this.storage.ventasKey, this.ventas);
            
            this.cargarListaClientes();
            this.cargarVentasRecientes(); // Recargar por si se eliminaron ventas
            this.cargarListaVentas(); // Recargar por si se eliminaron ventas
            this.actualizarGraficos();
            
            this.notificacion.mostrarNotificacion(`Cliente ${clienteId} y sus ventas asociadas eliminados correctamente`, 'danger');
        }
    }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const app = new GoldenFeetsApp();
});

    </script>
</body>
</html>
