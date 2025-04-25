import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import InviteUser from '@/emails/InviteUser';
import ResetPassword from '@/emails/ResetPassword';

import { sendEmail } from './commonService';

interface SendInvitationProps {
  invitationLink: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
}

interface SendResetPasswordProps {
  invitationLink: string;
  email: string;
}

abstract class EmailService {
  static async sendInvitationEmail(data: SendInvitationProps) {
    const html = renderToStaticMarkup(
      <InviteUser
        invitationLink={data.invitationLink}
        firstName={data.firstName}
        lastName={data.lastName}
        password={data.password}
      />
    );

    return await sendEmail({
      to: data.email,
      subject: 'Accept Invitation',
      html
    });
  }

  static async sendResetPasswordEmail(data: SendResetPasswordProps) {
    const html = renderToStaticMarkup(<ResetPassword invitationLink={data.invitationLink} />);
    return await sendEmail({
      to: data.email,
      subject: 'Reset Password',
      html
    });
  }
}

export default EmailService;
