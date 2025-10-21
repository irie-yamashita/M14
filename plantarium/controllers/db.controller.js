import fs from "fs"; //treballar amb arxius



export const readData = () => {
    try {
        const data = fs.readFileSync("./db/db.json", "utf-8");
        //console.log(data);
        //console.log(JSON.parse(data));
        return JSON.parse(data);

    } catch (error) {
        console.log(error);
    }
};

//Funció per escriure informació
export const writeData = (data) => {
    try {
        fs.writeFileSync("./db/db.json", JSON.stringify(data));

    } catch (error) {
        console.log(error);
    }
};