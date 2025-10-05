"use client"

import { Button } from "@/components/ui/button"
import { Rocket, BookOpen, Globe, BookText, BarChart3, Gamepad2, Settings } from "lucide-react"

interface NavigationProps {
  currentScreen: "solar" | "stories" | "planets" | "dictionary" | "dashboard" | "games" | "settings"
  onNavigate: (screen: "solar" | "stories" | "planets" | "dictionary" | "dashboard" | "games" | "settings") => void
}

export default function Navigation({ currentScreen, onNavigate }: NavigationProps) {
  const navItems = [
    { id: "solar" as const, label: "Missão Solar", icon: Rocket },
    { id: "stories" as const, label: "Histórias", icon: BookOpen },
    { id: "planets" as const, label: "Planetas", icon: Globe },
    { id: "dictionary" as const, label: "Dicionário", icon: BookText },
    { id: "games" as const, label: "Jogos", icon: Gamepad2 },
    { id: "dashboard" as const, label: "Professores", icon: BarChart3 },
    { id: "settings" as const, label: "Configurações", icon: Settings },
  ]

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-card/80 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="text-3xl animate-float">☀️</div>
            <h1 className="text-2xl font-bold text-primary">Surya Kids</h1>
          </div>

          <div className="flex gap-2">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Button
                  key={item.id}
                  variant={currentScreen === item.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onNavigate(item.id)}
                  className="gap-2"
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden md:inline">{item.label}</span>
                </Button>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
