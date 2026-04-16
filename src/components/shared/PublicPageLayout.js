import Header from "./Header";
import Footer from "./Footer";
import MobileStickyCta from "./MobileStickyCta";

export default function PublicPageLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <MobileStickyCta />
    </>
  );
}
