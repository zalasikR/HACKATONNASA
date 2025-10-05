"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles, Users, Palette, ArrowRight, ArrowLeft, BookOpen, Trophy, Volume2, Leaf } from "lucide-react"
import SuryaMascot from "@/components/surya-mascot"

const playSound = (soundType: string) => {
  // Simulating sound effects with Audio API
  const sounds: { [key: string]: number[] } = {
    space: [440, 523, 659], // Space whoosh
    success: [523, 659, 784], // Success chime
    alert: [392, 349, 330], // Alert sound
    nature: [330, 392, 440], // Nature sound
  }

  if (typeof window !== "undefined" && sounds[soundType]) {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    sounds[soundType].forEach((freq, i) => {
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      oscillator.frequency.value = freq
      oscillator.type = "sine"
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime + i * 0.1)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + i * 0.1 + 0.3)
      oscillator.start(audioContext.currentTime + i * 0.1)
      oscillator.stop(audioContext.currentTime + i * 0.1 + 0.3)
    })
  }
}

const storyDatabase = {
  "astronaut-solar-system-sun": {
    title: "A Missão Solar do Astronauta",
    simpleTitle: "O Astronauta e o Sol",
    chapters: [
      {
        scene: "🚀",
        text: "A astronauta Luna estava na Estação Espacial Internacional quando recebeu uma missão especial: estudar uma grande erupção solar que estava acontecendo!",
        simpleText:
          "Luna é uma astronauta. Ela mora numa casa no espaço. O Sol fez uma explosão grande e ela precisa estudar!",
        fact: "A Estação Espacial orbita a Terra a 28.000 km/h!",
        simpleFact: "A casa espacial anda muito rápido ao redor da Terra!",
        sound: "space",
      },
      {
        scene: "☀️",
        text: "Através da janela, Luna observou o Sol brilhante. De repente, viu uma enorme explosão de luz - era uma erupção solar classe X! Partículas solares começaram a viajar em direção à Terra.",
        simpleText:
          "Luna olhou pela janela e viu o Sol. O Sol fez uma explosão muito grande! Pedacinhos do Sol começaram a viajar para a Terra.",
        fact: "Erupções solares classe X são as mais poderosas e podem afetar satélites!",
        simpleFact: "As explosões do Sol são muito fortes e podem quebrar coisas no espaço!",
        sound: "alert",
      },
      {
        scene: "🛰️",
        text: "Luna rapidamente acionou os instrumentos científicos da estação. Ela precisava medir a velocidade das partículas solares e alertar a equipe na Terra sobre possíveis auroras boreais.",
        simpleText:
          "Luna usou máquinas especiais para medir a velocidade dos pedacinhos do Sol. Ela avisou as pessoas na Terra que iam ver luzes bonitas no céu!",
        fact: "As partículas solares viajam a mais de 1 milhão de km/h!",
        simpleFact: "Os pedacinhos do Sol viajam super rápido!",
        sound: "space",
      },
      {
        scene: "🌍",
        text: "Graças aos dados coletados por Luna, cientistas na Terra puderam prever lindas auroras boreais! Milhares de pessoas ao redor do mundo puderam ver o espetáculo de luzes coloridas no céu.",
        simpleText:
          "Por causa do trabalho de Luna, muitas pessoas viram luzes coloridas lindas no céu! Verde, rosa e roxo dançando!",
        fact: "As auroras acontecem quando partículas solares colidem com nossa atmosfera!",
        simpleFact: "As luzes coloridas aparecem quando os pedacinhos do Sol batem no ar da Terra!",
        sound: "success",
      },
      {
        scene: "🌱",
        text: "Mas Luna também aprendeu algo importante: no espaço, não existe lixo! Tudo que os astronautas usam é reciclado ou trazido de volta para a Terra. Se deixassem lixo no espaço, ele poderia bater em satélites e causar grandes problemas.",
        simpleText:
          "Luna aprendeu: no espaço não pode ter lixo! Se jogar lixo no espaço, ele pode bater nas máquinas e quebrar tudo. Por isso, astronautas guardam todo o lixo!",
        fact: "Um pedaço de lixo espacial do tamanho de uma moeda pode destruir um satélite!",
        simpleFact: "Um lixinho pequeno no espaço pode quebrar coisas grandes!",
        sound: "alert",
        isEnvironmental: true,
        environmentalImpact: {
          action: "Jogar lixo no espaço",
          consequence:
            "Lixo espacial viaja a 28.000 km/h e pode destruir satélites, deixando milhões de pessoas sem internet, GPS e TV!",
          simpleConsequence:
            "O lixo no espaço anda muito rápido e pode quebrar as máquinas que fazem a internet funcionar!",
          visual: "💥🛰️",
        },
      },
      {
        scene: "🏆",
        text: "A missão foi um sucesso! Luna ajudou a proteger satélites e avisar as pessoas sobre o clima espacial. Ela ganhou uma medalha especial da NASA por sua dedicação à ciência espacial!",
        simpleText:
          "Luna fez um trabalho incrível! Ela ajudou a proteger as máquinas no espaço e ganhou uma medalha de ouro!",
        fact: "Astronautas reais monitoram o clima espacial todos os dias!",
        simpleFact: "Astronautas de verdade olham o Sol e o espaço todo dia!",
        sound: "success",
      },
    ],
  },
  "scientist-earth-aurora": {
    title: "O Mistério das Auroras",
    simpleTitle: "A Cientista e as Luzes Coloridas",
    chapters: [
      {
        scene: "🔬",
        text: "A cientista Dra. Aurora trabalhava em um observatório no Alasca, estudando as luzes misteriosas que dançavam no céu noturno - as auroras boreais!",
        simpleText:
          "A Dra. Aurora estuda luzes coloridas que aparecem no céu à noite. Ela trabalha num lugar muito frio!",
        fact: "As auroras podem ter várias cores: verde, rosa, vermelho e até azul!",
        simpleFact: "As luzes coloridas podem ser verdes, rosas, vermelhas e azuis!",
        sound: "space",
      },
      {
        scene: "🌌",
        text: "Uma noite especial, o céu explodiu em cores! Verde, rosa e roxo dançavam como cortinas gigantes. A Dra. Aurora sabia que isso significava que uma tempestade solar havia chegado à Terra.",
        simpleText:
          "Uma noite, o céu ficou cheio de cores! Verde, rosa e roxo dançando como cortinas. Isso aconteceu porque o Sol mandou pedacinhos para a Terra!",
        fact: "As auroras são mais intensas durante tempestades solares!",
        simpleFact: "As luzes ficam mais bonitas quando o Sol faz explosões!",
        sound: "success",
      },
      {
        scene: "📡",
        text: "Ela ligou seus instrumentos científicos e começou a medir o campo magnético da Terra. Os dados mostravam que partículas do Sol estavam colidindo com nossa atmosfera a 400 km de altitude!",
        simpleText:
          "Ela usou máquinas especiais para medir. Os pedacinhos do Sol estavam batendo no ar da Terra lá no alto!",
        fact: "O campo magnético da Terra nos protege das partículas solares!",
        simpleFact: "A Terra tem um escudo invisível que nos protege do Sol!",
        sound: "space",
      },
      {
        scene: "🌍",
        text: "A Dra. Aurora descobriu que as auroras não acontecem só no Polo Norte! No Polo Sul, ao mesmo tempo, havia auroras austrais com as mesmas cores e padrões.",
        simpleText: "Ela descobriu que as luzes coloridas aparecem em cima e embaixo da Terra ao mesmo tempo!",
        fact: "Auroras boreais e austrais são como espelhos nos dois polos!",
        simpleFact: "As luzes de cima e de baixo da Terra são iguais!",
        sound: "success",
      },
      {
        scene: "🏭",
        text: "Mas a Dra. Aurora também estudava a poluição do ar. Ela descobriu que quando jogamos lixo no chão ou quando fábricas soltam fumaça, isso suja o ar que respiramos. Em 2 anos, o ar pode ficar tão sujo que fica difícil ver as estrelas e as auroras!",
        simpleText:
          "A Dra. Aurora também estuda o ar. Quando jogamos lixo no chão ou quando carros soltam fumaça, o ar fica sujo. Depois de um tempo, não conseguimos ver as estrelas!",
        fact: "A poluição do ar pode reduzir a visibilidade das estrelas em até 80%!",
        simpleFact: "O ar sujo esconde as estrelas do céu!",
        sound: "alert",
        isEnvironmental: true,
        environmentalImpact: {
          action: "Jogar lixo no chão e poluir o ar",
          consequence:
            "Em 2 anos, a poluição pode tornar o ar tão sujo que não conseguimos ver estrelas, auroras, e fica difícil respirar!",
          simpleConsequence: "Se sujarmos o ar, em 2 anos não vamos ver as estrelas e vai ser difícil respirar!",
          visual: "🏭💨😷",
        },
      },
      {
        scene: "📚",
        text: "Ela publicou sua pesquisa e agora crianças do mundo todo aprendem sobre as auroras! A Dra. Aurora provou que a ciência pode desvendar os mistérios mais bonitos do universo.",
        simpleText:
          "Ela escreveu um livro e agora todas as crianças aprendem sobre as luzes coloridas! A ciência é incrível!",
        fact: "Você pode ver auroras de aviões e até da Estação Espacial!",
        simpleFact: "Você pode ver as luzes coloridas de aviões e do espaço!",
        sound: "success",
      },
    ],
  },
  "pilot-space-station-satellite": {
    title: "O Piloto e o Satélite Perdido",
    simpleTitle: "O Piloto que Conserta Máquinas no Espaço",
    chapters: [
      {
        scene: "👨‍✈️",
        text: "O piloto Capitão Estrela comandava uma nave espacial especial que consertava satélites em órbita. Um dia, recebeu um chamado urgente: um satélite de comunicação estava fora de controle!",
        simpleText:
          "O Capitão Estrela pilota uma nave que conserta máquinas no espaço. Um dia, uma máquina quebrou e ele precisou ajudar!",
        fact: "Existem mais de 5.000 satélites ativos orbitando a Terra!",
        simpleFact: "Existem mais de 5.000 máquinas voando ao redor da Terra!",
        sound: "space",
      },
      {
        scene: "🛰️",
        text: "Ele pilotou sua nave até o satélite perdido. O problema era sério: uma tempestade solar havia danificado os painéis solares do satélite, e ele estava girando sem controle!",
        simpleText:
          "Ele voou até a máquina quebrada. O Sol fez uma explosão e quebrou as placas que dão energia para a máquina!",
        fact: "Satélites usam painéis solares para gerar energia!",
        simpleFact: "As máquinas no espaço usam a luz do Sol para funcionar!",
        sound: "alert",
      },
      {
        scene: "🔧",
        text: "Com muito cuidado, o Capitão Estrela usou o braço robótico da nave para estabilizar o satélite. Depois, ele saiu em uma caminhada espacial para consertar os painéis danificados.",
        simpleText: "Ele usou um braço de robô para segurar a máquina. Depois, ele saiu da nave para consertar!",
        fact: "Caminhadas espaciais podem durar até 8 horas!",
        simpleFact: "Astronautas podem ficar fora da nave por 8 horas!",
        sound: "space",
      },
      {
        scene: "☀️",
        text: "Enquanto trabalhava, ele viu o Sol nascendo sobre a Terra - um espetáculo incrível! Mas tinha que trabalhar rápido, pois outra tempestade solar estava a caminho.",
        simpleText: "Enquanto trabalhava, ele viu o Sol nascendo. Que lindo! Mas ele precisava ser rápido!",
        fact: "Na órbita, o Sol nasce a cada 90 minutos!",
        simpleFact: "No espaço, o Sol nasce muitas vezes por dia!",
        sound: "success",
      },
      {
        scene: "🗑️",
        text: "Durante o conserto, o Capitão Estrela viu muito lixo espacial flutuando: pedaços de foguetes velhos, satélites quebrados. Ele explicou para as crianças na Terra: 'Se continuarmos deixando lixo no espaço, em 2 anos teremos tanto lixo que será perigoso viajar ao espaço!'",
        simpleText:
          "Ele viu muito lixo no espaço: pedaços de foguetes velhos e máquinas quebradas. Se não cuidarmos, em 2 anos vai ter tanto lixo que vai ser perigoso ir ao espaço!",
        fact: "Existem mais de 34.000 pedaços de lixo espacial maiores que 10 cm orbitando a Terra!",
        simpleFact: "Tem mais de 34.000 pedaços de lixo voando ao redor da Terra!",
        sound: "alert",
        isEnvironmental: true,
        environmentalImpact: {
          action: "Deixar lixo e satélites quebrados no espaço",
          consequence:
            "Em 2 anos, o lixo espacial pode criar uma 'nuvem de lixo' que impede novos lançamentos e destrói satélites funcionais!",
          simpleConsequence:
            "Se deixarmos lixo no espaço, em 2 anos vai ter tanto lixo que não vamos conseguir mandar mais foguetes!",
          visual: "🚀💥🗑️",
        },
      },
      {
        scene: "✅",
        text: "Missão cumprida! O satélite voltou a funcionar perfeitamente. Milhões de pessoas na Terra puderam voltar a usar internet e telefone graças ao trabalho corajoso do Capitão Estrela!",
        simpleText: "Missão completa! A máquina voltou a funcionar. Milhões de pessoas puderam usar internet de novo!",
        fact: "Satélites são essenciais para comunicação, GPS e previsão do tempo!",
        simpleFact: "As máquinas no espaço ajudam a gente a usar internet, mapas e saber se vai chover!",
        sound: "success",
      },
    ],
  },
  "farmer-earth-sun": {
    title: "O Fazendeiro e o Clima Espacial",
    simpleTitle: "O Fazendeiro que Aprendeu sobre o Sol",
    chapters: [
      {
        scene: "👨‍🌾",
        text: "O fazendeiro João cuidava de uma grande plantação de milho. Ele sempre observava o céu e o Sol para saber quando plantar e colher. Mas ele não sabia que o Sol influenciava muito mais do que o clima!",
        simpleText:
          "João é um fazendeiro. Ele planta milho e sempre olha o céu e o Sol. Mas ele não sabia que o Sol faz muitas coisas!",
        fact: "O Sol é responsável por toda a energia que chega à Terra!",
        simpleFact: "Toda a energia da Terra vem do Sol!",
        sound: "nature",
      },
      {
        scene: "☀️",
        text: "Um dia, João notou que suas plantas estavam crescendo de forma estranha. Ele procurou ajuda de uma cientista que explicou: o Sol estava em um período de alta atividade, com muitas manchas solares!",
        simpleText:
          "Um dia, as plantas de João estavam crescendo estranho. Uma cientista explicou: o Sol estava fazendo muitas coisas!",
        fact: "Manchas solares são áreas mais frias na superfície do Sol!",
        simpleFact: "Manchas solares são lugares mais frios no Sol!",
        sound: "space",
      },
      {
        scene: "🌱",
        text: "A cientista ensinou João sobre o clima espacial. Ela explicou que erupções solares podem afetar o campo magnético da Terra, e isso influencia até o crescimento das plantas!",
        simpleText: "A cientista ensinou João que as explosões do Sol podem mudar como as plantas crescem!",
        fact: "Alguns estudos mostram que o clima espacial pode afetar a agricultura!",
        simpleFact: "O Sol pode mudar como as plantas crescem!",
        sound: "nature",
      },
      {
        scene: "📱",
        text: "João instalou um aplicativo no celular para acompanhar o clima espacial. Agora ele sabia quando haveria tempestades solares e podia proteger melhor sua plantação!",
        simpleText:
          "João colocou um aplicativo no celular para saber quando o Sol ia fazer explosões. Assim ele podia cuidar melhor das plantas!",
        fact: "Agricultores modernos usam tecnologia espacial para melhorar suas colheitas!",
        simpleFact: "Fazendeiros usam tecnologia do espaço para plantar melhor!",
        sound: "success",
      },
      {
        scene: "🌍",
        text: "Mas João também aprendeu sobre cuidar da Terra. A cientista explicou: 'Se jogarmos lixo no solo, em 2 anos a terra fica envenenada e nada cresce! O lixo contamina a água que as plantas bebem e os alimentos que comemos.'",
        simpleText:
          "João também aprendeu a cuidar da terra. Se jogarmos lixo no chão, em 2 anos a terra fica doente e as plantas não crescem mais! O lixo deixa a água suja!",
        fact: "Um único pedaço de plástico pode levar 450 anos para se degradar no solo!",
        simpleFact: "Um pedaço de plástico demora 450 anos para sumir da terra!",
        sound: "alert",
        isEnvironmental: true,
        environmentalImpact: {
          action: "Jogar lixo no solo",
          consequence:
            "Em 2 anos, o lixo contamina o solo e a água, impedindo plantas de crescer e envenenando alimentos!",
          simpleConsequence: "Se jogarmos lixo no chão, em 2 anos a terra fica doente e não cresce mais comida!",
          visual: "🌱❌🗑️",
        },
      },
      {
        scene: "🏆",
        text: "Com esse novo conhecimento, a fazenda de João teve a melhor colheita de todos os tempos! Ele ensinou outros fazendeiros sobre o clima espacial, mostrando que a ciência ajuda a todos!",
        simpleText:
          "Com tudo que aprendeu, João teve a melhor colheita! Ele ensinou outros fazendeiros e todos ficaram felizes!",
        fact: "Satélites ajudam agricultores a monitorar suas plantações do espaço!",
        simpleFact: "Máquinas no espaço ajudam fazendeiros a cuidar das plantas!",
        sound: "success",
      },
    ],
  },
}

export default function StellarStories() {
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null)
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null)
  const [selectedElement, setSelectedElement] = useState<string | null>(null)
  const [currentStory, setCurrentStory] = useState<any>(null)
  const [currentChapter, setCurrentChapter] = useState(0)
  const [simpleMode, setSimpleMode] = useState(true)

  const characters = [
    { id: "astronaut", name: "Astronauta", emoji: "👨‍🚀", description: "Explora o espaço" },
    { id: "farmer", name: "Fazendeiro", emoji: "👨‍🌾", description: "Cuida das plantas" },
    { id: "pilot", name: "Piloto", emoji: "👨‍✈️", description: "Voa pelos céus" },
    { id: "scientist", name: "Cientista", emoji: "👩‍🔬", description: "Estuda o universo" },
  ]

  const scenarios = [
    { id: "space-station", name: "Estação Espacial", emoji: "🛰️" },
    { id: "aurora", name: "Aurora Boreal", emoji: "🌌" },
    { id: "solar-system", name: "Sistema Solar", emoji: "🪐" },
    { id: "earth", name: "Planeta Terra", emoji: "🌍" },
  ]

  const elements = [
    { id: "satellite", name: "Satélite", emoji: "📡" },
    { id: "meteor", name: "Meteoro", emoji: "☄️" },
    { id: "stars", name: "Estrelas", emoji: "⭐" },
    { id: "sun", name: "Sol", emoji: "☀️" },
    { id: "aurora", name: "Aurora", emoji: "🌈" },
  ]

  const generateStory = () => {
    if (!selectedCharacter || !selectedScenario || !selectedElement) return

    const storyKey = `${selectedCharacter}-${selectedScenario}-${selectedElement}`
    let story = storyDatabase[storyKey as keyof typeof storyDatabase]

    if (!story) {
      const characterStories = Object.entries(storyDatabase).filter(([key]) => key.startsWith(selectedCharacter))
      if (characterStories.length > 0) {
        story = characterStories[0][1]
      }
    }

    if (story) {
      setCurrentStory(story)
      setCurrentChapter(0)
      playSound("success")
    }
  }

  const nextChapter = () => {
    if (currentStory && currentChapter < currentStory.chapters.length - 1) {
      setCurrentChapter(currentChapter + 1)
      const nextChapterData = currentStory.chapters[currentChapter + 1]
      if (nextChapterData.sound) {
        playSound(nextChapterData.sound)
      }
    }
  }

  const previousChapter = () => {
    if (currentChapter > 0) {
      setCurrentChapter(currentChapter - 1)
      playSound("space")
    }
  }

  const resetStory = () => {
    setCurrentStory(null)
    setCurrentChapter(0)
    setSelectedCharacter(null)
    setSelectedScenario(null)
    setSelectedElement(null)
  }

  if (currentStory) {
    const chapter = currentStory.chapters[currentChapter]
    const isLastChapter = currentChapter === currentStory.chapters.length - 1

    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <Card className="p-8 text-center bg-gradient-to-br from-secondary/30 to-accent/30 border-2 border-secondary">
          <div className="text-6xl mb-4 animate-float">📖</div>
          <h2 className="text-3xl font-bold mb-2 text-balance">
            {simpleMode ? currentStory.simpleTitle : currentStory.title}
          </h2>
          <p className="text-sm text-muted-foreground">
            Capítulo {currentChapter + 1} de {currentStory.chapters.length}
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <Button size="sm" variant={simpleMode ? "default" : "outline"} onClick={() => setSimpleMode(true)}>
              Modo Simples
            </Button>
            <Button size="sm" variant={!simpleMode ? "default" : "outline"} onClick={() => setSimpleMode(false)}>
              Modo Completo
            </Button>
          </div>
        </Card>

        <SuryaMascot
          message={
            simpleMode
              ? "Que história legal! Continue lendo!"
              : "Que história incrível! Continue lendo para descobrir o que acontece!"
          }
          expression="excited"
        />

        {/* Story Chapter */}
        <Card className="p-8 min-h-[400px] bg-gradient-to-br from-card to-muted/20 border-2 border-primary">
          <div className="text-center space-y-6">
            <div className="text-8xl animate-float mb-6">{chapter.scene}</div>
            <p className="text-xl leading-relaxed text-pretty max-w-3xl mx-auto">
              {simpleMode ? chapter.simpleText : chapter.text}
            </p>
            <Button
              size="lg"
              variant="outline"
              onClick={() => chapter.sound && playSound(chapter.sound)}
              className="gap-2"
            >
              <Volume2 className="w-5 h-5" />
              Ouvir Som
            </Button>
          </div>
        </Card>

        {chapter.isEnvironmental && chapter.environmentalImpact && (
          <Card className="p-6 bg-gradient-to-r from-green-500/20 to-yellow-500/20 border-2 border-green-500">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
              <Leaf className="w-6 h-6 text-green-600" />
              Cuidando do Meio Ambiente
            </h3>
            <div className="space-y-3">
              <div className="text-center text-4xl mb-2">{chapter.environmentalImpact.visual}</div>
              <div className="bg-card/50 p-4 rounded-lg">
                <p className="font-semibold text-red-600 mb-2">⚠️ Ação: {chapter.environmentalImpact.action}</p>
                <p className="text-base leading-relaxed">
                  {simpleMode ? chapter.environmentalImpact.simpleConsequence : chapter.environmentalImpact.consequence}
                </p>
              </div>
              <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
                <p className="font-semibold text-green-700 mb-1">✅ O que podemos fazer:</p>
                <p className="text-sm">
                  {simpleMode
                    ? "Sempre jogar lixo no lixo! Reciclar e cuidar da natureza!"
                    : "Sempre descartar lixo corretamente, reciclar materiais, e educar outras pessoas sobre a importância de cuidar do meio ambiente!"}
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* NASA Fact */}
        <Card className="p-6 bg-gradient-to-r from-accent/20 to-primary/20 border-2 border-accent">
          <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
            <span className="text-2xl">🚀</span>
            Curiosidade da NASA
          </h3>
          <p className="text-base leading-relaxed">{simpleMode ? chapter.simpleFact : chapter.fact}</p>
        </Card>

        {/* Navigation */}
        <div className="flex gap-4 justify-between">
          <Button size="lg" variant="outline" onClick={resetStory} className="gap-2 bg-transparent">
            <BookOpen className="w-5 h-5" />
            Nova História
          </Button>

          <div className="flex gap-3">
            <Button
              size="lg"
              variant="outline"
              onClick={previousChapter}
              disabled={currentChapter === 0}
              className="gap-2 bg-transparent"
            >
              <ArrowLeft className="w-5 h-5" />
              Anterior
            </Button>

            {!isLastChapter ? (
              <Button size="lg" onClick={nextChapter} className="gap-2">
                Próximo
                <ArrowRight className="w-5 h-5" />
              </Button>
            ) : (
              <Button size="lg" onClick={resetStory} className="gap-2 bg-green-600 hover:bg-green-700">
                <Trophy className="w-5 h-5" />
                Concluir História
              </Button>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <Card className="p-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-muted-foreground">Progresso da História</span>
            <span className="font-semibold">
              {Math.round(((currentChapter + 1) / currentStory.chapters.length) * 100)}%
            </span>
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${((currentChapter + 1) / currentStory.chapters.length) * 100}%` }}
            />
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <Card className="p-8 text-center bg-gradient-to-br from-secondary/30 to-accent/30 border-2 border-secondary">
        <div className="text-6xl mb-4 animate-float">📖</div>
        <h2 className="text-4xl font-bold mb-2 text-balance">Histórias Estelares</h2>
        <p className="text-lg text-muted-foreground">Escolha personagem, cenário e elemento para criar uma história!</p>
      </Card>

      <SuryaMascot
        message="Que legal! Escolha um personagem, um cenário e um elemento. Vou criar uma história incrível sobre o espaço para você! 🚀"
        expression="excited"
      />

      {/* Story Builder */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Characters */}
        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            1. Personagem
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {characters.map((char) => (
              <Button
                key={char.id}
                variant={selectedCharacter === char.id ? "default" : "outline"}
                className="h-auto flex-col gap-2 p-4"
                onClick={() => setSelectedCharacter(char.id)}
              >
                <span className="text-4xl">{char.emoji}</span>
                <span className="text-sm font-semibold">{char.name}</span>
                <span className="text-xs text-muted-foreground">{char.description}</span>
              </Button>
            ))}
          </div>
        </Card>

        {/* Scenarios */}
        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Palette className="w-5 h-5 text-secondary" />
            2. Cenário
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {scenarios.map((scenario) => (
              <Button
                key={scenario.id}
                variant={selectedScenario === scenario.id ? "default" : "outline"}
                className="h-auto flex-col gap-2 p-4"
                onClick={() => setSelectedScenario(scenario.id)}
              >
                <span className="text-4xl">{scenario.emoji}</span>
                <span className="text-sm font-semibold">{scenario.name}</span>
              </Button>
            ))}
          </div>
        </Card>

        {/* Elements */}
        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-accent" />
            3. Elemento
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {elements.map((element) => (
              <Button
                key={element.id}
                variant={selectedElement === element.id ? "default" : "outline"}
                className="h-auto flex-col gap-2 p-4"
                onClick={() => setSelectedElement(element.id)}
              >
                <span className="text-4xl">{element.emoji}</span>
                <span className="text-sm font-semibold">{element.name}</span>
              </Button>
            ))}
          </div>
        </Card>
      </div>

      {/* Generate Story Button */}
      <Card className="p-8 text-center bg-gradient-to-br from-card to-muted/20 border-2 border-dashed border-primary">
        {selectedCharacter && selectedScenario && selectedElement ? (
          <div className="space-y-4">
            <div className="text-6xl animate-float">✨</div>
            <h3 className="text-2xl font-bold">Tudo Pronto!</h3>
            <p className="text-muted-foreground">
              Você escolheu: {characters.find((c) => c.id === selectedCharacter)?.emoji}{" "}
              {scenarios.find((s) => s.id === selectedScenario)?.emoji}{" "}
              {elements.find((e) => e.id === selectedElement)?.emoji}
            </p>
            <Button size="lg" onClick={generateStory} className="gap-2">
              <BookOpen className="w-5 h-5" />
              Criar Minha História!
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-6xl animate-float">🌟</div>
            <h3 className="text-2xl font-bold">Escolha os 3 Elementos</h3>
            <p className="text-muted-foreground">
              Selecione um personagem, um cenário e um elemento para começar sua aventura espacial!
            </p>
          </div>
        )}
      </Card>
    </div>
  )
}
