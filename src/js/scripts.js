// Функция для получения данных с API
async function getCurrencyData() {
  try {
    const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
    const data = await response.json();
    return data.Valute;
  } catch (error) {
    console.log('Ошибка при получении данных:', error);
    return null;
  }
}

// Функция для создания и заполнения селектора валют
async function populateCurrencySelector() {
  const currencySelector = document.getElementById('currency-select');
  const currencyData = await getCurrencyData();
  
  if (currencyData) {
    Object.keys(currencyData).forEach((currencyId) => {
      const option = document.createElement('option');
      option.value = currencyId;
      option.textContent = `${currencyId} - ${currencyData[currencyId].Name}`;
      currencySelector.appendChild(option);
    });

    currencySelector.addEventListener('change', () => {
      const selectedCurrencyId = currencySelector.value;
      const selectedCurrency = currencyData[selectedCurrencyId];

      // Обновление блока информации
      document.getElementById('info-id').textContent = selectedCurrency.ID;
      document.getElementById('info-name').textContent = selectedCurrency.Name;
      document.getElementById('info-code').textContent = selectedCurrency.CharCode;
      document.getElementById('info-date').textContent = selectedCurrency.Date;
      document.getElementById('info-value').textContent = selectedCurrency.Value;
      document.getElementById('prev-info-date').textContent = selectedCurrency.PreviousDate;
      document.getElementById('prev-info-value').textContent = selectedCurrency.PreviousURL;
    });
  } else {
    currencySelector.innerHTML = '<p>Выберите валюту из списка.</p>';
}
}

  // Запуск функции для заполнения селектора при загрузке страницы
  populateCurrencySelector();
