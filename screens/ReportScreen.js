import { useContext, useEffect, useRef, useState } from "react";
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { StyleSheet, Text, TouchableOpacity, View, Modal } from "react-native";
import { COLORS } from "../components/constants";
import { Paragraph, SizableText } from "tamagui";
import Header from "../components/ReportScreen/Header";
import { transactionContext } from "../Contexts/TransactionContext";
import { Entypo } from "@expo/vector-icons";
import LottieView from 'lottie-react-native';
import { AuthContext } from "../Contexts/AuthProviderContext";

function ReportScreen(){
    const [ loading, setLoading ] = useState(false);
    const { transactions, storeTransaction } = useContext(transactionContext);
    const { user, firestoreUser, setFirestoreUser } = useContext(AuthContext);
    const [visible, setVisible] = useState(false);
    const animationRef = useRef(null);
    const ModalPopUp = ({ visible, children }) => {
        return (
          <Modal transparent visible={visible} style={{ width: '100%', height: '100%' }} animationType="fade">
            <View style={styles.modalContainer}>
              <View style={styles.modalData}>{children}</View>
            </View>
            
          </Modal>
        );
      };
    const generateReportPDF = async ()=>{
        setVisible(true);
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
        setVisible(false);
    }
    const timeoutPromise = async ()=>{
        return new Promise((resolve, reject)=>{
            setTimeout(() => {
                // just a timer
                setVisible(false);
                resolve();
            }, 1600);
        });
    }
    function getFormattedDate(){
        const d = new Date();
        let day = d.getDate();
        let month = d.getMonth() + 1;
        let year = d.getUTCFullYear();
        return day+"/"+month+"/"+year;
    }
    async function generateTradeReport(){
        setVisible(true);
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
        })
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
            // background-color: ${ COLORS.primary };
            // background-color: #002060;
            font-weight: bold;
            color: white;
          }
          #container{
            background-color: #002060;
            // background-color: ${ COLORS.primary };
            margin-bottom: 16px;
        }
        .heading h2{
            color: white;
        }
        .heading h1{
            color: red;
        }
        .heading{
            display: flex;
            justify-content: center;
            align-items: baseline;
        }
        .title{
            color: red;
            font-size: 18px;
            font-weight: bold;
        }
        .content{
            color: white;
            margin-left: 5px;
        }
        .info{
            display: flex;
            justify-content: center;
            align-items: center;
        }
        </style>
        <body>
        <div id="container">
        <div class="heading">
            <h2>Coin</h2>
            <h1>STACK</h1>
        </div>
        <div class="info">
            <p class="title">Name:</p>
            <div class="content">${ firestoreUser?.name }</div>
        </div>
        <div class="info">
            <p class="title">Email ID:</p>
            <div class="content">${ firestoreUser?.email }</div>
        </div>
        <div class="info">
            <p class="title">Phone:</p>
            <div class="content">${ firestoreUser?.phone }</div>
        </div>
        <div class="info">
            <p class="title">Date:</p>
            <div class="content">${ getFormattedDate() }</div>
        </div>
    </div>
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
        const print = await Print.printToFileAsync({ html });
        console.log('File has been saved to:', print.uri);
        const timeout = timeoutPromise();
        Promise.all([print, timeout]).then(async ()=>{
            await shareAsync(print.uri, { UTI: '.pdf', mimeType: 'application/pdf' });
            setLoading(false);
        });
        
    }
    useEffect(()=>{
        // generateReportPDF();
    },[]);
    return(
        <View style={styles.container}>
            <Header />

            <ModalPopUp visible={visible}>
                <View style={{ width: '100%', height: '100%' }} >
                    <LottieView
                        ref={animationRef}
                        style={{
                                width: '100%',
                                height: '100%',
                                alignSelf: 'center',
                                color: COLORS.primary,
                        }}
                        autoPlay
                        loop
                        source={require('../assets/Loading (1).json')}
                    />
                </View>
          </ModalPopUp>

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
    },
    modalContainer: {
        // flex: 1,
        width: '100%',
        height: '100%',
        // borderWidth: 2,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
      },
      modalData: {
        width: "65%",
        height: "16%",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        borderRadius: 10,
        elevation: 10,
      },
      modalHeader: {
        width: "100%",
        alignItems: "flex-end",
      },
})
export default ReportScreen;