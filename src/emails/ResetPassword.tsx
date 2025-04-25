import { Button, Section, Tailwind, Text } from '@react-email/components';
import * as React from 'react';

interface IProps {
  invitationLink: string;
}

export default function ResetPassword({ invitationLink }: IProps) {
  return (
    <Tailwind>
      <Section className="flex justify-center items-center w-full min-h-screen font-sans">
        <Section className="flex flex-col items-center w-76 rounded-2xl px-6 py-6 bg-gray-50">
          <Text className="my-0">You has reset your password</Text>
          <Text className="text-base mb-4">Click the button below to reset your password:</Text>
          <Section className="text-center">
            <Button
              href={invitationLink}
              target={'_blank'}
              className="bg-blue-600 text-white px-6 py-3 mb-4 rounded-md font-semibold no-underline inline-block mt-4"
            >
              Reset Password
            </Button>
          </Section>
        </Section>
      </Section>
    </Tailwind>
  );
}

ResetPassword.PreviewProps = {
  invitationLink: 'https://www.lipsum.com/'
};
