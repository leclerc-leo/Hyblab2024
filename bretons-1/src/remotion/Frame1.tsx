export const Frame1: React.FC<{ text: string, titre: string, sous_titre: string }> = ({ text, titre, sous_titre }) => {
    return (
        <div style={{
            height: '100%',
            width: '100%',
            backgroundImage: `url(/bretons-1/img/athlete/JDE2.jpg)`,
            objectFit: 'cover',
            objectPosition: 'center center',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            position: 'relative',
        }}>
            <h1 style={{
                position: "absolute",
                color: "white",
                fontFamily: "Golos Text",
                fontSize: "13vh",
                fontStyle: "normal",
                fontWeight: "700",
                lineHeight: "normal",
                width: "100%",
                bottom: '31vh',
                textAlign: 'center',
            }}>{text}</h1>
            <h1 style={{
                position: "absolute",
                color: "white",
                fontFamily: "Golos Text",
                fontSize: "12vh",
                fontStyle: "normal",
                fontWeight: "700",
                lineHeight: "normal",
                width: "100%",
                bottom: '18vh',
                textAlign: 'center',
            }}>{titre}</h1>
            <h3 style={{
                position: "absolute",
                color: "white",
                fontFamily: "Golos Text",
                fontSize: "5vh",
                fontStyle: "normal",
                fontWeight: "700",
                lineHeight: "normal",
                width: "100%",
                bottom: '14vh',
                textAlign: 'center',
            }}>{sous_titre}</h3>
        </div>
    );
};
