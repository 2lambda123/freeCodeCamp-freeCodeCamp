import request from 'request';
import constantStrings from '../utils/constantStrings.json';
import testimonials from '../resources/testimonials.json';
import secrets from '../../config/secrets';

module.exports = function(app) {
  const router = app.loopback.Router();
  const User = app.models.User;
  router.get('/api/github', githubCalls);
  router.get('/chat', chat);
  router.get('/coding-bootcamp-cost-calculator', bootcampCalculator);
  router.get('/twitch', twitch);
  router.get('/pmi-acp-agile-project-managers', agileProjectManagers);
  router.get('/pmi-acp-agile-project-managers-form', agileProjectManagersForm);
  router.get('/nonprofits', nonprofits);
  router.get('/nonprofits-form', nonprofitsForm);
  router.get('/u/:email', unsubscribe);
  router.get('/unsubscribed/:email', unsubscribed);
  router.get('/unsubscribed', unsubscribed);
  router.get('/resubscribe/:email', resubscribe);
  router.get('/resubscribe', resubscribe);
  router.get('/get-started', getStarted);
  router.get('/submit-cat-photo', submitCatPhoto);
  router.get('/stories', showTestimonials);
  router.get('/cancel-stickers', cancelStickers);
  router.get('/confirm-stickers', confirmStickers);
  router.get('/all-stories', showAllTestimonials);
  router.get('/terms', terms);
  router.get('/welcome', welcome);
  router.get('/privacy', privacy);
  router.get('/how-nonprofit-projects-work', howNonprofitProjectsWork);
  router.get(
      '/software-resources-for-nonprofits',
      softwareResourcesForNonprofits
  );
  router.get('/academic-honesty', academicHonesty);
  router.get(
    '/the-fastest-web-page-on-the-internet',
    theFastestWebPageOnTheInternet
  );

  app.use(router);

  function chat(req, res) {
    res.redirect('https://gitter.im/FreeCodeCamp/FreeCodeCamp');
  }

  function terms(req, res) {
      res.render('resources/terms-of-service', {
            title: 'Terms of Service'
      });
  }

  function privacy(req, res) {
      res.render('resources/privacy', {
          title: 'Privacy policy'
      });
  }

  function welcome(req, res) {
    res.render('resources/welcome', {
      title: 'Welcome to Free Code Camp!'
    });
  }

  function howNonprofitProjectsWork(req, res) {
      res.render('resources/how-nonprofit-projects-work', {
          title: 'How our nonprofit projects work'
      });
  }

  function softwareResourcesForNonprofits(req, res) {
    res.render('resources/software-resources-for-nonprofits', {
      title: 'Software Resources for Nonprofits'
    });
  }

  function academicHonesty(req, res) {
      res.render('resources/academic-honesty', {
          title: 'Academic Honesty policy'
      });
  }

  function theFastestWebPageOnTheInternet(req, res) {
    res.render('resources/the-fastest-web-page-on-the-internet', {
      title: 'This is the fastest web page on the internet'
    });
  }

  function showTestimonials(req, res) {
    res.render('resources/stories', {
      title: 'Testimonials from Happy Free Code Camp Students ' +
        'who got Software Engineer Jobs',
      stories: testimonials.slice(0, 72),
      moreStories: true
    });
  }

  function showAllTestimonials(req, res) {
    res.render('resources/stories', {
      title: 'Testimonials from Happy Free Code Camp Students ' +
        'who got Software Engineer Jobs',
      stories: testimonials,
      moreStories: false
    });
  }

  function confirmStickers(req, res) {
    req.flash('success', {
      msg: 'Thank you for supporting our community! Depending on how far you ' +
        'live from San Francisco, these stickers may take several weeks ' +
        'to reach you.'
    });
    res.redirect('/map');
  }

  function cancelStickers(req, res) {
      req.flash('info', {
        msg: 'You\'ve cancelled your purchase of our stickers. You can ' +
          'support our community any time by buying some.'
      });
      res.redirect('/map');
  }
  function submitCatPhoto(req, res) {
    res.send('Submitted!');
  }

  function bootcampCalculator(req, res) {
    res.render('resources/calculator', {
      title: 'Coding Bootcamp Cost Calculator'
    });
  }

  function nonprofits(req, res) {
    res.render('resources/nonprofits', {
      title: 'Your Nonprofit Can Get Pro Bono Code'
    });
  }

  function nonprofitsForm(req, res) {
    res.render('resources/nonprofits-form', {
      title: 'Nonprofit Projects Proposal Form'
    });
  }

  function agileProjectManagers(req, res) {
    res.render('resources/pmi-acp-agile-project-managers', {
      title: 'Get Agile Project Management Experience for the PMI-ACP'
    });
  }

  function agileProjectManagersForm(req, res) {
    res.render('resources/pmi-acp-agile-project-managers-form', {
      title: 'Agile Project Management Program Application Form'
    });
  }

  function twitch(req, res) {
    res.redirect('https://twitch.tv/freecodecamp');
  }

  function unsubscribe(req, res, next) {
    req.checkParams(
      'email',
      `"${req.params.email}" isn't a valid email address.`
    ).isEmail();
    const errors = req.validationErrors(true);
    if (errors) {
      req.flash('error', { msg: errors.email.msg });
      return res.redirect('/map');
    }
    return User.find({
      where: {
        email: req.params.email,
        sendQuincyEmail: true
      }
    }, (err, users) => {
      if (err) { return next(err); }
      if (!users.length) {
        req.flash('info', {
          msg: 'Email address not found, or email address is not on a ' +
            'mailing list. Please update your Email preferences from your ' +
            'settings.'
        });
        return res.redirect('/map');
      }

      const updates = users.map(user => {
        return new Promise((resolve, reject) =>
          user.updateAttributes({
            sendQuincyEmail: false,
            sendEmail: false,
            sendNotificationEmail: false
          }, (err) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          })
        );
      });
      return Promise.all(updates)
        .then(() => {
          req.flash('info', {
            msg: 'We\'ve successfully updated your Email preferences.'
          });
          return res.redirect('/unsubscribed/' + req.params.email);
        })
        .catch(next);
    });
  }

  function unsubscribed(req, res) {
    req.checkParams('email', 'Must send a valid email').isEmail();
    res.render('resources/unsubscribed', {
      title: 'You have been unsubscribed',
      email: req.params.email
    });
  }

  function resubscribe(req, res, next) {
    req.checkParams(
      'email',
      `"${req.params.email}" isn't a valid email address.`
    ).isEmail();
    const errors = req.validationErrors(true);
    if (errors) {
      req.flash('error', { msg: errors.email.msg });
      return res.redirect('/map');
    }
    return User.find({ where: { email: req.params.email } }, (err, users) => {
      if (err) { return next(err); }
      if (!users.length) {
        req.flash('info', {
          msg: 'Email address not found. ' +
          'Please update your Email preferences from your profile.'
        });
        return res.redirect('/map');
      }
      const updates = users.map(user => {
        return new Promise((resolve, reject) =>
          user.updateAttributes({
            sendQuincyEmail: true
          }, (err) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          })
        );
      });
      return Promise.all(updates)
        .then(() => {
        req.flash('info', {
          msg: 'We\'ve successfully updated your Email preferences.'
        });
        return res.redirect('/map');
      })
      .catch(next);
    });
  }


  function getStarted(req, res) {
    res.render('resources/get-started', {
      title: 'How to get started with Free Code Camp'
    });
  }

  function githubCalls(req, res, next) {
    var githubHeaders = {
      headers: {
        'User-Agent': constantStrings.gitHubUserAgent
      },
      port: 80
    };
    request(
      [
        'https://api.github.com/repos/freecodecamp/',
        'freecodecamp/pulls?client_id=',
        secrets.github.clientID,
        '&client_secret=',
        secrets.github.clientSecret
      ].join(''),
      githubHeaders,
      function(err, status1, pulls) {
        if (err) { return next(err); }
        pulls = pulls ?
          Object.keys(JSON.parse(pulls)).length :
          'Can\'t connect to github';

        return request(
          [
            'https://api.github.com/repos/freecodecamp/',
            'freecodecamp/issues?client_id=',
            secrets.github.clientID,
            '&client_secret=',
            secrets.github.clientSecret
          ].join(''),
          githubHeaders,
          function(err, status2, issues) {
            if (err) { return next(err); }
            issues = ((pulls === parseInt(pulls, 10)) && issues) ?
            Object.keys(JSON.parse(issues)).length - pulls :
              "Can't connect to GitHub";
            return res.send({
              issues: issues,
              pulls: pulls
            });
          }
        );
      }
    );
  }
};
