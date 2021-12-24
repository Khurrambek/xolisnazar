import Login from "./admin/pages/LoginPage/LoginPage";
import Admin from "./admin/AdminApp";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home/Home";
import Obuna from "./pages/Obuna/Obuna";
import Contact from "./pages/Contact/Contact";
import Category from "./pages/Category/Category";
import Blog from "./pages/Blog/Blog";
import Faq from "./pages/Faq/Faq";
import Magazine from "./pages/Magazines/Magazine";
import IndexContext from "./indexContect";
import TextSelector from "text-selection-react";
import { useSpeechSynthesis } from "react-speech-kit";
import "./App.css";
import Search from "./pages/Search/Search";
import Portret from "./pages/Portret/Portret";

function App() {
  const [til, setTil] = useState(true);
  const [isToken, setisToken] = useState(true);
  const [store, setStore] = useState();
  const [blogNewsData, setBlogNewsData] = useState([]);
  const [categoryRoute, setCategoryRoute] = useState("");
  const [categoryRouteId, setCategoryRouteId] = useState("");
  const [categoryNewsData, setCategoryNewsData] = useState([]);
  const [latestNewsData, setLatestNewsData] = useState([]);
  const [magazineData, setMagazineData] = useState([]);
  const [stop, setStop] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const { speak, cancel } = useSpeechSynthesis();

  const storeCollector = () => {
    let storage = JSON.parse(localStorage.getItem("token"));
    if (storage && isToken) {
      setStore(storage);
      setisToken(false);
    }
  };
  useEffect(() => {
    storeCollector();
  }, [refresh]);

  // =============================

  const stopVoice = () => {
    let tooltipId = document.querySelector("#tooltip");
    if (tooltipId) {
      tooltipId.addEventListener("click", function () {
        cancel();
      });
    }
  };

  const playMusic = (text) => {
    speak({ text: text });
    setStop(!stop);
  };

  useEffect(() => {
    stopVoice();
  }, [stop]);

  return (
    <IndexContext.Provider
      value={{
        setCategoryRoute,
        categoryRoute,
        setCategoryRouteId,
        categoryRouteId,
        setCategoryNewsData,
        categoryNewsData,
        setRefresh,
        refresh,
        store,
        setisToken,
        isToken,
        blogNewsData,
        setBlogNewsData,
        setLatestNewsData,
        latestNewsData,
        setMagazineData,
        magazineData,
        setTil,
        til,
      }}
    >
      <TextSelector
        events={[
          {
            text: ".",
            handler: (html, text) => {
              playMusic(text);
            },
          },
        ]}
        colorText={true}
        color={"#ddd"}
        unmark={true}
      />
      <Router forceRefresh={true}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/obuna" component={Obuna} />
          <Route path="/contact" component={Contact} />
          <Route path="/category/:id" component={Category} />
          <Route path="/portret/:id" component={Portret} />
          <Route path="/magazine/:id" component={Magazine} />
          <Route path="/blog/:id" component={Blog} />
          <Route path="/faq" component={Faq} />
          <Route path="/search/:id" component={Search} />
          <Route
            path="/admin"
            component={() => <Admin authorized={isToken} />}
          />
          <Route path="/login" component={Login} />
        </Switch>
      </Router>
    </IndexContext.Provider>
  );
}

export default App;
