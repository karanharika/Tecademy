// aws-exports.js
const awsConfig = {
    Auth: {
        Cognito: {
          region: "ap-south-1",
          userPoolId: "ap-south-1_0KCR9EPtH",
          userPoolWebClientId: "568vclf34nfvdada1ajega50df",
          mandatorySignIn: false,
        },

        // region: "ap-south-1",
        // userPoolId: "ap-south-1_0KCR9EPtH",
        // userPoolWebClientId: "568vclf34nfvdada1ajega50df",
        // mandatorySignIn: false,
    },
};

export default awsConfig;
