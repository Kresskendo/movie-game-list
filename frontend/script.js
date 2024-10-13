document.getElementById('itemForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Предотвращаем отправку формы

    const title = document.getElementById('title').value;
    const type = document.getElementById('type').value;

    try {
        const response = await fetch('http://localhost:3000/items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, type }),
        });

        if (!response.ok) {
            throw new Error('Ошибка при добавлении элемента');
        }

        const newItem = await response.json();
        addItemToList(newItem); // Добавляем элемент в список

        // Очищаем поля ввода после добавления
        document.getElementById('title').value = '';
        document.getElementById('type').value = '';
    } catch (error) {
        console.error('Ошибка:', error);
    }
});

// Функция для добавления элемента в список на странице
function addItemToList(item) {
    const itemList = document.getElementById('itemList');
    const li = document.createElement('li');
    li.textContent = `${item.title} (${item.type})`;
    itemList.appendChild(li);
}