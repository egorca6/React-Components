import { ReactNode } from "react";
import Header from "./header";
import { SearchForm } from "./SearchForm";
import { App } from "./App";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="content">
      <Header />
      {children}
      <App />
    </div>
  );
};

export default Layout;
