const currencySelector = document.getElementById('currency-selector');
const currencyInfo = document.getElementById('currency-info');

fetch('https://www.cbr-xml-daily.ru/daily_json.js')
    .then(response => response.json())
    .then(data => {
        // Получаем объект с информацией о курсе валют
        const currencies = data.Valute;

        // Создаем варианты для селектора
        for (const currencyId in currencies) {
            const currency = currencies[currencyId];
            const option = document.createElement('option');
            option.value = currencyId;
            option.text = `${currencyId} - ${currency.Name}`;
            currencySelector.appendChild(option);
        }

        // Функция для обновления информации о выбранной валюте
        function updateCurrencyInfo() {
            const selectedCurrencyId = currencySelector.value;
            const selectedCurrency = currencies[selectedCurrencyId];

            const date = new Date(data.Timestamp);
            const formattedDate = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

            currencyInfo.innerHTML = `
                <h3>Информация о выбранной валюте:</h3>
                <p>ID валюты: ${selectedCurrency.ID}</p>
                <p>Название валюты: ${selectedCurrency.Name}</p>
                <p>Код валюты: ${selectedCurrency.CharCode}</p>
                <p>${formattedDate} - ${selectedCurrency.Value.toFixed(2)}</p>
                <p>${formattedDate} - ${selectedCurrency.Previous.toFixed(2)}</p>
            `;
        }

        // Вызываем функцию обновления информации о выбранной валюте при изменении значения селектора
        currencySelector.addEventListener('change', updateCurrencyInfo);

        // Вызываем функцию обновления информации о выбранной валюте для первоначального значения
        updateCurrencyInfo();
    })
    .catch(error => {
        console.error('Ошибка получения данных о курсе валют', error);
    });