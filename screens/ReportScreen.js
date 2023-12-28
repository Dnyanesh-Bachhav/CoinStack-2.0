import { useContext, useEffect, useState } from "react";
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../components/constants";
import { Paragraph, SizableText } from "tamagui";
import Header from "../components/ReportScreen/Header";
import { transactionContext } from "../Contexts/TransactionContext";

function ReportScreen(){
    const [ loading, setLoading ] = useState(false);
    const { transactions, storeTransaction } = useContext(transactionContext);
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
    async function generateTradeReport(){
        setLoading(true);
        console.log(transactions[0]);
        let tableData = "";
        transactions.forEach((item, index) => {
            tableData += `
            <tr>
                <td>${ index+1 }</td>
                <td>${ item.coin }</td>
                <td>${ item.name }</td>
                <td>${ item.type }</td>
                <td>${ item.quantity }</td>
                <td>${ item.date }</td>
            </tr>
            `;
        } )
        const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Document</title>
        </head>
        <style>
        body{
            // border: 1px solid black;
        }
        @page{
            margin: 10px;
        }
        #transactions {
            padding: 20px 12px 20px 12px;
            // padding: 10px;
            font-family: Arial, Helvetica, sans-serif;
            border-collapse: collapse;
            width: 100%;
            padding
          }
          
          #transactions td, #customers th {
            border: 1px solid #ddd;
            padding: 8px;
          }
          
          #transactions tr:nth-child(even){background-color: #f2f2f2;}
          
          #transactions tr:hover {background-color: #ddd;}
          
          #transactions th {
            padding-top: 12px;
            padding-bottom: 12px;
            text-align: left;
            background-color: ${ COLORS.primary };
            color: white;
          }
        </style>
        <body>
            <table id="transactions">
                <thead>
                    <th>No.</th>
                    <th>Coin ID</th>
                    <th>Coin Name</th>
                    <th>Transaction Type</th>
                    <th>Quantity</th>
                    <th>Date</th>
                </thead>
                <tbody>
                ${ tableData }
                </tbody>
            </table>
        </body>
        </html>
        `;
        const { uri } = await Print.printToFileAsync({ html });
        console.log('File has been saved to:', uri);
        await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
        setLoading(false);
    }
    useEffect(()=>{
        // generateReportPDF();
    },[]);
    return(
        <View style={styles.container}>
            <Header />
            <View style={styles.contentContainer}>
                <TouchableOpacity style={styles.reportItem} onPress={()=>{
                    generateTradeReport();
                }} >
                    <SizableText style={styles.headingText} size="$6">Trade Report</SizableText>
                    <Paragraph style={styles.descriptionText}>Access all your crypto trades on CoinStack at one place</Paragraph>
                </TouchableOpacity>
                <TouchableOpacity style={styles.reportItem}>
                    <SizableText style={styles.headingText} size="$6">Overall Report</SizableText>
                    <Paragraph style={styles.descriptionText}>Get the overall report of a trades performed on a CoinStack</Paragraph>
                </TouchableOpacity>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: COLORS.white
    },
    contentContainer:{
        paddingHorizontal: 10,
        marginTop: 16

    },
    descriptionText:{
        color: COLORS.grayDark,
    },
    headingText:{
        color: COLORS.primary,
        fontWeight: 'bold'
    },
    reportItem:{
        borderBottomWidth: 1,
        borderBottomColor: COLORS.gray,
        marginBottom: 16,
        paddingBottom: 4
    }
})
export default ReportScreen;