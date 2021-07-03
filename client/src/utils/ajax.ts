import envData from '../../../config/env.json';
import Tokens from 'csrf';
import cookies from 'browser-cookies';

const { apiLocation } = envData as { apiLocation: string };

const base = apiLocation;
const tokens = new Tokens();

const defaultOptions: RequestInit = {
  credentials: 'include'
};

// _csrf is passed to the client as a cookie. Tokens are sent back to the server
// via headers:
function getCSRFToken() {
  const _csrf = typeof window !== 'undefined' && cookies.get('_csrf');
  if (!_csrf) {
    return '';
  } else {
    return tokens.create(_csrf);
  }
}

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${base}${path}`, defaultOptions);
  return (await res.json()) as Promise<T>;
}

export function post<T = void>(path: string, body: unknown): Promise<T> {
  return request('POST', path, body);
}

function put<T = void>(path: string, body: unknown): Promise<T> {
  return request('PUT', path, body);
}

async function request<T>(
  method: 'POST' | 'PUT',
  path: string,
  body: unknown
): Promise<T> {
  const options: RequestInit = {
    ...defaultOptions,
    method,
    headers: {
      'CSRF-Token': getCSRFToken(),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  };
  const res = await fetch(`${base}${path}`, options);
  return (await res.json()) as Promise<T>;
}

/** GET **/

interface ProfileUI {
  isLocked: boolean;
  showAbout: boolean;
  showCerts: boolean;
  showDonation: boolean;
  showHeatMap: boolean;
  showLocation: boolean;
  showName: boolean;
  showPoints: boolean;
  showPortfolio: boolean;
  showTimeLine: boolean;
}

interface File {
  contents: string;
  ext: string;
  path: string;
  name: string;
  key: string;
}

interface Challenge {
  completedDate: number;
  id: string;
  solution: string;
  githubLink: string;
  challengeType: number;
  files: File[];
}

interface Portfolio {
  description: string;
  id: string;
  image: string;
  title: string;
  url: string;
}

interface User {
  profileUI: ProfileUI;
  calendar: { [key: number]: number };
  streak: { current: number; longest: number };
  completedChallenges: Challenge[];
  portfolio: Portfolio[];
  about: string;
  githubProfile: string;
  isDonating: boolean;
  isGithub: boolean;
  isLinkedIn: boolean;
  isTwitter: boolean;
  isWebsite: boolean;
  joinDate: string;
  linkedin: string;
  location: string;
  name: string;
  picture: string;
  points: number | null;
  twitter: string;
  username: string;
  website: string;
  yearsTopContributor: string[];
}

interface SessionUser {
  user: User;
  sessionMeta: { activeDonations: number };
  result: string;
}
export function getSessionUser(): Promise<SessionUser> {
  return get('/user/get-session-user');
}

export function getUserProfile(username: string): Promise<User> {
  return get(`/api/users/get-public-profile?username=${username}`);
}

interface Cert {
  certTitle: string;
  username: string;
  date: Date;
  completionTime: string;
}
export function getShowCert(username: string, certSlug: string): Promise<Cert> {
  return get(`/certificate/showCert/${username}/${certSlug}`);
}

export function getUsernameExists(username: string): Promise<boolean> {
  return get(`/api/users/exists?username=${username}`);
}

// Doesn't appear to ever be used in other files
// export function getArticleById(shortId: string) {
//   return get(`/n/${shortId}`);
// }

/** POST **/

interface Donation {
  email: string;
  amount: number;
  duration: string;
  provider: string;
  subscriptionId: string;
  customerId: string;
  startDate: Date;
}
export function addDonation(body: Donation): Promise<void> {
  return post('/donate/add-donation', body);
}

interface Report {
  username: string;
  reportDescription: string;
}
export function postReportUser(body: Report): Promise<void> {
  return post('/user/report-user', body);
}

// Both are called without a payload in danger-zone-saga,
// which suggests both are sent without any body
export function postDeleteAccount(): Promise<void> {
  return post('/account/delete', {});
}

export function postResetProgress(): Promise<void> {
  return post('/account/reset-progress', {});
}

/** PUT **/
interface MyAbout {
  name: string;
  location: string;
  about: string;
  picture: string;
}
export function putUpdateMyAbout(values: MyAbout): Promise<void> {
  return put('/update-my-about', { ...values });
}

export function putUpdateMyUsername(username: string): Promise<void> {
  return put('/update-my-username', { username });
}

export function putUpdateMyProfileUI(profileUI: ProfileUI): Promise<void> {
  return put('/update-my-profileui', { profileUI });
}

// Update should contain only one flag and one new value
interface Update {
  [flag: string]: string;
}
export function putUpdateUserFlag(update: Update): Promise<void> {
  return put('/update-user-flag', update);
}

export function putUserAcceptsTerms(quincyEmails: boolean): Promise<void> {
  return put('/update-privacy-terms', { quincyEmails });
}

export function putUserUpdateEmail(email: string): Promise<void> {
  return put('/update-my-email', { email });
}

export function putVerifyCert(certSlug: string): Promise<void> {
  return put('/certificate/verify', { certSlug });
}
