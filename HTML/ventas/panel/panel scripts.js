document.addEventListener('DOMContentLoaded', function() {
  
    const editProfileButton = document.getElementById('guardarCambiosPerfil');
    if (editProfileButton) {
        editProfileButton.addEventListener('click', function() {
          
            const newProfile = {
                nombre: document.getElementById('editNombre').value.trim(),
                email: document.getElementById('editEmail').value.trim(),
                telefono: document.getElementById('editTelefono').value.trim(),
                direccion: document.getElementById('editDireccion').value.trim(),
                cargo: document.getElementById('editCargo').value.trim()
            };

           
            const profileFields = [
                { inputId: 'nombrePerfil', value: newProfile.nombre },
                { inputId: 'emailPerfil', value: newProfile.email },
                { inputId: 'telefonoPerfil', value: newProfile.telefono },
                { inputId: 'direccionPerfil', value: newProfile.direccion },
                { inputId: 'cargoPerfil', value: newProfile.cargo }
            ];

            profileFields.forEach(field => {
                const element = document.getElementById(field.inputId);
                if (element && field.value) {
                    element.textContent = field.value;
                }
            });

      
            const editProfileModal = bootstrap.Modal.getInstance(document.getElementById('editarPerfilModal'));
            if (editProfileModal) {
                editProfileModal.hide();
            }

          
        });
    }

   
    const logoutButton = document.getElementById('cerrarSesion');
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            
            alert('Sesión cerrada');
         
        });
    }

   
    const initializeChart = (elementId, type, labels, data, colors) => {
        const element = document.getElementById(elementId);
        if (element && window.Chart) {
            const ctx = element.getContext('2d');
            new Chart(ctx, {
                type: type,
                data: {
                    labels: labels,
                    datasets: [{
                        label: type === 'line' ? 'Ventas' : 'Ingresos',
                        data: data,
                        backgroundColor: colors.background,
                        borderColor: colors.border,
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    };

    initializeChart('salesChart', 'line', 
        ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'], 
        [1200, 1900, 3000, 5000, 2000, 3000],
        {
            background: 'rgba(0, 123, 255, 0.2)',
            border: 'rgba(0, 123, 255, 1)'
        }
    );

    initializeChart('incomeChart', 'bar', 
        ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'], 
        [1500, 2000, 2500, 3000, 3500, 4000],
        {
            background: 'rgba(54, 162, 235, 0.2)',
            border: 'rgba(54, 162, 235, 1)'
        }
    );

  
    const saleForm = document.getElementById('ventaForm');
    if (saleForm) {
        saleForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            alert('Venta procesada');
        });
    }

    document.querySelectorAll('.editarVenta').forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const cells = row.querySelectorAll('td');
            
            document.getElementById('editCliente').value = cells[0].innerText;
            document.getElementById('editProducto').value = cells[1].innerText;
            document.getElementById('editCantidad').value = cells[2].innerText;
            document.getElementById('editTotal').value = cells[3].innerText;
        });
    });

 
    document.querySelectorAll('.eliminarVenta').forEach(button => {
        button.addEventListener('click', function() {
            this.closest('tr').remove();
            alert('Venta eliminada');
        });
    });

    const saveSaleChangesButton = document.getElementById('guardarCambiosVenta');
    if (saveSaleChangesButton) {
        saveSaleChangesButton.addEventListener('click', function() {
         
            alert('Cambios en la venta guardados');
        });
    }

    document.querySelectorAll('.editarCliente').forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const cells = row.querySelectorAll('td');
            
            document.getElementById('editNombreCliente').value = cells[0].innerText;
            document.getElementById('editEmailCliente').value = cells[1].innerText;
            document.getElementById('editTelefonoCliente').value = cells[2].innerText;
            document.getElementById('editUltimaCompra').value = cells[3].innerText;
        });
    });

    document.querySelectorAll('.eliminarCliente').forEach(button => {
        button.addEventListener('click', function() {
            this.closest('tr').remove();
            alert('Cliente eliminado');
        });
    });

   
    const saveClientChangesButton = document.getElementById('guardarCambiosCliente');
    if (saveClientChangesButton) {
        saveClientChangesButton.addEventListener('click', function() {
            
            alert('Cambios en el cliente guardados');
        });
    }


    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            
            document.querySelectorAll('section').forEach(section => {
                section.classList.add('d-none');
            });
            
           
            const selectedSection = document.getElementById(targetId);
            if (selectedSection) {
                selectedSection.classList.remove('d-none');
            }
        });
    });
});
