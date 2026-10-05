import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./research.css";

export default function ResearchLayout({ children }: { children: React.ReactNode }) {
  return (
    <div id="top" className="research-site">
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </div>
  );
}
