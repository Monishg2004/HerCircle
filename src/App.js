import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import CycleTracking from './pages/CycleTracking';
import HealthMoodInsights from './pages/HealthMoodInsights';
import SymptomWellnessTracking from './pages/SymptomWellnessTracking';
import EducationalResources from './pages/EducationalResources';
import CommunitySupport from './pages/CommunitySupport';
import PersonalJournal from './pages/PersonalJournal';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>} exact/>
          <Route path='/cycle-tracking' element={<CycleTracking/>} exact/>
          <Route path='/health-insights' element={<HealthMoodInsights/>} exact/>
          <Route path='/symptom-tracking' element={<SymptomWellnessTracking/>} exact/>
          <Route path='/educational-resources' element={<EducationalResources/>} exact/>
          <Route path='/community-support' element={<CommunitySupport/>} exact/>
          <Route path='/personal-journal' element={<PersonalJournal/>} exact/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;