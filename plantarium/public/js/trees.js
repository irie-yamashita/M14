const deleteTree = (id) => {
    if (!confirm(`Segur que vols eliminar l'arbre ${id}?`)) return;

    fetch(`/arbres/${id}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (!response.ok) throw new Error('Error en eliminar');
            return response.json();
        })
        .then(data => {
            console.log('Arbre eliminat', data);
        })
        .catch(error => {
            console.error('Error en eliminar l’arbre:', error);
        });

    // recarrego la pàgina perquè es vegi el canvi
    window.location.href = "/arbres";
};