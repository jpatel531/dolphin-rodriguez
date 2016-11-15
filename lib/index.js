var mturk = require('mturk-api');
var xml2js = require('xml2js');
var _ = require('underscore');
var builder = new xml2js.Builder({ headless: true });
var x = builder.buildObject({
    QuestionForm: {
        $: {
            xmlns: "http://mechanicalturk.amazonaws.com/AWSMechanicalTurkDataSchemas/2005-10-01/QuestionForm.xsd",
        },
        Overview: {
            Title: "What was the score in this game?",
            Text: "Help us determine the goals scored by each team",
            EmbeddedBinary: {
                EmbeddedMimeType: {
                    Type: "image",
                    SubType: "jpeg"
                },
                DataURL: "https://s3.amazonaws.com/dolphin-rodriguez/test.jpg",
                AltText: "The final score",
                Width: "500",
                Height: "300"
            }
        },
        Question: [{
                QuestionIdentifier: "001",
                DisplayName: "Question 001",
                IsRequired: true,
                QuestionContent: {
                    Title: "Score this game",
                    Text: "How many goals did Cheltenham Town score?"
                },
                AnswerSpecification: {
                    FreeTextAnswer: {
                        Constraints: {
                            IsNumeric: {}
                        }
                    }
                }
            },
            {
                QuestionIdentifier: "002",
                DisplayName: "Question 002",
                IsRequired: true,
                QuestionContent: {
                    Title: "Score this game",
                    Text: "How many goals did V. Guimarães score?"
                },
                AnswerSpecification: {
                    FreeTextAnswer: {
                        Constraints: {
                            IsNumeric: {}
                        }
                    }
                }
            }]
    }
});
var config = {
    access: process.env.AWS_ACCESS_KEY_ID,
    secret: process.env.AWS_SECRET_ACCESS_KEY,
    sandbox: true
};
console.log(x);
mturk.createClient(config).then(function (api) {
    api.req('CreateHIT', {
        Title: "Video Game Image Recognition Test",
        Description: "Tell us the scores of these FIFA games",
        AssignmentDurationInSeconds: 60,
        AutoApprovalDelayInSeconds: 60,
        Reward: { Amount: 0.05, CurrencyCode: "USD" },
        Question: _.escape(x),
        Keywords: "video-game, fifa, football",
        LifetimeInSeconds: 60 * 20,
        MaxAssignments: 1
    }).then(console.log).catch(console.error);
}).catch(console.error);
//# sourceMappingURL=index.js.map