"use client"

import { useState } from "react"
import SolarMission from "@/components/solar-mission"
import StellarStories from "@/components/stellar-stories"
import PlanetsExplorer from "@/components/planets-explorer"
import SpaceDictionary from "@/components/space-dictionary"
import TeacherDashboard from "@/components/teacher-dashboard"
import GamesChallenges from "@/components/games-challenges"
import Settings from "@/components/settings"
import Navigation from "@/components/navigation"
import SpaceBackground from "@/components/space-background"

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<
    "solar" | "stories" | "planets" | "dictionary" | "dashboard" | "games" | "settings"
  >("solar")

  return (
    <main className="relative min-h-screen overflow-hidden">
      <SpaceBackground />
      <script 
 async 
 src="https://app.gptmaker.ai/widget/3E83BCBBA873927A5E2BF258A1CCBB70/float.js">
</script>

      <div className="relative z-10">
        <Navigation currentScreen={currentScreen} onNavigate={setCurrentScreen} />

        <div className="container mx-auto px-4 py-6">
          {currentScreen === "solar" && <SolarMission />}
          {currentScreen === "stories" && <StellarStories />}
          {currentScreen === "planets" && <PlanetsExplorer />}
          {currentScreen === "dictionary" && <SpaceDictionary />}
          {currentScreen === "dashboard" && <TeacherDashboard />}
          {currentScreen === "games" && <GamesChallenges />}
          {currentScreen === "settings" && <Settings />}
        </div>
      </div>
    </main>
  )
}
