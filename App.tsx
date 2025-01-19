import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navigation } from './components/Navigation'
import { HomePage } from './pages/HomePage'
import { CommunityPage } from './pages/CommunityPage'
import { SupportPage } from './pages/SupportPage'
import { AboutPage } from './pages/AboutPage'
import { VirtualSkillsTrainingPage } from './pages/VirtualSkillsTrainingPage'
import { VitalSignsPage } from './pages/VitalSignsPage'
import { SimulationPage } from './pages/SimulationPage'
import { InteractiveLearningPage } from './pages/InteractiveLearningPage'
import { HospitalWardPage } from './pages/scenarios/HospitalWardPage'
import { MedicationPage } from './pages/scenarios/MedicationPage'
import { WoundCarePage } from './pages/scenarios/WoundCarePage'
import { PatientAssessmentGuide } from './pages/guides/PatientAssessmentGuide'
import { CommunicationGuide } from './pages/guides/CommunicationGuide'
import { EmergencyResponseGuide } from './pages/guides/EmergencyResponseGuide'
import { VirtualSchoolTourPage } from './pages/VirtualSchoolTourPage'
import { VirtualTourPage } from './pages/VirtualTourPage'

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navigation />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sonivale" element={<VirtualTourPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/virtual-tour" element={<VirtualTourPage />} />
            <Route path="/virtual-school-tour" element={<VirtualSchoolTourPage />} />
            <Route path="/skills-training" element={<VirtualSkillsTrainingPage />} />
            <Route path="/skills-training/vital-signs" element={<VitalSignsPage />} />
            <Route path="/simulations" element={<SimulationPage />} />
            <Route path="/interactive-learning" element={<InteractiveLearningPage />} />
            
            {/* Scenario Routes */}
            <Route path="/scenarios/hospital-ward" element={<HospitalWardPage />} />
            <Route path="/scenarios/medication" element={<MedicationPage />} />
            <Route path="/scenarios/wound-care" element={<WoundCarePage />} />
            
            {/* Guide Routes */}
            <Route path="/guides/patient-assessment" element={<PatientAssessmentGuide />} />
            <Route path="/guides/communication" element={<CommunicationGuide />} />
            <Route path="/guides/emergency-response" element={<EmergencyResponseGuide />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App