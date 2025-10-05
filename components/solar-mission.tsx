"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Volume2, Info, TrendingUp, Activity, Satellite, ExternalLink } from "lucide-react"
import SuryaMascot from "@/components/surya-mascot"

interface SpaceWeatherData {
  flareClass: "C" | "M" | "X" | "Calm"
  flareIntensity: number
  cmeVelocity: number
  cmeDirection: string
  solarParticleFlux: number
  kpIndex: number
  apIndex: number
  dstIndex: number
  alertLevel: "green" | "yellow" | "orange" | "red"
  alertMessage: string
}

export default function SolarMission() {
  const [selectedPhenomenon, setSelectedPhenomenon] = useState<string | null>(null)
  const [showSatelliteMap, setShowSatelliteMap] = useState(false)
  const [spaceWeather, setSpaceWeather] = useState<SpaceWeatherData>({
    flareClass: "C",
    flareIntensity: 2.3,
    cmeVelocity: 450,
    cmeDirection: "Nordeste",
    solarParticleFlux: 120,
    kpIndex: 3,
    apIndex: 15,
    dstIndex: -25,
    alertLevel: "green",
    alertMessage: "Condições calmas. Perfeito para observação!",
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setSpaceWeather((prev) => {
        const flareClasses: Array<"C" | "M" | "X" | "Calm"> = ["Calm", "C", "C", "C", "M", "X"]
        const newFlareClass = flareClasses[Math.floor(Math.random() * flareClasses.length)]
        const newIntensity = newFlareClass === "Calm" ? 0 : Math.random() * 9 + 1
        const newKp = Math.floor(Math.random() * 9)

        let alertLevel: "green" | "yellow" | "orange" | "red" = "green"
        let alertMessage = "Condições calmas. Perfeito para observação!"

        if (newFlareClass === "X" || newKp >= 7) {
          alertLevel = "red"
          alertMessage = "Alerta intenso! Tempestade solar forte em andamento!"
        } else if (newFlareClass === "M" || newKp >= 5) {
          alertLevel = "orange"
          alertMessage = "Alerta moderado. Atividade solar elevada detectada."
        } else if (newFlareClass === "C" || newKp >= 3) {
          alertLevel = "yellow"
          alertMessage = "Alerta leve. Pequena atividade solar em curso."
        }

        return {
          flareClass: newFlareClass,
          flareIntensity: Number(newIntensity.toFixed(1)),
          cmeVelocity: Math.floor(Math.random() * 1000 + 300),
          cmeDirection: ["Norte", "Sul", "Leste", "Oeste", "Nordeste", "Sudeste"][Math.floor(Math.random() * 6)],
          solarParticleFlux: Math.floor(Math.random() * 500 + 50),
          kpIndex: newKp,
          apIndex: Math.floor(Math.random() * 100 + 5),
          dstIndex: Math.floor(Math.random() * 100 - 80),
          alertLevel,
          alertMessage,
        }
      })
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  const alertColors = {
    green: "bg-green-500",
    yellow: "bg-yellow-500",
    orange: "bg-orange-500",
    red: "bg-red-500",
  }

  const alertBorderColors = {
    green: "border-green-500",
    yellow: "border-yellow-500",
    orange: "border-orange-500",
    red: "border-red-500",
  }

  const phenomena = [
    {
      id: "solar-flare",
      name: "Erupção Solar",
      emoji: "💥",
      description: "Uma faísca gigante do Sol! É como quando você acende um fósforo, mas milhões de vezes maior!",
      status: spaceWeather.flareClass === "Calm" ? "Calmo" : `Classe ${spaceWeather.flareClass}`,
      color:
        spaceWeather.flareClass === "X"
          ? "bg-red-500"
          : spaceWeather.flareClass === "M"
            ? "bg-orange-500"
            : spaceWeather.flareClass === "C"
              ? "bg-yellow-500"
              : "bg-green-500",
    },
    {
      id: "solar-wind",
      name: "Vento Solar",
      emoji: "💨",
      description: "Um sopro invisível do Sol que viaja pelo espaço. É como o vento que você sente, mas no espaço!",
      status: spaceWeather.cmeVelocity > 700 ? "Muito Forte" : spaceWeather.cmeVelocity > 500 ? "Forte" : "Moderado",
      color:
        spaceWeather.cmeVelocity > 700
          ? "bg-red-500"
          : spaceWeather.cmeVelocity > 500
            ? "bg-orange-500"
            : "bg-blue-500",
    },
    {
      id: "sunspot",
      name: "Mancha Solar",
      emoji: "⚫",
      description: "Manchas escuras no Sol que são mais frias. Como sardas no rosto do Sol!",
      status: "Visível",
      color: "bg-gray-700",
    },
    {
      id: "aurora",
      name: "Aurora",
      emoji: "🌈",
      description: "Um show de luzes coloridas no céu! Acontece quando o vento solar encontra a Terra.",
      status: spaceWeather.kpIndex >= 5 ? "Provável" : spaceWeather.kpIndex >= 3 ? "Possível" : "Improvável",
      color: spaceWeather.kpIndex >= 5 ? "bg-green-500" : spaceWeather.kpIndex >= 3 ? "bg-blue-500" : "bg-gray-500",
    },
  ]

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <Card
        className={`relative overflow-hidden border-2 ${alertBorderColors[spaceWeather.alertLevel]} bg-gradient-to-br from-card via-card to-primary/10`}
      >
        <div className="p-8 text-center">
          <div className="relative inline-block">
            <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-yellow-300 via-orange-400 to-orange-600 animate-pulse-glow shadow-2xl">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-200/50 to-transparent animate-rotate-slow" />
              <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-orange-700 rounded-full opacity-60" />
              <div className="absolute bottom-1/3 right-1/4 w-6 h-6 bg-orange-800 rounded-full opacity-50" />
              {spaceWeather.flareClass !== "Calm" && (
                <div className="absolute -top-2 -right-2 w-12 h-12 bg-orange-400 rounded-full opacity-70 animate-ping" />
              )}
            </div>
            <div className="absolute -top-4 -right-4 text-4xl animate-float">✨</div>
            <div className="absolute -bottom-4 -left-4 text-3xl animate-float" style={{ animationDelay: "1s" }}>
              ⭐
            </div>
          </div>

          <h2 className="text-4xl font-bold mt-6 mb-2 text-balance">Missão Solar em Tempo Real</h2>
          <p className="text-lg text-muted-foreground mb-4">Explore o Sol e seus fenômenos incríveis!</p>

          <Badge
            className={`text-lg px-4 py-2 ${alertColors[spaceWeather.alertLevel]} hover:${alertColors[spaceWeather.alertLevel]}`}
          >
            {spaceWeather.alertLevel === "green" && "☀️"}
            {spaceWeather.alertLevel === "yellow" && "⚠️"}
            {spaceWeather.alertLevel === "orange" && "🔶"}
            {spaceWeather.alertLevel === "red" && "🚨"} {spaceWeather.alertMessage}
          </Badge>
        </div>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-secondary/20 to-accent/20 border-2 border-secondary">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" />
          Métricas de Clima Espacial em Tempo Real
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-card rounded-lg border-2 border-border">
            <p className="text-sm text-muted-foreground mb-1">Erupção Solar</p>
            <p className="text-2xl font-bold">
              {spaceWeather.flareClass === "Calm"
                ? "Calmo"
                : `${spaceWeather.flareClass}${spaceWeather.flareIntensity}`}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Classe e intensidade</p>
          </div>
          <div className="p-4 bg-card rounded-lg border-2 border-border">
            <p className="text-sm text-muted-foreground mb-1">Velocidade EMC</p>
            <p className="text-2xl font-bold">{spaceWeather.cmeVelocity} km/s</p>
            <p className="text-xs text-muted-foreground mt-1">Direção: {spaceWeather.cmeDirection}</p>
          </div>
          <div className="p-4 bg-card rounded-lg border-2 border-border">
            <p className="text-sm text-muted-foreground mb-1">Fluxo de Partículas</p>
            <p className="text-2xl font-bold">{spaceWeather.solarParticleFlux}</p>
            <p className="text-xs text-muted-foreground mt-1">Partículas/cm²/s</p>
          </div>
          <div className="p-4 bg-card rounded-lg border-2 border-border">
            <p className="text-sm text-muted-foreground mb-1">Índice Kp</p>
            <p className="text-2xl font-bold">{spaceWeather.kpIndex}</p>
            <p className="text-xs text-muted-foreground mt-1">Atividade geomagnética</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mt-4">
          <div className="p-4 bg-card rounded-lg border-2 border-border">
            <p className="text-sm text-muted-foreground mb-1">Índice Ap</p>
            <p className="text-2xl font-bold">{spaceWeather.apIndex}</p>
            <p className="text-xs text-muted-foreground mt-1">Perturbação magnética diária</p>
          </div>
          <div className="p-4 bg-card rounded-lg border-2 border-border">
            <p className="text-sm text-muted-foreground mb-1">Índice Dst</p>
            <p className="text-2xl font-bold">{spaceWeather.dstIndex} nT</p>
            <p className="text-xs text-muted-foreground mt-1">Corrente do anel magnético</p>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 border-2 border-blue-500/50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Satellite className="w-5 h-5 text-blue-500" />
            Satélites em Tempo Real
          </h3>
          <Button
            size="sm"
            variant={showSatelliteMap ? "secondary" : "default"}
            onClick={() => setShowSatelliteMap(!showSatelliteMap)}
          >
            {showSatelliteMap ? "Ocultar Mapa" : "Ver Mapa"}
          </Button>
        </div>

        <p className="text-base leading-relaxed mb-4">
          Existem mais de <strong>8.000 satélites</strong> orbitando a Terra agora mesmo! Eles nos ajudam com GPS,
          internet, previsão do tempo e até monitoram o clima espacial. Veja onde eles estão neste exato momento! 🛰️
        </p>

        {showSatelliteMap && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="p-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg text-white text-center space-y-4">
              <div className="text-4xl mb-2">🛰️</div>
              <h4 className="text-2xl font-bold">Explore os Satélites em Tempo Real!</h4>
              <p className="text-base leading-relaxed opacity-90">
                Clique no botão abaixo para abrir o mapa interativo e ver todos os satélites orbitando a Terra neste
                momento. Você pode clicar em cada satélite para ver suas informações!
              </p>
              <Button
                size="lg"
                variant="secondary"
                className="gap-2 text-lg px-8 py-6 bg-white text-blue-600 hover:bg-gray-100"
                onClick={() => window.open("https://satellitemap.space/", "_blank")}
              >
                <ExternalLink className="w-5 h-5" />
                Abrir Mapa de Satélites
              </Button>
            </div>

            <div className="relative w-full h-[500px] rounded-lg overflow-hidden border-2 border-blue-500/50 bg-gradient-to-br from-blue-950 to-purple-950">
              <iframe
                src="https://satellitemap.space/"
                className="w-full h-full"
                title="Mapa de Satélites em Tempo Real"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              {/* Fallback overlay if iframe doesn't load */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center text-white/80 p-8">
                  <Satellite className="w-16 h-16 mx-auto mb-4 animate-pulse" />
                  <p className="text-lg">Carregando mapa de satélites...</p>
                  <p className="text-sm mt-2">
                    Se o mapa não carregar, clique no botão acima para abrir em uma nova aba
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-card rounded-lg border-2 border-blue-500/30">
                <div className="text-3xl mb-2">🌍</div>
                <h4 className="font-bold mb-1">Satélites de Observação</h4>
                <p className="text-sm text-muted-foreground">
                  Tiram fotos da Terra para estudar clima, florestas e oceanos
                </p>
              </div>
              <div className="p-4 bg-card rounded-lg border-2 border-purple-500/30">
                <div className="text-3xl mb-2">📡</div>
                <h4 className="font-bold mb-1">Satélites de Comunicação</h4>
                <p className="text-sm text-muted-foreground">
                  Transmitem TV, internet e chamadas telefônicas pelo mundo
                </p>
              </div>
              <div className="p-4 bg-card rounded-lg border-2 border-pink-500/30">
                <div className="text-3xl mb-2">🧭</div>
                <h4 className="font-bold mb-1">Satélites de Navegação</h4>
                <p className="text-sm text-muted-foreground">Ajudam o GPS a funcionar para você encontrar o caminho</p>
              </div>
            </div>
          </div>
        )}
      </Card>

      <SuryaMascot message="Olá, explorador! Eu sou o Surya! Vamos aprender sobre o Sol juntos? Clique nos fenômenos abaixo para descobrir mais!" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {phenomena.map((phenomenon) => (
          <Card
            key={phenomenon.id}
            className="p-6 cursor-pointer transition-all hover:scale-105 hover:border-primary border-2"
            onClick={() => setSelectedPhenomenon(phenomenon.id)}
          >
            <div className="flex items-start gap-4">
              <div className="text-5xl animate-float">{phenomenon.emoji}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold">{phenomenon.name}</h3>
                  <Badge className={phenomenon.color}>{phenomenon.status}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{phenomenon.description}</p>
                <div className="flex gap-2">
                  <Button size="sm" variant="secondary" className="gap-2">
                    <Volume2 className="w-4 h-4" />
                    Ouvir
                  </Button>
                  <Button size="sm" variant="outline" className="gap-2 bg-transparent">
                    <Info className="w-4 h-4" />
                    Saiba Mais
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6 bg-gradient-to-r from-primary/20 to-secondary/20 border-2 border-primary">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          Previsão Semanal de Atividade Solar
        </h3>
        <p className="text-base leading-relaxed mb-4">
          Baseado em dados históricos da mesma semana de anos anteriores, prevemos atividade solar{" "}
          <strong>{spaceWeather.kpIndex >= 5 ? "alta" : spaceWeather.kpIndex >= 3 ? "moderada" : "baixa"}</strong> nos
          próximos 7 dias.
        </p>
        <div className="grid grid-cols-7 gap-2">
          {["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].map((day, index) => {
            const prediction = Math.floor(Math.random() * 9)
            const predColor =
              prediction >= 7
                ? "bg-red-500"
                : prediction >= 5
                  ? "bg-orange-500"
                  : prediction >= 3
                    ? "bg-yellow-500"
                    : "bg-green-500"
            return (
              <div key={day} className="text-center">
                <p className="text-xs text-muted-foreground mb-2">{day}</p>
                <div className={`h-16 ${predColor} rounded-lg flex items-center justify-center font-bold text-white`}>
                  Kp {prediction}
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      <Card className="p-6 bg-gradient-to-r from-secondary/20 to-accent/20 border-2 border-secondary">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span className="text-2xl">🎓</span>
          Você Sabia?
        </h3>
        <p className="text-lg leading-relaxed">
          O Sol é tão grande que caberia mais de 1 milhão de planetas Terra dentro dele! E a luz do Sol leva 8 minutos
          para chegar até nós. É como se o Sol estivesse sempre 8 minutos no passado! 🤯
        </p>
      </Card>
    </div>
  )
}
