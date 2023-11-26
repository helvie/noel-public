import { BACKEND_URL } from '@/utils/urls';

const TokenForUserService = () => {

    const getTokenForUser = async (logs, setErrorLoginPass) => {
        try {
            const response = await fetch(`${BACKEND_URL}/api/gettokenforuser.php`, {
                method: 'POST',
                headers: {
                    "App-Name": "NoelTan",
                    "App-Key": "***",
                    "content-type": 'application/json'
                },
                body: JSON.stringify({
                    login: logs.signinName,
                    mdp: logs.signinPassword
                })
            });

            if (response.status === 200) {
                setErrorLoginPass(false);
                const tokenData = await response.text();

                return { success: true, message: 'Authentification réussie', token: tokenData, name:logs.signinName };
            } else {
                setErrorLoginPass(true);
                throw new Error("Failed to get token. Status: " + response.status);
            }
        } catch (error) {
            console.error("Une erreur s'est produite lors de la récupération du token : ", error);
        }
    };

    return {
        getTokenForUser,
    };
};

export default TokenForUserService;