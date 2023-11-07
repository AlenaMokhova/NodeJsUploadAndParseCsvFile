const form = document.getElementById("form");
const statusFileLoadingDiv = document.getElementById("status-file-loading");
const statusFileParsing = document.getElementById("status-file-parsing");
const parseResultDiv = document.getElementById("parse-result");

form.addEventListener("submit", submitForm);

function submitForm(e) {
    e.preventDefault();

    setStatusFile("Файл загружается...");

    const files = document.getElementById("files");
    const formData = new FormData();
    for (let i = 0; i < files.files.length; i++) {
        formData.append("files", files.files[i]);
    }
    fetch("http://127.0.0.1:3000/uploadFiles", {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then((response) => {
            setStatusFile("Файл успешно загружен! Название файла: " + response.fileName);
            parseFile();
        })
        .catch((err) => {
            setStatusFile("При загрузке файла произошла ошибка!<br>" + err);
        });
}

function parseFile() {
    setStatusFileParsing("Читаем файл...");

    fetch("http://127.0.0.1:3000/parseFiles", {
        method: 'POST',
    })
        .then(response => response.json())
        .then(response => {
            setStatusFileParsing("Файл успешно прочитан!");
            parseResultDiv.innerHTML = '<h3>Результат чтения файла:</h3><br>' + showDataAsTable(response.data);
        })
        .catch((err) => {
            setStatusFileParsing("При чтении файла произошла ошибка!<br>" + err);
        });
}

function setStatusFile(text) {
    statusFileLoadingDiv.innerHTML = text;
}

function setStatusFileParsing(text) {
    statusFileParsing.innerHTML = text;
}

function showDataAsTable(data) {
    let html = '<table>';
    for (let i in data) {
        html += '<tr>';
        for (let y in data[i]) {
            html += '<td>' + data[i][y] + '</td>';
        }
        html += '</tr>'
    }
    html += '</table>'
    return html;
}