$(document).ready(function () {


    var chart = new CanvasJS.Chart("chartContainer", {
        title: {
            text: "Estadisticas"
        },
        data: [{
            type: "column",
            dataPoints: []
        }]
    });
    chart.render();


    $("#buscar").on("click", function () {
        const pokemonToFind = document.getElementById("numeroPokemon").value;
        const urlToFech = "https://pokeapi.co/api/v2/pokemon/" + pokemonToFind;
        $.ajax({
            method: "GET",
            url: urlToFech,
        }).done(function (datosDelServidor) {
            dibujarPlantillaPokemon(datosDelServidor)
            actualizarGraficoPokemon(datosDelServidor)
        })
    })

    function dibujarPlantillaPokemon(datosDelServidor) {
        $("#pokemonName").text(datosDelServidor.name)
        $("#fotoPokemon").attr("src", datosDelServidor.sprites.front_default)
        $("#pokemonPeso").text(datosDelServidor.weight + "  kg")
    }

    function actualizarGraficoPokemon(datosDelServidor) {

        console.log(datosDelServidor.stats)
        const datos = datosDelServidor.stats.map(function (item) {
            console.log(item.stat.name)
            console.log(item.base_stat)
            return {
                label: item.stat.name,
                y: item.base_stat,
            }
        })





        chart.options.data[0].dataPoints = datos;
        chart.render();

    }































})

