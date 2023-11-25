import { ReactNode } from "react";
import Header from "./header";
import { SearchForm } from "./SearchForm";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="content">
      <Header />
      <SearchForm />
      {children}
    </div>
  );
};

export default Layout;
