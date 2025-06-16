let perguntas = [
  {
    pergunta: "Campo -> Cidade (sustento):",
    opcoes: ["Tecnologia", "Alimentos", "Serviços", "Cultura"],
    respostaCorreta: 1
  },
  {
    pergunta: "Cidade -> Campo (pessoas):",
    opcoes: ["Êxodo rural", "Turismo rural", "Trabalho cidade", "Urbanização"],
    respostaCorreta: 1
  },
  {
    pergunta: "Cidade oferece ao Campo:",
    opcoes: ["Ar puro", "Tecnologia/mercados", "Mão de obra", "Natureza"],
    respostaCorreta: 1
  },
  {
    pergunta: "Interdependência Campo-Cidade:",
    opcoes: ["Monocultura export.", "Indústria agrícola", "Turismo urbano", "Mineração isolada"],
    respostaCorreta: 1
  },
  {
    pergunta: "Desequilíbrio Campo-Cidade:",
    opcoes: ["Mais produção", "Vida urbana melhor", "Abastecimento/êxodo", "Economia forte"],
    respostaCorreta: 2
  }
];

let perguntaAtual = 0;
let pontuacao = 0;
let estado = "pergunta";
let respostaSelecionada = -1;
let timer = 3;

function setup() {
  createCanvas(400, 400); // Largura e altura aumentadas para 400
  textAlign(CENTER);
  textSize(20); // Aumentei o tamanho do texto para melhor visualização no canvas maior
}

function draw() {
  background(220); // Fundo agora é cinza claro (220)

  if (estado === "pergunta") {
    mostrarPergunta();
  } else if (estado === "feedback") {
    mostrarFeedback();
  } else if (estado === "final") {
    mostrarResultado();
  }
}

function mostrarPergunta() {
  text(perguntas[perguntaAtual].pergunta, 10, 50, 380); // Posição e largura ajustadas

  for (let i = 0; i < perguntas[perguntaAtual].opcoes.length; i++) {
    let yPos = 150 + i * 40; // Posição vertical ajustada
    fill(respostaSelecionada === i ? color(100, 150, 200) : 255);
    rect(20, yPos - 20, 360, 30, 5); // Posição, largura e altura ajustadas
    fill(0);
    textSize(16); // Tamanho do texto das opções um pouco menor
    text(perguntas[perguntaAtual].opcoes[i], width / 2, yPos);
    textSize(20); // Retorna ao tamanho padrão para outros textos
  }
}

function mostrarFeedback() {
  text(perguntas[perguntaAtual].pergunta, 10, 50, 380);

  for (let i = 0; i < perguntas[perguntaAtual].opcoes.length; i++) {
    let yPos = 150 + i * 40;
    fill(i === perguntas[perguntaAtual].respostaCorreta ? color(0, 255, 0) : (respostaSelecionada === i ? color(255, 0, 0) : 255));
    rect(20, yPos - 20, 360, 30, 5);
    fill(0);
    textSize(16);
    text(perguntas[perguntaAtual].opcoes[i], width / 2, yPos);
    textSize(20);
  }

  fill(0);
  if (respostaSelecionada === perguntas[perguntaAtual].respostaCorreta) {
    text("Correto!", width / 2, 300);
  } else {
    text("Incorreto.", width / 2, 300);
    text("Certo: " + perguntas[perguntaAtual].opcoes[perguntas[perguntaAtual].respostaCorreta], width / 2, 330);
  }

  timer -= 1 / frameRate();
  if (timer <= 0) {
    proximaPergunta();
    timer = 3;
  }
}

function mostrarResultado() {
  text("Fim do Quiz!", width / 2, 100);
  text("Pontos: " + pontuacao + "/" + perguntas.length, width / 2, 200);
  text("Clique para reiniciar", width / 2, 300);
}

function mousePressed() {
  if (estado === "pergunta") {
    for (let i = 0; i < perguntas[perguntaAtual].opcoes.length; i++) {
      let yPos = 150 + i * 40;
      if (mouseX > 20 && mouseX < 380 && mouseY > yPos - 20 && mouseY < yPos + 10) {
        respostaSelecionada = i;
        if (respostaSelecionada === perguntas[perguntaAtual].respostaCorreta) {
          pontuacao++;
        }
        estado = "feedback";
        timer = 3;
        break;
      }
    }
  } else if (estado === "final") {
    perguntaAtual = 0;
    pontuacao = 0;
    estado = "pergunta";
    respostaSelecionada = -1;
  }
}

function proximaPergunta() {
  perguntaAtual++;
  respostaSelecionada = -1;
  if (perguntaAtual < perguntas.length) {
    estado = "pergunta";
  } else {
    estado = "final";
  }
}