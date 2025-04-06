<?php
session_start();
require_once 'conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        // Crear directorio uploads si no existe
        if (!file_exists('uploads')) {
            mkdir('uploads', 0777, true);
        }

        $nombres = $_POST['nombre'];
        $codigos = $_POST['codigo'];
        $categorias = $_POST['categoria'];
        $descripciones = $_POST['descripcion'];
        $cantidades = $_POST['cantidad'];
        $precios = $_POST['precio'];
        
        // Manejo de la imagen
        $imagenes = [];
        foreach ($_FILES['imagen']['tmp_name'] as $key => $tmp_name) {
            if ($_FILES['imagen']['error'][$key] === UPLOAD_ERR_OK) {
                $nombre_imagen = uniqid() . '_' . basename($_FILES['imagen']['name'][$key]);
                $ruta_imagen = 'uploads/' . $nombre_imagen;
                move_uploaded_file($tmp_name, $ruta_imagen);
                $imagenes[] = $nombre_imagen;
            } else {
                $imagenes[] = null;
            }
        }
        
        $sql = "INSERT INTO productos (nombre, codigo, categoria, descripcion, cantidad, precio, imagen, estado) 
                VALUES (:nombre, :codigo, :categoria, :descripcion, :cantidad, :precio, :imagen, 1)";
        $stmt = $conn->prepare($sql);
        
        for ($i = 0; $i < count($nombres); $i++) {
            $stmt->execute([
                ':nombre' => $nombres[$i],
                ':codigo' => $codigos[$i],
                ':categoria' => $categorias[$i],
                ':descripcion' => $descripciones[$i],
                ':cantidad' => $cantidades[$i],
                ':precio' => $precios[$i],
                ':imagen' => $imagenes[$i] ?? null
            ]);
        }
        
        $_SESSION['mensaje'] = "Productos agregados exitosamente";
        $_SESSION['tipo_mensaje'] = "success";
        header('Location: inventario.php');
        exit;
        
    } catch (PDOException $e) {
        $_SESSION['mensaje'] = "Error al agregar productos: " . $e->getMessage();
        $_SESSION['tipo_mensaje'] = "error";
    }
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Golden Feets - Agregar Inventario</title>
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
            transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            background-color: rgba(255, 255, 255, 0.2);
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        
        .back-arrow:hover {
            background-color: rgba(255, 255, 255, 0.3);
            transform: translateX(-5px) scale(1.1);
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
        }
        
        main {
            max-width: 800px;
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
        
        /* Vista de Inventario */
        #vista-inventario {
            padding: 30px;
        }
        
        .inventario-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 25px;
            padding-bottom: 15px;
            border-bottom: 2px solid var(--accent-color);
        }
        
        .inventario-header h1 {
            font-size: 24px;
            color: var(--primary-color);
        }
        
        .btn-agregar {
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 50px;
            cursor: pointer;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 8px;
            transition: all 0.3s;
            box-shadow: 0 4px 10px rgba(108, 74, 182, 0.3);
        }
        
        .btn-agregar:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 15px rgba(108, 74, 182, 0.4);
        }
        
        .producto-form {
            display: flex;
            gap: 20px;
            margin-bottom: 25px;
            padding: 20px;
            background-color: rgba(108, 74, 182, 0.05);
            border-radius: 10px;
            border-left: 4px solid var(--secondary-color);
            transition: all 0.3s;
            animation: fadeIn 0.5s ease-out;
        }
        
        .producto-form:hover {
            transform: translateY(-3px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        
        .imagen-upload {
            width: 150px;
            height: 150px;
            background-color: #f0f0f0;
            border-radius: 8px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            overflow: hidden;
            position: relative;
            transition: all 0.3s;
        }
        
        .imagen-upload:hover {
            background-color: #e0e0e0;
        }
        
        .imagen-upload img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: none;
        }
        
        .imagen-upload i {
            font-size: 30px;
            color: var(--secondary-color);
            margin-bottom: 10px;
        }
        
        .imagen-upload span {
            font-size: 14px;
            color: var(--secondary-color);
            text-align: center;
        }
        
        .imagen-upload input[type="file"] {
            position: absolute;
            width: 100%;
            height: 100%;
            opacity: 0;
            cursor: pointer;
        }
        
        .producto-campos {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 15px;
        }
        
        .input-group {
            display: flex;
            flex-direction: column;
            gap: 5px;
        }
        
        .input-group label {
            font-weight: 500;
            color: var(--secondary-color);
        }
        
        .input-group input, .input-group select, .input-group textarea {
            padding: 10px 15px;
            border: 1px solid #ddd;
            border-radius: 8px;
            font-family: 'Poppins', sans-serif;
            transition: all 0.3s;
        }
        
        .input-group input:focus, .input-group select:focus, .input-group textarea:focus {
            border-color: var(--secondary-color);
            outline: none;
            box-shadow: 0 0 0 3px rgba(108, 74, 182, 0.2);
        }
        
        .cantidad-control {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .cantidad-btn {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background-color: var(--secondary-color);
            color: white;
            border: none;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s;
        }
        
        .cantidad-btn:hover {
            background-color: var(--primary-color);
            transform: scale(1.1);
        }
        
        .cantidad-input {
            width: 60px;
            text-align: center;
            padding: 5px;
        }
        
        .btn-eliminar {
            background-color: rgba(244, 67, 54, 0.1);
            color: var(--error-color);
            border: 1px solid var(--error-color);
            padding: 5px 10px;
            border-radius: 5px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 5px;
            transition: all 0.3s;
            align-self: flex-start;
        }
        
        .btn-eliminar:hover {
            background-color: rgba(244, 67, 54, 0.2);
        }
        
        .botones-inferiores {
            display: flex;
            justify-content: space-between;
            margin-top: 20px;
        }
        
        .btn-secundario {
            background-color: rgba(108, 74, 182, 0.1);
            color: var(--secondary-color);
            border: none;
            padding: 10px 20px;
            border-radius: 50px;
            cursor: pointer;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 8px;
            transition: all 0.3s;
        }
        
        .btn-secundario:hover {
            background-color: rgba(108, 74, 182, 0.2);
        }
        
        .btn-primario {
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            color: white;
            border: none;
            padding: 10px 25px;
            border-radius: 50px;
            cursor: pointer;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 8px;
            transition: all 0.3s;
            box-shadow: 0 4px 10px rgba(108, 74, 182, 0.3);
        }
        
        .btn-primario:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 15px rgba(108, 74, 182, 0.4);
        }
        
        /* Animaciones */
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
            40% {transform: translateY(-5px);}
            60% {transform: translateY(-3px);}
        }
        
        .bounce-animation {
            animation: bounce 1.5s infinite;
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
            animation: fadeIn 0.5s, fadeOut 0.5s 2.5s;
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
        
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        
        /* Responsive design */
        @media (max-width: 768px) {
            .producto-form {
                flex-direction: column;
            }
            
            .imagen-upload {
                width: 100%;
                height: 200px;
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

<!-- Vista de Inventario -->
<main id="vista-inventario">
    <div class="inventario-header">
        <h1>AGREGAR PRODUCTOS AL INVENTARIO</h1>
        <button class="btn-agregar" onclick="agregarProducto()">
            <i class="fas fa-plus"></i> Nuevo Producto
        </button>
    </div>
    
    <form id="form-inventario" action="agregar_inventario.php" method="post" enctype="multipart/form-data">
        <div id="formularios-productos">
            <!-- Los formularios de productos se agregarán dinámicamente aquí -->
        </div>
        
        <div class="botones-inferiores">
            <button type="button" class="btn-secundario" onclick="limpiarFormularios()">
                <i class="fas fa-trash-alt"></i> Limpiar Todo
            </button>
            <button type="submit" class="btn-primario">
                <i class="fas fa-check-circle"></i> Confirmar Inventario
            </button>
        </div>
    </form>
</main>

<script>
    let contadorProductos = 0;
    let productos = [];

    function agregarProducto() {
        contadorProductos++;
        const id = `producto-${contadorProductos}`;
        
        const productoForm = document.createElement('div');
        productoForm.className = 'producto-form';
        productoForm.id = id;
        productoForm.innerHTML = `
            <div class="imagen-upload" onclick="document.getElementById('imagen-${id}').click()">
                <input type="file" id="imagen-${id}" name="imagen[]" accept="image/*" onchange="mostrarVistaPrevia(this, 'preview-${id}')">
                <img id="preview-${id}" src="" alt="Vista previa">
                <i class="fas fa-camera"></i>
                <span>Haz clic para subir una imagen</span>
            </div>
            
            <div class="producto-campos">
                <div class="input-group">
                    <label for="nombre-${id}">Nombre del Producto</label>
                    <input type="text" id="nombre-${id}" name="nombre[]" placeholder="Ej: Zapatillas Running Pro" required>
                </div>
                
                <div class="input-group">
                    <label for="codigo-${id}">Código del Producto</label>
                    <input type="text" id="codigo-${id}" name="codigo[]" placeholder="Ej: ZRP-001" required>
                </div>
                
                <div class="input-group">
                    <label for="categoria-${id}">Categoría</label>
                    <select id="categoria-${id}" name="categoria[]" required>
                        <option value="">Seleccione una categoría</option>
                        <option value="zapatillas">Zapatillas</option>
                        <option value="ropa">Ropa deportiva</option>
                        <option value="accesorios">Accesorios</option>
                        <option value="otros">Otros</option>
                    </select>
                </div>
                
                <div class="input-group">
                    <label for="precio-${id}">Precio (USD)</label>
                    <input type="number" id="precio-${id}" name="precio[]" placeholder="0.00" min="0" step="0.01" required>
                </div>
                
                <div class="input-group">
                    <label for="descripcion-${id}">Descripción</label>
                    <textarea id="descripcion-${id}" name="descripcion[]" rows="2" placeholder="Descripción detallada del producto"></textarea>
                </div>
                
                <div class="input-group">
                    <label>Cantidad en Inventario</label>
                    <div class="cantidad-control">
                        <button type="button" class="cantidad-btn" onclick="modificarCantidad('${id}', -1)">-</button>
                        <input type="number" id="cantidad-${id}" name="cantidad[]" value="1" min="0" class="cantidad-input" required>
                        <button type="button" class="cantidad-btn" onclick="modificarCantidad('${id}', 1)">+</button>
                    </div>
                </div>
                
                <button type="button" class="btn-eliminar" onclick="eliminarProducto('${id}')">
                    <i class="fas fa-trash"></i> Eliminar
                </button>
            </div>
        `;
        
        document.getElementById('formularios-productos').appendChild(productoForm);
        productos.push({ id, form: productoForm });
    }

    function mostrarVistaPrevia(input, previewId) {
        const preview = document.getElementById(previewId);
        const file = input.files[0];
        const reader = new FileReader();
        
        reader.onload = function(e) {
            preview.src = e.target.result;
            preview.style.display = 'block';
            input.parentElement.querySelector('i').style.display = 'none';
            input.parentElement.querySelector('span').style.display = 'none';
        }
        
        if (file) {
            reader.readAsDataURL(file);
        }
    }

    function modificarCantidad(id, cambio) {
        const input = document.getElementById(`cantidad-${id}`);
        let valor = parseInt(input.value) + cambio;
        if (valor < 0) valor = 0;
        input.value = valor;
    }

    function eliminarProducto(id) {
        if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
            const producto = document.getElementById(id);
            producto.remove();
            productos = productos.filter(p => p.id !== id);
        }
    }

    function limpiarFormularios() {
        if (confirm('¿Estás seguro de que deseas limpiar todos los formularios?')) {
            document.getElementById('formularios-productos').innerHTML = '';
            productos = [];
            contadorProductos = 0;
        }
    }

    // Inicializar con un formulario vacío
    document.addEventListener('DOMContentLoaded', () => {
        agregarProducto();
    });
</script>
</body>
</html>