import React from 'react';
import RouteApp from "./RouteApp";
import {ProviderAuth} from "./providers/ContextAuthProvider";

function App() {
  return (
      <ProviderAuth>
   <RouteApp />
      </ProviderAuth>

  );
}

export default App;
