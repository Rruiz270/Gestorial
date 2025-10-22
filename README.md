# Gestorial - Project Success Management Platform

A comprehensive project management and success measurement application built for Gestorial consulting company. Features the complete 6-element realization matrix methodology for tracking and measuring client project success.

## Features

### 🎯 Realization Matrix
Complete implementation of the 6-element methodology:
- **Realização (Realizador)** - Purpose and values definition
- **Visão (Conceito)** - Vision and target establishment  
- **Direção (Caminho)** - Strategic direction with SWOT analysis
- **Ação (Iniciativa)** - Concrete actions and responsibilities
- **Provisão (Recurso)** - Resource allocation planning
- **Reação (Resultado)** - Expected results and success metrics

### 🔐 Role-Based Access Control
- **Gestorial Admin**: Full system access and control
- **Gestorial Staff**: Project management capabilities
- **Client Admin**: Company-specific project editing
- **Client User**: Limited project viewing and input

### 📊 Project Management
- Real-time dashboard with key metrics
- Budget tracking and financial monitoring
- Milestone management with progress tracking
- Collaborative editing capabilities

### 💰 Financial Tracking
- Budget vs. actual spending analysis
- Target revenue monitoring
- Financial objectives tracking
- ROI calculations and projections

## Technology Stack

- **Frontend**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS with custom Gestorial branding
- **Real-time**: Socket.io for live collaboration
- **Database**: Prisma ORM (PostgreSQL recommended)
- **Authentication**: Custom role-based system
- **Icons**: Lucide React

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Rruiz270/Gestorial.git
cd Gestorial
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Demo Accounts

**Gestorial Admin Access:**
- Email: `admin@gestorial.com`
- Password: `demo123`

**Client User Access:**
- Email: `client@example.com`
- Password: `demo123`

## Project Structure

```
gestorial-app/
├── app/                    # Next.js app directory
│   ├── dashboard/         # Dashboard pages
│   ├── login/            # Authentication
│   └── globals.css       # Global styles
├── components/           # Reusable UI components
├── lib/                 # Utilities and services
├── types/               # TypeScript definitions
└── public/              # Static assets
```

## Key Components

### Realization Matrix
- Interactive 6-element methodology interface
- Real-time collaborative editing
- Progress tracking and milestone management
- Export capabilities for client reports

### Dashboard
- Project overview with key metrics
- Budget utilization visualization
- Recent activity feed
- Quick action shortcuts

### Financial Tracking
- Budget vs. actual comparisons
- Revenue target monitoring
- Financial KPI tracking
- Custom metrics definition

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables
4. Deploy with zero configuration

### Environment Variables

Create a `.env.local` file:
```env
NEXTAUTH_SECRET=your-secret-key
DATABASE_URL=your-database-url
NEXTAUTH_URL=http://localhost:3000
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is proprietary software owned by Gestorial Consulting Company.

## Support

For support, contact the Gestorial team or create an issue in this repository.

---

Built with ❤️ by the Gestorial team using Claude Code