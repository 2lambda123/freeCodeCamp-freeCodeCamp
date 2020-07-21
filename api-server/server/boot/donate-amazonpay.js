import debug from 'debug';
import generate from 'nanoid/generate';
import amazonPayments from 'amazon-payments';

import keys from '../../../config/secrets';
import { createAsyncUserDonation } from '../utils/donation';

const log = debug('fcc:boot:donate-amazonpay');
const nanoidCharSet =
  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const randomIdLength = 9;
const billingAgreementIdentifier = 'B';
const generalError = {
  error: 'Donation failed due to a server error.',
  type: 'ServerError'
};
const asyncSuccess = {
  type: 'success',
  message: `Amazon Pay is processing your payment. You will receive a confirmation once your payment is processed successfully`
};
const syncSuccess = {
  type: 'success',
  message: `Your payment has been processed.`
};

// initialize payment
let payment = amazonPayments.connect({
  environment: amazonPayments.Environment.Sandbox,
  sellerId: keys.amazon.sellerId,
  mwsAccessKey: keys.amazon.mwsId,
  mwsSecretKey: keys.amazon.mwsSecret,
  clientId: keys.amazon.clientId
});

export function GetAuthorizationDetails(id) {
  return new Promise((resolve, reject) => {
    payment.offAmazonPayments.getAuthorizationDetails(
      {
        AmazonAuthorizationId: id
      },
      (err, data) => {
        console.log(err);
        if (err) {
          return reject(err);
        }
        console.log('GetAuthorizationDetails');
        console.log(JSON.stringify(data));
        return resolve(data);
      }
    );
  });
}

export function getOrderReferenceDetails(AmazonOrderReferenceId) {
  return new Promise((resolve, reject) => {
    payment.offAmazonPayments.getOrderReferenceDetails(
      {
        AmazonOrderReferenceId: AmazonOrderReferenceId
      },
      (err, data) => {
        console.log(err);
        if (err) {
          return reject(err);
        }
        console.log('getOrderReferenceDetails');
        console.log(JSON.stringify(data));
        return resolve(data);
      }
    );
  });
}

// this funcion is for testing the billing agreement cancelation IPN
export function closeBillingAgreement(billingAgreementId) {
  return new Promise((resolve, reject) => {
    payment.offAmazonPayments.closeBillingAgreement(
      {
        AmazonBillingAgreementId: billingAgreementId
      },
      (err, data) => {
        if (err) {
          return reject(err);
        }
        console.log('CLOSE BILLING AGREEMENT');
        console.log(JSON.stringify(data));
        return resolve(data);
      }
    );
  });
}

export function CancelOrderReference(orderReferenceId) {
  // once the agreement is suspended due to InvalidPaymentMethod
  // we need to reconfirm the agreement
  console.log('rfid: ' + orderReferenceId);
  return new Promise((resolve, reject) => {
    payment.offAmazonPayments.cancelOrderReference(
      {
        AmazonOrderReferenceId: orderReferenceId
      },
      (err, data) => {
        if (err) {
          return reject(err);
        }
        console.log('CANCEL ORDER REFRENCE');
        console.log(JSON.stringify(data));
        return resolve(data);
      }
    );
  });
}

export function getAgreementDetails(billingAgreementId) {
  return new Promise((resolve, reject) => {
    payment.offAmazonPayments.getBillingAgreementDetails(
      {
        AmazonBillingAgreementId: billingAgreementId
      },
      (err, data) => {
        if (err) {
          return reject(err);
        }

        const { BillingAgreementDetails } = data;
        if (
          BillingAgreementDetails.Constraints &&
          BillingAgreementDetails.Constraints.Constraint
        ) {
          let constraintType =
            data.BillingAgreementDetails.Constraints.Constraint.ConstraintID;
          let constraintMessage;

          if (constraintType === 'PaymentPlanNotSet')
            constraintMessage = 'Please choose a payment method and resubmit';
          if (constraintType === 'BuyerConsentNotSet')
            constraintMessage =
              'Please allow reccuring payments' +
              'by clicking on empy box above submit button and resubmit';
          if (constraintType === 'BuyerEqualsSeller')
            constraintMessage =
              'Buyer cannot be sellers. Please try with another account';

          return reject({
            message: constraintMessage,
            type: constraintType
          });
        }
        console.log('GET AGREEMENT DETAILS');
        console.log(JSON.stringify(data));
        return resolve(BillingAgreementDetails);
      }
    );
  });
}

export function setAgreementDetails(
  BillingAgreementDetails,
  billingAgreementId
) {
  if (BillingAgreementDetails.BillingAgreementStatus.State === 'Draft')
    return new Promise((resolve, reject) => {
      payment.offAmazonPayments.setBillingAgreementDetails(
        {
          AmazonBillingAgreementId: billingAgreementId,
          BillingAgreementAttributes: {
            SellerNote: 'Donation to freeCodeCamp',
            StoreName: 'freeCodeCamp'
          }
        },
        (err, data) => {
          if (err) {
            return reject(err);
          }
          console.log('SET AGREEMENT DETAILS');
          console.log(JSON.stringify(data));
          return resolve(data);
        }
      );
    });
  return null;
}

export function confirmBillingAgreement(billingAgreementId) {
  // once the agreement is suspended due to InvalidPaymentMethod
  // we need to reconfirm the agreement
  return new Promise((resolve, reject) => {
    payment.offAmazonPayments.confirmBillingAgreement(
      {
        AmazonBillingAgreementId: billingAgreementId
      },
      (err, data) => {
        if (err) {
          return reject(err);
        }
        console.log('CONFIRM AGREEMENT DETAILS');
        console.log(JSON.stringify(data));
        return resolve(data);
      }
    );
  });
}

export function authorizeOnBillingAgreement(TransactionTimeout, req) {
  console.log('time: ' + TransactionTimeout);
  const randomchars = generate(nanoidCharSet, randomIdLength);
  const { donationAmount, billingAgreementId } = req.body;

  // it should not be more than 32 chars
  const AuthorizationReferenceId = `${billingAgreementIdentifier}_${randomchars}_${billingAgreementId}`;

  return new Promise((resolve, reject) => {
    payment.offAmazonPayments.authorizeOnBillingAgreement(
      {
        AmazonBillingAgreementId: billingAgreementId,
        AuthorizationReferenceId,
        AuthorizationAmount: {
          Amount: donationAmount / 100,
          CurrencyCode: 'USD'
        },
        TransactionTimeout: TransactionTimeout,
        CaptureNow: 'true',
        SoftDescriptor: 'freeCodeCamp',
        SellerAuthorizationNote: 'Donation to freeCodeCamp.org'
      },
      (err, data) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        const {
          ReasonCode,
          State
        } = data.AuthorizationDetails.AuthorizationStatus;
        const orderReferenceId = data.AmazonOrderReferenceId;
        let donationState;

        console.log(ReasonCode);
        console.log(State);

        if (State === 'Pending') {
          // asynccallcompleted
          donationState = 'AsyncCallCompleted';
        } else if (State === 'Declined') {
          if (ReasonCode === 'InvalidPaymentMethod') {
            // error is thrown so the payment method could be changed
            // and authorization can take place
            return reject({
              message: 'Please choose another payment method and resubmit',
              type: 'InvalidPaymentMethod'
            });
          } else if (ReasonCode === 'TransactionTimedOut') {
            console.log('TransactionTimedOut');
            // set the donationState
            donationState = 'AsyncAuthorizationCall';
          } else {
            donationState = 'CancelOrderRefrence';
          }
        } else donationState = 'CaptureSuccessful';

        console.log('donationData: ' + donationState);
        console.log('AUTHORIIIZE AGREEMENT DETAILS');
        console.log(JSON.stringify(data));
        return resolve({ donationState, orderReferenceId });
      }
    );
  });
}

const createAsyncUserBillingAgreement = (user, amazonBillingAgreement, app) => {
  const { AmazonBillingAgreement } = app.models;
  const { billingAgreementId } = amazonBillingAgreement;
  return AmazonBillingAgreement.findOne(
    { where: { billingAgreementId } },
    (err, billingAgreement) => {
      if (err) throw new Error(err);
      if (!billingAgreement) {
        log(
          `Creating billingAgreement:${amazonBillingAgreement.billingAgreementId}`
        );
        user
          .createAmzBillingAgreement(amazonBillingAgreement)
          .toPromise()
          .catch(err => {
            throw new Error(err);
          });
      }
    }
  );
};

export async function respondToClient(req, res, app, syncAuthInfo) {
  console.log('RESPOND TO CLIENT');
  const { donationState, orderReferenceId } = syncAuthInfo;
  console.log('donationState: ' + donationState);
  const startDate = nowDateString();
  const {
    user,
    body: { donationDuration, billingAgreementId }
  } = req;
  const amazonBillingAgreement = {
    duration: donationDuration,
    startDate,
    billingAgreementId
  };
  if (donationState === 'CaptureSuccessful') {
    const {
      Buyer: { Email }
    } = await getAgreementDetails(billingAgreementId);
    amazonBillingAgreement.email = Email;
    await createAsyncUserBillingAgreement(user, amazonBillingAgreement, app);

    /* 
    The billing agreement creation should happen here so we could find 
    the user based on the billingAgreement records from the 
    billingagreementid that we pass in the AuthorizationReferenceId
    */

    return res.status(200).json(syncSuccess);
  } else if (donationState === 'AsyncCallCompleted') {
    await createAsyncUserBillingAgreement(user, amazonBillingAgreement, app);
    return res.status(200).json(asyncSuccess);
  } else if (donationState === 'AsyncAuthorizationCall') {
    const asyncAuthInfo = await authorizeOnBillingAgreement(1440, req);
    if (asyncAuthInfo.donationState === 'AsyncCallCompleted') {
      const {
        Buyer: { Email }
      } = await getAgreementDetails(billingAgreementId);
      amazonBillingAgreement.email = Email;
      await createAsyncUserBillingAgreement(user, amazonBillingAgreement, app);
      return res.status(200).json(asyncSuccess);
    } else {
      throw generalError;
    }
  } else if (donationState === 'CancelOrderRefrence') {
    const BillingAgreementDetails = await getAgreementDetails(
      billingAgreementId
    );
    if (BillingAgreementDetails.BillingAgreementStatus.State === 'Open')
      CancelOrderReference(orderReferenceId);
    throw generalError;
  } else {
    throw generalError;
  }
}

const nowDateString = () => {
  return new Date(Date.now()).toISOString();
};

// -- IPN related functions -- //
function getRefrenceIdFromAuthorizationId(authorizationId) {
  var n = authorizationId.lastIndexOf('-');
  return authorizationId.slice(0, n);
}

function updateUserFromHook(parsedBody, app) {
  console.log('UPDATEUSER');

  const { NotificationData, NotificationType } = parsedBody;

  if (
    NotificationType === 'PaymentAuthorize' &&
    NotificationData.AuthorizationStatus.State === 'Closed' &&
    NotificationData.AuthorizationStatus.ReasonCode === 'MaxCapturesProcessed'
  ) {
    const [
      identifier,
      randomId,
      billingAgreementId
    ] = NotificationData.AuthorizationReferenceId.split('_');
    if (
      identifier === billingAgreementIdentifier &&
      randomId.length === randomIdLength &&
      billingAgreementId
    ) {
      createDonationFromIPN(
        parsedBody,
        billingAgreementId,
        NotificationData,
        app
      );
    }
  } else if (
    NotificationType === 'BillingAgreementNotification' &&
    NotificationData.BillingAgreementStatus.State === 'Closed'
  ) {
    console.log(parsedBody);
    const billingAgreementId = NotificationData.AmazonBillingAgreementId;
    const { AmazonBillingAgreement, User } = app.models;
    AmazonBillingAgreement.findOne(
      {
        where: {
          billingAgreementId: billingAgreementId
        }
      },
      (err, billingAgreement) => {
        if (err || !billingAgreement) throw err;
        if (billingAgreement.endDate) return;

        log(`Cancellling ${billingAgreementId} AmazonBillingAgreement`);

        const { userId } = billingAgreement;
        billingAgreement.updateAttributes({
          endDate: nowDateString()
        });
        User.findOne({ where: { id: userId } }, (err, user) => {
          if (err || !user) throw err;
          user.updateAttributes({
            isDonating: false
          });
        });
      }
    );
  } else if (NotificationType === 'OrderReferenceNotification') {
    if (NotificationData.OrderReferenceStatus.State === 'Closed') {
      // check if there is a donation associated with it.
      // if not call centry if not payment was found.
      // (either by checking capture or)
      // console.log(NotificationData);
      // getOrderReferenceDetails(NotificationData.AmazonOrderReferenceId);
    }
    if (NotificationData.OrderReferenceStatus.State === 'Open') {
      // call the getOrderDetails api for parentDetails
      // get the agreement id and make an async call
      // avoid calling the api twice
      // (this could be open when auth has been just executed)
    }
  }
}

function createDonationFromIPN(
  parsedBody,
  billingAgreementId,
  NotificationData,
  app
) {
  const orderReferenceId = getRefrenceIdFromAuthorizationId(
    NotificationData.AmazonAuthorizationId
  );
  const { AmazonBillingAgreement, User, Donation } = app.models;
  const amount = Math.trunc(
    parseFloat(NotificationData.CapturedAmount.Amount) * 100
  );

  /* amazon could send multiple IPN for the same transaction,
  so we should avoid duplicate records.
  */
  Donation.findOne({ where: { orderReferenceId } }, (err, donation) => {
    if (err) throw Error(err);
    if (!donation) {
      AmazonBillingAgreement.findOne(
        { where: { billingAgreementId } },
        (err, billingAgreement) => {
          if (err || !billingAgreement) throw err;
          const { userId, email } = billingAgreement;
          User.findOne({ where: { id: userId } }, (err, user) => {
            if (err || !user) throw err;
            const donation = {
              email,
              amount,
              duration: 'AmazonBillingAgreement',
              provider: 'amazon',
              subscriptionId: billingAgreementId,
              customerId: email,
              startDate: nowDateString(),
              orderReferenceId
            };
            createAsyncUserDonation(user, donation);
          });
        }
      );
    } else {
      console.log('douplicate record');
    }
  });
}

function verifyWebHook(req) {
  // check if webhook type for creation
  const jsonBody = JSON.parse(req.body);
  return new Promise((resolve, reject) => {
    payment.parseSNSResponse(jsonBody, function(err, parsed) {
      if (err) {
        return reject(err);
      }
      console.log(parsed.NotificationType);
      return resolve(parsed);
    });
  });
}

// check for body and user
function checkAuthorizatioin(req, res) {
  const { user, body } = req;
  if (!user || !body) {
    return res
      .status(500)
      .send({ error: 'User must be signed in for this request.' });
  }
  return null;
}

export default function donateAmazonPay(app, done) {
  const api = app.loopback.Router();
  const hooks = app.loopback.Router();
  const donateRouter = app.loopback.Router();

  // set global vars to be accessible by all functions
  let billingAgreementId;

  // -- API Endpoints -- //
  function createAmazonPayDonation(req, res) {
    // return if user is not signed in
    checkAuthorizatioin(req, res);

    billingAgreementId = req.body.billingAgreementId;

    return (
      Promise.resolve(req)
        .then(() => getAgreementDetails(billingAgreementId))
        .then(details => setAgreementDetails(details, billingAgreementId))
        .then(() => confirmBillingAgreement(billingAgreementId))
        .then(() => authorizeOnBillingAgreement(0, req))
        .then(syncAuthInfo => respondToClient(req, res, app, syncAuthInfo))
        // .then(closeBillingAgreement)
        .catch(err => {
          log(err.message);
          if (
            err.type === 'PaymentPlanNotSet' ||
            err.type === 'BuyerConsentNotSet' ||
            err.type === 'BuyerEqualsSeller' ||
            err.type === 'InvalidPaymentMethod'
          ) {
            return res.status(402).send({ error: err.message, type: err.type });
          }
          return res.status(500).send(generalError);
        })
    );
  }

  function apihookUpdateAmazonPay(req, res) {
    return Promise.resolve(req)
      .then(verifyWebHook)
      .then(parsedBody => updateUserFromHook(parsedBody, app))
      .catch(err => {
        log(err.message);
      })
      .finally(() =>
        res.status(200).json({ message: 'received amazonpay hook' })
      );
  }

  const { sellerId, mwsId, mwsSecret, clientId, clientSecret } = keys.amazon;

  const sellerIdInvalid =
    !sellerId || sellerId === 'seller_id_from_seller_central';
  const mwsIdInvalid = !mwsId || mwsId === 'mws_access_key_from_seller_central';
  const mwsSecretInvalid =
    !mwsSecret || mwsSecret === 'mws_secret_key_from_seller_central';
  const clientIdInvalid =
    !clientId || clientId === 'client_id_from_seller_central';
  const clientSecretInvalid =
    !clientSecret || clientSecret === 'client_secret_from_seller_central';

  if (
    sellerIdInvalid ||
    mwsIdInvalid ||
    mwsSecretInvalid ||
    clientIdInvalid ||
    clientSecretInvalid
  ) {
    if (process.env.FREECODECAMP_NODE_ENV === 'production') {
      throw new Error('AmazonPay API keys are required to boot the server!');
    }
    log(
      'Donation disabled in development' + ' unless ALL test keys are provided'
    );
    done();
  } else {
    api.post('/charge-amazonpay', createAmazonPayDonation);
    hooks.post('/update-amazonpay', apihookUpdateAmazonPay);
    donateRouter.use('/donate', api);
    donateRouter.use('/hooks', hooks);
    app.use(donateRouter);
  }
}
