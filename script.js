const key = "569db0557edc154043d602e96717632c"

function dadosNaTela (dados) {
  document.querySelector(".cidade").innerHTML = `Tempo em ${dados.name}`
  document.querySelector(".tempo").innerHTML =  `${Math.floor(dados.main.temp)} °C`
  document.querySelector(".previsaoTexto").innerHTML = dados.weather[0].description
  document.querySelector(".umidade").innerHTML = `Umidade: ${dados.main.humidity}%`
  document.querySelector(".previsao").src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`
  document.querySelector(".error").innerText = ``
  console.log(dados)
}

async function buscarCidade(cidade) {
  try {
    const resposta = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${key}&lang=pt_br&units=metric`)
    if (!resposta.ok) {
      throw new Error("Cidade não encontrada")
    }
    const dados = await resposta.json()
    dadosNaTela(dados)
  } catch (erro) {
    document.querySelector(".cidade").innerHTML = ""
    document.querySelector(".tempo").innerHTML =  ""
    document.querySelector(".previsaoTexto").innerHTML = ""
    document.querySelector(".umidade").innerHTML = ""
    document.querySelector(".previsao").src = ""
    document.querySelector(".cidade").innerHTML = `Cidade não encontrada`
    document.querySelector(".error").innerText = `Ops! Certifique-se de digitar apenas o nome da cidade sem estado ou país`
    console.error("Erro ao buscar cidade:", erro.message)
  }
}

function clicarBuscar() {
  const cidade = document.querySelector(".inputCidade").value
  console.log(cidade)
  buscarCidade(cidade)
}
