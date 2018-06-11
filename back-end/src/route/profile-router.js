import { Router } from 'express';
import bodyParser from 'body-parser';
import Profile from '../model/profile-model';

const jsonParser = bodyParser.json();
const profileRouter = new Router();

profileRouter.post('/api/profile', jsonParser, (request, response, next) => {
  return new Profile(request.body).save()
    .then(profile => response.json(profile))
    .catch(next);
});

profileRouter.put('/api/profile/:id', jsonParser, (request, response, next) => {
  const option = { runValidators: true, new: true };
  return Profile.findByIdAndUpdate(request.params.id, request.body, option)
    .then((updateProfile) => {
      return response.json(updateProfile);
    })
    .catch(next);
});
profileRouter.get('/api/profile/:username', (request, response, next) => {
  return Profile.find(request.params.username)
    .then((profile) => {
      return response.json(profile);
    })
    .catch(next);
});

export default profileRouter;
