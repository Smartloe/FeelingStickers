import React, { useState } from 'react';
import WelcomePage from './components/WelcomePage';
import Index from './pages/Index';

function App() {
  const [showMainApp, setShowMainApp] = useState(false);

  const handleEnter = () => {
    setShowMainApp(true);
  };

  return (
    <div className="App">
      {!showMainApp ? (
        <WelcomePage onEnter={handleEnter} />
      ) : (
        <Index />
      )}
    </div>
  );
}

export default App;
