import styles from '../../styles/Home.module.css';
import { faFloppyDisk, faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useEffect } from 'react';
import Switch from '@mui/material/Switch';
import { useSelector, useDispatch } from 'react-redux';


////////////////////////////////////////////////////////////////////////////////

const SendMail = (props) => {

    const [mailMessageInput, setMailMessageInput] = useState("")
    const [mailObjectInput, setMailObjectInput] = useState("")

    const user = useSelector((state) => state.user);

    const {
        name,
        mailRecipient,
        closeMailSend,

    } = props;

    console.log(user.id)
    console.log(name)

    const mailRoute = mailRecipient === "santaClaus" ?
        "envoiMessagePereNoel" :
        "envoiMessageCible"


    const handleSaveData = async () => {
        const dataToSave =
        {
            idExpediteur: user.id,
            loginCible: name,
            message: mailMessageInput,
            objet: mailObjectInput || "",
            corps: "<p>TEST !!!</p>"
        }



        // }

        // closeNameSection();

        try {

            const response = await fetch(`https://noel.helvie.fr/api/${mailRoute}`, {
                method: 'POST',
                headers: {
                    "Noel-Token": user.token,
                    "User-Name": encodeURIComponent(user.name),
                    "App-Name": "NoelTan",
                    "content-type": 'application/json'
                },
                body: JSON.stringify(dataToSave)
            });

            if (!response.ok) {
                throw new Error(`Erreur HTTP! Statut: ${response.status}`);
            }

            const data = await response.text();
            console.log("Réussi", data);
            return data;
        } catch (error) {
            console.error("Erreur maj user", error);
            throw error;

        };

    }



    return (

        <div className={styles.writeMailSection}>
            {mailRecipient === "person" ?
                <h2>Envoie ton message à {name} </h2> :
                mailRecipient === "santaClaus" ?
                    <h2>Envoie ton message au père-noël de {name}</h2> :
                    null

            }

            {mailRecipient === "person" &&
                <input
                    className={styles.sendMailInput}
                    type="text"
                    name="mailObject"
                    onChange={(e) => setMailObjectInput(e.target.value)}
                    value={mailObjectInput || ''}
                />}

            <textarea
                className={styles.sendMailTextarea}
                type="text"
                name="mailMessage"
                onChange={(e) => setMailMessageInput(e.target.value)}
                value={mailMessageInput || ''}
                rows={4}
            />


            <div className={styles.userDataSaveLogosContainer}>

                <FontAwesomeIcon
                    className={styles.returnUserDataIcon}
                    icon={faRotateLeft}
                    onClick={closeMailSend}
                />

                <FontAwesomeIcon
                    className={styles.saveUserDataIcon}
                    icon={faFloppyDisk}
                    onClick={handleSaveData}
                />
            </div>


        </div>

    )
}

export default SendMail;