import Header from "../header/Header";
import LandingPage from "../landingPage/LandingPage";
import "../landingPage/LandingPage.css";
import Footer from "../footer/Footer";
import "../header/Header.css";
import Contact from "../contact/Contact";
import "../contact/Contact.css"

function Home(){
    return<>
    <Header/>
    <LandingPage/>
    <Contact/>
    <Footer/>
    </>
}
export default Home;