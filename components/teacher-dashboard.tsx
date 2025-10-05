"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BarChart3, Users, Clock, Trophy, BookOpen, Download, TrendingUp, Activity } from "lucide-react"

export default function TeacherDashboard() {
  const classStats = [
    { name: "Turma 5A", students: 28, avgTime: "45 min", completed: 85 },
    { name: "Turma 5B", students: 25, avgTime: "38 min", completed: 72 },
    { name: "Turma 6A", students: 30, avgTime: "52 min", completed: 91 },
  ]

  const topExplorers = [
    { name: "Ana Silva", class: "5A", points: 450, badge: "🏆" },
    { name: "Pedro Santos", class: "6A", points: 420, badge: "🥈" },
    { name: "Maria Costa", class: "5B", points: 390, badge: "🥉" },
    { name: "João Oliveira", class: "5A", points: 375, badge: "⭐" },
    { name: "Sofia Lima", class: "6A", points: 360, badge: "⭐" },
  ]

  const activities = [
    {
      title: "Observação Solar",
      description: "Atividade prática sobre fenômenos solares",
      bncc: "EF05CI13",
      duration: "2 aulas",
    },
    {
      title: "Sistema Solar em Escala",
      description: "Construir modelo do sistema solar",
      bncc: "EF06CI14",
      duration: "3 aulas",
    },
    {
      title: "Diário de Auroras",
      description: "Pesquisa sobre auroras boreais",
      bncc: "EF05CI11",
      duration: "1 aula",
    },
  ]

  const historicalData = [
    { month: "Jan", flares: 12, cmes: 8, maxKp: 5 },
    { month: "Fev", flares: 18, cmes: 12, maxKp: 6 },
    { month: "Mar", flares: 25, cmes: 15, maxKp: 7 },
    { month: "Abr", flares: 20, cmes: 10, maxKp: 5 },
    { month: "Mai", flares: 15, cmes: 9, maxKp: 4 },
    { month: "Jun", flares: 22, cmes: 14, maxKp: 6 },
  ]

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <Card className="p-8 text-center bg-gradient-to-br from-secondary/30 to-primary/30 border-2 border-secondary">
        <div className="text-6xl mb-4">👩‍🏫</div>
        <h2 className="text-4xl font-bold mb-2 text-balance">Dashboard Educacional</h2>
        <p className="text-lg text-muted-foreground">Acompanhe o progresso dos seus alunos</p>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 bg-gradient-to-br from-primary/20 to-transparent border-2 border-primary">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-8 h-8 text-primary" />
            <div>
              <p className="text-3xl font-bold">83</p>
              <p className="text-sm text-muted-foreground">Alunos Ativos</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-secondary/20 to-transparent border-2 border-secondary">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-8 h-8 text-secondary" />
            <div>
              <p className="text-3xl font-bold">45m</p>
              <p className="text-sm text-muted-foreground">Tempo Médio</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-accent/20 to-transparent border-2 border-accent">
          <div className="flex items-center gap-3 mb-2">
            <Trophy className="w-8 h-8 text-accent" />
            <div>
              <p className="text-3xl font-bold">156</p>
              <p className="text-sm text-muted-foreground">Quizzes Completos</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-500/20 to-transparent border-2 border-green-500">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="w-8 h-8 text-green-500" />
            <div>
              <p className="text-3xl font-bold">82%</p>
              <p className="text-sm text-muted-foreground">Taxa de Conclusão</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" />
          Histórico de Atividade Solar (Últimos 6 Meses)
        </h3>
        <div className="space-y-6">
          <div>
            <p className="text-sm text-muted-foreground mb-3">Erupções Solares por Mês</p>
            <div className="flex items-end gap-2 h-32">
              {historicalData.map((data) => (
                <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className="w-full bg-orange-500 rounded-t-lg transition-all hover:bg-orange-600"
                    style={{ height: `${(data.flares / 25) * 100}%` }}
                  />
                  <p className="text-xs font-semibold">{data.flares}</p>
                  <p className="text-xs text-muted-foreground">{data.month}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-3">Ejeções de Massa Coronal (EMCs) por Mês</p>
            <div className="flex items-end gap-2 h-32">
              {historicalData.map((data) => (
                <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className="w-full bg-blue-500 rounded-t-lg transition-all hover:bg-blue-600"
                    style={{ height: `${(data.cmes / 15) * 100}%` }}
                  />
                  <p className="text-xs font-semibold">{data.cmes}</p>
                  <p className="text-xs text-muted-foreground">{data.month}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-3">Índice Kp Máximo por Mês</p>
            <div className="flex items-end gap-2 h-32">
              {historicalData.map((data) => {
                const color = data.maxKp >= 7 ? "bg-red-500" : data.maxKp >= 5 ? "bg-orange-500" : "bg-green-500"
                return (
                  <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
                    <div
                      className={`w-full ${color} rounded-t-lg transition-all`}
                      style={{ height: `${(data.maxKp / 9) * 100}%` }}
                    />
                    <p className="text-xs font-semibold">{data.maxKp}</p>
                    <p className="text-xs text-muted-foreground">{data.month}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-gradient-to-r from-accent/20 to-primary/20 border-2 border-accent">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-accent" />
          Previsões e Insights
        </h3>
        <div className="space-y-3">
          <div className="p-4 bg-card rounded-lg border-2 border-border">
            <p className="font-semibold mb-1">📊 Tendência de Atividade Solar</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Baseado em padrões históricos, esperamos atividade solar moderada a alta nas próximas semanas, com
              possibilidade de auroras visíveis em latitudes médias.
            </p>
          </div>
          <div className="p-4 bg-card rounded-lg border-2 border-border">
            <p className="font-semibold mb-1">🎯 Oportunidades Educacionais</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Momento ideal para ensinar sobre tempestades solares e seus efeitos na Terra. Considere atividades
              práticas sobre magnetismo e auroras.
            </p>
          </div>
          <div className="p-4 bg-card rounded-lg border-2 border-border">
            <p className="font-semibold mb-1">⚡ Eventos Recentes</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Última erupção classe M registrada há 3 dias. EMC associada deve chegar à Terra em 24-48 horas. Ótima
              oportunidade para observação em tempo real!
            </p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            Desempenho por Turma
          </h3>
          <div className="space-y-4">
            {classStats.map((classItem) => (
              <div key={classItem.name} className="p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold">{classItem.name}</h4>
                  <Badge>{classItem.students} alunos</Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Tempo médio</p>
                    <p className="font-semibold">{classItem.avgTime}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Conclusão</p>
                    <p className="font-semibold">{classItem.completed}%</p>
                  </div>
                </div>
                <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${classItem.completed}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-accent" />
            Ranking de Exploradores
          </h3>
          <div className="space-y-3">
            {topExplorers.map((explorer, index) => (
              <div
                key={explorer.name}
                className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <div className="text-3xl">{explorer.badge}</div>
                <div className="flex-1">
                  <p className="font-semibold">{explorer.name}</p>
                  <p className="text-sm text-muted-foreground">{explorer.class}</p>
                </div>
                <Badge className="bg-primary">{explorer.points} pts</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-secondary" />
            Atividades Pedagógicas (BNCC)
          </h3>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Download className="w-4 h-4" />
            Exportar Planos
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {activities.map((activity) => (
            <Card key={activity.title} className="p-5 border-2 hover:border-primary transition-colors">
              <Badge className="mb-3">{activity.bncc}</Badge>
              <h4 className="font-bold mb-2">{activity.title}</h4>
              <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{activity.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">⏱️ {activity.duration}</span>
                <Button size="sm" variant="secondary">
                  Ver Plano
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      <Card className="p-6 bg-gradient-to-r from-accent/20 to-secondary/20 border-2 border-accent">
        <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
          <span className="text-2xl">💡</span>
          Dicas para Professores
        </h3>
        <ul className="space-y-2 text-base leading-relaxed">
          <li>✅ Use o app como complemento às aulas de Ciências</li>
          <li>✅ Incentive os alunos a criarem histórias sobre o que aprenderam</li>
          <li>✅ Organize competições de quiz entre turmas</li>
          <li>✅ Conecte os conteúdos com eventos astronômicos atuais</li>
        </ul>
      </Card>
    </div>
  )
}
