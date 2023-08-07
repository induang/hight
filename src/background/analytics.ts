import { GA_MEASUREMENT_ID, GA_API_SECRET } from '../../config';

const GA_ENDPOINT = 'https://www.google-analytics.com/mp/collect';

const DEFAULT_ENGAGEMENT_TIME_MSEC = 100;
const SESSION_EXPIRATION_IN_MIN = 30;

function generateUUID() {
  return crypto.randomUUID();
}
async function clientId() {
  let { uuid } = await chrome.storage.local.get('uuid');
  if (uuid) return uuid;

  uuid = generateUUID();
  chrome.storage.local.set({ uuid });
  return uuid;
}

async function sessionId() {
  let { sessionData } = await chrome.storage.session.get('sessionData');
  const currentTimeInMs = Date.now();

  if (sessionData?.timestamp) {
    const durationInMin = (currentTimeInMs - sessionData.timestamp) / 60000;
    if (durationInMin > SESSION_EXPIRATION_IN_MIN) {
      sessionData = null;
    } else {
      sessionData.timestamp = currentTimeInMs;
      await chrome.storage.session.set({ sessionData });
    }
  }

  if (!sessionData) {
    sessionData = {
      session_id: currentTimeInMs.toString(),
      timestamp: currentTimeInMs.toString(),
    };
    await chrome.storage.session.set({ sessionData });
  }
  return sessionData.session_id;
}

async function trackEvent(
  name: string,
  action: unknown,
  label = {},
  value = {},
  extraParams: { session_id?: string; engagement_time_msec?: number } = {},
) {
  if (!extraParams.session_id) {
    extraParams.session_id = await sessionId();
  }
  if (!extraParams.engagement_time_msec) {
    extraParams.engagement_time_msec = DEFAULT_ENGAGEMENT_TIME_MSEC;
  }

  try {
    await fetch(
      `${GA_ENDPOINT}?measurement_id=${GA_MEASUREMENT_ID}&api_secrect=${GA_API_SECRET}`,
      {
        method: 'POST',
        body: JSON.stringify({
          client_id: await clientId(),
          events: {
            name: name.replace('-', '_'),
            params: {
              action,
              ...(label && { label }),
              ...(value !== undefined && value !== null && { value }),
              ...extraParams,
            },
          },
        }),
      },
    );
  } catch (e) {
    console.error('Google Analytics request failed with an exception', e);
  }
}

export { trackEvent };
