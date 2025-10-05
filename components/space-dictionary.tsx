"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Volume2, Search, BookOpen, History, Rocket, AlertTriangle, Leaf } from "lucide-react"
import SuryaMascot from "@/components/surya-mascot"

export default function SpaceDictionary() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const categories = [
    { id: "all", name: "Todos", icon: BookOpen },
    { id: "terms", name: "Termos Científicos", icon: BookOpen },
    { id: "history", name: "História Espacial", icon: History },
    { id: "astronauts", name: "Astronautas", icon: Rocket },
    { id: "safety", name: "Segurança Espacial", icon: AlertTriangle },
    { id: "environment", name: "Meio Ambiente", icon: Leaf },
  ]

  const allContent = [
    // Scientific Terms
    {
      id: "solar-flare",
      category: "terms",
      term: "Erupção Solar",
      emoji: "💥",
      definition: "Uma faísca gigante do Sol! É como quando você acende um fósforo, mas milhões de vezes maior!",
      example: "As erupções solares podem afetar satélites e comunicações na Terra.",
      color: "border-orange-500",
    },
    {
      id: "aurora",
      category: "terms",
      term: "Aurora",
      emoji: "🌈",
      definition:
        "Um show de luzes coloridas no céu! Acontece quando partículas do Sol encontram a atmosfera da Terra.",
      example: "A Aurora Boreal pode ser vista em países como Noruega, Islândia e Canadá.",
      color: "border-green-500",
    },
    {
      id: "solar-wind",
      category: "terms",
      term: "Vento Solar",
      emoji: "💨",
      definition: "Um sopro invisível do Sol que viaja pelo espaço. É como o vento que você sente, mas no espaço!",
      example: "O vento solar faz as caudas dos cometas sempre apontarem para longe do Sol.",
      color: "border-blue-500",
    },
    {
      id: "satellite",
      category: "terms",
      term: "Satélite",
      emoji: "🛰️",
      definition: "Um robô que voa no espaço e manda fotos e informações para a Terra!",
      example: "Satélites nos ajudam a assistir TV, usar GPS e prever o tempo.",
      color: "border-purple-500",
    },
    {
      id: "black-hole",
      category: "terms",
      term: "Buraco Negro",
      emoji: "⚫",
      definition: "Um lugar no espaço onde a gravidade é tão forte que nem a luz consegue escapar!",
      example: "Buracos negros se formam quando estrelas muito grandes morrem.",
      color: "border-gray-700",
    },
    {
      id: "nebula",
      category: "terms",
      term: "Nebulosa",
      emoji: "🌌",
      definition: "Uma nuvem gigante de gás e poeira no espaço onde novas estrelas nascem!",
      example: "A Nebulosa de Órion é uma das mais bonitas e pode ser vista da Terra.",
      color: "border-purple-400",
    },

    // Space History
    {
      id: "moon-landing",
      category: "history",
      term: "Chegada à Lua (1969)",
      emoji: "🌕",
      definition: "Em 20 de julho de 1969, Neil Armstrong foi o primeiro humano a pisar na Lua!",
      example: "Ele disse: 'Um pequeno passo para o homem, um salto gigante para a humanidade.'",
      color: "border-yellow-500",
    },
    {
      id: "sputnik",
      category: "history",
      term: "Sputnik 1 (1957)",
      emoji: "🛰️",
      definition: "O primeiro satélite artificial da história, lançado pela União Soviética!",
      example: "O Sputnik 1 tinha o tamanho de uma bola de basquete e orbitou a Terra por 3 meses.",
      color: "border-red-500",
    },
    {
      id: "hubble",
      category: "history",
      term: "Telescópio Hubble (1990)",
      emoji: "🔭",
      definition: "Um telescópio espacial que nos mostra imagens incríveis do universo há mais de 30 anos!",
      example: "O Hubble já tirou mais de 1,5 milhão de fotos do espaço.",
      color: "border-blue-400",
    },
    {
      id: "iss",
      category: "history",
      term: "Estação Espacial Internacional",
      emoji: "🏗️",
      definition: "Uma casa no espaço onde astronautas de vários países vivem e trabalham juntos!",
      example: "A ISS orbita a Terra a cada 90 minutos, viajando a 28.000 km/h!",
      color: "border-cyan-500",
    },
    {
      id: "voyager",
      category: "history",
      term: "Voyager 1 e 2 (1977)",
      emoji: "🚀",
      definition: "Duas sondas que exploraram os planetas distantes e agora viajam além do Sistema Solar!",
      example: "Voyager 1 é o objeto humano mais distante da Terra, a mais de 23 bilhões de km!",
      color: "border-indigo-500",
    },

    // Astronauts
    {
      id: "yuri-gagarin",
      category: "astronauts",
      term: "Yuri Gagarin",
      emoji: "👨‍🚀",
      definition: "O primeiro ser humano a ir ao espaço, em 12 de abril de 1961!",
      example: "Gagarin disse 'A Terra é azul!' quando viu nosso planeta do espaço pela primeira vez.",
      color: "border-blue-600",
    },
    {
      id: "neil-armstrong",
      category: "astronauts",
      term: "Neil Armstrong",
      emoji: "🧑‍🚀",
      definition: "O primeiro humano a pisar na Lua, comandante da missão Apollo 11!",
      example: "Armstrong era piloto de testes antes de se tornar astronauta.",
      color: "border-yellow-600",
    },
    {
      id: "valentina-tereshkova",
      category: "astronauts",
      term: "Valentina Tereshkova",
      emoji: "👩‍🚀",
      definition: "A primeira mulher a ir ao espaço, em 1963!",
      example: "Valentina orbitou a Terra 48 vezes em sua missão de 3 dias.",
      color: "border-pink-500",
    },
    {
      id: "marcos-pontes",
      category: "astronauts",
      term: "Marcos Pontes",
      emoji: "🇧🇷",
      definition: "O primeiro astronauta brasileiro a ir ao espaço, em 2006!",
      example: "Marcos Pontes passou 10 dias na Estação Espacial Internacional realizando experimentos.",
      color: "border-green-600",
    },
    {
      id: "mae-jemison",
      category: "astronauts",
      term: "Mae Jemison",
      emoji: "👩🏾‍🚀",
      definition: "A primeira mulher negra a ir ao espaço, em 1992!",
      example: "Mae é médica, engenheira e também dançarina profissional!",
      color: "border-purple-600",
    },

    // Space Safety
    {
      id: "space-debris",
      category: "safety",
      term: "Lixo Espacial",
      emoji: "🗑️",
      definition: "Pedaços de satélites velhos e foguetes que ficam flutuando no espaço!",
      example:
        "Existem mais de 34.000 pedaços de lixo espacial maiores que 10cm orbitando a Terra. Eles viajam a 28.000 km/h e podem danificar satélites e naves!",
      color: "border-red-600",
    },
    {
      id: "radiation",
      category: "safety",
      term: "Radiação Espacial",
      emoji: "☢️",
      definition: "Raios invisíveis no espaço que podem ser perigosos para astronautas!",
      example: "Astronautas usam trajes especiais e ficam protegidos dentro das naves para evitar a radiação.",
      color: "border-orange-600",
    },
    {
      id: "oxygen",
      category: "safety",
      term: "Oxigênio no Espaço",
      emoji: "💨",
      definition: "Não existe ar para respirar no espaço! Astronautas precisam levar oxigênio.",
      example:
        "Se um astronauta tirasse o capacete no espaço, desmaiaria em 15 segundos. Por isso os trajes são tão importantes!",
      color: "border-blue-700",
    },
    {
      id: "temperature",
      category: "safety",
      term: "Temperatura Extrema",
      emoji: "🌡️",
      definition: "No espaço, pode fazer muito calor (+120°C) ou muito frio (-100°C)!",
      example: "Os trajes espaciais têm sistemas especiais para manter os astronautas confortáveis.",
      color: "border-red-400",
    },
    {
      id: "microgravity",
      category: "safety",
      term: "Microgravidade",
      emoji: "🎈",
      definition: "No espaço, tudo flutua! Não existe 'em cima' ou 'embaixo'.",
      example: "Astronautas precisam se prender para dormir, senão flutuam pela nave! A comida também flutua.",
      color: "border-purple-400",
    },

    // Environment
    {
      id: "earth-protection",
      category: "environment",
      term: "Proteger a Terra",
      emoji: "🌍",
      definition: "A Terra é o único planeta com vida que conhecemos. Precisamos cuidar dela!",
      example: "Astronautas dizem que ver a Terra do espaço faz perceber como ela é frágil e preciosa.",
      color: "border-green-500",
    },
    {
      id: "pollution",
      category: "environment",
      term: "Poluição e o Espaço",
      emoji: "🏭",
      definition: "A poluição na Terra pode ser vista do espaço! Fumaça e gases poluem nossa atmosfera.",
      example:
        "Se continuarmos poluindo, em 50 anos o ar ficará muito mais difícil de respirar. Precisamos usar energia limpa!",
      color: "border-gray-600",
    },
    {
      id: "trash-mars",
      category: "environment",
      term: "Lixo em Marte",
      emoji: "♻️",
      definition: "Se jogarmos lixo em Marte, ele ficará lá para sempre! Não existe natureza para decompor.",
      example:
        "Em 2 anos, o lixo em Marte ainda estará intacto. Em 100 anos, também! Por isso missões espaciais levam todo o lixo de volta.",
      color: "border-red-500",
    },
    {
      id: "atmosphere",
      category: "environment",
      term: "Nossa Atmosfera",
      emoji: "🌫️",
      definition: "A camada de ar que protege a Terra. Sem ela, não poderíamos viver!",
      example:
        "Jogar lixo no chão e poluir o ar danifica a atmosfera. Gases poluentes criam o efeito estufa e esquentam o planeta.",
      color: "border-cyan-400",
    },
    {
      id: "renewable-energy",
      category: "environment",
      term: "Energia Limpa",
      emoji: "☀️",
      definition: "Energia do Sol, vento e água que não polui o planeta!",
      example: "Satélites usam painéis solares! Podemos fazer o mesmo na Terra para ter energia sem poluir.",
      color: "border-yellow-400",
    },
    {
      id: "water-conservation",
      category: "environment",
      term: "Economizar Água",
      emoji: "💧",
      definition: "A água é rara no universo! A Terra tem muita água, mas precisamos cuidar dela.",
      example:
        "Na Estação Espacial, astronautas reciclam até a água do suor e da urina! Aqui na Terra também devemos economizar.",
      color: "border-blue-400",
    },
    {
      id: "recycling",
      category: "environment",
      term: "Reciclagem",
      emoji: "♻️",
      definition: "Transformar lixo em coisas novas ao invés de jogar fora!",
      example:
        "Se não reciclarmos, em 10 anos teremos montanhas de lixo. Reciclar papel salva árvores, reciclar plástico salva oceanos!",
      color: "border-green-600",
    },
    {
      id: "deforestation",
      category: "environment",
      term: "Desmatamento",
      emoji: "🌳",
      definition: "Cortar árvores sem plantar novas. Isso prejudica o ar que respiramos!",
      example:
        "Árvores produzem oxigênio e absorvem CO2. Sem elas, o ar fica poluído e o clima muda. Astronautas veem o desmatamento do espaço!",
      color: "border-brown-600",
    },
  ]

  const filteredContent = allContent.filter((item) => {
    const matchesSearch =
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <Card className="p-8 text-center bg-gradient-to-br from-primary/30 to-accent/30 border-2 border-primary">
        <div className="text-6xl mb-4 animate-float">📖</div>
        <h2 className="text-4xl font-bold mb-2 text-balance">Dicionário do Espaço</h2>
        <p className="text-lg text-muted-foreground">
          Aprenda sobre ciência, história, astronautas e como cuidar do nosso planeta!
        </p>
      </Card>

      <SuryaMascot
        message="Explore o conhecimento espacial! Aqui você encontra termos científicos, história da exploração espacial, astronautas famosos, segurança no espaço e dicas para cuidar do nosso planeta Terra!"
        expression="thinking"
      />

      {/* Search */}
      <Card className="p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Buscar... (ex: aurora, Yuri Gagarin, lixo espacial)"
            className="pl-10 h-12 text-base"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </Card>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-3">
        {categories.map((cat) => {
          const Icon = cat.icon
          return (
            <Button
              key={cat.id}
              variant={selectedCategory === cat.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(cat.id)}
              className="gap-2"
            >
              <Icon className="w-4 h-4" />
              {cat.name}
            </Button>
          )
        })}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredContent.map((item) => (
          <Card key={item.id} className={`p-6 border-2 ${item.color} hover:scale-105 transition-all`}>
            <div className="flex items-start gap-4">
              <div className="text-5xl animate-float flex-shrink-0">{item.emoji}</div>
              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">{item.term}</h3>
                  <Button size="sm" variant="ghost" className="gap-2">
                    <Volume2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm font-semibold text-primary mb-1">O que é?</p>
                    <p className="text-sm leading-relaxed">{item.definition}</p>
                  </div>

                  <div className="p-3 bg-secondary/20 rounded-lg">
                    <p className="text-sm font-semibold text-secondary mb-1">
                      {item.category === "environment" || item.category === "safety" ? "Importante saber:" : "Exemplo:"}
                    </p>
                    <p className="text-sm leading-relaxed">{item.example}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredContent.length === 0 && (
        <Card className="p-12 text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold mb-2">Nenhum conteúdo encontrado</h3>
          <p className="text-muted-foreground">Tente buscar por outro termo ou mude a categoria!</p>
        </Card>
      )}

      {/* Fun Fact */}
      <Card className="p-6 bg-gradient-to-r from-accent/20 to-secondary/20 border-2 border-accent">
        <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
          <span className="text-2xl">💡</span>
          Dica do Surya
        </h3>
        <p className="text-base leading-relaxed">
          Cada informação aqui é baseada em dados reais da NASA e outras agências espaciais! Aprender sobre o espaço nos
          ajuda a entender melhor nosso planeta e como cuidar dele. Continue explorando e compartilhe o que aprendeu com
          seus amigos! 🚀🌍
        </p>
      </Card>
    </div>
  )
}
