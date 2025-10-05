"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Trophy, Star, Volume2, Users, CheckCircle, XCircle, Award } from "lucide-react"
import SuryaMascot from "@/components/surya-mascot"

export default function PlanetsExplorer() {
  const [selectedPlanet, setSelectedPlanet] = useState<string>("earth")
  const [score, setScore] = useState(0)
  const [showQuiz, setShowQuiz] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<boolean[]>([])
  const [showFeedback, setShowFeedback] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<string>("")
  const [quizComplete, setQuizComplete] = useState(false)

  // Multiplayer state
  const [showMultiplayer, setShowMultiplayer] = useState(false)
  const [roomCode, setRoomCode] = useState("")
  const [playerName, setPlayerName] = useState("")
  const [inRoom, setInRoom] = useState(false)
  const [players, setPlayers] = useState<Array<{ name: string; score: number }>>([])

  const planets = [
    {
      id: "mercury",
      name: "Mercúrio",
      nickname: "O Veloz",
      emoji: "☿️",
      color: "from-gray-400 to-gray-600",
      temperature: "430°C de dia, -180°C de noite",
      fact: "É o planeta mais rápido! Dá uma volta no Sol em apenas 88 dias.",
      funFact: "Mercúrio não tem luas! É um dos únicos planetas solitários.",
    },
    {
      id: "venus",
      name: "Vênus",
      nickname: "A Estrela da Manhã",
      emoji: "♀️",
      color: "from-yellow-300 to-orange-400",
      temperature: "465°C",
      fact: "É o planeta mais quente do Sistema Solar!",
      funFact: "Um dia em Vênus é mais longo que um ano! Ele gira muito devagar.",
    },
    {
      id: "earth",
      name: "Terra",
      nickname: "Nosso Lar",
      emoji: "🌍",
      color: "from-blue-400 to-green-500",
      temperature: "15°C em média",
      fact: "O único planeta com água líquida e vida!",
      funFact: "A Terra é o planeta mais denso do Sistema Solar!",
    },
    {
      id: "mars",
      name: "Marte",
      nickname: "O Planeta Vermelho",
      emoji: "♂️",
      color: "from-red-500 to-orange-600",
      temperature: "-63°C em média",
      fact: "Marte tem montanhas gigantes! O Monte Olimpo é 3 vezes maior que o Everest.",
      funFact: "Marte tem duas luas pequenas: Fobos e Deimos!",
    },
    {
      id: "jupiter",
      name: "Júpiter",
      nickname: "O Gigante",
      emoji: "♃",
      color: "from-orange-300 to-amber-600",
      temperature: "-110°C",
      fact: "É o maior planeta! Cabem 1.300 Terras dentro dele.",
      funFact: "A Grande Mancha Vermelha é uma tempestade maior que a Terra!",
    },
    {
      id: "saturn",
      name: "Saturno",
      nickname: "O Senhor dos Anéis",
      emoji: "♄",
      color: "from-yellow-200 to-amber-400",
      temperature: "-140°C",
      fact: "Tem os anéis mais bonitos do Sistema Solar!",
      funFact: "Saturno é tão leve que flutuaria na água (se houvesse um oceano grande o suficiente)!",
    },
  ]

  const currentPlanet = planets.find((p) => p.id === selectedPlanet) || planets[2]

  const quizQuestions = [
    {
      question: "Qual é o planeta mais quente do Sistema Solar?",
      options: ["Mercúrio", "Vênus", "Marte", "Júpiter"],
      correct: "Vênus",
      explanation:
        "Vênus é o mais quente (465°C) por causa de sua atmosfera densa de CO2 que cria um efeito estufa extremo!",
      difficulty: "fácil",
    },
    {
      question: "Qual planeta tem os anéis mais bonitos?",
      options: ["Júpiter", "Saturno", "Urano", "Netuno"],
      correct: "Saturno",
      explanation: "Saturno tem os anéis mais espetaculares, feitos de gelo e rochas que brilham lindamente!",
      difficulty: "fácil",
    },
    {
      question: "Quantas luas tem Marte?",
      options: ["0", "1", "2", "4"],
      correct: "2",
      explanation:
        "Marte tem duas pequenas luas: Fobos e Deimos, nomeadas em homenagem aos filhos do deus grego da guerra!",
      difficulty: "médio",
    },
    {
      question: "Qual é o maior planeta do Sistema Solar?",
      options: ["Terra", "Saturno", "Júpiter", "Netuno"],
      correct: "Júpiter",
      explanation:
        "Júpiter é gigante! Cabem 1.300 Terras dentro dele. É tão grande que sua gravidade protege a Terra de asteroides!",
      difficulty: "fácil",
    },
    {
      question: "Qual planeta gira 'deitado' de lado?",
      options: ["Vênus", "Urano", "Netuno", "Saturno"],
      correct: "Urano",
      explanation: "Urano gira de lado! Provavelmente uma colisão gigante no passado o deixou assim.",
      difficulty: "difícil",
    },
    {
      question: "Quantos dias tem um ano em Mercúrio?",
      options: ["88 dias", "365 dias", "687 dias", "12 anos"],
      correct: "88 dias",
      explanation: "Mercúrio é o mais rápido! Completa uma volta ao redor do Sol em apenas 88 dias terrestres.",
      difficulty: "médio",
    },
    {
      question: "Qual planeta é conhecido como 'Planeta Vermelho'?",
      options: ["Vênus", "Marte", "Júpiter", "Saturno"],
      correct: "Marte",
      explanation: "Marte é vermelho por causa do óxido de ferro (ferrugem) em sua superfície!",
      difficulty: "fácil",
    },
    {
      question: "Qual é a maior lua do Sistema Solar?",
      options: ["Lua (da Terra)", "Titã", "Ganimedes", "Europa"],
      correct: "Ganimedes",
      explanation: "Ganimedes, lua de Júpiter, é maior que o planeta Mercúrio! Tem até seu próprio campo magnético.",
      difficulty: "difícil",
    },
    {
      question: "Quantos planetas têm anéis?",
      options: ["1", "2", "4", "8"],
      correct: "4",
      explanation: "Júpiter, Saturno, Urano e Netuno têm anéis! Mas os de Saturno são os mais visíveis e bonitos.",
      difficulty: "médio",
    },
    {
      question: "Qual planeta tem a Grande Mancha Vermelha?",
      options: ["Marte", "Júpiter", "Saturno", "Netuno"],
      correct: "Júpiter",
      explanation: "A Grande Mancha Vermelha é uma tempestade gigante em Júpiter que dura há mais de 300 anos!",
      difficulty: "médio",
    },
    {
      question: "Qual planeta poderia flutuar na água?",
      options: ["Terra", "Marte", "Saturno", "Vênus"],
      correct: "Saturno",
      explanation: "Saturno é tão leve (menos denso que água) que flutuaria se houvesse um oceano grande o suficiente!",
      difficulty: "médio",
    },
    {
      question: "Quantas Terras caberiam dentro do Sol?",
      options: ["100", "1.000", "100.000", "1.300.000"],
      correct: "1.300.000",
      explanation: "O Sol é ENORME! Cabem 1,3 milhão de Terras dentro dele. É 99,86% da massa do Sistema Solar!",
      difficulty: "difícil",
    },
    {
      question: "Qual planeta tem o dia mais longo?",
      options: ["Mercúrio", "Vênus", "Terra", "Marte"],
      correct: "Vênus",
      explanation: "Um dia em Vênus (243 dias terrestres) é mais longo que seu ano (225 dias)! Ele gira muito devagar.",
      difficulty: "difícil",
    },
    {
      question: "Qual é o planeta mais frio?",
      options: ["Netuno", "Urano", "Plutão", "Saturno"],
      correct: "Urano",
      explanation: "Urano pode chegar a -224°C! Mesmo estando mais perto do Sol que Netuno, é o mais frio.",
      difficulty: "médio",
    },
    {
      question: "Quantas luas tem Júpiter?",
      options: ["12", "27", "53", "Mais de 90"],
      correct: "Mais de 90",
      explanation:
        "Júpiter tem mais de 90 luas conhecidas! É como um mini sistema solar. As 4 maiores foram descobertas por Galileu.",
      difficulty: "difícil",
    },
    {
      question: "O que causa as estações do ano na Terra?",
      options: ["Distância do Sol", "Inclinação do eixo", "Velocidade orbital", "Lua"],
      correct: "Inclinação do eixo",
      explanation:
        "A Terra está inclinada 23,5°. Isso faz diferentes partes receberem mais ou menos luz solar durante o ano!",
      difficulty: "médio",
    },
    {
      question: "Qual planeta tem ventos mais rápidos?",
      options: ["Júpiter", "Saturno", "Urano", "Netuno"],
      correct: "Netuno",
      explanation: "Netuno tem ventos de até 2.100 km/h! São os mais rápidos do Sistema Solar.",
      difficulty: "difícil",
    },
    {
      question: "Qual é a montanha mais alta do Sistema Solar?",
      options: ["Monte Everest", "Monte Olimpo", "Monte Sharp", "Pico Maxwell"],
      correct: "Monte Olimpo",
      explanation: "O Monte Olimpo em Marte tem 22 km de altura - 3 vezes o Everest! É um vulcão gigante.",
      difficulty: "médio",
    },
    {
      question: "Quantos planetas anões existem oficialmente?",
      options: ["1", "3", "5", "10"],
      correct: "5",
      explanation: "São 5 planetas anões oficiais: Plutão, Éris, Makemake, Haumea e Ceres.",
      difficulty: "difícil",
    },
    {
      question: "Qual planeta tem água líquida em sua superfície?",
      options: ["Marte", "Terra", "Europa", "Vênus"],
      correct: "Terra",
      explanation:
        "A Terra é o único planeta com água líquida na superfície! Isso é essencial para a vida como conhecemos.",
      difficulty: "fácil",
    },
    {
      question: "O que são asteroides?",
      options: ["Estrelas pequenas", "Planetas bebês", "Rochas espaciais", "Cometas congelados"],
      correct: "Rochas espaciais",
      explanation: "Asteroides são rochas que sobraram da formação do Sistema Solar há 4,6 bilhões de anos!",
      difficulty: "fácil",
    },
    {
      question: "Qual planeta tem a atmosfera mais densa?",
      options: ["Terra", "Vênus", "Júpiter", "Marte"],
      correct: "Vênus",
      explanation: "A atmosfera de Vênus é 90 vezes mais densa que a da Terra! É como estar 900m debaixo d'água.",
      difficulty: "médio",
    },
    {
      question: "Quantos anos tem o Sistema Solar?",
      options: ["1 milhão", "100 milhões", "4,6 bilhões", "13,8 bilhões"],
      correct: "4,6 bilhões",
      explanation: "O Sistema Solar se formou há 4,6 bilhões de anos a partir de uma nuvem de gás e poeira!",
      difficulty: "médio",
    },
    {
      question: "Qual lua pode ter oceano sob sua superfície?",
      options: ["Lua", "Fobos", "Europa", "Titã"],
      correct: "Europa",
      explanation: "Europa (lua de Júpiter) tem um oceano de água salgada sob sua crosta de gelo! Pode ter vida!",
      difficulty: "difícil",
    },
    {
      question: "O que é um cometa?",
      options: ["Estrela cadente", "Bola de gelo e poeira", "Planeta pequeno", "Lua perdida"],
      correct: "Bola de gelo e poeira",
      explanation:
        "Cometas são 'bolas de neve sujas' - gelo, poeira e rochas. Quando se aproximam do Sol, criam uma cauda brilhante!",
      difficulty: "fácil",
    },
    {
      question: "Qual é a velocidade da luz?",
      options: ["300 km/s", "3.000 km/s", "30.000 km/s", "300.000 km/s"],
      correct: "300.000 km/s",
      explanation: "A luz viaja a 300.000 km por segundo! Ela leva 8 minutos para viajar do Sol até a Terra.",
      difficulty: "médio",
    },
    {
      question: "Quantas galáxias existem no universo?",
      options: ["Milhares", "Milhões", "Bilhões", "Trilhões"],
      correct: "Trilhões",
      explanation: "Existem cerca de 2 trilhões de galáxias no universo observável! Cada uma com bilhões de estrelas.",
      difficulty: "difícil",
    },
    {
      question: "O que mantém os planetas em órbita?",
      options: ["Magnetismo", "Gravidade", "Vento solar", "Energia escura"],
      correct: "Gravidade",
      explanation: "A gravidade do Sol mantém todos os planetas em órbita! É como uma corda invisível que os puxa.",
      difficulty: "médio",
    },
    {
      question: "Qual planeta tem o maior vulcão ativo?",
      options: ["Terra", "Vênus", "Marte", "Io (lua)"],
      correct: "Io (lua)",
      explanation:
        "Io, lua de Júpiter, tem centenas de vulcões ativos! É o corpo mais vulcanicamente ativo do Sistema Solar.",
      difficulty: "difícil",
    },
    {
      question: "O que é a Via Láctea?",
      options: ["Uma estrela", "Um planeta", "Nossa galáxia", "Uma nebulosa"],
      correct: "Nossa galáxia",
      explanation:
        "A Via Láctea é nossa galáxia! Tem mais de 200 bilhões de estrelas e o Sistema Solar é apenas um pontinho nela.",
      difficulty: "fácil",
    },
  ]

  const handleAnswer = (answer: string) => {
    const isCorrect = answer === quizQuestions[currentQuestion].correct
    setSelectedAnswer(answer)
    setShowFeedback(true)
    setAnswers([...answers, isCorrect])

    if (isCorrect) {
      setScore(score + 10)
    }
  }

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setShowFeedback(false)
      setSelectedAnswer("")
    } else {
      setQuizComplete(true)
    }
  }

  const restartQuiz = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setShowFeedback(false)
    setSelectedAnswer("")
    setQuizComplete(false)
    setScore(0)
  }

  const createRoom = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase()
    setRoomCode(code)
    setInRoom(true)
    setPlayers([{ name: playerName, score: 0 }])
  }

  const joinRoom = () => {
    setInRoom(true)
    setPlayers([
      { name: playerName, score: 0 },
      { name: "João", score: 30 },
      { name: "Maria", score: 50 },
    ])
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <Card className="p-8 text-center bg-gradient-to-br from-accent/30 to-secondary/30 border-2 border-accent">
        <div className="text-6xl mb-4 animate-float">🪐</div>
        <h2 className="text-4xl font-bold mb-2 text-balance">Planetas e Curiosidades</h2>
        <p className="text-lg text-muted-foreground">Explore os planetas do nosso Sistema Solar!</p>
        <div className="flex gap-3 justify-center mt-4">
          <Badge className="text-lg px-4 py-2 bg-primary">
            <Trophy className="w-4 h-4 mr-2" />
            Pontos: {score}
          </Badge>
        </div>
      </Card>

      <SuryaMascot
        message="Uau! Vamos explorar os planetas? Cada um tem características únicas e incríveis. Clique em um planeta para aprender mais!"
        expression="excited"
      />

      {/* Planet Selector */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {planets.map((planet) => (
          <Button
            key={planet.id}
            variant={selectedPlanet === planet.id ? "default" : "outline"}
            className="h-auto flex-col gap-2 p-4"
            onClick={() => setSelectedPlanet(planet.id)}
          >
            <span className="text-4xl">{planet.emoji}</span>
            <span className="text-sm font-semibold">{planet.name}</span>
          </Button>
        ))}
      </div>

      {/* Planet Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Planet Visualization */}
        <Card className="p-8 text-center">
          <div className="relative inline-block mb-6">
            <div
              className={`w-48 h-48 mx-auto rounded-full bg-gradient-to-br ${currentPlanet.color} shadow-2xl animate-rotate-slow`}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent" />
            </div>
            <div className="absolute -top-4 -right-4 text-3xl animate-twinkle">✨</div>
            <div className="absolute -bottom-4 -left-4 text-2xl animate-twinkle" style={{ animationDelay: "1s" }}>
              ⭐
            </div>
          </div>
          <h3 className="text-3xl font-bold mb-2">{currentPlanet.name}</h3>
          <Badge className="text-base px-3 py-1 mb-4">{currentPlanet.nickname}</Badge>
          <Button variant="secondary" className="gap-2">
            <Volume2 className="w-4 h-4" />
            Ouvir Pronúncia
          </Button>
        </Card>

        {/* Planet Info */}
        <div className="space-y-4">
          <Card className="p-6 bg-gradient-to-br from-primary/20 to-transparent border-2 border-primary">
            <h4 className="text-lg font-bold mb-2 flex items-center gap-2">🌡️ Temperatura</h4>
            <p className="text-base">{currentPlanet.temperature}</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-secondary/20 to-transparent border-2 border-secondary">
            <h4 className="text-lg font-bold mb-2 flex items-center gap-2">📚 Curiosidade Principal</h4>
            <p className="text-base leading-relaxed">{currentPlanet.fact}</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-accent/20 to-transparent border-2 border-accent">
            <h4 className="text-lg font-bold mb-2 flex items-center gap-2">🎉 Fato Divertido</h4>
            <p className="text-base leading-relaxed">{currentPlanet.funFact}</p>
          </Card>
        </div>
      </div>

      {/* Multiplayer Section */}
      {!showQuiz && (
        <Card className="p-8 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-2 border-purple-500">
          <div className="text-center space-y-4">
            <div className="text-5xl animate-bounce">👥</div>
            <h3 className="text-2xl font-bold">Modo Multiplayer</h3>
            <p className="text-muted-foreground">Jogue com seus amigos em tempo real!</p>

            {!showMultiplayer && (
              <Button size="lg" className="gap-2" onClick={() => setShowMultiplayer(true)}>
                <Users className="w-5 h-5" />
                Jogar com Amigos
              </Button>
            )}

            {showMultiplayer && !inRoom && (
              <div className="mt-6 p-6 bg-card rounded-lg border-2 border-purple-500 space-y-4">
                <Input
                  placeholder="Seu nome"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  className="h-12 text-base"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button size="lg" onClick={createRoom} disabled={!playerName} className="gap-2">
                    Criar Sala
                  </Button>
                  <div className="space-y-2">
                    <Input
                      placeholder="Código da sala"
                      value={roomCode}
                      onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                      className="h-12 text-base"
                    />
                    <Button size="lg" onClick={joinRoom} disabled={!playerName || !roomCode} className="w-full gap-2">
                      Entrar na Sala
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {inRoom && (
              <div className="mt-6 p-6 bg-card rounded-lg border-2 border-purple-500 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xl font-bold">Sala: {roomCode}</h4>
                  <Badge className="text-base px-3 py-1">{players.length} jogadores</Badge>
                </div>
                <div className="space-y-2">
                  {players.map((player, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <span className="font-semibold">{player.name}</span>
                      <Badge variant="secondary">{player.score} pontos</Badge>
                    </div>
                  ))}
                </div>
                <Button size="lg" className="w-full" onClick={() => setShowQuiz(true)}>
                  Começar Quiz em Grupo
                </Button>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Quiz Section */}
      {!showQuiz && !showMultiplayer && (
        <Card className="p-8 bg-gradient-to-r from-secondary/30 to-accent/30 border-2 border-secondary">
          <div className="text-center space-y-4">
            <div className="text-5xl animate-bounce">🎯</div>
            <h3 className="text-2xl font-bold">Quiz Interativo</h3>
            <p className="text-muted-foreground">30+ perguntas para testar seus conhecimentos!</p>
            <Button size="lg" className="gap-2" onClick={() => setShowQuiz(true)}>
              <Star className="w-5 h-5" />
              Começar Quiz Solo
            </Button>
          </div>
        </Card>
      )}

      {showQuiz && !quizComplete && (
        <Card className="p-8 bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-primary">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <Badge className="text-base px-4 py-2">
                Pergunta {currentQuestion + 1} de {quizQuestions.length}
              </Badge>
              <Badge className="text-base px-4 py-2 bg-secondary">
                Dificuldade: {quizQuestions[currentQuestion].difficulty}
              </Badge>
            </div>

            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold leading-relaxed">{quizQuestions[currentQuestion].question}</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quizQuestions[currentQuestion].options.map((option) => (
                <Button
                  key={option}
                  variant={selectedAnswer === option ? "default" : "outline"}
                  className="h-auto p-6 text-lg"
                  onClick={() => handleAnswer(option)}
                  disabled={showFeedback}
                >
                  {option}
                </Button>
              ))}
            </div>

            {showFeedback && (
              <Card
                className={`p-6 border-2 ${selectedAnswer === quizQuestions[currentQuestion].correct ? "border-green-500 bg-green-500/10" : "border-red-500 bg-red-500/10"}`}
              >
                <div className="flex items-start gap-4">
                  {selectedAnswer === quizQuestions[currentQuestion].correct ? (
                    <CheckCircle className="w-8 h-8 text-green-500 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-8 h-8 text-red-500 flex-shrink-0" />
                  )}
                  <div className="space-y-2">
                    <h4 className="text-xl font-bold">
                      {selectedAnswer === quizQuestions[currentQuestion].correct
                        ? "Correto!"
                        : "Ops! Não foi dessa vez"}
                    </h4>
                    {selectedAnswer !== quizQuestions[currentQuestion].correct && (
                      <p className="text-base">
                        A resposta correta é: <strong>{quizQuestions[currentQuestion].correct}</strong>
                      </p>
                    )}
                    <p className="text-base leading-relaxed">{quizQuestions[currentQuestion].explanation}</p>
                    <Button onClick={nextQuestion} className="mt-4">
                      {currentQuestion < quizQuestions.length - 1 ? "Próxima Pergunta" : "Ver Resultado"}
                    </Button>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </Card>
      )}

      {quizComplete && (
        <Card className="p-8 bg-gradient-to-br from-accent/30 to-secondary/30 border-2 border-accent">
          <div className="text-center space-y-6">
            <div className="text-7xl animate-bounce">
              {answers.filter((a) => a).length >= quizQuestions.length * 0.7 ? "🏆" : "⭐"}
            </div>
            <h2 className="text-4xl font-bold">Quiz Completo!</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-6 bg-green-500/20 border-2 border-green-500">
                <div className="text-4xl font-bold text-green-500">{answers.filter((a) => a).length}</div>
                <p className="text-lg font-semibold mt-2">Acertos</p>
              </Card>

              <Card className="p-6 bg-red-500/20 border-2 border-red-500">
                <div className="text-4xl font-bold text-red-500">{answers.filter((a) => !a).length}</div>
                <p className="text-lg font-semibold mt-2">Erros</p>
              </Card>

              <Card className="p-6 bg-primary/20 border-2 border-primary">
                <div className="text-4xl font-bold text-primary">
                  {Math.round((answers.filter((a) => a).length / quizQuestions.length) * 100)}%
                </div>
                <p className="text-lg font-semibold mt-2">Aproveitamento</p>
              </Card>
            </div>

            <Card className="p-6 bg-muted">
              <h3 className="text-xl font-bold mb-4">Seu Desempenho</h3>
              <div className="space-y-2 text-left">
                {answers.filter((a) => a).length >= quizQuestions.length * 0.9 && (
                  <div className="flex items-center gap-3 p-3 bg-yellow-500/20 rounded-lg">
                    <Award className="w-6 h-6 text-yellow-500" />
                    <span className="font-semibold">Mestre do Espaço! Você é incrível!</span>
                  </div>
                )}
                {answers.filter((a) => a).length >= quizQuestions.length * 0.7 &&
                  answers.filter((a) => a).length < quizQuestions.length * 0.9 && (
                    <div className="flex items-center gap-3 p-3 bg-green-500/20 rounded-lg">
                      <Trophy className="w-6 h-6 text-green-500" />
                      <span className="font-semibold">Excelente! Você sabe muito sobre o espaço!</span>
                    </div>
                  )}
                {answers.filter((a) => a).length >= quizQuestions.length * 0.5 &&
                  answers.filter((a) => a).length < quizQuestions.length * 0.7 && (
                    <div className="flex items-center gap-3 p-3 bg-blue-500/20 rounded-lg">
                      <Star className="w-6 h-6 text-blue-500" />
                      <span className="font-semibold">Bom trabalho! Continue estudando!</span>
                    </div>
                  )}
                {answers.filter((a) => a).length < quizQuestions.length * 0.5 && (
                  <div className="flex items-center gap-3 p-3 bg-orange-500/20 rounded-lg">
                    <span className="font-semibold">
                      Continue explorando! Cada erro é uma oportunidade de aprender!
                    </span>
                  </div>
                )}
              </div>
            </Card>

            <div className="flex gap-4 justify-center">
              <Button size="lg" onClick={restartQuiz} className="gap-2">
                Jogar Novamente
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                  setShowQuiz(false)
                  setQuizComplete(false)
                }}
              >
                Voltar
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
