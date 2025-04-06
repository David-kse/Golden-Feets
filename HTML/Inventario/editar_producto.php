<?php
session_start();
require_once 'conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['accion']) {
    try {
        $id = $_POST['id'];
        
        if ($_POST['accion'] === 'eliminar') {
            // Actualización: Cambiar estado a 0 en lugar de eliminar físicamente
            $sql = "UPDATE productos SET estado = 0 WHERE id = ?";
            $stmt = $conn->prepare($sql);
            $stmt->execute([$id]);
            
            $_SESSION['mensaje'] = "Producto eliminado correctamente";
            $_SESSION['tipo_mensaje'] = "success";
        }
        
        header('Location: inventario.php');
        exit;
        
    } catch (PDOException $e) {
        $_SESSION['mensaje'] = "Error al procesar la solicitud: " . $e->getMessage();
        $_SESSION['tipo_mensaje'] = "error";
        header('Location: inventario.php');
        exit;
    }
} else {
    header('Location: inventario.php');
    exit;
}
?>
