import { Card } from "@/components/ui/card"

interface SuryaMascotProps {
  message: string
  expression?: "happy" | "excited" | "thinking"
}

export default function SuryaMascot({ message, expression = "happy" }: SuryaMascotProps) {
  const expressions = {
    happy: "😊",
    excited: "🤩",
    thinking: "🤔",
  }

  return (
    <Card className="p-6 bg-gradient-to-r from-primary/20 to-secondary/20 border-2 border-primary">
      <div className="flex items-start gap-4">
        <div className="relative flex-shrink-0">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-300 to-orange-500 flex items-center justify-center text-4xl animate-float shadow-lg">
            {expressions[expression]}
          </div>
          <div className="absolute -top-2 -right-2 text-2xl animate-twinkle">✨</div>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-bold text-primary">Surya diz:</h3>
            <div className="text-xl animate-bounce">👋</div>
          </div>
          <p className="text-base leading-relaxed">{message}</p>
        </div>
      </div>
    </Card>
  )
}
