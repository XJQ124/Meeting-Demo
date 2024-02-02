import React from "react";
import LoginPage from "./components/LoginPage";
import { ConfigProvider } from 'antd'

function App() {

  return (
    <>
      <ConfigProvider theme={{ token: { colorPrimary: '#F0C54F' } }} >
    <LoginPage />
    </ConfigProvider>
    </>
  );
}
export default App;