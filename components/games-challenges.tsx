"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Gamepad2, Trophy, Star, Zap, Target, Award, ArrowLeft, CheckCircle2, XCircle } from "lucide-react"
import SuryaMascot from "@/components/surya-mascot"

const quizQuestions = [
  {
    question: "Qual é o planeta mais próximo do Sol?",
    options: ["Vênus", "Mercúrio", "Marte", "Terra"],
    correct: 1,
    explanation: "Mercúrio é o planeta mais próximo do Sol, a apenas 58 milhões de km!",
  },
  {
    question: "O que causa as auroras boreais?",
    options: ["Raios", "Partículas solares", "Nuvens coloridas", "Estrelas cadentes"],
    correct: 1,
    explanation: "Auroras são causadas por partículas solares colidindo com nossa atmosfera!",
  },
  {
    question: "Quantos planetas existem no Sistema Solar?",
    options: ["7", "8", "9", "10"],
    correct: 1,
    explanation: "Existem 8 planetas no Sistema Solar. Plutão foi reclassificado como planeta anão!",
  },
  {
    question: "Qual é o maior planeta do Sistema Solar?",
    options: ["Saturno", "Netuno", "Júpiter", "Urano"],
    correct: 2,
    explanation: "Júpiter é o maior planeta, tão grande que caberiam 1.300 Terras dentro dele!",
  },
  {
    question: "O que são manchas solares?",
    options: ["Buracos no Sol", "Áreas mais frias", "Nuvens espaciais", "Planetas pequenos"],
    correct: 1,
    explanation: "Manchas solares são áreas mais frias na superfície do Sol, com intensa atividade magnética!",
  },
]

const memoryCards = [
  { id: 1, emoji: "🌍", name: "Terra" },
  { id: 2, emoji: "🪐", name: "Saturno" },
  { id: 3, emoji: "☀️", name: "Sol" },
  { id: 4, emoji: "🌙", name: "Lua" },
  { id: 5, emoji: "⭐", name: "Estrela" },
  { id: 6, emoji: "🚀", name: "Foguete" },
  { id: 7, emoji: "🛸", name: "UFO" },
  { id: 8, emoji: "👨‍🚀", name: "Astronauta" },
]

export default function GamesChallenges() {
  const [userPoints, setUserPoints] = useState(285)
  const [userBadges, setUserBadges] = useState(["🏆", "⭐", "🌟", "💫"])
  const [activeGame, setActiveGame] = useState<string | null>(null)

  // Quiz game state
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [quizScore, setQuizScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)

  // Memory game state
  const [memoryGameCards, setMemoryGameCards] = useState<any[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [matchedCards, setMatchedCards] = useState<number[]>([])
  const [memoryMoves, setMemoryMoves] = useState(0)
  const [memoryCompleted, setMemoryCompleted] = useState(false)

  const games = [
    {
      id: "planet-quiz",
      title: "Quiz dos Planetas",
      description: "Teste seus conhecimentos sobre os planetas do sistema solar!",
      icon: "🪐",
      difficulty: "Médio",
      points: 75,
      color: "bg-blue-500",
    },
    {
      id: "space-memory",
      title: "Memória Espacial",
      description: "Jogo de memória com fenômenos espaciais e planetas!",
      icon: "🧠",
      difficulty: "Fácil",
      points: 50,
      color: "bg-pink-500",
    },
  ]

  const initMemoryGame = () => {
    const duplicatedCards = [...memoryCards, ...memoryCards]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({ ...card, uniqueId: index }))
    setMemoryGameCards(duplicatedCards)
    setFlippedCards([])
    setMatchedCards([])
    setMemoryMoves(0)
    setMemoryCompleted(false)
  }

  const handleMemoryCardClick = (uniqueId: number) => {
    if (flippedCards.length === 2 || flippedCards.includes(uniqueId) || matchedCards.includes(uniqueId)) {
      return
    }

    const newFlipped = [...flippedCards, uniqueId]
    setFlippedCards(newFlipped)

    if (newFlipped.length === 2) {
      setMemoryMoves(memoryMoves + 1)
      const [first, second] = newFlipped
      const firstCard = memoryGameCards.find((c) => c.uniqueId === first)
      const secondCard = memoryGameCards.find((c) => c.uniqueId === second)

      if (firstCard.id === secondCard.id) {
        setTimeout(() => {
          setMatchedCards([...matchedCards, first, second])
          setFlippedCards([])

          if (matchedCards.length + 2 === memoryGameCards.length) {
            setMemoryCompleted(true)
            setUserPoints(userPoints + 50)
          }
        }, 500)
      } else {
        setTimeout(() => {
          setFlippedCards([])
        }, 1000)
      }
    }
  }

  const handleQuizAnswer = (answerIndex: number) => {
    if (showResult) return

    setSelectedAnswer(answerIndex)
    setShowResult(true)

    if (answerIndex === quizQuestions[currentQuestion].correct) {
      setQuizScore(quizScore + 1)
    }
  }

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      setQuizCompleted(true)
      const earnedPoints = quizScore * 15
      setUserPoints(userPoints + earnedPoints)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setQuizScore(0)
    setQuizCompleted(false)
  }

  const startGame = (gameId: string) => {
    setActiveGame(gameId)
    if (gameId === "space-memory") {
      initMemoryGame()
    } else if (gameId === "planet-quiz") {
      resetQuiz()
    }
  }

  if (activeGame === "planet-quiz") {
    if (quizCompleted) {
      const percentage = Math.round((quizScore / quizQuestions.length) * 100)
      return (
        <div className="space-y-6 animate-in fade-in duration-500">
          <Card className="p-8 text-center bg-gradient-to-br from-primary/30 to-accent/30 border-2 border-primary">
            <div className="text-6xl mb-4 animate-float">🏆</div>
            <h2 className="text-4xl font-bold mb-2">Quiz Concluído!</h2>
            <p className="text-lg text-muted-foreground">
              Você acertou {quizScore} de {quizQuestions.length} perguntas
            </p>
          </Card>

          <Card className="p-8 text-center">
            <div className="text-8xl mb-6">{percentage >= 80 ? "🌟" : percentage >= 60 ? "⭐" : "💫"}</div>
            <h3 className="text-3xl font-bold mb-4">
              {percentage >= 80 ? "Excelente!" : percentage >= 60 ? "Muito Bom!" : "Continue Praticando!"}
            </h3>
            <p className="text-xl mb-6">Sua pontuação: {percentage}%</p>
            <Badge className="text-lg px-6 py-2 bg-primary">+{quizScore * 15} pontos</Badge>
          </Card>

          <div className="flex gap-4 justify-center">
            <Button size="lg" onClick={resetQuiz} className="gap-2">
              <Gamepad2 className="w-5 h-5" />
              Jogar Novamente
            </Button>
            <Button size="lg" variant="outline" onClick={() => setActiveGame(null)} className="gap-2">
              <ArrowLeft className="w-5 h-5" />
              Voltar aos Jogos
            </Button>
          </div>
        </div>
      )
    }

    const question = quizQuestions[currentQuestion]
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <Card className="p-8 text-center bg-gradient-to-br from-blue-500/30 to-purple-500/30 border-2 border-blue-500">
          <div className="text-6xl mb-4 animate-float">🪐</div>
          <h2 className="text-4xl font-bold mb-2">Quiz dos Planetas</h2>
          <p className="text-lg text-muted-foreground">
            Pergunta {currentQuestion + 1} de {quizQuestions.length}
          </p>
        </Card>

        <Card className="p-8">
          <div className="mb-6">
            <div className="h-2 bg-muted rounded-full overflow-hidden mb-4">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>
                Pontuação: {quizScore}/{currentQuestion + (showResult ? 1 : 0)}
              </span>
              <span>
                {currentQuestion + 1}/{quizQuestions.length}
              </span>
            </div>
          </div>

          <h3 className="text-2xl font-bold mb-6 text-center text-balance">{question.question}</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index
              const isCorrect = index === question.correct
              const showCorrect = showResult && isCorrect
              const showWrong = showResult && isSelected && !isCorrect

              return (
                <Button
                  key={index}
                  variant="outline"
                  size="lg"
                  onClick={() => handleQuizAnswer(index)}
                  disabled={showResult}
                  className={`h-auto p-6 text-lg ${
                    showCorrect
                      ? "bg-green-500/20 border-green-500 border-2"
                      : showWrong
                        ? "bg-red-500/20 border-red-500 border-2"
                        : isSelected
                          ? "border-primary border-2"
                          : ""
                  }`}
                >
                  <div className="flex items-center gap-3 w-full">
                    <span className="flex-1 text-left">{option}</span>
                    {showCorrect && <CheckCircle2 className="w-6 h-6 text-green-500" />}
                    {showWrong && <XCircle className="w-6 h-6 text-red-500" />}
                  </div>
                </Button>
              )
            })}
          </div>

          {showResult && (
            <Card className="p-6 bg-primary/10 border-2 border-primary mb-6">
              <p className="text-base leading-relaxed">{question.explanation}</p>
            </Card>
          )}

          <div className="flex gap-4 justify-between">
            <Button variant="outline" onClick={() => setActiveGame(null)} className="gap-2">
              <ArrowLeft className="w-5 h-5" />
              Sair
            </Button>
            {showResult && (
              <Button onClick={nextQuestion} className="gap-2">
                {currentQuestion < quizQuestions.length - 1 ? "Próxima Pergunta" : "Ver Resultado"}
              </Button>
            )}
          </div>
        </Card>
      </div>
    )
  }

  if (activeGame === "space-memory") {
    if (memoryCompleted) {
      return (
        <div className="space-y-6 animate-in fade-in duration-500">
          <Card className="p-8 text-center bg-gradient-to-br from-pink-500/30 to-purple-500/30 border-2 border-pink-500">
            <div className="text-6xl mb-4 animate-float">🎉</div>
            <h2 className="text-4xl font-bold mb-2">Parabéns!</h2>
            <p className="text-lg text-muted-foreground">Você completou o jogo da memória!</p>
          </Card>

          <Card className="p-8 text-center">
            <div className="text-8xl mb-6">🏆</div>
            <h3 className="text-3xl font-bold mb-4">Jogo Concluído!</h3>
            <p className="text-xl mb-2">Movimentos: {memoryMoves}</p>
            <p className="text-lg text-muted-foreground mb-6">
              {memoryMoves <= 12 ? "Memória incrível! 🌟" : memoryMoves <= 16 ? "Muito bem! ⭐" : "Bom trabalho! 💫"}
            </p>
            <Badge className="text-lg px-6 py-2 bg-primary">+50 pontos</Badge>
          </Card>

          <div className="flex gap-4 justify-center">
            <Button size="lg" onClick={() => initMemoryGame()} className="gap-2">
              <Gamepad2 className="w-5 h-5" />
              Jogar Novamente
            </Button>
            <Button size="lg" variant="outline" onClick={() => setActiveGame(null)} className="gap-2">
              <ArrowLeft className="w-5 h-5" />
              Voltar aos Jogos
            </Button>
          </div>
        </div>
      )
    }

    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <Card className="p-8 text-center bg-gradient-to-br from-pink-500/30 to-purple-500/30 border-2 border-pink-500">
          <div className="text-6xl mb-4 animate-float">🧠</div>
          <h2 className="text-4xl font-bold mb-2">Memória Espacial</h2>
          <p className="text-lg text-muted-foreground">Encontre os pares de cartas!</p>
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="text-lg font-semibold">Movimentos: {memoryMoves}</div>
            <div className="text-lg font-semibold">
              Pares: {matchedCards.length / 2}/{memoryCards.length}
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
            {memoryGameCards.map((card) => {
              const isFlipped = flippedCards.includes(card.uniqueId) || matchedCards.includes(card.uniqueId)
              const isMatched = matchedCards.includes(card.uniqueId)

              return (
                <button
                  key={card.uniqueId}
                  onClick={() => handleMemoryCardClick(card.uniqueId)}
                  disabled={isMatched}
                  className={`aspect-square rounded-lg border-2 text-5xl font-bold transition-all duration-300 ${
                    isFlipped
                      ? isMatched
                        ? "bg-green-500/20 border-green-500"
                        : "bg-primary/20 border-primary"
                      : "bg-muted border-border hover:border-primary"
                  }`}
                >
                  {isFlipped ? card.emoji : "?"}
                </button>
              )
            })}
          </div>

          <div className="flex gap-4 justify-between mt-6">
            <Button variant="outline" onClick={() => setActiveGame(null)} className="gap-2">
              <ArrowLeft className="w-5 h-5" />
              Sair
            </Button>
            <Button variant="outline" onClick={initMemoryGame} className="gap-2 bg-transparent">
              <Zap className="w-5 h-5" />
              Reiniciar
            </Button>
          </div>
        </Card>

        <SuryaMascot message="Encontre os pares de cartas! Quanto menos movimentos, melhor sua pontuação! 🧠" />
      </div>
    )
  }

  const weeklyChallenges = [
    {
      id: "week-1",
      title: "Explorador Iniciante",
      description: "Complete 5 quizzes sobre o sistema solar",
      progress: 3,
      total: 5,
      reward: "🥉 Medalha de Bronze",
      points: 150,
    },
    {
      id: "week-2",
      title: "Observador Solar",
      description: "Acompanhe o clima espacial por 7 dias consecutivos",
      progress: 4,
      total: 7,
      reward: "☀️ Insígnia Solar",
      points: 200,
    },
    {
      id: "week-3",
      title: "Contador de Histórias",
      description: "Crie 3 histórias estelares completas",
      progress: 1,
      total: 3,
      reward: "📖 Insígnia de Escritor",
      points: 175,
    },
  ]

  const achievements = [
    { name: "Primeira Missão", icon: "🎯", unlocked: true },
    { name: "Explorador Espacial", icon: "🚀", unlocked: true },
    { name: "Mestre dos Planetas", icon: "🪐", unlocked: true },
    { name: "Caçador de Auroras", icon: "🌈", unlocked: false },
    { name: "Cientista Solar", icon: "🔬", unlocked: false },
    { name: "Guardião da Galáxia", icon: "🌌", unlocked: false },
  ]

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <Card className="p-8 text-center bg-gradient-to-br from-primary/30 to-accent/30 border-2 border-primary">
        <div className="text-6xl mb-4 animate-float">🎮</div>
        <h2 className="text-4xl font-bold mb-2 text-balance">Jogos e Desafios</h2>
        <p className="text-lg text-muted-foreground">Aprenda brincando e ganhe recompensas!</p>
      </Card>

      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 bg-gradient-to-br from-primary/20 to-transparent border-2 border-primary">
          <div className="flex items-center gap-3">
            <Star className="w-10 h-10 text-primary" />
            <div>
              <p className="text-3xl font-bold">{userPoints}</p>
              <p className="text-sm text-muted-foreground">Pontos Totais</p>
            </div>
          </div>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-accent/20 to-transparent border-2 border-accent">
          <div className="flex items-center gap-3">
            <Trophy className="w-10 h-10 text-accent" />
            <div>
              <p className="text-3xl font-bold">{userBadges.length}</p>
              <p className="text-sm text-muted-foreground">Insígnias Conquistadas</p>
            </div>
          </div>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-secondary/20 to-transparent border-2 border-secondary">
          <div className="flex items-center gap-3">
            <Zap className="w-10 h-10 text-secondary" />
            <div>
              <p className="text-3xl font-bold">12</p>
              <p className="text-sm text-muted-foreground">Jogos Completados</p>
            </div>
          </div>
        </Card>
      </div>

      <SuryaMascot message="Pronto para se divertir e aprender? Escolha um jogo e mostre suas habilidades de explorador espacial! 🚀" />

      {/* Games Grid */}
      <div>
        <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Gamepad2 className="w-6 h-6 text-primary" />
          Jogos Disponíveis
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {games.map((game) => (
            <Card
              key={game.id}
              className="p-6 border-2 hover:border-primary transition-all hover:scale-105 cursor-pointer"
            >
              <div className="text-5xl mb-3 animate-float">{game.icon}</div>
              <h4 className="text-xl font-bold mb-2">{game.title}</h4>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{game.description}</p>
              <div className="flex items-center justify-between mb-4">
                <Badge className={game.color}>{game.difficulty}</Badge>
                <Badge variant="outline" className="bg-transparent">
                  +{game.points} pts
                </Badge>
              </div>
              <Button className="w-full gap-2" onClick={() => startGame(game.id)}>
                <Gamepad2 className="w-4 h-4" />
                Jogar Agora
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {/* Weekly Challenges */}
      <div>
        <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Target className="w-6 h-6 text-accent" />
          Desafios Semanais
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {weeklyChallenges.map((challenge) => (
            <Card key={challenge.id} className="p-6 border-2 border-accent/50">
              <div className="flex items-start justify-between mb-3">
                <h4 className="text-lg font-bold">{challenge.title}</h4>
                <Badge className="bg-accent">+{challenge.points} pts</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{challenge.description}</p>
              <div className="mb-3">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Progresso</span>
                  <span className="font-semibold">
                    {challenge.progress}/{challenge.total}
                  </span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent rounded-full transition-all"
                    style={{ width: `${(challenge.progress / challenge.total) * 100}%` }}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Award className="w-4 h-4 text-accent" />
                <span className="font-semibold">{challenge.reward}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <Card className="p-6 bg-gradient-to-br from-secondary/20 to-primary/20 border-2 border-secondary">
        <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Trophy className="w-6 h-6 text-secondary" />
          Conquistas
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.name}
              className={`p-4 rounded-lg text-center transition-all ${
                achievement.unlocked
                  ? "bg-primary/20 border-2 border-primary"
                  : "bg-muted/50 border-2 border-muted opacity-50 grayscale"
              }`}
            >
              <div className="text-4xl mb-2">{achievement.icon}</div>
              <p className="text-xs font-semibold">{achievement.name}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Leaderboard Preview */}
      <Card className="p-6 bg-gradient-to-r from-accent/20 to-primary/20 border-2 border-accent">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-accent" />
          Ranking Global - Top 5 desta Semana
        </h3>
        <div className="space-y-3">
          {[
            { name: "Ana Silva", points: 1250, badge: "🏆" },
            { name: "Pedro Santos", points: 1180, badge: "🥈" },
            { name: "Maria Costa", points: 1050, badge: "🥉" },
            { name: "João Oliveira", points: 980, badge: "⭐" },
            { name: "Sofia Lima", points: 920, badge: "⭐" },
          ].map((player, index) => (
            <div key={player.name} className="flex items-center gap-3 p-3 bg-card rounded-lg border-2 border-border">
              <div className="text-3xl">{player.badge}</div>
              <div className="flex-1">
                <p className="font-semibold">{player.name}</p>
                <p className="text-sm text-muted-foreground">Posição #{index + 1}</p>
              </div>
              <Badge className="bg-primary">{player.points} pts</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
