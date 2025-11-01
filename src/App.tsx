import Header from "./components/Header/Header.tsx";
import s from "./App.module.css";
import Intro from "./components/Intro/Intro.tsx";
import AboutTheProject from "./components/AboutTheProject/AboutTheProject.tsx";
import Exchange from "./components/Exchange/Exchange.tsx";
import Rate from "./components/Rate/ui/Rate.tsx";
import Reviews from "./components/ Reviews/Reviews.tsx";
import Footer from "./components/Footer/Footer.tsx";

function App() {
    return (
        <div className={s.container}>
            <Header/>
            <Intro/>
            <div id={"about"}>
                <AboutTheProject/>
            </div>
            <div id={"exchange"}>
                <Exchange/>
            </div>
            <div id={"rate"}>
                <Rate/>
            </div>
            <div id={"reviews"}>
                <Reviews/>
            </div>
            <Footer/>
        </div>
    );
}

export default App;
