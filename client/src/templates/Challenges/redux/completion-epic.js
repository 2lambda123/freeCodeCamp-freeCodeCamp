import { of, empty } from 'rxjs';
import {
  switchMap,
  retry,
  catchError,
  concat,
  filter,
  tap
} from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { navigate } from 'gatsby';

import {
  projectFormValuesSelector,
  types,
  challengeMetaSelector,
  challengeTestsSelector,
  closeModal,
  challengeFilesSelector,
  updateSolutionFormValues
} from './';
import {
  userSelector,
  isSignedInSelector,
  submitComplete,
  updateComplete,
  updateFailed,
  usernameSelector
} from '../../../redux';

import postUpdate$ from '../utils/postUpdate$';
import { challengeTypes, submitTypes } from '../../../../utils/challengeTypes';
import { getVerifyCanClaimCert } from '../../../utils/ajax';

function postChallenge(update, username) {
  const saveChallenge = postUpdate$(update).pipe(
    retry(3),
    switchMap(({ points }) =>
      of(
        submitComplete({
          username,
          points,
          ...update.payload
        }),
        updateComplete()
      )
    ),
    catchError(() => of(updateFailed(update)))
  );
  return saveChallenge;
}

function submitModern(type, state) {
  const challengeType = state.challenge.challengeMeta.challengeType;
  const tests = challengeTestsSelector(state);
  if (
    challengeType === 11 ||
    (tests.length > 0 && tests.every(test => test.pass && !test.err))
  ) {
    if (type === types.checkChallenge) {
      return of({ type: 'this was a check challenge' });
    }

    if (type === types.submitChallenge) {
      const { id } = challengeMetaSelector(state);
      const files = challengeFilesSelector(state);
      const { username } = userSelector(state);
      const challengeInfo = {
        id,
        files
      };
      const update = {
        endpoint: '/modern-challenge-completed',
        payload: challengeInfo
      };
      return postChallenge(update, username);
    }
  }
  return empty();
}

function submitProject(type, state) {
  if (type === types.checkChallenge) {
    return empty();
  }

  const { solution, githubLink } = projectFormValuesSelector(state);
  const { id, challengeType } = challengeMetaSelector(state);
  const { username } = userSelector(state);
  const challengeInfo = { id, challengeType, solution };
  if (challengeType === challengeTypes.backEndProject) {
    challengeInfo.githubLink = githubLink;
  }

  const update = {
    endpoint: '/project-completed',
    payload: challengeInfo
  };
  return postChallenge(update, username).pipe(
    concat(of(updateSolutionFormValues({})))
  );
}

function submitBackendChallenge(type, state) {
  const tests = challengeTestsSelector(state);
  if (tests.length > 0 && tests.every(test => test.pass && !test.err)) {
    if (type === types.submitChallenge) {
      const { id } = challengeMetaSelector(state);
      const { username } = userSelector(state);
      const {
        solution: { value: solution }
      } = projectFormValuesSelector(state);
      const challengeInfo = { id, solution };

      const update = {
        endpoint: '/backend-challenge-completed',
        payload: challengeInfo
      };
      return postChallenge(update, username);
    }
  }
  return empty();
}

const submitters = {
  tests: submitModern,
  backend: submitBackendChallenge,
  'project.frontEnd': submitProject,
  'project.backEnd': submitProject
};

export default function completionEpic(action$, state$) {
  return action$.pipe(
    ofType(types.submitChallenge),
    switchMap(({ type }) => {
      const state = state$.value;
      const meta = challengeMetaSelector(state);
      const { nextChallengePath, challengeType, superBlock } = meta;
      const closeChallengeModal = of(closeModal('completion'));

      let submitter = () => of({ type: 'no-user-signed-in' });
      if (
        !(challengeType in submitTypes) ||
        !(submitTypes[challengeType] in submitters)
      ) {
        throw new Error(
          'Unable to find the correct submit function for challengeType ' +
            challengeType
        );
      }
      if (isSignedInSelector(state)) {
        submitter = submitters[submitTypes[challengeType]];
      }

      const pathToNavigateTo = findPathToNavigateTo(
        nextChallengePath,
        superBlock,
        state,
        challengeType
      );

      return submitter(type, state).pipe(
        tap(async () => navigate(await pathToNavigateTo)),
        concat(closeChallengeModal),
        filter(Boolean)
      );
    })
  );
}

async function findPathToNavigateTo(
  nextChallengePath,
  superBlock,
  state,
  challengeType
) {
  let canClaimCert = false;
  const isProjectSubmission = [
    challengeTypes.frontEndProject,
    challengeTypes.backEndProject,
    challengeTypes.pythonProject
  ].includes(challengeType);
  if (isProjectSubmission) {
    const username = usernameSelector(state);
    try {
      const response = await getVerifyCanClaimCert(username, superBlock);
      console.log(response);
      if (response.status === 200) {
        canClaimCert = response.data?.response?.message === 'can-claim-cert';
      }
    } catch (err) {
      console.error('failed to verify if user can claim certificate', err);
    }
  }
  let pathToNavigateTo;

  if (nextChallengePath.includes(superBlock) && !canClaimCert) {
    pathToNavigateTo = nextChallengePath;
  } else if (canClaimCert) {
    pathToNavigateTo = `/learn/${superBlock}/#claim-cert-block`;
  } else {
    pathToNavigateTo = `/learn/${superBlock}/#${superBlock}-projects`;
  }
  console.log(
    isProjectSubmission,
    challengeType,
    canClaimCert,
    pathToNavigateTo
  );
  return pathToNavigateTo;
}
