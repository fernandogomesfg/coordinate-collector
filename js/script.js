// Inicializa o mapa no Campus da UEM
var map = L.map('map').setView([-25.948667945244654,32.59836673736573], 17);

// Adiciona o layer de mapa
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 18,
}).addTo(map);

// Adiciona um controle de escala
L.control.scale().addTo(map);

// Variável para armazenar os marcadores
var markers = [];

// Função para adicionar um marcador no mapa com as coordenadas do clique
function addMarker(e) {
	// Pede ao usuário o nome do ponto
	var name = prompt("Nome do ponto:");

	// Cria um novo marcador com as coordenadas e o nome informado
	var marker = L.marker(e.latlng, {
		draggable: true,
		title: name,
		icon: L.divIcon({
			className: 'marker',
			html: name
		})
	}).addTo(map);

	// Adiciona o marcador ao array de marcadores
	markers.push(marker);
}

// Adiciona um evento de clique no mapa
map.on('click', addMarker);

// Função para salvar os marcadores em um arquivo CSV
function saveMarkers() {
	// Cria uma string com as informações dos marcadores
	var csvString = "latitude,longitude,nome\n";
	for (var i = 0; i < markers.length; i++) {
		var marker = markers[i];
		var lat = marker._latlng.lat;
		var lng = marker._latlng.lng;
		var name = marker.options.title;
		csvString += lat + "," + lng + "," + name + "\n";
	}

	// Cria um elemento <a> para fazer o download do arquivo CSV
	var downloadLink = document.createElement("a");
	downloadLink.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csvString);
	downloadLink.download = "markers.csv";
	document.body.appendChild(downloadLink);
	downloadLink.click();
	document.body.removeChild(downloadLink);
}

// Adiciona um evento de clique no botão "Salvar"
var saveButton = document.getElementById("save-btn");
saveButton.addEventListener("click", saveMarkers);
