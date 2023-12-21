// json-data-project/public/script.js
async function saveData() {
    var title = document.getElementById('title').value;
    var number = document.getElementById('number').value;
    var difficulty = document.getElementById('difficulty').value;
    var answer = document.getElementById('answer').value;
    var language = document.getElementById('language').value;

    var data = {
        title: title,
        number: number,
        difficulty: difficulty,
        answer: answer,
        language: language
    };

    var jsonData = JSON.stringify(data);

    var dataList = document.getElementById('dataList');
    var listItem = document.createElement('li');
    listItem.appendChild(document.createTextNode(jsonData));
    dataList.appendChild(listItem);

    try {
        const response = await fetch('/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonData
        });

        const result = await response.json();
        console.log(result);

        document.getElementById('title').value = '';
        document.getElementById('number').value = '';
        document.getElementById('difficulty').value = '';
        document.getElementById('answer').value = '';
        document.getElementById('language').value = '';

        fetchData();

    } catch (error) {
        console.error('Error:', error);
    }
}

// json-data-project/public/script.js
async function fetchData() {
    try {
        const response = await fetch('/questions');
        console.log(response)
        const data = await response.json();

        console.log('Received data:', data); // Добавим эту строку для отладки

        var dataList = document.getElementById('dataList');
        dataList.innerHTML = '';

        if (Array.isArray(data) && data.length > 0) {
            data.forEach(item => {
                var listItem = document.createElement('li');
                listItem.classList.add('question-item');
                listItem.innerHTML = `
                    <strong>${item.title}</strong><br>
                    Number: ${item.number}<br>
                    Difficulty: ${item.difficulty}<br>
                    Answer: ${item.answer}<br>
                    Language: ${item.language}
                `;
                dataList.appendChild(listItem);
            });
        } else {
            console.error('Error: No data or unexpected data format');
        }

    } catch (error) {
        console.error('Error:', error);
    }
}


window.onload = function () {
    fetchData();

    // Добавьте другие действия, которые вы хотите выполнить при загрузке страницы
};
