import mongoose from 'mongoose';
import HttpErrors from 'http-errors';
import Account from './user-account';

const profileSchema = mongoose.Schema({
  title: {
    type: String,
  },
  bio: {
    type: String,
  },
  account: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    reference: 'account',
  },
});

function profilePreHook(done) {
  return Account.findById(this.account)
    .then((accountFound) => {
      if (!accountFound) throw new HttpErrors(404, 'Account not found');
      accountFound.profile.push(this._id);
      return accountFound.save();
    })
    .then(() => done())
    .catch(done);
}
const profilePostHook = (document, done) => {
  return Account.findById(document.account)
    .then((accountFound) => {
      if (!accountFound) throw new HttpErrors(500, 'Account not found');
      accountFound.profile = accountFound.account.filter((profile) => {
        return profile._id.toString() !== document._id.toString();
      });
    })
    .then(() => done())
    .catch(done);
};

profileSchema.pre('save', profilePreHook);
profileSchema.post('remove', profilePostHook);

export default mongoose.model('profile', profileSchema);
