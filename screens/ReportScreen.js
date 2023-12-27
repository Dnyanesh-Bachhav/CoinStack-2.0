import { useEffect } from "react";
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { Text, View } from "react-native";

function ReportScreen(){
    const generateReportPDF = async ()=>{
        const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Document</title>
        </head>
        <body>
            <h1>Hello World...!!!</h1>
            <p>It is pdf generated from React Native</p>
        </body>
        </html>
        `;
        
        const { uri } = await Print.printToFileAsync({ html });
        console.log('File has been saved to:', uri);
        await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
    }

    useEffect(()=>{
        generateReportPDF();
    },[]);
    return(
        <View>
            <Text><Hello>2dftgyu</Hello></Text>
        </View>
    );
}
export default ReportScreen;