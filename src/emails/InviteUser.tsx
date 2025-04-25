import { Button, Section, Tailwind, Text } from '@react-email/components';
import * as React from 'react';

interface IProps {
  invitationLink: string;
  firstName: string;
  lastName: string;
  password: string;
}

export default function InviteUser({ invitationLink, firstName, lastName, password }: IProps) {
  return (
    <Tailwind>
      <Section className="flex justify-center items-center w-full min-h-screen font-sans">
        <Section className="flex flex-col items-center w-76 rounded-2xl px-6 py-6 bg-gray-50">
          <Text className="text font-medium my-0">
            Hello {firstName} {lastName},
          </Text>
          <Text className="my-0">you has invited you to join to our timesheet</Text>
          <Text className="text-base mb-4">Click the button below to accept the invitation and get started:</Text>
          <Section className="text-center">
            <Button
              href={invitationLink}
              target={'_blank'}
              className="bg-blue-600 text-white px-6 py-3 mb-4 rounded-md font-semibold no-underline inline-block mt-4"
            >
              Accept Invitation
            </Button>
          </Section>
          <Section className="text-center">
            <Text className="text-base mb-4">
              Use this password to login: <span className="text-base font-medium">{password}</span>
            </Text>
          </Section>
        </Section>
      </Section>
    </Tailwind>
  );
}

InviteUser.PreviewProps = {
  firstName: 'John',
  lastName: 'Doe',
  invitationLink: 'https://www.lipsum.com/',
  password: ''
};
