<?php
session_start();
require_once 'conexion.php';

// Configuración de paginación
$limit = 10;
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$offset = ($page - 1) * $limit;

// Consulta con búsqueda si existe
$busqueda = $_GET['busqueda'] ?? '';
$where = $busqueda ? "WHERE estado = 1 AND (nombre LIKE :busqueda OR codigo LIKE :busqueda)" : "WHERE estado = 1";
$params = $busqueda ? [':busqueda' => "%$busqueda%"] : [];

// Consulta principal
$sql = "SELECT * FROM productos $where ORDER BY fecha_actualizacion DESC LIMIT :limit OFFSET :offset";
$stmt = $conn->prepare($sql);

if ($busqueda) {
    foreach ($params as $key => $value) {
        $stmt->bindValue($key, $value);
    }
}

$stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
$stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
$stmt->execute();
$productos = $stmt->fetchAll();

// Consulta para total de productos
$total_sql = "SELECT COUNT(*) as total FROM productos $where";
$total_stmt = $conn->prepare($total_sql);

if ($busqueda) {
    foreach ($params as $key => $value) {
        $total_stmt->bindValue($key, $value);
    }
}

$total_stmt->execute();
$total_productos = $total_stmt->fetch()['total'];
$total_paginas = ceil($total_productos / $limit);
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Golden Feets - Stock de Inventario</title>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Poppins:wght@400;500;600&family=Playfair+Display:wght@700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <style>
        :root {
            --primary-color: #4D1C95;
            --primary-dark: #3a146e;
            --secondary-color: #6C4AB6;
            --accent-color: #B9E0FF;
            --text-color: #2D2727;
            --light-bg: #F5F5F5;
            --card-shadow: 0 10px 20px rgba(0,0,0,0.1);
            --success-color: #4CAF50;
            --warning-color: #FF9800;
            --error-color: #F44336;
        }
        
        body {
            font-family: 'Poppins', sans-serif;
            margin: 0;
            padding: 0;
            background-color: var(--light-bg);
            color: var(--text-color);
            line-height: 1.6;
        }
        
        header {
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            color: white;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 15px 30px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            position: relative;
            z-index: 10;
        }
        
        .icon-wrapper {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .logo-title {
            display: flex;
            align-items: center;
            gap: 15px;
        }
        
        .delivery-icon {
            font-size: 1.8em;
            color: white;
            transition: all 0.3s;
        }
        
        .delivery-icon:hover {
            transform: scale(1.1);
        }
        
        .back-arrow {
            font-size: 1.5em;
            cursor: pointer;
            display: none;
            transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            background-color: rgba(255, 255, 255, 0.2);
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            opacity: 0;
            transform: translateX(-10px);
        }
        
        .back-arrow:hover {
            background-color: rgba(255, 255, 255, 0.3);
            transform: translateX(-5px) scale(1.1);
        }
        
        .back-arrow.active {
            opacity: 1;
            transform: translateX(0);
        }
        
        h1, h2, h3 {
            margin: 0;
            font-weight: 600;
        }
        
        .brand-name {
            font-family: 'Playfair Display', serif;
            font-weight: 700;
            font-size: 1.5em;
            color: white;
            text-shadow: 0 2px 4px rgba(0,0,0,0.1);
            letter-spacing: 1px;
            position: relative;
            padding-right: 15px;
        }
        
        main {
            max-width: 1200px;
            margin: 30px auto;
            padding: 0;
            background-color: white;
            box-shadow: var(--card-shadow);
            border-radius: 15px;
            overflow: hidden;
            transition: transform 0.3s;
        }
        
        main:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 30px rgba(0,0,0,0.15);
        }
        
        /* Vista de Stock */
        #vista-stock {
            padding: 30px;
        }
        
        .stock-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 25px;
            padding-bottom: 15px;
            border-bottom: 2px solid var(--accent-color);
        }
        
        .stock-header h1 {
            font-size: 24px;
            color: var(--primary-color);
        }
        
        .acciones-stock {
            display: flex;
            gap: 15px;
            align-items: center;
        }
        
        .search-form {
            display: flex;
            align-items: center;
        }
        
        .search-form input {
            padding: 8px 15px;
            border: 1px solid #ddd;
            border-radius: 50px 0 0 50px;
            font-family: 'Poppins', sans-serif;
            transition: all 0.3s;
            width: 200px;
        }
        
        .search-form input:focus {
            border-color: var(--secondary-color);
            outline: none;
            box-shadow: 0 0 0 3px rgba(108, 74, 182, 0.2);
        }
        
        .search-form button {
            background-color: var(--secondary-color);
            color: white;
            border: none;
            padding: 8px 15px;
            border-radius: 0 50px 50px 0;
            cursor: pointer;
            transition: all 0.3s;
        }
        
        .search-form button:hover {
            background-color: var(--primary-color);
        }
        
        .btn {
            padding: 10px 20px;
            border-radius: 50px;
            cursor: pointer;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 8px;
            transition: all 0.3s;
            text-decoration: none;
        }
        
        .btn-primario {
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            color: white;
            border: none;
            box-shadow: 0 4px 10px rgba(108, 74, 182, 0.3);
        }
        
        .btn-primario:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 15px rgba(108, 74, 182, 0.4);
        }
        
        .btn-secundario {
            background-color: rgba(108, 74, 182, 0.1);
            color: var(--secondary-color);
            border: none;
        }
        
        .btn-secundario:hover {
            background-color: rgba(108, 74, 182, 0.2);
        }
        
        /* Tabla de productos */
        .tabla-productos {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        
        .tabla-productos th {
            background-color: var(--primary-color);
            color: white;
            padding: 12px 15px;
            text-align: left;
        }
        
        .tabla-productos td {
            padding: 12px 15px;
            border-bottom: 1px solid #eee;
        }
        
        .tabla-productos tr:hover {
            background-color: rgba(108, 74, 182, 0.05);
        }
        
        .producto-imagen {
            width: 60px;
            height: 60px;
            object-fit: cover;
            border-radius: 5px;
            background-color: #f0f0f0;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .producto-imagen img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 5px;
        }
        
        .producto-imagen i {
            color: var(--secondary-color);
            font-size: 20px;
        }
        
        .estado-activo {
            color: var(--success-color);
            font-weight: 500;
        }
        
        .estado-inactivo {
            color: var(--error-color);
            font-weight: 500;
        }
        
        .acciones-producto {
            display: flex;
            gap: 8px;
        }
        
        .btn-accion {
            padding: 5px 10px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 14px;
            transition: all 0.3s;
            text-decoration: none;
            border: 1px solid transparent;
            background-color: transparent;
            font-family: 'Poppins', sans-serif;
        }
        
        .btn-editar {
            background-color: rgba(76, 175, 80, 0.1);
            color: var(--success-color);
            border-color: var(--success-color);
        }
        
        .btn-editar:hover {
            background-color: rgba(76, 175, 80, 0.2);
        }
        
        .btn-eliminar {
            background-color: rgba(244, 67, 54, 0.1);
            color: var(--error-color);
            border-color: var(--error-color);
        }
        
        .btn-eliminar:hover {
            background-color: rgba(244, 67, 54, 0.2);
        }
        
        /* Mensaje placeholder */
        .placeholder-mensaje {
            text-align: center;
            padding: 40px;
            color: var(--secondary-color);
            font-size: 18px;
            border: 2px dashed var(--accent-color);
            border-radius: 10px;
            margin-top: 20px;
        }
        
        .placeholder-mensaje i {
            font-size: 40px;
            margin-bottom: 15px;
            color: var(--secondary-color);
        }
        
        /* Paginación */
        .paginacion {
            display: flex;
            justify-content: center;
            gap: 5px;
            margin-top: 30px;
        }
        
        .pagina-btn {
            padding: 8px 15px;
            border-radius: 5px;
            background-color: white;
            color: var(--secondary-color);
            border: 1px solid #ddd;
            text-decoration: none;
            transition: all 0.3s;
        }
        
        .pagina-btn:hover, .pagina-btn.activa {
            background-color: var(--secondary-color);
            color: white;
            border-color: var(--secondary-color);
        }
        
        /* Notificaciones */
        .alert {
            padding: 15px;
            margin-bottom: 20px;
            border-radius: 4px;
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
            animation: fadeIn 0.5s;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .alert-success {
            background-color: #dff0d8;
            color: #3c763d;
            border: 1px solid #d6e9c6;
        }
        
        .alert-error {
            background-color: #f2dede;
            color: #a94442;
            border: 1px solid #ebccd1;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        /* Responsive design */
        @media (max-width: 768px) {
            .stock-header {
                flex-direction: column;
                align-items: flex-start;
                gap: 15px;
            }
            
            .acciones-stock {
                width: 100%;
                justify-content: space-between;
                flex-wrap: wrap;
            }
            
            .search-form {
                width: 100%;
                margin-top: 10px;
            }
            
            .search-form input {
                width: 100%;
            }
            
            .tabla-productos {
                display: block;
                overflow-x: auto;
            }
            
            .brand-name {
                font-size: 1.2em;
            }
        }
    </style>
</head>
<body>

<!-- Mostrar notificaciones -->
<?php if(isset($_SESSION['mensaje'])): ?>
    <div class="alert alert-<?= $_SESSION['tipo_mensaje'] ?>">
        <?= $_SESSION['mensaje'] ?>
    </div>
    <?php 
    unset($_SESSION['mensaje']);
    unset($_SESSION['tipo_mensaje']);
    ?>
<?php endif; ?>

<header>
    <div class="back-arrow" id="back-arrow" onclick="window.history.back()">
        <i class="fas fa-arrow-left"></i>
    </div>
    <div class="logo-title">
        <div class="delivery-icon bounce-animation">
            <i class="fas fa-boxes"></i>
        </div>
        <h2>Gestión de Inventario</h2>
    </div>
    <div class="icon-wrapper">
        <span class="brand-name">Golden Feets</span>
    </div>
</header>

<main id="vista-stock">
    <div class="stock-header">
        <h1>STOCK DE INVENTARIO</h1>
        <div class="acciones-stock">
            <a href="agregar_inventario.php" class="btn btn-primario">
                <i class="fas fa-plus"></i> Agregar Producto
            </a>
            <form method="GET" class="search-form">
                <input type="text" name="busqueda" placeholder="Buscar productos..." 
                       value="<?= htmlspecialchars($busqueda) ?>">
                <button type="submit"><i class="fas fa-search"></i></button>
            </form>
        </div>
    </div>
    
    <?php if(count($productos) > 0): ?>
        <table class="tabla-productos">
            <thead>
                <tr>
                    <th>Imagen</th>
                    <th>Nombre</th>
                    <th>Código</th>
                    <th>Categoría</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach($productos as $producto): ?>
                <tr>
                    <td>
                        <div class="producto-imagen">
                            <?php if(!empty($producto['imagen'])): ?>
                                <img src="uploads/<?= htmlspecialchars($producto['imagen']) ?>" 
                                     alt="<?= htmlspecialchars($producto['nombre']) ?>">
                            <?php else: ?>
                                <i class="fas fa-shoe-prints"></i>
                            <?php endif; ?>
                        </div>
                    </td>
                    <td><?= htmlspecialchars($producto['nombre']) ?></td>
                    <td><?= htmlspecialchars($producto['codigo']) ?></td>
                    <td><?= htmlspecialchars(ucfirst($producto['categoria'])) ?></td>
                    <td>$<?= number_format($producto['precio'] ?? 0, 2) ?></td>
                    <td class="<?= $producto['cantidad'] > 5 ? 'estado-activo' : 'estado-inactivo' ?>">
                        <?= htmlspecialchars($producto['cantidad']) ?> unid.
                    </td>
                    <td>
                        <div class="acciones-producto">
                            <a href="editar_inventario.php?id=<?= $producto['id'] ?>" class="btn-accion btn-editar">
                                <i class="fas fa-edit"></i>
                            </a>
                            <form action="procesar_producto.php" method="POST" class="form-eliminar">
                                <input type="hidden" name="id" value="<?= $producto['id'] ?>">
                                <input type="hidden" name="accion" value="eliminar">
                                <button type="submit" class="btn-accion btn-eliminar">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </form>
                        </div>
                    </td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    <?php else: ?>
        <div class="placeholder-mensaje">
            <i class="fas fa-box-open"></i>
            <p>No se encontraron productos en el inventario</p>
            <a href="agregar_inventario.php" class="btn btn-primario" style="margin-top: 15px;">
                <i class="fas fa-plus"></i> Agregar Producto
            </a>
        </div>
    <?php endif; ?>
    
    <!-- Paginación -->
    <?php if($total_paginas > 1): ?>
    <div class="paginacion">
        <?php if($page > 1): ?>
            <a href="?page=<?= $page-1 ?><?= $busqueda ? '&busqueda='.urlencode($busqueda) : '' ?>" class="pagina-btn">
                <i class="fas fa-chevron-left"></i>
            </a>
        <?php endif; ?>
        
        <?php for($i = 1; $i <= $total_paginas; $i++): ?>
            <a href="?page=<?= $i ?><?= $busqueda ? '&busqueda='.urlencode($busqueda) : '' ?>" 
               class="pagina-btn <?= $i == $page ? 'activa' : '' ?>">
                <?= $i ?>
            </a>
        <?php endfor; ?>
        
        <?php if($page < $total_paginas): ?>
            <a href="?page=<?= $page+1 ?><?= $busqueda ? '&busqueda='.urlencode($busqueda) : '' ?>" class="pagina-btn">
                <i class="fas fa-chevron-right"></i>
            </a>
        <?php endif; ?>
    </div>
    <?php endif; ?>
</main>

<script>
// Función para confirmar eliminación
document.querySelectorAll('.form-eliminar').forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if(confirm('¿Estás seguro de eliminar este producto?')) {
            // Mostrar animación de carga
            const button = form.querySelector('button');
            const originalHTML = button.innerHTML;
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            button.disabled = true;
            
            // Enviar el formulario mediante AJAX
            fetch(form.action, {
                method: 'POST',
                body: new FormData(form)
            })
            .then(response => {
                if(response.ok) {
                    // Recargar la página después de eliminar
                    window.location.reload();
                } else {
                    alert('Error al eliminar el producto');
                    button.innerHTML = originalHTML;
                    button.disabled = false;
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error al eliminar el producto');
                button.innerHTML = originalHTML;
                button.disabled = false;
            });
        }
    });
});

// Desvanecer notificaciones después de 3 segundos
setTimeout(() => {
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => {
        alert.style.display = 'none';
    });
}, 3000);
</script>
</body>
</html>