function openBooking() {
    document.getElementById('tela').style.display = 'flex';
}

function closetela() {
    document.getElementById('tela').style.display = 'none';
}

document.getElementById('bookingForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Prepara dados do formulário
    const formData = new FormData();
    formData.append('servico', document.getElementById('service').value);
    formData.append('data', document.getElementById('date').value);
    formData.append('horario', document.getElementById('time').value);
    formData.append('nome', document.getElementById('name').value);
    formData.append('telefone', document.getElementById('phone').value);

    fetch('agendar.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(responseText => {
        console.log(responseText);
        alert(responseText);
        document.getElementById('tela').style.display = 'none';
    })
    .catch(error => {
        console.error("Erro ao agendar:", error);
    });
});

function openInfoModal() {
    document.getElementById('infoModal').style.display = 'flex';
}

function closeInfoModal() {
    document.getElementById('infoModal').style.display = 'none';
}

function showTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.style.display = 'none');
    document.getElementById(tabId).style.display = 'block';
}

function loadAppointments() {
    fetch('get_agendamentos.php') 
        .then(response => response.json())
        .then(data => {
            const currentContainer = document.getElementById('current');
            currentContainer.innerHTML = ''; 
            // Seção de agendamentos atuais
            data.current.forEach(appointment => {
                const appointmentDiv = document.createElement('div');
                appointmentDiv.className = 'appointment';
                appointmentDiv.innerHTML = `
                    <div class="appointment-info">
                        <p><strong>${appointment.nome_servico}</strong></p>
                        <p>Data: ${appointment.data} | Horário: ${appointment.horario}</p>
                        <p>Preço: R$ ${appointment.preco}</p>
                    </div>
                `;
                currentContainer.appendChild(appointmentDiv);
            });

            const completedContainer = document.getElementById('completed');
            completedContainer.innerHTML = ''; 
            // Seção de serviços realizados
            data.completed.forEach(appointment => {
                const appointmentDiv = document.createElement('div');
                appointmentDiv.className = 'appointment';
                appointmentDiv.innerHTML = `
                    <div class="appointment-info">
                        <p><strong>${appointment.nome_servico}</strong></p>
                        <p>Data: ${appointment.data} | Horário: ${appointment.horario}</p>
                        <p>Preço: R$ ${appointment.preco}</p>
                    </div>
                `;
                completedContainer.appendChild(appointmentDiv);
            });
        })
        .catch(error => console.error('Erro ao carregar os agendamentos:', error));
}

function openProfile() {
    document.getElementById('profileModal').style.display = 'block';
    loadAppointments(); 
}

function closeProfile() {
    document.getElementById('profileModal').style.display = 'none';
}

window.addEventListener('load', () => {
    if (localStorage.getItem('dark-mode') === 'true') {
        document.body.classList.add('dark-mode');
        document.querySelector('.dark-mode-toggle').textContent = '☀️ Modo Claro';
    }
});

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('dark-mode', isDarkMode);

    const btn = document.querySelector('.dark-mode-toggle');
    btn.textContent = isDarkMode ? '☀️ Modo Claro' : '🌙 Modo Escuro';
}

showTab('current');