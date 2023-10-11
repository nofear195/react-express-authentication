import { Request, Response, Router } from 'express';
import { OAuth2Client } from 'google-auth-library';
import { googoleOauth2Keys as keys } from '../utils/config';
import { handleAndConvertError, sendResponse } from '../utils/helper';
import { User } from '../models/User';
import { signJwt } from '../utils/authenticate';

const redirectUrl = 'http://localhost:3000';

const scopes = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
];

// Define API endpoints for userinfo data
const userInfoEndpoint = 'https://www.googleapis.com/oauth2/v1/userinfo?alt=json';

const oAuth2Client = new OAuth2Client(
  keys.web.client_id,
  keys.web.client_secret,
  keys.web.redirect_uris[0],
);

const googleAuthUrl = async (req: Request, res: Response) => {
  // #swagger.tags = ['Oauth2']
  const authorizeUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    //  the server should always prompt the user for consent, even if they have previously granted consent.
    prompt: 'consent',
  });

  sendResponse(res, { data: authorizeUrl });
};

interface oAuthResponseData {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  picture: string;
}

const updateOrCreateUser = async (data: oAuthResponseData): Promise<User | Error> => {
  const { email, verified_email, name, picture } = data;

  try {
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      const result = await User.update(
        { isVerified: verified_email, name, picture },
        { where: { email } },
      );
      if (result[0] === 0) throw new Error('server verify error');

      return existingUser;
    } else {
      const newUser = await User.create({
        email,
        isVerified: verified_email,
        name,
        picture,
      } as User);

      return newUser;
    }
  } catch (error) {
    return error as Error;
  }
};

const oauthCallback = async (req: Request, res: Response) => {
  // #swagger.ignore = true
  const { code } = req.query;
  try {
    const { tokens } = await oAuth2Client.getToken(code as string);
    oAuth2Client.setCredentials(tokens);

    const { data }: { data: oAuthResponseData } = await oAuth2Client.request({
      url: userInfoEndpoint,
    });
    const updatedUser = await updateOrCreateUser(data);
    if (updatedUser instanceof Error) throw updatedUser;

    const { id, email, isVerified } = updatedUser;

    const token = signJwt({
      id,
      email,
      isVerified,
    });
    if (token instanceof Error) throw token;

    res.redirect(`${redirectUrl}?token=${token}`);
  } catch (error) {
    const message = handleAndConvertError(error);
    res.redirect(`${redirectUrl}/message=${message}`);
  }
};

const router = Router();

router.get('/auth-url', googleAuthUrl);
router.get('/callback', oauthCallback);

export default router;
