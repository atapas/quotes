require("dotenv").config();

import axios from "axios";
import Session from "supertokens-auth-react/recipe/session";
import PasswordlessNode from "supertokens-node/recipe/passwordless";
import SessionNode from "supertokens-node/recipe/session";
import { appInfo } from "./appInfo";
let { getEmailBody } = require("../util/mailer");

export const backendConfig = () => {
  Session.addAxiosInterceptors(axios);
  const nodemailer = require('nodemailer');

  const mailTransporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASSWORD,
    },
  });

  return {
    framework: "express",
    supertokens: {
      // try.supertokens.com is for demo purposes. Replace this with the address of your core instance (sign up on supertokens.com), or self host a core.
      connectionURI: "https://try.supertokens.com",
      // apiKey: "IF YOU HAVE AN API KEY FOR THE CORE, ADD IT HERE",
    },
    appInfo,
    recipeList: [
      PasswordlessNode.init({
        flowType: "USER_INPUT_CODE_AND_MAGIC_LINK",
        contactMethod: "EMAIL_OR_PHONE",
        createAndSendCustomEmail: async (input, context) => {
          try{
            let htmlBody = getEmailBody(
              appInfo.appName,
              Math.ceil(input.codeLifetime / 1000),
              input.urlWithLinkCode,
              input.userInputCode,
              input.email
            );
            await mailTransporter.sendMail({
              html: htmlBody,
              to: input.email,
              from: `Team Supertokens <${process.env.NODEMAILER_USER}>`,
              sender: process.env.NODEMAILER_USER,
              subject: `Login to ${appInfo.appName}`,
            });
          } catch (err) {
            console.log(err);
          }
        },
        createAndSendCustomTextMessage: async (input, context) => {
          try {
            await axios({
              method: "post",
              baseURL: "https://api.supertokens.com",
              url: "/0/st/twilio/message",
              headers: {
                "api-version": "0",
              },
              data: {
                to: input.phoneNumber,
                appName: appInfo.appName,
                codeLifetime: Math.ceil(input.codeLifetime / 1000),
                urlWithLinkCode: input.urlWithLinkCode,
                userInputCode: input.userInputCode,
              },
            });
          } catch (err) {
            console.log(err);
            if (err.response.status !== 429) {
              throw err;
            }
            throw Error(
              "Too many requests made for passwordless sign-in/up with phone number. The number of requests are restricted for this demo app. Please try again after 24 hours."
            );
          }
        },
      }),
      SessionNode.init(),
    ],
    isInServerlessEnv: true,
  };
};
