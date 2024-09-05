
document.addEventListener('DOMContentLoaded', () => {
    function windowOnload() {
        // Преобразуем массив в JSON-формат
        const petsContent = JSON.stringify(pets, null, 2);

        // Создаем объект Blob для хранения данных
        const blob = new Blob([petsContent], { type: 'application/json' });

        // Создаем ссылку для скачивания файла
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'pets.json'; // Файл будет называться pets.json

        // Автоматически кликаем на ссылку для скачивания файла
        link.click();
        // Освобождаем URL для Blob
        URL.revokeObjectURL(link.href);
    }
    windowOnload();
});