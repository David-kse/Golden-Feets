<?php
session_start();
require_once 'conexion.php';

$id = $_GET['id'] ?? null;

if (!$id) {
    header('Location: inventario.php');
    exit;
}

try {
    $stmt = $conn->prepare("SELECT * FROM productos WHERE id = ?");
    $stmt->execute([$id]);
    $producto = $stmt->fetch();
    
    if (!$producto) {
        header('Location: inventario.php');
        exit;
    }
} catch (PDOException $e) {
    $_SESSION['mensaje'] = "Error al cargar producto: " . $e->getMessage();
    $_SESSION['tipo_mensaje'] = "error";
    header('Location: inventario.php');
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $nombre = $_POST['nombre'];
        $codigo = $_POST['codigo'];
        $categoria = $_POST['categoria'];
        $descripcion = $_POST['descripcion'];
        $cantidad = $_POST['cantidad'];
        $precio = $_POST['precio'];
        
        // Manejo de la imagen
        $nombre_imagen = $producto['imagen'];
        if ($_FILES['imagen']['error'] === UPLOAD_ERR_OK) {
            // Eliminar imagen anterior si existe
            if ($nombre_imagen && file_exists('uploads/' . $nombre_imagen)) {
                unlink('uploads/' . $nombre_imagen);
            }
            
            // Subir nueva imagen
            $nombre_imagen = uniqid() . '_' . basename($_FILES['imagen']['name']);
            $ruta_imagen = 'uploads/' . $nombre_imagen;
            move_uploaded_file($_FILES['imagen']['tmp_name'], $ruta_imagen);
        }
        
        $sql = "UPDATE productos SET 
                nombre = ?, 
                codigo = ?, 
                categoria = ?, 
                descripcion = ?, 
                cantidad = ?,
                precio = ?,
                imagen = ?,
                fecha_actualizacion = NOW()
                WHERE id = ?";
                
        $stmt = $conn->prepare($sql);
        $stmt->execute([$nombre, $codigo, $categoria, $descripcion, $cantidad, $precio, $nombre_imagen, $id]);
        
        $_SESSION['mensaje'] = "Producto actualizado exitosamente";
        $_SESSION['tipo_mensaje'] = "success";
        header('Location: inventario.php');
        exit;
        
    } catch (PDOException $e) {
        $_SESSION['mensaje'] = "Error al actualizar producto: " . $e->getMessage();
        $_SESSION['tipo_mensaje'] = "error";
    }
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Golden Feets - Editar Inventario</title>
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
        
        /* Vista de Edición */
        #vista-edicion {
            padding: 30px;
        }
        
        .edicion-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 25px;
            padding-bottom: 15px;
            border-bottom: 2px solid var(--accent-color);
        }
        
        .edicion-header h1 {
            font-size: 24px;
            color: var(--primary-color);
        }
        
        .producto-editar {
            display: flex;
            gap: 20px;
            padding: 20px;
            background-color: rgba(108, 74, 182, 0.05);
            border-radius: 10px;
            border-left: 4px solid var(--secondary-color);
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
        
        .botones-accion {
            display: flex;
            gap: 10px;
            margin-top: 10px;
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
            text-decoration: none;
        }
        
        .btn-secundario:hover {
            background-color: rgba(108, 74, 182, 0.2);
        }
        
        .btn-confirmar {
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            color: white;
            border: none;
            padding: 8px 15px;
            border-radius: 5px;
            cursor: pointer;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 5px;
            transition: all 0.3s;
        }
        
        .btn-confirmar:hover {
            background: linear-gradient(135deg, var(--primary-dark), var(--secondary-color));
            transform: translateY(-2px);
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
            .producto-editar {
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
        <div class="delivery-icon">
            <i class="fas fa-boxes"></i>
        </div>
        <h2>Gestión de Inventario</h2>
    </div>
    <div class="icon-wrapper">
        <span class="brand-name">Golden Feets</span>
    </div>
</header>

<!-- Vista de Edición -->
<main id="vista-edicion">
    <div class="edicion-header">
        <h1>EDITAR PRODUCTO</h1>
        <a href="inventario.php" class="btn-secundario">
            <i class="fas fa-arrow-left"></i> Volver al Inventario
        </a>
    </div>
    
    <form method="post" enctype="multipart/form-data">
        <div class="producto-editar">
            <div class="imagen-upload" onclick="document.getElementById('imagen').click()">
                <input type="file" id="imagen" name="imagen" accept="image/*" onchange="mostrarVistaPrevia(this, 'preview')">
                <?php if(!empty($producto['imagen'])): ?>
                    <img id="preview" src="uploads/<?= htmlspecialchars($producto['imagen']) ?>" alt="<?= htmlspecialchars($producto['nombre']) ?>">
                <?php else: ?>
                    <img id="preview" src="" style="display: none;">
                    <i class="fas fa-camera"></i>
                    <span>Haz clic para cambiar la imagen</span>
                <?php endif; ?>
            </div>
            
            <div class="producto-campos">
                <div class="input-group">
                    <label for="nombre">Nombre del Producto</label>
                    <input type="text" id="nombre" name="nombre" placeholder="Ej: Zapatillas Running Pro" 
                           value="<?= htmlspecialchars($producto['nombre']) ?>" required>
                </div>
                
                <div class="input-group">
                    <label for="codigo">Código del Producto</label>
                    <input type="text" id="codigo" name="codigo" placeholder="Ej: ZRP-001" 
                           value="<?= htmlspecialchars($producto['codigo']) ?>" required>
                </div>
                
                <div class="input-group">
                    <label for="categoria">Categoría</label>
                    <select id="categoria" name="categoria" required>
                        <option value="">Seleccione una categoría</option>
                        <option value="zapatillas" <?= $producto['categoria'] == 'zapatillas' ? 'selected' : '' ?>>Zapatillas</option>
                        <option value="ropa" <?= $producto['categoria'] == 'ropa' ? 'selected' : '' ?>>Ropa deportiva</option>
                        <option value="accesorios" <?= $producto['categoria'] == 'accesorios' ? 'selected' : '' ?>>Accesorios</option>
                        <option value="otros" <?= $producto['categoria'] == 'otros' ? 'selected' : '' ?>>Otros</option>
                    </select>
                </div>
                
                <div class="input-group">
                    <label for="precio">Precio (USD)</label>
                    <input type="number" id="precio" name="precio" placeholder="0.00" min="0" step="0.01"
                           value="<?= htmlspecialchars($producto['precio']) ?>" required>
                </div>
                
                <div class="input-group">
                    <label for="descripcion">Descripción</label>
                    <textarea id="descripcion" name="descripcion" rows="2" placeholder="Descripción detallada del producto"><?= htmlspecialchars($producto['descripcion']) ?></textarea>
                </div>
                
                <div class="input-group">
                    <label for="cantidad">Cantidad en Inventario</label>
                    <div class="cantidad-control">
                        <button type="button" class="cantidad-btn" onclick="modificarCantidad(-1)">-</button>
                        <input type="number" id="cantidad" name="cantidad" value="<?= htmlspecialchars($producto['cantidad']) ?>" min="0" class="cantidad-input" required>
                        <button type="button" class="cantidad-btn" onclick="modificarCantidad(1)">+</button>
                    </div>
                </div>
                
                <div class="botones-accion">
                    <button type="submit" class="btn-confirmar">
                        <i class="fas fa-save"></i> Guardar Cambios
                    </button>
                </div>
            </div>
        </div>
    </form>
</main>

<script>
    function mostrarVistaPrevia(input, previewId) {
        const preview = document.getElementById(previewId);
        const file = input.files[0];
        const reader = new FileReader();
        
        reader.onload = function(e) {
            preview.src = e.target.result;
            preview.style.display = 'block';
            if (input.parentElement.querySelector('i')) {
                input.parentElement.querySelector('i').style.display = 'none';
            }
            if (input.parentElement.querySelector('span')) {
                input.parentElement.querySelector('span').style.display = 'none';
            }
        }
        
        if (file) {
            reader.readAsDataURL(file);
        }
    }

    function modificarCantidad(cambio) {
        const input = document.getElementById('cantidad');
        let valor = parseInt(input.value) + cambio;
        if (valor < 0) valor = 0;
        input.value = valor;
    }

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