import './Frame3.css';

export const Frame3: React.FC<{ text: string }> = ({ text }) => {
    return (
      <div className="container">
        <img style={{ width: "120vw", height: "120vh" }} src='/bretons-1/img/frame3.png' alt='background' />
        <img src='/bretons-1/img/athlete/JDE2.jpg' alt='overlay' style={{
            position: 'absolute',
            width: '253px',
            height: '253px',
            left: 409,
            bottom: 890,
            borderTopRightRadius: '10px',
            borderTopLeftRadius: '10px',
            zIndex: 5}} />
        <h1 style={{ fontFamily: 'SF Pro Text, Helvetica, Arial',
        fontWeight: 'bold',
        fontSize: 25,
        textAlign: 'center',
        position: 'absolute',
        bottom: 820,
        margin: 0,
        color: 'white',
        width: '100%',
        zIndex: 10}}>
        {text}</h1>
      </div>
    );
};
