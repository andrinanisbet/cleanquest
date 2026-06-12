export default function ProgressBar ( Points )



{
    const progressPerventage = Points % 100;

    return(
        <> 
        <div style = {{height: "20px", border: "1px solid #000" }} ></div>
        <div
        style={{
            width:'${progressPercentage}%',
            backgroundColor: "#4caf50",
            height: "100%",
        }}
        ></div>
        </>
    );
};
};