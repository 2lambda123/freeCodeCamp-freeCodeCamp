import {
  type FastifyPluginCallbackTypebox,
  Type
} from '@fastify/type-provider-typebox';

import { formatValidationError } from '../utils/error-formatting';
import { canSubmitCodeRoadCertProject } from './helpers/challenge-helpers';

export const challengeRoutes: FastifyPluginCallbackTypebox = (
  fastify,
  _options,
  done
) => {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  fastify.addHook('onRequest', fastify.csrfProtection);
  fastify.addHook('onRequest', fastify.authenticateSession);

  fastify.post(
    '/project-completed',
    {
      schema: {
        body: Type.Object({
          id: Type.String({ format: 'objectid', maxLength: 24 }),
          challengeType: Type.Optional(Type.Number()),
          solution: Type.String({ format: 'url', maxLength: 1024 })
        }),
        response: {
          // TODO: update to correct schema and test success case.
          200: Type.Object({
            completedDate: Type.Number(),
            points: Type.Number(),
            alreadyCompleted: Type.Boolean()
          }),
          400: Type.Object({
            type: Type.Literal('error'),
            message: Type.String()
            // TODO: use literals if possible.
            // message: Type.Union([
            //   Type.Literal(
            //     'That does not appear to be a valid challenge submission.'
            //   ),
            //   Type.Literal(
            //     'You have not provided the valid links for us to inspect your work.'
            //   )
            // ])
          }),
          403: Type.Object({
            type: Type.Literal('error'),
            message: Type.Literal(
              'You have to complete the project before you can submit a URL.'
            )
          })
        }
      },
      errorHandler(error, request, reply) {
        if (error.validation) {
          void reply.code(400);
          return formatValidationError(error.validation);
        } else {
          this.errorHandler(error, request, reply);
        }
      }
    },
    async (req, reply) => {
      const { id: projectId, challengeType } = req.body;

      try {
        const user = await fastify.prisma.user.findUniqueOrThrow({
          where: { id: req.session.user.id },
          select: {
            completedChallenges: true,
            partiallyCompletedChallenges: true,
            savedChallenges: true,
            progressTimestamps: true
          }
        });

        if (
          challengeType === 13 &&
          !canSubmitCodeRoadCertProject(projectId, user)
        ) {
          void reply.code(403);
          return {
            type: 'error',
            message:
              'You have to complete the project before you can submit a URL.'
          } as const;
        }

        // update the user

        const completedDate = Date.now();

        const oldChallenge = user.completedChallenges?.find(
          challenge => challenge.id === projectId
        );

        const newChallenge = {
          challengeType,
          solution: req.body.solution
        };

        const alreadyCompleted = !!oldChallenge;

        // TODO: once we have the required acceptance tests, work on refactoring
        // this into something that the other routes can use. i.e. a few
        // functions that build the update object based on the challenge type.
        // Unlike buildUserUpdate we want multiple functions that we can call if
        // appropriate.
        if (alreadyCompleted) {
          await fastify.prisma.user.update({
            where: { id: req.session.user.id },
            data: {
              completedChallenges: {
                updateMany: { where: { id: projectId }, data: newChallenge }
              },
              partiallyCompletedChallenges: {
                deleteMany: { where: { id: projectId } }
              }
            }
          });
        } else {
          await fastify.prisma.user.update({
            where: { id: req.session.user.id },
            data: {
              completedChallenges: {
                push: {
                  ...newChallenge,
                  id: projectId,
                  completedDate
                }
              },
              partiallyCompletedChallenges: {
                deleteMany: { where: { id: projectId } }
              }
            }
          });
        }

        // TODO: replace this with the function used in get-session-user.
        const points = (user.progressTimestamps as unknown[]).length;

        return {
          alreadyCompleted,
          completedDate,
          points: alreadyCompleted ? points : points + 1
        };
      } catch (err) {
        // TODO: send to Sentry
        fastify.log.error(err);
        void reply.code(500);
        // TODO: use proper error message.
        return { message: '', type: 'error' } as const;
      }
    }
  );

  done();
};
