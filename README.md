# Rastreador de Veículos 🚚

Este projeto é uma plataforma web desenvolvida com **Next.js** e **React** para visualização de veículos rastreados em tempo real. A aplicação consome uma API REST e exibe os dados em uma **tabela responsiva** e um **mapa interativo** com marcadores personalizados.

O foco do desenvolvimento foi a aplicação de boas práticas modernas de front-end, testes completos e uma UI fluida e profissional.

---

## 🔧 Tecnologias Utilizadas

* **Next.js** (React)
* **TypeScript**
* **Tailwind CSS**
* **React Query** (TanStack)
* **React Leaflet** + **OpenStreetMap**
* **Jest** + **React Testing Library** (testes unitários)
* **Cypress** (testes E2E)

---

## 🚀 Funcionalidades

* Filtro por **placa** e **frota**
* Alternância entre **veículos rastreados** e **outros**
* Carregamento incremental com **scroll infinito**
* Exibição de **detalhes do veículo** com dados e link para Google Maps
* **Mapa interativo** com marcadores em **cores aleatórias**
* Comportamento **totalmente responsivo**

---

## 🧪 Testes

* **Testes unitários** para todos os componentes (`Filter`, `Map`, `VehicleTable`, `VehicleDetails`)
* **Testes E2E com Cypress**, validando toda a jornada do usuário:

  * Exibir lista
  * Buscar por placa
  * Alternar tipo de veículo
  * Clicar em marcador e visualizar popup
  * Acessar link para o Google Maps

---

## 🖥️ Como Rodar o Projeto

### 1. Clonar o repositório

git clone [https://github.com/seu-usuario/rastreador-veiculos.git](https://github.com/seu-usuario/rastreador-veiculos.git)
cd rastreador-veiculos

### 2. Instalar dependências

npm install

### 3. Criar o arquivo de variáveis de ambiente

Crie um arquivo `.env.local` na raiz com o seguinte conteúdo:

NEXT\_PUBLIC\_API\_KEY=SEU\_TOKEN\_DA\_API\_AQUI

### 4. Iniciar o servidor de desenvolvimento

npm run dev

O projeto estará disponível em: [http://localhost:3000](http://localhost:3000)

---

## ✅ Rodar Testes Unitários

Para rodar todos os testes unitários com Jest:

npm test

---

## ✅ Rodar Testes E2E com Cypress

### 1. Iniciar o servidor da aplicação

npm run dev

### 2. Abrir o Cypress com interface gráfica

npm run cypress

### 3. Ou rodar os testes em modo headless

npm run cypress\:run

---

## 💡 Observações Técnicas

* Os **marcadores do mapa** são renderizados com `divIcon` do Leaflet e um ícone SVG de caminhão.
* As cores dos marcadores são geradas aleatoriamente e memorizadas por veículo com `useMemo`.
* O mapa não recarrega todos os marcadores — ele apenas atualiza a posição com base na API a cada 2 minutos.
* Todos os dados exibidos estão sincronizados com o back-end via React Query e infinite scroll.

---

## 👤 Autor

Desenvolvido por **BRUNO ANGELOTI PIRES**


