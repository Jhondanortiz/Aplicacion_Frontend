document.addEventListener('DOMContentLoaded', () => {
    fetchItems();


    document.getElementById('myForm').addEventListener('submit', function(event) {
        event.preventDefault(); 


        const formData = new FormData(event.target);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),

        };

        const apiUrl = '/api/items';

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            fetchItems();
        })
        .catch((error) => console.error('Error:', error));
    });

    function fetchItems() {
        fetch('/api/items')
            .then(response => response.json())
            .then(data => {
                const itemsList = document.getElementById('items-list');
                itemsList.innerHTML = data.map(item => `<p>${item.name}</p>`).join('');
            })
            .catch(error => console.error('Error fetching items:', error));
    }
});
