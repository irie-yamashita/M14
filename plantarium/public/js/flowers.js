const btn = document.getElementById('delete-btn');

const deleteFlower = (id) => {
    if (!confirm(`Segur que vols eliminar la planta ${id}?`)) return;

    fetch(`/flors/${id}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (!response.ok) throw new Error('Error en eliminar');
            return response.json();
        })
        .then(data => {
            console.log('Planta eliminada', data);
        })
        .catch(error => {
            console.error('Error en eliminar la planta:', error);
        });

    // recarrego la pàgina perquè es vegi el canvi
    window.location.href = "/flors";

};