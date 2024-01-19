import { CardSwiper } from "react-card-rotate-swiper";

//...

function App() {

  const handleSwipe = (d:void) => {
    //fill this your callback
  };
  
  return (
    <div className="App">
      <CardSwiper
        onSwipe={handleSwipe}
        className={"swiper"}
        contents={
          //fill this your element
            <img src={"https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_92x30dp.png"} alt="img"></img>
        }
      />
    </div>
  );
}
export default App;