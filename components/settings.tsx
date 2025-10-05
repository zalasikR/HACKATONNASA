"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { User, Bell, Volume2, Globe, Accessibility, MessageSquare } from "lucide-react"

export default function Settings() {
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [narrationEnabled, setNarrationEnabled] = useState(true)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [spaceWeatherAlerts, setSpaceWeatherAlerts] = useState(true)
  const [language, setLanguage] = useState("pt-BR")

  const avatars = [
    { id: "astronaut", emoji: "👨‍🚀", name: "Astronauta" },
    { id: "scientist", emoji: "👩‍🔬", name: "Cientista" },
    { id: "explorer", emoji: "🧑‍🚀", name: "Explorador" },
    { id: "alien", emoji: "👽", name: "Alienígena" },
    { id: "robot", emoji: "🤖", name: "Robô" },
    { id: "star", emoji: "⭐", name: "Estrela" },
  ]

  const [selectedAvatar, setSelectedAvatar] = useState("astronaut")

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <Card className="p-8 text-center bg-gradient-to-br from-secondary/30 to-accent/30 border-2 border-secondary">
        <div className="text-6xl mb-4">⚙️</div>
        <h2 className="text-4xl font-bold mb-2 text-balance">Configurações</h2>
        <p className="text-lg text-muted-foreground">Personalize sua experiência de exploração</p>
      </Card>

      {/* Avatar Selection */}
      <Card className="p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <User className="w-5 h-5 text-primary" />
          Escolha seu Avatar
        </h3>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {avatars.map((avatar) => (
            <button
              key={avatar.id}
              onClick={() => setSelectedAvatar(avatar.id)}
              className={`p-4 rounded-lg border-2 transition-all hover:scale-105 ${
                selectedAvatar === avatar.id ? "border-primary bg-primary/20" : "border-border bg-muted/50"
              }`}
            >
              <div className="text-5xl mb-2">{avatar.emoji}</div>
              <p className="text-xs font-semibold">{avatar.name}</p>
            </button>
          ))}
        </div>
      </Card>

      {/* Sound Settings */}
      <Card className="p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Volume2 className="w-5 h-5 text-secondary" />
          Som e Áudio
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div>
              <p className="font-semibold">Efeitos Sonoros</p>
              <p className="text-sm text-muted-foreground">Sons de interação e feedback</p>
            </div>
            <Switch checked={soundEnabled} onCheckedChange={setSoundEnabled} />
          </div>
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div>
              <p className="font-semibold">Narração do Surya</p>
              <p className="text-sm text-muted-foreground">Mascote explica os fenômenos em voz alta</p>
            </div>
            <Switch checked={narrationEnabled} onCheckedChange={setNarrationEnabled} />
          </div>
        </div>
      </Card>

      {/* Notifications */}
      <Card className="p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5 text-accent" />
          Notificações
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div>
              <p className="font-semibold">Notificações Gerais</p>
              <p className="text-sm text-muted-foreground">Novos desafios, conquistas e atualizações</p>
            </div>
            <Switch checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
          </div>
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div>
              <p className="font-semibold">Alertas de Clima Espacial</p>
              <p className="text-sm text-muted-foreground">Notificações sobre tempestades solares e auroras</p>
            </div>
            <Switch checked={spaceWeatherAlerts} onCheckedChange={setSpaceWeatherAlerts} />
          </div>
        </div>
      </Card>

      {/* Language */}
      <Card className="p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Globe className="w-5 h-5 text-primary" />
          Idioma
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { code: "pt-BR", name: "Português (Brasil)", flag: "🇧🇷" },
            { code: "en-US", name: "English (US)", flag: "🇺🇸" },
            { code: "es-ES", name: "Español", flag: "🇪🇸" },
          ].map((lang) => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`p-4 rounded-lg border-2 transition-all hover:scale-105 ${
                language === lang.code ? "border-primary bg-primary/20" : "border-border bg-muted/50"
              }`}
            >
              <div className="text-3xl mb-2">{lang.flag}</div>
              <p className="text-sm font-semibold">{lang.name}</p>
            </button>
          ))}
        </div>
      </Card>

      {/* Accessibility */}
      <Card className="p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Accessibility className="w-5 h-5 text-secondary" />
          Acessibilidade
        </h3>
        <div className="space-y-3">
          <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
            <span className="text-lg">🔤</span>
            Aumentar Tamanho do Texto
          </Button>
          <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
            <span className="text-lg">🎨</span>
            Modo Alto Contraste
          </Button>
          <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
            <span className="text-lg">⏱️</span>
            Reduzir Animações
          </Button>
        </div>
      </Card>

      {/* Feedback */}
      <Card className="p-6 bg-gradient-to-r from-accent/20 to-primary/20 border-2 border-accent">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-accent" />
          Envie seu Feedback
        </h3>
        <p className="text-base text-muted-foreground mb-4 leading-relaxed">
          Sua opinião é muito importante! Conte-nos o que você achou do Surya Kids e como podemos melhorar.
        </p>
        <Button className="w-full gap-2">
          <MessageSquare className="w-4 h-4" />
          Enviar Feedback
        </Button>
      </Card>

      {/* App Info */}
      <Card className="p-6 text-center bg-muted/50">
        <div className="text-4xl mb-3">☀️</div>
        <p className="font-bold text-lg mb-1">Surya Kids — Exploradores do Espaço</p>
        <p className="text-sm text-muted-foreground mb-2">Versão 1.0.0</p>
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <Badge variant="outline" className="bg-transparent">
            NASA
          </Badge>
          <Badge variant="outline" className="bg-transparent">
            INPE
          </Badge>
          <Badge variant="outline" className="bg-transparent">
            BNCC
          </Badge>
        </div>
      </Card>
    </div>
  )
}
