# 🌞 Surya Kids Space App

**Surya Kids Space App** é um projeto educacional interativo desenvolvido para ajudar crianças do ensino fundamental a aprender sobre o espaço, os planetas e o Sol.  
A aplicação utiliza dados em tempo real da **NASA** e do **INPE (Clima Espacial)**, traduzindo conceitos científicos de forma divertida e acessível
<img width="1624" height="949" alt="Captura de tela 2025-10-05 000323" src="https://github.com/user-attachments/assets/0ebb8508-5344-47d8-b844-c07031cd4148" />


---

## 🧠 Objetivo

A Surya Kids tem como propósito transformar dados astronômicos complexos em uma experiência visual e lúdica.  
O aplicativo conta com:
- 📊 Dashboards em tempo real com métricas solares e espaciais  
- 🪐 Curiosidades sobre planetas e fenômenos do espaço  
- 💬 Termos científicos traduzidos para linguagem infantil  
- 🌍 Integração com APIs oficiais da NASA e do INPE  

---

## 💻 Como baixar e rodar o projeto localmente

Siga as etapas abaixo para instalar e executar o Surya Kids Space App no seu computador.

### 1️⃣ Pré-requisitos

Antes de começar, você precisa ter instalado:
- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/) (versão LTS recomendada)
- Um editor de código (recomendado: [Visual Studio Code](https://code.visualstudio.com/))

---

### 2️⃣ Clonar o repositório

Abra o terminal e digite o comando abaixo:

```bash
git clone https://github.com/zalasikR/HACKATONNASA.git
````

Isso vai criar uma pasta chamada **HACKATONNASA** com os arquivos do projeto.

---

### 3️⃣ Entrar na pasta do projeto

```bash
cd HACKATONNASA
```

---

### 4️⃣ Instalar dependências

Se o projeto tiver dependências (Node.js), rode:

```bash
npm install
```

Se for apenas HTML, CSS e JS puro, você pode pular esta etapa.

---

### 5️⃣ Executar o projeto

#### 🧭 Opção 1: Abrir direto no navegador

Basta abrir o arquivo `index.html` dentro da pasta do projeto.
Exemplo:

```
C:\Users\SeuUsuario\Downloads\HACKATONNASA\index.html
```

#### 🧠 Opção 2: Usar um servidor local (recomendado)

Se estiver usando VS Code, instale a extensão **Live Server** e clique em **"Go Live"**.
Isso abrirá o projeto automaticamente no seu navegador padrão.

---

## 🌌 Estrutura do projeto

```
📂 surya-kids-space-app/
├── index.html            → Página inicial (dashboard principal)
├── planets.html          → Tela educativa sobre planetas
├── curiosities.html      → Curiosidades espaciais
├── terms.html            → Dicionário de termos científicos
├── /assets               → Imagens, ícones e vídeos
├── /css                  → Arquivos de estilo
├── /js                   → Scripts e lógicas de atualização em tempo real
└── README.md             → Este arquivo de documentação
```

---

## ☀️ Fontes de Dados

O projeto consome e interpreta dados públicos de:

* 🌞 [NASA Space Weather Program](https://science.nasa.gov/heliophysics/focus-areas/space-weather/)
* 🛰️ [NASA Solar Storms & Flares](https://science.nasa.gov/sun/solar-storms-and-flares/)
* 🌍 [INPE Clima Espacial (EMBRACE)](https://www2.inpe.br/climaespacial/portal/pt/)
* 📊 Modelos de previsão solar (baseados em métricas da Surya IA da NASA)

---

## 🧒 Público-Alvo

Escolas do ensino fundamental, professores de ciências e projetos educacionais voltados ao aprendizado astronômico interativo.

---

## 🧩 Tecnologias utilizadas

* **HTML5**, **CSS3**, **JavaScript**
* **APIs da NASA e INPE**
* **Visualizações interativas (gráficos e animações)**
* **Surya AI** – modelo de previsão solar integrado

---

## 🌠 Desenvolvido por

**Ryan Andrade**
👨‍🚀 Projeto criado para o **NASA Space Apps Challenge 2025**
📅 Outubro de 2025 / UMFG 
