import React, { useEffect, useState } from "react";
import ColorPicker from "../components/CreateLolly/ColorPicker";
import Details from "../components/CreateLolly/Details";
import LollyInfo from "../components/CreateLolly/LollyInfo";
import Lolly from "../components/Lolly";
import "../styles/main.css";
import { createLolly } from '../graphql/mutations';
import { API } from 'aws-amplify';


const createLollies = () => {
    const [colorTop, setColorTop] = useState("#fa4234");
    const [colorMiddle, setColorMiddle] = useState("#651bde");
    const [colorBottom, setColorBottom] = useState("#e6194c");
    const [recipient, setRecipient] = useState("");
    const [message, setMessage] = useState("");
    const [sender, setSender] = useState("");
    const [submission, setSubmission] = useState<boolean>(false);
    const [link, setLink] = useState("");

    useEffect(() => {
        if (submission === true) {
            const lolly = {
                id: 'mk'+Math.random(),
                colorTop: colorTop,
                colorMiddle: colorMiddle,
                colorBottom: colorBottom,
                recipient: recipient,
                message: message,
                sender: sender,
                lollyPath: link,
            }
            API.graphql({
                query: createLolly,
                variables: {
                    lolly: lolly
                }
            })
        }
    }, [submission === true]);

    return (
        <div className="createLolly">
            <Lolly
                lollyTop={colorTop}
                lollyMiddle={colorMiddle}
                lollyBottom={colorBottom}
            />

            {submission === true ? (
                <LollyInfo
                    recipient={recipient}
                    message={message}
                    sender={sender}
                    lollyPath={link}
                    setSubmission={setSubmission}
                />
            ) : (
                    <>
                        <ColorPicker
                            colorTop={colorTop}
                            setColorTop={setColorTop}
                            colorMiddle={colorMiddle}
                            setColorMiddle={setColorMiddle}
                            colorBottom={colorBottom}
                            setColorBottom={setColorBottom}
                        />

                        <Details
                            setRecipient={setRecipient}
                            setMessage={setMessage}
                            setSender={setSender}
                            setSubmission={setSubmission}
                            setLink={setLink}
                        />
                    </>
                )}
        </div>
    );
};

export default createLollies;